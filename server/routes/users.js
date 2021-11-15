const express = require('express');
const router = express.Router();
const async = require('async');
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');
const { Product } = require('../models/Product');
const { Payment } = require('../models/Payment');

//=================================
//             User
//=================================

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSuccess: false, message: 'Wrong password' });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('w_authExp', user.tokenExp);
        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '', tokenExp: '' }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/addToCart', auth, (req, res) => {
  // 유저정보 가져오기
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    if (err) return res.status(400).json({ success: false, err });

    // Cart에 상품정보가 있는지 확인
    const addedProduct = userInfo.cart.filter(item => item.id === req.body.productId);

    if (addedProduct.length) {
      // 상품이 이미 있을 때
      User.findOneAndUpdate(
        { _id: req.user._id, 'cart.id': req.body.productId },
        { $inc: { 'cart.$.quantity': 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, userInfoCart: userInfo.cart });
        }
      );
    } else {
      // 상품이 Cart에 없을 때
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, userInfoCart: userInfo.cart });
        }
      );
    }
  });
});

router.post('/removeFromCart', auth, (req, res) => {
  // Cart에서 상품정보를 지우고
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        cart: {
          id: req.body.productId,
        },
      },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      // 수정된 Cart 정보를 가져오기
      return res.status(200).json({ success: true, deletedProduct: req.body.productId });
    }
  );
});

router.post('/successBuy', auth, (req, res) => {
  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach(item => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  transactionData = {
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
    data: req.body.paymentData,
    product: history,
  };

  User.findOneAndUpdate(
    // User Collection의 history에 간단한 결제정보 넣어주기
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, userInfo) => {
      if (err) return res.json({ success: false, err });

      // Payment Collection에 상세결제정보 넣어주기
      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        // Product Collection에 몇개의 상품이 팔렸는지 넣어주기
        let products = [];
        doc.product.forEach(item => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (product, callback) => {
            Product.updateOne({ _id: product.id }, { $inc: { sold: product.quantity } }, { new: false }, callback);
          },
          err => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({ success: true, cart: userInfo.cart, cartDetail: [] });
          }
        );
      });
    }
  );
});

module.exports = router;

const express = require('express');
const multer = require('multer');
const { Product } = require('../models/Product');
const fs = require('fs');

const router = express.Router();
//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single('file');

router.post('/', (req, res) => {
  // 받아온 정보를 DB에 저장
  const product = new Product(req.body);

  product.save(err => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/image', (req, res) => {
  // 가져온 이미지 저장
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename });
  });
});

router.post('/deleteImage', (req, res) => {
  fs.unlink(`${req.body.path}`, err => {
    if (err) return res.json({ success: false, err });
    return res.json({ success: true });
  });
});

router.post('/products', (req, res) => {
  // product collection에 들어 있는 모든 상품 정보를 가져오기
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchText;
  const findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) res.status(400).json({ success: false, err });
        // 더 불러올 목록이 있는지 확인하여 isMore에 표시
        Product.find(findArgs)
          .skip(skip + limit)
          .limit(1)
          .exec((err, product) => {
            if (product.length) return res.status(200).json({ success: true, products, isMore: true });
            return res.status(200).json({ success: true, products, isMore: false });
          });
      });
  } else {
    Product.find(findArgs)
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) res.status(400).json({ success: false, err });
        // 더 불러올 목록이 있는지 확인하여 isMore에 표시
        Product.find(findArgs)
          .skip(skip + limit)
          .limit(1)
          .exec((err, product) => {
            if (product.length) return res.status(200).json({ success: true, products, isMore: true });
            return res.status(200).json({ success: true, products, isMore: false });
          });
      });
  }
});

router.get('/products_by_id', (req, res) => {
  let type = req.query.type;
  let productId = req.query.id;

  Product.find({ _id: productId })
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, product });
    });
});

module.exports = router;

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
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length) {
      findArgs[key] = req.body.filters[key];
    }
  }

  Product.find(findArgs)
    .populate('writer')
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) res.status(400).json({ success: false, err });
      Product.find(findArgs)
        .skip(skip + limit)
        .limit(1)
        .exec((err, product) => {
          if (product.length) return res.status(200).json({ success: true, products, isMore: true });
          return res.status(200).json({ success: true, products, isMore: false });
        });
    });
});

module.exports = router;
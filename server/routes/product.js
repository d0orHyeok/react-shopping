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

module.exports = router;

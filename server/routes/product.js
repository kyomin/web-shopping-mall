const express = require('express');
const router = express.Router();
const multer = require('multer');

//=================================
//             Product
//=================================

// STORAGE MULTER CONFIG
const storage = multer.diskStorage({
    // 클라이언트로 전달 받은 파일을 서버의 어느 곳에 저장할지 설정하는 부분이다.
    // node server 폴더 구조에 맞춰서 uploads라는 폴더를 생성해 주자!
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    // 저장되는 파일 이름을 지정하는 부분이다.
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single('file');

router.post('/image', (req, res) => {
    // 프론트에서 가져온 이미지를 저장해 준다.
    upload(req, res, err => {
        if(err) return res.json({ success: false, err });

        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename });
    });
});

module.exports = router;
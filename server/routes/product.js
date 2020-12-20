const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

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

// 서버 스토리지(root 디렉토리의 upload 폴더)에 이미지 저장
router.post('/image', (req, res) => {
    // 프론트에서 가져온 이미지를 저장해 준다.
    upload(req, res, err => {
        if(err) return res.json({ success: false, err });

        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename });
    });
});

// 상품 업로드
router.post('/', (req, res) => {
    // 받아온 정보들을 데이터베이스에 넣어준다.
    const product = new Product(req.body);

    product.save((err) => {
        if(err) return res.status(400).json({ success: false, err });

        return res.status(200).json({ success: true });
    });
});

// 전체 상품 가져오기
router.post('/products', (req, res) => {
    /*
        몽고디비의 product collection에 들어 있는 모든 상품 정보를 가져온다.
        find의 인자로 조건을 넣지 않으면 모든 정보를 긁어 온다.
        populate 함수를 통해 writer가 ref하는 collection의 정보도 긁어온다.
    */
    const limit = req.body.limit ? parseInt(req.body.limit) : 100;  // front에서 limit 값을 지정해 줬다면 해당 값을 사용, 안 했다면 100개를 limit으로 정한다.
    const skip = req.body.skip ? parseInt(req.body.skip) : 0;
    const term = req.body.searchTerm;
    const findArgs = {};

    // filters object의 key를 순회한다.
    for(let key in req.body.filter){
        if(req.body.filter[key].length > 0){

            if(key === 'price'){
                /*
                    $gte : greater than equal => 해당 값보다 크거나 같고
                    $lte : less than equal => 해당 값보다 작거나 같은

                    위의 두 문법은 MongoDB에서 제공하는 쿼리 문법이다.
                */
                findArgs[key] = {
                    $gte: req.body.filter[key][0],
                    $lte: req.body.filter[key][1]
                }
            } else {
                // classifications key를 위한 것!
                findArgs[key] = req.body.filter[key];
            }
        }
    }

    if(term){       // front에서 검색어를 입력해서 term이 넘어온 상황이라면
        Product.find(findArgs)
        .find({ $text: { $search: term } })     // $text는 텍스트 인덱스로 인덱싱 된 필드의 내용에 대해 텍스트 검색을 수행한다. 어느 필드를 대상으로 할 지는 모델 설계 시에 컨트롤해 준다.
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfos) => {
            if(err) return res.status(400).json({ success: false, err });

            return res.status(200).json({ 
                success: true, 
                productInfos,
                postSize: productInfos.length
            });
        });
    } else {
        /*
            findArgs : {
                classifications: [ clicked factors ],
                price: {
                    $gte: req.body.filter[key][0],
                    $lte: req.body.filter[key][1]
                }
            }

            find 인자로 해당 값을 넣으면,
            classifications 원소 중에 맞는 것이 있다면 긁어온다(OR).
            price에서는 $gte <= x <= $lte를 만족하는 x 값을 긁어온다.
        */
        Product.find(findArgs)
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfos) => {
            if(err) return res.status(400).json({ success: false, err });

            return res.status(200).json({ 
                success: true, 
                productInfos,
                postSize: productInfos.length
            });
        });
    }
});

// 특정 상품의 정보 가져오기
router.get('/detail', (req, res) => {
    /*
        productId를 이용해 DB에서 productId에 일치하는 상품의 정보를 가져온다.
        post 요청의 경우에는 Request 객체의 body에 정보를 실어 보내지만,
        get 요청의 경우에는 body가 없고 다음과 같이 url에 정보를 실어 보내므로 query를 이용해 파싱해야 한다.
        
        /api/product/detail?id=${productId}&type=single
    */
    const productId = req.query.id;
    const type = req.query.type;

    Product.find({ _id: productId })
    .populate('writer')
    .exec((err, productInfo) => {
        if(err) return res.status(400).send({ success: false, err });

        return res.status(200).send({ success:true, productInfo });
    });
});

module.exports = router;
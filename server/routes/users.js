const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Product } = require('../models/Product');
const { auth } = require('../middleware/auth');

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
        history: req.user.history
    });
});

router.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                .cookie("w_auth", user.token)
                .status(200)
                .json({
                    loginSuccess: true, userId: user._id
                });
            });
        });
    });
});

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post('/addToCart', auth, (req, res) => {
   // User Collection에서 해당 유저의 정보를 가져오기
    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인
        const productId = req.body.productId;
        let duplicate = false;

        userInfo.cart.forEach((item) => {
            if(item.id === productId) {
                duplicate = true;
            }
        });

        // 상품이 이미 있을 때는 해당 상품을 찾아 수량을 1 증가!
        if(duplicate){
            /*
                다수의 유저 정보 중에서 지금의 유저 정보를 찾고, cart 필드의 상품 id를 찾는다.
                그 후 cart 필드(array)의 특정된 원소(상품 정보)의 quantity를 1 증가 시킨다.
                new: true 옵션은 업데이트 된 정보의 결과 값을 받아 콜백 함수를 실행한다는 뜻이다.
                
                * array 필드 내의 특정 원소를 찾고, 바꾸는 과정이 생소할 수 있으니 주의해야 한다!
            */
            User.findOneAndUpdate(
                { _id: req.user._id, 'cart.id': productId },
                { $inc: { 'cart.$.quantity': 1 } },
                { new: true },
                (err, userInfo) => {
                    if(err) return res.status(400).json({ success: false, err });

                    res.status(200).send(userInfo.cart);
                }
            );
        }
        // 상품이 이미 있지 않을 때는 해당 상품을 배열에 등록!
        else {
            /*
                다수의 유저 정보 중에서 지금의 유저 정보를 찾는다.
                그 후, $push 옵션을 통해 해당 유저의 cart 필드(array 타입)에 정보를 넣어준다.
            */
            User.findOneAndUpdate(
                { _id: req.user._id },
                {  
                    $push: {
                        cart: {
                            id: productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if(err) return res.status(400).json({ success: false, err });

                    res.status(200).send(userInfo.cart);
                }
            );
        }
    });
});

router.get('/removeFromCart', auth, (req, res) => {
    /* 
        먼저 users Collection 안의 cart 필드 안에 내가 지우려고 한 상품을 지워주기
        다수의 유저 정보 중에서 지금의 유저 정보를 찾고, cart 필드의 상품 id를 pull(빼 주기)해준다.
        new: true 옵션은 업데이트 된 정보의 결과 값을 받아 콜백 함수를 실행한다는 뜻이다.
        
        * Collection의 array 필드 내의 특정 원소를 찾고, 바꾸는 과정이 생소할 수 있으니 주의해야 한다!
    */
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            '$pull': { 'cart': { 'id': req.query.id } }
        },
        { new: true },
        (err, userInfo) => {
            // products Collection에서 현재 남아있는 상품들의 정보를 다시 가져오기
            const cart = userInfo.cart;
            const productIdArray = cart.map((item) => {
                return item.id;
            });

            Product.find({ _id: { $in: productIdArray } })
            .populate('writer')
            .exec((err, productInfos) => {
                if(err) return res.status(400).send({ success: false, err });

                /* 
                    users Collection의 cart 정보에는 quantity에 대한 정보가 있지만,
                    products Collection에는 해당 상품의 quantity 정보가 없다.

                    때문에, 이 두 정보로 응답하여 합치는 과정을 위해 아래와 같이 return 한다.
                */
                return res.status(200).json({
                    productInfos,
                    cart
                });
            });
        }
    );
});

module.exports = router;

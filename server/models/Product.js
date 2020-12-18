const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    classification: {
        type: Number
    },
    images: {
        type: Array,
        default: []
    },
    sold: {             // 몇 개가 팔렸는가에 대한 정보
        type: Number,
        maxlength: 100,
        default: 0
    },
    views: {            // 사람들이 해당 상품을 얼마나 조회했는가에 대한 정보
        type: Number,
        default: 0
    }
}, { timestamps: true });

/* 
    title 필드,  
    description 필드를
    검색어에 걸리는 대상으로 설정한다.

    weights를 통해 어떤 필드에 검색어가 우선적으로 걸리게 할지 컨트롤한다.
*/
productSchema.index({
    title: 'text',
    description: 'text'
}, {
    weights: {
        title: 5,
        description:1
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }
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
    continent: {
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

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }
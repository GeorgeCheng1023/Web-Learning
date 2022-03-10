const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmSchema = Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    products: { type: Schema.Types.ObjectId, ref: 'Product' }
})

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('mongoose connected');
}

const productSchema = new Schema({
    name: String,
    price: Number
})

const Product = new mongoose.model('Product', productSchema)


// Product.insertMany([
//     { name: 'lemon', price: 20 },
//     { name: 'apple', price: 10 },
//     { name: 'orange', price: 30 }
// ])

const farmSchema = new Schema({
    farmName: String,
    location: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Farm = mongoose.model('Farm', farmSchema);

const addNewFarm = async() => {
    const farm = new Farm({ farmName: 'abc farm', location: 'Taiwan' });
    const apple = await Product.findOne({ name: 'apple' });
    farm.products.push(apple);
    await farm.save();
    console.log(farm);
}

// addNewFarm()

Farm.findOne({ name: 'abc farm' })
    .populate('products') //令mongo將products展開，否則會輸出Object(...id)
    .then(res => console.log(res))
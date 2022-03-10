const { log } = require('console');
const mongoose = require('mongoose');
const Product = require('./models/product');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/farm');
    console.log('mongoose connected');
}

const productList = [{
        name: 'Apple',
        price: 30,
        category: 'fruit'
    },
    {
        name: 'Orange',
        price: 40,
        category: 'fruit'
    },
    {
        name: 'Patato',
        price: 10,
        category: 'vegetable'
    }
];

Product.insertMany(productList)
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
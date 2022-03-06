const { log } = require('console');
const express = require('express');
const app = express();
const path = require('path');
const Product = require('./models/product');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const AppError = require('./AppError');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('mongoose connected');
}

const category_list = ['fruit', 'vegetable', 'diary']

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(methodOverride('_method'))

//Catch Async error
function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

//Read - Main
app.get('/', (req, res) => {
    res.send('Main page');
});

//Create - to new page
app.get('/products/new', (req, res) => {
    res.render('products/new', { category_list })
});

//Create - post
app.post('/products', wrapAsync(async(req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
}));

//Read - all or categories
app.get('/products', async(req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/product.ejs', { products, category });
    } else {
        const products = await Product.find({});
        res.render('products/product.ejs', { products, category: 'All' });
    }
})

//Read - by id
app.get('/products/:id', wrapAsync(async(req, res, next) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
        throw new AppError(`Product ${id} not found`, 404);
    }
    res.render('products/show', { product: foundProduct });
}))

//Update - to edit page
app.get('/products/:id/edit', async(req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.render('products/edit', { product: foundProduct, category_list });
})

//Update - rewrite products
app.put(('/products/:id'), async(req, res) => {
    const { id } = req.params;
    const updateProduct = req.body;
    console.log(updateProduct);
    await Product.findByIdAndUpdate(id, updateProduct, { runValidators: true });
    res.redirect(`/products/${id}`);
})

//DELETE
app.delete('/products/:id', async(req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

const handleValidationError = (err) => {
    return new AppError('Validation error.... Please try again')
}

//Error handle - validate error
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') err = handleValidationError(err);
    res.send(err.message)
})

//Error handle -all error
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});
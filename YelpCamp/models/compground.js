const mongoose = require('mongoose');
const Review = require('../models/review');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    images: [{
        url: String,
        filename: String
    }],
    location: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

CampgroundSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);
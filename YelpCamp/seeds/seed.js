const express = require('express');
const mongoose = require('mongoose');
const Campground = require('../models/compground');
const cities = require('./cities')
const { descriptors, places } = require('./description')
    //connet to mongo
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpcamp');
}

const getRandomValues = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random].city}, ${cities[random].state}`,
            title: `${getRandomValues(descriptors)} ${getRandomValues(places)}`
        })
        await camp.save();
    }
}

seedDB().then() => {
    mongoose.connection.close();
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('mongoose connected');
}

const tweetSchema = new Schema({
    title: String,
    likes: Number,
    author: { type: Schema.Types.ObjectId, ref: 'User' }
})

const userSchema = new Schema({
    name: String,
    age: Number
})

const Tweet = mongoose.model('Tweet', tweetSchema);
const User = mongoose.model('User', userSchema);

const newUser = new User({ name: 'John', age: 13 });
// newUser.save();

const addNewTweet1 = async() => {
    const newTweet = new Tweet({ title: 'This is title.', likes: 1 });
    const john = await User.findOne({ name: 'John' });
    console.log(john);
    newTweet.author = john;
    newTweet.save();
}
const addNewTweet2 = async() => {
    const newTweet = new Tweet({ title: 'I have another title', likes: 20 });
    const john = await User.findOne({ name: 'John' });
    newTweet.author = john;
    newTweet.save();
}

// addNewTweet1();
// addNewTweet2();

Tweet.find({}).populate('author').then(res => console.log(res))
    const mongoose = require('mongoose');
    main().catch(err => console.log(err));

    async function main() {
        await mongoose.connect('mongodb://localhost:27017/test');
        console.log('mongoose connected');
    }

    const userSchema = new mongoose.Schema({
        name: String,
        gender: String,
        addresses: [{
            _id: { id: false }, //取消預設加入_id
            country: String,
            location: String
        }]
    });

    const User = mongoose.model('User', userSchema);

    const newUser = async() => {
            const newUser = await User({
                name: 'John',
                gender: 'Male'
            });
            newUser.addresses.push({
                country: 'Taiwan',
                location: '123 this street'
            })
            const res = await newUser.save();
            console.log(res);
        }
        // newUser()

    const addAddress = async() => {
        const findUser = await User.findOne({ name: 'John' });
        findUser.addresses.push({
            country: 'Taiwan',
            location: '256 other street'
        });
        const res = await findUser.save();
        console.log(res);
    }

    addAddress()
    User.find({}).then(res => console.log(res));
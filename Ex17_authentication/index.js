const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async(pw) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(pw, salt);
    console.log(salt);
    console.log(hash);
}

const login = async(pw, hashPassword) => {
    const result = await bcrypt.compare(pw, hashPassword);
    if (result) {
        console.log('Success login');
    } else {
        console.log('Incorrect');
    }
}

// hashPassword('banana');
login('banana', '$2b$10$FJkrbQXmBqnnHZF9DzyUYOTBPfMj/ihnxXuKMdOC939V5TrgAavu')
const mongoose = require('mongoose');
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/wakyma';
console.log(`Conecting to ${url}`);
mongoose
    .connect(url, {useNewUrlParser: true})
    .then(() => {
        console.log("Connected!!")
    })
    .catch(err => console.error(err));

module.exports = mongoose;


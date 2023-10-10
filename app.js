const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const port = 80;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

// mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const customerdata = mongoose.model('customerdata', contactSchema);


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/dance');
}
// Middleware to parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'ejs') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('index.ejs', params);
})
app.get('/contact', (req, res) => {
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var mydata = new customerdata(req.body)
    mydata.save()
    
    // .then(()=>{
    //     res.send('This item has been stored to the database')
    // }).catch(()=>{
    //     res.status(404).send('Item was not saved to the database')
    // });
})


app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});

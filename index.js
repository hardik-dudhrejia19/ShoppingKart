const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const productRoute = require('./api/route/productRoute');
const mongoose = require('mongoose');

app.use(cors());

const url = "mongodb+srv://deepmuni:MPrfJkmBJDOYvXQK@testing-deep-aets3.mongodb.net/CSCI_5709_Project?retryWrites=true&w=majority";

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connection Successful");
}).catch(err =>{
    console.log("MongoDB connection unsuccessful " + err);
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const path = require('path');
app.use(express.static(__dirname + '/shoppingkart/build/'));

app.get('/',function(req,res, next){
    res.sendFile(path.join(__dirname + '/shoppingkart/build/index.html'));
    next();
});

app.use('/product', productRoute);

app.listen(process.env.PORT || 5000, function () {
    console.log('Express serve running on port 5000');
});

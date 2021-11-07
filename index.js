const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const { MongoClient } = require("mongodb");
require('dotenv').config()

const uri = 'mongodb+srv://emaWatson:emaWatsonPotter81@cluster0.sjl2g.mongodb.net/emaJohnStore?retryWrites=true&w=majority';

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("emaJohnStore").collection("products");
  const ordersCollection = client.db("emaJohnStore").collection("orders");
  
 
 app.post('/addProduct', (req, res)=>{
  const products= req.body;
  productsCollection.insertOne(products)
  .then(result=> {
    console.log(result.insertedCount);
    res.send(result.insertedCount)
  })
 })

app.get('/products', (req, res)=> {
  const search=req.query.search
  productsCollection.find({name: 'laptop'})

  .toArray((err, document)=>{
    res.send(document)
  })
})

app.get('/product/:key', (req, res)=> {
  productsCollection.find({key: req.params.key})
  
  .toArray((err, document)=>{
    res.send(document[0])
  })  
})

app.post('/productsByKeys', (req, res)=> {
  const productKeys= req.body;
  productsCollection.find({key: {$in: productKeys}})
  .toArray((err, document)=>{
    res.send(document);
  })
})

app.post('/addOrder', (req, res)=>{
  const order= req.body;
  ordersCollection.insertOne(order)
  .then(result=> {
    res.send(result.insertedCount > 0)
  })
 })


});




app.listen(port)


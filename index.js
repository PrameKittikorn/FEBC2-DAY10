const express = require('express');
const req = require('express/lib/request');
const app = express();
const port = 3000;

app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }));


const products = [];

for (let i = 1; i <= 100; i++) {
  const product = {
    id: i,
    name: `Product ${i}`,
    price: (Math.random() * 100).toFixed(2),
    description: `This is a description for Product ${i}`
  };
  products.push(product);
}

app.get('/add-product', (req, res) => {
  res.render('add-product');
});

app.post('/add-product', (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description
  };
  products.push(newProduct);
  res.redirect('/products');
});


app.get('/products',(req,res) => {
  const limit = parseInt(req.query.limit) || 10 ;
  const page = parseInt(req.query.page) || 1 ;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedProducts = products.slice(startIndex, endIndex);
  console.log(paginatedProducts);

  res.render("products",{paginatedProducts,limit,page});

});

app.get('/', (req, res) => {
  //res.send('Hello World!')
  res.render("index")
});

app.get('/page2',(req,res) => {
  const name = req.query.name;
  const age = req.query.age;
  res.render("page2", {name, age})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

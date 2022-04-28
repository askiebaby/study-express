const express = require('express');
const mockProducts = require('./mockData/products.js');
const app = express();
const port = 3000;

// http://localhost:3000/static/lv.jpeg
app.use('/static', express.static(__dirname + '/public/images'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/products', (req, res) => {
    res.send(mockProducts);
})

app.get("/products/:productId", function(req, res){
    const { productId } = req.params;
    const product = {
        productName: 'Name',
        productId: productId,
        prize: '300'
    }

    res.send(product);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
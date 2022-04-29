const express = require('express');
const app = express();
const port = 3000;

let mockTableForProducts = [{ productName: 'Happy', productId: '1', prize: 100000000 }];

// @example http://localhost:3000/static/lv.jpeg
app.use('/static', express.static(__dirname + '/public/images'));

// express v4.16+ which has merged bodyParser
// so we can use express.json() directly
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/products', (req, res) => {
    res.send(mockTableForProducts);
})

app.get("/product/:productId", function(req, res){
    const { productId } = req.params;
    const result = mockTableForProducts.filter(prd => prd.productId === productId);

    res.send(result);
});

app.post("/product", function(req, res) {
    const { body: product } = req;

    const successfulMessage = {
        code: 200,
        message: "Add Product Successfully"
    }

    const errorMessage = {
        code: 400,
        message: "Add Product failed"
    }

    try {
        if(product.productName && product.prize){
            mockTableForProducts.push(product);
            res.status(200).send(successfulMessage);
        }
    } catch(error){
        console.error('Oops! the product encounter some errors', mockTableForProducts);
        res.status(400).send(errorMessage);
    }
});

app.put("/product/:productId", function(req, res){
    const { body } = req;
    const { productId } = req.params;
    const results = mockTableForProducts.filter(prd => prd.productId === productId);
    const remains = mockTableForProducts.filter(prd => prd.productId !== productId);
    const hasProduct = results.length;

    if (hasProduct) {
        remains.push(body);
        mockTableForProducts = remains;
    }

    const successfulMessage = {
        code: 201,
        message: "Edit product successfully",
        responses: {
            product: mockTableForProducts
        }
    }

    res.status(201).send(successfulMessage);
});

app.delete("/product/:productId", function(req, res){
    const { productId } = req.params;
    const results = mockTableForProducts.filter(prd => prd.productId === productId);
    const remains = mockTableForProducts.filter(prd => prd.productId !== productId);
    const hasProduct = results.length;

    if (hasProduct) {
        mockTableForProducts = remains;
    }

    const successfulMessage = {
        code: 201,
        message: "Delete product successfully"
    }

    res.status(201).send(successfulMessage);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
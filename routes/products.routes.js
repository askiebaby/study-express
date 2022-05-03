const express = require('express');
const router = express.Router();

let mockTableForProducts = [
    { productName: 'Happy', productId: '1', prize: 100000000 },
];

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req, res) => {
    res.send(mockTableForProducts);
});

router.get('/:productId', function (req, res) {
    const { productId } = req.params;
    const result = mockTableForProducts.filter(
        (prd) => prd.productId === productId
    );

    res.send(result);
});

router.post('/', function (req, res) {
    const { body: product } = req;

    const successfulMessage = {
        code: 200,
        message: 'Add Product Successfully',
    };

    const errorMessage = {
        code: 400,
        message: 'Add Product failed',
    };

    try {
        if (product.productName && product.prize) {
            mockTableForProducts.push(product);
            res.status(200).send(successfulMessage);
        }
    } catch (error) {
        console.error(
            'Oops! the product encounter some errors',
            mockTableForProducts
        );
        res.status(400).send(errorMessage);
    }
});

router.put('/:productId', function (req, res) {
    const { body } = req;
    const { productId } = req.params;
    const results = mockTableForProducts.filter(
        (prd) => prd.productId === productId
    );
    const remains = mockTableForProducts.filter(
        (prd) => prd.productId !== productId
    );
    const hasProduct = results.length;

    if (hasProduct) {
        remains.push(body);
        mockTableForProducts = remains;
    }

    const successfulMessage = {
        code: 201,
        message: 'Edit product successfully',
        responses: {
            product: mockTableForProducts,
        },
    };

    res.status(201).send(successfulMessage);
});

router.delete('/:productId', function (req, res) {
    const { productId } = req.params;
    const results = mockTableForProducts.filter(
        (prd) => prd.productId === productId
    );
    const remains = mockTableForProducts.filter(
        (prd) => prd.productId !== productId
    );
    const hasProduct = results.length;

    if (hasProduct) {
        mockTableForProducts = remains;
    }

    const successfulMessage = {
        code: 201,
        message: 'Delete product successfully',
    };

    res.status(201).send(successfulMessage);
});

module.exports = router;

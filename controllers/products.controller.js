let mockTableForProducts = [
    { productName: 'Happy', productId: '1', prize: 100000000 },
];

async function getAll(req, res, next) {
    try {
        // res.json(await programmingLanguages.getMultiple(req.query.page));
        res.send(mockTableForProducts);
    } catch (error) {
        console.error(`Error while getting products`, err.message);
        next(error);
    }
}

async function get(req, res, next) {
    try {
        const { productId } = req.params;
        const result = mockTableForProducts.filter(
            (prd) => prd.productId === productId
        );

        res.send(result);
    } catch (error) {
        console.error(`Error while getting products`, err.message);
        next(error);
    }
}

async function post(req, res, next) {
    const successfulMessage = {
        code: 200,
        message: 'Add Product Successfully',
    };

    const errorMessage = {
        code: 400,
        message: 'Add Product failed',
    };

    try {
        const { body: product } = req;

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
        next(error);
    }
}

async function put(req, res, next) {
    try {
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
    } catch (error) {
        console.error(
            'Oops! the product encounter some errors',
            mockTableForProducts
        );
        res.status(400).send(errorMessage);
        next(error);
    }
}

async function remove(req, res, next) {
    try {
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
    } catch (error) {
        console.error(
            'Oops! the product encounter some errors',
            mockTableForProducts
        );
        res.status(400).send(errorMessage);
        next(error);
    }
}

module.exports = {
    getAll,
    get,
    post,
    put,
    remove,
};

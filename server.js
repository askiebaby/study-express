const express = require('express');
const app = express();
const port = 3000;
const { productsRouter } = require(__dirname + '/routes');

// @example http://localhost:3000/static/lv.jpeg
app.use('/static', express.static(__dirname + '/public/images'));

// express v4.16+ which has merged bodyParser
// so we can use express.json() directly
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/products', productsRouter);

// TODO: Error handler middleware

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

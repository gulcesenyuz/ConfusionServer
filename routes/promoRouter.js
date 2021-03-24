const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    //would be done for all the requests, get, put, post, and delete, on the dishes
    .all(((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    }))

    .get((req, res, next) => {
        res.end(' We will send all the promotions to you!');

    })

    .post((req, res, next) => {
        res.end('will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);

    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotion ');
    })

    .delete((req, res, next) => {
        res.end('Deleting all the promotions!');

    });


promoRouter.route('/:promoId')
    //would be done for all the requests, get, put, post, and delete, on the dishes
    .all(((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    }))

    .get((req, res, next) => {
        res.end(`will send  details of ${req.params.promoId} to you!`);
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /dishes/${req.params.promoId}`);

    })

    .put((req, res, next) => {
        res.write(`Updating the dish ${req.params.promoId} \n`);
        res.end(`will update the dish ${req.body.name} with details ${req.body.description}`);
    })

    .delete((req, res, next) => {
        res.end(`deleting dish : ${req.params.promoId}`);
    });




module.exports = promoRouter;

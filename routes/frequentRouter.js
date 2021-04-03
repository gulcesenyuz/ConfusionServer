const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Frequents = require('../models/frequentq');

const frequentRouter = express.Router();

frequentRouter.use(bodyParser.json());

frequentRouter.route('/')
    .get((req, res, next) => {
        Frequents.find({})
            .then((questions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(questions);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Frequents.create(req.body)
            .then((question) => {
                console.log('Frequent Question posted ', question);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(question);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /questions');
    })
    .delete((req, res, next) => {
        Frequents.remove({})
            .then((question) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(question);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

frequentRouter.route('/:frequentId')
    .get((req, res, next) => {
        Frequents.findById(req.params.frequentId)
            .then((question) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(question);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.questionId);
    })
    .put((req, res, next) => {
        Frequents.findByIdAndUpdate(req.params.frequentId, {
            $set: req.body
        }, { new: true })
            .then((question) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(question);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Frequents.findByIdAndRemove(req.params.frequentId)
            .then((question) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(question);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = frequentRouter;
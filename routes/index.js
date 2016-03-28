var express = require('express');
var router = express.Router();
var config = require('omsapi-config');

var Post = require('../models/post');
var RelationToken = require('../lib/relation-token');
var relationToken = new RelationToken(config.get('token:relationSecret'));

module.exports = function (passport) {
    router.get('/heartbeat', function (req, res) {
        res.send();
    });

    router.post('',
        passport.authenticate('access-token', {session: false, assignProperty: 'payload'}),
        function (req, res, next) {
            var post = new Post({
                userId: req.payload.userId,
                title: req.body.title,
                content: req.body.content
            });

            post.save(function (err) {
                if (err) {
                    return next(err);
                }

                createRelationToken(post, function (relationToken) {
                    var postDto = postMapper(post, relationToken);

                    res.send(postDto);
                });
            });
        });


    router.get('/:postId',
        function (req, res, next) {
            res.send();
        });

    return router;
};

function postMapper(post, relationToken) {
    return {
        id: post._id,
        userId: post.userId,
        title: post.title,
        content: post.content,
        created: post.created,
        relationToken: relationToken
    };
}

function createRelationToken(post, callback) {
    relationToken.create(post._id, post.userId, post.userId, 'post', function (token) {
        callback(token);
    });
}
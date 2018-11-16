//server.js
'use strict'

// import the dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('../../model/comments');

// start the server
var app = express();
var router  = express.Router();

var port = process.env.API_PORT || 3001;

//mongoose.connect('mongodb://commentsuser:password12@ds257579.mlab.com:57579/commentbox');
mongoose.connect('mongodb://localhost:27017/commentbox');

var db = mongoose.connection;

db.on('error',console.error.bind(console, 'MongoDB connection error:'));

// set up the middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Settings to prevent CORS errors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// configure the routes
router.get('/', function (req, res, next) {
    res.json({message: 'API Initialized'});
});

router.route('/comments')
    .get(function (req, res) {
        Comment.find(function (err, comments) {
            if(err) res.send(err);
            res.json(comments);
        });
    })
    .post(function (req, res) {
        var comment = new Comment();
        comment.author = req.body.author;
        comment.text = req.body.text;

        comment.save(function (err) {
            if(err) res.send(err);
            res.status(201);
            res.json({message: 'Comment successfully added'});
        });
    });

router.route("/comments/:comment_id")
    .put(function (req, res) {
        Comment.findById(req.params.comment_id, function(err, comment){
           if(err) res.send(err);
           comment.author = req.body.author ? req.body.author : null;
           comment.text = req.body.text ? req.body.text : null;

           comment.save(function (err) {
               if(err) res.send(err);
           });
           res.status(200);
           res.json({ message: 'Comment has been updated' });
        });
    })
    .delete(function (req, res) {
        Comment.remove({_id: req.params.comment_id}, function (err, comment) {
          if(err) res.send(err);
          res.json({message : 'Comment successfully deleted'});
        })
    });

app.use('/api', router);


app.listen(port, function () {
    console.log(`API running on ort ${port}`);
});
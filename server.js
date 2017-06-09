var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/teste");

var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var Bear = require("./models/bear");


var port = process.env.PORT || 8080;

var router = express.Router();

router.route("/bears")
    .post(function(req, res){
        var bear = new Bear();
        bear.name = req.body.name;

        bear.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message: 'Bear Created;'})
        });
    })
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

router.use(function(req, res, next){
    console.log("something is happening.");
    next();
});

router.get("/", function(req, res){
    res.json({message: "Hello World!!!"});
});

app.use("/api", router);

app.listen(port);

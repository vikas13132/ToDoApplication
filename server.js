var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({ extended: true}));              // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//Model
var Todo = mongoose.model('Todo', {data: 'string'});

//API
//get all todos
app.get('/api/todos', function (req,res) {
    Todo.find(function(err, todos){
        if(err){
            res.send(err);
        }
        res.json(todos);
    });

//    Todo.create({data: 'HoHoHo'}, function(err, todo){
//        if(err){
//            res.send(err);
//        }
//        Todo.find(function(err, todos){
//            if(err){
//                res.send(err);
//            }
//            res.json(todos);
//        });
//    });
});

//post  todos
app.post('/api/todos', function (req,res) {
    Todo.create({data: req.body.text}, function(err, todo){
        if(err){
            res.send(err);
        }
        Todo.find(function(err, todos){
            if(err){
                res.send(err);
            }
            res.json(todos);
        });
    });
});

app.delete('/api/todos:todo_id',function(req, res){
    Todo.remove({_id : req.params.todo_id},function(err, todo){
                if(err){
                    res.send(err);
                }
                Todo.find(function(err, todos){
                    if(err){
                        res.send(err);
                    }
            res.json(todos);
        });
    });
});

app.get('*', function(req, res){
    res.sendfile('./public/index.html');
});


app.listen(8080);
console.log('App is listening on 8080');
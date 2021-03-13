//setting up my sql server
var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'classmysql.engr.oregonstate.edu',
  user  : 'cs290_jonesl7',
  password: '2361',
  database: 'cs290_jonesl7'
});


var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser= require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended; fasle}));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 12193);

app.get('/', function(req, res, next){
  var context = {};
  // pulling the data from SQL
  pool.query('SELECT name, reps, weight, date, unit FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('home', context);
  });
});

//adding data from sql
app.get('/', function(req, res, next){
  var context = {};
  //using the commands for sql to insert data
  pool.query("INSERT INTO workouts(`name`,`reps`,`weight`,`date`, `lbs`) VALUES(?)", [req.query.content], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result.insertId
    res.render('home', context);
  });
});


//pulling updates
app.get('/updates',function(req,res,next){
  var context = {};
  //selects values that match ID
  pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      //updates the values only for the ones wanted to be changed
      pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?",
        [req.query.name || curVals.name, req.query.reps || curVals.reps, rep.query.weight || curVals.weight, rep.query.date || curVals.date, rep.query.lbs || curVals.lbs, rep. req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = result.changedRows
        res.render('home',context);
      });
    }
  });
});

//to reset the table if its needs to be wiped
app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});


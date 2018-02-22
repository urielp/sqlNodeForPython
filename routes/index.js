var express = require('express');
var router = express.Router();
var sqlLite = require('sqlite3');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test', function(req, res, next) {
    console.log(req.body);

    let db = new sqlLite.Database('./db/tracking.db',(err) => {
        if(err) {
            return console.error(err.message);
        }
        console.log('Connected to the in memory SQLite DB');
    });

//db.run('CREATE TABLE tempHum(temp REAL,hum REAL)');
        db.run(`INSERT INTO tempHum(temp,hum)  VALUES(${req.body.temp},${req.body.hum})`, ((err) => {
            if (err) {
                return console.error(err.message)
            }
            console.log(`row was inserted.values : 1)${req.body.temp}C \n2)${req.body.hum}%`)
        }));
    db.close((err) => {
        if(err) {
            return console.error(err.message)
        }
        console.log('Close the data connection');
    })
//****END OF SQL LITE*****

    res.render('index', { title: 'Post',message:`row was inserted.values \n: 1)${req.body.temp}C \n2)${req.body.hum}%` });
});

module.exports = router;

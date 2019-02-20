const express = require('express');
const app = express();
const server = require('http').Server(app);
//const io = require('socket.io')(server);
var sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');


const APPPORT = 80;

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use( bodyParser.json());

app.get('/:serverid/:direction', (req, res) => {
  let db = new sqlite3.Database('serverstats.db');
  try{
    let sql = 'SELECT name, count(name) as count, server FROM emoji WHERE server like \'' + req.params.serverid + '\' GROUP BY name ORDER BY count(name) ' + req.params.direction;
    //let sql = 'SELECT name, count(name), server FROM emoji GROUP BY name ORDER BY count(name) DESC';
    db.all(sql, [], (err, result) => {
      var output = "";
//       result.forEach((row) => {
//         output = output + "<p>:" +row.name + ": -- " + row['count(name)'] + "</p>";
//       })
      res.render('index', { title: 'Emoji Stats', content: result });
    })    
  }
  catch (e){
    console.log(e.message);
  }
  db.close();
  
});

// app.post('/build/:site', (req,res) => {
//     console.log(req.body.LinuxLocation);
//   io.sockets.emit('stdout', {stdout: " Building " + req.params.site + ".ilstu.edu..."});
//   cmd.get(
//     'cd ' + req.body.LinuxLocation + '\n'
//      + 'jekyll build'
//      ,
//     function(err, data, stderr){
//       io.sockets.emit('stdout', {stdout: data});
//     })
// })

server.listen(APPPORT, () => console.log('Example app listening on port ' + APPPORT));

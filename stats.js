var sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('serverstats.db');
  try {
    db.run("CREATE TABLE emoji (user TEXT, name TEXT, server TEXT, timestamp TEXT)", [], (err) =>{
      if (err){
        //throw err;
        console.log("Butts");
      }
    });  
  }
  catch (e){
    console.log("Database exists -- probably");
  }

function addEmoji(values){
  let db = new sqlite3.Database('serverstats.db');

  let sql = "INSERT INTO emoji VALUES (?,?,?,?)";
  
  values.forEach((value) => {
    db.run(sql, value, (err) => {
      if (err){
        console.log(err);
      }
    });    
  })
  
  db.close();
}

function statTop(msg, direction){
  let db = new sqlite3.Database('serverstats.db');
  try{
    let sql = 'SELECT name, count(name) FROM emoji WHERE server like \'' + msg.guild.id + '\' GROUP BY name ORDER BY count(name) ' + direction;
    db.all(sql, [], (err, result) => {
      var output = "";
      result.forEach((row) => {
        output = output + ":" +row.name + ": -- " + row['count(name)'] + "\n";
      })
      msg.channel.send(output);
    })    
  }
  catch (e){
    console.log(e.message);
  }
  db.close();  
}

function statEmoji(msg){
  let db = new sqlite3.Database('serverstats.db');
  try{
    let sql = 'SELECT * FROM emoji';
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows);
    });    
  }
  catch (e){
    console.log(e.message);
  }
  db.close();
}

module.exports = {
  add: {
    emoji: addEmoji
  },
  get: {
    emoji: statEmoji,
    top: statTop
  }
}
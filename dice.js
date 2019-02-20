function roll(params, msg, firstRun){
  if (params.length === 0){
    params[0] = 0;   
  }
  if (params[0].toString().match(/^\d*$/g) && firstRun){
    var a = "";
    msg.channel.fetchMessages({ limit: 50 })
      .then(messages => {
        var rollFound = false;
        var i = 0;
        messages.some((message, c) => {
          if (message.content.includes(msg.author.username)){
            if (i.toString() === params[0].toString()){
              var r = /\*([^\*]*)\*:$/gm;
              var x = r.exec(message.content);
              try{
                roll([x[1]], msg, false); 
              }
              catch (e){
                console.log(e.message);
              }
              rollFound = true;
              c = "stop";
              return c === "stop";
            }          
            i = i+1;
          }     
        })
      if (!rollFound){
        msg.delete();
        msg.channel.send("**" + msg.author.username + "**: Roll not found. Maybe try a lower index.");            
      }
      })      
  }

  if (params[0].toString().match(/^\d*$/g)){
    return;
  }
  var TOTAL = 0;
  var rollTracker = [];
  var diceString = "";
  params.forEach( (part) => {
    diceString = diceString + part;
  })
  var operands = diceString.split(/[\+-]/);
  var operators = [];
  operators = operators.concat(diceString.match(/[\+-]/g));
  operators.unshift("+"); 
  var opIndex = 0;

  operands.forEach( (o) => {
    if (o.includes("d")){
      var dice_num = o.split("d")[0];
      for (var d = 0; d < dice_num; d++){
        var dice_val = o.split("d")[1];
        var roll = Math.round(Math.random() * (dice_val - 1) + 1);
        if (operators[opIndex] === "+"){
          TOTAL = TOTAL + roll;
        }
        else {
          TOTAL = TOTAL - roll;
        }
        if (dice_val === roll.toString()){
          rollTracker.push(operators[opIndex] + roll + ":boom:");   
        }
        else{
          rollTracker.push(operators[opIndex] + roll);
        }
      }
    }
    else {
      if (operators[opIndex] === "+" || opIndex === -1){
        TOTAL = TOTAL + parseInt(o);
      }
      else {
        TOTAL = TOTAL - parseInt(o);
      }
      rollTracker.push(operators[opIndex] + parseInt(o));
    }
    opIndex = opIndex + 1;
  })

  msg.delete();
  if (isNaN(TOTAL)){
    msg.channel.send("**" + msg.author.username + "** rolls their dice off the table \n*[bad input]*");
  }
  else{
    msg.channel.send("**" + msg.author.username + "** rolls *" + diceString + "*:\n" + TOTAL + " *[" + rollTracker.toString().replace("+","").replace(/,/g, " ").replace(/\+/g, "+ ") + "]*");
    if (TOTAL == 69){
      msg.channel.send("*Nice*");
    }    
  }
}

function flip(msg){
  var t = Math.round(Math.random() * (2 - 1) + 1);
  if (t === 1){
    msg.channel.send("**" + msg.author.username + "** flips a coin: *Heads*");
  }
  else {
    msg.channel.send("**" + msg.author.username + "** flips a coin: *Tails*");
  }
  msg.delete();
}

module.exports = {
  roll: roll,
  flip: flip
}
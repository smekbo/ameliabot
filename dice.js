function roll(params, msg){
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

  msg.channel.send(msg.author + " rolls: " + TOTAL + " *[" + rollTracker.toString().replace("+","").replace(/,/g, " ").replace(/\+/g, "+ ") + "]*");
}

module.exports = {
  roll: roll
}
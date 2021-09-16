// ---------------------------------
// TAMBOLA TICKET AND DRAW GENERATOR
// ---------------------------------
// A ticket consists of a random distribution of 15 numbers between 1-90 in a
// 3x9 grid
//
// RULE #1 -  Each row cannot have more than 5 numbers
// RULE #2 -  Each column is assigned a range of numbers only:
//            1-10 can appear only in column 1
//            11-20 can appear only in column 2
//            81-90 can appear only in column 9
// RULE #3 -  In a specific column, numbers must be arranged in ascending order
//            from top to bottom

// -----------------
// TICKET ALGORITHM
// -----------------
// #1 - Maintain array of numbers between 1 and 90
//      Initialize ticket as 3x9 array of 0s
// #2   - Generate random index between 0 and length of array and choose the value
// #3   - Compute index to drop the value into based on RULE #1, RULE #2
// #4   - Remove values used in the ticket from the base array (RULE #1, RULE #2)
// #5   - Repeat till 15 numbers are populated into ticket
// #6 - Sort numbers in every column of the ticket based on RULE #3

// -----------------
// DRAW ALGORITHM
// -----------------
// #1 - Maintain array of numbers between 1 and 90
// #2 - Generate random index between 0 and length of array and choose the value
// #3 - Remove the value from the array
// #4 - Repeat till 90 numbers populated

var _numbers;
var _drawNumbers;

//Ticket generator helper methods
var ticketMethods = {
  //Initialize the numbers array with numbers from 1 to 90
  initializeNumbers: function(){
    _numbers = [];
    for(var a=1;a<=90;a++){
      _numbers.push(a);
    }
  },
  //Get a random number from the remaining numbers in the array
  getNextRandom: function(){
    //Generate a random index instead of a random number from the array
    var idx = getRandomArbitrary(0,_numbers.length);
    //Get the value available at the randomly generated index
    var value = _numbers[idx];
    return value;
  },
  //Given a ticket and random value, determine where the value should go into
  getIndexToThrowInto: function(ticket,value){
    var columnToObserve = value >= 1 && value <= 9 ? 0: 
    value >=10 && value <=19 ? 1 :
    value >=20 && value <=29 ? 2 :
    value >=30 && value <=39 ? 3 :
    value >=40 && value <=49 ? 4 :
    value >=50 && value <=59 ? 5 :
    value >=60 && value <=69 ? 6 :
    value >=70 && value <=79 ? 7 :
    value >=80 && value <=90 ? 8 : 'error'
     //Observe the column based on #Rule-2
    var indices = [];
    //Observe items in all the rows of particular column
    //If any of the values are still 0, choose that row
    for(var row=0;row<3;row++){
      if(ticket[row][columnToObserve] == 0 && ticket[row].filter(function(n){ return n!=0; }).length < 5){
        indices = [0,0];
        indices[0] = row;
        indices[1] = columnToObserve;
      }
    }
    return indices;
  },
  //Given a ticket, ensure that all values in column are sorted based on #Rule-3
  sortColumns: function(ticket){
    //For each column in the ticket
    for(var col=0;col<9;col++){
      //If all three rows are populated
      if(ticket[0][col] != 0 && ticket[1][col] !=0 && ticket[2][col]!=0){
        let tempArray = [ticket[0][col],ticket[1][col],ticket[2][col]]
        tempArray = tempArray.sort(function(a, b){return a - b})
        ticket[0][col] = tempArray[0]
        ticket[1][col] = tempArray[1]
        ticket[2][col] = tempArray[2]
      }
      //If 1st and 2nd rows are populated
      else if(ticket[0][col]!=0 && ticket[1][col]!=0 && ticket[2][col]==0){
        if(ticket[0][col] > ticket[1][col]){
          var temp = ticket[0][col];
          ticket[0][col] = ticket[1][col];
          ticket[1][col] = temp;
        }
      }
      //If 1st and 3rd rows are populated
      else if(ticket[0][col]!=0 && ticket[1][col]==0 && ticket[2][col]!=0){
        if(ticket[0][col] > ticket[2][col]){
          var temp = ticket[0][col];
          ticket[0][col] = ticket[2][col];
          ticket[2][col] = temp;
        }
      }
      //If 2nd and 3rd rows are populated
      else if(ticket[0][col]==0 && ticket[1][col]!=0 && ticket[2][col]!=0){
        if(ticket[1][col] > ticket[2][col]){
          var temp = ticket[1][col];
          ticket[1][col] = ticket[2][col];
          ticket[2][col] = temp;
        }
      }
    }
    return ticket;
  },
  //Based on the ticket, remove based on #Rule-1 and #Rule-3
  removeValuesUsed: function(ticket){
    var numbersToBeRemoved = [];
    for(var col=0;col<9;col++){
      if(ticket[2][col]!=0 && ticket[1][col]!=0 && ticket[0][col]!=0){
        for(var i=col*10+1;i<=col*10+10;i++){
          numbersToBeRemoved.push(i);
        }
      }
      if(ticket[2][col]){
        numbersToBeRemoved.push(ticket[2][col]);
      }
      if(ticket[1][col]){
        numbersToBeRemoved.push(ticket[1][col]);
      }
      if(ticket[0][col]){
        numbersToBeRemoved.push(ticket[0][col]);
      }
    }
    if(numbersToBeRemoved.length){
      numbersToBeRemoved.map(function(val){
        var index = _numbers.indexOf(val);
        if(index!=-1)
          _numbers.splice(index,1);
      });
    }
  }
}

var drawMethods = {
  initializeDrawNumbers: function(){
    _drawNumbers = [];
    for(var a=1;a<=90;a++){
      _drawNumbers.push(a);
    }
  },
  getNextDraw: function(){
    //Generate a random index instead of a random number from the array
    var idx = getRandomArbitrary(0,_drawNumbers.length);
    //Get the value available at the randomly generated index
    var value = _drawNumbers[idx];
    _drawNumbers.splice(idx,1);
    return value;
  }
}

//Generates a random number between two numbers
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var range = [
  { low: 1, high: 9 },
  { low: 10, high: 19 },
  { low: 20, high: 29 },
  { low: 30, high: 39 },
  { low: 40, high: 49 },
  { low: 50, high: 59 },
  { low: 60, high: 69 },
  { low: 70, high: 79 },
  { low: 80, high: 90 },
]

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

module.exports = {
  //Return an array of tickets based on input count
  getTickets: function(count){
      console.log("Kullus fun")
    var tickets = [];
    for(var i=0;i<count;i++){
      ticketMethods.initializeNumbers();
      var ticket = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
      ];
      //Take init 9 nums, 1 for every col
      for(var j=0;j<=8;j++){
        //check Boundary value
        var randomNumber = getRandomArbitrary(range[j].low,range[j].high)
        var indexToThrowInto = ticketMethods.getIndexToThrowInto(ticket,randomNumber);
        //If indices aren't returned, decrement the count to re-run the specific loop
        if(indexToThrowInto.length){
          ticket[indexToThrowInto[0]][indexToThrowInto[1]] = randomNumber;
          ticketMethods.removeValuesUsed(ticket);
        }else{
          j--;
        }
      }
      //Run the loop 15 times to generate 15 numbers on each ticket
      for(var j=1;j<=6;j++){
        var randomNumber = ticketMethods.getNextRandom();
        var indexToThrowInto = ticketMethods.getIndexToThrowInto(ticket,randomNumber);
        //If indices aren't returned, decrement the count to re-run the specific loop
        if(indexToThrowInto.length){
          ticket[indexToThrowInto[0]][indexToThrowInto[1]] = randomNumber;
          ticketMethods.removeValuesUsed(ticket);
        }else{
          j--;
        }
      }
      ticket = ticketMethods.sortColumns(ticket);
      if (ticket[2][3] !== 0 && ticket[1][7] !== 0 && ticket[1][3] === 0 && ticket[2][7] === 0) {
        //   let temp = ticket[2][3]
          ticket[2][7] = ticket[1][7]
          ticket[1][7] = 0
          ticket[1][3] = ticket[2][3]
          ticket[2][3] = 0
      }
      if (ticket[2][2] !== 0 && ticket[1][6] !== 0 && ticket[1][2] === 0 && ticket[2][6] === 0) {
        //   let temp = ticket[2][3]
          ticket[2][6] = ticket[1][6]
          ticket[1][6] = 0
          ticket[1][2] = ticket[2][2]
          ticket[2][2] = 0
      }
      tickets.push(ticket);
    }
    return tickets;
  },
  //Return an array numbers from 1 to 90 in a random distribution for a draw
  getDrawSequence: function(){
    var sequence = [];
    drawMethods.initializeDrawNumbers();
    for(var i=0;i<90;i++){
      sequence.push(drawMethods.getNextDraw());
    }

    return sequence;
  }
}

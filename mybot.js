var SLOPE;
var XBASE;
var YBASE;
var SIDE; // above or below the line?
var considered;
var toConsider;

function new_game() {
   SLOPE = 999.556
}

function make_move() {
       // to disable to opponent, uncomment the next line
       // return PASS;

       board = get_board();
       if (SLOPE = 999.556){
         SLOPE = find_slope(get_my_x(),get_my_y(),get_opponent_x(),get_opponent_y());
      }

       // we found an item! take it!
       if (has_item(board[get_my_x()][get_my_y()])) {
           SLOPE = 999.556
           return TAKE;
       }

       // looks like we'll have to keep track of what moves we've looked at
       toConsider = new Array();
       considered = new Array(HEIGHT);
       for (var i = 0; i < WIDTH; i++) {
           considered[i] = new Array(HEIGHT);
           for (var j = 0; j < HEIGHT; j++) {
               considered[i][j] = 0;
           }
       }

       // let's find the move that will start leading us to the closest item
       move = findMove(new node(get_my_x(), get_my_y(), -1));
       if (move == -1){
         move = oldFindMove(new node(get_my_x(), get_my_y(), -1));
       }
      if (move == -1){
         move = basicMove(new node(get_my_x(), get_my_y(), -1));
       }
       //console.log(move)
       return move;
}
function basicMove(){
   x = get_my_x();
   y = get_my_y();
   remainingItems = new Array();
   for(var i = 0; i<WIDTH;i++){
      for(var j = 0; j<HEIGHT;j++){
         if (board[i][j] > 0){
            remainingItems.push([Math.abs(x-i)+Math.abs(y-j),board[i][j],i,j]);
         }
      }
   }
   minDist = 50;
   maxValue = 0;
   bestCounter = 0;
   for(var counter=0;counter<remainingItems.length;counter++){
      if(remainingItems[counter][0] < minDist && remainingItems[counter][1] > maxValue){
         minDist = remainingItems[counter][0];
         maxValue = remainingItems[counter][1];
         bestCounter = counter;
      }
   }
   if(remainingItems[bestCounter][2] < x)
      return WEST;
   if(remainingItems[bestCounter][2] > x)
      return EAST;
   if(remainingItems[bestCounter][3] < y)
      return NORTH;
   if(remainingItems[bestCounter][3] > y)
      return SOUTH;
}

function findMove(n) {
    // closest item! we will go to it
    board = get_board();
    if (has_item(board[n.x][n.y]) && (n.x-XBASE)*SLOPE*SIDE < (n.y-YBASE)){
      //console.log(n.x,XBASE,SLOPE,SIDE)
      //console.log("eat move")
      return n.move;
    }
    var possibleMove = n.move;

    // NORTH
    if (considerMove(n.x, n.y-1)) {
        if (n.move == -1) {
            possibleMove = NORTH;
        } 
        toConsider.push(new node(n.x, n.y-1, possibleMove));
    } 

    // SOUTH
    if (considerMove(n.x, n.y+1)) {
        if (n.move == -1) {
            possibleMove = SOUTH;
        } 
        toConsider.push(new node(n.x, n.y+1, possibleMove));
    } 

    // WEST
    if (considerMove(n.x-1, n.y)) {
        if (n.move == -1) {
            possibleMove = WEST;
        } 
        toConsider.push(new node(n.x-1, n.y, possibleMove));
    } 

    // EAST 
    if (considerMove(n.x+1, n.y)) {
        if (n.move == -1) {
            possibleMove = EAST;
        } 
        toConsider.push(new node(n.x+1, n.y, possibleMove));
    } 

    // take next node to bloom out from
    if (toConsider.length > 0) {
        var next = toConsider.shift();
        return findMove(next);
    }

    // no move found

    return -1;
 }
function oldFindMove(n) {
    // closest item! we will go to it
    board = get_board();
    if (has_item(board[n.x][n.y])){
      //console.log(n.x,XBASE,SLOPE,SIDE)
      //console.log("eat move")
      return n.move;
    }
    var possibleMove = n.move;

    // NORTH
    if (considerMove(n.x, n.y-1)) {
        if (n.move == -1) {
            possibleMove = NORTH;
        } 
        toConsider.push(new node(n.x, n.y-1, possibleMove));
    } 

    // SOUTH
    if (considerMove(n.x, n.y+1)) {
        if (n.move == -1) {
            possibleMove = SOUTH;
        } 
        toConsider.push(new node(n.x, n.y+1, possibleMove));
    } 

    // WEST
    if (considerMove(n.x-1, n.y)) {
        if (n.move == -1) {
            possibleMove = WEST;
        } 
        toConsider.push(new node(n.x-1, n.y, possibleMove));
    } 

    // EAST 
    if (considerMove(n.x+1, n.y)) {
        if (n.move == -1) {
            possibleMove = EAST;
        } 
        toConsider.push(new node(n.x+1, n.y, possibleMove));
    } 

    // take next node to bloom out from
    if (toConsider.length > 0) {
        var next = toConsider.shift();
        return findMove(next);
    }

    // no move found

    return -1;
 }

function considerMove(x, y) {
    if (!isValidMove(x, y)) return false;
   // console.log(x,y)
    if (considered[x][y] > 0) return false;
    considered[x][y] = 1;
    return true;
}

function isValidMove(x, y) {
     if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT)
         return false;
     return true;
 }

function node(x, y, move) {
    this.x = x;
    this.y = y;
    this.move = move;
}

function find_slope(my_x, my_y, their_x, their_y) {
   board = get_board();
   slope = new Array();
   XBASE = (my_x + their_x) / 2;
   YBASE = (my_y + their_y) / 2;
   for(var i=1; i<=WIDTH; i++){
      slope.push((i - YBASE)/(1-XBASE));
      slope.push((i - YBASE)/(HEIGHT-XBASE));
   }
   for(var j=1; j<=HEIGHT; j++){
      slope.push((1 - YBASE)/(j-XBASE));
      slope.push((WIDTH - YBASE)/(j-XBASE));
   }
//   console.log("slope",slope.length)
   // eliminate duplicates
   var u = {}, newSlope = [];
   for(var i = 0; i < slope.length; i++){
      duplicate = 0;
      for(var j = 0; j < newSlope.length; j++){
         if(slope[i]==newSlope[j])
            duplicate = 1;
      }
      if(duplicate == 0)
         newSlope.push(slope[i])
   }
//   console.log(newSlope)

   multiplier = 1
   if (my_x == their_x && my_y == their_y){
      multiplier = 2 //
   }
   arrays = new Array(multiplier*newSlope.length)
   sides = new Array(multiplier*newSlope.length) 
   for (var i=0;i<multiplier*newSlope.length;i++){
            arrays[i] = better_position(my_x, my_y, their_x, their_y, newSlope[i],3.1416*multiplier); //junk variable
         }
   for (var i=newSlope.length;i<multiplier*newSlope.length;i++){ // this only comes up if multiply = 2
            arrays[i] = better_position(my_x, my_y, their_x, their_y, newSlope[i-newSlope.length],-3.1416*multiplier); //junk variable -- only comes up if m
            //console.log("here?", i)
         }
          //  console.log("here2?",multiplier,newSlope.length)

   // find item counts
   totalItems = multiplier*get_number_of_item_types();
   my_score = new Array(totalItems+1);
   their_score = new Array(totalItems+1);
   for(var i=0;i<totalItems;i++){
         my_score[i+1] = get_my_item_count(i+1);
         their_score[i+1] = get_opponent_item_count(i+1);
   }
   // find best board arrangement
   scores = new Array()
   for(var i=0; i<multiplier*newSlope.length;i++){
      scores.push(score(my_score, their_score,arrays[i]));   
   }
   //console.log(scores)
   var index_of_max_of_array = 0;
   max_score = -999;
   for(var i in scores) {
      if (scores[i] > max_score) {
         max_score = scores[i];
         index_of_max_of_array = i;
      }
   }
   chosenSlope = newSlope[index_of_max_of_array]
   if(multiplier == 1)
      SIDE = determineSide(my_x, my_y, their_x, their_y,chosenSlope);
   else{
      SIDE = arrays[index_of_max_of_array][0];
    //  console.log(index_of_max_of_array,arrays[index_of_max_of_array],scores,SIDE);

   }
   return chosenSlope;
}
function score(mine, yours, battle) {
  //figure out who's gonna win
  thescore = 0;
       // console.log(mine,battle)

   for(var i=1;i<mine.length;i++){
      if(mine[i] + battle[i] > yours[i]){
         thescore += 2; //add 2 pts if gonna win
      }
      if(mine[i] + battle[i] == yours[i]){
         thescore += 1; // add 1 point if gonna tie
      }
   }
   sum_mine = 0; 
      for(var i in mine) { 
         if (!isNaN(mine[i])){
            sum_mine += mine[i]; }}
   sum_battle = 0; 
      for(var i in battle) { 
         if (!isNaN(battle[i])) {
            sum_battle += battle[i];} }
   //   console.log(sum_mine,sum_battle, "eat me",thescore)
   thescore += (sum_mine + sum_battle) / ((mine.length - 1)^2); // style points for getting more apples.
  // console.log(thescore)
   return thescore;
}
function determineSide(my_x, my_y, their_x, their_y, slope_x) {
   multiply = 0;
   if((their_y-YBASE) - (their_x-XBASE)*slope_x < (my_y-YBASE) - (my_x-XBASE)*slope_x){
      multiply = 1;
   }
   else if ((their_y-YBASE) - (their_x-XBASE)*slope_x > (my_y-YBASE) - (my_x-XBASE)*slope_x){
      multiply = -1;
   }
   return multiply;
}
function better_position(my_x, my_y, their_x, their_y, slope_x, multiply) {
   if(multiply == 3.1416){
      multiply = determineSide(my_x, my_y, their_x, their_y, slope_x);
   }
   else{
      multiply /= (2*3.1416) //set multiply to 1 or -1
   }
   var board = get_board();
   XBASE = (my_x + their_x) / 2;
   YBASE = (my_y + their_y) / 2;
   var my_items = []; while(my_items.push(0) < get_number_of_item_types()+1);
   var their_items = []; while(their_items.push(0) < get_number_of_item_types()+1);
  //    console.log("check",my_items,their_items)
   // are they above or below the line?
      for(var i = 0; i<WIDTH;i++){
         for(var j = 0; j<HEIGHT;j++){
           // console.log(board[i][j],i,XBASE,slope_x,multiply,j,YBASE);
           // console.log((i-XBASE)*slope_x*multiply < (j-YBASE));
            if((i-XBASE)*slope_x*multiply < (j-YBASE)){
               my_items[board[i][j]]++;
            }
            else {
               their_items[board[i][j]]++;
            }

      }
   }

  // console.log(multiply)
   net_items = new Array(); for(var i=0; i < my_items.length;i++){net_items.push(my_items[i] - their_items[i])};
   net_items[0] = multiply
  // console.log("net_tems",my_items,their_items,net_items,get_number_of_item_types())
   return net_items;
}

// Optionally include this function if you'd like to always reset to a 
// certain board number/layout. This is useful for repeatedly testing your
// bot(s) against known positions.
//
//function default_board_number() {
//    return 123;
//

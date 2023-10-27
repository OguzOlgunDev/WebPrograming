
var buttonColours = ["red", "blue", "green", "yellow"];
// These are the arrays where game pattern and userSelectedPattern is stored
var gamePattern = [];
var userClickedPattern = [];

// these veriabile using for falloing the track of game.
var gameStarted = false;
var gameInProgress = false;
var level = 1;



// This function chosing a random colour for the game pattern
function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColours[randomNumber];
  return randomChosenColor;
}


// This function is for fallowing game pattern
function addGamePattern(){
  chosenColor = nextSequence();
  animation(chosenColor);
  gamePattern.push(chosenColor);
  playSound(chosenColor);
}


// This function is using for starting the game when user press the key
function startGame() {
  if (!gameStarted) {
    gameInProgress = true;
    gameStarted = true;
    addGamePattern();
  }
}


// After game over it resets the game and if user press a key this function will be executed
function restartGame() {
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 1;
  startGame()
}

// It is an event listener for keydown on keybord. If statement is using for disable the keydown during the game until game over state.
$(document).keydown(function() {
   if (!gameStarted && !gameInProgress) {
    setTimeout(function() {
    startGame();
    gameInProgress = true;
     $("#level-title").text("You are in level "+ level);
   }, 200);
 }//if game already started it will restart game.
 else if (gameStarted && !gameInProgress){
    setTimeout(function() {
    restartGame();
     $("#level-title").text("You are in level "+ level);
   }, 200);

  }
});

// It is an event listener for clicking and chosing the patter all the game scenorios are written where.
// If you want you can rearrenge the if conditions for more redeable code maybe nested if conditions for this example I will not do that bacause it is simple.
$(".btn").click(function() {
  var clickedColor = $(this).attr("id");

    // It is a condition where  user and computer pattern length not same but the user still correcting true during game.
    if (userClickedPattern.length  !== gamePattern.length && arraysAreEqual(userClickedPattern,gamePattern)){
      animation(clickedColor);
      playSound(clickedColor);
      userClickedPattern.push(clickedColor);
    }

      // It is a condition where  user and computer pattern length same and the user chose true path during game.
    if(userClickedPattern.length  === gamePattern.length && arraysAreEqual(userClickedPattern,gamePattern)){

      setTimeout(function() {
        $("#level-title").text("You are in level "+ (level+1));
       addGamePattern();
       level += 1;
       userClickedPattern = [];
     }, 1000);
   }
     // It is a condition where  user and computer pattern length not same and the user chose false path during game.
    if(userClickedPattern.length  !== gamePattern.length && arraysAreEqual(userClickedPattern,gamePattern) == false){
      playSound("wrong");
      $("#level-title").text("Press a key to restart game");
      gameInProgress = false;
    }

     // It is a condition where  user and computer pattern length same and the user chose false path during game.
    if(userClickedPattern.length  === gamePattern.length && arraysAreEqual(userClickedPattern,gamePattern) == false){
      playSound("wrong");
      $("#level-title").text("Game Over press a key to restart game");
      gameInProgress = false;
    }
});



// This function make animation it is a helper function to create animation
function animation(buttonName){
  $("#" + buttonName).animate({
    opacity: '0'
  }, 100); // 1000 milliseconds = 1 second
  $("#" + buttonName).animate({
    opacity: '1'
  });
}

// This is a helper function which is  checking the equality userChose and Computer pattern we must send firs parameter as userChose otherwise it wont work.
function arraysAreEqual(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

// This is a helper function which is playing the sound.
function playSound (name){
  buttonSound = new Audio("./sounds/"+ name + ".mp3")
  buttonSound.play();
}

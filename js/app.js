

 //Variables defined

 //list that holds all cards
 const cardList= ["fa fa-diamond",
   "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-anchor",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-diamond",
    "fa fa-bomb",
    "fa fa-leaf",
    "fa fa-bomb",
    "fa fa-bolt",
    "fa fa-bicycle",
    "fa fa-paper-plane-o",
    "fa fa-cube"]

//constant variables
const cardDeck = document.querySelector(".deck");
const stars = document.querySelectorAll(".fa.fa-star");
const restartButton = document.querySelector(".restart");
const closeButton = document.querySelector(".close");
const againButton = document.querySelector(".again");
const modalContent = document.querySelector("#mText");
const yourTime = document.querySelector("#time");
const rating = document.querySelector("#sRating");
const clock = document.querySelector(".clock");
const finalMoves = document.querySelector("#moveCount");



let moves = document.querySelector(".moves");
let count = 0;
let openCards = [];
let matchedCards = [];
let sec = 0;
let min = 0;
let time;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Creates deck and HTML
 *  - diplays cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method and the cardList array
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 builds card deck - adds inner html and displays on screen
also calls the clicked(card) event listener
*/
function build() { //should this be play game
  const shuffledCards = shuffle(cardList);

  for (let i = 0; i < cardList.length; i++) {
    let card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = "<i class= ' "+ cardList[i]+ "'> </i>";
    cardDeck.appendChild(card);

    clock.innerHTML = "0:00";
    clicked(card);
  };
};


/*
- listens for card click
- checks to see if the cards is already open or matched    (stops user from clicking on the same card twice and creating a match)
- pushes card selection to openCards array
- adds open show to class list
- checks for match
*/
function clicked(card) {
  card.addEventListener("click", function() {
      if (openCards.length < 2 ) {
      //if(this.classList !=contain("open")// "card")
        if (this.classList.contains("open") || this.classList.contains("match")) {
      // do nothing......
        } else {
          card.classList.add("open","show");
          openCards.push(this);
          checkMatch();
      };
    };
 });
};



function checkMatch() {
  if (openCards.length === 2) {
    // compares the class name of open card 1 to class name of open card 2.
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
      openCards[0].classList.add("match");
      openCards[1].classList.add("match");
      matchedCards.push(openCards[0]);
      matchedCards.push(openCards[1]);
      openCards = [];
      winner();
    } else {

       //adds delay to non matching cards 1 Second
      setTimeout(function () {
      openCards[0].classList.remove("open", "show");
      openCards[1].classList.remove("open", "show");
      openCards = [];
      } , 1000);
    };
    countMoves();
  };
};


/*
timer function
- interval is set up to cotinuously time the Game
- it starts counting after first move and the game has begun
- once seconds equals 60 in minutes are incremented and the seconds count begins again
*/
function timer() {
  if (count === 1) {
    time = setInterval(function () {
    sec ++;

      if (sec === 60) {
        sec = 0;
        min++;
      };
        clockFace();

    }, 1000);
  };
};


//displays timeer
function clockFace(){
  if (sec < 10){
    clock.innerHTML = min + ":0" + sec
  }else {
    clock.innerHTML = min + ":" + sec
  }
}

/*
clear timer function
clears the interval and stops clock
-
*/
function clearTimer(timer) {
  clearInterval(time);
};


/*
starts timer
counts how many moves the user makes
tracks progress and removes a star raiting when the user has reaches a 15 moves

*/
function countMoves() {
  count++;
  moves.innerHTML = count;
  timer();
  if (count === 15){
      stars[0].classList.remove("fa","fa-star");
  } else if (count === 25) {
      stars[1].classList.remove("fa","fa-star");
  };
};


/*
when a user sucsesfully matches all 16 cards they trigger a modal which advises them of their score and asks if they would like to play again
*/
function winner() {
  const popUp = document.getElementById('popUp');
  if  (matchedCards.length === 16) {
    modalContent.innerText = "You're a Winner!"
    yourTime.innerHTML = "It took you "+ min + " minutes and " + sec +" seconds to complete"
    clearInterval(time);
    moveCount.innerHTML = "It took you " + (count + 1) + " moves!"
    rating.innerHTML = document.querySelector(".stars").innerHTML;
    rating.setAttribute('style','list-style-type: none; display: inline-block;');

    popUp.style.display = "block";
    clearTimer(time);

  };
  modalOptions(popUp);
};


function modalOptions(popUp) {
  // close modal
  closeButton.addEventListener("click", function() {
    popUp.style.display = "none";
    reBuild();
  });

  //play again
  againButton.addEventListener("click", function(){
    popUp.style.display = "none";
    reBuild();
  });
};

/* restrst the game when user clicks */
function restart() {
  restartButton.addEventListener("click", function(event) {
    reBuild();
  });
};


function reBuild() {
// clears array and all visable elements
  matchedCards = [];
  cardDeck.innerHTML = " ";
  moves.innerHTML = 0;
  count = 0;
  clock.innerHTML = "0:00";

//clears timer and reset sec's and Min's to 0
  clearTimer(time);
  sec = 0;
  min = 0;
//starts the game again by building the deck
  build();

  stars.forEach(function(stars) {
    stars.classList.add("fa","fa-star");
  });
};

// begins game 
function playGame(){
  build();
  restart();
};

playGame();

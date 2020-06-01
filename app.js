let upperKeys = "#keyboard-upper-container";
let lowerKeys = "#keyboard-lower-container";

const RANDOM_QUOTE_THING = "http://api.quotable.io/random";

//Grab Quotes and shit
function getQuote() {
  return fetch(RANDOM_QUOTE_THING)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function getNextQuote() {
  const quote = await getQuote();
  console.log(quote);
}

getNextQuote();
console.log(getNextQuote);
//How to link these?
let sentences = [
  "It's the job thats never started that takes the longest to finish.",
  "Moonlight drowns out all but the brightest stars.",
  "Do not scorn pity that is the gift of a gentle heart.",
  "All we have to decide is what to do with the time that is given us.",
  "One who cannot cast away a treasure at need is in fetters.",
  "There are some things that it is better to begin than to refuse, even though the end may be dark.",
];
let timerOn = false;
let array = 0;
let writing = sentences[array];
let letterPlace = 0;
let letter = writing.substring(letterPlace, letterPlace + 1);
let startDate;
let startTime;
let errors = 0;


$("#upper-case").hide();
$(document).keydown(function (e) {
  if (e.which === 16) {
    $(upperKeys).show();
    $(lowerKeys).hide();
  }
});
//Hiding upper^


$(document).keyup(function (e) {
  if (e.which === 16) {
    $(lowerKeys).show();
    $(upperKeys).hide();
  }
});

$(document).keypress(function (e) {
  let key = $("#" + e.which);
  $(key).css("background-color", "yellow");

  $(document).keyup(function (e) {
    $(key).css("background-color", "#f5f5f5");
  });
});

$("#sentence").text(writing);
$("#target-letter").text(letter);

$(document).keypress(function (e) {
  if (timerOn === false) {
    startDate = new Date();
    startTime = startDate.getTime();
    timerOn = true;
  }
  if (e.which == sentences[array].charCodeAt(letterPlace)) {
    let correct = $('<span class="green">✓</span>');
    $(correct).appendTo("#feedback");
    $("#yellow-block").css("left", "+=17.3px");
    letterPlace++;
    letter = writing.substring(letterPlace, letterPlace + 1);
    $("#target-letter").text(letter);
    if (letterPlace === writing.length) {
      array++;
      if (array === sentences.length) {
        
        let datedate = new Date();
        
        let timetime = datedate.getTime();
        
        let minutes = (timetime - startTime) / 60000;
        
        wpm = Math.round(54 / minutes - 2 * errors);
       
        var yesorno = confirm(
          `You typed ${wpm} words per minute. Play again?`
        );
        if (yesorno == true) {
          location.reload();
        }
      } else {
        writing = sentences[array];
        $("#sentence").text(writing);
        letterPlace = 0;
        letter = writing.substring(letterPlace, letterPlace + 1);
        $("#target-letter").text(letter);
        $("#yellow-block").css("left", "15px");
        $("#feedback").text("");
      }
    }
  } else {
    let wrong = $('<span class="red">x</span>');
    $(wrong).appendTo("#feedback");
    errors++;
  }
});

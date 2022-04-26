/**
Haiku Generator
Pippin Barr
A program that generates a random haiku based on pre-existing arrays
of lines of the correct syllable length. Also swaps out lines if the user
clicks on them with a fade in and out effect.
*/

"use strict";

// Our pre-made haiku lines
let haikuLines = {
  fiveSyllables: [
    "Delightful display,",
    "Like crunchy cornflakes,",
    "The chill, worming in,",
    "You and me alone,",
    "Strokes of affection,",
    "Calm as a river,",
    "Mellow, mild, May day,",
    "Beautiful sunrise,",
    "I was in fire,",
    "Coolness fills the air,",
    "Picking up pebbles,",
    "Your eyes are fire,",
    "Warm fall afternoons,",
    "When it's all over,",
    "Yellow flame flickers,",
    "Fresh spring morning time,",
    "Friends forever in time,",
    "Glorious sunset,",
    "Rain hits my window,",
    "Full strawberry moon,"
    "To the sun/'s glory.",
    "Beauty in decay.",
    "Summer tongue awakes.",
    "Peace and quiet reigns.",
    "Keep love’s bonds so strong.",
    "Blue summer skies reign.",
    "Summer's on her way!",
    "I wait for day's start.",
    "I sleep peacefully.",
    "Fall weather is here",
    "Pure relaxation.",
    "Scarred by beauty.",
    "Crickets singing tunes.",
    "Will it be better?",
    "Love grows ever strong.",
    "The presence of peace.",
    "Love forever lasting!",
    "Awaiting the moon.",
    "A heavenly sound.",
    "High tides fill the dune."
  ],
  sevenSyllables: [
    "Snowdrops bow their pure white heads,",
    "Gold leaves rustle underfoot,",
    "Shock, pleasure, bursting within,",
    "Madness of world locked away,",
    "Light and tenderly expressed,",
    "Tranquility in my heart,",
    "Calling children out to play,",
    "On a warm summer morning.",
    "The room was dark and somber,",
    "Scarves and sweaters everywhere,",
    "Or seashells strewn on soft sand,",
    "Their image burnt into my soul,",
    "Crisp cool eves with harvest moons,",
    "What will begin in its place?",
    "Shadows dance upon the wall,",
    "That's the sound of solitude,",
    "Bonded by our hearts and souls,",
    "Decorating the night sky...",
    "Angels tap-dancing softly,",
    "Ushers in hot days of June,"
  ]
};

// Our three elements on the page that contain each line of the poem
let line1 = document.getElementById(`line-1`);
let line2 = document.getElementById(`line-2`);
let line3 = document.getElementById(`line-3`);

// Set up the starting lines
setupLines();
// Listen for clicks on each element and respond by changing them
addListeners();

/**
Puts a randomly chosen haiku line in each line of the poem in HTML
*/
function setupLines() {
  line1.innerText = random(haikuLines.fiveSyllables);
  line2.innerText = random(haikuLines.sevenSyllables);
  line3.innerText = random(haikuLines.fiveSyllables);
}

/**
Adds event listeners for changing each line of the poem
*/
function addListeners() {
  line1.addEventListener(`click`, changeLine);
  line2.addEventListener(`click`, changeLine);
  line3.addEventListener(`click`, changeLine);
}

/**
Triggers a fade out when a line is clicked
*/
function changeLine(event) {
  fadeOut(event.target, 1);
}

/**
Reduces the opacity of the provided element until it reaches zero
then changes its line and triggers a fade in
*/
function fadeOut(element, opacity) {
  // Change the opacity of the line
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  // Check if the opacity is greater than 0...
  if (opacity > 0) {
    // If so, keep fading on the next frame
    // Note the use of an anonymous function here so we can pass
    // arguments to fadeOut()
    requestAnimationFrame(function() {
      fadeOut(element, opacity);
    });
  }
  else {
    // If not, we can switch lines and fade in...
    // Set a new line of poem for the element
    setNewLine(element);
    // Trigger a fade in
    fadeIn(element, 0);
  }
}

/**
Increases the opacity of the provided element until it reaches
1 and then stops.
*/
function fadeIn(element, opacity) {
  // Increase the opacity
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  // Check if opacity is still less than 1
  if (opacity < 1) {
    // Keep fading. Note the use of an anonymous function here so we
    // can pass arguments to fadeIn()
    requestAnimationFrame(function() {
      fadeIn(element, opacity);
    });
  }
  else {
    // Do nothing - we're done!
  }
}

/**
Sets the text of the element to a randomly chosen haiku line, accounting for
syllables
*/
function setNewLine(element) {
  if (element === line1 || element === line3) {
    // If the element is line1 or line3, use five syllables
    element.innerText = random(haikuLines.fiveSyllables);
  }
  else {
    // If the element is line2 use seven
    element.innerText = random(haikuLines.sevenSyllables);
  }
}

/**
A helper function that returns a random element from the provided array
*/
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
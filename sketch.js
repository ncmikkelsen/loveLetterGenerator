var book;
var bookSplit = [];
var splitChar = "¤";
var wordMode = true;
var resultWords = [];
var resultIndexes = [];
var time = 0;
var wordPos;


function preload() {
  book = loadStrings('assets/wutheringheights.txt');

}

function setup() {
  for (var i = 0; i < book.length; i++) {
    words = split(book[i], " ");
    for(var j = 0; j < words.length; j++){
      bookSplit.push(words[j]);
    }
  }
  println(book.length);
  println(bookSplit.length);
  createCanvas(400, 400);
  background(255);
  textAlign(CENTER);
  search(0, book.length);
  prepare();
}

function draw() {
  if (wordPos < 0) {
    resultWords = [];
    resultIndexes = [];
    search(0, book.length);
    prepare();
  } else if (millis() - time > 1000) {
    display();
  }
}


function search(lo, hi) {
  var high = hi;
  var low = lo;
  var index = int((constrain(low + ((high - low) / 2) + random(-2, 3), low, high)));
  if (random() < 0.5) {
    high = index - 1 ;
  } else {
    low = index + 1 ;
  }
  resultIndexes.push(index);
  resultWords.push(bookSplit[index]);
  if (low < high) {
    search(low, high);
  }
}

function prepare() {
  var loveIndex = resultWords.indexOf("love");
  resultWords.splice(0, 0, "", "I looked left and right", "and found");
  resultIndexes.splice(0, 0, "", "I looked left and right", "and found");
  if (loveIndex >= 0) {
    resultWords.splice(loveIndex, resultWords.length - loveIndex + 1, "and finally love");
    resultIndexes.splice(loveIndex, resultWords.length - loveIndex + 1, "and finally love");
  } else {
    resultWords.push("but never love");
    resultIndexes.push("but never love");
  }
  wordPos = height + (35 * resultWords.length);
  println(resultWords.length);
  println(resultWords);
  println(resultIndexes.length);
  println(resultIndexes);


}

function display() {
  background(255);
  for (var i = 1; i < resultWords.length; i++) {
    if (wordMode) {
      text(resultWords[resultWords.length - i], width / 2, wordPos - (i * 30));
    } else {
      text(resultIndexes[resultWords.length - i], width / 2, wordPos - (i * 30));
    }
  }
  time = millis();
  wordPos -= 30;
}



function mouseClicked() {
  wordMode = !wordMode;
}
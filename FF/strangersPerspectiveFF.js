/// Created by Siori Kitajima
/// https://siorikitajima.com/
/// for http://strangersinmyhead.info/
/// GNU GENERAL PUBLIC LICENSE V3
/// https://www.gnu.org/licenses/gpl-3.0.en.html

///////////////////////// CONFIG

var spriteWidth = 200; // Character animation sprite width
var spriteHeight = 300; // Character animation sprite height
var spriteFrames = 6; // Character animation sprite frame number
// Responsive screen sizes
var screenWidthTablet = 800;
var screenWidthPhone = 480;
// Character speed for each screen sizes
var speedDefault = 0.3;
var speedTablet = 0.2;

///////////////////////// END CONFIG

var pauseSwitch = true;
var infoSwitch = false;
var loadSwitch = false;
var colorSwitch = 7; // Default to set as Gray
var charaInARow; // Total number of characters in the row each side at once

var mainFont, bodyFont;
var topRowR, topRowL, secondRowR, secondRowL, thirdRowR, thirdRowL;

// DOM elements
var bottomPanel, topPanel;
var prevIssue, nextIssue, issueHDiv;
var issueH, issueP, issueHM, issuePM;
var GroundImg;
var learnLink, helpLink, voicesLink, shareLink, copiedMsg;

//JSON + data
var issueData = {};
var groundImgData = {};
var playListR = []; var playListL = [];

var icons = [
  {name:'learn', img:'images/infoIcons_learn.png'}, 
  {name:'help', img:'images/infoIcons_help.png'}, 
  {name:'voices', img:'images/infoIcons_voices.png'}];

// Charactor Data
var charactorList = [
  { name:'peter', id:0,
    anime: ['peter_pink', 'peter_emerald', 'peter_yellow', 'peter_purple', 'peter_orange', 'peter_blue', 'peter_red', 'peter_gray', 'peter_teal', 'peter_coral', 'peter_lavendar', 'peter_sky', 'peter_maroon', 'peter_green']},
  { name:'artsy', id:1,
    anime: ['artsy_pink', 'artsy_emerald', 'artsy_yellow', 'artsy_purple', 'artsy_orange', 'artsy_blue', 'artsy_red', 'artsy_gray', 'artsy_teal', 'artsy_coral', 'artsy_lavendar', 'artsy_sky', 'artsy_maroon', 'artsy_green']}, 
  { name:'snow', id:2,
    anime: ['snow_pink', 'snow_emerald', 'snow_yellow', 'snow_purple', 'snow_orange', 'snow_blue', 'snow_red', 'snow_gray', 'snow_teal', 'snow_coral', 'snow_lavendar', 'snow_sky', 'snow_maroon', 'snow_green']}, 
  { name:'wasabi', id:3,
    anime: ['wasabi_pink', 'wasabi_emerald', 'wasabi_yellow', 'wasabi_purple', 'wasabi_orange', 'wasabi_blue', 'wasabi_red', 'wasabi_gray', 'wasabi_teal', 'wasabi_coral', 'wasabi_lavendar', 'wasabi_sky', 'wasabi_maroon', 'wasabi_green']}, 
  { name:'zen', id:4,
    anime: ['zen_pink', 'zen_emerald', 'zen_yellow', 'zen_purple', 'zen_orange', 'zen_blue', 'zen_red', 'zen_gray', 'zen_teal', 'zen_coral', 'zen_lavendar', 'zen_sky', 'zen_maroon', 'zen_green']}, 
  { name:'cora', id:5,
    anime: ['cora_pink', 'cora_emerald', 'cora_yellow', 'cora_purple', 'cora_orange', 'cora_blue', 'cora_red', 'cora_gray', 'cora_teal', 'cora_coral', 'cora_lavendar', 'cora_sky', 'cora_maroon', 'cora_green']}, 
  { name:'dingus', id:6,
    anime: ['dingus_pink', 'dingus_emerald', 'dingus_yellow', 'dingus_purple', 'dingus_orange', 'dingus_blue', 'dingus_red', 'dingus_gray', 'dingus_teal', 'dingus_coral', 'dingus_lavendar', 'dingus_sky', 'dingus_maroon', 'dingus_green']}, 
  { name:'guru', id:7,
    anime: ['guru_pink', 'guru_emerald', 'guru_yellow', 'guru_purple', 'guru_orange', 'guru_blue', 'guru_red', 'guru_gray', 'guru_teal', 'guru_coral', 'guru_lavendar', 'guru_sky', 'guru_maroon', 'guru_green']}
];

// Color List + Array (Total 700)
var colorList = [
    {'id':0, 'name':'_pink', 'number':23, 'r':255, 'g': 53, 'b':98},
    {'id':1, 'name':'_emerald', 'number':6, 'r':31, 'g': 85, 'b':92},
    {'id':2, 'name':'_yellow', 'number':6, 'r':227, 'g': 132, 'b':0},
    {'id':3, 'name':'_purple', 'number':12, 'r':86, 'g': 16, 'b':86},
    {'id':4, 'name':'_orange', 'number':12, 'r':224, 'g': 96, 'b':46},
    {'id':5, 'name':'_blue', 'number':6, 'r':44, 'g': 63, 'b':133},
    {'id':6, 'name':'_red', 'number':4, 'r':202, 'g': 27, 'b':56},
    {'id':7, 'name':'_gray', 'number':590, 'r':34, 'g': 34, 'b':34},
    {'id':8, 'name':'_teal', 'number':7, 'r':0, 'g': 147, 'b':139},
    {'id':9, 'name':'_coral', 'number':4, 'r':233, 'g': 115, 'b':109},
    {'id':10, 'name':'_lavendar', 'number':18, 'r':139, 'g': 55, 'b':138},
    {'id':11, 'name':'_sky', 'number':8, 'r':30, 'g': 145, 'b':178},
    {'id':12, 'name':'_maroon', 'number':2, 'r':145, 'g': 0, 'b':55},
    {'id':13, 'name':'_green', 'number':2, 'r':76, 'g': 133, 'b':0}
];
var colorArray = [];

function preload() {
    //JSON
    issueData = loadJSON('../json/issueData.json');
    groundImgData = loadJSON('../json/groundImgData.json');

    // Push 700 colors into the array
    for(var c=0; c<colorList.length;c++){
      for(var cn=0; cn<colorList[c].number;cn++){
        colorArray.push(colorList[c].id);
    }}

    clearCache();

    // Prepare all charactor animations x 14 Colors
    for(var ch=0; ch<charactorList.length;ch++){
      for(var c=0; c<colorList.length;c++){
        animName = charactorList[ch].name + colorList[c].name + '_anim';
        animImgA = '../walkersLiOS/' + charactorList[ch].name + colorList[c].name +'.png';
        animName = loadSpriteSheet(animImgA, spriteWidth, spriteHeight, spriteFrames);
        charactorList[ch].anime[c] = loadAnimation(animName);
      }
    }

    //Fonts
    mainFont = loadFont('../assets/PlayfairDisplay-BoldItalic.otf');
    bodyFont = loadFont('../assets/Montserrat-Regular.otf');

    //Dom elements
    bottomPanel = select('#bottomPanel');
    topPanel = select('#topPanel');
    prevIssue = select('#prevIssue');
    nextIssue = select('#nextIssue');
    issueHDiv = select('#issueHDiv');
    issueH = select('#h1Screen');
    issueHM = select('#h1Mobile');
    issueP = select('#pScreen');
    issuePM = select('#pMobile');
    GroundImg = select('#GroundImg');
    learnLink = select('#learnLink');
    helpLink = select('#helpLink');
    voicesLink = select('#voicesLink');
    shareLink = select('#shareLink');
    copiedMsg = select('#copied');
};

p5.disableFriendlyErrors = true;

function setup() {
    (width > 800) ? charaInARow = 5 : charaInARow = 4;

  createCanvas(windowWidth, windowHeight);

  setFrameRate(28);
  firstRowR = new Group(); secondRowR = new Group(); thirdRowR = new Group(); 
  firstRowL = new Group(); secondRowL = new Group(); thirdRowL = new Group(); 

// Setup size, speed and position of each row group
// -- To increase the density of each row, make "x" value smaller
// -- To change the overall speed of each row, modify "speed". 
// -- To change which character show up in the row, modify "start", which is refering characterList ID. This is to avoid too many same character show on the screen at once. When the character arrives to the other end of the screen, it will come back to starting point as a different character.
playListR = [
  {"rowID": firstRowR, "x": width*2.5, "y":height/7, "scale":0.5, "speed": -4, "start":0},
  {"rowID": secondRowR, "x": width*3, "y":height/4, "scale":0.7, "speed": -5, "start":4},
  {"rowID": thirdRowR, "x": width*3.5, "y":height/2, "scale": 1, "speed": -6.5, "start":8}];
playListL = [
  {"rowID": firstRowL, "x": -(width*1.5), "y":height/7 + 30, "scale":0.55, "speed": 4, "start":2},
  {"rowID": secondRowL, "x": -(width*2), "y":height/4 + 40, "scale":0.75, "speed": 5, "start":6},
  {"rowID": thirdRowL, "x": -(width*2.5), "y":height/2 + 50, "scale": 1.05, "speed": 6.5, "start":0}];

// Assign sprites to Right Rows
    for(var r=0; r<playListR.length;r++){
      for(var ch = 0; ch < charaInARow; ch++){
        var chs = playListR[r].start + ch; // The character ID to start loading for the row
        chs = (chs >= charactorList.length) ? chs = chs - 8 : chs = chs;
        var randomColor = floor(random(0, colorArray.length - 0.1));
        var coId = colorArray[randomColor]; // Pull a color from the array
        var randomX = random(0.01, 1);
        // Set starting X position of characters
        var rightrowX = map(randomX, 0, 1, width, playListR[r].x);
        if (width < screenWidthPhone) {rightrowX = rightrowX * 2;}
        else {rightrowX = rightrowX;}
        var animSpr = charactorList[chs].name + colorList[coId].name + 'R_spr';
        var animLab = str(charactorList[chs].id + 'R' + coId);
        charactorList[chs].anime[coId].frameDelay = floor(random(4,6.9)); // Sprite animation frame delay: the bigger number the greater delay
        animSpr = createSprite(rightrowX, playListR[r].y, spriteWidth, spriteHeight);
        animSpr.scale = playListR[r].scale;
        animSpr.addAnimation(animLab, charactorList[chs].anime[coId]);
        // Get the color ID of the character when clicked and hover
        animSpr.setCollider("rectangle", 35, 0, spriteWidth*0.7, spriteHeight*0.7);
        animSpr.onMousePressed = function() {
          var newLabel = this.getAnimationLabel();
          var separatedLabel = split(newLabel, 'R');
          (separatedLabel[1] == 7) ? [colorSwitch = colorSwitch]:[colorSwitch = separatedLabel[1]]
          updateGround();
        };
        animSpr.onMouseOver = function() {
          var newLabel = this.getAnimationLabel();
          var separatedLabel = split(newLabel, 'R');
          (separatedLabel[1] == 7) ? [colorSwitch = colorSwitch]:[colorSwitch = separatedLabel[1]]
          updateGround();
        };        
        animSpr.addToGroup(playListR[r].rowID);
        }
    }

// Assign sprites to Left Rows
    for(var r = 0; r < playListL.length; r++){
      for(var ch=0; ch < charaInARow; ch++){
        var chs = playListL[r].start + ch;
        chs = (chs >= charactorList.length) ? chs = chs - 8 : chs = chs;
        var randomColor = floor(random(0, colorArray.length - 0.1));
        var coId = colorArray[randomColor];
        var randomX = random(0.01, 1);
        // Set starting X position of characters
        var leftrowX = playListL[r].x * randomX;
        if (width < screenWidthPhone) {leftrowX = leftrowX * 2;}
        else {rightrowX = leftrowX;}
        var animSpr = charactorList[chs].name + colorList[coId].name + 'L_spr';
        var animLab = str(charactorList[chs].id + 'L' + coId);
        charactorList[chs].anime[coId].frameDelay = floor(random(4,6.9));
        animSpr = createSprite(leftrowX, playListL[r].y, spriteWidth, spriteHeight);
        animSpr.scale = playListL[r].scale;
        animSpr.addAnimation(animLab, charactorList[chs].anime[coId]);
        // Get the color ID of the character when clicked and hover
        animSpr.setCollider("rectangle", 35, 0, spriteWidth*0.7, spriteHeight*0.7);
        animSpr.onMousePressed = function() {
          var newLabel = this.getAnimationLabel();
          var separatedLabel = split(newLabel, 'L');
          (separatedLabel[1] == 7) ? [colorSwitch = colorSwitch]:[colorSwitch = separatedLabel[1]]
          updateGround();
        };
        animSpr.onMouseOver = function() {
          var newLabel = this.getAnimationLabel();
          var separatedLabel = split(newLabel, 'L');
          (separatedLabel[1] == 7) ? [colorSwitch = colorSwitch]:[colorSwitch = separatedLabel[1]]
          updateGround();
        };         
        animSpr.addToGroup(playListL[r].rowID);
        }
    }
 };

function draw() {
  clear();
////// Horizontal Animation from the Right
for(var row=0; row < playListR.length; row++){
    var rowID = playListR[row].rowID;
  for(var i = 0; i<rowID.length; i++) {
    var thisSpr = rowID[i];
    var cloneRow = rowID.slice();
    cloneRow.splice(i,1);
    var delayValue = floor(random(4,6.9));
    var mappin = map((i + 1) / delayValue, 1/5, rowID.length/3, 0.8, 1.6); 
    // Set the velocity of the character
    var speedControl;
    (width > screenWidthTablet) ? speedControl = playListR[row].speed * speedDefault * mappin : speedControl = playListR[row].speed * speedTablet * mappin;
    thisSpr.velocity.x = speedControl;
    //// When the character arrives to the left end of the screen, it changes color and character ID and come back to the starting position
    if (thisSpr.position.x < - spriteWidth) {
        var oldLabel = thisSpr.getAnimationLabel();
        thisSpr.remove();
        var separateLabel = split(oldLabel, 'R');
        for(var ch=0; ch<charactorList.length; ch++){
        var randomColor = floor(random(0, colorArray.length - 0.1));
        var coId = colorArray[randomColor];
        var oldCharaId = int(separateLabel[0]);
        var charaId = (oldCharaId > charactorList.length - charaInARow - 2) ? oldCharaId + charaInARow + 1 - charactorList.length : oldCharaId + charaInARow + 1;
        var newR_label = charaId + 'R' + coId;
        var randomX = random(0.01, 1);
        // X position
        var rightrowX = map(randomX, 0, 1, width, playListR[row].x);
        if (width < screenWidthPhone) {rightrowX = rightrowX * 2;}
        else {rightrowX = rightrowX;}
        var newSpr = createSprite(rightrowX, playListR[row].y, spriteWidth, spriteHeight);
        newSpr.scale = playListR[row].scale;
        charactorList[charaId].anime[coId].frameDelay = delayValue;
        newSpr.addAnimation(newR_label, charactorList[charaId].anime[coId]);
        }
        //Get color ID from new sprites
        newSpr.setCollider("rectangle", 35, 0, spriteWidth*0.7, spriteHeight*0.7);
        newSpr.onMousePressed = function() {
          var newLabel = this.getAnimationLabel();
          var separatedLabel = split(newLabel, 'R');
          (separatedLabel[1] == 7) ? [colorSwitch = colorSwitch]:[colorSwitch = separatedLabel[1]]
        };
        newSpr.onMouseOver = function() {
          var newLabel = this.getAnimationLabel();
          var separatedLabel = split(newLabel, 'R');
          (separatedLabel[1] == 7) ? [colorSwitch = colorSwitch]:[colorSwitch = separatedLabel[1]]
        };
         newSpr.addToGroup(rowID);
        }
     }
  }

////// Horizontal Animation from the Left
for(var row=0; row < playListL.length; row++){
    var rowID = playListL[row].rowID;
  for(var i = 0; i<rowID.length; i++) {
    var thisSpr = rowID[i];
    var cloneRow = rowID.slice();
    cloneRow.splice(i,1);
    var delayValue = floor(random(4,6.9));
    var mappin = map((i + 1) / delayValue, 1/5, rowID.length/3, 1, 2);
    thisSpr.mirrorX(-1);
    // Set velocity
    var speedControl;
    (width > screenWidthTablet) ? speedControl = playListL[row].speed * speedDefault * mappin : speedControl = playListL[row].speed * speedTablet * mappin;
    thisSpr.velocity.x = speedControl;
    //// When the character arrives to the right end of the screen, it changes color and character ID and come back to the starting position
    if (thisSpr.position.x > width + spriteWidth) {
        var oldLabel = thisSpr.getAnimationLabel();
        thisSpr.remove();
        var separateLabel = split(oldLabel, 'L');
        for(var ch=0; ch<charactorList.length; ch++){
        var randomColor = floor(random(0, colorArray.length - 0.1));
        var coId = colorArray[randomColor];
        var newL_label = charaId + 'L' + coId;
        var randomX = random(0.01, 1);
        // X position
        var leftrowX = playListL[row].x * randomX;
        if (width < screenWidthPhone) {leftrowX = leftrowX * 2;}
        else {leftrowX = leftrowX;}
        var newSpr = createSprite(leftrowX, playListL[row].y, spriteWidth, spriteHeight);
        newSpr.scale = playListL[row].scale;
        var oldCharaId = int(separateLabel[0]);
        var charaId = (oldCharaId > charactorList.length - charaInARow - 2) ? oldCharaId + charaInARow + 1 - charactorList.length : oldCharaId + charaInARow + 1;
        charactorList[charaId].anime[coId].frameDelay = delayValue;
        newSpr.addAnimation(newL_label, charactorList[charaId].anime[coId]);
        }
        //Get color ID from new sprites
        newSpr.setCollider("rectangle", 35, 0, spriteWidth*0.7, spriteHeight*0.7);
        newSpr.onMousePressed = function() {
          var newLabel = this.getAnimationLabel();
          var separatedLabel = split(newLabel, 'L');
          (separatedLabel[1] == 7) ? [colorSwitch = colorSwitch]:[colorSwitch = separatedLabel[1]]
          updateGround();
        };
        newSpr.onMouseOver = function() {
          var newLabel = this.getAnimationLabel();
          var separatedLabel = split(newLabel, 'L');
          (separatedLabel[1] == 7) ? [colorSwitch = colorSwitch]:[colorSwitch = separatedLabel[1]]
          updateGround();
        };
        newSpr.addToGroup(rowID);
         }
  }}

//////// Frame rate test
// var fr = 'FrameRate test:' + floor(getFrameRate());
// fill(100);
// textAlign(CENTER);
// textFont(mainFont);
// textSize(24);
// text(fr, width/2, 100);

// Draw sprite in the Z-index order + white screens in between
noStroke();
drawSprites(firstRowR);
drawSprites(firstRowL);
drawSprites(secondRowR);
drawSprites(secondRowL);
drawSprites(thirdRowR);
drawSprites(thirdRowL);

loadSwitch = true;

  if(loadSwitch) {
    setTimeout(function(){
    document.getElementById("modalBG").style.display = "none";
    }, 1500);
  }
};

function mouseClicked() {
   if (loadSwitch) {

  var c = float(colorSwitch);
  var pr = (c == 0) ? colorList.length - 1 : c - 1;
  var ne = (c == colorList.length - 1) ? 0 : c + 1;

// Update the pannel color & info
    if(pauseSwitch) {  
      noLoop();
      issueHDiv.style('background-color','rgb('+ colorList[c].r + ',' + colorList[c].g + ',' + colorList[c].b + ')');
      bottomPanel.style('background-color','rgb('+ colorList[c].r + ',' + colorList[c].g + ',' + colorList[c].b + ')');
      prevIssue.style('background-color','rgb('+ colorList[pr].r + ',' + colorList[pr].g + ',' + colorList[pr].b + ')');
      nextIssue.style('background-color','rgb('+ colorList[ne].r + ',' + colorList[ne].g + ',' + colorList[ne].b + ')');
      bottomPanel.style('opacity','1');
      issueH.style('color','rgb(224, 224, 216)');
      issueH.html(issueData[c].h1);
      issueHM.html(issueData[c].h1);
      issueP.html(issueData[c].body);
      issuePM.html(issueData[c].body);
      (width < screenWidthTablet) ? bottomPanel.style('top','0') : bottomPanel.style('bottom','0');
      (width < screenWidthTablet) ? topPanel.style('top','50px') : topPanel.style('bottom','120px');
      if (width < screenWidthTablet) {topPanel.style('opacity','1');}
      updateGround();
    } else {
      loop();
      (width < screenWidthTablet) ? bottomPanel.style('top','unset') : bottomPanel.style('bottom','-200px');
      (width < screenWidthTablet) ? topPanel.style('top','-100%') : topPanel.style('bottom','-100px');
      if (width < screenWidthTablet) {topPanel.style('opacity','0');}
    }
    pauseSwitch = !pauseSwitch;
    infoSwitch = !infoSwitch;
   }
};

function previousColor() {
  var c = float(colorSwitch);
  colorSwitch = (c == 0) ? colorList.length - 1 : c -1;
  pauseSwitch = true;
  updateGround();
};

function nextColor() {
  var c = float(colorSwitch);
  colorSwitch = (c == colorList.length - 1) ? 0 : c +1;
  pauseSwitch = true;
  updateGround();
};

function updateGround(){
  var c = colorSwitch;
  var theImg = '../' + groundImgData[c].name;
  GroundImg.attribute('src', theImg);
}

function learnLinkOpen(){
  var learnURL = 'https://strangersinmyhead.info/explore/' + issueData[colorSwitch].slug;
  // var learnURL = 'https://dev.strangersinmyhead.info/explore/' +issueData[colorSwitch].slug;
  clearCache();
  window.open(learnURL, "_parent");
}

function helpLinkOpen(){
  var helpURL = 'https://strangersinmyhead.info/help/' + issueData[colorSwitch].help;
  // var helpURL = 'https://dev.strangersinmyhead.info/help/' +issueData[colorSwitch].help;
  clearCache();
  window.open(helpURL, "_parent");
}

function voicesLinkOpen(){
  var voicesURL = 'https://strangersinmyhead.info/voices/' + issueData[colorSwitch].voices;
  // var voicesURL = 'https://dev.strangersinmyhead.info/voices/' + issueData[colorSwitch].voices;
  clearCache();
  window.open(voicesURL, "_parent");
}

function shareLinkOpen(){
  var shareURL = 'https://strangersinmyhead.info/explore/' + issueData[colorSwitch].slug;
  // var shareURL = 'https://dev.strangersinmyhead.info/explore/' + issueData[colorSwitch].slug;
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = shareURL;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
  copiedMsgShow();
}

function copiedMsgShow(){
  copiedMsg.style('right','20px');
  setTimeout(function(){
    copiedMsg.style('right','-320px');
    }, 2000);
}

function clearCache(){
    if (typeof canvas === "object" && canvas !== null) {
        canvas.width = 0;
        canvas.height = 0;
        canvas.remove();
        delete canvas;
        canvas = null;
    }
}
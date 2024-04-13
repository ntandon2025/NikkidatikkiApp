var gameState;
var song;
var song2;

var r, g, b;

var img;

var a1;

var m1;
var m2;
var m3;
var m4;
var m5;

var b1;

var MainPlayer;

var tb1, td1, sdb1;

var warningimg;

function preload() {
  img = loadImage("scarymazewoman.PNG");
  song = loadSound("Scary Maze Game Face and Sound (1).mp3");
  song2 = loadSound("Dark Deception - It's Time to Leave.mp3");

  warningimg = loadImage("EP WARNING.png");
}

function loaded() {
  song.play();
}

function sloaded() {
  song2.play();
}
function loadedd() {
  song.stop();
  song2.stop();
}

function setup() {
  createCanvas(1000, 1000);
  gameState = 0;

  MainPlayer = new Player(15, 15);

  //avoiders
  a1 = new Avoiders(222, 500, "green", 20);
  a2 = new Avoiders(490, 500, "blue", 30);

  a3 = new Avoiders(630, 500, "yellow", 25);

  a4 = new Avoiders(800, 500, "red", 25);

  //HAVODIER
  ha1 = new hAvoiders(900, 100, "red", 12);
  ha2 = new hAvoiders(900, 520, "yellow", 12);
  ha3 = new hAvoiders(900, 900, "red", 12);

  //maze1a
  m1 = new Maze1a(10, 70, 350, 10, "white");
  m2 = new Maze1a(148, 140, 350, 10, "green");
  m3 = new Maze1a(10, 210, 350, 10, "white");
  m4 = new Maze1a(148, 280, 350, 10, "green");
  m5 = new Maze1a(10, 350, 350, 10, "white");
  m6 = new Maze1a(148, 420, 350, 10, "green");
  m7 = new Maze1a(10, 490, 350, 10, "white");

  //MAZE 2

  mtwo1 = new Maze2(100, 570, "blue");
  mtwo2 = new Maze2(161, 650, "green");

  mtwo3 = new Maze2(26, 690, "blue");

  mtwo4 = new Maze2(110, 760, "green");

  mtwo5 = new Maze2(263, 700, "blue");

  mtwo6 = new Maze2(335, 770, "green");

  mtwo7 = new Maze2(200, 820, "blue");
  mtwo8 = new Maze2(290, 890, "green");
  mtwo9 = new Maze2(410, 855, "blue");
  mtwo10 = new Maze2(580, 650, "red");

  mtwo11 = new Maze2(850, 650, "red");

  mtwo12 = new Maze2(710, 480, "yellow");
  mtwo14 = new Maze2(710, 750, "yellow");

  mtwo13 = new Maze2(710, 95, "red");

  mtwo15 = new Maze2(710, 225, "yellow");

  //MAZE 3

  mthree1 = new Maze3(550, 20, "white");
  mthree2 = new Maze3(835, 20, "white");
  mthree3 = new Maze3(905, 200, "white");
  mthree4 = new Maze3(530, 200, "white");

  mthree5 = new Maze3(700, 150, "white");
  mthree6 = new Maze3(780, 350, "white");

  mthree7 = new Maze3(610, 350, "white");

  mthree8 = new Maze3(880, 480, "white");

  mthree9 = new Maze3(540, 480, "white");

  mthree10 = new Maze3(540, 800, "white");
  mthree11 = new Maze3(700, 600, "white");
  mthree12 = new Maze3(900, 800, "white");

  //start and end
  start = new Start(15, 15, "green");
  end = new End(935, 15, "red");

  //rgb top and bottom Border
  tb1 = new TopBorder(10, -5, 980, 10);
  tb2 = new TopBorder(10, 995, 980, 10);

  //rgbside borders
  sdb1 = new SideBorder(0, 1, 10, 1000);
  sdb2 = new SideBorder(988, 1, 10, 1000);

  //dividers
  td1 = new TopDivider(500, 10, 10, 558, "white");
  bd1 = new BottomDivider(500, 650, 10, 275, "white");
  md1 = new MiddleDivider(120, 558, 390, 10, "white");

  //emoji

  emoji = new Woman(250, 250, 10, 5);
  emoji2 = new Woman(350, 550, 15, 5);

  emoji3 = new Woman(450, 250, 30, 10);
  emoji4 = new Woman(550, 350, 35, 5);
  emoji5 = new Woman(650, 450, 40, 20);
  emoji6 = new Woman(750, 150, 45, 15);
  emoji7 = new Woman(850, 550, 55, 5);
  emoji8 = new Woman(250, 650, 60, 5);
  emoji9 = new Woman(250, 750, 70, 15);
  emoji10 = new Woman(250, 850, 80, 15);
}
function draw() {
  background("black");

  switch (gameState) {
    case 0:
      gamesMenu();
      break;
    case 1:
      Instructions();
      break;
    case 2:
     scaryGAME();
      break;
    case 3:
      congratsRoom();
  }

  //Collsison with MAZE 1 END
}
function gamesMenu() {
  background("black");

  textSize(150);
  fill("#39FF14");

  text("NOT SO FUN", 35, 300);

  fill("#39FF14");

  text("RUN ", 340, 500);

  textSize(100);
  fill("#39FF14");

  

  textSize(60);

  fill("red");

  text("Press 'I' for Instructions", 200, 700);

  fill("red");

  textSize(20);
  text("Created By: Nikhil Tandon, Peter Mieczkowski, Syed Hassan", 450, 980);
}

function Instructions() {
  background("black");

  image(warningimg, 10, 500, 430, 500);

  textSize(55);
  fill("red");

  text("Here are the Instructions Loser!!", 100, 100);

  fill("white");
  textSize(40);
  text("How to control Player:", 50, 200);

  fill("red");
  textSize(20);
  text("Up/Down Arrow Key== Player goes Up/Down:", 120, 230);
  text("Right/Left Arrow Key== Player goes Right/Left:", 120, 260);

  textSize(30);
  fill("white");

  text("GET TO THE RED PLATFORM ON THE TOP RIGHT", 100, 320);

  textSize(20);
  fill("white");
  text("(But, there is a TWIST. There is ALWAYS a TWIST)", 240, 365);

  textSize(40);

  fill("red");
  text("Have Fun Losing, LOSER !!", 250, 440);

  textSize(44);

  fill("white");
  text("Press", 492, 750);
  fill("red");
  text("'S'", 617, 750);
  fill("white");
  text("to Start", 678, 750);

  textSize(30);

  text("(Press", 500, 850);

  fill("red");

  text("'M'", 600, 850);

  fill("white");

  text("anytime", 650, 850);

  text("to go back to Menu)", 500, 880);
}

function congratsRoom() {
  background(img);



  emoji.display();
  emoji.move();

  emoji2.display();
  emoji2.move();

  emoji3.display();
  emoji3.move();

  emoji4.display();
  emoji4.move();

  emoji5.display();
  emoji5.move();

  emoji6.display();
  emoji6.move();

  emoji7.display();
  emoji7.move();

  emoji8.display();
  emoji8.move();

  emoji9.display();
  emoji9.move();

  emoji10.display();
  emoji10.move();

  //TEXT
  textSize(90);
  fill("red");
  text("CONGRATULATIONS !!!", 10, 100);
  fill("#39FF14");
  text("YOUR NOT", 280, 250);
  fill("red");
  text("DEAD!!!", 340, 400);

  //BACK TO Menu
  textSize(40);
  fill("#39FF14");
  text("Press 'M' to go back to GAME MENU", 100, 800);

  //BACK TO YBNW GAME
  textSize(40);
  fill("red");
  text("Press 'S' to PLAY AGAIN", 100, 900);

  textSize(100);
  fill("#39FF14");
  text("Press 'P' to Play!!!!", 10, 650);
}

function scaryGAME() {
  textSize(40);
  fill("green");

  text("LEVEL 1 ", 50, 260);

  textSize(40);
  fill("blue");

  text("LEVEL 2 ", 300, 620);

  textSize(40);
  fill("red");

  text("LEVEL 3 ", 660, 885);
  
  
    textSize(18);
  fill("white");

  text("Press 'S' to Stop In Game Music ", 12, 900);
  
  
  textSize(18);
  fill("white");

  text("Press 'P' to Play In Game Music ", 12, 950);
  
  
  
  

  tb1.display();
  tb2.display();
  sdb1.display();
  sdb2.display();

  //divider
  td1.display();
  bd1.display();
  md1.display();

  //AVOIDER DISPLAY

  a1.move();
  a1.display();

  a2.move();
  a2.display();

  a3.move();
  a3.display();

  a4.move();
  a4.display();

  //hAVOIDERS
  ha1.move();
  ha1.display();

  ha2.move();
  ha2.display();

  ha3.move();
  ha3.display();

  //maze 1a horizontal line
  m1.display();
  m2.display();
  m3.display();
  m4.display();
  m5.display();
  m6.display();
  m7.display();

  //MAZE DISPLAY
  //Maze 2 display
  mtwo1.display();
  mtwo2.display();
  mtwo3.display();
  mtwo4.display();
  mtwo5.display();
  mtwo6.display();
  mtwo7.display();
  mtwo8.display();
  mtwo9.display();
  mtwo10.display();
  mtwo11.display();
  mtwo12.display();
  mtwo13.display();
  mtwo14.display();
  mtwo15.display();

  //Maze 3
  mthree1.display();
  mthree2.display();
  mthree3.display();
  mthree4.display();
  mthree5.display();
  mthree6.display();
  mthree7.display();
  mthree8.display();
  mthree9.display();
  mthree10.display();
  mthree11.display();
  mthree12.display();

  ///start
  start.display();

  end.display();

  //PLAYER DISPLAY
  MainPlayer.display();

  //Avoiders Collisisosn
  MainPlayer.collision(a1.ax, a1.ay);
  MainPlayer.collision(a2.ax, a2.ay);

  MainPlayer.collision(a3.ax, a3.ay);
  MainPlayer.collision(a4.ax, a4.ay);

  MainPlayer.hcollision(a1.hax, a1.hay);
  MainPlayer.hcollision(a2.hax, a2.hay);

  MainPlayer.hcollision(a3.hax, a3.hay);

  //Avoider collisison done

  //Collsison with MAZE 1

  MainPlayer.M1collision(m1.mx, m1.my);
  MainPlayer.M1collision(m2.mx, m2.my);

  MainPlayer.M1collision(m3.mx, m3.my);

  MainPlayer.M1collision(m4.mx, m4.my);

  MainPlayer.M1collision(m5.mx, m5.my);
  MainPlayer.M1collision(m6.mx, m6.my);

  MainPlayer.M1collision(m7.mx, m7.my);
  //Collsison with MAZE 1 END

  //Collsison with MAZE 1

  MainPlayer.M2collision(mtwo1.mtwox, mtwo1.mtwoy);
  MainPlayer.M2collision(mtwo2.mtwox, mtwo2.mtwoy);
  MainPlayer.M2collision(mtwo3.mtwox, mtwo3.mtwoy);
  MainPlayer.M2collision(mtwo4.mtwox, mtwo4.mtwoy);
  MainPlayer.M2collision(mtwo5.mtwox, mtwo5.mtwoy);
  MainPlayer.M2collision(mtwo6.mtwox, mtwo6.mtwoy);
  MainPlayer.M2collision(mtwo7.mtwox, mtwo7.mtwoy);
  MainPlayer.M2collision(mtwo8.mtwox, mtwo8.mtwoy);
  MainPlayer.M2collision(mtwo9.mtwox, mtwo9.mtwoy);
  MainPlayer.M2collision(mtwo10.mtwox, mtwo10.mtwoy);

  MainPlayer.M2collision(mtwo11.mtwox, mtwo11.mtwoy);

  MainPlayer.M2collision(mtwo12.mtwox, mtwo12.mtwoy);

  MainPlayer.M2collision(mtwo13.mtwox, mtwo13.mtwoy);

  MainPlayer.M2collision(mtwo14.mtwox, mtwo14.mtwoy);
  MainPlayer.M2collision(mtwo15.mtwox, mtwo1.mtwoy);

  //Maze 3 collisions
  MainPlayer.M3collision(mthree1.mthreex, mthree1.mthreey);
  MainPlayer.M3collision(mthree2.mthreex, mthree2.mthreey);
  MainPlayer.M3collision(mthree3.mthreex, mthree3.mthreey);

  MainPlayer.M3collision(mthree4.mthreex, mthree4.mthreey);

  MainPlayer.M3collision(mthree5.mthreex, mthree5.mthreey);

  MainPlayer.M3collision(mthree6.mthreex, mthree6.mthreey);

  MainPlayer.M3collision(mthree7.mthreex, mthree7.mthreey);

  MainPlayer.M3collision(mthree8.mthreex, mthree8.mthreey);
  MainPlayer.M3collision(mthree9.mthreex, mthree9.mthreey);

  MainPlayer.M3collision(mthree10.mthreex, mthree10.mthreey);
  MainPlayer.M3collision(mthree11.mthreex, mthree11.mthreey);
  MainPlayer.M3collision(mthree12.mthreex, mthree12.mthreey);

  //end collision
  MainPlayer.endcollision(end.ex, end.ey);

  //DIVIDER colll
  MainPlayer.tdcollision(td1.tdx, td1.tdy);
  MainPlayer.bdcollision(bd1.bdx, bd1.bdy);
  MainPlayer.mdcollision(md1.mdx, md1.mdy);

  //Border coll
  MainPlayer.tbcollision(tb1.tbx,tb1.tby);
    MainPlayer.tbcollision(tb2.tbx,tb2.tby);

  MainPlayer.sdbcollision(sdb1.sdbx, sdb1.sdby);
  MainPlayer.sdbcollision(sdb2.sdbx, sdb2.sdby);
}

function keyPressed() {
  if (key == "i") {
    if (gameState == 0) {
      gameState = 1;
      console.log("Menu");
      song.stop(0);
      song2.stop(0);
    }
  }
  if (key == "s") {
    if (gameState == 1) {
      gameState = 2;
      console.log("Game Started");
      song2.play();
      song.stop(0);
    }
    else if (gameState == 2) {
      console.log("In game music stopped");
      song.stop(0);
      song2.stop();
    }
    
    if (gameState == 3) {
      gameState = 2;
      console.log("Game Started");
      song.stop(0);
      song2.play();
    }
  }
  if (key == "m") {
    if (gameState == 1) {
      gameState = 0;
      console.log("Back to Menu from Instructions");

      song.stop(0);
      song2.stop(0);
    } else if (gameState == 2) {
      gameState = 0;
      song.stop(0);
      song2.stop(0);

      console.log("Back to Menu from Not SO FUN RUN");
    } else if (gameState == 3) {
      gameState = 0;
      console.log("Back to Menu from CONGRATS ROOM");
      song.stop(0);
      song2.stop(0);
    }
  }
  if (key == "p") {
    if (gameState == 0) {
      gameState = 3;
      song = loadSound("Scary Maze Game Face and Sound (1).mp3", loaded);

      console.log("Congrats Room ");
    } else if (gameState == 3) {
      song = loadSound("Scary Maze Game Face and Sound (1).mp3", loaded);

      console.log("PARTYYYY TIMEE BABYY");
    }
    
    
    else if (gameState == 2) {
      song = loadSound(
        "Dark Deception - It's Time to Leave.mp3",
        sloaded
      );
      console.log("In game music");
    }
  }

  if (key == "g") {
    if (gameState == 0) {
      gameState = 2;
      song2 = loadSound(
        "Dark Deception - It's Time to Leave.mp3",
        sloaded
      );

      console.log("MAZEEE Room ");
    }
  }
}

//ALL BORDERS

class TopDivider {
  constructor(tdx, tdy, tdw, tdh, tdcc) {
    this.tdx = tdx;
    this.tdy = tdy;
    this.tdcc = tdcc;
    this.tdw = tdw;
    this.tdh = tdh;
  }
  display() {
    fill(this.tdcc);
    rect(this.tdx, this.tdy, this.tdw, this.tdh);
  }
}

class BottomDivider {
  constructor(bdx, bdy, bdw, bdh, bdcc) {
    this.bdx = bdx;
    this.bdy = bdy;
    this.bdcc = bdcc;
    this.bdw = bdw;
    this.bdh = bdh;
  }
  display() {
    fill(this.bdcc);
    rect(this.bdx, this.bdy, this.bdw, this.bdh);
  }
}

class MiddleDivider {
  constructor(mdx, mdy, mdw, mdh, mdcc) {
    this.mdx = mdx;
    this.mdy = mdy;
    this.mdcc = mdcc;
    this.mdw = mdw;
    this.mdh = mdh;
  }

  display() {
    fill(this.mdcc);
    rect(this.mdx, this.mdy, this.mdw, this.mdh);
  }
}

class TopBorder {
  constructor(tbx, tby, tbw, tbh) {
    this.tbx = tbx;
    this.tby = tby;
    this.tbw = tbw;
    this.tbh = tbh;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }
  display() {
    // fill(random(this.r), random(this.g), random(this.b));
    fill("white");
    rect(this.tbx, this.tby, this.tbw, this.tbh);
  }
}

class SideBorder {
  constructor(sdbx, sdby, sdbw, sdbh) {
    this.sdbx = sdbx;
    this.sdby = sdby;
    this.sdbw = sdbw;
    this.sdbh = sdbh;
    this.rs = random(255);
    this.gs = random(255);
    this.bs = random(255);
  }
  display() {
    fill(random(this.rs), random(this.gs), random(this.bs));

    rect(this.sdbx, this.sdby, this.sdbw, this.sdbh);
  }
}
// ALL DIVIDERS END

//START POS
class Start {
  constructor(stx, sty, stcc) {
    this.stx = stx;
    this.sty = sty;
    this.stcc = stcc;

    this.stsz = 40;
  }
  display() {
    //PLAYER

    fill(this.stcc);
    rect(this.stx, this.sty, this.stsz, this.stsz);
  }
}
//MAZE 1
class Maze1a {
  constructor(mx, my, mw, mh, mcc) {
    this.mx = mx;
    this.my = my;
    this.mw = mw;
    this.mh = mh;
    this.mcc = mcc;
  }

  display() {
    fill(this.mcc);
    rect(this.mx, this.my, this.mw, this.mh);
  }
}

//Maze 2
class Maze2 {
  constructor(mtwox, mtwoy, mtwocc) {
    this.mtwox = mtwox;
    this.mtwoy = mtwoy;

    this.mtwoz = 53;

    this.mtwocc = mtwocc;
  }
  display() {
    fill(this.mtwocc);
    rect(this.mtwox, this.mtwoy, this.mtwoz, this.mtwoz);
  }
}

class Maze3 {
  constructor(mthreex, mthreey, mthreecc) {
    this.mthreex = mthreex;
    this.mthreey = mthreey;

    this.mthreez = 70;

    this.mthreecc = mthreecc;
  }
  display() {
    fill(this.mthreecc);
    rect(this.mthreex, this.mthreey, this.mthreez, this.mthreez);
  }
}

//END POS
class End {
  constructor(ex, ey, ecc) {
    this.ex = ex;
    this.ey = ey;
    this.ecc = ecc;

    this.esz = 40;
  }

  display() {
    //PLAYER
    fill(this.ecc);
    rect(this.ex, this.ey, this.esz, this.esz);
  }
}

//PLAYER
class Player {
  constructor(x, y, cc) {
    this.x = x;
    this.y = y;
    this.cc = cc;

    this.sz = 50;
  }

  //Avoiders collision
  collision(ax, ay) {
    if (dist(this.x, this.y, ax, ay) < 38) {
      console.log("Dont Touch the AVOIDER!!");
      this.x = 15;
      this.y = 15;
    }
  }

  //hAvoiders collision
  hcollision(hax, hay) {
    if (dist(this.x, this.y, hax, hay) < 18) {
      console.log("Dont Touch the AVOIDER!!");
      this.x = 15;
      this.y = 15;
    }
  }

  //Maze 1 collision
  M1collision(mx, my, mw, mh) {
    if (
      m1.mx < this.x + 45 &&
      m1.mx + m1.mw > this.x &&
      m1.my < this.y + 35 &&
      m1.my + m1.mh > this.y
    ) {
      console.log("DONT TOUCH THE MAZE 1 !!");
      this.x = 15;
      this.y = 15;
    } else if (
      m2.mx < this.x + 45 &&
      m2.mx + m2.mw > this.x &&
      m2.my < this.y + 35 &&
      m2.my + m2.mh > this.y
    ) {
      this.x = 15;
      this.y = 15;
    } else if (
      m3.mx < this.x + 45 &&
      m3.mx + m3.mw > this.x &&
      m3.my < this.y + 35 &&
      m3.my + m3.mh > this.y
    ) {
      this.x = 15;
      this.y = 15;
    } else if (
      m4.mx < this.x + 45 &&
      m4.mx + m4.mw > this.x &&
      m4.my < this.y + 35 &&
      m4.my + m4.mh > this.y
    ) {
      this.x = 15;
      this.y = 15;
    } else if (
      m5.mx < this.x + 45 &&
      m5.mx + m5.mw > this.x &&
      m5.my < this.y + 35 &&
      m5.my + m5.mh > this.y
    ) {
      this.x = 15;
      this.y = 15;
    } else if (
      m6.mx < this.x + 45 &&
      m6.mx + m6.mw > this.x &&
      m6.my < this.y + 35 &&
      m6.my + m6.mh > this.y
    ) {
      this.x = 15;
      this.y = 15;
    } else if (
      m7.mx < this.x + 45 &&
      m7.mx + m7.mw > this.x &&
      m7.my < this.y + 35 &&
      m7.my + m7.mh > this.y
    ) {
      this.x = 15;
      this.y = 15;
    }
  }

  //maze 2 coll
  //Maze 2 collision
  M2collision(mtwox, mtwoy) {
    if (dist(this.x, this.y, mtwox, mtwoy) < 30) {
      console.log("DONT TOUCH THE MAZE 2 !!");
      this.x = 15;
      this.y = 15;
    }
  }
  //maze 3 coll
  M3collision(mthreex, mthreey) {
    if (dist(this.x, this.y, mthreex, mthreey) < 41) {
      console.log("DONT TOUCH THE MAZE 2 !!");
      this.x = 15;
      this.y = 15;
    }
  }
  //end collsison
  endcollision(ex, ey) {
    if (dist(this.x, this.y, ex, ey) < 32) {
      console.log("YOU WIN");
      this.x = 15;
      this.y = 15;
      gameState = 3;
      song2.stop(0);
    }
  }

  // top divider coll
  tdcollision(tdx, tdy, tdw, tdh) {
    if (
      td1.tdx < this.x + 50 &&
      td1.tdx + td1.tdw > this.x &&
      td1.tdy < this.y + 40 &&
      td1.tdy + td1.tdh > this.y
    ) {
      console.log("DONT TOUCH THE Top Divider");
      this.x = 15;
      this.y = 15;
    }
  }

  // bottom divider coll
  bdcollision(bdx, bdy, bdw, bdh) {
    if (
      bd1.bdx < this.x + 50 &&
      bd1.bdx + bd1.bdw > this.x &&
      bd1.bdy < this.y + 40 &&
      bd1.bdy + bd1.bdh > this.y
    ) {
      console.log("DONT TOUCH THE Bottom Divider");
      this.x = 15;
      this.y = 15;
    }
  }

  mdcollision(mdx, mdy, mdw, mdh) {
    if (
      md1.mdx < this.x + 50 &&
      md1.mdx + md1.mdw > this.x &&
      md1.mdy < this.y + 40 &&
      md1.mdy + md1.mdh > this.y
    ) {
      console.log("DONT TOUCH THE Middle Divider");
      this.x = 15;
      this.y = 15;
    }
  }

  tbcollision(tbx, tby, tbw, tbh) {
    if (
      tb1.tbx < this.x + 50 &&
      tb1.tbx + tb1.tbw > this.x &&
      tb1.tby < this.y + 40 &&
      tb1.tby + tb1.tbh > this.y
    ) {
      console.log("DONT TOUCH THE Top Border");
      this.x = 15;
      this.y = 15;
    } else if (
      tb2.tbx < this.x + 50 &&
      tb2.tbx + tb2.tbw > this.x &&
      tb2.tby < this.y + 40 &&
      tb2.tby + tb2.tbh > this.y
    ) {
      console.log("DONT TOUCH THE Top Border");
      this.x = 15;
      this.y = 15;
    }
  }

  sdbcollision(sdbx, sdby, sdbw, sdbh) {
    if (
      sdb1.sdbx < this.x + 50 &&
      sdb1.sdbx + sdb1.sdbw > this.x &&
      sdb1.sdby < this.y + 40 &&
      sdb1.sdby + sdb1.sdbh > this.y
    ) {
      console.log("DONT TOUCH THE Top Border");
      this.x = 15;
      this.y = 15;
    } else if (
      sdb2.sdbx < this.x + 50 &&
      sdb2.sdbx + sdb2.sdbw > this.x &&
      sdb2.sdby < this.y + 40 &&
      sdb2.sdby + sdb2.sdbh > this.y
    ) {
      console.log("DONT TOUCH THE Top Border");
      this.x = 15;
      this.y = 15;
    }
  }

  //

  display() {
    //PLAYER
    fill("#CC00FF");
    rect(this.x, this.y, this.sz - 9, this.sz - 9);

    fill("#39FF14");
    rect(this.x + 5, this.y + 5, this.sz - 20, this.sz - 20);

    fill("#00FFFF");
    rect(this.x + 13, this.y + 13, this.sz - 35, this.sz - 35);
    fill(" #FD1C03");

    rect(this.x + 18, this.y + 18, this.sz - 45, this.sz - 45);

    //UPSIDE DOWN CONTROLS
    //up arrow
    if (keyIsDown(UP_ARROW)) {
      this.y -= 5;
    }
    //down key
    else if (keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    } else if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
  }
}
//PLAYER END

//AVOIDERS START
class Avoiders {
  constructor(ax, ay, acc, yspd) {
    this.ax = ax;
    this.ay = ay;

    this.asz = 30;

    this.acc = acc;
    this.yspd = yspd;
  }

  move() {
    if (
      this.ay < this.asz + 50 / 2 - 50 ||
      this.ay > width - (this.asz - 300 / 2) - 165
    ) {
      this.yspd = -this.yspd;
    }

    this.ay += this.yspd;
  }

  display() {
    fill(this.acc);
    rect(this.ax, this.ay, this.asz, this.asz);
  }
}

class hAvoiders {
  constructor(hax, hay, hacc, xspd) {
    this.hax = hax;
    this.hay = hay;

    this.hasz = 30;

    this.hacc = hacc;
    this.xspd = xspd;
  }

  move() {
    if (
      this.hax < this.hasz + 50 / 2 + 450 ||
      this.hax > height - (this.hasz - 300 / 2) - 165
    ) {
      this.xspd = -this.xspd;
    }

    this.hax += this.xspd;
  }

  display() {
    fill(this.hacc);
    rect(this.hax, this.hay, this.hasz, this.hasz);
  }

  //AVOIDERS ENDs
}
class Woman {
  constructor(x, y, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.eSize = 100;
  }

  move() {
    this.x -= this.xSpeed;
    this.y -= this.ySpeed;

    if (this.x < this.eSize / 2 || this.x > width - this.eSize / 2) {
      this.xSpeed = -this.xSpeed;
    }

    if (this.y < this.eSize / 2 || this.y > height - this.eSize / 2) {
      this.ySpeed = -this.ySpeed;
    }
  }

  display() {
    image(
      img,
      this.x,
      this.y,
      this.eSize,
      this.eSize,
      this.xSpeed,
      this.ySpeed
    );
  }
}

function donothing() {
}
var table = [];

function preload() {
  logo = loadImage("logo.png");
  table = loadTable("accounts.csv","csv","header");
}

function setup() {
  createCanvas(2000,875);
  background(0);
  usernames = table.getColumn(0);
  passwords = table.getColumn(1);
  fnames = table.getColumn(2);
  secq1list = table.getColumn(3);
  secq2list = table.getColumn(4);
}

var logosize = 250;
var firsttime = true;
var x = 0;
var hovered = false;
var changingcolor = 0;
var display = 'start up';
var username = '';
var password = '';
var passwordagain = '';
var firstname = '';
var secq1 = '';
var secq2 = '';
var red = 0;
var green = 0;
var blue = 0;
var accountclick = 'none';
var accountanimx = 1000;
var accountanimy = 750;
var aaxd = 'right';
var aayd = 'down';
var animtime = 0;

// Next time make the transition form blue to red instead of backwards

function accountanim(){
  fill(200,0,0);
      strokeWeight(3);
      line(1000,800,accountanimx,accountanimy);
      //line(1000,800,accountanimx,800-(accountanimy-800));
      //line(1000,800,1000-(accountanimx-1000),accountanimy);
      line(1000,800,1000-(accountanimx-1000),800-(accountanimy-800));
      requestAnimationFrame(donothing,10);
      print(aayd);
      print(accountanimy);
      
      if (aaxd == 'right'){
        accountanimx += 5;
      } else if (aaxd == 'left'){
        accountanimx -= 5;
      }
      if (aayd == 'up'){
        accountanimy -= 5;
      } else if (aayd == 'down'){
        accountanimy += 5;
      }
      
      if (accountanimx >= 1050){
        aaxd = 'left';
      } else if (accountanimx <= 950){
        aaxd = 'right';
      } else if (accountanimy <= 750){
        aayd = 'down';
      } else if (accountanimy >= 850){
        aayd = 'up';
      }
      
      animtime += 1;
}

function draw() {
  clear();
  background(0);
  red = (255-Math.abs(255-changingcolor));
  green = (255-Math.abs(510-changingcolor));
  blue = (255-Math.abs(765-changingcolor));
  if (changingcolor >= 765){
    red = (255-Math.abs(1020-changingcolor));
  }
    
  if (logosize < 5250){
  image(logo,700-((logosize-250)/2), 200-((logosize-250)/2)-((logosize-250)/5),logosize,logosize);
  if (firsttime){
    setInterval(donothing,100);
  } else if (hovered) {
    requestAnimationFrame(donothing,0.0000000001);
    if (logosize <= 4500){
      logosize = logosize + 100;
    } else {
      logosize = logosize + 50;
      tint(255, 250 - (logosize - 4000)/5 );
    }
  } else if (x < 160) {
    setInterval(donothing,100);
    textSize(150);
    fill(x*4,(x-50)*4,(x-100)*4);
    text('Encryption code ',400,650);
    textSize(75);
    fill((x-100)*4,(x-50)*4,x*4);
    text('Hover over logo to begin',400,800);
  } else {
    setInterval(donothing,100);
    textSize(150);
    fill(255 - ((x-160)*6.5));
    text('Encryption code ',400,650);
    textSize(75);
    text('Hover over logo to begin',400,800);
  }
  firsttime = false;
  x = x + 1;
  if (x == 199 && hovered == false){
    x = 0;
  }
  image(logo,700-((logosize-250)/2), 200-((logosize-250)/2)-((logosize-250)/5),logosize,logosize);
  if (mouseX >= 700 && mouseX <= 950 && mouseY >= 200 && mouseY <= 450){
    hovered = true;
  } 
  changingcolor = 0;
  } else if (logosize <= 5250){
    display = 'main menu';
    logosize = 5252;
  } else if (display == 'main menu') {
    // GUI
    
    fill(red,green,blue);
    textSize(90);
    text('Encryption code Graphical User Interface (GUI)',50,100);
    if (mouseX >= 200 && mouseX <= 900 && mouseY >= 200 && mouseY <= 450 && changingcolor >= 254){
      fill(200,0,0);
    } else {
      fill(green,blue,red);
    }
    rect(200,200,700,250);
    if (mouseX >= 1100 && mouseX <= 1800 && mouseY >= 200 && mouseY <= 450 && changingcolor >= 254){
      fill(200,0,0);
    } else {
      fill(blue,red-33,green);
    }
    rect(1100,200,700,250);
    if (mouseX >= 200 && mouseX <= 900 && mouseY >= 500 && mouseY <= 750 && changingcolor >= 254){
      fill(200,0,0);
    } else {
      fill(green,red-66,blue);
    }
    rect(200,500,700,250);
    if (mouseX >= 1100 && mouseX <= 1800 && mouseY >= 500 && mouseY <= 750 && changingcolor >= 254){
      fill(200,0,0);
    } else {
      fill(red-100,green,blue);
    }
    rect(1100,500,700,250);
    fill(0);
    text("Encrypt",400,350);
    text("Decrypt",400,650);
    text("Account",1300,350);
    text("Settings",1300,650);
    
  } else if (display == 'encryption'){
    background(red,green,blue);
    fill(0);
    text('Encryption',900,100);
    if (mouseX >= 50 && mouseX <= 250 && mouseY >= 50 && mouseY <= 150){
      fill(200,0,0);
    } else {
      fill(0,0,200);
    }
    rect(50,50,200,100);
    textSize(60);
    fill(255);
    text('Back',90,120);
    textSize(100);
    
  } else if (display == 'decryption'){
    background(red,blue,green);
    fill(0);
    text('Decryption',900,100);
    if (mouseX >= 50 && mouseX <= 250 && mouseY >= 50 && mouseY <= 150){
      fill(200,0,0);
    } else {
      fill(0,0,200);
    }
    rect(50,50,200,100);
    textSize(60);
    fill(255);
    text('Back',90,120);
    textSize(100);
 
  } else if (display == 'account'){
    background(green,blue,red);
    fill(0);
    text('Account',900,100);
    textSize(80);
    text('Sign in',900,200);
    fill(0);
    text('Username',220,360);
    if (accountclick == 'username'){
      fill(255);
    } else {
      fill(150);
    }
    rect(600,275,800,150);
    fill(0);
    text('Password',220,560);
    if (accountclick == 'password'){
      fill(255);
    } else {
      fill(150);
    }
    rect(600,475,800,150);
    fill(0);
    text(username,630,360);
    let displaypass = '';
    y = 0;
    while (y < password.length){
      displaypass += '•';
      y += 1;
    }
    text(displaypass,630,560);
   
    if (mouseX >= 50 && mouseX <= 250 && mouseY >= 50 && mouseY <= 150){
      fill(200,0,0);
    } else {
      fill(0,0,200);
    }
    rect(50,50,200,100);
    textSize(60);
    fill(255);
    text('Back',90,120);
    if (mouseX >= 1100 && mouseX <= 1400 && mouseY >= 700 && mouseY <= 800){
      fill(200,100,0);
    } else {
      fill(200);
    }
    rect(1100,700,300,100);
    if (mouseX >= 150 && mouseX <= 950 && mouseY >= 700 && mouseY <= 800){
      fill(200,100,0);
    } else {
      fill(200);
    }
    rect(150,700,800,100);
    fill(0);
    text('Sign in',1150,780);
    text('New User? Create account!',175,780);
    
    if (accountclick == 'verifying' && animtime <= 200){
      accountanim();
      
    } else if (animtime >= 200){
      fill(200,0,0);  
      ellipse(1000,800,50,500);
    }
    fill(0);
    textSize(100);
    strokeWeight(2);
    
  } else if (display == 'create account'){
    background(green,blue,red);
    fill(0);
    textSize(80);
    text('Create Account',900,100);
    fill(255);
    rect(1450,150,500,500);
    fill(0);
    text('Username',220,230);
    if (accountclick == 'username'){
      fill(255);
    } else {
      fill(150);
    }
    rect(600,145,800,100);
    if (accountclick == 'firstname'){
      fill(255);
    } else {
      fill(150);
    }
    rect(600,530,800,100);
    fill(0);
    text('Firstname',220,595);
    text(firstname,630,595);
    textSize(28);
    text('Security Questions (if forget your password)',50,750);
    text('In what city were you born?',610,665);
    textSize(20);
    text('What was the make and model of your first car?',1020,665);
    if (accountclick == 'secq1'){
      fill(255);
    } else {
      fill(150);
    }
    rect(600,675,375,100);
    if (accountclick == 'secq2'){
      fill(255);
    } else {
      fill(150);
    }
    rect(1025,675,375,100);
    fill(0);    
    textSize(40);
    text(secq1,630,740);
    text(secq2,1060,740);
    textSize(80);
    text(username,630,230);
    text('Password',220,360);
    if (accountclick == 'password'){
      fill(255);
    } else {
      fill(150);
    }
    rect(600,275,800,100);
    fill(0);
    let displaypass = '';
    y = 0;
    while (y < password.length){
      displaypass += '•';
      y += 1;
    }
    
    text(displaypass,630,360);
    y = 0;
    displaypass = '';
    while (y < passwordagain.length){
      displaypass += '•';
      y += 1;
    }
    textSize(25);
    if (usernames.includes(username) && username != ''){
      fill(200,0,0);
      text('That username is taken!',1500,200);
      text('Please choose another one',1500,240);
    } else if (username != ''){
      fill(0,200,0);
      text('Great username!',1500,200);
    } 
    if (password != ''){
    if (password.length < 8){
      fill(200,0,0);
      text('Your password is too short! >= 8 letters!',1500,360);
    } else {
      fill(0,200,0);
      text('Your password is long enough!',1500,360);
    } 
    if (password.includes('1') || password.includes('2') || password.includes('3') || password.includes('4') || password.includes('5') || password.includes('6') || password.includes('7') || password.includes('8') || password.includes('9') || password.includes('0')){
      fill(0,200,0);
      text('Your password has a number!',1500,460);
    } else {
      fill(200,0,0);
      text('Your password needs a number!',1500,460);
    } 
    if (password == passwordagain){
      fill(0,200,0);
      text("Your passwords are the same!",1500,560);
    } else {
      fill(200,0,0);
      text("Your passwords arn't the same!",1500,560);
    }}
    fill(0);
    textSize(45);
    text('Password (Again)',220,460);
    textSize(80);
    if (accountclick == 'password again'){
      fill(255);
    } else {
      fill(150);
    }
    rect(600,405,800,100);
    fill(0);
    text(displaypass,630,460);
   
    if (mouseX >= 50 && mouseX <= 250 && mouseY >= 50 && mouseY <= 150){
      fill(200,0,0);
    } else {
      fill(0,0,200);
    }
    rect(50,50,200,100);
    textSize(60);
    fill(255);
    text('Back',90,120);
    if ((username != '' && password != '' && passwordagain != '' && firstname != '' && secq1 != '' && secq2 != '') && (password.includes('1') || password.includes('2') || password.includes('3') || password.includes('4') || password.includes('5') || password.includes('6') || password.includes('7') || password.includes('8') || password.includes('9') || password.includes('0'))){
      if (usernames.includes(username) || password.length < 8 || password != passwordagain){
        let blank = '';
      } else {
      if (mouseX >= 1450 && mouseX <= 1950 && mouseY >= 700 && mouseY <= 800 ){
        fill(255,255,0);
      } else {
        fill(200,100,0);
      }
      rect(1450,700,500,100);
      fill(0);
      text('Create account',1475,780);
      }
    }
    
    if (accountclick == 'creating account' && animtime <= 200){
      accountanim();
    } else if (accountclick == 'creating account'){
      text('Creating account',1475,780);
      usernames.push(username);
      passwords.push(password);
      fnames.push(firstname);
      secq1list.push(secq1);
      secq2list.push(secq2);
      display = 'account';
      let newRow = table.addRow();
      newRow.setString('username', username);
      newRow.setString('password', password);
      newRow.setString('firstname', firstname);
      newRow.setString('secq1', secq1);
      newRow.setString('secq2', secq2);
      //saveFile();
      //saveTable(table, 'docs/accounts.csv');
    }
    fill(0);
  } else if (display == 'settings'){
    background(blue,red,green);
    fill(0);
    text('Settings',900,100);
    if (mouseX >= 50 && mouseX <= 250 && mouseY >= 50 && mouseY <= 150){
      fill(200,0,0);
    } else {
      fill(0,0,200);
    }
    rect(50,50,200,100);
    textSize(60);
    fill(255);
    text('Back',90,120);
    textSize(100);
  }
  if (changingcolor < 255){
    changingcolor += 3;
  } else {
    changingcolor += 0.6;
  }
  
  if (changingcolor >= 1020){
    changingcolor = 255;
  }
}
var typed;

function keyTyped(){
  if (accountclick == 'username' && keyCode != ENTER){
    username += key;
  } else if (accountclick == 'password' && keyCode != ENTER){
    password += key;
  } else if (accountclick == 'password again' && keyCode != ENTER){
    passwordagain += key;
  } else if (accountclick == 'firstname' && keyCode != ENTER){
    firstname += key;
  } else if (accountclick == 'secq1' && keyCode != ENTER){
    secq1 += key;
  } else if (accountclick == 'secq2' && keyCode != ENTER){
    secq2 += key;
  }
  typed += key;
}

function keyReleased(){
  if (keyCode == BACKSPACE){
  if (accountclick == 'username'){
    username = username.substring(0, username.length -1);
  } else if (accountclick == 'password'){
    password = password.substring(0, password.length -1);
  } else if (accountclick == 'password again'){
    passwordagain = passwordagain.substring(0, passwordagain.length -1);
  } else if (accountclick == 'firstname'){
    firstname = firstname.substring(0, firstname.length -1);
  } else if (accountclick == 'secq1'){
    secq1 = secq1.substring(0, secq1.length -1);
  } else if (accountclick == 'secq2'){
    secq2 = secq2.substring(0, secq2.length -1);
  }
  typed = typed.substring(0, typed.length -1);
  }
  if (keyCode == ENTER){
  if (accountclick == 'username'){
    accountclick = 'password';
  } else if (accountclick == 'password' && display == 'account'){
    accountclick = 'verifying';
  } else if (accountclick == 'password' && display == 'create account'){
    accountclick = 'password again';
  } else if (accountclick == 'password again' && display == 'create account'){
    accountclick = 'firstname';
  } else if (accountclick == 'firstname' && display == 'create account'){
    accountclick = 'secq1';
  } else if (accountclick == 'secq1' && display == 'create account'){
    accountclick = 'secq2';
  }
  }
}

function mousePressed(){
  if (display == 'main menu') {
  if (mouseX >= 200 && mouseX <= 900 && mouseY >= 200 && mouseY <= 450){
      display = 'encryption';
    }
    rect(200,200,700,250);
    if (mouseX >= 1100 && mouseX <= 1800 && mouseY >= 200 && mouseY <= 450){
      display = 'account';
      typed = '';
    }
    rect(1100,200,700,250);
    if (mouseX >= 200 && mouseX <= 900 && mouseY >= 500 && mouseY <= 750){
      display = 'decryption';
    }
    rect(200,500,700,250);
    if (mouseX >= 1100 && mouseX <= 1800 && mouseY >= 500 && mouseY <= 750){
      display = 'settings';
    }
  }
  if (display == 'encryption' || display == 'decryption' || display == 'account' || display == 'settings') {
  if (mouseX >= 50 && mouseX <= 250 && mouseY >= 50 && mouseY <= 150){
      display = 'main menu';
    }
  }
  
  if (display == 'account'){
    rect(600,275,800,150);
    fill(0);
    text('Password',220,560);
    fill(255);
    rect(600,475,800,150);
    if (mouseX >= 600 && mouseX <= 1400 && mouseY >= 275 && mouseY <= 425){
      accountclick = 'username';
    } else if (mouseX >= 600 && mouseX <= 1400 && mouseY >= 475 && mouseY <= 625){
      accountclick = 'password';
    } else if (mouseX >= 1100 && mouseX <= 1400 && mouseY >= 700 && mouseY <= 800){
      accountclick = 'verifying';
    } else if (mouseX >= 150 && mouseX <= 950 && mouseY >= 700 && mouseY <= 800){
      accountclick = 'create account';
      display = 'create account';
    } else {
      accountclick = 'none';
    }
  }
  if (display == 'create account'){
    if (mouseX >= 600 && mouseX <= 1400 && mouseY >= 145 && mouseY <= 245){
      accountclick = 'username';
    } else if (mouseX >= 600 && mouseX <= 1400 && mouseY >= 275 && mouseY <= 375){
      accountclick = 'password';
    } else if (mouseX >= 600 && mouseX <= 1400 && mouseY >= 405 && mouseY <= 505){
      accountclick = 'password again';
    } else if (mouseX >= 50 && mouseX <= 250 && mouseY >= 50 && mouseY <= 150){
      display = 'account';
    } else if (mouseX >= 600 && mouseX <= 1400 && mouseY >= 530 && mouseY <= 630){
      accountclick = 'firstname';
    } else if (mouseX >= 600 && mouseX <= 975 && mouseY >= 675 && mouseY <= 775){
      accountclick = 'secq1';
    } else if (mouseX >= 1025 && mouseX <= 1400 && mouseY >= 675 && mouseY <= 775){
      accountclick = 'secq2';
    } else if (mouseX >= 1450 && mouseX <= 1950 && mouseY >= 700 && mouseY <= 800){
     if ((username != '' && password != '' && passwordagain != '' && firstname != '' && secq1 != '' && secq2 != '') && (password.includes('1') || password.includes('2') || password.includes('3') || password.includes('4') || password.includes('5') || password.includes('6') || password.includes('7') || password.includes('8') || password.includes('9') || password.includes('0'))){
      if (usernames.includes(username) || password.length < 8 || password != passwordagain){
        let blank = '';
      } else {
        accountclick = 'creating account';
      }
    }
    } 
  }
  accountanimx = 1000;
  accountanimy = 750;
  aaxd = 'right';
  aayd = 'down';
  animtime = 0;
}

function saveFile(){
  saveTable(table, 'docs/accounts.csv');
  print('wrote to file');
}

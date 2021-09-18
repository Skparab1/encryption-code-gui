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
  try{
    usernames = table.getColumn(0);
    passwords = table.getColumn(1);
    fnames = table.getColumn(2);
    secq1list = table.getColumn(3);
    secq2list = table.getColumn(4);
  } catch(error) {
    usernames = [];
    passwords = [];
    fnames = [];
    secq1list = [];
    secq2list = [];
  }
}

var logosize = 250;
var firsttime = true;
var x = 0;
var hovered = false;
var startingcycle = 1;
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
var animtime = 1;
var colorscheme = 'Spectrum (Default)';
var textcolor = [255,255,255];
var backgroundcolor = [0,0,0];
var bg;
var ccstart = 255;
var ccs = 255;
var toencrypt = '';

//var signinstatus = 'signed out';
try{
  var signinstatus = localStorage.getItem('localstatus');
  var signinstatus = signinstatus || 'signed out';
} catch(error){
  var signinstatus = 'signed out';
}
var wrongpassword = false;
var wrongreset = false;
var showpassword = false;
localStorage.setItem('localstatus',signinstatus);
var readstatus = localStorage.getItem('localstatus');
var tabstatus = false;
var isignedout = false;
var accountcounter = 0;
var foundglobalaccount = false;
var encryptionclick = 'input';
var signintype = 'signed out';
var sync = 'on';

if (signinstatus == 'signed out'){
  signintype = 'signed out';
} else {
  let storeaccountnum = 0;
  accountcounter = 0;
  signintype = 'local';
  
  while (accountcounter <= 100){
    let findusnm = usernames[accountcounter];
    let findpswd = passwords[accountcounter];
    if (findusnm == username && findpswd == password){
      foundglobalaccount = true;
      storeaccountnum = accountcounter;
      signintype = 'global';
    }
    accountcounter += 1;
  }
  
}

function accountanim(){
      fill(200,0,0);
      strokeWeight(10);
      stroke(0,0,200);
      fill(0,0,200);
      rect(0,0,animtime*20.5,15);
      fill(0);
      stroke(0);
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
      
      //animtime = animtime + 1 ;
      animtime = (1.07 * animtime) ;
      print(animtime);
      strokeWeight(3);
}

function draw() {
  if (sync == 'on'){
    readstatus = localStorage.getItem('localstatus');
    if (readstatus == 'signed out' && signinstatus != 'signed out'){
      display = 'expired';
      localStorage.setItem('localstatus','signed out');
    }
    if (readstatus == null){
      localStorage.setItem('localstatus','signed out');
      signinstatus = 'signed out';
    }
    if (readstatus != 'signed out' && signinstatus == 'signed out' && isignedout == false){
      signinstatus = readstatus;
    }
    localStorage.setItem('localstatus',signinstatus);
    if (signinstatus == 'signed out' && isignedout && readstatus == 'signed out'){
      localStorage.setItem('localstatus',signinstatus);
      isignedout = false;
    }
  }
  
  localStorage.setItem('localstatus',signinstatus);
  clear();
  background(0);
  // Colors: Spectrum (Default), spectrum light, spectrum bright, red-green, red-blue, green-blue, high-contrast, black-white, default dark, dark blue, default light
  if (colorscheme == 'Spectrum (Default)'){
  red = (255-Math.abs(255-changingcolor));
  green = (255-Math.abs(510-changingcolor));
  blue = (255-Math.abs(765-changingcolor));
  if (changingcolor >= 765){
    red = (255-Math.abs(1020-changingcolor));
  }
  backgroundcolor = [red,green,blue];
  textcolor = [0,0,0];
  } else if (colorscheme == 'spectrum light'){
  background(150);
  red = (255-Math.abs(255-changingcolor));
  green = (255-Math.abs(510-changingcolor));
  blue = (255-Math.abs(765-changingcolor));
  if (changingcolor >= 765){
    red = (255-Math.abs(1020-changingcolor));
  }
  backgroundcolor = [200,200,200];
  } else  if (colorscheme == 'spectrum bright'){
  red = (255-Math.abs(255-changingcolor));
  green = (255-Math.abs(510-changingcolor));
  blue = (255-Math.abs(765-changingcolor));
  if (changingcolor >= 765){
    red = (255-Math.abs(1020-changingcolor));
  }
  textcolor = [0,0,0];
  if (blue < 0){
    blue = 0;
  }
  if (green < 0){
    green = 0;
  }
  if (red < 0){
    red = 0;
  }
  if ((blue + green + red < 510) && (changingcolor >= 255)){
    red = red + (510 - blue + green + red);  
  }
  if ((blue + green + red < 510) && (changingcolor >= 255)){
    green = green + (510 - blue + green + red);   
  }
  if ((blue + green + red < 510) && (changingcolor >= 255)){
    blue = blue + (510 - blue + green + red);
  }
  backgroundcolor = [red,green,blue];
  } else if (colorscheme == 'red-green'){
  red = (255-Math.abs(255-changingcolor));
  green = (255-Math.abs(510-changingcolor));
  blue = (0);
  if (changingcolor >= 510){
    red = (255-Math.abs(765-changingcolor));
  }
  if (changingcolor >= 756){
    changingcolor = 255;
  }
  textcolor = [0,0,0];
  backgroundcolor = [red,green,blue];
  } else if (colorscheme == 'red-blue'){
  red = (255-Math.abs(255-changingcolor));
  blue = (255-Math.abs(510-changingcolor));
  green = (0);
  if (changingcolor >= 510){
    red = (255-Math.abs(765-changingcolor));
  }
  if (changingcolor >= 756){
    changingcolor = 255;
  }
  textcolor = [0,0,0];
  backgroundcolor = [red,green,blue];
  } else if (colorscheme == 'green-blue'){
  green = (255-Math.abs(255-changingcolor));
  blue = (255-Math.abs(510-changingcolor));
  red = (0);
  if (changingcolor >= 510){
    green = (255-Math.abs(765-changingcolor));
  }
  if (changingcolor >= 756){
    changingcolor = 255;
  }
  textcolor = [0,0,0];
  backgroundcolor = [red,green,blue];
  } else if (colorscheme == 'high contrast'){
  green = (255);
  blue = (0);
  red = (255);
  textcolor = [255,255,0];
  backgroundcolor = [0,0,0];
  } else if (colorscheme == 'black-white'){
  green = (255);
  blue = (255);
  red = (255);
  textcolor = [255,255,255];
  backgroundcolor = [0,0,0];
  } else if (colorscheme == 'default dark'){
  green = (130);
  blue = (130);
  red = (130);
  textcolor = [255,255,190];
  backgroundcolor = [0,0,100];
  } else if (colorscheme == 'dark blue'){
  green = (0);
  blue = (130);
  red = (0);
  textcolor = [50,0,0];
  } else if (colorscheme == 'default light'){
  green = (150);
  blue = (150);
  red = (150);
  textcolor = [0,0,0];
  backgroundcolor = [100,100,100];
  }
  
  stroke(textcolor[0], textcolor[1], textcolor[2]);
    
  if (logosize < 5250){
  background(0);
  image(logo,700-((logosize-250)/2), 200-((logosize-250)/2)-((logosize-250)/5),logosize,logosize);
  if (firsttime){
    setInterval(donothing,100);
  } else if (hovered) {
    requestAnimationFrame(donothing,0);
    if (logosize <= 4500){
      logosize = logosize + 150;
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
    if (startingcycle == 2){
      fill((x-50)*4,(x-100)*4,x*4);
      text('Hover over logo to begin',450,800);
    } else {
      fill((x-100)*4,x*4,(x-50)*4);
      text('With great graphics comes great capability',250,800);
    }
  } else {
    setInterval(donothing,100);
    textSize(150);
    fill(255 - ((x-160)*6.5));
    text('Encryption code ',400,650);
    textSize(75);
    if (startingcycle == 2) {
      text('Hover over logo to begin',450,800);
    } else {
      text('With great graphics comes great capability',250,800);
    }
  }
  fill(red,green,blue);
  firsttime = false;
  x = x + 1;
  if (x == 199 && hovered == false){
    if (startingcycle == 1){
      startingcycle = 2;
    } else {
      startingcycle = 1;
    }
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
    textSize(90);
    // Colors: Spectrum (Default), spectrum light, spectrum bright, red-green, red-blue, green-blue, high-contrast, black-white, default dark, dark blue, default light
    if (colorscheme != 'spectrum light' && colorscheme!= 'default light'){
      bg = 0;
    } else {
      bg = 200;
    }
    fill(red,green,blue);
    text('Encryption code Graphical User Interface (GUI)',50,100);
    textSize(50);
    text(signinstatus,900,175);
    textSize(90);
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
    fill(bg);
    text("Encrypt",400,350);
    text("Decrypt",400,650);
    text("Account",1300,350);
    text("Settings",1300,650);
  } else if (display == 'expired'){
    background(0);
    setInterval(donothing,1000);
    fill(backgroundcolor[0],backgroundcolor[1],backgroundcolor[2]);
    textSize(60);
    text('User session expired. You are logged out.',500,300);
    text('Looks like you signed out in another tab',500,400);
    text('Encryption code GUI is synced between tabs',500,500);
    text('Click anywhere to continue',550,600);
    localStorage.setItem('localstatus','signed out');
    if (tabstatus){
      display = 'main menu';
    }
  } else if (display == 'encryption'){
    background(backgroundcolor[0],backgroundcolor[1],backgroundcolor[2]);
    fill(textcolor[0],textcolor[1],textcolor[2]);
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
    if (encryptionclick == 'input'){
      fill(255);
    } else {
      fill(150);
    }
    rect(300,300,700,200);
    fill(255);
    rect(800,700,400,150);
    fill(0);
    stroke(0);
    text(toencrypt,300,375);
    textSize(50);
    text('Download Txt',800,750);
    
    
  } else if (display == 'decryption'){
    background(backgroundcolor[0],backgroundcolor[1],backgroundcolor[2]);
    fill(textcolor[0],textcolor[1],textcolor[2]);
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
 
  } else if (display == 'account' && signinstatus == 'signed out'){
    background(backgroundcolor[0],backgroundcolor[1],backgroundcolor[2]);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    text('Account',900,100);
    textSize(80);
    text('Sign in',900,200);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    text('Username',220,360);
    if (accountclick == 'username'){
      fill(255);
    } else {
      fill(150);
    }
    rect(600,275,800,150);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    text('Password',220,560);
    if (accountclick == 'password'){
      fill(255);
    } else {
      fill(150);
    }
    rect(600,475,800,150);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    text(username,630,360);
    if (showpassword == false){
        let y = 0;
        displaypass = '';
        while (y < password.length){
          displaypass += '•';
          y += 1;
        }
      } else {
        displaypass = password;
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
    } else if (accountclick == 'verifying'){
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
    if (mouseX >= 1450 && mouseX <= 1975 && mouseY >= 700 && mouseY <= 800){
      fill(200,100,0);
    } else {
      fill(200);
    }
    rect(1450,700,525,100);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    text('Sign in',1150,780);
    if (wrongpassword){
      textSize(35);
      text('Username or Password incorrect',1420,500);
      textSize(60);
    }
    text('New User? Create account!',175,780);
    text('Forgot password?',1475,780);
    
    if (showpassword){
      fill(0,200,0);
    } else if (mouseX >= 1450 && mouseX <= 1975 && mouseY >= 550 && mouseY <= 625){
      fill(200,100,0);
    } else {
      fill(200);
    }
    rect(1450,550,500,75);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    text('Show password',1500,600);
    
    if (accountclick == 'verifying' && animtime <= 125){
      accountanim();
    } else if (animtime >= 125 && accountclick == 'verifying'){
      fill(200,0,0);  
      let usnm = localStorage.getItem('username');
      let pswd = localStorage.getItem('password');
      let fname = localStorage.getItem('firstname');
      
      let storeaccountnum = 0;
      foundglobalaccount = false;
      accountcounter = 0;
      while (accountcounter <= 100){
        let findusnm = usernames[accountcounter];
        let findpswd = passwords[accountcounter];
        if (findusnm == username && findpswd == password){
          foundglobalaccount = true;
          storeaccountnum = accountcounter;
        }
        accountcounter += 1;
      }
      
      print(storeaccountnum);
      
      
      if ((usnm == username && pswd == password) || foundglobalaccount){
        if (foundglobalaccount){
          if (foundglobalaccount){
            signinstatus = 'Hi, ' + fnames[storeaccountnum];
            signintype = 'global';
          } else {
            wrongpassword = true;
            password = '';
            if (username == ''){
              accountclick = 'username';
            } else {
              accountclick = 'password';
            }
          }
        } else {
          signinstatus = 'Hi, '+fname;
          signintype = 'local';
        }
        localStorage.setItem('localstatus',signinstatus);
        display = 'main menu';
      } else {
        wrongpassword = true;
        password = '';
        if (username == ''){
          accountclick = 'username';
        } else {
          accountclick = 'password';
        }
      }
    }
    fill(textcolor[0],textcolor[1],textcolor[2]);
    textSize(100);
    strokeWeight(2);
    
  } else if (display == 'create account'){
    background(backgroundcolor[0],backgroundcolor[1],backgroundcolor[2]);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    textSize(80);
    text('Create Account',900,100);
    fill(255);
    rect(1450,150,500,500);
    fill(textcolor[0],textcolor[1],textcolor[2]);
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
    fill(textcolor[0],textcolor[1],textcolor[2]);
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
    fill(textcolor[0],textcolor[1],textcolor[2]);  
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
    fill(textcolor[0],textcolor[1],textcolor[2]);
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
    fill(textcolor[0],textcolor[1],textcolor[2]);
    textSize(45);
    text('Password (Again)',220,460);
    textSize(80);
    if (accountclick == 'password again'){
      fill(255);
    } else {
      fill(150);
    }
    rect(600,405,800,100);
    fill(textcolor[0],textcolor[1],textcolor[2]);
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
      fill(textcolor[0],textcolor[1],textcolor[2]);
      text('Create account',1475,780);
      }
    }
    
    if (accountclick == 'creating account' && animtime <= 150){
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
      localStorage.setItem('firstname',firstname);
      localStorage.setItem('password',password);
      localStorage.setItem('username',username);
      localStorage.setItem('secq1',secq1);
      localStorage.setItem('secq2',secq2);
      //saveFile();
    }
    fill(0);
  } else if (display == 'account' && signinstatus != 'signed out'){
    background(backgroundcolor[0],backgroundcolor[1],backgroundcolor[2]);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    text('Account Dashboard',650,100);
    text(signinstatus,650,200);
    textSize(40);
    
    signintype = 'local';
    foundglobalaccount = false;
    accountcounter = 0;
    while (accountcounter <= 100){
      let findusnm = usernames[accountcounter];
      let findpswd = passwords[accountcounter];
      if (findusnm == username && findpswd == password){
        foundglobalaccount = true;
        storeaccountnum = accountcounter;
        signintype = 'global';
      }
      accountcounter += 1;
    }
    
    text('this is your '+signintype+' account',1400,200);
    if (mouseX >= 50 && mouseX <= 250 && mouseY >= 50 && mouseY <= 150){
      fill(200,0,0);
    } else {
      fill(0,0,200);
    }
    rect(50,50,200,100);
    textSize(60);
    fill(255);
    text('Back',90,120);
    textSize(80);
    if (mouseX >= 1400 && mouseX <= 1900 && mouseY >= 50 && mouseY <= 150){
      fill(200,100,0);
    } else {
      fill(200);
    }
    rect(1400,50,500,100);
    fill(255);
    rect(75,275,400,100);
    text('Sign out',1500,120);
    if (sync == 'on'){
      fill(0,255,0);
      rect(75,275,200,100);
      fill(0);
      text('ON',100,350);
    } else {
      fill(255,0,0);
      rect(275,275,200,100);
      fill(0);
      text('         OFF',100,350);
    }
    fill(255);
    
    if (accountclick == 'signing out' && animtime <= 100){
        accountanim();
    } else if (accountclick == 'signing out' ){
      signinstatus = 'signed out';
      tabstatus = true;
      username = '';
      password = '';
      display = 'main menu';
      localStorage.setItem('localstatus','signed out' );
      isignedout = true;
      accountanimx = 1000;
      accountanimy = 750;
      aaxd = 'right';
      aayd = 'down';
      animtime = 1;
    }
    
  } else if (display == 'forgot password'){
    background(backgroundcolor[0],backgroundcolor[1],backgroundcolor[2]);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    textSize(90);
    text('Forgot password? No Problem.',450,100);
    if (mouseX >= 50 && mouseX <= 250 && mouseY >= 50 && mouseY <= 150){
      fill(200,0,0);
    } else {
      fill(0,0,200);
    }
    rect(50,50,200,100);
    textSize(60);
    fill(255);
    text('Back',90,120);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    text('Username',280,260);
    if (accountclick == 'username'){
      fill(255);
    } else {
      fill(150);
    }
    rect(600,175,800,150);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    text('Security Questions',790,390);
    textSize(25);
    text('In what city were your born?',260,500);
    text('What was the make and model of your first car?',50,700);
    if (accountclick == 'secq1'){
      fill(255);
    } else {
      fill(150);
    }
    rect(600,425,800,150);
    if (accountclick == 'secq2'){
      fill(255);
    } else {
      fill(150);
    }
    rect(600,625,800,150);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    textSize(90);
    text(username,630,260);
    text(secq1,630,530);  
    text(secq2,630,720);
    if (wrongreset){
      textSize(35);
      text('Security answers incorrect',1420,500);
      textSize(60);
    }
    let displaypass;
    if (accountclick == 'new password'){
      fill(255);
      rect(1450,625,500,150);
      textSize(45);
      fill(0);
      if (showpassword == false){
        let y = 0;
        displaypass = '';
        while (y < password.length){
          displaypass += '•';
          y += 1;
        }
      } else {
        displaypass = password;
      }
      textSize(60);
      text(displaypass,1520,725);
      textSize(35);
      text('New password',1520,610);
      textSize(30);
      if (password != ''){
      if (password.length < 8){
        fill(200,0,0);
        text('Your password is too short! >= 8 letters!',1450,360);
      } else {
        fill(0,200,0);
        
        text('Your password is long enough!',1450,360);
      } 
      if (password.includes('1') || password.includes('2') || password.includes('3') || password.includes('4') || password.includes('5') || password.includes('6') || password.includes('7') || password.includes('8') || password.includes('9') || password.includes('0')){
        fill(0,200,0);
        text('Your password has a number!',1450,460);
      } else {
        fill(200,0,0);
        text('Your password needs a number!',1450,460);
      } 
      }
      textSize(35);
      if ((password.includes('1') || password.includes('2') || password.includes('3') || password.includes('4') || password.includes('5') || password.includes('6') || password.includes('7') || password.includes('8') || password.includes('9') || password.includes('0'))){
      if (password.length < 8){
        let blank = '';
      } else {
      if (mouseX >= 1450 && mouseX <= 1950 && mouseY >= 550 && mouseY <= 650 ){
        fill(255,255,0);
      } else {
        fill(200,100,0);
      }
      rect(1450,550,500,100);
      fill(textcolor[0],textcolor[1],textcolor[2]);
      text('Set new Password',1500,600);
      }
    }
    if (showpassword){
      fill(0,200,0);
    } else if (mouseX >= 1450 && mouseX <= 1975 && mouseY >= 775 && mouseY <= 850){
      fill(200,100,0);
    } else {
      fill(200);
    }
    rect(1450,775,500,75);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    text('Show password',1500,825);
    }
    if (username != '' && secq1 != '' && secq2 != '' && accountclick != 'new password'){
      textSize(45);
      if (mouseX >= 1500 && mouseX <= 1800 && mouseY >= 625 && mouseY <= 775){
        fill(255,0,0);
      } else {
        fill(255,255,0);
      }
      rect(1500,625,350,150);
      fill(0);
      text('Authenticate',1540,725);
      if (accountclick == 'resetting password' && animtime <= 150){
        accountanim();
      } else if (accountclick == 'resetting password'){
        let usnm = localStorage.getItem('username');
        let secq1read = localStorage.getItem('secq1');
        let secq2read = localStorage.getItem('secq2');
        if (usnm == username && secq1 == secq1read && secq2 == secq2read){
          wrongreset = false;
          password = '';
          accountclick = 'new password';
        } else {
          wrongreset = true;
          accountclick = 'secq1';
          secq1 = '';
          secq2 = '';
        }
        // Next, do checking for stored sign in/sign out to create session expiring from different tabs  
      }
    }
  } else if (display == 'settings'){
    // Colors: Spectrum (Default), spectrum light, spectrum bright, red-green, red-blue, green-blue, high-contrast, black-white, default dark, dark blue, default light
    background(backgroundcolor[0],backgroundcolor[1],backgroundcolor[2]);
    stroke(backgroundcolor[0],backgroundcolor[1],backgroundcolor[2]);
    fill(textcolor[0],textcolor[1],textcolor[2]);
    text('Settings',900,100);
    textSize(40);
    text('Spectrum (Default)',240,215);
    text('Spectrum light',310,275);
    text('Spectrum bright',310,335);
    text('Red Green',310,395);
    text('Green Blue',310,455);
    text('Blue Red',310,515);
    text('High contrast',310,575);
    text('Black White',310,635);
    text('Default Dark',310,695);
    text('Dark Blue',310,755);
    text('Default light',310,815);
    
    text('Backend',900,850);
    
    
    if (mouseX >= 50 && mouseX <= 250 && mouseY >= 50 && mouseY <= 150){
      fill(200,0,0);
    } else {
      fill(0,0,200);
    }
    rect(50,50,200,100);
    if (mouseX >= 200 && mouseX <= 300 && mouseY >= 200 && mouseY <= 275){
      fill(200,0,0);
    } else {
      fill(255,255,0);
    }
    let xpos = 100;
    let cc = ccstart;
    while (xpos <= 300){
      red = (255-Math.abs(255-cc));
      green = (255-Math.abs(510-cc));
      blue = (255-Math.abs(765-cc));
      if (cc >= 765){
        red = (255-Math.abs(1020-cc));
      }
      stroke(red,green,blue);
      fill(red,green,blue);
      rect(xpos,175,1,60);
      cc += 4;
      xpos += 1;
    }
    ccstart -= 1;
    if (ccstart <= -510){
      ccstart = 255;
    } 
    xpos = 100;
    cc = ccs-150;
    while (xpos <= 300){
        red = (255-Math.abs(255-cc));
        green = (255-Math.abs(510-cc));
        blue = (255-Math.abs(765-cc));
        if (cc >= 765){
          red = Math.abs(765-cc);
          green = Math.abs(765-cc);
          cc -= 1;
        }
        stroke(red,green,blue);
        fill(red,green,blue);
        rect(xpos,235,1,60);
        cc += 4;
        xpos += 1;
      }
      ccs += 1;
      if (ccs >= 1020){
        ccs = 255;
      } 
      
        while (xpos <= 300){
          if (blue < 0){
        blue = 0;
      }
      if (green < 0){
        green = 0;
      }
      if (red < 0){
        red = 0;
      }
      if ((blue + green + red < 510) && (changingcolor >= 255)){
        red = red + (510 - blue + green + red);  
      }
      if ((blue + green + red < 510) && (changingcolor >= 255)){
        green = green + (510 - blue + green + red);   
      }
      if ((blue + green + red < 510) && (changingcolor >= 255)){
        blue = blue + (510 - blue + green + red);
      }
      stroke(red,green,blue);
      fill(red,green,blue);
      rect(xpos,295,1,60);
      cc += 4;
      xpos += 1;
    }
    xpos = 100;
    cc = ccstart;
    while (xpos <= 300){
      red = (255-Math.abs(255-cc)) + 100;
      green = (255-Math.abs(510-cc)) + 100;
      blue = (255-Math.abs(765-cc)) + 100;
      if (cc >= 765){
        red = (255-Math.abs(1020-cc));
      }
      stroke(red,green,blue);
      fill(red,green,blue);
      rect(xpos,295,1,60);
      cc += 4;
      xpos += 1;
    }
    ccstart -= 1;
    xpos = 100;
    cc1 = 150;
    while (xpos <= 300){
      red = (255-Math.abs(255-cc1));
      green = (255-Math.abs(510-cc1));
      blue = (255-Math.abs(765-cc1));
      if (cc1 >= 765){
        red = (255-Math.abs(1020-cc1));
      }
      stroke(red,green,blue);
      fill(red,green,blue);
      rect(xpos,355,2,60);
      cc1 += 4;
      xpos += 2;
    }
    
    xpos = 100;
    cc1 = 450;
    while (xpos <= 300){
      red = (255-Math.abs(255-cc1));
      green = (255-Math.abs(510-cc1));
      blue = (255-Math.abs(765-cc1));
      if (cc1 >= 765){
        red = (255-Math.abs(1020-cc1));
      }
      stroke(red,green,blue);
      fill(red,green,blue);
      rect(xpos,415,2,60);
      cc1 += 4;
      xpos += 2;
    }
    
    xpos = 100;
    cc1 = 700;
    while (xpos <= 300){
      red = (255-Math.abs(255-cc1));
      green = (255-Math.abs(510-cc1));
      blue = (255-Math.abs(765-cc1));
      if (cc1 >= 765){
        red = (255-Math.abs(1020-cc1));
      }
      stroke(red,green,blue);
      fill(red,green,blue);
      rect(xpos,475,2,60);
      cc1 += 4;
      xpos += 2;
    }
    
    if (ccstart <= -510){
      ccstart = 255;
    } 
    fill(0);
    rect(100,535,200,60);
    rect(100,595,200,60);
    fill(255,255,0);
    text('  H   C',100,580);
    fill(255);
    text('  B   W',100,640);
    //rect(100,655,200,60);
    //rect(100,715,200,60);
    
    fill(textcolor[0],textcolor[1],textcolor[2]);
    // Colors: Spectrum (Default), spectrum light, spectrum bright, red-green, red-blue, green-blue, high-contrast, black-white, default dark, dark blue, default light
    fill(0);
    text(colorscheme,600 ,500);
    
    textSize(60);
    fill(255);
    text('Back',90,120);
    textSize(100);
    fill(textcolor[0],textcolor[1],textcolor[2]);
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
  } else if ((accountclick == 'password' || accountclick == 'new password') && keyCode != ENTER){
    password += key;
  } else if (accountclick == 'password again' && keyCode != ENTER){
    passwordagain += key;
  } else if (accountclick == 'firstname' && keyCode != ENTER){
    firstname += key;
  } else if (accountclick == 'secq1' && keyCode != ENTER){
    secq1 += key;
  } else if (accountclick == 'secq2' && keyCode != ENTER){
    secq2 += key;
  } else if (logosize < 5250){
    hovered = true;
  } else if (display == 'encryption' && encryptionclick == 'encrypting'){
    toencrypt += key;
  }
  typed += key; 
}

function keyReleased(){
  if (keyCode == BACKSPACE){
  if (accountclick == 'username'){
    username = username.substring(0, username.length -1);
  } else if (accountclick == 'password' || accountclick == 'new password'){
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
  if (accountclick == 'username' && display == 'account'){
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
  } else if (accountclick == 'username' && display == 'forgot password'){
    accountclick = 'secq1';
  } else if (accountclick == 'secq1' && display == 'forgot password'){
    accountclick = 'secq2';
  }
  }
}

function mousePressed(){
  if (display == 'main menu') {
  if (mouseX >= 200 && mouseX <= 900 && mouseY >= 200 && mouseY <= 450){
      display = 'encryption';
      encryptionclick = 'encrypting';
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
  if (display == 'encryption' || display == 'decryption' || display == 'account' || display == 'settings' || display == 'forgot password') {
  if (mouseX >= 50 && mouseX <= 250 && mouseY >= 50 && mouseY <= 150){
      display = 'main menu';
    }
  }
  
  if (display == 'account' && signinstatus == 'signed out'){
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
      tabstatus = true;
    } else if (mouseX >= 150 && mouseX <= 950 && mouseY >= 700 && mouseY <= 800){
      accountclick = 'create account';
      display = 'create account';
    } else if (mouseX >= 1450 && mouseX <= 1975 && mouseY >= 700 && mouseY <= 800){
      accountclick = 'username';
      secq1 = '';
      secq2 = '';
      display = 'forgot password';
    } else if (mouseX >= 1450 && mouseX <= 1950 && mouseY >= 550 && mouseY <= 625 && showpassword == false){
      showpassword = true;
    } else if (mouseX >= 1450 && mouseX <= 1950 && mouseY >= 550 && mouseY <= 625 && showpassword){
      showpassword = false;
    } else {
      accountclick = 'none';
    }
  }
  
  if (display == 'account' && signinstatus != 'signed out'){
    if (mouseX >= 1400 && mouseX <= 1900 && mouseY >= 50 && mouseY <= 150){
      accountclick = 'signing out';
    } else if (mouseX >= 75 && mouseX <= 475 && mouseY >= 275 && mouseY <= 375 && sync == 'on'){
      sync = 'off';
    } else if (mouseX >= 75 && mouseX <= 475 && mouseY >= 275 && mouseY <= 375 && sync == 'off'){
      sync = 'on';
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
  if (display == 'settings'){
    if (mouseX >= 200 && mouseX <= 300 && mouseY >= 200 && mouseY <= 275){
      // Colors: Spectrum (Default), spectrum light, spectrum bright, red-green, red-blue, green-blue, high-contrast, black-white, default dark, dark blue, default light
      if (colorscheme == 'Spectrum (Default)'){
        colorscheme = 'spectrum light';
      } else if (colorscheme == 'spectrum light'){
        colorscheme = 'spectrum bright';
      } else if (colorscheme == 'spectrum bright'){
        colorscheme = 'red-green';
      } else if (colorscheme == 'red-green'){
        colorscheme = 'red-blue';
      } else if (colorscheme == 'red-blue'){
        colorscheme = 'high contrast';
      } else if (colorscheme == 'high contrast'){
        colorscheme = 'Spectrum (Default)';
      }
  }
  } else if (display == 'forgot password'){
    if (mouseX >= 600 && mouseX <= 1400 && mouseY >= 175 && mouseY <= 325 && accountclick != 'new password'){
      accountclick = 'username';
    } else if (mouseX >= 600 && mouseX <= 1400 && mouseY >= 425 && mouseY <= 575 && accountclick != 'new password'){
      accountclick = 'secq1';
    } else if (mouseX >= 600 && mouseX <= 1400 && mouseY >= 625 && mouseY <= 775 && accountclick != 'new password'){
      accountclick = 'secq2';
    } else if (mouseX >= 1500 && mouseX <= 1800 && mouseY >= 625 && mouseY <= 775 && accountclick != 'new password'){
      accountclick = 'resetting password';
    } else if (mouseX >= 1450 && mouseX <= 1950 && mouseY >= 775 && mouseY <= 850 && accountclick == 'new password' && showpassword == false){
      showpassword = true;
    } else if (mouseX >= 1450 && mouseX <= 1950 && mouseY >= 775 && mouseY <= 850 && accountclick == 'new password' && showpassword){
      showpassword = false;
    } else if (mouseX >= 1450 && mouseX <= 1950 && mouseY >= 550 && mouseY <= 650 && accountclick == 'new password'){
      localStorage.setItem('password',password);
      display = 'main menu';
      username = '';
      password = '';
    }
  } else if (display == 'expired'){
    signinstatus = 'signed out';
    tabstatus = true;
    username = '';
    password = '';
    secq1 = '';
    secq2 = '';
    display = 'main menu';
    localStorage.setItem('localstatus','signed out' );
  } else if (display == 'encryption'){
    if (mouseX >= 800 && mouseX <= 1200 && mouseY >= 700 && mouseY <= 850){
      let writer = createWriter('encrypted_text.txt');
      writer.write(toencrypt);
      writer.close();
    }
  }
  accountanimx = 1000;
  accountanimy = 750;
  aaxd = 'right';
  aayd = 'down';
  animtime = 1;
}

function saveFile(){
  storeItem(table, 'accounts.csv');
  print('wrote to file');
}

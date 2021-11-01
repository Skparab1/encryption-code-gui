let input;
let img;

function setup() {
  
  createCanvas(1024,420);  
  textSize(18);
  //text("Click on the file input and select a file.", 20, 20);
  
  input = createFileInput(handleFile);
  input.position(650, 365);

}

var changingcolor = 0;
var countervar = 680;
var barcolor = 0;
var startedupload = false;

var colorx = 900;
var colory = 75;
var bwx = 900;
var bwy = 175;

var cplus = 0;
var colornow = [10,265,190];
var tintcolor = [255,255,255];

var linearray = [];
var oldpoint = [0,0];
var linecolors = [];
var limiter = 0;
var clicktext = false;
var textarray = [];

var cursorpos = [7000,7000];
var cursorblinker = 0;
var typed = '';

var size = 10;
var drawsizes = [];

function draw() {
  clear();
  
  if (!img && !startedupload){
  
  let i = countervar-700;
  
  background((255-Math.abs(255-changingcolor+i))+200,(255-Math.abs(510-changingcolor+i))+200,(255-Math.abs(710-changingcolor+i))+200);
  
  red = (255-Math.abs(255-changingcolor))+100; //   0          255              
  green = (255-Math.abs(510-changingcolor))+100; // 100        100 
  blue = (255-Math.abs(765-changingcolor))+100; //  255         0       
  if (changingcolor >= 765){                                                        // @765    @1020
    red = (255-Math.abs(1020-changingcolor)) + (255 * ((changingcolor-765)/255)); //   ok        255+255
    green = 100;                                                                  //    ok       
    blue = (255-Math.abs(765-changingcolor)) + (255-(changingcolor-765));           //   ok     
  }
  background(0);
  
 if (countervar <= 1000){
    countervar += 1.5;
    changingcolor += 1.5;
  } else {
    barcolor += 2;
  }
  
  textSize(50);
  stroke(countervar-680) ;
  fill(countervar-680) ;
  text('Ezpixel Pro',400,50);    
  
  while (i > 0){
    fill((255-Math.abs(255-changingcolor+i))+200,(255-Math.abs(510-changingcolor+i))+200,(255-Math.abs(710-changingcolor+i))+200);

    stroke((255-Math.abs(255-changingcolor+i))+200,(255-Math.abs(510-changingcolor+i))+200,(255-Math.abs(710-changingcolor+i))+200);
    ellipse(500,200,i,i);
    i -= 1;
  }
  
  i = countervar-750;
  while (i > 0){
    fill((255-Math.abs(510-changingcolor+i))+200,(255-Math.abs(710-changingcolor+i))+200,(255-Math.abs(255-changingcolor+i))+200);

    stroke((255-Math.abs(510-changingcolor+i))+200,(255-Math.abs(710-changingcolor+i))+200,(255-Math.abs(255-changingcolor+i))+200);
    ellipse(200,200,i,i);
    i -= 1;
  }
  
  if (mouseY > 350 && mouseY < 400){
    fill(200,255,0);
  } else {
    fill(countervar-790);
  }
  stroke(0);
  rect(0,350,1000,50);
  textSize(30);
  
  if (barcolor > 0){
    fill(barcolor,(255-Math.abs(510-changingcolor+i))+200,(255-Math.abs(710-changingcolor+i))+200);
    stroke(barcolor,(255-Math.abs(510-changingcolor+i))+200,(255-Math.abs(710-changingcolor+i))+200);
    rect(0,350,barcolor,50);
    rect(1000,350,-barcolor,50);
  }
  
  fill(0);
  text('Select file and get started',250,390);
  
  i = countervar-800;
  while (i > 0){
    fill((255-Math.abs(710-changingcolor+i))+200,(255-Math.abs(255-changingcolor+i))+200,(255-Math.abs(510-changingcolor+i))+200);

    stroke((255-Math.abs(710-changingcolor+i))+200,(255-Math.abs(255-changingcolor+i))+200,(255-Math.abs(510-changingcolor+i))+200);
    ellipse(800,200,i,i);
    i -= 1;
  }
  
  textSize(40);
  stroke(countervar-750) ;
  fill(countervar-750) ;
  text('High Quality Free and open source photo editing',50,100);
  
  stroke(countervar-790) ;
  fill(countervar-790) ;
  
  if (countervar >= 800){
    //input = createFileInput(handleFile);
    //input.position(650, 365);
    //input.size(100,100);
  }
  
  } else if (!img){
    fill(150);
    rect(0,0,1000,500);
    fill(200,0,0);
    textSize(60);
    text('Uploading....',300,200);
    text('Wait for it',300,300);
  } else if (img) {
    if (img.height <= img.width){
      tint(0, 153, 204);
      image(img, 0, 0, width-300, ((width-300)*img.height)/img.width);
    } else {
      tint(0, 153, 204);
      image(img, 0, 0, (height*img.width)/img.height, height);
    }
    
    fill(150);
    rect(750,0,300,600);
    
    textSize(30);
    fill(0);
    text('Colorpalette',800,45);
    
    let ypos = 50;
    
    while (ypos < 100){
      let xpos = 750;
      let cc = 0;
      while (xpos <= 1300){
        red = (255-Math.abs(255-cc))+100; // = 10
        green = (255-Math.abs(510-cc))+100; //265
        blue = (255-Math.abs(765-cc))+100;  // 190
        stroke(red+cplus,green+cplus,blue+cplus);
        fill(red+cplus,green+cplus,blue+cplus);
        rect(xpos,ypos,1,1);
        cc += 4;
        xpos += 1;

        if (xpos == colorx){
          colornow = [red,green,blue];
        }      
      }
      ypos += 1;     
    }
    
    let bwcolorx = 750;
    while (bwcolorx < 750+300){
      stroke(bwcolorx-750);
      fill(bwcolorx-750);
      rect(bwcolorx,150,1,50);
      
      bwcolorx += 1;
    }
    
    let bwdifference = bwx-900;
    
    bwdifference = bwdifference * 255/125;
    
    colornow = [colornow[0]+bwdifference,colornow[1]+bwdifference,colornow[2]+bwdifference];
    
    stroke(255);
    fill(0);
    ellipse(colorx,colory,10,10);
    ellipse(bwx,bwy,10,10);
    
    textSize(20);
    text('Current color',775,130);
    
    fill(colornow[0],colornow[1],colornow[2]);
    tintcolor = [colornow[0],colornow[1],colornow[2]];
    rect(910,110,50,20);
    
    fill(200);
    rect(760,225,100,35);
    rect(900,225,100,35);
    fill(0);
    text('Tint',775,250);
    text('Text',935,250);
    stroke(colornow[0],colornow[1],colornow[2]);
    
    let c = 0;
    let s = 0;
    try{
    for(i = 0;i<=linearray.length;i+=2){
      point_x = linearray[i];
      point_y = linearray[i+1];
      strokeWeight(linecolors[c+3]); 
      if (oldpoint[0] != 0 && oldpoint[1] != 0 && linearray[i] != '' && linearray[i] != ''){
        stroke(linecolors[c],linecolors[c+1],linecolors[c+2]);
        fill(linecolors[c],linecolors[c+1],linecolors[c+2]);
        line(oldpoint[0],oldpoint[1],point_x,point_y);
      }
      oldpoint = [point_x,point_y];
      c += 4;
      s += 1;
    }
  } catch(error){
    let blank = '';
  } 
    strokeWeight(2);
    
    if (mouseX < 700){
    fill(colornow[0],colornow[1],colornow[2]);
    stroke(0);
    ellipse(mouseX,mouseY,size,size);
    }
    
    strokeWeight(2);
    
    if (cursorblinker < 6){
      fill(0);
      stroke(0);
      rect(cursorpos[0],cursorpos[1],1,25);
    } else if (cursorblinker >= 8){
      cursorblinker = 0;
    }

    fill(colornow[0],colornow[1],colornow[2]);
    stroke(255);
    textSize(size);
    text(typed,cursorpos[0],cursorpos[1]);
    
    cursorblinker += 1;
    
    if (clicktext){
      stroke(200);
      fill(200);
      rect(250,10,150,35);
      fill(0);
      stroke(0);
      text('click to put text',260,20);
    }
    
    fill(0);
    rect(800,300,200,10);
    rect(800+size,290,10,30);
    textSize(20);
    text('Size    '+size+' pixels',840,283);    
  }
  
}

function keyTyped(){

  if (clicktext && keyCode != ENTER){
    typed += key;
  } 
  keyCode = '';
}

function keyReleased(){
  if (keyCode == BACKSPACE){
    typed = typed.substring(0, typed.length -1);
  } 
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}

function mouseReleased(){
  linearray.push('');
  linearray.push('');
  linecolors.push('');
  linecolors.push('');
  linecolors.push('');
  linecolors.push('');
}

function mouseDragged(){
  if (mouseX > 750 && mouseY > 50 && mouseY < 100){
    colorx = mouseX;
    colory = mouseY;
  } else if (mouseX > 750 && mouseY > 150 && mouseY < 200){
    bwx = mouseX;
    bwy = mouseY;
  } else if (mouseX > 800 && mouseX < 1000 && mouseY > 290 && mouseY < 320){
    size = mouseX-800;
  } else if (startedupload && mouseX < 750){
    linearray.push(mouseX);
    linearray.push(mouseY);
    let c1 = colornow[0];
    let c2 = colornow[1];
    let c3 = colornow[2];
    linecolors.push(c1);
    linecolors.push(c2);
    linecolors.push(c3);
    linecolors.push(size);
  }
}

function mousePressed(){
  if (mouseX > 600 && mouseX < 700 && mouseY > 300 && mouseY < 450){
    startedupload = true;
  } else if (mouseX > 750 && mouseY > 50 && mouseY < 100){
    colorx = mouseX;
    colory = mouseY;
  } else if (mouseX > 750 && mouseY > 150 && mouseY < 200){
    bwx = mouseX;
    bwy = mouseY;
  } else if (mouseX > 760 && mouseX < 860 && mouseY > 225 && mouseY < 225+35){
    tintcolor = [colornow[0],colornow[1],colornow[2]];
    print('did tint');
  } else if (mouseX > 900 && mouseX < 1000 && mouseY > 225 && mouseY < 225+35){
    print('did text');
    clicktext = !clicktext;
  } else if (clicktext){
    cursorpos = [mouseX,mouseY];
  } else if (startedupload){
    linearray.push(mouseX);
    linearray.push(mouseY);
    let c1 = colornow[0];
    let c2 = colornow[1];
    let c3 = colornow[2];
    linecolors.push(c1);
    linecolors.push(c2);
    linecolors.push(c3);
    linecolors.push(size);
  }
}

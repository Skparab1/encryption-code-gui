// binary converter gui

var string = '';
var lines = 0;
var sendstring = '';
var lastlength = 0;

function setup() {
  createCanvas(2000,875);
}


function draw() {
  clear();
  fill(0);
  rect(0,0,700,850);
  textSize(150);
  if (sendstring.length >= 12){
    textSize(150-(5*(lastlength-10)));
  }
  text(string,850,750 - lines);
  if (mouseX > 20 && mouseX < 220 && mouseY > 20 && mouseY < 220){
    fill(0,0,200);
  } else {
    fill(125);
  }
  rect(20,20,200,200);
  if (mouseX > 240 && mouseX < 440 && mouseY > 20 && mouseY < 220){
    fill(0,0,200);
  } else {
    fill(125);
  }
  rect(240,20,200,200);
  if (mouseX > 460 && mouseX < 660 && mouseY > 20 && mouseY < 220){
    fill(0,0,200);
  } else {
    fill(125);
  }
  rect(460,20,200,200);
  if (mouseX > 20 && mouseX < 220 && mouseY > 240 && mouseY < 440){
    fill(0,0,200);
  } else {
    fill(125);
  }
  rect(20,240,200,200);
  if (mouseX > 240 && mouseX < 440 && mouseY > 240 && mouseY < 440){
    fill(0,0,200);
  } else {
    fill(125);
  }
  rect(240,240,200,200);
  if (mouseX > 460 && mouseX < 660 && mouseY > 240 && mouseY < 440){
    fill(0,0,200);
  } else {
    fill(125);
  }
  rect(460,240,200,200);
  if (mouseX > 20 && mouseX < 220 && mouseY > 460 && mouseY < 660){
    fill(0,0,200);
  } else {
    fill(125);
  }
  rect(20,460,200,200);
  if (mouseX > 240 && mouseX < 440 && mouseY > 460 && mouseY < 660){
    fill(0,0,200);
  } else {
    fill(125);
  }
  rect(240,460,200,200);
  if (mouseX > 460 && mouseX < 660 && mouseY > 460 && mouseY < 660){
    fill(0,0,200);
  } else {
    fill(125);
  }
  rect(460,460,200,200);
  if (mouseX > 20 && mouseX < 220 && mouseY > 680 && mouseY < 830){
    fill(0,0,200);
  } else {
    fill(125);
  }
  rect(20,680,200,150);
  if (mouseX > 240 && mouseX < 440 && mouseY > 680 && mouseY < 830){
    fill(0,0,200);
  } else {
    fill(200,0,0);
  }
  rect(240,680,200,150);
  if (mouseX > 460 && mouseX < 660 && mouseY > 680 && mouseY < 830){
    fill(0,0,200);
  } else {
    fill(200,0,0);
  }
  rect(460,680,200,150);
  if (mouseX > 700 && mouseX < 825 && mouseY > 0 && mouseY < 425){
    fill(255,255,0);
  } else {
    fill(0,200,0);
  }
  rect(700,0,125,425);
  if (mouseX > 700 && mouseX < 825 && mouseY > 425 && mouseY < 850){
    fill(255,255,0);
  } else {
    fill(0,200,0);
  }
  rect(700,425,125,425);
  fill(255);
  textSize(150);
  text('7',75,175);
  text('8',275,175);
  text('9',475,175);
  text('4',75,385);
  text('5',275,385);
  text('6',475,385);
  text('1',75,595);
  text('2',275,595);
  text('3',475,595);
  text('0',75,800);
  textSize(45);
  text('Delete',275,780);
  text('Reset',475,780);
  textSize(30);
  fill(0);
  text('Binary',710,200);
  text('Decimal',710,600);
  fill(255);
}

function mousePressed(){
  if (mouseX > 20 && mouseX < 220 && mouseY > 20 && mouseY < 220){
    sendstring = sendstring + '7';
    string = string + '7';
  }
  rect(20,20,200,200);
  if (mouseX > 240 && mouseX < 440 && mouseY > 20 && mouseY < 220){
    sendstring = sendstring + '8';
    string = string + '8';
  }
  rect(240,20,200,200);
  if (mouseX > 460 && mouseX < 660 && mouseY > 20 && mouseY < 220){
    sendstring = sendstring + '9';
    string = string + '9';
  }
  rect(460,20,200,200);
  if (mouseX > 20 && mouseX < 220 && mouseY > 240 && mouseY < 440){
    sendstring = sendstring + '4';
    string = string + '4';
  }
  rect(20,240,200,200);
  if (mouseX > 240 && mouseX < 440 && mouseY > 240 && mouseY < 440){
    sendstring = sendstring + '5';
    string = string + '5';
  }
  rect(240,240,200,200);
  if (mouseX > 460 && mouseX < 660 && mouseY > 240 && mouseY < 440){
    sendstring = sendstring + '6';
    string = string + '6';
  }
  rect(460,240,200,200);
  if (mouseX > 20 && mouseX < 220 && mouseY > 460 && mouseY < 660){
    sendstring = sendstring + '1';
    string = string + '1';
  }
  rect(20,460,200,200);
  if (mouseX > 240 && mouseX < 440 && mouseY > 460 && mouseY < 660){
    sendstring = sendstring + '2';
    string = string + '2';
  }
  rect(240,460,200,200);
  if (mouseX > 460 && mouseX < 660 && mouseY > 460 && mouseY < 660){
    sendstring = sendstring + '3';
    string = string + '3';
  }
  rect(460,460,200,200);
  if (mouseX > 20 && mouseX < 220 && mouseY > 680 && mouseY < 830){
    sendstring = sendstring + '0';
    string = string + '0';
  }
  rect(20,680,200,150);
  if (mouseX > 240 && mouseX < 440 && mouseY > 680 && mouseY < 830){
    string = string.slice(0, -1);
    sendstring = sendstring.slice(0, -1);
  }
  rect(240,680,200,70);
  if (mouseX > 460 && mouseX < 660 && mouseY > 680 && mouseY < 830){
    string = '';
    lines = 0;
  }
  rect(240,760,200,70);
  if (sendstring != ''){
    lastlength = sendstring.length;
  }
  if (mouseX > 700 && mouseX < 825 && mouseY > 0 && mouseY < 425){
    let num = sendstring;
    string = string + '  -> B';
    text(getbinary(num),1000,500);
  }
  rect(460,680,200,70);
  if (mouseX > 700 && mouseX < 825 && mouseY > 425 && mouseY < 850){
    let num = sendstring;
    string = string + '  -> D';
    text(getdecimal(num),1000,500);
  }
}

function getbinary(num){
  var index = -1;
  var bit = 1;
  var binary = '';
  num = parseInt(num);
  sum = 0;
  binsum = num;
  
  while (bit <= num){
      bit = bit*2;
  }
  bit = parseInt(bit/2);
  
  var isbinary = true;
  
  while (bit >= 1 ){
    binsum = binsum - bit;
    binary = binary + '1';
    
    print(bit);
    
    while (bit > binsum){
      bit = bit/2;
      
      if (bit <= binsum || bit < 1){
        break;
      }else{
        binary = binary + '0';
    }
  }
  }
if (binary.length <= 14){
  string = string + '\n' + binary + '\n';
  lines = lines + 375;
} else{
  string = string + '\n' + binary.slice(0,14) + '-\n-' + binary.slice(14,30) + '-\n-' ;
  lines = lines + (375*2);
} 
  print(binary);
  
  sendstring = '';
  lastlength = binary.length;
  return binary;
}

function getdecimal(num){
  var index = 0;
  var bit = 1;
  var decimal = 1;
  var element = '';

  num = num;
  let x = 0;
  
  var counter = 0;
  var isbinary = true;
  var scan = '';
  while (counter < 100){
    scan = num.slice(counter,counter+1);
    if (scan != '1' && scan != '0'){
      isbinary = false;
    }
    counter = counter + 1;
  }
  while (x <= 100){
      try{
        element = num.slice(index-1,index);
        if (element == '1'){
          decimal = decimal + bit;
        }
        
        bit = bit * 2;
        index = index - 1;
        x = x + 1;
        
      } catch(error){
        break;
      }
    }
  if (num % 2 == 0){
    decimal = decimal - 1;
  } 
  
   string = string + '\n' + decimal + '\n';
  lines = lines + 375;
  sendstring = '';
  return decimal;
}

function keyTyped(){
  if (keyCode != ENTER){
    string += key;
  }
}

function keyReleased(){
  if (keyCode == BACKSPACE){
  string = string.substring(0, string.length -1);
  }
}

// Video variable
let video;
let classifier;
let modelURL = "https://teachablemachine.withgoogle.com/models/m4Xylk3F5/";
//only these are displayed above camera so they are global
let topLabel= "waiting for camera...";
let topConfidence = "";



//loads any important datasets in models before setup
function preload(){
  //teachable machine model link 
  classifier=ml5.imageClassifier(modelURL + "model.json");
}

function setup() {
  let cnv = createCanvas(640, 600);
  //cnv.position(200,200);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
 // video.style("height", 200);
  
  classifyVideo();
}

//call model onto video
function classifyVideo(){
  //calls the determine probability for each class in model
  //second arg is callback function 
  classifier.classify(video, gotResults);
}

function draw() {
  background(164, 188, 196);
  // display the video on the cnavas
  image(video, 0, height/5);
  
  //creating text on canvas
  textSize(25);
  textAlign(CENTER);
  textFont('Montserrat');
  fill(244, 243, 243); //color
  text(topLabel, width/2, height/7);
  text(topConfidence, width/2, height/10);
}

//getting the image from video to classify
function gotResults(error, results){
  if(error){
    console.log(error);
    //jump out of function if it recieves error
    return;
  }
  //console displays a list of objects, one for each classifier
  //within that object is the confidence and label for each classifier in order by confidence value
  //console.log(results);
  
  //only top class to be displayed in canvas
  topLabel = results[0].label;
  
  //topConfidence = (results[0].confidence.toFixed(3)*100).toString() + "% confidence level"; //rounding to x decimal places
  topConfidence = results[0].confidence.toFixed(3);
  topProgressVal= parseInt(parseFloat(topConfidence)*100);
  
  secLabel = results[1].label;
  secConfidence = results[1].confidence.toFixed(3);
  secProgressVal= parseInt(parseFloat(secConfidence)*100);
  
  thirdLabel = results[2].label;
  thirdConfidence = results[2].confidence.toFixed(3);
  thirdProgressVal= parseInt(parseFloat(thirdConfidence)*100);

  
  //calling progress bar function
  progressBar(topLabel, topProgressVal);
  progressBar(secLabel, secProgressVal);
  progressBar(thirdLabel, thirdProgressVal);
   //calling the function to pass video to classifier
  //calling video function again --> loop
  classifyVideo();
  
}
function progressBar(label, value){
  label=label.toLowerCase();
  var label_txt1 = document.getElementById("label1").textContent.toLowerCase();
  var bar1 = document.getElementById("progress-bar1");
  var percent1 = document.getElementById("con1");
  
  var bar2 = document.getElementById("progress-bar2");
  var label_txt2 = document.getElementById("label2").textContent.toLowerCase();
  var percent2 = document.getElementById("con2");
  
  var bar3 = document.getElementById("progress-bar3");
  var label_txt3 = document.getElementById("label3").textContent.toLowerCase();
    var percent3 = document.getElementById("con3");

  
    if(label == label_txt1){
      bar1.value=value;
      percent1.innerHTML=value + "%";
  }
  else if(label == label_txt2){
    bar2.value=value;
    percent2.innerHTML=value + "%";
  }
  else if(label==label_txt3){
    bar3.value=value;
    percent3.innerHTML=value + "%";
  }
  
}
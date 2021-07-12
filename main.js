var prediction1="";
var prediction2="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach("#camera")

function takeSnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML="<img id='capturedImage' src='"+data_uri+"'>";
    });
}

console.log("ml5 version= ",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded Yes!");
}

function speak(){
    synth=window.speechSynthesis;
    speakData1="The first prediction is "+ prediction1;
    speakData2="And the other prediction is "+prediction2;
    utterThis=new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("capturedImage");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("emotionName").innerHTML=results[0].label;
    document.getElementById("emotionName1").innerHTML=results[1].label;
prediction1=results[0].label;
prediction2=results[1].label;

if(prediction1=="happy"){
    document.getElementById("emotionEmoji").innerHTML="&#128512;"
}
if(prediction1=="sad"){
    document.getElementById("emotionEmoji").innerHTML="&#128532;"
}
if(prediction1=="angry"){
    document.getElementById("emotionEmoji").innerHTML="&#128545;"
}
if(prediction2=="sad"){
    document.getElementById("emotionEmoji1").innerHTML="&#128532;"
}
if(prediction2=="happy"){
    document.getElementById("emotionEmoji1").innerHTML="&#128512;"
}
if(prediction2=="angry"){
    document.getElementById("emotionEmoji1").innerHTML="&#128545;"
}
speak();
//this end bracket is for the else statement//
}

}
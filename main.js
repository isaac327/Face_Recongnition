Webcam.set({
    width: 350,
    height: 300,
    image_format:'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/FtdBGYBb5/model.json',modelLoaded);
function modelLoaded(){
    console.log('Model Loaded!');
}

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';
    });
}
function check(){
    img=document.getElementById('capture_image');
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    } else{
        document.getElementById("result_object_name").innerHTML=results[0].label;
        document.getElementById("result_object_accuracy").innerHTML=results[0].confidence;   
    }
}
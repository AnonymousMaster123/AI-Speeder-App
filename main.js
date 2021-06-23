song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;


function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    song = loadSound("music.mp3");
}

function modelLoaded() {
    console.log("PoseNet is intialized successfully ヾ(≧▽≦*)o");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("rightWristX : " + rightWristX + " rightWristY : " + rightWristY +
            " leftWristX : " + leftWristX + " leftWristY : " + leftWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 400);
    fill("#FF0000");
    stroke("#FF0000");

    // if (scoreRightWrist > 0.2) 
    {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY < 100) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        } else if (rightWristY > 100 && rightWristY < 200) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(1.25);
        } else if (rightWristY > 200 && rightWristY < 300) {
            document.getElementById("speed").innerHTML = "Speed = 4x";
            song.rate(2);
        } else if (rightWristY > 300 && rightWristY < 400) {
            document.getElementById("speed").innerHTML = "Speed = 8x";
            song.rate(3.5);
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        numberLeftWrist = Number(leftWristY);
        removedecimals = floor(numberLeftWrist);
        volume = removedecimals / 400;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.rate(1);
}
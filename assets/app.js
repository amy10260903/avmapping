// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    //cameraOutput.classList.add("taken");
    
    dataURL = cameraOutput.src;
    $.ajax({
        type: "POST",
        url: "http://140.114.78.91:8802/cd",
        data: { 
            imgBase64: dataURL
        },
        success: function(response){
            console.log("imgBase64: %s", dataURL)
            //console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    });
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

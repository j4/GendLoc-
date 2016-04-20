angular
    .module('photo')
    .controller('PhotoController', PictureController);

function PictureController($scope) {

    $scope.videoUrl = undefined;
    $scope.isSafari = false;

    function errorCallback(error) {
        console.log("Video capture error: ", error.code);
    }

    $scope.loadVideoStream = function () {
        console.log("Hello");
        var video = document.getElementById("photo");
        var videoObj = { video: true };

        // Put video listeners into place
        // FIXME: à tester full navigateur
        if (navigator.getUserMedia) { // Standard
            navigator.getUserMedia(videoObj, function(stream) {
                video.setAttribute('src', window.URL.createObjectURL(stream));
                video.play();
            }, errorCallback);
        } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia(videoObj, function(stream){
                video.setAttribute('src', window.webkitURL.createObjectURL(stream));
                video.play();
            }, errorCallback);
        }
        else if (navigator.mediaDevices.getUserMedia) { // Firefox-prefixed
            navigator.mediaDevices.getUserMedia(videoObj, function(stream){
                video.setAttribute('src', window.URL.createObjectURL(stream));
                video.play();
            }, errorCallback);
        }
    }

    /** Trigger the click evvent on the snap button **/
    $scope.takePicture = function () {
        var canvas = document.getElementById("canvas");
        var video = document.getElementById("photo");
        var context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, 640, 480);
    }

}
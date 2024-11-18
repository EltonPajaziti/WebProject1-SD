var play = document.getElementById('play');
var stop = document.getElementById('stop');
var background = document.getElementById('background')
var sound = document.getElementById('relaxing-sound');
var audioSelect = document.getElementById('audio-select');
background.style.backgroundImage = "url('Images/ocean.jpg')";

audioSelect.addEventListener('change', function() {
    var selectedAudio = audioSelect.value;

    if (selectedAudio == 'Images/forest.mp3') {
        background.style.backgroundImage = "url('Images/forest.jpg')";
    } else if (selectedAudio == 'Images/ocean-waves.mp3') {
        background.style.backgroundImage = "url('Images/ocean.jpg')";
    } else if (selectedAudio == 'Images/rain.mp3') {
        background.style.backgroundImage = "url('Images/rain.jpg')";
    }

    if(audioSelect.value == 'Images/rain.mp3'){
        sound.volume = 0.1;
    }else{
        sound.volume =1;
    }
    sound.src = selectedAudio; 
    
}); 

play.addEventListener('click', function () {
    background.style.filter = 'blur(8px)';
    sound.play();
});

stop.addEventListener('click', function () {
    var sound = document.getElementById('relaxing-sound');
    sound.pause();  
    background.style.filter = 'blur(15px)';
});


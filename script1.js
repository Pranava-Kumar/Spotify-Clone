console.log("Welcome to Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/9.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "The Way I are", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "She Doesn't mind (Pitbull Remix)", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "All Black", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Gimme more", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Paint It Black", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Believer", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Temperature", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "SexyBack", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Low", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Hotel Room Service", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
]

songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName;
})

// Handle Play/Pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;        
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        // Add this line:
        myProgressBar.value = audioElement.currentTime / audioElement.duration * 100;
    }
    
    updatePlayPauseButton();  // Call the function to update play/pause button
});

// Function to update play/pause button
function updatePlayPauseButton() {
    if (audioElement.paused) {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    } else {
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
}

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    // Update Element
    progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;

    // Check if the song has ended
    if (audioElement.currentTime === audioElement.duration) {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        myProgressBar.value = 0; 
    }
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration) / 100);
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        myProgressBar.value = 0;
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        myProgressBar.value = 0;
        audioElement.play();
    })
})

document.getElementById('next').addEventListener('click', () => {
    if(songIndex > 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    myProgressBar.value = 0;
    audioElement.play();
})

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    myProgressBar.value = 0;
    audioElement.play();
})
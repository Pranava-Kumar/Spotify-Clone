console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songListContainer = document.getElementById('songListContainer');

let songs = [
    { songName: "The Way I are", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "She Doesn't mind (Pitbull Remix)", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "All Black", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Gimme more", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Paint It Black", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Believer", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Temperature", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "SexyBack", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Low", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Hotel Room Service", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

// Function to create song list items dynamically
function createSongList() {
    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.classList.add('songItem');

        songItem.innerHTML = `
            <img src="${song.coverPath}" alt="${song.songName}">
            <span class="songName">${song.songName}</span>
            <span class="songListPlay">
                <span class="timestamp">05:34
                    <i id="${index}" class="fas fa-play-circle songItemPlay"></i>
                </span>
            </span>
        `;

        songListContainer.appendChild(songItem);

        // Event listener for each song item play button
        songItem.querySelector('.songItemPlay').addEventListener('click', () => {
            playSong(index);
        });
    });
}

// Function to play a song by index
function playSong(index) {
    songIndex = index;
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updatePlayPauseButton();
}

// Event listener for master play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex);
    } else {
        audioElement.pause();
        updatePlayPauseButton();
    }
});

// Function to update play/pause button
function updatePlayPauseButton() {
    masterPlay.classList.toggle('fa-play-circle', audioElement.paused);
    masterPlay.classList.toggle('fa-pause-circle', !audioElement.paused);
    gif.style.opacity = audioElement.paused ? 0 : 1;
}

// Event listener for time update
audioElement.addEventListener('timeupdate', () => {
    myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;

    if (audioElement.currentTime === audioElement.duration) {
        audioElement.pause();
        myProgressBar.value = 0;
        updatePlayPauseButton();
    }
});

// Event listener for progress bar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Event listener for next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// Event listener for previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// Call the function to create the song list dynamically
createSongList();

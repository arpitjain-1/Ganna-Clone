const musicSeek = document.querySelector('.music-seek');
const mainContainer = document.querySelector('.main-container');
const playPauseButton = document.getElementById('playPauseButton');

function bootUp() {
    fetchAllTheSection();
}

const apipath = {
    mainUrl: `https://raw.githubusercontent.com/himanshukhosla123/gaana.com/master/assests/js/ganna.json`,
    imagePath: (id) => `https://raw.githubusercontent.com/himanshukhosla123/gaana.com/master/${id}`,
    audioPath: (id) => `https://raw.githubusercontent.com/himanshukhosla123/gaana.com/master/${id}`,
}

function fetchAllTheSection() {
    fetch(apipath.mainUrl)
        .then((res) => res.json())
        .then((res) => {
            res.cardbox.forEach(section => {
                const { songsbox, songscards } = section;
                renderSections(songsbox, songscards);
            });
        })
        .catch((e) => {
            console.error(`Something went wrong: ${e}`);
        });
}

function renderSections(title, songscards) {
    const sections = makeSections(title, songscards);
    mainContainer.appendChild(sections);
}

function makeSections(title, songscards) {
    let section = document.createElement('div');
    section.innerHTML = `
        <h2 class="section-heading">${title}</h2>
        <div class="section-container">
            ${songscards.map(songobj => buildCards(songobj)).join('')}
        </div>
    `;
    return section;
}

function buildCards(songobj) {
    return `
        <div class="music-card" onclick="playMusic(this)" data-songobj='${JSON.stringify(songobj)}'>
            <img src="${apipath.imagePath(songobj.image_source)}" alt="code fat gaya" class="track-image">
            <p class="play-icon">▶</p>
            <h4 class="song-title">${songobj.song_name}</h4>
        </div>
    `;
}

function playMusic(songCardEl) {
    const currentSongData = JSON.parse(songCardEl.dataset.songobj);
    playCurrentSong(currentSongData);
    musicSeek.style.display = "flex";
}

function playCurrentSong(currentSongData) {
    const path = currentSongData.quality.low;
    const songSource = apipath.audioPath(path);
    musicSeek.src = songSource;
    musicSeek.currentTime = 0;
    musicSeek.play();
    updateUI(currentSongData);
}

musicSeek.addEventListener('timeupdate', () => {
    const currentTime = formatTime(musicSeek.currentTime);
    const duration = formatTime(musicSeek.duration);
    const currentTimeElement = document.querySelector('.current_time');
    currentTimeElement.textContent = currentTime;
    const songDuration = document.querySelector('.end-time');
    songDuration.innerText = duration
});

function updateUI(currentSongData) {
    let songImg = document.querySelector('.song-image  img')
    let songname = document.querySelector('.current-song-title')
    songname.innerText = `${currentSongData.song_name}`
    songImg.src = apipath.imagePath(currentSongData.image_source)
    const forwardButton = document.getElementById('forwardButton');
    const backwardButton = document.getElementById('backwardButton');
    forwardButton.addEventListener('click', skip);
    backwardButton.addEventListener('click', rewind);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


function updateUI(currentSongData) {
    let songImg = document.querySelector('.song-image  img')
    let songname = document.querySelector('.current-song-title')
    songname.innerText = `${currentSongData.song_name}`
    songImg.src = apipath.imagePath(currentSongData.image_source);
}

function updatePlayPauseButton(isPlaying) {
    if (isPlaying) {
        playPauseButton.classList.add('playing');
        playPauseButton.innerHTML = `
            <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <g style="stroke:#000;stroke-width:2;fill:none;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round" transform="translate(-2 -2)">
                    <path d="m12 21c-4.97056275 0-9-4.0294373-9-9 0-4.97056275 4.02943725-9 9-9 4.9705627 0 9 4.02943725 9 9 0 4.9705627-4.0294373 9-9 9z"></path>
                    <path d="m10 9v6"></path>
                    <path d="m14 9v6"></path>
                </g>
            </svg>`;
    } else {
        playPauseButton.classList.remove('playing');
        playPauseButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 16 24">
                <path class="svg_color" fill-rule="evenodd" d="M0 0v24l20-12z"></path>
            </svg>`;
    }
}

function togglePlayPause() {
    if (musicSeek.paused) {
        musicSeek.play();
    } else {
        musicSeek.pause();
    }
}

playPauseButton.addEventListener('click', () => {
    togglePlayPause();
});

musicSeek.addEventListener('play', () => {
    updatePlayPauseButton(true);
});

musicSeek.addEventListener('pause', () => {
    updatePlayPauseButton(false);
});

window.addEventListener('load', bootUp);

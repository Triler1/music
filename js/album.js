let container = document.querySelector(`.album`);
let playlist = document.querySelector(`.playlist`);
let play = document.querySelector(`.play`);
let go = document.querySelector(`.img-go`);
let audio = document.querySelector(`.audio`);
let imgTrack = document.querySelector(`.img-track`);
let timeNode = document.querySelector(`.time`);
let endTime = document.querySelector(`.end`);
let Name = document.querySelector(`h3`);
let progressBar = document.querySelector(`.progress-bar`);
let volume = document.querySelector(`.volume`);

let search = new URLSearchParams(window.location.search);

let i = search.get(`i`);

let album = albums[i];

let tracks = album.tracks;

let d;

let isPlaying = false;

Name.innerHTML = album.title;

container.innerHTML = `
<img src="${album.img}" class="img">
<div class="body-${Number(i) + 1}" style="left: 30px;">
    <p class="card-text">${album.title}</p>
</div>
`;

for (let j = 0; j < tracks.length; j++) {
    let track = tracks[j];
    playlist.innerHTML += `
    <li class="track d-flex align-items-center mb-3">
        <span class="me-3">0${j + 1}</span>
        <img class="me-3" src="${track.img}" width="50px" height="50px">
        <div class="text me-5">
            <div>${track.title}</div>
            <div class="d-flex">
                <img src="assets/profile-no.png" width="12px" height="12px">
                <div class="text-secondary ms-1">${track.author}</div>
            </div>
        </div>
        <span class="time ms-2">${track.time}</span>
        <span class="time text-secondary ms-auto me-4">${track.more}</span>
    </li>
    `;
}

let trackNodes = document.querySelectorAll(`.track`);

for (let i = 0; i < trackNodes.length; i++) {
    trackNodes[i].addEventListener(`click`, function () {
        if (d == i) {
            if (isPlaying) {
                go.src = `assets/play.png`;
                isPlaying = false;
                audio.pause();
            } else {
                go.src = `assets/pause.png`;
                isPlaying = true;
                audio.play();
                updateProgress();
            }
        } else {
            audio.muted = false;
            volume.src = `assets/up_volume.png`;
            isPlaying = false;
            endTime.innerHTML = tracks[i].time;
            audio.src = tracks[i].src;
            imgTrack.src = tracks[i].img;
            d = i;
            play.classList.remove(`d-none`);
            if (isPlaying) {
                go.src = `assets/play.png`;
                isPlaying = false;
                audio.pause();
            } else {
                go.src = `assets/pause.png`;
                isPlaying = true;
                audio.play();
                updateProgress();
            }
        }
    });
}

function updateProgress() {
    let time = getTime(audio.currentTime);
    if (timeNode.innerHTML != time) {
        timeNode.innerHTML = time;
        progressBar.style.width = audio.currentTime * 100 / audio.duration + `%`;
    }
    if (isPlaying) {
        requestAnimationFrame(updateProgress);
    }
}

function getTime(time) {
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = Math.floor(currentSeconds % 60);
    if (minutes < 10) {
        minutes = `0` + minutes;
    }
    if (seconds < 10) {
        seconds = `0` + seconds;
    }
    return `${minutes}:${seconds}`;
}

volume.addEventListener(`click`, function () {
    if (!audio.muted) {
        audio.muted = true;
        volume.src = `assets/off_volume.png`;
    } else {
        audio.muted = false;
        volume.src = `assets/up_volume.png`;
    }
});

go.addEventListener(`click`, function () {
    if (isPlaying) {
        go.src = `assets/play.png`;
        isPlaying = false;
        audio.pause();
    } else {
        go.src = `assets/pause.png`;
        isPlaying = true;
        audio.play();
        updateProgress();
    }
});
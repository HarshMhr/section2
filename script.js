const Hamm =document.querySelector('.ham');
const Listt =document.querySelector('.list_of_vid');
const Vidmar=document.querySelector(".container");

Hamm.addEventListener('click',()=>{
    Hamm.classList.toggle('active');
    Listt.classList.toggle('active');
    Vidmar.classList.toggle("active");
});

// ------------------------------------------------------

var a=document.querySelectorAll(".zoom ").length;

for (var i=0; i<a;i++){
    document.querySelectorAll(".zoom")[i].addEventListener("click",
        function (){
            var vid_list=["https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/001%20Installation%20and%20Setup%20Overview.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/002%20Installing%20the%20C%2B%2B%20Compiler%20on%20Windows.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/003%20Installing%20CodeLite%20on%20Windows.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/004%20Configuring%20CodeLite%20on%20Windows.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/005%20Installing%20the%20C%2B%2B%20Compiler%20on%20Mac%20OSX.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/006%20Installing%20CodeLite%20on%20Mac%20OSX.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/007%20Configuring%20CodeLite%20on%20Mac%20OSX.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/008%20Using%20the%20Command-Line%20interface.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/009%20Installing%20CodeLite%20on%20Ubuntu%20Linux.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/010%20Configuring%20CodeLite%20on%20Ubuntu%20Linux.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/011%20Creating%20a%20Default%20CodeLite%20Project%20Template%20%28All%20Versions%29.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/012%20Using%20the%20Command-Line%20Interface%20on%20Windows.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/013%20Using%20the%20Command-Line%20Interface%20on%20Mac%20OSX.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/014%20Using%20the%20Command-Line%20Interface%20on%20Linux%20%28Ubuntu%29.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/015%20Using%20a%20Web-based%20C%2B%2B%20Compiler.mp4",
            "https://archive.org/download/002-installing-the-c-compiler-on-windows_202503/02%20-%20Installation%20and%20Setup/016%20Using%20the%20Included%20Source%20Code%20Course%20Resources.mp4"
            
        ];
            var vidIndex= Array.from(document.querySelectorAll(".zoom")).indexOf(this);
            let source = document.getElementById("videoSource");   
            let video = document.getElementById("myVideo");
            source.src = vid_list[vidIndex];
            video.load();
            
        });
}










// -------------------------------------------------



const container = document.querySelector(".container"),
mainVideo = container.querySelector("video"),
videoTimeline = container.querySelector(".video-timeline"),
progressBar = container.querySelector(".progress-bar"),
volumeBtn = container.querySelector(".volume i"),
volumeSlider = container.querySelector(".left input");
currentVidTime = container.querySelector(".current-time"),
videoDuration = container.querySelector(".video-duration"),
skipBackward = container.querySelector(".skip-backward i"),
skipForward = container.querySelector(".skip-forward i"),
playPauseBtn = container.querySelector(".play-pause i"),
speedBtn = container.querySelector(".playback-speed span"),
speedOptions = container.querySelector(".speed-options"),
pipBtn = container.querySelector(".pic-in-pic span"),
fullScreenBtn = container.querySelector(".fullscreen i");
let timer;

const hideControls = () => {
    if(mainVideo.paused) return;
    timer = setTimeout(() => {
        container.classList.remove("show-controls");
    }, 3000);
}
hideControls();

container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();   
});

const formatTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`;
}

videoTimeline.addEventListener("mousemove", e => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

mainVideo.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
}

volumeBtn.addEventListener("click", () => {
    if(!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    if(e.target.value == 0) {
        return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});

document.addEventListener("click", e => {
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded") {
        speedOptions.classList.remove("show");
    }
});

fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement) {
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
});

speedBtn.addEventListener("click", () => speedOptions.classList.toggle("show"));
pipBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());
skipBackward.addEventListener("click", () => mainVideo.currentTime -= 5);
skipForward.addEventListener("click", () => mainVideo.currentTime += 5);
mainVideo.addEventListener("play", () => playPauseBtn.classList.replace("fa-play", "fa-pause"));
mainVideo.addEventListener("pause", () => playPauseBtn.classList.replace("fa-pause", "fa-play"));
playPauseBtn.addEventListener("click", () => mainVideo.paused ? mainVideo.play() : mainVideo.pause());
videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar));









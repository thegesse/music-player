let isShuffle = false;
let currentVideoId = "";

export function playVideo(videoId) {
    playFromPlaylist(videoId);
}

export function playFromPlaylist(videoId) {
    currentVideoId = videoId;
    const playerContainer = document.getElementById('player-container');
    playerContainer.innerHTML = `<div id="yt-player"></div>`;

    new YT.Player('yt-player', {
        height: '315',
        width: '560',
        videoId: videoId,
        playerVars: {
            'autoplay': 1,
            'controls': 1
        },
        events: {
            'onReady': (event) => event.target.playVideo(),
            'onStateChange': onPlayerStateChange
        }
    });
}

export function onPlayerStateChange(event) {
    if (event.data === 0) {
        playNext();
    }
}

export function playNext() {
    if (currentPlaylist.length === 0) return;

    let nextId;
    if (isShuffle) {
        nextId = currentPlaylist[Math.floor(Math.random() * currentPlaylist.length)];
    } else {
        const currentIndex = currentPlaylist.indexOf(currentVideoId);
        nextId = currentPlaylist[(currentIndex + 1) % currentPlaylist.length];
    }
    playFromPlaylist(nextId);
}

export function toggleShuffle() {
    isShuffle = !isShuffle;
    console.log(`Shuffle: ${isShuffle}`);
}
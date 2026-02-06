export function saveVideo(videoId) {
    let favorites = JSON.parse(localStorage.getItem('myVideos')) || [];
    if (!favorites.includes(videoId)) {
        favorites.push(videoId);
        localStorage.setItem('myVideos', JSON.stringify(favorites));
        loadFavorites();
    }
}

export async function loadFavorites() {
    const favoriteIds = JSON.parse(localStorage.getItem('myVideos')) || [];
    if (favoriteIds.length === 0) return;

    currentPlaylist = [...favoriteIds];
    const idString = favoriteIds.join(',');

    try {
        const response = await fetch(`/api/video-details?ids=${encodeURIComponent(idString)}`);
        const freshVideos = await response.json();

        const favoriteContainer = document.getElementById('favorites-list');
        favoriteContainer.innerHTML = freshVideos.map(video => `
            <div class="video-card">
                <strong>${video.title}</strong>
                <button onclick="playFromPlaylist('${video.videoId}')">Play</button>
                <button onclick="removeVideo('${video.videoId}')">Remove</button>
            </div>
        `).join('');
    } catch (e) {
        console.error("Library Load Error:", e);
    }
}


export function removeVideo(videoId) {
    let favorites = JSON.parse(localStorage.getItem('myVideos')) || [];
    favorites = favorites.filter(id => id !== videoId);
    localStorage.setItem('myVideos', JSON.stringify(favorites));
    loadFavorites();
}

document.getElementById('add').addEventListener('submit', function(event) {
    event.preventDefault();
    handleSearch();
});

document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
});

export async function handleSearch() {
    const query = document.getElementById('userSearch').value;

    let resultContainer = document.getElementById('video-results');
    if (!resultContainer) {
        resultContainer = document.createElement('div');
        resultContainer.id = 'video-results';
        document.body.appendChild(resultContainer);
    }

    try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const videos = await response.json();

        resultContainer.innerHTML = '';

        videos.forEach(video => {
            const videoElement = `
        <div class="video-card">
            <h3>${video.title}</h3>
            <button onclick="playVideo('${video.videoId}')">Play</button>
            <button onclick="saveVideo('${video.videoId}')">Save to Library</button>
        </div>
    `;
            resultContainer.insertAdjacentHTML('beforeend', videoElement);
        });
    } catch (e) {
        console.error("Error fetching videos:", e);
        resultContainer.innerHTML = "Something went wrong.";
    }
    document.addEventListener('DOMContentLoaded', () => {
        loadFavorites();
    });
}

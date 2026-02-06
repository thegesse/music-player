import { handleSearch } from './search.js';
import { loadFavorites, saveVideo, removeVideo } from './save.js';
import { playFromPlaylist, toggleShuffle, playVideo, playNext } from './play.js';

document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
});

const searchForm = document.getElementById('add');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSearch();
    });
}

window.currentPlaylist = [];
window.playFromPlaylist = playFromPlaylist;
window.saveVideo = saveVideo;
window.removeVideo = removeVideo;
window.toggleShuffle = toggleShuffle;
window.playVideo = playVideo;
window.playNext = playNext;
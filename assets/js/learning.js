function showVideo(index) {
    const videoSrc = document.querySelectorAll('.video-card video')[index].src;
    const fullscreenVideo = document.querySelector('#fullscreen-video video');
    fullscreenVideo.src = videoSrc;

    document.getElementById('fullscreen-overlay').style.display = 'flex';
  }

  function closeFullscreen() {
    document.getElementById('fullscreen-overlay').style.display = 'none';
    const fullscreenVideo = document.querySelector('#fullscreen-video video');
    fullscreenVideo.pause();
    fullscreenVideo.currentTime = 0;
  }
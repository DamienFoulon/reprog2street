document.querySelectorAll('video').forEach(video => {
    const videoContainer = video.parentElement;
    const videoControls = video.parentElement.querySelector('.video-controls');
    const playBtn = video.parentElement.querySelector('.video-controls .button');

    const classChangeEvent = new CustomEvent('classChange', {
        bubbles: true,
    });

    const observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                videoContainer.dispatchEvent(classChangeEvent);
            }
        });
    });

    observer.observe(videoContainer, {
        attributes: true,
        attributeFilter: ['class'],
    });

    videoContainer.addEventListener('classChange', event => {
        video.pause();
        playBtn.classList.remove('paused');
    });

    videoControls.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playBtn.classList.add('paused');
        } else {
            video.pause();
            playBtn.classList.remove('paused');
        }
    });
});

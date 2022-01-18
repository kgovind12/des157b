(function() {
    'use strict';

    const myVideo = document.querySelector('#myVideo');
    const loading = document.querySelector('.loader');
    const loadingMessage = document.querySelector('.loading-message');
    const replayBtn = document.querySelector('#replay');

    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');

    const source = document.querySelector('source');
    const videos = ['media/driving.mp4', 'media/beach.mp4'];
    const lines = [line1, line2, line3];

    let playing = false;

    let index = 0;

    myVideo.addEventListener('playing', function() {
        loading.style.display = 'none';
        loadingMessage.style.display = 'none';
        hideLines();
        lines[index].className = 'showing';
    });

    replayBtn.addEventListener('click', function() {
        console.log("hello pause")
        index = 0;
        source.setAttribute('src', 'media/foggydavis.mp4');
        if (!playing) {
            myVideo.play();
        }
        replayBtn.style.opacity = 0;
    });

    myVideo.addEventListener('ended', changeVideo);

    function changeVideo() {
        console.log('video ended');

        source.setAttribute('src', videos[index]);
        hideLines();
        lines[index].className = 'showing';
        myVideo.load();
        if (!playing) {
            myVideo.play();
            playing = true;
        }

        if (index >= videos.length) {
            if (playing) {
                myVideo.pause();
                replayBtn.style.opacity = 1;
                hideLines();
                playing = false;
                return;
            }
        } else {
            index++;
        }
    }

    function hideLines() {
        for (let line of lines) {
            line.className = 'hidden';
        }
    }
})();
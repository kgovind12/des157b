(function() {
    'use strict';

    const params = new URLSearchParams(document.location.search);
    const numFrames = params.get('selected');
    const root = document.querySelector(':root');
    const communityGardenBtn = document.getElementById('communitygarden');

    console.log(numFrames); // height of plant

    root.style.setProperty('--plant-height', numFrames);

})();
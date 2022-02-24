(function() {
    'use strict';

    const params = new URLSearchParams(document.location.search);
    const numFrames = params.get('selected');

    console.log(numFrames); // height of plant


})();
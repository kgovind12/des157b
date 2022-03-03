(function() {
    'use strict';

    const params = new URLSearchParams(document.location.search);
    const numFrames = parseInt(params.get('selected')) + parseInt(localStorage.getItem('plantHeight'));
    const root = document.querySelector(':root');
    const communityGardenBtn = document.getElementById('communitygarden');

    console.log(numFrames); // height of plant

    root.style.setProperty('--plant-height', numFrames);
    // TODO: Pull the plant's height from the database instead of the URL
    // Find the number of entries in the database for any particular user

    // TODO: Get this code working, hook it up to another page called community garden
    // Pull all the database entries and display them there. 
    // First start with list or grid format, then expand from there if time permits.
    communityGardenBtn.addEventListener('click', function() {
        console.log('Community Garden button clicked');
    });

    // TODO: Add another spritesheet. Allow users to choose between multiple plants.
})();
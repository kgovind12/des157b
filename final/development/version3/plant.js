(function() {
    'use strict';

    Parse.serverURL = 'https://parseapi.back4app.com/'
    Parse.initialize(
        'cMQQ5iQeoQu0sB55PNk8u1Ipv79Ubvi8rsLq06lr', // This is your Application ID
        'YQeJdbmuCxsZfU4dazDPENrdFhwLg4eUVFqj7tY5' // This is your Javascript key
    );

    let numFrames = localStorage.getItem('plantHeight');
    const plantSrc = localStorage.getItem('plantSrc');
    const root = document.querySelector(':root');
    const communityGardenBtn = document.getElementById('communitygarden');
    const addActivityBtn = document.getElementById('addnew');
    const infoBtn = document.querySelector('.info-btn');
    const shareBtn = document.querySelector('.share-btn');

    // Overlay form to submit new activity
    const addActivityOverlay = document.querySelector('#addActivity-overlay');
    const overlayBg = document.querySelector('.overlay-bg');
    const chips = document.querySelectorAll('.chip');
    const detailForm = document.getElementById('addActivity-detail');
    const submitBtn = document.getElementById('submit');
    const addActivityCloseBtn = document.querySelector('#addActivity-close');

    // Overlay form to show information
    const infoOverlay = document.querySelector('#info-overlay');
    const infoCloseBtn = document.querySelector('#info-close');
    
    // Overlay to share progress on community garden
    const shareOverlay = document.querySelector('#share-overlay');
    const shareCloseBtn = document.querySelector('#share-close');
    const noBtn = document.querySelector('#no');
    const yesBtn = document.querySelector('#yes');


    let spritesheetSrc = '';
    if (plantSrc === 'images/plant1.png') {
        spritesheetSrc = 'images/spritesheet.png';
    } else if (plantSrc === 'images/plant2.png') {
        spritesheetSrc = 'images/spritesheet2.png';
    } else {
        console.log('No valid plant image selected');
    }

    console.log(numFrames); // height of plant
    let numSelected = 0;

    // Set the plant height to max
    if (numFrames >= 7) {
        numFrames = 7;
        console.log("You completed all the activities for today!");
    }

    root.style.setProperty('--plant-height', numFrames);
    root.style.setProperty('--plant-type', `url("${spritesheetSrc}")`);

    // Open the add activity overlay
    addActivityBtn.addEventListener('click', function() {
        addActivityOverlay.classList.remove('hidden');
        overlayBg.classList.remove('hidden');
    });

    // Open info overlay
    infoBtn.addEventListener('click', function() {
        infoOverlay.classList.remove('hidden');
        overlayBg.classList.remove('hidden');
    });

    // Open the share overlay
    shareBtn.addEventListener('click', function() {
        shareOverlay.classList.remove('hidden');
        overlayBg.classList.remove('hidden');
    });

    // Close add activity overlay
    addActivityCloseBtn.addEventListener('click', function() {
        addActivityOverlay.classList.add('hidden');
        overlayBg.classList.add('hidden');
    });

    // Close info overlay
    infoCloseBtn.addEventListener('click', function() {
        infoOverlay.classList.add('hidden');
        overlayBg.classList.add('hidden');
    });

    // Close the share overlay
    shareCloseBtn.addEventListener('click', function() {
        shareOverlay.classList.add('hidden');
        overlayBg.classList.add('hidden');
    });

    // 'No' button also closes overlay
    noBtn.addEventListener('click', function() {
        shareOverlay.classList.add('hidden');
        overlayBg.classList.add('hidden');
    });

    yesBtn.addEventListener('click', function() {
        // Save the plant to the database
        // Attributes: 1. Plant img src 2. Height 3. Description?
        savePlantToDB();
        shareOverlay.classList.add('hidden');
        overlayBg.classList.add('hidden');
    });

    // Find the number of entries in the database for any particular user

    // TODO: Get this code working, hook it up to another page called community garden
    // Pull all the database entries and display them there. 
    // First start with list or grid format, then expand from there if time permits.
    communityGardenBtn.addEventListener('click', function() {
        console.log('Community Garden button clicked');
    });

    // TODO: Add another spritesheet. Allow users to choose between multiple plants.

    // Handling chip selection
    for (let chip of chips) {
        chip.addEventListener('click', function() {
            if (chip.classList.contains('selected')) {
                chip.classList.remove('selected');
                numSelected--;

                // If no options are selected, "disable" continue button
                if (numSelected === 0) {
                    submitBtn.classList.add('disabled');
                }
   
            } else {
                chip.classList.add('selected');
                numSelected++;
                submitBtn.classList.remove('disabled');
            }
        });
    }

    // Handle submit of add activity form
    submitBtn.addEventListener('click', function() {
        // Hide the overlay
        addActivityOverlay.classList.add('hidden');
        overlayBg.classList.add('hidden');

        console.log("You selected ", numSelected);
        localStorage.setItem('plantHeight', numSelected + parseInt(localStorage.getItem('plantHeight')));
        // localStorage.setItem('plantHeight', 0);

        let plantHeight = localStorage.getItem('plantHeight');

        if (plantHeight >= 7) {
            plantHeight = 7;
            console.log("All activiites completed!");
        }

        root.style.setProperty('--plant-height', plantHeight);

        // Unselect all the chips
        for (let chip of chips) {
            chip.classList.remove('selected');
        }
        numSelected = 0;
    });

    async function savePlantToDB() {
        const plantData = new Parse.Object('Plants');
        let plantHeight = parseInt(localStorage.getItem('plantHeight'));

        console.log("Saving plant data to db");

        plantData.set('plantSrc', spritesheetSrc);
        plantData.set('plantHeight', plantHeight);

        try {
            const result = await plantData.save();
        } catch (error) {
            console.log('Could not add activity: ', error);
        }
    }
})();
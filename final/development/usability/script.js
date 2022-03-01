(function() {
    'use strict';

    Parse.serverURL = 'https://parseapi.back4app.com/'
    Parse.initialize(
        'cMQQ5iQeoQu0sB55PNk8u1Ipv79Ubvi8rsLq06lr', // This is your Application ID
        'YQeJdbmuCxsZfU4dazDPENrdFhwLg4eUVFqj7tY5' // This is your Javascript key
    );

    const chips = document.querySelectorAll('.chip');
    const continueBtn = document.querySelector('#continue');
    const toPage2Btn = document.querySelector('#toPage2');
    const formPage1 = document.querySelector('.page1');
    const formPage2 = document.querySelector('.page2');
    const detailForm = document.querySelector('#detail');
    const rectangleBg = document.querySelector('.rectangle-bg');
    const backBtn = document.querySelector('.back-btn');

    let numSelected = 0;

    for (let chip of chips) {
        chip.addEventListener('click', function() {
            if (chip.classList.contains('selected')) {
                chip.classList.remove('selected');
                numSelected--;
                continueBtn.setAttribute('href', `plant.html?selected=${numSelected}`);

                // If no options are selected, "disable" continue button
                if (numSelected === 0) {
                    toPage2Btn.style.pointerEvents = 'none';
                    toPage2Btn.style.opacity = 0.7;
                    toPage2Btn.style.backgroundColor = 'white';
                    toPage2Btn.style.color = '#09a24e';
                }
   
            } else {
                chip.classList.add('selected');
                numSelected++;
                continueBtn.setAttribute('href', `plant.html?selected=${numSelected}`);
                toPage2Btn.style.pointerEvents = 'auto';
                toPage2Btn.style.opacity = 1;
                toPage2Btn.style.backgroundColor = '#09a24e';
                toPage2Btn.style.color = 'white';
            }
        });
    }

    toPage2Btn.addEventListener('click', function(event) {
        event.preventDefault();
        backBtn.classList.remove('hidden');
        formPage1.classList.add('slideout');
        formPage2.classList.add('slidein');
        rectangleBg.classList.add('slide');
    });

    backBtn.addEventListener('click', function() {
        this.classList.add('hidden');
        formPage1.classList.remove('slideout');
        formPage2.classList.remove('slidein');
        rectangleBg.classList.add('slide');
    });

    continueBtn.addEventListener('click', function(event) {
        if (numSelected === 0) {
            event.preventDefault();
            alert('Please select at least one activity.');
            return;
        }

        addActivity();
    });

    async function addActivity() {
        const chipsSelected = document.querySelectorAll('.selected');
        const plantData = new Parse.Object('Activities');

        console.log("Running here");

        // Saving each activity to the database
        // TODO: Fix this problem of data not getting saved to the database.
        for (let chip of chipsSelected) {
            plantData.set('activityType', chip.textContent);
            plantData.set('detail', detailForm.value);
        }

        try {
            const result = await plantData.save();
        } catch (error) {
            console.log('Could not add activities: ', error);
        }
    }

})();
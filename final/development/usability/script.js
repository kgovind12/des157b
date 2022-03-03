(function() {
    'use strict';

    let usabilityTest = 
    "Welcome to the Plant Project! Here you can keep track of how much you impact the environment daily. " +
    "You can grow your own virtual plant that thrives with the eco-friendly activities that you do. " +
    "The more you do to help the environment, the taller your plant will grow!\n" + 
    "Here are some of the questions I have for you:\n" +
    "1. Do you understand what you need to do to grow your plant? Does the interface communicate this purpose effectively?\n" +
    "2. What emotions do you feel when you watch the plant grow (satisfaction, joy, frustration, etc.)? Is the overall experience positive or negative?\n" +
    "3. Is it clear what each button does?\n" +
    "4. Is the chip selection comprehensive enough? Are there any other options you feel could be included?\n" +
    "5. Are you able to convey all the information you want through the interface?"

    alert(usabilityTest);

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

        // Show the back button. Handle slide in of second form
        backBtn.classList.remove('hidden');
        formPage1.classList.add('slideout');
        formPage2.classList.add('slidein');
        rectangleBg.classList.add('slide');

        // Plant height is the number of activities selected
        let plantHeight = document.querySelectorAll('.selected').length;

        // Save this plantHeight to local storage
        localStorage.setItem('plantHeight', plantHeight);
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
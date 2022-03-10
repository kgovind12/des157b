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
    const toPage3Btn = document.querySelector('#toPage3');

    // Form pages
    const formPage1 = document.querySelector('.page1');
    const formPage2 = document.querySelector('.page2');
    const formPage3 = document.querySelector('.page3');

    // Form input
    const detailForm = document.querySelector('#detail');

    // Plants
    const plantImages = document.querySelectorAll('.plant-img');

    const rectangleBg = document.querySelector('.rectangle-bg');
    const backBtn = document.querySelector('.back-btn');

    let numSelected = 0;

    // Handle click of each chip
    for (let chip of chips) {
        chip.addEventListener('click', function() {
            if (chip.classList.contains('selected')) {
                chip.classList.remove('selected');
                numSelected--;

                // If no options are selected, "disable" continue button
                if (numSelected === 0) {
                    toPage2Btn.classList.add('disabled');
                }
   
            } else {
                chip.classList.add('selected');
                numSelected++;
                toPage2Btn.classList.remove('disabled');
            }
        });
    }

    // Handle button click to continue to page 2
    toPage2Btn.addEventListener('click', function(event) {
        event.preventDefault();

        // Show the back button. Handle slide in of second form
        backBtn.classList.remove('hidden');
        rectangleBg.classList.add('slide');
        formPage1.classList.add('slideout');
        formPage2.classList.add('slidein');

        // Plant height is the number of activities selected
        let plantHeight = document.querySelectorAll('.selected').length;
        let prevPlantHeight = localStorage.getItem('plantHeight');

        console.log("Plant height = ", plantHeight);
        console.log("Previous plant height = ", prevPlantHeight);

        // Save this plantHeight to local storage
        if (prevPlantHeight) {
            localStorage.setItem('plantHeight', plantHeight + parseInt(prevPlantHeight));
        } else {
            localStorage.setItem('plantHeight', plantHeight);
        }

        // The following line is used for resetting the plant height for testing purposes
        // localStorage.setItem('plantHeight', 0);

        rectangleBg.addEventListener('animationend', function() {
            console.log("this transition ended");
            this.classList.remove('slide');
        });
    });

    detailForm.addEventListener('keypress', function(event) {
        
        if (event.key === 'Enter') {
            formPage2.classList.add('slideout');
            formPage2.classList.remove('slidein');
            formPage3.classList.add('slidein');
            rectangleBg.classList.add('slide');
    
            rectangleBg.addEventListener('animationend', function() {
                this.classList.remove('slide');
            });
        }
    });

    // Handle button click for continuing to page 3
    toPage3Btn.addEventListener('click', function(event) {
        event.preventDefault();

        formPage2.classList.add('slideout');
        formPage2.classList.remove('slidein');
        formPage3.classList.add('slidein');
        rectangleBg.classList.add('slide');

        rectangleBg.addEventListener('animationend', function() {
            this.classList.remove('slide');
        });
    });

    // Handle back button press
    backBtn.addEventListener('click', function() {
        this.classList.add('hidden');
        formPage1.classList.remove('slideout');
        formPage2.classList.remove('slidein');
        rectangleBg.classList.add('slide');
    });

    // Handle button for continuing to the plant page
    continueBtn.addEventListener('click', function(event) {
        if (numSelected === 0) {
            event.preventDefault();
            alert('Please select at least one activity.');
            return;
        }
        location.href = 'plant.html';
    });

    // Click handler for each plant image (to select a type of plant)
    plantImages.forEach(function(plantImg) {
        plantImg.addEventListener('click', function() {
            let plantSrc = this.getAttribute('src');
            localStorage.setItem('plantSrc', plantSrc);

            for (let image of plantImages) {
                image.classList.remove('green');
            }

            if (this.classList.contains('green')) {
                this.classList.remove('green');

                // disable continue button
                continueBtn.classList.add('disabled');
            } else {
                this.classList.add('green');

                // enable continue button
                continueBtn.classList.remove('disabled');
            }
        });
    });
})();
(function() {
    'use strict';

    const chips = document.querySelectorAll('.chip');
    const continueBtn = document.querySelector('#continue');
    const toPage2Btn = document.querySelector('#toPage2');
    const formPage1 = document.querySelector('.page1');
    const formPage2 = document.querySelector('.page2');

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

    continueBtn.addEventListener('click', function(event) {
        if (numSelected === 0) {
            event.preventDefault();
            alert('Please select at least one activity.');
            return;
        }
    });

    toPage2Btn.addEventListener('click', function(event) {
        event.preventDefault();
        formPage1.classList.add('slideout');
        formPage2.classList.add('slidein');
    });

})();
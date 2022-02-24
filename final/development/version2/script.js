(function() {
    'use strict';

    const chips = document.querySelectorAll('.chip');
    const continueBtn = document.querySelector('#continue');

    let numSelected = 0;

    for (let chip of chips) {
        chip.addEventListener('click', function() {
            if (chip.classList.contains('selected')) {
                chip.classList.remove('selected');
                numSelected--;
                continueBtn.setAttribute('href', `plant.html?selected=${numSelected}`);

                // If no options are selected, "disable" continue button
                if (numSelected === 0) {
                    continueBtn.style.pointerEvents = 'none';
                    continueBtn.style.opacity = 0.7;
                    continueBtn.style.backgroundColor = 'white';
                    continueBtn.style.color = '#09a24e';
                }
   
            } else {
                chip.classList.add('selected');
                numSelected++;
                continueBtn.setAttribute('href', `plant.html?selected=${numSelected}`);
                continueBtn.style.pointerEvents = 'auto';
                continueBtn.style.opacity = 1;
                continueBtn.style.backgroundColor = '#09a24e';
                continueBtn.style.color = 'white';
            }
        });
    }

    continueBtn.addEventListener('click', function(event) {
        if (numSelected === 0) {
            event.preventDefault();
            alert('Please select at least one activity.');
            return;
        }
    })
})();
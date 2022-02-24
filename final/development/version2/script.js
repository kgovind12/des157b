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
            } else {
                chip.classList.add('selected');
                numSelected++;
                continueBtn.setAttribute('href', `plant.html?selected=${numSelected}`);
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
(function() {
    'use strict';

    const circles = document.querySelectorAll('.circlecontainer');

    async function getData() {
        const data = await fetch('data/recap.json');
        const jsonData = await data.json();

        circles.forEach(function(circle) {
            let point = circle.id;

            // Add all the bubbles as html to the circle
            circle.innerHTML += `<div class="bubble hidden" id="bubble-${point}">
                <div class="flex-row">
                    <h2>${jsonData[point].month}</h2>
                    <p>Feeling</p>
                    <h3> ${jsonData[point].feeling}</h3>
                </div>
                
                <img src="images/${jsonData[point].feeling.toLowerCase()}.png" alt="${jsonData[point].feeling} bitmoji">
            </div>`;
        });
    }

    getData();

})();
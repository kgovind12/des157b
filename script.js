(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const sun = document.querySelector('#sun');
    const moon = document.querySelector('#moon');
    const stars = document.querySelector('#stars');
    const dayhills = document.querySelector('#dayhills');
    const nighthills = document.querySelector('#nighthills');

    let mode = 'dark';
    dayhills.className = 'slidein';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'light';
            sun.className = 'set';
            moon.className = 'rise';
            dayhills.className = 'fadeout';
            nighthills.className = 'fadein';
            stars.classList.remove('hide');

            while (stars.children.length > 0) {
                stars.removeChild(stars.lastChild);
            }

            for (let i = 0; i < 30; i++) {
                generateStars();
            }
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'dark'
            sun.className = 'rise';
            moon.className = 'set';
            dayhills.className = 'fadein';
            nighthills.className = 'fadeout';
            stars.classList.add('hide');
        }
    });

    function generateStars() {
        let xPos = Math.floor(Math.random() * 100 + 1);
        let yPos = Math.floor(Math.random() * 60 + 1);

        let size = Math.floor(Math.random() * 4 + 1);

        let animationDuration = 800 + Math.floor(Math.random() * 1000);

        let star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${xPos}%`;
        star.style.top = `${yPos}%`;
        star.style.animationDuration = `${animationDuration}ms`;

        stars.appendChild(star);
    }
})()
(function() {
    'use strict';

    Parse.serverURL = 'https://parseapi.back4app.com/'
    Parse.initialize(
        'cMQQ5iQeoQu0sB55PNk8u1Ipv79Ubvi8rsLq06lr', // This is your Application ID
        'YQeJdbmuCxsZfU4dazDPENrdFhwLg4eUVFqj7tY5' // This is your Javascript key
    );

    const root = document.querySelector(':root');

    // TODO: Get the first three plants from db
    // set root of plant1-height, plant2-height, and plant3-height;
    // Repeat the same for plant-types.

    // Now this only works because there are only 3 plants in the database
    // If we add more plants, this will fail
    // Learn how to limit data
    async function displayPlants() {
        const plants = Parse.Object.extend('Plants');
        const query = new Parse.Query(plants);

        try {
            const results = await query.find(); // limit to 3?
            console.log(results);

            // Display each plant by changing css root variables
            for (let i = 0; i < results.length; i++) {
                let plantHeight = results[i].get('plantHeight');
                const plantSrc = results[i].get('plantSrc');

                console.log('Plant height and source = ', plantHeight, plantSrc);

                if (plantHeight >= 7) {
                    plantHeight = 7;
                }

                root.style.setProperty(`--plant${i+1}-height`, plantHeight);
                root.style.setProperty(`--plant${i+1}-type`, `url("${plantSrc}")`);
            };
        } catch (error) {
            console.log('Could not get plants: ', error);
        }
    }

    displayPlants();
})();
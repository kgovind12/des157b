var map = L.map('map').setView([38.54173971971019, -121.75513549176011], 16);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2dvdmluZCIsImEiOiJja3l3a3hscWMwN291Mm9xazJwN3NnaWhyIn0.ZWaQz-Wwguo8k8Idb7ckag'
}).addTo(map);

// Constants
const text = {
    "coho": "<h2>Memorial Union CoHo</h2><p>There are so many different restaurants here. The café has the best pastries. Also, this is the only place on campus that has vegetarian sushi.</p>",
    "cohoSouth": "<h2>CoHo South Café</h2><p>This is a good place to get breakfast right before class.</p>",
    "silo": "<h2>Silo Restaurants</h2><p>The Silo restaurants include Spokes Grill, Crepe Bistro, and Peet's Coffee.</p>",
    "foodTrucks": "<h2>Silo Food Trucks</h2><p>There are food trucks for a variety of cuisines here.</p>",
    "tercero": "<h2>Tercero</h2><p>Tercero is always bustling with activity. Fun fact: the word tercero means \"third\".</p>",
    "segundo": "<h2>Segundo</h2><p>Segundo is more peaceful, and its DC food is the best. Fun fact: the word segundo means \"second\".</p>",
    "cuarto": "<h2>Cuarto</h2><p>Cuarto is very beautiful in the spring, because of its falling white flowers that look like snow. Fun fact: the word cuarto means \"fourth\".</p>",
    "quad": "<h2>The Quad</h2><p>This is a great place to rest on the grass or lounge on the hammocks. If you come here in the summer, it's easier to catch a hammock!</p>",
    "srrc": "<h2>Student Recruitment and Retention Center</h2><p>The sofas here are super comfy! You can catch a quick nap here in between classes.</p>",
    "wrrc": "<h2>Women's Resources and Research Center</h2><p>This nap spot has blankets and pillows you can use. :)</p>",
    "mediatationRoom": "<h2>Meditation Room</h2><p>This is a peaceful place to come to when the college life gets too busy, or you want to escape the pressures of classes.</p>",
    "arboretum": "<h2>Arboretum</h2><p>The arboretum is one of UC Davis's most serene and beautiful spots. You can watch the ducks here, or spot a turtle or two if you're lucky!</p>",
    "library": "<h2>Shields Library</h2><p>Whether for independent or group study, this is a good place to get into the focus zone. The Main Reading Room is very beautiful too.</p>",
    "california": "<h2>California Hall</h2><p>This hall is one of the newer ones on campus. It is so spacious, and the lounge tables are a great place to study while watching the bike traffic outside.</p>",
    "scc": "<h2>Student Community Center</h2><p>Right at the center of campus, the SCC is a popular place to study. They even have a café and a microwave.</p>",
    "mu": "<h2>Memorial Union</h2><p>The lounges here are really nice, but crowded. If you want to take a break, the market and game room are close by.</p>",
    "kemper": "<h2>Kemper Hall</h2><p>This is the engineering building, but it is open to all majors! You can come here to put your engineering skills to the test (or code all night in the basement :P)</p>"
}

const foodCheckbox = document.getElementById('best-food');
const napSpotsCheckbox = document.getElementById('nap-spots');
const studySpacesCheckbox = document.getElementById('study-spaces');
const dormsCheckbox = document.getElementById('dorms');


// Icons
var foodIcon = L.divIcon({
    className: 'marker-icon marker-food', 
    html: '<div></div><i class="icon mdi mdi-silverware-variant"></i>', 
    iconAnchor: [15, 0]
});
var napSpotsIcon = L.divIcon({
    className: 'marker-icon marker-nap', 
    html: '<div></div><i class="icon mdi mdi-sleep"></i>',
    iconAnchor: [15, 0]
});
var studySpacesIcon = L.divIcon({
    className: 'marker-icon marker-study', 
    html: '<div></div><i class="icon mdi mdi-book-open-variant"></i>',
    iconAnchor: [15, 0]
});
var dormIcon = L.divIcon({
    className: 'marker-icon marker-dorm', 
    html: '<div></div><i class="icon mdi mdi-bed"></i>',
    iconAnchor: [15, 0]
});


// Markers are divided into sets for each category
const markers = {
    foodMarkers: {
        coho: L.marker([38.54216474275199, -121.74982961083266], {icon: foodIcon, autoPan: true}),
        cohoSouth: L.marker([38.53935202376377, -121.75163827984926], {icon: foodIcon, autoPan: true}),
        silo: L.marker([38.53874414707951, -121.75304230474327], {icon: foodIcon, autoPan: true}),
        foodTrucks: L.marker([38.538513466652574, -121.75245740290781], {icon: foodIcon, autoPan: true})
    },
    napSpotsMarkers: {
        quad : L.marker([38.54116313819827, -121.74920771931932], {icon: napSpotsIcon, autoPan: true}),
        wrrc: L.marker([38.54182875577442, -121.74836853477021], {icon: napSpotsIcon, autoPan: true}),
        meditationRoom: L.marker([38.53962307178233, -121.75145902586138], {icon: napSpotsIcon, autoPan: true}),
        arboretum: L.marker([38.53789257427866, -121.74812377374403], {icon: napSpotsIcon, autoPan: true})
    },
    studySpacesMarkers: {
        library: L.marker([38.53966984578551, -121.74948427135155], {icon: studySpacesIcon, autoPan: true}),
        california: L.marker([38.54120883430309, -121.75302572244377], {icon: studySpacesIcon, autoPan: true}),
        scc: L.marker([38.53952045814751, -121.75166125046113], {icon: studySpacesIcon, autoPan: true}),
        mu: L.marker([38.542381267203524, -121.74953255211354], {icon: studySpacesIcon, autoPan: true}),
        kemper: L.marker([38.537054659694036, -121.75508433265011], {icon: studySpacesIcon, autoPan: true})
    },
    dormMarkers: {
        tercero : L.marker([38.536035919290356, -121.7574311483845], {icon: dormIcon, autoPan: true}),
        segundo : L.marker([38.544873884553624, -121.75751610081721], {icon: dormIcon, autoPan: true}),
        cuarto : L.marker([38.54698597978131, -121.76398142003282], {icon: dormIcon, autoPan: true}),
    }
}

// Food popup - put in a for loop later
markers.foodMarkers.coho.bindPopup(text.coho).openPopup();
markers.foodMarkers.cohoSouth.bindPopup(text.cohoSouth).openPopup();
markers.foodMarkers.silo.bindPopup(text.silo).openPopup();
markers.foodMarkers.foodTrucks.bindPopup(text.foodTrucks).openPopup();

// Nap spots popup - put in a for loop later
markers.napSpotsMarkers.quad.bindPopup(text.quad).openPopup();
markers.napSpotsMarkers.wrrc.bindPopup(text.wrrc).openPopup();
markers.napSpotsMarkers.meditationRoom.bindPopup(text.mediatationRoom).openPopup();
markers.napSpotsMarkers.arboretum.bindPopup(text.arboretum).openPopup();

// Study spaces popup - put in a for loop later
markers.studySpacesMarkers.library.bindPopup(text.library).openPopup();
markers.studySpacesMarkers.california.bindPopup(text.california).openPopup();
markers.studySpacesMarkers.scc.bindPopup(text.scc).openPopup();
markers.studySpacesMarkers.mu.bindPopup(text.mu).openPopup();
markers.studySpacesMarkers.kemper.bindPopup(text.kemper).openPopup();

// Dorms popup - put in a for loop later
markers.dormMarkers.tercero.bindPopup(text.tercero).openPopup();
markers.dormMarkers.segundo.bindPopup(text.segundo).openPopup();
markers.dormMarkers.cuarto.bindPopup(text.cuarto).openPopup();


// Dorms
dormsCheckbox.addEventListener('change', function() {
    updateMap(this, markers.dormMarkers);
});

foodCheckbox.addEventListener('change', function() {
    updateMap(this, markers.foodMarkers);
});

napSpotsCheckbox.addEventListener('change', function() {
    updateMap(this, markers.napSpotsMarkers);
});

studySpacesCheckbox.addEventListener('change', function() {
    updateMap(this, markers.studySpacesMarkers);
})


// Takes in a checkbox input and marker set
// Updates the map markers based on the inputs clicked
function updateMap(checkbox, markerSet) {
    if (checkbox.checked) {
        for (let marker of Object.values(markerSet)) {
            marker.addTo(map);
        }
    } else {
        for (let marker of Object.values(markerSet)) {
            marker.remove();
        }
    }
}
// ==============================
// AGRA BUS TRACKER
// ==============================

// Agra center
const agra = [27.1767, 78.0081];

// Create map
const map = L.map("map").setView(agra, 12);

// Add OpenStreetMap
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors"
    }
).addTo(map);


// ==============================
// BUS DATA
// ==============================

let buses = [

    {
        id: "AG01",
        number: "UP 80 AB 1001",
        route: "Agra Cantt - ISBT",
        lat: 27.1600,
        lng: 78.0150,
        speed: 32
    },

    {
        id: "AG02",
        number: "UP 80 AB 1002",
        route: "Sikandra - Agra Cantt",
        lat: 27.2150,
        lng: 77.9650,
        speed: 28
    },

    {
        id: "AG03",
        number: "UP 80 AB 1003",
        route: "Taj Mahal - ISBT",
        lat: 27.1710,
        lng: 78.0420,
        speed: 25
    },

    {
        id: "AG04",
        number: "UP 80 AB 1004",
        route: "Agra Cantt - ISBT",
        lat: 27.1850,
        lng: 78.0200,
        speed: 30
    }

];


// ==============================
// BUS ICON
// ==============================

const busIcon = L.divIcon({

    className: "",

    html: `
        <div style="
            background:#2563eb;
            color:white;
            width:40px;
            height:40px;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            border:3px solid white;
            box-shadow:0 2px 8px rgba(0,0,0,.3);
            font-size:19px;
        ">
            🚌
        </div>
    `,

    iconSize: [40, 40],
    iconAnchor: [20, 20]

});


// Store markers
let markers = {};


// ==============================
// DISPLAY BUSES
// ==============================

function displayBuses() {

    const list =
        document.getElementById("busList");

    list.innerHTML = "";

    const search =
        document
        .getElementById("search")
        .value
        .toLowerCase();

    const selectedRoute =
        document
        .getElementById("routeFilter")
        .value;


    buses.forEach(bus => {

        // Search
        if (
            search &&
            !bus.number
            .toLowerCase()
            .includes(search)
        ) {
            return;
        }


        // Route filter
        if (
            selectedRoute !== "all" &&
            bus.route !== selectedRoute
        ) {
            return;
        }


        // Create marker
        if (!markers[bus.id]) {

            markers[bus.id] =
                L.marker(
                    [bus.lat, bus.lng],
                    {
                        icon: busIcon
                    }
                ).addTo(map);

        } else {

            markers[bus.id]
                .setLatLng([
                    bus.lat,
                    bus.lng
                ]);

        }


        // Popup
        markers[bus.id]
            .bindPopup(`

                <b>🚌 ${bus.number}</b>

                <br><br>

                Route:
                ${bus.route}

                <br>

                Speed:
                ${bus.speed} km/h

                <br>

                Status:
                <span style="color:green">
                    ● LIVE
                </span>

            `);


        // Create bus card
        const card =
            document.createElement("div");

        card.className =
            "bus-card";

        card.innerHTML = `

            <div class="bus-number">
                🚌 ${bus.number}
            </div>

            <div class="bus-route">
                ${bus.route}
            </div>

            <div class="bus-status">
                ● LIVE • ${bus.speed} km/h
            </div>

        `;


        // Click card
        card.onclick = function () {

            map.setView(
                [bus.lat, bus.lng],
                15
            );

            markers[bus.id]
                .openPopup();

        };


        list.appendChild(card);

    });

}


// ==============================
// SEARCH
// ==============================

document
    .getElementById("search")
    .addEventListener(
        "input",
        displayBuses
    );


// ==============================
// ROUTE FILTER
// ==============================

document
    .getElementById("routeFilter")
    .addEventListener(
        "change",
        displayBuses
    );


// ==============================
// DEMO MOVEMENT
// ==============================

function moveBuses() {

    buses.forEach(bus => {

        // DEMO GPS movement
        // This will later be replaced
        // with real GPS coordinates.

        bus.lat +=
            (Math.random() - 0.5) * 0.001;

        bus.lng +=
            (Math.random() - 0.5) * 0.001;

        bus.speed =
            Math.floor(
                20 + Math.random() * 20
            );

    });

    displayBuses();
}


// Initial display
displayBuses();


// Move buses every 5 seconds
setInterval(
    moveBuses,
    5000
);
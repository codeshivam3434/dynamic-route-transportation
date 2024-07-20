const axios = require('axios');
const Graph = require('./dijkstra');

const fetchRealTimeTrafficData = async (start, end) => {
    const accessToken = 'sk.eyJ1IjoicmV2b2tlciIsImEiOiJjbHl0ZmVidnkwcjdlMnFzNmd0bTc5bTVsIn0.9rdLpq8juQ4KDdd8NDHvPg'; // Replace with your Mapbox access token
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?access_token=${accessToken}&annotations=distance,duration&overview=full&geometries=geojson`;

    try {
        console.log(`Fetching data from: ${url}`); // Log URL for debugging

        const response = await axios.get(url);
  
        if (response.data.routes && response.data.routes.length > 0) {
            const distance = response.data.routes[0].distance; // distance in meters
            return distance / 1000; // Convert to kilometers
        } else {
            throw new Error('No routes found in the response');
        }
    } catch (error) {
        console.error('Error fetching traffic data', error);
        return Infinity; // Return a high value to indicate the route is not preferable
    }
};

const optimizeRoute = async (locations, startLocation, endLocation, timeWindows, isEmergency) => {
    const graph = new Graph();

    locations.forEach(location => {
        graph.addNode(location.address);
    });

    // Add edges with weights considering real-time traffic data
    const promises = [];
    for (let i = 0; i < locations.length; i++) {
        for (let j = i + 1; j < locations.length; j++) {
            promises.push(
                fetchRealTimeTrafficData(locations[i], locations[j]).then(distance => {
                    graph.addEdge(locations[i].address, locations[j].address, distance);
                })
            );
        }
    }

    await Promise.all(promises);

    const { distances, previous } = graph.dijkstra(startLocation);

    let optimizedRoute = [];
    let currentNode = endLocation;
    while (currentNode !== null) {
        optimizedRoute.unshift(currentNode);
        currentNode = previous[currentNode];
    }

    return { optimizedRoute, distances };
};

module.exports = { optimizeRoute };

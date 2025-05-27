/**
 * Wizard Houses API Server
 * ------------------------
 * This Node.js server acts as a proxy and filter for the Wizard World API's houses endpoint.
 * 
 * Features:
 * - Serves house data from the remote Wizard World API at https://wizard-world-api.herokuapp.com/houses
 * - Supports filtering houses by name via the `name` query parameter (case-insensitive, partial match)
 * - CORS enabled for all origins
 * - Returns 404 for unknown endpoints and 500 for remote fetch errors
 * 
 * Endpoints:
 *   GET /houses
 *     - Returns all houses as an array of objects.
 *   GET /houses?name=<search>
 *     - Returns an array of houses whose names include the given search string (case-insensitive).
 * 
 * Example usage:
 *   GET http://localhost:3001/houses
 *   GET http://localhost:3001/houses?name=ffi
 * 
 * To run:
 *   node server.js
 */

const http = require('http');
const https = require('https');
const url = require('url');
const PORT = 3001;

// The remote JSON URL
const remoteUrl = 'https://wizard-world-api.herokuapp.com/houses';

const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (pathName === '/houses') {
    const name = query.name ? query.name.toLowerCase() : null;

    // Make HTTPS request to Heroku JSON
    https.get(remoteUrl, (remoteRes) => {
      let data = '';

      // Gather chunks of data
      remoteRes.on('data', chunk => {
        data += chunk;
      });

      // Once all data is received
      remoteRes.on('end', () => {
         // Parse the data as JSON
        let houses = JSON.parse(data);
        // Filter houses by name if provided
        if (name) {
          houses = houses.filter(house => house.name.toLowerCase().includes(name));
        }
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify(houses));
      });

    }).on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to fetch remote data' }));
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
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

import http from 'http';
import https from 'https';
import url from 'url';

import type { House } from '../src/app/types';

const PORT = process.env.PORT || 3001;

// The remote JSON URL
const remoteUrl = 'https://wizard-world-api.herokuapp.com/houses';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url ?? '', true);
  const pathName: string | null = parsedUrl.pathname;
  const query: {[key: string]: any} = parsedUrl.query;

  if (pathName === '/houses') {
    const name: string | null = query.name ? query.name.toLowerCase() : null;

    // Make HTTPS request to Heroku JSON
    https.get(remoteUrl, (remoteRes: http.IncomingMessage) => {
      let data = '';

      // Gather chunks of data
      remoteRes.on('data', (chunk: Buffer) => {
        data += chunk;
      });

      // Once all data is received
      remoteRes.on('end', () => {
         // Parse the data as JSON
        let houses: House[] = JSON.parse(data);
        // Filter houses by name if provided
        if (name) {
          houses = houses.filter((house:House) => house.name.toLowerCase().includes(name));
        }
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify(houses));
      });

    }).on('error', (err:Error) => {
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
"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const url_1 = __importDefault(require("url"));
const PORT = process.env.PORT || 3001;
// The remote JSON URL
const remoteUrl = 'https://wizard-world-api.herokuapp.com/houses';
const server = http_1.default.createServer((req, res) => {
    var _a;
    // Parse the request URL
    const parsedUrl = url_1.default.parse((_a = req.url) !== null && _a !== void 0 ? _a : '', true);
    const pathName = parsedUrl.pathname;
    const query = parsedUrl.query;
    if (pathName === '/houses') {
        const name = query.name ? query.name.toLowerCase() : null;
        // Make HTTPS request to Heroku JSON
        https_1.default.get(remoteUrl, (remoteRes) => {
            let data = '';
            // Gather chunks of data
            remoteRes.on('data', (chunk) => {
                data += chunk;
            });
            // Once all data is received
            remoteRes.on('end', () => {
                // Parse the data as JSON
                let houses = JSON.parse(data);
                // Filter houses by name if provided
                if (name) {
                    houses = houses.filter((house) => house.name.toLowerCase().includes(name));
                }
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify(houses));
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to fetch remote data' }));
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

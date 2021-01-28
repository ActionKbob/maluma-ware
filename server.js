const express = require( 'express' );
const path = require( 'path' );

const server = express();

server.use( express.static( path.join( __dirname, 'webapp/build' ) ) );

const port = process.env.POST || 5000;
server.listen( port );

console.log( `Server listening on port ${port}` );
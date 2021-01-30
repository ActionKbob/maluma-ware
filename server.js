const 	express = require( 'express' ),
		bodyParser = require( 'body-parser' ),
		path = require( 'path' ),
		fs = require( 'fs' );

const server = express();
server.use( bodyParser.json() );

server.use( express.static( path.join( __dirname, 'webapp/build' ) ) );

const port = process.env.PORT || 5000;
server.listen( port );

console.log( `Server listening on port ${port}` );

const gameConfigPath = path.join( __dirname, 'webapp/build/game_config.json' )

const getGameConfig = ( callback ) => {

	fs.open( gameConfigPath, 'r+', ( err, data ) => {
		if (err)
		{
			response.json( "Failed to get game config" );
			throw err;
		}

		let gameConfig = fs.readFileSync( data, 'utf8' );
		gameConfig = gameConfig === "" ? {} : JSON.parse( gameConfig );
		callback( gameConfig );
	} );

};

server.get( '/api/config', async ( request, response ) => {
	getGameConfig( ( gameConfig ) => {
		gameConfig.checkDC = gameConfig.checkDC === undefined ? 5 : gameConfig.checkDC;
		gameConfig.profMod = gameConfig.profMod === undefined ? 2 : gameConfig.profMod;
		response.json( gameConfig );
	} );
} );

server.post( '/api/config/set/', async ( request, response ) => {
	getGameConfig( ( gameConfig ) => {
		const { action, payload } = request.body;
		switch( action )
		{
			case 'checkDC':
				gameConfig.checkDC = parseInt(payload);
				break;

			case 'profMod':
				gameConfig.profMod = parseInt(payload);
				break;
		}

		fs.writeFileSync( gameConfigPath, JSON.stringify( gameConfig ) );
		response.json( gameConfig );
	} );
} );

server.get( '/api/players', async ( request, response ) => {
	getGameConfig( ( gameConfig ) => {
		gameConfig.players = gameConfig.players === undefined ? [] : gameConfig.players;
		response.json( gameConfig.players );
	} );
} );

server.post( '/api/players/set', ( request, response ) => {
	getGameConfig( ( gameConfig ) => {
		gameConfig.players = gameConfig.players === undefined ? [] : gameConfig.players;
		
		const playerData = request.body;
		playerData.id = playerData.id === undefined ? gameConfig.players.length : playerData.id;

		let playerIndex = gameConfig.players.findIndex( p => p.id === playerData.id );
		if( playerIndex === -1 )
			gameConfig.players.push( playerData );
		else
			gameConfig.players[playerIndex] = playerData;

		fs.writeFileSync( gameConfigPath, JSON.stringify( gameConfig ) );

		response.json( playerData );
	} );
} );

server.post( '/api/players/byName', ( request, response ) => {
	getGameConfig( ( gameConfig ) => {
		gameConfig.players = gameConfig.players === undefined ? [] : gameConfig.players;
		
		const { user } = request.body;
		
		let player = gameConfig.players.find( player => player.name === user );
		response.json( player );
	} );
} );
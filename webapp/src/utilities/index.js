export const getLoggedInUser = () => {
	return localStorage.getItem( 'user' ) || undefined;	
}

export const setLoggedInUser = ( user ) => {
	return localStorage.setItem( 'user', user );
}

export const clearLoggedInUser = () => {
	localStorage.removeItem( 'user' );
}

export function calculateAttempts( intMod, prof ) 
{
	console.log( `int: ${intMod} - prof: ${prof}` )
	let result = Math.floor( intMod / 2 ) + prof;
	return result < 1 ? 1 : result;
}

export function calculatePairs( dc, min, max )
{
	let dcPct = 100 - Math.floor( ( ( dc - 5 ) * 100 ) / ( 21 ) );
	let result = Math.floor( ( ( min  + ( max - min ) ) * dcPct ) / 100 );

	return result;
}
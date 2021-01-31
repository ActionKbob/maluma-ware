import { createSlice } from '@reduxjs/toolkit';

import { calculateAttempts, calculatePairs } from 'utilities';

export const delayedCheckMatch = ( payload ) => async dispatch => {
	await dispatch( checkMatch( payload ) );
	setTimeout( () => {
		dispatch( handleMatch( payload ) );
	}, 1200 );
}

const populateCards = ( cardCount, pairs ) => {
	let cardId = -1
	let skullCards = Array.from( { length: cardCount - ( pairs * 2 ) }, ( _, i ) => i ).map( o => {
		return { id : cardId++, pairId : -1, flipped : false, status : 'normal' };
	} );

	let pairCards = [];
	for( var i = 0; i < pairs; i++ )
	{
		pairCards.push( { id : cardId++, pairId : i, flipped : false, status : 'normal' } );
		pairCards.push( { id : cardId++, pairId : i, flipped : false, status : 'normal' } );
	}

	return [ ...pairCards, ...skullCards ].sort( () => Math.random() - 0.5 );
};

const initialState = {
	status : 'loading',
	attempts : 1,
	pairs : 3,
	successes : 0,
	size : 5,
	cards : [],
	selectedCards : [],
};

const gameSlice = createSlice( {
	name : 'game',
	initialState : initialState,
	reducers : {
		newGame : ( state, { payload } ) =>
		{
			state.status = 'playing';
			state.attempts = calculateAttempts( payload.intMod, payload.prof );
			state.pairs = calculatePairs( payload.checkDC, 3, 11 );

			const cardCount = state.size * state.size;
			state.cards = populateCards( cardCount, state.pairs );
		},

		cardClick : ( state, { payload } ) => {
			
			if( state.status !== 'idle' && state.selectedCards.length < 2 )
			{
				let card = state.cards.find( c => c.id === payload.id )
				if( card && card.flipped === false )
				{
					state.selectedCards.push( card );
					card.flipped = true;
				}
			}
		},

		checkMatch : ( state, { payload } ) => {
			
			state.status = 'idle';

			let card1 = state.cards.find( c => c.id === payload[0].id );
			let card2 = state.cards.find( c => c.id === payload[1].id );
			if( card1 && card2 )
			{
				if( card1.pairId === card2.pairId )
				{
					card1.status = 'matched';
					card2.status = 'matched';
					state.successes++;
				}
				// else
				// {
				// 	card1.flipped = card2.flipped = false;
				// }
				// state.selectedCards = [];
			}
		},

		handleMatch : ( state, { payload } ) => {
			
			let card1 = state.cards.find( c => c.id === payload[0].id );
			let card2 = state.cards.find( c => c.id === payload[1].id );

			if( card1.status !== 'matched' && card1.pairId !== -1 )
				card1.flipped = false;

			if( card2.status !== 'matched' && card2.pairId !== -1 )
				card2.flipped = false;

			state.selectedCards = [];
			state.status = 'playing';
		},

		handleFail : state => 
		{
			state.selectedCards.forEach( sc => {
				let card = state.cards.find( c => c.id === sc.id );
				if( card && card.pairId !== -1 )
				{
					card.flipped = false;
				}
			} );

			state.attempts--;
			state.selectedCards = [];
		},



		endGame : state => {
			state.status = 'gameOver';
		}
	},
	extraReducers : {}
} );

export const { newGame, cardClick, checkMatch, handleMatch, handleFail, endGame } = gameSlice.actions;
export const gameSelector = state => state.gameReducer;

export default gameSlice.reducer;
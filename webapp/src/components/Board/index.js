import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameSelector, delayedCheckMatch, handleFail } from 'store/game';

import Card from 'components/Card';
import Tally from 'components/Board/Tally';

import 'styles/board.scss';

const Board = () => {

	const cardChars = [ '\u03A9',
						'\u03A8', 
						'\u03A6', 
						'\u03A0', 
						'\u039E', 
						'\u039B', 
						'\u03C4', 
						'\u0394',
						'\u03C9',
						'\u03B8',
						'\u03BB' ];

	const dispatch = useDispatch();

	const { cards, selectedCards, status, attempts, successes } = useSelector( gameSelector );	

	useEffect( () => {

		console.log(status)
		if( status === 'playing' )
		{
			if( selectedCards.filter( c => c.pairId === -1 ).length > 0 )
			{
				dispatch( handleFail( selectedCards ) );
			}
			else if( selectedCards.length === 2 )
			{
				dispatch( delayedCheckMatch( selectedCards ) );
			}
		}

	}, [ status, selectedCards, dispatch ] );

	const cardElements = cards.map( c => {
		return (
			<Card key={c.id} data={c} char={cardChars[c.pairId]} />
		);
	} );

	return(
		<div>
			<div className="d-flex flex-wrap">
				{cardElements}
			</div>
			<div>
				<Tally amount={ attempts } />
				<Tally amount={ successes } />
			</div>
		</div>
	);
}

export default Board;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameSelector, checkMatch } from 'store/game';

import Card from 'components/Card';

const Board = () => {

	const dispatch = useDispatch();

	const { cards, selectedCards, status, attempts, pairs } = useSelector( gameSelector );	

	useEffect( () => {

		if( status === 'playing' )
		{
			if( selectedCards.length == 2 )
			{
				dispatch( checkMatch( selectedCards ) );
			}
		}
		else if( status === 'idle' )
		{
			
		}

	}, [ status, selectedCards, dispatch ] );

	const cardElements = cards.map( c => {
		return (
			<Card key={c.id} data={c} />
		);
	} );

	return(
		<div>
			{cardElements}
			{pairs}
		</div>
	);
}

export default Board;
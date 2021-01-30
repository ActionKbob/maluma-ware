import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PlayerListItem from './PlayerListItem';
import AddPlayer from './AddPlayer';

import { playersSelector, fetchPlayers } from 'store/players';

const PlayerList = () => {

	const players = useSelector( playersSelector );
	const dispatch = useDispatch();

	const playersStatus = useSelector( ( state ) => state.playersReducer.status );

	useEffect( () => {
		if( playersStatus === 'idle' )
			dispatch( fetchPlayers() );
	}, [ playersStatus, dispatch ] );

	let content;
	if( playersStatus === 'succeeded' )
	{
		content = players.map( (player) => (
			<PlayerListItem data={ player } key={ player.id }/>
		 ) );
	}

	return(

		<div>
			<div>
				{content}
			</div>
			<div className="d-flex">
				<AddPlayer/>
			</div>
		</div>
	);

};

export default PlayerList;
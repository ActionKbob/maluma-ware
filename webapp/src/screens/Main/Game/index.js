import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { configSelector, fetchConfig } from 'store/config'; 
import { userSelector, fetchPlayerData } from 'store/user';
import { gameSelector, newGame, endGame } from 'store/game';

import Loading from 'components/Loading';
import Board from 'components/Board';

const Game = () => {

	const dispatch = useDispatch();

	const configStatus = useSelector( ( state ) => state.configReducer.status );
	const config = useSelector( configSelector );
	const { user, playerData } = useSelector( userSelector );
	const { status, attempts, successes } = useSelector( gameSelector );
	const { checkDC, profMod } = config;
	const { intMod, isProf } = playerData;

	useEffect( () => {

		if( attempts === 0 || successes === 3 )
		{
			console.log("adwwa")
			dispatch( endGame() );
		}

		const initGame = async () => {
			if( configStatus === 'idle' )
				await dispatch( fetchConfig() );

			await dispatch( fetchPlayerData( user ) );

			if(  status === 'loading' && checkDC && isProf && profMod && intMod )
			{
				await dispatch( newGame( {
					checkDC : checkDC,
					prof : isProf ? profMod : 0,
					intMod : intMod
				} ) );
			}
		}
		initGame();

	}, [ attempts, successes, configStatus, user, checkDC, intMod, isProf, profMod, status, dispatch ] );


	let content;
	if(  status === 'loading' )
		content = <Loading/>;
	else if (  status === 'gameOver' )
		content = (
			<div>GAMOEE</div>
		)
	else
		content = <Board/>;

	return(
		<div>
			{content}
		</div>
	);
}

export default Game;
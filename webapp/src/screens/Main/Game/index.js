import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { configSelector, fetchConfig } from 'store/config'; 
import { userSelector, fetchPlayerData } from 'store/user';
import { gameSelector, newGame, endGame } from 'store/game';
import { logout } from 'store/user';

import Loading from 'components/Loading';
import Board from 'components/Board';
import GameOver from 'components/GameOver';
import Tally from 'components/Board/Tally';

const Game = () => {

	const dispatch = useDispatch();

	const configStatus = useSelector( ( state ) => state.configReducer.status );
	const config = useSelector( configSelector );
	const { user, playerData } = useSelector( userSelector );
	const { status, attempts, successes } = useSelector( gameSelector );
	const { checkDC, profMod } = config;
	const { intMod, isProf } = playerData;

	useEffect( () => {

		if( status === 'playing' && ( attempts === 0 || successes === 3 ) )
		{
			dispatch( endGame() );
		}

		const initGame = async () => {
			if( configStatus === 'idle' )
				await dispatch( fetchConfig() );

			await dispatch( fetchPlayerData( user ) );

			if(  status === 'loading' && checkDC && isProf !== undefined && profMod && intMod !== undefined )
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
		content = <GameOver/>
	else
		content = <Board/>;

	return(
		<div>
			<div className="row mt-5">
				<div className="col-12 col-md-8">
					{content}
				</div>
				<div className="col-12 col-md-4">
					<div className="mt-5 mb-5">
						<div className="mb-2">Attempts:</div>
						<Tally amount={ attempts } />
					</div>

					<div className="mb-5">
						<div className="mb-2">Successes:</div>
						<Tally amount={ successes } />
					</div>
				</div>
			</div>
			<div className="row justify-content-end">
				<div className="col-12 col-md-4">
					<button className="logout-btn" onClick={ () => { dispatch( logout() ); } }>Logout</button>
				</div>
			</div>
		</div>
	);
}

export default Game;
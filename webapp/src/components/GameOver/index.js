import { useSelector } from 'react-redux';
import { gameSelector } from 'store/game';

const GameOver = () => {

	const { attempts, successes } = useSelector( gameSelector );

	let content;

	if( attempts === 0 )
	{
		content = (
			<div>
				<div>HACKING FAILED!</div> <br/>
				<div>THE ADMINISTRATOR WILL BE NOTIFIED</div>
			</div>
		);
	}
	else if ( successes === 3 )
	{
		content = (
			<div className="d-flex flex-column justify-content-center h-100">
				<div>
					<div>HACK SUCCESS!</div> <br/>
					<div>HAVE FUN!  :D</div>
				</div>
			</div>
		);
	}

	return(
		<div className="w-100 h-100 d-flex justify-content-center align-items-center">
			{content}
		</div>
	);

}

export default GameOver;
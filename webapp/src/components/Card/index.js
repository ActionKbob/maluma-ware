import { useDispatch } from 'react-redux';
import { cardClick } from 'store/game';

import 'styles/card.scss';
import skull from 'images/skull.svg';

const Card = ( props ) => {

	const dispatch = useDispatch();

	const { flipped } = props.data;

	let content;
	if( flipped )
	{
		if( props.data.pairId === -1 )
		{
			content = (
				<div>
					<img src={ skull } alt="skull death hack fail" />
				</div>
			);
		}
		else
		{
			content = (
				<div>
					{ props.char }
				</div>
			);
		}
	}
	else
	{
		content = (
			<div>
				?
			</div>
		);
	}

	return(
		<div className="gameCard" onClick={ () => { dispatch( cardClick( props.data ) ); } }>
			<div>
				{content}
			</div>
		</div>
	);

}

export default Card;
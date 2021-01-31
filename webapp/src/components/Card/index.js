import { useDispatch } from 'react-redux';
import { cardClick } from 'store/game';

import 'styles/card.scss';
import skull from 'images/skull.svg';

const Card = ( props ) => {

	const dispatch = useDispatch();

	const { pairId, flipped, status } = props.data;

	let content;
	if( flipped )
	{
		if( props.data.pairId === -1 )
		{
			content = (
				<div>
					<img src={ skull } />
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
		<div className="card" onClick={ () => { dispatch( cardClick( props.data ) ); } }>
			<div>
				{content}
			</div>
		</div>
	);

}

export default Card;
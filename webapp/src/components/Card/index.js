import { useDispatch } from 'react-redux';
import { cardClick } from 'store/game';

const Card = ( props ) => {

	const dispatch = useDispatch();

	const { pairId, flipped, status } = props.data;

	return(
		<div onClick={ () => { dispatch( cardClick( props.data ) ); } }>{ pairId } | { flipped.toString() } | {status}</div>
	);

}

export default Card;
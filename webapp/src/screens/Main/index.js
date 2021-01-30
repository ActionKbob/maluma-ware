import { userSelector } from 'store/user';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/user';

import Login from './Login';
import Game from './Game';


const Main = () => {

	const dispatch = useDispatch();

	const { user } = useSelector( userSelector );

	let content;
	if( user )
	{
		content = (
			<Game/>
		);
	}
	else
	{
		content = (
			<Login/>
		);
	}

	return(
		<div className="container">
			{content}
			<button onClick={ () => { dispatch( logout() ); } }>Logout</button>
		</div>
	);

}

export default Main;
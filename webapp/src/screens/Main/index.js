import { userSelector } from 'store/user';
import { useSelector } from 'react-redux';

import Login from './Login';
import Game from './Game';

import 'styles/main.scss';

const Main = () => {

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
		<div id="main_view" className="container">
			{content}
		</div>
	);

}

export default Main;
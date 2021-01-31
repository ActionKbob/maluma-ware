import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { attemptLogin } from 'store/user';

import { userSelector, handleError } from 'store/user';

import 'styles/login.scss';

import logo from 'images/guacOSLogo.png';

const Login = () => {
	
	const dispatch = useDispatch();
	const { error } = useSelector( userSelector );

	const [ loginUser, setLoginUser ] = useState( '' );

	useEffect( () => {
		if( error )
		{
			dispatch( handleError() );
			//TODO animate input or whatever
		}
	}, [ error, dispatch ] );

	const handleLogin = async ( event ) => {
		event.preventDefault();
		await dispatch( attemptLogin( loginUser ) );
	}

	return(
		<div id="login" className="d-flex justify-content-center align-items-center">
			<form className="d-flex flex-column" onSubmit={ handleLogin }>
				<img id="logo" src={logo} alt="GuacOS Logo"/>
				<input className="mb-3" placeholder="Character Name" type="text" value={loginUser} onChange={ ( event ) => { setLoginUser( event.target.value ); } }/>
				<input type="submit" value="Login"/>
			</form>
		</div>
	);
}

export default Login;
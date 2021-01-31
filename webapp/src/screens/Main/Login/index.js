import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { attemptLogin } from 'store/user';

import { userSelector, handleError } from 'store/user';

import 'styles/login.scss';

const Login = () => {
	
	const dispatch = useDispatch();
	const { error } = useSelector( userSelector );

	const [ loginUser, setLoginUser ] = useState( '' );

	useEffect( () => {
		if( error )
		{
			dispatch( handleError() );
			console.log( "HANDLE ERROR" );
			//TODO animate input or whatever
		}
	}, [ error, dispatch ] );

	const handleLogin = async ( event ) => {
		event.preventDefault();
		await dispatch( attemptLogin( loginUser ) );
	}

	return(
		<div id="login">
			<form className="d-flex flex-column" onSubmit={ handleLogin }>
				<input type="text" value={loginUser} onChange={ ( event ) => { setLoginUser( event.target.value ); } }/>
				<input type="submit" value="Login"/>
			</form>
		</div>
	);
}

export default Login;
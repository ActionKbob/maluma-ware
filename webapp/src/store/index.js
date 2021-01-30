import { configureStore } from '@reduxjs/toolkit';

import playersReducer from 'store/players';
import configReducer from 'store/config';
import userReducer from 'store/user';
import gameReducer from 'store/game';

const store = configureStore( {
	reducer : {
		playersReducer,
		configReducer,
		userReducer,
		gameReducer
	}
} );

export default store;
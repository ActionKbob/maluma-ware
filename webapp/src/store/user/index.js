import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getLoggedInUser, setLoggedInUser, clearLoggedInUser } from 'utilities';

export const fetchPlayerData = createAsyncThunk( '/users/getData', async ( user ) => {
	const response = await axios.post( '/api/players/byName', { user : user } );
	return response.data;
} );

export const attemptLogin = createAsyncThunk( '/users/login', async ( user ) => {
	const response = await axios.post( '/api/players/byName', { user : user } );
	return response.data;
} );

const initialState = {
	error : null,
	user : getLoggedInUser(),
	playerData : {}
};

const userSlice = createSlice( {
	name : 'user',
	initialState : initialState,
	reducers : {
		logout : state => {
			state.user = undefined;
			state.playerData = {};
			clearLoggedInUser();
		},
		handleError : state => {
			state.error = null;
		}
	},
	extraReducers : {
		[ fetchPlayerData.fulfilled ] : ( state, { payload } ) => {
			state.playerData = payload;
		},

		[ attemptLogin.fulfilled ] : ( state, { payload } ) => {
			if( payload )
			{
				state.error = null;
				state.user = payload.name;
				setLoggedInUser( payload.name );
			}
			else
			{
				state.error = "User not found";
				state.user = undefined;
				state.playerData = {};
				clearLoggedInUser();
			}
		},
	}
} );

export const { logout, handleError } = userSlice.actions;
export const userSelector = state => state.userReducer;

export default userSlice.reducer;
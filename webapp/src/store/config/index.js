import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchConfig = createAsyncThunk( '/game/fetchGameConfig', async () => {
	const { data } = await axios.get( '/api/config' );
	return data;
} );

export const setConfig = createAsyncThunk( '/game/setCheckDC', async ( payload ) => {
	const response = await axios.post( '/api/config/set', payload );
	return response.data;
} );

const initialState = {
	status : 'idle',
	error : null,
	checkDC : 5,
	profMod : 2
};

const configSlice = createSlice( {
	name : 'config',
	initialState : initialState,
	reducers : {},
	extraReducers : {
		[ fetchConfig.pending ] : state => {
			state.status = 'loading';
		},
		
		[ fetchConfig.fulfilled ] : ( state, { payload } ) => {
			state.status = 'succeeded';
			state.checkDC = payload.checkDC;
			state.profMod = payload.profMod;
		},

		[ setConfig.fulfilled ] : ( state, { payload } ) => {
			state.checkDC = payload.checkDC;
			state.profMod = payload.profMod;
		}
	}
} );

export const configSelector = state => state.configReducer;

export default configSlice.reducer;
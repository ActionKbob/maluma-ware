import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	status : 'idle',
	error : null,
	entities : []
};

export const fetchPlayers = createAsyncThunk( '/players/fetchPlayers', async () => {
	const response = await axios.get( '/api/players' );
	return response.data;
} );

export const setPlayer = createAsyncThunk( '/players/setPlayer', async ( playerData ) => {
	const response = await axios.post( '/api/players/set', playerData );
	return response.data;
} );

const playersSlice = createSlice({
	name : 'players',
	initialState,
	reducers : {},
	extraReducers : {
		[ fetchPlayers.pending ] : state => {
			state.status = 'loading';
		},

		[ fetchPlayers.fulfilled ] : ( state, { payload } ) => {
			state.status = 'succeeded';
			state.entities = payload;
		},

		[ setPlayer.fulfilled ] : ( state, { payload } ) => {
			const player = state.entities.find( player => player.id === payload.id );
			if( player )
			{
				player.name = payload.name;
				player.intMod = payload.intMod;
				player.isProf = payload.isProf;
			}
			else
			{
				state.entities.push( payload );
			}
		}
	}
});

export const playersSelector = state => state.playersReducer.entities;

export default playersSlice.reducer;
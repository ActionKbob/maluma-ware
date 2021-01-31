import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { configSelector, fetchConfig, setConfig } from 'store/config'; 

const ConfigInput = () => {
	const gameSettings = useSelector( configSelector );
	const dispatch = useDispatch();

	const gameConfigStatus = useSelector( ( state ) => state.configReducer.status );

	useEffect( () => {
		if( gameConfigStatus === 'idle' )
			dispatch( fetchConfig() );
	}, [ gameConfigStatus, dispatch ] );

	const dcOptions = Array.from( { length: 16 }, ( _, i ) => i + 5 ).map( o => {
		return (
			<option key={o} value={o}>{o}</option>
		);
	} );
	
	const profOptions = Array.from( { length: 5 }, ( _, i ) => i + 2 ).map( o => {
		return (
			<option key={o} value={o}>{o}</option>
		);
	} );

	return (
		<div>
			<form>
				<label>
					Hacking DC:
					<select value={ gameSettings.checkDC } onChange={ async ( event ) => { await dispatch( setConfig( { action : 'checkDC', payload : event.target.value } ) ); } }>
						{dcOptions}
					</select>
				</label>
				<br/>
				<label>
					Proficiency Bonus:
					<select value={ gameSettings.profMod } onChange={ async ( event ) => { await dispatch( setConfig( { action : 'profMod', payload : event.target.value } ) ); } }>
						{profOptions}
					</select>
				</label>
			</form>
		</div>
	);

}

export default ConfigInput;
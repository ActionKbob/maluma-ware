import { useState } from "react";

import PlayerListItem from '../PlayerListItem';

const AddPlayer = () => {

	const [ adding, setAdding ] = useState( false );

	let content;

	if( adding )
	{
		content = (
			<div>
				<PlayerListItem data={ { name : '', intMod : 0, isProf : false } } editable={true} onUpdate={ () => { setAdding( false ); } }/>
			</div>
		);
	}
	else
	{
		content = <button onClick={ () => { setAdding( true ); } }>Add Player</button>
	}

	return(
		<div>{content}</div>
	);
}

export default AddPlayer;
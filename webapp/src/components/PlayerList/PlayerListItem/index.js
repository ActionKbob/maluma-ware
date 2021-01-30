import { useState } from "react";
import { useDispatch } from 'react-redux';

import ItemField from './ItemField';

import { setPlayer } from 'store/players';

const PlayerListItem = ( props ) => {

	const dispatch = useDispatch();
	const { id } = props.data;


	const [ name, setName ] = useState( props.data.name );
	const [ intMod, setIntMod ] = useState( props.data.intMod )
	const [ isProf, setIsProf ] = useState( props.data.isProf )

	const [ editable, setEditable ] = useState( props.editable || false );

	const handleNameChange = ( event ) => { setName( event.target.value ); }
	const handleIntModChange = ( event ) => { setIntMod( parseInt(event.target.value) ); }
	const handleIsProfChange = ( event ) => { setIsProf( event.target.checked ); }

	const handleUpdateClick = async ( event ) => {
		setEditable( false );
		await dispatch( setPlayer( {
			id : id,
			name : name,
			intMod : intMod,
			isProf : isProf
		} ) );

		if( props.onUpdate !== undefined )
			props.onUpdate();
	}

	let buttonContent;

	if( editable )
	{
		let text = id === undefined ? 'Add' : 'Update';
		buttonContent = (
			<div>
				<button onClick={ handleUpdateClick }>{text}</button>
			</div>
		);
	}
	else
	{
		buttonContent = <button onClick={ () => { setEditable( true ); } }>Edit</button>
	}

	return(
		<div className="d-flex">
			[<ItemField value={ name } onChange={ handleNameChange } editable={ editable } />]
			[<ItemField value={ intMod } onChange={ handleIntModChange } editable={ editable } />]
			[<ItemField value={ isProf } onChange={ handleIsProfChange } editable={ editable } />]
			{buttonContent}
		</div>
	);
};

export default PlayerListItem;
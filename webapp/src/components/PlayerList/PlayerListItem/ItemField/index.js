const ItemField = ( props ) => {

	if( props.editable )
	{
		switch( typeof( props.value ) )
		{
			case "string" :
				return( <input type="text" value={ props.value } onChange={ props.onChange }/> );

			case "number" :
				return( <input className="w-100" type="number" value={ props.value } onChange={ props.onChange }/> );

			case "boolean" :
				return( <input type="checkbox" checked={ props.value } onChange={ props.onChange }/> );

			default :
				return( <div>Unknown Element for { props.name }</div> );
		}
	}
	else
	{
		switch( typeof( props.value ) )
		{
			case "boolean" :
				return( <input type="checkbox" checked={ props.value } disabled/> );

			default :
				return( <div>{ props.value }</div> );
		}
	}

}

export default ItemField;
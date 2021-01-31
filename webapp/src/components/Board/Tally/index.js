const Tally = ( props ) => {
    
    let items = Array.from( { length: props.amount }, ( _, i ) => i ).map( o => {
		return (
			<div key={o}></div>
		);
	} );
    
    return (
        <div className="tally d-flex">
            { items }
        </div>
    );
}

export default Tally;
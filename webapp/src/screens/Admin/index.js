import PlayerList from 'components/PlayerList';
import ConfigInput from 'components/ConfigInput';

const Admin = () => {
	return(
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-6 col-lg-8">
					<ConfigInput/>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<PlayerList/>
				</div>
			</div>
		</div>
	);
};

export default Admin;
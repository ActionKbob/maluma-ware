import PlayerList from 'components/PlayerList';
import ConfigInput from 'components/ConfigInput';

const Admin = () => {
	return(
		<div className="container pt-5">
			<div className="row">
				<div className="col-12 col-md-6 col-lg-7">
					<ConfigInput/>
				</div>
				<div className="col-12 col-md-6 col-lg-5">
					<PlayerList/>
				</div>
			</div>
		</div>
	);
};

export default Admin;
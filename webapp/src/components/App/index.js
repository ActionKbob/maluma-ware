import {
	HashRouter as Router, 
	Route,
	Switch
} from 'react-router-dom';

import Admin from 'screens/Admin';
import Main from 'screens/Main';

const App = () => {
	return(
		<Router>
			<Switch>
				<Route exact path="/">
					<Main/>
				</Route>
				<Route exact path="/super/secret/admin">
					<Admin/>
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
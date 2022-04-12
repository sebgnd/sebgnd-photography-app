import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import store from './redux';

// User Components
import Home from './pages/FrontOffice/Home/Home';
import Recent from './pages/FrontOffice/Recent/Recent';
import Galleries from './pages/FrontOffice/Galleries/Galleries';
import Gallery from './pages/FrontOffice/Gallery/Gallery';
import Playground from './pages/Playground/Playground';

// Admin Components
import AdminHome from './pages/BackOffice/Home/Home';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

export const App: FunctionComponent = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/admin">
						<AdminLayout>
							<Route exact={true} path="/admin/home" component={AdminHome} />
						</AdminLayout>
					</Route>
					<Route path="/">
						<UserLayout>
							<Route exact={true} path="/" component={Home} />
							<Route exact={true} path="/recent/:imageId?" component={Recent} /> 
							<Route exact={true} path="/gallery" component={Galleries} />
							<Route exact={true} path="/gallery/:id/:imageId?" component={Gallery} />
							<Route exact={true} path="/playground" component={Playground} />
						</UserLayout>
					</Route>
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}

export default App;

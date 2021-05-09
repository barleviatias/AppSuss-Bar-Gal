const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './pages/Home.jsx';
import { KeepApp } from './Apps/Keeper/cmps/KeepApp.jsx';
import { EmailApp } from './Apps/Email/cmps/EmailApp.jsx';
import { EmailDetails } from './Apps/Email/cmps/EmailDetails.jsx';
import { EmailCompose } from './Apps/Email/cmps/EmailCompose.jsx';
import { AboutUs } from './pages/About.jsx';

// Simple React Component
export function App() {
	return (
		<Router>
			<header>
				<AppHeader />
			</header>
			<main>
				<Switch>
					{/* <Route  component={EmailCompose} path="/mail/add" /> */}
					<Route  component={EmailApp} path="/mail" />
					<Route exact component={AboutUs} path='/about' />
					<Route exact component={KeepApp} path='/keep' />
					<Route  component={Home} path='/' />
				</Switch>
			</main>
	
		</Router>
	);
}

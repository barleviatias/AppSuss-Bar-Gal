const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './pages/Home.jsx';
import { KeepApp } from './Apps/Keeper/cmps/KeepApp.jsx';
import { EmailApp } from './Apps/Email/cmps/EmailApp.jsx';
import { EmailDetails } from './Apps/Email/cmps/EmailDetails.jsx';
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
					<Route exact component={EmailDetails} path="/mail/:id" />
					<Route exact component={EmailApp} path="/mail" />
					<Route exact component={AboutUs} path='/about' />
					<Route exact component={KeepApp} path='/keep' />
					<Route  component={Home} path='/' />

				</Switch>
			</main>
			<footer>coffeerights &copy;</footer>
		</Router>
	);
}

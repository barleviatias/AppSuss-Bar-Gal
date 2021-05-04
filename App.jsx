const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './pages/Home.jsx';
import { KeepApp } from './Apps/Keeper/KeepApp.jsx';
import { EmailApp } from './Apps/Email/cmps/EmailApp.jsx';
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
					<Route component={AboutUs} path='/about' />
					<Route component={EmailApp} path="/mail" />
					<Route component={KeepApp} path='/keep' />
					<Route component={Home} path='/' />

				</Switch>
			</main>
			<footer>coffeerights &copy;</footer>
		</Router>
	);
}

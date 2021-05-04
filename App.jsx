const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './pages/Home.jsx';

// Simple React Component
export function App() {
	return (
		<Router>
			<header>
				<AppHeader />
			</header>
			<main>
            <Switch>
            <Route component={Home} path='/' />
            </Switch>
			</main>
			<footer>coffeerights &copy;</footer>
		</Router>
	);
}

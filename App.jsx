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
				<h1>My App</h1>
				<Home />
			</main>
			<footer>coffeerights &copy;</footer>
		</Router>
	);
}

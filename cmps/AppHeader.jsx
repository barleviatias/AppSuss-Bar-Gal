const { NavLink, withRouter } = ReactRouterDOM;

export class AppHeader extends React.Component {
	state = {
		visible: false,
	};

	isLinksVisible = () => {
		if (this.state.visible) {
			this.setState({
				visible: false,
			});
		} else this.setState({ visible: true });
	};

	render() {
		const { visible } = this.state;
		return (
			<nav className="app-header">
				<div className="logo-container">
					<NavLink exact to="/">
						<img className="logo-img" src="./assets/img/chipapp.png" alt="" />
					</NavLink>
				</div>
				<div className="header-links-container">
					{visible && (
						<ul className="clean-list header-links">
							<li>
								<NavLink exact to="/">
									Home
								</NavLink>
							</li>
						
							<li>
								<NavLink to="/keep">Note Keeper</NavLink>
							</li>
							<li>
								<NavLink to="/mail">Mail</NavLink>
							</li>
							<li>
								<NavLink to="/about">About</NavLink>
							</li>
						</ul>
					)}

					{!visible && (
						<button onClick={this.isLinksVisible}>
							<span className="material-icons">menu</span>
						</button>
					)}
					{visible && <button onClick={this.isLinksVisible}>X</button>}
				</div>
			</nav>
		);
	}
}

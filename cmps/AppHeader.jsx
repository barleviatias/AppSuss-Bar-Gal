
const { NavLink, withRouter } = ReactRouterDOM

export class AppHeader extends React.Component {

    state = {
        visible: false,
    }



    isLinksVisible = () => {
        if (this.state.visible) {

            this.setState({
                visible: false
            })
        }
        else this.setState({ visible: true })
    }

    render() {
        const { visible } = this.state;
        return (
            <nav className="app-header">
                <div className="logo-container">
                    <img className="logo-img" src="./assets/img/logo.png" alt="" />
                    <h3>AppSuss</h3>
                </div>
                <div className="header-links-container">

                    {this.state.visible && <ul className="clean-list header-links">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/book">Book</NavLink></li>
                        <li><NavLink to="/keep">Note Keeper</NavLink></li>
                        <li><NavLink to="/mail">Mail</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                    </ul>}

                    {!visible && <button onClick={this.isLinksVisible}>🔢</button>}
                    {visible && <button onClick={this.isLinksVisible}>X</button>}
                </div>
            </nav>
        )
    }
}
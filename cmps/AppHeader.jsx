const { NavLink, withRouter } = ReactRouterDOM
export class AppHeader extends React.Component {

    render() {
        return (
            <nav className="app-header ">
<div className="logo-container">
<img className="logo-img" src="./assets/img/logo.png" alt=""/>
<h3>AppSuss</h3>
</div>
                <ul className="clean-list header-links">
                    <li><NavLink to="/book">Book</NavLink></li>
                    <li><NavLink to="/keep">Kepp</NavLink></li>
                    <li><NavLink to="/mail">Mail</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink exact to="/">Home</NavLink></li>

                    {/* TODO: make button that open the links in a row */}
                    {/* <button>🔢</button> */}
                </ul>
            </nav>
        )
    }
}
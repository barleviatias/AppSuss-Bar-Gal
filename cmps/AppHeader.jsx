const { NavLink, withRouter } = ReactRouterDOM
export class AppHeader extends React.Component{

    render(){
        return (
            <nav className="app-header ">
                <ul className="clean-list">
                    <li><NavLink to="/book">Book</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/">Home</NavLink></li>
                </ul>
            </nav>
        )
    }
}
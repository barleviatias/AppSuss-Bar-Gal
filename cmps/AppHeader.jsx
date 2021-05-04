const { NavLink, withRouter } = ReactRouterDOM
// import {emailService} from '../services/email-service.js'
export class AppHeader extends React.Component{

    render(){
        return (
            <nav className="app-header ">
                <ul className="clean-list">
                    <li><NavLink to="/book">Book</NavLink></li>
                    <li><NavLink to="/mail">Email</NavLink></li>
                    <li><NavLink to="/keeper">keeper</NavLink></li>
                    <li><NavLink to="/">Home</NavLink></li>
                </ul>
            </nav>
        )
    }
}
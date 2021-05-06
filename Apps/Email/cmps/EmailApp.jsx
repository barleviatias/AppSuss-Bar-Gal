const { NavLink, Route, Switch, Link } = ReactRouterDOM;
import { emailService } from '../../Email/services/email-service.js';
import { EmailList } from '../cmps/EmailList.jsx';
import { EmailDetails } from '../cmps/EmailDetails.jsx';
import { EmailCompose } from '../cmps/EmailCompose.jsx';
export class EmailApp extends React.Component {
	state = {
		emails: null,
	};
	componentDidMount() {
		console.log('mounting');
		this.loadEmail();
		emailService.query();
	}
	loadEmail = () => {
		// console.log('loademail');
		emailService.query().then((emails) => {
			this.setState({ emails });
			// console.log(this.state.emails);
		});
	};
	toggleEmail = (idx) => {
		emailService.toggleRead(idx);
		this.loadEmail();
	};
	onRemoveEmail = (idx) => {
		emailService.removeEmail(idx).then(() => {
			this.loadEmail();
		});
	};
	render() {
		const { emails } = this.state;
		if (!emails) return <div>Loading...</div>;
		// console.log(emails);
		return (
			<section className="email-container container">
				<h1>email APP</h1>
				<Switch>
					{/* <Route component={EmailCompose} path="/mail/add" /> */}
					{/* <Route component={EmailDetails} path="/mail/:id" /> */}
					{/* <Route component={EmailApp} path="/mail" /> */}
				</Switch>
				<div className="email-app flex">
					<div className="inbox">
						<h2>inbox!</h2>
						<EmailList
							onRemoveEmail={this.onRemoveEmail}
							toggleEmail={this.toggleEmail}
							emails={emails}
						/>
					</div>
					<div className="email-panel">
						<h4>side bar</h4>
						<NavLink to={`/mail/add`}>
							<button className="btn-compose flex">
								<span className="material-icons add">add_circle</span>Compose
							</button>
						</NavLink>
					</div>
				</div>
			</section>
		);
	}
}

const { NavLink, Route, Switch, Link } = ReactRouterDOM;
import { emailService } from '../../Email/services/email-service.js';
import { EmailList } from '../cmps/EmailList.jsx';
import { EmailDetails } from '../cmps/EmailDetails.jsx';
import { EmailCompose } from '../cmps/EmailCompose.jsx';
export class EmailApp extends React.Component {
	state = {
		emails: null,
        filterBy: {
            subject: '',
            body: '',
            ctg: '',
            keyword:''
          }
	};
	componentDidMount() {
		console.log('mounting');
		this.loadEmail();
        console.log(this.state.filterBy);
		emailService.query();
	}
	loadEmail = () => {
		// console.log('loademail');
		emailService.query(this.state.filterBy).then((emails) => {
			this.setState({ emails });
			// console.log(this.state.emails);
		});
        console.log(this.state.filterBy);
	};
	toggleEmail = (idx) => {
		emailService.toggleRead(idx);
		this.loadEmail();
	};
	toggleStar = (idx) => {
		emailService.toggleStar(idx);
		this.loadEmail();
	};
	onRemoveEmail = (idx) => {
		emailService.removeEmail(idx).then(() => {
			this.loadEmail();
		});
	};
    onSetFilter = (filterBy) => {
		this.setState({ filterBy }, this.loadEmail);
	};
	render() {
		const { emails } = this.state;
		if (!emails) return <div>Loading...</div>;
		// console.log(emails);
		return (
			<section className="email-container ">
				
				<div className="email-app container flex">
					<div className="inbox">
						<h2>inbox!</h2>
						<Switch>
							<Route component={EmailCompose} path="/mail/add" />
                            <Route  component={EmailDetails} path="/mail/:id" />
							<Route
								render={() => (
									<EmailList
										onRemoveEmail={this.onRemoveEmail}
										toggleEmail={this.toggleEmail}
										toggleStar={this.toggleStar}
                                        onSetFilter={this.onSetFilter}
										emails={emails}
									/>
								)}
								path="/mail/"
							/>

						</Switch>
					
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

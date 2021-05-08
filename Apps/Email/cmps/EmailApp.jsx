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
			keyword: '',
			isStarred: '',
			isRead: '',
		},
	};
	componentDidMount() {
		this.loadEmail();
		emailService.query();
	}
	loadEmail = () => {
		// console.log('loademail');
		emailService.query(this.state.filterBy).then((emails) => {
			this.setState({ emails });
			// console.log(this.state.emails);
		});
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
	onFilterAll = () => {
		this.setState({ filterBy: null }, this.loadEmail);
	};
	onFilterRead = () => {
		this.setState({ filterBy: { isRead: true } }, this.loadEmail);
	};
	onFilterUnread = () => {
		this.setState({ filterBy: { isRead: false } }, this.loadEmail);
	};
	onFilterStar = () => {
		this.setState({ filterBy: { isStarred: true } }, this.loadEmail);
	};
	onGetReadStatistics = () => {
        return emailService.getReadStatistics()
    }
	render() {
		const { emails } = this.state;
		if (!emails) return <div>Loading...</div>;
		// console.log(emails);
		return (
			<section className="email-container ">
				<div className="email-app container flex">
					<div className="inbox">
						<Switch>
							<Route component={EmailCompose} path="/mail/add" />
							<Route component={EmailDetails} path="/mail/:id" />
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
					<div className="email-panel flex">
							<button className="btn-compose flex">
						<NavLink className="add-nav" to={`/mail/add`}>
								<span className="material-icons add">add_circle</span>
								Compose
						</NavLink>
							</button>
						<button className="btn-sidebar" onClick={this.onFilterAll}>
							<span className="material-icons fa-mail">all_inbox</span>All
						</button>
						<button className="btn-sidebar" onClick={this.onFilterRead}>
							<span className="material-icons fa-mail">drafts</span>Read
						</button>
						<button className="btn-sidebar" onClick={this.onFilterUnread}>
							<span className="material-icons fa-mail">mail</span>Unread
						</button>
						<button className="btn-sidebar" onClick={this.onFilterStar}>
							<span className="material-icons fa-star">star</span>Favorites
						</button>
						<button className="btn-sidebar">{this.onGetReadStatistics()}% Read</button>
					</div>
				</div>
			</section>
		);
	}
}

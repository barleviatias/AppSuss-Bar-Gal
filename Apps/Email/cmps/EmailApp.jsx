import { emailService } from '../../Email/services/email-service.js'
import { EmailList } from '../cmps/EmailList.jsx';
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
		console.log('loademail');
		emailService.query().then((emails) => {
			this.setState({ emails: emails });
			console.log(this.state.emails);
		});
	};
    toggleEmail = (isRead) => {
        this.setState({isRead: !isRead })
    }
	render() {
		const { emails } = this.state;
        if (!emails) return <div>Loading...</div>;
		console.log(emails);
		return (
			<div className="email-container container">
				<h1>email APP</h1>
				<div className="email-app flex">
					<div className="inbox">
						<h2>inbox!</h2>
						<EmailList emails={emails} />
					</div>
					<div className="email-panel">
						<h4>side bar</h4>
					</div>
				</div>
			</div>
		);
	}
}

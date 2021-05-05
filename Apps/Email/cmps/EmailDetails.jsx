import { emailService } from '../services/email-service.js';
export class EmailDetails extends React.Component {
	state = {
		mail: null,
	};
	componentDidMount() {
		this.loadMail();
	}

	loadMail = () => {
		const mailId = this.props.match.params.mailId;
		emailService.getEmailById(mailId).then((mail) => {
			if (!mail) return this.props.history.push('/mail');
			this.setState({ mail });
		});
	};
	render() {
		const { mail } = this.state;
		if (!mail) return <div>Loading...</div>;
		return <main className="mail-details">
            <h2>{mail.body}</h2>
        </main>;
	}
}

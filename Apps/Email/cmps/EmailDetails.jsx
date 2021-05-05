import { emailService } from '../services/email-service.js';
export class EmailDetails extends React.Component {
	state = {
		mail: null,
	};
	componentDidMount() {
		console.log('emaild details');
		this.loadEmail ();
	}

	loadEmail  = () => {
		const mailId = this.props.match.params.id;
		console.log(mailId);
		emailService.getEmailById(mailId).then((mail) => {
			if (!mail) return this.props.history.push('/mail');
			this.setState({ mail:mail });
		});
	};
	render() {
		console.log("render mail");
		const { mail } = this.state;
		console.log(mail);
		if (!mail) return <div>Loading...</div>;
		return <main className="mail-details">
            <h1>{mail.subject}</h1>
            <p>{mail.body}</p>
        </main>;
	}
}

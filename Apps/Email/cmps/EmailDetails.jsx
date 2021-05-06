const { Link } = ReactRouterDOM;
import { emailService } from '../services/email-service.js';
export class EmailDetails extends React.Component {
	state = {
		mail: null,
	};
	componentDidMount() {
		console.log('emaild details');
		this.loadEmail();
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.loadEmail();
		}
	}
	loadEmail = () => {
		const mailId = this.props.match.params.id;
		console.log(mailId);
		emailService.getEmailById(mailId).then((mail) => {
			if (!mail) return this.props.history.push('/mail');
			this.setState({ mail: mail });
		});
	};
	goBack = () => {
		this.props.history.push('/mail');
	};
	isRead = () => {
		emailService.toggleReadOn(this.state.mail.id);
	};
	render() {
		console.log('render mail');
		const { mail } = this.state;
		if (!mail) return <div>Loading...</div>;
		this.isRead();
		return (
			<main className="mail-details">
				<h1>{mail.subject}</h1>
				<p>{mail.body}</p>

				<Link to={`/mail/${emailService.getNextEmailId(mail.id)}`}>
					Next email
				</Link>
				<button onClick={this.goBack}>
					<span className="material-icons">arrow_back_ios</span>
					{/* <span class="material-icons">star</span> */}
				</button>
			</main>
		);
	}
}

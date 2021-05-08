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
	onRemoveEmail = (idx) => {
		emailService.removeEmail(idx).then(() => {
			this.loadEmail();
		});
	};
	render() {
		console.log('render mail');
		const { mail } = this.state;
		if (!mail) return <div>Loading...</div>;
		this.isRead();
		return (
			<main className="mail-details-card">
				<button className="email-close" onClick={this.goBack}>
					<span className="material-icons close">close</span>
					{/* <span class="material-icons">star</span> */}
				</button>
				<h3>subject: {mail.subject}</h3>
				{/* <p>from {mail.from}</p> */}
				<p>{mail.body}</p>
				<div className="details-btns flex">
					<button className="details-btn">

					<Link to={`/mail/${emailService.getPrevEmailId(mail.id)}`}>
						previus email
					</Link>
					</button>
					<button
						onClick={() => {
							this.onRemoveEmail(mail.id);
						}}
					>
						<span className="material-icons fa-trash">delete</span>
					</button>
					<button className="details-btn">

					<Link to={`/mail/${emailService.getNextEmailId(mail.id)}`}>
						Next email
					</Link>
					</button>
				</div>
			</main>
		);
	}
}

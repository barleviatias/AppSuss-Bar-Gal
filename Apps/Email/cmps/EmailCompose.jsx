import { emailService } from '../services/email-service.js';

export class EmailCompose extends React.Component {
	state = {
		mail: {
			to: '',
			copy: '',
			subject: '',
			body: '',
		},
	};

	handleChange = (ev) => {
		ev.preventDefault();
		const inputName = ev.target.name;
		const inputValue = ev.target.value;
		this.setState({ mail: { ...this.state.mail, [inputName]: inputValue } });
	};

	sendMail = (ev) => {
		ev.preventDefault();
		emailService.addEmail(this.state.mail);
		this.goBack();
	};

	goBack = () => {
		this.props.history.push('/mail');
	};

	render() {
		const { to, copy, subject, body } = this.state.mail;
		return (
			<section className="compose-container flex">

			<form onSubmit={this.sendMail} className="compose-mail flex">
				<label htmlFor="">To</label>
				<input
					name="to"
					type="text"
					value={to.mail}
					onChange={this.handleChange}
					/>

				<label htmlFor="">Copy</label>
				<input
					name="copy"
					type="text"
					value={copy}
					onChange={this.handleChange}
					/>

				<label htmlFor="">Subject</label>
				<input
					name="subject"
					type="text"
					value={subject}
                    required
					onChange={this.handleChange}
                    
					/>
				<label htmlFor="">message</label>
				<textarea name="body" value={body} style={{resize: 'none'}} rows="4" cols="50" onChange={this.handleChange} />
				<div className="btns-compose flex">
					<button onClick={this.goBack}>
						<span className="material-icons">clear</span>
					</button>
					<button>
						<span className="material-icons">send</span>
					</button>
				</div>
			</form>
					</section>
		);
	}
}

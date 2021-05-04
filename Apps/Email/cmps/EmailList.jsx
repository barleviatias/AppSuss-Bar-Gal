import { EmailPreview } from '../cmps/EmailPreview.jsx';
export function EmailList({emails}) {
    console.log(emails);
    // console.log(this.props);
    // const {emails}=this.props
    console.log(this.props.toggleEmail())
    toggleEmail= ()=>{
        this.props.toggleEmail()
    }
	return (
		<div className="email-list">
			{emails.map(email => (
                // <h1>email list</h1>
				<EmailPreview toggleEmail={this.toggleEmail} email={email} key={email.id} />
			))}
		</div>
	);
}

import { EmailPreview } from '../cmps/EmailPreview.jsx';
export function EmailList({emails}) {
    console.log(emails);
    // console.log(this.props);
    // const {emails}=this.props
	return (
		<div className="email-list">
			{emails.map(email => (
                // <h1>email list</h1>
				<EmailPreview email={email} key={email.id} />
			))}
		</div>
	);
}

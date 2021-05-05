import { EmailPreview } from '../cmps/EmailPreview.jsx';
// export  function EmailList({emails}) {
export  class EmailList extends React.Component {
    // console.log(emails);
    // console.log(this.props);
    // const {emails}=this.props
    toggleEmail= ()=>{
        this.props.toggleEmail()
    }
    render(){
        console.log(this.props)
        return (
            <div className="email-list">
			{this.props.emails.map(email => (
                // <h1>email list</h1>
				<EmailPreview removeEmail={this.props.onRemoveEmail} toggleEmail={this.props.toggleEmail} email={email} key={email.id} />
                ))}
		</div>
	);
}
}

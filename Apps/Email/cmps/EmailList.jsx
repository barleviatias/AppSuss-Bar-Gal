import { EmailPreview } from '../cmps/EmailPreview.jsx';
import { EmailFilter } from '../cmps/EmailFilter.jsx';
// export  function EmailList({emails}) {
export class EmailList extends React.Component {
	// console.log(emails);
	// console.log(this.props);
	// const {emails}=this.props
	toggleEmail = () => {
		this.props.toggleEmail();
	};
	render() {
		// console.log(this.props)
		return (
			<div className="email-list">
				<EmailFilter onSetFilter={this.props.onSetFilter}/>
				{this.props.emails.map((email) => (
					// <h1>email list</h1>
					<EmailPreview
						onRemoveEmail={this.props.onRemoveEmail}
						toggleEmail={this.props.toggleEmail}
						toggleStar={this.props.toggleStar}
						email={email}
						key={email.id}
					/>
				))}
			</div>
		);
	}
}

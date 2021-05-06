const { Link } = ReactRouterDOM;
export function EmailPreview(props) {
	// export class EmailPreview extends React.Compononet{
	// console.log(props);
	const email = props.email;
	const { subject, body, isRead,isStarred, sentAt } = email;

	const dateObject = new Date(sentAt);
	// console.log(dateObject);
	const humanDateFormat = dateObject.toLocaleString(); // 12/9/2019, 10:30:15 AM CST

	return (
		<div className={isRead ? 'email-card' : 'email-card read'}>
			<Link
				onClick={() => {
					props.toggleEmail(email.id);
				}}
				to={`/mail/${email.id}`}
			>
				<div className="card-content">
					<p className="bold">{subject}</p>
					<p>{humanDateFormat}</p>
				</div>
			</Link>
			<div className="card-btn flex">
				<button
					onClick={() => {
						props.toggleEmail(email.id);
					}}
				>
					<span className="material-icons fa-mail">{!isRead ? 'mail' : 'drafts'}</span>
				</button>
				<button onClick={() => {
						props.toggleStar(email.id);
					}}>
					<span className="material-icons fa-star">{!isStarred ? 'star' : 'star_border'}</span>
				</button>
				<button
					onClick={() => {
						props.onRemoveEmail(email.id);
					}}
				>
					<span className="material-icons fa-trash">delete</span>
				</button>
			</div>
		</div>
	);
}

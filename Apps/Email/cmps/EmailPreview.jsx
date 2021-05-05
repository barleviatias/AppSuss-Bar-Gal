const { Link }= ReactRouterDOM
export function EmailPreview(props) {
	// export class EmailPreview extends React.Compononet{
	// console.log(props);
	const email = props.email;
	const { subject, body, isRead, sentAt } = email;

	const dateObject = new Date(sentAt);
	// console.log(dateObject);
	const humanDateFormat = dateObject.toLocaleString(); // 12/9/2019, 10:30:15 AM CST

	return (
		<div className="email-card">
			<div className="card-content">
				<p className={isRead ? '' : 'bold'}>{subject}</p>
				<p>{humanDateFormat}</p>
				<Link
					onClick={() => {
						props.toggleEmail(email.id);
						console.log(email.id);
					}}
					to={`/mail/${email.id}`}>
					<button>read</button>
				</Link>
			</div>
			<button
				onClick={() => {
					props.onRemoveEmail(email.id);
				}}
			>
				X
			</button>
		</div>
	);
}

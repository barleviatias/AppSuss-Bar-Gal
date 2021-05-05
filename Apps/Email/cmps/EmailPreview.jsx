const { Link } = ReactRouterDOM;
export function EmailPreview(props) {
	// export class EmailPreview extends React.Compononet{
	console.log(props);
	const email = props.email;
	const { subject, body, isRead, sentAt } = email;

	const dateObject = new Date(sentAt);
	// console.log(dateObject);
	const humanDateFormat = dateObject.toLocaleString(); // 12/9/2019, 10:30:15 AM CST

	return (
		<Link to={`/mail/${email.id}`}>
			<div
				onClick={() => {
					props.toggleEmail(email.id);
				}}
				className="email-card"
			>
				<div className="card-content">
					<p className={isRead ? '' : 'bold'}>{subject}</p>
					<p>{humanDateFormat}</p>
					<button
						onClick={() => {
							props.removeEmail(email.id);
						}}
					>
						X
					</button>
				</div>
			</div>
		</Link>
	);
}

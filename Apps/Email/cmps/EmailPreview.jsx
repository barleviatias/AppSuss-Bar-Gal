export function EmailPreview(email) {
	const { subject, body, isRead, sendAt } = email;
	return (
		<div className="email-card">
			<h2>{subject}</h2>
			<p>{body}</p>
		</div>
	);
}

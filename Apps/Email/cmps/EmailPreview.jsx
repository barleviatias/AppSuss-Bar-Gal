export function EmailPreview({ email }) {
// export class EmailPreview extends React.Compononet{
  
	const { subject, body, isRead, sentAt } = email;

	const dateObject = new Date(sentAt);
    console.log(dateObject);
	const humanDateFormat = dateObject.toLocaleString() // 12/9/2019, 10:30:15 AM CST
    
        return (
            <div onClick={() => {
                this.toggleEmail(email.id)
            }} className="email-card">
			<div className="card-content">
				<p className={isRead ? 'bold' : ''}>{subject}</p>
				<p>{humanDateFormat}</p>
			</div>
		</div>
	);

}

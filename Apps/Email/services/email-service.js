import { utilService } from '../../../services/util-service.js';
export const emailService = {
	query,
};
var gEmails = [
	{
		id: utilService.makeId(),
		subject: 'new costumer?',
		body: 'Pick up!',
		isRead: true,
		sentAt: 1575909015,
	},
	{
		id: utilService.makeId(),
		subject: 'Wassap?',
		body: 'Pick up!',
		isRead: false,
		sentAt: 1620141972558,
	},
	{
		id: utilService.makeId(),
		subject: 'Wassap?',
		body: 'Pick up!',
		isRead: false,
		sentAt: 1575909015,
	},
];

console.log(gEmails);
function query() {
	return Promise.resolve(gEmails);
}

import { utilService } from '../services/util-service.js';
export const emailService = {
	query,
};
var gEmails = [
	{
		id: utilService.makeId(),
		subject: 'Wassap?',
		body: 'Pick up!',
		isRead: false,
		sentAt: 1551133930594,
	},
	{
		id: utilService.makeId(),
		subject: 'Wassap?',
		body: 'Pick up!',
		isRead: false,
		sentAt: 1551133930594,
	},
	{
		id: utilService.makeId(),
		subject: 'Wassap?',
		body: 'Pick up!',
		isRead: false,
		sentAt: 1551133930594,
	},
];

console.log(gEmails);
function query() {
	return Promise.resolve(gEmails);
}

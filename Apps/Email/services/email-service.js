import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/storage.service.js';
export const emailService = {
	query,
	toggleRead,
};
const KEY = 'emailsDB';
var gEmails = storageService.loadFromStorage(KEY) || [];

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
function getEmailById(id) {
	var emailIdx = gEmails.findIndex((email) => email.id === id);
	return emailIdx;
}
function toggleRead(idx) {
	var emailIdx = getEmailById(idx);
	gEmails[emailIdx].isRead = !gEmails[idx].isRead;
}
function addEmail() {}
function removeEmail(emailId) {
	var emailIdx = getEmailById(emailId);
	gEmails.splice(emailIdx, 1);
	_saveEmailsToStorage();
	return Promise.resolve();
}
function createEmail(towards, subject, body) {
	gEmails.push({
		id: utilsService.makeId(),
		isRead: false,
		towards,
		subject,
		body,
		sentAt: new Date(),
	});
}
function _saveEmailsToStorage() {
	storageService.saveToStorage(KEY, gEmails);
}

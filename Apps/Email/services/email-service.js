import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/storage.service.js';
export const emailService = {
	query,
	toggleRead,
	getEmailById,
	removeEmail,
	addEmail
};
const KEY = 'emailsDB';
var gEmails = storageService.loadFromStorage(KEY) || [];
_createMails()

_saveEmailsToStorage()
console.log(gEmails);
function query() {
	_saveEmailsToStorage()
	return Promise.resolve(gEmails);
}
function getEmailById(id) {
	var currMail = gEmails.find((mail) => {
        return mail.id === id
    })
    return Promise.resolve(currMail)
}
function toggleRead(idx) {
	return Promise.resolve(
		getEmailById(idx).then((mail) => {
			mail.isRead = true;
			return mail;
		})
	);
}
function addEmail() {}
function removeEmail(emailId) {
	var emailIdx = getEmailById(emailId);
	gEmails.splice(emailIdx, 1);
	_saveEmailsToStorage();
	return Promise.resolve();
}
function _createMail() {
    var mail = {
        id: utilService.makeId(),
        subject: utilService.makeLorem(5),
        body: utilService.makeLorem(utilService.getRandomIntInclusive(20, 80)),
        isRead: Math.random() > 0.5,
        sentAt: Date.now(),
        isStarred: Math.random() > 0.5,
        isDraft: Math.random() > 0.5
    }

    gEmails.unshift(mail)
    _saveEmailsToStorage()
}
function _createMails() {
    gEmails = _loadMailsFromStorage()
    if (!gEmails || gEmails.length === 0) {
        gEmails = []
        for (var i = 0; i < 5; i++) {
            _createMail()
        }
    }
}
function _loadMailsFromStorage() {
    return storageService.loadFromStorage(KEY)
}
function _saveEmailsToStorage() {
	storageService.saveToStorage(KEY, gEmails);
}

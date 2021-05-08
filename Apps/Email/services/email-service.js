import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/storage.service.js';
export const emailService = {
	query,
	toggleRead,
	getEmailById,
	removeEmail,
	addEmail,
	getNextEmailId,
	toggleStar,
	toggleReadOn,
	getPrevEmailId,
	getReadStatistics
};
var mailFakeData=[
	{
		id: utilService.makeId(),
		subject: 'Hello Coding Academy ',
		body: 'Dear Bar,thank you for join our march 2021 course we wish you good luck                                                       p.s say bye bye to all your friends and social life',
		isRead: Math.random() > 0.5,
		sentAt: Date.now(),
		isStarred: Math.random() > 0.5,
		isDraft: Math.random() > 0.5,
	},
	{
		id: utilService.makeId(),
		subject: 'Your trial is end in 1 week',
		body: 'Hello you trial is going to end soon if you dont respond we gona take bills from you forever',
		isRead: Math.random() > 0.5,
		sentAt: Date.now(),
		isStarred: Math.random() > 0.5,
		isDraft: Math.random() > 0.5,
	},
	{
		id: utilService.makeId(),
		subject: 'Congrats you won 1 Milion$ ',
		body: 'just enter you credit card and we transer the przie to your account!',
		isRead: Math.random() > 0.5,
		sentAt: Date.now(),
		isStarred: Math.random() > 0.5,
		isDraft: Math.random() > 0.5,
	},
	{
		id: utilService.makeId(),
		subject: 'Newslater from dump application that you dont remember you subscribe',
		body: 'if you dont want to get this newslater anymore just click here and nothing gona change mohaha',
		isRead: Math.random() > 0.5,
		sentAt: Date.now(),
		isStarred: Math.random() > 0.5,
		isDraft: Math.random() > 0.5,
	},
	{
		id: utilService.makeId(),
		subject: 'Google Job interview for fullstack position',
		body: 'hey we see youre git and we love your work we loved to invite you for an interview',
		isRead: Math.random() > 0.5,
		sentAt: Date.now(),
		isStarred: Math.random() > 0.5,
		isDraft: Math.random() > 0.5,
	},


]
const KEY = 'emailsDB';
var gEmails = storageService.loadFromStorage(KEY) || mailFakeData;
// const filterEmails
// _createMails();
if(gEmails.length===0){
	gEmails=mailFakeData
}

_saveEmailsToStorage();
function query(filterBy) {
	if (!filterBy) {
		_saveEmailsToStorage();
		return Promise.resolve(gEmails);
	} else {
		var { keyword, isStarred, isRead } = filterBy;

		let filterEmails = gEmails.filter((email) => {
			return email.subject.includes(keyword) || email.body.includes(keyword);
		});
		if (isRead === true) {
			const filterReadEmails = gEmails.filter((email) => email.isRead);
			return Promise.resolve(filterReadEmails);
		} else if (isStarred === true) {
			const filterStarEmails = gEmails.filter((email) => email.isStarred);
			return Promise.resolve(filterStarEmails);
		}
        else if(isRead === false){
            const filterStarEmails = gEmails.filter((email) => !email.isRead);
			return Promise.resolve(filterStarEmails);
        }
		return Promise.resolve(filterEmails);
	}
}

function getEmailById(id) {
	var currMail = gEmails.find((mail) => {
		return mail.id === id;
	});
	// console.log('email by id', currMail);
	return Promise.resolve(currMail);
}
function getNextEmailId(emailId) {
	const emailIdx = gEmails.findIndex((email) => email.id === emailId);
	var nextEmailIdx = emailIdx + 1;
	nextEmailIdx = nextEmailIdx === gEmails.length ? 0 : nextEmailIdx;
	console.log(nextEmailIdx);
	return gEmails[nextEmailIdx].id;
}
function getPrevEmailId(emailId) {
	const emailIdx = gEmails.findIndex((email) => email.id === emailId);
	var prevEmailIdx = emailIdx - 1;
	prevEmailIdx = prevEmailIdx < 0 ? 0 : prevEmailIdx;
	console.log(prevEmailIdx);
	return gEmails[prevEmailIdx].id;
}
function toggleRead(idx) {
	return Promise.resolve(
		getEmailById(idx).then((mail) => {
			mail.isRead = !mail.isRead;
			return mail;
		})
	);
}
function toggleReadOn(idx) {
	return Promise.resolve(
		getEmailById(idx).then((mail) => {
			mail.isRead = true;
			return mail;
		})
	);
}
function toggleStar(idx) {
	return Promise.resolve(
		getEmailById(idx).then((mail) => {
			mail.isStarred = !mail.isStarred;
			return mail;
		})
	);
}
function addEmail(info) {
	const { subject, to, body } = info;
	var mail = {
		// origin: {
		//     to: { mail: to, name: utilService.makeLorem(2) },
		//     from: { mail: 'user@gmail.com', name: 'user' }
		// },
		id: utilService.makeId(),
		subject: subject,
		body: body,
		isRead: true,
		sentAt: Date.now(),
		isStarred: false,
		isDraft: false,
	};
	gEmails.unshift(mail);
	_saveEmailsToStorage();
}
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
		isDraft: Math.random() > 0.5,
	};

	gEmails.unshift(mail);
	_saveEmailsToStorage();
}
function _createMails() {
	gEmails = _loadMailsFromStorage();
	if (!gEmails || gEmails.length === 0) {
		gEmails = [];
		for (var i = 0; i < 10; i++) {
			_createMail();
		}
	}
}
function getReadStatistics() {
    var readMails = gEmails.filter((mail) => {
        return mail.isRead === true
    })
    return Math.floor((readMails.length / gEmails.length) * 100)
}
function _loadMailsFromStorage() {
	return storageService.loadFromStorage(KEY);
}
function _saveEmailsToStorage() {
	storageService.saveToStorage(KEY, gEmails);
}

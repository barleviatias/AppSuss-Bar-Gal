
export const emailService = {
    query
}
var gEmails=[
    {subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt : 1551133930594},
    {subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt : 1551133930594},
    {subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt : 1551133930594}
]

console.log(gEmails);
function query() {
    return Promise.resolve(gEmails)
}
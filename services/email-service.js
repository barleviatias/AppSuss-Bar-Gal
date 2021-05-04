
export const emailService = {
    query
}
gEmails=[
    {subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt : 1551133930594},
    {subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt : 1551133930594},
    {subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt : 1551133930594}
]

function query() {
    return Promise.resolve(items)
}
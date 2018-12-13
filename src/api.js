import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);
const db = PouchDB("intermanager")

window.db = db
window.logAll = logAll


function logAll() {
    return db.allDocs({
        include_docs: true,
        attachments: true,
    }).then(response => {
        return response.rows
    })
}

function getUser(userId) {
    return db.find({
        selector: { _id: userId, type: 'user' },
        fields: [
            "user_id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "image",
            "profession",
            "bio"
        ],
        sort: ['_id']
    }).then(res => {
        if (res.docs && res.docs.length) {
            return res.docs[0]
        }
        throw 'Not Found!'
    }).catch(err => {
        return { error: err.message }
    })
}

function getUsers(userIds) {
    return db.find({
        selector: {
            type: "user",
            _id: {
                $in: userIds
            }
        },
        fields: [
            "user_id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "image",
            "profession",
            "bio"
        ],
        sort: ['_id']
    })
}

function allUsers() {
    return db.find({
        selector: { type: 'user' },
        fields: [
            "_id",
            "type",
            "user_id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "image",
            "profession",
            "bio"
        ],
        sort: ['_id']
    })
}

function allGroups() {
    return db.find({
        selector: { type: 'group' },
        fields: ['_id', 'type', 'name', 'users_list_ids', 'description'],
        sort: ['_id']
    })
}

function createUser(user) {
    return db.put({
        _id: new Date().toISOString(),
        type: 'user',
        ...user
    })
}

function createGroup(group) {
    return db.put({
        _id: new Date().toISOString(),
        type: 'group',
        ...group
    })
}

window.exampleUser = {
    "user_id": "b0b967fb-b87d-4dd7-af4d-e9b02d1cc16b",
    "first_name": "Myrtia",
    "last_name": "Greenrod",
    "email": "mgreenrod2n@icio.us",
    "phone": "273-884-3580",
    "image": "https://robohash.org/quasvoluptatemnecessitatibus.png",
    "profession": "Nurse Practicioner",
    "bio": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui."
}

window.exampleGroup = {
    "name": "Lexy",
    "description": "Barthel"
}

export default {
    getUser,
    allUsers,
    getUsers,
    allGroups,
    createUser,
    createGroup,
}
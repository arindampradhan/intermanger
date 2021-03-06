import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import axios from 'axios';
import _ from 'lodash';
import GROUPS from './groups';


PouchDB.plugin(PouchDBFind);
const db = PouchDB("intermanager")

window.db = db
window.logAll = logAll

Date.prototype.substractHours = function (h) {
    this.setTime(this.getTime() - (h * 60 * 60 * 1000));
    return this;
}

/* eslint-disable no-lone-blocks */
{
    logAll().then(rows => {
        if (!rows.length) {
            axios.get('/dataset.json')
                .then((response) => {
                    const data = response.data.map((i, id) => {
                        return {
                            _id: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)).toISOString(),
                            type: 'user',
                            ...i
                        }
                    })
                    return data
                })
                .then(data => {
                    return db.bulkDocs(data).then(() => {
                        
                        const data = GROUPS.map((i, id) => {
                            return {
                                _id: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)).toISOString(),
                                type: 'group',
                                ...i
                            }
                        })
                        return db.bulkDocs(data).then(() => {
                            alert('Data uploaded. Remove alert to get the dummy data')
                            window.location.reload()
                        })
                    })
                })
        }
    })
}


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


function retryUntilWritten(doc) {
    return db.get(doc._id).then(function (origDoc) {
        doc._rev = origDoc._rev;
        return db.put(doc);
    }).catch(function (err) {
        if (err.status === 409) {
            return retryUntilWritten(doc);
        } else { // new doc
            return db.put(doc);
        }
    });
}

function assignUserToGroup(user, group) {
    if (!group.users_list_ids) group.users_list_ids = []
    if (!_.includes(group.users_list_ids, user._id)) {
        group.users_list_ids.push(user._id)
        return retryUntilWritten(group)
    }
    alert('Already present in group!')
    throw 'Already present in group!';
}

function removeUserFromGroup(user, { ...group }) {
    if (_.includes(group.users_list_ids, user._id)) {
        _.remove(group.users_list_ids, (_id) => {
            return _id === user._id;
        });
        return retryUntilWritten(group)
    }
    if (!group.users_list_ids) {

    }
    alert('Not present in group!')
    throw 'Not present in group!';
}

function deleteGroup(group) {
    if (group.users_list_ids && group.type === 'group') {
        return db.remove(group)
    }
    alert('Unable to perform action')
}

function deleteUser(user) {
    // TODO: remove this user from all group
    if (user.type === 'user') {
        return db.remove(user)
    }
    alert('Unable to perform action')
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
    assignUserToGroup,
    removeUserFromGroup,
    deleteGroup,
    deleteUser
}
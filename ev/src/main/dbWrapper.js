import nedb from 'nedb'

let db

export default {

    initDB: function () {
        db = new nedb({
            filename: './dbfile',
            autoload: true
        })
    },
    getUser: function (password, callback) {
        db.find({
            '_id': 'user'
        }, (err, docs) => {
            if (docs.length === 0) {
                if (password === '123456') {
                    this.setPassword('123456',callback)
                } else {
                    callback(false)
                }
            } else {
                callback(docs[0].password === password)
            }
        })
    },
    setPassword: function (password, callback) {
        db.update({
                '_id': 'user'
            }, {
                $set: {
                    'password': password
                }
            }, {
                upsert: true
            },
            (err) => {
                if (err) {
                    callback(false)
                    console.log(err)
                } else {
                    callback(true)

                }
            })
    },

    addHistory: function (data, callback) {
        db.update({
                '_id': 'history'
            }, {
                $push: {
                    'item': data 
                }
            }, {
                upsert: true
            },
            (err) => {
                if (err) {
                    callback(false)
                    console.log(err)
                } else {
                    callback(true)

                }
            })
    },
    getHistory: function (callback) {
        db.find({'_id': 'history'},
            (err,docs) => {
                if (err) {
                    console.log(err)
                    callback({})
                } else {
                    callback(docs[0].item)
                }
            })
    }
}
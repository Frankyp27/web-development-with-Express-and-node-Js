const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books = [
    {
        title: 'River and the source',
        genre: 'fiction',
        author: 'Peter myles',
        bookId: 50,
        read: false,
    },
    {
        title: 'A man of the people',
        genre: 'fiction',
        author: 'Chinua chebe',
        bookId: 18,
        read: false,
    },
    {

        title: 'Encounters from Africa',
        genre: 'fiction',
        author: 'Peter myles',
        read: false,
    },
    {
        title: 'River runs red',
        genre: 'fiction',
        author: 'will smith',
        read: false,


    }];

function router(nav) {
    adminRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27018'
            const dbName = 'libraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);

                    debug('connected correctly to server');

                    const db = client.db(dbName);

                    const response = await db.collection('books').insertMany(books);
                    res.json(response);
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });
    return adminRouter;
}
module.exports = router;
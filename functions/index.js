const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const algoliasearch = require('algoliasearch');

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('applications');

exports.addToIndex = functions
  .firestore
  .document('applications/{applicationId}')
  .onCreate((snapshot) => {
    const data = snapshot.data();
    const objectID = snapshot.id;
    return index.addObject({ ...data, objectID });
  });

exports.updateIndex = functions
  .firestore
  .document('applications/{applicationId}')
  .onUpdate((change) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.addObject({ ...newData, objectID });
  });

exports.deleteFromIndex = functions
  .firestore
  .document('applications/{applicationId}')
  .onDelete((snapshot) => index.deleteObject(snapshot.id));

exports.onApplicationCreate = functions
  .firestore
  .document('applications/{applicationId}')
  .onCreate((snap, context) => {
    const statsDoc = db.doc('counters/application');
    const countDoc = {};
    countDoc['count'] = admin.firestore.FieldValue.increment(1);
    statsDoc.set(countDoc, { merge: true });
  });

exports.onApplicationDelete = functions
  .firestore
  .document('applications/{applicationId}')
  .onDelete((snap, context) => {
    const statsDoc = db.doc('counters/application');
    const countDoc = {};
    countDoc['count'] = admin.firestore.FieldValue.increment(-1);
    statsDoc.set(countDoc, { merge: true });
  });

const sanitizeString = (str) => str.trim().toLowerCase();

exports.searchApplications = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'GET') {
      res.status(400).json({ err: 'Please send a GET request' });
      return;
    }
  
    const query = req.query.q || '';
    const page = Number(req.query.page) - 1 || 0;
    const pageSize = Number(req.query.pageSize) || 12;
  
    // eslint-disable-next-line promise/always-return
    db.collection('applications').get().then((snapshot) => {
      const applications = [];
  
      snapshot.forEach((doc) => {
        applications.push(doc.data());
      });
  
      const result = applications.filter((application) => {
        const displayName = sanitizeString(application.displayName);
        return displayName.indexOf(sanitizeString(query)) > -1;
      })
  
      const pagedResult = result.slice(
        page * pageSize,
        (page * pageSize) + pageSize
      );
  
      res.status(200).json({ nbHits: result.length, hits: pagedResult });
    }).catch((err) => {
      res.status(404).json(err);
    });
  });
});

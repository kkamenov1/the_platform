const functions = require('firebase-functions');

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

const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

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

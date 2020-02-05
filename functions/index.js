const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

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
        applications.push({applicationUID: doc.id, ...doc.data()});
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

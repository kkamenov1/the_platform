const admin = require('../services/admin');

const db = admin.firestore();
const applicationsRef = db.collection('applications');

module.exports = (app) => {
  app.get('/api/applications', (req, res) => {
    const {
      start,
      limit,
    } = req.query;

    applicationsRef
      .orderBy('displayName')
      .limit(+limit)
      .offset(+start)
      .get()
      .then((snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            ...doc.data(),
            applicationUID: doc.id,
          });
        });
        res.json(result);
      });
  });
};

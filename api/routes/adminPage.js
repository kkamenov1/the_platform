const admin = require('../services/admin');

const db = admin.database();
const applicationsRef = db.ref('applications');

module.exports = (app) => {
  app.get('/api/admin/applications', (req, res) => {
    // const {
    //   start,
    //   limit,
    // } = req.query;
    const lastValue = null;

    applicationsRef
      .orderByChild('displayName')
      .startAt(lastValue)
      .limitToFirst(2)
      .once('value', (snapshot) => {
        res.json(snapshot.val());
      });
  });
};

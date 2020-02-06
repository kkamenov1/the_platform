const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer');
const aws = require('aws-sdk');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

aws.config.update({
  accessKeyId: 'AKIAQQ7IXSAEOMZ5QQJ3',
  secretAccessKey: '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',
  region: 'eu-central-1'
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

// TODO: improve this and configure AWS SES in the AWS console after
// you create an email server and get a real domain
exports.emailMessage = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'POST') {
      res.status(400).json({ err: 'Please send a POST request' });
      return;
    }

    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
          apiVersion: '2010-12-01'
      })
    });

    transporter.sendMail({
      from: 'no-reply@gymgurus.com',
      to: email,
      subject: 'Message',
      text: 'I hope this message gets sent!',
    }, (err, info) => {
      if (err){
        console.log(err.message);
      }

      res.status(200).send({
        message: "success"
      });
    });
  })
});

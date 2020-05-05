const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const { sanitizeString } = require('./utils');
const {
  addToIndex,
  updateIndex,
  deleteFromIndex,
} = require('./algolia');

admin.initializeApp();

const db = admin.firestore();
const app = express();
const main = express();

app.use(cors({ origin: true }));
main.use(cors({ origin: true }));
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));


cloudinary.config({
  cloud_name: functions.config().cloudinary.cloud_name,
  api_key: functions.config().cloudinary.api_key,
  api_secret: functions.config().cloudinary.api_secret
});

app.get('/applications', (req, res) => {
  const query = req.query.q || '';
  const page = Number(req.query.page) - 1 || 0;
  const pageSize = Number(req.query.pageSize) || 12;

  // eslint-disable-next-line promise/always-return
  db.collection('applications').get().then((snapshot) => {
    const applications = [];

    snapshot.forEach((doc) => {
      applications.push({ applicationUID: doc.id, ...doc.data() });
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

/* IMAGE ENDPOINTS */
app.post('/assets', (req, res) => {
  const { img, userID } = req.body;

  if (!img) {
    res.status(400).json({ error: 'Please provide an image' });
  }

  if (!userID) {
    res.status(400).json({ error: 'Please provide a userID' });
  }

  cloudinary.uploader.upload(
    img,
    {
      folder: `gurus/${userID}`,
      format: 'jpg',
    },
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }

      res.status(200).json(result);
  })
});

app.delete('/assets/:publicId(*)', (req, res) => {
  const { publicId } = req.params;

  if (!publicId) {
    res.status(400).json({
      error: 'Please provide publicId of the image you want to delete'
    });
  }

  cloudinary.uploader.destroy(publicId, (error, result) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }

    res.status(200).json(result);
  });
});
/* END IMAGE ENDPOINTS */

app.post('/submit_application', (req, res) => {
  const {
    location,
    _geoloc,
    languages,
    birthday,
    image,
    sport,
    introduction,
    certificate,
    methods,
    duration,
    subscribers,
    occupation,
    available,
    photoURL,
    displayName,
    priceFrom,
    socialMedia,
    userID
  } = req.body;

  db.collection('applications').where("userID", "==", userID)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        // handle submit application
        const newApplicationRef = db.collection('applications').doc();
        newApplicationRef.set({
          location,
          _geoloc,
          languages,
          birthday,
          image,
          sport,
          introduction,
          certificate,
          methods,
          duration,
          subscribers,
          occupation,
          available,
          photoURL,
          displayName,
          priceFrom,
          socialMedia,
          userID
        });
        res.status(200).json({ success: true });
      }
      else {
        res.status(400).json({
          success: false,
          error: 'Application already exists'
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: err.message
      })
    })
});

exports.webApi = functions.https.onRequest(main);
exports.addToIndex = addToIndex;
exports.updateIndex = updateIndex;
exports.deleteFromIndex = deleteFromIndex;
// // TODO: improve this and configure AWS SES in the AWS console after
// // you create an email server and get a real domain
// exports.emailMessage = functions.https.onRequest((req, res) => {
//   cors(req, res, () => {
//     if (req.method !== 'POST') {
//       res.status(400).json({ err: 'Please send a POST request' });
//       return;
//     }

//     const { name, email, message } = req.body;

//     const transporter = nodemailer.createTransport({
//       SES: new aws.SES({
//           apiVersion: '2010-12-01'
//       })
//     });

//     transporter.sendMail({
//       from: 'no-reply@gymgurus.com',
//       to: email,
//       subject: 'Message',
//       text: 'I hope this message gets sent!',
//     }, (err, info) => {
//       if (err){
//         console.log(err.message);
//       }

//       res.status(200).send({
//         message: "success"
//       });
//     });
//   })
// });

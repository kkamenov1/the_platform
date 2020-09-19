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
  const { img, folder } = req.body;

  if (!img) {
    res.status(400).json({ error: 'Please provide an image' });
  }

  if (!folder) {
    res.status(400).json({ error: 'Please provide a folder' });
  }

  cloudinary.uploader.upload(
    img,
    {
      folder,
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
    userID,
    rating,
    ratingCount,
    ratingBreakdown,
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
          userID,
          rating,
          ratingCount,
          ratingBreakdown,
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

const MAX_QUERY_LIMIT = 30;

/* REVIEWS ENDPOINTS */
app.get('/reviews', (req, res) => {
  const query = decodeURIComponent(req.query.q || '');
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 12;
  const approved = req.query.approved === 'true';
  const rating = Number(req.query.rating) || undefined;

  if (limit > MAX_QUERY_LIMIT) {
    res.status(400).json({ err: `MAXIMUM QUERY LIMIT: ${MAX_QUERY_LIMIT}`});
  }

  let reviewsCollection = db.collection('reviews');
  reviewsCollection = reviewsCollection.where("approved", "==", approved);

  if (rating) {
    reviewsCollection = reviewsCollection.where("rating", "==", rating);
  }

  reviewsCollection
    .get()
    .then((snapshot) => {
      const reviews = [];

      snapshot.forEach((doc) => {
        reviews.push({ reviewUID: doc.id, ...doc.data() });
      });

      const result = reviews.filter((review) => {
        const summary = sanitizeString(review.summary);
        const guruName = sanitizeString(review.guruInfo.name);
        const guruID = review.guruInfo.id;
        const userID = review.userInfo.id;
        const userName = sanitizeString(review.userInfo.name);

        return summary.indexOf(sanitizeString(query)) > -1
          || guruName.indexOf(sanitizeString(query)) > -1
          || guruID.indexOf(query.trim()) > -1
          || userID.indexOf(query.trim()) > -1
          || userName.indexOf(sanitizeString(query)) > -1
      })

      const pagedResult = result.slice(offset, offset + limit)
      res.status(200).json({ nbHits: result.length, hits: pagedResult });
    }).catch((err) => {
      res.status(404).json(err);
    });
});

app.post('/reviews', (req, res) => {
  const {
    imageBefore,
    imageAfter,
    approved,
    recommend,
    rating,
    summary,
    review,
    date,
    guruInfo,
    userInfo,
  } = req.body;

  db.collection('reviews')
    .where("guruInfo.id", "==", guruInfo.id)
    .get()
    .then((querySnapshot) => {
      let userHasUnapprovedReviewForSpecifiedGuru = false;
      querySnapshot.forEach((doc) => {
        if (doc.data().userInfo.id === userInfo.id && !doc.data().approved) {
          userHasUnapprovedReviewForSpecifiedGuru = true;
          return;
        }
      });
      const userCanSubmitReview = querySnapshot.empty || !userHasUnapprovedReviewForSpecifiedGuru;

      if (userCanSubmitReview) {
        const newReviewRef = db.collection('reviews').doc();
        newReviewRef.set({
          imageBefore,
          imageAfter,
          approved,
          recommend,
          rating,
          summary,
          review,
          date,
          guruInfo,
          userInfo,
        });
        res.status(200).json({ success: true });
      }
      else {
        res.status(400).json({
          success: false,
          error: 'DUPLICATE_REVIEW',
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

app.get('/reviews/:guruID(*)/recommendation', (req, res) => {
  const { guruID } = req.params;

  if (!guruID) {
    res.status(400).json({
      error: 'Please provide guruID'
    });
  }

  db
    .collection('reviews')
    .where("guruInfo.id", "==", guruID)
    .get()
    .then((snapshot) => {
      const approvedReviews = [];
      snapshot.forEach((doc) => {
        if (doc.data().approved) {
          approvedReviews.push({ id: doc.id, ...doc.data() });
        }
      });
      console.log(approvedReviews);
      const recommendReviews = approvedReviews.filter((review) => review.recommend);
      const recommendationPercentage = (recommendReviews.length / approvedReviews.length) * 100;
      res.status(200).json({ recommendationPercentage });
    }).catch((err) => {
      res.status(404).json(err);
    });
})

exports.deleteReview = functions.firestore.document('reviews/{reviewId}')
  .onDelete(async (snapshot) => {
    const { approved } = snapshot.data();
    if (approved) {
      const ratingVal = snapshot.data().rating;
      const guruID = snapshot.data().guruInfo.id;
      const userRef = db.collection('users').doc(guruID);
  
      await db.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userRef);
        const ratingBreakdown = userDoc.data().ratingBreakdown;
        const newRatingCount = userDoc.data().ratingCount - 1;
        const oldRatingTotal = userDoc.data().rating * userDoc.data().ratingCount;
        const newAvgRating = (oldRatingTotal - ratingVal) / (newRatingCount || 1);
  
        // Update user info
        transaction.update(userRef, {
          rating: newAvgRating,
          ratingCount: newRatingCount,
          ratingBreakdown: {
            ...ratingBreakdown,
            [ratingVal]: ratingBreakdown[ratingVal] - 1,
          }
        });
      });
    }
  });

exports.updateReview = functions.firestore.document('reviews/{reviewId}')
  .onUpdate(async (change) => {
    const ratingVal = change.after.data().rating;
    const guruID = change.after.data().guruInfo.id;
    const userRef = db.collection('users').doc(guruID);

    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      const ratingBreakdown = userDoc.data().ratingBreakdown;
      const newRatingCount = userDoc.data().ratingCount + 1;
      const oldRatingTotal = userDoc.data().rating * userDoc.data().ratingCount;
      const newAvgRating = (oldRatingTotal + ratingVal) / newRatingCount;

      // Update user info
      transaction.update(userRef, {
        rating: newAvgRating,
        ratingCount: newRatingCount,
        ratingBreakdown: {
          ...ratingBreakdown,
          [ratingVal]: ratingBreakdown[ratingVal] + 1,
        }
      });
    });
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

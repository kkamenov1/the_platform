const admin = require('firebase-admin');
const serviceAccountDev = require('../config/admin.dev.json');
const serviceAccountProd = require('../config/admin.prod.json');

const dbUrlDev = 'https://gymgurus-c97bd.firebaseio.com';
const dbUrlProd = 'https://gymgurus-prod-2072e.firebaseio.com';

const isDevEnv = process.env.NODE_ENV.trim() === 'development';

const serviceAccount = isDevEnv ? serviceAccountDev : serviceAccountProd;
const dbUrl = isDevEnv ? dbUrlDev : dbUrlProd;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbUrl,
});

module.exports = admin;

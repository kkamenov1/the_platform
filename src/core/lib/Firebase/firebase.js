import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  onAuthUserListener = (next, fallback) => this.auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      this.user(authUser.uid)
        .once('value')
        .then((snapshot) => {
          const dbUser = snapshot.val();
          // merge auth and db user
          const newAuthUser = {
            /* if further information is needed from authUser ==> provide it here */
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
            photoURL: authUser.photoURL,
            ...dbUser,
          };
          next(newAuthUser);
        });
    } else {
      fallback();
    }
  });

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSendEmailVerification = () => this.auth.currentUser.sendEmailVerification({
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
  });

  doUpdateUserProfile = (settings) => this.auth.currentUser.updateProfile(settings);

  // *** User API ***

  users = () => this.db.ref('users');

  user = (uid) => this.db.ref(`users/${uid}`);

  // *** Storage API ***

  doUploadImage = (image, userID) => {
    const imagesPath = this.storage.ref(`users/${userID}/images/${image.name}`);

    return imagesPath.put(image);
  }

  getImageUrl = (imageName, userID) => this.storage.ref(`users/${userID}/images/${imageName}`).getDownloadURL();

  doDeleteImage = (imageName, userID) => this.storage.ref(`users/${userID}/images/${imageName}`).delete();
}

export default Firebase;

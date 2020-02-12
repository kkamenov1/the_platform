const admin = require('firebase-admin');

admin.initializeApp();

const faker = require('faker');

const db = admin.firestore();

const fakeApplication = () => {
  return db.collection('applications').add({
    displayName: faker.name.firstName() + ' ' + faker.name.lastName(),
    birthday: faker.date.past(),
    location: faker.address.city() + ', ' + faker.address.country(),
    languages: ['Bulgarian', 'English'],
    sport: 'bodybuilding',
    introduction: 'test introduction',
    duration: faker.random.number(),
    methods: [
      { name: faker.name.findName(), price: faker.random.number() },
      { name: faker.name.findName(), price: faker.random.number() },
      { name: faker.name.findName(), price: faker.random.number() }
    ],
    userID: faker.random.uuid()
  })
}

const fakeUser = () => {
  return db.collection('users').add({
    displayName: faker.name.firstName() + ' ' + faker.name.lastName(),
    birthday: new Date(faker.date.past()),
    location: faker.address.city() + ', ' + faker.address.country(),
    languages: ['Bulgarian', 'English'],
    sport: 'bodybuilding',
    introduction: 'test introduction',
    duration: faker.random.number(),
    methods: [
      { name: faker.name.findName(), price: faker.random.number() },
      { name: faker.name.findName(), price: faker.random.number() },
      { name: faker.name.findName(), price: faker.random.number() }
    ],
    email: faker.internet.email(),
    emailVerified: true,
    hasSubmittedApplication: false,
    isAdmin: false,
    isGuru: true,
    photoURL: faker.image.avatar(),
    _geoloc: {
      lat: 34.052235,
      lng: -118.243683,
    },
  });
}

// const seed = () => ({
//   applications: Array(50).fill(0).forEach(fakeApplication),
//   users: Array(50).fill(0).forEach(fakeUser)
// });

// seed();
Array(1).fill(0).forEach(fakeUser)
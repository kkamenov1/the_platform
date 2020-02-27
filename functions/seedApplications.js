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
    sport: 'crossfit',
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
    certificate: faker.image.imageUrl(),
    _geoloc: {
      lat: +faker.address.latitude(),
      lng: +faker.address.longitude(),
    },
  });
}

const seed = () => ({
  applications: Array(50).fill(0).forEach(fakeApplication),
  users: Array(50).fill(0).forEach(fakeUser)
});

seed();
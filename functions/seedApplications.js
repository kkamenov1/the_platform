const admin = require('firebase-admin');

admin.initializeApp();

const faker = require('faker');

const db = admin.firestore();

const fakeIt = () => {
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
    userID: faker.random.uuid(),
  })
}

Array(50).fill(0).forEach(fakeIt);

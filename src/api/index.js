import axios from 'axios';
import qs from 'qs';

const PROJECT = process.env.REACT_APP_PROJECT_ID;
const client = axios.create();
const base = `https://${PROJECT}.firebaseapp.com/api/v1`;

const applications = {
  get: ({ query, page, pageSize }) => {
    const queryString = qs.stringify({ q: query, page, pageSize });
    return client.get(
      `${base}/applications${queryString && `?${queryString}`}`,
    );
  },
};

const application = {
  post: ({
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
    userID,
    photoURL,
    displayName,
    priceFrom,
    socialMedia,
  }) => client.post(
    `${base}/submit_application`,
    {
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
      userID,
      photoURL,
      displayName,
      priceFrom,
      socialMedia,
    },
  ),
};

const assets = {
  delete: ({ publicId }) => client.delete(`${base}/assets/${publicId}`),

  upload: ({ img, userID }) => client.post(`${base}/assets`, {
    img,
    userID,
  }),
};

export default {
  applications,
  application,
  assets,
};

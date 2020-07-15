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

  upload: ({ img, folder }) => client.post(`${base}/assets`, {
    img,
    folder,
  }),
};

const reviews = {
  post: ({
    userID,
    imageBefore,
    imageAfter,
    approvedByAdmin,
    recommend,
    rating,
    summary,
    review,
  }) => client.post(`${base}/reviews`, {
    userID,
    imageBefore,
    imageAfter,
    approvedByAdmin,
    recommend,
    rating,
    summary,
    review,
  }),
};

export default {
  applications,
  application,
  assets,
  reviews,
};

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
    rating,
    ratingCount,
    ratingBreakdown,
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
      rating,
      ratingCount,
      ratingBreakdown,
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
  get: ({
    query,
    offset,
    limit,
    approved,
    rating,
  }) => {
    const queryString = qs.stringify({
      q: query, offset, limit, approved, rating,
    });

    return client.get(
      `${base}/reviews${queryString && `?${queryString}`}`,
    );
  },

  post: ({
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
  }) => client.post(`${base}/reviews`, {
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
  }),

  getRecommendationPercentage: (guruID) => client.get(`${base}/reviews/${guruID}/recommendation`),
};

export default {
  applications,
  application,
  assets,
  reviews,
};

import axios from 'axios';
import qs from 'qs';

const REGION = 'us-central1';
const PROJECT = process.env.REACT_APP_PROJECT_ID;
const client = axios.create();

const base = `https://${REGION}-${PROJECT}.cloudfunctions.net`;

const applications = {
  get: ({ query, page, pageSize }) => {
    const queryString = qs.stringify({ q: query, page, pageSize });
    return client.get(
      `${base}/searchApplications${queryString && `?${queryString}`}`,
    );
  },
};

export default {
  applications,
};

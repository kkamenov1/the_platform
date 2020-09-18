import plpSliderConfig from './plp-slider-config';

const FALLBACK_LOCATION = {
  lat: 37.7793,
  lng: -122.419,
};
const FALLBACK_IMAGE = {
  src: 'https://res.cloudinary.com/dl766ebzy/image/upload/v1578058214/no_image_camera_big_lspgbi.jpg',
  alt: 'No Image',
};
const MAP_ZOOM_LEVEL = 12;
const DEBOUNCE_TIME = 700;
const HITS_PER_PAGE_LISTING = 10;
const GDP_MAP_OPTIONS = {
  draggable: false,
  clickableIcons: false,
  mapTypeControl: false,
  streetViewControl: false,
};
const BECOME_GURU_STEPS = [
  'Personal Information',
  'GURU Information',
  'Rates',
  'Social Media',
];
const GURU_INTRODUCTION_MAX_FIELD_LENGTH = 300;
const REVIEW_PAGE_FORM_STATUS = {
  FORM_INITIAL: 'FORM_INITIAL',
  FORM_SUBMIT_REVIEW_LOADING: 'FORM_SUBMIT_REVIEW_LOADING',
  FORM_SUBMITTED: 'FORM_SUBMITTED',
  FORM_ERROR: 'FORM_ERROR',
  FORM_DUPLICATE_ERROR: 'FORM_DUPLICATE_ERROR',
};
const GDP_INITIAL_REVIEWS = 2;
const GDP_REVIEWS_PAGE_SIZE = 5;

export {
  plpSliderConfig,
  FALLBACK_LOCATION,
  FALLBACK_IMAGE,
  MAP_ZOOM_LEVEL,
  DEBOUNCE_TIME,
  HITS_PER_PAGE_LISTING,
  GDP_MAP_OPTIONS,
  BECOME_GURU_STEPS,
  GURU_INTRODUCTION_MAX_FIELD_LENGTH,
  REVIEW_PAGE_FORM_STATUS,
  GDP_INITIAL_REVIEWS,
  GDP_REVIEWS_PAGE_SIZE,
};

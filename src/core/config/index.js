import generateTileSliderConfig from './tile-slider-config';

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

export {
  generateTileSliderConfig,
  FALLBACK_LOCATION,
  FALLBACK_IMAGE,
  MAP_ZOOM_LEVEL,
  DEBOUNCE_TIME,
};

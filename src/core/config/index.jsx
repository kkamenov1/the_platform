import React from 'react';
import { CarouselArrow } from '../components';
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

const ADMIN_PANEL_SLIDER_CONFIG = {
  arrows: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: true,
  nextArrow: <CarouselArrow alwaysShow />,
  prevArrow: <CarouselArrow prevArrow alwaysShow />,
};

const GDP_MAP_OPTIONS = {
  draggable: false,
  clickableIcons: false,
  mapTypeControl: false,
  streetViewControl: false,
};

export {
  ADMIN_PANEL_SLIDER_CONFIG,
  plpSliderConfig,
  FALLBACK_LOCATION,
  FALLBACK_IMAGE,
  MAP_ZOOM_LEVEL,
  DEBOUNCE_TIME,
  HITS_PER_PAGE_LISTING,
  GDP_MAP_OPTIONS,
};

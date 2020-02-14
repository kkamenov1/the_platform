import React from 'react';
import { CarouselArrow } from '../components';

export default (hit, sliderRef) => ({
  arrows: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: true,
  nextArrow: <CarouselArrow
    onClick={() => sliderRef.slickGoTo(hit.slideIndex + 1)}
  />,
  prevArrow: <CarouselArrow
    prevArrow
    onClick={() => sliderRef.slickGoTo(hit.slideIndex - 1)}
  />,
});

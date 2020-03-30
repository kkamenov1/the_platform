import React from 'react';
import { CarouselArrow } from '../components';

export default (showArrows) => ({
  arrows: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: true,
  nextArrow: <CarouselArrow alwaysShow={showArrows} />,
  prevArrow: <CarouselArrow prevArrow alwaysShow={showArrows} />,
});

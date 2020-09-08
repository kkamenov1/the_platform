import {
  SET_GURU,
  SET_GURU_REVIEWS,
  INCREMENT_REVIEWS_PAGE,
  RESET_REVIEWS_PAGE,
  LOAD_MORE_REVIEWS,
  SET_STAR_RATING_REFINEMENT,
  SET_REVIEWS_COUNT,
  SET_RECOMMENDATION_PERCENTAGE,
} from './actions';

export const defaultStore = {
  guru: {
    image: '',
    birthday: '',
    sport: '',
    isAdmin: false,
    duration: '',
    userID: '',
    isGuru: true,
    methods: [],
    email: '',
    languages: [],
    _geoloc: null,
    photoURL: '',
    location: '',
    displayName: '',
    introduction: null,
    certificate: '',
    priceFrom: 0,
    available: undefined,
    occupation: undefined,
    subscribers: '',
    socialMedia: null,
    rating: 0,
    ratingCount: 0,
  },
  reviews: [],
  reviewsCount: 0,
  reviewsPage: 0,
  starRatingRefinement: null,
  recommendationPercentage: null,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_GURU:
      return {
        ...state,
        guru: action.guru,
      };

    case SET_GURU_REVIEWS:
      return {
        ...state,
        reviews: action.reviews,
      };

    case LOAD_MORE_REVIEWS:
      return {
        ...state,
        reviews: [...state.reviews, ...action.reviews],
      };

    case INCREMENT_REVIEWS_PAGE:
      return {
        ...state,
        reviewsPage: state.reviewsPage + 1,
      };

    case RESET_REVIEWS_PAGE: {
      return {
        ...state,
        reviewsPage: 0,
      };
    }

    case SET_STAR_RATING_REFINEMENT: {
      return {
        ...state,
        starRatingRefinement: action.starRatingRefinement,
      };
    }

    case SET_REVIEWS_COUNT: {
      return {
        ...state,
        reviewsCount: action.reviewsCount,
      };
    }

    case SET_RECOMMENDATION_PERCENTAGE: {
      return {
        ...state,
        recommendationPercentage: action.recommendationPercentage,
      };
    }

    default:
      return state;
  }
};

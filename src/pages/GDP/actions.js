export const SET_GURU = 'SET_GURU';
export const SET_GURU_REVIEWS = 'SET_GURU_REVIEWS';
export const INCREMENT_REVIEWS_PAGE = 'INCREMENT_REVIEWS_PAGE';
export const RESET_REVIEWS_PAGE = 'RESET_REVIEWS_PAGE';
export const LOAD_MORE_REVIEWS = 'LOAD_MORE_REVIEWS';
export const SET_STAR_RATING_REFINEMENT = 'SET_STAR_RATING_REFINEMENT';
export const SET_REVIEWS_COUNT = 'SET_REVIEWS_COUNT';
export const SET_RECOMMENDATION_PERCENTAGE = 'SET_RECOMMENDATION_PERCENTAGE';

export const setGuru = (guru) => ({
  type: SET_GURU,
  guru,
});

export const setGuruReviews = (reviews) => ({
  type: SET_GURU_REVIEWS,
  reviews,
});

export const incrementReviewsPage = () => ({
  type: INCREMENT_REVIEWS_PAGE,
});

export const resetReviewsPage = () => ({
  type: RESET_REVIEWS_PAGE,
});

export const loadMoreReviews = (reviews) => ({
  type: LOAD_MORE_REVIEWS,
  reviews,
});

export const setStarRefinement = (starRatingRefinement) => ({
  type: SET_STAR_RATING_REFINEMENT,
  starRatingRefinement,
});

export const setReviewsCount = (reviewsCount) => ({
  type: SET_REVIEWS_COUNT,
  reviewsCount,
});

export const setRecommendationPercentage = (recommendationPercentage) => ({
  type: SET_RECOMMENDATION_PERCENTAGE,
  recommendationPercentage,
});

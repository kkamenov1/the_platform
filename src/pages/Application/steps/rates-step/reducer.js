import { SET_RATES_DETAILS } from './actions';

export const defaultStore = {
  methods: [
    {
      name: 'Workout',
      selected: false,
      price: '',
    },
    {
      name: 'Nutrition plan',
      selected: false,
      price: '',
    },
    {
      name: 'Workout & Nutrition plan',
      selected: false,
      price: '',
    },
    {
      name: 'Watching exercise',
      selected: false,
      price: '',
    },
    {
      name: 'Supplement plan',
      selected: false,
      price: '',
    },
    {
      name: 'All',
      selected: false,
      price: '',
    },
  ],
  duration: '',
  subscribers: '',
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_RATES_DETAILS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

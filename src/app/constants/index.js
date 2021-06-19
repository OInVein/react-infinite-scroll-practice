const { REACT_APP_API_KEY } = process.env;
const isOnTouchEnable = 'ontouchstart' in window;

export { REACT_APP_API_KEY, isOnTouchEnable };
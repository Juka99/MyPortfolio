import { ref } from 'vue';
import { defineStore } from 'pinia';

const detectTouchScreen = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  return (
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0 ||
    window.matchMedia?.('(any-pointer: coarse)').matches ||
    'ontouchstart' in window
  );
};

export const useTouchScreenStore = defineStore('touchScreen', () => {
  const isTouchScreen = ref(detectTouchScreen());

  const setIsTouchScreen = res => {
    isTouchScreen.value = res;
  };

  const refreshIsTouchScreen = () => {
    setIsTouchScreen(detectTouchScreen());
  };

  return {
    isTouchScreen,
    setIsTouchScreen,
    refreshIsTouchScreen,
  };
});

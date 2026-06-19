import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const modalOpen = ref(false);

  const closeModal = () => {
    modalOpen.value = false;
  };

  const openModal = () => {
    modalOpen.value = true;
  };

  return {
    modalOpen,
    closeModal,
    openModal,
  };
});

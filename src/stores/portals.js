import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTimePortalStore = defineStore('timePortal', () => {
  const activePortal = ref(null);
  const timePortalStatus = ref('closed'); // 'closed' | 'open' | 'closing'

  const openPortal = () => {
    timePortalStatus.value = 'open';
  };
  const closePortal = () => {
    timePortalStatus.value = 'close';
  };

  const setActivePortal = portal => {
    activePortal.value = portal;
  };

  return {
    timePortalStatus,
    openPortal,
    closePortal,
    activePortal,
    setActivePortal,
  };
});

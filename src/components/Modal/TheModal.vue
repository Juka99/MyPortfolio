<template>
  <teleport to="body">
    <Transition name="fade" mode="out-in">
      <div
        class="modal"
        ref="modal"
        v-if="modalStore.modalOpen"
        @click="closeModal"
      >
        <!-- <i
        class="fa-solid fa-xmark modal__close"
        @click="() => modalStore.closeModal()"
      ></i> -->
        <div class="modal__box">
          <TheImage
            imagePath="pixelCatsInLove.webp"
            alt="Pixel Cats in Love"
            class="catsInLove"
          />
          <div class="modal__title">
            <h2>{{ title }}</h2>
            <i
              class="fa-solid fa-xmark modal__close"
              @click="() => modalStore.closeModal()"
            ></i>
          </div>
          <div class="modal__box-content">
            <div class="modal__content">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup>
  import { useModalStore } from '@/stores/modal';
  import TheImage from '../Image/TheImage.vue';
  import { nextTick, watch } from 'vue';
  import { useMoveStore } from '@/stores/move';

  const modalStore = useModalStore();
  const moveStore = useMoveStore();

  defineProps({
    title: String,
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalStore.modalOpen) {
      modalStore.closeModal();
    }
  });

  const closeModal = e => {
    if (e.target.closest('.modal__box')) return;
    modalStore.closeModal();
  };

  watch(
    () => modalStore.modalOpen,
    async () => {
      await nextTick();

      modalStore.modalOpen
        ? moveStore.lockMovement()
        : moveStore.unlockMovement();
    }
  );
</script>

<style lang="scss">
  @import '@/assets/css/_breakpoints.scss';

  .fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .fade-leave-active {
    transition: all 0.3s ease-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .modal {
    position: fixed;
    inset: 0;
    width: 100vw;
    z-index: 1000;
    backdrop-filter: blur(4px);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px; /* Prevent content from touching screen edges */
  }

  .modal__box {
    position: relative;
    width: calc(100% - 50px);
    max-width: 600px;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    padding: 32px;
    overflow: visible;
  }

  /* Ensure modal content is scrollable while allowing the cat image to overflow */
  .modal__box-content {
    overflow-y: auto;
    max-height: 60dvh;

    @include breakpoint-height(v700) {
      max-height: 58dvh;
    }

    @include breakpoint-height(v500) {
      max-height: 60dvh;
    }
  }

  /* Ensure catsInLove sits ON TOP of the modal, not inside the scrollable area */
  .catsInLove {
    width: 100px;
    position: absolute;
    z-index: 10;
    pointer-events: none;
    top: -88px;

    @include breakpoint-height(v800) {
      width: 85px;
      top: -75px;
    }

    @include breakpoint-height(v700) {
      width: 75px;
      top: -66px;
    }

    @include breakpoint-height(v600) {
      width: 50px;
      top: -44px;
    }

    @include breakpoint-height(v500) {
      display: none !important;
    }
  }

  .modal__title {
    position: relative;
    padding-bottom: 16px;
    font-size: 20px;
  }

  .modal__close {
    position: absolute;
    top: 6px;
    right: 0px;
    cursor: pointer;
    overflow: hidden;
    font-size: 28px;
  }

  .modal__content {
    margin-top: 4px;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .modal__section {
    margin-top: 16px;

    &:first-child {
      margin-top: 0;
    }

    h3 {
      font-size: 24px;
      margin-bottom: 8px;
    }

    p {
      font-size: 18px;
      margin-bottom: 10px;
      line-height: 1.4;

      &:last-child {
        margin-bottom: 0;
      }
    }

    img {
      margin-top: 10px;
    }

    button,
    a {
      display: ruby-text;
      width: fit-content;
      padding: 16px 36px;
      background: #ffcd71;
      color: #fff;
      text-decoration: none;
      border: none;
      border-radius: 50px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s;
      letter-spacing: 1.5px;
      min-width: 175px;
      margin-top: 4px;

      &:hover {
        background: lighten(#ffcd71, 5%);
      }
    }
  }
</style>

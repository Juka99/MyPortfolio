<template>
  <div
    class="gameView"
    :style="{
      transform: `translateX(${moveStore.move}px)`,
      transition: movementTransition,
    }"
  >
    <FirstGameSection />
    <SecondGameSection />
  </div>

  <div class="info">
    <TheImage
      imagePath="infoIcon.webp"
      alt="Info Icon"
      class="infoIcon"
      @click="modalStore.openModal()"
    />
    <TheImage
      imagePath="pixelArrowUp.webp"
      class="pixelArrowUpForInfo"
      alt="Pixel arrow pointing to info icon"
    />
  </div>

  <TheAvatar />
  <TheTouchScreenInstructions v-if="touchScreenStore.isTouchScreen" />
</template>

<script setup>
  import TheAvatar from '@/components/Avatar/TheAvatar.vue';
  import FirstGameSection from '@/components/FirstGameSection.vue';
  import TheImage from '@/components/Image/TheImage.vue';
  import SecondGameSection from '@/components/SecondGameSection.vue';
  import TheTouchScreenInstructions from '@/components/TouchScreenInstructions/TheTouchScreenInstructions.vue';
  import { useTouchScreenStore } from '@/stores/isTouchScreen';
  import { useModalStore } from '@/stores/modal';
  import { useMoveStore } from '@/stores/move';
  import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue';

  const moveStore = useMoveStore();
  const touchScreenStore = useTouchScreenStore();
  const modalStore = useModalStore();

  const movementTransition = computed(() => {
    if (moveStore.isCharacterTransitioning)
      return 'transform 0.95s ease-in-out';

    if (moveStore.isScriptedJumping)
      return 'transform 0.85s cubic-bezier(0.35, 0, 0.35, 1)';

    return 'none';
  });

  // Flags for key states
  const keysPressed = ref({
    left: false,
    right: false,
  });

  const BASE_FRAME_MS = 1000 / 60;
  const MAX_DELTA_FRAME_SCALE = 2;

  let animationFrameId = null;
  let lastFrameTime = null;

  const refreshMovementBounds = () => {
    const endingPoint = document.querySelector('.endingPoint');
    const preEndingPoint = document.querySelector('.preEndingPoint');

    if (endingPoint) {
      moveStore.setEndingSectionClientRect(endingPoint.getBoundingClientRect());
    }

    if (preEndingPoint) {
      moveStore.setPreEndingSectionClientRect(
        preEndingPoint.getBoundingClientRect()
      );
    }
  };

  // Function to update movement continuously
  const updateMovement = currentFrameTime => {
    const deltaFrameScale =
      lastFrameTime === null
        ? 1
        : Math.min(
            (currentFrameTime - lastFrameTime) / BASE_FRAME_MS,
            MAX_DELTA_FRAME_SCALE
          );
    lastFrameTime = currentFrameTime;

    if (keysPressed.value.left) {
      moveStore.moveLeft(deltaFrameScale);
    }
    if (keysPressed.value.right) {
      moveStore.moveRight(deltaFrameScale);
    }

    if (keysPressed.value.left || keysPressed.value.right) {
      refreshMovementBounds();
    }

    animationFrameId = requestAnimationFrame(updateMovement); // Repeat the function
  };

  // Keydown handler
  const handleKeydown = event => {
    if (event.key === 'ArrowLeft' || event.key === 'a') {
      keysPressed.value.left = true;
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
      keysPressed.value.right = true;
    }
  };

  // Keyup handler
  const handleKeyup = event => {
    if (event.key === 'ArrowLeft' || event.key === 'a') {
      keysPressed.value.left = false;
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
      keysPressed.value.right = false;
    }
    if (event.key === 'x') {
      moveStore.setSpeed();
    }
  };

  // Debounce function
  // const debounce = (func, wait) => {
  //   let timeout;
  //   return function (...args) {
  //     const context = this;
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       timeout = null;
  //       func.apply(context, args);
  //     }, wait);
  //   };
  // };

  const setHeightAndWidth = () => {
    moveStore.setCurrentHeight(window.innerHeight);
    moveStore.setCurrentWidth(window.innerWidth);
  };

  onMounted(async () => {
    await nextTick();

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);

    window.onload = () => {
      const avatar = document.querySelector('.avatar');
      if (avatar) {
        moveStore.setCharacterClientRect(avatar.getBoundingClientRect());
      }
    };

    moveStore.setEndingSectionClientRect(
      document.querySelector('.endingPoint').getBoundingClientRect()
    );

    moveStore.setPreEndingSectionClientRect(
      document.querySelector('.preEndingPoint').getBoundingClientRect()
    );

    //console.log(document.querySelector('.avatar').getBoundingClientRect());

    setHeightAndWidth(); // Set height and width of the game view
    //Add debounce event on resize to set height and width of the game view
    window.addEventListener('resize', function () {
      setHeightAndWidth();
      moveStore.setEndingSectionClientRect(
        document.querySelector('.endingPoint').getBoundingClientRect()
      );
      moveStore.setPreEndingSectionClientRect(
        document.querySelector('.preEndingPoint').getBoundingClientRect()
      );
      moveStore.setCharacterClientRect(
        document.querySelector('.avatar').getBoundingClientRect()
      );
      touchScreenStore.refreshIsTouchScreen();
    });
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);
    animationFrameId = requestAnimationFrame(updateMovement); // Start updating movement

    touchScreenStore.refreshIsTouchScreen();
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('keyup', handleKeyup);
    cancelAnimationFrame(animationFrameId); // Clean up animation frame
    lastFrameTime = null;
  });
</script>

<style scoped lang="scss">
  @import '@/assets/css/_colors.scss';
  @import '@/assets/css/_breakpoints.scss';

  .gameView {
    position: relative;
    width: 20000px;
    height: 100dvh;
    overflow: hidden;
    will-change: transform;
    background-color: $c-sky-blue;
  }

  .info {
    position: fixed;
    top: 32px;
    left: calc(100vw - 70px - 32px);
    z-index: 3;
    width: 60px;
    border-radius: 50%;
    transition: 0.2s;
    overflow: visible;

    &--hide {
      transition: 0.3s;
      opacity: 0;
    }

    @include breakpoint-height(v700) {
      width: 50px;
    }

    @include breakpoint-height(v600) {
      width: 43px;
      top: 20px;
      left: calc(100vw - 40px - 35px);
    }

    @include breakpoint-width(h1100) {
      left: calc(100vw - 40px - 50px);
    }

    @include breakpoint-width(h900) {
      width: 50px;
      left: calc(100vw - 40px - 40px);
    }

    @include breakpoint-width(h600) {
      left: calc(100vw - 30px - 35px);
      width: 45px;
    }

    @include breakpoint-both(h800, v500) {
      left: calc(100vw - 30px - 35px);
      width: 45px;
    }
  }

  .infoIcon {
    cursor: pointer;
  }

  .pixelArrowUpForInfo {
    position: absolute;
    width: 60px;
    top: 15px;
    transform: rotate(90deg);
    // Arrow pointing
    animation: arrowUp 1s infinite;

    @include breakpoint-height(v700) {
      width: 45px;
      top: 12px;
      transform: translateX(15px) rotate(90deg);
    }

    @include breakpoint-height(v600) {
      width: 40px;
      top: 10px;
      transform: translateX(22px) rotate(90deg);
    }

    @include breakpoint-width(h900) {
      width: 45px;
      top: 12px;
      transform: translateX(15px) rotate(90deg);
    }

    @include breakpoint-width(h600) {
      width: 40px;
      top: 10px;
      transform: translateX(25px) rotate(90deg);
    }

    @include breakpoint-both(h800, v500) {
      width: 40px;
      top: 10px;
      transform: translateX(25px) rotate(90deg);
    }
  }

  @keyframes arrowUp {
    0% {
      left: -80px;
    }
    50% {
      left: -70px;
    }
    100% {
      left: -80px;
    }
  }
</style>

<template>
  <div
    class="touchScreenInstructions"
    @contextmenu.prevent
    @dragstart.prevent
    @selectstart.prevent
  >
    <div class="touchScreenInstructions__content">
      <p>Move around</p>
      <div class="touchScreenInstructions__buttons">
        <div
          @touchstart.prevent.stop="startMoving('left')"
          @touchmove.prevent.stop
          @touchend.prevent.stop="stopMoving"
          @touchcancel.prevent.stop="stopMoving"
          @mousedown.prevent="startMoving('left')"
          @mouseup.prevent="stopMoving"
          @mouseleave="stopMoving"
          @contextmenu.prevent
          @dragstart.prevent
          @selectstart.prevent
          class="touchScreenInstructions__moveButton"
        >
          <TheImage
            imagePath="pixelArrowUp.webp"
            alt="Arrow pointing left"
            class="moveArrow"
            draggable="false"
          />
        </div>
        <div
          @touchstart.prevent.stop="startMoving('right')"
          @touchmove.prevent.stop
          @touchend.prevent.stop="stopMoving"
          @touchcancel.prevent.stop="stopMoving"
          @mousedown.prevent="startMoving('right')"
          @mouseup.prevent="stopMoving"
          @mouseleave="stopMoving"
          @contextmenu.prevent
          @dragstart.prevent
          @selectstart.prevent
          class="touchScreenInstructions__moveButton"
        >
          <TheImage
            imagePath="pixelArrowUp.webp"
            alt="Arrow pointing right"
            class="moveArrow moveArrow--right"
            draggable="false"
          />
        </div>
      </div>
    </div>
    <div class="touchScreenInstructions__content">
      <p>Change speed</p>
      <div class="touchScreenInstructions__buttons">
        <div
          @click="moveStore.setSpeed()"
          class="touchScreenInstructions__moveButton"
          @contextmenu.prevent
          @dragstart.prevent
          @selectstart.prevent
        >
          <TheImage
            imagePath="stopwatch.webp"
            alt="Stopwatch for changing speed"
            class="speedChange"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useMoveStore } from '@/stores/move';
  import TheImage from '../Image/TheImage.vue';
  import { onMounted, onUnmounted, nextTick } from 'vue';

  onMounted(async () => {
    await nextTick();

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  });

  const moveStore = useMoveStore();
  const BASE_FRAME_MS = 1000 / 60;
  const MAX_DELTA_FRAME_SCALE = 2;

  let moveAnimationFrameId = null;
  let lastFrameTime = null;
  let activeDirection = null;

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

  const moveWithDirection = currentFrameTime => {
    if (!activeDirection) return;

    const deltaFrameScale =
      lastFrameTime === null
        ? 1
        : Math.min(
            (currentFrameTime - lastFrameTime) / BASE_FRAME_MS,
            MAX_DELTA_FRAME_SCALE
          );
    lastFrameTime = currentFrameTime;

    if (activeDirection === 'left') {
      moveStore.moveLeft(deltaFrameScale);
    } else {
      moveStore.moveRight(deltaFrameScale);
    }

    refreshMovementBounds();
    moveAnimationFrameId = requestAnimationFrame(moveWithDirection);
  };

  const startMoving = direction => {
    activeDirection = direction;

    if (moveAnimationFrameId) return;

    moveAnimationFrameId = requestAnimationFrame(moveWithDirection);
  };

  const stopMoving = () => {
    cancelAnimationFrame(moveAnimationFrameId);
    moveAnimationFrameId = null;
    lastFrameTime = null;
    activeDirection = null;
  };

  onUnmounted(stopMoving);
</script>

<style lang="scss" scoped>
  @import '../../assets/css/breakpoints';

  .touchScreenInstructions {
    position: fixed;
    bottom: 0px;
    left: 480px;
    z-index: 1;
    display: flex;
    gap: 100px;
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 20px;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    touch-action: none;
    user-drag: none;
    user-select: none;
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;

    .character-transitioning & {
      opacity: 0.45;
      pointer-events: none;
      transform: translateY(12px);
    }

    @include breakpoint-height(v700) {
      padding: 12px 20px;
      gap: 70px;
      left: 520px;
    }

    @include breakpoint-width(h1600) {
      left: 240px;
      gap: 90px;
    }

    @include breakpoint-width(h1100) {
      left: 100px;
      gap: 80px;
    }

    @include breakpoint-width(h800) {
      left: 30px;
      gap: 40px;
    }

    @include breakpoint-width(h400) {
      left: 15px;
      gap: 20px;
    }

    @include breakpoint-both(h1600, v700) {
      left: 275px;
      gap: 75px;
    }

    @include breakpoint-both(h1100, v700) {
      left: 140px;
      gap: 65px;
    }

    @include breakpoint-both(h800, v700) {
      left: 50px;
      gap: 35px;
    }

    @include breakpoint-both(h400, v700) {
      left: 17px;
      gap: 15px;
    }
  }

  .touchScreenInstructions__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    p {
      font-size: 20px;
      color: white;
      font-weight: 700;

      @include breakpoint-height(v700) {
        font-size: 19px;
      }

      @include breakpoint-width(h800) {
        font-size: 17px;
      }
    }
  }

  .touchScreenInstructions,
  .touchScreenInstructions * {
    -webkit-touch-callout: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    user-drag: none;
    user-select: none;
  }

  .touchScreenInstructions__buttons {
    display: flex;
    gap: 32px;

    @include breakpoint-width(h400) {
      gap: 20px;
    }
  }

  .touchScreenInstructions__moveButton {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none; /* Standard */
    -webkit-tap-highlight-color: transparent; /* Removes the blue highlight */
    touch-action: none;

    @include breakpoint-height(v700) {
      width: 50px;
      height: 50px;
    }

    @include breakpoint-width(h400) {
      width: 50px;
      height: 50px;
    }
  }

  .moveArrow {
    width: 60px;
    height: 40px;
    transform: translateX(-3px) rotate(-90deg);
    pointer-events: none;

    @include breakpoint-height(v700) {
      width: 55px;
      height: 35px;
    }

    @include breakpoint-width(h400) {
      width: 40px;
      height: 30px;
    }

    &--right {
      transform: translateX(3px) rotate(90deg);
    }
  }

  .speedChange {
    width: 35px;
    pointer-events: none;
    transform: translateY(-2px);
    margin: 0 auto;

    @include breakpoint-width(h400) {
      width: 28px;
    }
  }
</style>

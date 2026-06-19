<template>
  <div class="avatar-container" ref="avatarContainer">
    <Transition name="fade" mode="out-in">
      <p class="currentSpeed" v-if="moveStore.isCharacterSpeedChanging">
        <TheImage imagePath="stopwatch.webp" class="speedImage" />
        {{ moveStore.speed }}
      </p>
    </Transition>

    <div
      class="avatar"
      :class="{ 'avatar--facing-left': facing === 'left' }"
      :data-animation="animationName"
      :style="spritePosition"
      aria-label="Animated pixel-art warrior"
      role="img"
      ref="avatar"
    >
      <Transition name="oops-bubble">
        <div v-if="moveStore.isFallSuspended" class="oops-bubble" role="status">
          Ooops....
        </div>
      </Transition>

      <div class="warrior-sprite" aria-hidden="true">
        <span
          v-for="layer in warriorLayers"
          :key="layer"
          class="warrior-sprite__layer"
          :style="{ backgroundImage: `url('${layer}')` }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
  import { useTimePortalStore } from '@/stores/portals';
  import { useMoveStore } from '@/stores/move';
  import TheImage from '../Image/TheImage.vue';

  import warriorSkin from '@/assets/pixelCharacter/PNG/Modular Parts/class_Warrior/Skin_Tones/0.png';
  import warriorCloth from '@/assets/pixelCharacter/PNG/Modular Parts/class_Warrior/cloth/0.png';
  import warriorEyes from '@/assets/pixelCharacter/PNG/Modular Parts/Eyes/eye1.png';
  import warriorHair from '@/assets/pixelCharacter/PNG/Modular Parts/Hair/0/1.png';
  import warriorSword from '@/assets/pixelCharacter/PNG/Modular Parts/class_Warrior/weapons/6.png';
  import warriorShield from '@/assets/pixelCharacter/PNG/Modular Parts/Equip_Shield/Shield1.png';

  const portalStore = useTimePortalStore();
  const moveStore = useMoveStore();

  const SPRITE_COLUMNS = 10;
  const SPRITE_ROWS = 8;
  const FRAME_DURATION = 100;
  const MOVEMENT_SETTLE_DELAY = 90;

  const animations = {
    walk: { row: 0, frameCount: 6 },
    idle: { row: 1, frameCount: 6 },
    jump: { row: 2, frameCount: 3 },
  };

  // The source pack is modular, so these transparent sheets form one warrior.
  const warriorLayers = [
    warriorSkin,
    warriorCloth,
    warriorEyes,
    warriorHair,
    warriorSword,
    warriorShield,
  ];

  const avatar = ref(null);
  const avatarContainer = ref(null);
  const facing = ref('right');
  const isWalking = ref(false);
  const currentFrame = ref(0);

  let frameIndex = 0;
  let frameInterval = null;
  let movementSettledTimeout = null;

  const animationName = computed(() => {
    if (
      moveStore.isCharacterTransitioning ||
      moveStore.isScriptedJumping ||
      moveStore.isFallSuspended
    )
      return 'jump';
    return isWalking.value ? 'walk' : 'idle';
  });

  const activeAnimation = computed(() => animations[animationName.value]);

  const spritePosition = computed(() => {
    const column = currentFrame.value;
    const row = activeAnimation.value.row;

    return {
      '--sprite-column': `${(column / (SPRITE_COLUMNS - 1)) * 100}%`,
      '--sprite-row': `${(row / (SPRITE_ROWS - 1)) * 100}%`,
    };
  });

  const resetAnimation = () => {
    frameIndex = 0;
    currentFrame.value = 0;
  };

  const advanceAnimation = () => {
    frameIndex = (frameIndex + 1) % activeAnimation.value.frameCount;
    currentFrame.value = frameIndex;
  };

  watch(animationName, resetAnimation);

  watch(
    () => moveStore.isAlmostDoneSequenceActive,
    sequenceIsActive => {
      if (!sequenceIsActive) return;

      clearTimeout(movementSettledTimeout);
      isWalking.value = false;
      facing.value = moveStore.scriptedJumpDirection;
    }
  );

  watch(
    () => portalStore.timePortalStatus,
    async portalStatus => {
      await nextTick();
      avatar.value?.classList.toggle('hide-image', portalStatus === 'open');
    }
  );

  watch(
    () => moveStore.move,
    async (currentMove, previousMove) => {
      if (currentMove === previousMove) return;

      if (!moveStore.isAlmostDoneSequenceActive) {
        facing.value = currentMove < previousMove ? 'right' : 'left';
        isWalking.value = true;

        clearTimeout(movementSettledTimeout);
        movementSettledTimeout = setTimeout(() => {
          isWalking.value = false;
        }, MOVEMENT_SETTLE_DELAY);
      }

      await nextTick();
      if (!moveStore.isSecondSectionActive) return;

      const getAvatar = document.querySelector('.avatar');
      const getInfo = document.querySelector('.info');

      if (!getAvatar || !getInfo) return;

      moveStore.setCharacterClientRect(getAvatar.getBoundingClientRect());

      const shouldHide =
        moveStore.preEndingSectionClientRect.left <=
        moveStore.characterClientRect.left;

      getAvatar.classList.toggle('avatar--hide', shouldHide);
      getInfo.classList.toggle('info--hide', shouldHide);
    }
  );

  onMounted(() => {
    frameInterval = setInterval(advanceAnimation, FRAME_DURATION);
  });

  onUnmounted(() => {
    clearInterval(frameInterval);
    clearTimeout(movementSettledTimeout);
  });
</script>

<style lang="scss" scoped>
  @import '../../assets/css/_breakpoints.scss';

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }

  .currentSpeed {
    position: absolute;
    bottom: 357px;
    left: 671px;
    z-index: 4;
    display: flex;
    align-items: center;
    color: #bdffa1;
    font-weight: 700;
    letter-spacing: 1px;
    gap: 10px;
    font-size: 21px;

    @include breakpoint-height(v700) {
      bottom: 323px;
    }

    @include breakpoint-height(v600) {
      bottom: 275px;
      left: 665px;
      font-size: 20px;
    }

    @include breakpoint-height(v500) {
      bottom: 262px;
      left: 660px;
    }

    @include breakpoint-height(v450) {
      bottom: 245px;
      left: 658px;
      font-size: 19px;
    }

    @include breakpoint-height(v375) {
      bottom: 233px;
    }

    @include breakpoint-width(h1600) {
      left: 432px;
    }

    @include breakpoint-width(h1100) {
      left: 285px;
    }

    @include breakpoint-width(h800) {
      left: 135px;
    }

    @include breakpoint-width(h400) {
      left: 120px;
    }

    @include breakpoint-both(h1600, v600) {
      left: 425px;
    }

    @include breakpoint-both(h1600, v500) {
      left: 420px;
    }

    @include breakpoint-both(h1100, v600) {
      left: 280px;
    }

    @include breakpoint-both(h1100, v500) {
      left: 275px;
    }

    @include breakpoint-both(h800, v600) {
      left: 130px;
    }

    @include breakpoint-both(h800, v500) {
      left: 125px;
    }

    @include breakpoint-both(h400, v600) {
      left: 115px;
    }

    @include breakpoint-both(h400, v500) {
      left: 110px;
    }

    .second-section-active & {
      bottom: 330px;

      @include breakpoint-height(v700) {
        bottom: 283px;
      }

      @include breakpoint-height(v600) {
        bottom: 260px;
      }

      @include breakpoint-height(v500) {
        bottom: 250px;
      }

      @include breakpoint-height(v450) {
        bottom: 243px;
      }
    }
  }

  .speedImage {
    width: 33px;
  }

  .avatar-container {
    overflow: visible;
  }

  .avatar {
    --warrior-frame-size: 190px;

    overflow: visible;
    width: 70px;
    height: 110px;
    left: 675px;
    position: fixed;
    z-index: 4;
    bottom: 200px;
    opacity: 1;
    transition:
      bottom 1.5s ease-in-out,
      opacity 0.3s ease;

    .character-transitioning--down & {
      animation: avatar-drop-dive 1.5s ease-in-out both;
    }

    .character-transitioning--up & {
      animation: avatar-climb-return 1.5s ease-in-out both;
    }

    .character-fall-suspended & {
      animation: avatar-oops-hover 240ms ease-out both;
    }

    .character-scripted-jump--right & {
      animation: avatar-almost-done-jump-right 850ms
        cubic-bezier(0.35, 0, 0.35, 1) both;
    }

    .character-scripted-jump--left & {
      animation: avatar-almost-done-jump-left 850ms
        cubic-bezier(0.35, 0, 0.35, 1) both;
    }

    &--hide {
      opacity: 0;
    }

    @include breakpoint-height(v700) {
      --warrior-frame-size: 174px;
      width: 65px;
      height: 100px;
      bottom: 175px;
    }

    @include breakpoint-height(v600) {
      --warrior-frame-size: 150px;
      width: 55px;
      height: 86px;
      bottom: 150px;
    }

    @include breakpoint-height(v500) {
      --warrior-frame-size: 137px;
      width: 50px;
      height: 78px;
      bottom: 149px;
    }

    @include breakpoint-height(v450) {
      --warrior-frame-size: 124px;
      width: 45px;
      height: 70px;
      bottom: 140px;
    }

    @include breakpoint-height(v375) {
      bottom: 129px;
    }

    @include breakpoint-width(h1600) {
      left: 435px;
    }

    @include breakpoint-width(h1100) {
      left: 290px;
    }

    @include breakpoint-width(h800) {
      left: 140px;
    }

    @include breakpoint-width(h400) {
      left: 125px;
    }

    .second-section-active & {
      bottom: 168px;

      @include breakpoint-height(v700) {
        bottom: 138px;
      }
    }
  }

  .warrior-sprite {
    position: absolute;
    overflow: visible;
    width: var(--warrior-frame-size);
    height: var(--warrior-frame-size);
    left: 50%;
    bottom: -18px;
    transform: translateX(-50%) scaleX(1);
    transform-origin: center;

    .avatar--facing-left & {
      transform: translateX(-50%) scaleX(-1);
    }
  }

  .warrior-sprite__layer {
    position: absolute;
    inset: 0;
    background-position: var(--sprite-column) var(--sprite-row);
    background-repeat: no-repeat;
    background-size: 1000% 800%;
    image-rendering: pixelated;
  }

  .oops-bubble {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 36px);
    z-index: 6;
    transform: translateX(-50%);
    padding: 8px 13px;
    border: 3px solid #1b1b1b;
    background: #fff;
    box-shadow: 4px 4px 0 #1b1b1b;
    color: #1b1b1b;
    font-size: 19px;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
    overflow: visible;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -12px;
      width: 14px;
      height: 14px;
      border-right: 3px solid #1b1b1b;
      border-bottom: 3px solid #1b1b1b;
      background: #fff;
      transform: translateX(-50%) rotate(45deg);
    }

    @include breakpoint-height(v600) {
      bottom: calc(100% + 25px);
      padding: 7px 11px;
      font-size: 17px;
    }
  }

  .oops-bubble-enter-active,
  .oops-bubble-leave-active {
    transition:
      opacity 0.16s ease,
      transform 0.16s ease;
  }

  .oops-bubble-enter-from,
  .oops-bubble-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(8px) scale(0.9);
  }

  .hide-image {
    opacity: 0;
    z-index: -1;
  }

  @keyframes avatar-drop-dive {
    0% {
      transform: translateY(-28px) rotate(0deg);
    }
    28% {
      transform: translateY(-30px) rotate(2deg);
    }
    68% {
      transform: translateY(18px) rotate(1deg);
    }
    86% {
      transform: translateY(8px) rotate(0deg);
    }
    100% {
      transform: translateY(0) rotate(0deg);
    }
  }

  @keyframes avatar-oops-hover {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    72% {
      transform: translateY(-32px) rotate(-2deg);
    }
    100% {
      transform: translateY(-28px) rotate(0deg);
    }
  }

  @keyframes avatar-climb-return {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    30% {
      transform: translateY(-48px) rotate(-2deg);
    }
    72% {
      transform: translateY(-18px) rotate(-1deg);
    }
    88% {
      transform: translateY(-4px) rotate(0deg);
    }
    100% {
      transform: translateY(0) rotate(0deg);
    }
  }

  @keyframes avatar-almost-done-jump-right {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    18% {
      transform: translateY(-32px) rotate(-2deg);
    }
    50% {
      transform: translateY(-92px) rotate(2deg);
    }
    78% {
      transform: translateY(-46px) rotate(3deg);
    }
    100% {
      transform: translateY(0) rotate(0deg);
    }
  }

  @keyframes avatar-almost-done-jump-left {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    18% {
      transform: translateY(-32px) rotate(2deg);
    }
    50% {
      transform: translateY(-92px) rotate(-2deg);
    }
    78% {
      transform: translateY(-46px) rotate(-3deg);
    }
    100% {
      transform: translateY(0) rotate(0deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .avatar {
      animation: none !important;
    }
  }
</style>

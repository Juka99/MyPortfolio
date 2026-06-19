<template>
  <div class="portals">
    <div
      v-for="(portal, index) in portals"
      :key="index"
      class="portals__box"
      :class="{ 'portals__box--disabled': !portal.isActive }"
      :role="portal.isActive ? 'button' : undefined"
      :tabindex="portal.isActive ? 0 : -1"
      :aria-disabled="!portal.isActive"
      @click="openPortal(portal)"
      @keydown.enter="openPortal(portal)"
      @keydown.space.prevent="openPortal(portal)"
      :data-id="portal.data"
    >
      <div class="portals__title" :class="`portals__title--${portal.color}`">
        <span
          class="portals__title-decoration"
          :class="portal.decorationGradientClass"
        >
          {{ portal.title }}
        </span>
      </div>
      <div class="portals__image">
        <div
          v-for="(particle, i) in portal.particles"
          :key="i"
          :class="`particle particle--${portal.color}`"
          :style="{
            left: particle.left,
            bottom: particle.bottom,
            animationDuration: particle.duration,
            animationDelay: particle.delay,
          }"
        ></div>
        <TheImage
          :imagePath="portal.imagePath"
          :alt="portal.alt"
          :class="portal.className"
        />
        <div v-if="!portal.isActive" class="portals__construction-message">
          Portal under construction
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useMoveStore } from '@/stores/move';
  import TheImage from '../Image/TheImage.vue';
  import { useTimePortalStore } from '@/stores/portals';

  const openPortal = portal => {
    if (!portal.isActive) return;

    portalStore.openPortal();
    moveStore.lockMovement();
    moveStore.lockSpeedChange();
    portalStore.setActivePortal(portal.data);
  };

  const portalStore = useTimePortalStore();
  const moveStore = useMoveStore();

  const portals = [
    {
      data: 'projectOne',
      title: 'Iterate',
      isActive: true,
      color: 'blue',
      imagePath: 'pixelPortalOne.webp',
      alt: 'Pixel Portal One',
      className: 'pixelPortal pixelPortal--one',
      decorationGradientClass: 'decoration-gradient-blue',
      particles: [
        { left: '40%', bottom: '93%', duration: '6s', delay: '0s' },
        { left: '37%', bottom: '80%', duration: '8s', delay: '1s' },
        { left: '45%', bottom: '60%', duration: '5s', delay: '2s' },
        { left: '10%', bottom: '52%', duration: '7s', delay: '1.5s' },
        { left: '68%', bottom: '60%', duration: '6s', delay: '2.5s' },
        { left: '20%', bottom: '91%', duration: '9s', delay: '3s' },
        { left: '14%', bottom: '75%', duration: '10s', delay: '1.8s' },
        { left: '85%', bottom: '78%', duration: '7s', delay: '2.2s' },
        { left: '77%', bottom: '87%', duration: '6.5s', delay: '1.3s' },
      ],
    },
    {
      data: 'projectTwo',
      title: 'Orbit',
      isActive: true,
      color: 'red',
      imagePath: 'pixelPortalThree.webp',
      alt: 'Pixel Portal Three',
      className: 'pixelPortal pixelPortal--three',
      decorationGradientClass: 'decoration-gradient-red',
      particles: [
        { left: '3%', bottom: '29%', duration: '6s', delay: '0s' },
        { left: '6%', bottom: '45%', duration: '8s', delay: '1s' },
        { left: '12%', bottom: '70%', duration: '5s', delay: '2s' },
        { left: '21%', bottom: '23%', duration: '7s', delay: '1.5s' },
        { left: '34%', bottom: '67%', duration: '6s', delay: '2.5s' },
        { left: '57%', bottom: '68%', duration: '9s', delay: '3s' },
        { left: '80%', bottom: '58%', duration: '10s', delay: '1.8s' },
        { left: '85%', bottom: '40%', duration: '7s', delay: '2.2s' },
        { left: '75%', bottom: '23%', duration: '6.5s', delay: '1.3s' },
      ],
    },
    {
      data: 'projectThree',
      title: 'Coming Soon',
      isActive: false,
      color: 'green',
      imagePath: 'pixelPortalTwo.webp',
      alt: 'Pixel Portal Two',
      className: 'pixelPortal pixelPortal--two',
      decorationGradientClass: 'decoration-gradient-green',
      particles: [
        { left: '60%', bottom: '92%', duration: '6s', delay: '0s' },
        { left: '47%', bottom: '87%', duration: '8s', delay: '1s' },
        { left: '53%', bottom: '75%', duration: '5s', delay: '2s' },
        { left: '23%', bottom: '66%', duration: '7s', delay: '1.5s' },
        { left: '27%', bottom: '79%', duration: '6s', delay: '2.5s' },
        { left: '28%', bottom: '51%', duration: '9s', delay: '3s' },
        { left: '80%', bottom: '68%', duration: '10s', delay: '1.8s' },
        { left: '78%', bottom: '50%', duration: '7s', delay: '2.2s' },
        { left: '75%', bottom: '81%', duration: '6.5s', delay: '1.3s' },
      ],
    },
    {
      data: 'projectFour',
      title: 'Coming Soon',
      isActive: false,
      color: 'purple',
      imagePath: 'pixelPortalFour.webp',
      alt: 'Pixel Portal Four',
      className: 'pixelPortal pixelPortal--four',
      decorationGradientClass: 'decoration-gradient-purple',
      particles: [
        { left: '3%', bottom: '29%', duration: '6s', delay: '0.3s' },
        { left: '6%', bottom: '45%', duration: '8s', delay: '0.5s' },
        { left: '12%', bottom: '70%', duration: '5s', delay: '0.65s' },
        { left: '21%', bottom: '23%', duration: '7s', delay: '0.8s' },
        { left: '34%', bottom: '67%', duration: '6s', delay: '1.2s' },
        { left: '57%', bottom: '68%', duration: '9s', delay: '1.35s' },
        { left: '80%', bottom: '58%', duration: '10s', delay: '1s' },
        { left: '85%', bottom: '40%', duration: '7s', delay: '1.25s' },
        { left: '75%', bottom: '23%', duration: '6.5s', delay: '1.05s' },
      ],
    },
  ];
</script>

<style lang="scss" scoped>
  @import '../../assets/css/_breakpoints.scss';

  .portals {
    display: flex;
    gap: 120px;
    position: absolute;
    align-items: flex-end;
    z-index: 3;
    bottom: 184px;
    overflow: visible;
    left: 3050px;

    @include breakpoint-height(v700) {
      gap: 70px;
      bottom: 155px;
    }

    @include breakpoint-height(v600) {
      gap: 60px;
      bottom: 135px;
    }

    @include breakpoint-height(v500) {
      gap: 60px;
    }

    @include breakpoint-height(v450) {
      gap: 50px;
      bottom: 125px;
    }

    @include breakpoint-height(v375) {
      gap: 40px;
      bottom: 117px;
    }
  }

  .portals__title {
    font-size: 48px;
    overflow: visible;
    //font-style: italic;
    font-weight: bold;
    position: absolute;
    //bottom: 400px;
    z-index: 1;

    /* Required for text gradient effect */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 100% 100%;

    @include breakpoint-height(v800) {
      font-size: 38px;
    }

    @include breakpoint-height(v700) {
      font-size: 34px;
    }

    @include breakpoint-height(v600) {
      font-size: 30px;
    }

    @include breakpoint-height(v500) {
      font-size: 26px;
    }

    @include breakpoint-height(v375) {
      font-size: 22px;
    }
  }

  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .portals__title--blue,
  .portals__title--green {
    bottom: 395px;

    @include breakpoint-height(v800) {
      bottom: 350px;
    }

    @include breakpoint-height(v700) {
      bottom: 315px;
      transform: translateX(0px);
    }

    @include breakpoint-height(v600) {
      bottom: 252px;
    }

    @include breakpoint-height(v500) {
      bottom: 205px;
    }

    @include breakpoint-height(v375) {
      bottom: 170px;
    }
  }

  .portals__title--red,
  .portals__title--purple {
    bottom: 300px;

    @include breakpoint-height(v800) {
      bottom: 270px;
    }

    @include breakpoint-height(v700) {
      bottom: 260px;
      transform: translateX(-6px);
    }

    @include breakpoint-height(v600) {
      bottom: 225px;
      transform: translateX(-6px);
    }

    @include breakpoint-height(v500) {
      bottom: 173px;
      transform: translateX(-6px);
    }

    @include breakpoint-height(v375) {
      bottom: 148px;
      transform: translateX(-6px);
    }
  }

  /* Decoration Gradients */
  .decoration-gradient-blue {
    background: linear-gradient(60deg, #3f67dd, #31a9ea, #3f67dd, #31a9ea);

    &::after {
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='gradient' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0%' stop-color='%233f67dd'/%3E%3Cstop offset='100%' stop-color='%2331a9ea'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg clip-path='url(%23a)'%3E%3Cpath d='M-17 30.5C-1 22 72-4 54 13 37.9 28.2-2.5 57.5 16 55.5s72-29 104-40' stroke='url(%23gradient)' stroke-width='10'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h100v64H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
    }
  }

  .decoration-gradient-red {
    background: linear-gradient(60deg, #f3a14f, #ff3e3e, #f3a14f, #ff3e3e);
    animation-delay: 1s;
    bottom: 32px;

    &::after {
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='gradient' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0%' stop-color='%23ff4500'/%3E%3Cstop offset='100%' stop-color='%23ff8c00'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg clip-path='url(%23a)'%3E%3Cpath d='M-17 30.5C-1 22 72-4 54 13 37.9 28.2-2.5 57.5 16 55.5s72-29 104-40' stroke='url(%23gradient)' stroke-width='10'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h100v64H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
    }
  }

  .decoration-gradient-green {
    background: linear-gradient(60deg, #69eda9, #30ffbd, #69eda9, #30ffbd);

    &::after {
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='gradient' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0%' stop-color='%2387f687'/%3E%3Cstop offset='100%' stop-color='%2395ffa8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg clip-path='url(%23a)'%3E%3Cpath d='M-17 30.5C-1 22 72-4 54 13 37.9 28.2-2.5 57.5 16 55.5s72-29 104-40' stroke='url(%23gradient)' stroke-width='10'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h100v64H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
    }
  }

  .decoration-gradient-purple {
    background: linear-gradient(60deg, #f080f0, #c976c9, #f080f0, #c976c9);

    &::after {
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='gradient' x1='0' y1='0' x2='1' y2='0' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0%' stop-color='%23c585f8'/%3E%3Cstop offset='100%' stop-color='%23d4a3ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg clip-path='url(%23a)'%3E%3Cpath d='M-17 30.5C-1 22 72-4 54 13 37.9 28.2-2.5 57.5 16 55.5s72-29 104-40' stroke='url(%23gradient)' stroke-width='10'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h100v64H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
    }
  }

  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .portals__title-decoration {
    white-space: nowrap;
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 1.7s ease infinite;

    &:after {
      --deco-height: 0.3125em;
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(var(--deco-height) * -1.3);
      height: var(--deco-height);

      background-size: auto 100%;
      background-repeat: round;
      background-position: 0em;
    }
  }

  .portals__image {
    overflow: hidden;
    position: relative;

    @include breakpoint-height(v700) {
      overflow: visible;
    }
  }

  .portals__box {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: 0.4s;
    border-top-right-radius: 60px;
    border-top-left-radius: 60px;
    padding: 150px 20px 0 20px;
    overflow: visible;
  }

  .portals__box--disabled {
    cursor: not-allowed;
    filter: grayscale(0.75);

    .pixelPortal,
    .particle {
      opacity: 0.45;
    }

    &:hover {
      box-shadow: none !important;
    }
  }

  .portals__construction-message {
    position: absolute;
    left: 50%;
    bottom: 18px;
    transform: translateX(-50%);
    max-width: 240px;
    padding: 9px 14px;
    border: 4px solid #50312a;
    background: #ffcd71;
    box-shadow: 5px 5px 0 rgba(80, 49, 42, 0.45);
    color: #50312a;
    font-size: 17px;
    font-weight: 800;
    line-height: 1.15;
    text-align: center;
    white-space: nowrap;

    @include breakpoint-height(v600) {
      bottom: 12px;
      padding: 7px 10px;
      border-width: 3px;
      font-size: 14px;
    }
  }

  .portals__box:first-child {
    @include breakpoint-height(v800) {
      padding-top: 100px;
    }

    @include breakpoint-height(v700) {
      padding-top: 90px;
    }

    @include breakpoint-height(v600) {
      padding-top: 75px;
    }

    @include breakpoint-height(v500) {
      padding-top: 63px;
    }

    &:hover {
      box-shadow: 0px -8px 40px 6px #31a9ea;
    }
  }

  .portals__box:nth-child(2) {
    padding-top: 90px;

    @include breakpoint-height(v800) {
      padding-top: 60px;
    }

    @include breakpoint-height(v700) {
      padding-top: 50px;
    }

    @include breakpoint-height(v600) {
      padding-top: 40px;
    }

    @include breakpoint-height(v500) {
      padding-top: 30px;
    }

    &:hover {
      box-shadow: 0px -8px 40px 6px #ffc284;
    }
  }

  .portals__box:nth-child(3) {
    .portals__image {
      transform: translateX(-15px);

      @include breakpoint-height(v700) {
        transform: translateX(-10px);
      }
    }

    @include breakpoint-height(v800) {
      padding-top: 100px;
    }

    @include breakpoint-height(v600) {
      padding-top: 75px;
    }

    @include breakpoint-height(v500) {
      padding-top: 65px;
    }

    &:hover {
      box-shadow: 0px -8px 40px 6px #30ffbd;
    }
  }

  .portals__box:nth-child(4) {
    padding-top: 90px;

    @include breakpoint-height(v800) {
      padding-top: 60px;
    }

    @include breakpoint-height(v700) {
      padding-top: 50px;
    }

    @include breakpoint-height(v600) {
      padding-top: 40px;
    }

    @include breakpoint-height(v500) {
      padding-top: 30px;
    }

    &:hover {
      box-shadow: 0px -8px 40px 6px #f893f8;
    }
  }

  .pixelPortal {
    width: 330px;

    @include breakpoint-height(v800) {
      width: 310px;
    }

    @include breakpoint-height(v700) {
      width: 275px;
    }

    @include breakpoint-height(v600) {
      width: 220px;
    }

    @include breakpoint-height(v500) {
      width: 180px;
    }

    @include breakpoint-height(v375) {
      width: 150px;
    }
  }

  .pixelPortal--two {
    width: 390px;

    @include breakpoint-height(v800) {
      width: 350px;
    }

    @include breakpoint-height(v700) {
      width: 300px;
    }

    @include breakpoint-height(v600) {
      width: 250px;
    }

    @include breakpoint-height(v500) {
      width: 200px;
    }

    @include breakpoint-height(v375) {
      width: 170px;
    }
  }

  .pixelPortal--three,
  .pixelPortal--four {
    width: 350px;
    transform: translateY(25px);

    @include breakpoint-height(v800) {
      width: 330px;
    }

    @include breakpoint-height(v700) {
      width: 320px;
    }

    @include breakpoint-height(v600) {
      width: 280px;
    }

    @include breakpoint-height(v500) {
      width: 220px;
    }

    @include breakpoint-height(v375) {
      width: 190px;
    }
  }

  .particle {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    opacity: 0.8;
    mix-blend-mode: screen;
  }

  .particle--red,
  .particle--purple {
    z-index: 2;
    bottom: 180px;
    animation: fireFlicker infinite ease-in-out;

    @include breakpoint-height(v700) {
      width: 8px;
      height: 8px;
    }

    @include breakpoint-height(v600) {
    }

    @include breakpoint-height(v500) {
      width: 7px;
      height: 7px;
    }
  }

  .particle--blue,
  .particle--green {
    bottom: 260px;
    animation: floatUp infinite ease-in-out;
  }

  .particle--red {
    --color-start: #ffcc00;
    --color-end: #ff4500;
    --glow-color: rgba(255, 69, 0);
  }
  .particle--purple {
    --color-start: #f080f0;
    --color-end: #b266b2;
    --glow-color: rgba(240, 128, 240);
  }
  .particle--blue {
    --color-start: rgba(0, 150, 255, 0.8);
    --glow-color: rgba(0, 150, 255);
  }
  .particle--green {
    --color-start: rgba(0, 255, 0, 0.8);
    --glow-color: rgba(0, 255, 0);
  }

  .particle--red,
  .particle--purple,
  .particle--blue,
  .particle--green {
    background: radial-gradient(
      circle,
      var(--color-start),
      var(--color-end, transparent)
    );
  }

  .particle--red,
  .particle--purple {
    box-shadow:
      0 0 10px var(--glow-color, transparent),
      0 0 20px var(--glow-color, transparent);
  }

  @keyframes fireFlicker {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    30% {
      transform: translateY(-20px) scale(1.2);
      opacity: 0.9;
    }
    60% {
      transform: translateY(-50px) scale(0.8);
      opacity: 0.6;
    }
    100% {
      transform: translateY(-70px) scale(0.5);
      opacity: 0;
    }
  }

  @keyframes floatUp {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    100% {
      transform: translateY(100px);
      opacity: 0;
    }
  }
</style>

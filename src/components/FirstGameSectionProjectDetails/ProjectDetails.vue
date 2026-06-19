<template>
  <teleport to="body">
    <div class="projectDetails projectDetails--hide" ref="projectDetails">
      <button
        type="button"
        class="projectDetails__close"
        aria-label="Close project details"
        @click="() => portalStore.closePortal()"
      >
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
      <TheImage
        imagePath="spaceshipOne.webp"
        alt="Pixel Spaceship"
        class="firstGameSection__spaceship firstGameSection__spaceship--one"
        ref="spaceship"
      />
      <TheImage
        imagePath="spaceshipTwo.webp"
        alt="Pixel Spaceship"
        class="firstGameSection__spaceship firstGameSection__spaceship--two"
        ref="spaceship"
      />
      <TheImage
        imagePath="spaceshipThree.webp"
        alt="Pixel Spaceship"
        class="firstGameSection__spaceship firstGameSection__spaceship--three"
        ref="spaceship"
      />

      <component :is="projectDetailsComponent" />
    </div>
  </teleport>
</template>

<script setup>
  import { nextTick, ref, watch } from 'vue';
  import TheImage from '../Image/TheImage.vue';
  import { useTimePortalStore } from '@/stores/portals';
  import ProjectOverview from './ProjectOverview.vue';
  import { useMoveStore } from '@/stores/move';

  const projects = {
    projectOne: ProjectOverview,
    projectTwo: ProjectOverview,
  };

  const portalStore = useTimePortalStore();
  const spaceship = ref(null);
  const projectDetails = ref(null);

  const moveStore = useMoveStore();

  const projectDetailsComponent = ref(projects.projectOne);

  watch(
    () => portalStore.activePortal,
    newVal => {
      projectDetailsComponent.value = projects[newVal] || ProjectOverview;
    }
  );

  watch(
    () => portalStore.timePortalStatus,
    async () => {
      await nextTick();
      projectDetailsMove(portalStore.timePortalStatus);
    }
  );

  const projectDetailsMove = portalStatus => {
    if (portalStatus === 'open') {
      document.body.classList.add('prevent-pointer');

      setTimeout(() => {
        projectDetails.value.classList.remove('projectDetails--hide');
      }, 1000);
      document
        .querySelectorAll('.firstGameSection__spaceship')
        .forEach(spaceship => {
          spaceship.classList.add('firstGameSection__spaceship--move');
        });

      setTimeout(() => {
        projectDetails.value.classList.add('projectDetails--move');
      }, 1700);

      setTimeout(() => {
        projectDetails.value.classList.add('projectDetails--show');
        document.body.classList.remove('prevent-pointer');
      }, 2700);
    }

    if (portalStatus === 'close') {
      projectDetails.value.classList.remove('projectDetails--move');
      document.body.classList.add('prevent-pointer');
      document
        .querySelectorAll('.firstGameSection__spaceship')
        .forEach(spaceship => {
          spaceship.classList.add('firstGameSection__spaceship--hide');
          spaceship.classList.remove('firstGameSection__spaceship--move');

          setTimeout(() => {
            spaceship.classList.remove('firstGameSection__spaceship--hide');
          }, 1500);
        });

      setTimeout(() => {
        moveStore.unlockMovement();
        moveStore.unlockSpeedChange();
        projectDetails.value.classList.remove('projectDetails--show');
        projectDetails.value.classList.add('projectDetails--hide');
        document.body.classList.remove('prevent-pointer');
      }, 1500);
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/css/_colors.scss';
  @import '@/assets/css/_breakpoints.scss';

  .projectDetails {
    position: fixed;
    width: 100vw;
    height: 100dvh;
    overflow: visible;
    z-index: 5;
    background: $c-sky-blue;
    transform: translateY(100dvh);
    bottom: 0;
    animation-delay: 5s;
    transition:
      transform 1.4s ease-in-out,
      opacity 0.2s;
    isolation: isolate;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.14) 2px, transparent 2px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.14) 2px, transparent 2px);
      background-size: 42px 42px;
      mask-image: linear-gradient(to bottom, black, transparent 88%);
      pointer-events: none;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 18px;
      z-index: -1;
      border: 2px solid rgba(255, 255, 255, 0.36);
      pointer-events: none;
    }
  }

  .projectDetails__close {
    position: fixed;
    top: 32px;
    right: 38px;
    z-index: 8;
    width: 56px;
    height: 56px;
    display: grid;
    place-items: center;
    border: 3px solid rgba(255, 255, 255, 0.78);
    padding: 0;
    background: rgba(4, 20, 38, 0.72);
    box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.25);
    font-size: 34px;
    overflow: hidden;
    cursor: pointer;
    color: #fff;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    transition: 0.4s;

    @include breakpoint-width(h1200) {
      top: 40px;
      right: 40px;
    }

    @include breakpoint-width(h600) {
      top: 20px;
      right: 20px;
      font-size: 40px;
    }
  }

  .projectDetails__close:hover {
    color: #071d35;
    background: #fff;
    text-shadow: unset;
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.3);
  }

  .firstGameSection__spaceship--move {
    animation: spaceship-move 1s linear forwards;
  }

  .projectDetails--move {
    transform: translateY(0);
  }

  .projectDetails--show {
    overflow-y: auto;
  }

  .projectDetails--hide {
    opacity: 0;
  }

  .firstGameSection__spaceship {
    position: absolute;
    width: 120px;
    z-index: 6;

    @include breakpoint-width(h1200) {
      width: 100px;
    }

    @include breakpoint-width(h800) {
      width: 80px;
    }
  }

  .firstGameSection__spaceship--hide {
    display: none;
  }

  .firstGameSection__spaceship--one {
    left: 20%;
    top: 64px;
    animation-delay: 1s;
  }

  .firstGameSection__spaceship--two {
    left: 50%;
    top: 120px;
    animation-delay: 2s;

    @include breakpoint-width(h1200) {
      left: 48%;
    }

    @include breakpoint-width(h600) {
      top: 180px;
    }
  }

  .firstGameSection__spaceship--three {
    right: 20%;
    top: 48px;
    animation-delay: 1.5s;
  }

  @keyframes spaceship-move {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100dvh);
    }
  }
</style>

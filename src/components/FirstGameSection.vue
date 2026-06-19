<template>
  <main class="firstGameSection" ref="firstGameSection">
    <div class="topAssets" ref="topAssets">
      <TheMainTitle />

      <TheImage imagePath="pixelBee.webp" alt="Pixel Bee" class="pixelBee" />

      <TheClouds />
    </div>

    <TheModal title="Instructions">
      <div class="modal__section">
        <h3>How to move?</h3>
        <p>
          If you are viewing this app from a device that has no touch screen,
          you can move around with:
        </p>
        <p>
          <span>A</span>
          or
          <span>Left Arrow Key</span>
          - Move left
        </p>
        <p>
          <span>D</span>
          or
          <span>Right Arrow Key</span>
          - Move right
        </p>
        <p>
          <span>X</span>
          - Change speed
        </p>
        <p>
          If you are viewing this app from a device that has touch screen, you
          should see a block on your screen with movement commands like this:
        </p>
        <TheImage
          imagePath="touchScreenInstructions.webp"
          alt="Touch Screen Instructions"
        />
      </div>

      <div class="modal__section">
        <h3>For phone viewers</h3>
        <p>
          It's best that you view this website in landscape mode, since this is
          a horizontal type of app. If some of the content gets cut off while
          you view the app due to native browser elements like your address bar,
          try to use portrait mode or check out my traditional portfolio.
        </p>
      </div>

      <div class="modal__section">
        <h3>Traditional version of my portfolio!</h3>
        <p>
          Depending on the screen refresh rate of the device that you are
          viewing this on and the speed of the character, your screen might look
          blurry or you might feel dizzy if you are sensitive to motion and
          things are not moving smoothly.
        </p>
        <p>
          If this happens, you can check out traditional version of my portfolio
          by clicking the button below:
        </p>
        <a
          href="https://aleksajukic.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          My Portfolio
        </a>
      </div>
    </TheModal>

    <div class="bottomAssets" ref="bottomAssets">
      <TheKeyboardInstructions v-if="!touchScreenStore.isTouchScreen" />

      <TheImage
        imagePath="pixelChest.webp"
        alt="Pixel Chest"
        class="pixelChest"
      />

      <TheChangeSpeed v-if="!touchScreenStore.isTouchScreen" />

      <TheImage imagePath="pixelDeer.webp" alt="Pixel Deer" class="pixelDeer" />
      <TheImage imagePath="pixelCat.webp" alt="Pixel Cat" class="pixelCat" />
      <TheImage imagePath="pixelBush.webp" alt="Pixel Bush" class="pixelBush" />
      <TheImage imagePath="pixelTree.webp" alt="Pixel Tree" class="pixelTree" />

      <ThePixelSign
        signClass="pixelSignProjectsDirection"
        signText="My Projects"
        altText="Pixel Sign Pointing To My Projects"
      />

      <TheImage
        imagePath="pixelRiver.webp"
        alt="Pixel River"
        class="pixelRiver"
      />
      <TheImage
        imagePath="pixelCarrot.webp"
        alt="Pixel Carrot"
        class="pixelCarrot"
      />
      <TheImage
        imagePath="pixelEmerald.webp"
        alt="Pixel Emerald"
        class="pixelEmerald"
      />
      <TheImage
        imagePath="pixelBench.webp"
        alt="Pixel Bench"
        class="pixelBench"
      />
      <TheImage
        imagePath="pixelStreetLight.webp"
        alt="Pixel Street Light"
        class="pixelStreetLight"
      />
      <TheImage
        imagePath="pixelStreetLight.webp"
        alt="Pixel Street Light"
        class="pixelStreetLight pixelStreetLight--second"
      />
      <!-- Fences -->
      <TheImage
        imagePath="pixelFence.webp"
        alt="Pixel Fence"
        class="pixelFence pixelFence--first"
      />
      <TheImage
        imagePath="pixelFence.webp"
        alt="Pixel Fence"
        class="pixelFence pixelFence--second"
      />

      <TheCharacterWithMessage
        imagePath="pixelKnight.webp"
        altText="Pixel Knight"
        characterClass="pixelKnight"
        bubbleText="You'll find the projects onward! Click on any of the portals."
        bubbleClass="knightBubble"
      />

      <TheCharacterWithMessage
        imagePath="pixelWizard.webp"
        altText="Pixel Wizard"
        characterClass="pixelWizard"
        bubbleText="Portals are immune to pixelization!"
        bubbleClass="wizardBubble"
      />

      <ThePortals />

      <div class="pixelDiamond">
        <TheImage imagePath="pixelDiamond.webp" alt="Pixel Diamond" />
      </div>

      <ThePixelSign
        signClass="pixelSignSkillsDirection"
        signText="My Skills"
        altText="Pixel Sign Pointing To My Skills"
      />

      <TheImage
        imagePath="pixelHouse.webp"
        alt="Pixel House"
        class="pixelHouse"
      />

      <TheImage
        imagePath="pixelTree.webp"
        alt="Pixel Tree"
        class="pixelTreeSecond"
      />

      <div class="fakeGround"></div>
      <div class="firstGameSection__ground"></div>
    </div>

    <ProjectDetails />
  </main>
</template>

<script setup>
  import { useTimePortalStore } from '@/stores/portals';
  import TheClouds from './FirstGameSectionAssets/TheClouds.vue';
  import ThePortals from './FirstGameSectionAssets/ThePortals.vue';
  import TheImage from './Image/TheImage.vue';
  import { nextTick, ref, watch } from 'vue';
  import ProjectDetails from './FirstGameSectionProjectDetails/ProjectDetails.vue';
  import { useMoveStore } from '@/stores/move';
  import TheKeyboardInstructions from './FirstGameSectionAssets/TheKeyboardInstructions.vue';
  import TheCharacterWithMessage from './FirstGameSectionAssets/TheCharacterWithMessage.vue';
  import ThePixelSign from './FirstGameSectionAssets/ThePixelSign.vue';
  import TheMainTitle from './FirstGameSectionAssets/TheMainTitle.vue';
  import TheChangeSpeed from './FirstGameSectionAssets/TheChangeSpeed.vue';
  import TheModal from './Modal/TheModal.vue';
  import { useTouchScreenStore } from '@/stores/isTouchScreen';

  const portalStore = useTimePortalStore();
  const moveStore = useMoveStore();
  const touchScreenStore = useTouchScreenStore();

  const bottomAssets = ref(null);
  const topAssets = ref(null);

  const firstGameSection = ref(null);

  watch(
    () => moveStore.isSecondSectionActive,
    async () => {
      await nextTick();
      console.log(moveStore.isSecondSectionActive);
      if (moveStore.isSecondSectionActive) {
        firstGameSection.value.classList.add('firstGameSection--deactivate');
      } else {
        firstGameSection.value.classList.remove('firstGameSection--deactivate');
      }
    }
  );

  watch(
    () => portalStore.timePortalStatus,
    async () => {
      await nextTick();
      alterPortal(portalStore.timePortalStatus);
    }
  );

  const alterPortal = portalStatus => {
    if (portalStatus === 'open') {
      bottomAssets.value.classList.remove('show-ground');
      bottomAssets.value.classList.add('hide-ground');
      topAssets.value.classList.remove('show-clouds');
      topAssets.value.classList.add('hide-clouds');
    }
    if (portalStatus === 'close') {
      bottomAssets.value.classList.remove('hide-ground');
      // bottomAssets.value.classList.add('show-ground');
      topAssets.value.classList.remove('hide-clouds');
      // topAssets.value.classList.add('show-clouds');
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/css/_colors.scss';
  @import '@/assets/css/_breakpoints.scss';

  .hide-clouds {
    animation: hide-clouds steps(8) 3s forwards;
  }

  .hide-ground {
    animation: hide-ground steps(9) 1.5s forwards;
    animation-delay: 0.5s;
  }

  .show-ground {
    animation: show-ground 3s steps(9) forwards;
    z-index: 1;
  }

  .show-clouds {
    animation: show-clouds 1.5s steps(8) forwards;
    z-index: 1;
  }

  @keyframes hide-clouds {
    0% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(40px);
    }
    100% {
      transform: translateY(-800px);
    }
  }

  @keyframes show-clouds {
    0% {
      transform: translateY(-800px); /* Start at hidden position */
    }
    30% {
      transform: translateY(-40px);
    }
    100% {
      transform: translateY(0); /* Return to original position */
    }
  }

  @keyframes hide-ground {
    0% {
      transform: translate(0, 0); /* Initial position */
    }
    10% {
      transform: translate(-4px, 10px); /* Slight left */
    }
    20% {
      transform: translate(6px, 20px); /* Slight right */
    }
    30% {
      transform: translate(-6px, 40px); /* Bigger shake left */
    }
    40% {
      transform: translate(8px, 60px); /* Bigger shake right */
    }
    50% {
      transform: translate(-10px, 100px); /* Sharp left */
    }
    60% {
      transform: translate(12px, 200px); /* Sharp right */
    }
    70% {
      transform: translate(-8px, 400px); /* Start falling faster */
    }
    80% {
      transform: translate(6px, 600px); /* Less shaking */
    }
    90% {
      transform: translate(-4px, 700px); /* Minimal shaking */
    }
    100% {
      transform: translate(0, 800px); /* Settled at the bottom */
    }
  }

  @keyframes show-ground {
    0% {
      transform: translate(0, 800px); /* Start at the hidden position */
    }
    10% {
      transform: translate(4px, 700px); /* Slight right */
    }
    20% {
      transform: translate(-6px, 600px); /* Slight left */
    }
    30% {
      transform: translate(6px, 400px); /* Bigger shake right */
    }
    40% {
      transform: translate(-8px, 200px); /* Bigger shake left */
    }
    50% {
      transform: translate(10px, 100px); /* Sharp right */
    }
    60% {
      transform: translate(-12px, 60px); /* Sharp left */
    }
    70% {
      transform: translate(8px, 40px); /* Start slowing down */
    }
    80% {
      transform: translate(-6px, 20px); /* Smaller shake */
    }
    90% {
      transform: translate(4px, 10px); /* Minimal shake */
    }
    100% {
      transform: translate(0, 0); /* Back to the original position */
    }
  }

  .bottomAssets {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0px;
  }

  .topAssets {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
  }

  .firstGameSection {
    height: 100dvh;
    width: 13000px;
    position: relative;
    background: $c-sky-blue;
    z-index: 3;
    transition: transform 1.5s ease-in-out;
  }

  .firstGameSection--deactivate {
    transform: translateY(-100%);
  }

  .firstGameSection__ground {
    width: 100%;
    z-index: 3;
    height: 190px;
    background-image: url('../assets/images/firstGameSectionGround.webp');
    background-repeat: repeat-x;
    position: absolute;
    bottom: 0;

    @include breakpoint-height(v700) {
      height: 160px;
    }

    @include breakpoint-height(v600) {
      height: 140px;
    }

    @include breakpoint-height(v450) {
      height: 130px;
    }

    @include breakpoint-height(v375) {
      height: 120px;
    }
  }

  .pixelBush {
    width: 200px;
    position: absolute;
    left: 1000px;
    bottom: 189px;

    @include breakpoint-height(v700) {
      bottom: 159px;
      width: 180px;
    }

    @include breakpoint-height(v600) {
      bottom: 140px;
      width: 150px;
    }

    @include breakpoint-height(v450) {
      bottom: 130px;
      width: 142px;
    }

    @include breakpoint-height(v375) {
      bottom: 119px;
    }
  }

  .pixelTree {
    width: 300px;
    position: absolute;
    left: 110px;
    bottom: 172px;

    @include breakpoint-height(v900) {
      width: 250px;
      bottom: 175px;
    }

    @include breakpoint-height(v800) {
      width: 220px;
      bottom: 177px;
    }

    @include breakpoint-height(v700) {
      width: 190px;
      bottom: 149px;
    }

    @include breakpoint-height(v600) {
      width: 140px;
      bottom: 132px;
    }

    @include breakpoint-height(v450) {
      width: 135px;
      bottom: 121px;
      left: 100px;
    }

    @include breakpoint-height(v375) {
      bottom: 111px;
    }

    @include breakpoint-width(h800) {
      left: 300px;
    }
  }

  .pixelDeer {
    width: 120px;
    z-index: 1;
    position: absolute;
    left: 400px;
    bottom: 188px;

    @include breakpoint-height(v700) {
      bottom: 158px;
      width: 110px;
    }

    @include breakpoint-height(v600) {
      bottom: 138px;
      width: 90px;
    }

    @include breakpoint-height(v450) {
      bottom: 127px;
      width: 85px;
    }

    @include breakpoint-height(v375) {
      bottom: 117px;
      width: 80px;
    }

    @include breakpoint-width(h1600) {
      left: 650px;
    }
  }

  .pixelCat {
    width: 140px;
    z-index: 2;
    position: absolute;
    left: 1500px;
    bottom: 185px;

    @include breakpoint-height(v700) {
      bottom: 156px;
      width: 130px;
    }

    @include breakpoint-height(v600) {
      bottom: 136px;
      width: 120px;
    }

    @include breakpoint-height(v450) {
      bottom: 126px;
      width: 110px;
    }

    @include breakpoint-height(v375) {
      bottom: 116px;
      width: 105px;
    }
  }

  .pixelBee {
    width: 70px;
    z-index: 1;
    position: absolute;
    left: 1200px;
    top: 50%;
    animation: bee-fly 10s steps(10) infinite;
    z-index: 5;

    @include breakpoint-height(v900) {
      left: 1050px;
    }

    @include breakpoint-height(v800) {
      left: 920px;
      width: 60px;
      top: calc(50% + 20px);
    }

    @include breakpoint-height(v700) {
      left: 840px;
      width: 50px;
      top: calc(50% + 30px);
    }

    @include breakpoint-height(v600) {
      left: 770px;
      width: 40px;
      top: calc(50% + 50px);
    }

    @include breakpoint-height(v500) {
      left: 730px;
      width: 40px;
      top: calc(50% + 75px);
    }
  }

  @keyframes bee-fly {
    0% {
      transform: translate(0, calc(-50% - 190px)) scaleX(1); /* Initial position, facing right */
    }
    49.9% {
      transform: translate(-170px, calc(-50% - 190px)) scaleX(1); /* End of first half, still facing right */
    }
    50% {
      transform: translate(-170px, calc(-50% - 190px)) scaleX(-1); /* Flip instantly */
    }
    100% {
      transform: translate(0, calc(-50% - 190px)) scaleX(-1); /* Return to the start, facing left */
    }
  }

  .pixelChest {
    width: 120px;
    position: absolute;
    z-index: 4;
    left: 1280px;
    bottom: 30px;

    @include breakpoint-height(v700) {
      bottom: 20px;
      width: 100px;
    }

    @include breakpoint-height(v600) {
      bottom: 15px;
      width: 90px;
    }

    @include breakpoint-height(v450) {
      bottom: 15px;
      width: 75px;
    }

    @include breakpoint-height(v375) {
      bottom: 13px;
      width: 70px;
    }
  }

  .pixelRiver {
    width: 160px;
    position: absolute;
    z-index: 5;
    bottom: 0px;
    left: 1950px;

    @include breakpoint-height(v700) {
      width: 135px;
    }

    @include breakpoint-height(v600) {
      width: 118px;
    }

    @include breakpoint-height(v450) {
      width: 110px;
    }

    @include breakpoint-height(v375) {
      width: 101px;
    }
  }

  .pixelFence {
    width: 200px;
    position: absolute;
    z-index: 2;
    bottom: 186px;
    left: 2200px;

    @include breakpoint-height(v700) {
      bottom: 156px;
      width: 180px;
    }

    @include breakpoint-height(v600) {
      bottom: 136px;
      width: 160px;
    }

    @include breakpoint-height(v450) {
      bottom: 127px;
    }

    @include breakpoint-height(v375) {
      bottom: 117px;
    }
  }

  .pixelFence--first {
    @include breakpoint-height(v600) {
      left: 2215px;
    }
  }

  .pixelFence--second {
    left: 2700px;
    transform: scaleX(-1);

    @include breakpoint-height(v600) {
      left: 2650px;
    }
  }

  .pixelStreetLight {
    width: 260px;
    position: absolute;
    z-index: 3;
    bottom: 130px;
    left: 2295px;

    @include breakpoint-height(v700) {
      bottom: 100px;
      width: 220px;
    }

    @include breakpoint-height(v600) {
      bottom: 90px;
      width: 200px;
    }

    @include breakpoint-height(v450) {
      bottom: 80px;
    }

    @include breakpoint-height(v375) {
      bottom: 70px;
    }
  }

  .pixelStreetLight--second {
    left: 2545px;
    transform: scaleX(-1);

    @include breakpoint-height(v700) {
      left: 2565px;
    }

    @include breakpoint-height(v600) {
      left: 2530px;
    }
  }

  .pixelBench {
    width: 170px;
    position: absolute;
    z-index: 2;
    bottom: 186px;
    left: 2462px;

    @include breakpoint-height(v700) {
      bottom: 158px;
      width: 160px;
      left: 2450px;
    }

    @include breakpoint-height(v600) {
      bottom: 138px;
      width: 140px;
      left: 2440px;
    }

    @include breakpoint-height(v450) {
      bottom: 126px;
    }

    @include breakpoint-height(v375) {
      bottom: 115px;
    }
  }

  .pixelDiamond {
    position: absolute;
    z-index: 4;
    bottom: 40px;
    left: 3750px;

    div {
      width: 60px;
    }

    @include breakpoint-height(v700) {
      bottom: 30px;

      div {
        width: 50px;
      }
    }

    @include breakpoint-height(v600) {
      bottom: 20px;

      div {
        width: 45px;
      }
    }

    @include breakpoint-height(v450) {
      bottom: 20px;

      div {
        width: 40px;
      }
    }

    @include breakpoint-height(v375) {
      bottom: 15px;
    }
  }

  .fakeGround {
    position: absolute;
    width: 270px;
    height: 190px;
    background: linear-gradient(to bottom, $c-sky-blue 30%, #333 100%);
    bottom: 0;
    z-index: 4;
    left: 6200px;

    @include breakpoint-height(v450) {
      height: 155px;
    }
  }

  .pixelHouse {
    width: 270px;
    position: absolute;
    z-index: 3;
    bottom: 186px;
    left: 6800px;

    @include breakpoint-height(v800) {
      bottom: 186px;
      width: 240px;
    }

    @include breakpoint-height(v700) {
      bottom: 156px;
      width: 240px;
    }

    @include breakpoint-height(v600) {
      bottom: 136px;
      width: 220px;
    }

    @include breakpoint-height(v450) {
      bottom: 125px;
      width: 180px;
    }

    @include breakpoint-height(v375) {
      bottom: 115px;
      width: 170px;
    }
  }

  .pixelTreeSecond {
    width: 300px;
    position: absolute;
    z-index: 3;
    bottom: 172px;
    left: 7200px;

    @include breakpoint-height(v800) {
      bottom: 175px;
      width: 250px;
    }

    @include breakpoint-height(v700) {
      bottom: 146px;
      width: 240px;
    }

    @include breakpoint-height(v600) {
      bottom: 127px;
      width: 220px;
    }

    @include breakpoint-height(v450) {
      bottom: 120px;
      width: 170px;
    }

    @include breakpoint-height(v375) {
      bottom: 110px;
      width: 160px;
    }
  }

  .pixelCarrot {
    width: 80px;
    position: absolute;
    z-index: 3;
    left: 2600px;
    bottom: 35px;
    z-index: 4;

    @include breakpoint-height(v700) {
      bottom: 25px;
      width: 70px;
    }

    @include breakpoint-height(v600) {
      bottom: 20px;
      width: 60px;
    }

    @include breakpoint-height(v450) {
      bottom: 15px;
      width: 55px;
    }

    @include breakpoint-height(v375) {
      bottom: 12px;
      width: 53px;
    }
  }

  .pixelEmerald {
    width: 50px;
    position: absolute;
    z-index: 3;
    left: 4700px;
    bottom: 45px;
    z-index: 4;

    @include breakpoint-height(v700) {
      bottom: 35px;
      width: 40px;
    }

    @include breakpoint-height(v600) {
      bottom: 25px;
      width: 35px;
    }

    @include breakpoint-height(v450) {
      bottom: 20px;
    }

    @include breakpoint-height(v375) {
      bottom: 15px;
      width: 32px;
    }
  }
</style>

<template>
  <div class="secondGameSection" ref="secondGameSection">
    <div class="bottomAssets">
      <TheGoBackUpArrows />

      <ThePixelSign
        signClass="pixelSignGoBackUpDirection"
        signText="Go back up"
        altText="Pixel Sign Pointing Back Up The Cave"
      />

      <TheImage
        imagePath="pixelWitch.webp"
        alt="Pixel Witch"
        class="pixelWitch"
      />

      <TheImage
        imagePath="pixelCastle.webp"
        alt="Pixel Castle"
        class="pixelCastle"
      />

      <TheImage
        imagePath="pixelTower.webp"
        alt="Pixel Tower"
        class="pixelTower"
      />

      <TheImage
        imagePath="pixelArrowRight.webp"
        alt="Pixel Arrow"
        class="pixelArrowRight"
      />

      <!-- <TheTimePortal /> -->

      <TheCharacterWithMessage
        imagePath="pixelDarthVader.webp"
        altText="Pixel Wizard"
        characterClass="pixelDarthVader"
        bubbleText="You'll find what Aleksa's skills are onward. Also, what am I doing here?"
        bubbleClass="darthVaderBubble"
      />

      <TheLavaSection />

      <ThePixelSign
        signClass="pixelSignAlmostDone"
        signText="Almost done"
        altText="Pixel Sign Pointing To My Projects"
      />

      <TheKnightVsAlien />

      <TheImage imagePath="pixelFrog.webp" alt="Pixel Frog" class="pixelFrog" />

      <div class="preEndingPoint"></div>

      <TheEndingSection />

      <div class="endingPoint"></div>

      <div class="ground"></div>

      <TheImage
        v-for="(coin, index) in coinsObject"
        ref="coins"
        :key="index"
        imagePath="pixelCoin.webp"
        alt="Pixel Coin"
        :class="[
          'pixelCoin',
          `pixelCoin--${index + 1}`,
          { 'active-coin': coin.isActive },
        ]"
      />
      <TheImage
        v-for="(star, index) in starObject"
        ref="stars"
        :key="index"
        imagePath="pixelStar.webp"
        alt="Pixel Star"
        :class="['pixelStar', { 'active-star': star.isActive }]"
      />
    </div>

    <TheTorches :light-torches="starObject[0].isActive" />

    <TheSkillsBoard />

    <div class="topAssets">
      <div class="ceiling"></div>
      <div class="lightExit"></div>
    </div>
  </div>
</template>

<script setup>
  import { useMoveStore } from '@/stores/move';
  import { nextTick, ref, watch } from 'vue';
  import TheImage from './Image/TheImage.vue';
  import TheTorches from './SecondGameSectionAssets/TheTorches.vue';
  import TheCharacterWithMessage from './FirstGameSectionAssets/TheCharacterWithMessage.vue';
  import ThePixelSign from './FirstGameSectionAssets/ThePixelSign.vue';
  import TheGoBackUpArrows from './SecondGameSectionAssets/TheGoBackUpArrows.vue';
  import TheLavaSection from './SecondGameSectionAssets/TheLavaSection.vue';
  import TheKnightVsAlien from './SecondGameSectionAssets/TheKnightVsAlien.vue';
  import TheEndingSection from './SecondGameSectionAssets/TheEndingSection.vue';
  import TheSkillsBoard from './SecondGameSectionAssets/TheSkillsBoard.vue';

  const moveStore = useMoveStore();
  const secondGameSection = ref(null);

  const starObject = ref([{ coordinate: -6880, isActive: false }]);

  // Define coins with specific coordinates
  const coinsObject = ref([
    { isActive: false },
    { isActive: false },
    { isActive: false },
    { isActive: false },
  ]);

  const coins = ref(null);
  const stars = ref(null);

  watch(
    () => moveStore.isSecondSectionActive,
    async () => {
      await nextTick();
      if (moveStore.isSecondSectionActive) {
        secondGameSection.value.classList.add('secondGameSection--active');
      } else {
        secondGameSection.value.classList.remove('secondGameSection--active');
      }
    }
  );

  const stopWatching = watch(
    () => moveStore.move,
    async () => {
      await nextTick();
      if (!moveStore.isSecondSectionActive) return;

      if (coins.value && coins.value.length > 0) {
        coins.value.forEach((coinRef, i) => {
          if (coinRef?.$el) {
            if (
              coinRef.$el.getBoundingClientRect().left <=
              moveStore.characterClientRect.left +
                moveStore.characterClientRect.width
            ) {
              coinsObject.value[i].isActive = true;
            }
          }
        });
      }

      if (stars.value && stars.value.length > 0) {
        stars.value.forEach((starRef, i) => {
          if (starRef?.$el) {
            if (
              starRef.$el.getBoundingClientRect().left <=
              moveStore.characterClientRect.left +
                moveStore.characterClientRect.width
            ) {
              starObject.value[i].isActive = true;
              stopWatching();
            }
          }
        });
      }
    }
  );
</script>

<style scoped lang="scss">
  @import '@/assets/css/_colors.scss';
  @import '@/assets/css/_breakpoints.scss';

  .secondGameSection {
    height: 100dvh;
    width: 17000px;
    position: absolute;
    background-color: #242424;
    z-index: 3;
    inset: 0;
    left: 4800px;
    transform: translateY(100%);
    transition:
      transform 1.5s ease-in-out,
      background-color 1.8s ease;
    overflow-y: hidden;
  }

  .secondGameSection--active {
    transform: translateY(0%);
    background-color: #131313;
  }

  .ground {
    width: 100%;
    z-index: 3;
    height: 150px;
    background-image: url('../assets/images/pixelRockGround.webp');
    background-repeat: repeat-x;
    position: absolute;
    bottom: 0;
    left: -20px;

    @include breakpoint-height(v700) {
      height: 120px;
    }
  }

  .lightExit {
    position: absolute;
    width: 300px;
    height: 150px;
    top: -95px;
    left: 1380px;
    background: radial-gradient(
      circle,
      rgba(255, 255, 200, 0.6) 10%,
      rgba(255, 255, 200, 0) 80%
    );
    filter: blur(20px);
    pointer-events: none;
  }

  .pixelCoin {
    position: absolute;
    width: 40px;
    // Coins going up and down
    animation: coinUpDown 2s infinite;
    z-index: 1000;
    transition: 0.2s;
    opacity: 1;
    bottom: 215px;

    @include breakpoint-height(v700) {
      width: 37px;
      bottom: 170px;
    }

    @include breakpoint-height(v600) {
      width: 32px;
      bottom: 162px;
    }

    @include breakpoint-height(v500) {
      width: 28px;
      bottom: 155px;
    }

    @include breakpoint-height(v450) {
      width: 25px;
      bottom: 150px;
    }
  }

  .pixelCoin.active-coin {
    opacity: 0;
  }

  .pixelCoin--1 {
    left: 2250px;
    animation-delay: 0.3s;
  }

  .pixelCoin--2 {
    left: 2390px;
    animation-delay: 0.5s;

    @include breakpoint-height(v500) {
      left: 2370px;
    }

    @include breakpoint-height(v450) {
      left: 2350px;
    }
  }

  .pixelCoin--3 {
    left: 2530px;
    animation-delay: 0.8s;

    @include breakpoint-height(v500) {
      left: 2490px;
    }

    @include breakpoint-height(v450) {
      left: 2450px;
    }
  }

  .pixelCoin--4 {
    left: 2670px;
    animation-delay: 1s;

    @include breakpoint-height(v500) {
      left: 2620px;
    }

    @include breakpoint-height(v450) {
      left: 2550px;
    }
  }

  .pixelStar {
    position: absolute;
    width: 65px;
    bottom: 220px;
    left: 2800px;
    animation: glow 0.5s infinite alternate;

    @include breakpoint-height(v700) {
      width: 60px;
      bottom: 175px;
    }

    @include breakpoint-height(v600) {
      width: 55px;
      bottom: 167px;
    }

    @include breakpoint-height(v500) {
      width: 50px;
      bottom: 160px;
      left: 2750px;
    }

    @include breakpoint-height(v450) {
      width: 45px;
      bottom: 155px;
      left: 2660px;
    }
  }

  .pixelStar.active-star {
    animation:
      glow 0.5s infinite alternate,
      starAnimation 4s forwards;
  }

  @keyframes coinUpDown {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes glow {
    0% {
      filter: drop-shadow(0 0 10px #fff);
    }
    50% {
      filter: drop-shadow(0 0 15px #fff);
    }
    100% {
      filter: drop-shadow(0 0 18px #fff);
    }
  }

  @keyframes starAnimation {
    0% {
      transform: translateX(0) translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateX(3000px) translateY(-200px) rotate(360deg);
      opacity: 0;
    }
  }

  .pixelWitch {
    position: absolute;
    width: 100px;
    top: 80px;
    left: 1850px;
    animation: bee-fly 6s steps(6) infinite;

    @include breakpoint-height(v600) {
      width: 85px;
      top: 70px;
    }

    @include breakpoint-height(v500) {
      width: 75px;
      top: 50px;
    }

    @include breakpoint-height(v450) {
      width: 65px;
      top: 30px;
    }

    @include breakpoint-height(v400) {
      top: -10px;
    }
  }

  @keyframes bee-fly {
    0% {
      transform: translate(270px, 50px) scaleX(1);
    }
    49.9% {
      transform: translate(450px, 30px) scaleX(1);
    }
    50% {
      transform: translate(450px, 30px) scaleX(-1);
    }
    100% {
      transform: translate(270px, 50px) scaleX(-1);
    }
  }

  .pixelCastle {
    position: absolute;
    width: 400px;
    bottom: 126px;
    left: 3150px;

    @include breakpoint-height(v700) {
      width: 350px;
      bottom: 99px;
    }

    @include breakpoint-height(v600) {
      width: 320px;
      bottom: 101px;
      left: 3180px;
    }

    @include breakpoint-height(v500) {
      width: 310px;
      bottom: 101px;
      left: 3200px;
    }

    @include breakpoint-height(v450) {
      width: 280px;
      bottom: 103px;
      left: 3215px;
    }

    @include breakpoint-height(v400) {
      width: 208px;
      bottom: 107px;
      left: 3240px;
    }
  }

  .pixelArrowRight {
    position: absolute;
    width: 180px;
    bottom: 52%;
    left: 1800px;
    transform: translateY(calc(-50% - 100px));
    animation: arrowRight 1.5s steps(1) infinite;

    @include breakpoint-height(v700) {
      width: 160px;
      bottom: calc(50% + 40px);
    }

    @include breakpoint-height(v600) {
      width: 135px;
      bottom: calc(50% + 50px);
    }

    @include breakpoint-height(v500) {
      width: 120px;
      bottom: calc(50% + 55px);
    }

    @include breakpoint-height(v450) {
      width: 110px;
      bottom: calc(50% + 70px);
    }
  }

  @keyframes arrowRight {
    0% {
      transform: translateX(0);
      filter: drop-shadow(0 0 10px #f9aa50);
    }
    50% {
      transform: translateX(20px);
      filter: drop-shadow(0 0 15px #f9aa50);
    }
    100% {
      transform: translateX(0);
      filter: drop-shadow(0 0 10px #f9aa50);
    }
  }

  .pixelTower {
    position: absolute;
    width: 150px;
    bottom: 136px;
    left: 4400px;

    @include breakpoint-height(v700) {
      width: 130px;
      bottom: 108px;
    }

    @include breakpoint-height(v600) {
      width: 120px;
      bottom: 109px;
    }

    @include breakpoint-height(v500) {
      width: 110px;
      bottom: 110px;
    }

    @include breakpoint-height(v450) {
      width: 100px;
      bottom: 111px;
    }

    @include breakpoint-height(v400) {
      width: 85px;
      bottom: 113px;
    }
  }

  .pixelFrog {
    position: absolute;
    width: 100px;
    bottom: 142px;
    left: 7500px;

    @include breakpoint-height(v700) {
      width: 90px;
      bottom: 113px;
    }

    @include breakpoint-height(v500) {
      width: 70px;
      bottom: 115px;
    }
  }

  .endingPoint {
    position: absolute;
    width: 55px;
    height: 55px;
    bottom: 150px;
    left: 8020px;
    //background: red;

    @include breakpoint-height(v700) {
      bottom: 120px;
    }

    @include breakpoint-width(h800) {
      left: 7975px;
    }

    @include breakpoint-width(h600) {
      left: 8085px;
    }

    @include breakpoint-width(h400) {
      left: 8070px;
    }

    @include breakpoint-both(h600, v600) {
      left: 8050px;
    }

    @include breakpoint-both(h400, v500) {
      left: 8085px;
    }

    @include breakpoint-both(h600, v450) {
      left: 8075px;
    }

    @include breakpoint-both(h400, v450) {
      left: 8100px;
    }
  }

  .preEndingPoint {
    position: absolute;
    width: 55px;
    height: 55px;
    bottom: 150px;
    left: 7800px;
    //background: red;

    @include breakpoint-height(v700) {
      bottom: 120px;
    }

    @include breakpoint-height(v600) {
      left: 7830px;
    }

    @include breakpoint-height(v500) {
      left: 7850px;
    }

    @include breakpoint-height(v450) {
      left: 7885px;
    }
  }
</style>

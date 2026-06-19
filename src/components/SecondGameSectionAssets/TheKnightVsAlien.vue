<template>
  <div class="knightVsAlien">
    <TheImage
      imagePath="pixelKnight.webp"
      alt="Pixel Knight"
      class="pixelKnight"
    />
    <TheImage
      imagePath="pixelHighHealth.webp"
      alt="Pixel Hight Healthbar"
      class="pixelHighHealth"
    />
    <TheImage
      imagePath="pixelAlien.webp"
      alt="Pixel Alien"
      class="pixelAlien"
    />
    <TheImage
      imagePath="pixelLowHealth.webp"
      alt="Pixel Low Healthbar"
      class="pixelLowHealth"
    />
  </div>
</template>

<script setup>
  import TheImage from '../Image/TheImage.vue';
</script>

<style lang="scss" scoped>
  @import '../../assets/css/breakpoints';

  .knightVsAlien {
    position: absolute;
    bottom: 257px;
    left: 7000px;
    overflow: visible;

    @include breakpoint-height(v700) {
      bottom: 215px;
    }

    @include breakpoint-height(v500) {
      bottom: 198px;
    }

    .pixelKnight {
      position: absolute;
      width: 100px;
      left: 100px;
      animation: fightLeanKnight 0.5s infinite alternate ease-in-out;

      @include breakpoint-height(v700) {
        width: 85px;
        left: 107px;
      }

      @include breakpoint-height(v500) {
        width: 70px;
        left: 110px;
      }
    }

    .pixelHighHealth {
      position: absolute;
      width: 140px;
      left: 50px;
      bottom: 18px;
      animation: healthGlow 0.7s infinite alternate;

      @include breakpoint-height(v700) {
        width: 120px;
        left: 65px;
      }

      @include breakpoint-height(v500) {
        width: 100px;
        left: 70px;
      }
    }

    .pixelAlien {
      position: absolute;
      width: 50px;
      left: 190px;
      transform: scaleX(-1);
      animation: fightLeanAlien 0.5s infinite alternate ease-in-out;
      animation-delay: 0.3s;

      @include breakpoint-height(v700) {
        width: 45px;
        left: 183px;
      }

      @include breakpoint-height(v500) {
        width: 37px;
        left: 176px;
      }
    }

    .pixelLowHealth {
      position: absolute;
      width: 140px;
      left: 200px;
      bottom: 18px;
      animation: healthGlow 0.7s infinite alternate;

      @include breakpoint-height(v700) {
        width: 120px;
        left: 195px;
      }

      @include breakpoint-height(v500) {
        width: 100px;
        left: 183px;
      }
    }
  }

  @keyframes fightLeanKnight {
    0%,
    100% {
      transform: translateX(5px) rotate(5deg);
    }
    50% {
      transform: translateX(0) rotate(0deg);
    }
  }

  @keyframes fightLeanAlien {
    0%,
    100% {
      transform: scaleX(-1) translateX(-5px) rotate(-5deg);
    }
    50% {
      transform: scaleX(-1) translateX(0) rotate(0deg);
    }
  }
</style>

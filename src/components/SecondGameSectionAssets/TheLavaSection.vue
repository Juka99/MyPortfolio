<template>
  <div class="lavaContainer">
    <TheImage imagePath="pixelLava.webp" alt="Pixel Bubble" class="pixelLava" />
    <TheImage
      imagePath="pixelLavaMonster.webp"
      alt="Pixel Lava Monster"
      class="pixelLavaMonster"
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

  .lavaContainer {
    position: absolute;
    background: #131313;
    width: 230px;
    height: 150px;
    bottom: 0;
    left: 6120px;
    z-index: 4;
    display: flex;
    align-items: flex-end;
    overflow: visible;

    @include breakpoint-height(v700) {
      height: 120px;
      width: 195px;
    }

    .pixelLowHealth {
      position: absolute;
      width: 125px;
      bottom: 15px;
      left: 70px;
      // Brightness animation
      animation: brightness 1s steps(2) infinite;

      @include breakpoint-height(v700) {
        bottom: 10px;
        left: 47px;
        width: 120px;
      }

      @include breakpoint-height(v600) {
        bottom: 9px;
        left: 60px;
        width: 100px;
      }

      @include breakpoint-height(v450) {
        bottom: 15px;
      }
    }
  }

  .pixelLava {
    width: 100%;
  }

  .pixelLavaMonster {
    position: absolute;
    width: 90px;
    bottom: 40px;
    left: 90px;
    animation: lavaMonster 1.5s steps(3) infinite;

    @include breakpoint-height(v700) {
      bottom: 35px;
      left: 75px;
      width: 75px;
    }

    @include breakpoint-height(v600) {
      bottom: 32px;
      left: 80px;
      width: 70px;
    }

    @include breakpoint-height(v450) {
      bottom: 40px;
      left: 85px;
      width: 60px;
    }
  }

  @keyframes lavaMonster {
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

  @keyframes brightness {
    0% {
      filter: brightness(1);
    }
    100% {
      filter: brightness(0.7);
    }
  }
</style>

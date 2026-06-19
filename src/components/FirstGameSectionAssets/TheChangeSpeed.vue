<template>
  <div class="changeSpeed">
    <TheImage
      imagePath="keyboard_X.webp"
      class="keyboardX"
      alt="Keyboard X Button"
    />
    <p class="changeSpeed__description">- Change speed</p>
  </div>
</template>

<script setup>
  import TheImage from '../Image/TheImage.vue';
</script>

<style lang="scss" scoped>
  @import '../../assets/css/_breakpoints.scss';

  .changeSpeed {
    position: absolute;
    bottom: 27px;
    left: 1530px;
    z-index: 4;
    display: flex;
    align-items: center;
    color: $c-white;
    font-weight: 700;
    letter-spacing: 1px;
    gap: 8px;
    font-size: 20px;

    @include breakpoint-height(v700) {
      bottom: 30px;
      font-size: 18px;
    }
  }

  .keyboardX {
    width: 70px;

    @include breakpoint-height(v700) {
      width: 50px;
    }
  }
</style>

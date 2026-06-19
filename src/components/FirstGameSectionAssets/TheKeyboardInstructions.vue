<template>
  <div class="keyboardInstructions">
    <p class="keyboardInstructions__text">
      Use arrows on your keyboard to move.
    </p>
    <div class="keyboardInstructions__boxes">
      <div class="keyboardInstructions__box">
        <div class="keyboardInstructions__images">
          <TheImage
            imagePath="keyboardArrow.webp"
            alt="Keyboard Right Arrow Key"
            class="keyboardInstructions__image keyboardInstructions__image--right"
          />
          <div class="keyboardInstructions__or">OR</div>
          <TheImage
            imagePath="keyboard_D.webp"
            alt="Keyboard D Key"
            class="keyboardInstructions__image"
          />
        </div>
        <p class="keyboardInstructions__description">- Move forward</p>
      </div>
      <div class="keyboardInstructions__box">
        <div class="keyboardInstructions__images">
          <TheImage
            imagePath="keyboardArrow.webp"
            alt="Keyboard Left Arrow Key"
            class="keyboardInstructions__image"
          />
          <div class="keyboardInstructions__or">OR</div>
          <TheImage
            imagePath="keyboard_A.webp"
            alt="Keyboard A Key"
            class="keyboardInstructions__image"
          />
        </div>
        <p class="keyboardInstructions__description">- Move backwards</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import TheImage from '../Image/TheImage.vue';
</script>

<style scoped lang="scss">
  @import '../../assets/css/_breakpoints.scss';

  .keyboardInstructions {
    position: absolute;
    z-index: 4;
    bottom: 30px;
    left: 370px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    font-size: 20px;
    color: $c-white;
    font-weight: 700;
    letter-spacing: 1px;

    @include breakpoint-height(v700) {
      bottom: 20px;
      font-size: 18px;
    }
  }

  .keyboardInstructions__boxes {
    display: flex;
    gap: 48px;
  }

  .keyboardInstructions__box {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .keyboardInstructions__images {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .keyboardInstructions__image {
    width: 65px;

    @include breakpoint-height(v700) {
      width: 50px;
    }
  }

  .keyboardInstructions__image--right {
    transform: scaleX(-1);
  }

  .keyboardInstructions__text {
    font-size: 24px;
    font-weight: 700;

    @include breakpoint-height(v700) {
      font-size: 20px;
    }
  }

  .keyboardInstructions__description {
    font-size: 20px;

    @include breakpoint-height(v700) {
      font-size: 18px;
    }
  }

  .keyboardInstructions__or {
    font-weight: bold;
  }
</style>

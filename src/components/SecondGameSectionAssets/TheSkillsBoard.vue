<template>
  <div class="board">
    <div class="languages">
      <div class="languagesRow">
        <TheImage imagePath="html.webp" alt="HTML5" class="languageImage" />
        <TheImage imagePath="scss.webp" alt="SCSS" class="languageImage" />
        <TheImage
          imagePath="javascript.webp"
          alt="JavaScript"
          class="languageImage"
        />
      </div>
      <div class="languagesRow">
        <TheImage imagePath="vue.webp" alt="Vue" class="languageImage" />
        <TheImage imagePath="react.webp" alt="React" class="languageImage" />
        <TheImage imagePath="nextjs.webp" alt="NextJS" class="languageImage" />
      </div>
    </div>
  </div>
  <h3 class="mySkillsTitle">Here's what I know</h3>
  <TheImage
    imagePath="pixelArrowUp.webp"
    alt="Pixel Arrow"
    class="pixelArrowUp"
  />
</template>

<script setup>
  import TheImage from '../Image/TheImage.vue';
</script>

<style lang="scss" scoped>
  @import '../../assets/css/breakpoints';

  .board {
    position: absolute;
    width: 700px;
    height: 300px;
    bottom: 500px;
    left: 4950px;
    box-shadow: 0 0 20px rgba(87, 87, 87, 0.7);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    @include breakpoint-height(v900) {
      bottom: 440px;
    }

    @include breakpoint-height(v800) {
      bottom: 360px;
      width: 650px;
      left: 4980px;
    }

    @include breakpoint-height(v700) {
      bottom: 260px;
      width: 600px;
      left: 5010px;
    }

    @include breakpoint-height(v600) {
      bottom: 215px;
      width: 550px;
      left: 5040px;
      height: 250px;
    }

    @include breakpoint-height(v500) {
      bottom: 200px;
      width: 500px;
      left: 5060px;
      height: 220px;
    }

    @include breakpoint-height(v450) {
      bottom: 180px;
      width: 480px;
      left: 5070px;
      height: 200px;
    }

    @include breakpoint-height(v400) {
      height: 180px;
    }

    @include breakpoint-height(v375) {
      bottom: 162px;
      width: 450px;
      left: 5078px;
      height: 150px;
      width: 430px;
    }
  }

  .mySkillsTitle {
    position: absolute;
    font-size: 90px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 4px;
    text-align: center;
    bottom: 250px;
    left: 4900px;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);

    @include breakpoint-height(v900) {
      bottom: 200px;
    }

    @include breakpoint-height(v800) {
      font-size: 80px;
      bottom: 210px;
      left: 4940px;
    }

    @include breakpoint-height(v700) {
      font-size: 63px;
      bottom: 155px;
      left: 5010px;
    }

    @include breakpoint-height(v600) {
      font-size: 52px;
      bottom: 135px;
      left: 5065px;
    }

    @include breakpoint-height(v500) {
      font-size: 45px;
      bottom: 133px;
      left: 5090px;
    }

    @include breakpoint-height(v450) {
      font-size: 37px;
      bottom: 127px;
      left: 5120px;
    }

    @include breakpoint-height(v375) {
      font-size: 26px;
      bottom: 125px;
      left: 5150px;
    }
  }

  .pixelArrowUp {
    position: absolute;
    width: 100px;
    bottom: 385px;
    left: 5250px;
    animation: arrowUp 2s steps(1) infinite;

    @include breakpoint-height(v900) {
      bottom: 335px;
    }

    @include breakpoint-height(v800) {
      width: 90px;
      bottom: 498px;
      left: 4850px;
      animation: arrowLeft 2s steps(1) infinite;
    }

    @include breakpoint-height(v700) {
      width: 80px;
      bottom: 390px;
      left: 4890px;
    }

    @include breakpoint-height(v600) {
      width: 70px;
      bottom: 320px;
      left: 4940px;
    }

    @include breakpoint-height(v500) {
      width: 60px;
      bottom: 290px;
      left: 4975px;
    }

    @include breakpoint-height(v450) {
      width: 50px;
      bottom: 265px;
      left: 4995px;
    }

    @include breakpoint-height(v400) {
      width: 45px;
      bottom: 250px;
      left: 5005px;
    }

    @include breakpoint-height(v375) {
      width: 40px;
      bottom: 220px;
      left: 5020px;
    }
  }

  @keyframes arrowUp {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes arrowLeft {
    0% {
      transform: translateX(0) rotate(90deg);
    }
    50% {
      transform: translateX(-15px) rotate(90deg);
    }
    100% {
      transform: translateX(0) rotate(90deg);
    }
  }

  .languages {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    bottom: 100px;
    gap: 60px;
    left: 5300px;
    flex-wrap: wrap;
    overflow: hidden;

    @include breakpoint-height(v500) {
      gap: 44px;
    }

    @include breakpoint-height(v450) {
      gap: 36px;
    }

    @include breakpoint-height(v375) {
      gap: 32px;
    }

    .languagesRow {
      display: flex;
      justify-content: space-around;
      width: 100%;
      overflow: hidden;
    }

    .languageImage {
      width: 85px;

      @include breakpoint-height(v800) {
        width: 70px;
      }

      @include breakpoint-height(v600) {
        width: 60px;
      }

      @include breakpoint-height(v500) {
        width: 54px;
      }

      @include breakpoint-height(v450) {
        width: 50px;
      }

      @include breakpoint-height(v375) {
        width: 39px;
      }
    }
  }
</style>

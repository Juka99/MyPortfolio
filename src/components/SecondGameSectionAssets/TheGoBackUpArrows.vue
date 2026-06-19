<template>
  <div class="arrows-container">
    <div class="arrows-container__arrow"></div>
    <div class="arrows-container__arrow"></div>
    <div class="arrows-container__arrow"></div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../assets/css/breakpoints';

  .arrows-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    position: absolute;
    left: 1520px;
    bottom: 200px;
    overflow: visible;

    @include breakpoint-height(v700) {
      bottom: 165px;
    }

    @include breakpoint-height(v600) {
      bottom: 157px;
    }
  }

  .arrows-container__arrow {
    width: 0px;
    height: 0px;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 23px solid #fff;
    animation: arrowMoveUpDown 1.5s infinite ease-in-out;

    @include breakpoint-height(v700) {
      border-left: 11px solid transparent;
      border-right: 11px solid transparent;
      border-bottom: 20px solid #fff;
    }

    @include breakpoint-height(v600) {
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 19px solid #fff;
    }
  }

  .arrows-container__arrow:nth-child(2) {
    animation-delay: 0.2s;
  }

  .arrows-container__arrow:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes arrowMoveUpDown {
    0%,
    100% {
      transform: translateY(0);
      opacity: 0.8;
      filter: brightness(5);
    }
    50% {
      transform: translateY(-10px);
      opacity: 1;
      filter: brightness(0.5);
    }
  }
</style>

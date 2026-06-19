<template>
  <h1 class="gameTitle">
    Hey, I'm
    <span class="gameTitle__highlight">Aleksa.</span>

    <span class="gameTitle__break">
      A
      <span class="gameTitle__highlight">frontend</span>
      developer.
    </span>
  </h1>
</template>

<style lang="scss" scoped>
  @import '../../assets/css/breakpoints.scss';

  .gameTitle {
    font-size: 120px;
    color: $c-white;
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 170px;
    transform: translateY(calc(-50% - 120px));
    line-height: 1.2;
    text-shadow: 0 4px 12px rgba(87, 84, 82, 0.2);

    @include breakpoint-height(v900) {
      font-size: 100px;
    }

    @include breakpoint-height(v800) {
      font-size: 80px;
    }

    @include breakpoint-height(v700) {
      font-size: 70px;
    }

    @include breakpoint-height(v600) {
      font-size: 60px;
      top: calc(50% + 20px);
    }

    @include breakpoint-height(v500) {
      font-size: 45px;
      left: 240px;
      top: calc(50% + 40px);
    }

    @include breakpoint-height(v375) {
      font-size: 40px;
      left: 260px;
      top: calc(50% + 35px);
    }

    @include breakpoint-width(h1200) {
      font-size: 90px;
      left: 160px;
    }

    @include breakpoint-width(h1100) {
      font-size: 80px;
      left: 90px;
    }

    @include breakpoint-width(h900) {
      font-size: 75px;
      left: 60px;
    }

    @include breakpoint-width(h800) {
      font-size: 55px;
      left: 60px;
    }

    @include breakpoint-width(h600) {
      width: 260px;
      font-size: 54px;
      left: 90px;
      text-align: center;
      overflow: visible;
    }

    @include breakpoint-width(h400) {
      width: 240px;
      font-size: 50px;
      left: 60px;
    }

    @include breakpoint-both(h1200, v600) {
      font-size: 60px;
    }

    @include breakpoint-both(h800, v600) {
      font-size: 55px;
    }

    @include breakpoint-both(h600, v600) {
      font-size: 43px;
    }

    @include breakpoint-both(h1200, v500) {
      font-size: 45px;
      left: 240px;
      transform: translateY(calc(-50% - 125px));
    }

    @include breakpoint-both(h800, v500) {
      font-size: 43px;
      left: 50px;
      transform: translateY(calc(-50% - 130px));
    }

    @include breakpoint-both(h600, v500) {
      font-size: 40px;
      transform: translateY(calc(-50% - 140px));
    }

    @include breakpoint-both(h600, v375) {
      transform: translateY(calc(-50% - 100px));
    }

    &__highlight {
      text-shadow: 0 0 3px $c-sky-blue-secondary;
      color: $c-sky-blue-secondary;
    }

    &__break {
      display: block;
    }
  }
</style>

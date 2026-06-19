<template>
  <div class="ending" ref="ending">
    <h2>
      Thank you for taking the time
      <br />
      to check out my work
    </h2>
    <div class="myImage">
      <TheImage
        imagePath="aleksaJukic.jpg"
        alt="Portrait of Aleksa Jukic"
        class="imageOfMe"
      />
      <p>Oh look, it's me!</p>
    </div>
    <p>Reach out to me anytime on my mail:</p>
    <p class="mailText">aleksa.jukic.web@gmail.com</p>
  </div>
</template>

<script setup>
  import TheImage from '../Image/TheImage.vue';
</script>

<style lang="scss" scoped>
  @import '../../assets/css/breakpoints';

  .ending {
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    left: 7750px;
    bottom: 150px;
    height: 800px;
    color: #fff;
    text-align: center;
    overflow: visible;
    font-size: 22px;

    @include breakpoint-height(v900) {
      bottom: 95px;
      left: 7800px;
    }

    @include breakpoint-height(v800) {
      bottom: 36px;
      left: 7850px;
      gap: 15px;
    }

    @include breakpoint-height(v700) {
      bottom: -34px;
      left: 7930px;
      gap: 10px;
      font-size: 20px;
    }

    @include breakpoint-height(v600) {
      bottom: -80px;
      left: 7950px;
      gap: 4px;
      font-size: 18px;
    }

    @include breakpoint-height(v500) {
      bottom: -107px;
      left: 7970px;
      font-size: 16px;
    }

    @include breakpoint-height(v450) {
      bottom: -133px;
      left: 7990px;
      font-size: 14px;
    }

    @include breakpoint-height(v400) {
      bottom: -148px;
    }

    @include breakpoint-height(v375) {
      bottom: -174px;
    }

    @include breakpoint-width(h800) {
      left: 7890px;
    }

    @include breakpoint-width(h600) {
      font-size: 20px;
      left: 7980px;
    }

    @include breakpoint-width(h400) {
      font-size: 17px;
      left: 7960px;
    }

    @include breakpoint-both(h800, v600) {
      left: 7950px;
    }

    @include breakpoint-both(h600, v500) {
      font-size: 17px;
    }

    @include breakpoint-both(h400, v500) {
      left: 7980px;
    }

    @include breakpoint-both(h800, v450) {
      left: 8000px;
    }

    h2 {
      font-size: 60px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 20px;
      text-shadow: 0 0 6px rgba(239, 239, 239, 1);
      line-height: 1.3;
      overflow: hidden;

      @include breakpoint-height(v900) {
        font-size: 50px;
      }

      @include breakpoint-height(v800) {
        font-size: 42px;
      }

      @include breakpoint-height(v700) {
        font-size: 30px;
      }

      @include breakpoint-height(v600) {
        font-size: 24px;
      }

      @include breakpoint-height(v500) {
        font-size: 20px;
        margin-bottom: 14px;
      }

      @include breakpoint-height(v450) {
        font-size: 18px;
        margin-bottom: 8px;
      }

      @include breakpoint-height(v375) {
        display: none;
      }

      @include breakpoint-width(h800) {
        font-size: 36px;
      }

      @include breakpoint-width(h600) {
        font-size: 30px;
        width: 350px;
      }

      @include breakpoint-width(h400) {
        font-size: 24px;
        width: 300px;
      }

      @include breakpoint-both(h600, v700) {
        font-size: 26px;
        width: 300px;
        margin-bottom: 10px;
      }

      @include breakpoint-both(h400, v700) {
        font-size: 22px;
      }

      @include breakpoint-both(h800, v600) {
        font-size: 26px;
        margin-bottom: 12px;
      }

      @include breakpoint-both(h600, v600) {
        font-size: 23px;
        width: auto;
      }

      @include breakpoint-both(h400, v600) {
        font-size: 19px;
      }

      @include breakpoint-both(h800, v500) {
        font-size: 23px;
      }

      @include breakpoint-both(h400, v500) {
        font-size: 20px;
      }

      @include breakpoint-both(h800, v450) {
        font-size: 18px;
        margin-bottom: 8px;
      }
    }

    .myImage {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 20px;

      @include breakpoint-height(v800) {
        margin-bottom: 8px;
      }

      @include breakpoint-height(v450) {
        gap: 8px;
      }

      @include breakpoint-height(v400) {
        margin-bottom: 6px;
      }

      @include breakpoint-height(v375) {
        margin-bottom: 4px;
      }

      .imageOfMe {
        width: 205px;
        border-radius: 20px;
        aspect-ratio: 3 / 4;
        overflow: hidden;
        border: 4px solid rgba(255, 255, 255, 0.9);
        box-shadow: 0 7px 18px rgba(0, 0, 0, 0.28);

        :deep(.image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 24%;
        }

        @include breakpoint-height(v800) {
          width: 180px;
        }

        @include breakpoint-height(v700) {
          width: 155px;
        }

        @include breakpoint-height(v600) {
          width: 128px;
        }

        @include breakpoint-height(v500) {
          width: 105px;
        }

        @include breakpoint-height(v450) {
          width: 90px;
        }

        @include breakpoint-height(h400) {
          width: 80px;
        }
      }

      p {
        font-size: 22px;
        font-weight: 700;
        letter-spacing: 1px;

        @include breakpoint-height(v800) {
          font-size: 19px;
        }

        @include breakpoint-height(v600) {
          font-size: 15px;
        }

        @include breakpoint-height(v450) {
          font-size: 13px;
        }

        @include breakpoint-height(h400) {
          font-size: 12px;
        }

        @include breakpoint-width(h400) {
          font-size: 18px;
        }

        @include breakpoint-both(h400, v450) {
          font-size: 13px;
        }
      }
    }

    .mailText {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 1px;
      text-shadow: 0 0 3px rgba(239, 239, 239, 1);
      position: relative;
      overflow: visible;

      @include breakpoint-height(v600) {
        font-size: 20px;
      }

      @include breakpoint-height(v500) {
        font-size: 18px;
      }

      @include breakpoint-height(v450) {
        font-size: 16px;
      }

      @include breakpoint-width(h400) {
        font-size: 21px;
      }

      @include breakpoint-both(h600, v500) {
        font-size: 19px;
      }

      @include breakpoint-both(h400, v450) {
        font-size: 19px;
      }

      &::after {
        // Line
        content: '';
        position: absolute;
        display: block;
        width: 80%;
        left: 90%;
        bottom: -24px;
        transform: translateX(-100%);
        height: 2px;
        background: #fff;
        margin: 10px 0;
        box-shadow: 0 0 6px rgba(239, 239, 239, 1);

        @include breakpoint-height(v500) {
          bottom: -20px;
        }
      }
    }
  }
</style>

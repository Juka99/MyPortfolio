<template>
  <main
    class="projectDetails__containers"
    :style="{
      '--project-accent': config.accent,
      '--project-accent-rgb': config.accentRgb,
    }"
  >
    <section class="projectDetails__left">
      <div class="projectDetails__eyebrow">
        <span>Featured project</span>
        <span class="projectDetails__project-number">
          // {{ config.number }}
        </span>
      </div>

      <div class="projectDetails__brand">
        <TheImage
          :imagePath="config.logo"
          :alt="config.logoAlt"
          class="projectDetails__logo"
          :class="config.logoClass"
        />
        <span class="projectDetails__type">{{ config.type }}</span>
      </div>

      <h2 class="projectDetails__title">{{ config.title }}</h2>
      <p class="projectDetails__description">{{ config.description }}</p>

      <div class="projectDetails__buttons">
        <button
          v-for="(button, index) in config.buttons"
          :key="button.label"
          class="projectDetails__button"
          :class="{ 'projectDetails__button--secondary': index === 1 }"
          @click="button.onClick"
        >
          <span>{{ button.label }}</span>
          <i :class="button.icon" aria-hidden="true"></i>
        </button>
      </div>

      <div class="projectDetails__status">
        <span class="projectDetails__status-light"></span>
        Live project · Ready to explore
      </div>
    </section>

    <aside class="projectDetails__right">
      <section class="projectDetails__module projectDetails__module--stack">
        <div class="projectDetails__module-heading">
          <span>01</span>
          <h3>Core stack</h3>
        </div>

        <div class="projectDetails__technologies">
          <div
            v-for="(technology, index) in config.technologies"
            :key="technology.name"
            class="projectDetails__technology"
          >
            <div class="projectDetails__technology-mark">
              <TheImage
                :imagePath="technology.icon"
                :alt="technology.iconAlt"
                class="projectDetails__technology-icon"
              />
            </div>
            <span class="projectDetails__technology-copy">
              <strong>{{ technology.name }}</strong>
              <small>{{ technology.note }}</small>
            </span>
            <span class="projectDetails__technology-index">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>
        </div>
      </section>

      <section
        class="projectDetails__module projectDetails__module--highlights"
      >
        <div class="projectDetails__module-heading">
          <span>02</span>
          <h3>Highlights</h3>
        </div>

        <ul class="projectDetails__highlights-list">
          <li
            v-for="(highlight, index) in config.highlights"
            :key="highlight.title"
            class="projectDetails__highlight"
          >
            <span class="projectDetails__highlight-index">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <span class="projectDetails__highlight-copy">
              <strong>
                <i :class="highlight.icon" aria-hidden="true"></i>
                {{ highlight.title }}
              </strong>
              <small>{{ highlight.text }}</small>
            </span>
          </li>
        </ul>
      </section>

      <div class="projectDetails__coordinate" aria-hidden="true">
        <span>PORTAL_LINK</span>
        <span>ACTIVE_{{ config.number }}</span>
      </div>
    </aside>
  </main>
</template>

<script setup>
  import TheImage from '../Image/TheImage.vue';

  defineProps({
    config: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  @import '@/assets/css/_breakpoints.scss';

  .projectDetails__containers {
    position: relative;
    width: min(1180px, calc(100% - 112px));
    min-height: 650px;
    margin: 90px auto 64px;
    padding: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;
    overflow: visible;
    color: #fff;

    &::before,
    &::after {
      content: '';
      position: absolute;
      z-index: 3;
      width: 22px;
      height: 22px;
      pointer-events: none;
    }

    &::before {
      top: -9px;
      left: -9px;
      border-top: 5px solid var(--project-accent);
      border-left: 5px solid var(--project-accent);
    }

    &::after {
      right: -9px;
      bottom: -9px;
      border-right: 5px solid var(--project-accent);
      border-bottom: 5px solid var(--project-accent);
    }
  }

  .projectDetails__left,
  .projectDetails__module,
  .projectDetails__coordinate {
    border: 2px solid rgba(255, 255, 255, 0.16);
    background: rgba(5, 23, 42, 0.82);
    box-shadow:
      10px 10px 0 rgba(0, 0, 0, 0.18),
      inset 0 0 35px rgba(var(--project-accent-rgb), 0.035);
    backdrop-filter: blur(8px);
  }

  .projectDetails__left {
    position: relative;
    padding: 54px 58px 46px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    grid-column: 1 / -1;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 7px;
      background: linear-gradient(
        90deg,
        var(--project-accent) 0 38%,
        transparent 38% 42%,
        rgba(255, 255, 255, 0.28) 42% 45%,
        transparent 45%
      );
    }

    &::after {
      content: '';
      position: absolute;
      right: -90px;
      bottom: -90px;
      width: 240px;
      height: 240px;
      border: 2px solid rgba(var(--project-accent-rgb), 0.16);
      transform: rotate(45deg);
      box-shadow:
        0 0 0 32px rgba(var(--project-accent-rgb), 0.025),
        0 0 0 64px rgba(var(--project-accent-rgb), 0.02);
      pointer-events: none;
    }
  }

  .projectDetails__eyebrow {
    width: 100%;
    margin-bottom: 34px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--project-accent);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .projectDetails__project-number {
    color: rgba(255, 255, 255, 0.5);
  }

  .projectDetails__brand {
    min-height: 108px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 12px;
  }

  .projectDetails__logo {
    width: 260px;
    min-height: 68px;
    align-items: center;

    :deep(.image) {
      max-width: 100%;
      max-height: 96px;
      object-fit: contain;
      object-position: left center;
    }
  }

  .projectDetails__logo--orbit {
    width: 108px;
  }

  .projectDetails__type {
    padding: 6px 10px;
    border-left: 3px solid var(--project-accent);
    background: rgba(var(--project-accent-rgb), 0.09);
    color: rgba(255, 255, 255, 0.74);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .projectDetails__title {
    margin: 0 0 18px;
    color: #fff;
    font-size: clamp(48px, 5vw, 76px);
    font-weight: 800;
    letter-spacing: 2px;
    line-height: 1;
    text-shadow: 5px 5px 0 rgba(var(--project-accent-rgb), 0.18);
    overflow: hidden;
  }

  .projectDetails__description {
    position: relative;
    z-index: 1;
    max-width: 630px;
    margin: 0;
    color: rgba(255, 255, 255, 0.76);
    font-size: 17px;
    line-height: 1.85;
    letter-spacing: 0.7px;
  }

  .projectDetails__buttons {
    position: relative;
    z-index: 1;
    margin-top: 34px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .projectDetails__button {
    min-width: 175px;
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 13px;
    border: none;
    border-radius: 50px;
    background: #38f9b5;
    box-shadow: 0 7px 16px rgba(0, 0, 0, 0.17);
    color: #fff;
    font: inherit;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1.5px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #59f1bc;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: translateY(1px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.16);
    }

    i {
      font-size: 18px;
    }
  }

  .projectDetails__button--secondary {
    background: #ffcd71;
    color: #fff;

    &:hover {
      background: #ffd98f;
    }
  }

  .projectDetails__status {
    position: relative;
    z-index: 1;
    margin-top: auto;
    padding-top: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.56);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.3px;
    text-transform: uppercase;
  }

  .projectDetails__status-light {
    width: 9px;
    height: 9px;
    background: var(--project-accent);
    box-shadow: 0 0 12px var(--project-accent);
    animation: status-pulse 1.8s ease-in-out infinite;
  }

  .projectDetails__right {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-rows: auto auto;
    gap: 18px;
  }

  .projectDetails__module {
    position: relative;
    padding: 30px;
    overflow: hidden;
    border-color: rgba(var(--project-accent-rgb), 0.38);
    background: linear-gradient(
      145deg,
      rgba(6, 31, 52, 0.96),
      rgba(11, 64, 82, 0.91)
    );

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 76px;
      height: 6px;
      background: var(--project-accent);
      box-shadow: 76px 0 0 rgba(var(--project-accent-rgb), 0.28);
    }

    &::after {
      content: '';
      position: absolute;
      right: -58px;
      bottom: -58px;
      width: 126px;
      height: 126px;
      border: 2px solid rgba(var(--project-accent-rgb), 0.12);
      transform: rotate(45deg);
      pointer-events: none;
    }
  }

  .projectDetails__module-heading {
    position: relative;
    z-index: 1;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 13px;

    > span {
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      border: 2px solid var(--project-accent);
      color: var(--project-accent);
      font-size: 12px;
      font-weight: 900;
    }

    h3 {
      margin: 0;
      color: #fff;
      font-size: 25px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }
  }

  .projectDetails__technologies {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }

  .projectDetails__technology {
    position: relative;
    min-height: 112px;
    padding: 18px 14px;
    display: grid;
    grid-template-columns: 46px minmax(0, 1fr);
    align-items: center;
    gap: 13px;
    border: 2px solid rgba(255, 255, 255, 0.18);
    border-bottom: 4px solid rgba(var(--project-accent-rgb), 0.72);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.11),
      rgba(255, 255, 255, 0.035)
    );
    box-shadow: inset 0 0 24px rgba(var(--project-accent-rgb), 0.035);
    color: rgba(255, 255, 255, 0.88);
    transition: border-color 160ms ease;

    &:hover {
      border-color: rgba(var(--project-accent-rgb), 0.65);
    }
  }

  .projectDetails__technology-mark {
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    border: 2px solid var(--project-accent);
    background: rgba(var(--project-accent-rgb), 0.14);
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  .projectDetails__technology-icon {
    width: 31px;
    height: 31px;
    align-items: center;
    justify-content: center;

    :deep(.image) {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .projectDetails__technology-copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 7px;

    strong {
      color: #fff;
      font-size: 15px;
      letter-spacing: 0.7px;
    }

    small {
      color: rgba(255, 255, 255, 0.5);
      font-size: 10px;
      line-height: 1.4;
      letter-spacing: 0.35px;
    }
  }

  .projectDetails__technology-index {
    position: absolute;
    top: 8px;
    right: 9px;
    color: rgba(255, 255, 255, 0.22);
    font-size: 9px;
    font-weight: 900;
  }

  .projectDetails__highlights-list {
    position: relative;
    z-index: 1;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 12px;
    list-style: none;
  }

  .projectDetails__highlight {
    min-height: 106px;
    padding: 20px;
    display: grid;
    grid-template-columns: 37px minmax(0, 1fr);
    align-items: start;
    gap: 13px;
    border: 2px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.065);
    box-shadow: inset 4px 0 0 rgba(var(--project-accent-rgb), 0.72);
  }

  .projectDetails__highlight-index {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    background: var(--project-accent);
    color: #071d35;
    font-size: 10px;
    font-weight: 900;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
  }

  .projectDetails__highlight-copy {
    display: flex;
    flex-direction: column;
    gap: 8px;

    strong {
      display: flex;
      align-items: center;
      gap: 9px;
      color: #fff;
      font-size: 16px;
      letter-spacing: 0.6px;

      i {
        color: var(--project-accent);
        font-size: 15px;
        filter: drop-shadow(0 0 6px rgba(var(--project-accent-rgb), 0.35));
      }
    }

    small {
      color: rgba(255, 255, 255, 0.82);
      font-size: 13px;
      line-height: 1.65;
      letter-spacing: 0.35px;
    }
  }

  .projectDetails__coordinate {
    grid-column: 1 / -1;
    padding: 13px 18px;
    display: flex;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.34);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1.5px;
  }

  @keyframes status-pulse {
    0%,
    100% {
      opacity: 0.45;
    }
    50% {
      opacity: 1;
    }
  }

  @include breakpoint-width(h1200) {
    .projectDetails__containers {
      width: min(960px, calc(100% - 90px));
    }

    .projectDetails__left {
      padding: 44px 40px 38px;
    }

    .projectDetails__button {
      min-width: 165px;
    }
  }

  @include breakpoint-width(h900) {
    .projectDetails__containers {
      width: min(680px, calc(100% - 72px));
      min-height: auto;
      margin: 90px auto 55px;
    }
  }

  @media (max-width: 768px) {
    .projectDetails__right {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @include breakpoint-width(h600) {
    .projectDetails__containers {
      width: calc(100% - 38px);
      margin-top: 82px;
      gap: 12px;
    }

    .projectDetails__left {
      min-height: auto;
      padding: 38px 25px 32px;
    }

    .projectDetails__eyebrow {
      margin-bottom: 25px;
      font-size: 11px;
      letter-spacing: 1.7px;
    }

    .projectDetails__brand {
      min-height: 82px;
    }

    .projectDetails__logo {
      width: 205px;
      min-height: 52px;
    }

    .projectDetails__logo--orbit {
      width: 88px;
    }

    .projectDetails__title {
      font-size: 46px;
    }

    .projectDetails__description {
      font-size: 15px;
      line-height: 1.7;
    }

    .projectDetails__buttons {
      width: 100%;
      margin-top: 26px;
    }

    .projectDetails__button {
      width: 100%;
    }

    .projectDetails__right {
      grid-template-columns: 1fr;
    }

    .projectDetails__coordinate {
      grid-column: auto;
    }

    .projectDetails__module {
      padding: 25px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .projectDetails__status-light {
      animation: none;
    }
  }
</style>

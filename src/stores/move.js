import { ref } from 'vue';
import { defineStore } from 'pinia';

const possibleSpeeds = [5.5, 7, 9, 12];
const sectionTransitionMoveDuration = 950;
const sectionTransitionMoveAmount = 400;
const sectionTransitionShiftDelays = {
  down: 700,
  up: 1000,
};
const fallSuspenseDuration = 1200;
const almostDonePauseDuration = 0;
const almostDoneJumpDuration = 850;
const almostDoneLandingDelay = 100;
const almostDoneJumpDistance = 420;
const almostDoneLeftJumpPoint = 490;
const almostDoneRightJumpPoint =
  almostDoneLeftJumpPoint - almostDoneJumpDistance;
const transitionBodyClasses = {
  down: 'character-transitioning--down',
  up: 'character-transitioning--up',
};

export const useMoveStore = defineStore('move', () => {
  const move = ref(0);
  const speed = ref(possibleSpeeds[0]);

  const endingSectionClientRect = ref(null);
  const preEndingSectionClientRect = ref(null);
  const characterClientRect = ref(null);

  const characterDropsAt = ref(0);

  const currentHeight = ref(0);
  const currentWidth = ref(0);

  const isMovementLocked = ref(false);
  const isCharacterTransitioning = ref(false);
  const isFallSuspended = ref(false);
  const isSecondSectionActive = ref(false);
  const isAlmostDoneSequenceActive = ref(false);
  const isScriptedJumping = ref(false);
  const scriptedJumpDirection = ref('right');

  const isCharacterSpeedChanging = ref(false);
  const isSpeedChangeLocked = ref(false);

  const setEndingSectionClientRect = rect => {
    endingSectionClientRect.value = rect;
  };

  const setPreEndingSectionClientRect = rect => {
    preEndingSectionClientRect.value = rect;
  };

  const setCharacterClientRect = rect => {
    characterClientRect.value = rect;
  };

  const setCurrentHeight = height => {
    currentHeight.value = height;
  };

  const setCurrentWidth = width => {
    currentWidth.value = width;
  };

  const setSpeed = () => {
    if (isSpeedChangeLocked.value) return;
    // get the index of the current speed
    const currentSpeedIndex = possibleSpeeds.indexOf(speed.value);
    // get the next speed
    const nextSpeed =
      possibleSpeeds[currentSpeedIndex + 1] || possibleSpeeds[0];
    // set the new speed
    if (!isCharacterSpeedChanging.value) {
      speed.value = nextSpeed;
      changeSpeedToggle();

      setTimeout(() => {
        changeSpeedToggle();
      }, 500);
    }
  };

  const lockSpeedChange = () => {
    isSpeedChangeLocked.value = true;
  };

  const unlockSpeedChange = () => {
    isSpeedChangeLocked.value = false;
  };

  const changeSpeedToggle = () => {
    isCharacterSpeedChanging.value = !isCharacterSpeedChanging.value;
  };

  const lockMovement = () => {
    isMovementLocked.value = true;
  };

  const unlockMovement = () => {
    isMovementLocked.value = false;
  };

  const setCharacterDropsAt = drop => {
    characterDropsAt.value = drop;
  };

  const getMovementAmount = deltaFrameScale => speed.value * deltaFrameScale;

  const startAlmostDoneJump = (direction, currentPosition) => {
    if (isAlmostDoneSequenceActive.value) return;

    scriptedJumpDirection.value = direction;
    isAlmostDoneSequenceActive.value = true;
    lockMovement();

    // Movement advances in frame-sized increments, so align the world by the
    // few remaining pixels before pausing. This makes each landing coordinate
    // the exact trigger coordinate for the return jump.
    const jumpPoint =
      direction === 'right'
        ? almostDoneLeftJumpPoint
        : almostDoneRightJumpPoint;
    move.value += jumpPoint - currentPosition;

    setTimeout(() => {
      isScriptedJumping.value = true;
      document.body.classList.add(
        'character-scripted-jump',
        `character-scripted-jump--${direction}`
      );

      // Start the world movement with the leap so the camera follows the
      // character throughout the arc instead of snapping at landing.
      move.value +=
        direction === 'right'
          ? -almostDoneJumpDistance
          : almostDoneJumpDistance;

      setTimeout(() => {
        document.body.classList.remove(
          'character-scripted-jump',
          `character-scripted-jump--${direction}`
        );

        setTimeout(() => {
          isScriptedJumping.value = false;
          isAlmostDoneSequenceActive.value = false;
          unlockMovement();
        }, almostDoneLandingDelay);
      }, almostDoneJumpDuration);
    }, almostDonePauseDuration);
  };

  const maybeStartAlmostDoneJump = direction => {
    if (
      !isSecondSectionActive.value ||
      isAlmostDoneSequenceActive.value ||
      !characterClientRect.value
    )
      return false;

    const almostDoneSign = document.querySelector('.pixelSignAlmostDone');
    if (!almostDoneSign) return false;

    // One signed coordinate is used in both directions. The left point is
    // exactly 300px from the right point, matching the scripted jump distance.
    const currentPosition =
      almostDoneSign.getBoundingClientRect().left -
      characterClientRect.value.right;
    const reachedJumpPoint =
      direction === 'right'
        ? currentPosition <= almostDoneLeftJumpPoint &&
          currentPosition > almostDoneRightJumpPoint
        : currentPosition >= almostDoneRightJumpPoint &&
          currentPosition < almostDoneLeftJumpPoint;

    if (reachedJumpPoint) {
      startAlmostDoneJump(direction, currentPosition);
      return true;
    }

    return false;
  };

  const performSectionTransition = direction => {
    const isMovingDown = direction === 'down';
    const transitionClass = transitionBodyClasses[direction];
    const shiftDelay = sectionTransitionShiftDelays[direction];
    const transitionDuration = shiftDelay + sectionTransitionMoveDuration + 120;

    isCharacterTransitioning.value = true;
    document.body.classList.add('character-transitioning', transitionClass);
    document.body.classList.toggle('second-section-active', isMovingDown);
    isSecondSectionActive.value = isMovingDown;

    setTimeout(() => {
      move.value += isMovingDown
        ? -sectionTransitionMoveAmount
        : sectionTransitionMoveAmount;
    }, shiftDelay);

    setTimeout(() => {
      isCharacterTransitioning.value = false;
      document.body.classList.remove(
        'character-transitioning',
        transitionClass
      );
      unlockMovement();
    }, transitionDuration);
  };

  const startSectionTransition = direction => {
    lockMovement();

    if (direction === 'down') {
      isFallSuspended.value = true;
      document.body.classList.add('character-fall-suspended');

      setTimeout(() => {
        isFallSuspended.value = false;
        document.body.classList.remove('character-fall-suspended');
        performSectionTransition(direction);
      }, fallSuspenseDuration);
      return;
    }

    performSectionTransition(direction);
  };

  const moveRight = (deltaFrameScale = 1) => {
    if (
      endingSectionClientRect.value.left <= characterClientRect.value.left ||
      isMovementLocked.value
    )
      return;

    // 5865 - 1600 i manje width, 6010 - 1100 i manje width, 6160 - 900 i manje width, 6175 - 400 i manje width

    if (currentWidth.value > 1600) setCharacterDropsAt(5620);

    if (currentWidth.value <= 1600 && currentWidth.value > 1100)
      setCharacterDropsAt(5862);

    if (currentWidth.value <= 1100 && currentWidth.value > 800)
      setCharacterDropsAt(6010);

    if (currentWidth.value <= 800 && currentWidth.value > 400)
      setCharacterDropsAt(6155);

    if (currentWidth.value <= 400) setCharacterDropsAt(6175);

    if (move.value <= -characterDropsAt.value && !isSecondSectionActive.value) {
      startSectionTransition('down');
      return;
    }

    if (maybeStartAlmostDoneJump('right')) return;

    move.value -= getMovementAmount(deltaFrameScale);
  };

  const moveLeft = (deltaFrameScale = 1) => {
    if (move.value >= -20 || isMovementLocked.value) return;
    //move.value += 10.5;

    if (currentWidth.value > 1600) setCharacterDropsAt(5620);

    if (currentWidth.value <= 1600 && currentWidth.value > 1100)
      setCharacterDropsAt(5862);

    if (currentWidth.value <= 1100 && currentWidth.value > 800)
      setCharacterDropsAt(6010);

    if (currentWidth.value <= 800 && currentWidth.value > 400)
      setCharacterDropsAt(6155);

    if (currentWidth.value <= 400) setCharacterDropsAt(6175);

    if (move.value >= -characterDropsAt.value && isSecondSectionActive.value) {
      startSectionTransition('up');
      return;
    }

    if (maybeStartAlmostDoneJump('left')) return;

    move.value = Math.min(move.value + getMovementAmount(deltaFrameScale), -20);
  };

  return {
    move,
    moveRight,
    moveLeft,
    lockMovement,
    unlockMovement,
    isCharacterTransitioning,
    isFallSuspended,
    isSecondSectionActive,
    isAlmostDoneSequenceActive,
    isScriptedJumping,
    scriptedJumpDirection,
    setSpeed,
    speed,
    isCharacterSpeedChanging,
    changeSpeedToggle,
    isSpeedChangeLocked,
    lockSpeedChange,
    unlockSpeedChange,
    setCurrentHeight,
    setCurrentWidth,
    setEndingSectionClientRect,
    setCharacterClientRect,
    characterClientRect,
    endingSectionClientRect,
    setPreEndingSectionClientRect,
    preEndingSectionClientRect,
  };
});

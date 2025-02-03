<script setup lang="ts">
</script>

<template>
  <div text-black class="transition-cubic WordSignInfoCard fake-background">
    <div class="transition-cubic WordSignInfo">
      <slot name="upper" />
    </div>

    <div text-white class="WordSignInfo-Detail">
      <div class="detail-pattern" />
      <slot name="lower" />
    </div>

    <div class="WordSignInfo-Cover absolute-layout">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.WordSignInfo-Detail {
  &::before {
    z-index: -1;
    content: '';
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    opacity: 0.125;
    --color: var(--theme-color);
    // background-color: #191a1a;
    background-image: linear-gradient(
        0deg,
        transparent 24%,
        var(--theme-color) 25%,
        var(--theme-color-dark) 26%,
        transparent 27%,
        transparent 74%,
        var(--theme-color) 75%,
        var(--theme-color-dark) 76%,
        transparent 77%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 24%,
        var(--color) 25%,
        var(--color) 26%,
        transparent 27%,
        transparent 74%,
        var(--color) 75%,
        var(--color) 76%,
        transparent 77%,
        transparent
      );
    pointer-events: none;
    background-size: 55px 55px;
  }

  z-index: 1;
  position: relative;
  padding: 1rem 1.5rem;
  width: 100%;
  height: 260px;
  background: rgba(var(--theme-color-rgb), 0.95);
  //   backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  .detail-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.1;
    mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
    background-image: radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px),
      radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px);
    background-position:
      0 0,
      25px 25px;
    background-size: 50px 50px;
    pointer-events: none;
  }
}

.WordSignInfoCard {
  position: relative;
  display: flex;

  left: 5%;

  width: 90%;
  height: 390px;

  flex-direction: column;
  justify-content: center;

  overflow: hidden;
  user-select: none;
  border-radius: 25px;

  filter: drop-shadow(0 0 4px var(--theme-color));
  backdrop-filter: blur(18px) saturate(180%) brightness(120%);
  //   background-image: linear-gradient(to right, var(--theme-color), var(--theme-color-dark));

  &:active {
    filter: drop-shadow(2px 2px 8px var(--theme-color));
  }
}

.WordSignInfo {
  &::before {
    content: '';
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    opacity: 0.25;
    --color: var(--theme-color);
    // background-color: #191a1a;
    background-image: linear-gradient(
        0deg,
        transparent 24%,
        var(--theme-color) 25%,
        var(--theme-color-dark) 26%,
        transparent 27%,
        transparent 74%,
        var(--theme-color) 75%,
        var(--theme-color-dark) 76%,
        transparent 77%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 24%,
        var(--color) 25%,
        var(--color) 26%,
        transparent 27%,
        transparent 74%,
        var(--color) 75%,
        var(--color) 76%,
        transparent 77%,
        transparent
      );
    background-size: 55px 55px;
  }

  position: relative;
  display: flex;

  width: 100%;
  height: 130px;

  // border-radius: 5px;
}
</style>

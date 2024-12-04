<script setup lang="ts">
import { targetDict } from '~/composables/words'
import Cat from '/svg/cat.svg'

const props = defineProps<{
  modelValue?: boolean
}>()
</script>

<template>
  <div class="WordSignInfo transition-cubic">
    <div class="WordSignInfo-Svg">
      <img :src="Cat">
    </div>

    <div class="WordSignInfo-Dictionary">
      <DictionaryDisplay :dict="targetDict" />
    </div>

    <div class="WordSignInfo-Content">
      <p class="WordSignInfo-Content-Title coffee-font">
        单词练习
      </p>
      <p class="WordSignInfo-Content-Desc">
        10/{{ targetDict.words.length }} 已学习
      </p>
      <div style="--p: 50%" class="WordSignInfo-Content-Progress">
        <div class="WordSignInfo-Content-Progress-Bg" />
        <div class="WordSignInfo-Content-Progress-Inner" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.WordSignInfo-Content-Progress {
  .WordSignInfo-Content-Progress-Bg {
    position: absolute;

    width: 100%;
    height: 100%;

    opacity: 0.25;
    border-radius: 16px;
    background-color: #fff;
  }

  .WordSignInfo-Content-Progress-Inner {
    position: absolute;

    width: var(--p);
    height: 100%;

    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0 0 4px 1px #eee;
    filter: drop-shadow(2px 2px 8px #fff);
  }
  position: relative;

  width: 90%;
  height: 8px;

  // overflow: hidden;
}

.WordSignInfo-Content {
  .WordSignInfo-Content-Title {
    color: #fff;
    font-weight: 600;
    font-size: 1.25em;
  }

  .WordSignInfo-Content-Desc {
    margin-bottom: 1em;

    color: #eee;
    opacity: 0.75;
  }
  position: relative;
  padding: 1.25rem 0;
  display: flex;

  margin-left: 10%;

  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}

.WordSignInfo-Svg {
  z-index: 1;
  position: absolute;
  display: flex;

  width: 30%;

  left: -0.5rem;
  bottom: 0;

  align-items: flex-end;

  transform: scaleX(-1);
}

.WordSignInfo-Dictionary {
  position: relative;

  top: 10%;
  left: 5%;

  width: 80px;
  height: 80%;
}

.WordSignInfo {
  &::before {
    content: '';
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    opacity: 0.5;
    border-radius: 25px;
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

  left: 5%;

  width: 90%;
  height: 120px;

  border-radius: 25px;
  background-image: linear-gradient(to right, var(--theme-color), var(--theme-color-dark));

  &:active {
    filter: drop-shadow(2px 2px 8px var(--theme-color));
  }
}
</style>

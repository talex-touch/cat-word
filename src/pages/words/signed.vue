<script setup lang="ts">
import tsParticles from '@tsparticles/vue3'
import Astronaut from '/svg/astronaut.svg'
</script>

<template>
  <div class="Signed">
    <div class="Signed-MainCard">
      <div class="Signed-MainCard-Svg">
        <img :src="Astronaut">
      </div>
      <p>你已连续学习</p>

      <h1><span>01</span>天</h1>

      <div w-full flex items-center justify-between>
        挑战 7 天不断电
        <span>1/7</span>
      </div>

      <div style="--p: 14.2%" class="Signed-MainCard-Progress">
        <div class="Signed-MainCard-Progress-Bar" />
        <div class="Signed-MainCard-Progress-Inner" />
      </div>
    </div>

    <div class="Signed-Particles">
      <vue-particles
        id="tsparticles" :options="{
          background: {
            color: {
              value: '',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#ffffff',
            },
            links: {
              color: '#ffffff',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: 'bounce',
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }"
      />
    </div>
  </div>
</template>

<style lang="scss">
.Signed-Particles {
  z-index: 0;
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  // background-color: #00000050;
}

.Signed-MainCard-Progress {
  .Signed-MainCard-Progress-Bar {
    position: absolute;

    top: 0;
    left: 0;

    width: var(--p);
    height: 100%;

    background-color: var(--theme-color);
  }
  position: relative;
  margin: 1rem 0;

  height: 20px;
  width: 100%;

  overflow: hidden;
  border-radius: 8px;
  background-color: var(--el-fill-color);
}

.Signed-MainCard {
  &-Svg {
    position: absolute;

    top: 0;
    width: 30%;

    right: 10%;

    transform: translateY(-100%);

    img {
      width: 100%;
    }
  }

  h1 {
    margin: 1rem 0;
    span {
      margin-right: 0.25rem;
      font-size: 36px;
    }
  }
  z-index: 1;
  position: relative;
  padding: 1rem;

  top: 20%;
  left: 5%;

  width: 90%;
  height: 200px;

  border-radius: 18px;
  color: var(--el-text-color-secondary);
  background-color: var(--el-bg-color-page);
}

.Signed {
  &::before {
    content: '';
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    transform: scale(1.25);
    filter: blur(1px) saturate(180%);
    opacity: 0.25;
    background:
      radial-gradient(circle farthest-side at 0% 50%, #fb1 23.5%, rgba(240, 166, 17, 0) 0) 21px 30px,
      radial-gradient(circle farthest-side at 0% 50%, #b71 24%, rgba(240, 166, 17, 0) 0) 19px 30px,
      linear-gradient(#fb1 14%, rgba(240, 166, 17, 0) 0, rgba(240, 166, 17, 0) 85%, #fb1 0) 0 0,
      linear-gradient(
          150deg,
          #fb1 24%,
          #b71 0,
          #b71 26%,
          rgba(240, 166, 17, 0) 0,
          rgba(240, 166, 17, 0) 74%,
          #b71 0,
          #b71 76%,
          #fb1 0
        )
        0 0,
      linear-gradient(
          30deg,
          #fb1 24%,
          #b71 0,
          #b71 26%,
          rgba(240, 166, 17, 0) 0,
          rgba(240, 166, 17, 0) 74%,
          #b71 0,
          #b71 76%,
          #fb1 0
        )
        0 0,
      linear-gradient(90deg, #b71 2%, #fb1 0, #fb1 98%, #b71 0%) 0 0 #fb1;
    background-size: 40px 60px;
  }
  position: relative;
  padding: 1rem;

  height: 100%;
}
</style>

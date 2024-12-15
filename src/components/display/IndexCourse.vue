<script setup lang="ts">
import Image1 from '/course/1.png'
import Image2 from '/course/2.png'
import Image3 from '/course/3.png'
import Image4 from '/course/4.png'

const courses = [
  {
    title: '懂你英语',
    type: '综合系统课',
    img: Image1,
  },
  {
    title: '英语基础',
    type: '基础系统课',
    img: Image2,
  },
  {
    title: '英语进阶',
    type: '进阶系统课',
    img: Image3,
  },
  {
    title: '英语阅读',
    type: '阅读系统课',
    img: Image4,
  },
]
</script>

<template>
  <div class="DisplayIndexCourse">
    <div flex items-center justify-between class="DisplayIndexCourse-Header">
      <p class="title">
        精品课
      </p>
      <div flex items-center gap-1 text-sm op-75 class="end">
        已完成
        <div i-carbon-chevron-right />
      </div>
    </div>

    <div class="DisplayIndexCourse-Main">
      <el-scrollbar>
        <div h-full flex class="DisplayIndexCourse-MainInner">
          <div v-for="course in courses" :key="course.title" flex-shrink-0 class="DisplayIndexCourse-MainItem">
            <div class="DisplayIndexCourse-MainItem-Background">
              <img :src="course.img">
            </div>

            <div flex items-center justify-between p-2 class="DisplayIndexCourse-MainItem-Title">
              <p>{{ course.title }}</p>
              <p op-75>
                {{ course.type }}
              </p>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss">
.DisplayIndexCourse-MainItem-Title {
  font-size: 12px;
}

.DisplayIndexCourse-MainItem {
  .DisplayIndexCourse-MainItem-Background {
    img {
      position: absolute;

      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      object-fit: cover;
    }
    position: relative;

    // top: 1rem;
    // left: 1rem;

    width: 100%;
    height: 120px;

    overflow: hidden;

    border-radius: 12px;
    border: 1px solid var(--el-border-color);
  }
  position: relative;
  padding: 1rem;

  width: 70%;
  height: 100%;
}

.DisplayIndexCourse-MainInner {
  height: 200px;
}

.DisplayIndexCourse-Main {
  position: relative;

  width: 100%;
  height: 100%;
}

.DisplayIndexCourse {
  position: relative;
  padding: 1rem;
  margin: 1rem 0;

  // height: 200px;
}
</style>

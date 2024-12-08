<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { Card, NavBar, Sidebar, SidebarItem } from 'vant'

const router = useRouter()

function onClickLeft() {
  router.back()
}
</script>

<template>
  <div class="SpeechPage">
    <NavBar title="口语化学习" left-text="返回" left-arrow w-full @click-left="onClickLeft" />

    <div class="SpeechPage-Main">
      <p class="SpeechPage-Main-Article">
        <el-text>
          &nbsp;&nbsp;Last night, I was in a hotel room. I was alone. The doorbell rang. I opened the door. It was my
          brother.
          What surprised me was that he was not wearing a mask. Suddenly, I felt a sharp pain in my chest.
          I was shocked. I looked at my brother. He was holding a knife. He said, "I have killed you."
          I was shocked again. I looked at my brother. He was holding a knife. He said, "I have killed you."
          It's my brother. A man. A man who killed me. Then, I woke up. It was a dream. I still remember the pain.
          Now I'm safe.
        </el-text>
      </p>
      <p my-2 class="SpeechPage-Main-Translation">
        <el-text>
          &nbsp;&nbsp;昨晚，我在酒店房间里。 我一个人。 门铃响了。 我打开门。 是我的兄弟。
          令我惊讶的是，他没有戴口罩。 突然，我感到胸部剧烈疼痛。
          我很震惊。 我看着我的兄弟。 他拿着刀。 他说：“我杀了你。”
          我再次感到震惊。 我看着我的兄弟。 他拿着刀。 他说：“我杀了你。”
          是我的兄弟。 一个男人。 一个杀了我的男人。 然后，我醒了。 这是一个梦。 我仍然记得痛苦。
          现在我很安全。
        </el-text>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.SpeechPage-Main {
  padding: 1rem;
}

.SpeechPage {
  position: relative;
  display: flex;

  width: 100%;
  height: 100%;

  align-items: center;
  flex-direction: column;

  // background-color: var(--el-bg-color-page);
}
</style>

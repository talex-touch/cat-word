<script setup>

</script>

<template>
  <div class="PersonalPage">
    <header class="header">
      <div class="header-img">
        <img src="http://q1.qlogo.cn/g?b=qq&nk=3397743231&s=100">
      </div>
      <div class="header-content">
        <p class="name">
          Test Account
        </p>
        <p>爱学习的猫咪</p>
      </div>
    </header>
    <main class="main">
      <section class="about-me">
        <h2>关于我</h2>
        <p>{{ aboutMe }}</p>
      </section>
      <section class="skills">
        <h2>技能</h2>
        <ul>
          <li v-for="skill in skills" :key="skill">
            {{ skill }}
          </li>
        </ul>
      </section>
      <section class="projects">
        <h2>项目</h2>
        <ul>
          <li v-for="project in projects" :key="project.name">
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
          </li>
        </ul>
      </section>
      <section class="contact">
        <h2>联系我</h2>
        <p>邮箱：{{ email }}</p>
        <p>电话：{{ phone }}</p>
      </section>
    </main>
    <footer class="footer">
      <p>版权所有 &copy; QuotaWish</p>
    </footer>
  </div>
</template>

<style lang="scss">
.PersonalPage {
  .header {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background-color: var(--theme-color);
      z-index: -1;
    }

    .header-img {
      width: 72px;
      height: 72px;

      overflow: hidden;
      border-radius: 50%;

      border: 1px solid var(--el-border-color);
    }
    .header-content {
      display: flex;

      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;

      p.name {
        font-size: 20px;
        font-weight: 600;
      }
    }
    position: relative;
    padding: 2rem 1rem;
    display: flex;

    gap: 1rem;
    align-items: center;
  }

  width: 100%;
  height: 100%;
}

.header {
  text-align: center;
  padding: 50px 0;
}

.main {
  padding: 50px 0;
}

.about-me,
.skills,
.projects,
.contact {
  margin-bottom: 50px;
}

.footer {
  text-align: center;
  padding: 20px 0;
}
</style>

<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 class="title error-title">
          ERROR  500
        </h1>
        <div class="split error-split"></div>
        <h1 class="title">
          <span class="icon">
            <i class="mdi mdi-emoticon-sad"></i>
          </span>
          运气不错哟，您一不小心找到了未知领域
        </h1>
        <h2 class="subtitle mt-3">
          看起来系统出了点状况，工程师要被罚站啦
        </h2>
        <router-link class="button" to="/" >
          返回首页
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
</script>
<style scoped>
  .error-title {
    font-size: 80px;
  }
  .error-split {
    background-color: #a779e9;
    width: 4rem;
    height: .25rem;
    margin-top: .75rem;
    margin-bottom: .75rem;
  }
</style>

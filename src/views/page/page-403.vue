<template>
  <section class="hero is-info is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 class="title error-title">
          ERROR  403
        </h1>
        <div class="split error-split"></div>
        <h1 class="title">
          <span class="icon">
            <i class="mdi mdi-emoticon-sad"></i>
          </span>
          很抱歉，您没有权限访问这个页面
        </h1>
        <h2 class="subtitle mt-3">
          如需访问，请联系管理员给您开通权限
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

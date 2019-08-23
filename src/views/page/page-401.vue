<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 class="title error-title">
          ERROR  401
        </h1>
        <div class="split error-split"></div>
        <h1 class="title">
          <span class="icon">
            <i class="mdi mdi-emoticon-sad"></i>
          </span>
          很抱歉，您的登录信息已经失效
        </h1>
        <h2 class="subtitle mt-3">
          请点击下面的按钮返回登录页重新登录
        </h2>
        <router-link class="button" to="/login" >
          返回登录
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

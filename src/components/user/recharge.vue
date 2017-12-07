<template>
    <div>
      <div class="field is-grouped">
        <p class="control is-expanded has-icon">
          <input class="input is-success" placeholder="Username" value="alexsmith" type="text">
    <span class="icon is-small">
      <i class="fa fa-check"></i>
    </span>
        </p>
        <p class="control is-expanded has-icon">
          <input class="input is-warning" placeholder="Email" value="alex@smith.com" type="email">
    <span class="icon is-small">
      <i class="fa fa-warning"></i>
    </span>
        </p>
        <p class="control is-expanded is-loading">
          <input class="input" placeholder="Name" type="email">
        </p>
      </div>
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">From</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <input class="input" placeholder="Name" type="text">
            </p>
          </div>
          <div class="field">
            <p class="control is-expanded has-icon has-icon-right">
              <input class="input is-success" placeholder="Email" value="alex@smith.com" type="email">
        <span class="icon is-small">
          <i class="fa fa-check"></i>
        </span>
            </p>
            <p class="help is-success">This email is correct</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                payInfo: {
                    balance: 10,
                    recharge: 100,
                    payType: 'alipay'
                }
            };
        }
    };
</script>
<style>

</style>

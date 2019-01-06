<template>
  <div>
    <div class="nav menu mb-3">
      <div class="nav-left">
        <a class="nav-item is-tab"><b-icon icon="plus-circle-outline" class="icon-btn"></b-icon></a>
        <a class="nav-item is-tab">
		  <span class="icon-btn is-info">
			<i class="fa fa-print"></i>
		  </span>
        </a>
        <a class="nav-item is-tab">
		  <span class="icon-btn thin">
			<i class="fa fa-lock"></i>
		  </span>
        </a>
        <div class="nav-item">
          <router-link to="/backend/system/add"
                       exact class="button is-primary is-tab">
            <b-icon icon="plus-circle-outline"></b-icon>
            <span>新增</span>
          </router-link>
        </div>

        <div class="nav-item is-tab">
          <strong>2 items selected</strong>
        </div>
      </div>
      <div class="nav-right is-hidden-mobile">
        <a class="nav-item is-tab">Name</a>
        <a class="nav-item is-tab">Size</a>
        <a class="nav-item is-tab">Views</a>
        <a class="nav-item"><span class=" button is-success">Uploaded</span></a>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column">
        <div class="box notification is-primary">
          <div class="heading">Top Seller Total</div>
          <div class="title">56,950</div>
          <div class="level">
            <div class="level-item">
              <div class="">
                <div class="heading">Sales $</div>
                <div class="title is-5">250K</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Overall $</div>
                <div class="title is-5">750K</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Sales %</div>
                <div class="title is-5">25%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box notification is-warning">
          <div class="heading">Revenue / Expenses</div>
          <div class="title">55% / 45%</div>
          <div class="level">
            <div class="level-item">
              <div class="">
                <div class="heading">Rev Prod $</div>
                <div class="title is-5">30%</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Rev Serv $</div>
                <div class="title is-5">25%</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Exp %</div>
                <div class="title is-5">45%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box notification is-info">
          <div class="heading">Feedback Activity</div>
          <div class="title">78% &uarr;</div>
          <div class="level">
            <div class="level-item">
              <div class="">
                <div class="heading">Pos</div>
                <div class="title is-5">1560</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Neg</div>
                <div class="title is-5">368</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Pos/Neg %</div>
                <div class="title is-5">77% / 23%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box notification is-danger">
          <div class="heading">Orders / Returns</div>
          <div class="title">75% / 25%</div>
          <div class="level">
            <div class="level-item">
              <div class="">
                <div class="heading">Orders $</div>
                <div class="title is-5">425K</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Returns $</div>
                <div class="title is-5">106K</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Success %</div>
                <div class="title is-5">+ 28,5%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        region: '370832'
      }
    }
  }
</script>

<style scoped>

</style>

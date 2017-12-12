<template>
  <nav class="navbar is-light">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
      </a>
      <div class="navbar-burger burger" data-target="navMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navMenu" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="https://bulma.io/">
          Home
        </a>
        <a class="navbar-item" href="https://bulma.io/"  v-for="system in systems">
          {{system.name}}
        </a>
        <div class="navbar-item is-hoverable" v-if="groupSystems.length > 0">
          <a class="navbar-link">
            更多
          </a>
          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item" href="/documentation/overview/start/"  v-for="system in groupSystems">
              {{system.name}}
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms">
              <span class="icon">
                <i class="fa fa-twitter"></i>
              </span>
              <span>
                Tweet
              </span>
              </a>
            </p>
            <p class="control">
              <a class="button is-primary" href="https://github.com/jgthms/bulma/archive/0.5.1.zip">
              <span class="icon">
                <i class="fa fa-download"></i>
              </span>
                <span>Download</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
    export default {
        data() {
            return {
              systems: [],
              groupSystems: []
            };
        },
        mounted() {
          var systemArray = [];
          var groupSystem = [];
          this.$store.getters.systems.forEach(function(item, index, input) {
            if (index < 5) {
              systemArray.push(item);
            } else {
              groupSystem.push(item);
            }
          });
          this.systems = systemArray;
          this.groupSystems = groupSystem;
          if (systemArray.length > 0) {
            this.$store.commit('ACTIVE_SYSTEM', systemArray[0].sysIdentifier)
          }
        }
    };
</script>


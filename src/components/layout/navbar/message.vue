<template>
  <div class="dropdown-content">
    <div class="dropdown-item has-text-centered">
      <p><strong>9 New</strong></p>
      <p>User Notifications</p>
    </div>
    <hr class="dropdown-divider">
    <div class="dropdown-item">
      <b-tabs size="is-small">
        <b-tab-item label="Alerts">
          <div class="list-timeline list-timeline--skin-light">
            <div class="list-timeline-items">
              <div class="list-timeline-item">
                          <span
                              class="list-timeline-badge list-timeline-badge--state-success"></span>
                <span class="list-timeline-text is-size-7">
                            12 new users registered
                          </span>
                <span class="list-timeline-time">
                            Just now
                          </span>
              </div>
              <div class="list-timeline-item">
                <span class="list-timeline-badge"></span>
                <span class="list-timeline-text">
                            System shutdown
                            <span class="m-badge m-badge--success m-badge--wide">
                              pending
                            </span>
                          </span>
                <span class="list-timeline-time">
                            14 mins
                          </span>
              </div>
              <div class="list-timeline-item">
                <span class="list-timeline-badge"></span>
                <span class="list-timeline-text">
                              New invoice received
                            </span>
                <span class="list-timeline-time">
                            20 mins
                          </span>
              </div>
              <div class="list-timeline-item">
                <span class="list-timeline-badge"></span>
                <span class="list-timeline-text">
                            DB overloaded 80%
                            <span class="tag is-primary">settled</span>
                          </span>
                <span class="list-timeline-time">
                            1 hr
                          </span>
              </div>
              <div class="list-timeline-item">
                <span class="list-timeline-badge"></span>
                <span class="list-timeline-text">
                            System error -
                            <a href="#" class="m-link">
                              Check
                            </a>
                          </span>
                <span class="list-timeline-time">
                            2 hrs
                          </span>
              </div>
            </div>
          </div>
        </b-tab-item>

        <b-tab-item label="Events">
          <div class="has-text-centered">
                      <span class="">
                        All caught up!
                        <br>
                        No new logs.
                      </span>
          </div>

        </b-tab-item>

        <b-tab-item label="Logs">
          <div class="has-text-centered">
                      <span class="">
                        All caught up!
                        <br>
                        No new logs.
                      </span>
          </div>
        </b-tab-item>
      </b-tabs>

    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {}
    }
  }
</script>

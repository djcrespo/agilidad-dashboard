<template>
  <aside class="aside is-placed-right">
    <div ref="container" class="aside-container" @mouseenter="psUpdate">
      <aside-updates @data-updated="psInit" />
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import PerfectScrollbar from 'perfect-scrollbar'

export default {
  name: 'AsideRight',
  computed: {
    ...mapState([
      'isAsideRightVisible'
    ])
  },
  methods: {
    psInit () {
      this.ps = new PerfectScrollbar(this.$refs.container)
    },
    psUpdate () {
      if (this.ps) {
        this.ps.update()
      }
    }
  }
}
</script>

<template>
  <div class="container my-2">
    <!-- Main container -->
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item" />
      </div>

      <!-- Right side -->
      <div class="level-right">
        <div class="level-item">
          <b-button
            class="is-success"
            icon-left="plus"
            @click="activeModal = true"
          >
            Nuevo registro
          </b-button>
        </div>
      </div>
    </nav>
    <div class="columns">
      <div class="column">
        <status-generator-table
          :refresh="actionRefresh"
          @reset="actionRefresh = false"
        />
      </div>
    </div>
    <new-status-generator
      :is-active="activeModal"
      @close="refresh"
    />
  </div>
</template>

<script>
export default {
  name: 'StatusGenerator',
  fetch () {
    this.$store.commit('setTitleStack', ['Estados en las generadoras'])
  },
  data () {
    return {
      query: {},
      activeModal: false,
      actionRefresh: false
    }
  },
  methods: {
    refresh () {
      console.log('refrescar')
      this.actionRefresh = true
      this.activeModal = false
    }
  },
  head () {
    return {
      title: 'Estados (generadoras)'
    }
  }
}
</script>

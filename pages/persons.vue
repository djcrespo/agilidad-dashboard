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
            Nuevo persona
          </b-button>
        </div>
        <!--
        <div class="level-item">
          <b-button
            class="is-success is-light"
            icon-left="file-excel"
          >
            Descargar registros
          </b-button>
        </div>
        -->
      </div>
    </nav>
    <div class="columns">
      <div class="column">
        <persons-table
          :refresh="actionRefresh"
          @reset="actionRefresh = false"
        />
      </div>
    </div>
    <new-person
      :is-active="activeModal"
      @close="refresh"
    />
  </div>
</template>

<script>
export default {
  name: 'Persons',
  fetch () {
    this.$store.commit('setTitleStack', ['Personal'])
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
      this.actionRefresh = true
      this.activeModal = false
    }
  },
  head () {
    return {
      title: 'Personal'
    }
  }
}
</script>

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
        <div class="levObjetoel-item">
          <b-button
            class="is-success is-light"
            icon-left="file-excel"
          >
            Descargar registros
          </b-button>
        </div>
      </div>
    </nav>
    <div class="columns">
      <div class="column">
        <company-table
          :refresh="refreshTable"
          @reset="refreshTable = false"
        />
      </div>
    </div>
    <new-company
      :is-active="activeModal"
      @close="refresh"
    />
  </div>
</template>

<script>
export default {
  name: 'Companies',
  fetch () {
    this.$store.commit('setTitleStack', ['Estimaciones'])
  },
  data () {
    return {
      query: {},
      activeModal: false,
      refreshTable: false
    }
  },
  methods: {
    refresh () {
      this.refreshTable = true
      this.activeModal = false
    }
  },
  head () {
    return {
      title: 'Compañias'
    }
  }
}
</script>

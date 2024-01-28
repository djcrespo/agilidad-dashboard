<template>
  <div class="container my-2">
    <div class="columns">
      <div class="column">
        <b-notification
          type="is-info is-light"
          has-icon
          :closable="false"
        >
          Encontrarás todos los <strong>projectos</strong> que se encuentran en etapa de <strong>licitación</strong>.
        </b-notification>
      </div>
    </div>

    <div class="level">
      <div class="level-left">
        <div class="level-item" />
      </div>
      <div class="level-right">
        <div class="level-item" />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <licitacion-table
          :refresh="actionRefresh"
          @reset="actionRefresh = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Licitations',
  data () {
    return {
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
      title: 'Licitaciones'
    }
  }
}
</script>

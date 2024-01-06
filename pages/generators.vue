<template>
  <div class="container my-2">
    <div class="columns">
      <div class="column">
        <b-notification
          type="is-info is-light"
          aria-close-label="Close notification"
          :closable="false"
          has-icon
        >
          Aquí podrás visualizar los <strong>números generadores</strong>,
          <strong>catálogo de conceptos por proyectos</strong> y las
          <strong>personas</strong> asignadas al proyecto.
        </b-notification>
      </div>
    </div>
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item" />
      </div>

      <!-- Right side -->
      <div class="level-right">
        <!--
        <div class="level-item">
          <b-button
            class="is-success"
            icon-left="plus"
            @click="activeModal = true"
          >
            Nuevo registro
          </b-button>
        </div>
        <div class="level-item">
          <b-button class="is-success is-light" icon-left="file-excel">
            Descargar registros
          </b-button>
        </div>
        -->
      </div>
    </nav>
    <div class="columns">
      <div class="column">
        <generators-table
          :refresh="actionRefresh"
          @reset="actionRefresh = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Generators',
  fetch () {
    this.$store.commit('setTitleStack', ['Generadoras'])
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
      title: 'Generadoras'
    }
  }
}
</script>

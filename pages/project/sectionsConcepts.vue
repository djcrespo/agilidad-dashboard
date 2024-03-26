<template>
  <div class="m-2">
    <div>
      <b-notification
        type="is-info is-light"
        aria-close-label="Close notification"
        :closable="false"
      >
        Aquí encontrarás las <strong>partidas</strong> de conceptos asignados a este proyecto.
        Cada proyecto tiene su
        <strong>propio</strong> catálogo.
      </b-notification>
    </div>
    <br>
    <!-- Main container -->
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <b-button @click="returnPage">
            <strong>Regresar</strong>
          </b-button>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <div class="level-item">
          <b-button
            class="is-success"
            icon-left="plus"
            @click="isActive = true"
          >
            Nueva partida
          </b-button>
        </div>
        <div class="level-item">
          <b-button class="is-success is-light" icon-left="file-excel">
            Descargar registros
          </b-button>
        </div>
      </div>
    </nav>
    <div>
      <sections-table
        :id-project="id"
        :refresh="actionRefresh"
        @reset="actionRefresh = false"
      />
      <new-section
        :is-active="isActive"
        :id-project="id"
        @close="refresh"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionsProject',
  data () {
    return {
      id: '',
      concepts: [],
      isActive: false,
      actionRefresh: false
    }
  },
  mounted () {
    this.id = this.$route.query.id_project
  },
  methods: {
    refresh () {
      this.actionRefresh = true
      this.isActive = false
    },
    returnPage () {
      this.$router.push({
        path: '/project/conceptsProject',
        query: {
          id_project: this.id
        }
      })
    }
  }
}
</script>

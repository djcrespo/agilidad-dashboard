<template>
  <div class="m-2">
    <div>
      <b-notification
        type="is-info is-light"
        aria-close-label="Close notification"
        :closable="false"
      >
        Aquí encontrarás el catálogo de conceptos capturados por la persona
        asginada a este proyecto. Cada proyecto tiene su
        <strong>propio</strong> catálogo.
      </b-notification>
    </div>
    <br>
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
            @click="isActive = true"
          >
            Nuevo concepto
          </b-button>
        </div>
        <div class="level-item">
          <b-button
            class="is-success"
            icon-left="format-list-bulleted"
            @click="pushSections"
          >
            Secciones del catálogo
          </b-button>
        </div>
        <div class="level-item">
          <b-button
            class="is-success is-light"
            icon-left="file-excel"
          >
            Descargar registros
          </b-button>
        </div>
      </div>
    </nav>
    <div>
      <new-concept
        :id-project="id"
        :is-active="isActive"
        @close="isActive = false"
        @save="refreshView"
      />
      <concepts-project-table
        :id-project="id"
        :refresh="refreshTable"
        @reset="refreshTable = false"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConceptsProject',
  data () {
    return {
      id: '',
      concepts: [],
      isActive: false,
      refreshTable: false
    }
  },
  mounted () {
    this.id = this.$route.query.id_project
    console.log(this.id)
  },
  methods: {
    pushSections () {
      // console.log('secciones')
      this.$router.push({
        path: '/project/sectionsConcepts',
        query: {
          id_project: this.id
        }
      })
    },
    refreshView () {
      this.isActive = false
      this.refreshTable = true
    }
  }
}
</script>

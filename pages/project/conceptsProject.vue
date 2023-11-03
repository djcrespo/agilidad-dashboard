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
          <b-button class="is-success is-light" icon-left="file-excel">
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
      <!--
      <concepts-project-table
        :id-project="id"
        :refresh="refreshTable"
        @reset="refreshTable = false"
      />
      -->
      <div v-if="data" class="container">
        <div v-for="section in sections" :key="section.section.id">
          <concepts-section-table
            :section-object="section"
            @refresh="refreshView"
          />
        </div>
      </div>
      <div v-else class="message">
        <b-notification
          type="is-warning is-light"
          :closable="false"
        >
          No hay registros
        </b-notification>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConceptsProject',
  data () {
    return {
      id: '',
      query: {
        limit: 1,
        project: ''
      },
      sections: [],
      isActive: false,
      refreshTable: false,
      data: null
    }
  },
  mounted () {
    this.id = this.$route.query.id_project
    this.getSectionsProject()
  },
  methods: {
    pushSections () {
      // console.log('secciones')
      this.$router.push({
        path: '/project/sectionsConcepts',
        query: {
          id_project: this.$route.query.id_project
        }
      })
    },
    refreshView () {
      this.isActive = false
      this.data = null
      this.sections = []
      this.getSectionsProject()
    },
    async getSectionsProject () {
      try {
        this.query.project = this.id
        const res = await this.$store.dispatch(
          'modules/concepts/getConceptsProjectById',
          this.query
        )
        this.data = res.results[0]
        this.sections = this.data.sections_concept
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <div class="container my-2">
    <div class="columns">
      <div class="column">
        <b-notification
          type="is-info is-light"
          aria-close-label="Close notification"
          :closable="false"
        >
          Aquí encontrarás las estimaciones por <strong>proyecto</strong>.
        </b-notification>
      </div>
    </div>
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
          <b-button class="is-success is-light" icon-left="file-excel">
            Descargar registros
          </b-button>
        </div>
      </div>
    </nav>
    <div class="columns">
      <div class="column" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EstimationsProject',
  data () {
    return {
      idProject: null,
      query: {
        limit: 10,
        search: ''
      }
    }
  },
  mounted () {
    this.idProject = this.$route.query.id_project
    this.query.search = this.idProject
    this.getEstimationsProject()
  },
  methods: {
    returnPage () {
      this.$router.push({
        path: '/estimations'
      })
    },
    async getEstimationsProject () {
      try {
        const res = await this.$store.dispatch('modules/estimations/getAllEstimations', this.query)
        console.log(res.results)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

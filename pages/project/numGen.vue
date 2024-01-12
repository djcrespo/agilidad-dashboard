<template>
  <div class="m-2">
    <div>
      <b-notification
        type="is-info is-light"
        aria-close-label="Close notification"
        :closable="false"
      >
        Números generadores
      </b-notification>
    </div>
    <br>
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
            class="is-info is-light"
            icon-left="pencil"
            @click="isActive = true"
          >
            Aprobar/rechazar
          </b-button>
        </div>
        <div class="level-item">
          <b-button class="is-success is-light" icon-left="file-excel">
            Descargar registros
          </b-button>
        </div>
      </div>
    </nav>
    <div class="columns">
      <div class="column">
        <num-gen-table
          :id-project="id"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumGen',
  data () {
    return {
      id: '',
      query: {
        limit: 1,
        project: ''
      },
      numGens: {}
    }
  },
  mounted () {
    this.id = this.$route.query.id_project
    console.log(this.id)
  },
  methods: {
    returnPage () {
      this.$router.push({
        path: '/generators'
      })
    }
  }
}
</script>

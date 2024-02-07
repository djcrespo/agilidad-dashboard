<template>
  <div class="m-2">
    <div>
      <view-status
        :id-project="id"
        :status="status"
        :observations="observations"
        :update-active="updateActive"
      />
    </div>
    <br>
    <div class="m-2">
      <properties-num-gen :object-num-gen="result" />
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
          <b-button
            v-if="result.status !== 'Aceptado' && !validatePrices"
            class="is-info is-light"
            icon-left="pencil"
            @click="isActive = true"
          >
            Aprobar/Rechazar
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
          :update-active="updateActive"
          @getId="(value) => (idregister = value)"
          @validate="validatePrices = false"
          @update="updateView"
        />
      </div>
    </div>

    <change-status
      :is-active="isActive"
      :id-project="id"
      @update="updateView"
      @close="isActive = false"
    />
  </div>
</template>

<script>
export default {
  name: 'NumGen',
  data () {
    return {
      isActive: false,
      updateActive: false,
      result: {},
      id: '',
      query: {
        limit: 1,
        project__id: ''
      },
      numGens: {},
      idregister: null,
      status: null,
      observations: null,
      validatePrices: true
    }
  },
  mounted () {
    this.id = this.$route.query.id_project
    this.getData()
  },
  methods: {
    returnPage () {
      this.$router.push({
        path: '/generators'
      })
    },
    updateView () {
      this.isActive = false
      this.getData()
    },
    async getData () {
      try {
        this.isLoading = true
        const res = await this.$store.dispatch(
          'modules/projectGenerator/getRelations',
          this.query
        )
        this.result = res.results[0]
        // this.validatePricesToConcept()
        this.status = this.result.status
        this.observations = this.result.observations
      } catch (error) {
        console.log(error)
      }
    },
    async downloadExcel () {
      try {
        const res = await this.$store.dispatch('modules/projectGenerator')
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

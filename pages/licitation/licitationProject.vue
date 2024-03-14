<template>
  <div class="m-2">
    <div>
      <view-status-licitation
        :id-project="id"
        :status="status"
        :observations="observations"
        :observations-licitation="observationsLicitation"
        :update-active="updateActive"
      />
    </div>
    <br>
    <div class="m-2">
      <properties-num-gen-licitation :object-num-gen="result" />
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
            v-if="status && status === 'AceptadoGenerador' && !validatePrices"
            class="is-info is-light"
            icon-left="content-save-outline"
            @click="isActive = true"
          >
            Guardar precios
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
        <licitations-num-gen-table
          :id-project="id"
          :update-active="updateActive"
          @getId="(value) => (idregister = value)"
          @validate="validatePrices = false"
          @update="updateView"
        />
      </div>
    </div>
    <!--
    <change-status-licitation
      :is-active="isActive"
      :id-project="id"
      @update="updateView"
      @close="isActive = false"
    />
    -->
    <edit-licitation
      :is-active="isActive"
      :project-id="id"
      @update="getData"
      @close="returnPage"
    />
  </div>
</template>

<script>
export default {
  name: 'LicitationProject',
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
      observationsLicitation: null,
      validatePrices: true
    }
  },
  mounted () {
    this.id = this.$route.query.id_project
    // console.log(this.id)
    this.getData()
  },
  methods: {
    returnPage () {
      this.$router.push({
        path: '/licitations'
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
        // console.log(res)
        this.result = res.results[0] ? res.results[0] : {}
        // console.log(this.result)
        // this.validatePricesToConcept()
        this.status = this.result.status ? this.result.status : 'Sin estado'
        this.observations = this.result.observations
        this.observationsLicitation = this.result.observationsLicitation
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

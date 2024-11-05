<template>
  <div class="container my-2">
    <div class="columns">
      <div class="column">
        <view-status-estimation v-if="estimation" :estimation="estimation" />
      </div>
    </div>
    <div v-if="estimation">
      <div v-for="section in estimation.sections_concepts" :key="section.section" class="columns">
        <div class="column">
          <strong>{{ section.section }}</strong>
          <br>
          <estimation-table :values-estimation="section.values" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewEstimation',
  data () {
    return {
      idEstimation: '',
      estimation: null
    }
  },
  mounted () {
    const id = this.$route.query.id_estimacion
    this.getEstimation(id)
  },
  methods: {
    async getEstimation (id) {
      try {
        const res = await this.$store.dispatch('modules/estimations/viewEstimation', id)
        this.estimation = res
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <div class="container my-2">
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
  methods: {}
}
</script>

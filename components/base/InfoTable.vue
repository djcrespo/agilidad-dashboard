<template>
  <div>
    <b-table />
  </div>
</template>

<script>
export default {
  name: 'InfoTable',
  props: {
    endpoint: {
      type: String,
      default: null
    }
  },
  watch: {
    endpoint (newVal, oldVal) {
      if (newVal) {
        console.log(newVal)
      }
    }
  },
  mounted () {
    console.log(this.endpoint)
    this.getObjects()
  },
  methods: {
    async getObjects () {
      try {
        const res = await this.$store.dispatch(this.endpoint, this.query)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style></style>

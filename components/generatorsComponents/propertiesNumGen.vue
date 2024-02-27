<template>
  <div class="m-2">
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <strong>Precio estimado del proyecto</strong>:
          </div>
          <div class="column">
            <p>$ {{ objectNumGen.estimate_price_project | currency }} pesos mexicanos</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertiesNumGen',
  props: {
    objectNumGen: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  watch: {
    objectNumGen (newVal, oldVal) {
      console.log(newVal)
    }
  },
  methods: {
    getData () {
      try {
        this.isLoading = true
        this.$store.dispatch('modules/')
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

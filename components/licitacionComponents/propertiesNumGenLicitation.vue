<template>
  <div class="m-2">
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <strong>Precio del proyecto (basado en los precios de la licitación)</strong>:
          </div>
          <div class="column">
            <p>$ {{ objectNumGen.estimate_real_price_project | currency }} pesos mexicanos</p>
          </div>
          <div class="column has-text-centered">
            <p>Diferencia con el precio estimado: $ {{ (parseFloat(objectNumGen.estimate_price_project) - parseFloat(objectNumGen.estimate_real_price_project)) | currency }} pesos mexicanos</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertiesNumGenLicitation',
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
  }
}
</script>

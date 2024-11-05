<template>
  <div>
    <b-notification
      type="is-light"
      aria-close-label="Close notification"
      :closable="false"
    >
      <div class="columns">
        <div class="column">
          A esta estimación: $ {{ estimation.cobrar_sin_iva }}
        </div>
        <div class="column">
          I.V.A.: $ {{ estimation.iva }}
        </div>
        <div class="column">
          Total: $ {{ estimation.cobrar_con_iva }}
        </div>
      </div>
    </b-notification>
  </div>
</template>

<script>
export default {
  name: 'ViewStatusEstimation',
  props: {
    estimation: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  }
}
</script>

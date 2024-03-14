<template>
  <div>
    <b-notification
      v-if="status && status === 'AceptadoGenerador'"
      type="is-info is-light"
      aria-close-label="Close notification"
      :closable="false"
    >
      <strong>Conceptos y números generadores aceptados</strong>
      <br>
      {{ observations && observations !== '' ? observations : 'Sin observaciones' }}
    </b-notification>
    <b-notification
      v-else-if="status && status === 'AceptadoLicitacion'"
      type="is-success is-light"
      aria-close-label="Close notification"
      :closable="false"
    >
      <strong>Guardado</strong>
      <br>
      {{ observationsLicitation && observationsLicitation !== '' ? observationsLicitation : 'Sin observaciones' }}
    </b-notification>
    <b-notification
      v-else
      type="is-light"
      aria-close-label="Close notification"
      :closable="false"
    >
      <strong>En espera de su estado</strong>
    </b-notification>
  </div>
</template>

<script>
export default {
  name: 'ViewStatusLicitation',
  props: {
    status: {
      type: String,
      default: null
    },
    observations: {
      type: String,
      default: null
    },
    observationsLicitation: {
      type: String,
      default: null
    }
  }
}
</script>

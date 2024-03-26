<template>
  <div>
    <b-notification
      v-if="status && status === 'Capturando'"
      type="is-info is-light"
      aria-close-label="Close notification"
      :closable="false"
    >
      <strong>Capturando</strong>
    </b-notification>
    <b-notification
      v-else-if="status && status === 'AceptadoGenerador'"
      type="is-success is-light"
      aria-close-label="Close notification"
      :closable="false"
    >
      <strong>Aceptado</strong>
      <br>
      {{ observations && observations !== '' ? observations : 'Sin observaciones' }}
    </b-notification>
    <b-notification
      v-else-if="status && status === 'CargadoEstimacion1'"
      type="is-success is-light"
      aria-close-label="Close notification"
      :closable="false"
    >
      <strong>Registros cargados desde la estimación 1</strong>
      <br>
      <p>
        Estos números generadores fueron cargados a partir de la <strong>estimación 1</strong> del proyecto, por lo tanto, estos
        números generadores ya pasaron por la licitación y se enlistan los números totales por concepto.
      </p>
    </b-notification>
    <b-notification
      v-else-if="status && status === 'Rechazado'"
      type="is-danger is-light"
      aria-close-label="Close notification"
      :closable="false"
    >
      <strong>Rechazado</strong>
      <br>
      {{ observations && observations !== '' ? observations : 'Sin observaciones' }}
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
  name: 'ViewStatus',
  props: {
    status: {
      type: String,
      default: null
    },
    observations: {
      type: String,
      default: null
    }
  }
}
</script>

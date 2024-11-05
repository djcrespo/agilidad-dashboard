<template>
  <div>
    <b-table
      :data="estimations"
      bordered
    >

      <b-table-column
        v-slot="props"
        field="position_estimation"
        label="Estimación"
        centered
      >
        {{ props.row.position_estimation }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="status"
        label="Estado de la estimación"
        centered
      >
        {{ props.row.status }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="estimate_percentage"
        label="Porcentaje reportado"
        centered
      >
        {{ props.row.estimate_percentage ? props.row.estimate_percentage : 'Sin porcentaje' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="real_percentage"
        label="Porcentaje real"
        centered
      >
        {{ props.row.real_percentage ? props.row.real_percentage : 'Sin porcentaje' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Acciones"
        centered
      >
        <div class="columns has-text-centered">
          <div class="column">
            <b-button
              type="is-info"
              icon-right="eye-outline"
              @click="viewValues(props.row.id)"
            >
              Ver
            </b-button>
          </div>
        </div>
      </b-table-column>

      <template #empty>
        <div class="has-text-centered">
          Sin resultados
        </div>
      </template>
    </b-table>

  </div>
</template>

<script>
export default {
  name: 'EstimationsForProject',
  props: {
    refresh: {
      type: Boolean,
      default: false
    },
    estimations: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data () {
    return {
    }
  },
  watch: {
    refresh (newVal, oldVal) {
      if (newVal) {
        this.getObjects()
        this.$emit('reset')
      }
    }
  },
  mounted () {},
  methods: {
    viewValues (id) {
      this.$router.push({
        path: '/estimacion/viewEstimation',
        query: {
          id_estimacion: id
        }
      })
    },
    deleteEstimation (id) {
      console.log(id)
    }
  }
}
</script>

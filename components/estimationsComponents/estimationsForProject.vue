<template>
  <div>
    <b-table
      :data="estimations"
      bordered
    >
      <b-table-column
        v-slot="props"
        field="project.key_project"
        label="Proyecto"
        centered
      >
        {{ props.row.project.key_project }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="project.acumulado"
        label="Porcentaje de avance acumulado"
        centered
      >
        {{ props.row.acumulado }} %
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Número de estimaciones de este proyecto"
        centered
      >
        {{ props.row.estimations.length }}
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
              icon-right="account-multiple"
              @click="deleteEstimationsProject(props.row.id)"
            >
              Eliminar conjunto de estimaciones
            </b-button>
          </div>
        </div>
        <div class="columns has-text-centered">
          <div class="column">
            <b-button
              type="is-info is-light"
              icon-right="account-multiple"
              @click="viewEstimationsProject(props.row.id)"
            >
              Ver estimaciones
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

    <!--
    <edit-register
      :is-active="activeEdit"
      :project="projectEdit"
      @close="activeEdit = false"
    />
    -->
  </div>
</template>

<script>
export default {
  name: 'EstimationsForProject',
  props: {
    refresh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      estimations: [],
      query: {
        limit: 10,
        general_calendar__status__in: 'Licitacion, Ejecucion'
      }
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
  mounted () {
    this.getEstimationsProjects()
  },
  methods: {
    async viewEstimationsProject (id) {
      try {
        const res = await this.$store.dispatch('modules/estimations/viewEstimationsProject', id)
        console.log(res.results)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

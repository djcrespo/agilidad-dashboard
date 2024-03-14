<template>
  <div>
    <b-table
      :data="data"
      bordered
    >
      <b-table-column
        v-slot="props"
        field="project.key_project"
        label="Clave del proyecto"
        centered
      >
        {{ props.row.project.key_project }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="calendar_2.status"
        label="Estado"
        centered
      >
        {{ props.row.calendar_2.status | statusPlanification }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="key_project"
        label="Fecha límite"
        centered
      >
        {{ props.row.calendar_2.date_end | birthdate }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="key_project"
        label="Días restantes"
        centered
      >
        {{ props.row.calendar_2_time && props.row.calendar_2_time >= 0 ? props.row.calendar_2_time : 'Tiempo exedido' }}
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
              @click="updatePrices(props.row.project.id)"
            >
              Asingar precios reales al producto
            </b-button>
          </div>
        </div>
        <div class="columns has-text-centered">
          <div class="column">
            <b-button
              type="is-info"
              icon-right="account-multiple"
              @click="asignContracto(props.row)"
            >
              Asignar ganador
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

    <edit-licitation
      :is-active="activeEdit"
      :project-object="projectEdit"
      @update="refreshView"
      @close="closeView"
    />
  </div>
</template>

<script>
export default {
  name: 'LicitacionTable',
  props: {
    refresh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      query: {
        limit: 10,
        general_calendar__status__in: 'Licitacion, Ejecucion'
      },
      data: [],
      loadingTable: false,
      projectEdit: {},
      activeEdit: false
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
    this.getObjects()
  },
  methods: {
    async getObjects () {
      try {
        const res = await this.$store.dispatch('modules/projectInfo/getProjectInfos', this.query)
        this.data = res.results.map((x) => {
          x.calendar_2.date_init = new Date(x.calendar_2.date_init)
          x.calendar_2.date_end = new Date(x.calendar_2.date_end)

          return x
        })
      } catch (error) {
        console.log(error)
      }
    },
    asignContracto (value) {
      this.projectEdit = value
      this.activeEdit = true
    },
    updatePrices (project) {
      this.$router.push({
        path: '/licitation/licitationProject',
        query: {
          id_project: project
        }
      })
    },
    refreshView () {
      this.data = []
      this.getObjects()
    },
    closeView () {
      this.activeEdit = false
    }
  }
}
</script>

<style></style>

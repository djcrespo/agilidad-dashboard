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
        {{ props.row.project.key_project ? props.row.project.key_project : 'Sin clave' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="project_details.name_project"
        label="Nombre del proyecto"
        centered
      >
        {{ props.row.project_details && props.row.project_details.name_project ? props.row.project_details.name_project : 'Sin nombre' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="project.status"
        label="Estado general del proyecto"
        centered
      >
        {{ props.row.project.status ? props.row.project.status : 'Sin estado' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="general_calendar.date_init"
        label="Fecha de inicio del projecto"
        centered
      >
        {{ (props.row.general_calendar && props.row.general_calendar.date_init) ? new Date(props.row.general_calendar.date_init).toLocaleDateString() : 'Sin fecha' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="general_calendar.date_end"
        label="Fecha de finalización del projecto"
        centered
      >
        {{ (props.row.general_calendar && props.row.general_calendar.date_end) ? new Date(props.row.general_calendar.date_end).toLocaleDateString() : 'Sin fecha' }}
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
              icon-right="pencil"
              @click="editItem(props.row)"
            >
              Editar
            </b-button>
          </div>
          <div class="column">
            <b-button
              type="is-danger"
              icon-right="delete"
              @click="deleteItem(props.row.id)"
            >
              Eliminar
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

    <edit-project
      :is-active="activeEdit"
      :project="projectEdit"
      @close="refreshTable"
    />
  </div>
</template>

<script>
export default {
  name: 'ProjectsTable',
  props: {
    endpoint: {
      type: String,
      default: null
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      query: {
        limit: 10
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
    refreshTable () {
      this.activeEdit = false
      this.projectEdit = {}
      this.getObjects()
    },
    async getObjects () {
      try {
        this.loadingTable = true
        const res = await this.$store.dispatch('modules/projectInfo/getProjectInfos', this.query)
        this.data = res.results
        // console.log(res.results)
        this.loadingTable = false
      } catch (error) {
        console.log(error)
      }
    },
    editItem (object) {
      this.projectEdit = object
      this.activeEdit = true
    },
    async deleteItem (id) {
      this.loadingTable = true
      try {
        await this.$store.dispatch('modules/projects/deleteProject', id)
        this.getObjects()
        this.loadingTable = false
      } catch (error) {
        this.loadingTable = false
        console.log(error)
      } finally {
        this.loadingTable = false
      }
    }
  }
}
</script>

<style></style>

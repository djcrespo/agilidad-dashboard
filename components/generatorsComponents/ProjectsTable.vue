<template>
  <div>
    <b-table
      :data="data"
      bordered
    >
      <b-table-column
        v-slot="props"
        field="key_project"
        label="Clave del proyecto"
        centered
      >
        {{ props.row.key_project ? props.row.key_project : 'Sin clave' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="name_project"
        label="Nombre del proyecto"
        centered
      >
        {{ props.row.projectDetails && props.row.projectDetails.name_project ? props.row.projectDetails.name_project : 'Sin nombre' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="status"
        label="Estado general del proyecto"
        centered
      >
        {{ props.row.status ? props.row.status : 'Sin estado' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="projectDetails.date_init"
        label="Fecha de inicio del projecto"
        centered
      >
        {{ props.row.projectDetails && props.row.projectDetails.date_init ? new Date(props.row.projectDetails.date_init).toLocaleDateString() : 'Sin fecha' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="projectDetails.date_end"
        label="Fecha de finalización del projecto"
        centered
      >
        {{ props.row.projectDetails && props.row.projectDetails.date_end ? new Date(props.row.projectDetails.date_end).toLocaleDateString() : 'Sin fecha' }}
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
      @close="activeEdit = false"
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
    async getObjects () {
      try {
        const res = await this.$store.dispatch('modules/projects/getProjects', this.query)
        this.data = res.results
        console.log(res)
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

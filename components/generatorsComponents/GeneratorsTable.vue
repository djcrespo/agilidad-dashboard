<template>
  <div>
    <b-table
      :data="data"
      bordered
    >
      <b-table-column
        v-slot="props"
        field="calendar_1.status"
        label="Estado del proyecto en calendario planeación"
        centered
      >
        {{ props.row.calendar_1.status | statusPlanification }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="project.key_project"
        label="Clave del proyecto"
        centered
      >
        {{ props.row.project ? props.row.project.key_project : 'Sin clave' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="calendar_1.date_init"
        label="Fecha de inicio"
        centered
      >
        {{ props.row.calendar_1.date_init | birthdate }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="calendar_1.date_end"
        label="Fecha de finalización"
        centered
      >
        {{ props.row.calendar_1.date_end | birthdate }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Días restantes"
        centered
      >
        {{ ( props.row.calendar_1.time ) }}
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
              @click="editItem(props.row)"
            >
              Asignación de personas
            </b-button>
          </div>
        </div>
        <div class="columns has-text-centered">
          <div class="column">
            <b-button
              type="is-success"
              icon-right="library-shelves"
              @click="viewConcepts(props.row.project.id)"
            >
              Catálogo de conceptos
            </b-button>
          </div>
        </div>
        <div class="columns has-text-centered">
          <div class="column">
            <b-button
              type="is-success"
              icon-right="format-list-checkbox"
              @click="viewItem(props.row.id)"
            >
              Números generadores
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

    <edit-asignation
      :is-active="activeEdit"
      :project="projectEdit"
      @close="activeEdit = false"
    />
  </div>
</template>

<script>
export default {
  name: 'GeneratorsTable',
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
        const res = await this.$store.dispatch('modules/projectInfo/getProjectInfos', this.query)
        this.data = res.results.map((x) => {
          x.calendar_1.date_init = new Date(x.calendar_1.date_init)
          x.calendar_1.date_end = new Date(x.calendar_1.date_end)

          return x
        })
        // console.log(this.data)
      } catch (error) {
        console.log(error)
      }
    },
    viewConcepts (id) {
      this.$router.push({
        path: '/project/conceptsProject',
        query: {
          id_project: id
        }
      })
    },
    viewItem (id) {
      this.$router.push({
        path: '/project/numGen',
        query: {
          id_project: id
        }
      })
    },
    editItem (object) {
      this.projectEdit = object
      this.activeEdit = true
    },
    async deleteItem (id) {
      this.loadingTable = true
      try {
        await this.$store.dispatch('modules/projectGenerator/deleteRelations', id)
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

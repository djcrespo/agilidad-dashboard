<template>
  <div>
    <b-table
      :data="data"
      bordered
    >
      <b-table-column
        v-slot="props"
        field="label"
        label="Nombre"
        centered
      >
        {{ props.row.label ? props.row.label : 'Sin nombre' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="description"
        label="Descripción"
        centered
      >
        {{ props.row.description ? props.row.description : 'Sin descripción' }}
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

    <edit-section
      :is-active="activeEdit"
      :concept="projectEdit"
      @close="activeEdit = false"
    />
  </div>
</template>

<script>
export default {
  name: 'SectionsTable',
  props: {
    idProject: {
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
      activeEdit: false,
      id: null
    }
  },
  watch: {
    refresh (newVal, oldVal) {
      if (newVal) {
        this.getObjects()
        this.$emit('reset')
      }
    },
    idProject (newVal, oldVakl) {
      if (newVal) {
        this.id = newVal
        this.getObjects()
      }
    }
  },
  mounted () {},
  methods: {
    async getObjects () {
      try {
        const res = await this.$store.dispatch('modules/sectionsProject/getInstanceSectionsProject', this.id)
        this.data = res.sections
      } catch (error) {
        this.data = []
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
        await this.$store.dispatch('modules/sections/deleteSection', id)
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

<template>
  <div>
    <b-table
      :data="data"
      bordered
    >
      <b-table-column
        v-slot="props"
        field="name"
        label="Nombre(s)"
        centered
      >
        {{ props.row.name ? props.row.name : 'Sin nombre(s)' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="last_name"
        label="Apellido(s)"
        centered
      >
        {{ props.row.last_name ? props.row.last_name : 'Sin apellido(s)' }}
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

    <edit-contractor
      :is-active="activeEdit"
      :contractor="contractorEdit"
      @close="refreshView"
    />
  </div>
</template>

<script>
export default {
  name: 'ContractorsTable',
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
      contractorEdit: {},
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
        const res = await this.$store.dispatch('modules/contractors/getContractors', this.query)
        this.data = res.results
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },

    editItem (object) {
      console.log(object)
      this.contractorEdit = object
      this.activeEdit = true
    },
    refreshView () {
      this.contractorEdit = null
      this.activeEdit = false
      this.getObjects()
    },
    async deleteItem (id) {
      this.loadingTable = true
      try {
        await this.$store.dispatch('modules/contractors/deleteContractor', id)
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

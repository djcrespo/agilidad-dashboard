<template>
  <div>
    <b-table :data="data" bordered :loading="loadingTable">
      <b-table-column v-slot="props" field="name" label="Nombre">
        {{ props.row.name }}
      </b-table-column>

      <b-table-column v-slot="props" field="address" label="Dirección">
        {{ props.row.address }}
      </b-table-column>

      <b-table-column v-slot="props" label="Acciones" centered>
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

    <edit-company
      :is-active="activeEdit"
      :company="conceptEdit"
      @close="activeEdit = false"
    />
  </div>
</template>

<script>
export default {
  name: 'CompanyTable',
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
      conceptEdit: {},
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
        const res = await this.$store.dispatch(
          'modules/company/getCompanies',
          this.query
        )
        this.data = res.results
      } catch (error) {
        console.log(error)
      }
    },
    editItem (object) {
      this.conceptEdit = object
      this.activeEdit = true
    },
    async deleteItem (id) {
      this.loadingTable = true
      try {
        await this.$store.dispatch('modules/company/deleteCompany', id)
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

<template>
  <div>
    <b-table
      :data="data"
      bordered
      :loading="loadingTable"
    >
      <b-table-column
        v-slot="props"
        field="key_concept"
        label="Clave del concepto"
      >
        {{ props.row.key_concept }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="description"
        label="Concepto"
      >
        {{ props.row.description }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="uni"
        label="Unidad de medida"
      >
        {{ props.row.uni }}
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

    <edit-concept
      :is-active="activeEdit"
      :concept="conceptEdit"
      @close="activeEdit = false"
    />
  </div>
</template>

<script>
export default {
  name: 'ConceptsTable',
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
        const res = await this.$store.dispatch('modules/concepts/getConcepts', this.query)
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
        await this.$store.dispatch('modules/concepts/deleteConcept', id)
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

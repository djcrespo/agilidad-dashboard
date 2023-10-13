<template>
  <div>
    <b-table
      :data="data"
      bordered
    >
      <b-table-column
        v-slot="props"
        field="label"
        label="Tipo de recurso"
        centered
      >
        {{ props.row.label ? props.row.label : 'Sin clave' }}
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

    <edit-type-resource
      :is-active="activeEdit"
      :object-edit="objectEdit"
      @close="activeEdit = false"
    />
  </div>
</template>

<script>
export default {
  name: 'TypeResourceTable',
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
      objectEdit: {},
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
        const res = await this.$store.dispatch('modules/typeResource/getTypeResources', this.query)
        this.data = res.results
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },

    editItem (object) {
      this.objectEdit = object
      this.activeEdit = true
    },
    async deleteItem (id) {
      this.loadingTable = true
      try {
        await this.$store.dispatch('modules/typeResource/deleteTypeResource', id)
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

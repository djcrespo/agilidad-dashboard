<template>
  <div>
    <b-table
      :data="data"
      bordered
    >
      <b-table-column
        v-slot="props"
        field="first_name"
        label="Nombre(s)"
        centered
      >
        {{ props.row.first_name ? props.row.first_name : 'Sin nombre' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="last_name"
        label="Apellido(s)"
        centered
      >
        {{ props.row.last_name ? props.row.last_name : 'Sin apellidos' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="occupation"
        label="Ocupación"
        centered
      >
        {{ props.row.occupation ? props.row.occupation : 'Sin ocupación' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="occupation"
        label="Ocupación"
        centered
      >
        {{ props.row.email ? props.row.email : 'Sin correo electrónico' }}
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
  name: 'PersonsTable',
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
        limit: 10,
        is_staff: false
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
        const res = await this.$store.dispatch('modules/users/getUsers', this.query)
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
        await this.$store.dispatch('modules/users/deleteUser', id)
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

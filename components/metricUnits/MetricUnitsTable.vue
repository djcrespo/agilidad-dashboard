<template>
  <div>
    <b-table
      :data="data"
      bordered
    >
      <b-table-column
        v-slot="props"
        field="label"
        label="Unidad de medida"
        centered
      >
        {{ props.row.label ? props.row.label : 'Sin clave' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="metrics_array"
        label="Opciones y sus unidades"
        centered
      >
        <b-taglist v-if="props.row.metrics_array">
          <div v-for="object in props.row.metrics_array" :key="object[0]" class="m-2">
            <b-taglist attached>
              <b-tag type="is-dark">
                {{ object[0] }}
              </b-tag>
              <b-tag type="is-light">
                {{ object[1] }}
              </b-tag>
            </b-taglist>
          </div>
        </b-taglist>
        <p
          v-else
        >
          Sin medidas
        </p>
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

    <edit-type-project
      :is-active="activeEdit"
      :object-edit="projectEdit"
      @close="activeEdit = false"
    />
  </div>
</template>

<script>
export default {
  name: 'MetricUnitsTable',
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
        const res = await this.$store.dispatch('modules/metricUnits/getMetricUnits', this.query)
        this.data = res.results
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
        await this.$store.dispatch('modules/metricUnits/deleteMetricUnit', id)
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

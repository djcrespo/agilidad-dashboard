<template>
  <div>
    <h2><strong>{{ sectionObject.section.label }}</strong></h2>
    <b-table
      :data="sectionObject.concepts"
      bordered
      :loading="loadingTable"
    >
      <b-table-column
        v-slot="props"
        field="key_concept"
        label="Clave del concepto"
        centered
      >
        {{ props.row.key_concept ? props.row.key_concept : 'Sin clave' }}
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
        field="uni"
        label="Unidad de medida asignada"
        centered
      >
        {{ props.row.uni ? props.row.uni.label : 'Sin unidad' }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="price"
        label="Precio por concepto"
        centered
      >
        <b-tooltip
          v-if="props.row.price && props.row.price > 0"
          label="Este precio va en relación a la medida asignada (volumen, área o pieza)."
        >
          <vue-numeric
            v-model="props.row.price"
            class="input"
            currency="$"
            separator=","
            :precision="2"
            :read-only="true"
          />
        </b-tooltip>
        <p v-else>
          Sin precio definido
        </p>
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Acciones"
        centered
      >
        <div class="columns has-text-centered">
          <!--
          <div class="column">
            <b-button
              type="is-info"
              icon-right="pencil"
              @click="editItem(props.row)"
            >
              Editar
            </b-button>
          </div>
          -->
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
      :concept="projectEdit"
      @close="activeEdit = false"
    />
  </div>
</template>

<script>
export default {
  name: 'ConceptsProjectTable',
  props: {
    idProject: {
      type: String,
      default: null
    },
    refresh: {
      type: Boolean,
      default: false
    },
    sectionObject: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data () {
    return {
      query: {
        limit: 1,
        project: this.idProject
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
    console.log(this.sectionObject)
    // this.getObjects()
  },
  methods: {
    async getObjects () {
      try {
        this.loadingTable = true
        const res = await this.$store.dispatch('modules/concepts/getConceptsProjectById', this.query)
        this.data = res.results
        this.loadingTable = false
        console.log(res)
      } catch (error) {
        this.loadingTable = false
        console.log(error)
      } finally {
        this.loadingTable = false
      }
    },

    editItem (object) {
      this.projectEdit = object
      this.activeEdit = true
    },
    async deleteItem (id) {
      this.loadingTable = true
      try {
        await this.$store.dispatch('modules/concepts/deleteConcept', id)
        // this.getObjects()
        this.loadingTable = false
        this.$emit('refresh')
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

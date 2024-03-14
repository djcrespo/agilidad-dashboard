<template>
  <div>
    <b-table :data="values" bordered :loading="isLoading">
      <b-table-column v-slot="props" label="Clave" centered>
        {{ props.row.concept.key_concept }}
      </b-table-column>

      <b-table-column v-slot="props" label="Concepto" centered>
        {{ props.row.concept.description }}
      </b-table-column>

      <b-table-column v-slot="props" label="Posición" centered>
        <div v-for="(item, name, index) in props.row.position" :key="index">
          <p v-if="name !== 'total'">
            {{ name.toUpperCase() }}: {{ item }}
          </p>
        </div>
      </b-table-column>

      <b-table-column v-slot="props" label="Valores" centered>
        <div v-for="(item, name, index) in props.row.values" :key="index">
          <p v-if="name !== 'total'">
            {{ name.toUpperCase() }}: {{ item }}
          </p>
        </div>
      </b-table-column>

      <b-table-column v-slot="props" label="Precio estimado" centered>
        <vue-numeric
          v-model="props.row.estimate_quantity"
          class="input"
          currency="$"
          separator=","
          :precision="2"
          :read-only="true"
        />
      </b-table-column>

      <b-table-column v-slot="props" label="Precio de la licitación" centered>
        <div v-if="hasEditPrice" class="columns">
          <div class="column">
            <vue-numeric
              v-model="props.row.real_quantity"
              class="input"
              currency="$"
              separator=","
              :precision="2"
            />
          </div>
          <div class="column">
            <b-button
              type="is-success is-light"
              icon-right="content-save"
              @click="saveRealPrice(props.row)"
            />
          </div>
        </div>
        <div v-else>
          <vue-numeric
            v-model="props.row.real_quantity"
            class="input"
            currency="$"
            separator=","
            :precision="2"
            :read-only="true"
          />
        </div>
      </b-table-column>

      <b-table-column v-slot="props" label="Total" centered>
        {{ props.row.values.total }}
      </b-table-column>

      <b-table-column v-slot="props" label="Unidad" centered>
        {{ props.row.unit_metric.label }}
      </b-table-column>

      <template #empty>
        <div class="has-text-centered">
          Sin resultados
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'LicitationsNumGenTable',
  props: {
    idProject: {
      type: String,
      default: null
    },
    updateActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false,
      values: [],
      result: [],
      hasEditPrice: true,
      query: {
        limit: 1,
        project__id: ''
      }
    }
  },
  watch: {
    idProject (newVal, oldVal) {
      if (newVal) {
        this.getData()
      }
    },
    updateActive (newVal, oldVal) {
      if (newVal) {
        this.getData()
      }
    }
  },
  methods: {
    async getData () {
      try {
        this.isLoading = true
        this.query.project__id = this.idProject
        const res = await this.$store.dispatch(
          'modules/projectGenerator/getRelations',
          this.query
        )
        this.result = res.results[0]
        if (this.result && this.result.status === 'AceptadoLicitacion') {
          this.hasEditPrice = false
        } else if (this.result && this.result.status === 'AceptadoGenerador') {
          this.hasEditPrice = true
        } else {
          this.hasEditPrice = false
        }
        // this.$emit('getId', this.result.id)
        this.values = res.results[0] ? res.results[0].concepts : []
        // console.log(this.result)
        this.validatePricesToConcept()
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async saveRealPrice (props) {
      const temporalObject = JSON.parse(JSON.stringify(props))
      try {
        this.isLoading = true
        delete temporalObject.concept
        delete temporalObject.unit_metric
        await this.$store.dispatch('modules/generators/createOrUpdate', temporalObject)
        this.isLoading = false
        this.$buefy.toast.open({
          message: 'Cambios guardados!',
          type: 'is-success'
        })
        this.getData()
      } catch (error) {
        this.isLoading = false
        console.log(error)
        this.$buefy.toast.open({
          message: 'Ocurrió un error, intente más tarde.',
          type: 'is-danger'
        })
      }
    },
    validatePricesToConcept () {
      if (this.result && this.result.concepts.length > 0) {
        const result = this.values.filter(
          (x) => x.real_quantity === null
        )
        if (result.length > 0) {
          this.$emit('update')
          this.$buefy.toast.open({
            duration: 5000,
            message: `Aun no puedes aprobar este proyecto porque faltan <strong>${result.length}</strong> conceptos por asignar su precio de la licitación`,
            position: 'is-bottom',
            type: 'is-warning'
          })
        } else if (this.result.status === 'AceptadoGenerador') {
          this.$emit('update')
          this.$emit('validate')
          this.$buefy.toast.open({
            duration: 5000,
            message: 'Ya puedes mandar el projecto a ejecución.',
            type: 'is-success'
          })
        }
      }
    }
  }
}
</script>

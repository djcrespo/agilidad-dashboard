<template>
  <div>
    <b-table :data="values" bordered :loading="isLoading">
      <b-table-column v-slot="props" label="Clave" centered>
        {{ props.row.concept.key_concept }}
      </b-table-column>

      <b-table-column v-slot="props" label="Concepto" centered>
        {{ props.row.concept.description }}
      </b-table-column>

      <b-table-column v-slot="props" label="Ubicaciones" centered>
        <div v-if="props.row.numGens.length > 0">
          <div v-for="(item, name, index) in props.row.position" :key="index">
            <p v-if="name !== 'total'">
              {{ name.toUpperCase() }}: {{ item }}
            </p>
          </div>
        </div>
        <div>
          <p></p>
        </div>
      </b-table-column>

      <b-table-column v-slot="props" label="Cantidad total" centered>
        {{ props.row.total }}
      </b-table-column>

      <b-table-column v-slot="props" label="Unidad" centered>
        {{ props.row.concept.uni.label }}
      </b-table-column>

      <b-table-column v-slot="props" label="Precio unitario" centered>
        ${{ parseFloat(props.row.concept.price) | roundPrice }}
      </b-table-column>

      <b-table-column v-slot="props" label="Cantidad total a cobrar por concepto" centered>
        ${{ (parseFloat(props.row.total) * parseFloat(props.row.concept.price)) | roundPrice }}
      </b-table-column>

      <!--
      <b-table-column v-slot="props" label="Ubicaciones" centered>
        <div v-for="(item, name, index) in props.row.position" :key="index">
          <p v-if="name !== 'total'">
            {{ name.toUpperCase() }}: {{ item }}
          </p>
        </div>
      </b-table-column>
      -->

      <!--
      <b-table-column v-slot="props" label="Valores" centered>
        <div v-for="(item, name, index) in props.row.values" :key="index">
          <p v-if="name !== 'total'">
            {{ name.toUpperCase() }}: {{ item }}
          </p>
        </div>
      </b-table-column>
      -->

      <!--
      <b-table-column v-slot="props" label="Precio estimado" centered>
        <div v-if="hasEditPrice" class="columns">
          <div class="column">
            <vue-numeric
              v-model="props.row.estimate_quantity"
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
              @click="saveEstimatePrice(props.row)"
            />
          </div>
        </div>
        <div v-else>
          <vue-numeric
            v-model="props.row.estimate_quantity"
            class="input"
            currency="$"
            separator=","
            :precision="2"
            :read-only="true"
          />
        </div>
      </b-table-column>

      <b-table-column v-slot="props" label="Acumulado" centered>
        {{ props.row.total }}
      </b-table-column>

      <b-table-column v-slot="props" label="Unidad" centered>
        {{ props.row.unit_metric.label }}
      </b-table-column>
      -->

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
  name: 'NumGenTable',
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
        console.log(this.result)
        if (this.result && (this.result.status === 'Aceptado' || this.result.status === 'CargadoEstimacion1')) {
          this.hasEditPrice = false
        } else {
          this.hasEditPrice = true
        }
        this.values = this.result ? this.result.groups_num_gen : []
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
    async saveEstimatePrice (props) {
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
          (x) => x.estimate_quantity === null
        )
        if (result.length > 0) {
          this.$emit('update')
          this.$buefy.toast.open({
            duration: 5000,
            message: `Aun no puedes aprobar este proyecto porque faltan <strong>${result.length}</strong> conceptos por asignar un precio estimado`,
            position: 'is-bottom',
            type: 'is-warning'
          })
        } else if (this.result.status !== 'Aceptado') {
          this.$emit('update')
          this.$emit('validate')
          this.$buefy.toast.open({
            duration: 5000,
            message: 'Ya puedes cambiar el estado de este proyecto',
            type: 'is-success'
          })
        }
      }
    }
  }
}
</script>

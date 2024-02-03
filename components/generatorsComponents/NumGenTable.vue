<template>
  <div>
    <b-table
      :data="values"
      bordered
      :loading="isLoading"
    >
      <b-table-column
        v-slot="props"
        label="Clave"
        centered
      >
        {{ props.row.concept.key_concept }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Concepto"
        centered
      >
        {{ props.row.concept.description }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Posición"
        centered
      >
        <div v-for="(item, name, index) in props.row.position" :key="index">
          <p v-if="name !== 'total'">
            {{ name.toUpperCase() }}: {{ item }}
          </p>
        </div>
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Valores"
        centered
      >
        <div v-for="(item, name, index) in props.row.values" :key="index">
          <p v-if="name !== 'total'">
            {{ name.toUpperCase() }}: {{ item }}
          </p>
        </div>
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Precio estimado"
        centered
      >
        <vue-numeric
          v-if="hasEditPrice"
          v-model="props.row.estimate_quantity"
          class="input"
          currency="$"
          separator=","
          :precision="2"
        />
        <vue-numeric
          v-model="props.row.estimate_quantity"
          class="input"
          currency="$"
          separator=","
          :precision="2"
          :read-only="true"
        />
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Total"
        centered
      >
        {{ props.row.values.total }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Unidad"
        centered
      >
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
        console.log(this.query)
        const res = await this.$store.dispatch('modules/projectGenerator/getRelations', this.query)
        console.log(res)
        this.result = res.results[0]
        if (this.result.status === 'Aceptado') {
          this.hasEditPrice = false
        } else {
          this.hasEditPrice = true
        }
        // this.$emit('getId', this.result.id)
        this.values = res.results[0].concepts
        // console.log(this.result)
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

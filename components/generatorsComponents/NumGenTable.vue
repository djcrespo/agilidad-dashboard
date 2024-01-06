<template>
  <div>
    <b-table
      :data="values"
      bordered
      :loading="isLoading"
    >
      <!--
      <b-table-column
        v-slot="props"
        label="Numero generador"
        centered
      >
        {{ props.row }}
      </b-table-column>
      -->

      <b-table-column
        v-slot="props"
        label="Concepto"
        centered
      >
        {{ props.row.concept.description }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="clave"
        centered
      >
        {{ props.row.concept.key_concept }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Posición"
        centered
      >
        <div v-for="(item, name, index) in props.row.values" :key="index">
          <p v-if="name !== 'total'">
            {{ name }}: {{ item }}
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
            {{ name }}: {{ item }}
          </p>
        </div>
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
    }
  },
  data () {
    return {
      isLoading: false,
      values: [],
      result: [],
      query: {
        limit: 1,
        project: ''
      }
    }
  },
  watch: {
    idProject (newVal, oldVal) {
      if (newVal) {
        console.log(newVal)
        this.getData()
      }
    }
  },
  methods: {
    async getData () {
      try {
        this.isLoading = true
        this.query.project = this.id
        const res = await this.$store.dispatch('modules/projectGenerator/getRelations', this.query)
        this.result = res.results[0]
        this.values = res.results[0].concepts
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

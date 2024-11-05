<template>
  <div>
    <b-table
      :data="values"
      bordered
    >

      <b-table-column
        v-slot="props"
        field="concept.key_concept"
        label="Clave del concepto"
        centered
      >
        {{ props.row.concept.key_concept }}
      </b-table-column>

      <b-table-column
        width="400"
        v-slot="props"
        field="concept.description"
        label="Concepto"
        centered
      >
        {{ props.row.concept.description }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Unidad"
        centered
      >
        {{ props.row.concept.uni.label }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Cantidad"
        centered
      >
        {{ props.row.num_gen[0].total_calculated + ' - ' + props.row.concept.uni.label }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Precio"
        centered
      >
        <vue-numeric
          v-if="props.row.concept.price"
          v-model="props.row.concept.price"
          class="input"
          currency="$"
          separator=","
          :read-only="true"
          :precision="2"
        />
        <p v-else>Precio no registrado</p>
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="concept.cantidad"
        label="A esta estimación"
        centered
      >
        {{ props.row.values.value_report + ' - ' + props.row.concept.uni.label }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        label="Excedente"
        centered
      >
        {{ props.row.is_excendete ? (props.row.is_excendete + ' - ' + props.row.concept.uni.label) : 'No' }}
      </b-table-column>

      <!--
      <b-table-column
        v-slot="props"
        label="Acciones"
        centered
      >
        <div class="columns has-text-centered">
          <div class="column">
            <b-button
              type="is-info"
              icon-right="eye-outline"
              @click="viewValues(props.row.id)"
            >
              Ver
            </b-button>
          </div>
        </div>
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
  name: 'estimationTable',
  props: {
    refresh: {
      type: Boolean,
      default: false
    },
    valuesEstimation: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data () {
    return {
      values: []
    }
  },
  watch: {
    valuesEstimation (newVal, oldVal) {
      if (newVal) {
        this.values = newVal
      }
    }
  },
  mounted () {
    this.values = this.valuesEstimation
  },
  methods: {}
}
</script>

<template>
  <div>
    <b-table
      :data="isEmpty ? [] : data"
      bordered
    >
      <b-table-column
        v-slot="props"
        field="key_project"
        label="Clave del proyecto"
      >
        {{ props.row.key_project }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="status"
        label="Estado general del proyecto"
      >
        {{ props.row.key_project }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="created_at"
        label="Fecha de alta del proyecto"
        centered
      >
        <span class="tag is-success">
          {{ new Date(props.row.created_at).toLocaleDateString() }}
        </span>
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="updated_at"
        label="Ultima actualización del proyecto"
        centered
      >
        <span class="tag is-success">
          {{ new Date(props.row.updated_at).toLocaleDateString() }}
        </span>
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
  name: 'InfoTable',
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
      data: []
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
        const res = await this.$store.dispatch(this.endpoint, this.query)
        this.data = res.results
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style></style>

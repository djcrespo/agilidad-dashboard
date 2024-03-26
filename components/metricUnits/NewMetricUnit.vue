<template>
  <b-modal
    v-model="isActive"
    :can-cancel="false"
    :destroy-on-hide="false"
    :has-modal-card="false"
  >
    <b-loading v-model="isLoading" :is-full-page="false" :can-cancel="false" />
    <div class="modal-card" style="width: auto">
      <div class="modal-card-head">
        <p class="modal-card-title">
          Nuevo unidad de medida
        </p>
      </div>
      <section class="modal-card-body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createOrUpdate)">
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.label"
                  label="Nombre de la unidad"
                  name="nombre de la unidad"
                  placeholder="M2, M3, ..."
                  label-position="on-border"
                  rules="required"
                />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.description"
                  label="Descripción breve de la unidad"
                  name="descripción breve"
                  placeholder="Metros cuadrados, Metros cubicos, ..."
                  label-position="on-border"
                  rules="required"
                />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="unit[0]"
                  label="Opción"
                  name="opción"
                  placeholder="ALTO, LARGO, ANCHO, PIEZA"
                  label-position="on-border"
                />
              </div>
              <div class="column">
                <BInputWithValidation
                  v-model="unit[1]"
                  label="Unidad de medida"
                  name="unidad de medida"
                  placeholder="CM, M, ML, PZA"
                  label-position="on-border"
                />
              </div>
              <div class="column">
                <b-button
                  type="is-success is-light"
                  icon-right="plus"
                  @click="addMetric"
                />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-taglist>
                  <div v-for="(object, index) in form.metrics_array" :key="object[0]" class="m-2">
                    <b-taglist attached>
                      <b-tag type="is-dark">
                        {{ object[0] }}
                      </b-tag>
                      <b-tag type="is-light" closable @close="deleteMetric(index)">
                        {{ object[1] }}
                      </b-tag>
                    </b-taglist>
                  </div>
                </b-taglist>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <ButtonGroup
                  :handle-submit="handleSubmit"
                  saving
                  @save="createOrUpdate"
                  @cancel="cancel"
                />
              </div>
            </div>
          </form>
        </ValidationObserver>
      </section>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'NewMetricUnit',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        metrics_array: []
      },
      unit: ['', ''],
      isLoading: false
    }
  },
  methods: {
    async createOrUpdate () {
      this.isLoading = true
      try {
        const values = {}
        for (const metric in this.form.metrics_array) {
          values[this.form.metrics_array[metric][0]] = this.form.metrics_array[metric][1]
        }
        this.form.values = values
        await this.$store.dispatch(
          'modules/metricUnits/createOrUpdate',
          this.form
        )
        this.form = {
          metrics_array: []
        }
        this.unit = ['', '']
        this.isLoading = false
        this.$emit('close')
      } catch (error) {
        this.isLoading = false
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    cancel () {
      this.form = {
        metrics_array: []
      }
      this.unit = ['', '']
      this.$emit('close')
    },
    // individual
    addMetric () {
      this.form.metrics_array.push(this.unit)
      this.unit = ['', '']
    },
    deleteMetric (index) {
      if (this.form.metrics_array.length === 1) {
        this.form.metrics_array = []
      } else {
        this.form.metrics_array.splice(index, 1)
      }
    }
  }
}
</script>

<style>
.card {
  background-color: white !important;
}
</style>

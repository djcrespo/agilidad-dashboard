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
          Nuevo concepto
        </p>
      </div>
      <section class="modal-card-body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createOrUpdate)">
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.concept.key_concept"
                  label="Clave del concepto"
                  name="nombre de la sección"
                  label-position="on-border"
                  rules="required"
                  normal
                />
              </div>
              <div class="column">
                <b-field label="Secciones" label-position="on-border">
                  <b-select
                    v-model="form.section"
                    placeholder="Seleccione una opción"
                  >
                    <option
                      v-for="option in sections"
                      :key="option.id"
                      :value="option.id"
                    >
                      {{ option.label }}
                    </option>
                  </b-select>
                </b-field>
              </div>
              <div class="column">
                <b-field label="Unidad de medida" label-position="on-border">
                  <b-select
                    v-model="form.concept.uni"
                    placeholder="Seleccione una opción"
                  >
                    <option
                      v-for="option in metrics"
                      :key="option.id"
                      :value="option.id"
                    >
                      {{ option.label }}
                    </option>
                  </b-select>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.concept.description"
                  label="Descripción breve"
                  name="descripción breve"
                  label-position="on-border"
                  type="textarea"
                />
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
  name: 'NewConcept',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    idProject: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: {
        concept: {
          key_concept: '',
          description: '',
          uni: null
        }
      },
      id: '',
      isLoading: false,
      sections: [],
      metrics: []
    }
  },
  watch: {
    isActive (newVal, oldVal) {
      if (newVal) {
        this.getSectionsProject()
      }
    }
  },
  mounted () {
    this.getMetrics()
  },
  methods: {
    async createOrUpdate () {
      this.isLoading = true
      try {
        await this.$store.dispatch('modules/concepts/createOrUpdate', this.form)
        this.form = {
          concept: {
            key_concept: '',
            description: '',
            uni: null
          }
        }
        this.isLoading = false
        this.$emit('save')
      } catch (error) {
        this.isLoading = false
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    cancel () {
      this.form = {
        concept: {
          key_concept: '',
          description: '',
          uni: null
        }
      }
      this.$emit('close')
    },
    async getSectionsProject () {
      console.log(this.idProject)
      try {
        const res = await this.$store.dispatch(
          'modules/sectionsProject/getInstanceSectionsProject',
          this.idProject
        )
        this.sections = res.sections
      } catch (error) {
        console.log(error)
      }
    },
    async getMetrics () {
      try {
        const res = await this.$store.dispatch(
          'modules/metricUnits/getMetricUnits'
        )
        this.metrics = res.results
      } catch (error) {
        console.log(error)
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

<template>
  <b-modal
    v-model="isActive"
    :can-cancel="false"
    :destroy-on-hide="false"
    :has-modal-card="true"
  >
    <b-loading v-model="isLoading" :is-full-page="false" :can-cancel="true" />
    <div class="card">
      <div class="card-header">
        <p class="card-header-title">
          Editar concepto
        </p>
      </div>
      <div class="card-content">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createOrUpdate)">
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.key_concept"
                  label="Clave del concepto"
                  name="clave del concepto"
                  label-position="on-border"
                  rules="required"
                  normal
                />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.uni"
                  label="Unidad de medida"
                  name="unidad de medida"
                  label-position="on-border"
                  rules="required"
                  normal
                />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.description"
                  label="Descripción"
                  name="descripción"
                  label-position="on-border"
                  type="textarea"
                  rules="required"
                  normal
                />
              </div>
            </div>
            <div class="columns">
              <div class="column has-text-centered">
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
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'EditConcept',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    concept: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data () {
    return {
      form: this.concept,
      isLoading: false
    }
  },
  watch: {
    concept (newVal, oldVal) {
      console.log(newVal)
      console.log(oldVal)
      if (newVal.id) {
        this.form = newVal
      } else if (oldVal.id) {
        this.form = oldVal
      }
    }
  },
  methods: {
    async createOrUpdate () {
      this.isLoading = true
      try {
        await this.$store.dispatch('modules/concepts/createOrUpdate', this.form)
        this.form = {
          key_concept: '',
          uni: '',
          description: ''
        }
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
      this.form = {}
      this.$emit('close')
    }
  }
}
</script>

<style>
.card {
  height: 100%;
  background-color: white !important;
}

.level {
  width: 100%;
}
</style>

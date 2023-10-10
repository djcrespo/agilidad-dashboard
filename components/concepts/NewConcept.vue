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
          Nuevo concepto
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
  name: 'NewConcept',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        key_concept: '',
        uni: '',
        description: ''
      },
      isLoading: false
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
      this.form = {
        key_concept: '',
        uni: '',
        description: ''
      }
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

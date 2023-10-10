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
          Nuevo proyecto
        </p>
      </div>
      <section class="modal-card-body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createOrUpdate)">
            <div class="divider">
              <strong>Datos del contratista</strong>
            </div>
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.name"
                  label="Nombre(s)"
                  name="nombre(s)"
                  label-position="on-border"
                  rules="required"
                  normal
                />
              </div>
              <div class="column">
                <BInputWithValidation
                  v-model="form.last_name"
                  label="Apellido(s)"
                  name="apellido(s)"
                  label-position="on-border"
                  rules="required"
                  normal
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
  name: 'EditContractor',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    contractor: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data () {
    return {
      form: {},
      isLoading: false
    }
  },
  watch: {
    contractor (newVal, oldVal) {
      if (newVal) {
        this.form = newVal
      }
    }
  },
  methods: {
    async createOrUpdate () {
      this.isLoading = true
      try {
        console.log(this.form)
        await this.$store.dispatch('modules/contractors/createOrUpdate', this.form)
        this.form = {}
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
  background-color: white !important;
}
</style>

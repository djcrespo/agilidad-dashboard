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
          Nuevo compañia
        </p>
      </div>
      <section class="modal-card-body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createOrUpdate)">
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.name"
                  label="Nombre"
                  name="nombre"
                  placeholder="Nombre de la compañia"
                  label-position="on-border"
                  rules="required"
                  normal
                />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.address"
                  label="Dirección"
                  name="dirección"
                  placeholder="Dirección de la compañia"
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
  name: 'NewCompany',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {},
      isLoading: false
    }
  },
  methods: {
    async createOrUpdate () {
      this.isLoading = true
      try {
        await this.$store.dispatch(
          'modules/company/createOrUpdate',
          this.form
        )
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

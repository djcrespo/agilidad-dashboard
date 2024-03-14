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
          Guardar precios (este cambio no se puede regresar)
        </p>
      </div>
      <section class="modal-card-body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createOrUpdate)">
            <div class="columns">
              <div class="column">
                <RadioPicker
                  :options="{
                    true: 'Guardar precios',
                    false: 'Borrador'
                  }"
                  @input="viewValue"
                />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <ButtonGroup
                  :handle-submit="handleSubmit"
                  saving
                  @save="createOrUpdate"
                  @cancel="closeModal"
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
  name: 'ChangeStatusLicitation',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    idProject: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      form: {
        status: '',
        observations: ''
      }
    }
  },
  watch: {
    idProject (newVal, oldVal) {
      if (newVal) {
        this.form.id = newVal
      }
    }
  },
  mounted () {},
  methods: {
    async createOrUpdate () {
      console.log(this.idProject)
      try {
        this.isLoading = true
        await this.$store.dispatch('modules/projectGenerator/updateStatus', this.form)
        this.$emit('update')
        this.form = {}
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    closeModal () {
      this.form = {}
      this.$emit('close')
    },
    viewValue (value) {
      switch (value) {
        case 'true':
          this.form.status = 'AceptadoLicitacion'
          break
        case 'false':
          this.form.status = 'BorradorLicitation'
          break
      }
    }
  }
}
</script>

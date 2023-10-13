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
          Editar registro
        </p>
      </div>
      <div class="card-content">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createOrUpdate)">
            <div class="columns">
              <!-- Datos generales del proyecto -->
              <div class="column">
                <BInputWithValidation
                  v-model="form.label"
                  label="Tipo de proyecto"
                  name="tipo de proyecto"
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
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'EditTypeProject',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    objectEdit: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data () {
    return {
      form: {},
      isLoading: false,
      loadingTable: false,
      conceptEdit: {},
      activeEdit: false
    }
  },
  watch: {
    objectEdit (newVal, oldVal) {
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
        await this.$store.dispatch('modules/typeProjects/createOrUpdate', this.form)
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
  height: 100%;
  background-color: white !important;
}

.level {
  width: 100%;
}
</style>

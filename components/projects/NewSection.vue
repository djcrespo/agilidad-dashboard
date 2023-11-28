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
          Nueva partida
        </p>
      </div>
      <section class="modal-card-body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createOrUpdate)">
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.section.label"
                  label="Nombre de la partida"
                  name="nombre de la partida"
                  label-position="on-border"
                  rules="required"
                  normal
                />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.section.description"
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
  name: 'NewSection',
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
        section: {
          label: '',
          description: ''
        }
      },
      isLoading: false
    }
  },
  watch: {
    isActive (newVal, oldVal) {
      if (newVal) {
        this.form.project = this.idProject
      }
    }
  },
  methods: {
    async createOrUpdate () {
      this.isLoading = true
      try {
        await this.$store.dispatch('modules/sections/createOrUpdate', this.form)
        this.form = {
          section: {
            label: '',
            description: ''
          }
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
        label: '',
        description: ''
      }
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

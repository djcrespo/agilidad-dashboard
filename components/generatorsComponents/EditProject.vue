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
          Nuevo proyecto
        </p>
      </div>
      <div class="card-content">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createOrUpdate)">
            <div class="columns">
              <!-- Datos generales del proyecto -->
              <div class="column">
                <BInputWithValidation
                  v-model="form.key_project"
                  label="Clave del proyecto"
                  name="clave del proyecto"
                  label-position="on-border"
                  rules="required"
                  normal
                />
              </div>
              <div class="column">
                <BInputWithValidation
                  v-model="form.projectDetails.number_contract"
                  label="Número del contrato"
                  name="número del contrato"
                  label-position="on-border"
                  rules="required"
                  normal
                />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.projectDetails.name_project"
                  label="Número del proyecto"
                  name="Número del proyecto"
                  label-position="on-border"
                  rules="required"
                  normal
                />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.projectDetails.description"
                  rules="required"
                  name="descripción"
                  label="Descripción"
                  type="textarea"
                  label-position="on-border"
                  normal
                />
              </div>
            </div>
            <!-- Fechas generales del proyecto -->
            <div class="columns">
              <div class="column">
                <b-field label="Fecha de inicio del proyecto">
                  <b-datepicker
                    v-model="form.calendarProject.date_init"
                    inline
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field label="Fecha final del proyecto">
                  <b-datepicker
                    v-model="form.calendarProject.date_end"
                    inline
                  />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <p>Contratista</p>
              </div>
              <div class="column">
                <p>Residente</p>
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
  name: 'EditProject',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    project: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data () {
    return {
      form: {
        ProjectDetails: {
          number_contract: '',
          name_project: ''
        },
        CalendarProject: {
          date_init: new Date(),
          date_end: new Date()
        }
      },
      isLoading: false,
      loadingTable: false,
      conceptEdit: {},
      activeEdit: false
    }
  },
  watch: {
    project (newVal, oldVal) {
      if (newVal.id) {
        console.log(newVal)
        this.form = newVal
        this.form.calendarProject.date_init = this.form.calendarProject.date_init ? new Date(this.form.calendarProject.date_init) : null
        this.form.calendarProject.date_end = this.form.calendarProject.date_end ? new Date(this.form.CalendarProject.date_end) : null
      }
    }
  },
  methods: {
    async createOrUpdate () {
      this.isLoading = true
      try {
        console.log(this.form)
        await this.$store.dispatch('modules/projects/createOrUpdate', this.form)
        this.form = {
          ProjectDetails: {},
          CalendarProject: {
            date_init: new Date(),
            date_end: new Date()
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
        ProjectDetails: {},
        CalendarProject: {
          date_init: new Date(),
          date_end: new Date()
        }
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

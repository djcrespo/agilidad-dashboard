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
              <strong>Datos generales</strong>
            </div>
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.ProjectDetails.name_project"
                  label="Nombre del proyecto"
                  name="nombre del proyecto"
                  label-position="on-border"
                  rules="required"
                  normal
                />
              </div>
            </div>
            <div class="columns">
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
                <BSelectWithValidation
                  v-model="form.ProjectDetails.type_project"
                  :options="optionsTypes"
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
                <b-field label="Fecha inicio del proyecto">
                  <b-datepicker
                    v-model="form.CalendarProject.date_init"
                    inline
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field label="Fecha final del proyecto">
                  <b-datepicker
                    v-model="form.CalendarProject.date_end"
                    inline
                  />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.ProjectDetails.description"
                  rules="required"
                  name="descripción"
                  label="Descripción"
                  type="textarea"
                  label-position="on-border"
                  normal
                />
              </div>
            </div>
            <div class="divider">
              <strong>Periodo de elaboración</strong>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Fecha inicio">
                  <b-datepicker
                    v-model="form.CalendarPeriod1.date_init"
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field label="Fecha final">
                  <b-datepicker
                    v-model="form.CalendarPeriod1.date_end"
                  />
                </b-field>
              </div>
            </div>
            <div class="divider">
              <strong>Periodo de licitación</strong>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Fecha inicio">
                  <b-datepicker
                    v-model="form.CalendarPeriod2.date_init"
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field label="Fecha final">
                  <b-datepicker
                    v-model="form.CalendarPeriod2.date_end"
                  />
                </b-field>
              </div>
            </div>
            <div class="divider">
              <strong>Periodo de ejecución</strong>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Fecha inicio">
                  <b-datepicker
                    v-model="form.CalendarPeriod3.date_init"
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field label="Fecha final">
                  <b-datepicker
                    v-model="form.CalendarPeriod3.date_end"
                  />
                </b-field>
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
  name: 'NewProject',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        ProjectDetails: {
          number_contract: '',
          name_project: '',
          description: '',
          type_project: null
        },
        CalendarProject: {
          date_init: new Date(),
          date_end: new Date()
        },
        CalendarPeriod1: {
          date_init: new Date(),
          date_end: new Date()
        },
        CalendarPeriod2: {
          date_init: new Date(),
          date_end: new Date()
        },
        CalendarPeriod3: {
          date_init: new Date(),
          date_end: new Date()
        }
      },
      optionsTypes: [
        {
          label: 'option1',
          value: 1
        },
        {
          label: 'option2',
          value: 2
        }
      ],
      isLoading: false,
      activeStep: 0
    }
  },
  methods: {
    async createOrUpdate () {
      this.isLoading = true
      try {
        console.log(this.form)
        await this.$store.dispatch('modules/projects/createOrUpdate', this.form)
        this.form = {
          ProjectDetails: {
            number_contract: '',
            name_project: '',
            description: '',
            type_project: null
          },
          CalendarProject: {
            date_init: new Date(),
            date_end: new Date()
          },
          CalendarPeriod1: {
            date_init: new Date(),
            date_end: new Date()
          },
          CalendarPeriod2: {
            date_init: new Date(),
            date_end: new Date()
          },
          CalendarPeriod3: {
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
        ProjectDetails: {
          number_contract: '',
          name_project: '',
          description: '',
          type_project: null
        },
        CalendarProject: {
          date_init: new Date(),
          date_end: new Date()
        },
        CalendarPeriod1: {
          date_init: new Date(),
          date_end: new Date()
        },
        CalendarPeriod2: {
          date_init: new Date(),
          date_end: new Date()
        },
        CalendarPeriod3: {
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
  background-color: white !important;
}
</style>

<template>
  <b-modal v-model="isActive" :can-cancel="false" :destroy-on-hide="false">
    <b-loading v-model="isLoading" :is-full-page="false" :can-cancel="true" />
    <div class="card">
      <div class="card-content">
        <div class="content">
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit">
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
              </div>
              <div class="columns">
                <div class="column">
                  <b-field label="Fecha de inicio del proyecto">
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
                    label-position="on-border"
                    normal
                  />
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
              <ButtonGroup
                :handle-submit="handleSubmit"
                saving
                @save="createOrUpdate"
                @cancel="cancel"
              />
            </form>
          </ValidationObserver>
        </div>
      </div>
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
        ProjectDetails: {},
        CalendarProject: {
          date_init: new Date(),
          date_end: new Date()
        }
      },
      isLoading: false
    }
  },
  methods: {
    async createOrUpdate () {
      this.isLoading = true
      try {
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
</style>

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
          Nuevo paquete de estimaciones
        </p>
      </div>
      <section class="modal-card-body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createOrUpdate)">
            <div class="columns">
              <div class="column">
                <b-field label="Proyecto" label-position="on-border">
                  <b-autocomplete
                    :data="projects"
                    field="project.key_project"
                    :loading="isFetching"
                    :open-on-focus="true"
                    @typing="getProjects"
                    @select="option => form.project = option.project.id"
                  >
                    <template slot-scope="props">
                      <div class="media">
                        <div class="media-content">
                          {{ props.option }}
                        </div>
                      </div>
                    </template>
                  </b-autocomplete>
                </b-field>
              </div>
              <div class="column">
                <BInputWithValidation
                  v-model="form.numberEstimations"
                  label="Número de estimaciones que tendrá el proyecto"
                  name="nombre del estado"
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
  name: 'NewEstimationProject',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false,
      isFetching: false,
      form: {},
      queryProject: {
        limit: 50,
        general_calendar__status: 'Planificacion',
        search: ''
      },
      projects: []
    }
  },
  mounted () {
    this.getProjects()
  },
  methods: {
    async createOrUpdate () {
      try {
        this.isLoading = true
        const res = await this.$store.dispatch('modules/estimations/createOrUpdate', this.form)
        this.isLoading = false
        this.form = {}
        this.$emit('close')
        console.log(res)
      } catch (error) {
        this.isLoading = false
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async getProjects (text) {
      if (text) {
        try {
          this.queryProject.search = text
          const res = await this.$store.dispatch('modules/projectInfo/getProjectInfos', this.queryProject)
          this.projects = res.results
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const res = await this.$store.dispatch('modules/projectInfo/getProjectInfos', this.queryProject)
          this.projects = res.results
        } catch (error) {
          console.log(error)
        }
      }
    },
    cancel () {
      this.isLoading = true
      this.form = {}
      this.isLoading = false
      this.$emit('close')
    }
  }
}
</script>

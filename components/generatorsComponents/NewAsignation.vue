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
          Nueva asignación
        </p>
      </div>
      <section class="modal-card-body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createOrUpdate)">
            <div class="columns">
              <div class="column">
                <b-field label="Selecciona un proyecto">
                  <b-autocomplete
                    :data="projects"
                    field="key_project"
                    :loading="isFetching"
                    :open-on-focus="true"
                    @typing="getProjects"
                    @select="option => form.project = option.id"
                  >
                    <template slot-scope="props">
                      <div class="media">
                        <div class="media-content">
                          {{ props.option.key_project }}
                        </div>
                      </div>
                    </template>
                  </b-autocomplete>
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
      form: {},
      isLoading: false,
      projects: [],
      isFetching: false,
      query: {
        limit: 10,
        search: ''
      }
    }
  },
  mounted () {
    this.getProjects()
  },
  methods: {
    async getProjects (text) {
      if (text) {
        try {
          this.queryProject.search = text
          const res = await this.$store.dispatch('modules/projects/getProjects', this.queryProject)
          this.projects = res.results
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const res = await this.$store.dispatch('modules/projects/getProjects', this.queryProject)
          this.projects = res.results
        } catch (error) {
          console.log(error)
        }
      }
    },
    getPersons (text) {
      if (text) {
        try {
          this.queryPerson.search = text
          // const res = await this.$store.dispatch('modules//')
        } catch (error) {
          console.log(error)
        }
      }
    },
    async createOrUpdate () {
      this.isLoading = true
      try {
        await this.$store.dispatch('modules/projectGenerator/createOrUpdate', this.form)
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

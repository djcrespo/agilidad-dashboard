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
                <b-field label="Compañia" label-position="on-border">
                  <b-autocomplete
                    :data="companies"
                    field="name"
                    :loading="isFetching"
                    :open-on-focus="true"
                    @typing="getCompanies"
                    @select="option => form.company = option.id"
                  >
                    <template slot-scope="props">
                      <div class="media">
                        <div class="media-content">
                          {{ props.option.name }}
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
  name: 'NewContractor',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: '',
        last_name: ''
      },
      isLoading: false,
      companies: [],
      queryCompanies: {
        limit: 50,
        is_active: true,
        search: ''
      },
      isFetching: false
    }
  },
  mounted () {
    this.getCompanies()
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
    async getCompanies (text) {
      if (text) {
        try {
          this.queryCompanies.search = text
          const res = await this.$store.dispatch('modules/company/getCompanies', this.queryCompanies)
          console.log(res)
          this.companies = res.results
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const res = await this.$store.dispatch('modules/company/getCompanies', this.queryCompanies)
          console.log(res)
          this.companies = res.results
        } catch (error) {
          console.log(error)
        }
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

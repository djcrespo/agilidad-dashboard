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
          Editar licitación del proyecto
        </p>
      </div>
      <div class="card-content">
        <form>
          <div class="columns">
            <div class="column">
              <b-field label="Contratista" label-position="on-border">
                <b-autocomplete
                  :data="contratistas"
                  field="name"
                  :loading="isFetching"
                  :open-on-focus="true"
                  @typing="getContratista"
                  @select="(option) => (form.contratist = option.id)"
                >
                  <template slot-scope="props">
                    <div class="media">
                      <div class="media-content">
                        {{ props.option.name }}
                        {{ props.option.last_name }}
                      </div>
                    </div>
                  </template>
                </b-autocomplete>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Presupuesto autorizado" label-position="on-border">
                <vue-numeric
                  v-model="form.contrated_budget"
                  class="input"
                  currency="$"
                  separator=","
                  :precision="2"
                />
              </b-field>
            </div>
          </div>
        </form>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <b-button @click="cancel">Cancelar</b-button>
        </div>
        <div class="card-footer-item">
          <b-button type="is-success is-ligth" @click="createOrUpdate">Guardar</b-button>
        </div>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'EditLicitation',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    projectObject: {
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
      contratistas: [],
      isFetching: false,
      queryContratist: {
        limit: 10,
        search: '',
        is_active: true
      }
    }
  },
  watch: {
    isActive (newVal, oldVal) {
      if (newVal) {
        this.form.projectId = this.projectObject.project.id
      }
    }
  },
  mounted () {
    this.getContratista()
  },
  methods: {
    async createOrUpdate () {
      this.isLoading = true
      try {
        // console.log(this.form)
        await this.$store.dispatch(
          'modules/licitations/updateLicitations',
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
    },
    async getContratista (text) {
      if (text) {
        try {
          this.queryContratist.search = text
          const res = await this.$store.dispatch(
            'modules/contractors/getContractors',
            this.queryContratist
          )
          this.contratistas = res.results
          // console.log(res)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          this.queryContratist.search = ''
          const res = await this.$store.dispatch(
            'modules/contractors/getContractors',
            this.queryContratist
          )
          this.contratistas = res.results
          // console.log(res)
        } catch (error) {
          console.log(error)
        }
      }
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

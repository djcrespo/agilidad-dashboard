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
          Editar asignación de proyecto
        </p>
      </div>
      <section class="modal-card-body">
        <form>
          <div class="columns">
            <div class="column">
              <b-field label="Verificador">
                <b-autocomplete
                  :data="verificadores"
                  field="first_name"
                  :loading="isFetching"
                  :open-on-focus="true"
                  @typing="getVerificador"
                  @select="option => form.verificador = option.id"
                >
                  <template slot-scope="props">
                    <div class="media">
                      <div class="media-content">
                        {{ props.option.first_name }} {{ props.option.last_name }}
                      </div>
                    </div>
                  </template>
                </b-autocomplete>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Residente">
                <b-autocomplete
                  :data="residentes"
                  field="first_name"
                  :loading="isFetching"
                  :open-on-focus="true"
                  @typing="getResidente"
                  @select="option => form.residente = option.id"
                >
                  <template slot-scope="props">
                    <div class="media">
                      <div class="media-content">
                        {{ props.option.first_name }} {{ props.option.last_name }}
                      </div>
                    </div>
                  </template>
                </b-autocomplete>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Visor">
                <b-autocomplete
                  :data="visores"
                  field="first_name"
                  :loading="isFetching"
                  :open-on-focus="true"
                  @typing="getVisor"
                  @select="option => form.visor = option.id"
                >
                  <template slot-scope="props">
                    <div class="media">
                      <div class="media-content">
                        {{ props.option.first_name }} {{ props.option.last_name }}
                      </div>
                    </div>
                  </template>
                </b-autocomplete>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Capturista">
                <b-autocomplete
                  :data="capturistas"
                  field="first_name"
                  :loading="isFetching"
                  :open-on-focus="true"
                  @typing="getCapturista"
                  @select="option => form.capturista = option.id"
                >
                  <template slot-scope="props">
                    <div class="media">
                      <div class="media-content">
                        {{ props.option.first_name }} {{ props.option.last_name }}
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
                saving
                @save="createOrUpdate"
                @cancel="cancel"
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'EditAsgination',
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
      isFetching: false,
      query: {
        limit: 10,
        search: ''
      },
      queryVisor: {
        limit: 10,
        search: '',
        occupation: 'VISOR'
      },
      visores: [],
      queryResidente: {
        limit: 10,
        search: '',
        occupation: 'RESIDENTE'
      },
      residentes: [],
      queryVerificador: {
        limit: 10,
        search: '',
        occupation: 'VERIFICADOR'
      },
      verificadores: [],
      queryCapturista: {
        limit: 10,
        search: '',
        occupation: 'CAPTURISTA'
      },
      capturistas: []
    }
  },
  mounted () {
    this.getProjects()
    this.getVisor()
    this.getVerificador()
    this.getCapturista()
    this.getResidente()
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
    async getVisor (text) {
      if (text) {
        try {
          this.queryVisor.search = text
          const res = await this.$store.dispatch('modules/users/getUsers', this.queryVisor)
          this.visores = res.results
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const res = await this.$store.dispatch('modules/users/getUsers', this.queryVisor)
          this.visores = res.results
        } catch (error) {
          console.log(error)
        }
      }
    },
    async getResidente (text) {
      if (text) {
        try {
          this.queryResidente.search = text
          const res = await this.$store.dispatch('modules/users/getUsers', this.queryResidente)
          this.residentes = res.results
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const res = await this.$store.dispatch('modules/users/getUsers', this.queryResidente)
          this.residentes = res.results
        } catch (error) {
          console.log(error)
        }
      }
    },
    async getCapturista (text) {
      if (text) {
        try {
          this.queryCapturista.search = text
          const res = await this.$store.dispatch('modules/users/getUsers', this.queryCapturista)
          this.capturistas = res.results
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const res = await this.$store.dispatch('modules/users/getUsers', this.queryCapturista)
          this.capturistas = res.results
        } catch (error) {
          console.log(error)
        }
      }
    },
    async getVerificador (text) {
      if (text) {
        try {
          this.queryVerificador.search = text
          const res = await this.$store.dispatch('modules/users/getUsers', this.queryVerificador)
          this.verificadores = res.results
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const res = await this.$store.dispatch('modules/users/getUsers', this.queryVerificador)
          this.verificadores = res.results
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

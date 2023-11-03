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
              <div class="column">
                <BInputWithValidation
                  v-model="form.first_name"
                  label="Nombre(s)"
                  name="nombres(s)"
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
                <BInputWithValidation
                  v-model="form.username"
                  label="Correo electrónico"
                  name="Correo electrónico"
                  label-position="on-border"
                  rules="required"
                  normal
                />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <BInputWithValidation
                  v-model="form.password"
                  label="Contraseña"
                  name="contraseña"
                  label-position="on-border"
                  type="password"
                  rules="required"
                  normal
                />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field
                  label="Ocupación o rol"
                  native-value="on-border"
                >
                  <b-select
                    v-model="form.group"
                    @input="selectGroup"
                  >
                    <option
                      v-for="option in groups"
                      :key="option.id"
                      :value="option"
                    >
                      {{ option.name }}
                    </option>
                  </b-select>
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
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'EditTypeResource',
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
  mounted () {
    this.getGroups()
  },
  methods: {
    async createOrUpdate () {
      this.isLoading = true
      this.form.email = this.form.username
      this.form.occupation = this.form.group.name
      try {
        await this.$store.dispatch('modules/typeResource/createOrUpdate', this.form)
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
    async getGroups () {
      try {
        const res = await this.$store.dispatch('modules/groups/getGroups')
        this.groups = res.results
        // console.log(res.results)
      } catch (error) {
        console.log(error)
      }
    },
    selectGroup (value) {
      this.form.groups = []
      this.form.groups.push(value.id)
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

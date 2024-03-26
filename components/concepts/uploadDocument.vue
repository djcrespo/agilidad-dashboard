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
          Subir catálogo de conceptos
        </p>
      </div>
      <div class="card-content">
        <section>
          <b-field>
            <b-upload
              v-model="csv"
              drag-drop
            >
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon
                      icon="upload"
                      size="is-large"
                    />
                  </p>
                  <p>Unicamente archivos con extensión <strong>.csv</strong></p>
                </div>
              </section>
            </b-upload>
          </b-field>

          <div class="tags">
            <span
              v-if="csv"
              class="tag is-primary"
            >
              {{ csv.name }}
              <button
                class="delete is-small"
                type="button"
                @click="deleteDropFile"
              />
            </span>
          </div>
        </section>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <b-button
            label="Cancelar"
            @click="cancel"
          />
        </div>
        <div class="card-footer-item">
          <b-button
            label="Guardar"
            type="is-primary"
            @click="createOrUpdate"
          />
        </div>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'UploadDocument',
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
      csv: null,
      isLoading: false
    }
  },
  methods: {
    async createOrUpdate () {
      this.isLoading = true
      try {
        const formData = new FormData()
        formData.append('csv', this.csv)
        await this.$store.dispatch('modules/concepts/uploadDocument', {
          id: this.idProject,
          data: formData
        })
        this.csv = null
        this.isLoading = false
        this.$emit('close')
      } catch (error) {
        this.isLoading = false
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    deleteDropFile () {
      this.csv = null
    },
    cancel () {
      this.csv = null
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

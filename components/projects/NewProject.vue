<template>
  <b-modal v-model="isActive">
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
        <ButtonGroup
          :handle-submit="handleSubmit"
          saving
          @save="createOrUpdate"
          @cancel="cancel"
        />
      </form>
    </ValidationObserver>
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
      form: {}
    }
  },
  methods: {
    async createOrUpdate () {
      try {
        await this.$store.dispatch('modules/projects/createOrUpdate', this.form)
      } catch (error) {
        console.log(error)
      }
    },
    cancel () {
      this.form = {}
      this.isActive = false
    }
  }
}
</script>

<style></style>

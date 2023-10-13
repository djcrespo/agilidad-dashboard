<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :vid="vid"
    :name="$attrs.name || $attrs.label"
    :rules="rules"
  >
    <b-field
      :class="margin"
      v-bind="$attrs"
      :type="{
        'is-danger': errors[0],
        'is-success': valid && !$attrs.readonly
      }"
      :message="getMessage(errors, valid, $attrs.message)"
    >
      <slot name="input">
        <!--
        <b-input v-if="!normal" v-model="innerValue" v-bind="$attrs" @input="innerValue = innerValue.toUpperCase()" />
        <b-input v-else v-model="innerValue" v-bind="$attrs" />
        -->
        <b-numberinput
          v-model="innerValue"
          v-bind="$attrs"
          :controls="false"
          step="0.01"
        />
      </slot>
    </b-field>
  </ValidationProvider>
</template>

<script>
import inputMixin from '@/mixins/input'
// You have to install cleave.js to use it:
// 'npm install cleave.js'
import Cleave from 'cleave.js'

/**
 * We add a new instance of Cleave when the element
 * is bound and destroy it when it's unbound.
 */
const cleave = {
  name: 'cleave',
  bind (el, binding) {
    const input = el.querySelector('input')
    input._vCleave = new Cleave(input, binding.value)
  },
  unbind (el) {
    const input = el.querySelector('input')
    input._vCleave.destroy()
  }
}

export default {
  directives: { cleave },
  mixins: [inputMixin],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    vid: {
      type: String
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    maskType: {
      type: String,
      default: null
    },
    normal: Boolean,
    margin: {
      type: String,
      default: 'mb-3'
    }
  },
  data () {
    return {
      valueNumber: 0,
      masks: {
        numeral: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
          prefix: '$ '
        }
      },
      maskUse: {}
    }
  },
  watch: {},
  methods: {
    getMessage (errors, valid, message) {
      if (errors[0]) {
        return errors[0]
      }
      return message
    }
  }
}
</script>

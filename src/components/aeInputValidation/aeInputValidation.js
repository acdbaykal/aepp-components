import AeButton from '../aeButton/aeButton.vue'

const alwaysValid = () => undefined

const mergeHandlers = function (componentVm, old, new_) {
  return typeof old === 'function' ? function () {
    const vm = componentVm.$children[0]
    const newBound = new_.bind(vm)
    old.apply(vm, arguments)
    newBound()
  } : new_
}

export default {
  name: 'ae-input-validation',
  components: {
    AeButton
  },
  data () {
    return {
      isValid: undefined,
      hasFocus: false
    }
  },
  props: {
    validateOnBlur: {
      type: Function,
      default: alwaysValid
    },
    validateOnInput: {
      type: Function,
      default: alwaysValid
    },
    maxlength: {
      type: Number,
      validator: function (value) {
        return value > 0 && parseInt(value) === value
      }
    }
  },
  computed: {
    inputVM () {
      const defaultSlot = this.$slots.default
      if (!defaultSlot || defaultSlot.length === 0) {
        return null
      }

      return defaultSlot[0].componentInstance
    },
    inputElement () {
      return this.$el
    },
    input () {
      return this.inputVM || this.inputElement
    }
  },
  methods: {
    onBlur () {
      this.hasFocus = false
      this.validateBlured()
    },
    onInput () {
      this.hasFocus = true
      this.validateFocused()
    },
    onFocus () {
      this.hasFocus = true
      this.validateFocused()
    },
    validateFocused () {
      const value = this.input.value
      this.$emit(
        'validation', this.validateOnInput(value)
      )
    },
    validateBlured () {
      const value = this.input.value
      this.$emit(
        'validation', this.validateOnBlur(value)
      )
    },
    validate () {
      if (this.hasFocus) {
        this.validateFocused()
      } else {
        this.validateBlured()
      }
    }
  },
  mounted () {
    const inputVM = this.$children[0]
    const validate = this.validate.bind(this)
    if (inputVM) {
      inputVM.$watch('value', validate)
    }
    validate()
  },
  render () {
    if (!this.$slots || !this.$slots.default) {
      return null
    }
    const vm = this
    const slotNode = this.$slots.default[0]

    if (!slotNode) {
      return null
    }

    const cloned = slotNode
    const data = cloned.data
    const oldOn = data.on || {}
    const oldOnInput = oldOn.input
    const oldOnBlur = oldOn.blur
    const oldOnFocus = oldOn.focus
    const newData = {
      ...data,
      on: {
        ...oldOn,
        input: mergeHandlers(vm, oldOnInput, vm.onInput),
        blur: mergeHandlers(vm, oldOnBlur, vm.onBlur),
        focus: mergeHandlers(vm, oldOnFocus, vm.onFocus)
      }
    }
    cloned.data = newData
    return cloned
  }
}

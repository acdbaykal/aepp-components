import AeValidatedTextInput from '../aeInputValidation/aeInputValidation.vue'
import AeLabel from '../aeLabel/aeLabel.vue'

export default {
  name: 'ae-labelled-text-input',
  components: {
    AeValidatedTextInput,
    AeLabel
  },
  data () {
    return {
      errorId: undefined,
      internalValue: this.value,
      validationHandler: undefined
    }
  },
  props: {
    defaultErrorMessage: {
      type: String
    },
    errorMessages: {
      type: Object,
      default () {
        return {}
      }
    },
    label: {
      type: String
    },
    validateOnBlur: {
      type: Function
    },
    validateOnInput: {
      type: Function
    },
    placeholder: {
      type: String
    },
    validMessage: {
      type: String
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    labelVM () {
      return this.$children[0]
    },
    errorMessage () {
      if (!this.errorId) {
        return
      }

      const message = this.errorMessages[this.errorId] || this.defaultErrorMessage
      return message
    },
    message(){
      return this._errorMessage() || this.validMessage()
    },
    labelMessageType () {
      if (!this.errorId) {
        return
      }

      return 'danger';
    }
  },
  methods: {
    onValidate (value) {
      this.errorId = value
    }
  },
  mounted () {
    const firstSlotNode = this.$slots.default[0]
    const childVM = firstSlotNode.componentInstance
    const validationHandler = this.onValidate.bind(this)
    childVM.$on('validation', validationHandler)
  }
}

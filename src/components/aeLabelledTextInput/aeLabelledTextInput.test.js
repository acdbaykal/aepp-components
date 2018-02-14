import {shallow} from 'vue-test-utils'
import AeLabelledTextInput from './aeLabelledTextInput.vue'
import AeLabelledTextInputPlugin from './index'
import AeLabel from '../aeLabel/aeLabel.vue'
import ValidationComponent from '../aeInputValidation/aeInputValidation.vue'

describe('AeLabelledTextInput', () => {
  const createShallowWrapper = (data = {}) => {
    return shallow(AeLabelledTextInput, {
      propsData: data,
      slots: {
        default: ValidationComponent
      }
    })
  }

  it('has an install function', () => {
    expect(AeLabelledTextInputPlugin).toBeInstanceOf(Function)
  })

  describe('basic rendering', () => {
    it('renders a AeLabel component and inserts the label property as the default slot of the label', () => {
      const label = 'lskfjls'
      const wrapper = createShallowWrapper({label})
      const labelWrapper = wrapper.find(AeLabel)
      expect(labelWrapper).toBeTruthy()
      expect(labelWrapper.vm.$slots.default[0].text).toBe(label)
    })

    it('renders what ever has been inserted as the default slot', () => {
      const wrapper = createShallowWrapper()
      const slotComponent = wrapper.find(ValidationComponent)
      expect(slotComponent.is(ValidationComponent)).toBe(true)
    })

    // it('forwards placeholder prop onto ae-input-validation element', () => {
    //   const placeholder = 'plchldr'
    //   const wrapper = createShallowWrapper({placeholder})
    //   const input = wrapper.find(AeValidatedTextInput)
    //   expect(input.vm.$props.placeholder).toBe(placeholder)
    // })

    // it('does NOT render a label element when label is not provided', () => {
    //   const wrapper = createShallowWrapper()
    //   expect(wrapper.contains('label')).toBe(false)
    // })

    // it('renders a AeValidatedTextInput', () => {
    //   const wrapper = createShallowWrapper()
    //   expect(wrapper.contains(AeValidatedTextInput)).toBe(true)
    // })

    // it('assigns input a radom id and assigns refers to it in the label\'s for attribute', () => {
    //   const wrapper = createShallowWrapper({label: 'ada'})
    //   const label = wrapper.find('label')
    //   const input = wrapper.find(AeValidatedTextInput)
    //   const forValue = label.element.getAttribute('for')
    //   const id = input.vm.$props.inputId
    //   expect(forValue).toBe(id + '')
    // })
  })

  describe('event handling', () => {
    it('renders error message when first slot element emits validate event with payload ' +
      'and payload is a defined key of error messages', () => {
      const message = 'lkjjl;kjl;k'
      const errorMessages = {
        'err': message
      }
      const wrapper = createShallowWrapper({errorMessages})
      const validation = wrapper.find(ValidationComponent)
      validation.vm.$emit('validation', 'err')
      return wrapper.vm.$nextTick().then(
        () => {
          const label = wrapper.find(AeLabel)
          expect(label.vm.$props.helpText).toBe(message)
          expect(label.vm.$props.helpType).toBe('danger')
        }
      )
    })

    it('renders default error message when input emits validate event with payload ' +
      'and payload is NOT a defined key of error messages', () => {
      const defaultErrorMessage = 'lkdfjlkjdl'
      const wrapper = createShallowWrapper({defaultErrorMessage})
      const input = wrapper.find(ValidationComponent)
      input.vm.$emit('validation', 'err')
      return wrapper.vm.$nextTick().then(
        () => {
          const label = wrapper.find(AeLabel)
          expect(label.vm.$props.helpText).toBe(defaultErrorMessage)
          expect(label.vm.$props.helpType).toBe('danger')
        }
      )
    })

    it('does NOT render any error message when input is in a valid state', () => {
      const defaultErrorMessage = 'lkdfjlkjdl'
      const wrapper = createShallowWrapper({defaultErrorMessage})
      const input = wrapper.find(ValidationComponent)
      input.vm.$emit('validation', undefined)
      return wrapper.vm.$nextTick().then(
        () => {
          const label = wrapper.find(AeLabel)
          expect(label.vm.$props.helpText).toBeUndefined()
          expect(label.vm.$props.helpType).toBeUndefined()
        }
      )
    })

    it('renders valid message if one was provided through props and no validation error is present', () => {
      const validMessage = 'lkdfjlkjdl'
      const wrapper = createShallowWrapper({validMessage})
      const input = wrapper.find(ValidationComponent)
      input.vm.$emit('validation', undefined)
      return wrapper.vm.$nextTick().then(
        () => {
          const label = wrapper.find(AeLabel)
          expect(label.vm.$props.helpText).toBe(validMessage)
          expect(label.vm.$props.helpType).toBeUndefined()
        }
      )
    })

    it('does NOT render valid message when input is in valid state but a validMessage prop was not provided', () => {
      const wrapper = createShallowWrapper()
      const input = wrapper.find(ValidationComponent)
      input.vm.$emit('validation', undefined)
      return wrapper.vm.$nextTick().then(
        () => {
          const label = wrapper.find(AeLabel)
          expect(label.vm.$props.helpText).toBeUndefined()
          expect(label.vm.$props.helpType).toBeUndefined()
        }
      )
    })
  })
})

import {shallow, mount, createLocalVue} from 'vue-test-utils'
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

  const createWrapper = (data = {}) => {
    return mount(AeLabelledTextInput, {
      propsData: data
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

    it.only('renders valid message if one was provided through props and no validation error is present', () => {
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

    it('does NOT render valid message when input is in valid state but a validMessage prop was not provided', (done) => {
      const wrapper = createShallowWrapper()
      const input = wrapper.find(AeValidatedTextInput)
      input.vm.$emit('validation', undefined)
      wrapper.vm.$nextTick(
        () => {
          const validMessageElement = wrapper.vm.$refs.validMessage
          expect(validMessageElement).toBeUndefined()
          done()
        }
      )
    })

    it('passes input event', () => {
      const value = 'afca'
      const wrapper = createShallowWrapper()
      const input = wrapper.find(AeValidatedTextInput)
      input.vm.$emit('input', value)
      const received = wrapper.emitted('input')
      expect(received).toBeTruthy()
      expect(received[0]).toEqual([value])
    })

    it('passes on validate event', () => {
      const wrapper = createShallowWrapper()
      const input = wrapper.find(AeValidatedTextInput)
      input.vm.$emit('validation', 'errId')
      const received = wrapper.emitted('validation')
      expect(received).toBeTruthy()
      expect(received.length).toBe(1)
      expect(received[0]).toEqual(['errId'])
    })

    it('passes on focus event', () => {
      const wrapper = createShallowWrapper()
      const input = wrapper.find(AeValidatedTextInput)
      input.vm.$emit('focus', 'val')
      const received = wrapper.emitted('focus')
      expect(received).toBeTruthy()
      expect(received.length).toBe(1)
    })

    it('passes on blur event', () => {
      const wrapper = createShallowWrapper()
      const input = wrapper.find(AeValidatedTextInput)
      input.vm.$emit('blur', 'val')
      const received = wrapper.emitted('blur')
      expect(received).toBeTruthy()
      expect(received.length).toBe(1)
      expect(received[0]).toEqual(['val'])
    })
    const testKeyEventForward = eventName => {
      const eventData = {
        keyCode: 13,
        key: 'Enter'
      }

      const wrapper = createWrapper()
      const input = wrapper.find('input')
      input.trigger(eventName, eventData)
      const receivedEvent = wrapper.emitted(eventName)
      expect(receivedEvent).toBeTruthy()
      expect(receivedEvent.length).toBe(1)
      // expect(receivedEvent[0][0]).toEqual(eventData)
    }

    it('emits keydown when the input does', () => {
      testKeyEventForward('keydown')
    })

    it('emits keyup when input does', () => {
      testKeyEventForward('keyup')
    })

    it('emits keypress when input does', () => {
      testKeyEventForward('keypress')
    })

    it('clears input when clearRequest is emitted', (done) => {
      const value = 'not empty'
      const wrapper = createShallowWrapper({value})
      const input = wrapper.find(AeValidatedTextInput)
      expect(input.vm.$props.value).toBe(value)
      input.vm.$emit('clearRequest')
      input.vm.$nextTick(() => {
        expect(input.vm.$props.value).toBe('')
        done()
      })
    })

    it('emit input event with empty value when clearRequest is recieved', () => {
      const wrapper = createShallowWrapper()
      const input = wrapper.find(AeValidatedTextInput)
      input.vm.$emit('clearRequest')
      const receivedEvent = wrapper.emitted('input')
      expect(receivedEvent).toBeTruthy()
      expect(receivedEvent.length).toBe(1)
      expect(receivedEvent[0][0]).toBe('')
    })

    it('reacts to value property change', (done) => {
      const value = 'not empty'
      const wrapper = createShallowWrapper()
      const input = wrapper.find(AeValidatedTextInput)
      expect(input.vm.$props.value).toBe('')
      input.setProps({
        value
      })
      input.vm.$nextTick(() => {
        expect(input.vm.$props.value).toBe(value)
        done()
      })
    })
  })
})

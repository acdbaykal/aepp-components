import {shallow, mount} from 'vue-test-utils'
import AeValidatedTextInput from './aeInputValidation.vue'
import AeTextValidatedInputPlugin from './index'
import AeInput from '../aeInput/aeInput.vue'

describe('AeInputValidation', () => {
  const createMountProps = (data = {}) => {
    return {
      propsData: data,
      slots: {
        default: AeInput
      }
    }
  }

  const createShallowWrapper = (data) => {
    return shallow(
      AeValidatedTextInput, createMountProps(data)
    )
  }

  const createWrapper = (data = {}) => {
    return mount(
      AeValidatedTextInput, createMountProps(data)
    )
  }

  it('has an install function', () => {
    expect(AeTextValidatedInputPlugin).toBeInstanceOf(Function)
  })

  describe('basic rendering', () => {
    it('renders an input provided as default slot', () => {
      const wrapper = createShallowWrapper()
      expect(wrapper.contains(AeInput)).toBe(true)
    })
  })

  describe('event handling', () => {
    it('emits validation event when input emits input event', () => {
      const wrapper = createWrapper()
      const input = wrapper.find(AeInput)
      input.trigger('input')
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent).toBeTruthy()
    })

    it('attaches validateOnInput call result to validate event when input emits input event', () => {
      const result = 'xaxaxax'
      const validateOnInput = () => result
      const wrapper = createWrapper({validateOnInput})
      const input = wrapper.find(AeInput)
      input.trigger('input')
      const receivedEvent = wrapper.emitted('validation')
      const eventCount = receivedEvent.length
      expect(receivedEvent[eventCount - 1][0]).toEqual(result)
    })

    it('emits validation event when input emits blur', () => {
      const wrapper = createWrapper()
      const input = wrapper.find(AeInput)
      input.trigger('blur')
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent).toBeTruthy()
    })

    it('attaches validateOnBlur call result to validate event when input emits blur', () => {
      const result = 'xaxaxax'
      const validateOnBlur = () => result
      const wrapper = createShallowWrapper({
        validateOnBlur
      })
      const input = wrapper.find(AeInput)
      input.setProps({value: result})
      input.trigger('blur')
      const receivedEvent = wrapper.emitted('validation')
      const eventCount = receivedEvent.length
      expect(receivedEvent[eventCount - 1][0]).toEqual(result)
    })

    it('emits validate when value property changes', () => {
      const wrapper = createShallowWrapper()
      const inputVM = wrapper.vm.$children[0]
      inputVM.value = 'asdadads'
      const initialEvent = wrapper.emitted('validation') || []
      const initialLength = initialEvent.length || 0

      inputVM.value = ',jhkjhkhkj'
      return wrapper.vm.$nextTick().then(() => {
        const receivedEvent = wrapper.emitted('validation')
        expect(receivedEvent).toBeTruthy()
        expect(receivedEvent.length).toBeGreaterThan(initialLength)
      })
    })
  })
})

describe('AeValidatedTextInput/input', () => {
  const createMountProps = (data = {}) => {
    return {
      propsData: data,
      slots: {
        default: '<input>'
      }
    }
  }

  const createShallowWrapper = (data) => {
    return shallow(
      AeValidatedTextInput, createMountProps(data)
    )
  }

  const createWrapper = (data = {}) => {
    return mount(
      AeValidatedTextInput, createMountProps(data)
    )
  }

  it('has an install function', () => {
    expect(AeTextValidatedInputPlugin).toBeInstanceOf(Function)
  })

  describe('basic rendering', () => {
    it('renders an input provided as default slot', () => {
      const wrapper = createShallowWrapper()
      expect(wrapper.is('input')).toBe(true)
    })
  })

  describe('event handling', () => {
    it('emits validation event when input emits input event', () => {
      const wrapper = createShallowWrapper()
      const input = wrapper.find('input')
      input.trigger('input')
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent).toBeTruthy()
    })

    it('attaches validateOnInput call result to validate event when input emits input event', () => {
      const result = 'xaxaxax'
      const validateOnInput = () => result
      const wrapper = createWrapper({validateOnInput})
      const input = wrapper.find('input')
      input.trigger('input')
      const receivedEvent = wrapper.emitted('validation')
      const eventCount = receivedEvent.length
      expect(receivedEvent[eventCount - 1][0]).toEqual(result)
    })

    it('emits validation event when input emits blur', () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      input.trigger('blur')
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent).toBeTruthy()
    })

    it('attaches validateOnBlur call result to validate event when input emits blur', () => {
      const result = 'xaxaxax'
      const validateOnBlur = () => result
      const wrapper = createShallowWrapper({
        validateOnBlur
      })
      const input = wrapper.find('input')
      input.trigger('blur')
      const receivedEvent = wrapper.emitted('validation')
      const eventCount = receivedEvent.length
      expect(receivedEvent[eventCount - 1][0]).toEqual(result)
    })

    // it.only('emits validate when value property changes', () => {
    //   const wrapper = createShallowWrapper()
    //   const input = wrapper.element
    //   input.value = 'asdadads'
    //   const initialEvent = wrapper.emitted('validation') || []
    //   const initialLength = initialEvent.length || 0
    //
    //   // wrapper.setProps({value: '.kj;kj'})
    //
    //   input.value = '.,jhkjhkjh'
    //   const receivedEvent = wrapper.emitted('validation')
    //   expect(receivedEvent).toBeTruthy()
    //   expect(receivedEvent.length).toBe(initialLength + 1)
    // })
  })
})

<template>
  <div>
    <ae-label :help-text="message" :help-type="labelMessageType">{{label}}</ae-label>
    <slot></slot>
  </div>
</template>
<script src="./aeLabelledTextInput.js">
  export {default} from './aeLabelledTextInput'
</script>
<style scoped lang="scss" src="./aeLabelledTextInput.scss"/>

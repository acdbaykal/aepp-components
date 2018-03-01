<template>
  <textarea
    class="ae-textarea"
    :class="{ monospace }"
    @input="handleInput"
    @copy="handleCopy"
  >{{value}}</textarea>
</template>

<script>
  export default {
    name: 'ae-textarea',
    props: {
      value: undefined,
      /**
       * Enables monospace font
       */
      monospace: Boolean
    },
    methods: {
      handleInput (inputEvent) {
        this.$emit('input', inputEvent.target.value)
      },
      handleCopy (clipboardEvent) {
        this.$emit('copy', clipboardEvent)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../extendables";

  .ae-textarea {
    @extend %text-area;

    &.monospace, &[type=password] {
      @extend %font-monospace;
    }
  }
</style>

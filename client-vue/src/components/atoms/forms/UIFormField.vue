<template lang="pug">
div.form-field
  
  slot
</template>

<style lang="scss">
.form-field {
  position: relative;
  display: block;
  @include box(100%, auto);
}
</style>

<template lang="pug">
div.public-layout
    RouterView
</template>

<style lang="scss">
.public-layout {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @include box(100%);
}
</style>

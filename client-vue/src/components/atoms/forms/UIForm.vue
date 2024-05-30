<template lang="pug">
form.form
  div.form--container
    div.form--content
      div.form__header(
        v-if="showHeader"
        data-test-id="form-header"
      )
        h3.form__header__title(
          v-if="title"
          data-test-id="form-title"
        ) {{ title }}
        slot(name="header")
      div.form__body
        slot
      div.form__footer(
        v-if="$slots.footer"
      )
        slot(name="footer")
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  showHeader?: boolean;
}

withDefaults(defineProps<Props>(), {
  showHeader: true,
});
</script>

<style lang="scss">
.form {
  @include box(100%);

  &--container {
    position: relative;
    @include padding-v(20px, 0px);
    @include box(100%);
  }

  &--content {
    position: relative;
    @include box(100%);
  }

  &__header {
    width: 100%;
    padding-bottom: 30px;

    &__title {
      display: block;
      width: max-content;
      font-size: 32px;
      font-weight: 400;
      margin: auto;
      @extend %transition;

      @include themify($themes) {
        color: themed("text", "primary");
      }
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    @include box(100%);
  }

  &__footer {
    width: 100%;
    @include padding-v(40px, 30px);
  }
}

.form__group {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.form__group-rtl {
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
}

.form__group-between {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>

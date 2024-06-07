<template lang="pug">
div.cell-option
  div.cell-option__content
    h5.cell-option__title(
      data-testid="cell-option-title"
    ) {{ title }}
    p.cell-option__description(
      v-if="description && showDescription"
      data-testid="cell-option-description"
    ) {{ description }}
  div.cell-option__control(
    v-if="$slots.default"
    data-testid="cell-option__control"
  )
    slot
  div.cell-option__chevron(
    v-if="showChevron"
    data-testid="cell-option__chevron"
  )
    UISymbol(
      :name="chevronIconName"
    )
</template>

<script setup lang="ts">
import UISymbol, { Symbols } from "@/components/atoms/base/icons/UISymbol.vue";

interface Props {
  title: string;
  description?: string;
  showDescription?: boolean;
  showChevron?: boolean;
  chevronIconName?: Symbols;
}

withDefaults(defineProps<Props>(), {
  showDescription: false,
  showChevron: false,
  chevronIconName: Symbols.ARROW_RIGHT,
});
</script>

<script lang="ts">
export enum CellOptionControllers {
  SWITCH = 0x00,
  CHECK_BOX = 0x01,
  BUTTON = 0x02,
  OPTION_PICKER = 0x03,
  INPUT = 0x04,
}
</script>

<style lang="scss">
.cell-option {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 32px;
  @include box(100%, auto);
  @include padding-v(20px);

  @include themify($themes) {
    border-bottom: 1px solid themed("border", "primary");
  }

  &__content {
    position: relative;
    display: block;
    width: 100%;
  }

  &__title {
    display: block;
    font-size: 15px !important;
    font-weight: 400;
    margin: 0;
    padding: 0;

    @include themify($themes) {
      color: themed("text", "primary");
    }
  }

  &__description {
    display: block;
    font-size: 12px !important;
    font-weight: 400;
    line-height: 150%;
    margin: 0;
    padding: 0;
    margin-top: 10px;

    @include themify($themes) {
      color: themed("text", "disabled");
    }
  }
}
</style>

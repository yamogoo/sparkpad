<template lang="pug">
div.welcome
  UIIcon.logo--lg(
    data-testid="logo"
    :name="Symbols.LOGO"
    :width="'220'"
    :size="undefined"
  )
  div.content-group-v
    div.content-group-h
      p Search for a note by name in the navigator
      UIKeyTooltip(
        :content="`${KeyboardSymbols.COMMAND} K`"
      )
    div.content-group-h
      p Open next tab
      UIKeyTooltip(
        :content="`${KeyboardSymbols.COMMAND} ]`"
      )
    div.content-group-h
      p Open previous tab
      UIKeyTooltip(
        :content="`${KeyboardSymbols.COMMAND} [`"
      )
</template>

<script setup lang="ts">
import UIIcon, { Symbols } from "@/components/atoms/base/icons/UIIcon.vue";
import UIKeyTooltip, {
  KeyboardSymbols,
} from "@/components/atoms/base/tooltips/UIKeyTooltip.vue";
</script>

<style lang="scss">
.welcome {
  .content-group-h {
    p {
      @include themify($themes) {
        color: themed("text", "disabled");
      }
    }
  }

  .logo--lg {
    padding: 80px;

    .symbol {
      svg {
        @include box(280px !important);

        @include themify($themes) {
          fill: url(#logo-gradient);
        }
      }
    }
  }
}

.content-group {
  &-h {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  &-v {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
}
</style>

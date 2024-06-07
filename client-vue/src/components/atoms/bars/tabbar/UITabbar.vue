<template lang="pug">
div.tabbar
  ul.tabbar__list
    li.tabbar__item(
      v-for="item, idx in items"
      :key="idx"
      data-testid="tabbar-item"
      @click="e => onClick(e, item)"
    )
      span.tabbar__item__name(
        data-testid="tabbar-item-name"
      ) {{ item.name }}
</template>

<script setup lang="ts">
interface Props {
  items: Array<any>;
}

withDefaults(defineProps<Props>(), {});

const emits = defineEmits<{
  (e: "open", item: TabbarItem): void;
}>();

const onClick = (e: MouseEvent | TouchEvent, item: TabbarItem): void => {
  e.preventDefault();
  e.stopImmediatePropagation();

  emits("open", item);
};
</script>

<script lang="ts">
export interface TabbarItem {
  id?: string | number;
  name: string;
  path: string;
}
</script>

<style lang="scss">
.tabbar {
  &__list {
    display: flex;
    flex-direction: row;
    gap: 20px;
    list-style: none;
  }

  &__item {
    cursor: pointer;

    &__name {
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>

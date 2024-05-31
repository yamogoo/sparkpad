<template>
  <svg
    class="avatar-thumbnail__symbol"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.58069 29.997C6.30275 24.2156 11.6591 20 18 20C24.341 20 29.6973 24.2156 31.4194 29.997C28.1234 33.6812 23.3325 36 18 36C12.6676 36 7.8767 33.6812 4.58069 29.997Z"
      fill="#333333"
    />
    <path
      d="M24 12C24 15.3137 21.3137 18 18 18C14.6863 18 12 15.3137 12 12C12 8.68629 14.6863 6 18 6C21.3137 6 24 8.68629 24 12Z"
      fill="#333333"
    />
  </svg>
</template>

<style lang="scss">
.avatar-thumbnail__symbol {
  @include themify($themes) {
    fill: themed("icon", "inactive");
  }
}
</style>

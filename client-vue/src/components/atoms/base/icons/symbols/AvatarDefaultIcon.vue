<template>
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="inherit"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.20893 28.4189C6.37318 27.5535 6.30213 26.2126 7.05272 25.2724C9.61797 22.0589 13.5685 20 18 20C22.4314 20 26.382 22.0589 28.9473 25.2723C29.6978 26.2126 29.6268 27.5535 28.7911 28.4189C26.0633 31.2435 22.2368 33 18 33C13.7632 33 9.93667 31.2435 7.20893 28.4189Z"
      fill="inherit"
    />
    <path
      d="M24 12C24 15.3137 21.3137 18 18 18C14.6863 18 12 15.3137 12 12C12 8.68629 14.6863 6 18 6C21.3137 6 24 8.68629 24 12Z"
      fill="inherit"
    />
  </svg>
</template>

<style scoped lang="scss">
svg {
  @extend %transition;

  @include themify($themes) {
    fill: themed("icon", "inactive");
  }
}
</style>

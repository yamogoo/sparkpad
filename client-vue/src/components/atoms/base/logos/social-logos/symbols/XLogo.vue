<template>
  <svg
    width="32"
    height="33"
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.045 13.5897L30.9498 0.0383301H28.1297L17.7885 11.8024L9.53509 0.0383301H0.0134277L12.4969 17.8294L0.0134277 32.0383H2.83348L13.747 19.6124L22.4651 32.0383H31.9868M3.8513 2.12086H8.18369L28.1276 30.0581H23.7941"
      fill="black"
    />
  </svg>
</template>

<style scoped lang="scss">
svg,
path {
  @include themify($themes) {
    fill: themed("background", "primary--invert");
  }
}
</style>

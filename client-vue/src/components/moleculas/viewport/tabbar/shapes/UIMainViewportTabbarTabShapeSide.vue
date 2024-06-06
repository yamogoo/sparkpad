<template>
  <div class="mian-viewport__tabbar-tab__shape__side">
    <div class="mian-viewport__tabbar-tab__shape__side--body"></div>
    <svg
      width="24"
      height="36"
      viewBox="0 0 24 36"
      fill="inherit"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0V0C6.62742 0 12 5.37258 12 12V12H0.000874186L0 0Z"
        fill="inherit"
      />
      <rect y="12" width="12" height="12" fill="inherit" />
      <path
        d="M11.9897 24V24C11.9897 30.6274 17.3635 36 23.9909 36V36H0.00174713L0 24H11.9897Z"
        fill="inherit"
      />
    </svg>
  </div>
</template>

<style lang="scss">
$__body-width: 12px;

.mian-viewport__tabbar-tab__shape__side {
  display: flex;
  flex-direction: column;
  fill: inherit;

  &--body {
    display: block;
    width: $__body-width;
  }
}
</style>

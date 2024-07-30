<template>
  <a-card class="self-card" title="风机控制" :bordered="false" headStyle="color:white">
    <BaseCheckbox :value="checked" label="风机拆解" @change="ontoggle" />
  </a-card>
</template>
<script setup>
import BaseCheckbox from '@/components/BaseCheckbox/index.vue'
import { inject, ref } from 'vue'

const turbineActions = inject('turbineActions')
const checked = ref(false)
const ontoggle = () => {
  checked.value = !checked.value

  if (checked.value) {
    turbineActions.equipmentDecomposeAnimation()
  } else {
    turbineActions.equipmentComposeAnimation()
  }
}
</script>
<style scoped>
.self-card {
  min-width: 150px;
  background: linear-gradient(to right, #03101d, rgba(0, 34, 51, 0.4));
}
</style>

<template>
  <a-card class="self-card" title="面板控制" :bordered="false" headStyle="color:white">
    <BaseCheckbox v-for="{ key, visible, label } in layoutModules" :key="key" :value="visible" :label="label"
      @change="onToggleByModuleName(key)" />
  </a-card>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/stores/layout'
import BaseCheckbox from '@/components/BaseCheckbox/index.vue'

const store = useLayoutStore()
const { layoutModules } = storeToRefs(store)
const { onToggleByModuleName } = store
</script>
<style scoped>
.self-card {
  min-width: 150px;
  background: linear-gradient(to right, #03101d, rgba(0, 34, 51, 0.4));
}
</style>
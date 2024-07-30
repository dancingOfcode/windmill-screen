<template>
  <BaseCollaspse title="面板控制">
    <BaseCheckbox
      v-for="{ key, visible, label } in layoutModules"
      :key="key"
      :value="visible"
      :label="label"
      @change="onToggleByModuleName(key)"
    />
  </BaseCollaspse>
</template>
<script setup >
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/stores/layout'
import BaseCheckbox from '@/components/BaseCheckbox/index.vue'
import BaseCollaspse from '@/components/BaseCollaspse/index.vue'

const store = useLayoutStore()
const { layoutModules } = storeToRefs(store)
const { onToggleByModuleName } = store
</script>

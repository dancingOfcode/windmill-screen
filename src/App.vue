<script setup>
import { storeToRefs } from 'pinia'
import Layout from '@/layout/index.vue'
import { useLayoutStore } from '@/stores/layout'
import BaseTurbine from '@/components/BaseTurbine/index.vue'
import Witgets from './widgets'

const { chunkModules } = storeToRefs(useLayoutStore())
</script>

<template>
  <Layout>
    <BaseTurbine>
      <template #left>
        <component :is="Witgets[item]" v-for="item in chunkModules.left" :key="item" />
      </template>
      <template #right>
        <component :is="Witgets[item]" v-for="item in chunkModules.right" :key="item" />
      </template>
      <template #control>
        <Witgets.ControlPanel></Witgets.ControlPanel>
        <Witgets.ControlTurbine></Witgets.ControlTurbine>
      </template>
    </BaseTurbine>
  </Layout>
</template>
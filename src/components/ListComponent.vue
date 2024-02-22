<script setup lang="ts">
import ListItemComponent from './ListItemComponent.vue'
import { useAmoStore } from '@/stores/store'

const store = useAmoStore()
</script>

<template>
    <ListItemComponent
        v-for="(item, index) in store.allInfo.slice().reverse()"
        :key="index"
        :entity="item"
        >{{ item }}</ListItemComponent
    >
</template>

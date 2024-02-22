<script setup lang="ts">
import { useAmoStore } from '@/stores/store'
import { useAmo } from '@/useAmo'
import { ref, toRefs, watch, computed } from 'vue'
import type { Company, Contact, Lead } from '@/types'

//typing
type Props = {
    title: string
}
type Emits = {
    addLead: []
    addCompany: []
    addContact: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { title } = toRefs(props)

const store = useAmoStore()

const btn = ref({} as HTMLButtonElement)

//loading effect
const isLoading = ref(false)

const buttonInner = computed<string>(() => {
    if (isLoading.value) {
        return ''
    } else return title.value
})

const callback = function () {
    isLoading.value = true
    switch (document.querySelector('select')?.value) {
        case 'Сделка': {
            emit('addLead')
            break
        }
        case 'Контакт': {
            emit('addContact')
            break
        }
        case 'Компания': {
            emit('addCompany')
            break
        }
    }
    console.log(store.allInfo)

    setTimeout(() => {
        isLoading.value = false
    }, 500)
}
</script>

<template>
    <button ref="btn" @click="callback" :class="{ loading: isLoading }">
        <div>
            {{ buttonInner }}
        </div>
    </button>
</template>

<style scoped>
button {
    width: 30%;
    height: 3em;
    background-color: #fff;
    color: #3498db;
    border: none;
    border-radius: 2px;
    margin: 0.5em;
    /* padding: 10px 20px; */
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    font-size: 1.5em;
    font-weight: 500;
    /* transition: background-color 0.3s ease; */
}

button.loading {
    padding: 1px;
    background-image: url('@/assets/loading.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}

img {
    width: auto;
    height: 100%;
}

button:active {
    background-color: #3498db;
    color: #fff;
}
</style>

<script setup lang="ts">
import { useAmoStore } from '@/stores/store'
import { ref, toRefs, watch } from 'vue'

//typing
type Props = {
    states: string[]
}

const props = defineProps<Props>()

const { states } = toRefs(props)

const store = useAmoStore()
const select = ref({} as HTMLSelectElement)

// watch(select.value, (value: HTMLSelectElement) => {
//     console.log('Store has changed chosen state')
//     store.chosenState = value.value
// })
</script>

<template>
    <select ref="select">
        <option v-for="state in states" :key="state" :value="state">
            {{ state }}
        </option>
    </select>
</template>

<style scoped>
select {
    width: 60%;
    height: 3em;
    background-color: #1f99cd;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20256%20448%22%20enable-background%3D%22new%200%200%20256%20448%22%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E.arrow%7Bfill%3A@{arrow}%3B%7D%3C%2Fstyle%3E%3Cpath%20class%3D%22arrow%22%20d%3D%22M255.9%20168c0-4.2-1.6-7.9-4.8-11.2-3.2-3.2-6.9-4.8-11.2-4.8H16c-4.2%200-7.9%201.6-11.2%204.8S0%20163.8%200%20168c0%204.4%201.6%208.2%204.8%2011.4l112%20112c3.1%203.1%206.8%204.6%2011.2%204.6%204.4%200%208.2-1.5%2011.4-4.6l112-112c3-3.2%204.5-7%204.5-11.4z%22%2F%3E%3C%2Fsvg%3E%0A');
    background-position: right 10px center;
    background-repeat: no-repeat;
    background-size: auto 50%;
    border-radius: 2px;
    border: none;
    color: #ffffff;
    padding-left: 10px;
    /* padding: 15px 100px 15px 10px; */
    margin: 0.5em;
    font-size: 1.5em;

    outline: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
}

@-moz-document url-prefix() {
    select {
        color: rgba(0, 0, 0, 0);
        text-shadow: 0 0 0 #ffffff;
    }
}
</style>

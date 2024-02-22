<script setup lang="ts">
import type { Company, Contact, Lead } from '@/types'
import { ref, toRefs, onBeforeMount, computed } from 'vue'

type Props = {
    entity: Lead | Company | Contact
}
const props = defineProps<Props>()

const { entity } = toRefs(props)

const icon = computed<string>(() => {
    switch (entityType.value) {
        case 'Компания': {
            return 'src/assets/company.png'
        }
        case 'Контакт': {
            return 'src/assets/contact.png'
        }
        case 'Сделка': {
            return 'src/assets/lead.png'
        }
    }
    return ''
})

const entityType = computed<string>(() => {
    if (entity.value.entityName.includes('Компания')) {
        return 'Компания'
    }
    if (entity.value.entityName.includes('Контакт')) {
        return 'Контакт'
    }
    if (entity.value.entityName.includes('Сделка')) {
        return 'Сделка'
    }
    return ''
})
</script>
<template>
    <div class="item">
        <img class="icon" :src="icon" />
        <div class="details">
            <h3>{{ entity.entityName }}</h3>
            <div>Id = {{ entity.id }}</div>
        </div>
    </div>
</template>

<style scoped>
.item {
    margin: 2rem;
    height: 5em;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.details {
    flex: 1;
    margin-left: 1rem;
    font-size: 1.5rem;
}

.icon {
    display: flex;
    place-items: center;
    place-content: center;
    width: 52px;
    height: 52px;

    color: var(--color-text);
}

h3 {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
}

@media (min-width: 1024px) {
    .item {
        margin-top: 0;
        padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
    }

    i {
        top: calc(50% - 25px);
        left: -26px;
        position: absolute;
        border: 1px solid var(--color-border);
        background: var(--color-background);
        border-radius: 8px;
        width: 50px;
        height: 50px;
    }

    .item:before {
        content: ' ';
        border-left: 1px solid var(--color-border);
        position: absolute;
        left: 0;
        bottom: calc(50% + 25px);
        height: calc(50% - 25px);
    }

    .item:after {
        content: ' ';
        border-left: 1px solid var(--color-border);
        position: absolute;
        left: 0;
        top: calc(50% + 25px);
        height: calc(50% - 25px);
    }

    .item:first-of-type:before {
        display: none;
    }

    .item:last-of-type:after {
        display: none;
    }
}
</style>

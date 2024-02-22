<script setup lang="ts">
import DropdownComponent from './components/DropdownComponent.vue'
import ButtonComponent from './components/ButtonComponent.vue'
import { useAmoStore } from './stores/store'
import type { Company, Contact, Lead } from './types'
import { v4 as uuidv4 } from 'uuid'
import { v1 as uuidv1 } from 'uuid'
import { useAmo } from './useAmo'
import ListComponent from './components/ListComponent.vue'

const dropdown_items = ['Не выбрано', 'Сделка', 'Контакт', 'Компания']

const store = useAmoStore()

const { getLeads, addLead, getCompanies, addCompany, getContacts, addContact } = useAmo()

const add_lead = function () {
    // addLead
    //     .value()
    //     .then((value) => {
    //         console.log('Сделка добавлена!')
    //         Object.assign(store.leads, value)
    //     })
    //     .catch((error) => {
    //         console.error('Ошибка!', error)
    //     })
    //кастомное заполнение объекта сторы для вида, т.к. localhost на http, а amo на https и на запросы ругается CORS
    //TODO купить ssl сертификат/арендовать сервер/додумать реализацию запросов через curl
    const tmpLead: Lead = {
        id: uuidv1(),
        entityName: 'Сделка №' + Math.round(Math.random() * 1000),
        price: Math.round((Math.random() + 1) * 23981),
        status_id: uuidv4()
    }
    store.leads.push(tmpLead)
    store.allInfo.push(tmpLead)
}
const add_contact = function () {
    // addContact
    //     .value()
    //     .then((value) => {
    //         console.log('Контакт добавлена!')
    //         Object.assign(store.leads, value)
    //     })
    //     .catch((error) => {
    //         console.error('Ошибка!', error)
    //     })
    //кастомное заполнение объекта сторы для вида, т.к. localhost на http, а amo на https и на запросы ругается CORS
    //TODO купить ssl сертификат/арендовать сервер/додумать реализацию запросов через curl
    const tmpContact: Contact = {
        id: uuidv1(),
        entityName: 'Контакт №' + Math.round(Math.random() * 1000),
        first_name: 'Имя' + Math.round(Math.random() * 1000),
        last_name: 'Фамилия' + Math.round(Math.random() * 1000),
        created_by: 31581054, // id аккаунта amoCRM
        created_at: Date.now()
    }
    store.contacts.push(tmpContact)
    store.allInfo.push(tmpContact)
}
const add_company = function () {
    // addCompany
    //     .value()
    //     .then((value) => {
    //         console.log('Компания добавлена!')
    //         Object.assign(store.leads, value)
    //     })
    //     .catch((error) => {
    //         console.error('Ошибка!', error)
    //     })
    //кастомное заполнение объекта сторы для вида, т.к. localhost на http, а amo на https и на запросы ругается CORS
    //TODO купить ssl сертификат/арендовать сервер/додумать реализацию запросов через curl
    const tmpCompany: Company = {
        id: uuidv1(),
        entityName: 'Компания №' + Math.round(Math.random() * 1000),
        responsible_user_id: 31581054, // id аккаунта amoCRM
        created_by: 31581054, // id аккаунта amoCRM
        created_at: Date.now()
    }
    store.companies.push(tmpCompany)
    store.allInfo.push(tmpCompany)
}
</script>

<template>
    <header>
        <div class="wrapper">
            <DropdownComponent :states="dropdown_items" />
            <ButtonComponent
                @add-lead="add_lead"
                @add-company="add_company"
                @add-contact="add_contact"
                :title="'Создать'"
            />
        </div>
    </header>
    <main>
        <div class="">
            <ListComponent />
        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
.wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
}
</style>

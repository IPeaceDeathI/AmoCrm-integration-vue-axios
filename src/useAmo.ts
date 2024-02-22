import axios from 'axios'
import { computed, ref } from 'vue'
import { useAmoStore } from './stores/store'
import { v4 as uuidv4 } from 'uuid'

// import axiosCurlirize from 'axios-curlirize'

// axiosCurlirize(axios)

export function useAmo() {
    const apiUrl = 'https://boykodenis200332.amocrm.ru' // Замените на URL вашего API amoCRM
    const store = useAmoStore()

    // const getAuthCode = async () => {
    //     return await axios
    //         .post(apiUrl, data, {
    //             headers: {
    //                 client_id: store.integrationId,
    //                 client_secret: store.secret,
    //                 grant_type: 'authorization_code',
    //                 code: store.authCode,
    //                 redirect_uri: 'http://localhost:5173'
    //             }
    //         })
    //         .then((response) => {
    //             console.log(response)
    //             store.authCode = response.data.access_token
    //         })
    // }

    const getAccessToken = async () => {
        await axios
            .post(apiUrl + '/oauth2/access_token', '', {
                headers: {
                    'Content-Type': 'application/json',
                    client_id: store.integrationId,
                    client_secret: store.secret,
                    grant_type: 'authorization_code',
                    code: store.authCode
                }
            })
            .then((response) => {
                console.log(response)
                store.accessToken = response.data.access_token
            })
            .catch((error: string) => {
                console.log(error)
            })
    }

    // try {
    //     getAccessToken()
    // } catch (error) {
    //     console.error('Error:', error) // Обработка ошибок
    //     throw new Error('Failed to send POST request to amoCRM API')
    // }

    const getLeads = ref(async () => {
        await axios
            .get(apiUrl + '/api/v4/leads', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + store.accessToken
                    // Дополнительные заголовки, если необходимо
                }
            })
            .then((response) => {
                store.leads = [...response.data]
            })
    })

    const addLead = ref(async () => {
        await axios.post(apiUrl + '/api/v4/leads', '', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer' + store.accessToken,
                name: 'Lead №' + Math.random() * 1000,
                price: (Math.random() + 1) * 23981,
                status_id: uuidv4()
                // Дополнительные заголовки, если необходимо
            }
        })
    })

    const getCompanies = ref(async () => {
        await axios
            .get(apiUrl + '/api/v4/companies', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + store.accessToken
                    // Дополнительные заголовки, если необходимо
                }
            })
            .then((response) => {
                store.companies = [...response.data]
            })
    })

    const addCompany = ref(async () => {
        await axios.post(apiUrl + '/api/v4/companies', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer' + store.accessToken,
                name: 'Company №' + Math.random() * 1000,
                responsible_user_id: 31581054, // id аккаунта amoCRM
                created_by: 31581054, // id аккаунта amoCRM
                created_at: Date.now()
                // Дополнительные заголовки, если необходимо
            }
        })
    })

    const getContacts = ref(async () => {
        await axios
            .get(apiUrl + '/api/v4/contacts', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + store.accessToken
                    // Дополнительные заголовки, если необходимо
                }
            })
            .then((response) => {
                store.contacts = [...response.data]
            })
    })

    const addContact = ref(async () => {
        await axios.post(apiUrl + '/api/v4/contacts', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer' + store.accessToken,
                name: 'Contact №' + Math.random() * 1000,
                first_name: 'FirstName' + Math.random() * 1000,
                last_name: 'FirstName' + Math.random() * 1000,
                created_by: 31581054, // id аккаунта amoCRM
                created_at: Date.now()
                // Дополнительные заголовки, если необходимо
            }
        })
    })

    return { getLeads, addLead, getCompanies, addCompany, getContacts, addContact } // Возвращаем функции для работы с API amoCRM
}

export default class Finances {
    #emergencyFund;

    constructor(num) {
        this.#emergencyFund = num || 0;
    }

    static async trading212() {
        const api_key = '5293395ZnnxxirylbYdyLLxzRYxuQCXHibDe';
        const api_secret = 'r95klZ7jFnngESx_iqYnf14FNm8LyfcQGje4tfnEzI0';

        // Кодируем ключи в Base64 для Basic авторизации
        const credentials = `${api_key}:${api_secret}`;
        const encoded = btoa(credentials);

        // Используем публичный CORS-прокси
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'https://live.trading212.com/api/v0/equity/account/cash';

        try {
            const response = await fetch(proxyUrl + targetUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${encoded}`
                }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            console.log('💰 Баланс:', data);
            return data.total;

        } catch (error) {
            console.error('❌ Ошибка:', error);
            console.log('💡 Попробуйте сначала открыть: https://cors-anywhere.herokuapp.com/ и нажать "Request temporary access"');
            return null;
        }
    }

    addEmergencyFund(num) {
        return this.#emergencyFund += Number(num);
    }

    getEmergencyFund() {
        return Number(this.#emergencyFund);
    }
}
import Settings from "./settings.js";

export default class Finances {
    #emergencyFund;
    static TRADING_212 = {
        proxyUrl: 'https://cors-anywhere.herokuapp.com/',
        targetUrl: 'https://live.trading212.com/api/v0/equity/account/summary',
        credentialsEncoded: async () => {
            return btoa(`${await Settings.getValue('apiKey')}:${ await Settings.getValue('apiSecret')}`);
        }
    }

    constructor(num) {
        this.#emergencyFund = num || 0;
    }

    static async trading212() {
        try {
            const response = await fetch(this.TRADING_212.proxyUrl + this.TRADING_212.targetUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${await this.TRADING_212.credentialsEncoded()}`
                }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            // return Math.floor(data.total-data.invested);
            return data;

        } catch (error) {
            console.error('❌ Ошибка:', error);
            console.log('💡 Попробуйте сначала открыть: https://cors-anywhere.herokuapp.com/ и нажать "Request temporary access"');
            return null;
        }
    }

    addEmergencyFund(num) {
        this.#emergencyFund += Number(num);
        return true;
    }
    getEmergencyFund() {
        return Number(this.#emergencyFund);
    }
}
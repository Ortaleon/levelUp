export default class Finances{
    #emergencyFund;
    constructor(num) {
        this.#emergencyFund = num || 0;
    }

    addEmergencyFund(num){
        return this.#emergencyFund+=Number(num);
    }
    getEmergencyFund(){
        return Number(this.#emergencyFund);
    }
}
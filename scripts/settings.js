import Saves from "./saves.js";

export default class Settings{
    static #settings;
    static #isReady = false;
    constructor() {
        this.settingsForm = document.forms.settings;
        this.bindEvent();
    }

    static async #init() {
        if(this.#isReady) return;

        this.#settings = new Map(Object.entries(await Saves.getData('settings')));
        this.#isReady = true;
    }

    static async getValue(name){
        await this.#init();
        return this.#settings.get(name);
    }


     async filingInTheFields() {
         this.settingsForm.apiKey.value = await Settings.getValue('apiKey');
         this.settingsForm.apiSecret.value = await Settings.getValue('apiSecret');
     }
     bindEvent() {
        window.addEventListener('load', async (e) => {
            if(this.settingsForm != undefined) await this.filingInTheFields();
        });
        document.addEventListener('click', (e) => {
            if(e.target.classList.contains('settings__save')){
                e.preventDefault();
                const formData = new FormData(this.settingsForm);
                const dataObj = {};
                for (const [key, value] of formData) {
                    dataObj[key] = value;
                }
                Saves.setData(dataObj,'settings');
            }
        });
    }
}

const s = new Settings();

//todo добавить загрузку и сохранение настроек, а также использование их в других скриптах
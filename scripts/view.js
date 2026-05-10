import Finances from "./finances.js";

export default class View {
    #levelElement;
    #progressBarElement;
    #progressCircleElement;
    #taskListElement;
    #emergencyFundElement;
    #selectors = {
        level: '[data-js-level]',
        progress: '[data-js-progress-bar]',
        list: '[data-js-task-list]',
        circle: '[data-js-progress-circle]',
        emergencyFund: '[data-js-emergency-fund]'

    }

    constructor({ level, progress, max }, tasks, num, traidingAmount) {
        this.#levelElement = document.querySelector(this.#selectors.level);
        this.#progressBarElement = document.querySelector(this.#selectors.progress);
        this.#progressCircleElement = document.querySelector(this.#selectors.circle);
        this.#taskListElement = document.querySelector(this.#selectors.list);
        this.#emergencyFundElement = document.querySelector(this.#selectors.emergencyFund);

        this.showLevel(level);
        this.showProgressBar(progress, max);
        this.showEmergencyFund(num);
        if(traidingAmount != null){
            this.showInvestedAmount(traidingAmount.investments.currentValue);
        }
        if (tasks) this.showTasks(tasks);


    }

    #taskFormationHtml(tasks) {
        let list = '';
        tasks.forEach(({id, task, status}) => {
            list +=
                `<li class="checkbox-wrapper">
                    <input id="${id}" type="checkbox" ${status == 'completed'? 'checked disabled' : ''} data-js-task-toggle="${id}">
                    <label for="${id}">${task}</label>
                </li>`;
        });
        return list;
    }
    showLevel(level){
        this.#levelElement.textContent = level;
    }
    showProgressBar(progress, max){
        this.#progressBarElement.textContent = `${progress}/${max}`;
        this.updateCircleProgress((progress/max)*100);
    }
    showTasks(tasks){
        if (tasks.length == 0) return ;
        this.#taskListElement.innerHTML = this.#taskFormationHtml(tasks);
    }
    showEmergencyFund(num){
        this.#emergencyFundElement.textContent = `${num}`;
    }

    showInvestedAmount(amount){
        const elem = document.createElement('div');
        elem.classList.add('finances__emergency-fund');
        elem.innerHTML = `
            <svg width="70" height="70" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="16" width="48" height="32" rx="10" fill="none" stroke="#E7BDFE" stroke-width="2"></rect>
                <text x="32" y="38" text-anchor="middle" font-size="18" color="#E7BDFE" fill="#E7BDFE" font-family="Arial, sans-serif" font-weight="bold">zl</text>
                <path d="M12 20 H52 M12 44 H52" stroke="#E7BDFE" stroke-width="1.5" stroke-dasharray="3 3"></path>
            </svg>
            <span data-js-emergency-fund="">${amount}</span>`;
        document.querySelector('.finances').appendChild(elem);
    }
    updateCircleProgress(percent) {
        const radius = 54;
        const circumference = 2 * Math.PI * radius;

        const offset = circumference - (percent / 100) * circumference;
        this.#progressCircleElement.style.strokeDashoffset = offset;
    }

}
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

    constructor({ level, progress, max }, tasks, num) {
        this.#levelElement = document.querySelector(this.#selectors.level);
        this.#progressBarElement = document.querySelector(this.#selectors.progress);
        this.#progressCircleElement = document.querySelector(this.#selectors.circle);
        this.#taskListElement = document.querySelector(this.#selectors.list);
        this.#emergencyFundElement = document.querySelector(this.#selectors.emergencyFund);

        this.showLevel(level);
        this.showProgressBar(progress, max);
        this.showEmergencyFund(num);
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
    async showEmergencyFund(num){
        this.#emergencyFundElement.textContent = `${num}zl(${await Finances.trading212() || 0})`;
    }
    updateCircleProgress(percent) {
        const radius = 54;
        const circumference = 2 * Math.PI * radius; // 339.3

        // Вычисляем offset: 0% = 339.3, 100% = 0
        const offset = circumference - (percent / 100) * circumference;
        this.#progressCircleElement.style.strokeDashoffset = offset;
    }

}
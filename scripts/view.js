export default class View {
    #levelElement;
    #progressBarElement;
    #taskListElement;
    #selectors = {
        level: '[data-js-level]',
        progress: '[data-js-progress-bar]',
        list: '[data-js-task-list]'
    }

    constructor({ level, progress, max }, tasks) {
        this.#levelElement = document.querySelector(this.#selectors.level);
        this.#progressBarElement = document.querySelector(this.#selectors.progress);
        this.#taskListElement = document.querySelector(this.#selectors.list);

        this.showLevel(level);
        this.showProgressBar(progress, max);
        if (tasks) this.showTasks(tasks);

    }

    #taskFormationHtml(tasks) {
        let list = '';
        tasks.forEach(({id, task, status}) => {
            list +=
                `<li>
                    <input type="checkbox" ${status == 'completed'? 'checked disabled' : ''} data-js-task-toggle="${id}">
                    ${task}(${status})
                </li>`;
        });
        return list;
    }
    showLevel(level){
        this.#levelElement.textContent = level;
    }
    showProgressBar(progress, max){
        this.#progressBarElement.textContent = `${progress}/${max}`;
    }
    showTasks(tasks){
        this.#taskListElement.innerHTML = this.#taskFormationHtml(tasks);
    }

}
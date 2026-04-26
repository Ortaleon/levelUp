export default class View {
    #levelElement;
    #progressBarElement;
    #taskListElement;

    constructor({ level, progress, max }, tasks) {
        this.#levelElement = document.querySelector('[data-js-level]');
        this.#progressBarElement = document.querySelector('[data-js-progress-bar]');
        this.#taskListElement = document.querySelector('[data-js-task-list]');

        this.showLevel(level);
        this.showProgressBar(progress, max);
        if (tasks) this.showTasks(tasks);

    }

    taskFormationHtml(tasks) {
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
        this.#taskListElement.innerHTML = this.taskFormationHtml(tasks);
    }

}
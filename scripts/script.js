import Saves from './saves.js';
import Users from './users.js';
import Tasks from './tasks.js';
import Logs from './logs.js';
import View from "./view.js";

class Controller {
    saves;
    async init(){
        this.saves = new Saves();
        await this.saves.init();

        this.tasks = new Tasks(await this.load('tasks'));
        this.user = new Users(await this.load('user'));
        this.view = new View(this.user, this.tasks.get());

        this.bindEvents();
    }

    async completeTask(id) {
        const task = this.tasks.find(id);
        const taskList = this.tasks.complete(task);

        if (taskList) {
            this.view.showTasks(taskList);
            this.view.showProgressBar(
                this.user.progressUp(task.reward),
                this.user.max
            );
            this.view.showLevel(this.user.level);

            await this.save(taskList, 'tasks');
            await this.save(this.user, 'user');
        }
    }

    async addTask() {
        const formData = {
            text: document.getElementsByName('task')[0].value,
            reward: document.getElementsByName('exp')[0].value
        }

        const taskList = this.tasks.create(formData);
        await this.save(taskList, 'tasks');
        this.view.showTasks(taskList);
    }

    async load(file) {
        return await this.saves.getData(file);
    }
    async save(data, file = '') {
        await this.saves.setData(data, file);
    }

    bindEvents(){
        document.addEventListener('click', (event) => {
            const taskId = event.target.getAttribute('data-js-task-toggle');

            if (taskId != null) {
                this.completeTask(taskId);
            } else if (event.target.hasAttribute('data-js-task-add')) {
                this.addTask();
            }
        })
    }
}


const control = new Controller();
await control.init();


//TODO Не показывать выполненные задачи не сегодняшнего дня
//TODO Логи
//TODO Создать класс Task, а Tasks => List


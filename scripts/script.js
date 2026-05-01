import Saves from './saves.js';
import Users from './users.js';
import List from './list.js';
import Logs from './logs.js';
import Task from "./task.js";
import View from "./view.js";
// import Generator from "./generator.js";

class Controller {
    saves;
    async init(){
        this.saves = new Saves();
        await this.saves.init();

        this.tasksList = new List(await this.load('tasks'));
        this.user = new Users(await this.load('user'));
        this.view = new View(this.user, this.tasksList.getCurrentTasks());
        // this.generator = new Generator();

        this.bindEvents();
    }

    async completeTask(id) {
        let task = this.tasksList.findById(id).complete();

        if (this.tasksList.edit(task)) {
            this.view.showTasks(this.tasksList.getCurrentTasks());
            this.view.showProgressBar(
                this.user.progressUp(task),
                this.user.max
            );
            this.view.showLevel(this.user.level);

            await this.save(this.tasksList.getAll(), 'tasks');
            await this.save(this.user, 'user');
        }
    }

    async addTask() {
        const formData = {
            text: document.getElementsByName('task')[0].value,
            reward: document.getElementsByName('exp')[0].value
        }
        // this.generator.callDeepSeek(formData.text);

        if(this.tasksList.create(formData)){
            await this.save(this.tasksList.getAll(), 'tasks');
            this.view.showTasks(this.tasksList.getCurrentTasks());
        }
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
//TODO Укрепить инкапсуляцию




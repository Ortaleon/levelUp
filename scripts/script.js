import Saves from './saves.js';
import Users from './users.js';
import List from './list.js';
import Logs from './logs.js';
import Task from "./task.js";
import View from "./view.js";
import Finances from "./finances.js";
// import Generator from "./generator.js";

class Controller {
    saves;
    async init(){
        this.tasksList = new List(await Saves.getData('tasks'));
        this.user = new Users(await Saves.getData('user'));
        this.finances = new Finances(await Saves.getData('finances'));
        this.view = new View(
            this.user,
            this.tasksList.getCurrentTasks(),
            this.finances.getEmergencyFund(),
            await Finances.trading212()
        );
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

            await Saves.setData(this.tasksList.getAll(), 'tasks');
            await Saves.setData(this.user, 'user');
        }
    }

    async addTask() {
        const formData = {
            text: document.getElementsByName('task')[0].value,
            reward: document.getElementsByName('exp')[0].value
        }
        // this.generator.callDeepSeek(formData.text);

        if(this.tasksList.create(formData)){
            await Saves.setData(this.tasksList.getAll(), 'tasks');
            this.view.showTasks(this.tasksList.getCurrentTasks());
        }
    }

    async addMoney(){
        const num = prompt('Сколько ты отложил денег сегодня?');
        this.finances.addEmergencyFund(num);

        await this.view.showEmergencyFund(this.finances.getEmergencyFund());
        await Saves.setData(this.finances.getEmergencyFund(), 'finances');
        return true;
    }

    bindEvents(){
        document.addEventListener('click', (event) => {
            const taskId = event.target.getAttribute('data-js-task-toggle');

            if (taskId != null) {
                this.completeTask(taskId);
            } else if (event.target.hasAttribute('data-js-task-add')) {
                this.addTask();
            } else if(event.target.closest('.finances__emergency-fund')){
                this.addMoney();
            }
        })
    }
}


const control = new Controller();
await control.init();


//TODO Не показывать выполненные задачи не сегодняшнего дня
//TODO Логи
//TODO Укрепить инкапсуляцию
//TODO Добавить дейлики и т.п





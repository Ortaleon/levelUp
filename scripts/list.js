import Task from "./task.js";
import Calendar from "./calendar.js";

export default class List {
    #taskList;
    constructor(tasks) {
        this.#taskList = tasks;
    }

    getAll() {
        return this.#taskList;
    }
    getOpenTasks() {
        return this.#taskList.filter(({status}) => status === Task.STATUS_OPEN);
    }
    getCompletedTasks() {
        return this.#taskList.filter(({status}) => status === Task.STATUS_COMPLETED);
    }
    findById(id){
        const task = this.#taskList.find((task) => id == task.id);
        if (!task) return null;
        return new Task(task);
    }

    edit(task){
        try {
            const id = this.#taskList.findIndex(({id}) => id == task.id);
            if (id === -1) return false;
            this.#taskList[id] = task;
            return true;
        }
        catch (error){
            console.log(error.message);
            return false;
        }
    }
    create({text, reward}){
        try{
            const task = new Task({
                    id : this.#taskList? this.#taskList.at(-1).id + 1 : 0,
                    createdDate: Calendar.getTodayDate(),
                    task: text,
                    reward: {exp: reward}
                }
            );
            if (Array.isArray(this.#taskList)) this.#taskList.push(task);
            else this.#taskList = [task];

            return true;
        }
        catch (error){
            console.log(error.message);
            return false;
        }

    }

}
import Calendar from "./calendar.js";

export default class Task {
    static STATUS_OPEN = 'open';
    static STATUS_COMPLETED = 'completed';
    constructor({id, createdDate, task, reward}) {
            this.id = id;
            this.createdDate = createdDate;
            this.completedDate = '';
            this.status = Task.STATUS_OPEN;
            this.task = task;
            this.reward = reward;
    }

    complete() {
        if (this.status !== Task.STATUS_OPEN) return false;

        this.status = Task.STATUS_COMPLETED;
        this.completedDate = Calendar.getTodayDate();
        return this;
    }
}
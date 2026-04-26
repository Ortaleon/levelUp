export default class Tasks {
    #taskList;
    #today;
    constructor(tasks) {
        this.#taskList = tasks;

        const completedDate = new Date();
        this.#today = `${completedDate.getDate()}.${completedDate.getMonth()}.${completedDate.getFullYear()}`;
    }

    get(status = 'all'){
        if(status === 'all') return this.#taskList;
        else if(status === 'completed') return this.#taskList.filter(({status}) => status === 'completed');
        else if(status === 'open') return this.#taskList.filter(({status}) => status === 'open');
    }
    find(id){
        return this.#taskList.find((task) => id == task.id);
    }
    complete(task){
        if(task.status == 'open'){
            task.status = 'completed';
            task.completedDate = this.#today;
            return this.edit(task);
        }
    }

    edit(task){
        const id = this.#taskList.findIndex(({id}) => id == task.id);
        this.#taskList[id] = task;
        return this.get();
    }
    create({text, reward}){
        const task =     {
            id: this.#taskList? this.#taskList.at(-1).id + 1 : 0,
            createdDate: this.#today,
            completedDate: '',
            status: 'open',
            task: text,
            reward: {exp: reward}
        }
        if (this.#taskList) this.#taskList.push(task);
        else this.#taskList = [task];
        return this.get();

    }

}
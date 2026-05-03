export default class Saves {
    #files;
    async init() {
        this.#files = new Map();
        const opfsRoot = await navigator.storage.getDirectory();

        this.#files.set('user', await opfsRoot.getFileHandle('user', {create:true}));
        this.#files.set('logs', await opfsRoot.getFileHandle('logs', {create:true}));
        this.#files.set('tasks', await opfsRoot.getFileHandle('tasks', {create:true}));
        this.#files.set('finances', await opfsRoot.getFileHandle('finances', {create:true}));
    }

    getData = async (fileName) => {
        try{const file = await this.#files.get(fileName).getFile();
            const text = await file.text();

            return JSON.parse(text);}
        catch (error){
            console.log(error.message);
        }
    }

    setData = async (data, fileName) => {
        const writable = await this.#files.get(fileName).createWritable();
        await writable.write(JSON.stringify(data));
        await writable.close();
    }
}
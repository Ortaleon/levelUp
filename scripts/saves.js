// export default class Saves {
//     #files;
//     async init() {
//         this.#files = new Map();
//         const opfsRoot = await navigator.storage.getDirectory();
//
//         this.#files.set('user', await opfsRoot.getFileHandle('user', {create:true}));
//         this.#files.set('logs', await opfsRoot.getFileHandle('logs', {create:true}));
//         this.#files.set('tasks', await opfsRoot.getFileHandle('tasks', {create:true}));
//         this.#files.set('finances', await opfsRoot.getFileHandle('finances', {create:true}));
//     }
//
//     getData = async (fileName) => {
//         try{const file = await this.#files.get(fileName).getFile();
//             const text = await file.text();
//
//             return JSON.parse(text);}
//         catch (error){
//             console.log(error.message);
//         }
//     }
//
//     setData = async (data, fileName) => {
//         const writable = await this.#files.get(fileName).createWritable();
//         await writable.write(JSON.stringify(data));
//         await writable.close();
//     }
// }


export default class Saves {
    static #files = null;
    static #ready = false;

    static async #ensureInit() {
        if (this.#ready) return;

        this.#files = new Map();
        const opfsRoot = await navigator.storage.getDirectory();
        const fileNames = ['user', 'logs', 'tasks', 'finances', 'settings'];

        for(name of fileNames) {
            this.#files.set(name, await opfsRoot.getFileHandle(name, {create: true}));
        }
        this.#ready = true;
    }

    static async getData(fileName) {
        await this.#ensureInit();
        try {
            const file = await this.#files.get(fileName).getFile();
            const text = await file.text();
            return JSON.parse(text);
        } catch (error) {
            console.log(`[Saves] Ошибка чтения ${fileName}:`, error.message);
            return null;
        }
    }

    static async setData(data, fileName) {
        await this.#ensureInit();
        try {
            const writable = await this.#files.get(fileName).createWritable();
            await writable.write(JSON.stringify(data, null, 2));
            await writable.close();
        } catch (error) {
            console.log(`[Saves] Ошибка записи ${fileName}:`, error.message);
        }
    }

    static async has(fileName) {
        await this.#ensureInit();
        return this.#files.has(fileName);
    }
    static async keys() {
        await this.#ensureInit();
        return Array.from(this.#files.keys());
    }
}
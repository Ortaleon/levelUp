export default class Generator{
    #apiUrl = 'https://api.deepseek.com/chat/completions';
    #apiKey = 'sk-f887b50bb44f4b5ba82ac2fac2631738';

    send() {
        fetch('https://api.deepseek.com/chat/completions',{
            method: 'post',

        })
    }
    async callDeepSeek(task) {
        const response = await fetch(this.#apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.#apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-v4-flash",
                messages: [
                    { role: "system", content: "Ты система LevelUp приложения. Ты генерируешь награду за задачи в зависемости от сложности, которые пользователь себе выставляет. Типы наград: опыт за основной уровень, опыт для повышения базовых характеристик." },
                    { role: "user", content: task }
                ],
                thinking: { type: "disabled" },
                stream: false
            })
        });

        const data = await response.json();
        console.log(data);
        return data;
    }
}

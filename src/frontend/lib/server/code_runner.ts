import axios, { Axios } from 'axios';

const SERVER_URL = process.env.NEXT_PUBLIC_CODE_SERVER_URL
const options = {
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    }
}

class CodeServerAPI {
    esAxios: Axios;

    constructor() {
        this.esAxios = axios.create(options);
    }

    async runCode(code: string, language: string) {
        if (["javascript"].includes(language)) {
            const response = await this.esAxios.post(`${SERVER_URL}/run`, {
                code,
                language,
            });
            return response.data;
        } else if (language === "markdown") {
            //process markdown
            return "Done MARKDOWN"
        } else {
            throw new Error("Language not supported");
        }
    }
}

export default new CodeServerAPI();
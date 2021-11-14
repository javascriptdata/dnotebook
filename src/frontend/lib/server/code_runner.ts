const SERVER_URL = process.env.NEXT_PUBLIC_CODE_SERVER_URL
class ServerAPI {
    /**
     * Executes the code in the given language. Intermediary results like those in
     * loops and other functions are sent to the callback.
     * @param content The code/content to execute/compile.
     * @param language The language the content is written in.
     * @param callback A callback that is called with the result/intermediate result of the execution.
     * @returns A promise that resolves when the execution is finished.
     * @throws Error if the language is not supported.
     */
    async exec(content: string, language: string, callback: (accumulatedResult: string) => void) {
        if (["javascript"].includes(language)) {
            // TODO: Get the flavor of javascript used from the selected language.
            const jsFlavor = "ES6"; //Temporarily hardcoded for now.
            return this.runCodeInNodeJs(content, jsFlavor, callback);
        } else if (language === "markdown") {
            //TODO: process markdown
            return callback("Done MARKDOWN")
        } else {
            throw new Error("Language not supported");
        }
    }

    /**
     * Runs the code in nodejs server.
     * @param content The code/content to execute/compile.
     * @param jsFlavor The flavor of javascript used. ES6, JavaScript, TypeScript, etc.
     * @param callback A callback that is called with the result/intermediate result of the execution.
     * @returns A promise that resolves when the execution is finished.
     * */
    async runCodeInNodeJs(code: string, jsFlavor: string, callback: (accumulatedResult: string) => void) {
        fetch(`${SERVER_URL}/nodejs/run`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code,
                jsFlavor,
            }),
        })
            .then(response => response.body)
            .then(body => body?.getReader())
            .then(reader => {
                let textAccumulator = "";
                const read = () => reader?.read().then(({ done, value }) => {
                    if (done) {
                        return;
                    }
                    const text = new TextDecoder("utf-8").decode(value);
                    try {
                        const textInJson = JSON.parse(text)

                        if (typeof textInJson === 'object' && textInJson !== null) {

                            if ("___$hasError" in textInJson) {
                                callback(textInJson)

                            } else {
                                textAccumulator += text
                                callback(textAccumulator)
                            }
                        } else {
                            textAccumulator += text
                            callback(textAccumulator)
                        }
                    } catch (error) {
                        callback(text)
                    }

                    read();
                });
                read();
            });
    }
}

export default new ServerAPI();
const runCode = (code: string, language: string) => {
    console.log(`Running code in ${language}`);
    console.log(code)
    return code + " Executed!";
}

export {
    runCode
}
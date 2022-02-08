
const generateBashCode = (code: string) => {
    let formatedCmd = code.trim().split(" ")
    let cmd = formatedCmd[0]
    let args = formatedCmd.slice(1).slice().map(arg => `"${arg}"`).join(",")

    return `
    spw = spawn("${cmd}", [${args}])
    str = ""

    spw.stdout.on('data', (data) => {
        str += data.toString();

        let lines = str.split('\\n');

        for (let i = 0; i < lines.length; i++) {
            if (i == lines.length - 1) {
                str = lines[i];
            } else {
                res.write(lines[i] + '<br />');
            }
        }
    });

    spw.on('close', function (code) {
        res.end(str);
    });

    spw.on('error', function (data) {
        res.end('stderr: ' + data);
    });
    `
}

export {
    generateBashCode
}


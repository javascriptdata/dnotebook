
(function (global) {
    /**
     * Formats an array into a Dom friendly format
     * @param {Array} val 
     */
    function print_val(val) {
        /// Neeed refactoring. Lot of duplicated line of code
        if (Array.isArray(val[0])) {
            let row_length = val.length;
            let data_string = "[";
            if (row_length > 10) {

                for (let i = 0; i < 10; i++) {
                    let row_val = val[i]
                    let col_length = row_val.length;
                    data_string += "[";
                    if (col_length > 10) {
                        for (let j = 0; j < 10; j++) {
                            data_string += j == 9 ? `${row_val[j]}` : `${row_val[j]},`
                        }
                        data_string += `.......${col_length - 10} more],`
                    } else {

                        for (let j = 0; j < col_length; j++) {
                            data_string += j == (col_length - 1) ? `${row_val[j]}` : `${row_val[j]},`
                        }
                        data_string += i == (row_length - 1) ? "]" : "],"
                    }
                }
                data_string += `...${row_length - 10} more]`
            }
            else {
                for (let i = 0; i < row_length; i++) {
                    let row_val = val[i]
                    let col_length = row_val.length;
                    data_string += "[";

                    if (col_length > 10) {
                        for (let j = 0; j < 10; j++) {
                            data_string += j == 9 ? `${row_val[j]}` : `${row_val[j]},`
                        }
                        data_string += `.......${col_length - 10} more],`

                    } else {
                        for (let j = 0; j < col_length; j++) {
                            data_string += j == (col_length - 1) ? `${row_val[j]}` : `${row_val[j]},`
                        }
                        data_string += i == (row_length - 1) ? "]" : "],"
                    }
                }
                data_string += "]"
            }
            return data_string

        } else {

            let row_length = val.length;
            let data_string = "["
            let count = row_length > 10 ? 10 : row_length

            for (let i = 0; i < count; i++) {
                data_string += i == (count - 1) ? `${val[i]}` : `${val[i]},`
            }

            let diff = row_length - count;

            if (diff > 0) {
                data_string += `....${diff} more]`
            } else {
                data_string += "]";
            }
            return data_string;

        }
    }

    /**
     * Returns the id of the current cell's output div
     */
    function this_div() {
        let id = `#out_${window.current_cell}`
        let rand_div_name = `random_div_#${id}`
        html = `
        <div class="col-md-1"></div>
        <div class="col-md-9" id=${rand_div_name}>
        </div>
        <div class="col-md-2"></div>
        `
        $(`${id}`).append(html)
        return rand_div_name
    }


    /**
     * Creates multiple divs for plotting in an output cell
     * @param {String} name of the div to create
     * @param {Function} callback 
     */
    function viz(name, callback) {
        // utility function to enabling ploting
        // create the ploting div needed

        let id = `#out_${window.current_cell}`
        $(`${id}`).append(`<div id=${name}></div>`)
        let cb = callback(name);
    }

    /**
     * Displays Danfo DataFrame/Series in a formated table
     * @param {DataFrame} df 
     */
    function table(df) {
        const { col_types, series, columns, index, values } = df;
        let head = ""

        if (series) {
            head += `<th class="${col_types[0]}">${columns}</th>`
        } else {
            columns.forEach((name, i) => {
                head += `<th class="${col_types[i]}">${name}</th>`
            });
        }

        let body = ""
        values.forEach((row, i) => {
            let b_String = `<tr><th>${index[i]}</th>`

            if (series) {
                b_String += `<td class="${col_types[0]}">${row}</td>`
            } else {
                row.forEach((v, j) => {
                    b_String += `<td class="${col_types[j]}">${v}</td>`
                });
            }

            b_String += "</tr>"
            body += b_String;
        });

        const table = `
            <div style="overflow: auto; max-height: 300px;"><table class="df-table" border="1">
            <thead>
                <tr>
                <th></th>
                ${head}
                </tr>
            </thead>
            <tbody>
                ${body}
            </tbody>
            </table>
            </div>
        `
        return table;
    }

    /**
     * Internal function to convert notebook source to json format
     * @param {*} cells_order 
     * @param {*} scope 
     * @param {*} md_scope 
     */
    function notebook_json(cells_order, scope, md_scope) {

        var store = {}

        for (let i = 0; i < cells_order.length; i++) {

            let key = cells_order[i];
            let key_split = key.split("-")
            let id = key_split[1]

            let type = key_split[0].split("_")[1]
            if (type == "text") {

                let md_out = md_scope[`text-div_${Number(id)}`]
                let text_output = $(`#cell-${id}`).html()
                store[`cell-${id}`] = {
                    "out": text_output,
                    "md": md_out
                }
            }
            else {
                let cell_content = scope[key].getValue()
                let cell_output = $(`#out_${key}`).html()

                    store[`cell-${id}`] = {
                    "in": cell_content,
                    "out": cell_output
                }
            }

        }
        
        store = JSON.stringify(store);
        return store
    }



    /**
     * load package scripts via CDN into scope
     * @param {Array} array of package CDNs to load
     * @param {*} callback 
     */
    function load_package(array, callback) {

        document.getElementById("cell-running").style.display = "block"
        let loader = function (src, handler) {
            let script = document.createElement("script");
            script.src = src;
            script.onload = script.onreadystatechange = function () {
                script.onreadystatechange = script.onload = null;
                handler();
            }
            let head = document.getElementsByTagName("head")[0];
            (head || document.body).appendChild(script);
        };
        (function run() {
            if (array.length != 0) {
                loader(array.shift(), run);
            } else {
                callback && callback();
            }
            document.getElementById("cell-running").style.display = "none"
        })();
    }


    /**
     * Helper function to load CSV data into Danfo.js Data Structure
     * @param {String} path to CSV data. 
     */
    async function load_csv(path) {
        document.getElementById("cell-running").style.display = "block"
        let df = await dfd.read_csv(path)
        document.getElementById("cell-running").style.display = "none"
        return df
    }



    /**
     * Internal function to generate markdown cells when loading notebook
     * @param {*} id of the current cell
     */
    function md_load(id) {
        let md = `<div class="row" style="margin-top: 10px;" id="cell-${id}"></div>`
        return md;
    }

    /**
     * Internal function to generate html cells {code and output block} when loading notebook
     * @param {*} new_id 
     */
    function html_load(new_id) {

        let html = `
        <div class="row" style="margin-top: 10px;" id="cell-${new_id}">
        <div class="col-md-1">
            <p id="cell-num" class="code_symbol">[${new_id}]</p>
        </div>
        <div id="div-${new_id}" class="col-md-9">
            <div id="btn-actions-${new_id}" class="btn-group-horizontal text-center" style="display: none;">
                <button type="button" id="run_div-${new_id}" class="btn btn-sm btn-success run"><i
                        class="fas fa-play"></i>Run</button>
                <div class="btn-group" role="group" aria-label="Basic example">
                    
                    <button type="button" id="add_code_down_btn-${new_id}" class="btn btn-sm  btn-info add-code">
                        <i class="fas fa-sort-down" style="margin-top: -10px;"></i> Code
                    </button>
                    <button type="button" id="add_code_up_btn-${new_id}" class="btn btn-sm btn-info add-code">
                        <i class="fas fa-sort-up"></i> Code
                    </button>

                </div>

                <div class="btn-group" role="group" aria-label="Basic example">
                
                    <button type="button" id="add_text_down_btn-${new_id}" class="btn btn-sm btn-info add-text">
                        <i class="fas fa-sort-down" style="margin-top: -10px;"></i> Text
                    </button>
                    <button type="button" id="add_text_up_btn-${new_id}" class="btn btn-sm btn-info add-text">
                    <i class="fas fa-sort-up"></i> Text
                </button>
                </div>

                <button type="button" id="del-btn_${new_id}" class="btn btn-sm btn-danger del"><i
                        class="fas fa-trash-alt"></i>
                    </button>
            </div>

        </div>
        <div class="col-md-2"></div>
        <div class="col-md-1"></div>
        <div id="out_div-${new_id}" class="col-md-9 out-divs">

        </div>
        <div class="col-md-2"></div>
        </div>
        `
        return html;
    }


    /**
     * Internal function to parse the json to notebook
     * @param {*} json 
     */
    function load_notebook(json) {
        cells_order = []

        for (let key in json) {
            let id = key.split("-")[1]

            if (Object.prototype.hasOwnProperty.call(json[key], "in")) {
                let html = html_load(id)
                $(".content").append(html)

                const editor = CodeMirror(document.getElementById(`div-${id}`), {
                    lineNumbers: true,
                    tabSize: 1,
                    mode: 'javascript',
                    theme: 'monokai',
                    value: '',
                    extraKeys: { "Ctrl-Space": "autocomplete" },
                    autoCloseBrackets: true,
                    matchBrackets: true
                });
                let input = json[key]["in"]
                editor.getDoc().setValue(input);

                vars_in_scope[`div-${id}`] = editor
                cells_order.push(`div-${id}`)

                let out = json[key]["out"]
                $(`#out_div-${id}`).html(out);
                $(`#div-${id}`)
                    .mouseover(function () {
                        $(`#btn-actions-${id}`).show()
                    })
                    .mouseout(function () {
                        $(`#btn-actions-${id}`).hide()
                    });

                $(`#div-${id}`).keydown(function (e) {
                    if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
                        exec_cell(`run_div-${id}`);

                    }
                });

            } else {
                let md = md_load(id)
                $(".content").append(md);

                let out = json[key]["out"]
                $(`#cell-${id}`).html(out)

                let md_out = json[key]["md"]
                md_texts[`text-div_${Number(id)}`] = md_out;
                vars_in_scope[`div_text-${id}`] = ""
                cells_order.push(`div_text-${id}`)

                $(`textarea#text-box_${id}`).addClass("text-box")
                $(`textarea#text-box_${id}`).val(md_out)
                update_text_box_size()

                $(`#text-div_${id}`)
                    .mouseover(function () {
                        document.getElementById(`btn-actions-${id}`).style.display = "block"
                    })
                    .mouseout(function () {
                        document.getElementById(`btn-actions-${id}`).style.display = "none"
                    });
            }

            __code_cell_count = parseInt(id)

        }
    }



    /**
     * Helper function to update text box size dynamically
     */
    function update_text_box_size() {
        $('textarea').each(function () {
            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
        }).on('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }


    /**
     * Helper function to easily log output from for loops in Dom
     * @param {*} args 
     */
    function forLoop_log(args) {
        let id = `#out_${window.current_cell}`
        $(`${id}`).append(`${args}<br />`)

    }

    console.forlog = forLoop_log

    ///IMPORT FUNCTION TO GLOBAL SCOPE///////
    global.print_val = print_val
    global.this_div = this_div
    global.viz = viz
    global.notebook_json = notebook_json
    global.load_notebook = load_notebook
    global.load_package = load_package
    global.load_csv = load_csv
    global.table = table

})(window)
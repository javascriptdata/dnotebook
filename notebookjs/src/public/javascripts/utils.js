
function print_val(val) {

    if (Array.isArray(val[0])) {

        let col_length = val[0].length;
        let row_length = val.length;

        let data_string = "[";
        if (row_length > 10) {

            for (let i = 0; i < 10; i++) {

                let row_val = val[i]

                data_string += "[";
                if (col_length > 10) {

                    for (let j = 0; j < 10; j++) {
                        data_string += `${row_val[j]},`
                    }

                    data_string += `.......${col_length - 10} more],`
                } else {

                    for (let j = 0; j < col_length; j++) {
                        data_string += `${row_val[j]},`
                    }
                    data_string += "],"
                }
            }
            data_string += `...${row_length - 10} more]`
        }
        else {
            for (let i = 0; i < row_length; i++) {

                let row_val = val[i]

                data_string += "[";
                if (col_length > 10) {

                    for (let j = 0; j < 10; j++) {
                        data_string += `${row_val[j]},`
                    }

                    data_string += `.......${col_length - 10} more],`
                } else {

                    for (let j = 0; j < col_length; j++) {
                        data_string += `${row_val[j]},`
                    }
                    data_string += "],"
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

            data_string += `${val[i]},`
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

function this_div() {
    let id = `#out_${window.current_cell}`
    let rand_div_name = `random_div_#${id}`
    $(`${id}`).append(`<div id=${rand_div_name}></div>`)
    return rand_div_name
}


function viz(name, callback) {
    // out_div-1
    let id = `#out_div${window.current_cell}`
    $(`${id}`).append(`<div id=${name}></div>`)

    let cb = callback(name);

    return cb
}

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
  `;

    return table;

}

function notebook_json(cells_order,scope, md_scope) {

    var store = {}

    for (let i=0; i < cells_order.length; i++) {

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


//load package scripts
function LoadPackage(array, callback) {
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
    })();
}

function md_load(id) {

    let md = `<div class="row" style="margin-top: 10px;" id="cell-${id}"></div>`

    return md;
}

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

function load_notebook(json) {


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
                value: ''
            });
            let input = json[key]["in"]
            editor.getDoc().setValue(input);

            vars_in_scope[`div-${id}`] = editor

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
                    // document.getElementById("cell_spinner-1").style.display = "block"
                    // document.getElementById("cell_num-1").style.display = "none"
                    exec_cell(`run_div-${id}`);
        
                }
            });

        } else {

            let md = md_load(id)

            $(".content").append(md);

            let out = json[key]["out"]
            $(`#cell-${id}`).html(out)

            let md_out = json[key]["md"]
            // console.log(md_out)
            md_texts[`text-div_${Number(id)}`] = md_out;

            vars_in_scope[`div_text-${id}`] = ""

            $(`textarea#text-box_${id}`).addClass("text-box")
            $(`textarea#text-box_${id}`).val(md_out)
            // update_text_box_size()

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


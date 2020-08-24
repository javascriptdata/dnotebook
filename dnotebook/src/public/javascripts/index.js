//first editor cell
const editor = CodeMirror(document.getElementById('div-1'), {
    lineNumbers: true,
    tabSize: 4,
    mode: 'javascript',
    theme: 'monokai',
    value: '',
    extraKeys: { "Ctrl-Space": "autocomplete" },
    autoCloseBrackets: true,
    matchBrackets: true
});

//Run first cell on CTRL ENTER Pressed
$(`#div-1`).keydown(function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
        exec_cell(`run_div-1`);

    }
});


$("#div-1")
    .mouseover(function () {
        $("#btn-actions-1").show()
    })
    .mouseout(function () {
        $("#btn-actions-1").hide()
    });



var md = new Remarkable()

//Global Params
var vars_in_scope = { "div-1": editor }
var cells_order = ["div-1"] // store the cells in order of creation
var md_texts = {} //stores markdown text and corresponding div name
var __code_cell_count = 1 //stores cell count



/**
 * Executes a code cell
 * @param {String} c_id Id of the code cell
 */
function exec_cell(c_id) {
    let id = c_id.split("_")[1]
    let count = c_id.split("-")[1]
    window.current_cell = id;
    $(`#out_${id}`).html("")

    try {
        let output = ("global", eval)(vars_in_scope[id].getValue())
        let command = vars_in_scope[id].getValue()
        if (Array.isArray(output)) {
            output = print_val(output)
        } else if (typeof output === 'object' && output !== null) {
            output = JSON.stringify(output)
            if (output == "{}") {
                output = ""
            }
        } else if (command.includes("console.log(")) {
            //retreive value from the console function
            console.oldLog = console.log;
            console.log = function (value) {
                return value;
            };
            output = eval(vars_in_scope[id].getValue());

            if (Array.isArray(output)) {
                output = print_val(output)
            } else {
                if (typeof output === 'object' && output !== null) {
                    output = JSON.stringify(output)
                    if (output == "{}") {
                        output = ""
                    }
                }

            }
            console.log(output)

        }

        if (command.includes("table") || command.includes("plot") || command.includes("console.log(")) {
            $(`#out_${id}`).html(output);
        }

        count = parseInt(count) + 1
        let div_count = `div-${count}`
        window.current_cell = div_count

    } catch (error) {
        $(`#out_${id}`).html("")
        $(`#out_${id}`).html(error)
        console.log(error)

    }
}


/**
 * Creates a new cell in specified position
 * @param {String} c_id ID of the current cell
 * @param {String} where Position to place the cell. (up/down)
 */
function add_new_code_cell(c_id, where) {
    __code_cell_count += 1
    let last_scope_id = parseInt(Object.keys(vars_in_scope).pop().split("-")[1])
    let id = c_id.split("-")[1]
    if (where == "down") {
        where = "down"
    } else {
        where = "up"
    }

    let new_id = parseInt(last_scope_id) + 1
    let parent_cell_id = `cell-${id}`
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
    <div id="out_div-${new_id}" class="col-md-9 out-divs"></div>
    <div class="col-md-2"></div>
</div>
`

    let divReference = document.getElementById(parent_cell_id);

    if (where == "up") {
        divReference.insertAdjacentHTML("beforebegin", html);
        let current_cell_id = cells_order.indexOf(`div-${id}`)
        cells_order.splice(current_cell_id, 0, `div-${new_id}`)
    } else {
        divReference.insertAdjacentHTML("afterend", html);
        cells_order[new_id - 1] = `div-${new_id}`
    }

    let editor = CodeMirror(document.getElementById(`div-${new_id}`), {
        lineNumbers: true,
        tabSize: 2,
        mode: 'javascript',
        theme: 'monokai',
        value: '',
        extraKeys: { "Ctrl-Space": "autocomplete" },
        autoCloseBrackets: true,
        matchBrackets: true
    });
    vars_in_scope[`div-${new_id}`] = editor

    $(`#div-${new_id}`)
        .mouseover(function () {
            $(`#btn-actions-${new_id}`).show()
        })
        .mouseout(function () {
            $(`#btn-actions-${new_id}`).hide()
        });


    //run cell on CTRL-ENTER Pressed
    $(`#div-${new_id}`).keydown(function (e) {
        if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
            exec_cell(`run_div-${new_id}`);

        }
    });

}

/**
 * Creates a new text cell in specified position
 * @param {String} c_id ID of the current cell
 * @param {String} where Position to place the cell. (up/down)
 */
function add_new_text_cell(c_id, where) {
    __code_cell_count += 1
    let last_scope_id = parseInt(Object.keys(vars_in_scope).pop().split("-")[1])
    let id = c_id.split("-")[1]

    if (where == "down") {
        where = "down"
    } else {
        where = "up"
    }

    let new_id = parseInt(last_scope_id) + 1
    let parent_cell_id = `cell-${id}`

    let html = `
        <div class="row" style="margin-top: 10px;" id="cell-${new_id}">
            <div class="col-md-1">
                 <p id="cell-num" class="code_symbol">[${new_id}]</p>
            </div>

            <div id="text-div_${new_id}" class="col-md-9">
                <div id="btn-actions-${new_id}" class="btn-group-horizontal text-center" style="margin-bottom: 2px;">
                    <button type="button" id="run_md_div-${new_id}" class="btn btn-sm btn-success run"><i class="fas fa-play"></i>
                        Run</button>
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

                    <button type="button" id="del-text_${new_id}" class="btn btn-sm btn-danger del"><i
                            class="fas fa-trash-alt"></i>
                    </button>
                </div>

                <textarea id="text-box_${new_id}" class="text-box"></textarea>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-1"></div>
            <div id="out-text-div_${new_id}" style="display:block;" class="col-md-9 text-out-box"></div>
            <div class="col-md-2"></div>

        </div>

        `


    let divReference = document.getElementById(parent_cell_id);

    if (where == "up") {
        divReference.insertAdjacentHTML("beforebegin", html);
        let current_cell_id = cells_order.indexOf(`div_text-${id}`)
        cells_order.splice(current_cell_id, 0, `div_text-${new_id}`)
    } else {
        divReference.insertAdjacentHTML("afterend", html);
        cells_order[new_id - 1] = `div_text-${new_id}`
    }

    // console.log(cells_order)
    vars_in_scope[`div_text-${new_id}`] = ""

    update_text_box_size()

    $(`#text-div_${new_id}`)
        .mouseover(function () {
            document.getElementById(`btn-actions-${new_id}`).style.display = "block"
        })
        .mouseout(function () {
            document.getElementById(`btn-actions-${new_id}`).style.display = "none"
        });


}

/**
 * Deletes a cell by specified ID
 * @param {*} id 
 */
function delete_cell(id) {
    if (__code_cell_count == 1) {
        document.getElementsByClassName("del").disable = true
    } else {
        row_id = `cell-${Number(id)}`
        var div_ele = document.getElementById(row_id);
        div_ele.parentNode.removeChild(div_ele);
        __code_cell_count -= 1
    }

}


/**
 * Executes a cell on button run click
 */
$(document).on("click", "button.run", function () {
    if (this.id.split("_").includes("md")) {
        let id = this.id.split("-")[1]
        let val = document.getElementById(`text-box_${id}`).value
        show_md(id, val)
    } else {
        exec_cell(this.id);
    }
})


/**
 * Deletes a cell on button delete click
 */
$(document).on("click", "button.del", function () {
    let id_split = this.id.split("_")
    let id = id_split[1]
    let btn_type = id_split[0].split("-")[1]

    if(btn_type =="text"){

        let div_scope = `div_text-${id}`
        let md_scope = `text-div_${id}`

        delete md_texts[md_scope]
        delete vars_in_scope[div_scope]

        let cell_index = cells_order.indexOf(div_scope)
        cells_order.splice(cell_index,1) 
    }else{
        let div_scope = `div-${id}`
        delete vars_in_scope[div_scope]

        let cell_index = cells_order.indexOf(div_scope)
        cells_order.splice(cell_index,1) 
    }
    delete_cell(id)
})


/**
 * Adds a code cell on button add-code click
 */
$(document).on("click", "button.add-code", function () {
    let where;
    if (this.id.split("_").includes("down")) {
        where = "down"
    } else {
        where = "up"
    }
    add_new_code_cell(this.id, where)
})

/**
 * Adds a markdown cell on button add-text click
 */
$(document).on("click", "button.add-text", function () {
    let where;
    if (this.id.split("_").includes("down")) {
        where = "down"
    } else {
        where = "up"
    }
    add_new_text_cell(this.id, where)
})


/**
 * Displays text box on double click of a text
 */
$(document).on("dblclick", "textarea.text-box", function () {
    let id = this.id.split("_")[1]
    show_md(id, this.value)

})

/**
 * Displays rendered Markdown text
 */
function show_md(id, value) {
    div_id = `text-div_${id}`
    md_texts[div_id] = value //stores the markdown text for the corresponding div
    render_md = md.render(value)
    $(`#out-text-div_${id}`).html(render_md).show()
    document.getElementById(div_id).style.display = "none"
}

/**
 * Displays rendered Markdown on double click
 */
$(document).on("dblclick", "div.text-out-box", function () {
    let id = this.id.split("_")[1]
    md_id = `text-div_${id}`
    out_id = `out-text-div_${id}`
    document.getElementById(md_id).style.display = "block"
    document.getElementById(out_id).style.display = "none"

})



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
 * Initiates download function for Notebook
 */
$("#download").click(function () {
    let out = notebook_json(cells_order, vars_in_scope, md_texts);

    var blob = new Blob([out], { "type": "application/json" });
    var url = (window.URL || window.webkitURL).createObjectURL(blob);

    var link = document.createElement('a');
    var name = document.getElementById("namebook").value
    link.download = `${name}.json`;
    link.href = url;

    var link_pae = $(link);
    $("body").append(link_pae);//maybe needed
    link.click();
    link_pae.remove();
});


/**
 * Internal function to import new Notebook
 */
$("#import-notebook-file").change(() => {

    let files = $("#import-notebook-file")[0].files
    let json_content = null
    if (files.length > 0) {
        let content = files[0];
        let reader = new FileReader();
        reader.onload = function (t) {
            json_content = t.target.result;
            let json = JSON.parse(json_content)

            $(".content").empty()
            load_notebook(json);
        }
        reader.readAsText(content);
    }
})


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

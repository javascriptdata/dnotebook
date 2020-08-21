const editor = CodeMirror(document.getElementById('div-1'), {
    lineNumbers: true,
    tabSize: 4,
    mode: 'javascript',
    theme: 'monokai',
    value: '',
    extraKeys: { "Ctrl-Space": "autocomplete" },
    autoCloseBrackets: true
});

//run first cell on CTRL ENTER Pressed
$(`#div-1`).keydown(function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
        document.getElementById("cell_spinner-1").style.display = "block"
        document.getElementById("cell_num-1").style.display = "none"
        exec_cell(`run_div-1`);

    }
});



var md = new Remarkable()
//Global Params
let vars_in_scope = {
    "div-1": editor
}

var md_texts = {} //stores markdown text and corresponding div name
var __code_cell_count = 1


$("#div-1")
    .mouseover(function () {
        $("#btn-actions-1").show()
    })
    .mouseout(function () {
        $("#btn-actions-1").hide()
    });




function exec_cell(c_id) {
    let id = c_id.split("_")[1]
    let count = c_id.split("-")[1]
    window.current_cell = id;

    try {
        let output = ("global", eval)(vars_in_scope[id].getValue())
        if (Array.isArray(output)) {
            output = print_val(output)
        } else if (typeof output === 'object' && output !== null) {
            output = JSON.stringify(output)
        } else if (console) {
            //retreive value from the console funcction
            console.oldLog = console.log;
            console.log = function (value) {
                return value;
            };
            output = eval(vars_in_scope[id].getValue());
            if (Array.isArray(output)) {
                output = print_val(output)
            } else {
                output = JSON.stringify(output)
            }
        }

        Promise.resolve(output).then((val) => {
            $(`#out_${id}`).html(val);
            document.getElementById("cell_spinner-1").style.display = "none"
            document.getElementById("cell_num-1").style.display = "block"
        })


        count = parseInt(count) + 1
        let div_count = `div-${count}`
        window.current_cell = div_count

    } catch (error) {
        $(`#out_${id}`).html(error)
        console.log(error)

    }
}


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
        <div id="btn-actions-${new_id}" class="btn-group-horizontal" style="display: none;">
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

    let divReference = document.getElementById(parent_cell_id);

    if (where == "up") {
        divReference.insertAdjacentHTML("beforebegin", html);
    } else {
        divReference.insertAdjacentHTML("afterend", html);
    }

    let editor = CodeMirror(document.getElementById(`div-${new_id}`), {
        lineNumbers: true,
        tabSize: 2,
        mode: 'javascript',
        theme: 'monokai',
        value: '',
        extraKeys: { "Ctrl-Space": "autocomplete" },
        autoCloseBrackets: true
    });
    vars_in_scope[`div-${new_id}`] = editor

    //show action buttons on hover
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
            document.getElementById("cell_spinner-1").style.display = "block"
            document.getElementById("cell_num-1").style.display = "none"
            exec_cell(`run_div-${new_id}`);

        }
    });

}

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
                <div id="btn-actions-${new_id}" class="btn-group-horizontal" style="margin-bottom: 2px;">
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
    } else {
        divReference.insertAdjacentHTML("afterend", html);
    }

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


$(document).on("click", "button.run", function () {
    if (this.id.split("_").includes("md")) {
        let id = this.id.split("-")[1]
        let val = document.getElementById(`text-box_${id}`).value
        show_md(id, val)
    } else {
        document.getElementById("cell_spinner-1").style.display = "block"
        document.getElementById("cell_num-1").style.display = "none"
        exec_cell(this.id);
    }
})


$(document).on("click", "button.del", function () {
    let id = this.id.split("_")[1]
    delete_cell(id)
})


$(document).on("click", "button.add-code", function () {
    let where;
    if (this.id.split("_").includes("down")) {
        where = "down"
    } else {
        where = "up"
    }
    add_new_code_cell(this.id, where)
})

$(document).on("click", "button.add-text", function () {
    let where;
    if (this.id.split("_").includes("down")) {
        where = "down"
    } else {
        where = "up"
    }
    // console.log(this.id);
    add_new_text_cell(this.id, where)
})

$(document).on("dblclick", "textarea.text-box", function () {
    let id = this.id.split("_")[1]
    show_md(id, this.value)

})

function show_md(id, value) {
    div_id = `text-div_${id}`
    // md_texts[div_id] = value //stores the markdown text for the corresponding div
    render_md = md.render(value)
    $(`#out-text-div_${id}`).html(render_md).show()
    document.getElementById(div_id).style.display = "none"
}


$(document).on("dblclick", "div.text-out-box", function () {
    let id = this.id.split("_")[1]
    md_id = `text-div_${id}`
    out_id = `out-text-div_${id}`
    // md_txt = md_texts[md_id]

    document.getElementById(md_id).style.display = "block"
    document.getElementById(out_id).style.display = "none"

})


function update_text_box_size() {
    $('textarea').each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}


$("#download").click(function () {
    let out = notebook_json(vars_in_scope);
    console.log(out);
});

const editor = CodeMirror(document.getElementById('div-1'), {
    lineNumbers: true,
    tabSize: 1,
    mode: 'javascript',
    theme: 'monokai',
    value: ''
});

/////PROTO///////////

let vars_in_scope = {
    "div-1": editor
}

function exec_cell(id, count) {
    $(`#out_${id}`).html(("global", eval)(vars_in_scope[id].getValue()) || "");

    count = parseInt(count) + 1
    let div_count = `div-${count}`

    if (!(div_count in vars_in_scope)) {
        $("#container").append(
            `<div id=${div_count} class=""></div><br />
            <button style="color: black;" id=run_${div_count} class="run">Run</button>
            <div id=out_${div_count}></div><br />`
        )

        let editor = CodeMirror(document.getElementById(`${div_count}`), {
            lineNumbers: true,
            tabSize: 2,
            mode: 'javascript',
            theme: 'monokai',
            value: ''
        });


        vars_in_scope[div_count] = editor;

    }

}

function add_new_code_cell(id, last_scope_id, where) {
    let new_id = parseInt(last_scope_id) + 1
    let parent_cell_id = `cell-${id}`
    let html = `
    <div class="row" style="margin-top: 50px;" id="cell-${new_id}">
    <div class="col-md-1">
        <p id="cell-num" class="code_symbol">[${new_id}]</p>
    </div>
    <div id="div-${new_id}" class="col-md-11">
        <div class="btn-group-horizontal">
            <button type="button" id="run_div-${new_id}" class="btn btn-sm btn-success run"><i
                    class="fas fa-play"></i>Run</button>
            <div class="btn-group" role="group" aria-label="Basic example">
                
                <button type="button" id="add_code_down_btn-${new_id}" class="btn btn-info add-code">
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

            <button type="button" id="del_btn-${new_id}" class="btn btn-sm btn-danger del"><i
                    class="fas fa-trash-alt"></i>
                Delete</button>
        </div>

    </div>
    <div class="col-md-1"></div>
    <div id="out_div-${new_id}" class="col-md-10 out-divs">

    </div>
</div>
`
    let divReference = document.getElementById(parent_cell_id);

    if (where == "up") {
        divReference.insertAdjacentHTML("beforebegin", html);
    } else {
        divReference.insertAdjacentHTML("afterend", html);
    }




    // $(`#${parent_cell_id}`).parentNode.append(html)

    let editor = CodeMirror(document.getElementById(`div-${new_id}`), {
        lineNumbers: true,
        tabSize: 2,
        mode: 'javascript',
        theme: 'monokai',
        value: ''
    });


    vars_in_scope[`div-${new_id}`] = editor

}

function add_new_text_cell(id, count) {


}

function delete_cell(id) {
    row_id = `cell-${Number(id)}`
    var div_ele = document.getElementById(row_id);
    div_ele.parentNode.removeChild(div_ele);

}

$(document).on("click", "button.run", function () {
    let id = this.id.split("_")[1]
    let count = this.id.split("-")[1]
    // console.log(id);
    // console.log(count);
    exec_cell(id, count);
})

$(document).on("click", "button.del", function () {
    // let id = this.id.split("_")[1]
    let id = this.id.split("-")[1]
    delete_cell(id)
})

$(document).on("click", "button.add-code", function () {
    let last_cell_in_scope = parseInt(Object.keys(vars_in_scope).pop().split("-")[1])
    let id = this.id.split("-")[1]

    let where;
    if (this.id.split("_").includes("down")) {
        where = "down"
    } else {
        where = "up"
    }
    add_new_code_cell(id, last_cell_in_scope, where)
})
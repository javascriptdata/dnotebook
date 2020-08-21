
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

function viz(name, callback) {

    let id = `#out_${window.current_cell}`
    $(`${id}`).append(`<div id=${name}></div>`)

    let cb = callback(name);
    // $("#ploty").remove(`${name}`)

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

function notebook_json(scope) {

    var store = {}

    for (let key in scope) {

        let id = key.split("-")[1]

        let cell_content = scope[key].getValue()

        let cell_output = $(`#out_${key}`).html()

        store[`cell-${id}`] = {
            "in": cell_content,
            "out": cell_output
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


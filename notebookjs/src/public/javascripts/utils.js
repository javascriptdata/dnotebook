function print_val(val){

    if(Array.isArray(val[0])){

        let col_length = val[0].length;
        let row_length = val.length;

        let data_string = "[";
        if(row_length > 10){

            for(let i=0; i < 10; i++){

                let row_val = val[i]

                data_string +="[";
                if(col_length > 10){

                    for(let j=0; j< 10; j++){
                        data_string += `${row_val[j]},`
                    }

                    data_string += `.......${col_length-10} more],`
                }else{

                    for(let j=0; j < col_length;j++){
                        data_string += `${row_val[j]},`
                    }
                    data_string +="],"
                }
            }
            data_string += `...${row_length - 10} more]`
        }
        else{
            for(let i=0; i < row_length; i++){

                let row_val = val[i]

                data_string +="[";
                if(col_length > 10){

                    for(let j=0; j< 10; j++){
                        data_string += `${row_val[j]},`
                    }

                    data_string += `.......${col_length-10} more],`
                }else{

                    for(let j=0; j < col_length;j++){
                        data_string += `${row_val[j]},`
                    }
                    data_string +="],"
                }
            }
            data_string +="]"
        }
        return data_string
    }else{

        let row_length = val.length;

        let data_string = "["

        let count = row_length > 10 ? 10 : row_length

        for(let i=0; i< count; i++){

            data_string += `${val[i]},`
        }

        let diff = row_length - count;
        if( diff > 0){
            data_string += `....${diff} more]`
        }else{
            data_string += "]";
        }
        return data_string;
        
    }
}
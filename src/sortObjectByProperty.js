export const sortObjectByProperty = (obj,prop,seq, index)=>{
    let arr = []
    if(!Array.isArray(obj)){
        arr = convertObjectToArray(obj)

    }else{
        arr=[...obj]
    }
     
    if(seq === true){
        arr.sort((m,n)=>{
            if(index<3){
                return m[1][prop].localeCompare(n[1][prop])
            }
            return m[1][prop] - n[1][prop]
        })
    }else{
        arr.sort((m,n)=>{
            if(index<3){
                return n[1][prop].localeCompare(m[1][prop])
            }
            
            return n[1][prop]-m[1][prop]
        })

    }
    return arr
}
// let obj = {
//     1:{a:1, b:10},
//     2:{a:11,b:20},
//     3:{a:8, b:30},
//     4:{a:18, b:20},
//     5:{a:28, b:10},
//     6:{a:8, b:23}

    
// }
// console.log(sortObjectByProperty(obj,'b','ascending'))


function convertObjectToArray(obj){
    
    let arr = [];
    for(let p in obj){
        arr.push([p,obj[p]])
    }
    return arr
}




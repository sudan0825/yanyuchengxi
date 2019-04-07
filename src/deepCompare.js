export const deepCompare = (obj1, obj2)=>{
    if(isEmpty(obj1) && isEmpty(obj2)) return true;
    else if (isEmpty(obj1)|| isEmpty(obj2)) return false;
   
    for(let elem in obj1){
        if(isObj(obj1[elem])){
            if(!deepCompare(obj1[elem],obj2[elem])){
             
                return false
            }
        }else if(obj1[elem] !== obj2[elem]){
           
            return false 

        }
    }
    return true
}

function isObj(item){
    return typeof item === 'object' && item !== null
}

function isEmpty(obj){
    for (let key in obj){
        if(obj.hasOwnProperty(key)) return false
    }
    return true
}
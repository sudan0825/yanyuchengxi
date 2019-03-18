export const deepcopy= (resource, map = new WeakMap())=>{
    if(!isObj(resource)) return resource;
    if(map.has(resource)) return map.get(resource);

    let target = Array.isArray(resource)?[]:{};
    map.set(resource,target);
    for(let key in resource){
        if(resource.hasOwnProperty(key)){

            if(!isObj(resource[key])){
                target[key] = resource[key]
            }else{
               target[key]=deepcopy(resource[key],map)
            }

        }
        
    }
    return target;
    
}

function isObj(item){
    return typeof item === 'object' && item !== null
}

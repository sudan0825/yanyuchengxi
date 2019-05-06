function enlarge(){
    let img = document.getElementById('imgcontainer');
    img.addEventListener('mousemove', changebackground);
    function changebackground(e){
        
        let pos = cursorpos(e);
        
        img.classList.add('enlargeContainer');
         img.classList.remove('imgcontainer');
       
        img.style.backgroundPosition='-'+ pos.x*6+ 'px -'+pos.y*6+'px'

     

    }
    img.addEventListener('mouseleft',reset)
    function reset(){
        img.classList.remove('');
        img.classList.add()
    }
    function cursorpos(e){
        let x = e.pageX;
        let y = e.pageY;
        let imgpos = img.getBoundingClientRect();
       console.log(e.clientX, e.pageX)
        return {x:x-imgpos.left, y:y-imgpos.top};
    }
}

enlarge()
function treeNode(val,left,right){
    this.val=val;
    this.left=left;
    this.right=right;
}

let root=new treeNode(20,new treeNode(10,new treeNode(5, null,null), new treeNode(15,new treeNode(12,null,null), new treeNode(17,null,null))),new treeNode(30,null,new treeNode(40)) )

function leveltransverser(node){
    if(node==null) return [];
    let results=[];
    let queueguider=[];
    queueguider.push(node);
    while(queueguider.length){
        let size=queueguider.length;
        let level=[];
        for(let n=0;n<size;n++){
            let tempnode=queueguider.shift();
            level.push(tempnode.val)
            if(tempnode.left) queueguider.push(tempnode.left);
            if(tempnode.right) queueguider.push(tempnode.right)
        }
    results.push(level)
    }
    return results
}
//console.log(leveltransverser(root))

let sameColor=new treeNode(5,new treeNode(4,new treeNode(3,new treeNode(3,null,null),new treeNode(3,null,null)),new treeNode(5,null,null)),new treeNode(2,new treeNode(3,new treeNode(3,null,null),null),new treeNode(3,null,null)))
let count=0;
function findSameTree(root,color){
    if(root==null) return false
    
    if(root.val==color){
       if(issameColor(root,color)){
           count++
           return 
       }
           
    }
    findSameTree(root.left,color)
    findSameTree(root.right,color)
    return count
 
}

let samevalue=new treeNode(3,new treeNode(3,null,null),new treeNode(3,new treeNode(3,null,null),null))
function issameColor(root,val){
    
    if(root==null) return true;
    if(root.val!=val) return false;
   
    return issameColor(root.left,val)&&issameColor(root.right,val)
   

}
//console.log(issameColor(samevalue,3))
var longestUnivaluePath = function(root) {
  if(root==null) return 0
    let longest=0
    helper(root,root.val);
    function helper(r,val){
        if(r==null) return 0;
        let left=helper(r.left,r.val);
        let right = helper(r.right,r.val);
        longest=Math.max(longest,left+right);
    
       if(r.val==val) {
           
           return Math.max(left,right)+1; 
        }
        else return 0
    }
    
   return longest 
}
    

function preOrder(root){
    if(root==null) return [];
    let collection=[], guiderstack=[];
    guiderstack.push(root);
    while(guiderstack.length){
        let temp=guiderstack.pop();
        collection.push(temp.val)
        if(temp.right){
            guiderstack.push(temp.right)
        }
        if(temp.left){
            guiderstack.push(temp.left);
        }
    }
    return collection;
}

function inOrder(root){
    if(root==null) return [];
    let collection=[], guideStack=[], p=root;
    while(p||guideStack.length){
        if(p){
            guideStack.push(p);
            p=p.left
        }else{
            p=guideStack.pop();
            collection.push(p.val)
            p=p.right
        }
    }
    return collection;
}
function postOrder(root){
    if(root==null) return [];
    let collectionqueue=[],guiderstack=[],p=root;
    while(p||guiderstack.length){
        if(p){
            guiderstack.push(p);
            collectionqueue.unshift(p.val);
            p=p.right
        }else{
            p=guiderstack.pop();
            p=p.left;
        }
    }
    return collectionqueue;
}


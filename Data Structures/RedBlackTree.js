const red = 0;
const black = 1;
// Tree Node Class
class Node {
    // Node private members
    balanceFactor;
    //Red by default
    constructor(id, count = 1, left = null, right = null, parent = null){
        this.id = id;
        this.count = count;
        this.left = left;
        this.right = right;
        this.parent = parent;
        this.color = red;
    }

    // Visits each node to calculate height of passed in node
    getHeight(root){
        var leftHeight;
        var rightHeight;
        if(!root){
            return 0;
        }
        else{
            leftHeight = this.getHeight(root.left);
            rightHeight = this.getHeight(root.right);
        }
        return 1 + Math.max(leftHeight, rightHeight)
    }

    // Calculates balance factor of node [left - right] and returns it
    getBalanceFactor(root){
        if(!root){
            return 0;
        }
        if(!root.left && !root.right){
            return this.getHeight(root.left);
        }
        else if(root.left && !root.right){
            return this.getHeight(root.right);
        }
        else if(!root.left && root.right){
            return -(this.getHeight(root.right));
        }
        else{
            return (this.getHeight(root.left) - this.getHeight(root.right));
        }
    }

    // Increments count by 1 
    updateCount(){
        this.count++;
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }
}

// Red black Tree class
class RedBlackTree{
    // red black tree constructor
    constructor(){
        this.root = null;
        this.size = 0;
        this.arr = [];
    }

    // Used on RR formation or called in RL-LR rotations 
    leftRotate(root, pt){
        var pt_right = pt.right;
        pt.right = pt_right.left;

        // Setting the parent of the right node
        if (pt.right != null) {
            pt.right.parent = pt;
        }
        
        pt_right.parent = pt.parent;

        //New root if parent is null
        if(parent.parent == null) {
            root = pt_right;

        } else if (pt == pt.parent.left) {
            pt.parent.left = pt_right;
        } else {
            pt.parent.right = pt_right;
        }

        pt_right.left = pt;
        pt.parent = pt_right;
    }
    // Used on LL formation or called in RL-LR rotations
    rightRotate(root, pt){
        var pt_left = pt.left;
        pt.left = pt_left.right;

        if (pt.left != null) {
            pt.left.parent = pt;
        }
        
        pt_left.parent = pt.parent;

        if(parent.parent == null) {
            root = pt_left;

        } else if (pt == pt.parent.left) {
            pt.parent.left = pt_left;
        } else {
            pt.parent.right = pt_left;
        }

        pt_left.left = pt;
        pt.parent = pt_left;
    }

    balancing(root, pt) {
        var parent_pt = null;
        var grand_parent_pt = null;

        while ((pt != root) && (pt.color != black) && 
        (pt.parent.color == red)) {
            parent_pt = pt.parent;
            grand_parent_pt = pt.parent.parent;

            //if pt's parents is left child of grand-parent of pt
            if (parent_pt == grand_parent_pt.left) {
                var uncle_pt = grand_parent_pt.right;

                //if uncle is red (just recoloring)
                if (uncle_pt != null && uncle_pt.color == red) {
                    grand_parent_pt.color = red;
                    parent_pt.color = black;
                    uncle_pt.color = black;
                    pt = grand_parent_pt;

                //Need balancing
                } else {

                    //L-R rotation if pt = right child of parent
                    if (pt == parent_pt.right) {
                        this.leftRotate(root, parent_pt);
                        pt = parent_pt;
                        parent_pt = pt.parent;
                    }

                    //Just right rotation and color switch
                    this.rightRotate(root, grand_parent_pt);
                    p_color = parent_pt.color;
                    parent_pt.color = grand_parent_pt.color;
                    grand_parent_pt.color = p_color;
                    pt = parent_pt;
                }
            //if parent of pt is right child of grand parent of pt
            } else {
                var uncle = grand_parent_pt.left;

                //Uncle is red, just recoloring
                if ((uncle_pt != null) && uncle_pt.red == red) {
                    grand_parent_pt.color = red;
                    parent_pt.color = black;
                    uncle_pt.color = black;
                    pt = grand_parent_pt;

                //Balancing required
                } else {
                    //right left rotation
                    if (pt == parent_pt.left) {
                        this.rightRotate(root, parent_pt);
                        pt = parent_pt;
                        parent_pt = pt.parent;
                    }

                    //Just left
                    this.leftRotate(root, grand_parent_pt);
                    p_color = parent_pt.color;
                    parent_pt.color = grand_parent_pt.color;
                    grand_parent_pt.color = p_color;
                    pt = parent_pt;
                }
                
            }
        }

        root.color = black;
    }

    // Recursively inserts new node and balances tree after
    recursiveInsert(root, pt){

        if(root == null){
            return pt;
        } 

        if(pt.id < root.id){
            root.left = this.recursiveInsert(root.left, pt);
            root.left.parent = root;
        }
        else if (pt.id > root.id){
            root.right = this.recursiveInsert(root.right, pt);
            root.right.parent = root;
        } else if (pt.id == root.id) {
            root.updateCount();
            return root;
        }

        return root;
        
    }

    insert(key) {
        var pt = new Node(key);
        this.root = this.recursiveInsert(this.root, pt);
        console.log("Inserted");
        //this.balancing(root, pt);
    }

    // Searches Tree for given key [string]
    search(root, key, isFound){
        if(root)
        {
            if(root.id == key){
                root.updateCount();
                return true;
            }
            else if(key < root.id){
                return this.search(root.left, key, isFound);
            }
            else{
                return this.search(root.right, key, isFound);
            }
        }
        else return false;

    }

    populateList(root){
        if (!root) { return; }
        if (root.left)  { this.populateList(root.left); }
        let tempObj = {};
        tempObj.song = root.id;
        tempObj.count = root.count;
        this.arr.push(tempObj);
        if (root.right)  { this.populateList(root.right); }
    }

    // Populates private member array with alphabetical array containing song name and count
    generateList(){
        this.populateList(this.root);
        // Sorts array based on count O(n log n)
        this.arr.sort(function(count1, count2){
            if(count1.count > count2.count) return -1;
            if(count1.count < count2.count) return 1;
        });
        return this.arr;
    }

    //Inorder traversal
    inorder(root) {
        if (root == null)
            return;
        this.inorder(root.left);
        console.log(root.id);
        this.inorder(root.right);
    }
}

// Define red black tree
const tree = new RedBlackTree

// REPLACE WITH REAL DATA
// ----------------------
//Populate AVL Tree with Songs
for(let x = 0; x < 5; x++){
    tree.insert("Africa")
}
for(let x = 0; x < 4; x++){
    tree.insert("Never Gonna Give You Up")
}


// Generates Array of Objects from AVL Tree to Sort
// var arr = tree.generateList();

// console.log(arr);
// tree.inorder(tree.root);
module.exports = RedBlackTree;

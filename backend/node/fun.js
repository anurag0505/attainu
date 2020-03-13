function add(a,b){
    private()
    return a+b;
}

function sub(a,b){
    return a-b;
}
module.exports = {
    add,
    sub
};
function private(){
    console.log("private mesg");
}


let size = $('.images').children().size();
console.log(x(15));
getImage(1).addClass('current')
for (let i = 2; i <= size; i++) {
    getImage(i).addClass('enter')
}

let n = 1;

setInterval(()=>{
    makeLeave(getImage(x(n))).one('transitionend',(e)=>{
        makeEnter($(e.currentTarget))
    });
    makeCurrent(getImage(x(n+1)));
    n++;
    console.log(n)
},3000);



function makeCurrent($node) {
    return $node.removeClass('enter leave').addClass('current')
}

function makeLeave($node) {
    return $node.removeClass('enter current').addClass('leave')
}

function makeEnter($node) {
    return $node.removeClass('leave current').addClass('enter')
}


function getImage(n) {
    return $(`.images > img:nth-child(${n})`);
}

function x(n) {
    n = n % size;
    return n ? n : size;
}
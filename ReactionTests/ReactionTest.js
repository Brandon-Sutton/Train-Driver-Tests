let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvas_parent = document.querySelector('.canvas-parent')


let parent_height = canvas_parent.clientHeight;
let parent_width = canvas_parent.clientWidth;

canvas.height = parent_height;
canvas.width = parent_width;

ctx.textBaseLine = "middle";

let start = document.getElementById('start'); 
let time_text = document.getElementById('time-text');

let Gamestatus = false;

function get_random_time(min, max){
    let result = Math.floor(Math.random() * Math.floor(max)) + min;
    result = result * 1000;
    return result;
}

function end_game(){
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    canvas.style.background = "black";
    start.innerHTML = "Start Game";
    console.log('ended game');
    Gamestatus = false;
    return Gamestatus;
}

function timeout1_function(time){
    
    timeout1 = setTimeout(function(){
        
        canvas.style.background = "grey"
        let date1 =new Date();
        change_time = date1.getTime();

        canvas.addEventListener('click', function(){
            let date2 = new Date();
            click_time = date2.getTime();
            reaction_time = (click_time - change_time);
            if(reaction_time < 400){
                time_text.innerHTML = reaction_time + " ms";
                time_text.className = "color-green";
            } else {
                time_text.innerHTML = reaction_time + " ms";
                time_text.className = "color-red";
            }
            
            this.removeEventListener('click', arguments.callee);
        });
    }, time);
}

function timeout2_function(time){
    timeout2 = setTimeout(function(){
       end_game(); 
    }, time);
}

function start_game(){
    
    console.log('started game');

        canvas.style.background = "black";

        let change_time = get_random_time(1, 45);
        let end_time = change_time + 1000;
    
        timeout1_function(change_time);
        timeout2_function(end_time);

    
}


start.addEventListener('click', function(){
    if (Gamestatus === true){
        // end_game();
    } else {
        time_text.innerHTML = "";
        this.innerHTML = "Stop Game"
        start_game();   
    }
})


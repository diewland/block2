// config
var SIZE  = 3;
var SCORE = 0;
var TIME  = 30;
var RIDX  = 0;

// game variables
var play_flag = false;
var play_interval = null;

// random color function
// https://stackoverflow.com/a/7638362/466693
// https://stackoverflow.com/a/13542669/466693
function random_color_set(){
  function random_color(){
    return '#'+Math.random().toString(16).substr(-6);
  }
  function shade_blend(p,c0,c1) {
    var n=p<0?p*-1:p,u=Math.round,w=parseInt;
    if(c0.length>7){
      var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
      return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
    } else {
      var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
      return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
    }
  }
  var c = random_color();
  return [ c, shade_blend(0.15, c) ];
}

// time functions
function countdown(){
    TIME -= 1;
    document.getElementById('time').innerHTML  = TIME;

    if(TIME == 0){
        clearInterval(play_interval);
        alert("You got score " + SCORE + " !");

        // reset
        SIZE  = 3;
        SCORE = 0;
        TIME  = 30;
        play_flag = false;
        document.getElementById('score').innerHTML = SCORE;
        document.getElementById('time').innerHTML = TIME;
    }
}

// success event
function choose(i){

    // start time count
    if(!play_flag){
        play_flag = true;
        play_interval = setInterval(countdown, 1000);
    }

    // adjust params
    if(i == RIDX){
        SCORE++;
        if(SCORE % 4 == 0){
            SIZE++;
        }
        document.getElementById('score').innerHTML = SCORE;
        redraw();
    }
}

// core function
function redraw(){

    // gen random index
    RIDX = Math.floor(Math.random() * SIZE * SIZE);

    // apply to colors
    COLORS = [];
    var cur_color = random_color_set();
    for(i=0; i<SIZE*SIZE; i++){
        COLORS.push( i == RIDX ? cur_color[0] : cur_color[1] );
    }

    // draw table
    var cnt = 0;
    var html = '';
    for(i=1; i<=SIZE; i++){
        html += "<tr>";
        for(j=1; j<=SIZE; j++){
            html += "<td style='background-color: " + COLORS[cnt] + "' onclick='choose(" + cnt + ");' width='" + 100/SIZE + "%'></td>";
            cnt ++;
        }
        html += "</tr>";
    }
    document.getElementById('board').innerHTML = html;
}

// draw
redraw();

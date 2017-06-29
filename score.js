var Score = {
  
  key: 'BLOCK_SCORE',
  init_values: [
    { name: 'Alice',  score: 10 },
    { name: 'Bob',    score: 9 },
    { name: 'George', score: 8 },
    { name: 'Sarah',  score: 7 },
    { name: 'Mark',   score: 6 },
  ],
  
  data: function(){
    var data_str = localStorage.getItem(this.key);
    return data_str ? JSON.parse(data_str) : this.init_values;
  },

  is_new_record: function(new_score){
    for(var i in this.data()){
      var item = this.data()[i];
      if(new_score > item.score){
        return parseInt(i);
      }
    }
    return -1;
  },

  update: function(name, score, rank_index){
    var cur_data = this.data();
    var new_rank = [ { name: name, score: score } ];
    var new_data = cur_data.slice( 0, rank_index ).concat( new_rank ).concat( cur_data.slice( rank_index ) );
    new_data = new_data.splice(0, 5);
    return localStorage.setItem(this.key, JSON.stringify(new_data));
  },

  reset: function(){
    return localStorage.setItem(this.key, JSON.stringify(this.init_values));
  },

  to_s: function(){
    var out = '';
    for(var i in this.data()){
      var item = this.data()[i];
      out += "No "+ (i*1+1) +". "+ item.name +" got "+ item.score +"\n";
    }
    return out;
  },

}

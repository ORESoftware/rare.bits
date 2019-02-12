

const async = require('async');

console.log('111');

async.parallel({
  
  one(cb){
    console.log('222');
    cb(null,1);
  },
  
  two(cb){
    console.log('333');
    cb(null,2);
  }
  
}, (err, results) => {
  console.log('444');
  console.log({err,results});
});

console.log('555');

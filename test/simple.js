#!/usr/bin/env node

// const cp = require('child_process');
// const path = require('path');
// const fs = require('fs');
// const http = require('http');
// const assert = require('assert');
// const EE = require('events');
// const strm = require('stream');
//
const {RareBitsWallet} = require('../dist/index');

const rbw = new RareBitsWallet();

rbw.deposit(50, 0).then(res => {
    console.log({res});
  })
  .then(v => {
    return rbw.withdraw(5, 0);
  })
  .then(v => {
    return rbw.wager(40,0);
  })
  .catch(e => {
    console.error('In catch block:', e);
  });



const opts = ['a','b','c','d'];
const results = [];

const permute = function (i,j,list) {
  
  while(i < 4){
    permute(++i, j, list);
    while(j < 4){
      list[i] = j;
      results.push(list);
      permute(i,j++,list);
    }
  }
  
  
  
};

permute(0,0,[0,0,0,0]);
console.log(results);

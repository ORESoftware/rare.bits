'use strict';

const {Client} = require('pg');

export class RareBitsWallet {
  
  client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'oleg'
  });
  
  constructor() {
    this.createTable();
    this.connect();
  }
  
  async connect() {
    await this.client.connect();
  }
  
  async createTable() {
    
    return await this.client.query(`
        DROP TABLE ledger;
        DROP TABLE balance;
        
         CREATE TABLE IF NOT EXISTS ledger (
          id SERIAL,
          user_id integer,
          type text,
          amount bigint,
          new_balance bigint
        );
        
         CREATE TABLE IF NOT EXISTS balance (
          id SERIAL,
          user_id integer,
          balance_value bigint
        );
        
         INSERT INTO balance (user_id,balance_value) VALUES(
         0,
         0
        );
    `);
    
  }
  
  
  async deposit(amount: number, userId :number) {
    const res = await this.client.query(`SELECT balance_value from balance WHERE user_id = ${userId};`);
    const balance = res.rows && res.rows[0] && res.rows[0].balance_value;
    console.log('balance:', balance);
    const newBalance = balance + amount;
    await this.client.query(`INSERT INTO ledger (user_id, type, amount, new_balance) VALUES (${userId}, 'deposit', ${amount}, ${newBalance});`);
    return this.client.query(`UPDATE balance SET balance_value = ${newBalance} WHERE user_id = ${userId};`);
  }
  
  
  async wager(amount: number, userId: number) {
    const res = await this.client.query(`SELECT balance_value from balance WHERE user_id = ${userId};`);
    const balance = res.rows && res.rows[0] && res.rows[0].balance_value;
  
    if(!balance){
      return Promise.reject('No balance available.');
    }
  
    if(balance < amount){
      return Promise.reject('Not enough money in your account.');
    }
    
    const type = 'wager';
    const calcAmount = Math.random() > 0.5 ? amount : -amount;
    
    const newBalance = Number(balance) + Number(calcAmount);
    await this.client.query(`INSERT INTO ledger (user_id, type, amount, new_balance) VALUES (${userId}, 'wager', ${amount}, ${newBalance});`);
    return this.client.query(`UPDATE balance SET balance_value = ${newBalance} WHERE user_id = ${userId};`);
  }
  
  async withdraw(amount: number, userId: number) {
    
    const res = await this.client.query(`SELECT balance_value from balance WHERE user_id = ${userId};`);
    const balance = res.rows && res.rows[0] && res.rows[0].balance_value;
    
    if(!balance){
      return Promise.reject('No balance available.');
    }
    
    if(balance < amount){
      return Promise.reject('Not enough money in your account.');
    }
    
    console.log('balance:', balance);
    const newBalance = balance - amount;
    await this.client.query(`INSERT INTO ledger (user_id, type, amount, new_balance) VALUES (${userId}, 'withdrawal', ${amount}, ${newBalance});`);
    return this.client.query(`UPDATE balance SET balance_value = ${newBalance} WHERE user_id = ${userId};`);
  }
  
}

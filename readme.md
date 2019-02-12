

### RareBits ledger


```js

const {RareBitsWallet} = require('../dist');

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

```


const express = require('express');
const app = express();

app.use(express.static('client/public')); // NEW

app.listen(process.env.PORT || 3000, function () {
    console.log(`App running on port ${ this.address().port }`);
});
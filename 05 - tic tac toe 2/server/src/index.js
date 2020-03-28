const app = require('./server');
const logger = require('./lib/logger');

const port = 2000;

app.listen(port, () => logger.log(`Tic-tac-toe listening on port ${port}!`));

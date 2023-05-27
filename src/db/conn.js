const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('login', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres'
});

try {
  
  sequelize.authenticate();
  console.log('Conectado com sucesso!')

} catch (error) {
  console.log(`Não foi possível conectar: ${error}`);
}

module.exports = sequelize;
// bashExecutor.js

const { exec } = require('child_process');

// Função para executar um comando Bash
function executarComandoBash(comando) {
  return new Promise((resolve, reject) => {
    exec(comando, (erro, stdout, stderr) => {
      if (erro) {
        reject(`Erro na execução do comando: ${erro.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
}

// Exporta a função para que possa ser usada em outros arquivos
module.exports = { executarComandoBash };

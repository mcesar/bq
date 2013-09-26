Banco de Questões
=================

Getting started
---------------

Instale o Node.JS. Certifique-se que o mysql esteja executando localmente, com o banco bq criado e que as credenciais sejam root sem senha.

Execute `npm install` na linha de comando, na raiz do projeto, para instalar as dependências.

Para executar o servidor, digite `node .` na linha de comando, na raiz do projeto.

Para testar a comunicação com o servidor, pode-se usar o `curl`. Exemplos:

* obter a lista de bancas cadastradas: `curl -i -k http://localhost:8080/bancas`

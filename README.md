Primeiro projeto de back-end realizado

# Features implementadas

- [Front-end](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b5cdba2f-3a8b-45a5-a009-6641ee7d750a/tweteroo-bonus.zip)
- Geral
    - A porta utilizada pelo servidor é a 5000
- Armazenamento de dados
    - Para persistir os dados (usuários e tweets), variáveis globais foram utilizadas
    - O formato de um **usuário** é:
        
        ```jsx
        {
        	username: 'bobesponja', 
        	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" 
        }
        ```
        
    - O formato de um **tweet** é:
        
        ```jsx
        {
        	username: "bobesponja",
            tweet: "eu amo o hub"
        }
        ```
        
- **POST** `/sign-up`
    - Recebe (pelo body da request), um parâmetro **username** e um **avatar**, contendo o nome do username do usuário e a sua foto de avatar:
        
        ```jsx
        {
            username: "bobesponja",
        	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
        }
        ```
        
    - Esse usuário é salvado num array de usuários (do servidor)
    - Por fim, retorna a mensagem `“OK”`
- **POST** `/tweets`
    - Recebe (pelo body da request), os parâmetros `username` e `tweet`:
        
        ```jsx
        {
        	username: "bobesponja",
            tweet: "eu amo o hub"
        }
        ```
        
    - Esse tweet é salvado num array de tweets (do servidor)
    - Por fim, retorna a mensagem `“OK”`
- **GET** `/tweets`
    - Retorna os 10 últimos tweets publicados
        
        ```jsx
        [
        	{
        		username: "bobesponja",
        		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
        		tweet: "eu amo o hub"
        	}
        ]
        ```

- Validação de dados
    - Todas as rotas validam os dados recebidos e, caso algum dado venha vazio ou no formato inválido, o servidor retorna o status code 400 (BAD REQUEST) e não continua com a execução da função.
    - **POST** `/sign-up` valida se os valores de `username` e `avatar` foram enviados e caso contrário, responde com a mensagem “Todos os campos são obrigatórios!”
    - **POST** `/tweets` valida se os valores de `username` e `tweet` foram enviados e caso contrário, responde com a mensagem “Todos os campos são obrigatórios!”
- Status codes de requisições POST
    - Todas as requisições POST retornam o status code 201 (CREATED) além do seu retorno já descrito (mensagens, JSONs, etc).
- **GET** `/tweets/USERNAME`
    - Retorna todos os tweets publicados do usuario recebido por parâmetro de rota
        
        ```jsx
        [
        	{
        		username: "bobesponja",
        		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
        	  tweet: "eu amo o hub"
        	}
        ]
        ```
        
- **GET** `/tweets` com paginação
    - Esse endpoint recebe a página identificada via query string (`?page=1`) e retorna corretamente os tweets da “página” (`page`) atual. Esse endpoint é chamado ao clicar no botão “**Carregar mais**”A primeira página corresponde aos ultimos 10 tweets, a segunda do 11 ao 20, a terceira do 21 ao 30, etc.
    - Valida-se se valor de `page` (query string) foi enviado e tem valor **maior ou igual a** 1 e caso contrário, responde com a mensagem “Informe uma página válida!” e com o status code 400 (BAD REQUEST).
- **POST** `/tweets` recebendo username por Header
    - Esse endpoint recebe por meio de um **header** `user`.
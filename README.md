<h2 align="center">

  <img alt="Deliver IT" src="https://res.cloudinary.com/dr05turuf/image/upload/v1611555707/logo-sd-transparente_ziavoz.png" width="200px" />
  <h1> Desafio Deliver IT 🚀 </h1>
</h2>

<center><h2>Javascript | NodeJs</h2></center>

## :mailbox_with_mail: Get in touch!

<p align="center">

  <a href="https://github.com/felsantiago" target="_blank" >
    <img alt="Github - Felipe Santiago" src="https://img.shields.io/badge/Github--%23F8952D?style=social&logo=github">
  </a>
  <a href="https://www.linkedin.com/in/felipe-santiago-a7706418a/" target="_blank" >
    <img alt="Linkedin - Felipe Santiago" src="https://img.shields.io/badge/Linkedin--%23F8952D?style=social&logo=linkedin">
  </a>
  <a href="mailto:fepuss@gmail.com" target="_blank" >
    <img alt="Email - Felipe Santiago" src="https://img.shields.io/badge/Email--%23F8952D?style=social&logo=gmail">
  </a>
  <a href="https://api.whatsapp.com/send?phone=5588997143829"
        target="_blank" >
    <img alt="Fale comigo no whatsapp - Felipe Santiago" src="https://img.shields.io/badge/Whatsapp--%23F8952D?style=social&logo=whatsapp">
  </a>
</p>

#### Arquivo Request (Insomnia)
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Deliver-IT-api&uri=https%3A%2F%2Fres.cloudinary.com%2Fdr05turuf%2Fraw%2Fupload%2Fv1611557109%2FInsomnia_2021-01-25-Deliver-IT_il33ql)

## Rotas
GET e POST: http://localhost:3003/api/bills-to-pay

### Request body
```
{
	"name": "Felipe Santiago",
	"originalValue": 2050.40,
	"dueDate": "2020-01-20",
	"payDay": "2020-01-30"
}
```

### Response body
```
{
    "_id": "600f810978766300143f505d", // Id cadastrado
    "name": "Felipe Santiago", // Nome
    "originalValue": 2050.4, // Valor original
    "dueDate": "2020-01-20", // Data de Vencimento
    "payDay": "2020-01-30", // Data do Pagamento
    "correctedValue": 2117.062, // Valor Corrigido
    "numberOfDaysLate": 10, // Quantidade de dias de atraso
    "delayRate": 5, // Multa
    "interestDay": 0.3, // Juros/dia
    "totalInterest": 61.662000000000006 // Juros total
}
```

## **:scroll: Screen**
Para testar disponibilizei arquivos do docker, utilize o comando `docker-compose up` na raiz desse projeto.

- Irá criar os containers da api, web e mongoDB no seu docker.

## **:scroll: Screen**
### Relatório de Testes
![image](https://res.cloudinary.com/dr05turuf/image/upload/v1611556186/testesDeliverIt_hhncom.png)

### Rota Post
![image](https://user-images.githubusercontent.com/52730086/105669380-f2c8ae00-5ebd-11eb-9f2e-0de8684bfb5c.png)

### Rota Get
![image](https://user-images.githubusercontent.com/52730086/105669435-08d66e80-5ebe-11eb-8afc-45847b761c64.png)

### Teste geral
![image](https://user-images.githubusercontent.com/52730086/105669627-6bc80580-5ebe-11eb-8894-d1032d857a6b.png)

### Teste unitário
![image](https://user-images.githubusercontent.com/52730086/105669836-c6f9f800-5ebe-11eb-80ed-196c47cd6a56.png)

### Teste de integração
![image](https://user-images.githubusercontent.com/52730086/105669914-ef81f200-5ebe-11eb-95b5-b26735554a10.png)

### Teste CI
![test-ci](https://user-images.githubusercontent.com/52730086/105670074-3374f700-5ebf-11eb-9f32-2019a222890a.gif)


## **:computer: Tecnologias**

<ul>
<li>Node.js
</li>
<li>JavaScript
</li>
<li>API's
</li>
<li>Express
</li>
<li>HTTP
</li>
<li>Routes
</li>
<li>Middlewares
</li>
<li>GET, POST, PUT, DELETE,
</li>
<li>CRUD
</li>
<li>Data persistence
</li>
<li>MongoDB
</li>
<li>Git
</li>
<li>Github
</li>
<li>Docker
</li>
<li>DDD
</li>
<li>TDD
</li>
<li>Solid
</li>
<li>Clean Architecture
</li>
</ul>

Felipe Santiago

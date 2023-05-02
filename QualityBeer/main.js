// não altere!
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');
const sql = require('mssql');

// não altere!
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// configure a linha abaixo caso queira que os dados capturados sejam inseridos no banco de dados.
// false -> nao insere
// true -> insere
const HABILITAR_OPERACAO_INSERIR = true;

// altere o valor da variável AMBIENTE para o valor desejado:
// API conectada ao banco de dados remoto, SQL Server -> 'producao'
// API conectada ao banco de dados local, MySQL Workbench - 'desenvolvimento'
const AMBIENTE = 'desenvolvimento';

const serial = async (
/*     valoresDht11Umidade,
    valoresDht11Temperatura,
    valoresLuminosidade, */
 maceracao,
 malteacao1,
 malteacao2,
 malteacao3,
 moagem,
 brassagem1,
 brassagem2,
 brassagem3,
 fervura,
 resfriamento_fermentacao1,
 resfriamento_fermentacao2,
 resfriamento_fermentacao3,
 maturacao_filtracao,
 pasteurizacao,
 envase

/*     valoresChave */
) => {
    let poolBancoDados = ''

    if (AMBIENTE == 'desenvolvimento') {
        poolBancoDados = mysql.createPool(
            {
                // altere!
                // CREDENCIAIS DO BANCO LOCAL - MYSQL WORKBENCH
                host: 'localhost',
                user: 'root',
                password: 'lordsigmar527',
                database: 'cervejaria'
            }
        ).promise();
    } else if (AMBIENTE == 'producao') {
        console.log('Projeto rodando inserindo dados em nuvem. Configure as credenciais abaixo.');
    } else {
        throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
    }


    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        //console.log(data);valoresdht
        const valores = data.split(';'); 
   /*      const dht11Umidade = parseFloat(valores[0]);
        const dht11Temperatura = parseFloat(valores[1]); */
        const maceracaoValor = parseFloat(valores[0]);
        const malteacao1Valor = parseFloat(valores[1]);
        const malteacao2Valor = parseFloat(valores[2]);
        const malteacao3Valor = parseFloat(valores[3]);
        const moagemValor = parseFloat(valores[4]);
        const brassagem1Valor = parseFloat(valores[5]);
        const brassagem2Valor = parseFloat(valores[6]);
        const brassagem3Valor = parseFloat(valores[7]);
        const fervuraValor = parseFloat(valores[8]);
        const resfriamento_fermentacao1Valor = parseFloat(valores[9]);
        const resfriamento_fermentacao2Valor = parseFloat(valores[10]);
        const resfriamento_fermentacao3Valor = parseFloat(valores[11]);
        const maturacao_filtracaoValor = parseFloat(valores[12]);
        const pasteurizacaoValor = parseFloat(valores[13]);
        const envaseValor = parseFloat(valores[14]);

        
   /*      const luminosidade = parseFloat(valores[3]);
        const chave = parseInt(valores[4]); */

/*         valoresDht11Umidade.push(dht11Umidade);
        valoresDht11Temperatura.push(dht11Temperatura); */
  /*       valoresLuminosidade.push(luminosidade); */
        maceracao.push(maceracaoValor);
        malteacao1.push(malteacao1Valor);
        malteacao2.push(malteacao2Valor);
        malteacao3.push(malteacao3Valor);
        moagem.push(moagemValor);
        brassagem1.push(brassagem1Valor);
        brassagem2.push(brassagem2Valor);
        brassagem3.push(brassagem3Valor);
        fervura.push(fervuraValor);
        resfriamento_fermentacao1.push(resfriamento_fermentacao1Valor);
        resfriamento_fermentacao2.push(resfriamento_fermentacao2Valor);
        resfriamento_fermentacao3.push(resfriamento_fermentacao3Valor);
        maturacao_filtracao.push(maturacao_filtracaoValor);
        pasteurizacao.push(pasteurizacaoValor);
        envase.push(envaseValor);
/*         valoresChave.push(chave); */

        if (HABILITAR_OPERACAO_INSERIR) {
            if (AMBIENTE == 'producao') {
                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> Importante! você deve ter o aquario de id 1 cadastrado.
                sqlquery = `INSERT INTO medida (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario) VALUES (${dht11Umidade}, ${dht11Temperatura}, ${luminosidade}, ${lm35Temperatura}, ${chave}, CURRENT_TIMESTAMP, 1)`;

                // CREDENCIAIS DO BANCO REMOTO - SQL SERVER
                // Importante! você deve ter criado o usuário abaixo com os comandos presentes no arquivo
                // "script-criacao-usuario-sqlserver.sql", presente neste diretório.
                const connStr = "Server=servidor-acquatec.database.windows.net;Database=bd-acquatec;User Id=usuarioParaAPIArduino_datawriter;Password=#Gf_senhaParaAPI;";

                function inserirComando(conn, sqlquery) {
                    conn.query(sqlquery);
                    console.log("valores inseridos no banco: ", lm35Temperatura + ", " + lm35Temperatura2 + ", " + lm35Temperatura3 + ", " + lm35Temperatura4 )
                }

                sql.connect(connStr)
                    .then(conn => inserirComando(conn, sqlquery))
                    .catch(err => console.log("erro! " + err));

            } else if (AMBIENTE == 'desenvolvimento') {

                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> você deve ter o aquario de id 1 cadastrado.
            
                
                await poolBancoDados.execute(
                    'INSERT INTO cerveja (maceracao,malteacao1,malteacao2,malteacao3,moagem,brassagem1,brassagem2,brassagem3,fervura,resfriamento_fermentacao1,resfriamento_fermentacao2,resfriamento_fermentacao3,maturacao_filtracao,pasteurizacao,envase) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[maceracaoValor,malteacao1Valor,malteacao2Valor,malteacao3Valor,moagemValor,brassagem1Valor,brassagem2Valor,brassagem3Valor,fervuraValor,resfriamento_fermentacao1Valor,resfriamento_fermentacao2Valor,resfriamento_fermentacao3Valor,maturacao_filtracaoValor,pasteurizacaoValor,envaseValor]
                );

            
                //console.log("valores inseridos no banco: ", lm35Temperatura + ";")

            } else {
                throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
            }
        }
    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}
// não altere!
const servidor = (
/*     valoresDht11Umidade,
    valoresDht11Temperatura,
    valoresLuminosidade, */
    maceracao,
    malteacao1,
    malteacao2,
    malteacao3,
    moagem,
    brassagem1,
    brassagem2,
    brassagem3,
    fervura,
    resfriamento_fermentacao1,
    resfriamento_fermentacao2,
    resfriamento_fermentacao3,
    maturacao_filtracao,
    pasteurizacao,
    envase
/*     valoresChave */
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });
/*     app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresDht11Umidade);
    }); */
/*     app.get('/sensores/dht11/temperatura', (_, response) => {
        return response.json(valoresDht11Temperatura);
    }); */
/*     app.get('/sensores/luminosidade', (_, response) => {
        return response.json(valoresLuminosidade);
    }); */
    app.get('/sensores/lm35/temperatura', (_, response) => {
        return response.json(valoresLm35Temperatura);
    });

    app.get('/sensores/lm35/temperatura2', (_, response) => {
        return response.json(valoresLm35Temperatura2);
    });

    app.get('/sensores/lm35/temperatura3', (_, response) => {
        return response.json(valoresLm35Temperatura3);
    });
    
    app.get('/sensores/lm35/temperatura4', (_, response) => {
        return response.json(valoresLm35Temperatura4);
    });

    app.get('/sensores/chave', (_, response) => {
        return response.json(valoresChave);
    }); 
}

(async () => {
/*     const valoresDht11Umidade = [];
    const valoresDht11Temperatura = [];
    const valoresLuminosidade = []; */
 const maceracao = [];
 const malteacao1 = [];
 const malteacao2 = [];
 const malteacao3 = [];
 const moagem = [];
 const brassagem1 = [];
 const brassagem2 = [];
 const brassagem3 = [];
 const fervura = [];
 const resfriamento_fermentacao1 = [];
 const resfriamento_fermentacao2 = [];
 const resfriamento_fermentacao3 = [];
 const maturacao_filtracao = [];
 const pasteurizacao = [];
 const envase = [];


/*     const valoresChave = []; */
    await serial(
/*         valoresDht11Umidade = []
        valoresDht11Temperatura, */
/*         valoresLuminosidade, */
maceracao,
malteacao1,
malteacao2,
malteacao3,
moagem,
brassagem1,
brassagem2,
brassagem3,
fervura,
resfriamento_fermentacao1,
resfriamento_fermentacao2,
resfriamento_fermentacao3,
maturacao_filtracao,
pasteurizacao,
envase
/*         valoresChave */
    );
    servidor(
/*         valoresDht11Umidade,
        valoresDht11Temperatura, */
/*         valoresLuminosidade, */
maceracao,
malteacao1,
malteacao2,
malteacao3,
moagem,
brassagem1,
brassagem2,
brassagem3,
fervura,
resfriamento_fermentacao1,
resfriamento_fermentacao2,
resfriamento_fermentacao3,
maturacao_filtracao,
pasteurizacao,
envase
/*         valoresChave */
    );
})();

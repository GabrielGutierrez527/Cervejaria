int lm35_pin = A0, leitura_lm35 = 0;
float temperatura;
float maceracao;
float malteacao1;
float malteacao2;
float malteacao3;
float moagem;
float brassagem1;
float brassagem2;
float brassagem3;
float fervura;
float resfriamento_fermentacao1;
float resfriamento_fermentacao2;
float resfriamento_fermentacao3;
float maturacao_filtracao;
float pasteurizacao;
float envase;

void setup(){
  Serial.begin(9600);
}

void loop() {
 
 
  leitura_lm35 = analogRead(lm35_pin);
  temperatura = leitura_lm35 * (5.0 / 1023) * 100;
  maceracao = (0.16 * temperatura + 9.36);
  malteacao1 = (0.11 * temperatura + 46.18);
  malteacao2 = (0.27 * temperatura + 65.5);
  malteacao3 = (0.82 * temperatura + 61.47);
  moagem = (0.54 * temperatura + 53.09);
  brassagem1 = (0.27 * temperatura + 30.5);
  brassagem2 = (0.82 * temperatura + 41.47);
  brassagem3 = (0.27 * temperatura + 57.54);
  fervura = (0.11 * temperatura + 98.1);
  resfriamento_fermentacao1 = (0.27 * temperatura + 2.6);
  resfriamento_fermentacao2 = (0.27 * temperatura + 7.6);
  resfriamento_fermentacao3 = (0.10 * temperatura + 2.35);
  maturacao_filtracao = (0.10 * temperatura - 1.65);
  pasteurizacao = (0.54 * temperatura + 51.09);
  envase = (0.10 * temperatura + 5.35);

  
  
  Serial.print(maceracao);
Serial.print(";");
 Serial.print(malteacao1);
 Serial.print(";");
  Serial.print(malteacao2);
Serial.print(";");
  Serial.print(malteacao3);
  Serial.print(";");
   Serial.print(moagem);
Serial.print(";");
 Serial.print(brassagem1);
 Serial.print(";");
  Serial.print(brassagem2);
Serial.print(";");
  Serial.print(brassagem3);
  Serial.print(";");
   Serial.print(fervura);
Serial.print(";");
 Serial.print(resfriamento_fermentacao1);
 Serial.print(";");
  Serial.print(resfriamento_fermentacao2);
Serial.print(";");
  Serial.print(resfriamento_fermentacao3);
  Serial.print(";");
  Serial.print(maturacao_filtracao);
 Serial.print(";");
  Serial.print(pasteurizacao);
Serial.print(";");
  Serial.println(envase);
  
  delay(1500);
}




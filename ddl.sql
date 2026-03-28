CREATE TABLE utenti (
                        id SERIAL PRIMARY KEY,
                        nome VARCHAR(100) NOT NULL,
                        email VARCHAR(150) UNIQUE NOT NULL,
                        id_hub VARCHAR(150) UNIQUE NOT NULL,
                        latitudine_hub FLOAT NOT NULL,
                        longitudine_hub FLOAT NOT NULL,
                        data_registrazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sensori (
                         id SERIAL PRIMARY KEY,
                         codice_sensore VARCHAR(50) NOT NULL,
                         latitudine FLOAT NOT NULL,
                         longitudine FLOAT NOT NULL,
                         utente_id INT NOT NULL,
                         nome_pianta VARCHAR(50) NOT NULL,
                         data_installazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                         CONSTRAINT fk_utente FOREIGN KEY (utente_id) REFERENCES utenti(id) ON DELETE CASCADE
);

CREATE TABLE storico_misure (
                                id BIGSERIAL PRIMARY KEY,
                                sensore_id INT NOT NULL,
                                timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                                umidita FLOAT,
                                temperatura FLOAT,
                                ph FLOAT,
                                conducibilita_ec INT,
                                azoto_n INT,
                                fosforo_p INT,
                                potassio_k INT,

                                CONSTRAINT fk_sensore FOREIGN KEY (sensore_id) REFERENCES sensori(id) ON DELETE CASCADE
);

insert into utenti (nome, email, id_hub, latitudine_hub, longitudine_hub) values ('Mario Rossi', 'mario.rossi@example.com', 'CONVERTER-M001', 45.1234, 12.5678);
insert into sensori (codice_sensore, latitudine, longitudine, utente_id, nome_pianta) values ('1', 45.1234, 12.5678, 1, 'Rosmarino');
insert into sensori (codice_sensore, latitudine, longitudine, utente_id, nome_pianta) values ('2', 45.1235, 12.5679, 1, 'Basilico');
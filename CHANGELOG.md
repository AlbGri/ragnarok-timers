# Changelog

## [1.0.0] - 2026-09-06

Prima versione pubblica, nata da uno script personale riorganizzato in progetto.

### Funzionalita'

- Finestre di respawn con durata minima e massima: stati "In attesa", "APERTO" e "Chiuso" con colori distinti
- Timer a durata fissa lasciando vuoto il campo Max
- Ordinamento automatico: prima le finestre aperte, poi quelle in attesa, infine quelle chiuse
- Allarme sonoro ripetuto con lampeggio della barra delle applicazioni, silenziabile selezionando la riga
- Preset appresi dai timer creati: riscrivendo un nome gia' usato si compilano mappa, categoria e durate
- Storico con completamento automatico su nome, mappa e categoria
- Modifica inline con doppio clic su nome, mappa, categoria, orario e durate
- Archiviazione automatica dei timer chiusi da oltre 24 ore, con pulizia manuale su richiesta
- Annullamento delle rimozioni e delle archiviazioni con Ctrl+Z
- Scorciatoie da tastiera: Invio, Canc, Ctrl+D, Ctrl+R, Ctrl+Z
- Volume, opzione "sempre in primo piano" e dimensioni della finestra ricordate fra le sessioni

### Affidabilita'

- Salvataggio atomico con copia di sicurezza e recupero automatico se il file dati risulta illeggibile
- Il countdown viene sempre riprogrammato, anche in caso di errore: non puo' fermarsi in silenzio
- Un orario che risulterebbe oltre 12 ore nel futuro viene interpretato come "ieri", per le uccisioni a cavallo della mezzanotte
- Date con offset esplicito: i countdown restano corretti attraverso il cambio dell'ora legale
- Nessun allarme arretrato all'avvio per le finestre aperte mentre l'applicazione era chiusa
- La posizione salvata viene ignorata se cade fuori dal desktop disponibile, per non riaprire la finestra invisibile dopo aver scollegato un monitor
- Input non validi segnalati nella barra di stato invece di essere ignorati
- Lettura del formato dati precedente, con migrazione automatica

### Note tecniche

- Nessuna dipendenza di runtime oltre alla libreria standard
- Logica separata dall'interfaccia in `timers_core.py`, coperta da test pytest

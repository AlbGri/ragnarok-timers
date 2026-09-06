# Changelog

## [1.0.0] - 2026-09-06

Prima versione pubblica, nata da uno script personale riorganizzato in progetto.

### Funzionalita'

- Interfaccia in inglese; commenti, docstring e documentazione restano in italiano
- Finestre di respawn con durata minima e massima, mostrate come orari nelle colonne Spawn e Max. Spawn
- Stato comunicato dal colore della riga e dal contatore Left: colore della categoria in attesa, giallo dentro la finestra, rosso quando e' passata
- Timer a durata fissa lasciando vuoto il campo Max
- Colonna Sound con casella attiva di default: un clic disattiva l'allarme del singolo timer
- MvP come categoria predefinita, con migrazione automatica delle categorie precedenti
- Ordinamento automatico: prima le finestre aperte, poi quelle in attesa, infine quelle chiuse
- Allarme sonoro ripetuto con lampeggio della barra delle applicazioni; selezionare la riga ferma la ripetizione
- Preset appresi dai timer creati: riscrivendo un nome gia' usato si compilano mappa, categoria e durate
- Storico con completamento automatico su nome, mappa e categoria
- Modifica inline con doppio clic su nome, mappa, categoria, orario e durate
- Archiviazione solo su richiesta con Clear expired: nessun timer sparisce dalla lista da solo
- Left smette di contare oltre le 24 ore dalla scadenza e mostra un trattino
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

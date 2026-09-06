# Ragnarok Timers

Timer per le finestre di respawn di MVP e quest di Ragnarok Online.

Applicazione desktop in tkinter, senza dipendenze esterne: registri l'ora dell'uccisione e la finestra di respawn del mostro, e la riga cambia colore quando la finestra si apre. Un allarme sonoro ripetuto e il lampeggio nella barra delle applicazioni avvisano anche se stai facendo altro.

## Finestre di respawn

Ogni timer ha una durata minima e una massima. Sono tre stati:

| Stato | Colore | Contatore |
|---|---|---|
| In attesa | colore della categoria | quanto manca all'apertura |
| APERTO | giallo | quanto manca alla chiusura |
| Chiuso | rosso | da quanto e' chiusa |

Se lasci vuoto il campo `Max` il timer diventa un countdown classico a durata fissa: la colonna `Chiude` mostra `-` e lo stato finale e' `Scaduto`.

La lista si riordina da sola: prima le finestre aperte in ordine di chiusura, poi quelle in attesa in ordine di apertura, infine quelle chiuse.

## Setup

```bash
conda create -n ragnarok-timers python=3.12 -y
conda activate ragnarok-timers
python ragnarok_timers.py
```

L'applicazione usa solo la libreria standard: per eseguirla non serve installare nulla. Le dipendenze in `requirements-dev.txt` servono solo per i test e per la build dell'eseguibile.

## Utilizzo

Compila il form e premi `Aggiungi` o `Invio`:

- **Nome, Mappa, Categoria**: campi con storico e completamento automatico. La categoria determina il colore della riga.
- **Min / Max**: durata della finestra in minuti. Accetta `190`, `90,5`, `1h30`, `3:10`.
- **Orario**: ora dell'uccisione in formato `HH:MM`. Se lo lasci vuoto parte da adesso. Un orario che risulterebbe oltre 12 ore nel futuro viene letto come "ieri", cosi' un'uccisione delle 23:50 registrata dopo mezzanotte non parte fra un giorno.

Scrivendo un nome gia' usato, mappa, categoria e durate vengono compilate con i valori dell'ultima volta. I preset si imparano dai timer che crei: non c'e' una tabella di respawn precaricata, perche' i tempi variano da server a server.

### Comandi

| Comando | Effetto |
|---|---|
| Doppio clic su una cella | modifica nome, mappa, categoria, orario o durate |
| `+1 (duplica)` / `Ctrl+D` | ricrea il timer selezionato a partire da adesso |
| `Refresh` / `Ctrl+R` | fa ripartire il timer selezionato da adesso |
| `Rimuovi` / `Canc` | elimina i timer selezionati, con conferma |
| `Annulla` / `Ctrl+Z` | ripristina l'ultimo gruppo rimosso o archiviato |
| `Silenzia` | ferma gli allarmi in corso (basta anche selezionare la riga) |
| `Pulisci scaduti` | archivia i timer con la finestra chiusa da almeno un'ora |

I timer chiusi da oltre 24 ore vengono archiviati automaticamente nel file dati, in modo che la lista non cresca all'infinito.

## Dati e impostazioni

Tutto sta in `ragnarok_timers.json`, accanto allo script o all'eseguibile: timer, storico dei nomi, preset, archivio, volume, posizione della finestra e opzione "sempre in primo piano".

Il salvataggio e' atomico e mantiene una copia `.bak`: se il file principale risulta illeggibile, all'avvio i dati vengono recuperati dal backup. Gli errori finiscono in `ragnarok_timers.log`.

## Struttura

| File | Descrizione |
|---|---|
| `ragnarok_timers.py` | interfaccia tkinter: finestra, tabella, editing inline, entry point |
| `timers_core.py` | modello dati, persistenza, audio, parsing. Nessun import di tkinter |
| `tests/test_core.py` | test pytest della logica non grafica |
| `ragnarok_timers.json` | dati e impostazioni (generato automaticamente) |

## Test

```bash
conda activate ragnarok-timers
pip install -r requirements-dev.txt
pytest
```

## Build eseguibile

```bash
pyinstaller RagnarokTimers.spec --noconfirm
```

L'eseguibile viene creato in `dist/RagnarokTimers/`. Al primo avvio genera il file dati nella sua stessa cartella, quindi la cartella si puo' spostare o copiare mantenendo i timer.

Distribuzione:

```powershell
Compress-Archive -Path "dist\RagnarokTimers\*" -DestinationPath "RagnarokTimers-v1.0.0-windows.zip"
```

## Compatibilita'

Sviluppato e testato su Windows 11. Su Linux l'allarme sonoro richiede `aplay` (pacchetto `alsa-utils`) e il lampeggio della barra delle applicazioni non e' disponibile.

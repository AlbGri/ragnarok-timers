# Ragnarok Timers

Timer per le finestre di respawn di MvP e quest di Ragnarok Online.

Applicazione desktop in tkinter, senza dipendenze esterne: registri l'ora dell'uccisione e la finestra di respawn del mostro, e la riga cambia colore quando la finestra si apre. Un allarme sonoro ripetuto e il lampeggio nella barra delle applicazioni avvisano anche se stai facendo altro.

L'interfaccia e' in inglese; commenti, docstring e documentazione sono in italiano.

## Finestre di respawn

Ogni timer ha una durata minima e una massima, che diventano due orari: `Spawn` e `Max. Spawn`. Uccidendo un MvP alle 13:12 con respawn dichiarato di 180-190 minuti si inserisce `13:12`, `180` e `190`, e la tabella mostra `Spawn 16:12` e `Max. Spawn 16:22`.

| Fase | Colore riga | `Left` |
|---|---|---|
| Prima di `Spawn` | colore della categoria | quanto manca a `Spawn` |
| Fra `Spawn` e `Max. Spawn` | giallo, puo' gia' essere apparso | quanto manca a `Max. Spawn` |
| Dopo `Max. Spawn` | rosso | da quanto e' passato, poi `-` |

Se lasci vuoto il campo `Max` il timer diventa un countdown classico a durata fissa: la colonna `Max. Spawn` mostra `-` e la riga diventa rossa alla scadenza.

La lista si riordina da sola: prima le finestre aperte in ordine di chiusura, poi quelle ancora in attesa in ordine di apertura, infine quelle passate.

## Colonne

| Colonna | Contenuto |
|---|---|
| `Sound` | casella di spunta, attiva di default. Un clic la inverte: deselezionata, quel timer non emette allarmi |
| `Name`, `Map`, `Category` | dati del timer. La categoria determina il colore della riga |
| `Time` | ora dell'uccisione |
| `Spawn` | `Time` piu' la durata minima |
| `Max. Spawn` | `Time` piu' la durata massima, `-` per i timer a durata fissa |
| `Left` | contatore verso la soglia corrente, negativo quando e' passata, `-` oltre le 24 ore dalla scadenza |

## Setup

```bash
conda create -n ragnarok-timers python=3.12 -y
conda activate ragnarok-timers
python ragnarok_timers.py
```

L'applicazione usa solo la libreria standard: per eseguirla non serve installare nulla. Le dipendenze in `requirements-dev.txt` servono solo per i test e per la build dell'eseguibile.

## Utilizzo

Compila il form e premi `Add` o `Invio`:

- **Name, Map, Category**: campi con storico e completamento automatico. La categoria determina il colore della riga e per impostazione predefinita e' `MvP`.
- **Time**: ora dell'uccisione in formato `HH:MM`. Se lo lasci vuoto parte da adesso. Un orario che risulterebbe oltre 12 ore nel futuro viene letto come "ieri", cosi' un'uccisione delle 23:50 registrata dopo mezzanotte non parte fra un giorno.
- **Min / Max**: durata della finestra in minuti. Accetta `190`, `90,5`, `1h30`, `3:10`. Lasciando `Max` vuoto il timer e' a durata fissa.

Scrivendo un nome gia' usato, mappa, categoria e durate vengono compilate con i valori dell'ultima volta. I preset si imparano dai timer che crei: non c'e' una tabella di respawn precaricata, perche' i tempi variano da server a server.

### Comandi

| Comando | Effetto |
|---|---|
| Clic sulla casella `Sound` | attiva o disattiva l'allarme di quel timer |
| Doppio clic su una cella | modifica nome, mappa, categoria, orario o durate |
| `+1 (duplicate)` / `Ctrl+D` | ricrea il timer selezionato a partire da adesso |
| `Refresh` / `Ctrl+R` | fa ripartire il timer selezionato da adesso |
| `Remove` / `Canc` | elimina i timer selezionati, con conferma |
| `Undo` / `Ctrl+Z` | ripristina l'ultimo gruppo rimosso o archiviato |
| `Clear expired` | archivia i timer con la finestra chiusa da almeno un'ora |

Selezionare una riga vale come "l'ho visto" e ferma la ripetizione dell'allarme senza spegnerlo per le volte successive; togliere la spunta a `Sound` lo disattiva stabilmente per quel timer.

Niente sparisce dalla lista da solo: i timer restano finche' non li togli tu. `Clear expired` sposta nella sezione `archive` del file dati quelli con la finestra chiusa da almeno un'ora, e anche quello si annulla con `Ctrl+Z`.

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

L'eseguibile viene creato in `dist/RagnarokTimers/`. Il file dati viene scritto nella cartella dell'exe al primo salvataggio, cioe' appena aggiungi un timer o chiudi la finestra: la cartella si puo' quindi spostare o copiare mantenendo i timer.

La build va lanciata da un environment conda con tkinter. Lo spec copia dalla cartella `Library/bin` dell'environment le DLL native che PyInstaller non rileva da solo (Tcl/Tk e libffi); se non le trova si ferma con un errore invece di produrre un eseguibile che non parte.

Distribuzione:

```powershell
Compress-Archive -Path "dist\RagnarokTimers\*" -DestinationPath "RagnarokTimers-v1.0.0-windows.zip"
```

## Compatibilita'

Sviluppato e testato su Windows 11. Su Linux l'allarme sonoro richiede `aplay` (pacchetto `alsa-utils`) e il lampeggio della barra delle applicazioni non e' disponibile.

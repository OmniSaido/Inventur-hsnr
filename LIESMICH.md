# Inventur-Abgleich – Handy-Fassung (ohne Server)

Eine App für Handy und Tablet: Inventarliste aus MACH laden, Möbel mit der Handykamera scannen,
Ergebnis als Excel-Datei weitergeben. **Alle Daten bleiben auf dem Gerät.** Es gibt keine
Datenbank, keine Anmeldung und keinen Austausch mit anderen Geräten.

## Warum die App einmal über eine https-Adresse geöffnet werden muss

Handys erlauben die Kamera und die Installation als App nur für Seiten, die über eine sichere
Adresse (https) geladen wurden. Eine HTML-Datei, die man einfach auf dem Handy speichert, darf
das nicht.

Die Dateien in diesem Ordner müssen deshalb einmal auf einen Webspace mit https gelegt werden.
Dort liegen nur die Programmdateien, keine Inventurdaten. Nach dem ersten Öffnen speichert das
Handy die ganze App und **startet sie danach auch ohne Netz**, zum Beispiel im Keller.

## Bereitstellen (einmalig)

Den Inhalt dieses Ordners unverändert hochladen: `index.html`, `manifest.webmanifest`, `sw.js`
und den Ordner `static`. Die App funktioniert auch in einem Unterordner.

**Möglichkeit A: Webspace der Hochschule.** Wenn es einen statischen Webspace mit https gibt
(z. B. für Projektseiten), ist das der sauberste Weg. Der Webserver braucht keine besonderen
Einstellungen.

**Möglichkeit B: GitHub Pages (kostenlos).**

1. Konto auf github.com anlegen und ein neues Repository erstellen, z. B. `inventur`. Im
   kostenlosen Tarif muss es öffentlich sein: Der Programmcode ist dann für alle sichtbar,
   Inventurdaten sind keine darin.
2. Im Repository „Add file → Upload files“ und den Inhalt dieses Ordners hineinziehen,
   einschließlich des Ordners `static`. Speichern („Commit changes“).
3. „Settings → Pages“: Branch `main`, Ordner `/ (root)` wählen und speichern.
4. Nach ein bis zwei Minuten ist die App unter `https://<kontoname>.github.io/inventur/`
   erreichbar.

Ob GitHub oder ein anderer externer Anbieter für dienstliche Zwecke zulässig ist, sollte die
Hochschule entscheiden.

## Auf dem Handy installieren

- **Android (Chrome):** Adresse öffnen, dann oben „App installieren“ oder im Chrome-Menü
  „App installieren“ bzw. „Zum Startbildschirm hinzufügen“.
- **iPhone/iPad (Safari):** Adresse öffnen, Teilen-Symbol, „Zum Home-Bildschirm“.

**Wichtig beim iPhone:** Die installierte App hat einen eigenen Speicher, getrennt von Safari.
Erst installieren, dann in der App die Liste laden und scannen.

## Benutzung

1. **Liste laden:** Reiter „Grundliste“, Excel-Liste aus MACH auswählen (z. B. aus den Downloads
   oder einer Mail), Vorschau prüfen, „Als Grundliste übernehmen“.
2. **Scannen:** Reiter „Scannen“, „Mit der Kamera scannen“. Raum oben eintragen oder den
   Raum-Barcode einer gedruckten Raumliste scannen. Die Kamera bleibt an; jeder neue Barcode
   wird sofort abgeglichen, derselbe Barcode zählt nur einmal. Ein Handscanner per Bluetooth
   funktioniert ebenfalls über das Scanfeld.
3. **Ergebnis weitergeben:** Reiter „Abgleich“, „Excel-Datei speichern“. Auf dem Handy öffnet
   sich das Teilen-Menü (Mail, Teams, In Dateien speichern).

## Daten sichern

Die Daten liegen im Speicher des Browsers bzw. der App auf diesem einen Gerät. Sie gehen
verloren, wenn die App deinstalliert oder die Website-Daten gelöscht werden.

- Zwischendurch die **Excel-Ergebnisliste** speichern.
- Für Gerätewechsel: Reiter „Grundliste“, **„Datensicherung speichern“**. Die Datei lässt sich
  auf einem anderen Gerät mit „Datensicherung laden“ einlesen, auch in der PC-Fassung
  (`Inventur-Abgleich.html`), und umgekehrt.

## Aktualisieren

Neue Fassung über die alten Dateien auf den Webspace legen. Das Handy lädt sie beim nächsten
Öffnen mit Netz im Hintergrund und nutzt sie beim übernächsten Start. Die Daten bleiben
erhalten.

## Technisches

- Gelesen werden Code 128, Code 39, EAN-13 und ITF. Auf Android nutzt die App die eingebaute
  Barcode-Erkennung des Browsers, sonst die mitgelieferte Bibliothek ZXing. In ZXing ist ein
  Fehler korrigiert, durch den rein numerische Code-128-Barcodes oft nicht gelesen wurden
  (`Code128Reader.findStartPattern`, `slice` statt Verschieben der Zählliste).
- Größe insgesamt etwa 1,3 MB; alles wird beim ersten Öffnen auf dem Gerät gespeichert.
- Getestet in Google Chrome mit Handy-Bildschirm, simulierter Kamera und ohne Netz. Nicht auf
  echten Handys getestet, insbesondere nicht auf dem iPhone.

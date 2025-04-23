const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Template Engine EJS
app.set('view engine', 'ejs');

// Statische Datein (CSS, Bilder, JS im Frontend)
app.use(express.static('public'));


// Formulardaten auslesen
app.use(bodyParser.urlencoded({extended: true}));

// Startseite
app.get('/', (req, res) => {
    res.render('index');
});

// Bewerbungsformular anzeigen
app.get('/bewerbung',  (req, res) => {
    res.render('bewerbung');
});

// Bewerbung empfangen & speichern
app.post('/bewerbung', (req, res) => {
    const data = req.body;
    const eintrag = `\nName: ${data.name} | Alter: ${data.alter} | Erfahrung: ${data.erfahrung}`;

    fs.appendFileSync('bewerbungen.txt', eintrag);
    res.send('✅ Bewerbung erfolgreich eingereicht!');
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft unter https://localhost:${port}`);
});

// Über-uns-Seite
app.get('/ueber-uns', (req, res) => {
    res.render('ueber-uns');
});


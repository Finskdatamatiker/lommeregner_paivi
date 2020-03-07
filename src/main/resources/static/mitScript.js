$(document).ready(function() {

    /* Variabler (scope for let er funktionen):
      forrigeTal = gemmer tallet, hvis der bliver gemt på en operation.
      operation = +, -, /, *
      detNyeTal = det, der skal vises på display
     */
    let forrigeTal = "";
    let operation = null;
    let detNyeTal = "";

    $('.button').on('click', function() {

        let denValgteKnap = $(this).text();

        //alt nulstilles
        if (denValgteKnap === "DEL") {
            forrigeTal = "";
            detNyeTal = "";
            operation = null;
        }

        // to punktumer er ikke tilladte i et tal
        else if (denValgteKnap === '.') {
            if(!detNyeTal.includes("."))
            {
                detNyeTal += '.';
            }
        }

        /*
         IF: Hvis man trykker på 0 og der ikke står noget, skal der gemmes 0. Det er fordi
         man måske vil udregne 0 + 6, så skal ikke gemmes som ""
         ELSE IF: hvis der i forvejen står 0, står det erstattes med det tal, man trykker.
         ELSE: tallet skal bare skrives efter det tal, der står på display i forvejen, fx 63
         */
        else if (erTal(denValgteKnap)) {

            if (denValgteKnap === "0" && detNyeTal === "") {
                detNyeTal = "0";
            }
            else if(detNyeTal === "0"){
                detNyeTal = denValgteKnap;
            }
            else detNyeTal = detNyeTal + denValgteKnap;
            }

        /*
         IF: hvis der er gemt en operator fra tidligere, skal der foretages en operation med
         den operator, som er gemt. Dette tal gemmes i forrigeTal.
         Oprationen opdateres til den operator, man har valgt i denne omgang.
         ELSE: operation opdateres, detNyeTal gemmes klart til forrigeTal til operationen

         DetNyeTal kan være "" og venter på at brugeren trykker på et nyt tal.
         parseFloat() læser String og returnerer float. Den kigger på, om det først tegn er et nummer og hvis
         ja, returnerer det nummeret (frem til der eventuel kommer andre andre tegn, men de gør der ikke her).
         Hvis nej, returnerer det NaN (Not a Number)
         */

        else if (erOperator(denValgteKnap)) {
            if(operation !== null){

                let forr = parseFloat(forrigeTal);
                let ny = parseFloat(detNyeTal);

                forrigeTal = udregn(forr, ny, operation);
                operation = denValgteKnap;
            }
            else{
            operation = denValgteKnap;
            forrigeTal = parseFloat(detNyeTal);
            }
            detNyeTal = "";
        }

        /*
         Der skal laves en udregning, men det forrigetal, med det nye tal og med den
         gemte operation. Precision er valgt til at være 4 for at rette round off error.
         Dette regnestykke gemmes i forrigeTal mhb. på at brugeren måske vil fortsætte med
         nye regnestykker.
         Desuden vises resultatet på display, så detNyeTal skal sættes til det også.
         Operation nulstilles.
         */
        else if (denValgteKnap === '=') {
            let forrige = parseFloat(forrigeTal);
            let nyt = parseFloat(detNyeTal)

            forrigeTal = udregn(forrige, nyt, operation).toPrecision(4);
            detNyeTal = forrigeTal;
            operation = null;
        }

        //detNyeTal gives til display
        opdatereScreen(detNyeTal);
    });
});

/* const = scope er funktionen og kan ikke ændre værdi.
   Gemmer i en variabel, fordi gentages i funktionen.
*/
function opdatereScreen(visDetNyeTal) {
    const screen = $(".screen");
    if(visDetNyeTal === "Infinity" || visDetNyeTal === "NaN"){
        visDetNyeTal = "Kan ikke udføres, nulstil med DEL"
        screen.text(visDetNyeTal.toString());
    }
    screen.text(visDetNyeTal.toString());
}


function erTal(value) {
    let vaerdi = parseFloat(value);
    return !isNaN(vaerdi);
}

function erOperator(value) {
    return value === '/' || value === '*' || value === '+' || value === '-';
};

function udregn(a, b, operation) {
     a = parseFloat(a);
     b = parseFloat(b);
     let resultat = "";

    if (operation === '+') {
        resultat = a + b;
    }
    if (operation === '-') {
        resultat = a - b;
    }
    if (operation === '*') {
        resultat = a * b;
    }
    if (operation === '/') {
        resultat = a / b;
    }
    return resultat;
}
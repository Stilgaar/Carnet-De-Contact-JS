/* ***************************
 * Les querries && variables*  
 * Listeners && tableaux * 
******************************/

// TODO : Rajouter le newformdata dans le IF quand on choisis pro & perso
// Checker si c'est ça qui merde ....

//boutons
const formulaire = document.querySelector("#formulaire");
const searchButton = document.querySelector("#searchButton");
const saveEnties = document.querySelector("#saveEntries");
const eraseAll = document.querySelector("#eraseAll");

// compartiments de texte (divs dans le HTML)
let newEntry = document.querySelector("#newEntry");
let savedEntry = document.querySelector("#savedEntry");
let searchResult = document.querySelector("#searchResult");

// Parsing des données dans le tableau
const contactsJSON = localStorage.getItem("savedProfiles");
let tableau = JSON.parse(contactsJSON);

// valeur dans l'input recherche
const searchInput = document.querySelector("#search");

// selectionneurs dans la catégorie
const perso = document.querySelector("#perso")
const professionel = document.querySelector("#professionel")
// ou rajouter les trucs
const newpersonnel = document.querySelector("#newpersonnel")
const newprofessionel = document.querySelector("#newprofessionel")

//pointer vers le selecteur d'option
const selector = document.querySelector("#select")

// Creation d'un tableau (si il y en a pas déjà un)
if (tableau === null) {
    tableau = [];
}

// Listeners
formulaire.addEventListener("submit", envoiFormulaire);
saveEnties.addEventListener("click", saveCallBack);
eraseAll.addEventListener("click", toutEffacer)
const divx = document.querySelector(".newboxes")


// dire au Js ou aller chercher les données dans le selector
selector.addEventListener("change", function () {

    if (selector.value == "perso") {
        divx.innerHTML = "";
        let newImput = document.createElement("input");
        newImput.setAttribute("placeholder", "Adresse");
        newImput.setAttribute("name", "adresse")
        newImput.className = "border border-5";
        divx.appendChild(newImput);
    }
    else if (selector.value == "professionel") {
        divx.innerHTML = "";
        let newImput = document.createElement("input");
        newImput.setAttribute("placeholder", "Siret");
        newImput.setAttribute("name", "siret")
        newImput.className = "border border-5";
        divx.appendChild(newImput);
    }
});

// création des constructeur servant de prototype

class General {
    constructor(nom, prenom, mail, tel) {
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.tel = tel;
    }
}

class Pro extends General {
    constructor(nom, prenom, mail, tel, siret) {
        super(nom, prenom, mail, tel);
        this.siret = siret;
    }
    proffessionel() {
        console.log(`Je m'appelle ${nom} et je suis proffessionel`)
    }
}

class Perso extends General {
    constructor(nom, prenom, mail, tel, adresse) {
        super(nom, prenom, mail, tel);
        this.adresse = adresse;
    }
    personnel() {
        console.log(`Je m'appelle ${nom} et je suis personnel (oui oui)`)
    }
}

// Fonction d'envoi de contact dans le formulaire
function envoiFormulaire(e) {
    e.preventDefault(); // Annule la soumission du formulaire (à éclaircir)
    console.log("Nouveau Bouton test") // Log test
    console.log(nom.value + " " + prenom.value + " " + mail.value + " " + tel.value); // log si ça marche

    // chopper les noms du fomulaire
    const donneesFormulaire = new FormData(formulaire);
    const nouveauContact = {
        nom: donneesFormulaire.get("nom"),
        prenom: donneesFormulaire.get("prenom"),
        mail: donneesFormulaire.get("mail"),
        tel: donneesFormulaire.get("tel"),
        siret: donneesFormulaire.get("siret"),
        adresse: donneesFormulaire.get("adresse"),
    }

    let entree;

    if (selector.value == "perso") {
        entree = new Pro(nouveauContact.nom, nouveauContact.prenom, nouveauContact.mail, nouveauContact.tel, nouveauContact.siret); // Prototype à partir du constructeur
    }
    else (selector.value == "professionel"); {
        entree = new Perso(nouveauContact.nom, nouveauContact.prenom, nouveauContact.mail, nouveauContact.tel, nouveauContact.adresse);
    }
    tableau.push(entree); // envoyer dans le tableau

    // engeristrement dans le tableau en JSON
    const stringContacts = JSON.stringify(tableau);
    localStorage.setItem("savedProfiles", stringContacts);

    //creation de l'élément texte dans le HTML
    let newLine = document.createElement("p");
    newLine.className = 'newline'
    newEntry.appendChild(newLine);
    newLine.innerText = `Prenom : ${nouveauContact.prenom}
                         Nom : ${nouveauContact.nom} 
                         Mail : ${nouveauContact.mail} 
                         Telephone : ${nouveauContact.tel}
                         Siret : ${nouveauContact.siret}
                         Adresse : ${nouveauContact.adresse}
                         `
        ;
    // creation du bouton supprimer
    let supprimer = document.createElement("button");
    supprimer.innerText = "delete ";
    newLine.appendChild(supprimer);
    supprimer.addEventListener("click", function () {
        console.log("check le supprimer de l'élément crée");
        lignepresentation.remove();

    })

    formulaire.reset();
}

// Fonction pour la récuperation de données
function saveCallBack() {

    //recuperation des données dans le localStorage
    console.log("Le bouton récuperation fonctionne")

    let content = "";

    tableau.forEach(function (contact) {
        content += `<p> Nom : ${contact.nom} <br>
                        Prenom : ${contact.prenom}  <br>  
                        Mail : ${contact.mail}      <br>
                        Tel ${contact.tel}       <br>
                       Siret : ${contact.siret}     <br>
                        Adresse : ${contact.adresse}   </p> `
    });

    console.log(content);
    let newLine2 = document.createElement("p");
    newLine2.className = 'newline'
    savedEntry.appendChild(newLine2)
    newLine2.innerHTML = content;
}

/* Evènement de recherche */
searchButton.addEventListener("click", function () {

    // Recherche par adresse email
    const result = tableau.find(function (tableau) {
        return tableau.mail == searchInput.value;
    });

    //Génération de l'affichage
    let resultContent = "<p>Aucun résultat</p>";
    if (result) {
        resultContent = `
          <p>
              Prénom: ${result.nom}
              Nom: ${result.prenom}
              Téléphone: ${result.tel}
              Email: ${result.mail}
          </p>
    `;
    }

    // injection du HTML 
    let newLine3 = document.createElement("p");
    newLine3.className = 'newline'
    searchResult.appendChild(newLine3)
    newLine3.innerHTML = resultContent; // Affichage du résultat dans le HTML

});

function toutEffacer() {
    localStorage.clear();
}
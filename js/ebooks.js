// E-books functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the e-book container
    const ebookContainer = document.getElementById('ebook-content');
    if (!ebookContainer) return;

    // Get the e-book ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const ebookId = urlParams.get('id');

    if (!ebookId) {
        // If no e-book ID is provided, show a message
        ebookContainer.innerHTML = '<div class="alert">Geen e-book geselecteerd.</div>';
        return;
    }

    // Show loading indicator
    ebookContainer.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>E-book wordt geladen...</p>
        </div>
    `;

    // Add loading spinner styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-container {
            text-align: center;
            padding: 2rem;
        }
        .loading-spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top: 4px solid var(--accent-color);
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Simulate loading delay for better UX
    setTimeout(() => {
        // Instead of using fetch, we'll use a simple mapping of e-book IDs to content
        const ebookContent = getEbookContent(ebookId);
        
        if (ebookContent) {
            // Convert markdown to HTML
            const html = convertMarkdownToHTML(ebookContent);
            ebookContainer.innerHTML = html;

            // Add table of contents navigation
            addTableOfContentsNavigation();
            
            // Add reading progress indicator
            addReadingProgressIndicator();
            
            // Add smooth scrolling for anchor links
            addSmoothScrolling();
        } else {
            ebookContainer.innerHTML = `<div class="alert alert-error">E-book niet gevonden: ${ebookId}</div>`;
        }
    }, 800);
});

// Add reading progress indicator
function addReadingProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);
    
    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 4px;
            background-color: var(--accent-color);
            z-index: 1000;
            transition: width 0.2s;
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / documentHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Add smooth scrolling for anchor links
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
}

// Function to get e-book content based on ID
function getEbookContent(ebookId) {
    // First try to load from markdown files if available
    try {
        // Check if we're in a development environment where we can access local files
        const markdownPath = `ebooks/markdown/${ebookId}.md`;
        
        // For production, we'd use a server-side API to fetch the content
        // But for now, we'll use a fallback map of content
    } catch (error) {
        console.log("Using fallback content map");
    }
    
    // Fallback content map
    const ebookMap = {
        'medewerkerparticipatie': `# Medewerkerparticipatie

## Een praktische gids voor HR-professionals en leidinggevenden

### Inhoudsopgave

1. [Inleiding](#inleiding)
2. [Wat is medewerkerparticipatie?](#wat-is-medewerkerparticipatie)
3. [Waarom is medewerkerparticipatie belangrijk?](#waarom-is-medewerkerparticipatie-belangrijk)
4. [Waar kan medewerkerparticipatie worden toegepast?](#waar-kan-medewerkerparticipatie-worden-toegepast)
5. [Hoe start je met medewerkerparticipatie?](#hoe-start-je-met-medewerkerparticipatie)
6. [Opbouw van een participatietraject](#opbouw-van-een-participatietraject)
7. [Valkuilen bij medewerkerparticipatie](#valkuilen-bij-medewerkerparticipatie)
8. [De rol van de leidinggevende](#de-rol-van-de-leidinggevende)
9. [Praktische tools en methoden](#praktische-tools-en-methoden)
10. [Het meten van succes](#het-meten-van-succes)
11. [Samenvatting en conclusies](#samenvatting-en-conclusies)

## Inleiding

Medewerkerparticipatie is een essentieel onderdeel van moderne organisaties die streven naar betrokkenheid, innovatie en duurzame prestaties. Dit e-book biedt een praktische gids voor HR-professionals en leidinggevenden die medewerkerparticipatie willen implementeren of verbeteren binnen hun organisatie.

In de volgende hoofdstukken verkennen we wat medewerkerparticipatie precies inhoudt, waarom het belangrijk is, en hoe je het effectief kunt implementeren. We bespreken ook de uitdagingen en valkuilen die je kunt tegenkomen, en bieden praktische tools en methoden om deze te overwinnen.

## Wat is medewerkerparticipatie?

Medewerkerparticipatie verwijst naar de actieve betrokkenheid van medewerkers bij besluitvormingsprocessen binnen een organisatie. Het gaat verder dan alleen het uitvoeren van taken; het omvat het meedenken, meebeslissen en mede-eigenaarschap nemen over processen, projecten en beleid.

Vormen van medewerkerparticipatie:

- **Informatieve participatie**: Medewerkers worden geïnformeerd over beslissingen
- **Consultatieve participatie**: Medewerkers worden geconsulteerd voordat beslissingen worden genomen
- **Besluitvormende participatie**: Medewerkers nemen actief deel aan het besluitvormingsproces
- **Financiële participatie**: Medewerkers delen in de financiële resultaten van de organisatie

## Waarom is medewerkerparticipatie belangrijk?

Medewerkerparticipatie biedt talrijke voordelen voor zowel de organisatie als de medewerkers:

### Voordelen voor de organisatie:

- Verhoogde productiviteit en efficiëntie
- Verbeterde kwaliteit van besluitvorming
- Grotere innovatiekracht
- Verhoogde medewerkerstevredenheid en -retentie
- Versterkte organisatiecultuur

### Voordelen voor medewerkers:

- Grotere werktevredenheid
- Verhoogd gevoel van eigenaarschap
- Persoonlijke en professionele ontwikkeling
- Verbeterde werkrelaties
- Meer invloed op de werkomgeving

## Waar kan medewerkerparticipatie worden toegepast?

Medewerkerparticipatie kan worden toegepast in verschillende gebieden binnen een organisatie:

- **Strategische besluitvorming**: Betrekken van medewerkers bij het bepalen van de organisatierichting
- **Operationele processen**: Medewerkers betrekken bij het verbeteren van dagelijkse werkprocessen
- **Productontwikkeling**: Input van medewerkers gebruiken voor nieuwe producten of diensten
- **Organisatieverandering**: Medewerkers betrekken bij veranderingsinitiatieven
- **Werkplekinrichting**: Medewerkers laten meebeslissen over de inrichting van hun werkomgeving

## Hoe start je met medewerkerparticipatie?

Het implementeren van medewerkerparticipatie vereist een doordachte aanpak:

1. **Bepaal je doelen**: Wat wil je bereiken met medewerkerparticipatie?
2. **Creëer draagvlak**: Zorg voor steun van het management en sleutelfiguren
3. **Communiceer duidelijk**: Leg uit waarom participatie belangrijk is en wat het inhoudt
4. **Begin klein**: Start met pilotprojecten om ervaring op te doen
5. **Bied training**: Rust medewerkers en leidinggevenden uit met de nodige vaardigheden
6. **Evalueer en pas aan**: Monitor de resultaten en pas je aanpak indien nodig aan

## Opbouw van een participatietraject

Een succesvol participatietraject doorloopt typisch de volgende fasen:

### 1. Voorbereiding

- Doelen en verwachtingen vaststellen
- Stakeholders identificeren
- Communicatieplan ontwikkelen
- Benodigde middelen toewijzen

### 2. Implementatie

- Kick-off bijeenkomst organiseren
- Participatieactiviteiten uitvoeren
- Voortgang monitoren
- Ondersteuning bieden waar nodig

### 3. Evaluatie

- Resultaten meten
- Feedback verzamelen
- Successen vieren
- Leerpunten identificeren

### 4. Verankering

- Participatie integreren in reguliere processen
- Best practices documenteren
- Successen delen
- Continu verbeteren

## Valkuilen bij medewerkerparticipatie

Bij het implementeren van medewerkerparticipatie kunnen verschillende uitdagingen optreden:

- **Schijnparticipatie**: Medewerkers betrekken zonder echte invloed te geven
- **Participatiemoeheid**: Overbelasting door te veel participatie-initiatieven
- **Onrealistische verwachtingen**: Te hoge verwachtingen creëren die niet waargemaakt kunnen worden
- **Gebrek aan follow-up**: Geen actie ondernemen op basis van input
- **Ongelijke participatie**: Dominantie door enkele stemmen ten koste van anderen

## De rol van de leidinggevende

Leidinggevenden spelen een cruciale rol bij het faciliteren van medewerkerparticipatie:

- **Creëren van psychologische veiligheid**: Een omgeving scheppen waarin medewerkers zich vrij voelen om ideeën te delen
- **Coachen en faciliteren**: Medewerkers ondersteunen in het participatieproces
- **Delegeren van autoriteit**: Beslissingsbevoegdheid overdragen waar passend
- **Voorbeeldgedrag tonen**: Zelf open staan voor feedback en participatie
- **Balanceren van belangen**: Individuele en teambelangen afwegen tegen organisatiedoelen

## Praktische tools en methoden

Er zijn verschillende tools en methoden die medewerkerparticipatie kunnen ondersteunen:

- **Ideeënplatforms**: Digitale platforms voor het verzamelen en evalueren van ideeën
- **Werkgroepen en taskforces**: Tijdelijke teams voor specifieke uitdagingen
- **World Café**: Gestructureerde dialoogmethode voor groepsgesprekken
- **Hackathons**: Intensieve sessies gericht op het oplossen van specifieke problemen
- **360-graden feedback**: Feedbackmethode vanuit verschillende perspectieven

## Het meten van succes

Om de effectiviteit van medewerkerparticipatie te meten, kunnen verschillende indicatoren worden gebruikt:

- **Kwantitatieve metingen**:
  - Participatiegraad
  - Aantal gegenereerde ideeën
  - Implementatiepercentage van ideeën
  - Medewerkerstevredenheidsscores
  - Productiviteitsmetingen

- **Kwalitatieve metingen**:
  - Diepte-interviews met deelnemers
  - Observaties van participatieprocessen
  - Casestudies van succesvolle initiatieven
  - Narratieve feedback

## Samenvatting en conclusies

Medewerkerparticipatie is een krachtige benadering om betrokkenheid, innovatie en prestaties binnen organisaties te verbeteren. Door medewerkers actief te betrekken bij besluitvorming en hen eigenaarschap te geven, kunnen organisaties hun collectieve intelligentie benutten en een cultuur van samenwerking en continue verbetering creëren.

Succesvolle implementatie vereist een doordachte aanpak, duidelijke communicatie, en een ondersteunende leiderschapsstijl. Door de juiste tools en methoden te gebruiken en regelmatig te evalueren en aan te passen, kan medewerkerparticipatie een duurzaam onderdeel worden van de organisatiecultuur.

---

© 2025 HRElevate. Alle rechten voorbehouden.`,
        'leiderschap-21e-eeuw': `# Leiderschap in de 21e eeuw

## Een praktische gids voor moderne leiders

### Inhoudsopgave

1. [Introductie](#introductie)
2. [De veranderende werkomgeving](#de-veranderende-werkomgeving)
3. [Kerncompetenties voor moderne leiders](#kerncompetenties-voor-moderne-leiders)
4. [Praktische handvatten](#praktische-handvatten)
5. [Casestudies](#casestudies)
6. [Conclusie](#conclusie)

## Introductie

In dit e-book verkennen we de uitdagingen en kansen voor leiders in de 21e eeuw. De moderne werkomgeving vraagt om een nieuwe benadering van leiderschap, waarbij flexibiliteit, emotionele intelligentie en digitale vaardigheden centraal staan.

## De veranderende werkomgeving

De werkomgeving is drastisch veranderd in de afgelopen decennia:

- **Digitale transformatie**: Technologie heeft de manier waarop we werken fundamenteel veranderd
- **Globalisering**: Teams werken steeds vaker op afstand en over verschillende tijdzones
- **Generatieverschillen**: Werkplekken huisvesten nu tot vijf verschillende generaties
- **Verwachtingen van werknemers**: Meer focus op zingeving, balans en ontwikkeling

## Kerncompetenties voor moderne leiders

### 1. Adaptief vermogen

Moderne leiders moeten snel kunnen schakelen tussen verschillende situaties en benaderingen. Dit vereist:

- Openheid voor nieuwe ideeën
- Bereidheid om te experimenteren
- Comfort met ambiguïteit
- Leren van fouten

### 2. Emotionele intelligentie

Het vermogen om emoties te herkennen en effectief te managen is essentieel:

- Zelfbewustzijn
- Zelfregulatie
- Empathie
- Sociale vaardigheden

### 3. Digitale geletterdheid

Leiders moeten de impact van technologie begrijpen:

- Basiskennis van relevante technologieën
- Data-gedreven besluitvorming
- Cybersecurity-bewustzijn
- Digitale communicatievaardigheden

## Praktische handvatten

### Dagelijkse reflectie

Reserveer 10 minuten aan het begin of einde van elke dag voor reflectie:

1. Wat ging er goed vandaag?
2. Wat had beter gekund?
3. Wat heb ik geleerd?
4. Wat ga ik morgen anders doen?

### Feedback-cultuur

Creëer een omgeving waarin feedback wordt gewaardeerd:

- Vraag regelmatig om feedback
- Reageer constructief op feedback
- Geef zelf specifieke en actionable feedback
- Vier successen en leer van mislukkingen

## Casestudies

### Bedrijf A: Transformatie naar hybride werken

*[Gedetailleerde casestudy over hoe een bedrijf succesvol de transitie naar hybride werken heeft gemaakt onder leiding van een adaptieve leider]*

### Bedrijf B: Innovatie door inclusief leiderschap

*[Gedetailleerde casestudy over hoe diverse teams tot betere innovatie leiden onder de juiste leiding]*

## Conclusie

Leiderschap in de 21e eeuw vraagt om een combinatie van tijdloze principes en nieuwe vaardigheden. Door te focussen op adaptief vermogen, emotionele intelligentie en digitale geletterdheid, kunnen leiders hun teams effectief door de complexiteit van de moderne werkomgeving navigeren.

---

© 2025 HRElevate. Alle rechten voorbehouden.`,
        'hr-compliance-handboek': `# HR Compliance Handboek

## Een uitgebreide gids voor HR-professionals

### Inhoudsopgave

1. [Introductie](#introductie)
2. [Wettelijke kaders](#wettelijke-kaders)
3. [Personeelsdossiers](#personeelsdossiers)
4. [Werving en selectie](#werving-en-selectie)
5. [Arbeidsvoorwaarden](#arbeidsvoorwaarden)
6. [Privacy en gegevensbescherming](#privacy-en-gegevensbescherming)
7. [Checklists en templates](#checklists-en-templates)

## Introductie

Dit handboek biedt HR-professionals een praktische gids voor het navigeren door de complexe wereld van HR-compliance. Met toenemende regelgeving en hogere verwachtingen van werknemers is het essentieel dat HR-afdelingen up-to-date blijven met de laatste vereisten.

## Wettelijke kaders

### Arbeidsrecht

De basis van HR-compliance ligt in het arbeidsrecht:

- **Arbeidsovereenkomsten**: Typen, vereisten en beperkingen
- **Arbeidstijdenwet**: Werktijden, rusttijden en overwerk
- **Wet Arbeid en Zorg**: Verlofrechten en -regelingen
- **Wet Werk en Zekerheid**: Ontslagrecht en transitievergoedingen

### Gelijke behandeling

Wetgeving rondom gelijke behandeling omvat:

- **Algemene Wet Gelijke Behandeling**: Verbod op discriminatie
- **Wet Gelijke Behandeling Mannen en Vrouwen**: Gelijke beloning en kansen
- **Wet Gelijke Behandeling op grond van Handicap of Chronische Ziekte**
- **Wet Gelijke Behandeling op grond van Leeftijd bij Arbeid**

## Personeelsdossiers

### Vereiste documentatie

Elk personeelsdossier moet minimaal bevatten:

- Getekende arbeidsovereenkomst
- Kopie identiteitsbewijs
- Loonbelastingverklaring
- Functieomschrijving
- Opleidingsgegevens en certificaten
- Beoordelingsverslagen

### Bewaartermijnen

Verschillende documenten hebben verschillende bewaartermijnen:

| Document | Bewaartermijn |
|----------|---------------|
| Salarisadministratie | 7 jaar |
| Kopie ID-bewijs | 5 jaar na uitdiensttreding |
| Sollicitatiegegevens | 4 weken (zonder toestemming) |
| Ziekmeldingen | 2 jaar |

## Werving en selectie

### Discriminatievrije werving

Richtlijnen voor discriminatievrije werving:

- Neutrale functieomschrijvingen
- Objectieve selectiecriteria
- Gestructureerde interviews
- Diverse selectiecommissies

### Screening en referentiechecks

Juridische kaders voor screening:

- Proportionaliteit en relevantie
- Transparantie naar kandidaten
- Toestemming voor referentiechecks
- Verwerking van screeningsresultaten

## Arbeidsvoorwaarden

### Primaire arbeidsvoorwaarden

Wettelijke vereisten voor:

- Minimumloon
- Vakantiedagen en -geld
- Pensioenregelingen
- Arbeidsongeschiktheidsverzekeringen

### Secundaire arbeidsvoorwaarden

Compliance-aspecten van:

- Leaseauto's en mobiliteitsregelingen
- Thuiswerkvergoedingen
- Opleidingsbudgetten
- Bonusregelingen

## Privacy en gegevensbescherming

### AVG/GDPR-compliance

Kernprincipes van de AVG voor HR:

- Rechtmatigheid, behoorlijkheid en transparantie
- Doelbinding
- Minimale gegevensverwerking
- Juistheid
- Opslagbeperking
- Integriteit en vertrouwelijkheid
- Verantwoordingsplicht

### Praktische implementatie

Stappen voor AVG-implementatie in HR:

1. Data-inventarisatie
2. Privacy-beleid opstellen
3. Verwerkersovereenkomsten
4. Rechten van betrokkenen waarborgen
5. Datalekprocedures implementeren

## Checklists en templates

### Onboarding compliance checklist

- [ ] Arbeidsovereenkomst getekend
- [ ] ID-check uitgevoerd
- [ ] Loonbelastingverklaring ingevuld
- [ ] AVG-verklaring ondertekend
- [ ] Bedrijfsreglement overhandigd
- [ ] Geheimhoudingsverklaring getekend

### Jaarlijkse compliance audit

- [ ] Personeelsdossiers compleet
- [ ] Verlofregistratie bijgewerkt
- [ ] Functioneringsgesprekken uitgevoerd
- [ ] Salarisschalen gecontroleerd op gelijke beloning
- [ ] Privacybeleid geëvalueerd
- [ ] Werknemershandboek geactualiseerd

---

© 2025 HRElevate. Alle rechten voorbehouden.`
    };
    
    return ebookMap[ebookId] || null;
}

// Enhanced markdown to HTML converter
function convertMarkdownToHTML(markdown) {
    // In a production environment, we would use a proper markdown library like marked.js
    // This is an enhanced but still basic converter
    
    // Add syntax highlighting styles
    const style = document.createElement('style');
    style.textContent = `
        pre {
            background-color: #f5f5f5;
            padding: 1rem;
            border-radius: 5px;
            overflow-x: auto;
        }
        code {
            font-family: 'Courier New', monospace;
            color: #d63384;
        }
        blockquote {
            border-left: 4px solid #2E5E4E;
            padding-left: 1rem;
            font-style: italic;
            color: #666;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
            text-align: left;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    `;
    document.head.appendChild(style);

    let html = markdown;

    // Convert headers
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
    html = html.replace(/^##### (.*$)/gm, '<h5>$1</h5>');
    html = html.replace(/^###### (.*$)/gm, '<h6>$1</h6>');

    // Convert bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Convert lists
    html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>');
    
    html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n)+/g, '<ol>$&</ol>');

    // Convert paragraphs
    html = html.replace(/^(?!<[a-z])(.*$)/gm, '<p>$1</p>');
    
    // Convert tables
    html = html.replace(/\|(.+)\|/g, '<tr><td>$1</td></tr>');
    html = html.replace(/<tr><td>(.+)<\/td><\/tr>/g, function(match, p1) {
        return '<tr><td>' + p1.replace(/\|/g, '</td><td>') + '</td></tr>';
    });
    html = html.replace(/(<tr>.+?<\/tr>\n)+/g, '<table>$&</table>');
    
    // Fix empty paragraphs
    html = html.replace(/<p><\/p>/g, '');

    // Add IDs to headers for navigation
    html = html.replace(/<h([1-6])>(.*?)<\/h\1>/g, function(match, level, title) {
        const id = title.toLowerCase().replace(/[^\w]+/g, '-');
        return `<h${level} id="${id}">${title}</h${level}>`;
    });

    return html;
}

// Enhanced table of contents navigation with active section highlighting
function addTableOfContentsNavigation() {
    const headers = document.querySelectorAll('#ebook-content h1, #ebook-content h2, #ebook-content h3');
    const toc = document.getElementById('ebook-toc');
    
    if (!toc || headers.length === 0) return;
    
    let tocHTML = '<ul class="toc-list">';
    
    headers.forEach(header => {
        const level = parseInt(header.tagName.substring(1));
        const title = header.textContent;
        const id = header.id;
        
        tocHTML += `<li class="toc-level-${level}"><a href="#${id}" data-section="${id}">${title}</a></li>`;
    });
    
    tocHTML += '</ul>';
    toc.innerHTML = tocHTML;
    
    // Add active section highlighting
    const tocLinks = document.querySelectorAll('.toc-list a');
    const headerPositions = Array.from(headers).map(header => {
        return {
            id: header.id,
            top: header.offsetTop - 120 // Offset for header
        };
    });
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Find the current section
        let currentSection = headerPositions[0].id;
        
        for (let i = 0; i < headerPositions.length; i++) {
            if (scrollPosition >= headerPositions[i].top) {
                currentSection = headerPositions[i].id;
            } else {
                break;
            }
        }
        
        // Update active class
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    });
    
    // Add search functionality for e-book content
    addEbookSearch();
}

// Add search functionality for e-book content
function addEbookSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'ebook-search';
    searchContainer.innerHTML = `
        <input type="text" id="ebook-search-input" placeholder="Zoeken in e-book...">
        <button id="ebook-search-button"><i class="fas fa-search"></i></button>
    `;
    
    const toc = document.getElementById('ebook-toc');
    toc.parentNode.insertBefore(searchContainer, toc);
    
    const searchInput = document.getElementById('ebook-search-input');
    const searchButton = document.getElementById('ebook-search-button');
    
    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.length < 2) return;
        
        const content = document.getElementById('ebook-content');
        const text = content.innerText;
        const paragraphs = content.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6');
        
        // Remove existing highlights
        const existingHighlights = content.querySelectorAll('.search-highlight');
        existingHighlights.forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });
        
        if (searchTerm.length === 0) return;
        
        // Add new highlights
        let matchFound = false;
        paragraphs.forEach(paragraph => {
            const html = paragraph.innerHTML;
            if (html.toLowerCase().includes(searchTerm)) {
                matchFound = true;
                const newHtml = html.replace(
                    new RegExp(searchTerm, 'gi'), 
                    match => `<span class="search-highlight">${match}</span>`
                );
                paragraph.innerHTML = newHtml;
                
                // Scroll to first match
                if (matchFound) {
                    const firstMatch = content.querySelector('.search-highlight');
                    if (firstMatch) {
                        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
        });
        
        // Add search highlight style
        const style = document.createElement('style');
        style.textContent = `
            .search-highlight {
                background-color: #ffeb3b;
                padding: 2px 0;
            }
            .ebook-search {
                display: flex;
                margin-bottom: 1rem;
            }
            #ebook-search-input {
                flex: 1;
                padding: 0.5rem;
                border: 1px solid #ddd;
                border-radius: 4px 0 0 4px;
            }
            #ebook-search-button {
                background-color: var(--accent-color);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 0 4px 4px 0;
                cursor: pointer;
            }
            .toc-list a.active {
                color: var(--accent-color);
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    };
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', e => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

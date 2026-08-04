import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowsOut, ArrowsIn, CaretDown } from '@phosphor-icons/react'
import { TYPOLOGIES, CATEGORIES_MAP, type Typologie } from '../../data/typologies'
import styles from './CarteTypologies.module.css'

/* Au-delà de ce nombre d'éléments, un groupe de région affiche une combo box
   de sélection plutôt qu'une longue liste de cartes (cas de « Toutes régions »). */
const COMBO_THRESHOLD = 8

/* Premiers segments de région ne désignant pas un lieu précis (portée nationale ou générique) — regroupés sous « Toutes régions » */
const GENERIC_REGION_TOKENS = new Set([
  'Toutes régions', 'France', 'Aires urbaines', 'Bassins miniers', 'Campagnes', 'Centres historiques', 'Centres-villes',
  'Charentes & DOM', 'Chef-lieu de département', 'Chef-lieu de département ou d’arrondissement', 'Communautés juives',
  'Communautés réformées', 'Côtes françaises', 'Côtes normande, basque, méditerranéenne', 'Grandes villes',
  'Lieux de pèlerinage', 'Littoral', 'Littoral & frontières', 'Littoral atlantique', 'Massifs forestiers',
  'Périphéries urbaines', 'Places fortes', 'Plaines & littoral', 'Ports & littoral', 'Ports & plaines céréalières',
  'Ports & villes industrielles', 'Ports de pêche', 'Rades & estuaires', 'Stations balnéaires et thermales',
  'Toutes côtes françaises', 'Vallées fluviales', 'Villes de garnison', 'Villes d’eaux littorales et intérieures',
  'Villes épiscopales', 'Villes industrielles', 'Zones pavillonnaires',
])

const NATIONAL_GROUP = 'Toutes régions'

const regionGroupOf = (t: Typologie) => {
  const first = t.region.split(' · ')[0]
  return GENERIC_REGION_TOKENS.has(first) ? NATIONAL_GROUP : first
}

const REGION_GROUPS = (() => {
  const map = new Map<string, Typologie[]>()
  for (const t of TYPOLOGIES) {
    const key = regionGroupOf(t)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(t)
  }
  for (const list of map.values()) list.sort((a, b) => a.name.localeCompare(b.name, 'fr'))
  const entries = [...map.entries()].sort((a, b) => {
    if (a[0] === NATIONAL_GROUP) return -1
    if (b[0] === NATIONAL_GROUP) return 1
    return a[0].localeCompare(b[0], 'fr')
  })
  return entries
})()

/* Coordonnées des épingles dans le viewBox 0 0 1000 958 */
const PINS = [
  { id: 'coron',         cx: 557, cy:  45, label: 'Coron minier',    pulse: true,  anchor: 'start',  tx: 577, ty:  50 },
  { id: 'panbois',       cx: 423, cy: 162, label: 'Pan de bois',     pulse: false, anchor: 'end',    tx: 405, ty: 150 },
  { id: 'artdeco',       cx: 580, cy: 150, label: 'Art déco',        pulse: false, anchor: 'start',  tx: 600, ty: 155 },
  { id: 'haussmann',     cx: 508, cy: 220, label: 'Haussmannien',    pulse: true,  anchor: 'start',  tx: 530, ty: 226 },
  { id: 'longere',       cx: 230, cy: 230, label: 'Longère bretonne', pulse: false, anchor: 'start', tx: 250, ty: 236 },
  { id: 'chalet',        cx: 820, cy: 560, label: 'Chalet savoyard', pulse: false, anchor: 'end',    tx: 800, ty: 565 },
  { id: 'grandensemble', cx: 678, cy: 525, label: 'Grand ensemble',  pulse: false, anchor: 'start',  tx: 698, ty: 530 },
  { id: 'echoppe',       cx: 330, cy: 650, label: 'Échoppe bordelaise', pulse: false, anchor: 'end', tx: 312, ty: 656 },
  { id: 'mas',           cx: 714, cy: 768, label: 'Mas provençal',   pulse: false, anchor: 'start',  tx: 735, ty: 773 },
  { id: 'labourdine',    cx: 260, cy: 790, label: 'Maison basque',   pulse: false, anchor: 'end',    tx: 242, ty: 796 },
] as const

/* Points additionnels, sans étiquette texte (pour éviter la surcharge visuelle) */
const MICRO_PINS = [
  { id: 'alsacienne',       cx: 700, cy: 175, label: 'Maison alsacienne' },
  { id: 'lorraine',         cx: 645, cy: 150, label: 'Maison lorraine' },
  { id: 'vosgienne',        cx: 665, cy: 225, label: 'Maison vosgienne' },
  { id: 'comtoise',         cx: 700, cy: 335, label: 'Maison comtoise' },
  { id: 'jurassienne',      cx: 735, cy: 365, label: 'Maison jurassienne' },
  { id: 'bressane',         cx: 650, cy: 465, label: 'Ferme bressane' },
  { id: 'savoyarde',        cx: 795, cy: 605, label: 'Maison savoyarde' },
  { id: 'beauceronne',      cx: 430, cy: 265, label: 'Ferme beauceronne' },
  { id: 'solognote',        cx: 470, cy: 335, label: 'Maison solognote' },
  { id: 'bourbonnaise',     cx: 545, cy: 465, label: 'Ferme bourbonnaise' },
  { id: 'auvergnate',       cx: 520, cy: 565, label: 'Ferme auvergnate' },
  { id: 'buron',            cx: 545, cy: 625, label: 'Buron' },
  { id: 'chaletalpage',     cx: 845, cy: 580, label: "Chalet d'alpage" },
  { id: 'refugemontagne',   cx: 860, cy: 605, label: 'Refuge de montagne' },
  { id: 'grangeforaine',    cx: 805, cy: 590, label: 'Grange foraine' },
  { id: 'mazot',            cx: 830, cy: 545, label: 'Mazot' },
  { id: 'fermenormande',    cx: 385, cy: 195, label: 'Ferme normande' },
  { id: 'longerevendeenne', cx: 260, cy: 380, label: 'Longère vendéenne' },
  { id: 'charentaise',      cx: 300, cy: 605, label: 'Maison charentaise' },
  { id: 'perigourdine',     cx: 375, cy: 685, label: 'Maison périgourdine' },
  { id: 'quercynoise',      cx: 435, cy: 705, label: 'Maison quercynoise' },
  { id: 'cevenole',         cx: 590, cy: 685, label: 'Maison cévenole' },
  { id: 'mazet',            cx: 608, cy: 700, label: 'Mazet cévenol' },
  { id: 'capitelle',        cx: 605, cy: 745, label: 'Capitelle' },
  { id: 'borie',            cx: 685, cy: 735, label: 'Borie' },
  { id: 'landaise',         cx: 290, cy: 735, label: 'Maison landaise' },
  { id: 'bearnaise',        cx: 315, cy: 805, label: 'Maison béarnaise' },
  { id: 'maisondeville18e', cx: 480, cy: 280, label: 'Maison de ville XVIIIe' },
  { id: 'hotelparticulier', cx: 500, cy: 300, label: 'Hôtel particulier' },
  { id: 'maisonbourgeoise', cx: 460, cy: 320, label: 'Maison bourgeoise' },
  { id: 'maisonouvriere',   cx: 600, cy: 100, label: 'Maison ouvrière' },
  { id: 'canutlyonnais',    cx: 700, cy: 500, label: 'Canut lyonnais' },
  { id: 'maisontoulousaine', cx: 460, cy: 750, label: 'Maison toulousaine' },
  { id: 'maisonnantaise',   cx: 290, cy: 420, label: 'Maison nantaise' },
  { id: 'artnouveau',       cx: 540, cy: 250, label: 'Immeuble Art nouveau' },
  { id: 'annees30',         cx: 560, cy: 270, label: 'Immeuble années 30' },
  { id: 'maisonidf',        cx: 520, cy: 240, label: 'Maison Île-de-France' },
  { id: 'barrehlm',         cx: 700, cy: 550, label: 'Barre HLM' },
  { id: 'tourhlm',          cx: 720, cy: 570, label: 'Tour HLM' },
  { id: 'pavillonphenix',   cx: 420, cy: 300, label: 'Pavillon Phénix' },
  { id: 'egliseromane',     cx: 430, cy: 560, label: 'Église romane' },
  { id: 'eglisegothique',   cx: 500, cy: 195, label: 'Église gothique' },
  { id: 'cathedralegothique', cx: 470, cy: 225, label: 'Cathédrale gothique' },
  { id: 'chapellerurale',   cx: 360, cy: 500, label: 'Chapelle rurale' },
  { id: 'basilique',        cx: 355, cy: 850, label: 'Basilique' },
  { id: 'abbaye',           cx: 400, cy: 470, label: 'Abbaye' },
  { id: 'monastere',        cx: 780, cy: 420, label: 'Monastère' },
  { id: 'prieure',          cx: 445, cy: 500, label: 'Prieuré' },
  { id: 'cloitre',          cx: 405, cy: 680, label: 'Cloître' },
  { id: 'templeprotestant', cx: 640, cy: 620, label: 'Temple protestant' },
  { id: 'synagogue',        cx: 520, cy: 210, label: 'Synagogue' },
  { id: 'mosqueecontemporaine', cx: 565, cy: 300, label: 'Mosquée contemporaine' },
  { id: 'chateaufort',      cx: 550, cy: 400, label: 'Château fort' },
  { id: 'donjon',           cx: 570, cy: 420, label: 'Donjon' },
  { id: 'tourmedievale',    cx: 540, cy: 230, label: 'Tour médiévale' },
  { id: 'bastidefortifiee', cx: 400, cy: 720, label: 'Bastide fortifiée' },
  { id: 'citadellevauban',  cx: 620, cy: 180, label: 'Citadelle Vauban' },
  { id: 'fortnapoleon',     cx: 250, cy: 500, label: 'Fort Napoléon' },
  { id: 'blockhausatlantique', cx: 240, cy: 300, label: 'Blockhaus Atlantique' },
  { id: 'caserne',          cx: 600, cy: 350, label: 'Caserne' },
  { id: 'grange',           cx: 480, cy: 480, label: 'Grange' },
  { id: 'bergerie',         cx: 700, cy: 700, label: 'Bergerie' },
  { id: 'etable',           cx: 460, cy: 550, label: 'Étable' },
  { id: 'fenil',            cx: 750, cy: 480, label: 'Fenil' },
  { id: 'colombier',        cx: 420, cy: 620, label: 'Colombier' },
  { id: 'pigeonnier',       cx: 440, cy: 690, label: 'Pigeonnier' },
  { id: 'pressoir',         cx: 350, cy: 580, label: 'Pressoir' },
  { id: 'fourapain',        cx: 500, cy: 450, label: 'Four à pain' },
  { id: 'moulinvent',       cx: 320, cy: 450, label: 'Moulin à vent' },
  { id: 'moulineau',        cx: 470, cy: 400, label: 'Moulin à eau' },
  { id: 'sechoirtabac',     cx: 380, cy: 660, label: 'Séchoir à tabac' },
  { id: 'hangaragricole',   cx: 550, cy: 500, label: 'Hangar agricole' },
  { id: 'filature',         cx: 590, cy: 90,  label: 'Filature' },
  { id: 'forge',            cx: 660, cy: 300, label: 'Forge' },
  { id: 'hautfourneau',     cx: 680, cy: 130, label: 'Haut-fourneau' },
  { id: 'usinetextile',     cx: 570, cy: 70,  label: 'Usine textile' },
  { id: 'sucrerie',         cx: 540, cy: 110, label: 'Sucrerie' },
  { id: 'distillerie',      cx: 310, cy: 610, label: 'Distillerie' },
  { id: 'manufacture',      cx: 500, cy: 260, label: 'Manufacture' },
  { id: 'mine',             cx: 610, cy: 60,  label: 'Mine' },
  { id: 'chevalement',      cx: 625, cy: 65,  label: 'Chevalement' },
  { id: 'centraleelectrique', cx: 800, cy: 500, label: 'Centrale électrique' },
  { id: 'silo',             cx: 260, cy: 350, label: 'Silo' },
  { id: 'entrepot',         cx: 240, cy: 280, label: 'Entrepôt' },
  { id: 'garemonumentale',  cx: 510, cy: 235, label: 'Gare monumentale' },
  { id: 'garerurale',       cx: 450, cy: 350, label: 'Gare rurale' },
  { id: 'rotondeferroviaire', cx: 650, cy: 400, label: 'Rotonde ferroviaire' },
  { id: 'hallemarchandises', cx: 480, cy: 320, label: 'Halle marchandises' },
  { id: 'chateaudeau',      cx: 420, cy: 340, label: 'Château d’eau SNCF' },
  { id: 'passageniveau',    cx: 380, cy: 380, label: 'Passage à niveau' },
  { id: 'depotlocomotives', cx: 620, cy: 380, label: 'Dépôt locomotives' },
  { id: 'phare',            cx: 130, cy: 330, label: 'Phare' },
  { id: 'maisongardien',    cx: 145, cy: 340, label: 'Maison de gardien' },
  { id: 'semaphore',        cx: 160, cy: 300, label: 'Sémaphore' },
  { id: 'cale',             cx: 200, cy: 420, label: 'Cale' },
  { id: 'criee',            cx: 220, cy: 460, label: 'Criée' },
  { id: 'cabanesostreicoles', cx: 240, cy: 520, label: 'Cabanes ostréicoles' },
  { id: 'cabanepecheur',    cx: 210, cy: 250, label: 'Cabane de pêcheur' },
  { id: 'fortmaritime',     cx: 260, cy: 440, label: 'Fort maritime' },
  { id: 'mairie',           cx: 350, cy: 400, label: 'Mairie' },
  { id: 'ecolejulesferry',  cx: 380, cy: 440, label: 'École Jules Ferry' },
  { id: 'prefecture',       cx: 600, cy: 250, label: 'Préfecture' },
  { id: 'tribunal',         cx: 630, cy: 280, label: 'Tribunal' },
  { id: 'hopital',          cx: 300, cy: 500, label: 'Hôpital' },
  { id: 'hospice',          cx: 330, cy: 520, label: 'Hospice' },
  { id: 'prison',           cx: 660, cy: 230, label: 'Prison' },
  { id: 'casernepompiers',  cx: 420, cy: 500, label: 'Caserne de pompiers' },
  { id: 'bureauposte',      cx: 390, cy: 250, label: 'Bureau de poste' },
  { id: 'gareroutiere',     cx: 520, cy: 550, label: 'Gare routière' },
  { id: 'chapellefuneraire', cx: 490, cy: 240, label: 'Chapelle funéraire' },
  { id: 'caveaufamilial',   cx: 460, cy: 260, label: 'Caveau familial' },
  { id: 'mausolee',         cx: 470, cy: 210, label: 'Mausolée' },
  { id: 'columbarium',      cx: 500, cy: 280, label: 'Columbarium' },
  { id: 'ossuaire',         cx: 290, cy: 250, label: 'Ossuaire' },
  { id: 'monumentauxmorts', cx: 640, cy: 450, label: 'Monument aux morts' },
  { id: 'lycee',            cx: 370, cy: 480, label: 'Lycée' },
  { id: 'universite',       cx: 400, cy: 620, label: 'Université' },
  { id: 'bibliothequeuniversitaire', cx: 430, cy: 600, label: 'Bibliothèque universitaire' },
  { id: 'citeuniversitaire', cx: 560, cy: 200, label: 'Cité universitaire' },
  { id: 'ecolematernelle',  cx: 340, cy: 470, label: 'École maternelle' },
  { id: 'grandeecole',      cx: 545, cy: 195, label: 'Grande école' },
  { id: 'grandmagasin',     cx: 495, cy: 200, label: 'Grand magasin' },
  { id: 'passagecouvert',   cx: 520, cy: 210, label: 'Passage couvert' },
  { id: 'marchecouvert',    cx: 410, cy: 300, label: 'Marché couvert' },
  { id: 'hallemedievale',   cx: 350, cy: 620, label: 'Halle médiévale' },
  { id: 'centrecommercial', cx: 610, cy: 470, label: 'Centre commercial' },
  { id: 'grandesurface',    cx: 260, cy: 480, label: 'Grande surface' },
  { id: 'casino',           cx: 260, cy: 160, label: 'Casino' },
  { id: 'theatreitalienne', cx: 560, cy: 350, label: 'Théâtre à l’italienne' },
  { id: 'cinema',           cx: 590, cy: 550, label: 'Cinéma' },
  { id: 'piscinemunicipale', cx: 620, cy: 600, label: 'Piscine municipale' },
  { id: 'salledesfetes',    cx: 480, cy: 520, label: 'Salle des fêtes' },
  { id: 'kiosquemusique',   cx: 450, cy: 460, label: 'Kiosque à musique' },
  { id: 'villabelleepoque', cx: 280, cy: 175, label: 'Villa Belle Époque' },
  { id: 'grandhotel',       cx: 240, cy: 145, label: 'Grand hôtel' },
  { id: 'etablissementthermal', cx: 300, cy: 190, label: 'Établissement thermal' },
  { id: 'villaartdeco',     cx: 250, cy: 810, label: 'Villa Art déco' },
  { id: 'pavillondeplage',  cx: 215, cy: 610, label: 'Pavillon de plage' },
  { id: 'maisonbbc',        cx: 400, cy: 550, label: 'Maison BBC' },
  { id: 'maisonpassive',    cx: 430, cy: 570, label: 'Maison passive' },
  { id: 'maisonossaturebois', cx: 700, cy: 420, label: 'Maison ossature bois' },
  { id: 'maisoncontainer',  cx: 370, cy: 570, label: 'Maison container' },
  { id: 'immeublehqe',      cx: 500, cy: 260, label: 'Immeuble HQE' },
  { id: 'ecoquartier',      cx: 470, cy: 280, label: 'Écoquartier' },
  { id: 'residenceetudiante', cx: 440, cy: 610, label: 'Résidence étudiante' },
  { id: 'residencesenior',  cx: 410, cy: 610, label: 'Résidence senior' },
  { id: 'stabulationlibre', cx: 600, cy: 460, label: 'Stabulation libre' },
  { id: 'salledetraite',    cx: 620, cy: 460, label: 'Salle de traite' },
  { id: 'batimentavicole',  cx: 580, cy: 480, label: 'Bâtiment avicole' },
  { id: 'porcherieindustrielle', cx: 250, cy: 250, label: 'Porcherie industrielle' },
  { id: 'serreagricole',    cx: 540, cy: 600, label: 'Serre agricole' },
  { id: 'methaniseuragricole', cx: 560, cy: 510, label: 'Méthaniseur agricole' },
  { id: 'college',          cx: 480, cy: 490, label: 'Collège' },
  { id: 'groupescolaire',   cx: 400, cy: 490, label: 'Groupe scolaire' },
  { id: 'internat',         cx: 360, cy: 460, label: 'Internat' },
  { id: 'gymnasescolaire',  cx: 500, cy: 470, label: 'Gymnase scolaire' },
  { id: 'ecoleprimairerurale', cx: 330, cy: 500, label: 'École primaire rurale' },
  { id: 'cantinescolaire',  cx: 460, cy: 460, label: 'Cantine scolaire' },
] as const

/* Tracé SVG de la France métropolitaine (IGN simplifié, viewBox 0 0 1000 958) */
const FRANCE_PATH = "M834.3 353.4L833 354.2L830 354.4L827.1 353.3L824.5 354.6L825.4 358.4L823.4 359L821.4 360.3L821.2 363L819.8 363.1L819.4 365L817.6 366.1L817.2 367.7L819.9 368L825 367.2L826.3 366.3L828.8 367.5L829.7 369.1L828.6 370.8L826.5 372.1L825 373.9L821.5 374.7L822.4 379L821.4 380.2L817.4 383.2L815.8 386.8L811.8 390.3L809.3 391.2L807.7 392.4L807.8 394.1L806.2 394.3L804.4 396.5L805.9 398.2L805 399.2L802.4 400.3L800.5 403.2L797.7 403.8L795.9 404.9L792.6 405.9L791.1 405.6L787.7 409.5L786.7 410.1L788.9 413.9L788.6 417.7L787.4 419.6L786.9 422.6L788.5 423.9L786.3 427.2L784.2 427.9L784 428.8L780.8 431.4L776.7 433.5L772.8 437.7L769.2 441.1L765.9 443.4L764.8 444.8L766.7 446.6L767.9 447.8L764.9 451.4L763.8 454.2L762.3 455.9L763.1 458.1L761.6 460.6L763.9 461.3L768.8 465.3L765.5 470.7L765.4 472.5L764.2 473.5L765.7 476.9L764.2 478.2L763.3 477.3L759.5 478.2L757.4 479.8L755.8 480.2L754.8 482.2L756.7 483.2L754.2 488.6L756.2 487.5L760.3 487.8L760.8 486.7L763.5 486.7L765.9 487.8L769.2 486L769.9 484.1L773.3 481.3L776.2 480.4L778.4 477.6L778.2 476.4L775.5 477.2L773.5 474.3L774.1 471.8L776.1 467.2L778 465.5L780.7 465.1L781.6 466.9L783.8 468.1L785.3 466.3L789.2 464.9L790.2 463L792.2 461.7L794.4 462.7L797.3 462L800.5 461.6L806.5 461.4L811.1 462.9L812.2 464.1L809.8 466.6L810.7 468.8L813.2 470.6L813.8 472L816.2 473.7L815.5 476.6L814.5 477.1L812 481.5L812.6 483.5L811.3 485.6L811.6 488L812.8 488.8L818.5 489.5L817.5 492.2L818 493.3L816.7 496.5L817.8 497.4L820.3 495.2L822.1 496.7L824.4 501L825.8 501.6L827 503.6L826.7 505.5L828 506.1L828.4 509.1L826.9 509.9L825.6 511.7L825.8 513L824.9 514.6L822.1 515.5L821.3 516.7L818.3 517.1L816.8 516.8L813.1 517.8L812.1 519.8L812.7 520.5L812 523.5L812.4 528.7L815.1 532.2L819.1 533.7L818.8 534.8L821 536.4L823.2 535.7L825.5 537.1L824.6 538.6L823.9 542L825.1 543.5L824.9 547.8L825.8 549.2L825.5 550.5L828.5 551.2L828.6 553L832.2 553.9L833.2 557.4L835.8 558.5L838 560L836.7 562.4L836.5 564.5L834.8 565.6L834.6 567.5L833.2 567.8L833.7 571L834.7 572.5L834.8 574.9L832.7 576.6L830 579.5L828.9 578L826.8 578.9L823.1 579.7L822.3 582.5L820.7 583.3L818.3 583.6L817.5 584.7L818.2 586.7L815.1 587.7L812.6 585.6L809.6 584.5L807.6 586.7L805.7 585.9L803.6 586.4L803.1 587.9L800.2 589.4L800 590.2L802.4 593.1L802.2 595.1L803.1 598.1L806.7 598.1L807.9 598.6L808.5 600.4L807.5 601L809.3 603L808.6 605.8L808.4 609.5L809.8 609.7L812.2 612.4L816.1 614.9L819.6 615.4L820.9 613.8L823.6 615.4L825.9 616L826.7 618.7L825.4 621L827.1 623.6L827.1 625.7L828.4 628L829.9 628.4L830.7 631.7L829.5 631.7L827.1 630.6L824.5 630.9L822.5 632.7L821.9 634.2L822.9 637L821.9 637.9L820.8 640.3L820.8 642.3L819.5 643.7L817 644.5L815.5 646.6L816.3 650L817.4 651.7L819 652.8L819.4 654.2L821.1 655.5L821.1 656.4L818.1 657.3L818.4 661.9L817.8 663.2L820.2 664.2L820.4 665.8L822.7 668.1L822.4 669.5L825 671.1L825.2 673.9L826 675.5L828.1 676.7L830.2 675.8L833.1 677.4L835.1 679L836.3 678.5L839.3 680.6L840.4 682.1L841.6 681.6L842.4 683.2L844.6 684.9L848.6 684.4L849.9 687.1L852 686.5L854.5 687.2L854.8 686.2L856.8 686.4L859.9 684.6L863.4 684.3L864.8 683.7L867.3 684L869.4 681.2L872.1 681.6L871.2 683.6L870.9 685.6L871.4 687.1L874.2 690.6L874.1 692.3L873.2 694.8L870.8 695.8L871.1 698.9L869.9 701.3L867 703.2L866.1 703.1L864.5 704.9L863.6 707.2L863.6 708.9L860.3 710.4L859.2 712.4L860.8 718.2L861.6 719.7L858.9 721.7L857.9 723.3L856.8 722.4L853.5 725L853.6 725.9L851 726.6L850 726.2L848.5 727.2L847.7 728.7L845.7 729.7L844.9 728.9L842.1 729.4L840.8 732.1L839.5 733.7L838.7 732.5L836.2 732.9L834.9 734.7L833.8 739.4L833.7 742.2L832.3 741.1L830 742L829.2 743.3L826.4 743.1L823.7 743.5L822.2 744.6L821.2 746.5L822.3 747.6L821.8 749.6L820.9 750L820.2 752.8L819 753.5L818.1 755.1L815.7 754.9L815.8 756.5L813.6 756.2L810.6 757L809.5 755.6L807.3 757.4L807.2 759L806 761.1L805.7 763.4L803.6 763.8L802.7 766L797.1 770L797.2 771.3L799.6 771.3L800.9 770.3L802.4 771.2L803.4 769.9L804.8 771.1L804.3 772.3L802.5 773.9L802.9 777.1L801.1 779.1L799.5 781.5L797.6 779.1L795.2 778.8L791 782.5L788.6 782L784.9 782.7L782.4 783.9L781.8 785.5L782.2 788.6L779.9 788.4L778.8 786.9L776 785.5L773.7 786.1L771.4 785.9L769.5 786.8L768.2 788.6L767.5 791.3L767.9 794.6L765.2 793.5L766.2 792.6L765.8 789.7L762.5 788.8L759.4 789.7L758.8 788L757.7 787.1L753.2 786.7L751.8 785.1L750.4 786.2L751.5 788.9L748.5 790.6L747.5 792.8L745.6 792.5L743.9 789.6L744.5 786.8L741.8 785.8L742.3 784.5L738.5 783.9L738.1 782.8L736.4 783.2L734.9 779.7L733.5 778.9L731.6 778.9L730 781.3L727.9 780.1L725.3 776.5L723.8 777.9L720 776.6L715.7 776.4L713.8 776.9L712.3 776.2L712.8 774.7L714.4 773.2L714 770.8L712.6 769.5L713.9 766.6L711.1 762.2L709.3 761.9L706.5 764.1L704.1 765L701.1 764.5L700.5 765L691.6 764.9L690.3 763.6L690.7 762.3L687.4 757.7L686.8 755.4L684.4 754.7L682.7 756L679.8 757.3L678.7 760.4L680.5 761.8L679.2 764.6L677.7 764.8L674.3 763.1L669.8 762.8L666 763.2L660.8 761.9L659.2 760.7L658.9 759.1L660.9 757.9L660.5 754.9L659.2 753.7L656.1 752.5L652.6 752.3L648.3 753.3L646.9 752.8L636.5 752L632.1 750.8L629.5 749.1L628.8 747.2L630.3 744.9L627.7 742.7L624.7 742.4L621.6 742.9L618.7 744.1L614.5 746.4L610.7 749.4L607 753.9L602.1 756.4L602.1 757.8L599.9 758.6L597.8 758.7L593.7 762.3L590.7 765.9L587.4 770.6L584.5 770.1L582 768.7L579 769.3L576.1 770.7L570.6 774.8L569 776.4L564.7 781.1L562.2 784.7L559 790.5L557.7 793.6L555.6 801.3L555.4 804.3L556.8 805.5L555.6 813.3L555.3 817.1L555.3 823.9L555.1 829.1L555.2 834.2L555.7 837.3L556 841.7L556.5 843L558.6 844.3L559.8 844.1L562.1 845.2L561 846.2L561.7 848.5L563.1 848.8L563.4 850.6L564.5 853L560.9 852.8L558.5 854L556 851L555.4 849.3L553.5 849.9L551.9 849.2L550.5 850L549 848.4L547.5 850.8L543.3 850.2L541.8 850.7L540 852.7L539 854.7L537.1 855.3L535.8 854L533.3 854.5L530.4 856.1L529.2 857.6L530.3 862.3L526.1 861.8L523.9 860.7L522.3 861.1L521.3 863L518.6 862.1L517.4 862.5L516.3 860.6L514 858.8L514.1 857.6L508.3 855.8L505.4 853.7L504.4 854.2L502 852.7L501.3 853.6L498.2 854.9L495.1 854.2L493.2 855.3L492.3 858.3L490.6 859.1L490.1 860.2L486 860.9L483.5 860.2L481.8 857.3L481.6 854.1L480.5 853.6L480 851.2L478.8 851.9L476.6 851.6L476.4 850.6L474.2 849.9L473.8 848.9L471 847.7L468.3 847.9L466.1 847.4L465.8 844.9L466.4 841.7L467.7 840.3L469.9 839.4L469 838.7L465.8 837.7L466.6 835.7L462.9 834.3L461.4 834.9L459.7 833.8L457.6 834.1L456.2 833.5L454.6 831.5L453.7 831.3L450.4 832.3L449 831.7L448.3 834L448.8 835.3L447.3 836.6L446.3 836.4L444.9 834.2L444.5 831.4L442.7 829.8L442.8 828.4L440.4 827L440.7 825.4L438.4 824.6L435.2 825.6L433.5 825.4L431.8 824.2L431.1 824.9L427.3 825.8L425.3 824.1L425 821.5L423.5 819.8L421.1 818.8L415.1 818.3L413.5 816.5L411 818L406.6 814.5L402.7 813.1L401.7 813.5L398.4 812.3L396.4 811L393 813.3L393.7 814.7L393.8 816.6L392 818.7L392.4 820.6L394.6 826L393.8 827.9L389.5 827L388.1 827.4L384.2 826.7L383.4 827.7L380.6 826.9L377.8 827.9L375.5 827.3L374.8 825.6L372.6 824.6L370.3 826.4L369.9 828.6L368 829.4L366.2 827.3L365.8 825.4L363.5 825.2L362.1 824L360 823.3L359 824.5L357.4 824.7L355.6 825.9L354.2 825.2L351.2 827.3L349.7 826.7L347.3 828.5L344 827.6L343.4 825.2L341.1 824.8L337.2 817.3L335.9 818.5L331.8 816.3L329.2 813.6L326.7 812.2L326.1 813.4L324.4 813.5L323 815.7L321.3 817.1L320.1 816.3L317.8 817.4L313.3 814.6L312.3 815.9L312.4 817.2L311 817.7L310.5 819.3L309.1 818.8L309.3 816.4L307.6 816.8L306.9 813.9L303.8 811.6L301.8 808.8L300.4 809.2L298.6 808.1L297.9 806L298.6 804.9L296.8 800.6L294.3 800.9L292.8 802.1L289.1 802.2L286.7 801.1L283.5 801.9L279.8 799.5L279.4 798.4L274.2 797.2L272.1 795.2L270.8 796.3L268.5 793.9L267.5 794.2L264.3 791.9L263 793.2L261.8 793L260.5 791.3L258.8 790.6L259.5 788.2L260.7 785.7L257.9 786.3L256.2 788.4L256.6 789.5L255.7 794.6L249.8 792.8L247.7 789.4L247.7 788.3L251.5 784.8L251.5 782.6L252.3 781.6L252.4 779.8L253.6 778.5L253.8 772.4L251.7 770.4L249.9 771.1L246.1 769.5L245.4 768.5L241.3 769L241.8 770.1L240.5 772.7L238.3 772.5L236.9 769.3L237.4 767.7L234.4 766.4L232.5 766.6L230.1 768.2L228.2 763.4L226.2 762.7L226 760.5L227.9 760.3L236.3 757.1L238.8 754.6L241.5 749.6L242.5 748.5L244.1 745.1L246.3 740.9L248.5 736.2L249.7 731.9L250.1 727.3L251.9 718.2L254.3 707.4L256.8 693.4L258.3 686L260.9 667.3L262.5 652.7L262.7 648L262.2 644.8L264.3 642L266 637.4L265.9 635.7L266.8 633.6L268.8 633.4L270.3 635L274.3 635.6L275.4 635L278.7 634.8L278.2 632.1L276 629L272.6 625.6L271.9 625.4L268.5 622.4L267.6 624L268 625.3L264.8 628.8L263.6 631.7L263.1 635.5L262 636.5L262.7 628.6L264.5 614.6L265.9 601.2L266.9 589.6L268.8 570.8L269 564.9L268.9 559.7L269.6 556.7L269.1 553.8L270.6 549.8L273 546.8L273.6 544.8L275.7 545L277.1 547.3L277.2 549.7L279.5 551.6L281.6 554.5L284.4 556.5L286.8 559.4L290.9 562.9L293.2 565.9L295.7 571.6L296.8 575.7L297.5 581.5L301.5 592.4L303.5 595.3L306.6 598.7L307.8 596.1L304.7 592.9L303.6 589.6L302.5 587.7L302.4 583.5L301.1 578.6L300.1 572.2L299 567.9L298 563.8L296.5 560.2L293.4 554.9L290.3 551L284.5 546.2L282.4 545.3L280.3 543.3L280.3 541.3L279.2 539.9L276.5 539L274.4 537.2L272 536.4L269.1 534L265.6 531.5L263.7 530.6L263.3 523.1L265.6 521.8L266.8 522.4L270.8 520.8L269.2 517.1L269.4 515.2L271.3 515.7L273 514.2L274.8 510.1L274.6 507.9L275.5 506.6L273.1 502.6L275.6 502.2L276.3 500.5L275.4 496.7L273.8 496.3L273 492.4L272 491.5L271.1 489.1L268.1 487.9L267.7 486.5L265.7 487.2L264.6 485.3L266.3 482.5L266.3 480.6L268.2 479.5L270.1 477.6L270.3 476.6L272.3 475.9L271 471L268.5 470.1L266.1 470.5L266.5 472L265.8 473.1L265.7 475.3L260.6 471.1L256.4 467.9L254.8 467.3L252.5 468.1L250.6 467.4L248.1 467.9L246.6 464L245.6 462.4L243.4 461.3L242.4 461.6L238.2 460.9L231.6 457.2L228.3 454.8L226.9 453L224.4 452.8L223.8 450L221.5 441.6L219.1 439L215.7 433.5L214 433.4L212.8 430.6L206.8 424.4L202 421L201.1 413.9L203.3 413.8L204.6 410.8L207.7 407.9L209.7 402.2L213 400.2L211.3 397L209.4 395.8L208 393.8L203.9 392.2L201 391.9L199.5 391L197 390.8L196.2 390.1L196.2 388L200.3 386.7L200.9 382.4L199.3 380.1L200 379.4L200.1 376.6L198.9 375.4L194.9 377.8L193.3 379.4L191.1 379.7L188.5 377.9L186.4 375.7L184.5 375.3L181.5 377.3L180.6 376.6L176.6 375L177.4 370.6L176.1 367.7L173.5 366.1L175.2 365.3L178.7 362.4L180.9 361.1L180.4 358.9L179 359.4L177.6 358L178.3 356.3L177.5 354.8L181.6 354.1L179.9 352.6L176.3 351.1L174.6 351.5L174 352.5L170.5 352.1L170.5 350.7L167.2 349.9L167.2 350.9L165.2 354.2L162.9 353.2L158.2 354.3L157.4 355.1L153.7 353.9L153.9 352.6L152 350.4L149.4 349.5L149.6 347.8L151.5 347.6L152.9 349.7L155.8 349.1L156.7 348.4L159.7 350.2L161.6 348.6L162.9 346.2L162.9 344.6L160 342.6L160.2 340.3L157.4 342L155 342.5L153.6 342L151.1 343.5L150.7 345.7L147.8 344.2L146.8 345.9L143.1 347.2L141.7 345.5L137 347.4L135.1 346.9L134.4 350.5L135.5 354.1L137 355.5L134.6 356.3L133.1 353.4L133.1 351L134.3 348.9L133.9 345.9L132.7 343.2L130.2 341.7L129.2 339.9L129.3 337.6L130.5 335.8L132.1 336L134.7 333.5L134.9 331.7L132.6 330.3L131.4 330.6L131.6 333.8L128.6 337.3L128.8 339.4L125 336.1L123.8 333.9L120.2 333.2L119.7 331.2L117.1 333.8L114.1 333.7L112.6 334.5L109.5 331.1L107.9 328.3L107.3 325.9L108.2 323.7L106.9 322.6L106.8 320.6L107.8 319.3L106.7 320.6L106.5 322.1L107.8 324L106.7 327.9L105 327.3L101.4 327.2L98 326.1L97 326.5L93.3 323.6L91.5 325.1L88.9 325.4L87.5 324.5L85.4 324.6L82 320.4L79.7 316L76.7 313.8L76 316.2L76.8 318.9L72.4 319.7L70.4 317.9L66.7 317.8L64.1 319.3L63.3 316.7L61.8 318.2L63 320.3L64.4 321L62.8 324.1L60.5 324.8L56.9 325.1L54.9 324.1L50.5 324.6L49.4 322L51.4 321.1L51.4 318.5L50.2 314.8L48.8 311.7L46.4 308.1L44.3 306.3L40.5 304L38.4 303.2L36.7 304.5L33.2 302.8L32.1 301.6L30.8 302.3L27.6 301.7L26.4 298.3L29.3 298.5L29.8 297.5L32.9 297.7L35.7 296.4L37.5 296.9L38.9 295.8L42 295.9L43.4 294.7L46 294.7L49.7 293.6L54.3 295.7L55.8 294.1L55.9 291.9L56.7 291.3L56.6 289.3L55.1 288.5L55.3 287.1L54.6 285.3L52.6 284.1L50.2 284.2L49.6 283.1L43.7 281L41.1 281.7L39.8 285.6L37.5 287.9L37.6 284L36.8 281.6L38.1 280.7L37.3 279L35.5 279.6L33.9 278.7L36.6 276.2L35.7 273L37.5 271.1L38.1 272.5L37.6 275.4L38.8 276.5L39.9 275.3L41 276.8L44.2 275.6L46.4 275.7L47.2 277.1L49 277.3L52.2 276.3L54.3 275.2L56.7 275.3L57.4 276.9L60 275.2L56.1 273.5L52.9 273.4L53.7 271.4L50.2 270.6L49.7 272.3L45.1 272.2L45 270.1L47.8 266L46.3 265.3L45.6 266.7L44 266.4L40.7 267.5L38.6 269.3L37.8 268.8L33.7 271.1L32.4 271.2L29 269.4L27.9 269.7L27 271.7L22.6 272L22.8 268.8L23.4 267.7L22.4 266.1L22.5 264.5L21.1 263.7L22.2 260.2L23.5 258.1L22.3 254.9L23.6 253.1L23.3 252.1L25.4 249.6L27.2 248.4L28.8 248.5L32.4 247.4L33.7 247.7L35 245.9L36.9 245.5L37.2 243L39.8 241.9L41 243.2L45.8 241.8L46.8 239.9L48.1 239.8L51.4 237.8L53.7 238.2L56.7 240.4L60 240.5L61 238.4L62.5 236.8L67.8 236L71.3 236.5L71.6 235.1L73 234.2L75.2 234.3L76.4 232.9L77.5 233.5L77.1 235.1L77.3 237.9L78.7 240.1L81.8 239L82.8 241.2L85.8 242.6L85.1 240.5L85.8 239.2L85.2 236.8L87.5 235.3L89.8 235.3L91.2 234.6L93.5 234.7L95.6 236.4L98.5 236L99.6 238.2L98.5 239.5L100.1 238.3L103.8 238.4L103.6 233.8L105.6 232.7L105.9 230.7L103.6 228.5L104 226.7L107 225.3L106.6 223.3L107.8 222.6L111.6 223.3L114.1 225.9L116.3 225.5L117.4 224L119.1 223.6L121.4 221.9L125.6 222.1L126.7 220L128.5 219L129.6 222.2L132 220.4L135 219.2L137 218.9L137.8 222.9L139.8 224.1L142.5 223.4L143 225.6L140.4 226.8L142.7 228.9L146.8 229.2L148.3 230.1L147.2 233.4L148.6 234.7L150.9 235.7L151.6 238L153.2 238L155.3 240.3L156 244.3L155.8 245.9L158.5 246.8L159 248.2L162.5 249.7L162.5 251.9L164 254.6L165.6 254.1L165.2 252.1L168.7 252.6L168.6 251.4L170.4 250.1L173.5 246.6L177.9 244.4L179.4 243L179.7 240.4L181.9 240.2L183.5 241.2L187 239.8L190.2 238L191.6 239.4L190.3 242L188.6 243.4L190.4 244.2L191.2 242.9L193.7 241L197.6 247.4L199.7 247.6L200.9 246.5L200.4 244.9L203.2 244.9L202 242.2L204.1 241.4L206.7 241.4L207.9 242.6L209.6 243L209.4 244.4L210.7 246.5L211.2 248.6L213.5 251.8L215.2 251.3L214.3 250.2L212.2 245.9L211.1 244.6L209.9 241.9L209.9 240.2L212 239.4L213.7 236.8L215.9 236L218.1 236.4L219.1 235.6L222 236L222.8 237.3L221 238.7L220.4 240.6L222.2 243.7L227.1 245L234.8 244.2L240.9 242.7L242.8 242.2L244.7 243.5L247.3 243.5L249.6 242.6L253 240.3L246.7 236.8L245.2 236.3L243.6 232.4L241.7 232L240.7 230.3L241.1 225.3L240.7 223.5L238.6 221.9L239.8 221L240.5 219.1L241 215.8L242.2 214.9L242.8 212.7L241.5 211.7L241.6 205.7L239.4 203.7L238.3 198.1L238.5 195L239.3 192.9L238.4 186.5L239.7 182.9L237.8 183L236.8 184.8L235.2 182.1L234.5 179.7L231.4 173.8L230.5 173.6L227.7 170L224.8 169.2L223.7 166.3L223.5 161.2L222.3 159.4L221.7 155.6L219.7 154.7L219.5 152.6L221.3 151.5L222.5 149.5L222.2 144.8L221.2 141.8L218.8 140.3L215.3 139.4L216 137.5L215.3 136.4L215.6 134.4L217.4 134.4L219.6 136.3L221.3 135.3L222.6 135.7L223.7 137.8L227 138.8L230.9 138.9L233 139.5L234 141L236.7 140.7L237.3 142.1L244.4 141.1L246.7 139.9L247.7 137.2L248.8 137.7L251.1 136.5L254.7 136.2L259.4 137.5L261.6 137.3L261.4 138.9L263.5 141.6L264.2 145.9L262.5 145.5L261.7 147.4L259.7 148.4L258.8 151.4L259 152.7L262.6 158.5L266.7 163.3L268.4 165.7L268.8 167.3L267.7 168.6L268.7 169.7L271.7 170.8L274.5 167.6L277.8 167.5L280.6 166.7L284 166.9L288.3 169.4L291.8 170.6L298.8 171.7L303.9 171.8L307.2 172.4L310.3 171.8L312.9 171.9L317.2 172.8L319.8 172.8L323.4 174L327.4 176.5L332.7 178.1L336.5 177.7L341.5 176.5L348 173.8L353.1 169.9L355.6 167L356.9 166.1L360 165.2L363.1 163.8L368.3 163.5L371.2 162.4L371.2 161.5L366.7 161.2L365.6 161.9L362.9 161.2L361.2 161.4L356.3 160.2L354.2 158.3L354 156.4L352.8 156L353.2 153L355.3 148.4L357.3 144.9L358.6 141.9L359.3 138.2L361.1 136.2L365.1 134.6L367.4 133.3L369.9 132.8L372.3 131.4L373 130.4L377.6 128.2L383.7 124.6L387.1 122.1L391.8 120.7L396.2 119.9L397 120.1L402 119.5L404.8 118.2L407.7 117.7L411.5 116.5L413.7 115.2L417.6 115.6L423.5 113.5L430.3 109.9L433.1 107.8L438.9 102.6L442.3 100.8L447.2 96.4L449.2 90.3L451.2 87.4L453.7 86.1L456.9 89L459 88.6L462.2 90.1L462.9 89.3L461.4 86.2L458.7 86.1L456.7 83.2L456.6 82L453.7 81.6L452.9 79.4L453.8 72.8L455.2 72L458.1 71.8L460 72.6L458.9 70.6L455.8 69.9L454.1 68.1L455.1 63.5L455.6 56.4L456.2 54.3L458.5 54.5L455.9 51.8L455.6 50.9L455.5 43.8L454.5 38.3L456.8 34.8L457.5 32.1L457.5 29.1L455.7 23.2L456 21.4L460 20.7L461.8 19.3L463.5 17.1L466 14.8L469.5 13.2L473 12.4L475.7 11.2L476.9 11.4L478.7 10.3L487.5 8.9L489.1 8.1L492 8.2L493.9 6.7L497.4 6.9L497.5 5.3L499.4 5.5L502.1 4.4L507.8 3.1L511.4 3.8L513.4 3.2L521.7 0L522.8 2.3L523.7 7.4L523.6 8.4L525.9 10L527.6 14L524.7 16.7L525.9 17.3L526.1 22.3L527.8 27.2L533.4 27.1L534.7 30.1L537.8 33.3L538.1 35L539.9 36.6L542.3 36L543.8 38L545.7 38.9L547.3 38L548.4 34.1L550.6 33.4L554.1 31.2L556.8 30.4L558.7 31.1L560.2 29L563 30.2L566.2 34.9L567.1 37L569.3 37L570.3 38.2L570.5 40.4L569.1 42.4L570 45.9L571.1 47.1L571.9 50.4L571.5 52.2L572.2 55.3L577.4 57.7L578.3 58.9L582.1 57.3L585 54.7L588.1 55.8L586.5 58.1L588.3 58.5L591.4 57.9L592.6 58.9L594 58.3L596.5 61.6L597.9 62.6L598.6 68.9L597.5 70.7L598.6 74.3L601.1 77.4L602.5 76.5L602.9 73.5L603.6 72.7L610.8 72.6L613.3 74.8L614.6 74.9L618.7 72.8L620.4 72.9L622.7 72.1L623.4 73.5L629.2 77.9L629.3 80.3L635 80.4L636 82L633.8 83.9L631.8 87.3L631 90.1L631.3 91.4L629.5 94L634.3 94L634.3 96.5L636.4 99.4L635.7 101.3L632.7 102.8L631.9 102.5L630.1 105.3L631.6 108.5L630.5 109.4L632.6 109.6L634.3 110.5L634.2 111.7L636.7 111.5L641.9 110.3L644.7 112L646.7 111.9L651.3 113.5L653.7 112.4L655.7 112.6L657.7 110.5L660 109.2L666.9 107.6L668.5 102L667.4 100.5L668.7 97.9L672.1 96.3L672.8 93.8L677.1 91.5L677.6 92.1L680.8 92.3L681.9 94L680.2 95L680.1 97.7L678.9 97.3L677.4 102.6L678.2 103.6L676.6 105.8L676.7 107.8L674.7 110.3L674.8 111.4L678.8 112.6L679.4 113.9L681.5 116.2L678.9 121L680 123.1L680 125.6L679.2 127.8L684.3 128.3L686 126.9L689 127.1L689.6 128.8L693.3 130.8L695.2 130.5L696.9 132.8L697.6 135.4L700.3 136.2L700.4 137.6L703.3 137.4L705.7 138.3L707.3 137.2L711.7 141.3L710.1 143.2L710.3 145.4L712.4 144.1L715.9 145L718.4 147.4L719.2 151.6L720.8 152.8L719.6 154.9L721.2 156.9L725.9 155.1L727 153.7L729.5 154.4L731 153.9L732.5 152.1L734.3 151.4L736.9 152.7L739 152.2L741.9 150.4L743.2 151.5L746.1 152.4L746.1 154.6L748.3 156.7L750 156.9L753.1 156.5L755.3 157.4L756 161.4L759.1 161L761 160L762.5 160.2L765.7 159.2L767.8 156.2L774.7 155.6L776.3 156.3L777.5 158.5L778.5 158.5L782.1 160.6L785 159.8L785.8 159.1L789.3 160.3L795 164.6L794.1 166.3L795.6 167.6L797.3 167.9L796 171.9L797.9 173.3L797.4 174.1L799.4 176.1L800.8 176.7L802.3 180.1L803.9 182L804.6 184.6L806.3 184.1L807.1 185.6L805.7 187.3L807.6 189.7L810.7 189.3L814.1 190.9L816 188.3L815.3 186.1L814.2 185L815.7 184L817.6 185.1L821 184L822.7 185.9L823.7 185.2L825.4 186.7L827.8 187.2L827.3 189.1L828.6 192.2L829.1 194.8L832.4 192L836.1 193.9L838 193L839.5 193.7L842.2 193.1L844.7 194.3L845.8 194.3L847.9 191.6L850.2 191.6L850.4 188.9L855.8 187.7L856.5 189.5L859.1 189.2L859 191.9L860.6 193.9L861.5 196.3L864.2 198L866.4 197.7L868.5 199L868.8 200.5L871.4 201.4L873.7 200.5L875.4 201.5L877.9 201.2L879.6 199.4L884.7 202.5L886.2 201.2L888 201.8L889.2 200.2L891.1 201.6L892.3 203.3L893.4 203.1L897 204.5L899.9 206.9L903.2 208L908.8 208.2L909.5 209.1L907 210.2L903.1 216.4L902.1 218.6L900.2 224.6L897.7 226.7L895.6 226.9L895.2 228.7L894 229.7L891.6 230L891.1 233.3L886.2 239.1L882.7 241.2L881.9 243.6L880.3 246.1L880 247.4L880.5 253.1L879.6 255L877.8 256.2L877.6 259.4L875.6 264.6L875.4 267.4L876.2 271.4L875.4 273.1L873.4 274L871 282.4L869.5 283.9L868.3 286.5L866.4 288.8L866.2 291.3L864.8 292.6L865 294L864.3 296.4L864.4 301.5L866.7 304.1L867.9 307.2L865.2 311.2L865.2 314.2L863.4 316.3L863.9 319L861.7 325.5L861.7 327.3L862.8 330.1L862.5 331.9L860.5 333.8L861.1 337.7L864.1 340.6L865.8 344.3L865.3 346.1L859.9 349.4L861.3 351.8L860 352.2L860 354.2L858.6 355.5L855.1 354L854.3 355.3L856.1 356.2L854.1 359.1L851.4 360.5L848.5 359.6L844.6 360.2L842.2 361.4L841.3 359.8L839.5 360.2L837.1 359.2L838.2 354.6L836.3 354.7L834.3 353.4ZM690 742.6L690.1 745.1L688.9 748.3L689.4 751L691.6 751L692.6 751.7L693.8 757.9L696.6 757.5L698.4 757.9L700 756.8L702.1 754.5L704.5 752.7L704.2 749.7L702.9 748.9L698.9 752.2L696 745.5L693.4 745.3L692.2 745.9L691.3 743.6L690 742.6ZM198.1 407.9L196.4 406.5L193.6 406.9L191.1 404.1L191.7 401.8L192.8 400.2L194.6 400.3L196.7 402.2L196.2 405.4L200.9 408L201.6 409.5L201.5 411.6L200.2 412.1L199.7 410L198.1 407.9ZM130.2 367L132.8 367.4L133.9 370.5L137.1 372L139.5 372.3L138.3 374.7L137 375.1L132.5 374.2L132 373.3L130.1 374.1L128.4 374L126.5 371.9L127.1 371.2L125.7 368.3L125.7 366.4L128.5 365.6L130.2 367ZM247.1 480.9L249 479.1L250.9 478.9L250.6 481.3L252.3 481.6L255 481.2L257.9 483.2L260 483.3L261.2 485.8L261 487.1L259.1 487.5L255.6 486.2L253.2 484.2L248.4 481.7L245.4 482.5L243.5 481.7L241.6 478.2L244.9 476.2L246.5 476.6L247.5 478.6L244.9 479.7L247.1 480.9ZM262.8 516.8L261.7 513.6L259.8 511.5L255.9 509L253.3 505.8L252.9 503.9L253.5 501.9L251.7 497L254.5 497.7L254.5 498.4L258.9 502.5L262.9 502.6L263.8 503.4L263.3 505.8L264.2 507.1L263.9 508.8L264.6 510.2L267 512.8L265.7 516.4L266.5 518.4L264 521.2L263.1 519.2L262.8 516.8ZM989.3 909.9L989.5 913.5L988.7 915.8L989.7 919L989.1 926.2L987.2 927.6L988.2 929.4L987.1 931.8L986 931.4L984.8 933.2L981.5 934.5L982 937L983.5 934.9L985.2 935.9L986.7 935.7L985.1 939.4L982.5 940.7L981.2 943.2L980.6 945.6L981.3 947.1L979.3 949.6L977.1 950.9L977.3 953.4L978.9 954.3L976.7 958.2L974.1 958.3L973.2 956.5L972 956.5L970.2 955.3L968.1 955.2L968.9 952.6L968.5 950.8L966.9 950.9L964.5 948.3L963.4 948.8L961.3 946.7L959.1 946L956.5 945.9L956 944.5L954 944.7L953.5 942.9L951.8 941.9L950.9 940.7L949.6 940.7L948.2 938.1L946.5 936.2L947.5 934.8L947.7 932.5L949.7 932.4L951.6 930.8L952.9 930.8L953.7 928.7L956.1 927.3L956 926.5L951 925.8L949.1 924.1L946.4 924.3L947.1 922L946.3 921.4L942.8 923.1L940.4 920.8L942.3 919.5L943.4 917.9L942 915.7L944.1 915.6L946.2 914.6L947.1 912.7L947.5 909.1L946.8 907.4L948.4 906.7L946.8 903.4L944.1 903.7L942.6 905L939.4 905.3L937.4 904.8L935.5 905.7L935.9 903.2L934.4 900.5L935.6 898.8L937.7 899.1L939 898.1L938.4 895L940.7 893.2L941.5 893.3L944.2 891.9L944 889.8L942.7 889.7L942.1 886.5L940.2 885.3L938.5 885.5L937.8 884L936.2 883.8L933 880.5L933.9 879.8L933.1 877.4L933.3 875.6L931.9 872.6L935.6 870.9L940.6 870L940.7 868.5L938.6 866.1L937.1 866.2L936.2 865.2L936.5 862.5L935.6 861.5L933.9 861.2L932 863.1L931.3 861.7L932.7 858.3L935.2 857.8L935.1 854.8L936.1 854.4L938.3 855L939.7 849L939 847.3L939 845.3L941.2 844.1L942.1 844.3L942.8 841.2L945.2 839.7L945.5 840.9L947.3 840.9L948.5 839.8L948.8 836.9L953.3 835.5L953.7 833.9L955.2 834.1L956.2 833.2L957.9 833.4L962.5 832.8L966 830.4L965.5 828.9L967.7 825.5L970.3 823.8L973.3 823.3L975.3 824.5L976.9 823.4L981.8 829.5L983.8 827.1L983.8 825.3L985.4 823.3L984.8 820.5L985 817L983.1 814.1L984.5 810.1L983.8 807.3L985.5 805.9L986.3 802.8L985.1 797.9L986.3 796.7L990 796.7L993.4 798.7L992.6 800.9L993.6 803.2L993.8 806.7L994.7 810.7L995.3 817.6L994 820L992.3 829.5L994.2 834.3L996.9 838.3L997.8 840.1L998.3 844.4L997.9 847.7L998.7 851L998.9 853.7L998.1 858.1L998.5 862.1L1000 868.2L999.5 872.7L999.9 876.6L999.8 881.9L999.3 885.7L998 887.4L993.7 894.7L991.9 896.9L990 900.3L990.2 903L988.9 908.3L989.3 909.9Z"

const groupByCategorie = (items: Typologie[]) => {
  const map = new Map<string, Typologie[]>()
  for (const t of items) {
    if (!map.has(t.categorie)) map.set(t.categorie, [])
    map.get(t.categorie)!.push(t)
  }
  return [...map.entries()].sort((a, b) => {
    const la = CATEGORIES_MAP[a[0]]?.label ?? a[0]
    const lb = CATEGORIES_MAP[b[0]]?.label ?? b[0]
    return la.localeCompare(lb, 'fr')
  })
}

export default function CarteTypologies() {
  const navigate = useNavigate()
  const [maximized, setMaximized] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(REGION_GROUPS[0][0])
  const selectedItems = REGION_GROUPS.find(([region]) => region === selectedRegion)?.[1] ?? []

  const handlePin = (id: string) => {
    navigate(`/typologie/${id}`)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (!maximized) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMaximized(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [maximized])

  return (
    <div className={`${styles.grid} ${maximized ? styles.gridMaximized : ''}`}>
      {/* Carte SVG */}
      <div className={`${styles.mapCard} ${maximized ? styles.mapCardMaximized : ''}`}>
        <button
          className={styles.maximizeBtn}
          onClick={() => setMaximized((v) => !v)}
          aria-label={maximized ? 'Réduire la carte' : 'Maximiser la carte'}
        >
          {maximized ? <ArrowsIn size={14} weight="bold" /> : <ArrowsOut size={14} weight="bold" />}
          {maximized ? 'Réduire la carte' : 'Maximiser la carte'}
        </button>
        <svg
          viewBox="0 0 1000 958"
          style={maximized ? { width: '100%', height: '100%', display: 'block' } : { width: '100%', height: 'auto', display: 'block' }}
        >
          <path
            d={FRANCE_PATH}
            fill="color-mix(in srgb, var(--color-accent) 7%, var(--color-neutral-900))"
            stroke="var(--color-neutral-600)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {PINS.map((pin) => (
            <g
              key={pin.id}
              className={styles.pin}
              onClick={() => handlePin(pin.id)}
              style={{ cursor: 'pointer' }}
              role="button"
              aria-label={pin.label}
            >
              {pin.pulse && (
                <circle
                  cx={pin.cx}
                  cy={pin.cy}
                  r={26}
                  fill="var(--color-accent)"
                  opacity={0.18}
                  style={{ transformOrigin: `${pin.cx}px ${pin.cy}px`, animation: 'bpulse 2.8s ease-out infinite' }}
                />
              )}
              <circle
                cx={pin.cx}
                cy={pin.cy}
                r={pin.id === 'haussmann' ? 12 : 11}
                fill="var(--color-accent)"
                stroke="var(--color-bg)"
                strokeWidth={4}
              />
              <text
                x={pin.tx}
                y={pin.ty}
                fontSize={pin.id === 'haussmann' ? 24 : 23}
                fontFamily="var(--font-heading)"
                fontWeight={600}
                fill={pin.id === 'haussmann' ? 'var(--color-neutral-100)' : 'var(--color-neutral-200)'}
                textAnchor={pin.anchor}
              >
                {pin.label}
              </text>
            </g>
          ))}
          {MICRO_PINS.map((pin) => (
            <circle
              key={pin.id}
              cx={pin.cx}
              cy={pin.cy}
              r={6}
              fill="var(--color-accent)"
              stroke="var(--color-bg)"
              strokeWidth={2}
              opacity={0.75}
              style={{ cursor: 'pointer' }}
              onClick={() => handlePin(pin.id)}
              role="button"
              aria-label={pin.label}
            >
              <title>{pin.label}</title>
            </circle>
          ))}
        </svg>
        <div className={styles.mapLegend}>Tracé IGN · France métropolitaine</div>
      </div>

      {/* Sélecteur de région + typologies de la région choisie */}
      <div className={styles.regionSection}>
        <div className={styles.regionPickerRow}>
          <label htmlFor="region-picker" className={styles.regionPickerLabel}>Région</label>
          <div className={styles.comboWrap}>
            <select
              id="region-picker"
              className={styles.comboSelect}
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {REGION_GROUPS.map(([region, items]) => (
                <option key={region} value={region}>{region} · {items.length}</option>
              ))}
            </select>
            <CaretDown size={13} className={styles.comboCaret} />
          </div>
        </div>

        {selectedItems.length > COMBO_THRESHOLD ? (
          <div className={styles.comboWrap}>
            <select
              key={selectedRegion}
              className={styles.comboSelect}
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) handlePin(e.target.value)
              }}
              aria-label={`Choisir une typologie parmi « ${selectedRegion} »`}
            >
              <option value="" disabled>
                Choisir parmi les {selectedItems.length} typologies…
              </option>
              {groupByCategorie(selectedItems).map(([cat, catItems]) => (
                <optgroup key={cat} label={CATEGORIES_MAP[cat]?.label ?? cat}>
                  {catItems.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <CaretDown size={13} className={styles.comboCaret} />
          </div>
        ) : (
          <div className={styles.legendGroup}>
            {selectedItems.map((t) => (
              <button
                key={t.id}
                className={styles.legendItem}
                onClick={() => handlePin(t.id)}
              >
                <div className={styles.legendDot} />
                <div className={styles.legendInfo}>
                  <div className={styles.legendName}>{t.name}</div>
                  <div className={styles.legendSub}>{t.region.split(' · ')[0]} · {t.periode}</div>
                </div>
                <ArrowRight size={15} color="var(--color-neutral-500)" weight="regular" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

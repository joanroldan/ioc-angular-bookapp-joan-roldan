// Fitxer: src/app/data/items.mock.ts
import { Book } from '../models/item.model';

export const BOOKS_MOCK: Book[] = [
  {
    id: 1,
    titol: 'Els pilars de la Terra',
    autor: 'Ken Follett',
    descripcio: 'Una epopeia magistral sobre la construcció d’una catedral gòtica a l’Anglaterra del segle XII plena d’intrigues i passions.',
    categoria: 'Novel·la Històrica',
    dataPublicacio: '1989-09-01',
    pagines: 1040,
    destacat: true
  },
  {
    id: 2,
    titol: 'Un món sense fi',
    autor: 'Ken Follett',
    descripcio: 'Dos segles després de la construcció de la catedral de Kingsbridge, quatre joves s’enfronten a la pesta negra i la guerra.',
    categoria: 'Novel·la Històrica',
    dataPublicacio: '2007-10-04',
    pagines: 1184,
    destacat: false
  },
  {
    id: 3,
    titol: 'El nom del vent',
    autor: 'Patrick Rothfuss',
    descripcio: 'La història de Kvothe, un jove músic i mag llegendari que relata la seva pròpia vida des de la infància fins a la Universitat.',
    categoria: 'Ciència-ficció i Fantasia',
    dataPublicacio: '2007-03-27',
    pagines: 880,
    destacat: true
  },
  {
    id: 4,
    titol: 'Dune',
    autor: 'Frank Herbert',
    descripcio: 'Al planeta desèrtic d’Arrakis, la família Atreides es veu immersa en una lluita pel control de l’espècia més valuosa de l’univers.',
    categoria: 'Ciència-ficció i Fantasia',
    dataPublicacio: '1965-08-01',
    pagines: 704,
    destacat: true
  },
  {
    id: 5,
    titol: 'Clean Code: Manual d’estil per al desenvolupament àgil',
    autor: 'Robert C. Martin',
    descripcio: 'Principis, patrons i bones pràctiques fonamentals per escriure codi net, llegible i fàcil de mantenir en qualsevol projecte.',
    categoria: 'Tecnologia',
    dataPublicacio: '2008-08-11',
    pagines: 464,
    destacat: true
  },
  {
    id: 6,
    titol: 'L’ombra del vent',
    autor: 'Carlos Ruiz Zafón',
    descripcio: 'A la Barcelona de postguerra, el jove Daniel Sempere descobreix un llibre maleït al Cementiri dels Llibres Oblidats.',
    categoria: 'Thiller i Misteri',
    dataPublicacio: '2001-05-01',
    pagines: 576,
    destacat: true
  },
  {
    id: 7,
    titol: 'Refactoring: Millorar el disseny del codi existent',
    autor: 'Martin Fowler',
    descripcio: 'Guia essencial per transformar codi complex en estructures netes i modulars sense alterar-ne el comportament extern.',
    categoria: 'Tecnologia',
    dataPublicacio: '2018-11-20',
    pagines: 448,
    destacat: false
  },
  {
    id: 8,
    titol: 'La catedral del mar',
    autor: 'Ildefonso Falcones',
    descripcio: 'La vida d’Arnau Estanyol a la Barcelona del segle XIV, marcada per l’aixecament del temple de Santa Maria del Mar.',
    categoria: 'Novel·la Històrica',
    dataPublicacio: '2006-03-03',
    pagines: 672,
    destacat: false
  },
  {
    id: 9,
    titol: 'Els homes que no estimaven les dones',
    autor: 'Stieg Larsson',
    descripcio: 'El periodista Mikael Blomkvist i la investigadora Lisbeth Salander uneixen forces per resoldre una misteriosa desaparició familiar.',
    categoria: 'Thiller i Misteri',
    dataPublicacio: '2005-08-01',
    pagines: 664,
    destacat: false
  },
  {
    id: 10,
    titol: 'Fundació',
    autor: 'Isaac Asimov',
    descripcio: 'El matemàtic Hari Seldon desenvolupa la psicohistòria per predir la caiguda de l’Imperi Galàctic i preservar el coneixement humà.',
    categoria: 'Ciència-ficció i Fantasia',
    dataPublicacio: '1951-05-01',
    pagines: 320,
    destacat: false
  }
];

export const CATEGORIES_LLIBRES: string[] = [
  'Novel·la Històrica',
  'Ciència-ficció i Fantasia',
  'Tecnologia',
  'Thiller i Misteri'
];
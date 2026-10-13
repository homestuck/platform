import { color } from '@homestuck/tokens/color.tokens.json'
import { gradient } from '@homestuck/tokens/gradient.tokens.json'

type ColorGroup = Record<string, ColorGroupNode<ColorItem>>
type ColorGroupNode<T> = T[] | { [key: string]: ColorGroupNode<T> }
type ColorItem = [string, string, ColorSwatch[]]
type ColorSwatch = [string, string]

type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? K extends `$${string}`
          ? never
          : T[K] extends object
            ? `${K}.${NestedKeys<T[K]>}` | `${K}`
            : `${K}`
        : never
    }[keyof T]
  : never

function extractToken(key: string) {
  // @ts-expect-error --- Using property accessor on object
  const initialToken = key
    .split('.')
    // @ts-expect-error --- Using property accessor on object
    .reduce((acc, part) => acc[part] as object, color) as object

  return '$root' in initialToken ? (initialToken.$root as object) : initialToken
}

function generateColorItem(colors: NestedKeys<typeof color>[], label?: string) {
  return [
    // @ts-expect-error --- Using property accessor on object
    label ?? extractToken(colors[0]).$description, //Title
    colors
      .map(
        (key) =>
          `--color-${key.replaceAll('.$root', '').replaceAll('.', '-')}: ${
            // @ts-expect-error --- Using property accessor on object
            (extractToken(key).$value as object).hex as string
          };`,
      )
      .join('\n'), // Subtitle
    colors.map(
      (key) =>
        [
          key.replaceAll('.$root', ''),
          // @ts-expect-error --- Using property accessor on object
          (extractToken(key).$value as object).hex as string,
        ] as ColorSwatch,
    ), // Colors
  ] as ColorItem
}

export const COLORS = {
  ASPECTS: [
    generateColorItem(['space', 'space.icon']),
    generateColorItem(['time', 'time.icon']),
    generateColorItem(['mind', 'mind.icon']),
    generateColorItem(['heart', 'heart.icon']),
    generateColorItem(['hope', 'hope.icon']),
    generateColorItem(['rage', 'rage.icon']),
    generateColorItem(['breath', 'breath.icon']),
    generateColorItem(['blood', 'blood.icon']),
    generateColorItem(['life', 'life.icon']),
    generateColorItem(['doom', 'doom.icon']),
    generateColorItem(['light', 'light.icon']),
    generateColorItem(['void', 'void.icon']),
  ],
  FELT: [
    generateColorItem([
      'lord-english',
      'lord-english.dark-red',
      'lord-english.red',
      'lord-english.orange',
      'lord-english.yellow',
      'lord-english.green',
      'lord-english.blue',
      'lord-english.purple',
    ]),
    generateColorItem(['doc-scratch']),
    generateColorItem(['snowman']),
    generateColorItem(
      [
        'itchy',
        'doze',
        'trace',
        'clover',
        'fin',
        'die',
        'crowbar',
        'stitch',
        'sawbuck',
        'matchsticks',
        'eggs',
        'biscuits',
        'quarters',
        'cans',
      ],
      'The Felt (Leprechauns)',
    ),
  ],
  HUMANS: [
    generateColorItem(['fedorafreak']),
    generateColorItem(['obama']),
    generateColorItem(['silas']),
    generateColorItem(['imode', 'ideogramic-dramaturgy']),
    generateColorItem(['avril', 'steezy-headbanger']),
  ],
  NYMPHS: [],
  PALETTES: {
    STANDARD: [],
    TAILWIND: [],
  },
  PLAYERS: {
    ALTERNIA: [
      generateColorItem(['aradia', 'aradia.blue', 'apocalypse-arisen', 'apocalypse-arisen.blue']),
      generateColorItem(['tavros', 'adios-toreador']),
      generateColorItem(['sollux', 'twin-armageddons']),
      generateColorItem([
        'karkat',
        'karkat.red',
        'karkat.epilogues',
        'carcino-geneticist',
        'carcino-geneticist.red',
        'carcino-geneticist.epilogues',
      ]),
      generateColorItem(['nepeta', 'arsenic-catnip']),
      generateColorItem(['kanaya', 'grim-auxiliatrix']),
      generateColorItem(['terezi', 'gallows-calibrator']),
      generateColorItem(['vriska', 'arachnids-grip']),
      generateColorItem(['equius', 'centaurs-testicle']),
      generateColorItem(['gamzee', 'terminally-capricious']),
      generateColorItem([
        'eridan',
        'eridan.epilogues',
        'caligulas-aquarium',
        'caligulas-aquarium.epilogues',
      ]),
      generateColorItem(['feferi', 'cuttlefish-culler']),
    ],
    BEFORUS: [
      generateColorItem(['damara']),
      generateColorItem(['rufioh']),
      generateColorItem(['mituna']),
      generateColorItem(['kankri']),
      generateColorItem(['meulin']),
      generateColorItem(['porrim']),
      generateColorItem(['latula']),
      generateColorItem(['aranea']),
      generateColorItem(['horuss']),
      generateColorItem(['kurloz']),
      generateColorItem(['cronus']),
      generateColorItem(['meenah']),
    ],
    DELTRITUS: [
      generateColorItem(['harry', 'thespians-glamor']),
      generateColorItem(['vrissy', 'adamant-griftress']),
      generateColorItem(['tavvy', 'glutinous-gymnast']),
      generateColorItem(['yiffy']),
      generateColorItem(['lylac', 'gavage-cunctation']),
      generateColorItem(['delfi', 'cloistered-connoisewer']),
      generateColorItem(['augury-aside']),
      generateColorItem(['swiss', 'agamemnons-theory']),
      generateColorItem(['champions-tirade']),
      generateColorItem(['tinnitus-chakra']),
    ],
    EARTH: [
      generateColorItem(['john', 'ghosty-trickster', 'ecto-biologist']),
      generateColorItem(['rose', 'tentacle-therapist']),
      generateColorItem(['dave', 'turntech-godhead']),
      generateColorItem(['jade', 'garden-gnostic']),
      generateColorItem(['jane', 'jane.epilogues', 'gutsy-gumshoe', 'gutsy-gumshoe.epilogues']),
      generateColorItem(['jake', 'golgothas-terror']),
      generateColorItem(['dirk', 'dirk.red', 'timaeus-testified', 'timaeus-testified.red']),
      generateColorItem(['roxy', 'tipsy-gnostalgic']),
    ],
    'EARTH C': [
      generateColorItem([
        'caliborn',
        'caliborn.green',
        'caliborn.green-epilogues',
        'undying-umbrage',
        'undying-umbrage.green',
        'undying-umbrage.green-epilogues',
      ]),
      generateColorItem([
        'calliope',
        'calliope.epilogues',
        'calliope.red',
        'uranian-umbra',
        'uranian-umbra.epilogues',
        'uranian-umbra.red',
      ]),
    ],
  },
  SATYRS: [],
  SPRITES: [
    generateColorItem(['harlequinsprite', 'nannasprite'], 'Harlequinsprite / Nannasprite'),
    generateColorItem(['jaspersprite']),
    generateColorItem(
      ['crowsprite', 'calsprite', 'davesprite'],
      'Crowsprite / Calsprite / Davesprite',
    ),
    generateColorItem(['becsprite', 'jadesprite'], 'Becsprite / Jadesprite'),
    generateColorItem(
      ['tavrisprite', 'tavrosprite', 'gcatavrosprite'],
      'Tavrisprite / Tavrosprite / GCatavrosprite',
    ),
    generateColorItem(['fefetasprite', 'rosesprite'], 'Fefetasprite / Rosesprite'),
    generateColorItem(['equiusprite', 'arquiusprite'], 'Equiusprite / ARquiusprite'),
    generateColorItem(['erisolsprite', 'nepetasprite'], 'Erisolsprite / Nepetasprite'),
  ],
  'SPRITES^2': [
    generateColorItem(['jasprosesprite', 'jasprosesprite.prefix']),
    generateColorItem(['davepetasprite', 'davepetasprite.prefix']),
  ],
  TROLLS: [
    generateColorItem(['troll', 'troll.1', 'troll.2', 'troll.3']),
    generateColorItem(
      [
        'troll.red',
        'troll.rust',
        'troll.bronze',
        'troll.gold',
        'troll.lime',
        'troll.olive',
        'troll.jade',
        'troll.teal',
        'troll.blue',
        'troll.indigo',
        'troll.purple',
        'troll.violet',
        'troll.fuchsia',
      ],
      gradient.troll.hemospectrum.$description,
    ),
    generateColorItem(['ruthie', 'recidivous-gainsayer']),
    generateColorItem(['alfonz']),
    generateColorItem(['cliper']),
    generateColorItem(['swifer']),
    generateColorItem(['mierfa', 'abundant-cacoethes']),
    generateColorItem(['motter']),
    generateColorItem(['nektan', 'debonair-corsair']),
  ],
} as const satisfies ColorGroup

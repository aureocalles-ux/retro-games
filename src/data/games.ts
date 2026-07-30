export interface Game {
  id: string;
  title: string;
  console: 'SNES' | 'NES' | 'GENESIS' | 'GBA';
  core: string;
  romUrl: string;
  coverImage: string;
  genre: string;
  year: number;
  description: string;
}

export const games: Game[] = [
  // ── SNES ──────────────────────────────────────────────────────────────
  {
    id: 'super-mario-world',
    title: 'Super Mario All-Stars',
    console: 'SNES',
    core: 'snes',
    romUrl: '/api/rom-proxy?url=https%3A%2F%2Fwww.dropbox.com%2Fscl%2Ffi%2F8tygz3ftx1u5crej6s8xd%2FSuper-Mario-All-Stars-USA.zip%3Frlkey%3D3d31h4e9c5l0lnufff0lgilao%26st%3Dbl0v58r6%26dl%3D1',
    coverImage: '/airo-assets/images/games/super-mario-world',
    genre: 'Platformer',
    year: 1993,
    description: 'Four classic Mario games remastered in one collection — Super Mario Bros 1, 2, 3, and The Lost Levels, all with updated 16-bit graphics.',
  },
  {
    id: 'donkey-kong-country',
    title: 'Donkey Kong Country',
    console: 'SNES',
    core: 'snes',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/donkey-kong-country',
    genre: 'Platformer',
    year: 1994,
    description: 'Donkey Kong and Diddy Kong battle the Kremlings to reclaim their stolen banana hoard.',
  },
  {
    id: 'super-metroid',
    title: 'Super Metroid',
    console: 'SNES',
    core: 'snes',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/super-metroid',
    genre: 'Action-Adventure',
    year: 1994,
    description: 'Samus Aran hunts the Space Pirates across the dark planet Zebes in this sci-fi classic.',
  },
  {
    id: 'chrono-trigger',
    title: 'Chrono Trigger',
    console: 'SNES',
    core: 'snes',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/chrono-trigger',
    genre: 'RPG',
    year: 1995,
    description: 'A group of adventurers travel through time to prevent a global catastrophe.',
  },

  // ── NES ───────────────────────────────────────────────────────────────
  {
    id: 'super-mario-bros',
    title: 'Super Mario Bros',
    console: 'NES',
    core: 'nes',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/super-mario-bros',
    genre: 'Platformer',
    year: 1985,
    description: 'The original platformer that defined a generation — rescue Princess Peach from Bowser.',
  },
  {
    id: 'mega-man-2',
    title: 'Mega Man 2',
    console: 'NES',
    core: 'nes',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/mega-man-2',
    genre: 'Action',
    year: 1988,
    description: 'The Blue Bomber faces eight new Robot Masters in this legendary action platformer.',
  },
  {
    id: 'legend-of-zelda',
    title: 'The Legend of Zelda',
    console: 'NES',
    core: 'nes',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/legend-of-zelda',
    genre: 'Action-Adventure',
    year: 1986,
    description: 'Link ventures into Hyrule to collect the Triforce pieces and rescue Princess Zelda.',
  },
  {
    id: 'contra',
    title: 'Contra',
    console: 'NES',
    core: 'nes',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/contra',
    genre: 'Run and Gun',
    year: 1988,
    description: 'Two commandos battle alien forces through jungles and fortresses in this co-op classic.',
  },

  // ── GENESIS ───────────────────────────────────────────────────────────
  {
    id: 'sonic-the-hedgehog',
    title: 'Sonic the Hedgehog',
    console: 'GENESIS',
    core: 'segaMD',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/sonic-the-hedgehog',
    genre: 'Platformer',
    year: 1991,
    description: "Sega's iconic speedster races through Green Hill Zone to stop Dr. Robotnik.",
  },
  {
    id: 'streets-of-rage',
    title: 'Streets of Rage',
    console: 'GENESIS',
    core: 'segaMD',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/streets-of-rage',
    genre: 'Beat em up',
    year: 1991,
    description: 'Three ex-cops take to the streets to clean up a city overrun by a criminal syndicate.',
  },
  {
    id: 'mortal-kombat',
    title: 'Mortal Kombat',
    console: 'GENESIS',
    core: 'segaMD',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/mortal-kombat',
    genre: 'Fighting',
    year: 1993,
    description: 'Warriors from across the realms clash in brutal tournament combat. Finish him.',
  },
  {
    id: 'golden-axe',
    title: 'Golden Axe',
    console: 'GENESIS',
    core: 'segaMD',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/golden-axe',
    genre: 'Beat em up',
    year: 1989,
    description: 'Three warriors quest to defeat Death Adder and reclaim the legendary Golden Axe.',
  },

  // ── GBA ───────────────────────────────────────────────────────────────
  {
    id: 'pokemon-emerald',
    title: 'Pokemon Emerald',
    console: 'GBA',
    core: 'gba',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/pokemon-emerald',
    genre: 'RPG',
    year: 2004,
    description: 'Catch, train, and battle Pokemon across the Hoenn region in this definitive GBA entry.',
  },
  {
    id: 'fire-emblem',
    title: 'Fire Emblem',
    console: 'GBA',
    core: 'gba',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/fire-emblem',
    genre: 'Strategy RPG',
    year: 2003,
    description: "The series' Western debut — lead Lyn, Eliwood, and Hector through a tactical fantasy war.",
  },
  {
    id: 'metroid-fusion',
    title: 'Metroid Fusion',
    console: 'GBA',
    core: 'gba',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/metroid-fusion',
    genre: 'Action-Adventure',
    year: 2002,
    description: 'Samus battles a parasitic organism aboard a research station in this tense GBA thriller.',
  },
  {
    id: 'castlevania',
    title: 'Castlevania',
    console: 'GBA',
    core: 'gba',
    romUrl: 'PLACEHOLDER_ROM_URL',
    coverImage: '/airo-assets/images/games/castlevania',
    genre: 'Action-Adventure',
    year: 2001,
    description: 'Nathan Graves wields the Hunter Whip to battle Dracula through a gothic castle.',
  },
];

export const consoleColors: Record<string, string> = {
  SNES: '#00ffff',
  NES: '#ff00ff',
  GENESIS: '#00ff41',
  GBA: '#ffaa00',
};

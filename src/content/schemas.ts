import { z } from 'zod';
export const schemas = {
  home: z.object({
    "heroTitle": z.string(),
    "heroSubtitle": z.string(),
    "libraryTitle": z.string(),
    "stats": z.array(z.object({
      "id": z.string(),
      "label": z.string(),
      "color": z.string()
    }))
  }),
  game_player: z.object({
    "backLabel": z.string(),
    "gameInfoTitle": z.string(),
    "controlsTitle": z.string(),
    "notFoundMessage": z.string(),
    "controls": z.array(z.object({
      "id": z.string(),
      "key": z.string(),
      "action": z.string()
    }))
  })
};
export type Schemas = typeof schemas;
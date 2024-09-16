import { array, boolean, number, object, string } from 'yup';

const schema = object().shape({
  abilities: array(),
  base_experience: number().positive().integer(),
  forms: array(),
  game_indices: array(),
  height: number().positive().integer(),
  held_items: array(),
  id: number().positive().integer(),
  is_default: boolean(),
  location_area_encounters: string(),
  moves: array(),
  name: string().required(),
  order: number().positive().integer(),
  past_abilities: array(),
  past_types: array(),
  species: object().shape({
    url: string().url(),
    name: string()
  }),
  sprites: object().shape({
    back_default: string().url(),
    back_female: string().url().nullable().notRequired(),
    back_shiny_female: string().url().nullable().notRequired(),
    back_shiny: string().url(),
    front_default: string().url(),
    front_female: string().url().nullable().notRequired(),
    front_shiny_female: string().url().nullable().notRequired(),
    front_shiny: string().url(),
    other: object(),
    versions: object()
  }).required(),
  stats: array(),
  types: array().of(
    object().shape({
      slot: number().positive(),
      type: object()
    })
  ),
  weight: number().positive().integer()
});

export default schema;

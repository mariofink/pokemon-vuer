import Joi from 'joi';

const schema = Joi.object({
  abilities: Joi.array(),
  base_experience: Joi.number().integer().positive(),
  forms: Joi.array(),
  game_indices: Joi.array(),
  height: Joi.number().integer().positive(),
  held_items: Joi.array(),
  id: Joi.number().integer().positive(),
  is_default: Joi.boolean(),
  location_area_encounters: [Joi.array(), Joi.string()], // Array || String
  moves: Joi.array(),
  name: Joi.string(),
  order: Joi.number().integer().positive(),
  past_abilities: Joi.array(),
  past_types: Joi.array(),
  species: Joi.object({
    url: Joi.string().uri(),
    name: Joi.string()
  }),
  sprites: Joi.object().keys({
    back_default: Joi.string().uri(),
    back_female: Joi.string().uri().optional().allow(null),
    back_shiny_female: Joi.string().uri().optional().allow(null),
    back_shiny: Joi.string().uri(),
    front_default: Joi.string().uri(),
    front_female: Joi.string().uri().optional().allow(null),
    front_shiny_female: Joi.string().optional().allow(null),
    front_shiny: Joi.string().uri(),
    other: Joi.object(),
    versions: Joi.object()
  }),
  stats: Joi.array(),
  types: Joi.array().items({
    slot: Joi.number().positive(),
    type: Joi.object()
  }),
  weight: Joi.number().integer().positive()
});

export default schema;

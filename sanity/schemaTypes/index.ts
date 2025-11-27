import { type SchemaTypeDefinition } from 'sanity';

import activity from './activity';
import category from './category';
import destination from './destination';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, activity, destination],
};

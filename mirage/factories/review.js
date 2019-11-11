import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  comment: (i) => {
    return faker.lorem.sentences((i % 2) + 1); 
  },

  created_at: faker.date.recent,

  themes: (i) => {
    const count = i % 4;
    const themes = [];
    
    for (let c = 0; c <= count; c++) {
      themes.push({
        sentiment: faker.random.arrayElement([-1, 0, 1]),
        // NOTE: For simplicity, only 4 themes were declared as fixtures.
        theme_id: c + 1
      });
    }

    return themes;
  }
});

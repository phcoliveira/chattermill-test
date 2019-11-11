import { helper } from '@ember/component/helper';

export const positives = [
  ':smiley:',
  ':smile:',
  ':heart_eyes:',
  ':kissing_heart:',
  ':wink:',
  ':star_struck:',
  ':joy:',
  ':sweat_smile:',
  ':sunglasses:',
];

export const neutrals = [
  ':no_mouth:',
  ':thinking:',
  ':sleeping:',
  ':rolling_eyes:',
];

export const negatives = [
  ':rage:',
  ':face_with_symbols_over_mouth:',
  ':triumph:',
  ':sob:',
  ':tired_face:',
  ':pensive:',
  ':persevere:',
  ':exploding_head:',
  ':face_vomiting:',
  ':angry:',
];

export default helper(function emojiFromTheme([theme]) {
  const { sentiment } = theme;
  let sentiments, emoji;

  if (sentiment < 0) {
    sentiments = negatives;
  } else if (sentiment === 0) {
    sentiments = neutrals;
  } else {
    sentiments = positives;
  }

  emoji = sentiments[Math.floor(Math.random() * sentiments.length)];

  return emoji;
});

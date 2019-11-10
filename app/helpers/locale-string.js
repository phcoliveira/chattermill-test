import { helper } from '@ember/component/helper';

export default helper(function localeString([isoString]) {
  const date = new Date(isoString);

  return date.toLocaleString();
});

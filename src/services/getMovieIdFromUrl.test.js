import { expect, test } from 'vitest';
import getMovieIdFromUrl from './getMovieIdFromUrl';

const imdb = {
  linkEndSlash: 'https://m.imdb.com/title/tt0808506/',
  linkWithoutEndSlash: 'https://m.imdb.com/title/tt0808506/',
  linkWithoutId: 'https://m.imdb.com/',
  id: 'tt0808506'
};

test('Link provided without end slash', () => {
  const result = getMovieIdFromUrl(imdb.linkEndSlash);

  expect(result).toBeTypeOf('string');
  expect(result).toBe(imdb.id);
});

test('Link provided with end slash', () => {
  const result = getMovieIdFromUrl(imdb.linkWithoutEndSlash);

  expect(result).toBeTypeOf('string');
  expect(result).toBe(imdb.id);
});

test('Link provided without ID', () => {
  const result = getMovieIdFromUrl(imdb.linkWithoutId);

  expect(result).toBeTypeOf('string');
  expect(result).toBeFalsy();
});

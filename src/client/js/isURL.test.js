import {isURL} from './isURL'

let str = 'www.google.com';

test('Test URL validation', () => {
    expect(isURL(str)).toBe(true);
  });
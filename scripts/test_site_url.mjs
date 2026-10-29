import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveSiteUrl } from './site-url.mjs';

test('unset URL stays unset for local builds', () => {
  assert.equal(resolveSiteUrl(undefined), undefined);
  assert.equal(resolveSiteUrl('  '), undefined);
});
test('HTTPS root normalizes to an origin with trailing slash', () => {
  assert.equal(resolveSiteUrl(' https://docs.example.test '), 'https://docs.example.test/');
});
test('invalid URL and HTTP are rejected', () => {
  for (const value of ['not a URL', 'http://docs.example.test']) assert.throws(() => resolveSiteUrl(value));
});
test('credentials, query and hash are rejected', () => {
  for (const value of ['https://a:b@docs.example.test', 'https://docs.example.test?q=1', 'https://docs.example.test#x']) assert.throws(() => resolveSiteUrl(value));
});
test('subpaths and localhost are rejected', () => {
  for (const value of ['https://docs.example.test/codex/', 'https://localhost', 'https://preview.localhost']) assert.throws(() => resolveSiteUrl(value));
});

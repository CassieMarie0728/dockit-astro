import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveBasePath, withBase, rehypeBaseLinks } from '../src/lib/utils/base-path.mjs';
test('base defaults and trailing slash normalize',()=>{
  assert.equal(resolveBasePath(''),'/'); assert.equal(resolveBasePath('/dockit-astro/'),'/dockit-astro');
});
test('unsafe base values fail',()=>{
  for(const value of ['//host','relative','/a/../b','/a?b','/a#b']) assert.throws(()=>resolveBasePath(value));
});
test('root links get prefix once and retain query and anchor',()=>{
  assert.equal(withBase('/guide/?a=1#step','/dockit-astro'),'/dockit-astro/guide/?a=1#step');
  assert.equal(withBase('/dockit-astro/guide/','/dockit-astro'),'/dockit-astro/guide/');
  assert.equal(withBase('/','/dockit-astro'),'/dockit-astro/');
});
test('external, protocol-relative, local-relative and fragment links remain unchanged',()=>{
  for(const value of ['https://example.test','//example.test','../guide/','#section','mailto:test@example.test']) assert.equal(withBase(value,'/dockit-astro'),value);
});
test('root deployment is unchanged',()=>assert.equal(withBase('/guide/','/'),'/guide/'));
test('Markdown HTML-tree links and images get deployment base',()=>{
  const tree={children:[{properties:{href:'/tasks/'}},{children:[{properties:{src:'/image.png'}}]}]};
  rehypeBaseLinks({base:'/dockit-astro'})(tree);
  assert.equal(tree.children[0].properties.href,'/dockit-astro/tasks/');
  assert.equal(tree.children[1].children[0].properties.src,'/dockit-astro/image.png');
});

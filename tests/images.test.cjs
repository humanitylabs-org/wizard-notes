// Images in Read view (issue #33): which Markdown becomes an image, where it loads from, and what stays text.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/../web/app.js','utf8');
const context=vm.createContext({state:{note:{path:'Apartment Hunting/Apartment Hunting.md'}},base:p=>p.split('/').pop(),URL});
vm.runInContext(source.slice(source.indexOf('const INLINE_RX='),source.indexOf('function mdImage(')),context);
const pick=text=>{const rx=new RegExp('('+vm.runInContext('IMAGE_RX',context)+'|'+vm.runInContext('INLINE_RX',context)+')','g');return [...text.matchAll(rx)].map(m=>m[0]);};
const src=(t,current='Apartment Hunting/Apartment Hunting.md')=>'api/image?target='+encodeURIComponent(t)+'&current='+encodeURIComponent(current);

test('outside https images load as they are, with no referrer',()=>{
  const url='https://bangkokcondos.co.th/wp-content/uploads/2021/04/1.-Swasdi-Mansion-Building-1.jpg';
  assert.deepEqual(pick('![test]('+url+')'),['![test]('+url+')']);
  assert.deepEqual({...context.imageSource('![test]('+url+')')},{src:url,alt:'test',width:0,external:true});
  assert.equal(context.imageSource('![t](https://x.test/a.jpg "Title")').src,'https://x.test/a.jpg');
  assert.equal(context.imageSource('![](https://x.test/photo)').alt,'','any https URL, extension or not');
});
test('Obsidian embeds and relative paths load from the vault through api/image',()=>{
  assert.deepEqual({...context.imageSource('![[photo.jpg]]')},{src:src('photo.jpg'),alt:'photo.jpg',width:0,external:false});
  assert.deepEqual({...context.imageSource('![[photos/one.JPG|300]]')},{src:src('photos/one.JPG'),alt:'one.JPG',width:300,external:false});
  assert.equal(context.imageSource('![[a.png|Front door]]').alt,'Front door');
  assert.equal(context.imageSource('![door|240](photos/one%20two.png)').width,240);
  assert.equal(context.imageSource('![door](photos/one%20two.png)').src,src('photos/one two.png'));
  assert.equal(context.imageSource('![door](<photos/one two.png>)').src,src('photos/one two.png'));
});
test('anything else stays text: http, data, javascript, protocol-relative, note embeds, non-images',()=>{
  for(const t of ['![x](http://x.test/a.jpg)','![x](data:image/png;base64,AAAA)','![x](javascript:alert(1))','![x](//x.test/a.jpg)','![[Some note]]','![[doc.pdf]]','![x](notes.md)','![x](photo.svg)'])
    assert.equal(context.imageSource(t),null,t);
});
test('the image rule is off unless the read-images switch is on, and raw HTML is never parsed',()=>{
  assert.match(source,/new RegExp\('\('\+\(switchOn\('read-images'\)\?IMAGE_RX\+'\|':''\)\+INLINE_RX\+'\)','g'\)/);
  const img=source.slice(source.indexOf('function mdImage('),source.indexOf('// Tap an image'));
  assert.match(img,/img\.loading='lazy'/);assert.match(img,/referrerPolicy='no-referrer'/);
  assert.match(img,/onerror=\(\)=>img\.replaceWith\(el\('span',image\.alt\|\|'Image','md-img-missing'\)\)/);
  assert.match(img,/onclick=\(\)=>showImage\(image\)/);
  assert.doesNotMatch(source,/innerHTML|insertAdjacentHTML|outerHTML/);
});

var Jn=[],ho=[];(()=>{let n="lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17\
,3,1n,9,16,o,,x,1i,3,,i,,7,a,2,t,3,1k,,,7,2,2,2,3,9,,a,2,q,,2,3,1k,,,5,4,2,2,3,3,,u,2,3,,b,3,1k,,,8,,3,,3,k,2,m,6,,3,1k,\
,,7,2,2,2,3,7,3,a,2,u,,1n,5,3,3,,4,9,,14,5,1j,,,7,,3,,4,7,2,b,2,t,3,1k,,,7,,3,,4,7,2,b,2,f,,c,4,1j,2,,7,,3,,4,9,,a,2,t,3\
,1y,,4,6,,,,8,i,2,1p,,,8,c,8,2q,,,a,b,7,21,2,r,,,,,,4,2,1d,k,,2,5,b,,10,9,,2u,b,,6,n,4,4,3,g,4,d,,,3,6,,f,,jj,3,qa,4,s,3\
,t,2,u,2,1s,w,9,,19,3,,,39,2,y,,3a,c,4,c,63,5,1l,a,,,,,2,o,2,,1c,1a,2,c,k,5,1b,h,12,9,c,3,u,d,1k,e,1c,k,48,3,,l,4,,6,,2,\
3,5i,1s,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,n,5,4,,2b,2,1e,i,q,i,d,,12,8,p,d,18,4,1b,e,10,,1v,\
e,c,,8,2,1a,,1f,,,3,2,2,5,2,,,15,5,5,2,6k,8,,2,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,1t,5,8t,2,\
25,6,1y,b,1d,4,3e,3,1h,f,15,,2,2,a,4,19,b,7,,1p,3,10,e,g,2,18,,c,3,1c,e,8,4,,2,2k,c,6,,2,,4d,c,l,4,1j,2,,7,2,2,2,3,9,,a,\
2,2,7,3,5,1v,9,,,2,,,4,,5,,,e,2,2a,i,n,,29,k,6j,7,2,9,r,2,2a,h,2y,d,2t,3,2,a,74,f,6t,6,,2,2,4,,,,2,3x,7,2,7,3,,s,a,14,7,\
,4,8,,9,b,1a,g,5i,8,5j,8,,8,2a,m,,e,3e,6,3,,,2,,7,,,1u,5,,2,,5,9n,4,9,2,,,1c,7,3,5,n,,44l,,6,f,8ug,i,1xc,5,1n,7,t4,,,1j,\
7,4,29,,b,2,f57,2,3mp,1a,2,n,f2,5,3,6,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,2s,,4g,7,af,,1p,4,e4,\
4,72,2,6r,,2,,7,2,5,,d6,7,31,7,240,5".split(",").map(t=>t?parseInt(t,36):1);for(let t=0,e=0;t<n.length;t++)(t%2?ho:Jn).push(
e=e+n[t])})();function rf(n){if(n<768)return!1;for(let t=0,e=Jn.length;;){let i=t+e>>1;if(n<Jn[i])e=i;else if(n>=ho[i])t=
i+1;else return!0;if(t==e)return!1}}function oo(n){return n>=127462&&n<=127487}var lo=8205;function fo(n,t,e=!0,i=!0){return(e?co:of)(n,t,i)}function co(n,t,e){if(t==n.length)return t;t&&uo(n.charCodeAt(
t))&&po(n.charCodeAt(t-1))&&t--;let i=Xn(n,t);for(t+=ao(i);t<n.length;){let s=Xn(n,t);if(i==lo||s==lo||e&&rf(s))t+=ao(s),
i=s;else if(oo(s)){let r=0,o=t-2;for(;o>=0&&oo(Xn(n,o));)r++,o-=2;if(r%2==0)break;t+=2}else break}return t}function of(n,t,e){
for(;t>1;){let i=co(n,t-2,e);if(i<t)return i;t--}return 0}function Xn(n,t){let e=n.charCodeAt(t);if(!po(e)||t+1==n.length)
return e;let i=n.charCodeAt(t+1);return uo(i)?(e-55296<<10)+(i-56320)+65536:e}function uo(n){return n>=56320&&n<57344}function po(n){
return n>=55296&&n<56320}function ao(n){return n<65536?1:2}var H=class n{lineAt(t){if(t<0||t>this.length)throw new RangeError(`Invalid position ${t} in document of length ${this.length}`);
return this.lineInner(t,!1,1,0)}line(t){if(t<1||t>this.lines)throw new RangeError(`Invalid line number ${t} in ${this.lines}\
-line document`);return this.lineInner(t,!0,1,0)}replace(t,e,i){[t,e]=Ie(this,t,e);let s=[];return this.decompose(0,t,s,
2),i.length&&i.decompose(0,i.length,s,3),this.decompose(e,this.length,s,1),Oe.from(s,this.length-(e-t)+i.length)}append(t){
return this.replace(this.length,this.length,t)}slice(t,e=this.length){[t,e]=Ie(this,t,e);let i=[];return this.decompose(
t,e,i,0),Oe.from(i,e-t)}eq(t){if(t==this)return!0;if(t.length!=this.length||t.lines!=this.lines)return!1;let e=this.scanIdentical(
t,1),i=this.length-this.scanIdentical(t,-1),s=new pe(this),r=new pe(t);for(let o=e,l=e;;){if(s.next(o),r.next(o),o=0,s.lineBreak!=
r.lineBreak||s.done!=r.done||s.value!=r.value)return!1;if(l+=s.value.length,s.done||l>=i)return!0}}iter(t=1){return new pe(
this,t)}iterRange(t,e=this.length){return new _i(this,t,e)}iterLines(t,e){let i;if(t==null)i=this.iter();else{e==null&&(e=
this.lines+1);let s=this.line(t).from;i=this.iterRange(s,Math.max(s,e==this.lines+1?this.length:e<=1?0:this.line(e-1).to))}
return new Gi(i)}toString(){return this.sliceString(0)}toJSON(){let t=[];return this.flatten(t),t}constructor(){}static of(t){
if(t.length==0)throw new RangeError("A document must have at least one line");return t.length==1&&!t[0]?n.empty:t.length<=
32?new pt(t):Oe.from(pt.split(t,[]))}},pt=class n extends H{constructor(t,e=lf(t)){super(),this.text=t,this.length=e}get lines(){
return this.text.length}get children(){return null}lineInner(t,e,i,s){for(let r=0;;r++){let o=this.text[r],l=s+o.length;
if((e?i:l)>=t)return new Qn(s,l,i,o);s=l+1,i++}}decompose(t,e,i,s){let r=t<=0&&e>=this.length?this:new n(mo(this.text,t,
e),Math.min(e,this.length)-Math.max(0,t));if(s&1){let o=i.pop(),l=Ui(r.text,o.text.slice(),0,r.length);if(l.length<=32)i.
push(new n(l,o.length+r.length));else{let a=l.length>>1;i.push(new n(l.slice(0,a)),new n(l.slice(a)))}}else i.push(r)}replace(t,e,i){
if(!(i instanceof n))return super.replace(t,e,i);[t,e]=Ie(this,t,e);let s=Ui(this.text,Ui(i.text,mo(this.text,0,t)),e),r=this.
length+i.length-(e-t);return s.length<=32?new n(s,r):Oe.from(n.split(s,[]),r)}sliceString(t,e=this.length,i=`
`){[t,e]=Ie(this,t,e);let s="";for(let r=0,o=0;r<=e&&o<this.text.length;o++){let l=this.text[o],a=r+l.length;r>t&&o&&(s+=
i),t<a&&e>r&&(s+=l.slice(Math.max(0,t-r),e-r)),r=a+1}return s}flatten(t){for(let e of this.text)t.push(e)}scanIdentical(){
return 0}static split(t,e){let i=[],s=-1;for(let r of t)i.push(r),s+=r.length+1,i.length==32&&(e.push(new n(i,s)),i=[],s=
-1);return s>-1&&e.push(new n(i,s)),e}},Oe=class n extends H{constructor(t,e){super(),this.children=t,this.length=e,this.
lines=0;for(let i of t)this.lines+=i.lines}lineInner(t,e,i,s){for(let r=0;;r++){let o=this.children[r],l=s+o.length,a=i+
o.lines-1;if((e?a:l)>=t)return o.lineInner(t,e,i,s);s=l+1,i=a+1}}decompose(t,e,i,s){for(let r=0,o=0;o<=e&&r<this.children.
length;r++){let l=this.children[r],a=o+l.length;if(t<=a&&e>=o){let h=s&((o<=t?1:0)|(a>=e?2:0));o>=t&&a<=e&&!h?i.push(l):
l.decompose(t-o,e-o,i,h)}o=a+1}}replace(t,e,i){if([t,e]=Ie(this,t,e),i.lines<this.lines)for(let s=0,r=0;s<this.children.
length;s++){let o=this.children[s],l=r+o.length;if(t>=r&&e<=l){let a=o.replace(t-r,e-r,i),h=this.lines-o.lines+a.lines;if(a.
lines<h>>4&&a.lines>h>>6){let f=this.children.slice();return f[s]=a,new n(f,this.length-(e-t)+i.length)}return super.replace(
r,l,a)}r=l+1}return super.replace(t,e,i)}sliceString(t,e=this.length,i=`
`){[t,e]=Ie(this,t,e);let s="";for(let r=0,o=0;r<this.children.length&&o<=e;r++){let l=this.children[r],a=o+l.length;o>t&&
r&&(s+=i),t<a&&e>o&&(s+=l.sliceString(t-o,e-o,i)),o=a+1}return s}flatten(t){for(let e of this.children)e.flatten(t)}scanIdentical(t,e){
if(!(t instanceof n))return 0;let i=0,[s,r,o,l]=e>0?[0,0,this.children.length,t.children.length]:[this.children.length-1,
t.children.length-1,-1,-1];for(;;s+=e,r+=e){if(s==o||r==l)return i;let a=this.children[s],h=t.children[r];if(a!=h)return i+
a.scanIdentical(h,e);i+=a.length+1}}static from(t,e=t.reduce((i,s)=>i+s.length+1,-1)){let i=0;for(let d of t)i+=d.lines;
if(i<32){let d=[];for(let p of t)p.flatten(d);return new pt(d,e)}let s=Math.max(32,i>>5),r=s<<1,o=s>>1,l=[],a=0,h=-1,f=[];
function c(d){let p;if(d.lines>r&&d instanceof n)for(let m of d.children)c(m);else d.lines>o&&(a>o||!a)?(u(),l.push(d)):
d instanceof pt&&a&&(p=f[f.length-1])instanceof pt&&d.lines+p.lines<=32?(a+=d.lines,h+=d.length+1,f[f.length-1]=new pt(p.
text.concat(d.text),p.length+1+d.length)):(a+d.lines>s&&u(),a+=d.lines,h+=d.length+1,f.push(d))}function u(){a!=0&&(l.push(
f.length==1?f[0]:n.from(f,h)),h=-1,a=f.length=0)}for(let d of t)c(d);return u(),l.length==1?l[0]:new n(l,e)}};H.empty=new pt(
[""],0);function lf(n){let t=-1;for(let e of n)t+=e.length+1;return t}function Ui(n,t,e=0,i=1e9){for(let s=0,r=0,o=!0;r<
n.length&&s<=i;r++){let l=n[r],a=s+l.length;a>=e&&(a>i&&(l=l.slice(0,i-s)),s<e&&(l=l.slice(e-s)),o?(t[t.length-1]+=l,o=!1):
t.push(l)),s=a+1}return t}function mo(n,t,e){return Ui(n,[""],t,e)}var pe=class{constructor(t,e=1){this.dir=e,this.done=
!1,this.lineBreak=!1,this.value="",this.nodes=[t],this.offsets=[e>0?1:(t instanceof pt?t.text.length:t.children.length)<<
1]}nextInner(t,e){for(this.done=this.lineBreak=!1;;){let i=this.nodes.length-1,s=this.nodes[i],r=this.offsets[i],o=r>>1,
l=s instanceof pt?s.text.length:s.children.length;if(o==(e>0?l:0)){if(i==0)return this.done=!0,this.value="",this;e>0&&this.
offsets[i-1]++,this.nodes.pop(),this.offsets.pop()}else if((r&1)==(e>0?0:1)){if(this.offsets[i]+=e,t==0)return this.lineBreak=
!0,this.value=`
`,this;t--}else if(s instanceof pt){let a=s.text[o+(e<0?-1:0)];if(this.offsets[i]+=e,a.length>Math.max(0,t))return this.
value=t==0?a:e>0?a.slice(t):a.slice(0,a.length-t),this;t-=a.length}else{let a=s.children[o+(e<0?-1:0)];t>a.length?(t-=a.
length,this.offsets[i]+=e):(e<0&&this.offsets[i]--,this.nodes.push(a),this.offsets.push(e>0?1:(a instanceof pt?a.text.length:
a.children.length)<<1))}}}next(t=0){return t<0&&(this.nextInner(-t,-this.dir),t=this.value.length),this.nextInner(t,this.
dir)}},_i=class{constructor(t,e,i){this.value="",this.done=!1,this.cursor=new pe(t,e>i?-1:1),this.pos=e>i?t.length:0,this.
from=Math.min(e,i),this.to=Math.max(e,i)}nextInner(t,e){if(e<0?this.pos<=this.from:this.pos>=this.to)return this.value="",
this.done=!0,this;t+=Math.max(0,e<0?this.pos-this.to:this.from-this.pos);let i=e<0?this.pos-this.from:this.to-this.pos;t>
i&&(t=i),i-=t;let{value:s}=this.cursor.next(t);return this.pos+=(s.length+t)*e,this.value=s.length<=i?s:e<0?s.slice(s.length-
i):s.slice(0,i),this.done=!this.value,this}next(t=0){return t<0?t=Math.max(t,this.from-this.pos):t>0&&(t=Math.min(t,this.
to-this.pos)),this.nextInner(t,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=""}},Gi=class{constructor(t){
this.inner=t,this.afterBreak=!0,this.value="",this.done=!1}next(t=0){let{done:e,lineBreak:i,value:s}=this.inner.next(t);
return e&&this.afterBreak?(this.value="",this.afterBreak=!1):e?(this.done=!0,this.value=""):i?this.afterBreak?this.value=
"":(this.afterBreak=!0,this.next()):(this.value=s,this.afterBreak=!1),this}get lineBreak(){return!1}};typeof Symbol<"u"&&
(H.prototype[Symbol.iterator]=function(){return this.iter()},pe.prototype[Symbol.iterator]=_i.prototype[Symbol.iterator]=
Gi.prototype[Symbol.iterator]=function(){return this});var Qn=class{constructor(t,e,i,s){this.from=t,this.to=e,this.number=
i,this.text=s}get length(){return this.to-this.from}};function Ie(n,t,e){return t=Math.max(0,Math.min(n.length,t)),[t,Math.
max(t,Math.min(n.length,e))]}function it(n,t,e=!0,i=!0){return fo(n,t,e,i)}function af(n){return n>=56320&&n<57344}function hf(n){
return n>=55296&&n<56320}function wo(n,t){let e=n.charCodeAt(t);if(!hf(e)||t+1==n.length)return e;let i=n.charCodeAt(t+1);
return af(i)?(e-55296<<10)+(i-56320)+65536:e}function xo(n){return n<65536?1:2}var Zn=/\r\n?|\n/,ft=(function(n){return n[n.Simple=0]="Simple",n[n.TrackDel=1]="Track\
Del",n[n.TrackBefore=2]="TrackBefore",n[n.TrackAfter=3]="TrackAfter",n})(ft||(ft={})),Xt=class n{constructor(t){this.sections=
t}get length(){let t=0;for(let e=0;e<this.sections.length;e+=2)t+=this.sections[e];return t}get newLength(){let t=0;for(let e=0;e<
this.sections.length;e+=2){let i=this.sections[e+1];t+=i<0?this.sections[e]:i}return t}get empty(){return this.sections.
length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(t){for(let e=0,i=0,s=0;e<this.sections.length;){let r=this.
sections[e++],o=this.sections[e++];o<0?(t(i,s,r),s+=r):s+=o,i+=r}}iterChangedRanges(t,e=!1){ts(this,t,e)}get invertedDesc(){
let t=[];for(let e=0;e<this.sections.length;){let i=this.sections[e++],s=this.sections[e++];s<0?t.push(i,s):t.push(s,i)}
return new n(t)}composeDesc(t){return this.empty?t:t.empty?this:So(this,t)}mapDesc(t,e=!1){return t.empty?this:es(this,t,
e)}mapPos(t,e=-1,i=ft.Simple){let s=0,r=0;for(let o=0;o<this.sections.length;){let l=this.sections[o++],a=this.sections[o++],
h=s+l;if(a<0){if(h>t)return r+(t-s);r+=l}else{if(i!=ft.Simple&&h>=t&&(i==ft.TrackDel&&s<t&&h>t||i==ft.TrackBefore&&s<t||
i==ft.TrackAfter&&h>t))return null;if(h>t||h==t&&e<0&&!l)return t==s||e<0?r:r+a;r+=a}s=h}if(t>s)throw new RangeError(`Po\
sition ${t} is out of range for changeset of length ${s}`);return r}touchesRange(t,e=t){for(let i=0,s=0;i<this.sections.
length&&s<=e;){let r=this.sections[i++],o=this.sections[i++],l=s+r;if(o>=0&&s<=e&&l>=t)return s<t&&l>e?"cover":!0;s=l}return!1}toString(){
let t="";for(let e=0;e<this.sections.length;){let i=this.sections[e++],s=this.sections[e++];t+=(t?" ":"")+i+(s>=0?":"+s:
"")}return t}toJSON(){return this.sections}static fromJSON(t){if(!Array.isArray(t)||t.length%2||t.some(e=>typeof e!="num\
ber"))throw new RangeError("Invalid JSON representation of ChangeDesc");return new n(t)}static create(t){return new n(t)}},
lt=class n extends Xt{constructor(t,e){super(t),this.inserted=e}apply(t){if(this.length!=t.length)throw new RangeError("\
Applying change set to a document with the wrong length");return ts(this,(e,i,s,r,o)=>t=t.replace(s,s+(i-e),o),!1),t}mapDesc(t,e=!1){
return es(this,t,e,!0)}invert(t){let e=this.sections.slice(),i=[];for(let s=0,r=0;s<e.length;s+=2){let o=e[s],l=e[s+1];if(l>=
0){e[s]=l,e[s+1]=o;let a=s>>1;for(;i.length<a;)i.push(H.empty);i.push(o?t.slice(r,r+o):H.empty)}r+=o}return new n(e,i)}compose(t){
return this.empty?t:t.empty?this:So(this,t,!0)}map(t,e=!1){return t.empty?this:es(this,t,e,!0)}iterChanges(t,e=!1){ts(this,
t,e)}get desc(){return Xt.create(this.sections)}filter(t){let e=[],i=[],s=[],r=new me(this);t:for(let o=0,l=0;;){let a=o==
t.length?1e9:t[o++];for(;l<a||l==a&&r.len==0;){if(r.done)break t;let f=Math.min(r.len,a-l);st(s,f,-1);let c=r.ins==-1?-1:
r.off==0?r.ins:0;st(e,f,c),c>0&&ee(i,e,r.text),r.forward(f),l+=f}let h=t[o++];for(;l<h;){if(r.done)break t;let f=Math.min(
r.len,h-l);st(e,f,-1),st(s,f,r.ins==-1?-1:r.off==0?r.ins:0),r.forward(f),l+=f}}return{changes:new n(e,i),filtered:Xt.create(
s)}}toJSON(){let t=[];for(let e=0;e<this.sections.length;e+=2){let i=this.sections[e],s=this.sections[e+1];s<0?t.push(i):
s==0?t.push([i]):t.push([i].concat(this.inserted[e>>1].toJSON()))}return t}static of(t,e,i){let s=[],r=[],o=0,l=null;function a(f=!1){
if(!f&&!s.length)return;o<e&&st(s,e-o,-1);let c=new n(s,r);l=l?l.compose(c.map(l)):c,s=[],r=[],o=0}function h(f){if(Array.
isArray(f))for(let c of f)h(c);else if(f instanceof n){if(f.length!=e)throw new RangeError(`Mismatched change set length\
 (got ${f.length}, expected ${e})`);a(),l=l?l.compose(f.map(l)):f}else{let{from:c,to:u=c,insert:d}=f;if(c>u||c<0||u>e)throw new RangeError(
`Invalid change range ${c} to ${u} (in doc of length ${e})`);let p=d?typeof d=="string"?H.of(d.split(i||Zn)):d:H.empty,m=p.
length;if(c==u&&m==0)return;c<o&&a(),c>o&&st(s,c-o,-1),st(s,u-c,m),ee(r,s,p),o=u}}return h(t),a(!l),l}static empty(t){return new n(
t?[t,-1]:[],[])}static fromJSON(t){if(!Array.isArray(t))throw new RangeError("Invalid JSON representation of ChangeSet");
let e=[],i=[];for(let s=0;s<t.length;s++){let r=t[s];if(typeof r=="number")e.push(r,-1);else{if(!Array.isArray(r)||typeof r[0]!=
"number"||r.some((o,l)=>l&&typeof o!="string"))throw new RangeError("Invalid JSON representation of ChangeSet");if(r.length==
1)e.push(r[0],0);else{for(;i.length<s;)i.push(H.empty);i[s]=H.of(r.slice(1)),e.push(r[0],i[s].length)}}}return new n(e,i)}static createSet(t,e){
return new n(t,e)}};function st(n,t,e,i=!1){if(t==0&&e<=0)return;let s=n.length-2;s>=0&&e<=0&&e==n[s+1]?n[s]+=t:s>=0&&t==
0&&n[s]==0?n[s+1]+=e:i?(n[s]+=t,n[s+1]+=e):n.push(t,e)}function ee(n,t,e){if(e.length==0)return;let i=t.length-2>>1;if(i<
n.length)n[n.length-1]=n[n.length-1].append(e);else{for(;n.length<i;)n.push(H.empty);n.push(e)}}function ts(n,t,e){let i=n.
inserted;for(let s=0,r=0,o=0;o<n.sections.length;){let l=n.sections[o++],a=n.sections[o++];if(a<0)s+=l,r+=l;else{let h=s,
f=r,c=H.empty;for(;h+=l,f+=a,a&&i&&(c=c.append(i[o-2>>1])),!(e||o==n.sections.length||n.sections[o+1]<0);)l=n.sections[o++],
a=n.sections[o++];t(s,h,r,f,c),s=h,r=f}}}function es(n,t,e,i=!1){let s=[],r=i?[]:null,o=new me(n),l=new me(t);for(let a=-1;;){
if(o.done&&l.len||l.done&&o.len)throw new Error("Mismatched change set lengths");if(o.ins==-1&&l.ins==-1){let h=Math.min(
o.len,l.len);st(s,h,-1),o.forward(h),l.forward(h)}else if(l.ins>=0&&(o.ins<0||a==o.i||o.off==0&&(l.len<o.len||l.len==o.len&&
!e))){let h=l.len;for(st(s,l.ins,-1);h;){let f=Math.min(o.len,h);o.ins>=0&&a<o.i&&o.len<=f&&(st(s,0,o.ins),r&&ee(r,s,o.text),
a=o.i),o.forward(f),h-=f}l.next()}else if(o.ins>=0){let h=0,f=o.len;for(;f;)if(l.ins==-1){let c=Math.min(f,l.len);h+=c,f-=
c,l.forward(c)}else if(l.ins==0&&l.len<f)f-=l.len,l.next();else break;st(s,h,a<o.i?o.ins:0),r&&a<o.i&&ee(r,s,o.text),a=o.
i,o.forward(o.len-f)}else{if(o.done&&l.done)return r?lt.createSet(s,r):Xt.create(s);throw new Error("Mismatched change s\
et lengths")}}}function So(n,t,e=!1){let i=[],s=e?[]:null,r=new me(n),o=new me(t);for(let l=!1;;){if(r.done&&o.done)return s?
lt.createSet(i,s):Xt.create(i);if(r.ins==0)st(i,r.len,0,l),r.next();else if(o.len==0&&!o.done)st(i,0,o.ins,l),s&&ee(s,i,
o.text),o.next();else{if(r.done||o.done)throw new Error("Mismatched change set lengths");{let a=Math.min(r.len2,o.len),h=i.
length;if(r.ins==-1){let f=o.ins==-1?-1:o.off?0:o.ins;st(i,a,f,l),s&&f&&ee(s,i,o.text)}else o.ins==-1?(st(i,r.off?0:r.len,
a,l),s&&ee(s,i,r.textBit(a))):(st(i,r.off?0:r.len,o.off?0:o.ins,l),s&&!o.off&&ee(s,i,o.text));l=(r.ins>a||o.ins>=0&&o.len>
a)&&(l||i.length>h),r.forward2(a),o.forward(a)}}}}var me=class{constructor(t){this.set=t,this.i=0,this.next()}next(){let{
sections:t}=this.set;this.i<t.length?(this.len=t[this.i++],this.ins=t[this.i++]):(this.len=0,this.ins=-2),this.off=0}get done(){
return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:t}=this.set,e=this.i-2>>1;return e>=
t.length?H.empty:t[e]}textBit(t){let{inserted:e}=this.set,i=this.i-2>>1;return i>=e.length&&!t?H.empty:e[i].slice(this.off,
t==null?void 0:this.off+t)}forward(t){t==this.len?this.next():(this.len-=t,this.off+=t)}forward2(t){this.ins==-1?this.forward(
t):t==this.ins?this.next():(this.ins-=t,this.off+=t)}},Be=class n{constructor(t,e,i){this.from=t,this.to=e,this.flags=i}get anchor(){
return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.
to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get bidiLevel(){let t=this.flags&7;return t==7?null:t}get goalColumn(){
let t=this.flags>>6;return t==16777215?void 0:t}map(t,e=-1){let i,s;return this.empty?i=s=t.mapPos(this.from,e):(i=t.mapPos(
this.from,1),s=t.mapPos(this.to,-1)),i==this.from&&s==this.to?this:new n(i,s,this.flags)}extend(t,e=t){if(t<=this.anchor&&
e>=this.anchor)return C.range(t,e);let i=Math.abs(t-this.anchor)>Math.abs(e-this.anchor)?t:e;return C.range(this.anchor,
i)}eq(t,e=!1){return this.anchor==t.anchor&&this.head==t.head&&this.goalColumn==t.goalColumn&&(!e||!this.empty||this.assoc==
t.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(t){if(!t||typeof t.anchor!="number"||typeof t.
head!="number")throw new RangeError("Invalid JSON representation for SelectionRange");return C.range(t.anchor,t.head)}static create(t,e,i){
return new n(t,e,i)}},C=class n{constructor(t,e){this.ranges=t,this.mainIndex=e}map(t,e=-1){return t.empty?this:n.create(
this.ranges.map(i=>i.map(t,e)),this.mainIndex)}eq(t,e=!1){if(this.ranges.length!=t.ranges.length||this.mainIndex!=t.mainIndex)
return!1;for(let i=0;i<this.ranges.length;i++)if(!this.ranges[i].eq(t.ranges[i],e))return!1;return!0}get main(){return this.
ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new n([this.main],0)}addRange(t,e=!0){return n.create(
[t].concat(this.ranges),e?0:this.mainIndex+1)}replaceRange(t,e=this.mainIndex){let i=this.ranges.slice();return i[e]=t,n.
create(i,this.mainIndex)}toJSON(){return{ranges:this.ranges.map(t=>t.toJSON()),main:this.mainIndex}}static fromJSON(t){if(!t||
!Array.isArray(t.ranges)||typeof t.main!="number"||t.main>=t.ranges.length)throw new RangeError("Invalid JSON representa\
tion for EditorSelection");return new n(t.ranges.map(e=>Be.fromJSON(e)),t.main)}static single(t,e=t){return new n([n.range(
t,e)],0)}static create(t,e=0){if(t.length==0)throw new RangeError("A selection needs at least one range");for(let i=0,s=0;s<
t.length;s++){let r=t[s];if(r.empty?r.from<=i:r.from<i)return n.normalized(t.slice(),e);i=r.to}return new n(t,e)}static cursor(t,e=0,i,s){
return Be.create(t,t,(e==0?0:e<0?8:16)|(i==null?7:Math.min(6,i))|(s??16777215)<<6)}static range(t,e,i,s){let r=(i??16777215)<<
6|(s==null?7:Math.min(6,s));return e<t?Be.create(e,t,48|r):Be.create(t,e,(e>t?8:0)|r)}static normalized(t,e=0){let i=t[e];
t.sort((s,r)=>s.from-r.from),e=t.indexOf(i);for(let s=1;s<t.length;s++){let r=t[s],o=t[s-1];if(r.empty?r.from<=o.to:r.from<
o.to){let l=o.from,a=Math.max(r.to,o.to);s<=e&&e--,t.splice(--s,2,r.anchor>r.head?n.range(a,l):n.range(l,a))}}return new n(
t,e)}};function vo(n,t){for(let e of n.ranges)if(e.to>t)throw new RangeError("Selection points outside of document")}var cs=0,
E=class n{constructor(t,e,i,s,r){this.combine=t,this.compareInput=e,this.compare=i,this.isStatic=s,this.id=cs++,this.default=
t([]),this.extensions=typeof r=="function"?r(this):r}get reader(){return this}static define(t={}){return new n(t.combine||
(e=>e),t.compareInput||((e,i)=>e===i),t.compare||(t.combine?(e,i)=>e===i:us),!!t.static,t.enables)}of(t){return new Pe([],
this,0,t)}compute(t,e){if(this.isStatic)throw new Error("Can't compute a static facet");return new Pe(t,this,1,e)}computeN(t,e){
if(this.isStatic)throw new Error("Can't compute a static facet");return new Pe(t,this,2,e)}from(t,e){return e||(e=i=>i),
this.compute([t],i=>e(i.field(t)))}};function us(n,t){return n==t||n.length==t.length&&n.every((e,i)=>e===t[i])}var Pe=class{constructor(t,e,i,s){
this.dependencies=t,this.facet=e,this.type=i,this.value=s,this.id=cs++}dynamicSlot(t){var e;let i=this.value,s=this.facet.
compareInput,r=this.id,o=t[r]>>1,l=this.type==2,a=!1,h=!1,f=[];for(let c of this.dependencies)c=="doc"?a=!0:c=="selectio\
n"?h=!0:(((e=t[c.id])!==null&&e!==void 0?e:1)&1)==0&&f.push(t[c.id]);return{create(c){return c.values[o]=i(c),1},update(c,u){
if(a&&u.docChanged||h&&(u.docChanged||u.selection)||is(c,f)){let d=i(c);if(l?!go(d,c.values[o],s):!s(d,c.values[o]))return c.
values[o]=d,1}return 0},reconfigure:(c,u)=>{let d,p=u.config.address[r];if(p!=null){let m=Qi(u,p);if(this.dependencies.every(
g=>g instanceof E?u.facet(g)===c.facet(g):g instanceof ct?u.field(g,!1)==c.field(g,!1):!0)||(l?go(d=i(c),m,s):s(d=i(c),m)))
return c.values[o]=m,0}else d=i(c);return c.values[o]=d,1}}}};function go(n,t,e){if(n.length!=t.length)return!1;for(let i=0;i<
n.length;i++)if(!e(n[i],t[i]))return!1;return!0}function is(n,t){let e=!1;for(let i of t)Qe(n,i)&1&&(e=!0);return e}function ff(n,t,e){
let i=e.map(a=>n[a.id]),s=e.map(a=>a.type),r=i.filter(a=>!(a&1)),o=n[t.id]>>1;function l(a){let h=[];for(let f=0;f<i.length;f++){
let c=Qi(a,i[f]);if(s[f]==2)for(let u of c)h.push(u);else h.push(c)}return t.combine(h)}return{create(a){for(let h of i)
Qe(a,h);return a.values[o]=l(a),1},update(a,h){if(!is(a,r))return 0;let f=l(a);return t.compare(f,a.values[o])?0:(a.values[o]=
f,1)},reconfigure(a,h){let f=is(a,i),c=h.config.facets[t.id],u=h.facet(t);if(c&&!f&&us(e,c))return a.values[o]=u,0;let d=l(
a);return t.compare(d,u)?(a.values[o]=u,0):(a.values[o]=d,1)}}}var Ki=E.define({static:!0}),ct=class n{constructor(t,e,i,s,r){
this.id=t,this.createF=e,this.updateF=i,this.compareF=s,this.spec=r,this.provides=void 0}static define(t){let e=new n(cs++,
t.create,t.update,t.compare||((i,s)=>i===s),t);return t.provide&&(e.provides=t.provide(e)),e}create(t){let e=t.facet(Ki).
find(i=>i.field==this);return(e?.create||this.createF)(t)}slot(t){let e=t[this.id]>>1;return{create:i=>(i.values[e]=this.
create(i),1),update:(i,s)=>{let r=i.values[e],o=this.updateF(r,s);return this.compareF(r,o)?0:(i.values[e]=o,1)},reconfigure:(i,s)=>{
let r=i.facet(Ki),o=s.facet(Ki),l;return(l=r.find(a=>a.field==this))&&l!=o.find(a=>a.field==this)?(i.values[e]=l.create(
i),1):s.config.address[this.id]!=null?(i.values[e]=s.field(this),0):(i.values[e]=this.create(i),1)}}}init(t){return[this,
Ki.of({field:this,create:t})]}get extension(){return this}},ue={lowest:4,low:3,default:2,high:1,highest:0};function Ye(n){
return t=>new Xi(t,n)}var ii={highest:Ye(ue.highest),high:Ye(ue.high),default:Ye(ue.default),low:Ye(ue.low),lowest:Ye(ue.
lowest)},Xi=class{constructor(t,e){this.inner=t,this.prec=e}},Ji=class n{of(t){return new Ze(this,t)}reconfigure(t){return n.
reconfigure.of({compartment:this,extension:t})}get(t){return t.config.compartments.get(this)}},Ze=class{constructor(t,e){
this.compartment=t,this.inner=e}},Yi=class n{constructor(t,e,i,s,r,o){for(this.base=t,this.compartments=e,this.dynamicSlots=
i,this.address=s,this.staticValues=r,this.facets=o,this.statusTemplate=[];this.statusTemplate.length<i.length;)this.statusTemplate.
push(0)}staticFacet(t){let e=this.address[t.id];return e==null?t.default:this.staticValues[e>>1]}static resolve(t,e,i){let s=[],
r=Object.create(null),o=new Map;for(let u of cf(t,e,o))u instanceof ct?s.push(u):(r[u.facet.id]||(r[u.facet.id]=[])).push(
u);let l=Object.create(null),a=[],h=[];for(let u of s)l[u.id]=h.length<<1,h.push(d=>u.slot(d));let f=i?.config.facets;for(let u in r){
let d=r[u],p=d[0].facet,m=f&&f[u]||[];if(d.every(g=>g.type==0))if(l[p.id]=a.length<<1|1,us(m,d))a.push(i.facet(p));else{
let g=p.combine(d.map(y=>y.value));a.push(i&&p.compare(g,i.facet(p))?i.facet(p):g)}else{for(let g of d)g.type==0?(l[g.id]=
a.length<<1|1,a.push(g.value)):(l[g.id]=h.length<<1,h.push(y=>g.dynamicSlot(y)));l[p.id]=h.length<<1,h.push(g=>ff(g,p,d))}}
let c=h.map(u=>u(l));return new n(t,o,c,l,a,r)}};function cf(n,t,e){let i=[[],[],[],[],[]],s=new Map;function r(o,l){let a=s.
get(o);if(a!=null){if(a<=l)return;let h=i[a].indexOf(o);h>-1&&i[a].splice(h,1),o instanceof Ze&&e.delete(o.compartment)}
if(s.set(o,l),Array.isArray(o))for(let h of o)r(h,l);else if(o instanceof Ze){if(e.has(o.compartment))throw new RangeError(
"Duplicate use of compartment in extensions");let h=t.get(o.compartment)||o.inner;e.set(o.compartment,h),r(h,l)}else if(o instanceof
Xi)r(o.inner,o.prec);else if(o instanceof ct)i[l].push(o),o.provides&&r(o.provides,l);else if(o instanceof Pe)i[l].push(
o),o.facet.extensions&&r(o.facet.extensions,ue.default);else{let h=o.extension;if(!h)throw new Error(`Unrecognized exten\
sion value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, b\
reaking instanceof checks.`);r(h,l)}}return r(n,ue.default),i.reduce((o,l)=>o.concat(l))}function Qe(n,t){if(t&1)return 2;
let e=t>>1,i=n.status[e];if(i==4)throw new Error("Cyclic dependency between fields and/or facets");if(i&2)return i;n.status[e]=
4;let s=n.computeSlot(n,n.config.dynamicSlots[e]);return n.status[e]=2|s}function Qi(n,t){return t&1?n.config.staticValues[t>>
1]:n.values[t>>1]}var Co=E.define(),ns=E.define({combine:n=>n.some(t=>t),static:!0}),Ao=E.define({combine:n=>n.length?n[0]:
void 0,static:!0}),Mo=E.define(),Do=E.define(),Lo=E.define(),To=E.define({combine:n=>n.length?n[0]:!1}),wt=class{constructor(t,e){
this.type=t,this.value=e}static define(){return new ss}},ss=class{of(t){return new wt(this,t)}},rs=class{constructor(t){
this.map=t}of(t){return new q(this,t)}},q=class n{constructor(t,e){this.type=t,this.value=e}map(t){let e=this.type.map(this.
value,t);return e===void 0?void 0:e==this.value?this:new n(this.type,e)}is(t){return this.type==t}static define(t={}){return new rs(
t.map||(e=>e))}static mapEffects(t,e){if(!t.length)return t;let i=[];for(let s of t){let r=s.map(e);r&&i.push(r)}return i}};
q.reconfigure=q.define();q.appendConfig=q.define();var J=class n{constructor(t,e,i,s,r,o){this.startState=t,this.changes=
e,this.selection=i,this.effects=s,this.annotations=r,this.scrollIntoView=o,this._doc=null,this._state=null,i&&vo(i,e.newLength),
r.some(l=>l.type==n.time)||(this.annotations=r.concat(n.time.of(Date.now())))}static create(t,e,i,s,r,o){return new n(t,
e,i,s,r,o)}get newDoc(){return this._doc||(this._doc=this.changes.apply(this.startState.doc))}get newSelection(){return this.
selection||this.startState.selection.map(this.changes)}get state(){return this._state||this.startState.applyTransaction(
this),this._state}annotation(t){for(let e of this.annotations)if(e.type==t)return e.value}get docChanged(){return!this.changes.
empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(t){let e=this.annotation(n.userEvent);
return!!(e&&(e==t||e.length>t.length&&e.slice(0,t.length)==t&&e[t.length]=="."))}};J.time=wt.define();J.userEvent=wt.define();
J.addToHistory=wt.define();J.remote=wt.define();function uf(n,t){let e=[];for(let i=0,s=0;;){let r,o;if(i<n.length&&(s==
t.length||t[s]>=n[i]))r=n[i++],o=n[i++];else if(s<t.length)r=t[s++],o=t[s++];else return e;!e.length||e[e.length-1]<r?e.
push(r,o):e[e.length-1]<o&&(e[e.length-1]=o)}}function Eo(n,t,e){var i;let s,r,o;return e?(s=t.changes,r=lt.empty(t.changes.
length),o=n.changes.compose(t.changes)):(s=t.changes.map(n.changes),r=n.changes.mapDesc(t.changes,!0),o=n.changes.compose(
s)),{changes:o,selection:t.selection?t.selection.map(r):(i=n.selection)===null||i===void 0?void 0:i.map(s),effects:q.mapEffects(
n.effects,s).concat(q.mapEffects(t.effects,r)),annotations:n.annotations.length?n.annotations.concat(t.annotations):t.annotations,
scrollIntoView:n.scrollIntoView||t.scrollIntoView}}function os(n,t,e){let i=t.selection,s=Re(t.annotations);return t.userEvent&&
(s=s.concat(J.userEvent.of(t.userEvent))),{changes:t.changes instanceof lt?t.changes:lt.of(t.changes||[],e,n.facet(Ao)),
selection:i&&(i instanceof C?i:C.single(i.anchor,i.head)),effects:Re(t.effects),annotations:s,scrollIntoView:!!t.scrollIntoView}}
function Bo(n,t,e){let i=os(n,t.length?t[0]:{},n.doc.length);t.length&&t[0].filter===!1&&(e=!1);for(let r=1;r<t.length;r++){
t[r].filter===!1&&(e=!1);let o=!!t[r].sequential;i=Eo(i,os(n,t[r],o?i.changes.newLength:n.doc.length),o)}let s=J.create(
n,i.changes,i.selection,i.effects,i.annotations,i.scrollIntoView);return pf(e?df(s):s)}function df(n){let t=n.startState,
e=!0;for(let s of t.facet(Mo)){let r=s(n);if(r===!1){e=!1;break}Array.isArray(r)&&(e=e===!0?r:uf(e,r))}if(e!==!0){let s,
r;if(e===!1)r=n.changes.invertedDesc,s=lt.empty(t.doc.length);else{let o=n.changes.filter(e);s=o.changes,r=o.filtered.mapDesc(
o.changes).invertedDesc}n=J.create(t,s,n.selection&&n.selection.map(r),q.mapEffects(n.effects,r),n.annotations,n.scrollIntoView)}
let i=t.facet(Do);for(let s=i.length-1;s>=0;s--){let r=i[s](n);r instanceof J?n=r:Array.isArray(r)&&r.length==1&&r[0]instanceof
J?n=r[0]:n=Bo(t,Re(r),!1)}return n}function pf(n){let t=n.startState,e=t.facet(Lo),i=n;for(let s=e.length-1;s>=0;s--){let r=e[s](
n);r&&Object.keys(r).length&&(i=Eo(i,os(t,r,n.changes.newLength),!0))}return i==n?n:J.create(t,n.changes,n.selection,i.effects,
i.annotations,i.scrollIntoView)}var mf=[];function Re(n){return n==null?mf:Array.isArray(n)?n:[n]}var Lt=(function(n){return n[n.
Word=0]="Word",n[n.Space=1]="Space",n[n.Other=2]="Other",n})(Lt||(Lt={})),gf=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
ls;try{ls=new RegExp("[\\p{Alphabetic}\\p{Number}_]","u")}catch{}function bf(n){if(ls)return ls.test(n);for(let t=0;t<n.
length;t++){let e=n[t];if(/\w/.test(e)||e>"\x80"&&(e.toUpperCase()!=e.toLowerCase()||gf.test(e)))return!0}return!1}function yf(n){
return t=>{if(!/\S/.test(t))return Lt.Space;if(bf(t))return Lt.Word;for(let e=0;e<n.length;e++)if(t.indexOf(n[e])>-1)return Lt.
Word;return Lt.Other}}var U=class n{constructor(t,e,i,s,r,o){this.config=t,this.doc=e,this.selection=i,this.values=s,this.
status=t.statusTemplate.slice(),this.computeSlot=r,o&&(o._state=this);for(let l=0;l<this.config.dynamicSlots.length;l++)
Qe(this,l<<1);this.computeSlot=null}field(t,e=!0){let i=this.config.address[t.id];if(i==null){if(e)throw new RangeError(
"Field is not present in this state");return}return Qe(this,i),Qi(this,i)}update(...t){return Bo(this,t,!0)}applyTransaction(t){
let e=this.config,{base:i,compartments:s}=e;for(let l of t.effects)l.is(Ji.reconfigure)?(e&&(s=new Map,e.compartments.forEach(
(a,h)=>s.set(h,a)),e=null),s.set(l.value.compartment,l.value.extension)):l.is(q.reconfigure)?(e=null,i=l.value):l.is(q.appendConfig)&&
(e=null,i=Re(i).concat(l.value));let r;e?r=t.startState.values.slice():(e=Yi.resolve(i,s,this),r=new n(e,this.doc,this.selection,
e.dynamicSlots.map(()=>null),(a,h)=>h.reconfigure(a,this),null).values);let o=t.startState.facet(ns)?t.newSelection:t.newSelection.
asSingle();new n(e,t.newDoc,o,r,(l,a)=>a.update(l,t),t)}replaceSelection(t){return typeof t=="string"&&(t=this.toText(t)),
this.changeByRange(e=>({changes:{from:e.from,to:e.to,insert:t},range:C.cursor(e.from+t.length)}))}changeByRange(t){let e=this.
selection,i=t(e.ranges[0]),s=this.changes(i.changes),r=[i.range],o=Re(i.effects);for(let l=1;l<e.ranges.length;l++){let a=t(
e.ranges[l]),h=this.changes(a.changes),f=h.map(s);for(let u=0;u<l;u++)r[u]=r[u].map(f);let c=s.mapDesc(h,!0);r.push(a.range.
map(c)),s=s.compose(f),o=q.mapEffects(o,f).concat(q.mapEffects(Re(a.effects),c))}return{changes:s,selection:C.create(r,e.
mainIndex),effects:o}}changes(t=[]){return t instanceof lt?t:lt.of(t,this.doc.length,this.facet(n.lineSeparator))}toText(t){
return H.of(t.split(this.facet(n.lineSeparator)||Zn))}sliceDoc(t=0,e=this.doc.length){return this.doc.sliceString(t,e,this.
lineBreak)}facet(t){let e=this.config.address[t.id];return e==null?t.default:(Qe(this,e),Qi(this,e))}toJSON(t){let e={doc:this.
sliceDoc(),selection:this.selection.toJSON()};if(t)for(let i in t){let s=t[i];s instanceof ct&&this.config.address[s.id]!=
null&&(e[i]=s.spec.toJSON(this.field(t[i]),this))}return e}static fromJSON(t,e={},i){if(!t||typeof t.doc!="string")throw new RangeError(
"Invalid JSON representation for EditorState");let s=[];if(i){for(let r in i)if(Object.prototype.hasOwnProperty.call(t,r)){
let o=i[r],l=t[r];s.push(o.init(a=>o.spec.fromJSON(l,a)))}}return n.create({doc:t.doc,selection:C.fromJSON(t.selection),
extensions:e.extensions?s.concat([e.extensions]):s})}static create(t={}){let e=Yi.resolve(t.extensions||[],new Map),i=t.
doc instanceof H?t.doc:H.of((t.doc||"").split(e.staticFacet(n.lineSeparator)||Zn)),s=t.selection?t.selection instanceof C?
t.selection:C.single(t.selection.anchor,t.selection.head):C.single(0);return vo(s,i.length),e.staticFacet(ns)||(s=s.asSingle()),
new n(e,i,s,e.dynamicSlots.map(()=>null),(r,o)=>o.create(r),null)}get tabSize(){return this.facet(n.tabSize)}get lineBreak(){
return this.facet(n.lineSeparator)||`
`}get readOnly(){return this.facet(To)}phrase(t,...e){for(let i of this.facet(n.phrases))if(Object.prototype.hasOwnProperty.
call(i,t)){t=i[t];break}return e.length&&(t=t.replace(/\$(\$|\d*)/g,(i,s)=>{if(s=="$")return"$";let r=+(s||1);return!r||
r>e.length?i:e[r-1]})),t}languageDataAt(t,e,i=-1){let s=[];for(let r of this.facet(Co))for(let o of r(this,e,i))Object.prototype.
hasOwnProperty.call(o,t)&&s.push(o[t]);return s}charCategorizer(t){let e=this.languageDataAt("wordChars",t);return yf(e.
length?e[0]:"")}wordAt(t){let{text:e,from:i,length:s}=this.doc.lineAt(t),r=this.charCategorizer(t),o=t-i,l=t-i;for(;o>0;){
let a=it(e,o,!1);if(r(e.slice(a,o))!=Lt.Word)break;o=a}for(;l<s;){let a=it(e,l);if(r(e.slice(l,a))!=Lt.Word)break;l=a}return o==
l?null:C.range(o+i,l+i)}};U.allowMultipleSelections=ns;U.tabSize=E.define({combine:n=>n.length?n[0]:4});U.lineSeparator=
Ao;U.readOnly=To;U.phrases=E.define({compare(n,t){let e=Object.keys(n),i=Object.keys(t);return e.length==i.length&&e.every(
s=>n[s]==t[s])}});U.languageData=Co;U.changeFilter=Mo;U.transactionFilter=Do;U.transactionExtender=Lo;Ji.reconfigure=q.define();
function ni(n,t,e={}){let i={};for(let s of n)for(let r of Object.keys(s)){let o=s[r],l=i[r];if(l===void 0)i[r]=o;else if(!(l===
o||o===void 0))if(Object.hasOwnProperty.call(e,r))i[r]=e[r](l,o);else throw new Error("Config merge conflict for field "+
r)}for(let s in t)i[s]===void 0&&(i[s]=t[s]);return i}var Jt=class{eq(t){return this==t}range(t,e=t){return ti.create(t,
e,this)}};Jt.prototype.startSide=Jt.prototype.endSide=0;Jt.prototype.point=!1;Jt.prototype.mapMode=ft.TrackDel;function ds(n,t){
return n==t||n.constructor==t.constructor&&n.eq(t)}var ti=class n{constructor(t,e,i){this.from=t,this.to=e,this.value=i}static create(t,e,i){
return new n(t,e,i)}};function as(n,t){return n.from-t.from||n.value.startSide-t.value.startSide}var hs=class n{constructor(t,e,i,s){
this.from=t,this.to=e,this.value=i,this.maxPoint=s}get length(){return this.to[this.to.length-1]}findIndex(t,e,i,s=0){let r=i?
this.to:this.from;for(let o=s,l=r.length;;){if(o==l)return o;let a=o+l>>1,h=r[a]-t||(i?this.value[a].endSide:this.value[a].
startSide)-e;if(a==o)return h>=0?o:l;h>=0?l=a:o=a+1}}between(t,e,i,s){for(let r=this.findIndex(e,-1e9,!0),o=this.findIndex(
i,1e9,!1,r);r<o;r++)if(s(this.from[r]+t,this.to[r]+t,this.value[r])===!1)return!1}map(t,e){let i=[],s=[],r=[],o=-1,l=-1;
for(let a=0;a<this.value.length;a++){let h=this.value[a],f=this.from[a]+t,c=this.to[a]+t,u,d;if(f==c){let p=e.mapPos(f,h.
startSide,h.mapMode);if(p==null||(u=d=p,h.startSide!=h.endSide&&(d=e.mapPos(f,h.endSide),d<u)))continue}else if(u=e.mapPos(
f,h.startSide),d=e.mapPos(c,h.endSide),u>d||u==d&&h.startSide>0&&h.endSide<=0)continue;(d-u||h.endSide-h.startSide)<0||(o<
0&&(o=u),h.point&&(l=Math.max(l,d-u)),i.push(h),s.push(u-o),r.push(d-o))}return{mapped:i.length?new n(s,r,i,l):null,pos:o}}},
Q=class n{constructor(t,e,i,s){this.chunkPos=t,this.chunk=e,this.nextLayer=i,this.maxPoint=s}static create(t,e,i,s){return new n(
t,e,i,s)}get length(){let t=this.chunk.length-1;return t<0?0:Math.max(this.chunkEnd(t),this.nextLayer.length)}get size(){
if(this.isEmpty)return 0;let t=this.nextLayer.size;for(let e of this.chunk)t+=e.value.length;return t}chunkEnd(t){return this.
chunkPos[t]+this.chunk[t].length}update(t){let{add:e=[],sort:i=!1,filterFrom:s=0,filterTo:r=this.length}=t,o=t.filter;if(e.
length==0&&!o)return this;if(i&&(e=e.slice().sort(as)),this.isEmpty)return e.length?n.of(e):this;let l=new Zi(this,null,
-1).goto(0),a=0,h=[],f=new Ne;for(;l.value||a<e.length;)if(a<e.length&&(l.from-e[a].from||l.startSide-e[a].value.startSide)>=
0){let c=e[a++];f.addInner(c.from,c.to,c.value)||h.push(c)}else l.rangeIndex==1&&l.chunkIndex<this.chunk.length&&(a==e.length||
this.chunkEnd(l.chunkIndex)<e[a].from)&&(!o||s>this.chunkEnd(l.chunkIndex)||r<this.chunkPos[l.chunkIndex])&&f.addChunk(this.
chunkPos[l.chunkIndex],this.chunk[l.chunkIndex])?l.nextChunk():((!o||s>l.to||r<l.from||o(l.from,l.to,l.value))&&(f.addInner(
l.from,l.to,l.value)||h.push(ti.create(l.from,l.to,l.value))),l.next());return f.finishInner(this.nextLayer.isEmpty&&!h.
length?n.empty:this.nextLayer.update({add:h,filter:o,filterFrom:s,filterTo:r}))}map(t){if(t.empty||this.isEmpty)return this;
let e=[],i=[],s=-1;for(let o=0;o<this.chunk.length;o++){let l=this.chunkPos[o],a=this.chunk[o],h=t.touchesRange(l,l+a.length);
if(h===!1)s=Math.max(s,a.maxPoint),e.push(a),i.push(t.mapPos(l));else if(h===!0){let{mapped:f,pos:c}=a.map(l,t);f&&(s=Math.
max(s,f.maxPoint),e.push(f),i.push(c))}}let r=this.nextLayer.map(t);return e.length==0?r:new n(i,e,r||n.empty,s)}between(t,e,i){
if(!this.isEmpty){for(let s=0;s<this.chunk.length;s++){let r=this.chunkPos[s],o=this.chunk[s];if(e>=r&&t<=r+o.length&&o.
between(r,t-r,e-r,i)===!1)return}this.nextLayer.between(t,e,i)}}iter(t=0){return ei.from([this]).goto(t)}get isEmpty(){return this.
nextLayer==this}static iter(t,e=0){return ei.from(t).goto(e)}static compare(t,e,i,s,r=-1){let o=t.filter(c=>c.maxPoint>0||
!c.isEmpty&&c.maxPoint>=r),l=e.filter(c=>c.maxPoint>0||!c.isEmpty&&c.maxPoint>=r),a=bo(o,l,i),h=new de(o,a,r),f=new de(l,
a,r);i.iterGaps((c,u,d)=>yo(h,c,f,u,d,s)),i.empty&&i.length==0&&yo(h,0,f,0,0,s)}static eq(t,e,i=0,s){s==null&&(s=999999999);
let r=t.filter(f=>!f.isEmpty&&e.indexOf(f)<0),o=e.filter(f=>!f.isEmpty&&t.indexOf(f)<0);if(r.length!=o.length)return!1;if(!r.
length)return!0;let l=bo(r,o),a=new de(r,l,0).goto(i),h=new de(o,l,0).goto(i);for(;;){if(a.to!=h.to||!fs(a.active,h.active)||
a.point&&(!h.point||!ds(a.point,h.point)))return!1;if(a.to>s)return!0;a.next(),h.next()}}static spans(t,e,i,s,r=-1){let o=new de(
t,null,r).goto(e),l=e,a=o.openStart;for(;;){let h=Math.min(o.to,i);if(o.point){let f=o.activeForPoint(o.to),c=o.pointFrom<
e?f.length+1:o.point.startSide<0?f.length:Math.min(f.length,a);s.point(l,h,o.point,f,c,o.pointRank),a=Math.min(o.openEnd(
h),f.length)}else h>l&&(s.span(l,h,o.active,a),a=o.openEnd(h));if(o.to>i)return a+(o.point&&o.to>i?1:0);l=o.to,o.next()}}static of(t,e=!1){
let i=new Ne;for(let s of t instanceof ti?[t]:e?kf(t):t)i.add(s.from,s.to,s.value);return i.finish()}static join(t){if(!t.
length)return n.empty;let e=t[t.length-1];for(let i=t.length-2;i>=0;i--)for(let s=t[i];s!=n.empty;s=s.nextLayer)e=new n(
s.chunkPos,s.chunk,e,Math.max(s.maxPoint,e.maxPoint));return e}};Q.empty=new Q([],[],null,-1);function kf(n){if(n.length>
1)for(let t=n[0],e=1;e<n.length;e++){let i=n[e];if(as(t,i)>0)return n.slice().sort(as);t=i}return n}Q.empty.nextLayer=Q.
empty;var Ne=class n{finishChunk(t){this.chunks.push(new hs(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(
this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,t&&(this.
from=[],this.to=[],this.value=[])}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=
-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(t,e,i){
this.addInner(t,e,i)||(this.nextLayer||(this.nextLayer=new n)).add(t,e,i)}addInner(t,e,i){let s=t-this.lastTo||i.startSide-
this.last.endSide;if(s<=0&&(t-this.lastFrom||i.startSide-this.last.startSide)<0)throw new Error("Ranges must be added so\
rted by `from` position and `startSide`");return s<0?!1:(this.from.length==250&&this.finishChunk(!0),this.chunkStart<0&&
(this.chunkStart=t),this.from.push(t-this.chunkStart),this.to.push(e-this.chunkStart),this.last=i,this.lastFrom=t,this.lastTo=
e,this.value.push(i),i.point&&(this.maxPoint=Math.max(this.maxPoint,e-t)),!0)}addChunk(t,e){if((t-this.lastTo||e.value[0].
startSide-this.last.endSide)<0)return!1;this.from.length&&this.finishChunk(!0),this.setMaxPoint=Math.max(this.setMaxPoint,
e.maxPoint),this.chunks.push(e),this.chunkPos.push(t);let i=e.value.length-1;return this.last=e.value[i],this.lastFrom=e.
from[i]+t,this.lastTo=e.to[i]+t,!0}finish(){return this.finishInner(Q.empty)}finishInner(t){if(this.from.length&&this.finishChunk(
!1),this.chunks.length==0)return t;let e=Q.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(t):
t,this.setMaxPoint);return this.from=null,e}};function bo(n,t,e){let i=new Map;for(let r of n)for(let o=0;o<r.chunk.length;o++)
r.chunk[o].maxPoint<=0&&i.set(r.chunk[o],r.chunkPos[o]);let s=new Set;for(let r of t)for(let o=0;o<r.chunk.length;o++){let l=i.
get(r.chunk[o]);l!=null&&(e?e.mapPos(l):l)==r.chunkPos[o]&&!e?.touchesRange(l,l+r.chunk[o].length)&&s.add(r.chunk[o])}return s}
var Zi=class{constructor(t,e,i,s=0){this.layer=t,this.skip=e,this.minPoint=i,this.rank=s}get startSide(){return this.value?
this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(t,e=-1e9){return this.chunkIndex=this.rangeIndex=
0,this.gotoInner(t,e,!1),this}gotoInner(t,e,i){for(;this.chunkIndex<this.layer.chunk.length;){let s=this.layer.chunk[this.
chunkIndex];if(!(this.skip&&this.skip.has(s)||this.layer.chunkEnd(this.chunkIndex)<t||s.maxPoint<this.minPoint))break;this.
chunkIndex++,i=!1}if(this.chunkIndex<this.layer.chunk.length){let s=this.layer.chunk[this.chunkIndex].findIndex(t-this.layer.
chunkPos[this.chunkIndex],e,!0);(!i||this.rangeIndex<s)&&this.setRangeIndex(s)}this.next()}forward(t,e){(this.to-t||this.
endSide-e)<0&&this.gotoInner(t,e,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.
value=null;break}else{let t=this.layer.chunkPos[this.chunkIndex],e=this.layer.chunk[this.chunkIndex],i=t+e.from[this.rangeIndex];
if(this.from=i,this.to=t+e.to[this.rangeIndex],this.value=e.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),
this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(t){if(t==this.layer.chunk[this.
chunkIndex].value.length){if(this.chunkIndex++,this.skip)for(;this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.
layer.chunk[this.chunkIndex]);)this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=t}nextChunk(){this.chunkIndex++,
this.rangeIndex=0,this.next()}compare(t){return this.from-t.from||this.startSide-t.startSide||this.rank-t.rank||this.to-
t.to||this.endSide-t.endSide}},ei=class n{constructor(t){this.heap=t}static from(t,e=null,i=-1){let s=[];for(let r=0;r<t.
length;r++)for(let o=t[r];!o.isEmpty;o=o.nextLayer)o.maxPoint>=i&&s.push(new Zi(o,e,i,r));return s.length==1?s[0]:new n(
s)}get startSide(){return this.value?this.value.startSide:0}goto(t,e=-1e9){for(let i of this.heap)i.goto(t,e);for(let i=this.
heap.length>>1;i>=0;i--)Yn(this.heap,i);return this.next(),this}forward(t,e){for(let i of this.heap)i.forward(t,e);for(let i=this.
heap.length>>1;i>=0;i--)Yn(this.heap,i);(this.to-t||this.value.endSide-e)<0&&this.next()}next(){if(this.heap.length==0)this.
from=this.to=1e9,this.value=null,this.rank=-1;else{let t=this.heap[0];this.from=t.from,this.to=t.to,this.value=t.value,this.
rank=t.rank,t.value&&t.next(),Yn(this.heap,0)}}};function Yn(n,t){for(let e=n[t];;){let i=(t<<1)+1;if(i>=n.length)break;
let s=n[i];if(i+1<n.length&&s.compare(n[i+1])>=0&&(s=n[i+1],i++),e.compare(s)<0)break;n[i]=e,n[t]=s,t=i}}var de=class{constructor(t,e,i){
this.minPoint=i,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.
pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=ei.from(t,e,i)}goto(t,e=-1e9){return this.cursor.goto(
t,e),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=t,this.endSide=e,this.openStart=
-1,this.next(),this}forward(t,e){for(;this.minActive>-1&&(this.activeTo[this.minActive]-t||this.active[this.minActive].endSide-
e)<0;)this.removeActive(this.minActive);this.cursor.forward(t,e)}removeActive(t){$i(this.active,t),$i(this.activeTo,t),$i(
this.activeRank,t),this.minActive=ko(this.active,this.activeTo)}addActive(t){let e=0,{value:i,to:s,rank:r}=this.cursor;for(;e<
this.activeRank.length&&(r-this.activeRank[e]||s-this.activeTo[e])>0;)e++;ji(this.active,e,i),ji(this.activeTo,e,s),ji(this.
activeRank,e,r),t&&ji(t,e,this.cursor.from),this.minActive=ko(this.active,this.activeTo)}next(){let t=this.to,e=this.point;
this.point=null;let i=this.openStart<0?[]:null;for(;;){let s=this.minActive;if(s>-1&&(this.activeTo[s]-this.cursor.from||
this.active[s].endSide-this.cursor.startSide)<0){if(this.activeTo[s]>t){this.to=this.activeTo[s],this.endSide=this.active[s].
endSide;break}this.removeActive(s),i&&$i(i,s)}else if(this.cursor.value)if(this.cursor.from>t){this.to=this.cursor.from,
this.endSide=this.cursor.startSide;break}else{let r=this.cursor.value;if(!r.point)this.addActive(i),this.cursor.next();else if(e&&
this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=r,this.pointFrom=this.cursor.
from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=r.endSide,this.cursor.next(),this.forward(this.
to,this.endSide);break}}else{this.to=this.endSide=1e9;break}}if(i){this.openStart=0;for(let s=i.length-1;s>=0&&i[s]<t;s--)
this.openStart++}}activeForPoint(t){if(!this.active.length)return this.active;let e=[];for(let i=this.active.length-1;i>=
0&&!(this.activeRank[i]<this.pointRank);i--)(this.activeTo[i]>t||this.activeTo[i]==t&&this.active[i].endSide>=this.point.
endSide)&&e.push(this.active[i]);return e.reverse()}openEnd(t){let e=0;for(let i=this.activeTo.length-1;i>=0&&this.activeTo[i]>
t;i--)e++;return e}};function yo(n,t,e,i,s,r){n.goto(t),e.goto(i);let o=i+s,l=i,a=i-t,h=!!r.boundChange;for(let f=!1;;){
let c=n.to+a-e.to,u=c||n.endSide-e.endSide,d=u<0?n.to+a:e.to,p=Math.min(d,o);if(n.point||e.point?(n.point&&e.point&&ds(n.
point,e.point)&&fs(n.activeForPoint(n.to),e.activeForPoint(e.to))||r.comparePoint(l,p,n.point,e.point),f=!1):(f&&r.boundChange(
l),p>l&&!fs(n.active,e.active)&&r.compareRange(l,p,n.active,e.active),h&&p<o&&(c||n.openEnd(d)!=e.openEnd(d))&&(f=!0)),d>
o)break;l=d,u<=0&&n.next(),u>=0&&e.next()}}function fs(n,t){if(n.length!=t.length)return!1;for(let e=0;e<n.length;e++)if(n[e]!=
t[e]&&!ds(n[e],t[e]))return!1;return!0}function $i(n,t){for(let e=t,i=n.length-1;e<i;e++)n[e]=n[e+1];n.pop()}function ji(n,t,e){
for(let i=n.length-1;i>=t;i--)n[i+1]=n[i];n[t]=e}function ko(n,t){let e=-1,i=1e9;for(let s=0;s<t.length;s++)(t[s]-i||n[s].
endSide-n[e].endSide)<0&&(e=s,i=t[s]);return e}function ge(n,t,e=n.length){let i=0;for(let s=0;s<e&&s<n.length;)n.charCodeAt(
s)==9?(i+=t-i%t,s++):(i++,s=it(n,s));return i}function Oo(n,t,e,i){for(let s=0,r=0;;){if(r>=t)return s;if(s==n.length)break;
r+=n.charCodeAt(s)==9?e-r%e:1,s=it(n,s)}return i===!0?-1:n.length}var Po=typeof Symbol>"u"?"__\u037C":Symbol.for("\u037C"),ps=typeof Symbol>"u"?"__styleSet"+Math.floor(Math.random()*1e8):
Symbol("styleSet"),Ro=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},xt=class{constructor(t,e){this.rules=
[];let{finish:i}=e||{};function s(o){return/^@/.test(o)?[o]:o.split(/,\s*/)}function r(o,l,a,h){let f=[],c=/^@(\w+)\b/.exec(
o[0]),u=c&&c[1]=="keyframes";if(c&&l==null)return a.push(o[0]+";");for(let d in l){let p=l[d];if(/&/.test(d))r(d.split(/,\s*/).
map(m=>o.map(g=>m.replace(/&/,g))).reduce((m,g)=>m.concat(g)),p,a);else if(p&&typeof p=="object"){if(!c)throw new RangeError(
"The value of a property ("+d+") should be a primitive value.");r(s(d),p,f,u)}else p!=null&&f.push(d.replace(/_.*/,"").replace(
/[A-Z]/g,m=>"-"+m.toLowerCase())+": "+p+";")}(f.length||u)&&a.push((i&&!c&&!h?o.map(i):o).join(", ")+" {"+f.join(" ")+"}")}
for(let o in t)r(s(o),t[o],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let t=Ro[Po]||1;return Ro[Po]=t+1,"\u037C"+t.toString(36)}static mount(t,e,i){let s=t[ps],r=i&&i.nonce;
s?r&&s.setNonce(r):s=new ms(t,r),s.mount(Array.isArray(e)?e:[e],t)}},Io=new Map,ms=class{constructor(t,e){let i=t.ownerDocument||
t,s=i.defaultView;if(!t.head&&t.adoptedStyleSheets&&s.CSSStyleSheet){let r=Io.get(i);if(r)return t[ps]=r;this.sheet=new s.
CSSStyleSheet,Io.set(i,this)}else this.styleTag=i.createElement("style"),e&&this.styleTag.setAttribute("nonce",e);this.modules=
[],t[ps]=this}mount(t,e){let i=this.sheet,s=0,r=0,o=!1;for(let l=0;l<t.length;l++){let a=t[l],h=this.modules.indexOf(a);
if(h<r&&h>-1&&(this.modules.splice(h,1),o=!0,r--,h=-1),h==-1){if(this.modules.splice(r++,0,a),o=!0,i)for(let f=0;f<a.rules.
length;f++)i.insertRule(a.rules[f],s++)}else{for(;r<h;)s+=this.modules[r++].rules.length;s+=a.rules.length,r++}}if(i)e.adoptedStyleSheets.
indexOf(this.sheet)<0&&(e.adoptedStyleSheets=[this.sheet,...e.adoptedStyleSheets]);else{if(o){let a="";for(let h=0;h<this.
modules.length;h++)a+=this.modules[h].getRules()+`
`;this.styleTag.textContent=a}let l=e.head||e;this.styleTag.parentNode!=l&&l.insertBefore(this.styleTag,l.firstChild)}}setNonce(t){
this.styleTag&&this.styleTag.getAttribute("nonce")!=t&&this.styleTag.setAttribute("nonce",t)}};var Yt={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Esca\
pe",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"P\
rintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"\
NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",
188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},He={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",
54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",
221:"}",222:'"'},wf=typeof navigator<"u"&&/Mac/.test(navigator.platform),xf=typeof navigator<"u"&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.
exec(navigator.userAgent);for(Z=0;Z<10;Z++)Yt[48+Z]=Yt[96+Z]=String(Z);var Z;for(Z=1;Z<=24;Z++)Yt[Z+111]="F"+Z;var Z;for(Z=
65;Z<=90;Z++)Yt[Z]=String.fromCharCode(Z+32),He[Z]=String.fromCharCode(Z);var Z;for(tn in Yt)He.hasOwnProperty(tn)||(He[tn]=
Yt[tn]);var tn;function No(n){var t=wf&&n.metaKey&&n.shiftKey&&!n.ctrlKey&&!n.altKey||xf&&n.shiftKey&&n.key&&n.key.length==
1||n.key=="Unidentified",e=!t&&n.key||(n.shiftKey?He:Yt)[n.keyCode]||n.key||"Unidentified";return e=="Esc"&&(e="Escape"),
e=="Del"&&(e="Delete"),e=="Left"&&(e="ArrowLeft"),e=="Up"&&(e="ArrowUp"),e=="Right"&&(e="ArrowRight"),e=="Down"&&(e="Arr\
owDown"),e}var at=typeof navigator<"u"?navigator:{userAgent:"",vendor:"",platform:""},ws=typeof document<"u"?document:{documentElement:{
style:{}}},xs=/Edge\/(\d+)/.exec(at.userAgent),gl=/MSIE \d/.test(at.userAgent),Ss=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.
exec(at.userAgent),An=!!(gl||Ss||xs),Ho=!An&&/gecko\/(\d+)/i.test(at.userAgent),gs=!An&&/Chrome\/(\d+)/.exec(at.userAgent),
Fo="webkitFontSmoothing"in ws.documentElement.style,vs=!An&&/Apple Computer/.test(at.vendor),Vo=vs&&(/Mobile\/\w+/.test(
at.userAgent)||at.maxTouchPoints>2),L={mac:Vo||/Mac/.test(at.platform),windows:/Win/.test(at.platform),linux:/Linux|X11/.
test(at.platform),ie:An,ie_version:gl?ws.documentMode||6:Ss?+Ss[1]:xs?+xs[1]:0,gecko:Ho,gecko_version:Ho?+(/Firefox\/(\d+)/.
exec(at.userAgent)||[0,0])[1]:0,chrome:!!gs,chrome_version:gs?+gs[1]:0,ios:Vo,android:/Android\b/.test(at.userAgent),webkit:Fo,
webkit_version:Fo?+(/\bAppleWebKit\/(\d+)/.exec(at.userAgent)||[0,0])[1]:0,safari:vs,safari_version:vs?+(/\bVersion\/(\d+(\.\d+)?)/.
exec(at.userAgent)||[0,0])[1]:0,tabSize:ws.documentElement.style.tabSize!=null?"tab-size":"-moz-tab-size"};function di(n){
let t;return n.nodeType==11?t=n.getSelection?n:n.ownerDocument:t=n,t.getSelection()}function Cs(n,t){return t?n==t||n.contains(
t.nodeType!=1?t.parentNode:t):!1}function fn(n,t){if(!t.anchorNode)return!1;try{return Cs(n,t.anchorNode)}catch{return!1}}
function We(n){return n.nodeType==3?we(n,0,n.nodeValue.length).getClientRects():n.nodeType==1?n.getClientRects():[]}function li(n,t,e,i){
return e?zo(n,t,e,i,-1)||zo(n,t,e,i,1):!1}function ke(n){for(var t=0;;t++)if(n=n.previousSibling,!n)return t}function pn(n){
return n.nodeType==1&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName)}function zo(n,t,e,i,s){for(;;){
if(n==e&&t==i)return!0;if(t==(s<0?0:zt(n))){if(n.nodeName=="DIV")return!1;let r=n.parentNode;if(!r||r.nodeType!=1)return!1;
t=ke(n)+(s<0?0:1),n=r}else if(n.nodeType==1){if(n=n.childNodes[t+(s<0?-1:0)],n.nodeType==1&&n.contentEditable=="false")return!1;
t=s<0?zt(n):0}else return!1}}function zt(n){return n.nodeType==3?n.nodeValue.length:n.childNodes.length}function xi(n,t){
let e=t?n.left:n.right;return{left:e,right:e,top:n.top,bottom:n.bottom}}function Sf(n){let t=n.visualViewport;return t?{
left:0,right:t.width,top:0,bottom:t.height}:{left:0,right:n.innerWidth,top:0,bottom:n.innerHeight}}function bl(n,t){let e=t.
width/n.offsetWidth,i=t.height/n.offsetHeight;return(e>.995&&e<1.005||!isFinite(e)||Math.abs(t.width-n.offsetWidth)<1)&&
(e=1),(i>.995&&i<1.005||!isFinite(i)||Math.abs(t.height-n.offsetHeight)<1)&&(i=1),{scaleX:e,scaleY:i}}function vf(n,t,e,i,s,r,o,l){
let a=n.ownerDocument,h=a.defaultView||window;for(let f=n,c=!1;f&&!c;)if(f.nodeType==1){let u,d=f==a.body,p=1,m=1;if(d)u=
Sf(h);else{if(/^(fixed|sticky)$/.test(getComputedStyle(f).position)&&(c=!0),f.scrollHeight<=f.clientHeight&&f.scrollWidth<=
f.clientWidth){f=f.assignedSlot||f.parentNode;continue}let v=f.getBoundingClientRect();({scaleX:p,scaleY:m}=bl(f,v)),u={
left:v.left,right:v.left+f.clientWidth*p,top:v.top,bottom:v.top+f.clientHeight*m}}let g=0,y=0;if(s=="nearest")t.top<u.top?
(y=t.top-(u.top+o),e>0&&t.bottom>u.bottom+y&&(y=t.bottom-u.bottom+o)):t.bottom>u.bottom&&(y=t.bottom-u.bottom+o,e<0&&t.top-
y<u.top&&(y=t.top-(u.top+o)));else{let v=t.bottom-t.top,A=u.bottom-u.top;y=(s=="center"&&v<=A?t.top+v/2-A/2:s=="start"||
s=="center"&&e<0?t.top-o:t.bottom-A+o)-u.top}if(i=="nearest"?t.left<u.left?(g=t.left-(u.left+r),e>0&&t.right>u.right+g&&
(g=t.right-u.right+r)):t.right>u.right&&(g=t.right-u.right+r,e<0&&t.left<u.left+g&&(g=t.left-(u.left+r))):g=(i=="center"?
t.left+(t.right-t.left)/2-(u.right-u.left)/2:i=="start"==l?t.left-r:t.right-(u.right-u.left)+r)-u.left,g||y)if(d)h.scrollBy(
g,y);else{let v=0,A=0;if(y){let k=f.scrollTop;f.scrollTop+=y/m,A=(f.scrollTop-k)*m}if(g){let k=f.scrollLeft;f.scrollLeft+=
g/p,v=(f.scrollLeft-k)*p}t={left:t.left-v,top:t.top-A,right:t.right-v,bottom:t.bottom-A},v&&Math.abs(v-g)<1&&(i="nearest"),
A&&Math.abs(A-y)<1&&(s="nearest")}if(d)break;(t.top<u.top||t.bottom>u.bottom||t.left<u.left||t.right>u.right)&&(t={left:Math.
max(t.left,u.left),right:Math.min(t.right,u.right),top:Math.max(t.top,u.top),bottom:Math.min(t.bottom,u.bottom)}),f=f.assignedSlot||
f.parentNode}else if(f.nodeType==11)f=f.host;else break}function Cf(n){let t=n.ownerDocument,e,i;for(let s=n.parentNode;s&&
!(s==t.body||e&&i);)if(s.nodeType==1)!i&&s.scrollHeight>s.clientHeight&&(i=s),!e&&s.scrollWidth>s.clientWidth&&(e=s),s=s.
assignedSlot||s.parentNode;else if(s.nodeType==11)s=s.host;else break;return{x:e,y:i}}var As=class{constructor(){this.anchorNode=
null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(t){return this.anchorNode==t.anchorNode&&this.anchorOffset==
t.anchorOffset&&this.focusNode==t.focusNode&&this.focusOffset==t.focusOffset}setRange(t){let{anchorNode:e,focusNode:i}=t;
this.set(e,Math.min(t.anchorOffset,e?zt(e):0),i,Math.min(t.focusOffset,i?zt(i):0))}set(t,e,i,s){this.anchorNode=t,this.anchorOffset=
e,this.focusNode=i,this.focusOffset=s}},be=null;L.safari&&L.safari_version>=26&&(be=!1);function yl(n){if(n.setActive)return n.
setActive();if(be)return n.focus(be);let t=[];for(let e=n;e&&(t.push(e,e.scrollTop,e.scrollLeft),e!=e.ownerDocument);e=e.
parentNode);if(n.focus(be==null?{get preventScroll(){return be={preventScroll:!0},!0}}:void 0),!be){be=!1;for(let e=0;e<
t.length;){let i=t[e++],s=t[e++],r=t[e++];i.scrollTop!=s&&(i.scrollTop=s),i.scrollLeft!=r&&(i.scrollLeft=r)}}}var Wo;function we(n,t,e=t){
let i=Wo||(Wo=document.createRange());return i.setEnd(n,e),i.setStart(n,t),i}function ze(n,t,e,i){let s={key:t,code:t,keyCode:e,
which:e,cancelable:!0};i&&({altKey:s.altKey,ctrlKey:s.ctrlKey,shiftKey:s.shiftKey,metaKey:s.metaKey}=i);let r=new KeyboardEvent(
"keydown",s);r.synthetic=!0,n.dispatchEvent(r);let o=new KeyboardEvent("keyup",s);return o.synthetic=!0,n.dispatchEvent(
o),r.defaultPrevented||o.defaultPrevented}function Af(n){for(;n;){if(n&&(n.nodeType==9||n.nodeType==11&&n.host))return n;
n=n.assignedSlot||n.parentNode}return null}function kl(n){for(;n.attributes.length;)n.removeAttributeNode(n.attributes[0])}
function Mf(n,t){let e=t.focusNode,i=t.focusOffset;if(!e||t.anchorNode!=e||t.anchorOffset!=i)return!1;for(i=Math.min(i,zt(
e));;)if(i){if(e.nodeType!=1)return!1;let s=e.childNodes[i-1];s.contentEditable=="false"?i--:(e=s,i=zt(e))}else{if(e==n)
return!0;i=ke(e),e=e.parentNode}}function wl(n){return n.scrollTop>Math.max(1,n.scrollHeight-n.clientHeight-4)}function xl(n,t){
for(let e=n,i=t;;){if(e.nodeType==3&&i>0)return{node:e,offset:i};if(e.nodeType==1&&i>0){if(e.contentEditable=="false")return null;
e=e.childNodes[i-1],i=zt(e)}else if(e.parentNode&&!pn(e))i=ke(e),e=e.parentNode;else return null}}function Sl(n,t){for(let e=n,
i=t;;){if(e.nodeType==3&&i<e.nodeValue.length)return{node:e,offset:i};if(e.nodeType==1&&i<e.childNodes.length){if(e.contentEditable==
"false")return null;e=e.childNodes[i],i=0}else if(e.parentNode&&!pn(e))i=ke(e)+1,e=e.parentNode;else return null}}var ht=class n{constructor(t,e,i=!0){
this.node=t,this.offset=e,this.precise=i}static before(t,e){return new n(t.parentNode,ke(t),e)}static after(t,e){return new n(
t.parentNode,ke(t)+1,e)}},tr=[],$=class n{constructor(){this.parent=null,this.dom=null,this.flags=2}get overrideDOMText(){
return null}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.
length}posBefore(t){let e=this.posAtStart;for(let i of this.children){if(i==t)return e;e+=i.length+i.breakAfter}throw new RangeError(
"Invalid child in posBefore")}posAfter(t){return this.posBefore(t)+t.length}sync(t,e){if(this.flags&2){let i=this.dom,s=null,
r;for(let o of this.children){if(o.flags&7){if(!o.dom&&(r=s?s.nextSibling:i.firstChild)){let l=n.get(r);(!l||!l.parent&&
l.canReuseDOM(o))&&o.reuseDOM(r)}o.sync(t,e),o.flags&=-8}if(r=s?s.nextSibling:i.firstChild,e&&!e.written&&e.node==i&&r!=
o.dom&&(e.written=!0),o.dom.parentNode==i)for(;r&&r!=o.dom;)r=qo(r);else i.insertBefore(o.dom,r);s=o.dom}for(r=s?s.nextSibling:
i.firstChild,r&&e&&e.node==i&&(e.written=!0);r;)r=qo(r)}else if(this.flags&1)for(let i of this.children)i.flags&7&&(i.sync(
t,e),i.flags&=-8)}reuseDOM(t){}localPosFromDOM(t,e){let i;if(t==this.dom)i=this.dom.childNodes[e];else{let s=zt(t)==0?0:
e==0?-1:1;for(;;){let r=t.parentNode;if(r==this.dom)break;s==0&&r.firstChild!=r.lastChild&&(t==r.firstChild?s=-1:s=1),t=
r}s<0?i=t:i=t.nextSibling}if(i==this.dom.firstChild)return 0;for(;i&&!n.get(i);)i=i.nextSibling;if(!i)return this.length;
for(let s=0,r=0;;s++){let o=this.children[s];if(o.dom==i)return r;r+=o.length+o.breakAfter}}domBoundsAround(t,e,i=0){let s=-1,
r=-1,o=-1,l=-1;for(let a=0,h=i,f=i;a<this.children.length;a++){let c=this.children[a],u=h+c.length;if(h<t&&u>e)return c.
domBoundsAround(t,e,h);if(u>=t&&s==-1&&(s=a,r=h),h>e&&c.dom.parentNode==this.dom){o=a,l=f;break}f=u,h=u+c.breakAfter}return{
from:r,to:l<0?i+this.length:l,startDOM:(s?this.children[s-1].dom.nextSibling:null)||this.dom.firstChild,endDOM:o<this.children.
length&&o>=0?this.children[o].dom:null}}markDirty(t=!1){this.flags|=2,this.markParentsDirty(t)}markParentsDirty(t){for(let e=this.
parent;e;e=e.parent){if(t&&(e.flags|=2),e.flags&1)return;e.flags|=1,t=!1}}setParent(t){this.parent!=t&&(this.parent=t,this.
flags&7&&this.markParentsDirty(!0))}setDOM(t){this.dom!=t&&(this.dom&&(this.dom.cmView=null),this.dom=t,t.cmView=this)}get rootView(){
for(let t=this;;){let e=t.parent;if(!e)return t;t=e}}replaceChildren(t,e,i=tr){this.markDirty();for(let s=t;s<e;s++){let r=this.
children[s];r.parent==this&&i.indexOf(r)<0&&r.destroy()}i.length<250?this.children.splice(t,e-t,...i):this.children=[].concat(
this.children.slice(0,t),i,this.children.slice(e));for(let s=0;s<i.length;s++)i[s].setParent(this)}ignoreMutation(t){return!1}ignoreEvent(t){
return!1}childCursor(t=this.length){return new mn(this.children,t,this.children.length)}childPos(t,e=1){return this.childCursor().
findPos(t,e)}toString(){let t=this.constructor.name.replace("View","");return t+(this.children.length?"("+this.children.
join()+")":this.length?"["+(t=="Text"?this.text:this.length)+"]":"")+(this.breakAfter?"#":"")}static get(t){return t.cmView}get isEditable(){
return!0}get isWidget(){return!1}get isHidden(){return!1}merge(t,e,i,s,r,o){return!1}become(t){return!1}canReuseDOM(t){return t.
constructor==this.constructor&&!((this.flags|t.flags)&8)}getSide(){return 0}destroy(){for(let t of this.children)t.parent==
this&&t.destroy();this.parent=null}};$.prototype.breakAfter=0;function qo(n){let t=n.nextSibling;return n.parentNode.removeChild(
n),t}var mn=class{constructor(t,e,i){this.children=t,this.pos=e,this.i=i,this.off=0}findPos(t,e=1){for(;;){if(t>this.pos||
t==this.pos&&(e>0||this.i==0||this.children[this.i-1].breakAfter))return this.off=t-this.pos,this;let i=this.children[--this.
i];this.pos-=i.length+i.breakAfter}}};function vl(n,t,e,i,s,r,o,l,a){let{children:h}=n,f=h.length?h[t]:null,c=r.length?r[r.
length-1]:null,u=c?c.breakAfter:o;if(!(t==i&&f&&!o&&!u&&r.length<2&&f.merge(e,s,r.length?c:null,e==0,l,a))){if(i<h.length){
let d=h[i];d&&(s<d.length||d.breakAfter&&c?.breakAfter)?(t==i&&(d=d.split(s),s=0),!u&&c&&d.merge(0,s,c,!0,0,a)?r[r.length-
1]=d:((s||d.children.length&&!d.children[0].length)&&d.merge(0,s,null,!1,0,a),r.push(d))):d?.breakAfter&&(c?c.breakAfter=
1:o=1),i++}for(f&&(f.breakAfter=o,e>0&&(!o&&r.length&&f.merge(e,f.length,r[0],!1,l,0)?f.breakAfter=r.shift().breakAfter:
(e<f.length||f.children.length&&f.children[f.children.length-1].length==0)&&f.merge(e,f.length,null,!1,l,0),t++));t<i&&r.
length;)if(h[i-1].become(r[r.length-1]))i--,r.pop(),a=r.length?0:l;else if(h[t].become(r[0]))t++,r.shift(),l=r.length?0:
a;else break;!r.length&&t&&i<h.length&&!h[t-1].breakAfter&&h[i].merge(0,0,h[t-1],!1,l,a)&&t--,(t<i||r.length)&&n.replaceChildren(
t,i,r)}}function Cl(n,t,e,i,s,r){let o=n.childCursor(),{i:l,off:a}=o.findPos(e,1),{i:h,off:f}=o.findPos(t,-1),c=t-e;for(let u of i)
c+=u.length;n.length+=c,vl(n,h,f,l,a,i,0,s,r)}var Df=256,Wt=class n extends ${constructor(t){super(),this.text=t}get length(){
return this.text.length}createDOM(t){this.setDOM(t||document.createTextNode(this.text))}sync(t,e){this.dom||this.createDOM(),
this.dom.nodeValue!=this.text&&(e&&e.node==this.dom&&(e.written=!0),this.dom.nodeValue=this.text)}reuseDOM(t){t.nodeType==
3&&this.createDOM(t)}merge(t,e,i){return this.flags&8||i&&(!(i instanceof n)||this.length-(e-t)+i.length>Df||i.flags&8)?
!1:(this.text=this.text.slice(0,t)+(i?i.text:"")+this.text.slice(e),this.markDirty(),!0)}split(t){let e=new n(this.text.
slice(t));return this.text=this.text.slice(0,t),this.markDirty(),e.flags|=this.flags&8,e}localPosFromDOM(t,e){return t==
this.dom?e:e?this.text.length:0}domAtPos(t){return new ht(this.dom,t)}domBoundsAround(t,e,i){return{from:i,to:i+this.length,
startDOM:this.dom,endDOM:this.dom.nextSibling}}coordsAt(t,e){return Lf(this.dom,t,e)}},se=class n extends ${constructor(t,e=[],i=0){
super(),this.mark=t,this.children=e,this.length=i;for(let s of e)s.setParent(this)}setAttrs(t){if(kl(t),this.mark.class&&
(t.className=this.mark.class),this.mark.attrs)for(let e in this.mark.attrs)t.setAttribute(e,this.mark.attrs[e]);return t}canReuseDOM(t){
return super.canReuseDOM(t)&&!((this.flags|t.flags)&8)}reuseDOM(t){t.nodeName==this.mark.tagName.toUpperCase()&&(this.setDOM(
t),this.flags|=6)}sync(t,e){this.dom?this.flags&4&&this.setAttrs(this.dom):this.setDOM(this.setAttrs(document.createElement(
this.mark.tagName))),super.sync(t,e)}merge(t,e,i,s,r,o){return i&&(!(i instanceof n&&i.mark.eq(this.mark))||t&&r<=0||e<this.
length&&o<=0)?!1:(Cl(this,t,e,i?i.children.slice():[],r-1,o-1),this.markDirty(),!0)}split(t){let e=[],i=0,s=-1,r=0;for(let l of this.
children){let a=i+l.length;a>t&&e.push(i<t?l.split(t-i):l),s<0&&i>=t&&(s=r),i=a,r++}let o=this.length-t;return this.length=
t,s>-1&&(this.children.length=s,this.markDirty()),new n(this.mark,e,o)}domAtPos(t){return Al(this,t)}coordsAt(t,e){return Dl(
this,t,e)}};function Lf(n,t,e){let i=n.nodeValue.length;t>i&&(t=i);let s=t,r=t,o=0;t==0&&e<0||t==i&&e>=0?L.chrome||L.gecko||
(t?(s--,o=1):r<i&&(r++,o=-1)):e<0?s--:r<i&&r++;let l=we(n,s,r).getClientRects();if(!l.length)return null;let a=l[(o?o<0:
e>=0)?0:l.length-1];return L.safari&&!o&&a.width==0&&(a=Array.prototype.find.call(l,h=>h.width)||a),o?xi(a,o<0):a||null}
var gn=class n extends ${static create(t,e,i){return new n(t,e,i)}constructor(t,e,i){super(),this.widget=t,this.length=e,
this.side=i,this.prevWidget=null}split(t){let e=n.create(this.widget,this.length-t,this.side);return this.length-=t,e}sync(t){
(!this.dom||!this.widget.updateDOM(this.dom,t))&&(this.dom&&this.prevWidget&&this.prevWidget.destroy(this.dom),this.prevWidget=
null,this.setDOM(this.widget.toDOM(t)),this.widget.editable||(this.dom.contentEditable="false"))}getSide(){return this.side}merge(t,e,i,s,r,o){
return i&&(!(i instanceof n)||!this.widget.compare(i.widget)||t>0&&r<=0||e<this.length&&o<=0)?!1:(this.length=t+(i?i.length:
0)+(this.length-e),!0)}become(t){return t instanceof n&&t.side==this.side&&this.widget.constructor==t.widget.constructor?
(this.widget.compare(t.widget)||this.markDirty(!0),this.dom&&!this.prevWidget&&(this.prevWidget=this.widget),this.widget=
t.widget,this.length=t.length,!0):!1}ignoreMutation(){return!0}ignoreEvent(t){return this.widget.ignoreEvent(t)}get overrideDOMText(){
if(this.length==0)return H.empty;let t=this;for(;t.parent;)t=t.parent;let{view:e}=t,i=e&&e.state.doc,s=this.posAtStart;return i?
i.slice(s,s+this.length):H.empty}domAtPos(t){return(this.length?t==0:this.side>0)?ht.before(this.dom):ht.after(this.dom,
t==this.length)}domBoundsAround(){return null}coordsAt(t,e){let i=this.widget.coordsAt(this.dom,t,e);if(i)return i;let s=this.
dom.getClientRects(),r=null;if(!s.length)return null;let o=this.side?this.side<0:t>0;for(let l=o?s.length-1:0;r=s[l],!(t>
0?l==0:l==s.length-1||r.top<r.bottom);l+=o?-1:1);return xi(r,!o)}get isEditable(){return!1}get isWidget(){return!0}get isHidden(){
return this.widget.isHidden}destroy(){super.destroy(),this.dom&&this.widget.destroy(this.dom)}},pi=class n extends ${constructor(t){
super(),this.side=t}get length(){return 0}merge(){return!1}become(t){return t instanceof n&&t.side==this.side}split(){return new n(
this.side)}sync(){if(!this.dom){let t=document.createElement("img");t.className="cm-widgetBuffer",t.setAttribute("aria-h\
idden","true"),this.setDOM(t)}}getSide(){return this.side}domAtPos(t){return this.side>0?ht.before(this.dom):ht.after(this.
dom)}localPosFromDOM(){return 0}domBoundsAround(){return null}coordsAt(t){return this.dom.getBoundingClientRect()}get overrideDOMText(){
return H.empty}get isHidden(){return!0}};Wt.prototype.children=gn.prototype.children=pi.prototype.children=tr;function Al(n,t){
let e=n.dom,{children:i}=n,s=0;for(let r=0;s<i.length;s++){let o=i[s],l=r+o.length;if(!(l==r&&o.getSide()<=0)){if(t>r&&t<
l&&o.dom.parentNode==e)return o.domAtPos(t-r);if(t<=r)break;r=l}}for(let r=s;r>0;r--){let o=i[r-1];if(o.dom.parentNode==
e)return o.domAtPos(o.length)}for(let r=s;r<i.length;r++){let o=i[r];if(o.dom.parentNode==e)return o.domAtPos(0)}return new ht(
e,0)}function Ml(n,t,e){let i,{children:s}=n;e>0&&t instanceof se&&s.length&&(i=s[s.length-1])instanceof se&&i.mark.eq(t.
mark)?Ml(i,t.children[0],e-1):(s.push(t),t.setParent(n)),n.length+=t.length}function Dl(n,t,e){let i=null,s=-1,r=null,o=-1;
function l(h,f){for(let c=0,u=0;c<h.children.length&&u<=f;c++){let d=h.children[c],p=u+d.length;p>=f&&(d.children.length?
l(d,f-u):(!r||r.isHidden&&(e>0||Ef(r,d)))&&(p>f||u==p&&d.getSide()>0)?(r=d,o=f-u):(u<f||u==p&&d.getSide()<0&&!d.isHidden)&&
(i=d,s=f-u)),u=p}}l(n,t);let a=(e<0?i:r)||i||r;return a?a.coordsAt(Math.max(0,a==i?s:o),e):Tf(n)}function Tf(n){let t=n.
dom.lastChild;if(!t)return n.dom.getBoundingClientRect();let e=We(t);return e[e.length-1]||null}function Ef(n,t){let e=n.
coordsAt(0,1),i=t.coordsAt(0,1);return e&&i&&i.top<e.bottom}function Ms(n,t){for(let e in n)e=="class"&&t.class?t.class+=
" "+n.class:e=="style"&&t.style?t.style+=";"+n.style:t[e]=n[e];return t}var Ko=Object.create(null);function bn(n,t,e){if(n==
t)return!0;n||(n=Ko),t||(t=Ko);let i=Object.keys(n),s=Object.keys(t);if(i.length-(e&&i.indexOf(e)>-1?1:0)!=s.length-(e&&
s.indexOf(e)>-1?1:0))return!1;for(let r of i)if(r!=e&&(s.indexOf(r)==-1||n[r]!==t[r]))return!1;return!0}function Ds(n,t,e){
let i=!1;if(t)for(let s in t)e&&s in e||(i=!0,s=="style"?n.style.cssText="":n.removeAttribute(s));if(e)for(let s in e)t&&
t[s]==e[s]||(i=!0,s=="style"?n.style.cssText=e[s]:n.setAttribute(s,e[s]));return i}function Bf(n){let t=Object.create(null);
for(let e=0;e<n.attributes.length;e++){let i=n.attributes[e];t[i.name]=i.value}return t}var qt=class{eq(t){return!1}updateDOM(t,e){
return!1}compare(t){return this==t||this.constructor==t.constructor&&this.eq(t)}get estimatedHeight(){return-1}get lineBreaks(){
return 0}ignoreEvent(t){return!0}coordsAt(t,e,i){return null}get isHidden(){return!1}get editable(){return!1}destroy(t){}},
mt=(function(n){return n[n.Text=0]="Text",n[n.WidgetBefore=1]="WidgetBefore",n[n.WidgetAfter=2]="WidgetAfter",n[n.WidgetRange=
3]="WidgetRange",n})(mt||(mt={})),z=class extends Jt{constructor(t,e,i,s){super(),this.startSide=t,this.endSide=e,this.widget=
i,this.spec=s}get heightRelevant(){return!1}static mark(t){return new mi(t)}static widget(t){let e=Math.max(-1e4,Math.min(
1e4,t.side||0)),i=!!t.block;return e+=i&&!t.inlineOrder?e>0?3e8:-4e8:e>0?1e8:-1e8,new re(t,e,e,i,t.widget||null,!1)}static replace(t){
let e=!!t.block,i,s;if(t.isBlockGap)i=-5e8,s=4e8;else{let{start:r,end:o}=Ll(t,e);i=(r?e?-3e8:-1:5e8)-1,s=(o?e?2e8:1:-6e8)+
1}return new re(t,i,s,e,t.widget||null,!0)}static line(t){return new gi(t)}static set(t,e=!1){return Q.of(t,e)}hasHeight(){
return this.widget?this.widget.estimatedHeight>-1:!1}};z.none=Q.empty;var mi=class n extends z{constructor(t){let{start:e,
end:i}=Ll(t);super(e?-1:5e8,i?1:-6e8,null,t),this.tagName=t.tagName||"span",this.class=t.class||"",this.attrs=t.attributes||
null}eq(t){var e,i;return this==t||t instanceof n&&this.tagName==t.tagName&&(this.class||((e=this.attrs)===null||e===void 0?
void 0:e.class))==(t.class||((i=t.attrs)===null||i===void 0?void 0:i.class))&&bn(this.attrs,t.attrs,"class")}range(t,e=t){
if(t>=e)throw new RangeError("Mark decorations may not be empty");return super.range(t,e)}};mi.prototype.point=!1;var gi=class n extends z{constructor(t){
super(-2e8,-2e8,null,t)}eq(t){return t instanceof n&&this.spec.class==t.spec.class&&bn(this.spec.attributes,t.spec.attributes)}range(t,e=t){
if(e!=t)throw new RangeError("Line decoration ranges must be zero-length");return super.range(t,e)}};gi.prototype.mapMode=
ft.TrackBefore;gi.prototype.point=!0;var re=class n extends z{constructor(t,e,i,s,r,o){super(e,i,r,t),this.block=s,this.
isReplace=o,this.mapMode=s?e<=0?ft.TrackBefore:ft.TrackAfter:ft.TrackDel}get type(){return this.startSide!=this.endSide?
mt.WidgetRange:this.startSide<=0?mt.WidgetBefore:mt.WidgetAfter}get heightRelevant(){return this.block||!!this.widget&&(this.
widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(t){return t instanceof n&&Of(this.widget,t.widget)&&this.block==
t.block&&this.startSide==t.startSide&&this.endSide==t.endSide}range(t,e=t){if(this.isReplace&&(t>e||t==e&&this.startSide>
0&&this.endSide<=0))throw new RangeError("Invalid range for replacement decoration");if(!this.isReplace&&e!=t)throw new RangeError(
"Widget decorations can only have zero-length ranges");return super.range(t,e)}};re.prototype.point=!0;function Ll(n,t=!1){
let{inclusiveStart:e,inclusiveEnd:i}=n;return e==null&&(e=n.inclusive),i==null&&(i=n.inclusive),{start:e??t,end:i??t}}function Of(n,t){
return n==t||!!(n&&t&&n.compare(t))}function cn(n,t,e,i=0){let s=e.length-1;s>=0&&e[s]+i>=n?e[s]=Math.max(e[s],t):e.push(
n,t)}var nt=class n extends ${constructor(){super(...arguments),this.children=[],this.length=0,this.prevAttrs=void 0,this.
attrs=null,this.breakAfter=0}merge(t,e,i,s,r,o){if(i){if(!(i instanceof n))return!1;this.dom||i.transferDOM(this)}return s&&
this.setDeco(i?i.attrs:null),Cl(this,t,e,i?i.children.slice():[],r,o),!0}split(t){let e=new n;if(e.breakAfter=this.breakAfter,
this.length==0)return e;let{i,off:s}=this.childPos(t);s&&(e.append(this.children[i].split(s),0),this.children[i].merge(s,
this.children[i].length,null,!1,0,0),i++);for(let r=i;r<this.children.length;r++)e.append(this.children[r],0);for(;i>0&&
this.children[i-1].length==0;)this.children[--i].destroy();return this.children.length=i,this.markDirty(),this.length=t,
e}transferDOM(t){this.dom&&(this.markDirty(),t.setDOM(this.dom),t.prevAttrs=this.prevAttrs===void 0?this.attrs:this.prevAttrs,
this.prevAttrs=void 0,this.dom=null)}setDeco(t){bn(this.attrs,t)||(this.dom&&(this.prevAttrs=this.attrs,this.markDirty()),
this.attrs=t)}append(t,e){Ml(this,t,e)}addLineDeco(t){let e=t.spec.attributes,i=t.spec.class;e&&(this.attrs=Ms(e,this.attrs||
{})),i&&(this.attrs=Ms({class:i},this.attrs||{}))}domAtPos(t){return Al(this,t)}reuseDOM(t){t.nodeName=="DIV"&&(this.setDOM(
t),this.flags|=6)}sync(t,e){var i;this.dom?this.flags&4&&(kl(this.dom),this.dom.className="cm-line",this.prevAttrs=this.
attrs?null:void 0):(this.setDOM(document.createElement("div")),this.dom.className="cm-line",this.prevAttrs=this.attrs?null:
void 0),this.prevAttrs!==void 0&&(Ds(this.dom,this.prevAttrs,this.attrs),this.dom.classList.add("cm-line"),this.prevAttrs=
void 0),super.sync(t,e);let s=this.dom.lastChild;for(;s&&$.get(s)instanceof se;)s=s.lastChild;if(!s||!this.length||s.nodeName!=
"BR"&&((i=$.get(s))===null||i===void 0?void 0:i.isEditable)==!1&&(!L.ios||!this.children.some(r=>r instanceof Wt))){let r=document.
createElement("BR");r.cmIgnore=!0,this.dom.appendChild(r)}}measureTextSize(){if(this.children.length==0||this.length>20)
return null;let t=0,e;for(let i of this.children){if(!(i instanceof Wt)||/[^ -~]/.test(i.text))return null;let s=We(i.dom);
if(s.length!=1)return null;t+=s[0].width,e=s[0].height}return t?{lineHeight:this.dom.getBoundingClientRect().height,charWidth:t/
this.length,textHeight:e}:null}coordsAt(t,e){let i=Dl(this,t,e);if(!this.children.length&&i&&this.parent){let{heightOracle:s}=this.
parent.view.viewState,r=i.bottom-i.top;if(Math.abs(r-s.lineHeight)<2&&s.textHeight<r){let o=(r-s.textHeight)/2;return{top:i.
top+o,bottom:i.bottom-o,left:i.left,right:i.left}}}return i}become(t){return t instanceof n&&this.children.length==0&&t.
children.length==0&&bn(this.attrs,t.attrs)&&this.breakAfter==t.breakAfter}covers(){return!0}static find(t,e){for(let i=0,
s=0;i<t.children.length;i++){let r=t.children[i],o=s+r.length;if(o>=e){if(r instanceof n)return r;if(o>e)break}s=o+r.breakAfter}
return null}},ye=class n extends ${constructor(t,e,i){super(),this.widget=t,this.length=e,this.deco=i,this.breakAfter=0,
this.prevWidget=null}merge(t,e,i,s,r,o){return i&&(!(i instanceof n)||!this.widget.compare(i.widget)||t>0&&r<=0||e<this.
length&&o<=0)?!1:(this.length=t+(i?i.length:0)+(this.length-e),!0)}domAtPos(t){return t==0?ht.before(this.dom):ht.after(
this.dom,t==this.length)}split(t){let e=this.length-t;this.length=t;let i=new n(this.widget,e,this.deco);return i.breakAfter=
this.breakAfter,i}get children(){return tr}sync(t){(!this.dom||!this.widget.updateDOM(this.dom,t))&&(this.dom&&this.prevWidget&&
this.prevWidget.destroy(this.dom),this.prevWidget=null,this.setDOM(this.widget.toDOM(t)),this.widget.editable||(this.dom.
contentEditable="false"))}get overrideDOMText(){return this.parent?this.parent.view.state.doc.slice(this.posAtStart,this.
posAtEnd):H.empty}domBoundsAround(){return null}become(t){return t instanceof n&&t.widget.constructor==this.widget.constructor?
(t.widget.compare(this.widget)||this.markDirty(!0),this.dom&&!this.prevWidget&&(this.prevWidget=this.widget),this.widget=
t.widget,this.length=t.length,this.deco=t.deco,this.breakAfter=t.breakAfter,!0):!1}ignoreMutation(){return!0}ignoreEvent(t){
return this.widget.ignoreEvent(t)}get isEditable(){return!1}get isWidget(){return!0}coordsAt(t,e){let i=this.widget.coordsAt(
this.dom,t,e);return i||(this.widget instanceof bi?null:xi(this.dom.getBoundingClientRect(),this.length?t==0:e<=0))}destroy(){
super.destroy(),this.dom&&this.widget.destroy(this.dom)}covers(t){let{startSide:e,endSide:i}=this.deco;return e==i?!1:t<
0?e<0:i>0}},bi=class extends qt{constructor(t){super(),this.height=t}toDOM(){let t=document.createElement("div");return t.
className="cm-gap",this.updateDOM(t),t}eq(t){return t.height==this.height}updateDOM(t){return t.style.height=this.height+
"px",!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}},ai=class n{constructor(t,e,i,s){
this.doc=t,this.pos=e,this.end=i,this.disallowBlockEffectsFor=s,this.content=[],this.curLine=null,this.breakAtStart=0,this.
pendingBuffer=0,this.bufferMarks=[],this.atCursorPos=!0,this.openStart=-1,this.openEnd=-1,this.text="",this.textOff=0,this.
cursor=t.iter(),this.skip=e}posCovered(){if(this.content.length==0)return!this.breakAtStart&&this.doc.lineAt(this.pos).from!=
this.pos;let t=this.content[this.content.length-1];return!(t.breakAfter||t instanceof ye&&t.deco.endSide<0)}getLine(){return this.
curLine||(this.content.push(this.curLine=new nt),this.atCursorPos=!0),this.curLine}flushBuffer(t=this.bufferMarks){this.
pendingBuffer&&(this.curLine.append(en(new pi(-1),t),t.length),this.pendingBuffer=0)}addBlockWidget(t){this.flushBuffer(),
this.curLine=null,this.content.push(t)}finish(t){this.pendingBuffer&&t<=this.bufferMarks.length?this.flushBuffer():this.
pendingBuffer=0,!this.posCovered()&&!(t&&this.content.length&&this.content[this.content.length-1]instanceof ye)&&this.getLine()}buildText(t,e,i){
for(;t>0;){if(this.textOff==this.text.length){let{value:o,lineBreak:l,done:a}=this.cursor.next(this.skip);if(this.skip=0,
a)throw new Error("Ran out of text content when drawing inline views");if(l){this.posCovered()||this.getLine(),this.content.
length?this.content[this.content.length-1].breakAfter=1:this.breakAtStart=1,this.flushBuffer(),this.curLine=null,this.atCursorPos=
!0,t--;continue}else this.text=o,this.textOff=0}let s=Math.min(this.text.length-this.textOff,t),r=Math.min(s,512);this.flushBuffer(
e.slice(e.length-i)),this.getLine().append(en(new Wt(this.text.slice(this.textOff,this.textOff+r)),e),i),this.atCursorPos=
!0,this.textOff+=r,t-=r,i=s<=r?0:e.length}}span(t,e,i,s){this.buildText(e-t,i,s),this.pos=e,this.openStart<0&&(this.openStart=
s)}point(t,e,i,s,r,o){if(this.disallowBlockEffectsFor[o]&&i instanceof re){if(i.block)throw new RangeError("Block decora\
tions may not be specified via plugins");if(e>this.doc.lineAt(this.pos).to)throw new RangeError("Decorations that replac\
e line breaks may not be specified via plugins")}let l=e-t;if(i instanceof re)if(i.block)i.startSide>0&&!this.posCovered()&&
this.getLine(),this.addBlockWidget(new ye(i.widget||oe.block,l,i));else{let a=gn.create(i.widget||oe.inline,l,l?0:i.startSide),
h=this.atCursorPos&&!a.isEditable&&r<=s.length&&(t<e||i.startSide>0),f=!a.isEditable&&(t<e||r>s.length||i.startSide<=0),
c=this.getLine();this.pendingBuffer==2&&!h&&!a.isEditable&&(this.pendingBuffer=0),this.flushBuffer(s),h&&(c.append(en(new pi(
1),s),r),r=s.length+Math.max(0,r-s.length)),c.append(en(a,s),r),this.atCursorPos=f,this.pendingBuffer=f?t<e||r>s.length?
1:2:0,this.pendingBuffer&&(this.bufferMarks=s.slice())}else this.doc.lineAt(this.pos).from==this.pos&&this.getLine().addLineDeco(
i);l&&(this.textOff+l<=this.text.length?this.textOff+=l:(this.skip+=l-(this.text.length-this.textOff),this.text="",this.
textOff=0),this.pos=e),this.openStart<0&&(this.openStart=r)}static build(t,e,i,s,r){let o=new n(t,e,i,r);return o.openEnd=
Q.spans(s,e,i,o),o.openStart<0&&(o.openStart=o.openEnd),o.finish(o.openEnd),o}};function en(n,t){for(let e of t)n=new se(
e,[n],n.length);return n}var oe=class extends qt{constructor(t){super(),this.tag=t}eq(t){return t.tag==this.tag}toDOM(){
return document.createElement(this.tag)}updateDOM(t){return t.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}};
oe.inline=new oe("span");oe.block=new oe("div");var X=(function(n){return n[n.LTR=0]="LTR",n[n.RTL=1]="RTL",n})(X||(X={})),
xe=X.LTR,er=X.RTL;function Tl(n){let t=[];for(let e=0;e<n.length;e++)t.push(1<<+n[e]);return t}var Pf=Tl("88888888888888\
888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888\
888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),Rf=Tl(
"44444488266272889999999999922222222222222222222222222222222222222222222222299999999999999999999944444444446442228222222\
222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222229999999499999992299899992\
23333333333"),Ls=Object.create(null),Nt=[];for(let n of["()","[]","{}"]){let t=n.charCodeAt(0),e=n.charCodeAt(1);Ls[t]=e,
Ls[e]=-t}function El(n){return n<=247?Pf[n]:1424<=n&&n<=1524?2:1536<=n&&n<=1785?Rf[n-1536]:1774<=n&&n<=2220?4:8192<=n&&n<=
8204?256:64336<=n&&n<=65023?4:1}var If=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/,Ft=class{get dir(){return this.
level%2?er:xe}constructor(t,e,i){this.from=t,this.to=e,this.level=i}side(t,e){return this.dir==e==t?this.to:this.from}forward(t,e){
return t==(this.dir==e)}static find(t,e,i,s){let r=-1;for(let o=0;o<t.length;o++){let l=t[o];if(l.from<=e&&l.to>=e){if(l.
level==i)return o;(r<0||(s!=0?s<0?l.from<e:l.to>e:t[r].level>l.level))&&(r=o)}}if(r<0)throw new RangeError("Index out of\
 range");return r}};function Bl(n,t){if(n.length!=t.length)return!1;for(let e=0;e<n.length;e++){let i=n[e],s=t[e];if(i.from!=
s.from||i.to!=s.to||i.direction!=s.direction||!Bl(i.inner,s.inner))return!1}return!0}var K=[];function Nf(n,t,e,i,s){for(let r=0;r<=
i.length;r++){let o=r?i[r-1].to:t,l=r<i.length?i[r].from:e,a=r?256:s;for(let h=o,f=a,c=a;h<l;h++){let u=El(n.charCodeAt(
h));u==512?u=f:u==8&&c==4&&(u=16),K[h]=u==4?2:u,u&7&&(c=u),f=u}for(let h=o,f=a,c=a;h<l;h++){let u=K[h];if(u==128)h<l-1&&
f==K[h+1]&&f&24?u=K[h]=f:K[h]=256;else if(u==64){let d=h+1;for(;d<l&&K[d]==64;)d++;let p=h&&f==8||d<e&&K[d]==8?c==1?1:8:
256;for(let m=h;m<d;m++)K[m]=p;h=d-1}else u==8&&c==1&&(K[h]=1);f=u,u&7&&(c=u)}}}function Hf(n,t,e,i,s){let r=s==1?2:1;for(let o=0,
l=0,a=0;o<=i.length;o++){let h=o?i[o-1].to:t,f=o<i.length?i[o].from:e;for(let c=h,u,d,p;c<f;c++)if(d=Ls[u=n.charCodeAt(c)])
if(d<0){for(let m=l-3;m>=0;m-=3)if(Nt[m+1]==-d){let g=Nt[m+2],y=g&2?s:g&4?g&1?r:s:0;y&&(K[c]=K[Nt[m]]=y),l=m;break}}else{
if(Nt.length==189)break;Nt[l++]=c,Nt[l++]=u,Nt[l++]=a}else if((p=K[c])==2||p==1){let m=p==s;a=m?0:1;for(let g=l-3;g>=0;g-=
3){let y=Nt[g+2];if(y&2)break;if(m)Nt[g+2]|=2;else{if(y&4)break;Nt[g+2]|=4}}}}}function Ff(n,t,e,i){for(let s=0,r=i;s<=e.
length;s++){let o=s?e[s-1].to:n,l=s<e.length?e[s].from:t;for(let a=o;a<l;){let h=K[a];if(h==256){let f=a+1;for(;;)if(f==
l){if(s==e.length)break;f=e[s++].to,l=s<e.length?e[s].from:t}else if(K[f]==256)f++;else break;let c=r==1,u=(f<t?K[f]:i)==
1,d=c==u?c?1:2:i;for(let p=f,m=s,g=m?e[m-1].to:n;p>a;)p==g&&(p=e[--m].from,g=m?e[m-1].to:n),K[--p]=d;a=f}else r=h,a++}}}
function Ts(n,t,e,i,s,r,o){let l=i%2?2:1;if(i%2==s%2)for(let a=t,h=0;a<e;){let f=!0,c=!1;if(h==r.length||a<r[h].from){let m=K[a];
m!=l&&(f=!1,c=m==16)}let u=!f&&l==1?[]:null,d=f?i:i+1,p=a;t:for(;;)if(h<r.length&&p==r[h].from){if(c)break t;let m=r[h];
if(!f)for(let g=m.to,y=h+1;;){if(g==e)break t;if(y<r.length&&r[y].from==g)g=r[y++].to;else{if(K[g]==l)break t;break}}if(h++,
u)u.push(m);else{m.from>a&&o.push(new Ft(a,m.from,d));let g=m.direction==xe!=!(d%2);Es(n,g?i+1:i,s,m.inner,m.from,m.to,o),
a=m.to}p=m.to}else{if(p==e||(f?K[p]!=l:K[p]==l))break;p++}u?Ts(n,a,p,i+1,s,u,o):a<p&&o.push(new Ft(a,p,d)),a=p}else for(let a=e,
h=r.length;a>t;){let f=!0,c=!1;if(!h||a>r[h-1].to){let m=K[a-1];m!=l&&(f=!1,c=m==16)}let u=!f&&l==1?[]:null,d=f?i:i+1,p=a;
t:for(;;)if(h&&p==r[h-1].to){if(c)break t;let m=r[--h];if(!f)for(let g=m.from,y=h;;){if(g==t)break t;if(y&&r[y-1].to==g)
g=r[--y].from;else{if(K[g-1]==l)break t;break}}if(u)u.push(m);else{m.to<a&&o.push(new Ft(m.to,a,d));let g=m.direction==xe!=
!(d%2);Es(n,g?i+1:i,s,m.inner,m.from,m.to,o),a=m.from}p=m.from}else{if(p==t||(f?K[p-1]!=l:K[p-1]==l))break;p--}u?Ts(n,p,
a,i+1,s,u,o):p<a&&o.push(new Ft(p,a,d)),a=p}}function Es(n,t,e,i,s,r,o){let l=t%2?2:1;Nf(n,s,r,i,l),Hf(n,s,r,i,l),Ff(s,r,
i,l),Ts(n,s,r,t,e,i,o)}function Vf(n,t,e){if(!n)return[new Ft(0,0,t==er?1:0)];if(t==xe&&!e.length&&!If.test(n))return Ol(
n.length);if(e.length)for(;n.length>K.length;)K[K.length]=256;let i=[],s=t==xe?0:1;return Es(n,s,s,e,0,n.length,i),i}function Ol(n){
return[new Ft(0,n,0)]}var Pl="";function zf(n,t,e,i,s){var r;let o=i.head-n.from,l=Ft.find(t,o,(r=i.bidiLevel)!==null&&r!==
void 0?r:-1,i.assoc),a=t[l],h=a.side(s,e);if(o==h){let u=l+=s?1:-1;if(u<0||u>=t.length)return null;a=t[l=u],o=a.side(!s,
e),h=a.side(s,e)}let f=it(n.text,o,a.forward(s,e));(f<a.from||f>a.to)&&(f=h),Pl=n.text.slice(Math.min(o,f),Math.max(o,f));
let c=l==(s?t.length-1:0)?null:t[l+(s?1:-1)];return c&&f==h&&c.level+(s?0:1)<a.level?C.cursor(c.side(!s,e)+n.from,c.forward(
s,e)?1:-1,c.level):C.cursor(f+n.from,a.forward(s,e)?-1:1,a.level)}function Wf(n,t,e){for(let i=t;i<e;i++){let s=El(n.charCodeAt(
i));if(s==1)return xe;if(s==2||s==4)return er}return xe}var Rl=E.define(),Il=E.define(),Nl=E.define(),Hl=E.define(),Bs=E.
define(),Fl=E.define(),Vl=E.define(),ir=E.define(),nr=E.define(),zl=E.define({combine:n=>n.some(t=>t)}),Wl=E.define({combine:n=>n.
some(t=>t)}),ql=E.define(),hi=class n{constructor(t,e="nearest",i="nearest",s=5,r=5,o=!1){this.range=t,this.y=e,this.x=i,
this.yMargin=s,this.xMargin=r,this.isSnapshot=o}map(t){return t.empty?this:new n(this.range.map(t),this.y,this.x,this.yMargin,
this.xMargin,this.isSnapshot)}clip(t){return this.range.to<=t.doc.length?this:new n(C.cursor(t.doc.length),this.y,this.x,
this.yMargin,this.xMargin,this.isSnapshot)}},nn=q.define({map:(n,t)=>n.map(t)}),Kl=q.define();function Tt(n,t,e){let i=n.
facet(Hl);i.length?i[0](t):window.onerror&&window.onerror(String(t),e,void 0,void 0,t)||(e?console.error(e+":",t):console.
error(t))}var Qt=E.define({combine:n=>n.length?n[0]:!0}),qf=0,Fe=E.define({combine(n){return n.filter((t,e)=>{for(let i=0;i<
e;i++)if(n[i].plugin==t.plugin)return!1;return!0})}}),Kt=class n{constructor(t,e,i,s,r){this.id=t,this.create=e,this.domEventHandlers=
i,this.domEventObservers=s,this.baseExtensions=r(this),this.extension=this.baseExtensions.concat(Fe.of({plugin:this,arg:void 0}))}of(t){
return this.baseExtensions.concat(Fe.of({plugin:this,arg:t}))}static define(t,e){let{eventHandlers:i,eventObservers:s,provide:r,
decorations:o}=e||{};return new n(qf++,t,i,s,l=>{let a=[];return o&&a.push(yi.of(h=>{let f=h.plugin(l);return f?o(f):z.none})),
r&&a.push(r(l)),a})}static fromClass(t,e){return n.define((i,s)=>new t(i,s),e)}},fi=class{constructor(t){this.spec=t,this.
mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(t){if(this.value){if(this.mustUpdate){
let e=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(e)}catch(i){if(Tt(e.state,i,"CodeM\
irror plugin crashed"),this.value.destroy)try{this.value.destroy()}catch{}this.deactivate()}}}else if(this.spec)try{this.
value=this.spec.plugin.create(t,this.spec.arg)}catch(e){Tt(t.state,e,"CodeMirror plugin crashed"),this.deactivate()}return this}destroy(t){
var e;if(!((e=this.value)===null||e===void 0)&&e.destroy)try{this.value.destroy()}catch(i){Tt(t.state,i,"CodeMirror plug\
in crashed")}}deactivate(){this.spec=this.value=null}},$l=E.define(),sr=E.define(),yi=E.define(),jl=E.define(),Si=E.define(),
Ul=E.define();function $o(n,t){let e=n.state.facet(Ul);if(!e.length)return e;let i=e.map(r=>r instanceof Function?r(n):r),
s=[];return Q.spans(i,t.from,t.to,{point(){},span(r,o,l,a){let h=r-t.from,f=o-t.from,c=s;for(let u=l.length-1;u>=0;u--,a--){
let d=l[u].spec.bidiIsolate,p;if(d==null&&(d=Wf(t.text,h,f)),a>0&&c.length&&(p=c[c.length-1]).to==h&&p.direction==d)p.to=
f,c=p.inner;else{let m={from:h,to:f,direction:d,inner:[]};c.push(m),c=m.inner}}}}),s}var _l=E.define();function Gl(n){let t=0,
e=0,i=0,s=0;for(let r of n.state.facet(_l)){let o=r(n);o&&(o.left!=null&&(t=Math.max(t,o.left)),o.right!=null&&(e=Math.max(
e,o.right)),o.top!=null&&(i=Math.max(i,o.top)),o.bottom!=null&&(s=Math.max(s,o.bottom)))}return{left:t,right:e,top:i,bottom:s}}
var si=E.define(),Vt=class n{constructor(t,e,i,s){this.fromA=t,this.toA=e,this.fromB=i,this.toB=s}join(t){return new n(Math.
min(this.fromA,t.fromA),Math.max(this.toA,t.toA),Math.min(this.fromB,t.fromB),Math.max(this.toB,t.toB))}addToSet(t){let e=t.
length,i=this;for(;e>0;e--){let s=t[e-1];if(!(s.fromA>i.toA)){if(s.toA<i.fromA)break;i=i.join(s),t.splice(e-1,1)}}return t.
splice(e,0,i),t}static extendWithRanges(t,e){if(e.length==0)return t;let i=[];for(let s=0,r=0,o=0,l=0;;s++){let a=s==t.length?
null:t[s],h=o-l,f=a?a.fromB:1e9;for(;r<e.length&&e[r]<f;){let c=e[r],u=e[r+1],d=Math.max(l,c),p=Math.min(f,u);if(d<=p&&new n(
d+h,p+h,d,p).addToSet(i),u>f)break;r+=2}if(!a)return i;new n(a.fromA,a.toA,a.fromB,a.toB).addToSet(i),o=a.toA,l=a.toB}}},
yn=class n{constructor(t,e,i){this.view=t,this.state=e,this.transactions=i,this.flags=0,this.startState=t.state,this.changes=
lt.empty(this.startState.doc.length);for(let r of i)this.changes=this.changes.compose(r.changes);let s=[];this.changes.iterChangedRanges(
(r,o,l,a)=>s.push(new Vt(r,o,l,a))),this.changedRanges=s}static create(t,e,i){return new n(t,e,i)}get viewportChanged(){
return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){
return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.
empty}get selectionSet(){return this.transactions.some(t=>t.selection)}get empty(){return this.flags==0&&this.transactions.
length==0}},kn=class extends ${get length(){return this.view.state.doc.length}constructor(t){super(),this.view=t,this.decorations=
[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.markedForComposition=new Set,this.editContextFormatting=
z.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,
this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.setDOM(t.contentDOM),this.children=[new nt],
this.children[0].setParent(this),this.updateDeco(),this.updateInner([new Vt(0,0,0,t.state.doc.length)],0,null)}update(t){
var e;let i=t.changedRanges;this.minWidth>0&&i.length&&(i.every(({fromA:h,toA:f})=>f<this.minWidthFrom||h>this.minWidthTo)?
(this.minWidthFrom=t.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=t.changes.mapPos(this.minWidthTo,1)):this.minWidth=
this.minWidthFrom=this.minWidthTo=0),this.updateEditContextFormatting(t);let s=-1;this.view.inputState.composing>=0&&!this.
view.observer.editContext&&(!((e=this.domChanged)===null||e===void 0)&&e.newSel?s=this.domChanged.newSel.head:!Xf(t.changes,
this.hasComposition)&&!t.selectionSet&&(s=t.state.selection.main.head));let r=s>-1?$f(this.view,t.changes,s):null;if(this.
domChanged=null,this.hasComposition){this.markedForComposition.clear();let{from:h,to:f}=this.hasComposition;i=new Vt(h,f,
t.changes.mapPos(h,-1),t.changes.mapPos(f,1)).addToSet(i.slice())}this.hasComposition=r?{from:r.range.fromB,to:r.range.toB}:
null,(L.ie||L.chrome)&&!r&&t&&t.state.doc.lines!=t.startState.doc.lines&&(this.forceSelection=!0);let o=this.decorations,
l=this.updateDeco(),a=_f(o,l,t.changes);return i=Vt.extendWithRanges(i,a),!(this.flags&7)&&i.length==0?!1:(this.updateInner(
i,t.startState.doc.length,r),t.transactions.length&&(this.lastUpdate=Date.now()),!0)}updateInner(t,e,i){this.view.viewState.
mustMeasureContent=!0,this.updateChildren(t,e,i);let{observer:s}=this.view;s.ignore(()=>{this.dom.style.height=this.view.
viewState.contentHeight/this.view.scaleY+"px",this.dom.style.flexBasis=this.minWidth?this.minWidth+"px":"";let o=L.chrome||
L.ios?{node:s.selectionRange.focusNode,written:!1}:void 0;this.sync(this.view,o),this.flags&=-8,o&&(o.written||s.selectionRange.
focusNode!=o.node)&&(this.forceSelection=!0),this.dom.style.height=""}),this.markedForComposition.forEach(o=>o.flags&=-9);
let r=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length)for(let o of this.children)o instanceof
ye&&o.widget instanceof bi&&r.push(o.dom);s.updateGaps(r)}updateChildren(t,e,i){let s=i?i.range.addToSet(t.slice()):t,r=this.
childCursor(e);for(let o=s.length-1;;o--){let l=o>=0?s[o]:null;if(!l)break;let{fromA:a,toA:h,fromB:f,toB:c}=l,u,d,p,m;if(i&&
i.range.fromB<c&&i.range.toB>f){let k=ai.build(this.view.state.doc,f,i.range.fromB,this.decorations,this.dynamicDecorationMap),
b=ai.build(this.view.state.doc,i.range.toB,c,this.decorations,this.dynamicDecorationMap);d=k.breakAtStart,p=k.openStart,
m=b.openEnd;let w=this.compositionView(i);b.breakAtStart?w.breakAfter=1:b.content.length&&w.merge(w.length,w.length,b.content[0],
!1,b.openStart,0)&&(w.breakAfter=b.content[0].breakAfter,b.content.shift()),k.content.length&&w.merge(0,0,k.content[k.content.
length-1],!0,0,k.openEnd)&&k.content.pop(),u=k.content.concat(w).concat(b.content)}else({content:u,breakAtStart:d,openStart:p,
openEnd:m}=ai.build(this.view.state.doc,f,c,this.decorations,this.dynamicDecorationMap));let{i:g,off:y}=r.findPos(h,1),{
i:v,off:A}=r.findPos(a,-1);vl(this,v,A,g,y,u,d,p,m)}i&&this.fixCompositionDOM(i)}updateEditContextFormatting(t){this.editContextFormatting=
this.editContextFormatting.map(t.changes);for(let e of t.transactions)for(let i of e.effects)i.is(Kl)&&(this.editContextFormatting=
i.value)}compositionView(t){let e=new Wt(t.text.nodeValue);e.flags|=8;for(let{deco:s}of t.marks)e=new se(s,[e],e.length);
let i=new nt;return i.append(e,0),i}fixCompositionDOM(t){let e=(r,o)=>{o.flags|=8|(o.children.some(a=>a.flags&7)?1:0),this.
markedForComposition.add(o);let l=$.get(r);l&&l!=o&&(l.dom=null),o.setDOM(r)},i=this.childPos(t.range.fromB,1),s=this.children[i.
i];e(t.line,s);for(let r=t.marks.length-1;r>=-1;r--)i=s.childPos(i.off,1),s=s.children[i.i],e(r>=0?t.marks[r].node:t.text,
s)}updateSelection(t=!1,e=!1){(t||!this.view.observer.selectionRange.focusNode)&&this.view.observer.readSelectionRange();
let i=this.view.root.activeElement,s=i==this.dom,r=!s&&!(this.view.state.facet(Qt)||this.dom.tabIndex>-1)&&fn(this.dom,this.
view.observer.selectionRange)&&!(i&&this.dom.contains(i));if(!(s||e||r))return;let o=this.forceSelection;this.forceSelection=
!1;let l=this.view.state.selection.main,a=this.moveToLine(this.domAtPos(l.anchor)),h=l.empty?a:this.moveToLine(this.domAtPos(
l.head));if(L.gecko&&l.empty&&!this.hasComposition&&Kf(a)){let c=document.createTextNode("");this.view.observer.ignore(()=>a.
node.insertBefore(c,a.node.childNodes[a.offset]||null)),a=h=new ht(c,0),o=!0}let f=this.view.observer.selectionRange;(o||
!f.focusNode||(!li(a.node,a.offset,f.anchorNode,f.anchorOffset)||!li(h.node,h.offset,f.focusNode,f.focusOffset))&&!this.
suppressWidgetCursorChange(f,l))&&(this.view.observer.ignore(()=>{L.android&&L.chrome&&this.dom.contains(f.focusNode)&&Gf(
f.focusNode,this.dom)&&(this.dom.blur(),this.dom.focus({preventScroll:!0}));let c=di(this.view.root);if(c)if(l.empty){if(L.
gecko){let u=jf(a.node,a.offset);if(u&&u!=3){let d=(u==1?xl:Sl)(a.node,a.offset);d&&(a=new ht(d.node,d.offset))}}c.collapse(
a.node,a.offset),l.bidiLevel!=null&&c.caretBidiLevel!==void 0&&(c.caretBidiLevel=l.bidiLevel)}else if(c.extend){c.collapse(
a.node,a.offset);try{c.extend(h.node,h.offset)}catch{}}else{let u=document.createRange();l.anchor>l.head&&([a,h]=[h,a]),
u.setEnd(h.node,h.offset),u.setStart(a.node,a.offset),c.removeAllRanges(),c.addRange(u)}r&&this.view.root.activeElement==
this.dom&&(this.dom.blur(),i&&i.focus())}),this.view.observer.setSelectionRange(a,h)),this.impreciseAnchor=a.precise?null:
new ht(f.anchorNode,f.anchorOffset),this.impreciseHead=h.precise?null:new ht(f.focusNode,f.focusOffset)}suppressWidgetCursorChange(t,e){
return this.hasComposition&&e.empty&&li(t.focusNode,t.focusOffset,t.anchorNode,t.anchorOffset)&&this.posFromDOM(t.focusNode,
t.focusOffset)==e.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:t}=this,e=t.state.selection.main,i=di(
t.root),{anchorNode:s,anchorOffset:r}=t.observer.selectionRange;if(!i||!e.empty||!e.assoc||!i.modify)return;let o=nt.find(
this,e.head);if(!o)return;let l=o.posAtStart;if(e.head==l||e.head==l+o.length)return;let a=this.coordsAt(e.head,-1),h=this.
coordsAt(e.head,1);if(!a||!h||a.bottom>h.top)return;let f=this.domAtPos(e.head+e.assoc);i.collapse(f.node,f.offset),i.modify(
"move",e.assoc<0?"forward":"backward","lineboundary"),t.observer.readSelectionRange();let c=t.observer.selectionRange;t.
docView.posFromDOM(c.anchorNode,c.anchorOffset)!=e.from&&i.collapse(s,r)}moveToLine(t){let e=this.dom,i;if(t.node!=e)return t;
for(let s=t.offset;!i&&s<e.childNodes.length;s++){let r=$.get(e.childNodes[s]);r instanceof nt&&(i=r.domAtPos(0))}for(let s=t.
offset-1;!i&&s>=0;s--){let r=$.get(e.childNodes[s]);r instanceof nt&&(i=r.domAtPos(r.length))}return i?new ht(i.node,i.offset,
!0):t}nearest(t){for(let e=t;e;){let i=$.get(e);if(i&&i.rootView==this)return i;e=e.parentNode}return null}posFromDOM(t,e){
let i=this.nearest(t);if(!i)throw new RangeError("Trying to find position for a DOM position outside of the document");return i.
localPosFromDOM(t,e)+i.posAtStart}domAtPos(t){let{i:e,off:i}=this.childCursor().findPos(t,-1);for(;e<this.children.length-
1;){let s=this.children[e];if(i<s.length||s instanceof nt)break;e++,i=0}return this.children[e].domAtPos(i)}coordsAt(t,e){
let i=null,s=0;for(let r=this.length,o=this.children.length-1;o>=0;o--){let l=this.children[o],a=r-l.breakAfter,h=a-l.length;
if(a<t)break;if(h<=t&&(h<t||l.covers(-1))&&(a>t||l.covers(1))&&(!i||l instanceof nt&&!(i instanceof nt&&e>=0)))i=l,s=h;else if(i&&
h==t&&a==t&&l instanceof ye&&Math.abs(e)<2){if(l.deco.startSide<0)break;o&&(i=null)}r=h}return i?i.coordsAt(t-s,e):null}coordsForChar(t){
let{i:e,off:i}=this.childPos(t,1),s=this.children[e];if(!(s instanceof nt))return null;for(;s.children.length;){let{i:l,
off:a}=s.childPos(i,1);for(;;l++){if(l==s.children.length)return null;if((s=s.children[l]).length)break}i=a}if(!(s instanceof
Wt))return null;let r=it(s.text,i);if(r==i)return null;let o=we(s.dom,i,r).getClientRects();for(let l=0;l<o.length;l++){
let a=o[l];if(l==o.length-1||a.top<a.bottom&&a.left<a.right)return a}return null}measureVisibleLineHeights(t){let e=[],{
from:i,to:s}=t,r=this.view.contentDOM.clientWidth,o=r>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,l=-1,a=this.
view.textDirection==X.LTR;for(let h=0,f=0;f<this.children.length;f++){let c=this.children[f],u=h+c.length;if(u>s)break;if(h>=
i){let d=c.dom.getBoundingClientRect();if(e.push(d.height),o){let p=c.dom.lastChild,m=p?We(p):[];if(m.length){let g=m[m.
length-1],y=a?g.right-d.left:d.right-g.left;y>l&&(l=y,this.minWidth=r,this.minWidthFrom=h,this.minWidthTo=u)}}}h=u+c.breakAfter}
return e}textDirectionAt(t){let{i:e}=this.childPos(t,1);return getComputedStyle(this.children[e].dom).direction=="rtl"?X.
RTL:X.LTR}measureTextSize(){for(let r of this.children)if(r instanceof nt){let o=r.measureTextSize();if(o)return o}let t=document.
createElement("div"),e,i,s;return t.className="cm-line",t.style.width="99999px",t.style.position="absolute",t.textContent=
"abc def ghi jkl mno pqr stu",this.view.observer.ignore(()=>{this.dom.appendChild(t);let r=We(t.firstChild)[0];e=t.getBoundingClientRect().
height,i=r?r.width/27:7,s=r?r.height:e,t.remove()}),{lineHeight:e,charWidth:i,textHeight:s}}childCursor(t=this.length){let e=this.
children.length;return e&&(t-=this.children[--e].length),new mn(this.children,t,e)}computeBlockGapDeco(){let t=[],e=this.
view.viewState;for(let i=0,s=0;;s++){let r=s==e.viewports.length?null:e.viewports[s],o=r?r.from-1:this.length;if(o>i){let l=(e.
lineBlockAt(o).bottom-e.lineBlockAt(i).top)/this.view.scaleY;t.push(z.replace({widget:new bi(l),block:!0,inclusive:!0,isBlockGap:!0}).
range(i,o))}if(!r)break;i=r.to+1}return z.set(t)}updateDeco(){let t=1,e=this.view.state.facet(yi).map(r=>(this.dynamicDecorationMap[t++]=
typeof r=="function")?r(this.view):r),i=!1,s=this.view.state.facet(jl).map((r,o)=>{let l=typeof r=="function";return l&&
(i=!0),l?r(this.view):r});for(s.length&&(this.dynamicDecorationMap[t++]=i,e.push(Q.join(s))),this.decorations=[this.editContextFormatting,
...e,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];t<this.decorations.length;)this.dynamicDecorationMap[t++]=
!1;return this.decorations}scrollIntoView(t){if(t.isSnapshot){let h=this.view.viewState.lineBlockAt(t.range.head);this.view.
scrollDOM.scrollTop=h.top-t.yMargin,this.view.scrollDOM.scrollLeft=t.xMargin;return}for(let h of this.view.state.facet(ql))
try{if(h(this.view,t.range,t))return!0}catch(f){Tt(this.view.state,f,"scroll handler")}let{range:e}=t,i=this.coordsAt(e.
head,e.empty?e.assoc:e.head>e.anchor?-1:1),s;if(!i)return;!e.empty&&(s=this.coordsAt(e.anchor,e.anchor>e.head?-1:1))&&(i=
{left:Math.min(i.left,s.left),top:Math.min(i.top,s.top),right:Math.max(i.right,s.right),bottom:Math.max(i.bottom,s.bottom)});
let r=Gl(this.view),o={left:i.left-r.left,top:i.top-r.top,right:i.right+r.right,bottom:i.bottom+r.bottom},{offsetWidth:l,
offsetHeight:a}=this.view.scrollDOM;vf(this.view.scrollDOM,o,e.head<e.anchor?-1:1,t.x,t.y,Math.max(Math.min(t.xMargin,l),
-l),Math.max(Math.min(t.yMargin,a),-a),this.view.textDirection==X.LTR)}};function Kf(n){return n.node.nodeType==1&&n.node.
firstChild&&(n.offset==0||n.node.childNodes[n.offset-1].contentEditable=="false")&&(n.offset==n.node.childNodes.length||
n.node.childNodes[n.offset].contentEditable=="false")}function Xl(n,t){let e=n.observer.selectionRange;if(!e.focusNode)return null;
let i=xl(e.focusNode,e.focusOffset),s=Sl(e.focusNode,e.focusOffset),r=i||s;if(s&&i&&s.node!=i.node){let l=$.get(s.node);
if(!l||l instanceof Wt&&l.text!=s.node.nodeValue)r=s;else if(n.docView.lastCompositionAfterCursor){let a=$.get(i.node);!a||
a instanceof Wt&&a.text!=i.node.nodeValue||(r=s)}}if(n.docView.lastCompositionAfterCursor=r!=i,!r)return null;let o=t-r.
offset;return{from:o,to:o+r.node.nodeValue.length,node:r.node}}function $f(n,t,e){let i=Xl(n,e);if(!i)return null;let{node:s,
from:r,to:o}=i,l=s.nodeValue;if(/[\n\r]/.test(l)||n.state.doc.sliceString(i.from,i.to)!=l)return null;let a=t.invertedDesc,
h=new Vt(a.mapPos(r),a.mapPos(o),r,o),f=[];for(let c=s.parentNode;;c=c.parentNode){let u=$.get(c);if(u instanceof se)f.push(
{node:c,deco:u.mark});else{if(u instanceof nt||c.nodeName=="DIV"&&c.parentNode==n.contentDOM)return{range:h,text:s,marks:f,
line:c};if(c!=n.contentDOM)f.push({node:c,deco:new mi({inclusive:!0,attributes:Bf(c),tagName:c.tagName.toLowerCase()})});else
return null}}}function jf(n,t){return n.nodeType!=1?0:(t&&n.childNodes[t-1].contentEditable=="false"?1:0)|(t<n.childNodes.
length&&n.childNodes[t].contentEditable=="false"?2:0)}var Uf=class{constructor(){this.changes=[]}compareRange(t,e){cn(t,
e,this.changes)}comparePoint(t,e){cn(t,e,this.changes)}boundChange(t){cn(t,t,this.changes)}};function _f(n,t,e){let i=new Uf;
return Q.compare(n,t,e,i),i.changes}function Gf(n,t){for(let e=n;e&&e!=t;e=e.assignedSlot||e.parentNode)if(e.nodeType==1&&
e.contentEditable=="false")return!0;return!1}function Xf(n,t){let e=!1;return t&&n.iterChangedRanges((i,s)=>{i<t.to&&s>t.
from&&(e=!0)}),e}function Jf(n,t,e=1){let i=n.charCategorizer(t),s=n.doc.lineAt(t),r=t-s.from;if(s.length==0)return C.cursor(
t);r==0?e=1:r==s.length&&(e=-1);let o=r,l=r;e<0?o=it(s.text,r,!1):l=it(s.text,r);let a=i(s.text.slice(o,l));for(;o>0;){let h=it(
s.text,o,!1);if(i(s.text.slice(h,o))!=a)break;o=h}for(;l<s.length;){let h=it(s.text,l);if(i(s.text.slice(l,h))!=a)break;
l=h}return C.range(o+s.from,l+s.from)}function Yf(n,t){return t.left>n?t.left-n:Math.max(0,n-t.right)}function Qf(n,t){return t.
top>n?t.top-n:Math.max(0,n-t.bottom)}function bs(n,t){return n.top<t.bottom-1&&n.bottom>t.top+1}function jo(n,t){return t<
n.top?{top:t,left:n.left,right:n.right,bottom:n.bottom}:n}function Uo(n,t){return t>n.bottom?{top:n.top,left:n.left,right:n.
right,bottom:t}:n}function Os(n,t,e){let i,s,r,o,l=!1,a,h,f,c;for(let p=n.firstChild;p;p=p.nextSibling){let m=We(p);for(let g=0;g<
m.length;g++){let y=m[g];s&&bs(s,y)&&(y=jo(Uo(y,s.bottom),s.top));let v=Yf(t,y),A=Qf(e,y);if(v==0&&A==0)return p.nodeType==
3?_o(p,t,e):Os(p,t,e);(!i||o>A||o==A&&r>v)&&(i=p,s=y,r=v,o=A,l=v?t<y.left?g>0:g<m.length-1:!0),v==0?e>y.bottom&&(!f||f.bottom<
y.bottom)?(a=p,f=y):e<y.top&&(!c||c.top>y.top)&&(h=p,c=y):f&&bs(f,y)?f=Uo(f,y.bottom):c&&bs(c,y)&&(c=jo(c,y.top))}}if(f&&
f.bottom>=e?(i=a,s=f):c&&c.top<=e&&(i=h,s=c),!i)return{node:n,offset:0};let u=Math.max(s.left,Math.min(s.right,t));if(i.
nodeType==3)return _o(i,u,e);if(l&&i.contentEditable!="false")return Os(i,u,e);let d=Array.prototype.indexOf.call(n.childNodes,
i)+(t>=(s.left+s.right)/2?1:0);return{node:n,offset:d}}function _o(n,t,e){let i=n.nodeValue.length,s=-1,r=1e9,o=0;for(let l=0;l<
i;l++){let a=we(n,l,l+1).getClientRects();for(let h=0;h<a.length;h++){let f=a[h];if(f.top==f.bottom)continue;o||(o=t-f.left);
let c=(f.top>e?f.top-e:e-f.bottom)-1;if(f.left-1<=t&&f.right+1>=t&&c<r){let u=t>=(f.left+f.right)/2,d=u;if((L.chrome||L.
gecko)&&we(n,l).getBoundingClientRect().left==f.right&&(d=!u),c<=0)return{node:n,offset:l+(d?1:0)};s=l+(d?1:0),r=c}}}return{
node:n,offset:s>-1?s:o>0?n.nodeValue.length:0}}function Jl(n,t,e,i=-1){var s,r;let o=n.contentDOM.getBoundingClientRect(),
l=o.top+n.viewState.paddingTop,a,{docHeight:h}=n.viewState,{x:f,y:c}=t,u=c-l;if(u<0)return 0;if(u>h)return n.state.doc.length;
for(let k=n.viewState.heightOracle.textHeight/2,b=!1;a=n.elementAtHeight(u),a.type!=mt.Text;)for(;u=i>0?a.bottom+k:a.top-
k,!(u>=0&&u<=h);){if(b)return e?null:0;b=!0,i=-i}c=l+u;let d=a.from;if(d<n.viewport.from)return n.viewport.from==0?0:e?null:
Go(n,o,a,f,c);if(d>n.viewport.to)return n.viewport.to==n.state.doc.length?n.state.doc.length:e?null:Go(n,o,a,f,c);let p=n.
dom.ownerDocument,m=n.root.elementFromPoint?n.root:p,g=m.elementFromPoint(f,c);g&&!n.contentDOM.contains(g)&&(g=null),g||
(f=Math.max(o.left+1,Math.min(o.right-1,f)),g=m.elementFromPoint(f,c),g&&!n.contentDOM.contains(g)&&(g=null));let y,v=-1;
if(g&&((s=n.docView.nearest(g))===null||s===void 0?void 0:s.isEditable)!=!1){if(p.caretPositionFromPoint){let k=p.caretPositionFromPoint(
f,c);k&&({offsetNode:y,offset:v}=k)}else if(p.caretRangeFromPoint){let k=p.caretRangeFromPoint(f,c);k&&({startContainer:y,
startOffset:v}=k)}y&&(!n.contentDOM.contains(y)||L.safari&&Zf(y,v,f)||L.chrome&&tc(y,v,f))&&(y=void 0),y&&(v=Math.min(zt(
y),v))}if(!y||!n.docView.dom.contains(y)){let k=nt.find(n.docView,d);if(!k)return u>a.top+a.height/2?a.to:a.from;({node:y,
offset:v}=Os(k.dom,f,c))}let A=n.docView.nearest(y);if(!A)return null;if(A.isWidget&&((r=A.dom)===null||r===void 0?void 0:
r.nodeType)==1){let k=A.dom.getBoundingClientRect();return t.y<k.top||t.y<=k.bottom&&t.x<=(k.left+k.right)/2?A.posAtStart:
A.posAtEnd}else return A.localPosFromDOM(y,v)+A.posAtStart}function Go(n,t,e,i,s){let r=Math.round((i-t.left)*n.defaultCharacterWidth);
if(n.lineWrapping&&e.height>n.defaultLineHeight*1.5){let l=n.viewState.heightOracle.textHeight,a=Math.floor((s-e.top-(n.
defaultLineHeight-l)*.5)/l);r+=a*n.viewState.heightOracle.lineLength}let o=n.state.sliceDoc(e.from,e.to);return e.from+Oo(
o,r,n.state.tabSize)}function Yl(n,t,e){let i,s=n;if(n.nodeType!=3||t!=(i=n.nodeValue.length))return!1;for(;;){let r=s.nextSibling;
if(r){if(r.nodeName=="BR")break;return!1}else{let o=s.parentNode;if(!o||o.nodeName=="DIV")break;s=o}}return we(n,i-1,i).
getBoundingClientRect().right>e}function Zf(n,t,e){return Yl(n,t,e)}function tc(n,t,e){if(t!=0)return Yl(n,t,e);for(let s=n;;){
let r=s.parentNode;if(!r||r.nodeType!=1||r.firstChild!=s)return!1;if(r.classList.contains("cm-line"))break;s=r}let i=n.nodeType==
1?n.getBoundingClientRect():we(n,0,Math.max(n.nodeValue.length,1)).getBoundingClientRect();return e-i.left>5}function Ps(n,t,e){
let i=n.lineBlockAt(t);if(Array.isArray(i.type)){let s;for(let r of i.type){if(r.from>t)break;if(!(r.to<t)){if(r.from<t&&
r.to>t)return r;(!s||r.type==mt.Text&&(s.type!=r.type||(e<0?r.from<t:r.to>t)))&&(s=r)}}return s||i}return i}function ec(n,t,e,i){
let s=Ps(n,t.head,t.assoc||-1),r=!i||s.type!=mt.Text||!(n.lineWrapping||s.widgetLineBreaks)?null:n.coordsAtPos(t.assoc<0&&
t.head>s.from?t.head-1:t.head);if(r){let o=n.dom.getBoundingClientRect(),l=n.textDirectionAt(s.from),a=n.posAtCoords({x:e==
(l==X.LTR)?o.right-1:o.left+1,y:(r.top+r.bottom)/2});if(a!=null)return C.cursor(a,e?-1:1)}return C.cursor(e?s.to:s.from,
e?-1:1)}function Xo(n,t,e,i){let s=n.state.doc.lineAt(t.head),r=n.bidiSpans(s),o=n.textDirectionAt(s.from);for(let l=t,a=null;;){
let h=zf(s,r,o,l,e),f=Pl;if(!h){if(s.number==(e?n.state.doc.lines:1))return l;f=`
`,s=n.state.doc.line(s.number+(e?1:-1)),r=n.bidiSpans(s),h=n.visualLineSide(s,!e)}if(a){if(!a(f))return l}else{if(!i)return h;
a=i(f)}l=h}}function ic(n,t,e){let i=n.state.charCategorizer(t),s=i(e);return r=>{let o=i(r);return s==Lt.Space&&(s=o),s==
o}}function nc(n,t,e,i){let s=t.head,r=e?1:-1;if(s==(e?n.state.doc.length:0))return C.cursor(s,t.assoc);let o=t.goalColumn,
l,a=n.contentDOM.getBoundingClientRect(),h=n.coordsAtPos(s,t.assoc||-1),f=n.documentTop;if(h)o==null&&(o=h.left-a.left),
l=r<0?h.top:h.bottom;else{let d=n.viewState.lineBlockAt(s);o==null&&(o=Math.min(a.right-a.left,n.defaultCharacterWidth*(s-
d.from))),l=(r<0?d.top:d.bottom)+f}let c=a.left+o,u=i??n.viewState.heightOracle.textHeight>>1;for(let d=0;;d+=10){let p=l+
(u+d)*r,m=Jl(n,{x:c,y:p},!1,r);if(p<a.top||p>a.bottom||(r<0?m<s:m>s)){let g=n.docView.coordsForChar(m),y=!g||p<g.top?-1:
1;return C.cursor(m,y,void 0,o)}}}function ci(n,t,e){for(;;){let i=0;for(let s of n)s.between(t-1,t+1,(r,o,l)=>{if(t>r&&
t<o){let a=i||e||(t-r<o-t?-1:1);t=a<0?r:o,i=a}});if(!i)return t}}function Ql(n,t){let e=null;for(let i=0;i<t.ranges.length;i++){
let s=t.ranges[i],r=null;if(s.empty){let o=ci(n,s.from,0);o!=s.from&&(r=C.cursor(o,-1))}else{let o=ci(n,s.from,-1),l=ci(
n,s.to,1);(o!=s.from||l!=s.to)&&(r=C.range(s.from==s.anchor?o:l,s.from==s.head?o:l))}r&&(e||(e=t.ranges.slice()),e[i]=r)}
return e?C.create(e,t.mainIndex):t}function ys(n,t,e){let i=ci(n.state.facet(Si).map(s=>s(n)),e.from,t.head>e.from?-1:1);
return i==e.from?e:C.cursor(i,i<e.from?1:-1)}var ri="\uFFFF",Rs=class{constructor(t,e){this.points=t,this.text="",this.lineSeparator=
e.facet(U.lineSeparator)}append(t){this.text+=t}lineBreak(){this.text+=ri}readRange(t,e){if(!t)return this;let i=t.parentNode;
for(let s=t;;){this.findPointBefore(i,s);let r=this.text.length;this.readNode(s);let o=s.nextSibling;if(o==e)break;let l=$.
get(s),a=$.get(o);(l&&a?l.breakAfter:(l?l.breakAfter:pn(s))||pn(o)&&(s.nodeName!="BR"||s.cmIgnore)&&this.text.length>r)&&
!rc(o,e)&&this.lineBreak(),s=o}return this.findPointBefore(i,e),this}readTextNode(t){let e=t.nodeValue;for(let i of this.
points)i.node==t&&(i.pos=this.text.length+Math.min(i.offset,e.length));for(let i=0,s=this.lineSeparator?null:/\r\n?|\n/g;;){
let r=-1,o=1,l;if(this.lineSeparator?(r=e.indexOf(this.lineSeparator,i),o=this.lineSeparator.length):(l=s.exec(e))&&(r=l.
index,o=l[0].length),this.append(e.slice(i,r<0?e.length:r)),r<0)break;if(this.lineBreak(),o>1)for(let a of this.points)a.
node==t&&a.pos>this.text.length&&(a.pos-=o-1);i=r+o}}readNode(t){if(t.cmIgnore)return;let e=$.get(t),i=e&&e.overrideDOMText;
if(i!=null){this.findPointInside(t,i.length);for(let s=i.iter();!s.next().done;)s.lineBreak?this.lineBreak():this.append(
s.value)}else t.nodeType==3?this.readTextNode(t):t.nodeName=="BR"?t.nextSibling&&this.lineBreak():t.nodeType==1&&this.readRange(
t.firstChild,null)}findPointBefore(t,e){for(let i of this.points)i.node==t&&t.childNodes[i.offset]==e&&(i.pos=this.text.
length)}findPointInside(t,e){for(let i of this.points)(t.nodeType==3?i.node==t:t.contains(i.node))&&(i.pos=this.text.length+
(sc(t,i.node,i.offset)?e:0))}};function sc(n,t,e){for(;;){if(!t||e<zt(t))return!1;if(t==n)return!0;e=ke(t)+1,t=t.parentNode}}
function rc(n,t){let e;for(;!(n==t||!n);n=n.nextSibling){let i=$.get(n);if(!(i?.isWidget||n.cmIgnore))return!1;i&&(e||(e=
[])).push(i)}if(e)for(let i of e){let s=i.overrideDOMText;if(s?.length)return!1}return!0}var wn=class{constructor(t,e){this.
node=t,this.offset=e,this.pos=-1}},Is=class{constructor(t,e,i,s){this.typeOver=s,this.bounds=null,this.text="",this.domChanged=
e>-1;let{impreciseHead:r,impreciseAnchor:o}=t.docView;if(t.state.readOnly&&e>-1)this.newSel=null;else if(e>-1&&(this.bounds=
t.docView.domBoundsAround(e,i,0))){let l=r||o?[]:lc(t),a=new Rs(l,t.state);a.readRange(this.bounds.startDOM,this.bounds.
endDOM),this.text=a.text,this.newSel=ac(l,this.bounds.from)}else{let l=t.observer.selectionRange,a=r&&r.node==l.focusNode&&
r.offset==l.focusOffset||!Cs(t.contentDOM,l.focusNode)?t.state.selection.main.head:t.docView.posFromDOM(l.focusNode,l.focusOffset),
h=o&&o.node==l.anchorNode&&o.offset==l.anchorOffset||!Cs(t.contentDOM,l.anchorNode)?t.state.selection.main.anchor:t.docView.
posFromDOM(l.anchorNode,l.anchorOffset),f=t.viewport;if((L.ios||L.chrome)&&t.state.selection.main.empty&&a!=h&&(f.from>0||
f.to<t.state.doc.length)){let c=Math.min(a,h),u=Math.max(a,h),d=f.from-c,p=f.to-u;(d==0||d==1||c==0)&&(p==0||p==-1||u==t.
state.doc.length)&&(a=0,h=t.state.doc.length)}this.newSel=C.single(h,a)}}};function Zl(n,t){let e,{newSel:i}=t,s=n.state.
selection.main,r=n.inputState.lastKeyTime>Date.now()-100?n.inputState.lastKeyCode:-1;if(t.bounds){let{from:o,to:l}=t.bounds,
a=s.from,h=null;(r===8||L.android&&t.text.length<l-o)&&(a=s.to,h="end");let f=ta(n.state.doc.sliceString(o,l,ri),t.text,
a-o,h);f&&(L.chrome&&r==13&&f.toB==f.from+2&&t.text.slice(f.from,f.toB)==ri+ri&&f.toB--,e={from:o+f.from,to:o+f.toA,insert:H.
of(t.text.slice(f.from,f.toB).split(ri))})}else i&&(!n.hasFocus&&n.state.facet(Qt)||i.main.eq(s))&&(i=null);if(!e&&!i)return!1;
if(!e&&t.typeOver&&!s.empty&&i&&i.main.empty?e={from:s.from,to:s.to,insert:n.state.doc.slice(s.from,s.to)}:(L.mac||L.android)&&
e&&e.from==e.to&&e.from==s.head-1&&/^\. ?$/.test(e.insert.toString())&&n.contentDOM.getAttribute("autocorrect")=="off"?(i&&
e.insert.length==2&&(i=C.single(i.main.anchor-1,i.main.head-1)),e={from:e.from,to:e.to,insert:H.of([e.insert.toString().
replace("."," ")])}):e&&e.from>=s.from&&e.to<=s.to&&(e.from!=s.from||e.to!=s.to)&&s.to-s.from-(e.to-e.from)<=4?e={from:s.
from,to:s.to,insert:n.state.doc.slice(s.from,e.from).append(e.insert).append(n.state.doc.slice(e.to,s.to))}:L.chrome&&e&&
e.from==e.to&&e.from==s.head&&e.insert.toString()==`
 `&&n.lineWrapping&&(i&&(i=C.single(i.main.anchor-1,i.main.head-1)),e={from:s.from,to:s.to,insert:H.of([" "])}),e)return rr(
n,e,i,r);if(i&&!i.main.eq(s)){let o=!1,l="select";return n.inputState.lastSelectionTime>Date.now()-50&&(n.inputState.lastSelectionOrigin==
"select"&&(o=!0),l=n.inputState.lastSelectionOrigin,l=="select.pointer"&&(i=Ql(n.state.facet(Si).map(a=>a(n)),i))),n.dispatch(
{selection:i,scrollIntoView:o,userEvent:l}),!0}else return!1}function rr(n,t,e,i=-1){if(L.ios&&n.inputState.flushIOSKey(
t))return!0;let s=n.state.selection.main;if(L.android&&(t.to==s.to&&(t.from==s.from||t.from==s.from-1&&n.state.sliceDoc(
t.from,s.from)==" ")&&t.insert.length==1&&t.insert.lines==2&&ze(n.contentDOM,"Enter",13)||(t.from==s.from-1&&t.to==s.to&&
t.insert.length==0||i==8&&t.insert.length<t.to-t.from&&t.to>s.head)&&ze(n.contentDOM,"Backspace",8)||t.from==s.from&&t.to==
s.to+1&&t.insert.length==0&&ze(n.contentDOM,"Delete",46)))return!0;let r=t.insert.toString();n.inputState.composing>=0&&
n.inputState.composing++;let o,l=()=>o||(o=oc(n,t,e));return n.state.facet(Fl).some(a=>a(n,t.from,t.to,r,l))||n.dispatch(
l()),!0}function oc(n,t,e){let i,s=n.state,r=s.selection.main,o=-1;if(t.from==t.to&&t.from<r.from||t.from>r.to){let a=t.
from<r.from?-1:1,h=a<0?r.from:r.to,f=ci(s.facet(Si).map(c=>c(n)),h,a);t.from==f&&(o=f)}if(o>-1)i={changes:t,selection:C.
cursor(t.from+t.insert.length,-1)};else if(t.from>=r.from&&t.to<=r.to&&t.to-t.from>=(r.to-r.from)/3&&(!e||e.main.empty&&
e.main.from==t.from+t.insert.length)&&n.inputState.composing<0){let a=r.from<t.from?s.sliceDoc(r.from,t.from):"",h=r.to>
t.to?s.sliceDoc(t.to,r.to):"";i=s.replaceSelection(n.state.toText(a+t.insert.sliceString(0,void 0,n.state.lineBreak)+h))}else{
let a=s.changes(t),h=e&&e.main.to<=a.newLength?e.main:void 0;if(s.selection.ranges.length>1&&n.inputState.composing>=0&&
t.to<=r.to&&t.to>=r.to-10){let f=n.state.sliceDoc(t.from,t.to),c,u=e&&Xl(n,e.main.head);if(u){let m=t.insert.length-(t.to-
t.from);c={from:u.from,to:u.to-m}}else c=n.state.doc.lineAt(r.head);let d=r.to-t.to,p=r.to-r.from;i=s.changeByRange(m=>{
if(m.from==r.from&&m.to==r.to)return{changes:a,range:h||m.map(a)};let g=m.to-d,y=g-f.length;if(m.to-m.from!=p||n.state.sliceDoc(
y,g)!=f||m.to>=c.from&&m.from<=c.to)return{range:m};let v=s.changes({from:y,to:g,insert:t.insert}),A=m.to-r.to;return{changes:v,
range:h?C.range(Math.max(0,h.anchor+A),Math.max(0,h.head+A)):m.map(v)}})}else i={changes:a,selection:h&&s.selection.replaceRange(
h)}}let l="input.type";return(n.composing||n.inputState.compositionPendingChange&&n.inputState.compositionEndedAt>Date.now()-
50)&&(n.inputState.compositionPendingChange=!1,l+=".compose",n.inputState.compositionFirstChange&&(l+=".start",n.inputState.
compositionFirstChange=!1)),s.update(i,{userEvent:l,scrollIntoView:!0})}function ta(n,t,e,i){let s=Math.min(n.length,t.length),
r=0;for(;r<s&&n.charCodeAt(r)==t.charCodeAt(r);)r++;if(r==s&&n.length==t.length)return null;let o=n.length,l=t.length;for(;o>
0&&l>0&&n.charCodeAt(o-1)==t.charCodeAt(l-1);)o--,l--;if(i=="end"){let a=Math.max(0,r-Math.min(o,l));e-=o+a-r}if(o<r&&n.
length<t.length){let a=e<=r&&e>=o?r-e:0;r-=a,l=r+(l-o),o=r}else if(l<r){let a=e<=r&&e>=l?r-e:0;r-=a,o=r+(o-l),l=r}return{
from:r,toA:o,toB:l}}function lc(n){let t=[];if(n.root.activeElement!=n.contentDOM)return t;let{anchorNode:e,anchorOffset:i,
focusNode:s,focusOffset:r}=n.observer.selectionRange;return e&&(t.push(new wn(e,i)),(s!=e||r!=i)&&t.push(new wn(s,r))),t}
function ac(n,t){if(n.length==0)return null;let e=n[0].pos,i=n.length==2?n[1].pos:e;return e>-1&&i>-1?C.single(e+t,i+t):
null}var Ns=class{setSelectionOrigin(t){this.lastSelectionOrigin=t,this.lastSelectionTime=Date.now()}constructor(t){this.
view=t,this.lastKeyCode=0,this.lastKeyTime=0,this.lastTouchTime=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=
0,this.pendingIOSKey=void 0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=
0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=
0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.mouseSelection=null,this.draggedContent=null,this.
handleEvent=this.handleEvent.bind(this),this.notifiedFocused=t.hasFocus,L.safari&&t.contentDOM.addEventListener("input",
()=>null),L.gecko&&vc(t.contentDOM.ownerDocument)}handleEvent(t){!mc(this.view,t)||this.ignoreDuringComposition(t)||t.type==
"keydown"&&this.keydown(t)||(this.view.updateState!=0?Promise.resolve().then(()=>this.runHandlers(t.type,t)):this.runHandlers(
t.type,t))}runHandlers(t,e){let i=this.handlers[t];if(i){for(let s of i.observers)s(this.view,e);for(let s of i.handlers){
if(e.defaultPrevented)break;if(s(this.view,e)){e.preventDefault();break}}}}ensureHandlers(t){let e=hc(t),i=this.handlers,
s=this.view.contentDOM;for(let r in e)if(r!="scroll"){let o=!e[r].handlers.length,l=i[r];l&&o!=!l.handlers.length&&(s.removeEventListener(
r,this.handleEvent),l=null),l||s.addEventListener(r,this.handleEvent,{passive:o})}for(let r in i)r!="scroll"&&!e[r]&&s.removeEventListener(
r,this.handleEvent);this.handlers=e}keydown(t){if(this.lastKeyCode=t.keyCode,this.lastKeyTime=Date.now(),t.keyCode==9&&this.
tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&t.keyCode!=27&&ia.
indexOf(t.keyCode)<0&&(this.tabFocusMode=-1),L.android&&L.chrome&&!t.synthetic&&(t.keyCode==13||t.keyCode==8))return this.
view.observer.delayAndroidKey(t.key,t.keyCode),!0;let e;return L.ios&&!t.synthetic&&!t.altKey&&!t.metaKey&&((e=ea.find(i=>i.
keyCode==t.keyCode))&&!t.ctrlKey||fc.indexOf(t.key)>-1&&t.ctrlKey&&!t.shiftKey)?(this.pendingIOSKey=e||t,setTimeout(()=>this.
flushIOSKey(),250),!0):(t.keyCode!=229&&this.view.observer.forceFlush(),!1)}flushIOSKey(t){let e=this.pendingIOSKey;return!e||
e.key=="Enter"&&t&&t.from<t.to&&/^\S+$/.test(t.insert.toString())?!1:(this.pendingIOSKey=void 0,ze(this.view.contentDOM,
e.key,e.keyCode,e instanceof KeyboardEvent?e:void 0))}ignoreDuringComposition(t){return!/^key/.test(t.type)||t.synthetic?
!1:this.composing>0?!0:L.safari&&!L.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100?(this.compositionPendingKey=
!1,!0):!1}startMouseSelection(t){this.mouseSelection&&this.mouseSelection.destroy(),this.mouseSelection=t}update(t){this.
view.observer.update(t),this.mouseSelection&&this.mouseSelection.update(t),this.draggedContent&&t.docChanged&&(this.draggedContent=
this.draggedContent.map(t.changes)),t.transactions.length&&(this.lastKeyCode=this.lastSelectionTime=0)}destroy(){this.mouseSelection&&
this.mouseSelection.destroy()}};function Jo(n,t){return(e,i)=>{try{return t.call(n,i,e)}catch(s){Tt(e.state,s)}}}function hc(n){
let t=Object.create(null);function e(i){return t[i]||(t[i]={observers:[],handlers:[]})}for(let i of n){let s=i.spec,r=s&&
s.plugin.domEventHandlers,o=s&&s.plugin.domEventObservers;if(r)for(let l in r){let a=r[l];a&&e(l).handlers.push(Jo(i.value,
a))}if(o)for(let l in o){let a=o[l];a&&e(l).observers.push(Jo(i.value,a))}}for(let i in Et)e(i).handlers.push(Et[i]);for(let i in vt)
e(i).observers.push(vt[i]);return t}var ea=[{key:"Backspace",keyCode:8,inputType:"deleteContentBackward"},{key:"Enter",keyCode:13,
inputType:"insertParagraph"},{key:"Enter",keyCode:13,inputType:"insertLineBreak"},{key:"Delete",keyCode:46,inputType:"de\
leteContentForward"}],fc="dthko",ia=[16,17,18,20,91,92,224,225],sn=6;function rn(n){return Math.max(0,n)*.7+8}function cc(n,t){
return Math.max(Math.abs(n.clientX-t.clientX),Math.abs(n.clientY-t.clientY))}var Hs=class{constructor(t,e,i,s){this.view=
t,this.startEvent=e,this.style=i,this.mustSelect=s,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=e,this.scrollParents=
Cf(t.contentDOM),this.atoms=t.state.facet(Si).map(o=>o(t));let r=t.contentDOM.ownerDocument;r.addEventListener("mousemov\
e",this.move=this.move.bind(this)),r.addEventListener("mouseup",this.up=this.up.bind(this)),this.extend=e.shiftKey,this.
multiple=t.state.facet(U.allowMultipleSelections)&&uc(t,e),this.dragging=pc(t,e)&&ra(e)==1?null:!1}start(t){this.dragging===
!1&&this.select(t)}move(t){if(t.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&cc(this.startEvent,
t)<10)return;this.select(this.lastEvent=t);let e=0,i=0,s=0,r=0,o=this.view.win.innerWidth,l=this.view.win.innerHeight;this.
scrollParents.x&&({left:s,right:o}=this.scrollParents.x.getBoundingClientRect()),this.scrollParents.y&&({top:r,bottom:l}=
this.scrollParents.y.getBoundingClientRect());let a=Gl(this.view);t.clientX-a.left<=s+sn?e=-rn(s-t.clientX):t.clientX+a.
right>=o-sn&&(e=rn(t.clientX-o)),t.clientY-a.top<=r+sn?i=-rn(r-t.clientY):t.clientY+a.bottom>=l-sn&&(i=rn(t.clientY-l)),
this.setScrollSpeed(e,i)}up(t){this.dragging==null&&this.select(this.lastEvent),this.dragging||t.preventDefault(),this.destroy()}destroy(){
this.setScrollSpeed(0,0);let t=this.view.contentDOM.ownerDocument;t.removeEventListener("mousemove",this.move),t.removeEventListener(
"mouseup",this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(t,e){this.
scrollSpeed={x:t,y:e},t||e?this.scrolling<0&&(this.scrolling=setInterval(()=>this.scroll(),50)):this.scrolling>-1&&(clearInterval(
this.scrolling),this.scrolling=-1)}scroll(){let{x:t,y:e}=this.scrollSpeed;t&&this.scrollParents.x&&(this.scrollParents.x.
scrollLeft+=t,t=0),e&&this.scrollParents.y&&(this.scrollParents.y.scrollTop+=e,e=0),(t||e)&&this.view.win.scrollBy(t,e),
this.dragging===!1&&this.select(this.lastEvent)}select(t){let{view:e}=this,i=Ql(this.atoms,this.style.get(t,this.extend,
this.multiple));(this.mustSelect||!i.eq(e.state.selection,this.dragging===!1))&&this.view.dispatch({selection:i,userEvent:"\
select.pointer"}),this.mustSelect=!1}update(t){t.transactions.some(e=>e.isUserEvent("input.type"))?this.destroy():this.style.
update(t)&&setTimeout(()=>this.select(this.lastEvent),20)}};function uc(n,t){let e=n.state.facet(Rl);return e.length?e[0](
t):L.mac?t.metaKey:t.ctrlKey}function dc(n,t){let e=n.state.facet(Il);return e.length?e[0](t):L.mac?!t.altKey:!t.ctrlKey}
function pc(n,t){let{main:e}=n.state.selection;if(e.empty)return!1;let i=di(n.root);if(!i||i.rangeCount==0)return!0;let s=i.
getRangeAt(0).getClientRects();for(let r=0;r<s.length;r++){let o=s[r];if(o.left<=t.clientX&&o.right>=t.clientX&&o.top<=t.
clientY&&o.bottom>=t.clientY)return!0}return!1}function mc(n,t){if(!t.bubbles)return!0;if(t.defaultPrevented)return!1;for(let e=t.
target,i;e!=n.contentDOM;e=e.parentNode)if(!e||e.nodeType==11||(i=$.get(e))&&i.ignoreEvent(t))return!1;return!0}var Et=Object.
create(null),vt=Object.create(null),na=L.ie&&L.ie_version<15||L.ios&&L.webkit_version<604;function gc(n){let t=n.dom.parentNode;
if(!t)return;let e=t.appendChild(document.createElement("textarea"));e.style.cssText="position: fixed; left: -10000px; t\
op: 10px",e.focus(),setTimeout(()=>{n.focus(),e.remove(),sa(n,e.value)},50)}function Mn(n,t,e){for(let i of n.facet(t))e=
i(e,n);return e}function sa(n,t){t=Mn(n.state,ir,t);let{state:e}=n,i,s=1,r=e.toText(t),o=r.lines==e.selection.ranges.length;
if(Fs!=null&&e.selection.ranges.every(a=>a.empty)&&Fs==r.toString()){let a=-1;i=e.changeByRange(h=>{let f=e.doc.lineAt(h.
from);if(f.from==a)return{range:h};a=f.from;let c=e.toText((o?r.line(s++).text:t)+e.lineBreak);return{changes:{from:f.from,
insert:c},range:C.cursor(h.from+c.length)}})}else o?i=e.changeByRange(a=>{let h=r.line(s++);return{changes:{from:a.from,
to:a.to,insert:h.text},range:C.cursor(a.from+h.length)}}):i=e.replaceSelection(r);n.dispatch(i,{userEvent:"input.paste",
scrollIntoView:!0})}vt.scroll=n=>{n.inputState.lastScrollTop=n.scrollDOM.scrollTop,n.inputState.lastScrollLeft=n.scrollDOM.
scrollLeft};Et.keydown=(n,t)=>(n.inputState.setSelectionOrigin("select"),t.keyCode==27&&n.inputState.tabFocusMode!=0&&(n.
inputState.tabFocusMode=Date.now()+2e3),!1);vt.touchstart=(n,t)=>{n.inputState.lastTouchTime=Date.now(),n.inputState.setSelectionOrigin(
"select.pointer")};vt.touchmove=n=>{n.inputState.setSelectionOrigin("select.pointer")};Et.mousedown=(n,t)=>{if(n.observer.
flush(),n.inputState.lastTouchTime>Date.now()-2e3)return!1;let e=null;for(let i of n.state.facet(Nl))if(e=i(n,t),e)break;
if(!e&&t.button==0&&(e=kc(n,t)),e){let i=!n.hasFocus;n.inputState.startMouseSelection(new Hs(n,t,e,i)),i&&n.observer.ignore(
()=>{yl(n.contentDOM);let r=n.root.activeElement;r&&!r.contains(n.contentDOM)&&r.blur()});let s=n.inputState.mouseSelection;
if(s)return s.start(t),s.dragging===!1}else n.inputState.setSelectionOrigin("select.pointer");return!1};function Yo(n,t,e,i){
if(i==1)return C.cursor(t,e);if(i==2)return Jf(n.state,t,e);{let s=nt.find(n.docView,t),r=n.state.doc.lineAt(s?s.posAtEnd:
t),o=s?s.posAtStart:r.from,l=s?s.posAtEnd:r.to;return l<n.state.doc.length&&l==r.to&&l++,C.range(o,l)}}var Qo=(n,t,e)=>t>=
e.top&&t<=e.bottom&&n>=e.left&&n<=e.right;function bc(n,t,e,i){let s=nt.find(n.docView,t);if(!s)return 1;let r=t-s.posAtStart;
if(r==0)return 1;if(r==s.length)return-1;let o=s.coordsAt(r,-1);if(o&&Qo(e,i,o))return-1;let l=s.coordsAt(r,1);return l&&
Qo(e,i,l)?1:o&&o.bottom>=i?-1:1}function Zo(n,t){let e=n.posAtCoords({x:t.clientX,y:t.clientY},!1);return{pos:e,bias:bc(
n,e,t.clientX,t.clientY)}}var yc=L.ie&&L.ie_version<=11,tl=null,el=0,il=0;function ra(n){if(!yc)return n.detail;let t=tl,
e=il;return tl=n,il=Date.now(),el=!t||e>Date.now()-400&&Math.abs(t.clientX-n.clientX)<2&&Math.abs(t.clientY-n.clientY)<2?
(el+1)%3:1}function kc(n,t){let e=Zo(n,t),i=ra(t),s=n.state.selection;return{update(r){r.docChanged&&(e.pos=r.changes.mapPos(
e.pos),s=s.map(r.changes))},get(r,o,l){let a=Zo(n,r),h,f=Yo(n,a.pos,a.bias,i);if(e.pos!=a.pos&&!o){let c=Yo(n,e.pos,e.bias,
i),u=Math.min(c.from,f.from),d=Math.max(c.to,f.to);f=u<f.from?C.range(u,d):C.range(d,u)}return o?s.replaceRange(s.main.extend(
f.from,f.to)):l&&i==1&&s.ranges.length>1&&(h=wc(s,a.pos))?h:l?s.addRange(f):C.create([f])}}}function wc(n,t){for(let e=0;e<
n.ranges.length;e++){let{from:i,to:s}=n.ranges[e];if(i<=t&&s>=t)return C.create(n.ranges.slice(0,e).concat(n.ranges.slice(
e+1)),n.mainIndex==e?0:n.mainIndex-(n.mainIndex>e?1:0))}return null}Et.dragstart=(n,t)=>{let{selection:{main:e}}=n.state;
if(t.target.draggable){let s=n.docView.nearest(t.target);if(s&&s.isWidget){let r=s.posAtStart,o=r+s.length;(r>=e.to||o<=
e.from)&&(e=C.range(r,o))}}let{inputState:i}=n;return i.mouseSelection&&(i.mouseSelection.dragging=!0),i.draggedContent=
e,t.dataTransfer&&(t.dataTransfer.setData("Text",Mn(n.state,nr,n.state.sliceDoc(e.from,e.to))),t.dataTransfer.effectAllowed=
"copyMove"),!1};Et.dragend=n=>(n.inputState.draggedContent=null,!1);function nl(n,t,e,i){if(e=Mn(n.state,ir,e),!e)return;
let s=n.posAtCoords({x:t.clientX,y:t.clientY},!1),{draggedContent:r}=n.inputState,o=i&&r&&dc(n,t)?{from:r.from,to:r.to}:
null,l={from:s,insert:e},a=n.state.changes(o?[o,l]:l);n.focus(),n.dispatch({changes:a,selection:{anchor:a.mapPos(s,-1),head:a.
mapPos(s,1)},userEvent:o?"move.drop":"input.drop"}),n.inputState.draggedContent=null}Et.drop=(n,t)=>{if(!t.dataTransfer)
return!1;if(n.state.readOnly)return!0;let e=t.dataTransfer.files;if(e&&e.length){let i=Array(e.length),s=0,r=()=>{++s==e.
length&&nl(n,t,i.filter(o=>o!=null).join(n.state.lineBreak),!1)};for(let o=0;o<e.length;o++){let l=new FileReader;l.onerror=
r,l.onload=()=>{/[\x00-\x08\x0e-\x1f]{2}/.test(l.result)||(i[o]=l.result),r()},l.readAsText(e[o])}return!0}else{let i=t.
dataTransfer.getData("Text");if(i)return nl(n,t,i,!0),!0}return!1};Et.paste=(n,t)=>{if(n.state.readOnly)return!0;n.observer.
flush();let e=na?null:t.clipboardData;return e?(sa(n,e.getData("text/plain")||e.getData("text/uri-list")),!0):(gc(n),!1)};
function xc(n,t){let e=n.dom.parentNode;if(!e)return;let i=e.appendChild(document.createElement("textarea"));i.style.cssText=
"position: fixed; left: -10000px; top: 10px",i.value=t,i.focus(),i.selectionEnd=t.length,i.selectionStart=0,setTimeout(()=>{
i.remove(),n.focus()},50)}function Sc(n){let t=[],e=[],i=!1;for(let s of n.selection.ranges)s.empty||(t.push(n.sliceDoc(
s.from,s.to)),e.push(s));if(!t.length){let s=-1;for(let{from:r}of n.selection.ranges){let o=n.doc.lineAt(r);o.number>s&&
(t.push(o.text),e.push({from:o.from,to:Math.min(n.doc.length,o.to+1)})),s=o.number}i=!0}return{text:Mn(n,nr,t.join(n.lineBreak)),
ranges:e,linewise:i}}var Fs=null;Et.copy=Et.cut=(n,t)=>{let{text:e,ranges:i,linewise:s}=Sc(n.state);if(!e&&!s)return!1;Fs=
s?e:null,t.type=="cut"&&!n.state.readOnly&&n.dispatch({changes:i,scrollIntoView:!0,userEvent:"delete.cut"});let r=na?null:
t.clipboardData;return r?(r.clearData(),r.setData("text/plain",e),!0):(xc(n,e),!1)};var oa=wt.define();function la(n,t){
let e=[];for(let i of n.facet(Vl)){let s=i(n,t);s&&e.push(s)}return e.length?n.update({effects:e,annotations:oa.of(!0)}):
null}function aa(n){setTimeout(()=>{let t=n.hasFocus;if(t!=n.inputState.notifiedFocused){let e=la(n.state,t);e?n.dispatch(
e):n.update([])}},10)}vt.focus=n=>{n.inputState.lastFocusTime=Date.now(),!n.scrollDOM.scrollTop&&(n.inputState.lastScrollTop||
n.inputState.lastScrollLeft)&&(n.scrollDOM.scrollTop=n.inputState.lastScrollTop,n.scrollDOM.scrollLeft=n.inputState.lastScrollLeft),
aa(n)};vt.blur=n=>{n.observer.clearSelectionRange(),aa(n)};vt.compositionstart=vt.compositionupdate=n=>{n.observer.editContext||
(n.inputState.compositionFirstChange==null&&(n.inputState.compositionFirstChange=!0),n.inputState.composing<0&&(n.inputState.
composing=0))};vt.compositionend=n=>{n.observer.editContext||(n.inputState.composing=-1,n.inputState.compositionEndedAt=
Date.now(),n.inputState.compositionPendingKey=!0,n.inputState.compositionPendingChange=n.observer.pendingRecords().length>
0,n.inputState.compositionFirstChange=null,L.chrome&&L.android?n.observer.flushSoon():n.inputState.compositionPendingChange?
Promise.resolve().then(()=>n.observer.flush()):setTimeout(()=>{n.inputState.composing<0&&n.docView.hasComposition&&n.update(
[])},50))};vt.contextmenu=n=>{n.inputState.lastContextMenu=Date.now()};Et.beforeinput=(n,t)=>{var e,i;if(t.inputType=="i\
nsertReplacementText"&&n.observer.editContext){let r=(e=t.dataTransfer)===null||e===void 0?void 0:e.getData("text/plain"),
o=t.getTargetRanges();if(r&&o.length){let l=o[0],a=n.posAtDOM(l.startContainer,l.startOffset),h=n.posAtDOM(l.endContainer,
l.endOffset);return rr(n,{from:a,to:h,insert:n.state.toText(r)},null),!0}}let s;if(L.chrome&&L.android&&(s=ea.find(r=>r.
inputType==t.inputType))&&(n.observer.delayAndroidKey(s.key,s.keyCode),s.key=="Backspace"||s.key=="Delete")){let r=((i=window.
visualViewport)===null||i===void 0?void 0:i.height)||0;setTimeout(()=>{var o;(((o=window.visualViewport)===null||o===void 0?
void 0:o.height)||0)>r+10&&n.hasFocus&&(n.contentDOM.blur(),n.focus())},100)}return L.ios&&t.inputType=="deleteContentFo\
rward"&&n.observer.flushSoon(),L.safari&&t.inputType=="insertText"&&n.inputState.composing>=0&&setTimeout(()=>vt.compositionend(
n,t),20),!1};var sl=new Set;function vc(n){sl.has(n)||(sl.add(n),n.addEventListener("copy",()=>{}),n.addEventListener("c\
ut",()=>{}))}var rl=["pre-wrap","normal","pre-line","break-spaces"],qe=!1;function ol(){qe=!1}var Vs=class{constructor(t){
this.lineWrapping=t,this.doc=H.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=
30}heightForGap(t,e){let i=this.doc.lineAt(e).number-this.doc.lineAt(t).number+1;return this.lineWrapping&&(i+=Math.max(
0,Math.ceil((e-t-i*this.lineLength*.5)/this.lineLength))),this.lineHeight*i}heightForLine(t){return this.lineWrapping?(1+
Math.max(0,Math.ceil((t-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight:this.lineHeight}setDoc(t){return this.
doc=t,this}mustRefreshForWrapping(t){return rl.indexOf(t)>-1!=this.lineWrapping}mustRefreshForHeights(t){let e=!1;for(let i=0;i<
t.length;i++){let s=t[i];s<0?i++:this.heightSamples[Math.floor(s*10)]||(e=!0,this.heightSamples[Math.floor(s*10)]=!0)}return e}refresh(t,e,i,s,r,o){
let l=rl.indexOf(t)>-1,a=Math.round(e)!=Math.round(this.lineHeight)||this.lineWrapping!=l;if(this.lineWrapping=l,this.lineHeight=
e,this.charWidth=i,this.textHeight=s,this.lineLength=r,a){this.heightSamples={};for(let h=0;h<o.length;h++){let f=o[h];f<
0?h++:this.heightSamples[Math.floor(f*10)]=!0}}return a}},zs=class{constructor(t,e){this.from=t,this.heights=e,this.index=
0}get more(){return this.index<this.heights.length}},Ht=class n{constructor(t,e,i,s,r){this.from=t,this.length=e,this.top=
i,this.height=s,this._content=r}get type(){return typeof this._content=="number"?mt.Text:Array.isArray(this._content)?this.
_content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){
return this._content instanceof re?this._content.widget:null}get widgetLineBreaks(){return typeof this._content=="number"?
this._content:0}join(t){let e=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(t._content)?t._content:
[t]);return new n(this.from,this.length+t.length,this.top,this.height+t.height,e)}},_=(function(n){return n[n.ByPos=0]="\
ByPos",n[n.ByHeight=1]="ByHeight",n[n.ByPosNoHeight=2]="ByPosNoHeight",n})(_||(_={})),un=.001,gt=class n{constructor(t,e,i=2){
this.length=t,this.height=e,this.flags=i}get outdated(){return(this.flags&2)>0}set outdated(t){this.flags=(t?2:0)|this.flags&
-3}setHeight(t){this.height!=t&&(Math.abs(this.height-t)>un&&(qe=!0),this.height=t)}replace(t,e,i){return n.of(i)}decomposeLeft(t,e){
e.push(this)}decomposeRight(t,e){e.push(this)}applyChanges(t,e,i,s){let r=this,o=i.doc;for(let l=s.length-1;l>=0;l--){let{
fromA:a,toA:h,fromB:f,toB:c}=s[l],u=r.lineAt(a,_.ByPosNoHeight,i.setDoc(e),0,0),d=u.to>=h?u:r.lineAt(h,_.ByPosNoHeight,i,
0,0);for(c+=d.to-h,h=d.to;l>0&&u.from<=s[l-1].toA;)a=s[l-1].fromA,f=s[l-1].fromB,l--,a<u.from&&(u=r.lineAt(a,_.ByPosNoHeight,
i,0,0));f+=u.from-a,a=u.from;let p=qs.build(i.setDoc(o),t,f,c);r=xn(r,r.replace(a,h,p))}return r.updateHeight(i,0)}static empty(){
return new St(0,0)}static of(t){if(t.length==1)return t[0];let e=0,i=t.length,s=0,r=0;for(;;)if(e==i)if(s>r*2){let l=t[e-
1];l.break?t.splice(--e,1,l.left,null,l.right):t.splice(--e,1,l.left,l.right),i+=1+l.break,s-=l.size}else if(r>s*2){let l=t[i];
l.break?t.splice(i,1,l.left,null,l.right):t.splice(i,1,l.left,l.right),i+=2+l.break,r-=l.size}else break;else if(s<r){let l=t[e++];
l&&(s+=l.size)}else{let l=t[--i];l&&(r+=l.size)}let o=0;return t[e-1]==null?(o=1,e--):t[e]==null&&(o=1,i++),new Ws(n.of(
t.slice(0,e)),o,n.of(t.slice(i)))}};function xn(n,t){return n==t?n:(n.constructor!=t.constructor&&(qe=!0),t)}gt.prototype.
size=1;var Sn=class extends gt{constructor(t,e,i){super(t,e),this.deco=i}blockAt(t,e,i,s){return new Ht(s,this.length,i,
this.height,this.deco||0)}lineAt(t,e,i,s,r){return this.blockAt(0,i,s,r)}forEachLine(t,e,i,s,r,o){t<=r+this.length&&e>=r&&
o(this.blockAt(0,i,s,r))}updateHeight(t,e=0,i=!1,s){return s&&s.from<=e&&s.more&&this.setHeight(s.heights[s.index++]),this.
outdated=!1,this}toString(){return`block(${this.length})`}},St=class n extends Sn{constructor(t,e){super(t,e,null),this.
collapsed=0,this.widgetHeight=0,this.breaks=0}blockAt(t,e,i,s){return new Ht(s,this.length,i,this.height,this.breaks)}replace(t,e,i){
let s=i[0];return i.length==1&&(s instanceof n||s instanceof ne&&s.flags&4)&&Math.abs(this.length-s.length)<10?(s instanceof
ne?s=new n(s.length,this.height):s.height=this.height,this.outdated||(s.outdated=!1),s):gt.of(i)}updateHeight(t,e=0,i=!1,s){
return s&&s.from<=e&&s.more?this.setHeight(s.heights[s.index++]):(i||this.outdated)&&this.setHeight(Math.max(this.widgetHeight,
t.heightForLine(this.length-this.collapsed))+this.breaks*t.lineHeight),this.outdated=!1,this}toString(){return`line(${this.
length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`}},ne=class n extends gt{constructor(t){
super(t,0)}heightMetrics(t,e){let i=t.doc.lineAt(e).number,s=t.doc.lineAt(e+this.length).number,r=s-i+1,o,l=0;if(t.lineWrapping){
let a=Math.min(this.height,t.lineHeight*r);o=a/r,this.length>r+1&&(l=(this.height-a)/(this.length-r-1))}else o=this.height/
r;return{firstLine:i,lastLine:s,perLine:o,perChar:l}}blockAt(t,e,i,s){let{firstLine:r,lastLine:o,perLine:l,perChar:a}=this.
heightMetrics(e,s);if(e.lineWrapping){let h=s+(t<e.lineHeight?0:Math.round(Math.max(0,Math.min(1,(t-i)/this.height))*this.
length)),f=e.doc.lineAt(h),c=l+f.length*a,u=Math.max(i,t-c/2);return new Ht(f.from,f.length,u,c,0)}else{let h=Math.max(0,
Math.min(o-r,Math.floor((t-i)/l))),{from:f,length:c}=e.doc.line(r+h);return new Ht(f,c,i+l*h,l,0)}}lineAt(t,e,i,s,r){if(e==
_.ByHeight)return this.blockAt(t,i,s,r);if(e==_.ByPosNoHeight){let{from:d,to:p}=i.doc.lineAt(t);return new Ht(d,p-d,0,0,
0)}let{firstLine:o,perLine:l,perChar:a}=this.heightMetrics(i,r),h=i.doc.lineAt(t),f=l+h.length*a,c=h.number-o,u=s+l*c+a*
(h.from-r-c);return new Ht(h.from,h.length,Math.max(s,Math.min(u,s+this.height-f)),f,0)}forEachLine(t,e,i,s,r,o){t=Math.
max(t,r),e=Math.min(e,r+this.length);let{firstLine:l,perLine:a,perChar:h}=this.heightMetrics(i,r);for(let f=t,c=s;f<=e;){
let u=i.doc.lineAt(f);if(f==t){let p=u.number-l;c+=a*p+h*(t-r-p)}let d=a+h*u.length;o(new Ht(u.from,u.length,c,d,0)),c+=
d,f=u.to+1}}replace(t,e,i){let s=this.length-e;if(s>0){let r=i[i.length-1];r instanceof n?i[i.length-1]=new n(r.length+s):
i.push(null,new n(s-1))}if(t>0){let r=i[0];r instanceof n?i[0]=new n(t+r.length):i.unshift(new n(t-1),null)}return gt.of(
i)}decomposeLeft(t,e){e.push(new n(t-1),null)}decomposeRight(t,e){e.push(null,new n(this.length-t-1))}updateHeight(t,e=0,i=!1,s){
let r=e+this.length;if(s&&s.from<=e+this.length&&s.more){let o=[],l=Math.max(e,s.from),a=-1;for(s.from>e&&o.push(new n(s.
from-e-1).updateHeight(t,e));l<=r&&s.more;){let f=t.doc.lineAt(l).length;o.length&&o.push(null);let c=s.heights[s.index++];
a==-1?a=c:Math.abs(c-a)>=un&&(a=-2);let u=new St(f,c);u.outdated=!1,o.push(u),l+=f+1}l<=r&&o.push(null,new n(r-l).updateHeight(
t,l));let h=gt.of(o);return(a<0||Math.abs(h.height-this.height)>=un||Math.abs(a-this.heightMetrics(t,e).perLine)>=un)&&(qe=
!0),xn(this,h)}else(i||this.outdated)&&(this.setHeight(t.heightForGap(e,e+this.length)),this.outdated=!1);return this}toString(){
return`gap(${this.length})`}},Ws=class extends gt{constructor(t,e,i){super(t.length+e+i.length,t.height+i.height,e|(t.outdated||
i.outdated?2:0)),this.left=t,this.right=i,this.size=t.size+i.size}get break(){return this.flags&1}blockAt(t,e,i,s){let r=i+
this.left.height;return t<r?this.left.blockAt(t,e,i,s):this.right.blockAt(t,e,r,s+this.left.length+this.break)}lineAt(t,e,i,s,r){
let o=s+this.left.height,l=r+this.left.length+this.break,a=e==_.ByHeight?t<o:t<l,h=a?this.left.lineAt(t,e,i,s,r):this.right.
lineAt(t,e,i,o,l);if(this.break||(a?h.to<l:h.from>l))return h;let f=e==_.ByPosNoHeight?_.ByPosNoHeight:_.ByPos;return a?
h.join(this.right.lineAt(l,f,i,o,l)):this.left.lineAt(l,f,i,s,r).join(h)}forEachLine(t,e,i,s,r,o){let l=s+this.left.height,
a=r+this.left.length+this.break;if(this.break)t<a&&this.left.forEachLine(t,e,i,s,r,o),e>=a&&this.right.forEachLine(t,e,i,
l,a,o);else{let h=this.lineAt(a,_.ByPos,i,s,r);t<h.from&&this.left.forEachLine(t,h.from-1,i,s,r,o),h.to>=t&&h.from<=e&&o(
h),e>h.to&&this.right.forEachLine(h.to+1,e,i,l,a,o)}}replace(t,e,i){let s=this.left.length+this.break;if(e<s)return this.
balanced(this.left.replace(t,e,i),this.right);if(t>this.left.length)return this.balanced(this.left,this.right.replace(t-
s,e-s,i));let r=[];t>0&&this.decomposeLeft(t,r);let o=r.length;for(let l of i)r.push(l);if(t>0&&ll(r,o-1),e<this.length){
let l=r.length;this.decomposeRight(e,r),ll(r,l)}return gt.of(r)}decomposeLeft(t,e){let i=this.left.length;if(t<=i)return this.
left.decomposeLeft(t,e);e.push(this.left),this.break&&(i++,t>=i&&e.push(null)),t>i&&this.right.decomposeLeft(t-i,e)}decomposeRight(t,e){
let i=this.left.length,s=i+this.break;if(t>=s)return this.right.decomposeRight(t-s,e);t<i&&this.left.decomposeRight(t,e),
this.break&&t<s&&e.push(null),e.push(this.right)}balanced(t,e){return t.size>2*e.size||e.size>2*t.size?gt.of(this.break?
[t,null,e]:[t,e]):(this.left=xn(this.left,t),this.right=xn(this.right,e),this.setHeight(t.height+e.height),this.outdated=
t.outdated||e.outdated,this.size=t.size+e.size,this.length=t.length+this.break+e.length,this)}updateHeight(t,e=0,i=!1,s){
let{left:r,right:o}=this,l=e+r.length+this.break,a=null;return s&&s.from<=e+r.length&&s.more?a=r=r.updateHeight(t,e,i,s):
r.updateHeight(t,e,i),s&&s.from<=l+o.length&&s.more?a=o=o.updateHeight(t,l,i,s):o.updateHeight(t,l,i),a?this.balanced(r,
o):(this.height=this.left.height+this.right.height,this.outdated=!1,this)}toString(){return this.left+(this.break?" ":"-")+
this.right}};function ll(n,t){let e,i;n[t]==null&&(e=n[t-1])instanceof ne&&(i=n[t+1])instanceof ne&&n.splice(t-1,3,new ne(
e.length+1+i.length))}var Cc=5,qs=class n{constructor(t,e){this.pos=t,this.oracle=e,this.nodes=[],this.lineStart=-1,this.
lineEnd=-1,this.covering=null,this.writtenTo=t}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.
covering}span(t,e){if(this.lineStart>-1){let i=Math.min(e,this.lineEnd),s=this.nodes[this.nodes.length-1];s instanceof St?
s.length+=i-this.pos:(i>this.pos||!this.isCovered)&&this.nodes.push(new St(i-this.pos,-1)),this.writtenTo=i,e>i&&(this.nodes.
push(null),this.writtenTo++,this.lineStart=-1)}this.pos=e}point(t,e,i){if(t<e||i.heightRelevant){let s=i.widget?i.widget.
estimatedHeight:0,r=i.widget?i.widget.lineBreaks:0;s<0&&(s=this.oracle.lineHeight);let o=e-t;i.block?this.addBlock(new Sn(
o,s,i)):(o||r||s>=Cc)&&this.addLineDeco(s,r,o)}else e>t&&this.span(t,e);this.lineEnd>-1&&this.lineEnd<this.pos&&(this.lineEnd=
this.oracle.doc.lineAt(this.pos).to)}enterLine(){if(this.lineStart>-1)return;let{from:t,to:e}=this.oracle.doc.lineAt(this.
pos);this.lineStart=t,this.lineEnd=e,this.writtenTo<t&&((this.writtenTo<t-1||this.nodes[this.nodes.length-1]==null)&&this.
nodes.push(this.blankContent(this.writtenTo,t-1)),this.nodes.push(null)),this.pos>t&&this.nodes.push(new St(this.pos-t,-1)),
this.writtenTo=this.pos}blankContent(t,e){let i=new ne(e-t);return this.oracle.doc.lineAt(t).to==e&&(i.flags|=4),i}ensureLine(){
this.enterLine();let t=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(t instanceof St)return t;let e=new St(0,
-1);return this.nodes.push(e),e}addBlock(t){this.enterLine();let e=t.deco;e&&e.startSide>0&&!this.isCovered&&this.ensureLine(),
this.nodes.push(t),this.writtenTo=this.pos=this.pos+t.length,e&&e.endSide>0&&(this.covering=t)}addLineDeco(t,e,i){let s=this.
ensureLine();s.length+=i,s.collapsed+=i,s.widgetHeight=Math.max(s.widgetHeight,t),s.breaks+=e,this.writtenTo=this.pos=this.
pos+i}finish(t){let e=this.nodes.length==0?null:this.nodes[this.nodes.length-1];this.lineStart>-1&&!(e instanceof St)&&!this.
isCovered?this.nodes.push(new St(0,-1)):(this.writtenTo<this.pos||e==null)&&this.nodes.push(this.blankContent(this.writtenTo,
this.pos));let i=t;for(let s of this.nodes)s instanceof St&&s.updateHeight(this.oracle,i),i+=s?s.length:1;return this.nodes}static build(t,e,i,s){
let r=new n(i,t);return Q.spans(e,i,s,r,0),r.finish(i)}};function Ac(n,t,e){let i=new Ks;return Q.compare(n,t,e,i,0),i.changes}
var Ks=class{constructor(){this.changes=[]}compareRange(){}comparePoint(t,e,i,s){(t<e||i&&i.heightRelevant||s&&s.heightRelevant)&&
cn(t,e,this.changes,5)}};function Mc(n,t){let e=n.getBoundingClientRect(),i=n.ownerDocument,s=i.defaultView||window,r=Math.
max(0,e.left),o=Math.min(s.innerWidth,e.right),l=Math.max(0,e.top),a=Math.min(s.innerHeight,e.bottom);for(let h=n.parentNode;h&&
h!=i.body;)if(h.nodeType==1){let f=h,c=window.getComputedStyle(f);if((f.scrollHeight>f.clientHeight||f.scrollWidth>f.clientWidth)&&
c.overflow!="visible"){let u=f.getBoundingClientRect();r=Math.max(r,u.left),o=Math.min(o,u.right),l=Math.max(l,u.top),a=
Math.min(h==n.parentNode?s.innerHeight:a,u.bottom)}h=c.position=="absolute"||c.position=="fixed"?f.offsetParent:f.parentNode}else if(h.
nodeType==11)h=h.host;else break;return{left:r-e.left,right:Math.max(r,o)-e.left,top:l-(e.top+t),bottom:Math.max(l,a)-(e.
top+t)}}function Dc(n){let t=n.getBoundingClientRect(),e=n.ownerDocument.defaultView||window;return t.left<e.innerWidth&&
t.right>0&&t.top<e.innerHeight&&t.bottom>0}function Lc(n,t){let e=n.getBoundingClientRect();return{left:0,right:e.right-
e.left,top:t,bottom:e.bottom-(e.top+t)}}var ui=class{constructor(t,e,i,s){this.from=t,this.to=e,this.size=i,this.displaySize=
s}static same(t,e){if(t.length!=e.length)return!1;for(let i=0;i<t.length;i++){let s=t[i],r=e[i];if(s.from!=r.from||s.to!=
r.to||s.size!=r.size)return!1}return!0}draw(t,e){return z.replace({widget:new $s(this.displaySize*(e?t.scaleY:t.scaleX),
e)}).range(this.from,this.to)}},$s=class extends qt{constructor(t,e){super(),this.size=t,this.vertical=e}eq(t){return t.
size==this.size&&t.vertical==this.vertical}toDOM(){let t=document.createElement("div");return this.vertical?t.style.height=
this.size+"px":(t.style.width=this.size+"px",t.style.height="2px",t.style.display="inline-block"),t}get estimatedHeight(){
return this.vertical?this.size:-1}},vn=class{constructor(t){this.state=t,this.pixelViewport={left:0,right:window.innerWidth,
top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.
editorHeight=0,this.editorWidth=0,this.scrollTop=0,this.scrolledToBottom=!1,this.scaleX=1,this.scaleY=1,this.scrollAnchorPos=
0,this.scrollAnchorHeight=-1,this.scaler=al,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=
X.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let e=t.facet(sr).some(i=>typeof i!="function"&&i.class=="cm-\
lineWrapping");this.heightOracle=new Vs(e),this.stateDeco=t.facet(yi).filter(i=>typeof i!="function"),this.heightMap=gt.
empty().applyChanges(this.stateDeco,H.empty,this.heightOracle.setDoc(t.doc),[new Vt(0,0,0,t.doc.length)]);for(let i=0;i<
2&&(this.viewport=this.getViewport(0,null),!!this.updateForViewport());i++);this.updateViewportLines(),this.lineGaps=this.
ensureLineGaps([]),this.lineGapDeco=z.set(this.lineGaps.map(i=>i.draw(this,!1))),this.computeVisibleRanges()}updateForViewport(){
let t=[this.viewport],{main:e}=this.state.selection;for(let i=0;i<=1;i++){let s=i?e.head:e.anchor;if(!t.some(({from:r,to:o})=>s>=
r&&s<=o)){let{from:r,to:o}=this.lineBlockAt(s);t.push(new Ve(r,o))}}return this.viewports=t.sort((i,s)=>i.from-s.from),this.
updateScaler()}updateScaler(){let t=this.scaler;return this.scaler=this.heightMap.height<=7e6?al:new js(this.heightOracle,
this.heightMap,this.viewports),t.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(
this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,t=>{this.viewportLines.push(oi(t,this.scaler))})}update(t,e=null){
this.state=t.state;let i=this.stateDeco;this.stateDeco=this.state.facet(yi).filter(f=>typeof f!="function");let s=t.changedRanges,
r=Vt.extendWithRanges(s,Ac(i,this.stateDeco,t?t.changes:lt.empty(this.state.doc.length))),o=this.heightMap.height,l=this.
scrolledToBottom?null:this.scrollAnchorAt(this.scrollTop);ol(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,
t.startState.doc,this.heightOracle.setDoc(this.state.doc),r),(this.heightMap.height!=o||qe)&&(t.flags|=2),l?(this.scrollAnchorPos=
t.changes.mapPos(l.from,-1),this.scrollAnchorHeight=l.top):(this.scrollAnchorPos=-1,this.scrollAnchorHeight=o);let a=r.length?
this.mapViewport(this.viewport,t.changes):this.viewport;(e&&(e.range.head<a.from||e.range.head>a.to)||!this.viewportIsAppropriate(
a))&&(a=this.getViewport(0,e));let h=a.from!=this.viewport.from||a.to!=this.viewport.to;this.viewport=a,t.flags|=this.updateForViewport(),
(h||!t.changes.empty||t.flags&2)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>
4e3)&&this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,t.changes))),t.flags|=this.computeVisibleRanges(
t.changes),e&&(this.scrollTarget=e),!this.mustEnforceCursorAssoc&&t.selectionSet&&t.view.lineWrapping&&t.state.selection.
main.empty&&t.state.selection.main.assoc&&!t.state.facet(Wl)&&(this.mustEnforceCursorAssoc=!0)}measure(t){let e=t.contentDOM,
i=window.getComputedStyle(e),s=this.heightOracle,r=i.whiteSpace;this.defaultTextDirection=i.direction=="rtl"?X.RTL:X.LTR;
let o=this.heightOracle.mustRefreshForWrapping(r),l=e.getBoundingClientRect(),a=o||this.mustMeasureContent||this.contentDOMHeight!=
l.height;this.contentDOMHeight=l.height,this.mustMeasureContent=!1;let h=0,f=0;if(l.width&&l.height){let{scaleX:k,scaleY:b}=bl(
e,l);(k>.005&&Math.abs(this.scaleX-k)>.005||b>.005&&Math.abs(this.scaleY-b)>.005)&&(this.scaleX=k,this.scaleY=b,h|=16,o=
a=!0)}let c=(parseInt(i.paddingTop)||0)*this.scaleY,u=(parseInt(i.paddingBottom)||0)*this.scaleY;(this.paddingTop!=c||this.
paddingBottom!=u)&&(this.paddingTop=c,this.paddingBottom=u,h|=18),this.editorWidth!=t.scrollDOM.clientWidth&&(s.lineWrapping&&
(a=!0),this.editorWidth=t.scrollDOM.clientWidth,h|=16);let d=t.scrollDOM.scrollTop*this.scaleY;this.scrollTop!=d&&(this.
scrollAnchorHeight=-1,this.scrollTop=d),this.scrolledToBottom=wl(t.scrollDOM);let p=(this.printing?Lc:Mc)(e,this.paddingTop),
m=p.top-this.pixelViewport.top,g=p.bottom-this.pixelViewport.bottom;this.pixelViewport=p;let y=this.pixelViewport.bottom>
this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(y!=this.inView&&(this.inView=y,y&&(a=!0)),!this.
inView&&!this.scrollTarget&&!Dc(t.dom))return 0;let v=l.width;if((this.contentDOMWidth!=v||this.editorHeight!=t.scrollDOM.
clientHeight)&&(this.contentDOMWidth=l.width,this.editorHeight=t.scrollDOM.clientHeight,h|=16),a){let k=t.docView.measureVisibleLineHeights(
this.viewport);if(s.mustRefreshForHeights(k)&&(o=!0),o||s.lineWrapping&&Math.abs(v-this.contentDOMWidth)>s.charWidth){let{
lineHeight:b,charWidth:w,textHeight:S}=t.docView.measureTextSize();o=b>0&&s.refresh(r,b,w,S,Math.max(5,v/w),k),o&&(t.docView.
minWidth=0,h|=16)}m>0&&g>0?f=Math.max(m,g):m<0&&g<0&&(f=Math.min(m,g)),ol();for(let b of this.viewports){let w=b.from==this.
viewport.from?k:t.docView.measureVisibleLineHeights(b);this.heightMap=(o?gt.empty().applyChanges(this.stateDeco,H.empty,
this.heightOracle,[new Vt(0,0,0,t.state.doc.length)]):this.heightMap).updateHeight(s,0,o,new zs(b.from,w))}qe&&(h|=2)}let A=!this.
viewportIsAppropriate(this.viewport,f)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.
range.head>this.viewport.to);return A&&(h&2&&(h|=this.updateScaler()),this.viewport=this.getViewport(f,this.scrollTarget),
h|=this.updateForViewport()),(h&2||A)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.
from>4e3)&&this.updateLineGaps(this.ensureLineGaps(o?[]:this.lineGaps,t)),h|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc&&
(this.mustEnforceCursorAssoc=!1,t.docView.enforceCursorAssoc()),h}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.
top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(t,e){let i=.5-Math.max(-.5,Math.
min(.5,t/1e3/2)),s=this.heightMap,r=this.heightOracle,{visibleTop:o,visibleBottom:l}=this,a=new Ve(s.lineAt(o-i*1e3,_.ByHeight,
r,0,0).from,s.lineAt(l+(1-i)*1e3,_.ByHeight,r,0,0).to);if(e){let{head:h}=e.range;if(h<a.from||h>a.to){let f=Math.min(this.
editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),c=s.lineAt(h,_.ByPos,r,0,0),u;e.y=="center"?u=(c.top+c.bottom)/
2-f/2:e.y=="start"||e.y=="nearest"&&h<a.from?u=c.top:u=c.bottom-f,a=new Ve(s.lineAt(u-1e3/2,_.ByHeight,r,0,0).from,s.lineAt(
u+f+1e3/2,_.ByHeight,r,0,0).to)}}return a}mapViewport(t,e){let i=e.mapPos(t.from,-1),s=e.mapPos(t.to,1);return new Ve(this.
heightMap.lineAt(i,_.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(s,_.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({
from:t,to:e},i=0){if(!this.inView)return!0;let{top:s}=this.heightMap.lineAt(t,_.ByPos,this.heightOracle,0,0),{bottom:r}=this.
heightMap.lineAt(e,_.ByPos,this.heightOracle,0,0),{visibleTop:o,visibleBottom:l}=this;return(t==0||s<=o-Math.max(10,Math.
min(-i,250)))&&(e==this.state.doc.length||r>=l+Math.max(10,Math.min(i,250)))&&s>o-2*1e3&&r<l+2*1e3}mapLineGaps(t,e){if(!t.
length||e.empty)return t;let i=[];for(let s of t)e.touchesRange(s.from,s.to)||i.push(new ui(e.mapPos(s.from),e.mapPos(s.
to),s.size,s.displaySize));return i}ensureLineGaps(t,e){let i=this.heightOracle.lineWrapping,s=i?1e4:2e3,r=s>>1,o=s<<1;if(this.
defaultTextDirection!=X.LTR&&!i)return[];let l=[],a=(f,c,u,d)=>{if(c-f<r)return;let p=this.state.selection.main,m=[p.from];
p.empty||m.push(p.to);for(let y of m)if(y>f&&y<c){a(f,y-10,u,d),a(y+10,c,u,d);return}let g=Ec(t,y=>y.from>=u.from&&y.to<=
u.to&&Math.abs(y.from-f)<r&&Math.abs(y.to-c)<r&&!m.some(v=>y.from<v&&y.to>v));if(!g){if(c<u.to&&e&&i&&e.visibleRanges.some(
A=>A.from<=c&&A.to>=c)){let A=e.moveToLineBoundary(C.cursor(c),!1,!0).head;A>f&&(c=A)}let y=this.gapSize(u,f,c,d),v=i||y<
2e6?y:2e6;g=new ui(f,c,y,v)}l.push(g)},h=f=>{if(f.length<o||f.type!=mt.Text)return;let c=Tc(f.from,f.to,this.stateDeco);
if(c.total<o)return;let u=this.scrollTarget?this.scrollTarget.range.head:null,d,p;if(i){let m=s/this.heightOracle.lineLength*
this.heightOracle.lineHeight,g,y;if(u!=null){let v=ln(c,u),A=((this.visibleBottom-this.visibleTop)/2+m)/f.height;g=v-A,y=
v+A}else g=(this.visibleTop-f.top-m)/f.height,y=(this.visibleBottom-f.top+m)/f.height;d=on(c,g),p=on(c,y)}else{let m=c.total*
this.heightOracle.charWidth,g=s*this.heightOracle.charWidth,y=0;if(m>2e6)for(let w of t)w.from>=f.from&&w.from<f.to&&w.size!=
w.displaySize&&w.from*this.heightOracle.charWidth+y<this.pixelViewport.left&&(y=w.size-w.displaySize);let v=this.pixelViewport.
left+y,A=this.pixelViewport.right+y,k,b;if(u!=null){let w=ln(c,u),S=((A-v)/2+g)/m;k=w-S,b=w+S}else k=(v-g)/m,b=(A+g)/m;d=
on(c,k),p=on(c,b)}d>f.from&&a(f.from,d,f,c),p<f.to&&a(p,f.to,f,c)};for(let f of this.viewportLines)Array.isArray(f.type)?
f.type.forEach(h):h(f);return l}gapSize(t,e,i,s){let r=ln(s,i)-ln(s,e);return this.heightOracle.lineWrapping?t.height*r:
s.total*this.heightOracle.charWidth*r}updateLineGaps(t){ui.same(t,this.lineGaps)||(this.lineGaps=t,this.lineGapDeco=z.set(
t.map(e=>e.draw(this,this.heightOracle.lineWrapping))))}computeVisibleRanges(t){let e=this.stateDeco;this.lineGaps.length&&
(e=e.concat(this.lineGapDeco));let i=[];Q.spans(e,this.viewport.from,this.viewport.to,{span(r,o){i.push({from:r,to:o})},
point(){}},20);let s=0;if(i.length!=this.visibleRanges.length)s=12;else for(let r=0;r<i.length&&!(s&8);r++){let o=this.visibleRanges[r],
l=i[r];(o.from!=l.from||o.to!=l.to)&&(s|=4,t&&t.mapPos(o.from,-1)==l.from&&t.mapPos(o.to,1)==l.to||(s|=8))}return this.visibleRanges=
i,s}lineBlockAt(t){return t>=this.viewport.from&&t<=this.viewport.to&&this.viewportLines.find(e=>e.from<=t&&e.to>=t)||oi(
this.heightMap.lineAt(t,_.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(t){return t>=this.viewportLines[0].
top&&t<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find(e=>e.top<=t&&e.bottom>=t)||oi(this.
heightMap.lineAt(this.scaler.fromDOM(t),_.ByHeight,this.heightOracle,0,0),this.scaler)}scrollAnchorAt(t){let e=this.lineBlockAtHeight(
t+8);return e.from>=this.viewport.from||this.viewportLines[0].top-t>200?e:this.viewportLines[0]}elementAtHeight(t){return oi(
this.heightMap.blockAt(this.scaler.fromDOM(t),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(
this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}},Ve=class{constructor(t,e){
this.from=t,this.to=e}};function Tc(n,t,e){let i=[],s=n,r=0;return Q.spans(e,n,t,{span(){},point(o,l){o>s&&(i.push({from:s,
to:o}),r+=o-s),s=l}},20),s<t&&(i.push({from:s,to:t}),r+=t-s),{total:r,ranges:i}}function on({total:n,ranges:t},e){if(e<=
0)return t[0].from;if(e>=1)return t[t.length-1].to;let i=Math.floor(n*e);for(let s=0;;s++){let{from:r,to:o}=t[s],l=o-r;if(i<=
l)return r+i;i-=l}}function ln(n,t){let e=0;for(let{from:i,to:s}of n.ranges){if(t<=s){e+=t-i;break}e+=s-i}return e/n.total}
function Ec(n,t){for(let e of n)if(t(e))return e}var al={toDOM(n){return n},fromDOM(n){return n},scale:1,eq(n){return n==
this}},js=class n{constructor(t,e,i){let s=0,r=0,o=0;this.viewports=i.map(({from:l,to:a})=>{let h=e.lineAt(l,_.ByPos,t,0,
0).top,f=e.lineAt(a,_.ByPos,t,0,0).bottom;return s+=f-h,{from:l,to:a,top:h,bottom:f,domTop:0,domBottom:0}}),this.scale=(7e6-
s)/(e.height-s);for(let l of this.viewports)l.domTop=o+(l.top-r)*this.scale,o=l.domBottom=l.domTop+(l.bottom-l.top),r=l.
bottom}toDOM(t){for(let e=0,i=0,s=0;;e++){let r=e<this.viewports.length?this.viewports[e]:null;if(!r||t<r.top)return s+(t-
i)*this.scale;if(t<=r.bottom)return r.domTop+(t-r.top);i=r.bottom,s=r.domBottom}}fromDOM(t){for(let e=0,i=0,s=0;;e++){let r=e<
this.viewports.length?this.viewports[e]:null;if(!r||t<r.domTop)return i+(t-s)/this.scale;if(t<=r.domBottom)return r.top+
(t-r.domTop);i=r.bottom,s=r.domBottom}}eq(t){return t instanceof n?this.scale==t.scale&&this.viewports.length==t.viewports.
length&&this.viewports.every((e,i)=>e.from==t.viewports[i].from&&e.to==t.viewports[i].to):!1}};function oi(n,t){if(t.scale==
1)return n;let e=t.toDOM(n.top),i=t.toDOM(n.bottom);return new Ht(n.from,n.length,e,i-e,Array.isArray(n._content)?n._content.
map(s=>oi(s,t)):n._content)}var an=E.define({combine:n=>n.join(" ")}),Us=E.define({combine:n=>n.indexOf(!0)>-1}),_s=xt.newName(),
ha=xt.newName(),fa=xt.newName(),ca={"&light":"."+ha,"&dark":"."+fa};function Gs(n,t,e){return new xt(t,{finish(i){return/&/.
test(i)?i.replace(/&\w*/,s=>{if(s=="&")return n;if(!e||!e[s])throw new RangeError(`Unsupported selector: ${s}`);return e[s]}):
n+" "+i}})}var Bc=Gs("."+_s,{"&":{position:"relative !important",boxSizing:"border-box","&.cm-focused":{outline:"1px dot\
ted #212121"},display:"flex !important",flexDirection:"column"},".cm-scroller":{display:"flex !important",alignItems:"fl\
ex-start !important",fontFamily:"monospace",lineHeight:1.4,height:"100%",overflowX:"auto",position:"relative",zIndex:0,overflowAnchor:"\
none"},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:"block",whiteSpace:"pre",wordWrap:"normal",boxSizing:"bor\
der-box",minHeight:"100%",padding:"4px 0",outline:"none","&[contenteditable=true]":{WebkitUserModify:"read-write-plainte\
xt-only"}},".cm-lineWrapping":{whiteSpace_fallback:"pre-wrap",whiteSpace:"break-spaces",wordBreak:"break-word",overflowWrap:"\
anywhere",flexShrink:1},"&light .cm-content":{caretColor:"black"},"&dark .cm-content":{caretColor:"white"},".cm-line":{display:"\
block",padding:"0 2px 0 6px"},".cm-layer":{position:"absolute",left:0,top:0,contain:"size style","& > *":{position:"abso\
lute"}},"&light .cm-selectionBackground":{background:"#d9d9d9"},"&dark .cm-selectionBackground":{background:"#222"},"&li\
ght.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#d7d4f0"},"&dark.cm-focused > .\
cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#233"},".cm-cursorLayer":{pointerEvents:"none"},"\
&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:"steps(1) cm-blink 1.2s infinite"},"@keyframes cm-blink":{"0%":{},
"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{
borderLeft:"1.2px solid black",marginLeft:"-0.6px",pointerEvents:"none"},".cm-cursor":{display:"none"},"&dark .cm-cursor":{
borderLeftColor:"#ddd"},".cm-dropCursor":{position:"absolute"},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{
display:"block"},".cm-iso":{unicodeBidi:"isolate"},".cm-announced":{position:"fixed",top:"-10000px"},"@media print":{".c\
m-announced":{display:"none"}},"&light .cm-activeLine":{backgroundColor:"#cceeff44"},"&dark .cm-activeLine":{backgroundColor:"\
#99eeff33"},"&light .cm-specialChar":{color:"red"},"&dark .cm-specialChar":{color:"#f78"},".cm-gutters":{flexShrink:0,display:"\
flex",height:"100%",boxSizing:"border-box",zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},
"&light .cm-gutters":{backgroundColor:"#f5f5f5",color:"#6c6c6c",border:"0px solid #ddd","&.cm-gutters-before":{borderRightWidth:"\
1px"},"&.cm-gutters-after":{borderLeftWidth:"1px"}},"&dark .cm-gutters":{backgroundColor:"#333338",color:"#ccc"},".cm-gu\
tter":{display:"flex !important",flexDirection:"column",flexShrink:0,boxSizing:"border-box",minHeight:"100%",overflow:"h\
idden"},".cm-gutterElement":{boxSizing:"border-box"},".cm-lineNumbers .cm-gutterElement":{padding:"0 3px 0 5px",minWidth:"\
20px",textAlign:"right",whiteSpace:"nowrap"},"&light .cm-activeLineGutter":{backgroundColor:"#e2f2ff"},"&dark .cm-active\
LineGutter":{backgroundColor:"#222227"},".cm-panels":{boxSizing:"border-box",position:"sticky",left:0,right:0,zIndex:300},
"&light .cm-panels":{backgroundColor:"#f5f5f5",color:"black"},"&light .cm-panels-top":{borderBottom:"1px solid #ddd"},"&\
light .cm-panels-bottom":{borderTop:"1px solid #ddd"},"&dark .cm-panels":{backgroundColor:"#333338",color:"white"},".cm-\
dialog":{padding:"2px 19px 4px 6px",position:"relative","& label":{fontSize:"80%"}},".cm-dialog-close":{position:"absolu\
te",top:"3px",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",fontSize:"14px",padding:"0"},".cm-tab":{
display:"inline-block",overflow:"hidden",verticalAlign:"bottom"},".cm-widgetBuffer":{verticalAlign:"text-top",height:"1e\
m",width:0,display:"inline"},".cm-placeholder":{color:"#888",display:"inline-block",verticalAlign:"top",userSelect:"none"},
".cm-highlightSpace":{backgroundImage:"radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",backgroundPosition:"\
center"},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200\
" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>'\
)`,backgroundSize:"auto 100%",backgroundPosition:"right 90%",backgroundRepeat:"no-repeat"},".cm-trailingSpace":{backgroundColor:"\
#ff332255"},".cm-button":{verticalAlign:"middle",color:"inherit",fontSize:"70%",padding:".2em 1em",borderRadius:"1px"},"\
&light .cm-button":{backgroundImage:"linear-gradient(#eff1f5, #d9d9df)",border:"1px solid #888","&:active":{backgroundImage:"\
linear-gradient(#b4b4b4, #d0d3d6)"}},"&dark .cm-button":{backgroundImage:"linear-gradient(#393939, #111)",border:"1px so\
lid #888","&:active":{backgroundImage:"linear-gradient(#111, #333)"}},".cm-textfield":{verticalAlign:"middle",color:"inh\
erit",fontSize:"70%",border:"1px solid silver",padding:".2em .5em"},"&light .cm-textfield":{backgroundColor:"white"},"&d\
ark .cm-textfield":{border:"1px solid #555",backgroundColor:"inherit"}},ca),Oc={childList:!0,characterData:!0,subtree:!0,
attributes:!0,characterDataOldValue:!0},ks=L.ie&&L.ie_version<=11,Xs=class{constructor(t){this.view=t,this.active=!1,this.
editContext=null,this.selectionRange=new As,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=
[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,
this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=
-1,this.dom=t.contentDOM,this.observer=new MutationObserver(e=>{for(let i of e)this.queue.push(i);(L.ie&&L.ie_version<=11||
L.ios&&t.composing)&&e.some(i=>i.type=="childList"&&i.removedNodes.length||i.type=="characterData"&&i.oldValue.length>i.
target.nodeValue.length)?this.flushSoon():this.flush()}),window.EditContext&&L.android&&t.constructor.EDIT_CONTEXT!==!1&&
!(L.chrome&&L.chrome_version<126)&&(this.editContext=new Js(t),t.state.facet(Qt)&&(t.contentDOM.editContext=this.editContext.
editContext)),ks&&(this.onCharData=e=>{this.queue.push({target:e.target,type:"characterData",oldValue:e.prevValue}),this.
flushSoon()}),this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=
this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia&&(this.printQuery=window.matchMedia("pr\
int")),typeof ResizeObserver=="function"&&(this.resizeScroll=new ResizeObserver(()=>{var e;((e=this.view.docView)===null||
e===void 0?void 0:e.lastUpdate)<Date.now()-75&&this.onResize()}),this.resizeScroll.observe(t.scrollDOM)),this.addWindowListeners(
this.win=t.win),this.start(),typeof IntersectionObserver=="function"&&(this.intersection=new IntersectionObserver(e=>{this.
parentCheck<0&&(this.parentCheck=setTimeout(this.listenForScroll.bind(this),1e3)),e.length>0&&e[e.length-1].intersectionRatio>
0!=this.intersecting&&(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView&&this.onScrollChanged(document.
createEvent("Event")))},{threshold:[0,.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver(
e=>{e.length>0&&e[e.length-1].intersectionRatio>0&&this.onScrollChanged(document.createEvent("Event"))},{})),this.listenForScroll(),
this.readSelectionRange()}onScrollChanged(t){this.view.inputState.runHandlers("scroll",t),this.intersecting&&this.view.measure()}onScroll(t){
this.intersecting&&this.flush(!1),this.editContext&&this.view.requestMeasure(this.editContext.measureReq),this.onScrollChanged(
t)}onResize(){this.resizeTimeout<0&&(this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},
50))}onPrint(t){(t.type=="change"||!t.type)&&!t.matches||(this.view.viewState.printing=!0,this.view.measure(),setTimeout(
()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500))}updateGaps(t){if(this.gapIntersection&&(t.length!=
this.gaps.length||this.gaps.some((e,i)=>e!=t[i]))){this.gapIntersection.disconnect();for(let e of t)this.gapIntersection.
observe(e);this.gaps=t}}onSelectionChange(t){let e=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)
return;let{view:i}=this,s=this.selectionRange;if(i.state.facet(Qt)?i.root.activeElement!=this.dom:!fn(this.dom,s))return;
let r=s.anchorNode&&i.docView.nearest(s.anchorNode);if(r&&r.ignoreEvent(t)){e||(this.selectionChanged=!1);return}(L.ie&&
L.ie_version<=11||L.android&&L.chrome)&&!i.state.selection.main.empty&&s.focusNode&&li(s.focusNode,s.focusOffset,s.anchorNode,
s.anchorOffset)?this.flushSoon():this.flush(!1)}readSelectionRange(){let{view:t}=this,e=di(t.root);if(!e)return!1;let i=L.
safari&&t.root.nodeType==11&&t.root.activeElement==this.dom&&Pc(this.view,e)||e;if(!i||this.selectionRange.eq(i))return!1;
let s=fn(this.dom,i);return s&&!this.selectionChanged&&t.inputState.lastFocusTime>Date.now()-200&&t.inputState.lastTouchTime<
Date.now()-300&&Mf(this.dom,i)?(this.view.inputState.lastFocusTime=0,t.docView.updateSelection(),!1):(this.selectionRange.
setRange(i),s&&(this.selectionChanged=!0),!0)}setSelectionRange(t,e){this.selectionRange.set(t.node,t.offset,e.node,e.offset),
this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=
-1;let t=0,e=null;for(let i=this.dom;i;)if(i.nodeType==1)!e&&t<this.scrollTargets.length&&this.scrollTargets[t]==i?t++:e||
(e=this.scrollTargets.slice(0,t)),e&&e.push(i),i=i.assignedSlot||i.parentNode;else if(i.nodeType==11)i=i.host;else break;
if(t<this.scrollTargets.length&&!e&&(e=this.scrollTargets.slice(0,t)),e){for(let i of this.scrollTargets)i.removeEventListener(
"scroll",this.onScroll);for(let i of this.scrollTargets=e)i.addEventListener("scroll",this.onScroll)}}ignore(t){if(!this.
active)return t();try{return this.stop(),t()}finally{this.start(),this.clear()}}start(){this.active||(this.observer.observe(
this.dom,Oc),ks&&this.dom.addEventListener("DOMCharacterDataModified",this.onCharData),this.active=!0)}stop(){this.active&&
(this.active=!1,this.observer.disconnect(),ks&&this.dom.removeEventListener("DOMCharacterDataModified",this.onCharData))}clear(){
this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(t,e){var i;if(!this.delayedAndroidKey){
let s=()=>{let r=this.delayedAndroidKey;r&&(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=r.keyCode,this.
view.inputState.lastKeyTime=Date.now(),!this.flush()&&r.force&&ze(this.dom,r.key,r.keyCode))};this.flushingAndroidKey=this.
view.win.requestAnimationFrame(s)}(!this.delayedAndroidKey||t=="Enter")&&(this.delayedAndroidKey={key:t,keyCode:e,force:this.
lastChange<Date.now()-50||!!(!((i=this.delayedAndroidKey)===null||i===void 0)&&i.force)})}clearDelayedAndroidKey(){this.
win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){this.
delayedFlush<0&&(this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()}))}forceFlush(){
this.delayedFlush>=0&&(this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1),this.flush()}pendingRecords(){
for(let t of this.observer.takeRecords())this.queue.push(t);return this.queue}processRecords(){let t=this.pendingRecords();
t.length&&(this.queue=[]);let e=-1,i=-1,s=!1;for(let r of t){let o=this.readMutation(r);o&&(o.typeOver&&(s=!0),e==-1?{from:e,
to:i}=o:(e=Math.min(o.from,e),i=Math.max(o.to,i)))}return{from:e,to:i,typeOver:s}}readChange(){let{from:t,to:e,typeOver:i}=this.
processRecords(),s=this.selectionChanged&&fn(this.dom,this.selectionRange);if(t<0&&!s)return null;t>-1&&(this.lastChange=
Date.now()),this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let r=new Is(this.view,t,e,i);return this.view.
docView.domChanged={newSel:r.newSel?r.newSel.main:null},r}flush(t=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;
t&&this.readSelectionRange();let e=this.readChange();if(!e)return this.view.requestMeasure(),!1;let i=this.view.state,s=Zl(
this.view,e);return this.view.state==i&&(e.domChanged||e.newSel&&!e.newSel.main.eq(this.view.state.selection.main))&&this.
view.update([]),s}readMutation(t){let e=this.view.docView.nearest(t.target);if(!e||e.ignoreMutation(t))return null;if(e.
markDirty(t.type=="attributes"),t.type=="attributes"&&(e.flags|=4),t.type=="childList"){let i=hl(e,t.previousSibling||t.
target.previousSibling,-1),s=hl(e,t.nextSibling||t.target.nextSibling,1);return{from:i?e.posAfter(i):e.posAtStart,to:s?e.
posBefore(s):e.posAtEnd,typeOver:!1}}else return t.type=="characterData"?{from:e.posAtStart,to:e.posAtEnd,typeOver:t.target.
nodeValue==t.oldValue}:null}setWindow(t){t!=this.win&&(this.removeWindowListeners(this.win),this.win=t,this.addWindowListeners(
this.win))}addWindowListeners(t){t.addEventListener("resize",this.onResize),this.printQuery?this.printQuery.addEventListener?
this.printQuery.addEventListener("change",this.onPrint):this.printQuery.addListener(this.onPrint):t.addEventListener("be\
foreprint",this.onPrint),t.addEventListener("scroll",this.onScroll),t.document.addEventListener("selectionchange",this.onSelectionChange)}removeWindowListeners(t){
t.removeEventListener("scroll",this.onScroll),t.removeEventListener("resize",this.onResize),this.printQuery?this.printQuery.
removeEventListener?this.printQuery.removeEventListener("change",this.onPrint):this.printQuery.removeListener(this.onPrint):
t.removeEventListener("beforeprint",this.onPrint),t.document.removeEventListener("selectionchange",this.onSelectionChange)}update(t){
this.editContext&&(this.editContext.update(t),t.startState.facet(Qt)!=t.state.facet(Qt)&&(t.view.contentDOM.editContext=
t.state.facet(Qt)?this.editContext.editContext:null))}destroy(){var t,e,i;this.stop(),(t=this.intersection)===null||t===
void 0||t.disconnect(),(e=this.gapIntersection)===null||e===void 0||e.disconnect(),(i=this.resizeScroll)===null||i===void 0||
i.disconnect();for(let s of this.scrollTargets)s.removeEventListener("scroll",this.onScroll);this.removeWindowListeners(
this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),
this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext&&(this.view.contentDOM.editContext=null,this.editContext.
destroy())}};function hl(n,t,e){for(;t;){let i=$.get(t);if(i&&i.parent==n)return i;let s=t.parentNode;t=s!=n.dom?s:e>0?t.
nextSibling:t.previousSibling}return null}function fl(n,t){let e=t.startContainer,i=t.startOffset,s=t.endContainer,r=t.endOffset,
o=n.docView.domAtPos(n.state.selection.main.anchor);return li(o.node,o.offset,s,r)&&([e,i,s,r]=[s,r,e,i]),{anchorNode:e,
anchorOffset:i,focusNode:s,focusOffset:r}}function Pc(n,t){if(t.getComposedRanges){let s=t.getComposedRanges(n.root)[0];
if(s)return fl(n,s)}let e=null;function i(s){s.preventDefault(),s.stopImmediatePropagation(),e=s.getTargetRanges()[0]}return n.
contentDOM.addEventListener("beforeinput",i,!0),n.dom.ownerDocument.execCommand("indent"),n.contentDOM.removeEventListener(
"beforeinput",i,!0),e?fl(n,e):null}var Js=class{constructor(t){this.from=0,this.to=0,this.pendingContextChange=null,this.
handlers=Object.create(null),this.composing=null,this.resetRange(t.state);let e=this.editContext=new window.EditContext(
{text:t.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,t.
state.selection.main.anchor))),selectionEnd:this.toContextPos(t.state.selection.main.head)});this.handlers.textupdate=i=>{
let s=t.state.selection.main,{anchor:r,head:o}=s,l=this.toEditorPos(i.updateRangeStart),a=this.toEditorPos(i.updateRangeEnd);
t.inputState.composing>=0&&!this.composing&&(this.composing={contextBase:i.updateRangeStart,editorBase:l,drifted:!1});let h=a-
l>i.text.length;l==this.from&&r<this.from?l=r:a==this.to&&r>this.to&&(a=r);let f=ta(t.state.sliceDoc(l,a),i.text,(h?s.from:
s.to)-l,h?"end":null);if(!f){let u=C.single(this.toEditorPos(i.selectionStart),this.toEditorPos(i.selectionEnd));u.main.
eq(s)||t.dispatch({selection:u,userEvent:"select"});return}let c={from:f.from+l,to:f.toA+l,insert:H.of(i.text.slice(f.from,
f.toB).split(`
`))};if((L.mac||L.android)&&c.from==o-1&&/^\. ?$/.test(i.text)&&t.contentDOM.getAttribute("autocorrect")=="off"&&(c={from:l,
to:a,insert:H.of([i.text.replace("."," ")])}),this.pendingContextChange=c,!t.state.readOnly){let u=this.to-this.from+(c.
to-c.from+c.insert.length);rr(t,c,C.single(this.toEditorPos(i.selectionStart,u),this.toEditorPos(i.selectionEnd,u)))}this.
pendingContextChange&&(this.revertPending(t.state),this.setSelection(t.state)),c.from<c.to&&!c.insert.length&&t.inputState.
composing>=0&&!/[\\p{Alphabetic}\\p{Number}_]/.test(e.text.slice(Math.max(0,i.updateRangeStart-1),Math.min(e.text.length,
i.updateRangeStart+1)))&&this.handlers.compositionend(i)},this.handlers.characterboundsupdate=i=>{let s=[],r=null;for(let o=this.
toEditorPos(i.rangeStart),l=this.toEditorPos(i.rangeEnd);o<l;o++){let a=t.coordsForChar(o);r=a&&new DOMRect(a.left,a.top,
a.right-a.left,a.bottom-a.top)||r||new DOMRect,s.push(r)}e.updateCharacterBounds(i.rangeStart,s)},this.handlers.textformatupdate=
i=>{let s=[];for(let r of i.getTextFormats()){let o=r.underlineStyle,l=r.underlineThickness;if(!/none/i.test(o)&&!/none/i.
test(l)){let a=this.toEditorPos(r.rangeStart),h=this.toEditorPos(r.rangeEnd);if(a<h){let f=`text-decoration: underline ${/^[a-z]/.
test(o)?o+" ":o=="Dashed"?"dashed ":o=="Squiggle"?"wavy ":""}${/thin/i.test(l)?1:2}px`;s.push(z.mark({attributes:{style:f}}).
range(a,h))}}}t.dispatch({effects:Kl.of(z.set(s))})},this.handlers.compositionstart=()=>{t.inputState.composing<0&&(t.inputState.
composing=0,t.inputState.compositionFirstChange=!0)},this.handlers.compositionend=()=>{if(t.inputState.composing=-1,t.inputState.
compositionFirstChange=null,this.composing){let{drifted:i}=this.composing;this.composing=null,i&&this.reset(t.state)}};for(let i in this.
handlers)e.addEventListener(i,this.handlers[i]);this.measureReq={read:i=>{this.editContext.updateControlBounds(i.contentDOM.
getBoundingClientRect());let s=di(i.root);s&&s.rangeCount&&this.editContext.updateSelectionBounds(s.getRangeAt(0).getBoundingClientRect())}}}applyEdits(t){
let e=0,i=!1,s=this.pendingContextChange;return t.changes.iterChanges((r,o,l,a,h)=>{if(i)return;let f=h.length-(o-r);if(s&&
o>=s.to)if(s.from==r&&s.to==o&&s.insert.eq(h)){s=this.pendingContextChange=null,e+=f,this.to+=f;return}else s=null,this.
revertPending(t.state);if(r+=e,o+=e,o<=this.from)this.from+=f,this.to+=f;else if(r<this.to){if(r<this.from||o>this.to||this.
to-this.from+h.length>3e4){i=!0;return}this.editContext.updateText(this.toContextPos(r),this.toContextPos(o),h.toString()),
this.to+=f}e+=f}),s&&!i&&this.revertPending(t.state),!i}update(t){let e=this.pendingContextChange,i=t.startState.selection.
main;this.composing&&(this.composing.drifted||!t.changes.touchesRange(i.from,i.to)&&t.transactions.some(s=>!s.isUserEvent(
"input.type")&&s.changes.touchesRange(this.from,this.to)))?(this.composing.drifted=!0,this.composing.editorBase=t.changes.
mapPos(this.composing.editorBase)):!this.applyEdits(t)||!this.rangeIsValid(t.state)?(this.pendingContextChange=null,this.
reset(t.state)):(t.docChanged||t.selectionSet||e)&&this.setSelection(t.state),(t.geometryChanged||t.docChanged||t.selectionSet)&&
t.view.requestMeasure(this.measureReq)}resetRange(t){let{head:e}=t.selection.main;this.from=Math.max(0,e-1e4),this.to=Math.
min(t.doc.length,e+1e4)}reset(t){this.resetRange(t),this.editContext.updateText(0,this.editContext.text.length,t.doc.sliceString(
this.from,this.to)),this.setSelection(t)}revertPending(t){let e=this.pendingContextChange;this.pendingContextChange=null,
this.editContext.updateText(this.toContextPos(e.from),this.toContextPos(e.from+e.insert.length),t.doc.sliceString(e.from,
e.to))}setSelection(t){let{main:e}=t.selection,i=this.toContextPos(Math.max(this.from,Math.min(this.to,e.anchor))),s=this.
toContextPos(e.head);(this.editContext.selectionStart!=i||this.editContext.selectionEnd!=s)&&this.editContext.updateSelection(
i,s)}rangeIsValid(t){let{head:e}=t.selection.main;return!(this.from>0&&e-this.from<500||this.to<t.doc.length&&this.to-e<
500||this.to-this.from>1e4*3)}toEditorPos(t,e=this.to-this.from){t=Math.min(t,e);let i=this.composing;return i&&i.drifted?
i.editorBase+(t-i.contextBase):t+this.from}toContextPos(t){let e=this.composing;return e&&e.drifted?e.contextBase+(t-e.editorBase):
t-this.from}destroy(){for(let t in this.handlers)this.editContext.removeEventListener(t,this.handlers[t])}},B=class n{get state(){
return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){
return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){
return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.
defaultView||window}constructor(t={}){var e;this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs=
{},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.contentDOM=
document.createElement("div"),this.scrollDOM=document.createElement("div"),this.scrollDOM.tabIndex=-1,this.scrollDOM.className=
"cm-scroller",this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement("div"),this.announceDOM.
className="cm-announced",this.announceDOM.setAttribute("aria-live","polite"),this.dom=document.createElement("div"),this.
dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),t.parent&&t.parent.appendChild(this.dom);let{dispatch:i}=t;
this.dispatchTransactions=t.dispatchTransactions||i&&(s=>s.forEach(r=>i(r,this)))||(s=>this.update(s)),this.dispatch=this.
dispatch.bind(this),this._root=t.root||Af(t.parent)||document,this.viewState=new vn(t.state||U.create(t)),t.scrollTo&&t.
scrollTo.is(nn)&&(this.viewState.scrollTarget=t.scrollTo.value.clip(this.viewState.state)),this.plugins=this.state.facet(
Fe).map(s=>new fi(s));for(let s of this.plugins)s.update(this);this.observer=new Xs(this),this.inputState=new Ns(this),this.
inputState.ensureHandlers(this.plugins),this.docView=new kn(this),this.mountStyles(),this.updateAttrs(),this.updateState=
0,this.requestMeasure(),!((e=document.fonts)===null||e===void 0)&&e.ready&&document.fonts.ready.then(()=>this.requestMeasure())}dispatch(...t){
let e=t.length==1&&t[0]instanceof J?t:t.length==1&&Array.isArray(t[0])?t[0]:[this.state.update(...t)];this.dispatchTransactions(
e,this)}update(t){if(this.updateState!=0)throw new Error("Calls to EditorView.update are not allowed while an update is \
in progress");let e=!1,i=!1,s,r=this.state;for(let u of t){if(u.startState!=r)throw new RangeError("Trying to update sta\
te with a transaction that doesn't start from the previous state.");r=u.state}if(this.destroyed){this.viewState.state=r;
return}let o=this.hasFocus,l=0,a=null;t.some(u=>u.annotation(oa))?(this.inputState.notifiedFocused=o,l=1):o!=this.inputState.
notifiedFocused&&(this.inputState.notifiedFocused=o,a=la(r,o),a||(l=1));let h=this.observer.delayedAndroidKey,f=null;if(h?
(this.observer.clearDelayedAndroidKey(),f=this.observer.readChange(),(f&&!this.state.doc.eq(r.doc)||!this.state.selection.
eq(r.selection))&&(f=null)):this.observer.clear(),r.facet(U.phrases)!=this.state.facet(U.phrases))return this.setState(r);
s=yn.create(this,r,t),s.flags|=l;let c=this.viewState.scrollTarget;try{this.updateState=2;for(let u of t){if(c&&(c=c.map(
u.changes)),u.scrollIntoView){let{main:d}=u.state.selection;c=new hi(d.empty?d:C.cursor(d.head,d.head>d.anchor?-1:1))}for(let d of u.
effects)d.is(nn)&&(c=d.value.clip(this.state))}this.viewState.update(s,c),this.bidiCache=Cn.update(this.bidiCache,s.changes),
s.empty||(this.updatePlugins(s),this.inputState.update(s)),e=this.docView.update(s),this.state.facet(si)!=this.styleModules&&
this.mountStyles(),i=this.updateAttrs(),this.showAnnouncements(t),this.docView.updateSelection(e,t.some(u=>u.isUserEvent(
"select.pointer")))}finally{this.updateState=0}if(s.startState.facet(an)!=s.state.facet(an)&&(this.viewState.mustMeasureContent=
!0),(e||i||c||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)&&this.requestMeasure(),e&&this.docViewUpdate(),
!s.empty)for(let u of this.state.facet(Bs))try{u(s)}catch(d){Tt(this.state,d,"update listener")}(a||f)&&Promise.resolve().
then(()=>{a&&this.state==a.startState&&this.dispatch(a),f&&!Zl(this,f)&&h.force&&ze(this.contentDOM,h.key,h.keyCode)})}setState(t){
if(this.updateState!=0)throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");if(this.
destroyed){this.viewState.state=t;return}this.updateState=2;let e=this.hasFocus;try{for(let i of this.plugins)i.destroy(
this);this.viewState=new vn(t),this.plugins=t.facet(Fe).map(i=>new fi(i)),this.pluginMap.clear();for(let i of this.plugins)
i.update(this);this.docView.destroy(),this.docView=new kn(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),
this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}e&&this.focus(),this.requestMeasure()}updatePlugins(t){let e=t.
startState.facet(Fe),i=t.state.facet(Fe);if(e!=i){let s=[];for(let r of i){let o=e.indexOf(r);if(o<0)s.push(new fi(r));else{
let l=this.plugins[o];l.mustUpdate=t,s.push(l)}}for(let r of this.plugins)r.mustUpdate!=t&&r.destroy(this);this.plugins=
s,this.pluginMap.clear()}else for(let s of this.plugins)s.mustUpdate=t;for(let s=0;s<this.plugins.length;s++)this.plugins[s].
update(this);e!=i&&this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let t of this.plugins){let e=t.value;
if(e&&e.docViewUpdate)try{e.docViewUpdate(this)}catch(i){Tt(this.state,i,"doc view update listener")}}}measure(t=!0){if(this.
destroyed)return;if(this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.observer.delayedAndroidKey){
this.measureScheduled=-1,this.requestMeasure();return}this.measureScheduled=0,t&&this.observer.forceFlush();let e=null,i=this.
scrollDOM,s=i.scrollTop*this.scaleY,{scrollAnchorPos:r,scrollAnchorHeight:o}=this.viewState;Math.abs(s-this.viewState.scrollTop)>
1&&(o=-1),this.viewState.scrollAnchorHeight=-1;try{for(let l=0;;l++){if(o<0)if(wl(i))r=-1,o=this.viewState.heightMap.height;else{
let d=this.viewState.scrollAnchorAt(s);r=d.from,o=d.top}this.updateState=1;let a=this.viewState.measure(this);if(!a&&!this.
measureRequests.length&&this.viewState.scrollTarget==null)break;if(l>5){console.warn(this.measureRequests.length?"Measur\
e loop restarted more than 5 times":"Viewport failed to stabilize");break}let h=[];a&4||([this.measureRequests,h]=[h,this.
measureRequests]);let f=h.map(d=>{try{return d.read(this)}catch(p){return Tt(this.state,p),cl}}),c=yn.create(this,this.state,
[]),u=!1;c.flags|=a,e?e.flags|=a:e=c,this.updateState=2,c.empty||(this.updatePlugins(c),this.inputState.update(c),this.updateAttrs(),
u=this.docView.update(c),u&&this.docViewUpdate());for(let d=0;d<h.length;d++)if(f[d]!=cl)try{let p=h[d];p.write&&p.write(
f[d],this)}catch(p){Tt(this.state,p)}if(u&&this.docView.updateSelection(!0),!c.viewportChanged&&this.measureRequests.length==
0){if(this.viewState.editorHeight)if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),
this.viewState.scrollTarget=null,o=-1;continue}else{let p=(r<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(
r).top)-o;if(p>1||p<-1){s=s+p,i.scrollTop=s/this.scaleY,o=-1;continue}}break}}}finally{this.updateState=0,this.measureScheduled=
-1}if(e&&!e.empty)for(let l of this.state.facet(Bs))l(e)}get themeClasses(){return _s+" "+(this.state.facet(Us)?fa:ha)+"\
 "+this.state.facet(an)}updateAttrs(){let t=ul(this,$l,{class:"cm-editor"+(this.hasFocus?" cm-focused ":" ")+this.themeClasses}),
e={spellcheck:"false",autocorrect:"off",autocapitalize:"off",writingsuggestions:"false",translate:"no",contenteditable:this.
state.facet(Qt)?"true":"false",class:"cm-content",style:`${L.tabSize}: ${this.state.tabSize}`,role:"textbox","aria-multi\
line":"true"};this.state.readOnly&&(e["aria-readonly"]="true"),ul(this,sr,e);let i=this.observer.ignore(()=>{let s=Ds(this.
contentDOM,this.contentAttrs,e),r=Ds(this.dom,this.editorAttrs,t);return s||r});return this.editorAttrs=t,this.contentAttrs=
e,i}showAnnouncements(t){let e=!0;for(let i of t)for(let s of i.effects)if(s.is(n.announce)){e&&(this.announceDOM.textContent=
""),e=!1;let r=this.announceDOM.appendChild(document.createElement("div"));r.textContent=s.value}}mountStyles(){this.styleModules=
this.state.facet(si);let t=this.state.facet(n.cspNonce);xt.mount(this.root,this.styleModules.concat(Bc).reverse(),t?{nonce:t}:
void 0)}readMeasured(){if(this.updateState==2)throw new Error("Reading the editor layout isn't allowed during an update");
this.updateState==0&&this.measureScheduled>-1&&this.measure(!1)}requestMeasure(t){if(this.measureScheduled<0&&(this.measureScheduled=
this.win.requestAnimationFrame(()=>this.measure())),t){if(this.measureRequests.indexOf(t)>-1)return;if(t.key!=null){for(let e=0;e<
this.measureRequests.length;e++)if(this.measureRequests[e].key===t.key){this.measureRequests[e]=t;return}}this.measureRequests.
push(t)}}plugin(t){let e=this.pluginMap.get(t);return(e===void 0||e&&e.plugin!=t)&&this.pluginMap.set(t,e=this.plugins.find(
i=>i.plugin==t)||null),e&&e.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.
viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){
return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(t){return this.readMeasured(),this.
viewState.elementAtHeight(t)}lineBlockAtHeight(t){return this.readMeasured(),this.viewState.lineBlockAtHeight(t)}get viewportLineBlocks(){
return this.viewState.viewportLines}lineBlockAt(t){return this.viewState.lineBlockAt(t)}get contentHeight(){return this.
viewState.contentHeight}moveByChar(t,e,i){return ys(this,t,Xo(this,t,e,i))}moveByGroup(t,e){return ys(this,t,Xo(this,t,e,
i=>ic(this,t.head,i)))}visualLineSide(t,e){let i=this.bidiSpans(t),s=this.textDirectionAt(t.from),r=i[e?i.length-1:0];return C.
cursor(r.side(e,s)+t.from,r.forward(!e,s)?1:-1)}moveToLineBoundary(t,e,i=!0){return ec(this,t,e,i)}moveVertically(t,e,i){
return ys(this,t,nc(this,t,e,i))}domAtPos(t){return this.docView.domAtPos(t)}posAtDOM(t,e=0){return this.docView.posFromDOM(
t,e)}posAtCoords(t,e=!0){return this.readMeasured(),Jl(this,t,e)}coordsAtPos(t,e=1){this.readMeasured();let i=this.docView.
coordsAt(t,e);if(!i||i.left==i.right)return i;let s=this.state.doc.lineAt(t),r=this.bidiSpans(s),o=r[Ft.find(r,t-s.from,
-1,e)];return xi(i,o.dir==X.LTR==e>0)}coordsForChar(t){return this.readMeasured(),this.docView.coordsForChar(t)}get defaultCharacterWidth(){
return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){
return this.viewState.defaultTextDirection}textDirectionAt(t){return!this.state.facet(zl)||t<this.viewport.from||t>this.
viewport.to?this.textDirection:(this.readMeasured(),this.docView.textDirectionAt(t))}get lineWrapping(){return this.viewState.
heightOracle.lineWrapping}bidiSpans(t){if(t.length>Rc)return Ol(t.length);let e=this.textDirectionAt(t.from),i;for(let r of this.
bidiCache)if(r.from==t.from&&r.dir==e&&(r.fresh||Bl(r.isolates,i=$o(this,t))))return r.order;i||(i=$o(this,t));let s=Vf(
t.text,e,i);return this.bidiCache.push(new Cn(t.from,t.to,e,i,!0,s)),s}get hasFocus(){var t;return(this.dom.ownerDocument.
hasFocus()||L.safari&&((t=this.inputState)===null||t===void 0?void 0:t.lastContextMenu)>Date.now()-3e4)&&this.root.activeElement==
this.contentDOM}focus(){this.observer.ignore(()=>{yl(this.contentDOM),this.docView.updateSelection()})}setRoot(t){this._root!=
t&&(this._root=t,this.observer.setWindow((t.nodeType==9?t:t.ownerDocument).defaultView||window),this.mountStyles())}destroy(){
this.root.activeElement==this.contentDOM&&this.contentDOM.blur();for(let t of this.plugins)t.destroy(this);this.plugins=
[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.measureScheduled>-1&&
this.win.cancelAnimationFrame(this.measureScheduled),this.destroyed=!0}static scrollIntoView(t,e={}){return nn.of(new hi(
typeof t=="number"?C.cursor(t):t,e.y,e.x,e.yMargin,e.xMargin))}scrollSnapshot(){let{scrollTop:t,scrollLeft:e}=this.scrollDOM,
i=this.viewState.scrollAnchorAt(t);return nn.of(new hi(C.cursor(i.from),"start","start",i.top-t,e,!0))}setTabFocusMode(t){
t==null?this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1:typeof t=="boolean"?this.inputState.tabFocusMode=
t?0:-1:this.inputState.tabFocusMode!=0&&(this.inputState.tabFocusMode=Date.now()+t)}static domEventHandlers(t){return Kt.
define(()=>({}),{eventHandlers:t})}static domEventObservers(t){return Kt.define(()=>({}),{eventObservers:t})}static theme(t,e){
let i=xt.newName(),s=[an.of(i),si.of(Gs(`.${i}`,t))];return e&&e.dark&&s.push(Us.of(!0)),s}static baseTheme(t){return ii.
lowest(si.of(Gs("."+_s,t,ca)))}static findFromDOM(t){var e;let i=t.querySelector(".cm-content"),s=i&&$.get(i)||$.get(t);
return((e=s?.rootView)===null||e===void 0?void 0:e.view)||null}};B.styleModule=si;B.inputHandler=Fl;B.clipboardInputFilter=
ir;B.clipboardOutputFilter=nr;B.scrollHandler=ql;B.focusChangeEffect=Vl;B.perLineTextDirection=zl;B.exceptionSink=Hl;B.updateListener=
Bs;B.editable=Qt;B.mouseSelectionStyle=Nl;B.dragMovesSelection=Il;B.clickAddsSelectionRange=Rl;B.decorations=yi;B.outerDecorations=
jl;B.atomicRanges=Si;B.bidiIsolatedRanges=Ul;B.scrollMargins=_l;B.darkTheme=Us;B.cspNonce=E.define({combine:n=>n.length?
n[0]:""});B.contentAttributes=sr;B.editorAttributes=$l;B.lineWrapping=B.contentAttributes.of({class:"cm-lineWrapping"});
B.announce=q.define();var Rc=4096,cl={},Cn=class n{constructor(t,e,i,s,r,o){this.from=t,this.to=e,this.dir=i,this.isolates=
s,this.fresh=r,this.order=o}static update(t,e){if(e.empty&&!t.some(r=>r.fresh))return t;let i=[],s=t.length?t[t.length-1].
dir:X.LTR;for(let r=Math.max(0,t.length-10);r<t.length;r++){let o=t[r];o.dir==s&&!e.touchesRange(o.from,o.to)&&i.push(new n(
e.mapPos(o.from,1),e.mapPos(o.to,-1),o.dir,o.isolates,!1,o.order))}return i}};function ul(n,t,e){for(let i=n.state.facet(
t),s=i.length-1;s>=0;s--){let r=i[s],o=typeof r=="function"?r(n):r;o&&Ms(o,e)}return e}var Ic=L.mac?"mac":L.windows?"win":
L.linux?"linux":"key";function Nc(n,t){let e=n.split(/-(?!$)/),i=e[e.length-1];i=="Space"&&(i=" ");let s,r,o,l;for(let a=0;a<
e.length-1;++a){let h=e[a];if(/^(cmd|meta|m)$/i.test(h))l=!0;else if(/^a(lt)?$/i.test(h))s=!0;else if(/^(c|ctrl|control)$/i.
test(h))r=!0;else if(/^s(hift)?$/i.test(h))o=!0;else if(/^mod$/i.test(h))t=="mac"?l=!0:r=!0;else throw new Error("Unreco\
gnized modifier name: "+h)}return s&&(i="Alt-"+i),r&&(i="Ctrl-"+i),l&&(i="Meta-"+i),o&&(i="Shift-"+i),i}function hn(n,t,e){
return t.altKey&&(n="Alt-"+n),t.ctrlKey&&(n="Ctrl-"+n),t.metaKey&&(n="Meta-"+n),e!==!1&&t.shiftKey&&(n="Shift-"+n),n}var Hc=ii.
default(B.domEventHandlers({keydown(n,t){return Wc(Fc(t.state),n,t,"editor")}})),or=E.define({enables:Hc}),dl=new WeakMap;
function Fc(n){let t=n.facet(or),e=dl.get(t);return e||dl.set(t,e=zc(t.reduce((i,s)=>i.concat(s),[]))),e}var ie=null,Vc=4e3;function zc(n,t=Ic){let e=Object.create(null),i=Object.create(null),s=(o,l)=>{let a=i[o];if(a==null)i[o]=
l;else if(a!=l)throw new Error("Key binding "+o+" is used both as a regular binding and as a multi-stroke prefix")},r=(o,l,a,h,f)=>{
var c,u;let d=e[o]||(e[o]=Object.create(null)),p=l.split(/ (?!$)/).map(y=>Nc(y,t));for(let y=1;y<p.length;y++){let v=p.slice(
0,y).join(" ");s(v,!0),d[v]||(d[v]={preventDefault:!0,stopPropagation:!1,run:[A=>{let k=ie={view:A,prefix:v,scope:o};return setTimeout(
()=>{ie==k&&(ie=null)},Vc),!0}]})}let m=p.join(" ");s(m,!1);let g=d[m]||(d[m]={preventDefault:!1,stopPropagation:!1,run:((u=
(c=d._any)===null||c===void 0?void 0:c.run)===null||u===void 0?void 0:u.slice())||[]});a&&g.run.push(a),h&&(g.preventDefault=
!0),f&&(g.stopPropagation=!0)};for(let o of n){let l=o.scope?o.scope.split(" "):["editor"];if(o.any)for(let h of l){let f=e[h]||
(e[h]=Object.create(null));f._any||(f._any={preventDefault:!1,stopPropagation:!1,run:[]});let{any:c}=o;for(let u in f)f[u].
run.push(d=>c(d,Ys))}let a=o[t]||o.key;if(a)for(let h of l)r(h,a,o.run,o.preventDefault,o.stopPropagation),o.shift&&r(h,
"Shift-"+a,o.shift,o.preventDefault,o.stopPropagation)}return e}var Ys=null;function Wc(n,t,e,i){Ys=t;let s=No(t),r=wo(s,
0),o=xo(r)==s.length&&s!=" ",l="",a=!1,h=!1,f=!1;ie&&ie.view==e&&ie.scope==i&&(l=ie.prefix+" ",ia.indexOf(t.keyCode)<0&&
(h=!0,ie=null));let c=new Set,u=g=>{if(g){for(let y of g.run)if(!c.has(y)&&(c.add(y),y(e)))return g.stopPropagation&&(f=
!0),!0;g.preventDefault&&(g.stopPropagation&&(f=!0),h=!0)}return!1},d=n[i],p,m;return d&&(u(d[l+hn(s,t,!o)])?a=!0:o&&(t.
altKey||t.metaKey||t.ctrlKey)&&!(L.windows&&t.ctrlKey&&t.altKey)&&!(L.mac&&t.altKey&&!(t.ctrlKey||t.metaKey))&&(p=Yt[t.keyCode])&&
p!=s?(u(d[l+hn(p,t,!0)])||t.shiftKey&&(m=He[t.keyCode])!=s&&m!=p&&u(d[l+hn(m,t,!1)]))&&(a=!0):o&&t.shiftKey&&u(d[l+hn(s,
t,!0)])&&(a=!0),!a&&u(d._any)&&(a=!0)),h&&(a=!0),a&&f&&t.stopPropagation(),Ys=null,a}var ki=class n{constructor(t,e,i,s,r){
this.className=t,this.left=e,this.top=i,this.width=s,this.height=r}draw(){let t=document.createElement("div");return t.className=
this.className,this.adjust(t),t}update(t,e){return e.className!=this.className?!1:(this.adjust(t),!0)}adjust(t){t.style.
left=this.left+"px",t.style.top=this.top+"px",this.width!=null&&(t.style.width=this.width+"px"),t.style.height=this.height+
"px"}eq(t){return this.left==t.left&&this.top==t.top&&this.width==t.width&&this.height==t.height&&this.className==t.className}static forRange(t,e,i){
if(i.empty){let s=t.coordsAtPos(i.head,i.assoc||1);if(!s)return[];let r=ua(t);return[new n(e,s.left-r.left,s.top-r.top,null,
s.bottom-s.top)]}else return qc(t,e,i)}};function ua(n){let t=n.scrollDOM.getBoundingClientRect();return{left:(n.textDirection==
X.LTR?t.left:t.right-n.scrollDOM.clientWidth*n.scaleX)-n.scrollDOM.scrollLeft*n.scaleX,top:t.top-n.scrollDOM.scrollTop*n.
scaleY}}function pl(n,t,e,i){let s=n.coordsAtPos(t,e*2);if(!s)return i;let r=n.dom.getBoundingClientRect(),o=(s.top+s.bottom)/
2,l=n.posAtCoords({x:r.left+1,y:o}),a=n.posAtCoords({x:r.right-1,y:o});return l==null||a==null?i:{from:Math.max(i.from,Math.
min(l,a)),to:Math.min(i.to,Math.max(l,a))}}function qc(n,t,e){if(e.to<=n.viewport.from||e.from>=n.viewport.to)return[];let i=Math.
max(e.from,n.viewport.from),s=Math.min(e.to,n.viewport.to),r=n.textDirection==X.LTR,o=n.contentDOM,l=o.getBoundingClientRect(),
a=ua(n),h=o.querySelector(".cm-line"),f=h&&window.getComputedStyle(h),c=l.left+(f?parseInt(f.paddingLeft)+Math.min(0,parseInt(
f.textIndent)):0),u=l.right-(f?parseInt(f.paddingRight):0),d=Ps(n,i,1),p=Ps(n,s,-1),m=d.type==mt.Text?d:null,g=p.type==mt.
Text?p:null;if(m&&(n.lineWrapping||d.widgetLineBreaks)&&(m=pl(n,i,1,m)),g&&(n.lineWrapping||p.widgetLineBreaks)&&(g=pl(n,
s,-1,g)),m&&g&&m.from==g.from&&m.to==g.to)return v(A(e.from,e.to,m));{let b=m?A(e.from,null,m):k(d,!1),w=g?A(null,e.to,g):
k(p,!0),S=[];return(m||d).to<(g||p).from-(m&&g?1:0)||d.widgetLineBreaks>1&&b.bottom+n.defaultLineHeight/2<w.top?S.push(y(
c,b.bottom,u,w.top)):b.bottom<w.top&&n.elementAtHeight((b.bottom+w.top)/2).type==mt.Text&&(b.bottom=w.top=(b.bottom+w.top)/
2),v(b).concat(S).concat(v(w))}function y(b,w,S,N){return new ki(t,b-a.left,w-a.top,S-b,N-w)}function v({top:b,bottom:w,
horizontal:S}){let N=[];for(let P=0;P<S.length;P+=2)N.push(y(S[P],b,S[P+1],w));return N}function A(b,w,S){let N=1e9,P=-1e9,
I=[];function R(V,j,ot,dt,Rt){let et=n.coordsAtPos(V,V==S.to?-2:2),yt=n.coordsAtPos(ot,ot==S.from?2:-2);!et||!yt||(N=Math.
min(et.top,yt.top,N),P=Math.max(et.bottom,yt.bottom,P),Rt==X.LTR?I.push(r&&j?c:et.left,r&&dt?u:yt.right):I.push(!r&&dt?c:
yt.left,!r&&j?u:et.right))}let T=b??S.from,W=w??S.to;for(let V of n.visibleRanges)if(V.to>T&&V.from<W)for(let j=Math.max(
V.from,T),ot=Math.min(V.to,W);;){let dt=n.state.doc.lineAt(j);for(let Rt of n.bidiSpans(dt)){let et=Rt.from+dt.from,yt=Rt.
to+dt.from;if(et>=ot)break;yt>j&&R(Math.max(et,j),b==null&&et<=T,Math.min(yt,ot),w==null&&yt>=W,Rt.dir)}if(j=dt.to+1,j>=
ot)break}return I.length==0&&R(T,b==null,W,w==null,n.textDirection),{top:N,bottom:P,horizontal:I}}function k(b,w){let S=l.
top+(w?b.top:b.bottom);return{top:S,bottom:S,horizontal:[]}}}function Kc(n,t){return n.constructor==t.constructor&&n.eq(
t)}var Qs=class{constructor(t,e){this.view=t,this.layer=e,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.
measure.bind(this),write:this.draw.bind(this)},this.dom=t.scrollDOM.appendChild(document.createElement("div")),this.dom.
classList.add("cm-layer"),e.above&&this.dom.classList.add("cm-layer-above"),e.class&&this.dom.classList.add(e.class),this.
scale(),this.dom.setAttribute("aria-hidden","true"),this.setOrder(t.state),t.requestMeasure(this.measureReq),e.mount&&e.
mount(this.dom,t)}update(t){t.startState.facet(dn)!=t.state.facet(dn)&&this.setOrder(t.state),(this.layer.update(t,this.
dom)||t.geometryChanged)&&(this.scale(),t.view.requestMeasure(this.measureReq))}docViewUpdate(t){this.layer.updateOnDocViewUpdate!==
!1&&t.requestMeasure(this.measureReq)}setOrder(t){let e=0,i=t.facet(dn);for(;e<i.length&&i[e]!=this.layer;)e++;this.dom.
style.zIndex=String((this.layer.above?150:-1)-e)}measure(){return this.layer.markers(this.view)}scale(){let{scaleX:t,scaleY:e}=this.
view;(t!=this.scaleX||e!=this.scaleY)&&(this.scaleX=t,this.scaleY=e,this.dom.style.transform=`scale(${1/t}, ${1/e})`)}draw(t){
if(t.length!=this.drawn.length||t.some((e,i)=>!Kc(e,this.drawn[i]))){let e=this.dom.firstChild,i=0;for(let s of t)s.update&&
e&&s.constructor&&this.drawn[i].constructor&&s.update(e,this.drawn[i])?(e=e.nextSibling,i++):this.dom.insertBefore(s.draw(),
e);for(;e;){let s=e.nextSibling;e.remove(),e=s}this.drawn=t,L.safari&&L.safari_version>=26&&(this.dom.style.display=this.
dom.firstChild?"":"none")}}destroy(){this.layer.destroy&&this.layer.destroy(this.dom,this.view),this.dom.remove()}},dn=E.
define();function da(n){return[Kt.define(t=>new Qs(t,n)),dn.of(n)]}var wi=E.define({combine(n){return ni(n,{cursorBlinkRate:1200,
drawRangeCursor:!0},{cursorBlinkRate:(t,e)=>Math.min(t,e),drawRangeCursor:(t,e)=>t||e})}});function pa(n={}){return[wi.of(
n),$c,jc,Uc,Wl.of(!0)]}function ma(n){return n.startState.facet(wi)!=n.state.facet(wi)}var $c=da({above:!0,markers(n){let{state:t}=n,e=t.facet(
wi),i=[];for(let s of t.selection.ranges){let r=s==t.selection.main;if(s.empty||e.drawRangeCursor){let o=r?"cm-cursor cm\
-cursor-primary":"cm-cursor cm-cursor-secondary",l=s.empty?s:C.cursor(s.head,s.head>s.anchor?-1:1);for(let a of ki.forRange(
n,o,l))i.push(a)}}return i},update(n,t){n.transactions.some(i=>i.selection)&&(t.style.animationName=t.style.animationName==
"cm-blink"?"cm-blink2":"cm-blink");let e=ma(n);return e&&ml(n.state,t),n.docChanged||n.selectionSet||e},mount(n,t){ml(t.
state,n)},class:"cm-cursorLayer"});function ml(n,t){t.style.animationDuration=n.facet(wi).cursorBlinkRate+"ms"}var jc=da(
{above:!1,markers(n){return n.state.selection.ranges.map(t=>t.empty?[]:ki.forRange(n,"cm-selectionBackground",t)).reduce(
(t,e)=>t.concat(e))},update(n,t){return n.docChanged||n.selectionSet||n.viewportChanged||ma(n)},class:"cm-selectionLayer"}),
Uc=ii.highest(B.theme({".cm-line":{"& ::selection, &::selection":{backgroundColor:"transparent !important"},caretColor:"\
transparent !important"},".cm-content":{caretColor:"transparent !important","& :focus":{caretColor:"initial !important",
"&::selection, & ::selection":{backgroundColor:"Highlight !important"}}}}));var ap=/x/.unicode!=null?"gu":"g";var Zs=class extends qt{constructor(t){super(),this.content=t}toDOM(t){let e=document.createElement("span");return e.className=
"cm-placeholder",e.style.pointerEvents="none",e.appendChild(typeof this.content=="string"?document.createTextNode(this.content):
typeof this.content=="function"?this.content(t):this.content.cloneNode(!0)),e.setAttribute("aria-hidden","true"),e}coordsAt(t){
let e=t.firstChild?We(t.firstChild):[];if(!e.length)return null;let i=window.getComputedStyle(t.parentNode),s=xi(e[0],i.
direction!="rtl"),r=parseInt(i.lineHeight);return s.bottom-s.top>r*1.5?{left:s.left,right:s.right,top:s.top,bottom:s.top+
r}:s}ignoreEvent(){return!1}};function ga(n){let t=Kt.fromClass(class{constructor(e){this.view=e,this.placeholder=n?z.set(
[z.widget({widget:new Zs(n),side:1}).range(0)]):z.none}get decorations(){return this.view.state.doc.length?z.none:this.placeholder}},
{decorations:e=>e.decorations});return typeof n=="string"?[t,B.contentAttributes.of({"aria-placeholder":n})]:t}var Zt=class extends Jt{compare(t){return this==t||this.constructor==t.constructor&&this.eq(t)}eq(t){return!1}destroy(t){}};
Zt.prototype.elementClass="";Zt.prototype.toDOM=void 0;Zt.prototype.mapMode=ft.TrackBefore;Zt.prototype.startSide=Zt.prototype.
endSide=-1;Zt.prototype.point=!0;var _c=0,vi=class{constructor(t,e){this.from=t,this.to=e}},O=class{constructor(t={}){this.id=_c++,this.perNode=!!t.perNode,
this.deserialize=t.deserialize||(()=>{throw new Error("This node type doesn't define a deserialize function")}),this.combine=
t.combine||null}add(t){if(this.perNode)throw new RangeError("Can't add per-node props to node types");return typeof t!="\
function"&&(t=tt.match(t)),e=>{let i=t(e);return i===void 0?null:[this,i]}}};O.closedBy=new O({deserialize:n=>n.split(" ")});
O.openedBy=new O({deserialize:n=>n.split(" ")});O.group=new O({deserialize:n=>n.split(" ")});O.isolate=new O({deserialize:n=>{
if(n&&n!="rtl"&&n!="ltr"&&n!="auto")throw new RangeError("Invalid value for isolate: "+n);return n||"auto"}});O.contextHash=
new O({perNode:!0});O.lookAhead=new O({perNode:!0});O.mounted=new O({perNode:!0});var Se=class{constructor(t,e,i,s=!1){this.
tree=t,this.overlay=e,this.parser=i,this.bracketed=s}static get(t){return t&&t.props&&t.props[O.mounted.id]}},Gc=Object.
create(null),tt=class n{constructor(t,e,i,s=0){this.name=t,this.props=e,this.id=i,this.flags=s}static define(t){let e=t.
props&&t.props.length?Object.create(null):Gc,i=(t.top?1:0)|(t.skipped?2:0)|(t.error?4:0)|(t.name==null?8:0),s=new n(t.name||
"",e,t.id,i);if(t.props){for(let r of t.props)if(Array.isArray(r)||(r=r(s)),r){if(r[0].perNode)throw new RangeError("Can\
't store a per-node prop on a node type");e[r[0].id]=r[1]}}return s}prop(t){return this.props[t.id]}get isTop(){return(this.
flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&
8)>0}is(t){if(typeof t=="string"){if(this.name==t)return!0;let e=this.prop(O.group);return e?e.indexOf(t)>-1:!1}return this.
id==t}static match(t){let e=Object.create(null);for(let i in t)for(let s of i.split(" "))e[s]=t[i];return i=>{for(let s=i.
prop(O.group),r=-1;r<(s?s.length:0);r++){let o=e[r<0?i.name:s[r]];if(o)return o}}}};tt.none=new tt("",Object.create(null),
0,8);var Ke=class n{constructor(t){this.types=t;for(let e=0;e<t.length;e++)if(t[e].id!=e)throw new RangeError("Node type\
 ids should correspond to array positions when creating a node set")}extend(...t){let e=[];for(let i of this.types){let s=null;
for(let r of t){let o=r(i);if(o){s||(s=Object.assign({},i.props));let l=o[1],a=o[0];a.combine&&a.id in s&&(l=a.combine(s[a.
id],l)),s[a.id]=l}}e.push(s?new tt(i.name,s,i.id,i.flags):i)}return new n(e)}},Dn=new WeakMap,ba=new WeakMap,Y;(function(n){
n[n.ExcludeBuffers=1]="ExcludeBuffers",n[n.IncludeAnonymous=2]="IncludeAnonymous",n[n.IgnoreMounts=4]="IgnoreMounts",n[n.
IgnoreOverlays=8]="IgnoreOverlays",n[n.EnterBracketed=16]="EnterBracketed"})(Y||(Y={}));var G=class n{constructor(t,e,i,s,r){
if(this.type=t,this.children=e,this.positions=i,this.length=s,this.props=null,r&&r.length){this.props=Object.create(null);
for(let[o,l]of r)this.props[typeof o=="number"?o:o.id]=l}}toString(){let t=Se.get(this);if(t&&!t.overlay)return t.tree.toString();
let e="";for(let i of this.children){let s=i.toString();s&&(e&&(e+=","),e+=s)}return this.type.name?(/\W/.test(this.type.
name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(e.length?"("+e+")":""):e}cursor(t=0){return new Mi(
this.topNode,t)}cursorAt(t,e=0,i=0){let s=Dn.get(this)||this.topNode,r=new Mi(s);return r.moveTo(t,e),Dn.set(this,r._tree),
r}get topNode(){return new $t(this,0,0,null)}resolve(t,e=0){let i=Ci(Dn.get(this)||this.topNode,t,e,!1);return Dn.set(this,
i),i}resolveInner(t,e=0){let i=Ci(ba.get(this)||this.topNode,t,e,!0);return ba.set(this,i),i}resolveStack(t,e=0){return Xc(
this,t,e)}iterate(t){let{enter:e,leave:i,from:s=0,to:r=this.length}=t,o=t.mode||0,l=(o&Y.IncludeAnonymous)>0;for(let a=this.
cursor(o|Y.IncludeAnonymous);;){let h=!1;if(a.from<=r&&a.to>=s&&(!l&&a.type.isAnonymous||e(a)!==!1)){if(a.firstChild())continue;
h=!0}for(;h&&i&&(l||!a.type.isAnonymous)&&i(a),!a.nextSibling();){if(!a.parent())return;h=!0}}}prop(t){return t.perNode?
this.props?this.props[t.id]:void 0:this.type.prop(t)}get propValues(){let t=[];if(this.props)for(let e in this.props)t.push(
[+e,this.props[e]]);return t}balance(t={}){return this.children.length<=8?this:dr(tt.none,this.children,this.positions,0,
this.children.length,0,this.length,(e,i,s)=>new n(this.type,e,i,s,this.propValues),t.makeTree||((e,i,s)=>new n(tt.none,e,
i,s)))}static build(t){return Jc(t)}};G.empty=new G(tt.none,[],[],0);var lr=class n{constructor(t,e){this.buffer=t,this.
index=e}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.
index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new n(
this.buffer,this.index)}},le=class n{constructor(t,e,i){this.buffer=t,this.length=e,this.set=i}get type(){return tt.none}toString(){
let t=[];for(let e=0;e<this.buffer.length;)t.push(this.childString(e)),e=this.buffer[e+3];return t.join(",")}childString(t){
let e=this.buffer[t],i=this.buffer[t+3],s=this.set.types[e],r=s.name;if(/\W/.test(r)&&!s.isError&&(r=JSON.stringify(r)),
t+=4,i==t)return r;let o=[];for(;t<i;)o.push(this.childString(t)),t=this.buffer[t+3];return r+"("+o.join(",")+")"}findChild(t,e,i,s,r){
let{buffer:o}=this,l=-1;for(let a=t;a!=e&&!(wa(r,s,o[a+1],o[a+2])&&(l=a,i>0));a=o[a+3]);return l}slice(t,e,i){let s=this.
buffer,r=new Uint16Array(e-t),o=0;for(let l=t,a=0;l<e;){r[a++]=s[l++],r[a++]=s[l++]-i;let h=r[a++]=s[l++]-i;r[a++]=s[l++]-
t,o=Math.max(o,h)}return new n(r,o,this.set)}};function wa(n,t,e,i){switch(n){case-2:return e<t;case-1:return i>=t&&e<t;case 0:
return e<t&&i>t;case 1:return e<=t&&i>t;case 2:return i>t;case 4:return!0}}function Ci(n,t,e,i){for(var s;n.from==n.to||
(e<1?n.from>=t:n.from>t)||(e>-1?n.to<=t:n.to<t);){let o=!i&&n instanceof $t&&n.index<0?null:n.parent;if(!o)return n;n=o}
let r=i?0:Y.IgnoreOverlays;if(i)for(let o=n,l=o.parent;l;o=l,l=o.parent)o instanceof $t&&o.index<0&&((s=l.enter(t,e,r))===
null||s===void 0?void 0:s.from)!=o.from&&(n=l);for(;;){let o=n.enter(t,e,r);if(!o)return n;n=o}}var Tn=class{cursor(t=0){
return new Mi(this,t)}getChild(t,e=null,i=null){let s=ya(this,t,e,i);return s.length?s[0]:null}getChildren(t,e=null,i=null){
return ya(this,t,e,i)}resolve(t,e=0){return Ci(this,t,e,!1)}resolveInner(t,e=0){return Ci(this,t,e,!0)}matchContext(t){return ar(
this.parent,t)}enterUnfinishedNodesBefore(t){let e=this.childBefore(t),i=this;for(;e;){let s=e.lastChild;if(!s||s.to!=e.
to)break;s.type.isError&&s.from==s.to?(i=e,e=s.prevSibling):e=s}return i}get node(){return this}get next(){return this.parent}},
$t=class n extends Tn{constructor(t,e,i,s){super(),this._tree=t,this.from=e,this.index=i,this._parent=s}get type(){return this.
_tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(t,e,i,s,r=0){for(let o=this;;){
for(let{children:l,positions:a}=o._tree,h=e>0?l.length:-1;t!=h;t+=e){let f=l[t],c=a[t]+o.from,u;if(!(!(r&Y.EnterBracketed&&
f instanceof G&&(u=Se.get(f))&&!u.overlay&&u.bracketed&&i>=c&&i<=c+f.length)&&!wa(s,i,c,c+f.length))){if(f instanceof le){
if(r&Y.ExcludeBuffers)continue;let d=f.findChild(0,f.buffer.length,e,i-c,s);if(d>-1)return new Ai(new hr(o,f,t,c),null,d)}else if(r&
Y.IncludeAnonymous||!f.type.isAnonymous||ur(f)){let d;if(!(r&Y.IgnoreMounts)&&(d=Se.get(f))&&!d.overlay)return new n(d.tree,
c,t,o);let p=new n(f,c,t,o);return r&Y.IncludeAnonymous||!p.type.isAnonymous?p:p.nextChild(e<0?f.children.length-1:0,e,i,
s,r)}}}if(r&Y.IncludeAnonymous||!o.type.isAnonymous||(o.index>=0?t=o.index+e:t=e<0?-1:o._parent._tree.children.length,o=
o._parent,!o))return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.
children.length-1,-1,0,4)}childAfter(t){return this.nextChild(0,1,t,2)}childBefore(t){return this.nextChild(this._tree.children.
length-1,-1,t,-2)}prop(t){return this._tree.prop(t)}enter(t,e,i=0){let s;if(!(i&Y.IgnoreOverlays)&&(s=Se.get(this._tree))&&
s.overlay){let r=t-this.from,o=i&Y.EnterBracketed&&s.bracketed;for(let{from:l,to:a}of s.overlay)if((e>0||o?l<=r:l<r)&&(e<
0||o?a>=r:a>r))return new n(s.tree,s.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,t,e,i)}nextSignificantParent(){
let t=this;for(;t.type.isAnonymous&&t._parent;)t=t._parent;return t}get parent(){return this._parent?this._parent.nextSignificantParent():
null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){
return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){
return this._tree}toString(){return this._tree.toString()}};function ya(n,t,e,i){let s=n.cursor(),r=[];if(!s.firstChild())
return r;if(e!=null){for(let o=!1;!o;)if(o=s.type.is(e),!s.nextSibling())return r}for(;;){if(i!=null&&s.type.is(i))return r;
if(s.type.is(t)&&r.push(s.node),!s.nextSibling())return i==null?r:[]}}function ar(n,t,e=t.length-1){for(let i=n;e>=0;i=i.
parent){if(!i)return!1;if(!i.type.isAnonymous){if(t[e]&&t[e]!=i.name)return!1;e--}}return!0}var hr=class{constructor(t,e,i,s){
this.parent=t,this.buffer=e,this.index=i,this.start=s}},Ai=class n extends Tn{get name(){return this.type.name}get from(){
return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.
buffer[this.index+2]}constructor(t,e,i){super(),this.context=t,this._parent=e,this.index=i,this.type=t.buffer.set.types[t.
buffer.buffer[i]]}child(t,e,i){let{buffer:s}=this.context,r=s.findChild(this.index+4,s.buffer[this.index+3],t,e-this.context.
start,i);return r<0?null:new n(this.context,this,r)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.
child(-1,0,4)}childAfter(t){return this.child(1,t,2)}childBefore(t){return this.child(-1,t,-2)}prop(t){return this.type.
prop(t)}enter(t,e,i=0){if(i&Y.ExcludeBuffers)return null;let{buffer:s}=this.context,r=s.findChild(this.index+4,s.buffer[this.
index+3],e>0?1:-1,t-this.context.start,e);return r<0?null:new n(this.context,this,r)}get parent(){return this._parent||this.
context.parent.nextSignificantParent()}externalSibling(t){return this._parent?null:this.context.parent.nextChild(this.context.
index+t,t,0,4)}get nextSibling(){let{buffer:t}=this.context,e=t.buffer[this.index+3];return e<(this._parent?t.buffer[this.
_parent.index+3]:t.buffer.length)?new n(this.context,this._parent,e):this.externalSibling(1)}get prevSibling(){let{buffer:t}=this.
context,e=this._parent?this._parent.index+4:0;return this.index==e?this.externalSibling(-1):new n(this.context,this._parent,
t.findChild(e,this.index,-1,0,4))}get tree(){return null}toTree(){let t=[],e=[],{buffer:i}=this.context,s=this.index+4,r=i.
buffer[this.index+3];if(r>s){let o=i.buffer[this.index+1];t.push(i.slice(s,r,o)),e.push(0)}return new G(this.type,t,e,this.
to-this.from)}toString(){return this.context.buffer.childString(this.index)}};function xa(n){if(!n.length)return null;let t=0,
e=n[0];for(let r=1;r<n.length;r++){let o=n[r];(o.from>e.from||o.to<e.to)&&(e=o,t=r)}let i=e instanceof $t&&e.index<0?null:
e.parent,s=n.slice();return i?s[t]=i:s.splice(t,1),new fr(s,e)}var fr=class{constructor(t,e){this.heads=t,this.node=e}get next(){
return xa(this.heads)}};function Xc(n,t,e){let i=n.resolveInner(t,e),s=null;for(let r=i instanceof $t?i:i.context.parent;r;r=
r.parent)if(r.index<0){let o=r.parent;(s||(s=[i])).push(o.resolve(t,e)),r=o}else{let o=Se.get(r.tree);if(o&&o.overlay&&o.
overlay[0].from<=t&&o.overlay[o.overlay.length-1].to>=t){let l=new $t(o.tree,o.overlay[0].from+r.from,-1,r);(s||(s=[i])).
push(Ci(l,t,e,!1))}}return s?xa(s):i}var Mi=class{get name(){return this.type.name}constructor(t,e=0){if(this.buffer=null,
this.stack=[],this.index=0,this.bufferNode=null,this.mode=e&~Y.EnterBracketed,t instanceof $t)this.yieldNode(t);else{this.
_tree=t.context.parent,this.buffer=t.context;for(let i=t._parent;i;i=i._parent)this.stack.unshift(i.index);this.bufferNode=
t,this.yieldBuf(t.index)}}yieldNode(t){return t?(this._tree=t,this.type=t.type,this.from=t.from,this.to=t.to,!0):!1}yieldBuf(t,e){
this.index=t;let{start:i,buffer:s}=this.buffer;return this.type=e||s.set.types[s.buffer[t]],this.from=i+s.buffer[t+1],this.
to=i+s.buffer[t+2],!0}yield(t){return t?t instanceof $t?(this.buffer=null,this.yieldNode(t)):(this.buffer=t.context,this.
yieldBuf(t.index,t.type)):!1}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(t,e,i){
if(!this.buffer)return this.yield(this._tree.nextChild(t<0?this._tree._tree.children.length-1:0,t,e,i,this.mode));let{buffer:s}=this.
buffer,r=s.findChild(this.index+4,s.buffer[this.index+3],t,e-this.buffer.start,i);return r<0?!1:(this.stack.push(this.index),
this.yieldBuf(r))}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(t){return this.
enterChild(1,t,2)}childBefore(t){return this.enterChild(-1,t,-2)}enter(t,e,i=this.mode){return this.buffer?i&Y.ExcludeBuffers?
!1:this.enterChild(1,t,e):this.yield(this._tree.enter(t,e,i))}parent(){if(!this.buffer)return this.yieldNode(this.mode&Y.
IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let t=this.
mode&Y.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(
t)}sibling(t){if(!this.buffer)return this._tree._parent?this.yield(this._tree.index<0?null:this._tree._parent.nextChild(
this._tree.index+t,t,0,4,this.mode)):!1;let{buffer:e}=this.buffer,i=this.stack.length-1;if(t<0){let s=i<0?0:this.stack[i]+
4;if(this.index!=s)return this.yieldBuf(e.findChild(s,this.index,-1,0,4))}else{let s=e.buffer[this.index+3];if(s<(i<0?e.
buffer.length:e.buffer[this.stack[i]+3]))return this.yieldBuf(s)}return i<0?this.yield(this.buffer.parent.nextChild(this.
buffer.index+t,t,0,4,this.mode)):!1}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(t){
let e,i,{buffer:s}=this;if(s){if(t>0){if(this.index<s.buffer.buffer.length)return!1}else for(let r=0;r<this.index;r++)if(s.
buffer.buffer[r+3]<this.index)return!1;({index:e,parent:i}=s)}else({index:e,_parent:i}=this._tree);for(;i;{index:e,_parent:i}=
i)if(e>-1)for(let r=e+t,o=t<0?-1:i._tree.children.length;r!=o;r+=t){let l=i._tree.children[r];if(this.mode&Y.IncludeAnonymous||
l instanceof le||!l.type.isAnonymous||ur(l))return!1}return!0}move(t,e){if(e&&this.enterChild(t,0,4))return!0;for(;;){if(this.
sibling(t))return!0;if(this.atLastNode(t)||!this.parent())return!1}}next(t=!0){return this.move(1,t)}prev(t=!0){return this.
move(-1,t)}moveTo(t,e=0){for(;(this.from==this.to||(e<1?this.from>=t:this.from>t)||(e>-1?this.to<=t:this.to<t))&&this.parent();)
;for(;this.enterChild(1,t,e););return this}get node(){if(!this.buffer)return this._tree;let t=this.bufferNode,e=null,i=0;
if(t&&t.context==this.buffer)t:for(let s=this.index,r=this.stack.length;r>=0;){for(let o=t;o;o=o._parent)if(o.index==s){
if(s==this.index)return o;e=o,i=r+1;break t}s=this.stack[--r]}for(let s=i;s<this.stack.length;s++)e=new Ai(this.buffer,e,
this.stack[s]);return this.bufferNode=new Ai(this.buffer,e,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(t,e){
for(let i=0;;){let s=!1;if(this.type.isAnonymous||t(this)!==!1){if(this.firstChild()){i++;continue}this.type.isAnonymous||
(s=!0)}for(;;){if(s&&e&&e(this),s=this.type.isAnonymous,!i)return;if(this.nextSibling())break;this.parent(),i--,s=!0}}}matchContext(t){
if(!this.buffer)return ar(this.node.parent,t);let{buffer:e}=this.buffer,{types:i}=e.set;for(let s=t.length-1,r=this.stack.
length-1;s>=0;r--){if(r<0)return ar(this._tree,t,s);let o=i[e.buffer[this.stack[r]]];if(!o.isAnonymous){if(t[s]&&t[s]!=o.
name)return!1;s--}}return!0}};function ur(n){return n.children.some(t=>t instanceof le||!t.type.isAnonymous||ur(t))}function Jc(n){
var t;let{buffer:e,nodeSet:i,maxBufferLength:s=1024,reused:r=[],minRepeatType:o=i.types.length}=n,l=Array.isArray(e)?new lr(
e,e.length):e,a=i.types,h=0,f=0;function c(b,w,S,N,P,I){let{id:R,start:T,end:W,size:V}=l,j=f,ot=h;if(V<0)if(l.next(),V==
-1){let Gt=r[R];S.push(Gt),N.push(T-b);return}else if(V==-3){h=R;return}else if(V==-4){f=R;return}else throw new RangeError(
`Unrecognized record size: ${V}`);let dt=a[R],Rt,et,yt=T-b;if(W-T<=s&&(et=g(l.pos-w,P))){let Gt=new Uint16Array(et.size-
et.skip),kt=l.pos-et.size,It=Gt.length;for(;l.pos>kt;)It=y(et.start,Gt,It);Rt=new le(Gt,W-et.start,i),yt=et.start-b}else{
let Gt=l.pos-V;l.next();let kt=[],It=[],ce=R>=o?R:-1,Ee=0,qi=W,Gn=j;for(;l.pos>Gt;)ce>=0&&l.id==ce&&l.size>=0?(l.end<=qi-
s&&(p(kt,It,T,Ee,l.end,qi,ce,Gn,ot),Ee=kt.length,qi=l.end,Gn=f),l.next()):I>2500?u(T,Gt,kt,It):c(T,Gt,kt,It,ce,I+1);if(ce>=
0&&Ee>0&&Ee<kt.length&&p(kt,It,T,Ee,T,qi,ce,Gn,ot),kt.reverse(),It.reverse(),ce>-1&&Ee>0){let ro=d(dt,ot);Rt=dr(dt,kt,It,
0,kt.length,0,W-T,ro,ro)}else Rt=m(dt,kt,It,W-T,j-W,ot)}S.push(Rt),N.push(yt)}function u(b,w,S,N){let P=[],I=0,R=-1;for(;l.
pos>w;){let{id:T,start:W,end:V,size:j}=l;if(j>4)l.next();else{if(R>-1&&W<R)break;R<0&&(R=V-s),P.push(T,W,V),I++,l.next()}}
if(I){let T=new Uint16Array(I*4),W=P[P.length-2];for(let V=P.length-3,j=0;V>=0;V-=3)T[j++]=P[V],T[j++]=P[V+1]-W,T[j++]=P[V+
2]-W,T[j++]=j;S.push(new le(T,P[2]-W,i)),N.push(W-b)}}function d(b,w){return(S,N,P)=>{let I=0,R=S.length-1,T,W;if(R>=0&&
(T=S[R])instanceof G){if(!R&&T.type==b&&T.length==P)return T;(W=T.prop(O.lookAhead))&&(I=N[R]+T.length+W-P)}return m(b,S,
N,P,I,w)}}function p(b,w,S,N,P,I,R,T,W){let V=[],j=[];for(;b.length>N;)V.push(b.pop()),j.push(w.pop()+S-P);b.push(m(i.types[R],
V,j,I-P,T-I,W)),w.push(P-S)}function m(b,w,S,N,P,I,R){if(I){let T=[O.contextHash,I];R=R?[T].concat(R):[T]}if(P>25){let T=[
O.lookAhead,P];R=R?[T].concat(R):[T]}return new G(b,w,S,N,R)}function g(b,w){let S=l.fork(),N=0,P=0,I=0,R=S.end-s,T={size:0,
start:0,skip:0};t:for(let W=S.pos-b;S.pos>W;){let V=S.size;if(S.id==w&&V>=0){T.size=N,T.start=P,T.skip=I,I+=4,N+=4,S.next();
continue}let j=S.pos-V;if(V<0||j<W||S.start<R)break;let ot=S.id>=o?4:0,dt=S.start;for(S.next();S.pos>j;){if(S.size<0)if(S.
size==-3||S.size==-4)ot+=4;else break t;else S.id>=o&&(ot+=4);S.next()}P=dt,N+=V,I+=ot}return(w<0||N==b)&&(T.size=N,T.start=
P,T.skip=I),T.size>4?T:void 0}function y(b,w,S){let{id:N,start:P,end:I,size:R}=l;if(l.next(),R>=0&&N<o){let T=S;if(R>4){
let W=l.pos-(R-4);for(;l.pos>W;)S=y(b,w,S)}w[--S]=T,w[--S]=I-b,w[--S]=P-b,w[--S]=N}else R==-3?h=N:R==-4&&(f=N);return S}
let v=[],A=[];for(;l.pos>0;)c(n.start||0,n.bufferStart||0,v,A,-1,0);let k=(t=n.length)!==null&&t!==void 0?t:v.length?A[0]+
v[0].length:0;return new G(a[n.topID],v.reverse(),A.reverse(),k)}var ka=new WeakMap;function Ln(n,t){if(!n.isAnonymous||
t instanceof le||t.type!=n)return 1;let e=ka.get(t);if(e==null){e=1;for(let i of t.children){if(i.type!=n||!(i instanceof
G)){e=1;break}e+=Ln(n,i)}ka.set(t,e)}return e}function dr(n,t,e,i,s,r,o,l,a){let h=0;for(let p=i;p<s;p++)h+=Ln(n,t[p]);let f=Math.
ceil(h*1.5/8),c=[],u=[];function d(p,m,g,y,v){for(let A=g;A<y;){let k=A,b=m[A],w=Ln(n,p[A]);for(A++;A<y;A++){let S=Ln(n,
p[A]);if(w+S>=f)break;w+=S}if(A==k+1){if(w>f){let S=p[k];d(S.children,S.positions,0,S.children.length,m[k]+v);continue}c.
push(p[k])}else{let S=m[A-1]+p[A-1].length-b;c.push(dr(n,p,m,k,A,b,S,null,a))}u.push(b+v-r)}}return d(t,e,i,s,0),(l||a)(
c,u,o)}var ve=class n{constructor(t,e,i,s,r=!1,o=!1){this.from=t,this.to=e,this.tree=i,this.offset=s,this.open=(r?1:0)|(o?2:0)}get openStart(){
return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(t,e=[],i=!1){let s=[new n(0,t.length,t,0,!1,i)];
for(let r of e)r.to>t.length&&s.push(r);return s}static applyChanges(t,e,i=128){if(!e.length)return t;let s=[],r=1,o=t.length?
t[0]:null;for(let l=0,a=0,h=0;;l++){let f=l<e.length?e[l]:null,c=f?f.fromA:1e9;if(c-a>=i)for(;o&&o.from<c;){let u=o;if(a>=
u.from||c<=u.to||h){let d=Math.max(u.from,a)-h,p=Math.min(u.to,c)-h;u=d>=p?null:new n(d,p,u.tree,u.offset+h,l>0,!!f)}if(u&&
s.push(u),o.to>c)break;o=r<t.length?t[r++]:null}if(!f)break;a=f.toA,h=f.toA-f.toB}return s}},$e=class{startParse(t,e,i){
return typeof t=="string"&&(t=new cr(t)),i=i?i.length?i.map(s=>new vi(s.from,s.to)):[new vi(0,0)]:[new vi(0,t.length)],this.
createParse(t,e||[],i)}parse(t,e,i){let s=this.startParse(t,e,i);for(;;){let r=s.advance();if(r)return r}}},cr=class{constructor(t){
this.string=t}get length(){return this.string.length}chunk(t){return this.string.slice(t)}get lineChunks(){return!1}read(t,e){
return this.string.slice(t,e)}};var cp=new O({perNode:!0});var Yc=0,bt=class n{constructor(t,e,i,s){this.name=t,this.set=e,this.base=i,this.modified=s,this.id=Yc++}toString(){let{
name:t}=this;for(let e of this.modified)e.name&&(t=`${e.name}(${t})`);return t}static define(t,e){let i=typeof t=="strin\
g"?t:"?";if(t instanceof n&&(e=t),e?.base)throw new Error("Can not derive from a modified tag");let s=new n(i,[],null,[]);
if(s.set.push(s),e)for(let r of e.set)s.set.push(r);return s}static defineModifier(t){let e=new Pn(t);return i=>i.modified.
indexOf(e)>-1?i:Pn.get(i.base||i,i.modified.concat(e).sort((s,r)=>s.id-r.id))}},Qc=0,Pn=class n{constructor(t){this.name=
t,this.instances=[],this.id=Qc++}static get(t,e){if(!e.length)return t;let i=e[0].instances.find(l=>l.base==t&&Zc(e,l.modified));
if(i)return i;let s=[],r=new bt(t.name,s,t,e);for(let l of e)l.instances.push(r);let o=tu(e);for(let l of t.set)if(!l.modified.
length)for(let a of o)s.push(n.get(l,a));return r}};function Zc(n,t){return n.length==t.length&&n.every((e,i)=>e==t[i])}
function tu(n){let t=[[]];for(let e=0;e<n.length;e++)for(let i=0,s=t.length;i<s;i++)t.push(t[i].concat(n[e]));return t.sort(
(e,i)=>i.length-e.length)}function Li(n){let t=Object.create(null);for(let e in n){let i=n[e];Array.isArray(i)||(i=[i]);
for(let s of e.split(" "))if(s){let r=[],o=2,l=s;for(let c=0;;){if(l=="..."&&c>0&&c+3==s.length){o=1;break}let u=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.
exec(l);if(!u)throw new RangeError("Invalid path: "+s);if(r.push(u[0]=="*"?"":u[0][0]=='"'?JSON.parse(u[0]):u[0]),c+=u[0].
length,c==s.length)break;let d=s[c++];if(c==s.length&&d=="!"){o=0;break}if(d!="/")throw new RangeError("Invalid path: "+
s);l=s.slice(c)}let a=r.length-1,h=r[a];if(!h)throw new RangeError("Invalid path: "+s);let f=new je(i,o,a>0?r.slice(0,a):
null);t[h]=f.sort(t[h])}}return eu.add(t)}var eu=new O({combine(n,t){let e,i,s;for(;n||t;){if(!n||t&&n.depth<=t.depth?(s=
t,t=t.next):(s=n,n=n.next),e&&e.mode==s.mode&&!s.context&&!e.context)continue;let r=new je(s.tags,s.mode,s.context);e?e.
next=r:i=r,e=r}return i}}),je=class{constructor(t,e,i,s){this.tags=t,this.mode=e,this.context=i,this.next=s}get opaque(){
return this.mode==0}get inherit(){return this.mode==1}sort(t){return!t||t.depth<this.depth?(this.next=t,this):(t.next=this.
sort(t.next),t)}get depth(){return this.context?this.context.length:0}};je.empty=new je([],2,null);function gr(n,t){let e=Object.
create(null);for(let r of n)if(!Array.isArray(r.tag))e[r.tag.id]=r.class;else for(let o of r.tag)e[o.id]=r.class;let{scope:i,
all:s=null}=t||{};return{style:r=>{let o=s;for(let l of r)for(let a of l.set){let h=e[a.id];if(h){o=o?o+" "+h:h;break}}return o},
scope:i}}var D=bt.define,En=D(),ae=D(),Sa=D(ae),va=D(ae),he=D(),Bn=D(he),pr=D(he),_t=D(),Ce=D(_t),jt=D(),Ut=D(),mr=D(),Di=D(mr),On=D(),
x={comment:En,lineComment:D(En),blockComment:D(En),docComment:D(En),name:ae,variableName:D(ae),typeName:Sa,tagName:D(Sa),
propertyName:va,attributeName:D(va),className:D(ae),labelName:D(ae),namespace:D(ae),macroName:D(ae),literal:he,string:Bn,
docString:D(Bn),character:D(Bn),attributeValue:D(Bn),number:pr,integer:D(pr),float:D(pr),bool:D(he),regexp:D(he),escape:D(
he),color:D(he),url:D(he),keyword:jt,self:D(jt),null:D(jt),atom:D(jt),unit:D(jt),modifier:D(jt),operatorKeyword:D(jt),controlKeyword:D(
jt),definitionKeyword:D(jt),moduleKeyword:D(jt),operator:Ut,derefOperator:D(Ut),arithmeticOperator:D(Ut),logicOperator:D(
Ut),bitwiseOperator:D(Ut),compareOperator:D(Ut),updateOperator:D(Ut),definitionOperator:D(Ut),typeOperator:D(Ut),controlOperator:D(
Ut),punctuation:mr,separator:D(mr),bracket:Di,angleBracket:D(Di),squareBracket:D(Di),paren:D(Di),brace:D(Di),content:_t,
heading:Ce,heading1:D(Ce),heading2:D(Ce),heading3:D(Ce),heading4:D(Ce),heading5:D(Ce),heading6:D(Ce),contentSeparator:D(
_t),list:D(_t),quote:D(_t),emphasis:D(_t),strong:D(_t),link:D(_t),monospace:D(_t),strikethrough:D(_t),inserted:D(),deleted:D(),
changed:D(),invalid:D(),meta:On,documentMeta:D(On),annotation:D(On),processingInstruction:D(On),definition:bt.defineModifier(
"definition"),constant:bt.defineModifier("constant"),function:bt.defineModifier("function"),standard:bt.defineModifier("\
standard"),local:bt.defineModifier("local"),special:bt.defineModifier("special")};for(let n in x){let t=x[n];t instanceof
bt&&(t.name=n)}var pp=gr([{tag:x.link,class:"tok-link"},{tag:x.heading,class:"tok-heading"},{tag:x.emphasis,class:"tok-e\
mphasis"},{tag:x.strong,class:"tok-strong"},{tag:x.keyword,class:"tok-keyword"},{tag:x.atom,class:"tok-atom"},{tag:x.bool,
class:"tok-bool"},{tag:x.url,class:"tok-url"},{tag:x.labelName,class:"tok-labelName"},{tag:x.inserted,class:"tok-inserte\
d"},{tag:x.deleted,class:"tok-deleted"},{tag:x.literal,class:"tok-literal"},{tag:x.string,class:"tok-string"},{tag:x.number,
class:"tok-number"},{tag:[x.regexp,x.escape,x.special(x.string)],class:"tok-string2"},{tag:x.variableName,class:"tok-var\
iableName"},{tag:x.local(x.variableName),class:"tok-variableName tok-local"},{tag:x.definition(x.variableName),class:"to\
k-variableName tok-definition"},{tag:x.special(x.variableName),class:"tok-variableName2"},{tag:x.definition(x.propertyName),
class:"tok-propertyName tok-definition"},{tag:x.typeName,class:"tok-typeName"},{tag:x.namespace,class:"tok-namespace"},{
tag:x.className,class:"tok-className"},{tag:x.macroName,class:"tok-macroName"},{tag:x.propertyName,class:"tok-propertyNa\
me"},{tag:x.operator,class:"tok-operator"},{tag:x.comment,class:"tok-comment"},{tag:x.meta,class:"tok-meta"},{tag:x.invalid,
class:"tok-invalid"},{tag:x.punctuation,class:"tok-punctuation"}]);var br,Ei=new O;var iu=new O,Ct=class{constructor(t,e,i=[],s=""){this.data=t,this.name=s,U.prototype.hasOwnProperty("tree")||Object.defineProperty(
U.prototype,"tree",{get(){return te(this)}}),this.parser=e,this.extension=[Ue.of(this),U.languageData.of((r,o,l)=>{let a=Ca(
r,o,l),h=a.type.prop(Ei);if(!h)return[];let f=r.facet(h),c=a.type.prop(iu);if(c){let u=a.resolve(o-a.from,l);for(let d of c)
if(d.test(u,r)){let p=r.facet(d.facet);return d.type=="replace"?p:p.concat(f)}}return f})].concat(i)}isActiveAt(t,e,i=-1){
return Ca(t,e,i).type.prop(Ei)==this.data}findRegions(t){let e=t.facet(Ue);if(e?.data==this.data)return[{from:0,to:t.doc.
length}];if(!e||!e.allowsNesting)return[];let i=[],s=(r,o)=>{if(r.prop(Ei)==this.data){i.push({from:o,to:o+r.length});return}
let l=r.prop(O.mounted);if(l){if(l.tree.prop(Ei)==this.data){if(l.overlay)for(let a of l.overlay)i.push({from:a.from+o,to:a.
to+o});else i.push({from:o,to:o+r.length});return}else if(l.overlay){let a=i.length;if(s(l.tree,l.overlay[0].from+o),i.length>
a)return}}for(let a=0;a<r.children.length;a++){let h=r.children[a];h instanceof G&&s(h,r.positions[a]+o)}};return s(te(t),
0),i}get allowsNesting(){return!0}};Ct.setState=q.define();function Ca(n,t,e){let i=n.facet(Ue),s=te(n).topNode;if(!i||i.
allowsNesting)for(let r=s;r;r=r.enter(t,e,Y.ExcludeBuffers|Y.EnterBracketed))r.type.isTop&&(s=r);return s}function te(n){let t=n.field(Ct.state,!1);return t?t.tree:G.empty}var wr=class{constructor(t){this.doc=t,this.cursorPos=0,this.string="",this.cursor=t.iter()}get length(){return this.doc.
length}syncTo(t){return this.string=this.cursor.next(t-this.cursorPos).value,this.cursorPos=t+this.string.length,this.cursorPos-
this.string.length}chunk(t){return this.syncTo(t),this.string}get lineChunks(){return!0}read(t,e){let i=this.cursorPos-this.
string.length;return t<i||e>=this.cursorPos?this.doc.sliceString(t,e):this.string.slice(t-i,e-i)}},Ti=null,xr=class n{constructor(t,e,i=[],s,r,o,l,a){
this.parser=t,this.state=e,this.fragments=i,this.tree=s,this.treeLen=r,this.viewport=o,this.skipped=l,this.scheduleOn=a,
this.parse=null,this.tempSkipped=[]}static create(t,e,i){return new n(t,e,[],G.empty,0,i,[],null)}startParse(){return this.
parser.startParse(new wr(this.state.doc),this.fragments)}work(t,e){return e!=null&&e>=this.state.doc.length&&(e=void 0),
this.tree!=G.empty&&this.isDone(e??this.state.doc.length)?(this.takeTree(),!0):this.withContext(()=>{var i;if(typeof t==
"number"){let s=Date.now()+t;t=()=>Date.now()>s}for(this.parse||(this.parse=this.startParse()),e!=null&&(this.parse.stoppedAt==
null||this.parse.stoppedAt>e)&&e<this.state.doc.length&&this.parse.stopAt(e);;){let s=this.parse.advance();if(s)if(this.
fragments=this.withoutTempSkipped(ve.addTree(s,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=(i=this.parse.stoppedAt)!==
null&&i!==void 0?i:this.state.doc.length,this.tree=s,this.parse=null,this.treeLen<(e??this.state.doc.length))this.parse=
this.startParse();else return!0;if(t())return!1}})}takeTree(){let t,e;this.parse&&(t=this.parse.parsedPos)>=this.treeLen&&
((this.parse.stoppedAt==null||this.parse.stoppedAt>t)&&this.parse.stopAt(t),this.withContext(()=>{for(;!(e=this.parse.advance());)
;}),this.treeLen=t,this.tree=e,this.fragments=this.withoutTempSkipped(ve.addTree(this.tree,this.fragments,!0)),this.parse=
null)}withContext(t){let e=Ti;Ti=this;try{return t()}finally{Ti=e}}withoutTempSkipped(t){for(let e;e=this.tempSkipped.pop();)
t=Aa(t,e.from,e.to);return t}changes(t,e){let{fragments:i,tree:s,treeLen:r,viewport:o,skipped:l}=this;if(this.takeTree(),
!t.empty){let a=[];if(t.iterChangedRanges((h,f,c,u)=>a.push({fromA:h,toA:f,fromB:c,toB:u})),i=ve.applyChanges(i,a),s=G.empty,
r=0,o={from:t.mapPos(o.from,-1),to:t.mapPos(o.to,1)},this.skipped.length){l=[];for(let h of this.skipped){let f=t.mapPos(
h.from,1),c=t.mapPos(h.to,-1);f<c&&l.push({from:f,to:c})}}}return new n(this.parser,e,i,s,r,o,l,this.scheduleOn)}updateViewport(t){
if(this.viewport.from==t.from&&this.viewport.to==t.to)return!1;this.viewport=t;let e=this.skipped.length;for(let i=0;i<this.
skipped.length;i++){let{from:s,to:r}=this.skipped[i];s<t.to&&r>t.from&&(this.fragments=Aa(this.fragments,s,r),this.skipped.
splice(i--,1))}return this.skipped.length>=e?!1:(this.reset(),!0)}reset(){this.parse&&(this.takeTree(),this.parse=null)}skipUntilInView(t,e){
this.skipped.push({from:t,to:e})}static getSkippingParser(t){return new class extends $e{createParse(e,i,s){let r=s[0].from,
o=s[s.length-1].to;return{parsedPos:r,advance(){let a=Ti;if(a){for(let h of s)a.tempSkipped.push(h);t&&(a.scheduleOn=a.scheduleOn?
Promise.all([a.scheduleOn,t]):t)}return this.parsedPos=o,new G(tt.none,[],[],o-r)},stoppedAt:null,stopAt(){}}}}}isDone(t){
t=Math.min(t,this.state.doc.length);let e=this.fragments;return this.treeLen>=t&&e.length&&e[0].from==0&&e[0].to>=t}static get(){
return Ti}};function Aa(n,t,e){return ve.applyChanges(n,[{fromA:t,toA:e,fromB:t,toB:e}])}var Bi=class n{constructor(t){this.
context=t,this.tree=t.tree}apply(t){if(!t.docChanged&&this.tree==this.context.tree)return this;let e=this.context.changes(
t.changes,t.state),i=this.context.treeLen==t.startState.doc.length?void 0:Math.max(t.changes.mapPos(this.context.treeLen),
e.viewport.to);return e.work(20,i)||e.takeTree(),new n(e)}static init(t){let e=Math.min(3e3,t.doc.length),i=xr.create(t.
facet(Ue).parser,t,{from:0,to:e});return i.work(20,e)||i.takeTree(),new n(i)}};Ct.state=ct.define({create:Bi.init,update(n,t){
for(let e of t.effects)if(e.is(Ct.setState))return e.value;return t.startState.facet(Ue)!=t.state.facet(Ue)?Bi.init(t.state):
n.apply(t)}});var Ta=n=>{let t=setTimeout(()=>n(),500);return()=>clearTimeout(t)};typeof requestIdleCallback<"u"&&(Ta=n=>{
let t=-1,e=setTimeout(()=>{t=requestIdleCallback(n,{timeout:400})},100);return()=>t<0?clearTimeout(e):cancelIdleCallback(
t)});var yr=typeof navigator<"u"&&(!((br=navigator.scheduling)===null||br===void 0)&&br.isInputPending)?()=>navigator.scheduling.
isInputPending():null,nu=Kt.fromClass(class{constructor(t){this.view=t,this.working=null,this.workScheduled=0,this.chunkEnd=
-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(t){let e=this.view.state.field(Ct.state).
context;(e.updateViewport(t.view.viewport)||this.view.viewport.to>e.treeLen)&&this.scheduleWork(),(t.docChanged||t.selectionSet)&&
(this.view.hasFocus&&(this.chunkBudget+=50),this.scheduleWork()),this.checkAsyncSchedule(e)}scheduleWork(){if(this.working)
return;let{state:t}=this.view,e=t.field(Ct.state);(e.tree!=e.context.tree||!e.context.isDone(t.doc.length))&&(this.working=
Ta(this.work))}work(t){this.working=null;let e=Date.now();if(this.chunkEnd<e&&(this.chunkEnd<0||this.view.hasFocus)&&(this.
chunkEnd=e+3e4,this.chunkBudget=3e3),this.chunkBudget<=0)return;let{state:i,viewport:{to:s}}=this.view,r=i.field(Ct.state);
if(r.tree==r.context.tree&&r.context.isDone(s+1e5))return;let o=Date.now()+Math.min(this.chunkBudget,100,t&&!yr?Math.max(
25,t.timeRemaining()-5):1e9),l=r.context.treeLen<s&&i.doc.length>s+1e3,a=r.context.work(()=>yr&&yr()||Date.now()>o,s+(l?
0:1e5));this.chunkBudget-=Date.now()-e,(a||this.chunkBudget<=0)&&(r.context.takeTree(),this.view.dispatch({effects:Ct.setState.
of(new Bi(r.context))})),this.chunkBudget>0&&!(a&&!l)&&this.scheduleWork(),this.checkAsyncSchedule(r.context)}checkAsyncSchedule(t){
t.scheduleOn&&(this.workScheduled++,t.scheduleOn.then(()=>this.scheduleWork()).catch(e=>Tt(this.view.state,e)).then(()=>this.
workScheduled--),t.scheduleOn=null)}destroy(){this.working&&this.working()}isWorking(){return!!(this.working||this.workScheduled>
0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),Ue=E.define({combine(n){return n.length?n[0]:null},enables:n=>[Ct.state,
nu,B.contentAttributes.compute([n],t=>{let e=t.facet(n);return e&&e.name?{"data-language":e.name}:{}})]});var su=E.define(),Rn=E.define({combine:n=>{if(!n.length)return"  ";let t=n[0];if(!t||/\S/.test(t)||Array.from(t).some(e=>e!=
t[0]))throw new Error("Invalid indent unit: "+JSON.stringify(n[0]));return t}});function Oi(n){let t=n.facet(Rn);return t.
charCodeAt(0)==9?n.tabSize*t.length:t.length}function Pi(n,t){let e="",i=n.tabSize,s=n.facet(Rn)[0];if(s=="	"){for(;t>=i;)
e+="	",t-=i;s=" "}for(let r=0;r<t;r++)e+=s;return e}function Mr(n,t){n instanceof U&&(n=new Ae(n));for(let i of n.state.
facet(su)){let s=i(n,t);if(s!==void 0)return s}let e=te(n.state);return e.length>=t?ou(n,e,t):null}var Ae=class{constructor(t,e={}){this.state=t,this.options=e,this.unit=Oi(t)}lineAt(t,e=1){let i=this.state.doc.lineAt(t),
{simulateBreak:s,simulateDoubleBreak:r}=this.options;return s!=null&&s>=i.from&&s<=i.to?r&&s==t?{text:"",from:t}:(e<0?s<
t:s<=t)?{text:i.text.slice(s-i.from),from:s}:{text:i.text.slice(0,s-i.from),from:i.from}:i}textAfterPos(t,e=1){if(this.options.
simulateDoubleBreak&&t==this.options.simulateBreak)return"";let{text:i,from:s}=this.lineAt(t,e);return i.slice(t-s,Math.
min(i.length,t+100-s))}column(t,e=1){let{text:i,from:s}=this.lineAt(t,e),r=this.countColumn(i,t-s),o=this.options.overrideIndentation?
this.options.overrideIndentation(s):-1;return o>-1&&(r+=o-this.countColumn(i,i.search(/\S|$/))),r}countColumn(t,e=t.length){
return ge(t,this.state.tabSize,e)}lineIndent(t,e=1){let{text:i,from:s}=this.lineAt(t,e),r=this.options.overrideIndentation;
if(r){let o=r(s);if(o>-1)return o}return this.countColumn(i,i.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||
null}},ru=new O;function ou(n,t,e){let i=t.resolveStack(e),s=t.resolveInner(e,-1).resolve(e,0).enterUnfinishedNodesBefore(
e);if(s!=i.node){let r=[];for(let o=s;o&&!(o.from<i.node.from||o.to>i.node.to||o.from==i.node.from&&o.type==i.node.type);o=
o.parent)r.push(o);for(let o=r.length-1;o>=0;o--)i={node:r[o],next:i}}return Ea(i,n,e)}function Ea(n,t,e){for(let i=n;i;i=
i.next){let s=au(i.node);if(s)return s(Sr.create(t,e,i))}return 0}function lu(n){return n.pos==n.options.simulateBreak&&
n.options.simulateDoubleBreak}function au(n){let t=n.type.prop(ru);if(t)return t;let e=n.firstChild,i;if(e&&(i=e.type.prop(
O.closedBy))){let s=n.lastChild,r=s&&i.indexOf(s.name)>-1;return o=>uu(o,!0,1,void 0,r&&!lu(o)?s.from:void 0)}return n.parent==
null?hu:null}function hu(){return 0}var Sr=class n extends Ae{constructor(t,e,i){super(t.state,t.options),this.base=t,this.
pos=e,this.context=i}get node(){return this.context.node}static create(t,e,i){return new n(t,e,i)}get textAfter(){return this.
textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(t){let e=this.state.doc.lineAt(
t.from);for(;;){let i=t.resolve(e.from);for(;i.parent&&i.parent.from==i.from;)i=i.parent;if(fu(i,t))break;e=this.state.doc.
lineAt(i.from)}return this.lineIndent(e.from)}continue(){return Ea(this.context.next,this.base,this.pos)}};function fu(n,t){
for(let e=t;e;e=e.parent)if(n==e)return!0;return!1}function cu(n){let t=n.node,e=t.childAfter(t.from),i=t.lastChild;if(!e)
return null;let s=n.options.simulateBreak,r=n.state.doc.lineAt(e.from),o=s==null||s<=r.from?r.to:Math.min(r.to,s);for(let l=e.
to;;){let a=t.childAfter(l);if(!a||a==i)return null;if(!a.type.isSkipped){if(a.from>=o)return null;let h=/^ */.exec(r.text.
slice(e.to-r.from))[0].length;return{from:e.from,to:e.to+h}}l=a.to}}function uu(n,t,e,i,s){let r=n.textAfter,o=r.match(/^\s*/)[0].length,l=i&&r.slice(o,o+i.length)==i||s==n.pos+o,a=t?cu(n):
null;return a?l?n.column(a.from):n.column(a.to):n.baseIndent+(l?0:n.unit*e)}var vr=class n{constructor(t,e){this.specs=t;let i;function s(l){let a=xt.newName();return(i||(i=Object.create(null)))["\
."+a]=l,a}let r=typeof e.all=="string"?e.all:e.all?s(e.all):void 0,o=e.scope;this.scope=o instanceof Ct?l=>l.prop(Ei)==o.
data:o?l=>l==o:void 0,this.style=gr(t.map(l=>({tag:l.tag,class:l.class||s(Object.assign({},l,{tag:null}))})),{all:r}).style,
this.module=i?new xt(i):null,this.themeType=e.themeType}static define(t,e){return new n(t,e||{})}};var Cp=vr.define([{tag:x.meta,color:"#404740"},{tag:x.link,textDecoration:"underline"},{tag:x.heading,textDecoration:"un\
derline",fontWeight:"bold"},{tag:x.emphasis,fontStyle:"italic"},{tag:x.strong,fontWeight:"bold"},{tag:x.strikethrough,textDecoration:"\
line-through"},{tag:x.keyword,color:"#708"},{tag:[x.atom,x.bool,x.url,x.contentSeparator,x.labelName],color:"#219"},{tag:[
x.literal,x.inserted],color:"#164"},{tag:[x.string,x.deleted],color:"#a11"},{tag:[x.regexp,x.escape,x.special(x.string)],
color:"#e40"},{tag:x.definition(x.variableName),color:"#00f"},{tag:x.local(x.variableName),color:"#30a"},{tag:[x.typeName,
x.namespace],color:"#085"},{tag:x.className,color:"#167"},{tag:[x.special(x.variableName),x.macroName],color:"#256"},{tag:x.
definition(x.propertyName),color:"#00c"},{tag:x.comment,color:"#940"},{tag:x.invalid,color:"#f00"}]);var du=1e4,pu="()[]{}";var mu=new O;function Cr(n,t,e){let i=n.prop(t<0?O.openedBy:O.closedBy);if(i)return i;if(n.name.length==1){let s=e.indexOf(
n.name);if(s>-1&&s%2==(t<0?1:0))return[e[s+t]]}return null}function Ar(n){let t=n.type.prop(mu);return t?t(n.node):n}function Me(n,t,e,i={}){
let s=i.maxScanDistance||du,r=i.brackets||pu,o=te(n),l=o.resolveInner(t,e);for(let a=l;a;a=a.parent){let h=Cr(a.type,e,r);
if(h&&a.from<a.to){let f=Ar(a);if(f&&(e>0?t>=f.from&&t<f.to:t>f.from&&t<=f.to))return gu(n,t,e,a,f,h,r)}}return bu(n,t,e,
o,l.type,s,r)}function gu(n,t,e,i,s,r,o){let l=i.parent,a={from:s.from,to:s.to},h=0,f=l?.cursor();if(f&&(e<0?f.childBefore(
i.from):f.childAfter(i.to)))do if(e<0?f.to<=i.from:f.from>=i.to){if(h==0&&r.indexOf(f.type.name)>-1&&f.from<f.to){let c=Ar(
f);return{start:a,end:c?{from:c.from,to:c.to}:void 0,matched:!0}}else if(Cr(f.type,e,o))h++;else if(Cr(f.type,-e,o)){if(h==
0){let c=Ar(f);return{start:a,end:c&&c.from<c.to?{from:c.from,to:c.to}:void 0,matched:!1}}h--}}while(e<0?f.prevSibling():
f.nextSibling());return{start:a,matched:!1}}function bu(n,t,e,i,s,r,o){if(e<0?!t:t==n.doc.length)return null;let l=e<0?n.
sliceDoc(t-1,t):n.sliceDoc(t,t+1),a=o.indexOf(l);if(a<0||a%2==0!=e>0)return null;let h={from:e<0?t-1:t,to:e>0?t+1:t},f=n.
doc.iterRange(t,e>0?n.doc.length:0),c=0;for(let u=0;!f.next().done&&u<=r;){let d=f.value;e<0&&(u+=d.length);let p=t+u*e;
for(let m=e>0?0:d.length-1,g=e>0?d.length:-1;m!=g;m+=e){let y=o.indexOf(d[m]);if(!(y<0||i.resolveInner(p+m,1).type!=s))if(y%
2==0==e>0)c++;else{if(c==1)return{start:h,end:{from:p+m,to:p+m+1},matched:y>>1==a>>1};c--}}e>0&&(u+=d.length)}return f.done?
{start:h,matched:!1}:null}var yu=Object.create(null),Ma=[tt.none];var Da=[],La=Object.create(null),ku=Object.create(null);for(let[n,t]of[["variable","variableName"],["variable-2","variab\
leName.special"],["string-2","string.special"],["def","variableName.definition"],["tag","tagName"],["attribute","attribu\
teName"],["type","typeName"],["builtin","variableName.standard"],["qualifier","modifier"],["error","invalid"],["header",
"heading"],["property","propertyName"]])ku[n]=wu(yu,t);function kr(n,t){Da.indexOf(n)>-1||(Da.push(n),console.warn(t))}function wu(n,t){let e=[];for(let l of t.split(" ")){let a=[];
for(let h of l.split(".")){let f=n[h]||x[h];f?typeof f=="function"?a.length?a=a.map(f):kr(h,`Modifier ${h} used at start\
 of tag`):a.length?kr(h,`Tag ${h} used as modifier`):a=Array.isArray(f)?f:[f]:kr(h,`Unknown highlighting tag ${h}`)}for(let h of a)
e.push(h)}if(!e.length)return 0;let i=t.replace(/ /g,"_"),s=i+" "+e.map(l=>l.id),r=La[s];if(r)return r.id;let o=La[s]=tt.
define({id:Ma.length,name:i,props:[Li({[i]:e})]});return Ma.push(o),o.id}var Ap={rtl:z.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"rtl"},bidiIsolate:X.RTL}),ltr:z.mark({class:"cm-iso",inclusive:!0,
attributes:{dir:"ltr"},bidiIsolate:X.LTR}),auto:z.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"auto"},bidiIsolate:null})};var xu=n=>{let{state:t}=n,e=t.doc.lineAt(t.selection.main.from),i=Or(n.state,e.from);return i.line?Su(n):i.block?Cu(n):!1};
function Br(n,t){return({state:e,dispatch:i})=>{if(e.readOnly)return!1;let s=n(t,e);return s?(i(e.update(s)),!0):!1}}var Su=Br(
Du,0);var vu=Br(Va,0);var Cu=Br((n,t)=>Va(n,t,Mu(t)),0);function Or(n,t){let e=n.languageDataAt("commentTokens",t,1);return e.length?e[0]:{}}var Ri=50;
function Au(n,{open:t,close:e},i,s){let r=n.sliceDoc(i-Ri,i),o=n.sliceDoc(s,s+Ri),l=/\s*$/.exec(r)[0].length,a=/^\s*/.exec(
o)[0].length,h=r.length-l;if(r.slice(h-t.length,h)==t&&o.slice(a,a+e.length)==e)return{open:{pos:i-l,margin:l&&1},close:{
pos:s+a,margin:a&&1}};let f,c;s-i<=2*Ri?f=c=n.sliceDoc(i,s):(f=n.sliceDoc(i,i+Ri),c=n.sliceDoc(s-Ri,s));let u=/^\s*/.exec(
f)[0].length,d=/\s*$/.exec(c)[0].length,p=c.length-d-e.length;return f.slice(u,u+t.length)==t&&c.slice(p,p+e.length)==e?
{open:{pos:i+u+t.length,margin:/\s/.test(f.charAt(u+t.length))?1:0},close:{pos:s-d-e.length,margin:/\s/.test(c.charAt(p-
1))?1:0}}:null}function Mu(n){let t=[];for(let e of n.selection.ranges){let i=n.doc.lineAt(e.from),s=e.to<=i.to?i:n.doc.
lineAt(e.to);s.from>i.from&&s.from==e.to&&(s=e.to==i.to+1?i:n.doc.lineAt(e.to-1));let r=t.length-1;r>=0&&t[r].to>i.from?
t[r].to=s.to:t.push({from:i.from+/^\s*/.exec(i.text)[0].length,to:s.to})}return t}function Va(n,t,e=t.selection.ranges){
let i=e.map(r=>Or(t,r.from).block);if(!i.every(r=>r))return null;let s=e.map((r,o)=>Au(t,i[o],r.from,r.to));if(n!=2&&!s.
every(r=>r))return{changes:t.changes(e.map((r,o)=>s[o]?[]:[{from:r.from,insert:i[o].open+" "},{from:r.to,insert:" "+i[o].
close}]))};if(n!=1&&s.some(r=>r)){let r=[];for(let o=0,l;o<s.length;o++)if(l=s[o]){let a=i[o],{open:h,close:f}=l;r.push(
{from:h.pos-a.open.length,to:h.pos+h.margin},{from:f.pos-f.margin,to:f.pos+a.close.length})}return{changes:r}}return null}
function Du(n,t,e=t.selection.ranges){let i=[],s=-1;for(let{from:r,to:o}of e){let l=i.length,a=1e9,h=Or(t,r).line;if(h){
for(let f=r;f<=o;){let c=t.doc.lineAt(f);if(c.from>s&&(r==o||o>c.from)){s=c.from;let u=/^\s*/.exec(c.text)[0].length,d=u==
c.length,p=c.text.slice(u,u+h.length)==h?u:-1;u<c.text.length&&u<a&&(a=u),i.push({line:c,comment:p,token:h,indent:u,empty:d,
single:!1})}f=c.to+1}if(a<1e9)for(let f=l;f<i.length;f++)i[f].indent<i[f].line.text.length&&(i[f].indent=a);i.length==l+
1&&(i[l].single=!0)}}if(n!=2&&i.some(r=>r.comment<0&&(!r.empty||r.single))){let r=[];for(let{line:l,token:a,indent:h,empty:f,
single:c}of i)(c||!f)&&r.push({from:l.from+h,insert:a+" "});let o=t.changes(r);return{changes:o,selection:t.selection.map(
o,1)}}else if(n!=1&&i.some(r=>r.comment>=0)){let r=[];for(let{line:o,comment:l,token:a}of i)if(l>=0){let h=o.from+l,f=h+
a.length;o.text[f-o.from]==" "&&f++,r.push({from:h,to:f})}return{changes:r}}return null}var Lr=wt.define(),Pr=wt.define(),
Lu=E.define(),za=E.define({combine(n){return ni(n,{minDepth:100,newGroupDelay:500,joinToEvent:(t,e)=>e},{minDepth:Math.max,
newGroupDelay:Math.min,joinToEvent:(t,e)=>(i,s)=>t(i,s)||e(i,s)})}}),Wa=ct.define({create(){return De.empty},update(n,t){
let e=t.state.facet(za),i=t.annotation(Lr);if(i){let a=Bt.fromTransaction(t,i.selection),h=i.side,f=h==0?n.undone:n.done;
return a?f=Nn(f,f.length,e.minDepth,a):f=$a(f,t.startState.selection),new De(h==0?i.rest:f,h==0?f:i.rest)}let s=t.annotation(
Pr);if((s=="full"||s=="before")&&(n=n.isolate()),t.annotation(J.addToHistory)===!1)return t.changes.empty?n:n.addMapping(
t.changes.desc);let r=Bt.fromTransaction(t),o=t.annotation(J.time),l=t.annotation(J.userEvent);return r?n=n.addChanges(r,
o,l,e,t):t.selection&&(n=n.addSelection(t.startState.selection,o,l,e.newGroupDelay)),(s=="full"||s=="after")&&(n=n.isolate()),
n},toJSON(n){return{done:n.done.map(t=>t.toJSON()),undone:n.undone.map(t=>t.toJSON())}},fromJSON(n){return new De(n.done.
map(Bt.fromJSON),n.undone.map(Bt.fromJSON))}});function qa(n={}){return[Wa,za.of(n),B.domEventHandlers({beforeinput(t,e){
let i=t.inputType=="historyUndo"?Fn:t.inputType=="historyRedo"?Ii:null;return i?(t.preventDefault(),i(e)):!1}})]}function Hn(n,t){return function({state:e,dispatch:i}){if(!t&&e.readOnly)return!1;let s=e.field(Wa,!1);if(!s)return!1;let r=s.
pop(n,e,t);return r?(i(r),!0):!1}}var Fn=Hn(0,!1),Ii=Hn(1,!1),Tu=Hn(0,!0),Eu=Hn(1,!0);var Bt=class n{constructor(t,e,i,s,r){this.changes=t,this.effects=e,this.mapped=i,this.startSelection=s,this.selectionsAfter=
r}setSelAfter(t){return new n(this.changes,this.effects,this.mapped,this.startSelection,t)}toJSON(){var t,e,i;return{changes:(t=
this.changes)===null||t===void 0?void 0:t.toJSON(),mapped:(e=this.mapped)===null||e===void 0?void 0:e.toJSON(),startSelection:(i=
this.startSelection)===null||i===void 0?void 0:i.toJSON(),selectionsAfter:this.selectionsAfter.map(s=>s.toJSON())}}static fromJSON(t){
return new n(t.changes&&lt.fromJSON(t.changes),[],t.mapped&&Xt.fromJSON(t.mapped),t.startSelection&&C.fromJSON(t.startSelection),
t.selectionsAfter.map(C.fromJSON))}static fromTransaction(t,e){let i=At;for(let s of t.startState.facet(Lu)){let r=s(t);
r.length&&(i=i.concat(r))}return!i.length&&t.changes.empty?null:new n(t.changes.invert(t.startState.doc),i,void 0,e||t.startState.
selection,At)}static selection(t){return new n(void 0,At,void 0,void 0,t)}};function Nn(n,t,e,i){let s=t+1>e+20?t-e-1:0,
r=n.slice(s,t);return r.push(i),r}function Bu(n,t){let e=[],i=!1;return n.iterChangedRanges((s,r)=>e.push(s,r)),t.iterChangedRanges(
(s,r,o,l)=>{for(let a=0;a<e.length;){let h=e[a++],f=e[a++];l>=h&&o<=f&&(i=!0)}}),i}function Ou(n,t){return n.ranges.length==
t.ranges.length&&n.ranges.filter((e,i)=>e.empty!=t.ranges[i].empty).length===0}function Ka(n,t){return n.length?t.length?
n.concat(t):n:t}var At=[],Pu=200;function $a(n,t){if(n.length){let e=n[n.length-1],i=e.selectionsAfter.slice(Math.max(0,
e.selectionsAfter.length-Pu));return i.length&&i[i.length-1].eq(t)?n:(i.push(t),Nn(n,n.length-1,1e9,e.setSelAfter(i)))}else
return[Bt.selection([t])]}function Ru(n){let t=n[n.length-1],e=n.slice();return e[n.length-1]=t.setSelAfter(t.selectionsAfter.
slice(0,t.selectionsAfter.length-1)),e}function Dr(n,t){if(!n.length)return n;let e=n.length,i=At;for(;e;){let s=Iu(n[e-
1],t,i);if(s.changes&&!s.changes.empty||s.effects.length){let r=n.slice(0,e);return r[e-1]=s,r}else t=s.mapped,e--,i=s.selectionsAfter}
return i.length?[Bt.selection(i)]:At}function Iu(n,t,e){let i=Ka(n.selectionsAfter.length?n.selectionsAfter.map(l=>l.map(
t)):At,e);if(!n.changes)return Bt.selection(i);let s=n.changes.map(t),r=t.mapDesc(n.changes,!0),o=n.mapped?n.mapped.composeDesc(
r):r;return new Bt(s,q.mapEffects(n.effects,t),o,n.startSelection.map(r),i)}var Nu=/^(input\.type|delete)($|\.)/,De=class n{constructor(t,e,i=0,s=void 0){
this.done=t,this.undone=e,this.prevTime=i,this.prevUserEvent=s}isolate(){return this.prevTime?new n(this.done,this.undone):
this}addChanges(t,e,i,s,r){let o=this.done,l=o[o.length-1];return l&&l.changes&&!l.changes.empty&&t.changes&&(!i||Nu.test(
i))&&(!l.selectionsAfter.length&&e-this.prevTime<s.newGroupDelay&&s.joinToEvent(r,Bu(l.changes,t.changes))||i=="input.ty\
pe.compose")?o=Nn(o,o.length-1,s.minDepth,new Bt(t.changes.compose(l.changes),Ka(q.mapEffects(t.effects,l.changes),l.effects),
l.mapped,l.startSelection,At)):o=Nn(o,o.length,s.minDepth,t),new n(o,At,e,i)}addSelection(t,e,i,s){let r=this.done.length?
this.done[this.done.length-1].selectionsAfter:At;return r.length>0&&e-this.prevTime<s&&i==this.prevUserEvent&&i&&/^select($|\.)/.
test(i)&&Ou(r[r.length-1],t)?this:new n($a(this.done,t),this.undone,e,i)}addMapping(t){return new n(Dr(this.done,t),Dr(this.
undone,t),this.prevTime,this.prevUserEvent)}pop(t,e,i){let s=t==0?this.done:this.undone;if(s.length==0)return null;let r=s[s.
length-1],o=r.selectionsAfter[0]||e.selection;if(i&&r.selectionsAfter.length)return e.update({selection:r.selectionsAfter[r.
selectionsAfter.length-1],annotations:Lr.of({side:t,rest:Ru(s),selection:o}),userEvent:t==0?"select.undo":"select.redo",
scrollIntoView:!0});if(r.changes){let l=s.length==1?At:s.slice(0,s.length-1);return r.mapped&&(l=Dr(l,r.mapped)),e.update(
{changes:r.changes,selection:r.startSelection,effects:r.effects,annotations:Lr.of({side:t,rest:l,selection:o}),filter:!1,
userEvent:t==0?"undo":"redo",scrollIntoView:!0})}else return null}};De.empty=new De(At,At);var ja=[{key:"Mod-z",run:Fn,preventDefault:!0},
{key:"Mod-y",mac:"Mod-Shift-z",run:Ii,preventDefault:!0},{linux:"Ctrl-Shift-z",run:Ii,preventDefault:!0},{key:"Mod-u",run:Tu,
preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:Eu,preventDefault:!0}];function _e(n,t){return C.create(n.ranges.map(
t),n.mainIndex)}function Ot(n,t){return n.update({selection:t,scrollIntoView:!0,userEvent:"select"})}function Pt({state:n,
dispatch:t},e){let i=_e(n.selection,e);return i.eq(n.selection,!0)?!1:(t(Ot(n,i)),!0)}function Vn(n,t){return C.cursor(t?
n.to:n.from)}function Ua(n,t){return Pt(n,e=>e.empty?n.moveByChar(e,t):Vn(e,t))}function rt(n){return n.textDirectionAt(
n.state.selection.main.head)==X.LTR}var _a=n=>Ua(n,!rt(n)),Ga=n=>Ua(n,rt(n));function Xa(n,t){return Pt(n,e=>e.empty?n.moveByGroup(e,t):Vn(e,t))}var Hu=n=>Xa(n,!rt(n)),Fu=n=>Xa(n,rt(n));var Op=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter(void 0,{granularity:"word"}):null;function Vu(n,t,e){if(t.type.prop(e))return!0;let i=t.to-t.from;return i&&(i>2||/[^\s,.;:]/.test(n.sliceDoc(t.from,t.to)))||
t.firstChild}function zn(n,t,e){let i=te(n).resolveInner(t.head),s=e?O.closedBy:O.openedBy;for(let a=t.head;;){let h=e?i.
childAfter(a):i.childBefore(a);if(!h)break;Vu(n,h,s)?i=h:a=e?h.to:h.from}let r=i.type.prop(s),o,l;return r&&(o=e?Me(n,i.
from,1):Me(n,i.to,-1))&&o.matched?l=e?o.end.to:o.end.from:l=e?i.to:i.from,C.cursor(l,e?-1:1)}var zu=n=>Pt(n,t=>zn(n.state,
t,!rt(n))),Wu=n=>Pt(n,t=>zn(n.state,t,rt(n)));function Ja(n,t){return Pt(n,e=>{if(!e.empty)return Vn(e,t);let i=n.moveVertically(
e,t);return i.head!=e.head?i:n.moveToLineBoundary(e,t)})}var Ya=n=>Ja(n,!1),Qa=n=>Ja(n,!0);function Za(n){let t=n.scrollDOM.
clientHeight<n.scrollDOM.scrollHeight-2,e=0,i=0,s;if(t){for(let r of n.state.facet(B.scrollMargins)){let o=r(n);o?.top&&
(e=Math.max(o?.top,e)),o?.bottom&&(i=Math.max(o?.bottom,i))}s=n.scrollDOM.clientHeight-e-i}else s=(n.dom.ownerDocument.defaultView||
window).innerHeight;return{marginTop:e,marginBottom:i,selfScroll:t,height:Math.max(n.defaultLineHeight,s-5)}}function th(n,t){
let e=Za(n),{state:i}=n,s=_e(i.selection,o=>o.empty?n.moveVertically(o,t,e.height):Vn(o,t));if(s.eq(i.selection))return!1;
let r;if(e.selfScroll){let o=n.coordsAtPos(i.selection.main.head),l=n.scrollDOM.getBoundingClientRect(),a=l.top+e.marginTop,
h=l.bottom-e.marginBottom;o&&o.top>a&&o.bottom<h&&(r=B.scrollIntoView(s.main.head,{y:"start",yMargin:o.top-a}))}return n.
dispatch(Ot(i,s),{effects:r}),!0}var Ba=n=>th(n,!1),Tr=n=>th(n,!0);function fe(n,t,e){let i=n.lineBlockAt(t.head),s=n.moveToLineBoundary(
t,e);if(s.head==t.head&&s.head!=(e?i.to:i.from)&&(s=n.moveToLineBoundary(t,e,!1)),!e&&s.head==i.from&&i.length){let r=/^\s*/.
exec(n.state.sliceDoc(i.from,Math.min(i.from+100,i.to)))[0].length;r&&t.head!=i.from+r&&(s=C.cursor(i.from+r))}return s}
var qu=n=>Pt(n,t=>fe(n,t,!0)),Ku=n=>Pt(n,t=>fe(n,t,!1)),$u=n=>Pt(n,t=>fe(n,t,!rt(n))),ju=n=>Pt(n,t=>fe(n,t,rt(n))),Uu=n=>Pt(
n,t=>C.cursor(n.lineBlockAt(t.head).from,1)),_u=n=>Pt(n,t=>C.cursor(n.lineBlockAt(t.head).to,-1));function Gu(n,t,e){let i=!1,
s=_e(n.selection,r=>{let o=Me(n,r.head,-1)||Me(n,r.head,1)||r.head>0&&Me(n,r.head-1,1)||r.head<n.doc.length&&Me(n,r.head+
1,-1);if(!o||!o.end)return r;i=!0;let l=o.start.from==r.head?o.end.to:o.end.from;return e?C.range(r.anchor,l):C.cursor(l)});
return i?(t(Ot(n,s)),!0):!1}var Xu=({state:n,dispatch:t})=>Gu(n,t,!1);function Mt(n,t){let e=_e(n.state.selection,i=>{let s=t(i);return C.range(i.anchor,s.head,s.goalColumn,s.bidiLevel||void 0)});
return e.eq(n.state.selection)?!1:(n.dispatch(Ot(n.state,e)),!0)}function eh(n,t){return Mt(n,e=>n.moveByChar(e,t))}var ih=n=>eh(
n,!rt(n)),nh=n=>eh(n,rt(n));function sh(n,t){return Mt(n,e=>n.moveByGroup(e,t))}var Ju=n=>sh(n,!rt(n)),Yu=n=>sh(n,rt(n));var Qu=n=>Mt(n,t=>zn(n.state,t,!rt(n))),Zu=n=>Mt(n,t=>zn(n.state,t,rt(n)));function rh(n,t){return Mt(n,e=>n.moveVertically(
e,t))}var oh=n=>rh(n,!1),lh=n=>rh(n,!0);function ah(n,t){return Mt(n,e=>n.moveVertically(e,t,Za(n).height))}var Oa=n=>ah(
n,!1),Pa=n=>ah(n,!0),td=n=>Mt(n,t=>fe(n,t,!0)),ed=n=>Mt(n,t=>fe(n,t,!1)),id=n=>Mt(n,t=>fe(n,t,!rt(n))),nd=n=>Mt(n,t=>fe(
n,t,rt(n))),sd=n=>Mt(n,t=>C.cursor(n.lineBlockAt(t.head).from)),rd=n=>Mt(n,t=>C.cursor(n.lineBlockAt(t.head).to)),Ra=({state:n,
dispatch:t})=>(t(Ot(n,{anchor:0})),!0),Ia=({state:n,dispatch:t})=>(t(Ot(n,{anchor:n.doc.length})),!0),Na=({state:n,dispatch:t})=>(t(
Ot(n,{anchor:n.selection.main.anchor,head:0})),!0),Ha=({state:n,dispatch:t})=>(t(Ot(n,{anchor:n.selection.main.anchor,head:n.
doc.length})),!0),od=({state:n,dispatch:t})=>(t(n.update({selection:{anchor:0,head:n.doc.length},userEvent:"select"})),!0),
ld=({state:n,dispatch:t})=>{let e=Wn(n).map(({from:i,to:s})=>C.range(i,Math.min(s+1,n.doc.length)));return t(n.update({selection:C.
create(e),userEvent:"select"})),!0},ad=({state:n,dispatch:t})=>{let e=_e(n.selection,i=>{let s=te(n),r=s.resolveStack(i.
from,1);if(i.empty){let o=s.resolveStack(i.from,-1);o.node.from>=r.node.from&&o.node.to<=r.node.to&&(r=o)}for(let o=r;o;o=
o.next){let{node:l}=o;if((l.from<i.from&&l.to>=i.to||l.to>i.to&&l.from<=i.from)&&o.next)return C.range(l.to,l.from)}return i});
return e.eq(n.selection)?!1:(t(Ot(n,e)),!0)};function hh(n,t){let{state:e}=n,i=e.selection,s=e.selection.ranges.slice();
for(let r of e.selection.ranges){let o=e.doc.lineAt(r.head);if(t?o.to<n.state.doc.length:o.from>0)for(let l=r;;){let a=n.
moveVertically(l,t);if(a.head<o.from||a.head>o.to){s.some(h=>h.head==a.head)||s.push(a);break}else{if(a.head==l.head)break;
l=a}}}return s.length==i.ranges.length?!1:(n.dispatch(Ot(e,C.create(s,s.length-1))),!0)}var hd=n=>hh(n,!1),fd=n=>hh(n,!0),
cd=({state:n,dispatch:t})=>{let e=n.selection,i=null;return e.ranges.length>1?i=C.create([e.main]):e.main.empty||(i=C.create(
[C.cursor(e.main.head)])),i?(t(Ot(n,i)),!0):!1};function Ni(n,t){if(n.state.readOnly)return!1;let e="delete.selection",{
state:i}=n,s=i.changeByRange(r=>{let{from:o,to:l}=r;if(o==l){let a=t(r);a<o?(e="delete.backward",a=In(n,a,!1)):a>o&&(e="\
delete.forward",a=In(n,a,!0)),o=Math.min(o,a),l=Math.max(l,a)}else o=In(n,o,!1),l=In(n,l,!0);return o==l?{range:r}:{changes:{
from:o,to:l},range:C.cursor(o,o<r.head?-1:1)}});return s.changes.empty?!1:(n.dispatch(i.update(s,{scrollIntoView:!0,userEvent:e,
effects:e=="delete.selection"?B.announce.of(i.phrase("Selection deleted")):void 0})),!0)}function In(n,t,e){if(n instanceof
B)for(let i of n.state.facet(B.atomicRanges).map(s=>s(n)))i.between(t,t,(s,r)=>{s<t&&r>t&&(t=e?r:s)});return t}var fh=(n,t,e)=>Ni(
n,i=>{let s=i.from,{state:r}=n,o=r.doc.lineAt(s),l,a;if(e&&!t&&s>o.from&&s<o.from+200&&!/[^ \t]/.test(l=o.text.slice(0,s-
o.from))){if(l[l.length-1]=="	")return s-1;let h=ge(l,r.tabSize),f=h%Oi(r)||Oi(r);for(let c=0;c<f&&l[l.length-1-c]==" ";c++)
s--;a=s}else a=it(o.text,s-o.from,t,t)+o.from,a==s&&o.number!=(t?r.doc.lines:1)?a+=t?1:-1:!t&&/[\ufe00-\ufe0f]/.test(o.text.
slice(a-o.from,s-o.from))&&(a=it(o.text,a-o.from,!1,!1)+o.from);return a}),Er=n=>fh(n,!1,!0);var ch=n=>fh(n,!0,!1),uh=(n,t)=>Ni(n,e=>{let i=e.head,{state:s}=n,r=s.doc.lineAt(i),o=s.charCategorizer(i);for(let l=null;;){
if(i==(t?r.to:r.from)){i==e.head&&r.number!=(t?s.doc.lines:1)&&(i+=t?1:-1);break}let a=it(r.text,i-r.from,t)+r.from,h=r.
text.slice(Math.min(i,a)-r.from,Math.max(i,a)-r.from),f=o(h);if(l!=null&&f!=l)break;(h!=" "||i!=e.head)&&(l=f),i=a}return i}),
dh=n=>uh(n,!1),ud=n=>uh(n,!0);var dd=n=>Ni(n,t=>{let e=n.lineBlockAt(t.head).to;return t.head<e?e:Math.min(n.state.doc.length,t.head+1)});var pd=n=>Ni(n,t=>{let e=n.moveToLineBoundary(t,!1).head;return t.head>e?e:Math.max(0,t.head-1)}),md=n=>Ni(n,t=>{let e=n.
moveToLineBoundary(t,!0).head;return t.head<e?e:Math.min(n.state.doc.length,t.head+1)});var gd=({state:n,dispatch:t})=>{if(n.readOnly)return!1;let e=n.changeByRange(i=>({changes:{from:i.from,to:i.to,insert:H.
of(["",""])},range:C.cursor(i.from)}));return t(n.update(e,{scrollIntoView:!0,userEvent:"input"})),!0},bd=({state:n,dispatch:t})=>{
if(n.readOnly)return!1;let e=n.changeByRange(i=>{if(!i.empty||i.from==0||i.from==n.doc.length)return{range:i};let s=i.from,
r=n.doc.lineAt(s),o=s==r.from?s-1:it(r.text,s-r.from,!1)+r.from,l=s==r.to?s+1:it(r.text,s-r.from,!0)+r.from;return{changes:{
from:o,to:l,insert:n.doc.slice(s,l).append(n.doc.slice(o,s))},range:C.cursor(l)}});return e.changes.empty?!1:(t(n.update(
e,{scrollIntoView:!0,userEvent:"move.character"})),!0)};function Wn(n){let t=[],e=-1;for(let i of n.selection.ranges){let s=n.
doc.lineAt(i.from),r=n.doc.lineAt(i.to);if(!i.empty&&i.to==r.from&&(r=n.doc.lineAt(i.to-1)),e>=s.number){let o=t[t.length-
1];o.to=r.to,o.ranges.push(i)}else t.push({from:s.from,to:r.to,ranges:[i]});e=r.number+1}return t}function ph(n,t,e){if(n.
readOnly)return!1;let i=[],s=[];for(let r of Wn(n)){if(e?r.to==n.doc.length:r.from==0)continue;let o=n.doc.lineAt(e?r.to+
1:r.from-1),l=o.length+1;if(e){i.push({from:r.to,to:o.to},{from:r.from,insert:o.text+n.lineBreak});for(let a of r.ranges)
s.push(C.range(Math.min(n.doc.length,a.anchor+l),Math.min(n.doc.length,a.head+l)))}else{i.push({from:o.from,to:r.from},{
from:r.to,insert:n.lineBreak+o.text});for(let a of r.ranges)s.push(C.range(a.anchor-l,a.head-l))}}return i.length?(t(n.update(
{changes:i,scrollIntoView:!0,selection:C.create(s,n.selection.mainIndex),userEvent:"move.line"})),!0):!1}var yd=({state:n,
dispatch:t})=>ph(n,t,!1),kd=({state:n,dispatch:t})=>ph(n,t,!0);function mh(n,t,e){if(n.readOnly)return!1;let i=[];for(let r of Wn(
n))e?i.push({from:r.from,insert:n.doc.slice(r.from,r.to)+n.lineBreak}):i.push({from:r.to,insert:n.lineBreak+n.doc.slice(
r.from,r.to)});let s=n.changes(i);return t(n.update({changes:s,selection:n.selection.map(s,e?1:-1),scrollIntoView:!0,userEvent:"\
input.copyline"})),!0}var wd=({state:n,dispatch:t})=>mh(n,t,!1),xd=({state:n,dispatch:t})=>mh(n,t,!0),Sd=n=>{if(n.state.
readOnly)return!1;let{state:t}=n,e=t.changes(Wn(t).map(({from:s,to:r})=>(s>0?s--:r<t.doc.length&&r++,{from:s,to:r}))),i=_e(
t.selection,s=>{let r;if(n.lineWrapping){let o=n.lineBlockAt(s.head),l=n.coordsAtPos(s.head,s.assoc||1);l&&(r=o.bottom+n.
documentTop-l.bottom+n.defaultLineHeight/2)}return n.moveVertically(s,!0,r)}).map(e);return n.dispatch({changes:e,selection:i,
scrollIntoView:!0,userEvent:"delete.line"}),!0};function vd(n,t){if(/\(\)|\[\]|\{\}/.test(n.sliceDoc(t-1,t+1)))return{from:t,to:t};let e=te(n).resolveInner(t),i=e.childBefore(
t),s=e.childAfter(t),r;return i&&s&&i.to<=t&&s.from>=t&&(r=i.type.prop(O.closedBy))&&r.indexOf(s.name)>-1&&n.doc.lineAt(
i.to).from==n.doc.lineAt(s.from).from&&!/\S/.test(n.sliceDoc(i.to,s.from))?{from:i.to,to:s.from}:null}var Fa=gh(!1),Cd=gh(
!0);function gh(n){return({state:t,dispatch:e})=>{if(t.readOnly)return!1;let i=t.changeByRange(s=>{let{from:r,to:o}=s,l=t.
doc.lineAt(r),a=!n&&r==o&&vd(t,r);n&&(r=o=(o<=l.to?l:t.doc.lineAt(o)).to);let h=new Ae(t,{simulateBreak:r,simulateDoubleBreak:!!a}),
f=Mr(h,r);for(f==null&&(f=ge(/^\s*/.exec(t.doc.lineAt(r).text)[0],t.tabSize));o<l.to&&/\s/.test(l.text[o-l.from]);)o++;a?
{from:r,to:o}=a:r>l.from&&r<l.from+100&&!/\S/.test(l.text.slice(0,r))&&(r=l.from);let c=["",Pi(t,f)];return a&&c.push(Pi(
t,h.lineIndent(l.from,-1))),{changes:{from:r,to:o,insert:H.of(c)},range:C.cursor(r+1+c[1].length)}});return e(t.update(i,
{scrollIntoView:!0,userEvent:"input"})),!0}}function Rr(n,t){let e=-1;return n.changeByRange(i=>{let s=[];for(let o=i.from;o<=
i.to;){let l=n.doc.lineAt(o);l.number>e&&(i.empty||i.to>l.from)&&(t(l,s,i),e=l.number),o=l.to+1}let r=n.changes(s);return{
changes:s,range:C.range(r.mapPos(i.anchor,1),r.mapPos(i.head,1))}})}var Ad=({state:n,dispatch:t})=>{if(n.readOnly)return!1;
let e=Object.create(null),i=new Ae(n,{overrideIndentation:r=>{let o=e[r];return o??-1}}),s=Rr(n,(r,o,l)=>{let a=Mr(i,r.from);
if(a==null)return;/\S/.test(r.text)||(a=0);let h=/^\s*/.exec(r.text)[0],f=Pi(n,a);(h!=f||l.from<r.from+h.length)&&(e[r.from]=
a,o.push({from:r.from,to:r.from+h.length,insert:f}))});return s.changes.empty||t(n.update(s,{userEvent:"indent"})),!0},Md=({
state:n,dispatch:t})=>n.readOnly?!1:(t(n.update(Rr(n,(e,i)=>{i.push({from:e.from,insert:n.facet(Rn)})}),{userEvent:"inpu\
t.indent"})),!0),Dd=({state:n,dispatch:t})=>n.readOnly?!1:(t(n.update(Rr(n,(e,i)=>{let s=/^\s*/.exec(e.text)[0];if(!s)return;
let r=ge(s,n.tabSize),o=0,l=Pi(n,Math.max(0,r-Oi(n)));for(;o<s.length&&o<l.length&&s.charCodeAt(o)==l.charCodeAt(o);)o++;
i.push({from:e.from+o,to:e.from+s.length,insert:l.slice(o)})}),{userEvent:"delete.dedent"})),!0),Ld=n=>(n.setTabFocusMode(),
!0);var Td=[{key:"Ctrl-b",run:_a,shift:ih,preventDefault:!0},{key:"Ctrl-f",run:Ga,shift:nh},{key:"Ctrl-p",run:Ya,shift:oh},{
key:"Ctrl-n",run:Qa,shift:lh},{key:"Ctrl-a",run:Uu,shift:sd},{key:"Ctrl-e",run:_u,shift:rd},{key:"Ctrl-d",run:ch},{key:"\
Ctrl-h",run:Er},{key:"Ctrl-k",run:dd},{key:"Ctrl-Alt-h",run:dh},{key:"Ctrl-o",run:gd},{key:"Ctrl-t",run:bd},{key:"Ctrl-v",
run:Tr}],Ed=[{key:"ArrowLeft",run:_a,shift:ih,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:Hu,shift:Ju,
preventDefault:!0},{mac:"Cmd-ArrowLeft",run:$u,shift:id,preventDefault:!0},{key:"ArrowRight",run:Ga,shift:nh,preventDefault:!0},
{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:Fu,shift:Yu,preventDefault:!0},{mac:"Cmd-ArrowRight",run:ju,shift:nd,preventDefault:!0},
{key:"ArrowUp",run:Ya,shift:oh,preventDefault:!0},{mac:"Cmd-ArrowUp",run:Ra,shift:Na},{mac:"Ctrl-ArrowUp",run:Ba,shift:Oa},
{key:"ArrowDown",run:Qa,shift:lh,preventDefault:!0},{mac:"Cmd-ArrowDown",run:Ia,shift:Ha},{mac:"Ctrl-ArrowDown",run:Tr,shift:Pa},
{key:"PageUp",run:Ba,shift:Oa},{key:"PageDown",run:Tr,shift:Pa},{key:"Home",run:Ku,shift:ed,preventDefault:!0},{key:"Mod\
-Home",run:Ra,shift:Na},{key:"End",run:qu,shift:td,preventDefault:!0},{key:"Mod-End",run:Ia,shift:Ha},{key:"Enter",run:Fa,
shift:Fa},{key:"Mod-a",run:od},{key:"Backspace",run:Er,shift:Er,preventDefault:!0},{key:"Delete",run:ch,preventDefault:!0},
{key:"Mod-Backspace",mac:"Alt-Backspace",run:dh,preventDefault:!0},{key:"Mod-Delete",mac:"Alt-Delete",run:ud,preventDefault:!0},
{mac:"Mod-Backspace",run:pd,preventDefault:!0},{mac:"Mod-Delete",run:md,preventDefault:!0}].concat(Td.map(n=>({mac:n.key,
run:n.run,shift:n.shift}))),bh=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:zu,shift:Qu},{key:"Alt-ArrowRight",mac:"Ct\
rl-ArrowRight",run:Wu,shift:Zu},{key:"Alt-ArrowUp",run:yd},{key:"Shift-Alt-ArrowUp",run:wd},{key:"Alt-ArrowDown",run:kd},
{key:"Shift-Alt-ArrowDown",run:xd},{key:"Mod-Alt-ArrowUp",run:hd},{key:"Mod-Alt-ArrowDown",run:fd},{key:"Escape",run:cd},
{key:"Mod-Enter",run:Cd},{key:"Alt-l",mac:"Ctrl-l",run:ld},{key:"Mod-i",run:ad,preventDefault:!0},{key:"Mod-[",run:Dd},{
key:"Mod-]",run:Md},{key:"Mod-Alt-\\",run:Ad},{key:"Shift-Mod-k",run:Sd},{key:"Shift-Mod-\\",run:Xu},{key:"Mod-/",run:xu},
{key:"Alt-A",run:vu},{key:"Ctrl-m",mac:"Shift-Alt-m",run:Ld}].concat(Ed);var $n=class n{static create(t,e,i,s,r){let o=s+(s<<8)+t+(e<<4)|0;return new n(t,e,i,o,r,[],[])}constructor(t,e,i,s,r,o,l){
this.type=t,this.value=e,this.from=i,this.hash=s,this.end=r,this.children=o,this.positions=l,this.hashProp=[[O.contextHash,
s]]}addChild(t,e){t.prop(O.contextHash)!=this.hash&&(t=new G(t.type,t.children,t.positions,t.length,this.hashProp)),this.
children.push(t),this.positions.push(e)}toTree(t,e=this.end){let i=this.children.length-1;return i>=0&&(e=Math.max(e,this.
positions[i]+this.children[i].length+this.from)),new G(t.types[this.type],this.children,this.positions,e-this.from).balance(
{makeTree:(s,r,o)=>new G(tt.none,s,r,o,this.hashProp)})}},M;(function(n){n[n.Document=1]="Document",n[n.CodeBlock=2]="Co\
deBlock",n[n.FencedCode=3]="FencedCode",n[n.Blockquote=4]="Blockquote",n[n.HorizontalRule=5]="HorizontalRule",n[n.BulletList=
6]="BulletList",n[n.OrderedList=7]="OrderedList",n[n.ListItem=8]="ListItem",n[n.ATXHeading1=9]="ATXHeading1",n[n.ATXHeading2=
10]="ATXHeading2",n[n.ATXHeading3=11]="ATXHeading3",n[n.ATXHeading4=12]="ATXHeading4",n[n.ATXHeading5=13]="ATXHeading5",
n[n.ATXHeading6=14]="ATXHeading6",n[n.SetextHeading1=15]="SetextHeading1",n[n.SetextHeading2=16]="SetextHeading2",n[n.HTMLBlock=
17]="HTMLBlock",n[n.LinkReference=18]="LinkReference",n[n.Paragraph=19]="Paragraph",n[n.CommentBlock=20]="CommentBlock",
n[n.ProcessingInstructionBlock=21]="ProcessingInstructionBlock",n[n.Escape=22]="Escape",n[n.Entity=23]="Entity",n[n.HardBreak=
24]="HardBreak",n[n.Emphasis=25]="Emphasis",n[n.StrongEmphasis=26]="StrongEmphasis",n[n.Link=27]="Link",n[n.Image=28]="I\
mage",n[n.InlineCode=29]="InlineCode",n[n.HTMLTag=30]="HTMLTag",n[n.Comment=31]="Comment",n[n.ProcessingInstruction=32]=
"ProcessingInstruction",n[n.Autolink=33]="Autolink",n[n.HeaderMark=34]="HeaderMark",n[n.QuoteMark=35]="QuoteMark",n[n.ListMark=
36]="ListMark",n[n.LinkMark=37]="LinkMark",n[n.EmphasisMark=38]="EmphasisMark",n[n.CodeMark=39]="CodeMark",n[n.CodeText=
40]="CodeText",n[n.CodeInfo=41]="CodeInfo",n[n.LinkTitle=42]="LinkTitle",n[n.LinkLabel=43]="LinkLabel",n[n.URL=44]="URL"})(
M||(M={}));var Hr=class{constructor(t,e){this.start=t,this.content=e,this.marks=[],this.parsers=[]}},Fr=class{constructor(){
this.text="",this.baseIndent=0,this.basePos=0,this.depth=0,this.markers=[],this.pos=0,this.indent=0,this.next=-1}forward(){
this.basePos>this.pos&&this.forwardInner()}forwardInner(){let t=this.skipSpace(this.basePos);this.indent=this.countIndent(
t,this.pos,this.indent),this.pos=t,this.next=t==this.text.length?-1:this.text.charCodeAt(t)}skipSpace(t){return Fi(this.
text,t)}reset(t){for(this.text=t,this.baseIndent=this.basePos=this.pos=this.indent=0,this.forwardInner(),this.depth=1;this.
markers.length;)this.markers.pop()}moveBase(t){this.basePos=t,this.baseIndent=this.countIndent(t,this.pos,this.indent)}moveBaseColumn(t){
this.baseIndent=t,this.basePos=this.findColumn(t)}addMarker(t){this.markers.push(t)}countIndent(t,e=0,i=0){for(let s=e;s<
t;s++)i+=this.text.charCodeAt(s)==9?4-i%4:1;return i}findColumn(t){let e=0;for(let i=0;e<this.text.length&&i<t;e++)i+=this.
text.charCodeAt(e)==9?4-i%4:1;return e}scrub(){if(!this.baseIndent)return this.text;let t="";for(let e=0;e<this.basePos;e++)
t+=" ";return t+this.text.slice(this.basePos)}};function yh(n,t,e){if(e.pos==e.text.length||n!=t.block&&e.indent>=t.stack[e.
depth+1].value+e.baseIndent)return!0;if(e.indent>=e.baseIndent+4)return!1;let i=(n.type==M.OrderedList?Zr:Qr)(e,t,!1);return i>
0&&(n.type!=M.BulletList||Yr(e,t,!1)<0)&&e.text.charCodeAt(e.pos+i-1)==n.value}var Th={[M.Blockquote](n,t,e){return e.next!=
62?!1:(e.markers.push(F(M.QuoteMark,t.lineStart+e.pos,t.lineStart+e.pos+1)),e.moveBase(e.pos+(Dt(e.text.charCodeAt(e.pos+
1))?2:1)),n.end=t.lineStart+e.text.length,!0)},[M.ListItem](n,t,e){return e.indent<e.baseIndent+n.value&&e.next>-1?!1:(e.
moveBaseColumn(e.baseIndent+n.value),!0)},[M.OrderedList]:yh,[M.BulletList]:yh,[M.Document](){return!0}};function Dt(n){
return n==32||n==9||n==10||n==13}function Fi(n,t=0){for(;t<n.length&&Dt(n.charCodeAt(t));)t++;return t}function kh(n,t,e){
for(;t>e&&Dt(n.charCodeAt(t-1));)t--;return t}function Eh(n){if(n.next!=96&&n.next!=126)return-1;let t=n.pos+1;for(;t<n.
text.length&&n.text.charCodeAt(t)==n.next;)t++;if(t<n.pos+3)return-1;if(n.next==96){for(let e=t;e<n.text.length;e++)if(n.
text.charCodeAt(e)==96)return-1}return t}function Bh(n){return n.next!=62?-1:n.text.charCodeAt(n.pos+1)==32?2:1}function Yr(n,t,e){
if(n.next!=42&&n.next!=45&&n.next!=95)return-1;let i=1;for(let s=n.pos+1;s<n.text.length;s++){let r=n.text.charCodeAt(s);
if(r==n.next)i++;else if(!Dt(r))return-1}return e&&n.next==45&&Rh(n)>-1&&n.depth==t.stack.length&&t.parser.leafBlockParsers.
indexOf(Fh.SetextHeading)>-1||i<3?-1:1}function Oh(n,t){for(let e=n.stack.length-1;e>=0;e--)if(n.stack[e].type==t)return!0;
return!1}function Qr(n,t,e){return(n.next==45||n.next==43||n.next==42)&&(n.pos==n.text.length-1||Dt(n.text.charCodeAt(n.
pos+1)))&&(!e||Oh(t,M.BulletList)||n.skipSpace(n.pos+2)<n.text.length)?1:-1}function Zr(n,t,e){let i=n.pos,s=n.next;for(;s>=
48&&s<=57;){i++;if(i==n.text.length)return-1;s=n.text.charCodeAt(i)}return i==n.pos||i>n.pos+9||s!=46&&s!=41||i<n.text.length-
1&&!Dt(n.text.charCodeAt(i+1))||e&&!Oh(t,M.OrderedList)&&(n.skipSpace(i+1)==n.text.length||i>n.pos+1||n.next!=49)?-1:i+1-
n.pos}function Ph(n){if(n.next!=35)return-1;let t=n.pos+1;for(;t<n.text.length&&n.text.charCodeAt(t)==35;)t++;if(t<n.text.
length&&n.text.charCodeAt(t)!=32)return-1;let e=t-n.pos;return e>6?-1:e}function Rh(n){if(n.next!=45&&n.next!=61||n.indent>=
n.baseIndent+4)return-1;let t=n.pos+1;for(;t<n.text.length&&n.text.charCodeAt(t)==n.next;)t++;let e=t;for(;t<n.text.length&&
Dt(n.text.charCodeAt(t));)t++;return t==n.text.length?e:-1}var Vr=/^[ \t]*$/,Ih=/-->/,Nh=/\?>/,zr=[[/^<(?:script|pre|style)(?:\s|>|$)/i,
/<\/(?:script|pre|style)>/i],[/^\s*<!--/,Ih],[/^\s*<\?/,Nh],[/^\s*<![A-Z]/,/>/],[/^\s*<!\[CDATA\[/,/\]\]>/],[/^\s*<\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>|$)/i,
Vr],[/^\s*(?:<\/[a-z][\w-]*\s*>|<[a-z][\w-]*(\s+[a-z:_][\w-.]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*>)\s*$/i,
Vr]];function Hh(n,t,e){if(n.next!=60)return-1;let i=n.text.slice(n.pos);for(let s=0,r=zr.length-(e?1:0);s<r;s++)if(zr[s][0].
test(i))return s;return-1}function wh(n,t){let e=n.countIndent(t,n.pos,n.indent),i=n.countIndent(n.skipSpace(t),t,e);return i>=
e+5?e+1:i}function Le(n,t,e){let i=n.length-1;i>=0&&n[i].to==t&&n[i].type==M.CodeText?n[i].to=e:n.push(F(M.CodeText,t,e))}
var qn={LinkReference:void 0,IndentedCode(n,t){let e=t.baseIndent+4;if(t.indent<e)return!1;let i=t.findColumn(e),s=n.lineStart+
i,r=n.lineStart+t.text.length,o=[],l=[];for(Le(o,s,r);n.nextLine()&&t.depth>=n.stack.length;)if(t.pos==t.text.length){Le(
l,n.lineStart-1,n.lineStart);for(let a of t.markers)l.push(a)}else{if(t.indent<e)break;{if(l.length){for(let h of l)h.type==
M.CodeText?Le(o,h.from,h.to):o.push(h);l=[]}Le(o,n.lineStart-1,n.lineStart);for(let h of t.markers)o.push(h);r=n.lineStart+
t.text.length;let a=n.lineStart+t.findColumn(t.baseIndent+4);a<r&&Le(o,a,r)}}return l.length&&(l=l.filter(a=>a.type!=M.CodeText),
l.length&&(t.markers=l.concat(t.markers))),n.addNode(n.buffer.writeElements(o,-s).finish(M.CodeBlock,r-s),s),!0},FencedCode(n,t){
let e=Eh(t);if(e<0)return!1;let i=n.lineStart+t.pos,s=t.next,r=e-t.pos,o=t.skipSpace(e),l=kh(t.text,t.text.length,o),a=[
F(M.CodeMark,i,i+r)];o<l&&a.push(F(M.CodeInfo,n.lineStart+o,n.lineStart+l));for(let h=!0;n.nextLine()&&t.depth>=n.stack.
length;h=!1){let f=t.pos;if(t.indent-t.baseIndent<4)for(;f<t.text.length&&t.text.charCodeAt(f)==s;)f++;if(f-t.pos>=r&&t.
skipSpace(f)==t.text.length){for(let c of t.markers)a.push(c);a.push(F(M.CodeMark,n.lineStart+t.pos,n.lineStart+f)),n.nextLine();
break}else{h||Le(a,n.lineStart-1,n.lineStart);for(let d of t.markers)a.push(d);let c=n.lineStart+t.basePos,u=n.lineStart+
t.text.length;c<u&&Le(a,c,u)}}return n.addNode(n.buffer.writeElements(a,-i).finish(M.FencedCode,n.prevLineEnd()-i),i),!0},
Blockquote(n,t){let e=Bh(t);return e<0?!1:(n.startContext(M.Blockquote,t.pos),n.addNode(M.QuoteMark,n.lineStart+t.pos,n.
lineStart+t.pos+1),t.moveBase(t.pos+e),null)},HorizontalRule(n,t){if(Yr(t,n,!1)<0)return!1;let e=n.lineStart+t.pos;return n.
nextLine(),n.addNode(M.HorizontalRule,e),!0},BulletList(n,t){let e=Qr(t,n,!1);if(e<0)return!1;n.block.type!=M.BulletList&&
n.startContext(M.BulletList,t.basePos,t.next);let i=wh(t,t.pos+1);return n.startContext(M.ListItem,t.basePos,i-t.baseIndent),
n.addNode(M.ListMark,n.lineStart+t.pos,n.lineStart+t.pos+e),t.moveBaseColumn(i),null},OrderedList(n,t){let e=Zr(t,n,!1);
if(e<0)return!1;n.block.type!=M.OrderedList&&n.startContext(M.OrderedList,t.basePos,t.text.charCodeAt(t.pos+e-1));let i=wh(
t,t.pos+e);return n.startContext(M.ListItem,t.basePos,i-t.baseIndent),n.addNode(M.ListMark,n.lineStart+t.pos,n.lineStart+
t.pos+e),t.moveBaseColumn(i),null},ATXHeading(n,t){let e=Ph(t);if(e<0)return!1;let i=t.pos,s=n.lineStart+i,r=kh(t.text,t.
text.length,i),o=r;for(;o>i&&t.text.charCodeAt(o-1)==t.next;)o--;(o==r||o==i||!Dt(t.text.charCodeAt(o-1)))&&(o=t.text.length);
let l=n.buffer.write(M.HeaderMark,0,e).writeElements(n.parser.parseInline(t.text.slice(i+e+1,o),s+e+1),-s);o<t.text.length&&
l.write(M.HeaderMark,o-i,r-i);let a=l.finish(M.ATXHeading1-1+e,t.text.length-i);return n.nextLine(),n.addNode(a,s),!0},HTMLBlock(n,t){
let e=Hh(t,n,!1);if(e<0)return!1;let i=n.lineStart+t.pos,s=zr[e][1],r=[],o=s!=Vr;for(;!s.test(t.text)&&n.nextLine();){if(t.
depth<n.stack.length){o=!1;break}for(let h of t.markers)r.push(h)}o&&n.nextLine();let l=s==Ih?M.CommentBlock:s==Nh?M.ProcessingInstructionBlock:
M.HTMLBlock,a=n.prevLineEnd();return n.addNode(n.buffer.writeElements(r,-i).finish(l,a-i),i),!0},SetextHeading:void 0},Wr=class{constructor(t){
this.stage=0,this.elts=[],this.pos=0,this.start=t.start,this.advance(t.content)}nextLine(t,e,i){if(this.stage==-1)return!1;
let s=i.content+`
`+e.scrub(),r=this.advance(s);return r>-1&&r<s.length?this.complete(t,i,r):!1}finish(t,e){return(this.stage==2||this.stage==
3)&&Fi(e.content,this.pos)==e.content.length?this.complete(t,e,e.content.length):!1}complete(t,e,i){return t.addLeafElement(
e,F(M.LinkReference,this.start,this.start+i,this.elts)),!0}nextStage(t){return t?(this.pos=t.to-this.start,this.elts.push(
t),this.stage++,!0):(t===!1&&(this.stage=-1),!1)}advance(t){for(;;){if(this.stage==-1)return-1;if(this.stage==0){if(!this.
nextStage(jh(t,this.pos,this.start,!0)))return-1;if(t.charCodeAt(this.pos)!=58)return this.stage=-1;this.elts.push(F(M.LinkMark,
this.pos+this.start,this.pos+this.start+1)),this.pos++}else if(this.stage==1){if(!this.nextStage(Kh(t,Fi(t,this.pos),this.
start)))return-1}else if(this.stage==2){let e=Fi(t,this.pos),i=0;if(e>this.pos){let s=$h(t,e,this.start);if(s){let r=Ir(
t,s.to-this.start);r>0&&(this.nextStage(s),i=r)}}return i||(i=Ir(t,this.pos)),i>0&&i<t.length?i:-1}else return Ir(t,this.
pos)}}};function Ir(n,t){for(;t<n.length;t++){let e=n.charCodeAt(t);if(e==10)break;if(!Dt(e))return-1}return t}var qr=class{nextLine(t,e,i){
let s=e.depth<t.stack.length?-1:Rh(e),r=e.next;if(s<0)return!1;let o=F(M.HeaderMark,t.lineStart+e.pos,t.lineStart+s);return t.
nextLine(),t.addLeafElement(i,F(r==61?M.SetextHeading1:M.SetextHeading2,i.start,t.prevLineEnd(),[...t.parser.parseInline(
i.content,i.start),o])),!0}finish(){return!1}},Fh={LinkReference(n,t){return t.content.charCodeAt(0)==91?new Wr(t):null},
SetextHeading(){return new qr}},Bd=[(n,t)=>Ph(t)>=0,(n,t)=>Eh(t)>=0,(n,t)=>Bh(t)>=0,(n,t)=>Qr(t,n,!0)>=0,(n,t)=>Zr(t,n,!0)>=
0,(n,t)=>Yr(t,n,!0)>=0,(n,t)=>Hh(t,n,!0)>=0],Od={text:"",end:0},Kr=class{constructor(t,e,i,s){this.parser=t,this.input=e,
this.ranges=s,this.line=new Fr,this.atEnd=!1,this.reusePlaceholders=new Map,this.stoppedAt=null,this.rangeI=0,this.to=s[s.
length-1].to,this.lineStart=this.absoluteLineStart=this.absoluteLineEnd=s[0].from,this.block=$n.create(M.Document,0,this.
lineStart,0,0),this.stack=[this.block],this.fragments=i.length?new Xr(i,e):null,this.readLine()}get parsedPos(){return this.
absoluteLineStart}advance(){if(this.stoppedAt!=null&&this.absoluteLineStart>this.stoppedAt)return this.finish();let{line:t}=this;
for(;;){for(let i=0;;){let s=t.depth<this.stack.length?this.stack[this.stack.length-1]:null;for(;i<t.markers.length&&(!s||
t.markers[i].from<s.end);){let r=t.markers[i++];this.addNode(r.type,r.from,r.to)}if(!s)break;this.finishContext()}if(t.pos<
t.text.length)break;if(!this.nextLine())return this.finish()}if(this.fragments&&this.reuseFragment(t.basePos))return null;
t:for(;;){for(let i of this.parser.blockParsers)if(i){let s=i(this,t);if(s!=!1){if(s==!0)return null;t.forward();continue t}}
break}let e=new Hr(this.lineStart+t.pos,t.text.slice(t.pos));for(let i of this.parser.leafBlockParsers)if(i){let s=i(this,
e);s&&e.parsers.push(s)}t:for(;this.nextLine()&&t.pos!=t.text.length;){if(t.indent<t.baseIndent+4){for(let i of this.parser.
endLeafBlock)if(i(this,t,e))break t}for(let i of e.parsers)if(i.nextLine(this,t,e))return null;e.content+=`
`+t.scrub();for(let i of t.markers)e.marks.push(i)}return this.finishLeaf(e),null}stopAt(t){if(this.stoppedAt!=null&&this.
stoppedAt<t)throw new RangeError("Can't move stoppedAt forward");this.stoppedAt=t}reuseFragment(t){if(!this.fragments.moveTo(
this.absoluteLineStart+t,this.absoluteLineStart)||!this.fragments.matches(this.block.hash))return!1;let e=this.fragments.
takeNodes(this);return e?(this.absoluteLineStart+=e,this.lineStart=Uh(this.absoluteLineStart,this.ranges),this.moveRangeI(),
this.absoluteLineStart<this.to?(this.lineStart++,this.absoluteLineStart++,this.readLine()):(this.atEnd=!0,this.readLine()),
!0):!1}get depth(){return this.stack.length}parentType(t=this.depth-1){return this.parser.nodeSet.types[this.stack[t].type]}nextLine(){
return this.lineStart+=this.line.text.length,this.absoluteLineEnd>=this.to?(this.absoluteLineStart=this.absoluteLineEnd,
this.atEnd=!0,this.readLine(),!1):(this.lineStart++,this.absoluteLineStart=this.absoluteLineEnd+1,this.moveRangeI(),this.
readLine(),!0)}peekLine(){return this.scanLine(this.absoluteLineEnd+1).text}moveRangeI(){for(;this.rangeI<this.ranges.length-
1&&this.absoluteLineStart>=this.ranges[this.rangeI].to;)this.rangeI++,this.absoluteLineStart=Math.max(this.absoluteLineStart,
this.ranges[this.rangeI].from)}scanLine(t){let e=Od;if(e.end=t,t>=this.to)e.text="";else if(e.text=this.lineChunkAt(t),e.
end+=e.text.length,this.ranges.length>1){let i=this.absoluteLineStart,s=this.rangeI;for(;this.ranges[s].to<e.end;){s++;let r=this.
ranges[s].from,o=this.lineChunkAt(r);e.end=r+o.length,e.text=e.text.slice(0,this.ranges[s-1].to-i)+o,i=e.end-e.text.length}}
return e}readLine(){let{line:t}=this,{text:e,end:i}=this.scanLine(this.absoluteLineStart);for(this.absoluteLineEnd=i,t.reset(
e);t.depth<this.stack.length;t.depth++){let s=this.stack[t.depth],r=this.parser.skipContextMarkup[s.type];if(!r)throw new Error(
"Unhandled block context "+M[s.type]);if(!r(s,this,t))break;t.forward()}}lineChunkAt(t){let e=this.input.chunk(t),i;if(this.
input.lineChunks)i=e==`
`?"":e;else{let s=e.indexOf(`
`);i=s<0?e:e.slice(0,s)}return t+i.length>this.to?i.slice(0,this.to-t):i}prevLineEnd(){return this.atEnd?this.lineStart:
this.lineStart-1}startContext(t,e,i=0){this.block=$n.create(t,i,this.lineStart+e,this.block.hash,this.lineStart+this.line.
text.length),this.stack.push(this.block)}startComposite(t,e,i=0){this.startContext(this.parser.getNodeType(t),e,i)}addNode(t,e,i){
typeof t=="number"&&(t=new G(this.parser.nodeSet.types[t],Xe,Xe,(i??this.prevLineEnd())-e)),this.block.addChild(t,e-this.
block.from)}addElement(t){this.block.addChild(t.toTree(this.parser.nodeSet),t.from-this.block.from)}addLeafElement(t,e){
this.addNode(this.buffer.writeElements(Gr(e.children,t.marks),-e.from).finish(e.type,e.to-e.from),e.from)}finishContext(){
let t=this.stack.pop(),e=this.stack[this.stack.length-1];e.addChild(t.toTree(this.parser.nodeSet),t.from-e.from),this.block=
e}finish(){for(;this.stack.length>1;)this.finishContext();return this.addGaps(this.block.toTree(this.parser.nodeSet,this.
lineStart))}addGaps(t){return this.ranges.length>1?Vh(this.ranges,0,t.topNode,this.ranges[0].from,this.reusePlaceholders):
t}finishLeaf(t){for(let i of t.parsers)if(i.finish(this,t))return;let e=Gr(this.parser.parseInline(t.content,t.start),t.
marks);this.addNode(this.buffer.writeElements(e,-t.start).finish(M.Paragraph,t.content.length),t.start)}elt(t,e,i,s){return typeof t==
"string"?F(this.parser.getNodeType(t),e,i,s):new Un(t,e)}get buffer(){return new jn(this.parser.nodeSet)}};function Vh(n,t,e,i,s){
let r=n[t].to,o=[],l=[],a=e.from+i;function h(f,c){for(;c?f>=r:f>r;){let u=n[t+1].from-r;i+=u,f+=u,t++,r=n[t].to}}for(let f=e.
firstChild;f;f=f.nextSibling){h(f.from+i,!0);let c=f.from+i,u,d=s.get(f.tree);d?u=d:f.to+i>r?(u=Vh(n,t,f,i,s),h(f.to+i,!1)):
u=f.toTree(),o.push(u),l.push(c-a)}return h(e.to+i,!1),new G(e.type,o,l,e.to+i-a,e.tree?e.tree.propValues:void 0)}var $r=class n extends $e{constructor(t,e,i,s,r,o,l,a,h){
super(),this.nodeSet=t,this.blockParsers=e,this.leafBlockParsers=i,this.blockNames=s,this.endLeafBlock=r,this.skipContextMarkup=
o,this.inlineParsers=l,this.inlineNames=a,this.wrappers=h,this.nodeTypes=Object.create(null);for(let f of t.types)this.nodeTypes[f.
name]=f.id}createParse(t,e,i){let s=new Kr(this,t,e,i);for(let r of this.wrappers)s=r(s,t,e,i);return s}configure(t){let e=jr(
t);if(!e)return this;let{nodeSet:i,skipContextMarkup:s}=this,r=this.blockParsers.slice(),o=this.leafBlockParsers.slice(),
l=this.blockNames.slice(),a=this.inlineParsers.slice(),h=this.inlineNames.slice(),f=this.endLeafBlock.slice(),c=this.wrappers;
if(Hi(e.defineNodes)){s=Object.assign({},s);let u=i.types.slice(),d;for(let p of e.defineNodes){let{name:m,block:g,composite:y,
style:v}=typeof p=="string"?{name:p}:p;if(u.some(b=>b.name==m))continue;y&&(s[u.length]=(b,w,S)=>y(w,S,b.value));let A=u.
length,k=y?["Block","BlockContext"]:g?A>=M.ATXHeading1&&A<=M.SetextHeading2?["Block","LeafBlock","Heading"]:["Block","Le\
afBlock"]:void 0;u.push(tt.define({id:A,name:m,props:k&&[[O.group,k]]})),v&&(d||(d={}),Array.isArray(v)||v instanceof bt?
d[m]=v:Object.assign(d,v))}i=new Ke(u),d&&(i=i.extend(Li(d)))}if(Hi(e.props)&&(i=i.extend(...e.props)),Hi(e.remove))for(let u of e.
remove){let d=this.blockNames.indexOf(u),p=this.inlineNames.indexOf(u);d>-1&&(r[d]=o[d]=void 0),p>-1&&(a[p]=void 0)}if(Hi(
e.parseBlock))for(let u of e.parseBlock){let d=l.indexOf(u.name);if(d>-1)r[d]=u.parse,o[d]=u.leaf;else{let p=u.before?Kn(
l,u.before):u.after?Kn(l,u.after)+1:l.length-1;r.splice(p,0,u.parse),o.splice(p,0,u.leaf),l.splice(p,0,u.name)}u.endLeaf&&
f.push(u.endLeaf)}if(Hi(e.parseInline))for(let u of e.parseInline){let d=h.indexOf(u.name);if(d>-1)a[d]=u.parse;else{let p=u.
before?Kn(h,u.before):u.after?Kn(h,u.after)+1:h.length-1;a.splice(p,0,u.parse),h.splice(p,0,u.name)}}return e.wrap&&(c=c.
concat(e.wrap)),new n(i,r,o,l,f,s,a,h,c)}getNodeType(t){let e=this.nodeTypes[t];if(e==null)throw new RangeError(`Unknown\
 node type '${t}'`);return e}parseInline(t,e){let i=new _r(this,t,e);t:for(let s=e;s<i.end;){let r=i.char(s);for(let o of this.
inlineParsers)if(o){let l=o(i,r,s);if(l>=0){s=l;continue t}}s++}return i.resolveMarkers(0)}};function Hi(n){return n!=null&&
n.length>0}function jr(n){if(!Array.isArray(n))return n;if(n.length==0)return null;let t=jr(n[0]);if(n.length==1)return t;
let e=jr(n.slice(1));if(!e||!t)return t||e;let i=(o,l)=>(o||Xe).concat(l||Xe),s=t.wrap,r=e.wrap;return{props:i(t.props,e.
props),defineNodes:i(t.defineNodes,e.defineNodes),parseBlock:i(t.parseBlock,e.parseBlock),parseInline:i(t.parseInline,e.
parseInline),remove:i(t.remove,e.remove),wrap:s?r?(o,l,a,h)=>s(r(o,l,a,h),l,a,h):s:r}}function Kn(n,t){let e=n.indexOf(t);
if(e<0)throw new RangeError(`Position specified relative to unknown parser ${t}`);return e}var zh=[tt.none];for(let n=1,
t;t=M[n];n++)zh[n]=tt.define({id:n,name:t,props:n>=M.Escape?[]:[[O.group,n in Th?["Block","BlockContext"]:["Block","Leaf\
Block"]]],top:t=="Document"});var Xe=[],jn=class{constructor(t){this.nodeSet=t,this.content=[],this.nodes=[]}write(t,e,i,s=0){
return this.content.push(t,e,i,4+s*4),this}writeElements(t,e=0){for(let i of t)i.writeTo(this,e);return this}finish(t,e){
return G.build({buffer:this.content,nodeSet:this.nodeSet,reused:this.nodes,topID:t,length:e})}},Te=class{constructor(t,e,i,s=Xe){
this.type=t,this.from=e,this.to=i,this.children=s}writeTo(t,e){let i=t.content.length;t.writeElements(this.children,e),t.
content.push(this.type,this.from+e,this.to+e,t.content.length+4-i)}toTree(t){return new jn(t).writeElements(this.children,
-this.from).finish(this.type,this.to-this.from)}},Un=class{constructor(t,e){this.tree=t,this.from=e}get to(){return this.
from+this.tree.length}get type(){return this.tree.type.id}get children(){return Xe}writeTo(t,e){t.nodes.push(this.tree),
t.content.push(t.nodes.length-1,this.from+e,this.to+e,-1)}toTree(){return this.tree}};function F(n,t,e,i){return new Te(
n,t,e,i)}var Wh={resolve:"Emphasis",mark:"EmphasisMark"},qh={resolve:"Emphasis",mark:"EmphasisMark"},Ge={},Ur={},ut=class{constructor(t,e,i,s){
this.type=t,this.from=e,this.to=i,this.side=s}},xh="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",zi=/[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\u2010-\u2027]/;
try{zi=new RegExp("[\\p{S}|\\p{P}]","u")}catch{}var Nr={Escape(n,t,e){if(t!=92||e==n.end-1)return-1;let i=n.char(e+1);for(let s=0;s<
xh.length;s++)if(xh.charCodeAt(s)==i)return n.append(F(M.Escape,e,e+2));return-1},Entity(n,t,e){if(t!=38)return-1;let i=/^(?:#\d+|#x[a-f\d]+|\w+);/i.
exec(n.slice(e+1,e+31));return i?n.append(F(M.Entity,e,e+1+i[0].length)):-1},InlineCode(n,t,e){if(t!=96||e&&n.char(e-1)==
96)return-1;let i=e+1;for(;i<n.end&&n.char(i)==96;)i++;let s=i-e,r=0;for(;i<n.end;i++)if(n.char(i)==96){if(r++,r==s&&n.char(
i+1)!=96)return n.append(F(M.InlineCode,e,i+1,[F(M.CodeMark,e,e+s),F(M.CodeMark,i+1-s,i+1)]))}else r=0;return-1},HTMLTag(n,t,e){
if(t!=60||e==n.end-1)return-1;let i=n.slice(e+1,n.end),s=/^(?:[a-z][-\w+.]+:[^\s>]+|[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*)>/i.
exec(i);if(s)return n.append(F(M.Autolink,e,e+1+s[0].length,[F(M.LinkMark,e,e+1),F(M.URL,e+1,e+s[0].length),F(M.LinkMark,
e+s[0].length,e+1+s[0].length)]));let r=/^!--[^>](?:-[^-]|[^-])*?-->/i.exec(i);if(r)return n.append(F(M.Comment,e,e+1+r[0].
length));let o=/^\?[^]*?\?>/.exec(i);if(o)return n.append(F(M.ProcessingInstruction,e,e+1+o[0].length));let l=/^(?:![A-Z][^]*?>|!\[CDATA\[[^]*?\]\]>|\/\s*[a-zA-Z][\w-]*\s*>|\s*[a-zA-Z][\w-]*(\s+[a-zA-Z:_][\w-.:]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*(\/\s*)?>)/.
exec(i);return l?n.append(F(M.HTMLTag,e,e+1+l[0].length)):-1},Emphasis(n,t,e){if(t!=95&&t!=42)return-1;let i=e+1;for(;n.
char(i)==t;)i++;let s=n.slice(e-1,e),r=n.slice(i,i+1),o=zi.test(s),l=zi.test(r),a=/\s|^$/.test(s),h=/\s|^$/.test(r),f=!h&&
(!l||a||o),c=!a&&(!o||h||l),u=f&&(t==42||!c||o),d=c&&(t==42||!f||l);return n.append(new ut(t==95?Wh:qh,e,i,(u?1:0)|(d?2:
0)))},HardBreak(n,t,e){if(t==92&&n.char(e+1)==10)return n.append(F(M.HardBreak,e,e+2));if(t==32){let i=e+1;for(;n.char(i)==
32;)i++;if(n.char(i)==10&&i>=e+2)return n.append(F(M.HardBreak,e,i+1))}return-1},Link(n,t,e){return t==91?n.append(new ut(
Ge,e,e+1,1)):-1},Image(n,t,e){return t==33&&n.char(e+1)==91?n.append(new ut(Ur,e,e+2,1)):-1},LinkEnd(n,t,e){if(t!=93)return-1;
for(let i=n.parts.length-1;i>=0;i--){let s=n.parts[i];if(s instanceof ut&&(s.type==Ge||s.type==Ur)){if(!s.side||n.skipSpace(
s.to)==e&&!/[(\[]/.test(n.slice(e+1,e+2)))return n.parts[i]=null,-1;let r=n.takeContent(i),o=n.parts[i]=Pd(n,r,s.type==Ge?
M.Link:M.Image,s.from,e+1);if(s.type==Ge)for(let l=0;l<i;l++){let a=n.parts[l];a instanceof ut&&a.type==Ge&&(a.side=0)}return o.
to}}return-1}};function Pd(n,t,e,i,s){let{text:r}=n,o=n.char(s),l=s;if(t.unshift(F(M.LinkMark,i,i+(e==M.Image?2:1))),t.push(
F(M.LinkMark,s-1,s)),o==40){let a=n.skipSpace(s+1),h=Kh(r,a-n.offset,n.offset),f;h&&(a=n.skipSpace(h.to),a!=h.to&&(f=$h(
r,a-n.offset,n.offset),f&&(a=n.skipSpace(f.to)))),n.char(a)==41&&(t.push(F(M.LinkMark,s,s+1)),l=a+1,h&&t.push(h),f&&t.push(
f),t.push(F(M.LinkMark,a,l)))}else if(o==91){let a=jh(r,s-n.offset,n.offset,!1);a&&(t.push(a),l=a.to)}return F(e,i,l,t)}
function Kh(n,t,e){if(n.charCodeAt(t)==60){for(let s=t+1;s<n.length;s++){let r=n.charCodeAt(s);if(r==62)return F(M.URL,t+
e,s+1+e);if(r==60||r==10)return!1}return null}else{let s=0,r=t;for(let o=!1;r<n.length;r++){let l=n.charCodeAt(r);if(Dt(
l))break;if(o)o=!1;else if(l==40)s++;else if(l==41){if(!s)break;s--}else l==92&&(o=!0)}return r>t?F(M.URL,t+e,r+e):r==n.
length?null:!1}}function $h(n,t,e){let i=n.charCodeAt(t);if(i!=39&&i!=34&&i!=40)return!1;let s=i==40?41:i;for(let r=t+1,
o=!1;r<n.length;r++){let l=n.charCodeAt(r);if(o)o=!1;else{if(l==s)return F(M.LinkTitle,t+e,r+1+e);l==92&&(o=!0)}}return null}
function jh(n,t,e,i){for(let s=!1,r=t+1,o=Math.min(n.length,r+999);r<o;r++){let l=n.charCodeAt(r);if(s)s=!1;else{if(l==93)
return i?!1:F(M.LinkLabel,t+e,r+1+e);if(i&&!Dt(l)&&(i=!1),l==91)return!1;l==92&&(s=!0)}}return null}var _r=class{constructor(t,e,i){
this.parser=t,this.text=e,this.offset=i,this.parts=[]}char(t){return t>=this.end?-1:this.text.charCodeAt(t-this.offset)}get end(){
return this.offset+this.text.length}slice(t,e){return this.text.slice(t-this.offset,e-this.offset)}append(t){return this.
parts.push(t),t.to}addDelimiter(t,e,i,s,r){return this.append(new ut(t,e,i,(s?1:0)|(r?2:0)))}get hasOpenLink(){for(let t=this.
parts.length-1;t>=0;t--){let e=this.parts[t];if(e instanceof ut&&(e.type==Ge||e.type==Ur))return!0}return!1}addElement(t){
return this.append(t)}resolveMarkers(t){for(let i=t;i<this.parts.length;i++){let s=this.parts[i];if(!(s instanceof ut&&s.
type.resolve&&s.side&2))continue;let r=s.type==Wh||s.type==qh,o=s.to-s.from,l,a=i-1;for(;a>=t;a--){let m=this.parts[a];if(m instanceof
ut&&m.side&1&&m.type==s.type&&!(r&&(s.side&1||m.side&2)&&(m.to-m.from+o)%3==0&&((m.to-m.from)%3||o%3))){l=m;break}}if(!l)
continue;let h=s.type.resolve,f=[],c=l.from,u=s.to;if(r){let m=Math.min(2,l.to-l.from,o);c=l.to-m,u=s.from+m,h=m==1?"Emp\
hasis":"StrongEmphasis"}l.type.mark&&f.push(this.elt(l.type.mark,c,l.to));for(let m=a+1;m<i;m++)this.parts[m]instanceof Te&&
f.push(this.parts[m]),this.parts[m]=null;s.type.mark&&f.push(this.elt(s.type.mark,s.from,u));let d=this.elt(h,c,u,f);this.
parts[a]=r&&l.from!=c?new ut(l.type,l.from,c,l.side):null,(this.parts[i]=r&&s.to!=u?new ut(s.type,u,s.to,s.side):null)?this.
parts.splice(i,0,d):this.parts[i]=d}let e=[];for(let i=t;i<this.parts.length;i++){let s=this.parts[i];s instanceof Te&&e.
push(s)}return e}findOpeningDelimiter(t){for(let e=this.parts.length-1;e>=0;e--){let i=this.parts[e];if(i instanceof ut&&
i.type==t)return e}return null}takeContent(t){let e=this.resolveMarkers(t);return this.parts.length=t,e}skipSpace(t){return Fi(
this.text,t-this.offset)+this.offset}elt(t,e,i,s){return typeof t=="string"?F(this.parser.getNodeType(t),e,i,s):new Un(t,
e)}};function Gr(n,t){if(!t.length)return n;if(!n.length)return t;let e=n.slice(),i=0;for(let s of t){for(;i<e.length&&e[i].
to<s.to;)i++;if(i<e.length&&e[i].from<s.from){let r=e[i];r instanceof Te&&(e[i]=new Te(r.type,r.from,r.to,Gr(r.children,
[s])))}else e.splice(i++,0,s)}return e}var Rd=[M.CodeBlock,M.ListItem,M.OrderedList,M.BulletList],Xr=class{constructor(t,e){
this.fragments=t,this.input=e,this.i=0,this.fragment=null,this.fragmentEnd=-1,this.cursor=null,t.length&&(this.fragment=
t[this.i++])}nextFragment(){this.fragment=this.i<this.fragments.length?this.fragments[this.i++]:null,this.cursor=null,this.
fragmentEnd=-1}moveTo(t,e){for(;this.fragment&&this.fragment.to<=t;)this.nextFragment();if(!this.fragment||this.fragment.
from>(t?t-1:0))return!1;if(this.fragmentEnd<0){let r=this.fragment.to;for(;r>0&&this.input.read(r-1,r)!=`
`;)r--;this.fragmentEnd=r?r-1:0}let i=this.cursor;i||(i=this.cursor=this.fragment.tree.cursor(),i.firstChild());let s=t+
this.fragment.offset;for(;i.to<=s;)if(!i.parent())return!1;for(;;){if(i.from>=s)return this.fragment.from<=e;if(!i.childAfter(
s))return!1}}matches(t){let e=this.cursor.tree;return e&&e.prop(O.contextHash)==t}takeNodes(t){let e=this.cursor,i=this.
fragment.offset,s=this.fragmentEnd-(this.fragment.openEnd?1:0),r=t.absoluteLineStart,o=r,l=t.block.children.length,a=o,h=l;
for(;;){if(e.to-i>s){if(e.type.isAnonymous&&e.firstChild())continue;break}let f=Uh(e.from-i,t.ranges);if(e.to-i<=t.ranges[t.
rangeI].to)t.addNode(e.tree,f);else{let c=new G(t.parser.nodeSet.types[M.Paragraph],[],[],0,t.block.hashProp);t.reusePlaceholders.
set(c,e.tree),t.addNode(c,f)}if(e.type.is("Block")&&(Rd.indexOf(e.type.id)<0?(o=e.to-i,l=t.block.children.length):(o=a,l=
h,a=e.to-i,h=t.block.children.length)),!e.nextSibling())break}for(;t.block.children.length>l;)t.block.children.pop(),t.block.
positions.pop();return o-r}};function Uh(n,t){let e=n;for(let i=1;i<t.length;i++){let s=t[i-1].to,r=t[i].from;s<n&&(e-=r-
s)}return e}var Id=Li({"Blockquote/...":x.quote,HorizontalRule:x.contentSeparator,"ATXHeading1/... SetextHeading1/...":x.
heading1,"ATXHeading2/... SetextHeading2/...":x.heading2,"ATXHeading3/...":x.heading3,"ATXHeading4/...":x.heading4,"ATXH\
eading5/...":x.heading5,"ATXHeading6/...":x.heading6,"Comment CommentBlock":x.comment,Escape:x.escape,Entity:x.character,
"Emphasis/...":x.emphasis,"StrongEmphasis/...":x.strong,"Link/... Image/...":x.link,"OrderedList/... BulletList/...":x.list,
"BlockQuote/...":x.quote,"InlineCode CodeText":x.monospace,"URL Autolink":x.url,"HeaderMark HardBreak QuoteMark ListMark\
 LinkMark EmphasisMark CodeMark":x.processingInstruction,"CodeInfo LinkLabel":x.labelName,LinkTitle:x.string,Paragraph:x.
content}),_h=new $r(new Ke(zh).extend(Id),Object.keys(qn).map(n=>qn[n]),Object.keys(qn).map(n=>Fh[n]),Object.keys(qn),Bd,
Th,Object.keys(Nr).map(n=>Nr[n]),Object.keys(Nr),[]);var Nd={resolve:"Strikethrough",mark:"StrikethroughMark"},Hd={defineNodes:[{name:"Strikethrough",style:{"Strikethrough/.\
..":x.strikethrough}},{name:"StrikethroughMark",style:x.processingInstruction}],parseInline:[{name:"Strikethrough",parse(n,t,e){
if(t!=126||n.char(e+1)!=126||n.char(e+2)==126)return-1;let i=n.slice(e-1,e),s=n.slice(e+2,e+3),r=/\s|^$/.test(i),o=/\s|^$/.
test(s),l=zi.test(i),a=zi.test(s);return n.addDelimiter(Nd,e,e+2,!o&&(!a||r||l),!r&&(!l||o||a))},after:"Emphasis"}]};function Vi(n,t,e=0,i,s=0){
let r=0,o=!0,l=-1,a=-1,h=!1,f=()=>{i.push(n.elt("TableCell",s+l,s+a,n.parser.parseInline(t.slice(l,a),s+l)))};for(let c=e;c<
t.length;c++){let u=t.charCodeAt(c);u==124&&!h?((!o||l>-1)&&r++,o=!1,i&&(l>-1&&f(),i.push(n.elt("TableDelimiter",c+s,c+s+
1))),l=a=-1):(h||u!=32&&u!=9)&&(l<0&&(l=c),a=c+1),h=!h&&u==92}return l>-1&&(r++,i&&f()),r}function Sh(n,t){for(let e=t;e<
n.length;e++){let i=n.charCodeAt(e);if(i==124)return!0;i==92&&e++}return!1}var Gh=/^\|?(\s*:?-+:?\s*\|)+(\s*:?-+:?\s*)?$/,
_n=class{constructor(){this.rows=null}nextLine(t,e,i){if(this.rows==null){this.rows=!1;let s;if((e.next==45||e.next==58||
e.next==124)&&Gh.test(s=e.text.slice(e.pos))){let r=[];Vi(t,i.content,0,r,i.start)==Vi(t,s,e.pos)&&(this.rows=[t.elt("Ta\
bleHeader",i.start,i.start+i.content.length,r),t.elt("TableDelimiter",t.lineStart+e.pos,t.lineStart+e.text.length)])}}else if(this.
rows){let s=[];Vi(t,e.text,e.pos,s,t.lineStart),this.rows.push(t.elt("TableRow",t.lineStart+e.pos,t.lineStart+e.text.length,
s))}return!1}finish(t,e){return this.rows?(t.addLeafElement(e,t.elt("Table",e.start,e.start+e.content.length,this.rows)),
!0):!1}},Fd={defineNodes:[{name:"Table",block:!0},{name:"TableHeader",style:{"TableHeader/...":x.heading}},"TableRow",{name:"\
TableCell",style:x.content},{name:"TableDelimiter",style:x.processingInstruction}],parseBlock:[{name:"Table",leaf(n,t){return Sh(
t.content,0)?new _n:null},endLeaf(n,t,e){if(e.parsers.some(s=>s instanceof _n)||!Sh(t.text,t.basePos))return!1;let i=n.peekLine();
return Gh.test(i)&&Vi(n,t.text,t.basePos)==Vi(n,i,t.basePos)},before:"SetextHeading"}]},Jr=class{nextLine(){return!1}finish(t,e){
return t.addLeafElement(e,t.elt("Task",e.start,e.start+e.content.length,[t.elt("TaskMarker",e.start,e.start+3),...t.parser.
parseInline(e.content.slice(3),e.start+3)])),!0}},Vd={defineNodes:[{name:"Task",block:!0,style:x.list},{name:"TaskMarker",
style:x.atom}],parseBlock:[{name:"TaskList",leaf(n,t){return/^\[[ xX]\][ \t]/.test(t.content)&&n.parentType().name=="Lis\
tItem"?new Jr:null},after:"SetextHeading"}]},vh=/(www\.)|(https?:\/\/)|([\w.+-]{1,100}@)|(mailto:|xmpp:)/gy,Ch=/[\w-]+(\.[\w-]+)+(\/[^\s<]*)?/gy,
zd=/[\w-]+\.[\w-]+($|\/)/,Ah=/[\w.+-]+@[\w-]+(\.[\w.-]+)+/gy,Mh=/\/[a-zA-Z\d@.]+/gy;function Dh(n,t,e,i){let s=0;for(let r=t;r<
e;r++)n[r]==i&&s++;return s}function Wd(n,t){Ch.lastIndex=t;let e=Ch.exec(n);if(!e||zd.exec(e[0])[0].indexOf("_")>-1)return-1;
let i=t+e[0].length;for(;;){let s=n[i-1],r;if(/[?!.,:*_~]/.test(s)||s==")"&&Dh(n,t,i,")")>Dh(n,t,i,"("))i--;else if(s=="\
;"&&(r=/&(?:#\d+|#x[a-f\d]+|\w+);$/.exec(n.slice(t,i))))i=t+r.index;else break}return i}function Lh(n,t){Ah.lastIndex=t;
let e=Ah.exec(n);if(!e)return-1;let i=e[0][e[0].length-1];return i=="_"||i=="-"?-1:t+e[0].length-(i=="."?1:0)}var qd={parseInline:[
{name:"Autolink",parse(n,t,e){let i=e-n.offset;if(i&&/\w/.test(n.text[i-1]))return-1;vh.lastIndex=i;let s=vh.exec(n.text),
r=-1;if(!s)return-1;if(s[1]||s[2]){if(r=Wd(n.text,i+s[0].length),r>-1&&n.hasOpenLink){let o=/([^\[\]]|\[[^\]]*\])*/.exec(
n.text.slice(i,r));r=i+o[0].length}}else s[3]?r=Lh(n.text,i):(r=Lh(n.text,i+s[0].length),r>-1&&s[0]=="xmpp:"&&(Mh.lastIndex=
r,s=Mh.exec(n.text),s&&(r=s.index+s[0].length)));return r<0?-1:(n.addElement(n.elt("URL",e,r+n.offset)),r+n.offset)}}]},
Xh=[Fd,Vd,Hd,qd];function Jh(n,t,e){return(i,s,r)=>{if(s!=n||i.char(r+1)==n)return-1;let o=[i.elt(e,r,r+1)];for(let l=r+
1;l<i.end;l++){let a=i.char(l);if(a==n)return i.addElement(i.elt(t,r,l+1,o.concat(i.elt(e,l,l+1))));if(a==92&&o.push(i.elt(
"Escape",l,l+++2)),Dt(a))break}return-1}}var Hp={defineNodes:[{name:"Superscript",style:x.special(x.content)},{name:"Sup\
erscriptMark",style:x.processingInstruction}],parseInline:[{name:"Superscript",parse:Jh(94,"Superscript","SuperscriptMar\
k")}]},Fp={defineNodes:[{name:"Subscript",style:x.special(x.content)},{name:"SubscriptMark",style:x.processingInstruction}],
parseInline:[{name:"Subscript",parse:Jh(126,"Subscript","SubscriptMark")}]},Vp={defineNodes:[{name:"Emoji",style:x.character}],
parseInline:[{name:"Emoji",parse(n,t,e){let i;return t!=58||!(i=/^[a-zA-Z_0-9]+:/.exec(n.slice(e+1,n.end)))?-1:n.addElement(
n.elt("Emoji",e,e+1+i[0].length))}}]};var Qh=_h.configure(Xh),Yh=n=>n.replace(/\r\n?|\n/g,`
`),Je=class{constructor(t){this.raw=t,this.eol=t.match(/\r\n|\r|\n/)?.[0]||`
`}get text(){return Yh(this.raw)}offset(t){let e=0,i=0;for(;e<t&&i<this.raw.length;)this.raw[i]==="\r"&&this.raw[i+1]===
`
`&&i++,i++,e++;return i}apply(t){let e="",i=0;for(let{from:s,to:r,insert:o}of t){let l=this.offset(s),a=this.offset(r);e+=
this.raw.slice(i,l)+Yh(o).replace(/\n/g,this.eol),i=a}return this.raw=e+this.raw.slice(i),this.raw}};function Zh(n,t=Qh.
parse(n)){let e=[],i=t.topNode;for(let s=i.firstChild;s;s=s.nextSibling){if(s.name!=="Table")continue;let r=[],o=[];for(let h=s.
firstChild;h;h=h.nextSibling){if(h.name==="TableDelimiter"){o=n.slice(h.from,h.to).replace(/^\s*\|/,"").replace(/\|\s*$/,
"").split("|").map(d=>(d=d.trim(),d.startsWith(":")&&d.endsWith(":")?"center":d.endsWith(":")?"right":d.startsWith(":")?
"left":""));continue}if(h.name!=="TableHeader"&&h.name!=="TableRow")continue;let f=[];for(let d=h.firstChild;d;d=d.nextSibling)
d.name==="TableDelimiter"&&f.push(d.from);let c=[h.from-1,...f,h.to],u=[];for(let d=0;d+1<c.length;d++){let p=c[d]+1,m=c[d+
1],g=n.slice(p,m);if(f.length&&(d===0||d===c.length-2)&&!g.trim())continue;let y=g.length-g.trimStart().length;u.push({from:p+
y,to:p+y+g.trim().length,text:g.trim().replace(/\\\|/g,"|")})}r.push({from:h.from,to:h.to,header:h.name==="TableHeader",
cells:u})}let l=r[0]?.cells.length||0;for(let h of r)for(h.cells=h.cells.slice(0,l);h.cells.length<l;)h.cells.push({from:h.
to,to:h.to,text:""});let a=n.slice(0,s.from).split(`
`).length-1;e.push({from:s.from,to:s.to,startLine:a,endLine:a+n.slice(s.from,s.to).split(`
`).length-1,align:Array.from({length:l},(h,f)=>o[f]||""),rows:r})}return e}function to(n,t=[],e){return Zh(n,e).map(i=>{
let s=n.lastIndexOf(`
`,i.from-1)+1,r=n.indexOf(`
`,i.to),o=r<0?n.length:r,l=i.rows.map(a=>({header:a.header,cells:a.cells.map(h=>({from:h.from-s,text:h.text}))}));return{
from:s,to:o,align:i.align,rows:l,active:t.some(a=>a.from<=o&&a.to>=s)}})}var Kd=/!\[\[[^\]\n]+\]\]|!\[[^\]\n]*\]\((?:<[^>\n]+>|[^\s)]+)(?:\s+"[^"\n]*")?\)/g;
function eo(n,t=[],{on:e=!1,image:i=null}={}){let s=[],r=0;for(let k of n.split(`
`)){let b=r+k.length;s.push({from:r,to:b,value:k,active:t.some(w=>w.from<=b&&w.to>=r),classes:[]}),r=b+1}let o=k=>{let b=0,
w=s.length-1;for(;b<w;){let S=b+w+1>>1;s[S].from<=k?b=S:w=S-1}return s[b]},l=[],a=[],h=[],f=Qh.parse(n);f.iterate({enter(k){
h.push({name:k.name,from:k.from,to:k.to,parent:k.node.parent?.name})}});let c=e?to(n,t,f):[];for(let k of c)if(k.active)
for(let b of s)b.from>=k.from&&b.to<=k.to&&(b.active=!0,b.classes.push("cm-lp-table-source"));let u=(k,b)=>c.some(w=>!w.
active&&k<w.to&&b>w.from),d=h.filter(k=>["FencedCode","CodeBlock","InlineCode"].includes(k.name)),p=(k,b)=>d.some(w=>k>=
w.from&&b<=w.to),m=[];if(i)for(let k of n.matchAll(Kd)){let b={from:k.index,to:k.index+k[0].length,kind:"image",raw:k[0]};
p(b.from,b.to)||/\\$/.test(n.slice(0,k.index))||!i(k[0])||(m.push(b),o(b.from).active||a.push(b))}let g=(k,b)=>m.some(w=>k<
w.to&&b>w.from),y=[];for(let k of n.matchAll(/\[\[([^\]\n]+)\]\]/g)){if(p(k.index,k.index+k[0].length)||/\\$/.test(n.slice(
0,k.index))||g(k.index,k.index+k[0].length))continue;let[b,...w]=k[1].split(e?/\\?\|/:"|"),S={from:k.index,to:k.index+k[0].
length,kind:"wiki",target:b,label:w.join("|")||b};y.push(S),o(S.from).active||a.push(S),l.push({...S,class:"cm-lp-wiki-s\
ource"})}for(let[k,b]of h.entries()){let w=o(b.from);if(/^ATXHeading[1-6]$/.test(b.name)&&w.classes.push("cm-lp-h"+b.name.
at(-1)),["FencedCode","CodeBlock"].includes(b.name))for(let S of s)S.from>=w.from&&S.from<b.to&&S.classes.push("cm-lp-co\
de");if(b.name==="QuoteMark"&&(w.classes.push("cm-lp-quote"),w.active||a.push({from:b.from,to:b.to+(n[b.to]===" "?1:0),kind:"\
hide"})),b.name==="ListMark"){let S=h.find(T=>T.name==="TaskMarker"&&T.from>=b.to&&T.to<=w.to),N=S?S.to:b.to;w.classes.push(
"cm-lp-list"),w.indent=n.slice(w.from,b.from).replace(/\t/g,"    ").length;let P=/^\s*$/.test(n.slice(w.from,b.from))?w.
from:b.from,I=N+(n[N]===" "?1:0),R=w.active&&(I===N||t.some(T=>T.from<I&&T.to>P));R||(w.bullet=!0),R||a.push({from:P,to:I,
kind:S?"task":"bullet",checked:S?n.slice(S.from,S.to).toLowerCase()==="[x]":!1,taskAt:S?.from,label:S?w.value.slice(N-w.
from).trim():void 0,marker:/^\d/.test(n.slice(b.from,b.to))?n.slice(b.from,b.to):"\u2022"})}if(["StrongEmphasis","Emphas\
is","InlineCode","Strikethrough"].includes(b.name)&&l.push({from:b.from,to:b.to,class:b.name==="StrongEmphasis"?"cm-lp-s\
trong":b.name==="Emphasis"?"cm-lp-em":b.name==="Strikethrough"?"cm-lp-strike":"cm-lp-inline-code"}),b.name==="HeaderMark"&&
!w.active&&a.push({from:b.from,to:b.to+(n[b.to]===" "?1:0),kind:"hide"}),["EmphasisMark","StrikethroughMark"].includes(b.
name)&&!w.active&&a.push({from:b.from,to:b.to,kind:"hide"}),b.name==="CodeMark"&&(b.parent==="InlineCode"?w.active||a.push(
{from:b.from,to:b.to,kind:"hide"}):(w.classes.push("cm-lp-fence"),w.active||a.push({from:w.from,to:w.to,kind:"hide"}))),
b.name==="Link"&&!y.some(S=>S.from<b.to&&S.to>b.from)&&!g(b.from,b.to)){let S=[];for(let I=k+1;I<h.length&&h[I].from<b.to;I++)
h[I].parent==="Link"&&S.push(h[I]);let N=S.find((I,R)=>I.name==="LinkMark"&&n[I.from]==="]"&&S[R+1]&&n[S[R+1].from]==="("),
P=S.find(I=>I.name==="URL");e&&!w.active&&N&&P&&N.from>b.from+1&&n[b.from]==="["&&!n.slice(b.from,b.to).includes(`
`)?(l.push({from:b.from,to:b.to,class:"cm-lp-link",href:n.slice(P.from,P.to).replace(/^<|>$/g,"")}),a.push({from:b.from,
to:b.from+1,kind:"hide"},{from:N.from,to:b.to,kind:"hide"})):l.push({from:b.from,to:b.to,class:"cm-lp-link"})}}for(let k of s){
let b=k.active&&!k.classes.includes("cm-lp-list")&&/^(\s*)([-*+]) $/.exec(k.value);!b||p(k.from,k.to)||(k.classes.push("\
cm-lp-list"),k.bullet=!0,k.indent=b[1].replace(/\t/g,"    ").length,a.push({from:k.from,to:k.to,kind:"bullet",marker:"\u2022"}))}
a.sort((k,b)=>k.from-b.from||b.to-k.to);let v=[],A=-1;for(let k of a)k.from>=A&&k.to>k.from&&!u(k.from,k.to)&&(v.push(k),
A=k.to);return{lines:s,marks:l.filter(k=>!u(k.from,k.to)),replacements:v,tables:c}}var $d=/^\s*(?:(?:[-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?|>\s*|#{1,6}\s+)*$/,
jd=/(?:^|\s)(?:e\.g|i\.e|etc|vs|cf|approx|incl|no|p|pp|ca)\.$/i;function tf(n,t,e){let i=[],s=n.lastIndexOf(`
`,Math.max(0,t-1))+1;for(;s<=e;){let r=n.indexOf(`
`,s);if(r<0&&(r=n.length),Ud(n,s,n.slice(s,r),t,e,i),r>=n.length)break;s=r+1}return i}function Ud(n,t,e,i,s,r){if(!((n.slice(
0,t).match(/^\s*```/gm)||[]).length%2||/^\s*```/.test(e)||/^( {4}|\t)(?!\s*([-*+]|\d+[.)])\s)/.test(e)))for(let o of e.matchAll(
new RegExp("\\p{L}[\\p{L}\\p{M}\\d]*(?:['\u2019\\-.:\\/@][\\p{L}\\p{M}\\d]+)*","gu"))){let l=t+o.index,a=l+o[0].length,h=o[0];
if(a<i||l>s)continue;let f=e.slice(0,o.index);if((f.match(/`/g)||[]).length%2||/[\[(<]$/.test(f)&&/\[\[[^\]]*$/.test(f)||
new RegExp("^\\p{Ll}","u").test(h)===!1)continue;let c=/^i(?:['’](?:m|ll|ve|d|s))?$/.test(h)&&a>=i&&a<s&&/[ \t\n.,!?;:)]/.
test(n[a]||""),u=/^[\p{Ll}\p{M}'’-]+$/u.test(h)&&!/^(?::\/|[@.:][\p{L}\d])/u.test(n.slice(a,a+2)),d=l>=i&&l<s&&u&&($d.
test(f)||/[.!?]["'’”]*\s+$/.test(f)&&!jd.test(f.trimEnd())&&!/\.\.\.\s+$/.test(f));(c||d)&&r.push({from:l,to:l+1,insert:h[0].
toUpperCase()})}}var Wi=q.define(),io=class extends qt{constructor(t,e){super(),this.item=t,this.options=e}eq(t){return this.item.kind===
"image"?t.item.kind==="image"&&this.item.raw===t.item.raw:JSON.stringify(this.item)===JSON.stringify(t.item)}toDOM(t){let e=this.
item;if(e.kind==="image"){let s=document.createElement("span");return s.className="cm-lp-image",s.append(this.options.renderImage(
e.raw)),s}if(e.kind==="wiki"){let s=document.createElement("button");return s.type="button",s.className="cm-lp-wiki",s.textContent=
e.label,s.setAttribute("aria-label","Open linked note "+e.label),s.onmousedown=r=>r.preventDefault(),s.onclick=r=>{r.preventDefault(),
this.options.onWiki(e.target)},s}let i=document.createElement("span");if(i.className="cm-lp-marker",e.kind==="task"){let s=document.
createElement("input");s.type="checkbox",s.checked=e.checked,s.setAttribute("aria-label",e.label||"Task"),s.onmousedown=
r=>r.preventDefault(),s.onchange=()=>{t.composing||t.dispatch({changes:{from:e.taskAt+1,to:e.taskAt+2,insert:s.checked?"\
x":" "},annotations:J.userEvent.of("input.task")})},i.append(s)}else i.textContent=e.marker;return i}ignoreEvent(){return!0}},
no=class extends qt{constructor(t,e){super(),this.table=t,this.options=e,this.key=JSON.stringify([t.align,t.rows])}eq(t){
return this.key===t.key}toDOM(t){let e=this.options.renderTable?this.options.renderTable(this.table):_d(this.table);return e.
classList.add("cm-lp-table"),e.addEventListener("mousedown",i=>{if(i.button!==0||i.target.closest("a,button,input"))return;
i.preventDefault();let s=i.target.closest("[data-from]"),r=t.posAtDOM(e)+(s?Number(s.dataset.from):0);t.dispatch({selection:C.
cursor(Math.min(r,t.state.doc.length)),scrollIntoView:!0}),t.focus()}),e}ignoreEvent(){return!0}};function _d(n){let t=document.
createElement("div"),e=document.createElement("table");for(let i of n.rows){let s=e.insertRow();i.cells.forEach((r,o)=>{
let l=document.createElement(i.header?"th":"td");l.textContent=r.text,l.dataset.from=r.from,n.align[o]&&(l.style.textAlign=
n.align[o]),s.append(l)})}return t.append(e),t}var so=q.define(),ef=ct.define({create:()=>!1,update(n,t){for(let e of t.
effects)e.is(so)&&(n=e.value);return n}}),sf=n=>!!n.switchOn?.();function Gd(n){let t=e=>{if(!sf(n))return z.none;let i=e.
field(ef)?e.selection.ranges.map(s=>({from:s.from,to:s.to})):[];return z.set(to(e.doc.toString(),i).filter(s=>!s.active).
map(s=>z.replace({block:!0,widget:new no(s,n)}).range(s.from,s.to)))};return[ef,B.focusChangeEffect.of((e,i)=>so.of(i)),
ct.define({create:t,update(e,i){return i.docChanged&&i.isUserEvent("input.type.compose")?e.map(i.changes):i.docChanged||
i.selection||i.effects.some(s=>s.is(so)||s.is(Wi))?t(i.state):e},provide:e=>B.decorations.from(e)})]}function Xd(n){return Kt.
fromClass(class{constructor(t){this.decorations=this.build(t)}update(t){if(t.view.composing){this.decorations=this.decorations.
map(t.changes);return}(t.docChanged||t.selectionSet||t.focusChanged||t.transactions.some(e=>e.effects.some(i=>i.is(Wi))))&&
(this.decorations=this.build(t.view))}build(t){let e=t.hasFocus?t.state.selection.ranges.map(r=>({from:r.from,to:r.to})):
[],i=eo(t.state.doc.toString(),e,{on:sf(n),image:n.renderImage&&n.imagesOn?.()?n.isImage:null}),s=[];for(let r of i.lines){
let o=[...r.classes,...r.active?["cm-lp-active"]:[],...r.bullet?["cm-lp-bullet"]:[]],l={class:o.join(" ")};r.indent!==void 0&&
r.bullet&&(l.style=`--lp-indent:${Math.floor(r.indent/2)*22}px`),o.length&&s.push(z.line({attributes:l}).range(r.from))}
for(let r of i.marks)r.to>r.from&&s.push(z.mark({class:r.class,...r.href?{attributes:{"data-href":r.href}}:{}}).range(r.
from,r.to));for(let r of i.replacements)s.push(z.replace({widget:r.kind==="hide"?void 0:new io(r,n)}).range(r.from,r.to));
return z.set(s,!0)}},{decorations:t=>t.decorations})}var nf=n=>!n.shiftKey&&!n.altKey&&n.target.closest?.(".cm-lp-link[d\
ata-href]");function _p(n,t){let e=new Je(""),i,s=new Map,r,o=()=>{clearTimeout(r);let p=()=>{if(i.dom.isConnected){if(i.
composing){r=setTimeout(p,60);return}u(),i.dispatch({effects:Wi.of(null)}),t.onChange(e.raw,!1)}};r=setTimeout(p,80)},l=()=>{
s.set(e.text,e.raw),s.size>160&&s.delete(s.keys().next().value)},a=p=>{if(!p||i.composing)return!1;let m=i.state.doc.toString(),
g=0,y=m.length,v=p.text.length;for(;g<y&&g<v&&m[g]===p.text[g];)g++;for(;y>g&&v>g&&m[y-1]===p.text[v-1];)y--,v--;return i.
dispatch({changes:{from:g,to:y,insert:p.text.slice(g,v)},selection:C.range(p.start,p.end),annotations:J.userEvent.of("in\
put.format"),scrollIntoView:!0}),i.focus(),!0},h=p=>{if(i.composing)return!1;if(p==="undo"||p==="redo")return i.focus(),
(p==="undo"?Fn:Ii)(i);let m=i.state.selection.main;return a(t.transform(i.state.doc.toString(),m.from,m.to,p))},f=()=>{if(i.
composing)return!1;let p=i.state.selection.main;return eo(i.state.doc.toString()).lines.find(g=>g.from<=p.from&&g.to>=p.
from)?.classes.includes("cm-lp-code")?!1:a(t.continueList(i.state.doc.toString(),p.from,p.to))},c=[],u=()=>{if(!c.length||
i.composing)return;let p=c;c=[];let m=i.state.doc.toString(),g=new Set,y=[];for(let v of p)for(let A of tf(m,v.from,v.to))
g.has(A.from)||(g.add(A.from),y.push(A));y.length&&i.dispatch({changes:y,annotations:[J.userEvent.of("input.autocap"),Pr.
of("full")]})},d=[qa(),pa(),B.lineWrapping,ga("Start writing\u2026"),B.contentAttributes.of({"aria-label":"Live Preview \
editor",spellcheck:"true",autocorrect:"on",autocapitalize:"sentences"}),Xd(t),Gd(t),or.of([{key:"Tab",run:()=>h("indent"),
shift:()=>h("outdent")},{key:"Enter",run:f},{key:"Mod-b",run:()=>h("bold")},{key:"Mod-i",run:()=>h("italic")},...ja,...bh]),
B.domEventHandlers({beforeinput(p){return!p.isComposing&&!i.composing&&p.cancelable&&["insertParagraph","insertLineBreak"].
includes(p.inputType)&&f()?(p.preventDefault(),!0):!1},compositionend(){return o(),!1},mousedown(p){return p.button!==0||
!nf(p)?!1:(p.preventDefault(),!0)},click(p){let m=nf(p);return!m||p.button!==0?!1:(p.preventDefault(),t.onLink?.(m.dataset.
href),!0)}}),B.updateListener.of(p=>{!t.keepCaretVisible||!i.hasFocus||!(p.docChanged||p.selectionSet||p.geometryChanged)||
i.requestMeasure({key:"notes-caret-guard",read:m=>m.coordsAtPos(m.state.selection.main.head,-1)||m.coordsAtPos(m.state.selection.
main.head,1),write:m=>{m&&t.keepCaretVisible(m)}})}),B.updateListener.of(p=>{if(p.docChanged){l();for(let m of p.transactions)
if(m.docChanged){let g=m.newDoc.toString(),y=(m.isUserEvent("undo")||m.isUserEvent("redo"))&&s.get(g);if(y!==!1&&y!==void 0)
e=new Je(y);else{let v=[];m.changes.iterChanges((A,k,b,w,S)=>v.push({from:A,to:k,insert:S.toString()})),e.apply(v)}}for(let m of p.
transactions)m.docChanged&&(c=c.map(g=>({from:m.changes.mapPos(g.from,-1),to:m.changes.mapPos(g.to,1)})),m.isUserEvent("\
input")&&!m.isUserEvent("input.autocap")&&!m.isUserEvent("input.task")&&m.changes.iterChangedRanges((g,y,v,A)=>{A>v&&c.push(
{from:v,to:A})}));c.length&&!i.composing&&queueMicrotask(u),l(),t.onChange(e.raw,i.composing),i.composing&&o()}})];return i=
new B({parent:n,state:U.create({doc:"",extensions:d})}),{view:i,format:h,get value(){return e.raw},get composing(){return i.
composing},setValue(p){clearTimeout(r),e=new Je(p),s=new Map,l(),i.setState(U.create({doc:e.text,extensions:d}))},caretRect(){
return i.coordsAtPos(i.state.selection.main.head,-1)||i.coordsAtPos(i.state.selection.main.head,1)},focus(){i.focus()},select(p,m=p){
i.dispatch({selection:C.range(p,m),effects:Wi.of(null)}),i.focus()},replace(p){return a(p)},redraw(){i.dispatch({effects:Wi.
of(null)})},destroy(){clearTimeout(r),i.destroy()}}}export{B as EditorView,_p as createLiveEditor,Zh as tableBlocks};

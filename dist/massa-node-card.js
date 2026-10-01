var Vt=Object.defineProperty;var Wt=Object.getOwnPropertyDescriptor;var _=(n,t,e,s)=>{for(var i=s>1?void 0:s?Wt(t,e):t,o=n.length-1,r;o>=0;o--)(r=n[o])&&(i=(s?r(t,e,i):r(i))||i);return s&&i&&Vt(t,e,i),i};var j=window,G=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),ft=new WeakMap,T=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(G&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ft.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ft.set(e,t))}return t}toString(){return this.cssText}},gt=n=>new T(typeof n=="string"?n:n+"",void 0,J),Z=(n,...t)=>{let e=n.length===1?n[0]:t.reduce(((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1]),n[0]);return new T(e,n,J)},Q=(n,t)=>{G?n.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((e=>{let s=document.createElement("style"),i=j.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}))},F=G?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return gt(e)})(n):n;var X,B=window,_t=B.trustedTypes,Yt=_t?_t.emptyScript:"",vt=B.reactiveElementPolyfillSupport,et={toAttribute(n,t){switch(t){case Boolean:n=n?Yt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},yt=(n,t)=>t!==n&&(t==t||n==n),tt={attribute:!0,type:String,converter:et,reflect:!1,hasChanged:yt},st="finalized",v=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach(((e,s)=>{let i=this._$Ep(s,e);i!==void 0&&(this._$Ev.set(i,s),t.push(i))})),t}static createProperty(t,e=tt){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){let s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){let o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||tt}static finalize(){if(this.hasOwnProperty(st))return!1;this[st]=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(F(i))}else t!==void 0&&e.push(F(t));return e}static _$Ep(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach((e=>e(this)))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;let e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Q(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach((e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)}))}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach((e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=tt){var i;let o=this.constructor._$Ep(t,s);if(o!==void 0&&s.reflect===!0){let r=(((i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?s.converter:et).toAttribute(e,s.type);this._$El=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var s;let i=this.constructor,o=i._$Ev.get(t);if(o!==void 0&&this._$El!==o){let r=i.getPropertyOptions(o),a=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?r.converter:et;this._$El=o,this[o]=a.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||yt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((i,o)=>this[o]=i)),this._$Ei=void 0);let e=!1,s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach((i=>{var o;return(o=i.hostUpdate)===null||o===void 0?void 0:o.call(i)})),this.update(s)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach((s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach(((e,s)=>this._$EO(s,this[s],e))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};v[st]=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},vt?.({ReactiveElement:v}),((X=B.reactiveElementVersions)!==null&&X!==void 0?X:B.reactiveElementVersions=[]).push("1.6.3");var it,q=window,S=q.trustedTypes,$t=S?S.createPolicy("lit-html",{createHTML:n=>n}):void 0,ot="$lit$",y=`lit$${(Math.random()+"").slice(9)}$`,Ct="?"+y,Jt=`<${Ct}>`,A=document,O=()=>A.createComment(""),H=n=>n===null||typeof n!="object"&&typeof n!="function",kt=Array.isArray,Zt=n=>kt(n)||typeof n?.[Symbol.iterator]=="function",nt=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,xt=/>/g,b=RegExp(`>|${nt}(?:([^\\s"'>=/]+)(${nt}*=${nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),At=/'/g,wt=/"/g,Dt=/^(?:script|style|textarea|title)$/i,Tt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),p=Tt(1),pe=Tt(2),w=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),St=new WeakMap,x=A.createTreeWalker(A,129,null,!1);function Rt(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return $t!==void 0?$t.createHTML(t):t}var Qt=(n,t)=>{let e=n.length-1,s=[],i,o=t===2?"<svg>":"",r=R;for(let a=0;a<e;a++){let l=n[a],c,u,h=-1,m=0;for(;m<l.length&&(r.lastIndex=m,u=r.exec(l),u!==null);)m=r.lastIndex,r===R?u[1]==="!--"?r=bt:u[1]!==void 0?r=xt:u[2]!==void 0?(Dt.test(u[2])&&(i=RegExp("</"+u[2],"g")),r=b):u[3]!==void 0&&(r=b):r===b?u[0]===">"?(r=i??R,h=-1):u[1]===void 0?h=-2:(h=r.lastIndex-u[2].length,c=u[1],r=u[3]===void 0?b:u[3]==='"'?wt:At):r===wt||r===At?r=b:r===bt||r===xt?r=R:(r=b,i=void 0);let f=r===b&&n[a+1].startsWith("/>")?" ":"";o+=r===R?l+Jt:h>=0?(s.push(c),l.slice(0,h)+ot+l.slice(h)+y+f):l+y+(h===-2?(s.push(void 0),a):f)}return[Rt(n,o+(n[e]||"<?>")+(t===2?"</svg>":"")),s]},M=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0,a=t.length-1,l=this.parts,[c,u]=Qt(t,e);if(this.el=n.createElement(c,s),x.currentNode=this.el.content,e===2){let h=this.el.content,m=h.firstChild;m.remove(),h.append(...m.childNodes)}for(;(i=x.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes()){let h=[];for(let m of i.getAttributeNames())if(m.endsWith(ot)||m.startsWith(y)){let f=u[r++];if(h.push(m),f!==void 0){let Kt=i.getAttribute(f.toLowerCase()+ot).split(y),z=/([.?@])?(.*)/.exec(f);l.push({type:1,index:o,name:z[2],strings:Kt,ctor:z[1]==="."?at:z[1]==="?"?lt:z[1]==="@"?ct:C})}else l.push({type:6,index:o})}for(let m of h)i.removeAttribute(m)}if(Dt.test(i.tagName)){let h=i.textContent.split(y),m=h.length-1;if(m>0){i.textContent=S?S.emptyScript:"";for(let f=0;f<m;f++)i.append(h[f],O()),x.nextNode(),l.push({type:2,index:++o});i.append(h[m],O())}}}else if(i.nodeType===8)if(i.data===Ct)l.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(y,h+1))!==-1;)l.push({type:7,index:o}),h+=y.length-1}o++}}static createElement(t,e){let s=A.createElement("template");return s.innerHTML=t,s}};function E(n,t,e=n,s){var i,o,r,a;if(t===w)return t;let l=s!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[s]:e._$Cl,c=H(t)?void 0:t._$litDirective$;return l?.constructor!==c&&((o=l?._$AO)===null||o===void 0||o.call(l,!1),c===void 0?l=void 0:(l=new c(n),l._$AT(n,e,s)),s!==void 0?((r=(a=e)._$Co)!==null&&r!==void 0?r:a._$Co=[])[s]=l:e._$Cl=l),l!==void 0&&(t=E(n,l._$AS(n,t.values),l,s)),t}var rt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;let{el:{content:s},parts:i}=this._$AD,o=((e=t?.creationScope)!==null&&e!==void 0?e:A).importNode(s,!0);x.currentNode=o;let r=x.nextNode(),a=0,l=0,c=i[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new P(r,r.nextSibling,this,t):c.type===1?u=new c.ctor(r,c.name,c.strings,this,t):c.type===6&&(u=new dt(r,this,t)),this._$AV.push(u),c=i[++l]}a!==c?.index&&(r=x.nextNode(),a++)}return x.currentNode=A,o}v(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},P=class n{constructor(t,e,s,i){var o;this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=(o=i?.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),H(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Zt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==d&&H(this._$AH)?this._$AA.nextSibling.data=t:this.$(A.createTextNode(t)),this._$AH=t}g(t){var e;let{values:s,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=M.createElement(Rt(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(s);else{let r=new rt(o,this),a=r.u(this.options);r.v(s),this.$(a),this._$AH=r}}_$AC(t){let e=St.get(t.strings);return e===void 0&&St.set(t.strings,e=new M(t)),e}T(t){kt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new n(this.k(O()),this.k(O()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},C=class{constructor(t,e,s,i,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){let o=this.strings,r=!1;if(o===void 0)t=E(this,t,e,0),r=!H(t)||t!==this._$AH&&t!==w,r&&(this._$AH=t);else{let a=t,l,c;for(t=o[0],l=0;l<o.length-1;l++)c=E(this,a[s+l],e,l),c===w&&(c=this._$AH[l]),r||(r=!H(c)||c!==this._$AH[l]),c===d?t=d:t!==d&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},at=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},Xt=S?S.emptyScript:"",lt=class extends C{constructor(){super(...arguments),this.type=4}j(t){t&&t!==d?this.element.setAttribute(this.name,Xt):this.element.removeAttribute(this.name)}},ct=class extends C{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=(s=E(this,t,e,0))!==null&&s!==void 0?s:d)===w)return;let i=this._$AH,o=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==d&&(i===d||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}},dt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var Et=q.litHtmlPolyfillSupport;Et?.(M,P),((it=q.litHtmlVersions)!==null&&it!==void 0?it:q.litHtmlVersions=[]).push("2.8.0");var Ot=(n,t,e)=>{var s,i;let o=(s=e?.renderBefore)!==null&&s!==void 0?s:t,r=o._$litPart$;if(r===void 0){let a=(i=e?.renderBefore)!==null&&i!==void 0?i:null;o._$litPart$=r=new P(t.insertBefore(O(),a),a,void 0,e??{})}return r._$AI(n),r};var ut,ht;var g=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;let s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ot(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return w}};g.finalized=!0,g._$litElement$=!0,(ut=globalThis.litElementHydrateSupport)===null||ut===void 0||ut.call(globalThis,{LitElement:g});var Ht=globalThis.litElementPolyfillSupport;Ht?.({LitElement:g});((ht=globalThis.litElementVersions)!==null&&ht!==void 0?ht:globalThis.litElementVersions=[]).push("3.3.3");var K=n=>t=>typeof t=="function"?((e,s)=>(customElements.define(e,s),s))(n,t):((e,s)=>{let{kind:i,elements:o}=s;return{kind:i,elements:o,finisher(r){customElements.define(e,r)}}})(n,t);var te=(n,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,n)}},ee=(n,t,e)=>{t.constructor.createProperty(e,n)};function k(n){return(t,e)=>e!==void 0?ee(n,t,e):te(n,t)}function N(n){return k({...n,state:!0})}var pt,ze=((pt=window.HTMLSlotElement)===null||pt===void 0?void 0:pt.prototype.assignedElements)!=null?(n,t)=>n.assignedElements(t):(n,t)=>n.assignedNodes(t).filter((e=>e.nodeType===Node.ELEMENT_NODE));var Mt={title:"Massa node",online:"Online",offline:"Offline",offlineSince:"Offline since {time}",unknown:"Unknown",gainOfDay:"Gain of the day",average:"{value} per day on average over {days} days",noHistory:"The daily history appears after the first full day.",activeRolls:"Active rolls",price:"MAS price",cycle:"Cycle",blocks:"Blocks over the recent cycles",produced:"{count} produced",missed:"{count} missed",noBlocks:"No block assigned yet",wallet:"Wallet",walletDetail:"{balance} available, {rolls} rolls",notFound:"No Massa Node entities found. Add the Massa Node integration in Settings > Devices & services, then reload this page.",editor:{title:"Title",device_id:"Massa node",show_wallet:"Show the wallet amount",show_history:"Show the daily history"}};var Pt={title:"N\u0153ud Massa",online:"En ligne",offline:"Hors ligne",offlineSince:"Hors ligne depuis {time}",unknown:"Inconnu",gainOfDay:"Gain du jour",average:"{value} par jour en moyenne sur {days} jours",noHistory:"L'historique journalier appara\xEEt apr\xE8s la premi\xE8re journ\xE9e compl\xE8te.",activeRolls:"Rolls actifs",price:"Prix du MAS",cycle:"Cycle",blocks:"Blocs sur les cycles r\xE9cents",produced:"{count} produits",missed:"{count} manqu\xE9s",noBlocks:"Aucun bloc attribu\xE9 pour l'instant",wallet:"Portefeuille",walletDetail:"{balance} disponibles, {rolls} rolls",notFound:"Aucune entit\xE9 Massa Node trouv\xE9e. Ajoutez l'int\xE9gration Massa Node dans Param\xE8tres > Appareils et services, puis rechargez la page.",editor:{title:"Titre",device_id:"N\u0153ud Massa",show_wallet:"Afficher le montant du portefeuille",show_history:"Afficher l'historique journalier"}};var Nt={en:Mt,fr:Pt};function Ut(n,t){let e=n;for(let s of t.split(".")){if(e===void 0||typeof e=="string")return;e=e[s]}return typeof e=="string"?e:void 0}function V(n,t,e={}){let s=t.split("-")[0];return(Ut(Nt[s],n)??Ut(Nt.en,n)??n).replace(/\{(\w+)\}/g,(o,r)=>r in e?String(e[r]):o)}var W="massa-node-card",Y="massa-node-card-editor",L="massa_node";var I={show_wallet:!1,show_history:!0},Lt={status:"sensor.massa_node_status",massa_price:"sensor.massa_node_massa_price",wallet_amount:"sensor.massa_node_wallet_amount",wallet_amount_with_rolls:"sensor.massa_node_wallet_amount_with_rolls",total_amount:"sensor.massa_node_total_amount",total_gain_of_day:"sensor.massa_node_total_gain_of_day",active_rolls:"sensor.massa_node_active_rolls",produced_block:"sensor.massa_node_produced_block",missed_block:"sensor.massa_node_missed_block",block_miss_rate:"sensor.massa_node_block_miss_rate",current_cycle:"sensor.massa_node_current_cycle",node_version:"sensor.massa_node_node_version"};function ne(n){let t=new Set;for(let e of Object.values(n.entities??{}))e.platform===L&&e.device_id!=null&&t.add(e.device_id);return[...t]}function It(n,t){let e={},s=t??ne(n)[0];for(let i of Object.values(n.entities??{}))i.platform!==L||i.translation_key==null||s!=null&&i.device_id!==s||(e[i.translation_key]=i.entity_id);if(Object.keys(e).length===0)for(let[i,o]of Object.entries(Lt))n.states[o]!==void 0&&(e[i]=o);return e}function zt(n,t){if(t==null)return;let e=parseFloat(n.states[t]?.state??"");return Number.isFinite(e)?e:void 0}function jt(n,t){if(t==null)return;let e=n.states[t]?.state;if(e!==void 0)return e==="on"||e==="Online"}var mt=n=>`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`,oe=n=>typeof n=="number"?new Date(n):new Date(n);async function Gt(n,t,e){let s=new Date;s.setHours(0,0,0,0);let i=new Date(s);i.setDate(i.getDate()-e);let o=new Map;try{let r=await n.callWS({type:"recorder/statistics_during_period",start_time:i.toISOString(),end_time:s.toISOString(),statistic_ids:[t],period:"day",types:["state"]});for(let a of r[t]??[])a.state!=null&&o.set(mt(oe(a.start)),a.state)}catch(r){console.debug("massa-node-card: statistics unavailable",r)}if(o.size>=e)return o;try{let r=await n.callWS({type:"history/history_during_period",start_time:i.toISOString(),end_time:s.toISOString(),entity_ids:[t],minimal_response:!0,no_attributes:!0}),a=new Map;for(let l of r[t]??[]){let c=parseFloat(l.s);Number.isFinite(c)&&a.set(mt(new Date(l.lu*1e3)),c)}for(let[l,c]of a)o.has(l)||o.set(l,c)}catch(r){console.debug("massa-node-card: history unavailable",r)}return o}function Ft(n,t,e){let s=[],i=new Date;i.setHours(0,0,0,0);for(let o=e-1;o>=0;o--){let r=new Date(i);if(r.setDate(r.getDate()-o),o===0)s.push(t===void 0?null:{day:r,value:t,live:!0});else{let a=n.get(mt(r));s.push(a===void 0?null:{day:r,value:a,live:!1})}}return s}var Bt=Z`
  :host {
    --massa-positive: var(--success-color, #2e7d32);
    --massa-negative: var(--error-color, #c62828);
    --massa-accent: var(--primary-color, #03a9f4);
    --massa-muted: var(--secondary-text-color, #727272);
    --massa-line: var(--divider-color, rgba(127, 127, 127, 0.2));
  }

  ha-card {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-variant-numeric: tabular-nums;
  }

  :where(button.plain) {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 8px;
  }
  :where(button.plain):focus-visible {
    outline: 2px solid var(--massa-accent);
    outline-offset: 2px;
  }

  /* Header */
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px 4px 8px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
  }
  .status::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  }
  .status.online {
    color: var(--massa-positive);
    background: color-mix(in srgb, var(--massa-positive) 14%, transparent);
  }
  .status.offline {
    color: var(--massa-negative);
    background: color-mix(in srgb, var(--massa-negative) 14%, transparent);
  }
  .status.unknown {
    color: var(--massa-muted);
    background: color-mix(in srgb, var(--massa-muted) 14%, transparent);
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: opacity 0.2s;
  }
  .body.stale {
    opacity: 0.55;
  }

  .label {
    font-size: 12px;
    color: var(--massa-muted);
  }

  /* Hero: gain of the day + last days */
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 16px;
  }
  .gain {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 2px;
    margin: -2px;
  }
  .gain-value {
    font-size: 34px;
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--primary-text-color);
  }
  .gain-value.positive {
    color: var(--massa-positive);
  }
  .gain-value.negative {
    color: var(--massa-negative);
  }
  .gain-value .unit {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0;
    color: var(--massa-muted);
    margin-left: 4px;
  }
  .average {
    font-size: 12px;
    color: var(--massa-muted);
    margin-top: 2px;
  }

  .days {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 14px;
    column-gap: 6px;
    align-items: end;
  }
  .day {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .bar-track {
    height: 56px;
    width: 100%;
    display: flex;
    align-items: flex-end;
  }
  .bar {
    width: 100%;
    min-height: 3px;
    border-radius: 3px;
    background: color-mix(in srgb, var(--massa-accent) 38%, transparent);
  }
  .bar.live {
    background: var(--massa-accent);
  }
  .bar.negative {
    background: color-mix(in srgb, var(--massa-negative) 55%, transparent);
  }
  .bar.empty {
    background: var(--massa-line);
  }
  .day-letter {
    font-size: 10px;
    line-height: 1;
    color: var(--massa-muted);
  }
  .day-letter.live {
    color: var(--primary-text-color);
    font-weight: 600;
  }

  hr {
    border: none;
    border-top: 1px solid var(--massa-line);
    margin: 0;
  }

  /* Key figures */
  .figures {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }
  .figure {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 4px 6px;
    margin: -4px -6px;
  }
  .figure-value {
    font-size: 18px;
    font-weight: 500;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .figure-value .unit {
    font-size: 12px;
    color: var(--massa-muted);
    margin-left: 3px;
    font-weight: 400;
  }

  /* Blocks */
  .blocks {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px 6px;
    margin: -4px -6px;
  }
  .blocks-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
  }
  .blocks-rate {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
  }
  .meter {
    display: flex;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    background: var(--massa-line);
    gap: 2px;
  }
  .meter .produced {
    background: var(--massa-positive);
  }
  .meter .missed {
    background: var(--massa-negative);
  }
  .counts {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--massa-muted);
  }
  .counts .missed-count.has-missed {
    color: var(--massa-negative);
  }

  /* Wallet */
  .wallet {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: baseline;
    gap: 2px 12px;
    padding: 4px 6px;
    margin: -4px -6px;
  }
  .wallet-amount {
    font-size: 16px;
    font-weight: 500;
    color: var(--primary-text-color);
    text-align: right;
  }
  .wallet-detail {
    font-size: 12px;
    color: var(--massa-muted);
  }
  .wallet-value {
    font-size: 12px;
    color: var(--massa-muted);
    text-align: right;
  }

  .message {
    font-size: 14px;
    color: var(--massa-muted);
    line-height: 1.5;
  }

  @media (max-width: 360px) {
    .hero {
      grid-template-columns: 1fr;
    }
    .gain-value {
      font-size: 28px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .body {
      transition: none;
    }
  }
`;var re=[{name:"title",selector:{text:{}}},{name:"device_id",selector:{device:{filter:{integration:L}}}},{name:"show_history",selector:{boolean:{}}},{name:"show_wallet",selector:{boolean:{}}}],D=class extends g{setConfig(t){this._config=t}render(){return this.hass==null||this._config==null?d:p`
      <ha-form
        .hass=${this.hass}
        .data=${{...I,...this._config}}
        .schema=${re}
        .computeLabel=${t=>V(`editor.${t.name}`,this.hass?.locale?.language??this.hass?.language??"en")}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(t){t.stopPropagation();let e={...t.detail.value};for(let s of Object.keys(e))(e[s]===""||e[s]===void 0)&&delete e[s];this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}};_([k({attribute:!1})],D.prototype,"hass",2),_([N()],D.prototype,"_config",2),D=_([K(Y)],D);var $=class extends g{constructor(){super(...arguments);this._config={type:`custom:${W}`,...I};this._pastGains=new Map;this._entities={};this._historyLoadedAt=0;this._historyDay="";this._historyLoading=!1}setConfig(e){this._config={...I,...e},this._historyLoadedAt=0}static getConfigElement(){return document.createElement(Y)}static getStubConfig(){return{}}getCardSize(){return this._config.show_wallet===!0?7:6}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}willUpdate(e){(e.has("hass")||e.has("_config"))&&this.hass!=null&&(this._entities=It(this.hass,this._config.device_id))}updated(){let e=this._entities.total_gain_of_day;if(this.hass==null||e==null||this._config.show_history===!1)return;let s=new Date().toDateString(),i=Date.now()-this._historyLoadedAt>18e5;this._historyLoading||!i&&this._historyDay===s||(this._historyLoading=!0,this._historyDay=s,Gt(this.hass,e,6).then(o=>{this._pastGains=o,this._historyLoadedAt=Date.now()}).catch(o=>{console.debug("massa-node-card: history error",o)}).finally(()=>{this._historyLoading=!1}))}_t(e,s){return V(e,this.hass?.locale?.language??this.hass?.language??"en",s)}_format(e,s,i=!1){return e===void 0?"\u2014":new Intl.NumberFormat(this.hass?.locale?.language??this.hass?.language,{minimumFractionDigits:s,maximumFractionDigits:s,signDisplay:i?"exceptZero":"auto"}).format(e)}_value(e){return this.hass==null?void 0:zt(this.hass,this._entities[e])}_unit(e,s){let i=this._entities[e];return i==null||this.hass==null?s:this.hass.states[i]?.attributes.unit_of_measurement??s}_moreInfo(e){let s=this._entities[e];s!=null&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:s},bubbles:!0,composed:!0}))}render(){if(this.hass==null)return d;let e=this._config.title??this._t("title");if(Object.keys(this._entities).length===0)return p`
        <ha-card>
          <header><h2>${e}</h2></header>
          <p class="message">${this._t("notFound")}</p>
        </ha-card>
      `;let s=jt(this.hass,this._entities.status);return p`
      <ha-card>
        <header>
          <h2>${e}</h2>
          ${this._renderStatus(s)}
        </header>
        <div class="body ${s===!1?"stale":""}">
          ${this._renderHero()}
          <hr />
          ${this._renderFigures()}
          ${this._renderBlocks()}
          ${this._config.show_wallet===!0?p`<hr />${this._renderWallet()}`:d}
        </div>
      </ha-card>
    `}_renderStatus(e){let s=this._t("unknown"),i="unknown";if(e===!0)s=this._t("online"),i="online";else if(e===!1){i="offline",s=this._t("offline");let o=this.hass?.states[this._entities.status??""]?.last_changed;if(o!=null){let r=new Date(o).toLocaleTimeString(this.hass?.locale?.language,{hour:"2-digit",minute:"2-digit"});s=this._t("offlineSince",{time:r})}}return p`
      <button class="plain status ${i}" @click=${()=>{this._moreInfo("status")}}>
        ${s}
      </button>
    `}_renderHero(){let e=this._value("total_gain_of_day"),s=this._unit("total_gain_of_day","MAS"),i=e===void 0||e===0?"":e>0?"positive":"negative",o=this._config.show_history!==!1,r=Ft(this._pastGains,e,7),a=r.filter(c=>c!==null&&!c.live),l=a.length>0?a.reduce((c,u)=>c+u.value,0)/a.length:void 0;return p`
      <div class="hero">
        <button class="plain gain" @click=${()=>{this._moreInfo("total_gain_of_day")}}>
          <span class="label">${this._t("gainOfDay")}</span>
          <span class="gain-value ${i}">
            ${this._format(e,2,!0)}<span class="unit">${s}</span>
          </span>
          ${o?p`<span class="average">
                ${l===void 0?this._t("noHistory"):this._t("average",{value:`${this._format(l,2)} ${s}`,days:a.length})}
              </span>`:d}
        </button>
        ${o?this._renderDays(r,s):d}
      </div>
    `}_renderDays(e,s){let i=Math.max(1,...e.map(a=>Math.abs(a?.value??0))),o=this.hass?.locale?.language??this.hass?.language,r=new Date;return p`
      <div class="days" role="img" aria-label=${this._t("gainOfDay")}>
        ${e.map((a,l)=>{let c=new Date(r);c.setDate(c.getDate()-(e.length-1-l));let u=c.toLocaleDateString(o,{weekday:"narrow"}),h=c.toLocaleDateString(o,{weekday:"long",day:"numeric",month:"long"});if(a===null)return p`
              <div class="day" title=${h}>
                <div class="bar-track"><div class="bar empty"></div></div>
                <span class="day-letter">${u}</span>
              </div>`;let m=Math.max(6,Math.abs(a.value)/i*100),f=[a.live?"live":"",a.value<0?"negative":""].join(" ");return p`
            <div class="day" title="${h}
${this._format(a.value,2,!0)} ${s}">
              <div class="bar-track">
                <div class="bar ${f}" style="height: ${m}%"></div>
              </div>
              <span class="day-letter ${a.live?"live":""}">${u}</span>
            </div>`})}
      </div>
    `}_renderFigures(){let e=(i,o,r,a="")=>p`
      <button class="plain figure" @click=${()=>{this._moreInfo(i)}}>
        <span class="label">${o}</span>
        <span class="figure-value">${r}${a!==""?p`<span class="unit">${a}</span>`:d}</span>
      </button>
    `,s=this._value("current_cycle");return p`
      <div class="figures">
        ${e("active_rolls",this._t("activeRolls"),this._format(this._value("active_rolls"),0))}
        ${e("massa_price",this._t("price"),this._format(this._value("massa_price"),4),this._unit("massa_price","USDT"))}
        ${s!==void 0?e("current_cycle",this._t("cycle"),this._format(s,0)):d}
      </div>
    `}_renderBlocks(){let e=this._value("produced_block")??0,s=this._value("missed_block")??0,i=e+s,o=i>0?e/i*100:void 0;return p`
      <button class="plain blocks" @click=${()=>{this._moreInfo("missed_block")}}>
        <div class="blocks-head">
          <span class="label">${this._t("blocks")}</span>
          <span class="blocks-rate">${o===void 0?"":`${this._format(o,o===100?0:1)} %`}</span>
        </div>
        <div class="meter" aria-hidden="true">
          ${i>0?p`
              <span class="produced" style="flex: ${e}"></span>
              ${s>0?p`<span class="missed" style="flex: ${s}"></span>`:d}`:d}
        </div>
        <div class="counts">
          ${i>0?p`
              <span>${this._t("produced",{count:this._format(e,0)})}</span>
              <span class="missed-count ${s>0?"has-missed":""}">
                ${this._t("missed",{count:this._format(s,0)})}
              </span>`:p`<span>${this._t("noBlocks")}</span>`}
        </div>
      </button>
    `}_renderWallet(){let e=this._value("wallet_amount_with_rolls"),s=this._value("wallet_amount"),i=this._value("total_amount"),o=this._value("active_rolls"),r=this._unit("wallet_amount_with_rolls","MAS");return p`
      <button class="plain wallet" @click=${()=>{this._moreInfo("wallet_amount_with_rolls")}}>
        <span class="label">${this._t("wallet")}</span>
        <span class="wallet-amount">${this._format(e,2)} ${r}</span>
        <span class="wallet-detail">
          ${this._t("walletDetail",{balance:`${this._format(s,2)} ${r}`,rolls:this._format(o,0)})}
        </span>
        <span class="wallet-value">≈ ${this._format(i,2)} ${this._unit("total_amount","USDT")}</span>
      </button>
    `}};$.styles=Bt,_([k({attribute:!1})],$.prototype,"hass",2),_([N()],$.prototype,"_config",2),_([N()],$.prototype,"_pastGains",2),$=_([K(W)],$);window.customCards=window.customCards??[];window.customCards.push({type:W,name:"Massa Node Card",description:"Follow the gain, rolls and blocks of your Massa node.",preview:!0,documentationURL:"https://github.com/kevin-briand/HA-massa-node-card"});export{$ as MassaNodeCard};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/

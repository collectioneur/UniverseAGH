(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1407:(e,t,n)=>{Promise.resolve().then(n.bind(n,1948)),Promise.resolve().then(n.bind(n,9843)),Promise.resolve().then(n.bind(n,40)),Promise.resolve().then(n.t.bind(n,7970,23))},1948:(e,t,n)=>{"use strict";n.d(t,{default:()=>x});var s=n(5155),r=n(2115),o=n(5592),l=n(6745),i=n(40);function a(){let{points:e,path:t,zoom:n}=(0,i.k)(),[l,a]=(0,r.useState)(2/n),c=(e,t,n)=>"".concat(Math.min(e/n,t));return(0,s.jsxs)("svg",{children:[(0,s.jsx)("defs",{children:(0,s.jsxs)("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[(0,s.jsx)("stop",{offset:"0%",stopColor:"#C73E3E"}),(0,s.jsx)("stop",{offset:"100%",stopColor:"#F58584"})]})}),(0,s.jsx)("polyline",{points:t.map(e=>{let[t,n]=e;return"".concat((t-o.s.xMin)*15e3,",").concat((o.s.yMax-n)*15e3)}).join(" "),fill:"none",stroke:"url(#lineGradient)",strokeWidth:"".concat(c(6,2,n)),strokeLinecap:"round",strokeLinejoin:"round"}),e.map((e,t)=>(0,s.jsxs)("svg",{children:[(0,s.jsx)("image",{href:"/pointer.svg",x:"".concat((e.coordinates[0]-o.s.xMin)*15e3-c(20,10,n)/2),y:"".concat((o.s.yMax-e.coordinates[1])*15e3-c(20,10,n)),width:"".concat(c(20,10,n)),height:"".concat(c(20,10,n))},t),(0,s.jsx)("text",{x:"".concat((e.coordinates[0]-o.s.xMin)*15e3),y:"".concat((o.s.yMax-e.coordinates[1])*15e3-1.05*c(20,10,n)),fill:"rgba(var(--foreground), 1)",stroke:"black",strokeWidth:"".concat(c(.5,.25,n)),textAnchor:"middle",fontWeight:"800",fontSize:"".concat(c(10,5,n)),children:t+1})]},t))]})}function c(){let{features:e,zoom:t,containerRef:n,svgRef:r}=(0,i.k)(),{convertToSVGCoordinates:a}=(0,l.A)(),c=[(o.s.xMax-o.s.xMin)*o.h,(o.s.yMax-o.s.yMin)*o.h],d={parking:"#7A706E"},u={grass:"#4B7A61",agh:"#42195055"},h={university:"#FAC7BD",sports_centre:"#FAC7BD",dormitory:"#CFFFF5",library:"#FAC7BD"},x=e=>{let[s,o]=e,l=a([s,o]).split(","),i=r.current.getBoundingClientRect(),d=n.current.getBoundingClientRect(),u=l[0]/c[0]*i.width+i.left,h=l[1]/c[1]*i.height+i.top,x=20*t;return!(u+x<d.left)&&!(u-x>d.left+d.width)&&!(h+x<d.top)&&!(h-x>d.top+d.height)};return(0,s.jsxs)("svg",{children:[(0,s.jsxs)("defs",{children:[(0,s.jsx)("filter",{id:"glow",children:(0,s.jsx)("feDropShadow",{dx:"0",dy:"0",stdDeviation:"0.5",floodColor:"white"})}),(0,s.jsx)("filter",{id:"blur",children:(0,s.jsx)("feGaussianBlur",{in:"SourceGraphic",stdDeviation:"5"})})]}),e.map((e,n)=>{let{geometry:r,properties:o}=e;if("LineString"===r.type){let e=r.coordinates.map(e=>{let[t,n]=e;return a([t,n])}).join(" ");return(0,s.jsx)("polyline",{points:e,stroke:"#f2f2f288",fill:"none",strokeWidth:"0.25"},n)}return"Polygon"===r.type&&2**(o.zoom-1)<=t&&(x(o.centroid)||"agh"===o.landuse)?r.coordinates.map((e,t)=>{let r=e.map(e=>{let[t,n]=e;return a([t,n])}).join(" "),l=h[o.building]||u[o.landuse]||d[o.amenity]||"#655C7A",i=h[o.building]?"url(#glow)":"agh"===o.landuse?"url(#blur)":"";return(0,s.jsx)("polygon",{points:r,fill:l,filter:i},"".concat(n,"-").concat(t))}):null}),e.map((e,n)=>{let{geometry:r,properties:o}=e;if("Polygon"===r.type&&2**(o.zoom-1)<=t){let e=o.ref||o.name||"",t=a(o.centroid).split(",");return(0,s.jsx)("text",{x:t[0],y:t[1],fill:"rgba(var(--foreground), 1)",textAnchor:"middle",fontWeight:"800",fontSize:"1",stroke:"black",strokeWidth:"0.05",children:e},n)}return null})]})}function d(){let{pathFinderIsOn:e}=(0,i.k)(),{handlePathFinderToggle:t}=(0,l.A)();return(0,s.jsx)("div",{className:"flex items-center",children:(0,s.jsxs)("label",{htmlFor:"toggle",className:"flex items-center cursor-pointer",children:[(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("input",{type:"checkbox",id:"toggle",className:"sr-only"}),(0,s.jsx)("div",{className:"block bg-transparent border w-14 h-8 rounded-full",onClick:t}),(0,s.jsx)("div",{onClick:t,className:"dot absolute ".concat(e?"translate-x-7":"translate-x-1"," bg-foreground top-1 w-6 h-6 rounded-full transition-transform\nduration-300 ease-in-out\n")})]}),(0,s.jsxs)("div",{className:"ml-3 font-bold",children:[(0,s.jsx)("p",{className:"opacity-50 px-2",children:e?"Off":"On"}),(0,s.jsx)("p",{className:"scale-[1.2] text-background rounded-[10px] bg-foreground px-2",children:e?"On":"Off"})]})]})})}function u(){let{points:e,distance:t,pathFinderIsOn:n}=(0,i.k)(),{findShortestPath:r,deletePoint:o,swapPoints:a}=(0,l.A)();return(0,s.jsxs)("div",{className:"flex flex-col justify-between items-start p-4 fixed bottom-0 gap-5 left-0 z-10 bg-background/[.8] backdrop-blur rounded-tr-[15px] transition-opacity",children:[(0,s.jsxs)("div",{id:"togglePathFinder",className:"flex justify-between items-center w-full pointer-events-auto",children:[(0,s.jsx)("h2",{className:"font-bold text-2xl",children:"Path Finder"}),(0,s.jsx)(d,{})]}),(0,s.jsxs)("div",{className:"flex justify-between items-center min-w-[250px] w-full ".concat(n?"pointer-events-auto opacity-100":"pointer-events-none opacity-50"),children:[(0,s.jsx)("button",{onClick:r,className:" p-2 rounded-full bg-customred/75 font-bold",children:"Find path"}),(0,s.jsx)("div",{children:(0,s.jsxs)("h3",{className:"font-semibold",children:[(0,s.jsx)("span",{className:"font-bold",children:"Distance:"})," ",t," m"]})})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"font-bold text-center",children:"Points:"}),(0,s.jsx)("div",{className:"pl-5",children:(0,s.jsx)("div",{className:"h-full",children:e.map((t,n)=>(0,s.jsxs)("div",{className:"flex flex-col justify-center w-full",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center font-semibold w-full",children:[(0,s.jsxs)("p",{children:[n+1," point: ",t.location]}),(0,s.jsx)("button",{className:"p-2",onClick:e=>{o(n)},children:(0,s.jsx)("svg",{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("image",{href:"/delete.svg",x:"0",y:"0",width:"20",height:"20"})})})]}),n<e.length-1&&(0,s.jsx)("button",{className:"p-2 absolute left-0 origin-center translate-y-1/2",onClick:e=>{a(n,n+1)},children:(0,s.jsx)("svg",{width:"30",height:"30",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("image",{href:"/swap.svg",x:"0",y:"0",width:"30",height:"30"})})})]},n))})})]})]})}let h=()=>{let{center:e,setCenter:t,zoom:n,setZoom:s,containerRef:o,isDragging:a,setIsDragging:c,startPoint:d,setStartPoint:u,svgRef:h}=(0,i.k)(),{chooseNewPoint:x}=(0,l.A)();(0,r.useEffect)(()=>{o.current&&o.current.getBoundingClientRect()},[]);let f=(n,s)=>{t([e[0]+n,e[1]+s])},p=e=>{s(t=>Math.max(1,Math.min(t*e,10)))};return{handleMouseDown:e=>{u({x:e.clientX,y:e.clientY})},handleMouseMove:e=>{if(!d)return;let t=e.clientX-d.x,n=e.clientY-d.y,s=Math.sqrt(t**2+n**2);!a&&s>0&&c(!0),d&&a&&(u({x:e.clientX,y:e.clientY}),f(t,n))},handleMouseUp:e=>{a?c(!1):x(e),u(null)},handleWheel:e=>{e.preventDefault();let t=h.current.getBoundingClientRect(),{clientX:s,clientY:r,deltaY:o}=e,l=s-t.left,i=r-t.top,a=Math.exp(-(.005*o)),c=n*a;c>10||c<1||(f(l*(1-a),i*(1-a)),p(a))}}},x=()=>{let{svgRef:e,center:t,zoom:n,containerRef:r,isDragging:l}=(0,i.k)(),{handleMouseDown:d,handleMouseMove:x,handleMouseUp:f,handleWheel:p}=h();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"relative overflow-hidden h-screen flex items-center",ref:r,children:(0,s.jsxs)("svg",{ref:e,xmlns:"http://www.w3.org/2000/svg",className:"absolute",onMouseDown:d,onMouseMove:x,onMouseUp:f,onWheel:p,viewBox:"0 0 ".concat((o.s.xMax-o.s.xMin)*o.h," ").concat((o.s.yMax-o.s.yMin)*o.h),style:{transform:"translate(".concat(t[0],"px, ").concat(t[1],"px) scale(").concat(n,")"),transformOrigin:"0 0",cursor:l?"grabbing":"grab"},children:[(0,s.jsx)(c,{}),(0,s.jsx)(a,{})]})}),(0,s.jsx)(u,{})]})}},9843:(e,t,n)=>{"use strict";n.d(t,{default:()=>i});var s=n(5155);n(5565);var r=n(40),o=n(2115),l=n(6745);function i(){let{searchCategories:e}=(0,r.k)(),[t,n]=(0,o.useState)(""),[i,a]=(0,o.useState)([]),{findSearchResults:c,addNewPoint:d}=(0,l.A)();return(0,s.jsxs)("div",{className:"mx-auto w-[200px] md:w-[375px] lg:w-[500px] flex-none relative",children:[(0,s.jsx)("div",{className:"flex items-center justify-center gap-2 relative z-[1] ",children:(0,s.jsx)("input",{type:"text",placeholder:"Search here",value:t,onChange:e=>{let t=e.target.value;n(t),""!=t?a(c(t)):a([])},className:"px-2 py-1 w-full rounded-full text-xl font-semibold border border-foreground bg-transparent placeholder:font-semibold outline-none placeholder-foreground/[.5]"})}),(0,s.jsx)("div",{className:"absolute top-0 left-0 right-0 rounded-[18px] pt-[36px] bg-background border ".concat(i.length?"p-2":""),children:i.map((e,t)=>t<5?(0,s.jsx)("button",{className:"border rounded-[18px] mr-2 mt-2",onClick:()=>{d(e.coordinates),n(""),a([])},children:(0,s.jsx)("div",{className:"flex items-center justify-between p-2",children:(0,s.jsx)("h3",{className:"font-semibold",children:e.name})})},t):null)})]})}},40:(e,t,n)=>{"use strict";n.d(t,{MapProvider:()=>l,k:()=>i});var s=n(5155),r=n(2115);let o=(0,r.createContext)(),l=e=>{let{children:t}=e,[n,l]=(0,r.useState)([]),[i,a]=(0,r.useState)(!0),[c,d]=(0,r.useState)(null),[u,h]=(0,r.useState)([]),[x,f]=(0,r.useState)(0),[p,g]=(0,r.useState)([]),[m,j]=(0,r.useState)([]),v=(0,r.useRef)({}),[b,y]=(0,r.useState)([0,0]),[w,M]=(0,r.useState)(1),N=(0,r.useRef)({}),[k,C]=(0,r.useState)(!1),[S,P]=(0,r.useState)(null),[F,A]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{(async()=>{a(!0);try{let[e,t,n,s]=await Promise.all([fetch("/agh-map-points.json"),fetch("/agh-map-poligons.json"),fetch("/agh-map-lines.json"),fetch("/graph.json")]),r=await e.json(),o=await t.json(),i=await n.json(),c=await s.json(),d=[...r.features,...o.features,...i.features];l(d),j(c),a(!1)}catch(e){d(e),a(!1)}})()},[]),(0,s.jsx)(o.Provider,{value:{features:n,setFeatures:l,loading:i,setLoading:a,error:c,setError:d,points:u,setPoints:h,distance:x,setDistance:f,path:p,setPath:g,graph:m,setGraph:j,svgRef:v,center:b,setCenter:y,zoom:w,setZoom:M,containerRef:N,isDragging:k,setIsDragging:C,startPoint:S,setStartPoint:P,pathFinderIsOn:F,setPathFinderIsOn:A},children:t})},i=()=>(0,r.useContext)(o)},6745:(e,t,n)=>{"use strict";n.d(t,{A:()=>a}),n(2115);var s=n(5592);function r(e,t,n,s){return Math.sqrt((71298*Math.abs(e-n))**2+(111111*Math.abs(t-s))**2)}var o=n(7793);function l(e,t){let[n,s]=e,o=1/0,l=null;for(let e in t){let[t,i]=e.split(",").map(Number),a=r(n,s,t,i);a<o&&(o=a,l="".concat(t,",").concat(i))}return[l,o]}var i=n(40);let a=function(){let{features:e,setFeatures:t,loading:n,setLoading:a,error:c,setError:d,points:u,setPoints:h,distance:x,setDistance:f,path:p,setPath:g,graph:m,setGraph:j,svgRef:v,setPathFinderIsOn:b,pathFinderIsOn:y}=(0,i.k)(),w=()=>{h([]),f(0),g([])},M=t=>{if(u.length<5){let n,s;let o=(n="",s=1/0,e.forEach(e=>{let{properties:o,geometry:l}=e;if("LineString"===l.type)return;let i="Point"===l.type?l.coordinates:o.centroid,a=r(t[0],t[1],i[0],i[1]);a<s&&(o.name||o.ref)&&(s=a,n=o.name||o.ref)}),n);h([...u,{coordinates:t,location:o}])}else alert("You can only choose up to 5 points")};return{findShortestPath:e=>{e.preventDefault();let[t,n]=function(e,t){let n=0,s=[];for(let r=0;r<e.length-1;r++){let[i,a]=l(e[r].coordinates,t),[c,d]=l(e[r+1].coordinates,t),u=new Map,h=new Map,x=new Set;for(let e in t)u.set(e,1/0);u.set(i,a);let f=new o({comparator:(e,t)=>e[0]-t[0]});for(f.queue([a,i]);f.length>0;){let[e,n]=f.dequeue();if(!x.has(n))for(let[s,r]of(x.add(n),t[n])){let t=e+r;t<u.get(s)&&(u.set(s,t),h.set(s,n),f.queue([t,s]))}}let p=[];for(let e=c;e!==i;e=h.get(e))p.push(e.split(",").map(Number));p.push(i.split(",").map(Number)),n+=u.get(c)+d,s.push(...p.reverse())}return[n,s]}(u,m);f(t.toFixed(0)),g(n)},chooseNewPoint:e=>{let{clientX:t,clientY:n}=e,r=e.currentTarget.getBoundingClientRect().width,o=e.currentTarget.getBoundingClientRect().height,l=e.currentTarget.getBoundingClientRect().left,i=e.currentTarget.getBoundingClientRect().top,a=(t-l)/r*(s.s.xMax-s.s.xMin)+s.s.xMin,c=s.s.yMax-(n-i)/o*(s.s.yMax-s.s.yMin);g([]),y&&M([a,c]),f(0)},convertToSVGCoordinates:e=>{let[t,n]=e;return"".concat((t-s.s.xMin)*s.h,",").concat((s.s.yMax-n)*s.h)},deletePoint:e=>{h(u.filter((t,n)=>n!==e)),g([]),f(0)},swapPoints:(e,t)=>{let n=[...u],s=n[e];n[e]=n[t],n[t]=s,h(n),g([]),f(0)},handlePathFinderToggle:()=>{y&&w(),b(!y)},findSearchResults:t=>e.filter(e=>e.properties.name&&e.properties.name.toLowerCase().includes(t.toLowerCase())).map(e=>"Point"===e.geometry.type?{name:e.properties.name,coordinates:e.geometry.coordinates}:"LineString"===e.geometry.type?{name:e.properties.name,coordinates:e.geometry.coordinates[0]}:"Polygon"===e.geometry.type?{name:e.properties.name,coordinates:e.properties.centroid}:void 0),addNewPoint:M}}},5592:(e,t,n)=>{"use strict";n.d(t,{h:()=>r,s:()=>s});let s={xMin:19.8994187190269,xMax:19.924686785344647,yMin:50.06356250419583,yMax:50.07073872149052},r=15e3}},e=>{var t=t=>e(e.s=t);e.O(0,[141,441,517,358],()=>t(1407)),_N_E=e.O()}]);
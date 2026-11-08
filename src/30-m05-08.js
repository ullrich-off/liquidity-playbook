<script>
/* ================= MODULE 5: BREAK OF STRUCTURE ================= */
FIG.bosSweep=()=>{const c=chain(100,[102,105,108,106,104,107,110,112.5,110,108.5,[113,3,.8],110.5,106.8,104.5,106,103],5);
  return candleChart({c,w:780,h:380,y:[96,122],alt:'Sweep of a high followed by a bearish break of structure',a:[
  {t:'hline',p:'h7',i1:7,i2:10,cls:'k-liq',s:'old high',la:'l'},
  {t:'hline',p:'l9',i1:9,i2:12,cls:'k-bad'},{t:'text',i:9.6,p:'l9',dy:17,s:'most recent low (the line to beat)',cls:'k-bad',anc:'start'},
  {t:'tag',i:10,p:'h10',dy:-9,s:'1  SWEEP',cls:'k-liq',anc:'middle'},{t:'tag',i:12,p:'l12',dy:26,s:'2  CLOSE BELOW = BOS',cls:'k-bad',anc:'middle'},
  {t:'arrow',i1:12.4,p1:'l12-.5',i2:15,p2:'l15+1',cls:'k-bad',s:'new downtrend',dx:6,dy:20}]})};
FIG.bosBull=()=>{const c=flip(chain(100,[102,105,108,106,104,107,110,112.5,110,108.5,[113,3,.8],110.5,106.8,104.5,106,103],5),108);
  return candleChart({c,w:780,h:380,y:[94,120],alt:'Sweep of a low followed by a bullish break of structure',a:[
  {t:'hline',p:'l7',i1:7,i2:10,cls:'k-liq',s:'old low',la:'l',below:1},
  {t:'hline',p:'h9',i1:9,i2:12,cls:'k-bad'},{t:'text',i:9.6,p:'h9',dy:-7,s:'most recent high (the line to beat)',cls:'k-bad'},
  {t:'tag',i:10,p:'l10',dy:26,s:'1  SWEEP',cls:'k-liq',anc:'middle'},{t:'tag',i:12,p:'h12',dy:-9,s:'2  CLOSE ABOVE = BOS',cls:'k-good',anc:'middle'},
  {t:'arrow',i1:12.4,p1:'h12+.5',i2:15,p2:'h15-1',cls:'k-good',s:'new uptrend',dx:6,dy:-14}]})};
WID.bosTest=el=>{
  const base=chain(100,[104,108,105,102,106,110,114,111,108.2],5),L=base[8].l;
  el.innerHTML=`<div class="wid-h">Wick or close? Test the break<span>Interactive</span></div><div class="wid-b"><div class="ctl"><div style="grid-column:1/-1"><label for="bosR">Where does the next candle CLOSE? (its wick always pokes 2 points below the line) <output id="bosO"></output></label><input id="bosR" type="range" min="-35" max="35" value="12"></div></div><div id="bosC"></div><div class="read" id="bosT"></div></div>`;
  const draw=()=>{const v=+$('#bosR',el).value/10,c=L+v,o=108.2,k={o,c,h:Math.max(o,c)+.6,l:Math.min(c,L-2)-.2},below=c<L;
    $('#bosO',el).textContent=(v>=0?'+':'')+v.toFixed(1)+' vs line';
    $('#bosC',el).innerHTML=candleChart({c:[...base,k],w:760,h:300,y:[96,118],alt:'Candle testing the most recent low',a:[{t:'hline',p:L,i1:8,i2:9,cls:'k-bad',s:'most recent low',la:'l'}]});
    $('#bosT',el).innerHTML=below?`<b style="color:var(--bad)">Structure broken.</b> The body closed ${Math.abs(v).toFixed(1)} below the most recent low. Bullish market structure has shifted: this is a break of structure (BOS).`:`<b style="color:var(--good)">Structure intact.</b> Price wicked below the line but the candle closed ${v.toFixed(1)} above it. A wick is not a break. The uptrend is still valid, and you may just have witnessed a sweep.`};
  $('#bosR',el).addEventListener('input',draw);draw()};
PAGES.push({id:'m05',part:'III',n:5,title:'Break of Structure',min:16,level:'Core concept',src:'Source: lesson "Break of Structure Explained"',
lead:'Liquidity tells you where orders may be filled. Break of structure tells you whether they actually were. It is the first and simplest confirmation tool.',
goals:['Define bullish and bearish market structure precisely','Identify which swing point to monitor at any moment','Distinguish a wick through a level from a true candle close','Explain how a break of structure confirms a liquidity sweep'],
html:`
<h2>Market structure in one paragraph</h2>
<p>An uptrend is a series of higher highs and higher lows; that is <b>bullish market structure</b>. A downtrend is lower highs and lower lows; <b>bearish market structure</b>. A <b>break of structure (BOS)</b> is the moment the current structure fails: the market stops doing what it has been doing and starts doing the opposite.</p>
<h2>The rule</h2>
${KEY('<p><b>To break bullish structure</b> a candle must <b>close</b> below the <b>most recent swing low</b>. <b>To break bearish structure</b> a candle must <b>close</b> above the <b>most recent swing high</b>.<br>Wicks do not count. Older swings do not count. Only the most recent one in the trend counts.</p>')}
<p>Think of it as monitoring one line at a time. In an uptrend you watch the latest low (highs do not matter for breaking). In a downtrend you watch the latest high. When the monitored swing is replaced by a new one, the line moves with it.</p>
${W_('bosTest')}
<h2>Seeing it on a chart</h2>
${F2('bosSweep','bosBull','A sweep of liquidity (step 1) followed by a candle close beyond the most recent opposite swing (step 2). The left example breaks down, the right example breaks up.','Bearish BOS after a high is swept','Bullish BOS after a low is swept','Sweep + break of structure')}
<h2>Common traps</h2>
<ul><li><b>Lower high alone.</b> In an uptrend, one lower high is not a break. You are only watching lows for a bearish break.</li>
<li><b>Using the wrong low.</b> A drastically lower low whose candle did not <em>close</em> beyond the monitored low is still not a break. Keep monitoring.</li>
<li><b>Closing exactly at the line.</b> If the body only equals the level, it is not a close below. Wait for a candle that clearly closes beyond.</li></ul>
${WARN('<p>Selling the instant a wick pokes through a low. The moment before a real BOS often looks identical to a sweep. The candle close is the filter.</p>')}
<h2>Where it fits in the strategy</h2>
<p>Here is the logic in the instructor's own sequence. Liquidity gives the <em>opportunity</em> for orders to be filled. A BOS on a lower time frame is the <em>confirmation</em> that they were filled: after taking a high, the market changed from making higher lows to breaking one. That is why the lesson calls it a <b>confirmation confluence</b>.</p>
<p>It is still not a trade on its own. The new trend might be only a retrace inside a bigger move, so you also want proof that the new direction continues. That is the job of the next confluences.</p>`,
recap:['Bullish structure = HH + HL. Bearish = LH + LL.','A BOS needs a candle CLOSE beyond the most recent swing in the trend. Wicks do not count.','In an uptrend monitor the latest low. In a downtrend monitor the latest high.','BOS is a confirmation confluence: it confirms orders were filled after a sweep.','It is never a trade by itself.']});
QZ.m05=[
{q:'Price is in an uptrend. A candle wicks 3 points below the most recent low but closes above it. What happened?',o:['A BOS','Structure is intact; this was likely a sweep','The trend reversed','The low was invalid'],a:1,w:'Only a candle close beyond the swing breaks structure.'},
{q:'In a downtrend, which swing do you monitor for a bullish BOS?',o:['Any old high','The most recent high','The most recent low','The 50% level'],a:1,w:'A bullish break needs a close above the most recent swing high of the downtrend.'},
{q:'Why does the instructor call BOS a "confirmation confluence"?',o:['It confirms that price will continue forever','It confirms that orders were filled, since the market changed direction after the sweep','It is guaranteed to win','It confirms news data'],a:1,w:'A sweep is only an opportunity. BOS shows the market actually turned.'},
{q:'In an uptrend, price makes one lower high. Has structure broken?',o:['Yes, always','No. Only a close below the most recent low breaks bullish structure','Yes, if volume is high','Only on the daily chart'],a:1,w:'You monitor lows to break an uptrend.'}];

/* ================= MODULE 6: FAIR VALUE GAPS ================= */
const _fvg=()=>[...chain(100,[100.6,100.2,100.9],2),K(100.9,101.2,.9,.8),K(101.2,110,.5,.3),K(110,111,1,2.2),K(111,107.2,.8,1.4),K(107.2,111,.6,.8),K(111,115,.6,.8),K(115,118,1,.8)];
FIG.fvgBull=()=>candleChart({c:_fvg(),w:520,h:360,y:[96,124],alt:'Bullish fair value gap',a:[
  {t:'zone',i1:3,i2:9,p1:'h3',p2:'l5',cls:'k-blue',s:'BULLISH FVG',la:'br'},
  {t:'text',i:3,p:'h3',dy:-8,s:'1',cls:'k-ink',anc:'middle',big:1},{t:'text',i:4,p:'h4',dy:-8,s:'2',cls:'k-ink',anc:'middle',big:1},{t:'text',i:5,p:'h5',dy:-8,s:'3',cls:'k-ink',anc:'middle',big:1},
  {t:'dot',i:6,p:'l6',cls:'k-liq',s:'retrace into gap',dx:-9,anc:'end',dy:14},{t:'arrow',i1:7.3,p1:'c7',i2:9,p2:'h9+2',cls:'k-good'}]});
FIG.fvgBear=()=>candleChart({c:flip(_fvg(),106),w:520,h:360,y:[88,116],alt:'Bearish fair value gap',a:[
  {t:'zone',i1:3,i2:9,p1:'l3',p2:'h5',cls:'k-blue',s:'BEARISH FVG',la:'tr'},
  {t:'text',i:3,p:'l3',dy:19,s:'1',cls:'k-ink',anc:'middle',big:1},{t:'text',i:4,p:'l4',dy:19,s:'2',cls:'k-ink',anc:'middle',big:1},{t:'text',i:5,p:'l5',dy:19,s:'3',cls:'k-ink',anc:'middle',big:1},
  {t:'dot',i:6,p:'h6',cls:'k-liq',s:'retrace into gap',dx:-9,anc:'end',dy:-3},{t:'arrow',i1:7.3,p1:'c7',i2:9,p2:'l9-2',cls:'k-bad'}]});
FIG.fvgNot=()=>{const c=[...chain(100,[100.4,100.1],2),K(100.1,104,1,1),K(104,110,.5,.3),K(110,108,1,5),K(108,112,.5,.5),K(112,114.5,.7,.5)];
  return candleChart({c,w:700,h:340,y:[96,120],alt:'Overlapping wicks are not a fair value gap',a:[{t:'zone',i1:2,i2:4,p1:'l4',p2:'h2',cls:'k-bad',s:'wicks overlap:\nnothing is missing,\nso no imbalance',la:'tl'},
  {t:'text',i:2,p:'l2',dy:18,s:'1',cls:'k-ink',anc:'middle',big:1},{t:'text',i:3,p:'l3',dy:18,s:'2',cls:'k-ink',anc:'middle',big:1},{t:'text',i:4,p:'l4',dy:18,s:'3',cls:'k-ink',anc:'middle',big:1}]})};
FIG.fvgStack=()=>{const c=[K(100,101,1,.5),K(101,108,.5,.2),K(108,109,.5,2),K(109,116,.5,.2),K(116,117,.5,2.5),K(117,119,1,.7),K(119,115,.8,.6),K(115,113,.5,1.2),K(113,118,.6,.5),K(118,122,1,.6),K(122,121,1,.8),K(121,124,.8,.6)];
  return candleChart({c,w:780,h:400,y:[96,130],alt:'Stacked fair value gaps and what to do after price moves on',a:[
  {t:'zone',i1:0,i2:9,p1:'h0',p2:'l2',cls:'k-mute',s:'FVG #1: never needed',la:'bl'},{t:'zone',i1:2,i2:9,p1:'h2',p2:'l4',cls:'k-blue',s:'FVG #2: price taps it',la:'tr'},
  {t:'dot',i:7,p:'l7',cls:'k-liq',s:'tap and bounce',dx:-9,anc:'end',dy:14},{t:'tag',i:9,p:'h9',dy:-10,s:'NEW HIGH: both gaps are finished. Delete them.',cls:'k-ink',anc:'end'}]})};
WID.fvgLab=el=>{
  el.innerHTML=`<div class="wid-h">FVG detector: is there a gap?<span>Interactive</span></div><div class="wid-b"><div class="seg" id="fvgD"><button type="button" aria-pressed="true" data-d="up">Bullish pattern</button><button type="button" aria-pressed="false" data-d="dn">Bearish pattern</button></div>
  <div class="ctl"><div><label for="fvgA">Candle 1 upper wick tip <output id="fvgAO"></output></label><input id="fvgA" type="range" min="1010" max="1100" value="1030"></div><div><label for="fvgB">Candle 3 lower wick tip <output id="fvgBO"></output></label><input id="fvgB" type="range" min="1000" max="1090" value="1065"></div></div><div id="fvgC"></div><div class="read" id="fvgT"></div></div>`;
  let dir='up';
  const draw=()=>{const a=+$('#fvgA',el).value/10,b=+$('#fvgB',el).value/10;
    $('#fvgAO',el).textContent=a.toFixed(1);$('#fvgBO',el).textContent=b.toFixed(1);
    let c=[{o:100,c:101,h:a,l:99},{o:101,c:112,h:112.5,l:100.8},{o:112,c:113.5,h:114.5,l:b}];
    const gap=b-a;let an=[];
    if(dir==='dn')c=flip(c,106.25);
    const g=dir==='up'?gap:gap;
    if(g>0)an.push({t:'zone',i1:0,i2:2,p1:dir==='up'?'h0':'l0',p2:dir==='up'?'l2':'h2',cls:'k-blue',s:'FVG',la:'c'});
    else an.push({t:'zone',i1:0,i2:2,p1:dir==='up'?'l2':'h2',p2:dir==='up'?'h0':'l0',cls:'k-bad',s:'overlap',la:'c'});
    $('#fvgC',el).innerHTML=candleChart({c,w:760,h:300,y:dir==='up'?[96,118]:[94.5,116.5],alt:'Three-candle pattern',a:an});
    $('#fvgT',el).innerHTML=g>0?`<b style="color:var(--blue)">${dir==='up'?'Bullish':'Bearish'} fair value gap, ${g.toFixed(1)} points wide.</b> Nothing traded in that zone between the first and third candle, so ${dir==='up'?'sell':'buy'} orders are thin there. Expect price to be drawn back into it, and watch for a reaction.`:`<b style="color:var(--bad)">Not a fair value gap.</b> The wicks of candles 1 and 3 overlap by ${Math.abs(g).toFixed(1)} points, so orders traded across the whole range. No imbalance. Colour of the outer candles never matters, only the wicks.`};
  $$('#fvgD button',el).forEach(b=>b.addEventListener('click',()=>{dir=b.dataset.d;$$('#fvgD button',el).forEach(x=>x.setAttribute('aria-pressed',x===b));draw()}));
  $$('input',el).forEach(i=>i.addEventListener('input',draw));draw()};
PAGES.push({id:'m06',part:'III',n:6,title:'Fair Value Gaps',min:24,level:'Core concept',src:'Source: lesson "Fair Value Gaps Explained"',
lead:'Price is always doing one of two things: taking liquidity, or filling an imbalance. Fair value gaps are the imbalance half, and your first tool for judging whether a new move will continue.',
goals:['Identify bullish and bearish FVGs from the wicks of three candles','Explain why a gap means orders are thin on one side','Tell a real FVG from overlapping wicks','Handle stacks of gaps and know when to delete them'],
html:`
<h2>Definition</h2>
<p>A <b>fair value gap (FVG)</b>, also called an <b>imbalance</b>, is a three-candle pattern. A strong middle candle moves price quickly in one direction, leaving a zone between the first candle's wick and the third candle's wick where little or no trading happened.</p>
<ul><li><b>Bullish FVG:</b> the high of candle 1 is <em>below</em> the low of candle 3. The gap is the space between them.</li><li><b>Bearish FVG:</b> the low of candle 1 is <em>above</em> the high of candle 3.</li></ul>
${F2('fvgBull','fvgBear','Use only the wick tips of candles 1 and 3. The colour of candles 1 and 3 is irrelevant. The middle (expansion) candle is the one that creates the gap.','Bullish FVG','Bearish FVG','Three-candle imbalance')}
<h2>Why a gap is meaningful</h2>
<p>Look at candle 1 in the bullish example: price rose, then sellers pushed it back, so a stack of sells existed up to its high. Candle 3: buyers pushed price from below up through this zone. Between those two wicks, nobody sold into the move. The expansion candle simply ran through the empty space, meaning <b>sell orders were scarce</b> in that range. In a bearish FVG the scarce side is buy orders.</p>
<p>If price comes back into the gap and buyers appear, the lack of sellers above means price can move on without resistance. That is why a gap acts as a <b>continuation confluence</b>: it shows the trend can keep going.</p>
${W_('fvgLab')}
<h2>What is not a fair value gap</h2>
${F('fvgNot','The lower wick of candle 3 reaches below the upper wick of candle 1. The wicks overlap, so orders traded in the whole range. There is no imbalance.','Overlap = no FVG')}
<p>The instructor also does not trade classic candlestick patterns such as head and shoulders or double tops. The criticism is simple: those patterns say what a chart looked like, but they do not say <em>why</em> price moved. An FVG has a reason attached to it: a measurable lack of orders.</p>
<h2>When a gap is disrespected</h2>
<p>A gap is respected when price enters it and moves away in the trend direction. It is <b>disrespected</b> when a candle <b>closes</b> beyond it on the far side (the same candle-close rule as break of structure; wicks do not count). A disrespected gap is no longer valid. In the next two modules you will see that this failure is itself a signal.</p>
<h2>Stacks of gaps</h2>
<p>Strong moves often leave several gaps with no retracement between them. While they are stacked, all of them remain valid. Price may use any one of them, and closing through the first does not mean the trend is over because deeper gaps can still catch it.</p>
<p>Once price taps a gap and then pushes on to a new high (or low in a downtrend), that imbalance has done its job. <b>Delete every gap beneath the move.</b> Do not drag old gaps forward and expect them to work weeks later. The same is true for gaps price never needed: if the trend resumes without touching them, they are finished too.</p>
${F('fvgStack','Two stacked gaps. Price uses FVG #2 and rises to a new high. Neither gap should remain on the chart afterward.','Gap stack and clean-up')}
${WARN('<p>Leaving stale gaps on the chart. Later price drifts into an old gap, you short it expecting a reaction, and you get stopped out. The gap was already used.</p>')}
${WARN('<p>Pressing buy or sell the moment price touches a gap. If the candle is still forming, price can run straight through. Wait for evidence of a reaction before entering.</p>')}`,
recap:['FVG = three candles where the wicks of 1 and 3 do not overlap. Colours do not matter.','The gap marks a range where one side of orders is missing. It is a continuation confluence.','Overlapping wicks = no gap. Close beyond a gap = gap disrespected.','Stacked gaps stay valid until the trend moves on. Then delete them all.','Never trade a gap touch blindly. Look for the reaction.']});
QZ.m06=[
{q:'Which describes a bullish FVG?',o:['Candle 1 low above candle 3 high','Candle 1 high below candle 3 low, with a strong middle candle','Three green candles in a row','Any gap between two days'],a:1,w:'Bullish FVG: gap between the high of candle 1 and the low of candle 3.'},
{q:'In a bullish FVG, what is thin in the gap?',o:['Buy orders','Sell orders','Both','Neither'],a:1,w:'Price passed through quickly because there were few sellers there.'},
{q:'Candle 3 has a long lower wick that dips below the high of candle 1. Is there an FVG?',o:['Yes, always','No, the wicks overlap','Only if candle 2 is red','Only on the daily'],a:1,w:'Overlapping wicks mean orders traded across the entire range.'},
{q:'Price taps FVG #2 in a stack and then makes a new high. What do you do with the gaps?',o:['Keep both for later','Delete both; the imbalance was balanced','Move them to the daily chart','Short at the first gap'],a:1,w:'Once the imbalance is balanced and the trend moves on, the gaps are finished.'}];

/* ================= MODULE 7: ADVANCED IMBALANCES ================= */
FIG.ndog=()=>{const c=[...chain(96,[97.5,99,98.2,99.6,100],3),K(104.5,102.8,1.2,3.4),K(102.8,105.5,1,.8),K(105.5,107.5,.8,.8),K(107.5,106.8,1,.7),K(106.8,109.5,1,.7)];
  return candleChart({c,w:760,h:350,y:[92,114],alt:'Weekend opening gap filled then price continues',xl:{4:'Fri close',5:'Sun open'},a:[{t:'zone',i1:4,i2:6,p1:100,p2:104.5,cls:'k-liq',s:'OPENING GAP: unbalanced price',la:'tl'},
  {t:'dot',i:5,p:'l5',cls:'k-good',s:'gap filled, then continues',dx:12,dy:14}]})};
FIG.bpr=()=>{const c=[K(100,100.5,.6,.5),K(100.5,106,.3,.2),K(106,112,.3,.2),K(112,118,.3,.2),K(118,118.8,.8,.7),K(118.8,118.2,.9,.8),K(118.2,112,.3,.2),K(112,106,.3,.2),K(106,100.8,.3,.4),K(100.8,101.5,.6,.5),K(101.5,108,.3,.3),K(108,115,.3,.2),K(115,118.6,.5,.4),K(118.6,112,.3,.2),K(112,105,.3,.3),K(105,99.5,.3,.4)];
  return candleChart({c,w:780,h:400,y:[94,124],alt:'Balanced price range',a:[{t:'zone',i1:1,i2:8,p1:100.3,p2:118.9,cls:'k-liq',s:'ILLIQUID RANGE: swift move up, then swift move down',la:'tl'},
  {t:'arrow',i1:1,p1:'c1',i2:3,p2:'h3+2.5',cls:'k-good',s:'swift up',dx:-60,dy:10},{t:'arrow',i1:6,p1:'h6+1',i2:8,p2:'l8-2',cls:'k-bad',s:'swift down',dx:16,dy:-10},
  {t:'arrow',i1:10,p1:'l10-1',i2:12,p2:'h12+2.5',cls:'k-blue',s:'revisit: fast fill',dx:-58,dy:22},{t:'arrow',i1:13,p1:'h13+1',i2:15,p2:'l15-2',cls:'k-bad',s:'and fast again',dx:14,dy:-16}]})};
PAGES.push({id:'m07',part:'III',n:7,title:'Advanced Imbalance Concepts',min:20,level:'Advanced',src:'Source: lesson "Advanced Imbalance Concepts"',
lead:'Fair value gaps are only one kind of imbalance. Opening gaps and balanced price ranges also pull price, and knowing them gives you extra targets and entries.',
goals:['Recognise new-day, new-week and new-candle opening gaps','Rank them by usefulness','Explain what a BPR is and why a revisit tends to be fast','Use imbalances as both targets and entries'],
html:`
<p>Every imbalance is a place where price moved so quickly that a range was left lightly traded. Price tends to come back to balance it, then continue. These are not required to fill, and they are not guaranteed to react, but they carry a high probability and give the chart extra structure.</p>
${tbl(['Type','What it is','How useful'],[['New day opening gap (NDOG)','Gap between the previous day close and the next day open (about one hour of no trading)','Occasional. Often fills during Asia, which this course does not trade'],['New week opening gap (NWOG)','Gap between Friday close and Sunday open (about two days with no trading)','Better. Larger and often still open on Monday morning'],['New candle opening gap','Gap between consecutive candle close and open on any time frame','Almost useless. Markets are continuous, so these are tiny'],['BPR (balanced price range)','A swift move up through imbalance followed by a swift move down through it','Useful as a target or entry zone']])}
<h2>Opening gaps</h2>
<p>The market closes at 17:00 ET for one hour each day and for the weekend (Friday close to Sunday afternoon). If the next open is at a different price, the space between is an imbalance. Price is usually keen to revisit it quickly, then continue in its own direction.</p>
${F('ndog','Friday close at 100, Sunday open at 104.5. The very first candle drops to fill the gap, then price carries on higher.','Weekend opening gap (NWOG)')}
<p>You can use an opening gap in two ways. As a <b>target</b>: if price is far above a gap, the gap is a likely destination. As an <b>entry</b>: when price comes into the gap and shows a reaction, look for the continuation. Weekly gaps are the practical ones because Sunday trading is stagnant, so Monday often gives time to act.</p>
${TIP('<p>If a weekly gap is not filled in the first hours of the week, it becomes a high-probability target for Monday and Tuesday.</p>')}
<h2>New candle opening gaps</h2>
<p>These are the same idea on any time frame, but with no real time between one candle's close and the next open, they only appear on very small time frames and span a few ticks. The instructor describes them as nearly useless. Know they exist, then move on.</p>
<h2>BPR: balanced price range</h2>
<p>Sometimes price makes a swift move up through a series of imbalances, then a swift move down through the same area. The whole range was crossed with no resistance twice, so it is an illiquid range. When price re-enters it later, it tends to travel through just as quickly as before, and it often continues in its original direction afterward.</p>
${F('bpr','A swift rise and an equally swift decline create a thin range. On a revisit, price crosses it fast in both directions. Use it as a target or as an area to look for entries.','Balanced price range')}
<p>The instructor shared a New York trade that was taken off a BPR: a short on NASDAQ around 10:41 a.m., targeting the bottom of the range because once price re-entered it, it could drop through just as it had risen. Bearish confirmation was needed first. The imbalance told him where the trade could go, not when to enter.</p>
${KEY('<p>Price is always moving to take <b>external liquidity</b> (highs and lows) or to fill <b>internal liquidity</b> (imbalances). Fair value gaps, opening gaps and BPRs are the internal kind.</p>')}`,
recap:['Imbalances are price ranges left lightly traded. Price tends to revisit them.','NWOG > NDOG > new candle gap in usefulness.','A BPR = swift move up and swift move down through the same area. A revisit is usually fast.','All imbalances can act as targets or entries, never as standalone signals.']});
QZ.m07=[
{q:'Which gap is described as nearly useless for trading?',o:['New week opening gap','New day opening gap','New candle opening gap','Fair value gap'],a:2,w:'Candle-to-candle gaps in a continuous market are tiny and rarely tradable.'},
{q:'Why is the weekend (NWOG) gap more practical than the daily one?',o:['It is larger and often still open Monday morning','It always fills instantly','Sunday has heavy volume','It is the same as NDOG'],a:0,w:'Bigger gap, more time for action before the US session.'},
{q:'What defines a BPR?',o:['Two equal highs','A swift move through imbalance in one direction followed by a swift move back through it','Three candles with no wicks','A gap between days'],a:1,w:'The zone was crossed quickly both ways, so it is thin on both sides.'},
{q:'What do you do when an opening gap is far below price?',o:['Ignore it','Treat it as a potential target','Short it immediately','Delete it'],a:1,w:'Opening gaps are high-probability destinations.'}];

/* ================= MODULE 8: INVERSE FVG ================= */
FIG.ifvg=()=>{const c=[K(126,124,.8,.6),K(124,122,.8,.6),K(122,120,.8,.6),K(120,119,.8,1),K(119,110,.3,.5),K(110,109,2,.6),K(109,113,.6,.5),K(113,116.5,.8,.6),K(116.5,121,.8,.6),K(121,119.5,.6,.5),K(119.5,116,.8,.9),K(116,122,.7,.5),K(122,126,.8,.5),K(126,129,.8,.5)];
  return candleChart({c,w:780,h:400,y:[104,134],alt:'A bearish fair value gap is closed above and becomes support',a:[
  {t:'zone',i1:3,i2:8,p1:'h5',p2:'l3',cls:'k-bad',s:'BEARISH FVG\n(a continuation tool: expected to push price lower)',la:'bl'},
  {t:'zone',i1:8,i2:13,p1:'h5',p2:'l3',cls:'k-good',s:'INVERSE FVG\nnow acts as support',la:'br'},
  {t:'tag',i:8,p:'h8',dy:-10,s:'CANDLE CLOSES ABOVE THE GAP',cls:'k-ink',anc:'end'},{t:'dot',i:10,p:'l10',cls:'k-liq',s:'retest: holds',dx:-9,anc:'end',dy:14}]})};
FIG.ifvgStack=()=>{const c=[K(100,101,1,.5),K(101,108,.5,.2),K(108,109,.5,2),K(109,116,.5,.2),K(116,117,.5,2.5),K(117,119,1,.7),K(119,111.5,.6,.4),K(111.5,108,.5,.6),K(108,107,.6,.8),K(107,100.8,.5,.7),K(100.8,98,.6,.6)];
  return candleChart({c,w:780,h:400,y:[94,126],alt:'Stack of gaps: only the lowest gap inverting breaks the trend',a:[
  {t:'zone',i1:0,i2:9,p1:'h0',p2:'l2',cls:'k-blue',s:'LOWER gap',la:'bl'},{t:'zone',i1:2,i2:7,p1:'h2',p2:'l4',cls:'k-liq',s:'UPPER gap',la:'tr'},
  {t:'tag',i:7,p:'l7',dy:26,s:'closes below UPPER gap: not enough',cls:'k-liq',anc:'end'},{t:'tag',i:9,p:'l9',dy:26,s:'closes below LOWER gap: inverse',cls:'k-bad',anc:'end'}]})};
FIG.ifvgCompare=()=>`<svg viewBox="0 0 760 270" role="img" aria-label="Entering on the inverse FVG versus waiting for the break of structure">
<text x="20" y="28" class="b big">Same trade idea, two entries. Risking $1,000 on each.</text>
<g class="k-good"><text x="20" y="76" class="b">Enter on the inverse FVG</text><rect x="20" y="88" width="190" height="34" class="zone"/><text x="26" y="110" class="kt">risk $1,000</text><rect x="210" y="88" width="247" height="34" rx="0" style="fill:var(--good)"/><text x="218" y="110" style="fill:#04180F;font-weight:500">reward $1,300 (about 1:1.3)</text></g>
<g class="k-bad"><text x="20" y="168" class="b">Wait for the break of structure</text><rect x="20" y="180" width="190" height="34" class="zone"/><text x="26" y="202" class="kt">risk $1,000 (stop twice as wide)</text><rect x="210" y="180" width="85" height="34" style="fill:var(--bad)"/><text x="302" y="202" class="kt">reward $450</text></g>
<text x="20" y="252" style="font-size:12px">The BOS only arrived a full 4-hour candle later, so the entry was about 68 ticks worse and the stop about double.</text></svg>`;
PAGES.push({id:'m08',part:'III',n:8,title:'Inverse Fair Value Gaps',min:22,level:'Advanced',src:'Source: lesson "Inverse Fair Value Gaps Explained"',
lead:'A fair value gap that fails is not just a dead gap. It is information. When a continuation signal is ignored, the trend it protected is probably over, and you often learn that earlier than a break of structure would tell you.',
goals:['Classify each confluence as reversal, confirmation or continuation','Identify an inverse FVG and apply the candle-close rule','Explain why an inverse gap can beat a break of structure','Choose the correct gap in a stack for the inverse test'],
html:`
<h2>Classifying the tools you have</h2>
<p>You now know enough confluences to sort them by job. This vocabulary is the backbone of the strategy.</p>
${tbl(['Job','Question it answers','Tools so far'],[['Reversal / opportunity','Is there a chance that orders can be filled and a move can turn?','Liquidity: highs, lows, sessions, equal levels'],['Confirmation','Did orders actually get filled and the trend change?','Break of structure, inverse FVG'],['Continuation','Will the new trend keep going?','Fair value gap, equilibrium (next module)']])}
<h2>The idea</h2>
<p>A fair value gap in a trend is supposed to be respected: price tags it and moves on. If instead a candle <b>closes through the gap</b>, the continuation tool has failed. The market did not do what that trend would do, which suggests a change of direction. That makes a failed gap a <b>confirmation</b> confluence.</p>
${F('ifvg','A bearish gap should push price lower. Instead a candle closes above it, flipping the gap into support. Price retests it, holds, and trends up.','Inverse fair value gap')}
${KEY('<p>An <b>inverse FVG</b> is a gap that is closed through by a full candle body. The same rule as break of structure applies: wicks do not count, the candle must close beyond.</p>')}
<h2>Why it is useful: earlier information</h2>
<p>An inverse gap often triggers <em>before</em> a break of structure is available. A BOS needs a close beyond the last swing, which may still be far away. A gap sits near price, so its failure can show up one or two candles earlier. Entering there, rather than after the BOS, can move your entry far closer to the turning point.</p>
${F('ifvgCompare','Lesson example on a 4-hour chart: entering on the inverse gap would have been about 68 ticks better than waiting for the BOS. In a second example the saving was 123 ticks.','What earlier information is worth')}
<p>That difference does two things: your stop shrinks, and your reward-to-risk improves. The lesson walks through $1,000 of risk earning $1,300 on the early entry versus only about $450 on the late one.</p>
<h2>Stacks: which gap must invert?</h2>
<p>With several gaps stacked, closing through the <em>top</em> one means nothing, because lower ones can still hold the trend. For an inverse signal in an uptrend you need the <b>lowest gap</b> to be closed below. For a downtrend, the highest gap must be closed above.</p>
${F('ifvgStack','Closing below the upper gap leaves the lower gap available to hold the trend. Only the close below the lowest gap marks the trend as finished.','Stack rule')}
${WARN('<p>Treating every inverse gap as a trade. The instructor is explicit: you cannot sell every inverse bearish signal and buy every inverse bullish one. It is a confirmation tool, valuable only when it follows a real opportunity such as a liquidity sweep.</p>')}
<h3>The full chain so far</h3>
${steps([['1  Opportunity','Liquidity','Price sweeps a high or low, so orders could be filled.'],['2  Confirmation','BOS or inverse FVG','Evidence that the move did turn.'],['3  Continuation','FVG or equilibrium','Evidence that the new trend keeps going.']])}`,
recap:['Reversal = liquidity. Confirmation = BOS and inverse FVG. Continuation = FVG and equilibrium.','An inverse FVG is a gap closed through by a candle body, not a wick.','It often triggers before a BOS, improving entry, stop size and reward-to-risk.','In a stack, the farthest gap in the trend direction must invert.','Never trade an inverse FVG without a preceding opportunity.']});
QZ.m08=[
{q:'What changes a fair value gap into an inverse FVG?',o:['A wick through it','A candle body closing through it','A news event','Time passing'],a:1,w:'The close rule applies: only a candle close beyond the gap counts.'},
{q:'Which category is an inverse FVG?',o:['Reversal','Confirmation','Continuation','Target'],a:1,w:'It confirms that the existing trend has failed.'},
{q:'Uptrend with two stacked bullish gaps. Price closes below the upper one. Is it an inverse signal?',o:['Yes','No, the lower gap can still hold the trend','Only on Fridays','Yes, if volume is high'],a:1,w:'The lowest gap must be inverted for the trend to be considered finished.'},
{q:'Why can an inverse FVG improve the trade?',o:['It removes the need for a stop','It often appears earlier than a BOS, giving a better entry and tighter stop','It guarantees the target','It works without liquidity'],a:1,w:'Earlier information means a smaller stop and a better reward-to-risk ratio.'}];
</script>

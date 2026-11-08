<script>
/* ================= MODULE 9: EQUILIBRIUM ================= */
const _eqUp=()=>chain(100,[101,105,109,113,117,114,111,107,111,115,119,122],4);
FIG.eqUp=()=>candleChart({c:_eqUp(),w:520,h:360,y:[94,128],alt:'Equilibrium in an uptrend',a:[{t:'range',lo:'l0',hi:'h4',i1:0,i2:11},
  {t:'dot',i:7,p:'l7',cls:'k-liq',s:'tap into discount',dx:-9,anc:'end',dy:14},{t:'arrow',i1:8,p1:'c8',i2:11,p2:'h11+2',cls:'k-good'}]});
FIG.eqDown=()=>candleChart({c:flip(_eqUp(),110),w:520,h:360,y:[92,126],alt:'Equilibrium in a downtrend',a:[{t:'range',lo:'l4',hi:'h0',i1:0,i2:11},
  {t:'dot',i:7,p:'h7',cls:'k-liq',s:'tap into premium',dx:-9,anc:'end',dy:-3},{t:'arrow',i1:8,p1:'c8',i2:11,p2:'l11-2',cls:'k-bad'}]});
FIG.eqWrong=()=>{const c=chain(100,[97,102,107,112,109,106,104.5,109,114,119,123,120,116],6),w=(c[0].l+c[10].h)/2;
  return candleChart({c,w:780,h:400,y:[90,132],alt:'Correct versus incorrect equilibrium range',a:[{t:'range',lo:'l6',hi:'h10',i1:6,i2:12,top:'PREMIUM (correct range)',bot:'DISCOUNT (correct range)'},
  {t:'hline',p:w,i1:0,i2:12,cls:'k-bad',s:'WRONG 50%: drawn from an old low',la:'l'},{t:'dot',i:6,p:'l6',cls:'k-good',s:'most recent low',dx:-9,anc:'end',dy:15},{t:'dot',i:0,p:'l0',cls:'k-bad',s:'not this one',dx:9,dy:12},{t:'dot',i:10,p:'h10',cls:'k-good',s:'most recent high',dx:-9,anc:'end',dy:-4}]})};
WID.eqLab=el=>{
  el.innerHTML=`<div class="wid-h">Premium or discount? Test your entry price<span>Interactive</span></div><div class="wid-b"><div class="seg" id="eqD"><button type="button" aria-pressed="true" data-d="up">Uptrend (looking to buy)</button><button type="button" aria-pressed="false" data-d="dn">Downtrend (looking to sell)</button></div>
  <div class="ctl"><div style="grid-column:1/-1"><label for="eqP">Current price inside the range (swing low 100, swing high 120) <output id="eqO"></output></label><input id="eqP" type="range" min="1000" max="1200" value="1170"></div></div><div id="eqS"></div><div class="read" id="eqT"></div></div>`;
  let d='up';
  const draw=()=>{const p=+$('#eqP',el).value/10,x=v=>40+(v-100)/20*680,disc=p<110;
    $('#eqO',el).textContent=p.toFixed(1)+(p===110?' (exactly EQ)':disc?' (discount)':' (premium)');
    $('#eqS',el).innerHTML=`<svg viewBox="0 0 760 130" role="img" aria-label="Premium and discount bar"><rect x="40" y="46" width="340" height="30" fill="var(--good)" fill-opacity=".25"/><rect x="380" y="46" width="340" height="30" fill="var(--bad)" fill-opacity=".25"/><line x1="380" x2="380" y1="34" y2="88" stroke="var(--ink)" stroke-width="2" stroke-dasharray="4 3"/><text x="380" y="26" text-anchor="middle" class="b">EQ 110 (50%)</text><text x="40" y="106">${d==='up'?'swing low 100':'swing low 100 (target)'}</text><text x="720" y="106" text-anchor="end">${d==='up'?'swing high 120 (target)':'swing high 120'}</text><text x="210" y="66" text-anchor="middle" style="fill:var(--good);font-weight:500">DISCOUNT</text><text x="550" y="66" text-anchor="middle" style="fill:var(--bad);font-weight:500">PREMIUM</text><path d="M${x(p)} 80 l-9 16 h18z" fill="var(--liq)" stroke="var(--panel)" stroke-width="2"/></svg>`;
    let msg;if(d==='up')msg=disc?`<b style="color:var(--good)">Discount.</b> In an uptrend, price below EQ is where buyers (and large players) want to accumulate. This is the area to look for a buy once you see confirmation.`:`<b style="color:var(--bad)">Premium.</b> Buying here is topping up at an expensive price. Wait for price to retrace below EQ. Market makers will not want to add longs this high either.`;
    else msg=disc?`<b style="color:var(--good)">Discount for a downtrend.</b> Selling here is selling cheap, after most of the retrace has not happened. Wait for price to rally up into premium.`:`<b style="color:var(--bad)">Premium.</b> For a downtrend this is the right area to look for a sell: price has retraced up into an expensive zone, so continuation lower is likelier. Wait for confirmation.`;
    $('#eqT',el).innerHTML=msg+'<br><br>Remember: reaching the zone is never enough. You still need price to react and show confirmation.'};
  $$('#eqD button',el).forEach(b=>b.addEventListener('click',()=>{d=b.dataset.d;$$('#eqD button',el).forEach(x=>x.setAttribute('aria-pressed',x===b));draw()}));
  $('#eqP',el).addEventListener('input',draw);draw()};
PAGES.push({id:'m09',part:'III',n:9,title:'Equilibrium',min:15,level:'Core concept',src:'Source: lesson "Equilibrium Explained"',
lead:'The simplest continuation tool in the course, and the one most often drawn wrong. Equilibrium splits a move in half so you only look for entries in the cheap half.',
goals:['Draw equilibrium from the correct swing points in both trend directions','Define premium and discount and say where each side should trade','Explain why large players avoid the expensive half of a range','Combine equilibrium with FVGs and the other confluences'],
html:`
<h2>What it is</h2>
<p><b>Equilibrium (EQ)</b> is the 50% level of the most recent swing range inside a trend. It divides that range into two zones:</p>
<ul><li><b>Discount</b>: below 50%. In an uptrend this is the area where buyers want to be.</li><li><b>Premium</b>: above 50%. In an uptrend this is expensive, so buying there is topping up at a bad price.</li></ul>
<p>Large players think the same way: they do not want to add to a long at the top of a range. They want price pushed into a discount first, then they buy and send it higher. In a downtrend, everything flips: premium is where you look to sell, discount is where shorts are poorly priced.</p>
${F2('eqUp','eqDown','The dotted line is the 50% level. In the uptrend, price retraces below EQ (into discount), then continues up. In the downtrend, price retraces above EQ (into premium), then continues down.','Uptrend: buy in discount','Downtrend: sell in premium','Premium / discount')}
<h2>How to draw it</h2>
${KEY('<p><b>Uptrend:</b> from the most recent swing low up to the most recent swing high.<br><b>Downtrend:</b> from the most recent swing high down to the most recent swing low.</p>')}
<p>"Most recent" is the entire rule and the entire source of mistakes. Do not stretch the range from a distant low. Draw it from the swing that produced the move you are retracing.</p>
${F('eqWrong','The correct range runs from the latest swing low to the latest swing high. Drawing from an old low shifts the 50% line and tells you a cheaper price than the market really offers.','The most common mistake')}
<p>When you draw it live, wait until the retrace has formed. If a retrace has started after a high, the most recent high is that high and the most recent low is the low of the last leg. Add the tool once the swing is confirmed. A fraction later, if a new swing is made, move it.</p>
${W_('eqLab')}
<h2>Context makes it work</h2>
<p>Equilibrium is a continuation confluence, like the FVG. By itself it is useless; it only matters inside a chain of reasoning:</p>
${steps([['1  Opportunity','Liquidity','Price sweeps a low in a downtrend'],['2  Confirmation','Inverse FVG','A bearish gap is closed above: trend flips'],['3  Continuation','FVG or EQ','Price retraces into a bullish gap or below EQ, then extends']])}
<p>When equilibrium is not reached, a gap may do the job instead. When both are present, the confluence is stronger. Practise on every time frame. The behaviour is the same on the weekly and the 1-minute chart.</p>
${WARN('<p>Drawing the tool the instant a swing appears and shorting the first touch. Wait for a close that shows the reaction. Price can pass EQ and keep going.</p>')}`,
recap:['EQ = 50% of the most recent swing range. Below = discount, above = premium.','Uptrend: buy in discount. Downtrend: sell in premium.','Draw from the MOST RECENT low to high (or high to low). Never from older swings.','It is a continuation confluence. It needs a sweep and confirmation before it.']});
QZ.m09=[
{q:'In a downtrend, from where to where do you draw equilibrium?',o:['Oldest high to newest low','Most recent swing high down to most recent swing low','Any high to any low','From the open to the close'],a:1,w:'Always the most recent swing range in the trend.'},
{q:'In an uptrend, which zone is favourable for looking to buy?',o:['Premium','Discount','Exactly at the high','Neither'],a:1,w:'Large players prefer to accumulate below 50%.'},
{q:'You draw EQ from a low that is 20 candles old. What is the likely effect?',o:['Nothing','The 50% line is in the wrong place, giving a misleading level','It becomes more precise','It switches to a downtrend'],a:1,w:'Using stale swings misplaces EQ.'},
{q:'EQ is classed as a:',o:['Reversal tool','Confirmation tool','Continuation tool','Time tool'],a:2,w:'It shows where a new trend can continue from.'}];

/* ================= MODULE 10: SMT ================= */
const _es=()=>chain(100,[103,106,[108,1.2,.6],105.5,103.5,106.5,[107,.5,.6],104,100.5,97],12),_nq=()=>chain(200,[206,212,[216,2.4,1.2],211,207,213,[219,1,1],213,206,199],13);
FIG.smtES=()=>candleChart({c:_es(),w:520,h:340,y:[93,114],alt:'S&P 500 making a lower high',a:[{t:'hline',p:'h2',i1:2,i2:6,cls:'k-liq'},{t:'dot',i:6,p:'h6',cls:'k-bad',s:'LOWER high',dx:-9,anc:'end',dy:-4},{t:'tag',i:7,p:'h7',dy:-26,s:'LEADER (weak)',cls:'k-bad',anc:'start'},{t:'arrow',i1:6.4,p1:'h6-.5',i2:9,p2:'l9+1',cls:'k-bad'}]});
FIG.smtNQ=()=>candleChart({c:_nq(),w:520,h:340,y:[194,226],alt:'Nasdaq making a higher high',a:[{t:'hline',p:'h2',i1:2,i2:6,cls:'k-liq'},{t:'dot',i:6,p:'h6',cls:'k-good',s:'HIGHER high',dx:-9,anc:'end',dy:-4},{t:'tag',i:7,p:'h7',dy:-26,s:'LAGGARD (strong)',cls:'k-good',anc:'start'},{t:'arrow',i1:6.4,p1:'h6-.5',i2:9,p2:'l9+1',cls:'k-bad',s:'follows ES down',dx:-80,dy:20}]});
FIG.smtESb=()=>candleChart({c:flip(_es(),103.5),w:520,h:340,y:[93,114],alt:'S&P 500 making a higher low',a:[{t:'hline',p:'l2',i1:2,i2:6,cls:'k-liq'},{t:'dot',i:6,p:'l6',cls:'k-good',s:'HIGHER low',dx:-9,anc:'end',dy:15},{t:'tag',i:7,p:'l7',dy:34,s:'LEADER (strong)',cls:'k-good',anc:'start'},{t:'arrow',i1:6.4,p1:'l6+.5',i2:9,p2:'h9-1',cls:'k-good'}]});
FIG.smtNQb=()=>candleChart({c:flip(_nq(),209.5),w:520,h:340,y:[194,226],alt:'Nasdaq making a lower low',a:[{t:'hline',p:'l2',i1:2,i2:6,cls:'k-liq'},{t:'dot',i:6,p:'l6',cls:'k-bad',s:'LOWER low',dx:-9,anc:'end',dy:15},{t:'tag',i:7,p:'l7',dy:34,s:'LAGGARD (weak)',cls:'k-bad',anc:'start'},{t:'arrow',i1:6.4,p1:'l6+.5',i2:9,p2:'h9-1',cls:'k-good',s:'follows ES up',dx:-80,dy:-8}]});
PAGES.push({id:'m10',part:'IV',n:10,title:'SMT Divergence',min:20,level:'Advanced',src:'Source: lesson "SMT Divergence Explained"',
lead:'The S&P 500 and the Nasdaq are tightly correlated, but not identical. When they disagree at an important level, one of them is telling you about the other before it happens.',
goals:['Define a bullish and a bearish SMT divergence','Identify which index is the leader and which is the laggard','Explain why SMT is only useful at real draws on liquidity','Pick the right index for the trade'],
html:`
<p>SMT divergence compares two correlated instruments: here the S&amp;P 500 (ES) and the Nasdaq (NQ). It does not work for forex and commodities in the same form, because it depends on this pair. The instructor admits he does not know what the letters stand for. What matters is how it works.</p>
<h2>The idea</h2>
<p>Because ES and NQ track each other so closely, small disagreements carry information. Imagine both sweep the same major high. If ES makes a high and then a <b>lower high</b>, while NQ makes a high and then a <b>higher high</b>, the two did not confirm each other. ES filled enough orders to start turning down. NQ has not yet turned. ES is leading, and it hints at what NQ will do next.</p>
${F2('smtES','smtNQ','Same time axis on both charts. Both sweep the shared level at candle 2. ES fails to reach it again (lower high). NQ pushes beyond it (higher high). Bearish for both.','S&P 500 (ES): high, then lower high','Nasdaq (NQ): high, then higher high','Bearish SMT divergence')}
<h2>Bullish version</h2>
<p>Mirror image. At a major low, one index makes a low then a <b>higher low</b>, and the other makes a lower low. The index making the higher low leads upward.</p>
${F2('smtESb','smtNQb','Bullish SMT at a significant low: ES holds a higher low, NQ undercuts it.','S&P 500: low, then higher low','Nasdaq: low, then lower low','Bullish SMT divergence')}
${tbl(['','Bearish SMT','Bullish SMT'],[['Leading index','Makes high then LOWER high','Makes low then HIGHER low'],['Lagging index','Makes high then HIGHER high','Makes low then LOWER low'],['Meaning','Orders were likely filled above the high','Orders were likely filled below the low'],['Bias for both','Down','Up'],['Trade on','The leading (weaker) index','The leading (stronger) index']])}
<h2>Location, location</h2>
${KEY('<p>SMT is only valuable while price is sweeping an important draw on liquidity (a high-timeframe high or low, a session extreme, a previous-day level). Away from those levels divergences appear all day and mean almost nothing.</p>')}
<h2>Which index do you trade?</h2>
<p>Trade the leader. In a bearish SMT, the index that failed to sweep the high is the one already carrying the downside intent. Shorting the index that just made a higher high is shorting the stronger index. The lesson's examples show the leading index expanding faster and further than the laggard.</p>
<h2>Use on higher and lower time frames</h2>
<p>On higher time frames (4-hour) SMT works well for <b>bias</b>: it tells you whether a sweep of a major high is likely to reverse. On lower time frames (5-minute) it supports <b>execution</b>. In the strategy lesson the instructor notes a bearish SMT at the London high and uses it to strengthen a bearish plan, even though his daily bias had been bullish.</p>
${WARN('<p>Splitting charts and trading every divergence. Divergence away from liquidity is noise. Divergence without confirmation is just a note on the chart.</p>')}`,
recap:['SMT = ES and NQ disagreeing at a level. One makes a higher high or low, the other fails to.','Bearish: ES lower high vs NQ higher high. Bullish: mirror at lows.','The failing (leading) index is the one to trade. Both indices are expected to follow.','Only relevant at real draws on liquidity. Elsewhere it is noise.']});
QZ.m10=[
{q:'ES makes a high then a lower high. NQ makes a high then a higher high. What is this?',o:['Bullish SMT','Bearish SMT','No signal','A BOS'],a:1,w:'One index failed to make a higher high while the other did: bearish divergence.'},
{q:'Which index do you prefer to short in that situation?',o:['NQ, the stronger','ES, the leader making the lower high','Both with double size','Neither'],a:1,w:'Trade the leading index that is already showing weakness.'},
{q:'When is SMT most meaningful?',o:['Anytime','While sweeping an important draw on liquidity','Only in Asia','Only on the daily'],a:1,w:'Away from liquidity, divergences are frequent and mean little.'},
{q:'For a bullish SMT at a low, the leading index:',o:['Makes a lower low','Makes a higher low','Makes equal lows','Makes no low'],a:1,w:'A higher low shows buyers stepped in sooner.'}];

/* ================= MODULE 11: TIME THEORY ================= */
FIG.nyTime=()=>{const c=chain(100,[100.2,99.9,100.3,101.6,103,[102.2,.8,.6],104.4,103.2,[105.2,1.5,.5],102.2,98.6,96.2,96.8,95.4,96,95.6],15);
  return candleChart({c,w:780,h:400,y:[92,110],alt:'New York open time windows',xl:{0:'9:15',3:'9:30',7:'9:50',9:'10:00',11:'10:10',15:'10:30'},a:[
  {t:'zone',i1:3,i2:6,p1:'B',p2:'T',band:1,cls:'k-liq',s:'MANIPULATION 9:30-9:50',la:'tl'},{t:'zone',i1:7,i2:10,p1:'B',p2:'T',band:1,cls:'k-good',s:'ENTRY WINDOW 9:50-10:10',la:'tl'},
  {t:'vline',i:15,cls:'k-bad',s:'10:30'},{t:'hline',p:96.2,i1:9,i2:15,cls:'k-ink'},{t:'text',i:5,p:96.2,dy:17,s:'higher time frame low (target)',cls:'k-ink',anc:'middle'},
  {t:'dot',i:8,p:'h8',cls:'k-bad',s:'last push up',dx:-9,anc:'end',dy:-4},{t:'tag',i:9,p:'c9',dy:-34,s:'ENTRY ~10:00',cls:'k-ink',anc:'start'},{t:'arrow',i1:9.2,p1:'c9',i2:11.2,p2:'c11',cls:'k-bad'}]})};
PAGES.push({id:'m11',part:'IV',n:11,title:'Time Theory',min:14,level:'Core concept',src:'Source: lesson "Time Theory Explained"',
lead:'Even a perfect setup fails at the wrong time. Knowing when the market is likely to move, and when it is likely to do nothing, is a skill of its own.',
goals:['Recall the session times and the thin hour in Eastern Time','Use the 9:30 to 10:30 sequence for New York','Explain why manipulation tends to come first','Decide when to stop looking for trades'],
html:`
<p>Timing matters because the goal is a high-probability read of the day. If you do not understand when new money enters, you work against the clock. This module is deliberately short: the rules are few, and they all hinge on the New York open.</p>
${tbl(['Window (ET)','What it is','Why it matters'],[['18:00 to 03:00','Asia session','Builds the first range of the day'],['03:00 to 08:30','London session (pre-market opens at 02:00)','Often sweeps Asia, then runs the other way'],['08:30 to 09:30','New York pre-market','US traders arrive. Pre-market manipulation is typical. Much data prints at 08:30'],['09:30','New York open','New money enters. Expect a move that takes liquidity'],['09:30 to 09:50','Manipulation window','Price usually sweeps something here'],['09:50 to 10:10','Entry window (the "macro")','The ideal time for the entry'],['by 10:30','Cut-off','No trade by now? The instructor is done for the day'],['13:00','PM session opens','Exists, but is not traded in this system'],['17:00 to 18:00','Spread hour','No market. Spreads on CFD/forex brokers widen. Do not trade']])}
<h2>The logic of the sequence</h2>
<p>The market opens at 09:30 and fresh US money arrives. Fresh money needs counterparties, so we should expect some form of manipulation: a sweep of a higher or lower time frame draw on liquidity. That typically happens in the first twenty minutes. Once the sweep is complete and the market has changed direction, an entry opens between roughly 09:50 and 10:10. By 10:30 the market tends to slow down, so a missing setup means stepping aside.</p>
${F('nyTime','A typical New York morning: price pushes up from the open, makes one last push around 9:55 to sweep, rejects at 10:00, and falls to the higher time frame low by 10:05 to 10:15.','The first hour in New York')}
${KEY('<p>These times are a map, not a gate. The lesson shows a day where the final leg of manipulation arrived at 09:52, two minutes later than usual, and the instructor says he sometimes enters at 09:45 or 10:20. What matters is the order of events: <b>sweep first, entry after</b>.</p>')}
<h2>Examples from the lesson</h2>
${steps([['Example 1','Manipulate up, then sell','9:30 to 9:50 pushes up. A final push at 9:50 gives a 10:00 entry short, which reached higher time frame lows by 10:05.'],['Example 2','Manipulate down, then buy','9:30 opens and sweeps lows. After 9:50 a retrace gives the entry near 10:00, then an extension higher.'],['Example 3','Late sweep','Nothing in the 9:30 window. The final leg of manipulation appears at 9:52, then expansion higher.']])}
<h2>High-impact news days</h2>
<p>On heavy news days price action gets erratic and good examples are rare. The risk module shows one of the instructor's rules for those days: cut position size in half.</p>
${WARN('<p>Entering before the sweep because you are impatient or fear missing out. Let the manipulation happen, then trade the reaction.</p>')}
<h2>Practice</h2>
<ul><li>Pull up the last 20 trading days on a 5-minute chart.</li><li>Mark 09:30, 09:50, 10:10 and 10:30 on each.</li><li>Record what was swept between 09:30 and 09:50 and what the 09:50 to 10:10 move did.</li></ul>`,
recap:['Sessions in ET: Asia 18:00-03:00, London 03:00-08:30, NY pre 08:30, open 09:30, spread hour 17:00-18:00.','Expect a sweep from 09:30 to 09:50. The entry window is 09:50 to 10:10.','If nothing by 10:30, stand aside. The times are a map, not a rigid gate.','Sweep first, entry after.']});
QZ.m11=[
{q:'When is the ideal entry window in the lesson?',o:['09:30 to 09:50','09:50 to 10:10','11:00 to 12:00','13:00 to 14:00'],a:1,w:'The window after the manipulation is complete.'},
{q:'What does the instructor do if no trade appears by 10:30?',o:['Takes any trade','Is done for the day','Doubles size','Switches to Asia'],a:1,w:'The market slows after 10:30.'},
{q:'The 09:30 to 09:50 window is mainly for:',o:['Entry','Manipulation (sweep)','News only','Rest'],a:1,w:'Fresh money arrives and tends to sweep liquidity first.'},
{q:'The spread hour is:',o:['09:30-10:30','17:00-18:00','03:00-04:00','12:00-13:00'],a:1,w:'The thin hour between New York close and the next session.'}];

/* ================= MODULE 12: DAILY BIAS ================= */
FIG.biasDown=()=>{const c=chain(130,[127,124,121,124,127,123,119,115,118,121,117,113,109,112,115,109,104,99,94],14);
  return candleChart({c,w:780,h:420,y:[86,136],alt:'Bearish bias: retrace to equilibrium then expansion to the next low',a:[
  {t:'poly',pts:[[4,'h4'],[7,'l7'],[9,'h9'],[12,'l12']],cls:'k-liq'},
  {t:'range',lo:'l12',hi:'h9',i1:10,i2:18,top:'PREMIUM',bot:'DISCOUNT'},
  {t:'tag',i:4,p:'h4',dy:-9,s:'1  HTF trend: LH + LL (bearish)',cls:'k-ink',anc:'start'},
  {t:'tag',i:15,p:'h9',dy:-12,s:'2  retrace tags the 50% line',cls:'k-liq',anc:'middle'},
  {t:'hline',p:'l12',i1:12,i2:17,cls:'k-bad'},
  {t:'arrow',i1:14.4,p1:'h14-1',i2:18,p2:'l18+1',cls:'k-bad',s:'3  expansion',dx:-60,dy:24}]})};
FIG.ebb=()=>{const c=chain(100,[104,108,[112,.8,.6],109,106,110,114,[118,.8,.6],115,111,116,121,125],17);
  return candleChart({c,w:780,h:380,y:[94,132],alt:'External and internal liquidity cycle',a:[{t:'poly',pts:[[2,'h2'],[4,'l4'],[7,'h7'],[9,'l9'],[12,'h12']],cls:'k-liq'},
  {t:'text',i:2,p:'h2',dy:-9,s:'external: high taken',cls:'k-good',anc:'middle'},{t:'text',i:7,p:'h7',dy:-9,s:'external: high taken',cls:'k-good',anc:'middle'},{t:'text',i:12,p:'h12',dy:-9,s:'external: next high',cls:'k-good',anc:'middle'},
  {t:'text',i:4,p:'l4',dy:19,s:'internal: gap / discount EQ',cls:'k-blue',anc:'middle'},{t:'text',i:9,p:'l9',dy:19,s:'internal: gap / discount EQ',cls:'k-blue',anc:'middle'}]})};
WID.biasWizard=el=>{
  el.innerHTML=`<div class="wid-h">Bias builder: answer four questions<span>Interactive</span></div><div class="wid-b"><div class="ctl">
  <div><label for="bwA">1. 4H / 1H trend</label><select id="bwA"><option value="1">Uptrend (HH + HL)</option><option value="-1">Downtrend (LH + LL)</option><option value="0">Range / unclear</option></select></div>
  <div><label for="bwB">2. Where is price in the swing?</label><select id="bwB"><option value="d">In discount / at a FVG</option><option value="m">Middle</option><option value="p">In premium</option></select></div>
  <div><label for="bwC">3. Overnight manipulation</label><select id="bwC"><option value="0">None yet</option><option value="h">Swept a high</option><option value="l">Swept a low</option></select></div>
  <div><label for="bwD">4. Untouched draws</label><select id="bwD"><option value="a">Stacked highs above</option><option value="b">Stacked lows below</option><option value="n">Nothing obvious</option></select></div></div><div class="read" id="bwT"></div></div>`;
  const draw=()=>{const t=+$('#bwA',el).value,loc=$('#bwB',el).value,sw=$('#bwC',el).value,dr=$('#bwD',el).value;let s=0;const why=[];
    if(t){s+=2*t;why.push(`${t>0?'Uptrend':'Downtrend'} on 4H/1H: ${t>0?'+':'-'}2`)}else why.push('No clear higher time frame trend: 0');
    if(t>0&&loc==='d'){s+=1;why.push('Price in discount in an uptrend: +1')}if(t>0&&loc==='p'){s-=1;why.push('Price in premium in an uptrend (expensive): -1')}
    if(t<0&&loc==='p'){s-=1;why.push('Price in premium in a downtrend (a sell area): -1')}if(t<0&&loc==='d'){s+=1;why.push('Price in discount in a downtrend (poor place to sell): +1')}
    if(sw==='l'){s+=1;why.push('Sell-side swept: buy-side fuel taken, favours up: +1')}if(sw==='h'){s-=1;why.push('Buy-side swept: favours down: -1')}
    if(dr==='a'){s+=1;why.push('Untouched highs above act as a magnet: +1')}if(dr==='b'){s-=1;why.push('Untouched lows below act as a magnet: -1')}
    const v=s>=2?['Bullish bias','var(--good)']:s<=-2?['Bearish bias','var(--bad)']:['No clean bias','var(--ink2)'];
    $('#bwT',el).innerHTML=`<b style="color:${v[1]};font-size:19px">${v[0]} (score ${s>0?'+':''}${s})</b><ul style="margin:10px 0 0">${why.map(w=>`<li>${w}</li>`).join('')}</ul><p style="margin:12px 0 0">${v[0]==='No clean bias'?'Stand aside or trade smaller. The instructor says plainly that a bias is only a hypothesis, and that the market can prove you wrong. Be ready to flip it if an opposing sweep and confirmation appear.':'Next: look for the lower time frame sweep, confirmation and continuation that matches this direction. Do not enter on the bias alone.'}</p>`};
  $$('select',el).forEach(x=>x.addEventListener('change',draw));draw()};
PAGES.push({id:'m12',part:'V',n:12,title:'Finding Daily Bias',min:26,level:'Advanced',src:'Source: lesson "How To Find Daily Bias"',
lead:'Without a bias, every entry is a coin flip. This module turns the whole toolbox into a routine you run before the open.',
goals:['Run a repeatable five-step bias routine','Explain the external-internal-external cycle','Recognise when a bias has been invalidated','Define entry, stop and targets for a bias-based plan'],
html:`
<p><b>Daily bias</b> is your expectation of the direction in which price will deliver during the session. The lesson is blunt: if you do not know where the market wants to go, you have no reason to enter. Bias answers where; the lower time frames answer when.</p>
<h2>The five-step routine</h2>
${steps([['Step 1','Higher time frame trend','On the 4-hour and 1-hour, read the structure. HH + HL, or LH + LL?'],['Step 2','Mark draws on liquidity','Stacked highs and lows, Asia high/low, previous day high/low, London high/low.'],['Step 3','Find continuation tools','Unmitigated 1H/4H FVGs and the 50% equilibrium of the latest swing.'],['Step 4','Expect manipulation','Will New York sweep an obvious level before the real move?'],['Step 5','Respect or invert','Price taps a gap and holds: bias confirmed. A close through: bias flips.']])}
${W_('biasWizard')}
<h2>The ebb and flow of delivery</h2>
<p>Price alternates between two kinds of liquidity. <b>External</b> liquidity is the swing high or low outside the current range. <b>Internal</b> liquidity is inside it: fair value gaps and equilibrium. A healthy uptrend takes an external high, retraces into internal liquidity (a gap or a discount), then goes for the next external high. A downtrend does the mirror.</p>
${F('ebb','External, internal, external: the rhythm of a trend. Knowing which stage you are in stops you from chasing an expansion after it has happened.','The cycle')}
<h2>A bearish day worked through</h2>
${F('biasDown','Higher time frame structure is bearish. Price retraces up to the 50% line of the last swing, then expands lower and takes the previous low. Entry details come from the lower time frames.','Bias on a downtrend day')}
<p>The pattern the lesson repeats: identify the trend, mark the pools below, wait for a retrace into a continuation tool (gap or EQ), and expect delivery to the next external draw. The bullish version is the exact mirror.</p>
<h2>When the bias is challenged</h2>
<ul><li><b>Pre-market low sweep inside an uptrend.</b> Overnight price pushes below a higher time frame low. Beginners see a lower low. In context it can be a sweep that filled buy orders. Bullish structure holds until a real close breaks it.</li>
<li><b>Close through a gap.</b> If a 1H bearish gap is closed above, the bearish case is void and a bullish plan is in play. Adapt immediately.</li>
<li><b>A single close below a shallow gap.</b> Not a failed trend. Deeper unmitigated gaps and discount levels may still hold.</li>
<li><b>No manipulation before the open.</b> The market needs fuel. If London and Asia left everything untouched, expect New York to sweep first.</li></ul>
<h2>From bias to a trade plan</h2>
<ul><li><b>Entry.</b> Do not buy the sweep wick. Wait for a 5-minute BOS in the bias direction, a retrace into a 5-minute gap or discount EQ, and a reaction.</li>
<li><b>Stop.</b> Beyond the swing that started the move, or the 5-minute structure level.</li>
<li><b>Targets.</b> Scale out: TP1 at nearby lower time frame highs or lows, final target at the higher time frame draw (hourly extreme, Asia high, previous day high).</li></ul>
${TIP('<p>When the major target is very far away, set intermediate profit points. Holding everything for one distant level is a recipe for giving back open profit.</p>')}
${WARN('<p>Trying to catch the exact bottom of a sweep. You are not equipped to front-run a large player. Let the sweep print, then wait for structure to confirm.</p>')}
<h2>Context days</h2>
<p>The lesson includes the session before an FOMC announcement, described as an ugly market. Structure was still bullish on the 4-hour, price pulled back into a large 4-hour gap, a 5-minute gap was inverted down first, lower pools were swept, and then a 5-minute bearish gap was inverted back up. Bias held, but the lower time frame needed the sweep and an inversion before expansion. Tough days ask for patience, not a changed rulebook.</p>`,
recap:['Bias = expected direction for the session. Without it, entries are guesses.','Routine: HTF trend, draws on liquidity, continuation tools, expected manipulation, respect or invert.','Trends breathe: external, internal, external.','A bias is a hypothesis. A close through your gap flips it.','Entries come from the lower time frames, never from bias alone.']});
QZ.m12=[
{q:'What are internal liquidity and external liquidity?',o:['Gaps/EQ and swing highs/lows','News and sessions','Volume and spread','Premium and discount'],a:0,w:'Internal = imbalances and equilibrium. External = swing highs and lows.'},
{q:'Price pushes below a higher time frame low pre-market in an uptrend. Best reading?',o:['The trend has reversed','It may be a sweep; structure is intact until a close breaks it','Immediately short','Ignore the chart'],a:1,w:'Bullish structure holds until a candle closes through the monitored swing.'},
{q:'The best entry in a bias-based plan is:',o:['Buy the exact wick low','After a 5-minute BOS and a retrace into a gap or discount EQ with a reaction','At the open regardless','Only on news'],a:1,w:'Wait for structure, retrace and reaction rather than anticipating.'},
{q:'A 1H bearish FVG gets closed above by a large bullish candle. What happens to a bearish bias?',o:['Stronger','It is invalidated; adapt toward bullish','Unchanged','Double the size'],a:1,w:'The gap failed, an inverse FVG, signalling bullish delivery.'}];
</script>

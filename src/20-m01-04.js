<script>
/* ================= MODULE 1 ================= */
FIG.longshort1=()=>{const c=chain(100,[100.8,99.5,98,100,103,105.5,107,106,109,112],11);
  return candleChart({c,w:520,h:320,y:[94,116],alt:'Long trade: buy low, sell high',a:[
  {t:'zone',i1:2,i2:9,p1:'c2',p2:'c9',cls:'k-good',s:'profit = sell - buy',la:'tl'},
  {t:'tag',i:2,p:'l2',dy:24,s:'BUY',cls:'k-blue',anc:'middle'},{t:'tag',i:9,p:'h9',dy:-9,s:'SELL',cls:'k-ink',anc:'middle'}]})};
FIG.longshort2=()=>{const c=flip(chain(100,[100.8,99.5,98,100,103,105.5,107,106,109,112],11),105);
  return candleChart({c,w:520,h:320,y:[94,116],alt:'Short trade: sell high, buy back low',a:[
  {t:'zone',i1:2,i2:9,p1:'c9',p2:'c2',cls:'k-good',s:'profit = sell - buy back',la:'bl'},
  {t:'tag',i:2,p:'h2',dy:-9,s:'SELL (short)',cls:'k-ink',anc:'middle'},{t:'tag',i:9,p:'l9',dy:24,s:'BUY BACK',cls:'k-blue',anc:'middle'}]})};
FIG.pillars=()=>`<svg viewBox="0 0 760 330" role="img" aria-label="Three pillars of a profitable trader">
<polygon points="40,86 380,22 720,86" fill="var(--ink)"/><text x="380" y="64" text-anchor="middle" style="fill:var(--bg);font:700 17px var(--f-display)">FULL-TIME PROFITABLE TRADER</text>
${[['STRATEGY','Know what a valid setup looks like','Daily bias, liquidity, confirmation, entry, targets','k-ink',80],['RISK MANAGEMENT','Survive the losing streaks','Position size, stop placement, drawdown limits','k-ink',280],['PSYCHOLOGY','Do what the plan says, every time','Discipline: no overtrading, overrisking, overleveraging','k-ink',480]].map(p=>`<g class="${p[3]}"><rect x="${p[4]}" y="104" width="200" height="190" rx="6" class="zone"/><text x="${p[4]+100}" y="138" text-anchor="middle" class="kt big" style="font-size:14px">${p[0]}</text><foreignObject x="${p[4]+12}" y="150" width="176" height="140"><div xmlns="http://www.w3.org/1999/xhtml" style="font:500 13px/1.45 var(--f-body);color:var(--ink)"><b style="font-weight:600">${p[1]}.</b><br><span style="color:var(--ink2)">${p[2]}.</span></div></foreignObject></g>`).join('')}
<rect x="40" y="298" width="680" height="10" rx="3" fill="var(--ink2)"/></svg>`;
PAGES.push({id:'m01',part:'I',n:1,title:'What Trading Really Is',min:14,level:'Foundation',src:'Source: lesson "What is Trading"',
lead:'Before any chart or setup, you need a working definition of the job. Get this wrong and every later concept gets used for the wrong purpose.',
goals:['State a precise, useful definition of day trading','Explain why chasing money is the fastest way to trade badly','Describe long and short trades and how each makes a profit','Name the three skill sets every profitable trader needs'],
html:`
<h2>A definition worth memorising</h2>
<p>Day trading is the ability to predict, with high probability, where the price of an asset is going to go on a given day. Making money is what happens when that ability is good and well managed. It is a by-product, not the skill itself.</p>
${KEY('<p>You are not trying to "make money". You are trying to become reliably good at predicting daily price delivery, then taking only the trades where the odds clearly favour you. Profit is the output of that process.</p>')}
<h3>There is no skill called "being good at making money"</h3>
<p>People who earn large amounts have developed specialised skills the market pays for. Money is the reward the market attaches to a skill. When a beginner keeps their eyes on the money, three things happen: anxiety rises, fear of missing out (FOMO) grows, and decisions turn impulsive. When attention stays on technical execution, those pressures fade and the money question answers itself over time.</p>
<h2>Long and short: two ways to profit</h2>
<p>You can profit from price rising or falling. A <b>long</b> (buy) trade profits when you buy low and later sell higher. A <b>short</b> (sell) trade works in reverse: you sell first at a high price, then buy back lower. Either way you are doing the same thing, buying low and selling high, in a different order.</p>
${F2('longshort1','longshort2','Both trades capture the same distance. Direction does not matter, being right about direction does.','Long: buy low, sell high','Short: sell high, buy back low','Two ways to profit')}
<h2>Technical vs fundamental traders</h2>
<p>There are two broad schools. <b>Fundamental</b> traders and investors study news, earnings and macro data, and usually hold for long periods. <b>Technical</b> traders read price itself and act on what the chart shows. Day traders in this course are technical: they buy low and sell high (or sell high and buy back low) within the day, so the first requirement is being able to <em>see</em> price properly. That is Module 2.</p>
<h2>Mechanics beat memorised patterns</h2>
<p>A common beginner approach is to memorise chart patterns such as head and shoulders or double tops, or to draw support and resistance lines and hope price bounces. The problem is the missing "why". A pattern tells you what a chart looked like on other days, not why orders are moving price right now.</p>
<p>This course builds the opposite habit. You will always ask: where are orders waiting, were they filled, and is the new direction continuing? That is a <b>mechanical</b> view of the market. Everything that follows (liquidity, structure, imbalances, time) is a tool for answering those three questions.</p>
${WARN('<p>Believing you will become rich in a few months. That expectation pushes people to force setups, raise leverage and break rules, which guarantees account failure. Treat it like a skill that takes years, because it does.</p>')}
<h2>The three skill sets</h2>
<p>Strategy alone does not make a trader. You need all three of the following, and a weakness in any one will cap your results.</p>
${F('pillars','Remove any pillar and the roof falls. Most beginners spend 100% of their time on the first one.','The foundation')}
<h2>How to learn this properly</h2>
<p>Watching lessons gives you information. Information is step one of a longer loop. The skill that separates profitable traders is built by repetition on charts, mistakes, review, and more repetition.</p>
${steps([['Step 1','Study','Learn one concept and its exact rules.'],['Step 2','Mark','Find 10 real examples on past charts and mark them.'],['Step 3','Backtest','Replay the market and "trade" the concept with fixed rules.'],['Step 4','Journal','Log every trade with screenshots, reasoning and outcome.'],['Step 5','Review','Find your repeated mistakes. Fix one at a time.']])}
<p>The instructor compares this to a basketball star sharing his training plan. The plan helps, but only the person who does the work gets the result. Plan on hundreds of hours of screen time before you judge your own ability.</p>`,
recap:['Day trading = predicting daily price delivery with high probability. Profit is a by-product.','Attention on money creates anxiety and bad decisions. Attention on execution creates skill.','Long = buy low, sell high. Short = sell high, buy back low.','Always ask why price is moving: orders waiting, orders filled, direction continuing.','You need strategy, risk management and psychology. Knowledge alone is not skill.']});
QZ.m01=[
{q:'Which statement best matches the course definition of day trading?',o:['Making as much money as possible each day','Predicting with high probability where price will go on a given day','Buying anything that is going up','Following a fixed list of chart patterns'],a:1,w:'The skill is probabilistic prediction of daily price delivery. Profit follows from doing that well.'},
{q:'You enter a short trade at 112 and buy back at 98. What is the outcome?',o:['A loss of 14 points','A gain of 14 points','No change','A gain only if price later rises'],a:1,w:'A short profits when price falls. You sold high (112) and bought back low (98), earning the 14-point difference.'},
{q:'Why is a pure focus on money harmful?',o:['Money is not important','It creates anxiety, FOMO and impulsive decisions','It makes you trade less','It improves discipline'],a:1,w:'Money focus pulls attention from technical execution toward emotion, which degrades decisions.'},
{q:'Which is NOT one of the three skill sets?',o:['Strategy','Risk management','Psychology','Social media following'],a:3,w:'The three pillars are strategy, risk management and psychology (discipline).'}];

/* ================= MODULE 2 ================= */
FIG.anatomy=()=>`<svg viewBox="0 0 760 360" role="img" aria-label="Anatomy of an up candle and a down candle">
<g class="cu"><line class="wk" x1="190" x2="190" y1="52" y2="318"/><rect x="156" y="104" width="68" height="150" rx="2"/></g>
<g class="cd"><line class="wk" x1="540" x2="540" y1="52" y2="318"/><rect x="506" y="104" width="68" height="150" rx="2"/></g>
<g class="k-ink" style="font-size:12px">
<text x="262" y="56">HIGH</text><text x="262" y="108">CLOSE</text><text x="262" y="258">OPEN</text><text x="262" y="322">LOW</text>
<line class="ln d" x1="196" x2="256" y1="52" y2="52"/><line class="ln d" x1="226" x2="256" y1="104" y2="104"/><line class="ln d" x1="226" x2="256" y1="254" y2="254"/><line class="ln d" x1="196" x2="256" y1="318" y2="318"/>
<text x="612" y="56">HIGH</text><text x="612" y="108">OPEN</text><text x="612" y="258">CLOSE</text><text x="612" y="322">LOW</text>
<line class="ln d" x1="546" x2="606" y1="52" y2="52"/><line class="ln d" x1="576" x2="606" y1="104" y2="104"/><line class="ln d" x1="576" x2="606" y1="254" y2="254"/><line class="ln d" x1="546" x2="606" y1="318" y2="318"/></g>
<g class="k-liq"><text x="150" y="180" text-anchor="end" class="kt">BODY</text><text x="150" y="80" text-anchor="end" class="kt">UPPER WICK</text><text x="150" y="288" text-anchor="end" class="kt">LOWER WICK</text>
<text x="500" y="180" text-anchor="end" class="kt">BODY</text><text x="500" y="80" text-anchor="end" class="kt">UPPER WICK</text><text x="500" y="288" text-anchor="end" class="kt">LOWER WICK</text></g>
<text x="190" y="22" text-anchor="middle" class="b big">UP (BULLISH) CANDLE: closes above its open</text><text x="540" y="22" text-anchor="middle" class="b big">DOWN (BEARISH): closes below its open</text></svg>`;
FIG.trendUp=()=>{const c=chain(100,[102,105,108,106,104,103,107,111,114,112,109,108,112,116,120,118,115,113,118,122,126],3);
  const T=(i,s)=>({t:'text',i,p:'h'+i,dy:-9,s,cls:'k-good',anc:'middle'}),L=(i,s)=>({t:'text',i,p:'l'+i,dy:19,s,cls:'k-bad',anc:'middle'});
  return candleChart({c,w:520,h:340,alt:'Uptrend with higher highs and higher lows',a:[{t:'poly',pts:[[2,'h2'],[5,'l5'],[8,'h8'],[11,'l11'],[14,'h14'],[17,'l17'],[20,'h20']],cls:'k-liq'},T(2,'H'),T(8,'HH'),T(14,'HH'),T(20,'HH'),L(5,'L'),L(11,'HL'),L(17,'HL')]})};
FIG.trendDown=()=>{const c=flip(chain(100,[102,105,108,106,104,103,107,111,114,112,109,108,112,116,120,118,115,113,118,122,126],3),113);
  const T=(i,s)=>({t:'text',i,p:'h'+i,dy:-9,s,cls:'k-good',anc:'middle'}),L=(i,s)=>({t:'text',i,p:'l'+i,dy:19,s,cls:'k-bad',anc:'middle'});
  return candleChart({c,w:520,h:340,alt:'Downtrend with lower highs and lower lows',a:[{t:'poly',pts:[[2,'l2'],[5,'h5'],[8,'l8'],[11,'h11'],[14,'l14'],[17,'h17'],[20,'l20']],cls:'k-liq'},L(2,'L'),L(8,'LL'),L(14,'LL'),L(20,'LL'),T(5,'H'),T(11,'LH'),T(17,'LH')]})};
WID.candleBuilder=el=>{
  const cs=chain(100,[101.2,102.6,101.4,100.2,99,100.4,102.2,103.9,105.3,104.2,106.1,107],21);
  el.innerHTML=`<div class="wid-h">Candle builder: five-minute candles become a one-hour candle<span>Interactive</span></div><div class="wid-b"><div class="ctl"><div><label for="cbN">Five-minute candles included <output id="cbO"></output></label><input id="cbN" type="range" min="1" max="12" value="12"></div></div><div style="display:grid;grid-template-columns:2.4fr 1fr;gap:14px;align-items:end"><div id="cbL"></div><div id="cbR"></div></div><div class="stats" id="cbS"></div><div class="read" id="cbT"></div></div>`;
  const draw=()=>{const n=+$('#cbN',el).value,part=cs.slice(0,n);$('#cbO',el).textContent=n+' of 12 ('+(n*5)+' min)';
    const agg={o:part[0].o,c:part[n-1].c,h:Math.max(...part.map(k=>k.h)),l:Math.min(...part.map(k=>k.l))},up=agg.c>=agg.o;
    $('#cbL',el).innerHTML=candleChart({c:cs.map((k,i)=>i<n?k:Object.assign({},k,{cls:'cm'})),w:560,h:290,y:[96,112],alt:'Twelve five-minute candles',pad:{t:14,b:14},a:[{t:'text',i:0,p:112,dy:0,s:'5-minute chart',cls:'k-mute'}]});
    $$('.cm',el).forEach(g=>{g.style.opacity='.18';g.style.fill='var(--mute)';g.style.stroke='var(--mute)'});
    $('#cbR',el).innerHTML=candleChart({c:[agg],w:210,h:290,y:[96,112],alt:'The resulting hourly candle',pad:{t:14,b:14,l:30,r:60},a:[{t:'text',i:0,p:112,s:'Hourly candle',cls:'k-mute',anc:'middle'}]});
    $('#cbS',el).innerHTML=[['Open (first 5m open)',agg.o],['High (highest high)',agg.h],['Low (lowest low)',agg.l],['Close (last 5m close)',agg.c]].map(r=>`<div class="stat"><small>${r[0]}</small><b>${r[1].toFixed(2)}</b></div>`).join('');
    $('#cbT',el).innerHTML=`This candle is <b>${up?'bullish (up)':'bearish (down)'}</b>. Its body spans ${Math.abs(agg.c-agg.o).toFixed(2)} points while the full range is ${(agg.h-agg.l).toFixed(2)}. Every higher time frame candle is just many smaller candles summarised into four numbers.`};
  $('#cbN',el).addEventListener('input',draw);draw()};
PAGES.push({id:'m02',part:'I',n:2,title:'Reading the Chart',min:18,level:'Foundation',src:'Source: lesson "How to Read a Candlestick Chart"',
lead:'Every concept in this course is drawn on candlesticks. This module makes sure you can read them fluently: anatomy, time frames, swing points and trends.',
goals:['Set up a clean TradingView chart on Eastern time','Name the four prices every candle records','Explain how a higher time frame candle is built from lower ones','Identify swing highs, swing lows and the direction of a trend'],
html:`
<h2>Set up your chart first</h2>
<p>The instructor uses TradingView because it has the cleanest interface and almost every active day trader uses it. A free account is enough to begin. After signing up, open <em>Supercharts</em> to get a full chart. Then make three changes.</p>
<ol><li><b>Set the time zone to Eastern Time (New York).</b> Futures index markets run on New York time. Open is 9:30 a.m. Eastern wherever you live. If your chart is in another zone, every session and time rule in this course will land on the wrong candle.</li>
<li><b>Use neutral candle colours.</b> Green and red tie directly to feelings about winning and losing money, which works against the detachment you want. Blue and black (or white and black) keep candles informational. This course draws up candles in white and down candles in grey for the same reason.</li>
<li><b>Strip the clutter.</b> A white background, no grid lines and no indicators is enough. Indicators are used later only to mark levels, never to decide trades.</li></ol>
${TIP('<p>Do not buy a paid plan to start. Free is enough until you know exactly which feature you are missing.</p>')}
<h2>Anatomy of a candle</h2>
<p>A Japanese candlestick records four prices for one slice of time: where price <b>opened</b>, the <b>highest</b> price reached, the <b>lowest</b> price reached, and where it <b>closed</b>. The thick part is the <b>body</b> (open to close). The thin lines are <b>wicks</b>, traces left where price travelled but did not finish.</p>
${F('anatomy','On an up candle the open is the bottom of the body and the close is the top. On a down candle it is reversed. The wicks always show the high and the low.','Candlestick anatomy')}
<p>Other chart types exist (bars, line, Heikin-Ashi, Renko, footprint). Japanese candles are the standard here because they hold all four prices and make wicks visible, and wicks matter a great deal for liquidity, structure and gaps.</p>
<h2>Time frames: the same market at different zoom levels</h2>
<p>The time frame is the amount of time one candle covers. On a daily chart one candle is 24 hours. On a 5-minute chart each candle is 5 minutes. A 1-hour candle is just twelve 5-minute candles compressed. Use the builder below and watch the four numbers of the hourly candle change as more small candles are included.</p>
${W_('candleBuilder')}
<p>You will use several time frames together: higher ones (4-hour, 1-hour) to see direction and major levels, lower ones (15-minute, 5-minute, 1-minute) to time entries. The same patterns appear on all of them.</p>
<h2>Swing highs, swing lows and trends</h2>
<p>A <b>swing high</b> is a peak: a candle whose high is above the highs on either side. A <b>swing low</b> is the matching trough. A trend is nothing more than the sequence of those swings.</p>
${F2('trendUp','trendDown','Follow the swing points, not individual candles. Uptrends step up, downtrends step down. Each label marks the swing relative to the one before it.','Uptrend: higher highs (HH) and higher lows (HL)','Downtrend: lower highs (LH) and lower lows (LL)','Market structure')}
<p>When swings stop stepping in one direction the trend is in question. That is the subject of Module 5 (break of structure). For now your homework is to scroll through any chart, mark every swing high and low, and label the trend. Do it on three time frames.</p>
${WARN('<p>Reading a trend from the last two or three candles. Always zoom out until you can see at least three swing points on the same side.</p>')}`,
recap:['Set TradingView to Eastern Time. Keep the chart clean and neutral.','A candle = open, high, low, close. Body shows open to close, wicks show the extremes.','Higher time frame candles summarise lower ones. Use several time frames together.','Swing highs and lows define trends: HH+HL is up, LH+LL is down.']});
QZ.m02=[
{q:'On a down candle, which part of the body is the open?',o:['Bottom','Top','Lower wick tip','It depends on the time frame'],a:1,w:'A down candle opens high and closes lower, so the top of the body is the open.'},
{q:'You are in Brazil. At what time should the market open appear on your chart?',o:['9:30 in your local time','9:30 Eastern, if the chart is set to New York time','10:30','It varies by day'],a:1,w:'Charts must be set to Eastern time so that session times match the strategy rules.'},
{q:'A 1-hour candle contains how many 5-minute candles?',o:['6','12','24','60'],a:1,w:'60 minutes / 5 minutes = 12.'},
{q:'Which sequence describes an uptrend?',o:['Lower highs, lower lows','Higher highs, higher lows','Equal highs, equal lows','Higher highs, lower lows'],a:1,w:'Uptrends step upward: each swing high and swing low is above the previous one.'}];

/* ================= MODULE 3 ================= */
FIG.liqwho=()=>{const c=chain(100,[103,106,109,112,115,117,114,111,108,106,109,112,115,116.5],5);
  return candleChart({c,w:760,h:380,y:[94,128],alt:'Resting orders above a swing high and below a swing low',a:[
  {t:'zone',i1:5,i2:13,p1:'h5',p2:'h5+7',cls:'k-liq',s:'BUY-SIDE LIQUIDITY\nresting buy orders: stop-losses of shorts + breakout buyers',la:'tl'},
  {t:'zone',i1:9,i2:13,p1:'l9',p2:'l9-7',cls:'k-liq',s:'SELL-SIDE LIQUIDITY\nstop-losses of longs\n+ breakout sellers',la:'bl'},
  {t:'dot',i:5,p:'h5',cls:'k-blue',s:'swing high',dx:-9,anc:'end',dy:-4},{t:'dot',i:9,p:'l9',cls:'k-blue',s:'swing low',dx:-9,anc:'end',dy:16}]})};
FIG.sweepRev=()=>{const c=chain(100,[103,106,109,112,114,113,[113.5,5.5,.8],111,108,105,102,99],9);
  return candleChart({c,w:520,h:330,y:[94,124],alt:'Sweep followed by reversal',a:[{t:'hline',p:'h4',i1:4,i2:7,cls:'k-liq'},
  {t:'tag',i:6,p:'h6',dy:-8,s:'SWEEP',cls:'k-liq',anc:'middle'},{t:'arrow',i1:6.5,p1:'h6',i2:10,p2:'c10',cls:'k-bad',s:'reverses',dx:14}]})};
FIG.sweepCont=()=>{const c=chain(100,[103,106,109,112,114,113,[116,5.5,.8],118,121,124,127,130],9);
  return candleChart({c,w:520,h:330,y:[94,138],alt:'Sweep followed by continuation',a:[{t:'hline',p:'h4',i1:4,i2:7,cls:'k-liq'},
  {t:'tag',i:6,p:'h6',dy:-8,s:'SWEEP',cls:'k-liq',anc:'middle'},{t:'arrow',i1:7,p1:'c7',i2:11,p2:'h11+2',cls:'k-good',s:'keeps going',dx:-62,dy:34}]})};
PAGES.push({id:'m03',part:'II',n:3,title:'Liquidity Explained',min:20,level:'Core concept',src:'Source: lesson "Liquidity Explained"',
lead:'Liquidity is the centre of this whole approach. If you understand who is waiting where, price movement stops looking random.',
goals:['Define liquidity as resting orders and say exactly where it sits','Explain why large players need counterparties and where they find them','Describe a liquidity sweep and why it is only an opportunity','Avoid entering blindly at every high or low'],
html:`
<h2>What liquidity actually is</h2>
<p>Liquidity is the set of orders waiting in the market: buy stops, sell stops, buy limits and sell limits. Price only moves when orders are executed. If nobody trades, price stays flat. So the key question at any moment is: <em>where are the orders, and who is likely to trigger them?</em></p>
${DEF('Definition','<p><b>Liquidity</b> = resting orders sitting above and below price. Where orders cluster, price is drawn to them, because that is where large positions can be filled.</p>')}
<h2>Where the orders sit</h2>
<p>Look at any obvious swing high. Two groups have resting <b>buy</b> orders just above it:</p>
<ol><li><b>Breakout buyers.</b> Traders who plan to buy when price breaks above the old high.</li>
<li><b>Short sellers' stop-losses.</b> Anyone who shorted during the fall from that high placed a protective stop above it, and a stop on a short is a buy order.</li></ol>
<p>Below any obvious swing low the mirror image exists: breakout sellers, and the stop-losses of traders who bought during the rise (a stop on a long is a sell order). Highs and lows are not just numbers on a chart. They are stacks of pending orders.</p>
${F('liqwho','Every clear swing high holds a pool of buy orders above it, and every clear swing low holds a pool of sell orders below it.','Where resting orders live')}
<h2>Why large players hunt these pools</h2>
<p>An order only fills if someone takes the other side. A retail trader can buy 1 contract almost anywhere. A large institution that needs to buy thousands cannot simply click: it would push the price up against itself (slippage). To buy big, it needs a big pool of sellers. Where is the biggest pool of sellers? Below the lows. To sell big, it needs buyers, and the biggest pool of buyers is above the highs.</p>
${steps([['Retail view','Breakouts','Price above the high looks bullish, so buy. Price below the low looks bearish, so sell.'],['Large-player need','Counterparties','To sell a huge position it needs lots of buyers at one price.'],['The result','Sweep','Price is pushed through the high to trigger those buyers, filling the big seller, and may then fall.']])}
<p>This is the "reverse psychology" of the market: the obvious breakout is often the moment the big order is being filled on the other side.</p>
<h2>The liquidity sweep</h2>
<p>A <b>sweep</b> (also called a stop run or manipulation) is a push through a swing high or low that activates the resting orders there. After a sweep, price may reverse sharply, or it may keep going. The sweep itself only tells you that a big opportunity to fill orders existed.</p>
${F2('sweepRev','sweepCont','The same sweep, two outcomes. On the left, price takes the high and reverses. On the right, it takes the high and continues up.','Outcome A: reversal','Outcome B: continuation','A sweep is an opportunity, not a signal')}
${KEY('<p>Liquidity gives price the <b>opportunity</b> to reverse. It never promises a reversal. You need further evidence that the opportunity was actually taken, which is what the next modules teach.</p>')}
${WARN('<p>Placing a limit sell above every high and a limit buy below every low. Price often sweeps a level and keeps trending, and blind entries turn into heavy drawdowns. Wait for confirmation.</p>')}
<h2>Invalidation points and why they matter</h2>
<p>In an uptrend the previous swing low is where the trend is "invalidated": below it, structure has shifted. Beginners place stops exactly there, which is why those lows are packed with sell orders. Knowing where the crowd puts stops tells you where price is being drawn.</p>
<h2>Marking liquidity: a repeatable routine</h2>
<ol><li>Find the clear swing highs and swing lows on the chart.</li><li>Mark buy-side liquidity above highs and sell-side below lows.</li><li>Watch how price interacts with the level. Does it pierce and close back, or accept beyond?</li><li>Look for signs that large orders were absorbed (Modules 5 to 9).</li><li>Only then consider an entry. Entries, stops and targets come later in the course.</li></ol>`,
recap:['Liquidity = resting orders. Buy orders above highs, sell orders below lows.','Highs hold breakout buyers plus the stops of shorts. Lows hold breakout sellers plus the stops of longs.','Large players need counterparties, so they target the biggest pools.','A sweep is an opportunity to reverse, not a guarantee. Never fade every high or low blindly.']});
QZ.m03=[
{q:'A trader is short from lower prices with a stop above a swing high. When price hits that stop, what order executes?',o:['A sell order','A buy order','A limit sell','Nothing, stops do not execute'],a:1,w:'Closing a short means buying. A stop-loss on a short is therefore a buy order resting above the high.'},
{q:'Why would a large buyer want price to move below an obvious low?',o:['To scare the market','Because the pool of sell orders there lets them fill a large buy without much slippage','Because lows are always the end of the trend','It does not, they only buy breakouts'],a:1,w:'Sell orders below lows are the counterparties the buyer needs.'},
{q:'After price sweeps a high, what is the correct interpretation?',o:['Price must reverse now','Price must continue up','The opportunity to fill orders existed, direction still needs confirmation','The high is invalid'],a:2,w:'A sweep offers an opportunity. It does not confirm what price will do next.'},
{q:'What is wrong with placing a limit sell above every high?',o:['Nothing, highs always reverse','Price often sweeps and keeps trending, so you take avoidable losses','Limit orders are not allowed','It requires too much margin'],a:1,w:'Without confirmation you will be fading real breakouts as often as sweeps.'}];

/* ================= MODULE 4 ================= */
FIG.sessionDay=()=>{const c=chain(103.5,[105,106.5,[107.5,1.2,.7],106,104.5,[102,.7,1.3],103.5,105,104,105, 102.5,[99.5,.8,1.8],100.5,103.5,106.5,[109,1.2,.8],110.5,112,110.5,111.5,[113,1,.6], 112,111,112.5,[114.5,1.8,.6],112.5,109.5,106.5,103.5,100.5,[97.5,.6,1.5],98.5,97],4);
  return candleChart({c,w:780,h:400,y:[92,122],alt:'A day showing money shifting from session to session',a:[
  {t:'zone',i1:0,i2:9,p1:'B',p2:'T',band:1,cls:'k-blue',s:'ASIA  18:00-03:00',la:'tl'},{t:'zone',i1:10,i2:20,p1:'B',p2:'T',band:1,cls:'k-liq',s:'LONDON  03:00-08:30',la:'tl'},{t:'zone',i1:21,i2:32,p1:'B',p2:'T',band:1,cls:'k-good',s:'NEW YORK  08:30 pre / 09:30 open',la:'tl'},
  {t:'hline',p:'h2',i1:2,i2:22,cls:'k-blue'},{t:'hline',p:'l5',i1:5,i2:22,cls:'k-blue'},{t:'hline',p:'h20',i1:20,i2:32,cls:'k-liq'},{t:'hline',p:'l11',i1:11,i2:32,cls:'k-liq'},
  {t:'text',i:20,p:'h2',dy:16,s:'Asia high',cls:'k-blue',anc:'middle'},{t:'text',i:18,p:'l5',dy:-6,s:'Asia low',cls:'k-blue',anc:'middle'},{t:'text',i:28,p:'h20',dy:-7,s:'London high',cls:'k-liq',anc:'middle'},{t:'text',i:20,p:'l11',dy:17,s:'London low',cls:'k-liq',anc:'middle'},
  {t:'dot',i:11,p:'l11',cls:'k-bad',s:'sweeps Asia low',dx:-9,anc:'end',dy:12},{t:'dot',i:15,p:'h15',cls:'k-bad',s:'sweeps Asia high',dx:-9,anc:'end',dy:-4},{t:'dot',i:24,p:'h24',cls:'k-bad',s:'sweeps London high',dx:-9,anc:'end',dy:-4},{t:'dot',i:30,p:'l30',cls:'k-bad',s:'sweeps London low',dx:-9,anc:'end',dy:16},
  {t:'arrow',i1:12,p1:'c12',i2:14.6,p2:'h15-.6',cls:'k-good'},{t:'arrow',i1:25,p1:'h24-1',i2:29.4,p2:'l30+2',cls:'k-bad',s:'NY targets\nLondon low',anc:'end',dx:-26,dy:-8}]})};
FIG.pdhl=()=>{const c=chain(101,[103,[100.5,.8,1.2],103,106,108.5,[111,1,.7],[110,.8,.8],108,106.5,107.5,108.5, 109.5,111,[113.5,2.2,.6],111,107,103,100,[98,.6,1.4],99],6);
  return candleChart({c,w:760,h:360,y:[92,120],alt:'Previous day high and low as liquidity',a:[
  {t:'zone',i1:0,i2:10,p1:'B',p2:'T',band:1,cls:'k-blue',s:'PREVIOUS DAY',la:'tl'},{t:'zone',i1:11,i2:19,p1:'B',p2:'T',band:1,cls:'k-good',s:'TODAY',la:'tl'},
  {t:'hline',p:'h5',i1:5,i2:19,cls:'k-liq'},{t:'hline',p:'l1',i1:1,i2:19,cls:'k-liq'},
  {t:'text',i:2,p:'h5',dy:-7,s:'Previous day high (PDH)',cls:'k-liq',anc:'middle'},{t:'text',i:7,p:'l1',dy:17,s:'Previous day low (PDL)',cls:'k-liq',anc:'middle'},
  {t:'dot',i:13,p:'h13',cls:'k-bad',s:'sweeps PDH',dx:-9,anc:'end',dy:-4},{t:'dot',i:18,p:'l18',cls:'k-bad',s:'sweeps PDL',dx:-9,anc:'end',dy:14},{t:'arrow',i1:13.4,p1:'h13-1',i2:17.7,p2:'l18+1.5',cls:'k-bad'}]})};
FIG.lowres=()=>{const c=chain(100,[102,105,108,106,104,103,107,111,114,112,109,108,112,116,120,118,115,113,118,122,126,[126.5,4.5,.8],122,117,111,106,101],3);
  return candleChart({c,w:780,h:400,y:[94,138],alt:'Stacked lows swept in sequence',a:[
  {t:'hline',p:'l17',i1:17,i2:24,cls:'k-liq'},{t:'hline',p:'l11',i1:11,i2:25,cls:'k-liq'},{t:'hline',p:'l5',i1:5,i2:26,cls:'k-liq'},
  {t:'dot',i:17,p:'l17',cls:'k-liq',s:'low 3',dy:17,dx:0,anc:'middle'},{t:'dot',i:11,p:'l11',cls:'k-liq',s:'low 2',dy:17,dx:0,anc:'middle'},{t:'dot',i:5,p:'l5',cls:'k-liq',s:'low 1',dy:17,dx:0,anc:'middle'},
  {t:'tag',i:21,p:'h21',dy:-9,s:'SWEEP the high (entry area)',cls:'k-bad',anc:'middle'},{t:'arrow',i1:21.5,p1:'h21-3',i2:26,p2:'l26+1',cls:'k-bad',s:'each stacked low\nis another pool',dx:20,dy:-10}]})};
FIG.eqh=()=>{const c=chain(100,[104,108,111,113,[114,1,.8],111,108,106,109,112,[114,1,.8],113,[112,6,.5],108,104,101],4);
  return candleChart({c,w:760,h:360,y:[96,127],alt:'Equal highs',a:[
  {t:'zone',i1:4,i2:13,p1:115,p2:122,cls:'k-liq',s:'two sets of buy orders at one price:\nstops of both pullbacks + breakout buyers',la:'tl'},{t:'hline',p:115,i1:4,i2:13,cls:'k-liq',s:'equal highs'},
  {t:'dot',i:12,p:'h12',cls:'k-bad',s:'sweep',dx:12,dy:-2},{t:'arrow',i1:12.4,p1:'h12-1',i2:15,p2:'l15+1',cls:'k-bad'}]})};
FIG.newsdl=()=>{const c=chain(100,[100.4,99.8,100.3,100.1,100.5,[102,6,4],101,102,103,104.2,105.2,[106.6,2,.8],104,101,98,[96,.6,1.5]],8);
  return candleChart({c,w:760,h:360,y:[90,114],alt:'High and low of a news candle used as liquidity',a:[
  {t:'tag',i:5,p:'h5',dy:-10,s:'8:30 NEWS CANDLE',cls:'k-ink',anc:'middle'},
  {t:'hline',p:'h5',i1:5,i2:12,cls:'k-liq'},{t:'hline',p:'l5',i1:5,i2:15,cls:'k-liq'},{t:'text',i:9,p:'h5',dy:-7,s:'data high',cls:'k-liq',anc:'middle'},{t:'text',i:11,p:'l5',dy:-7,s:'data low',cls:'k-liq',anc:'middle'},
  {t:'dot',i:11,p:'h11',cls:'k-bad',s:'sweeps data high',dx:-9,anc:'end',dy:-4},{t:'dot',i:15,p:'l15',cls:'k-bad',s:'collects data low',dx:-9,anc:'end',dy:14}]})};
WID.sessions=el=>{
  const SEG=[{n:'Asia',a:0,b:540,c:'var(--blue)',d:'First session of the trading day (18:00 to 03:00 ET). Often builds the first range. Its high and low become targets for London.'},
  {n:'London',a:540,b:870,c:'var(--liq)',d:'Opens 03:00 ET. London money often sweeps one side of the Asia range, then drives toward the other. (The pre-market opens at 02:00.)'},
  {n:'NY pre-market',a:870,b:930,c:'var(--ink2)',d:'08:30 to 09:30 ET. US traders arrive and pre-market manipulation is common. Also when much economic data prints (8:30).'},
  {n:'New York',a:930,b:1380,c:'var(--good)',d:'Cash open at 09:30 ET through 17:00. The session this course trades. New money arrives, so expect a sweep of London or Asia levels.'},
  {n:'Spread hour',a:1380,b:1440,c:'var(--mute)',d:'17:00 to 18:00 ET. Markets are closed or very thin. On CFD/forex brokers spreads widen sharply. Do not trade.'}];
  const note=m=>{if(m>=930&&m<950)return'MANIPULATION WINDOW (09:30 to 09:50): expect price to sweep a nearby level, often one side of the opening range.';
    if(m>=950&&m<970)return'ENTRY WINDOW (09:50 to 10:10): the ideal time to look for an entry once the sweep is done.';
    if(m>=970&&m<990)return'LATE ENTRY (10:10 to 10:30): still possible, but the day is slowing down.';
    if(m>=990&&m<1140)return'AFTER 10:30: the instructor stops looking if no trade has appeared. Volume tends to fade.';
    if(m>=1140&&m<1380)return'PM session begins about 13:00. The instructor does not trade it, but it exists.';return''};
  el.innerHTML=`<div class="wid-h">Session clock (Eastern Time)<span>Interactive</span></div><div class="wid-b"><div style="position:relative;height:58px;border-radius:8px;overflow:hidden;border:1px solid var(--line)" id="scBar"></div>
  <div style="position:relative;height:24px;font:500 11px var(--f-mono);color:var(--mute)" id="scTicks"></div>
  <div class="ctl" style="margin-top:6px"><div style="grid-column:1/-1"><label for="scR">Drag through the day (day starts 18:00 ET) <output id="scO"></output></label><input id="scR" type="range" min="0" max="1439" value="930"></div></div><div class="read" id="scT"></div></div>`;
  $('#scBar',el).innerHTML=SEG.map(s=>`<div title="${s.n}" style="position:absolute;left:${s.a/14.4}%;width:${(s.b-s.a)/14.4}%;top:0;bottom:0;background:color-mix(in srgb,${s.c} 30%,var(--panel));border-right:1px solid var(--line);display:grid;place-items:center;font:600 12px var(--f-body);color:var(--ink);overflow:hidden;white-space:nowrap">${(s.b-s.a)>100?s.n:''}</div>`).join('')+`<div id="scM" style="position:absolute;top:0;bottom:0;width:3px;background:var(--ink);box-shadow:0 0 0 2px var(--panel)"></div><div style="position:absolute;left:${930/14.4}%;width:${60/14.4}%;bottom:0;height:7px;background:var(--liq)" title="09:30 to 10:30 key hour"></div>`;
  $('#scTicks',el).innerHTML=[0,360,540,870,930,1140,1380].map((m,i)=>{const t=(18*60+m)%1440,l=`${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;return`<span style="position:absolute;left:${m/14.4}%;transform:translateX(${i===6?'-100%':i===0?'0':'-50%'});top:5px">${l}</span>`}).join('');
  const upd=()=>{const v=+$('#scR',el).value,t=(18*60+v)%1440,l=`${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;$('#scO',el).textContent=l+' ET';$('#scM',el).style.left=(v/14.4)+'%';
    const s=SEG.find(s=>v>=s.a&&v<s.b);$('#scT',el).innerHTML=`<b>${s.n}.</b> ${s.d}${note(v)?`<br><br><b style="color:var(--liq-ink)">${note(v)}</b>`:''}`};
  $('#scR',el).addEventListener('input',upd);upd()};
PAGES.push({id:'m04',part:'II',n:4,title:'Advanced Liquidity Concepts',min:26,level:'Core concept',src:'Source: lesson "Advanced Liquidity Concepts"',
lead:'Not every high and low is equally important. This module ranks the draws on liquidity so you know which ones price is most likely to reach for, and use them as both entries and targets.',
goals:['Mark the Asia, London and New York session highs and lows on Eastern time','Use previous day high and low as higher-probability levels','Recognise stacked ("low resistance") and equal highs and lows','Use news candle highs and lows as liquidity'],
html:`
<p>In the last module you learned that liquidity sits above highs and below lows. A chart has dozens of highs and lows, so which ones matter? The course gives you five families. Each can be an <b>entry</b> (where a sweep may start a reversal) or a <b>target</b> (where an open position can be closed because many orders wait there).</p>
${tbl(['#','Draw on liquidity','Why it is stronger'],[['1','Session highs and lows','New money from a new region arrives each session'],['2','Previous day high and low','All three sessions combined into one level'],['3','Low resistance (stacked) highs/lows','Several untouched pools in a row'],['4','Relative equal highs/lows','Two sets of orders at one price'],['5','News (data) highs/lows','Volatile candle edges after scheduled data']])}
<h2>1. Session highs and lows</h2>
<p>The 24-hour day splits into three sessions, each driven by traders in a different region. When a new session opens, new money enters. That money often targets the highs and lows the previous session just created, because they hold resting orders. Set your chart to Eastern time and use these windows.</p>
${W_('sessions')}
<p>A typical sequence: Asia builds a range. London opens and pushes below the Asia low to fill buy orders, then rallies and takes the Asia high where it can sell. New York then arrives, pushes above the London high, and heads for the London low. It does not happen every day, but when it does the map is clear.</p>
${F('sessionDay','Illustrative day. Each new session sweeps the extreme of the previous session before heading for the other side. Red dots mark the sweeps; arrows show the delivery that followed.','Money shifting session to session')}
${TIP('<p>Use a session indicator (many are free on TradingView) to draw session highs and lows automatically, then always verify the session start times against the table above.</p>')}
<h2>2. Previous day high and low</h2>
<p>The previous day high (PDH) is simply the highest point of all three sessions combined, and the previous day low (PDL) the lowest. They are the same idea scaled up, and they are watched by almost everyone.</p>
${F('pdhl','Today pushes above PDH, takes the buy orders there, and then delivers to PDL. This is a pattern, not a rule: do not press sell every time price touches PDH.','Previous day levels')}
<h2>3. Low resistance liquidity: the cookie jar</h2>
<p>When a trend leaves several swing lows (or highs) stacked in a row and untouched, each one is another pool. Once a large player has sold into a sweep at the top, there is no reason to stop at the first low. Every stacked low is another jar of cookies, and the market is greedy.</p>
${F('lowres','Three stacked lows below a swept high. The decline runs through all of them. The same structure inverted works for stacked highs in a downtrend.','Stacked highs and lows')}
<p>These also work in reverse. If price has just run through a stack of lows, a lot of sell orders have been filled. That fuel can power a rise, which is why stacked levels serve as entries <em>and</em> as exits.</p>
<h2>4. Relative equal highs and lows</h2>
<p>When two highs sit at the same price (or within a few ticks), the buy orders above them are doubled: stops of traders who shorted from each peak, plus breakout buyers waiting on the line. That makes equal highs and lows especially attractive to sweep.</p>
${F('eqh','Two peaks at one price (115). One sweep captures both sets of orders.','Equal highs')}
<h2>5. News data highs and lows</h2>
<p>Scheduled economic reports (CPI, PPI, jobless claims, FOMC) cause violent candles, mostly at 8:30 a.m. Eastern. The high and low of that candle become liquidity for the rest of the day. Use a free economic calendar and look for the red-folder (high impact) events.</p>
${F('newsdl','The edges of the 8:30 news candle act like any other high and low. Here the data high is swept, then the data low is taken.','News candle as liquidity')}
${WARN('<p>Treating any of these levels as a trigger by itself. "Price touched PDH, so I sell" is the same blind entry as before. A level only gives the opportunity. Confirmation comes from the next modules.</p>')}
<h2>Homework</h2>
<ul><li>Mark Asia, London and New York highs and lows for the last 10 trading days.</li><li>For each day note which one was swept first and where price went afterward.</li><li>Repeat for previous day high/low, equal highs/lows and two news days.</li></ul>`,
recap:['Rank draws on liquidity: sessions, previous day, stacked, equal, news.','Session times (ET): Asia 18:00-03:00, London 03:00-08:30, New York 08:30 pre / 09:30 open.','New sessions tend to sweep the previous session, then head for the opposite extreme.','Stacked or equal levels hold more orders and attract price harder.','Every level is both an entry area and a target. None is a standalone signal.']});
QZ.m04=[
{q:'London session runs from:',o:['18:00 to 03:00 ET','03:00 to 08:30 ET','09:30 to 17:00 ET','08:30 to 09:30 ET'],a:1,w:'London is 03:00 to 08:30 ET, ending where New York pre-market begins.'},
{q:'Why are relative equal highs attractive to price?',o:['They are rare','They hold two sets of buy orders at essentially one price','They always reverse','Because they are formed in Asia'],a:1,w:'Stops of shorts from both peaks plus breakout buyers stack at the same level.'},
{q:'Asia swept its low, then London took the Asia high. New York opens. A reasonable expectation is:',o:['New York ignores prior levels','New York may sweep the London high and then target London or Asia lows','Price will go straight up','The market is closed'],a:1,w:'This is the "money shifts session to session" pattern. It is a probability, not a certainty.'},
{q:'Where does the instructor look for news data liquidity?',o:['The high and low of the high-impact news candle','The previous week low','The 200 moving average','Only the Asia range'],a:0,w:'The highs and lows of the news candle behave like other draws on liquidity.'},
{q:'The spread hour is:',o:['09:30 to 10:30 ET','17:00 to 18:00 ET','03:00 to 04:00 ET','13:00 to 14:00 ET'],a:1,w:'Between the end of the New York session at 17:00 and the new day at 18:00, liquidity is thin and spreads widen.'}];
</script>

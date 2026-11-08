<script>
/* ================= MODULE 13: RISK + PSYCHOLOGY ================= */
FIG.rrBox=()=>`<svg viewBox="0 0 760 250" role="img" aria-label="Risk and reward of the example trade">
<text x="20" y="26" class="b big">Example short on 1 ES contract (1-minute chart)</text>
<g class="k-bad"><rect x="20" y="52" width="${16/77*560}" height="38" class="zone"/><text x="${28+16/77*560}" y="76" class="kt">Risk: 16 ticks = 4.00 points = $200</text></g>
<g class="k-good"><rect x="20" y="120" width="560" height="38" style="fill:var(--good);opacity:.85"/><text x="28" y="144" style="fill:#04180F;font-weight:500">Reward: 77 ticks = 19.25 points = $962.50</text></g>
<text x="20" y="196" class="b">Reward-to-risk = 77 / 16 = 4.81  (written 1 : 4.81)</text>
<text x="20" y="220">ES tick = 0.25 points = $12.50. Wins needed to break even at this ratio: only 1 in 5.8 trades.</text></svg>`;
FIG.beCurve=()=>{const pts=[];for(let r=.5;r<=6.001;r+=.25)pts.push([r,100/(1+r)]);
  return plotLines({w:780,h:340,x:[0,6],y:[0,70],xt:[0,1,2,3,4,5,6].map(v=>({v,s:'1:'+v})),yt:[0,10,20,30,40,50,60,70].map(v=>({v,s:v+'%'})),xlab:'Reward-to-risk (risk 1 : reward R)',ylab:'Win rate needed to break even',alt:'Break-even win rate versus reward-to-risk',
  s:[{pts,cls:'k-liq',w:3,area:1}],p:[{x:1,y:50,s:'1:1 needs 50%',cls:'k-ink'},{x:2,y:33.33,s:'1:2 needs 33%',cls:'k-ink'},{x:3,y:25,s:'1:3 needs 25%',cls:'k-ink'},{x:4.81,y:17.24,s:'1:4.81 needs 17%',cls:'k-good',dy:-14}],hl:[{v:50,cls:'k-mute'}]})};
FIG.recover=()=>{const pts=[];for(let l=0;l<=60;l+=2)pts.push([l,l/(100-l)*100]);
  return plotLines({w:780,h:320,x:[0,60],y:[0,160],xt:[0,10,20,30,40,50,60].map(v=>({v,s:v+'%'})),yt:[0,40,80,120,160].map(v=>({v,s:v+'%'})),xlab:'Loss on the account',ylab:'Gain needed to recover',alt:'Gain required to recover from a drawdown',
  s:[{pts,cls:'k-bad',w:3,area:1}],p:[{x:10,y:11.1,s:'-10% needs +11%',cls:'k-ink'},{x:20,y:25,s:'-20% needs +25%',cls:'k-ink'},{x:33.3,y:50,s:'-33% needs +50%',cls:'k-ink'},{x:50,y:100,s:'-50% needs +100%',cls:'k-bad',dx:-9,anc:'end'}]})};
FIG.ddTypes=()=>{const cl=[100000,100800,101900,101200,102600,102100,103300,102500,103800,103100,102300],pk=[100500,101600,102700,101900,103400,102700,104100,103000,104600,103600,102900];
  let mp=0,mc=0;const tI=[],tE=[],cs=[],ps=[];cl.forEach((v,i)=>{mp=Math.max(mp,pk[i]);mc=Math.max(mc,v);tI.push([i,mp-3500]);tE.push([i,mc-3500]);cs.push([i,v]);ps.push([i,pk[i]])});
  const k=v=>(v/1000)+'k';
  return plotLines({w:780,h:380,x:[0,10],y:[95000,105500],xt:[...Array(11).keys()].map(v=>({v,s:'day '+v})),yt:[96000,98000,100000,102000,104000].map(v=>({v,s:k(v)})),alt:'Three kinds of drawdown limit',pad:{r:110},
  s:[{pts:cs,cls:'k-ink',w:2.5},{pts:ps,cls:'k-mute',d:1},{pts:tI,cls:'k-bad',w:2},{pts:tE,cls:'k-liq',w:2}],hl:[{v:96500,cls:'k-good',s:'static limit 96.5k'}],p:[{x:10,y:102300,cls:'k-ink',s:'closing equity',dx:-9,anc:'end',dy:20},{x:10,y:tI[10][1],cls:'k-bad',s:'trailing intraday limit',dx:-9,anc:'end',dy:18},{x:10,y:tE[10][1],cls:'k-liq',s:'end-of-day trailing limit',dx:-9,anc:'end',dy:-10},{x:8,y:104600,cls:'k-mute',s:'intraday peak',dx:-9,anc:'end',dy:-8,r:4}]})};
WID.sizer=el=>{
  const INS={ES:['E-mini S&P 500 (ES)',12.5],NQ:['E-mini Nasdaq (NQ)',5],MES:['Micro S&P 500 (MES)',1.25],MNQ:['Micro Nasdaq (MNQ)',.5]};
  el.innerHTML=`<div class="wid-h">Position size and risk calculator<span>Interactive</span></div><div class="wid-b"><div class="ctl">
  <div><label for="szI">Instrument</label><select id="szI">${Object.entries(INS).map(([k,v])=>`<option value="${k}">${v[0]}</option>`).join('')}</select></div>
  <div><label for="szA">Account balance ($)</label><input id="szA" type="number" min="1000" step="1000" value="50000"></div>
  <div><label for="szR">Risk per trade <output id="szRO"></output></label><input id="szR" type="range" min="25" max="500" step="25" value="100"></div>
  <div><label for="szS">Stop distance, ticks <output id="szSO"></output></label><input id="szS" type="range" min="4" max="80" value="20"></div>
  <div><label for="szF">Fixed contracts (for the chart)</label><input id="szF" type="number" min="1" max="50" value="2"></div></div>
  <div class="stats" id="szSt"></div><div id="szC" style="margin-top:14px"></div><div class="read" id="szT"></div></div>`;
  const draw=()=>{const ins=INS[$('#szI',el).value],tv=ins[1],bal=+$('#szA',el).value||1,rp=+$('#szR',el).value/100,st=+$('#szS',el).value,fx=Math.max(1,+$('#szF',el).value||1);
    $('#szRO',el).textContent=rp.toFixed(2)+'%';$('#szSO',el).textContent=st+' ticks ('+(st/4).toFixed(2)+' pts)';
    const riskD=bal*rp/100,per=st*tv,ct=Math.floor(riskD/per),act=ct*per,fixedRisk=fx*per;
    $('#szSt',el).innerHTML=`<div class="stat"><small>Dollar risk budget</small><b>$${riskD.toFixed(0)}</b></div><div class="stat"><small>Risk per contract</small><b>$${per.toFixed(2)}</b></div><div class="stat ${ct<1?'bad':'good'}"><small>Contracts allowed</small><b>${ct}</b></div><div class="stat"><small>Actual risk</small><b>$${act.toFixed(0)} (${(act/bal*100).toFixed(2)}%)</b></div>`;
    const pts=[];for(let s=4;s<=80;s+=2)pts.push([s,fx*s*tv/bal*100]);const ymax=Math.max(6,Math.ceil(Math.max(...pts.map(p=>p[1]))/1)+1);
    $('#szC',el).innerHTML=plotLines({w:760,h:260,x:[4,80],y:[0,ymax],xt:[4,20,40,60,80].map(v=>({v,s:v+' ticks'})),yt:[...Array(Math.floor(ymax/2)+1).keys()].map(i=>i*2).map(v=>({v,s:v+'%'})),alt:'Risk percent for a fixed contract size',xlab:'Stop distance',
      hl:[{v:3,cls:'k-liq',s:'3% ceiling'},{v:5,cls:'k-bad',s:'5%: unacceptable'}],s:[{pts,cls:'k-blue',w:3}],p:[{x:st,y:fx*st*tv/bal*100,s:(fx*st*tv/bal*100).toFixed(2)+'% with '+fx+' contract'+(fx>1?'s':''),cls:'k-ink',anc:'end',dx:-9}]});
    const fr=fixedRisk/bal*100;
    $('#szT',el).innerHTML=ct<1?`<b style="color:var(--bad)">Too wide for this budget.</b> One contract risks $${per.toFixed(0)}, more than the $${riskD.toFixed(0)} you allow. Use a smaller instrument (micros), a tighter stop, or skip the trade.`:`With <b>${fx} fixed contract${fx>1?'s':''}</b> a ${st}-tick stop risks $${fixedRisk.toFixed(0)} = <b style="color:${fr>3?'var(--bad)':'var(--good)'}">${fr.toFixed(2)}%</b> of the account. ${fr>3?'That is above the 3% ceiling. Cut the contract size, as the lesson does when stops are unusually wide.':'That sits inside the 1-3% band.'}`};
  $$('select,input',el).forEach(x=>x.addEventListener('input',draw));draw()};
WID.equitySim=el=>{
  el.innerHTML=`<div class="wid-h">Equity simulator: 40 possible futures for the same strategy<span>Interactive</span></div><div class="wid-b"><div class="ctl">
  <div><label for="qW">Win rate <output id="qWO"></output></label><input id="qW" type="range" min="20" max="80" value="40"></div>
  <div><label for="qR">Reward-to-risk <output id="qRO"></output></label><input id="qR" type="range" min="5" max="50" value="25"></div>
  <div><label for="qK">Risk per trade <output id="qKO"></output></label><input id="qK" type="range" min="25" max="1000" step="25" value="100"></div>
  <div><label for="qN">Trades <output id="qNO"></output></label><input id="qN" type="range" min="30" max="300" step="10" value="120"></div></div>
  <button class="btn liq" id="qGo" type="button">Run again</button><div id="qC" style="margin-top:12px"></div><div class="stats" id="qS"></div><div class="read" id="qT"></div></div>`;
  let seed=11;
  const draw=()=>{const p=+$('#qW',el).value/100,rr=+$('#qR',el).value/10,rk=+$('#qK',el).value/10000,n=+$('#qN',el).value;
    $('#qWO',el).textContent=(p*100)+'%';$('#qRO',el).textContent='1 : '+rr.toFixed(1);$('#qKO',el).textContent=(rk*100).toFixed(2)+'%';$('#qNO',el).textContent=n;
    const r=rng(seed),runs=[],fin=[],dd=[],ls=[];
    for(let k=0;k<40;k++){let e=100,pk=100,md=0,st=0,ms=0;const pts=[[0,100]];for(let i=1;i<=n;i++){if(r()<p){e*=1+rk*rr;st=0}else{e*=1-rk;st++;ms=Math.max(ms,st)}pk=Math.max(pk,e);md=Math.max(md,(pk-e)/pk);pts.push([i,e])}runs.push(pts);fin.push(e);dd.push(md);ls.push(ms)}
    const med=a=>[...a].sort((x,y)=>x-y)[a.length>>1],mx=Math.max(...fin.map(x=>Math.min(x,400))),mnv=Math.min(...runs.flat().map(q=>q[1]));
    const ymax=Math.ceil(Math.max(130,Math.min(mx*1.05,600))/10)*10,ymin=Math.floor(Math.min(80,mnv*.97)/10)*10;
    const mid=[];for(let i=0;i<=n;i++){mid.push([i,med(runs.map(rr_=>rr_[i][1]))])}
    $('#qC',el).innerHTML=plotLines({w:760,h:320,x:[0,n],y:[ymin,ymax],xt:[0,.25,.5,.75,1].map(f=>({v:Math.round(n*f),s:Math.round(n*f)})),yt:[ymin,100,ymax].map(v=>({v,s:v})),xlab:'Trade number',ylab:'Account (start = 100)',alt:'Forty simulated equity curves',hl:[{v:100,cls:'k-mute'}],
      s:[...runs.map(q=>({pts:q.map(z=>[z[0],Math.min(z[1],ymax)]),cls:'k-blue',w:1})),{pts:mid,cls:'k-liq',w:3.5}]});
    const prof=fin.filter(x=>x>100).length,ex=p*rr-(1-p);
    $('#qS',el).innerHTML=`<div class="stat ${ex>0?'good':'bad'}"><small>Expectancy per trade</small><b>${ex>=0?'+':''}${ex.toFixed(2)} R</b></div><div class="stat"><small>Median final account</small><b>${med(fin).toFixed(0)}</b></div><div class="stat ${prof>=30?'good':'bad'}"><small>Runs ending profitable</small><b>${prof} / 40</b></div><div class="stat bad"><small>Median worst drawdown</small><b>${(med(dd)*100).toFixed(0)}%</b></div><div class="stat"><small>Typical longest losing streak</small><b>${med(ls)} in a row</b></div>`;
    $('#qT',el).innerHTML=ex<=0?`<b style="color:var(--bad)">Negative expectancy.</b> With these inputs the average trade loses ${Math.abs(ex).toFixed(2)}R. No amount of discipline fixes that: you need a real edge from a tested strategy first.`:`<b style="color:var(--good)">Positive expectancy of ${ex.toFixed(2)}R per trade</b>, yet look at the spread: same strategy, forty different outcomes, and a typical losing streak of ${med(ls)}. This is why sizing must let you survive streaks you cannot predict.`};
  $$('input',el).forEach(x=>x.addEventListener('input',draw));$('#qGo',el).addEventListener('click',()=>{seed=(seed*7919+13)>>>0;draw()});draw()};
PAGES.push({id:'m13',part:'V',n:13,title:'Risk Management & Psychology',min:30,level:'Essential',src:'Source: lesson "Risk Management & Psychology"',
lead:'You can have a good strategy and still lose everything. Risk management keeps you alive through losing streaks, and psychology is simply whether you follow the plan when it hurts.',
goals:['Define trading psychology as discipline and name the three fatal flaws','Choose a risk per trade between 1 and 3 percent and justify it','Use fixed contract sizing and know when to halve it','Read the maths of break-even win rates, streaks and drawdowns'],
html:`
<h2>Psychology is discipline</h2>
<p>The instructor defines trading psychology narrowly, and usefully: <b>it is discipline</b>. Good psychology means you only take trades when your strategy presents them, you follow your risk plan, and you do not overtrade, overleverage or overrisk. Bad psychology is failing to follow either plan. It cannot be fixed with motivation or homework. At the point of decision, it is a choice.</p>
${tbl(['The three fatal flaws','What it looks like'],[['Overrisking','Too much capital on one idea'],['Overleveraging','A position size that one bad trade can wreck'],['Overtrading','Taking setups that are not in the strategy, usually to recover or because of boredom']])}
<p>The chart colour advice from Module 2 is part of this: use neutral colours so that candles do not become emotional triggers.</p>
<h2>You need an edge before you can manage risk</h2>
<p>A strategy has an edge when backtested and forward-tested records show a positive win rate combined with a positive reward-to-risk. Journalling every trade (the instructor mentions trade-journal software) is how that evidence is built. Risk management on a strategy with no edge only slows the loss.</p>
<h2>Why risk comes first</h2>
<p>The point of risk management is not to maximise a single trade. It is to <b>live to trade another day</b>. If two or three losses can erase weeks of profit or break a loss limit, the plan has failed no matter how clever the entries are.</p>
<h2>How much to risk</h2>
${KEY('<p>On a live account a sweet spot is <b>1% to 3%</b> of the account per trade. Risking 5%, 10% or 20% on one trade is unacceptable.</p>')}
<h2>Fixed contracts instead of constant calculations</h2>
<p>You can compute an exact percentage before every trade with a lot-size calculator. The instructor avoids that on live futures: opening a calculator while price is moving invites hesitation and mistakes. Instead, he fixes a standard number of contracts for ES and for NQ, and chooses it so that the <b>largest typical stop (about 35 ticks) risks no more than about 3 to 4%</b> of the account.</p>
<p>Fixed contracts also balance themselves. A wide stop usually targets a smaller multiple of risk, while a tight stop can target a very large multiple. Over a series of trades the dollar outcome evens out without recalculating each time.</p>
${W_('sizer')}
<h3>The lesson's example</h3>
${F('rrBox','The tight stop risks little and the structure offered a big target. The same dollar risk on a wide stop would normally be paired with a smaller target. Fixed contracts let both be sized sensibly.','Risk and reward on a real trade')}
<h2>When to cut size in half</h2>
${steps([['Case 1','Unusually wide stop','Structure demands a stop far larger than your normal range. Halve the contracts.'],['Case 2','High-impact news','Fundamental data (for example PPI or CPI at 8:30) makes price choppy and erratic. Halve the contracts.']])}
<h2>The mathematics every trader should know</h2>
<h3>1. Break-even win rate</h3>
<p>If you risk 1 to make R, you only need to win 1 out of (1 + R) trades to break even. A strategy does not need a high win rate if the reward is large.</p>
${F('beCurve','At 1:1 you must win more than half your trades. At 1:3 only 25%. The example trade at 1:4.81 would break even at 17%.','Break-even win rate')}
<h3>2. Losing streaks are normal</h3>
<p>With a 40% win rate, five losses in a row will happen routinely. Try it in the simulator: change the inputs and watch forty possible futures of the same strategy.</p>
${W_('equitySim')}
<h3>3. Drawdowns are expensive to recover</h3>
${F('recover','A 50% loss needs a 100% gain. The deeper the hole, the less it matters how good your strategy is. Small risk per trade is what keeps you out of the steep part of this curve.','The recovery curve')}
<h2>Mindset traps</h2>
${steps([['Trap','Get-rich-quick','Expecting a fortune in a few months leads to forced setups and rising leverage. If that is the expectation, buy lottery tickets, the instructor jokes.'],['Trap','Unseen history','Viewers see a trader sized up and forget the years of unseen work behind it. Your timeline is your own.'],['Trap','Calculator paralysis','Switching windows to compute size while price moves causes panic.']])}`,
recap:['Psychology = discipline: follow the strategy and the risk plan, and avoid overrisking, overleveraging and overtrading.','Risk 1% to 3% per trade. Never 5%, 10% or 20%.','Fixed contract sizing avoids live calculations. Halve size for wide stops or high-impact news.','Know your break-even win rate, your likely losing streak, and the recovery curve.','Risk management without a tested edge only slows the loss.']});
QZ.m13=[
{q:'How is trading psychology defined in the lesson?',o:['Staying positive','Discipline: following the strategy and risk plan','Controlling emotions with meditation','Ignoring losses'],a:1,w:'It is the behavioural adherence to the plan, nothing mystical.'},
{q:'A strategy has a 1:3 reward-to-risk. What win rate is needed to break even?',o:['50%','33%','25%','10%'],a:2,w:'1 / (1 + 3) = 25%.'},
{q:'When does the instructor cut contract size in half?',o:['After a win','Wide stop loss or high-impact news','On Mondays','Never'],a:1,w:'Two specified cases: unusually large stop and erratic news-driven markets.'},
{q:'An account falls 50%. What gain is needed to get back to even?',o:['50%','75%','100%','200%'],a:2,w:'Half of the capital must double: +100%.'},
{q:'Why does the instructor prefer fixed contracts?',o:['They are cheaper','They avoid using calculators during live trading and balance outcomes across stop sizes','The exchange requires it','They guarantee profit'],a:1,w:'Less friction in a fast market and sensible exposure over a series of trades.'}];

/* ================= MODULE 14: FUNDED ACCOUNTS ================= */
WID.propSim=el=>{
  el.innerHTML=`<div class="wid-h">Evaluation planner: what are your real odds?<span>Interactive</span></div><div class="wid-b"><div class="ctl">
  <div><label for="pT">Profit target ($)</label><input id="pT" type="number" min="500" step="500" value="8000"></div>
  <div><label for="pD">Maximum drawdown ($)</label><input id="pD" type="number" min="500" step="500" value="3500"></div>
  <div><label for="pK">Risk per trade ($)</label><input id="pK" type="number" min="50" step="50" value="400"></div>
  <div><label for="pF">Evaluation fee ($)</label><input id="pF" type="number" min="10" step="10" value="279"></div>
  <div><label for="pW">Win rate <output id="pWO"></output></label><input id="pW" type="range" min="25" max="70" value="45"></div>
  <div><label for="pR">Reward-to-risk <output id="pRO"></output></label><input id="pR" type="range" min="5" max="40" value="20"></div></div><div class="stats" id="pS"></div><div class="read" id="pT2"></div></div>`;
  const draw=()=>{const T=+$('#pT',el).value,D=+$('#pD',el).value,K=+$('#pK',el).value,F_=+$('#pF',el).value,p=+$('#pW',el).value/100,rr=+$('#pR',el).value/10;
    $('#pWO',el).textContent=(p*100)+'%';$('#pRO',el).textContent='1 : '+rr.toFixed(1);const r=rng(99);let pass=0,tr=0;
    for(let a=0;a<1000;a++){let e=0;for(let i=1;i<=400;i++){e+=r()<p?K*rr:-K;if(e>=T){pass++;tr+=i;break}if(e<=-D)break}}
    const pr=pass/1000,ex=p*rr-(1-p);
    $('#pS',el).innerHTML=`<div class="stat"><small>Losses to fail</small><b>${Math.ceil(D/K)} in a row</b></div><div class="stat"><small>Wins to hit target</small><b>${Math.ceil(T/(K*rr))} at 1:${rr.toFixed(1)}</b></div><div class="stat ${pr>.5?'good':'bad'}"><small>Simulated pass rate</small><b>${(pr*100).toFixed(0)}%</b></div><div class="stat"><small>Typical trades to pass</small><b>${pass?Math.round(tr/pass):'n/a'}</b></div><div class="stat bad"><small>Expected fees per pass</small><b>${pr>0?'$'+(F_/pr).toFixed(0):'no passes'}</b></div>`;
    $('#pT2',el).innerHTML=`This uses a fixed drawdown limit and no other rules, so reality is harsher (trailing limits, consistency rules, daily caps). The honest reading: if your edge is ${ex>0?'positive ('+ex.toFixed(2)+'R per trade)':'not positive'}, ${ex>0?'size controls whether you survive the variance.':'the fee is simply a donation.'} Each failed attempt costs real money, and the lesson warns that people only realise it after blowing the account.`};
  $$('input',el).forEach(x=>x.addEventListener('input',draw));draw()};
PAGES.push({id:'m14',part:'V',n:14,title:'Funded Accounts Explained',min:18,level:'Optional',src:'Source: lesson "Funded Accounts Explained"',
lead:'Prop firms let a trader with little capital trade a large account after passing a test. They are a tool, not a shortcut. The test only gets passed by people who are already good.',
goals:['Explain how a prop firm challenge works and what you are really paying for','Read the rules that matter: target, drawdown type, consistency and payout cap','Choose risk differently in the evaluation and in the funded phase','Estimate the true cost of getting funded'],
html:`
<h2>How it works</h2>
<p>A <b>prop firm</b> charges a fee for a challenge. You trade a simulated account of a given size (typically $25k, $50k, $100k or $150k in futures). You must reach a profit target without breaking the loss limit (the <b>drawdown</b>). If you pass, you move to a funded stage where you can earn payouts according to a profit split. Some firms offer "instant funding" accounts with no evaluation, but with stricter payout rules.</p>
<p>The appeal for a small account is obvious: pay a few hundred dollars to trade a $100,000 account. The catch is also obvious: you need to be good. As the lesson puts it, to make money, whether on a live, demo or prop account, you need to be a skilled trader, and strategy and risk management have not even been fully taught at that point in the series.</p>
${WARN('<p>Buying accounts before you can trade. The fee is real money, and many people only feel that after they blow an account.</p>')}
<h2>Rules that decide whether you survive</h2>
${tbl(['Rule','What to check','Example figures from the lesson'],[['Profit target','Percent to reach during evaluation','8% on a $100,000 account = $8,000'],['Maximum drawdown','How much equity you can lose, and how it is measured','$3,500 in one example; other firms offer $3,000 or $5,000 on $150k'],['Drawdown type','Static, trailing end of day, or trailing on live equity','See figure below'],['Consistency rule','Caps how much of the total profit one day or trade can supply','50% in one example, 20% in another'],['Contract limit','Maximum position size','10 contracts in one example'],['Minimum days','Minimum trading days to pass or request a payout','2 days evaluation, 5 days payout in the examples'],['Payout cap','Largest amount per withdrawal','$15,000 vs an industry norm of $1,200 to $5,000 (as claimed in the lesson)'],['Reset cost','What a failed attempt costs to retry','Same as the original fee in the example']])}
<p><em>Figures were quoted in the lesson at the time and rules change often. Always read the current rulebook before paying.</em></p>
<h2>Drawdown types</h2>
<p>The same $3,500 allowance behaves very differently depending on how it is measured. A <b>trailing intraday</b> limit follows your highest unrealised equity, so a winning trade that reverses can leave you closer to the limit than you think. <b>End-of-day trailing</b> resets only at the close. <b>Static</b> stays fixed at the starting balance minus the allowance.</p>
${F('ddTypes','Price paths are illustrative. Notice how the red intraday limit climbs with every peak while the green static limit never moves.','Three ways to measure the same allowance')}
<h2>Two phases, two risk settings</h2>
<p>During the evaluation, many traders use as much risk as the rules allow to pass in the fewest trades. Once funded and eligible for payouts, the instructor says to "pull on the reins": reduce size so that a single loss cannot erase the buffer. Passing a challenge is a sprint. Keeping a funded account is the opposite game.</p>
${W_('propSim')}
<h2>Which account type?</h2>
<ul><li><b>Cheaper accounts</b> are cost-efficient but typically have tighter rules and lower payout caps.</li><li><b>Instant funding</b> skips the test but has strict consistency and payout rules. You still must be good at trading.</li><li><b>Accounts with fast payout schedules</b> let you request money sooner, but check the minimum days and consistency rules before relying on them.</li></ul>
<p>The lesson compares consistency rules and finds them similar in effect once you count the number of winning trades each requires. The takeaway: compare the full rulebook, not the headline.</p>
${KEY('<p>A prop account does not create edge. It only gives you leverage on the edge you already have, and charges you for each failed attempt.</p>')}`,
recap:['A prop firm sells you a test. You are buying a chance, not capital.','Check target, drawdown type, consistency, contract limit, payout cap, reset cost.','Intraday trailing drawdown is the most dangerous. Know which one you have.','Evaluation = sprint, funded = reduce risk. Expect to pay several fees per pass.','Learn to trade profitably before buying anything.']});
QZ.m14=[
{q:'You pay for a prop firm challenge. What are you buying?',o:['Guaranteed capital','A chance to prove you can trade within rules and then access funded payouts','A trading strategy','Insurance'],a:1,w:'The challenge is a test, and a fee that is lost if you fail.'},
{q:'Which drawdown type follows your highest unrealised equity?',o:['Static','Trailing end of day','Trailing intraday','Fixed percent'],a:2,w:'Trailing intraday uses live equity peaks, making it the tightest.'},
{q:'After passing the evaluation, the instructor advises:',o:['Increase risk','Pull on the reins and reduce size','Stop trading','Take every setup'],a:1,w:'Protect the buffer so one loss does not erase payout eligibility.'},
{q:'What is wrong with judging a prop firm only by its headline payout cap?',o:['Nothing','Consistency, drawdown, minimum days and cost all decide whether you ever get paid','Caps are illegal','Payout caps never change'],a:1,w:'Read the whole rulebook.'}];

/* ================= MODULE 15: THE STRATEGY ================= */
FIG.tradeWalk=()=>{const c=chain(101,[101.4,103,104.5,106,105,107,108.5,[110,2,.7],109,111.5,[111.2,3,.8],109,105,103.5,104.5,106.5,108,109,[107,1.5,.6],104,102,103,100.5,99.5,101,98,96.5,97.5,95],18);
  return candleChart({c,w:820,h:440,y:[92,119],pad:{r:150},alt:'Annotated illustrative trade: sweep, break of structure, equilibrium, entry, three targets',a:[
  {t:'hline',p:'h7',i1:7,i2:11,cls:'k-liq'},{t:'text',i:7,p:'h7',dy:-7,s:'London high',cls:'k-liq',anc:'middle'},
  {t:'range',lo:'l13',hi:'h10',i1:10,i2:19,top:'',bot:''},
  {t:'tag',i:10,p:'h10',dy:-9,s:'1 POTENTIAL: sweep + SMT',cls:'k-liq',anc:'end'},
  {t:'tag',i:12,p:'l12',dy:28,s:'2 CONFIRMATION: 5m BOS',cls:'k-bad',anc:'middle'},
  {t:'tag',i:17,p:'h17',dy:-9,s:'3 CONTINUATION',cls:'k-blue',anc:'end'},
  {t:'hline',p:'c18',i1:18,i2:28.5,cls:'k-ink'},{t:'text',i:29.2,p:'c18',dy:4,s:'ENTRY (1m reaction)',cls:'k-ink',anc:'start'},
  {t:'hline',p:'h10+.6',i1:18,i2:28.5,cls:'k-bad'},{t:'text',i:29.2,p:'h10+.6',dy:4,s:'STOP',cls:'k-bad',anc:'start'},
  {t:'hline',p:104,i1:18,i2:28.5,cls:'k-good'},{t:'text',i:29.2,p:104,dy:4,s:'4 TP1 London low',cls:'k-good',anc:'start'},
  {t:'hline',p:100.2,i1:18,i2:28.5,cls:'k-good'},{t:'text',i:29.2,p:100.2,dy:4,s:'TP2 Asia low',cls:'k-good',anc:'start'},
  {t:'hline',p:96.2,i1:18,i2:28.5,cls:'k-good'},{t:'text',i:29.2,p:96.2,dy:4,s:'TP3 hourly lows',cls:'k-good',anc:'start'}]})};
WID.tradeCheck=el=>{
  const G=[['Higher time frame bias is defined (4H / 1H structure)',2],['Key draws on liquidity are marked above and below',1],['A significant high or low was swept (opportunity)',2],['Time is inside the 09:30 to 10:30 window',1],['SMT divergence supports the idea (if both indices checked)',1],['Lower time frame BOS or inverse FVG confirms the turn',2],['Price retraced into a gap or EQ (continuation)',2],['A lower time frame reaction confirms the entry',2],['Stop is placed beyond the sweep or structure, and its size is acceptable',2],['Position size keeps risk inside 1% to 3% (halved if news or wide stop)',2],['At least one target at a real draw on liquidity, TP1 at the nearest',1]];
  el.innerHTML=`<div class="wid-h">Pre-trade checklist grader<span>Interactive</span></div><div class="wid-b"><div id="tcL"></div><div class="read" id="tcR"></div><button class="btn alt" id="tcX" type="button" style="margin-top:12px">Reset</button></div>`;
  const tot=G.reduce((a,g)=>a+g[1],0),draw=()=>{const st=S.chk.trade||{};$('#tcL',el).innerHTML=G.map((g,i)=>`<label class="chk"><input type="checkbox" data-i="${i}" ${st[i]?'checked':''}><span>${g[0]} <small style="color:var(--mute);font-family:var(--f-mono)">(${g[1]})</small></span></label>`).join('');
    let sc=0;G.forEach((g,i)=>{if(st[i])sc+=g[1]});const pc=Math.round(sc/tot*100),core=[2,5,6].every(i=>st[i]);
    const v=pc>=90&&core?['A-grade setup','var(--good)','All the pieces are there. Execute the plan and nothing else.']:pc>=70?['Acceptable, but incomplete','var(--liq-ink)','Some links are missing. Reduce size or wait for the missing confirmation.']:['Not a trade yet','var(--bad)','You are guessing. The market will give another opportunity. Wait.'];
    $('#tcR',el).innerHTML=`<b style="color:${v[1]};font-size:19px">${v[0]}: ${pc}%</b><br>${v[2]}${!core&&pc>=70?'<br><b>The sweep, the confirmation and the continuation are required, whatever else is ticked.</b>':''}`;
    $$('input',el).forEach(x=>x.addEventListener('change',()=>{S.chk.trade=S.chk.trade||{};S.chk.trade[x.dataset.i]=x.checked;save();draw()}))};
  $('#tcX',el).addEventListener('click',()=>{S.chk.trade={};save();draw()});draw()};
PAGES.push({id:'m15',part:'V',n:15,title:'The Complete Strategy',min:28,level:'Capstone',src:'Source: lesson "TJR\'s Strategy Explained"',
lead:'The last lesson does not give a rigid checklist. It shows a way of thinking that links every tool you have learned. This module reconstructs that logic and then gives you a checklist to train with.',
goals:['State the four-part logic: opportunity, confirmation, continuation, liquidation','Walk a full trade from bias through targets','Explain why the instructor deliberately avoids a rigid step list','Grade your own setups before risking money'],
html:`
<h2>Before the strategy: three reminders</h2>
<ul><li>Knowing the steps does not make you profitable. You need <b>strategy, risk management and psychology</b> together.</li><li>The skill of discretion comes only from hours of watching candles, backtesting, journalling and making mistakes. The lesson uses the 10,000-hour idea and the example of a basketball star's training plan: the plan helps only the person who does the work.</li><li>The instructor teaches the <em>thinking</em>, not a script. A script invites critics to say "you skipped step four", and it removes room to adapt. The markets are different every day, so you carry a toolbox rather than a single blueprint.</li></ul>
<h2>The logic in four lines</h2>
${steps([['1','Potential','Orders have the opportunity to be filled: a sweep of a significant high or low.'],['2','Confirmation','They actually were: a change in lower time frame structure by BOS or an inverse FVG.'],['3','Continuation','The new trend keeps going: a retrace into a FVG or equilibrium, then a reaction.'],['4','Liquidation','Exit where the orders you now hold can be sold: higher time frame extremes, session highs and lows, previous day levels.']])}
${KEY('<p>Everything is about moving with the inflows and outflows of the market. You are not betting on a bounce off a line. You are following orders as they are filled, held and then liquidated.</p>')}
<h2>A full trade, step by step</h2>
<p>The lesson walks through a trade taken on a Friday morning, replayed on the S&amp;P 500 and Nasdaq. The picture below is a schematic reconstruction (not the real chart) with the same logic and sequence.</p>
<h3>Before the open</h3>
<p>Higher time frames are bullish: the 4-hour had an inverse gap on the upside, then respected a 4-hour gap and equilibrium, and was printing legs up. Draws are marked: London high, hourly highs, previous day high above; Asia low, London low and previous day low below. Daily bias going in: <b>bullish</b>, targeting the highs. Nasdaq has already pushed above the London high; the S&amp;P is well below its equivalent.</p>
<h3>The open</h3>
<p>Nasdaq is above the London high, the S&amp;P is under it: a <b>bearish SMT divergence</b>. Even though the bias was bullish, this weakens the case for higher prices. He does not flip yet. The 5-minute structure is still bullish, so he waits for proof. After two legs down, price breaks structure on both indices: orders were filled above the highs. The S&amp;P is the leader, so that is the instrument to trade.</p>
<h3>Waiting for the continuation</h3>
<p>No gap formed to inverse on the up-leg, so a BOS did the confirming. Next he needs continuation: a bearish gap or equilibrium of the down leg. A large up candle then fills the 5-minute equilibrium. Entering at the touch would be a mistake: the candle could keep going. Two options exist: wait for the next 5-minute candle to close bearish, or drop to the 1-minute and wait for a 1-minute BOS or inverse gap down while price is inside the 5-minute confluence. The second gets the better entry, and the trade is already at TP1 by the time the first would have been entered.</p>
${F('tradeWalk','Illustrative. 1: a London high is swept (bearish SMT adds weight). 2: a 5-minute close below the latest low. 3: the retrace fills the 50% of the down leg. Entry on a 1-minute reaction, stop above the sweep high, three targets at real draws on liquidity.','The four-part logic on a chart')}
<h3>Exit and outcome</h3>
<p>The stop sits above the swept high. Targets: London session lows, Asia session lows and higher time frame hourly lows. All three hit. The instructor's remark about being wrong on bias is worth keeping: the market told him he was wrong for the day, and the plan still produced a profit because he followed the evidence rather than the opinion.</p>
${W_('tradeCheck')}
<h2>Why not "support and resistance"?</h2>
<p>The lesson is explicit that the approach is built on orders and liquidity, not floors and ceilings. A bounce off a line has no mechanism behind it. Each step above has one: orders resting, orders filled, orders held, orders sold.</p>
${WARN('<p>Copying the walkthrough as a script. The timing, the time frames used, even the confirmation tool may change from day to day. The mechanism does not.</p>')}`,
recap:['Four-part logic: potential, confirmation, continuation, liquidation.','Bias is a hypothesis. The market can prove it wrong, and you follow the evidence.','Do not enter at the first touch of a gap or EQ. Wait for the reaction, often on the 1-minute.','Stop beyond the sweep. Targets at real draws on liquidity.','Skill comes from reps: backtest, journal, review.']});
QZ.m15=[
{q:'What does the "continuation" step answer?',o:['Were orders filled?','Will the new trend keep going?','Where is the exit?','What time is it?'],a:1,w:'Gaps and equilibrium show the new trend can continue.'},
{q:'Why enter after a 1-minute reaction rather than at the first touch of the 5-minute EQ?',o:['It is cheaper','Price can keep going through the level; a reaction proves the level is respected','The exchange requires it','1-minute is always right'],a:1,w:'A touch is not a reaction. You need proof that price turns there.'},
{q:'In the walkthrough, the bias was bullish yet the trade was a short. What does this illustrate?',o:['The system is inconsistent','Bias is a hypothesis; evidence from the market can override it','Always trade against bias','SMT is optional'],a:1,w:'The instructor let the market prove him wrong and still profited.'},
{q:'Where are exits placed in the liquidation step?',o:['At random round numbers','At real draws on liquidity where held orders can be sold','Always at 1:1','At the open'],a:1,w:'Targets are session extremes, previous day levels and higher time frame highs and lows.'}];

/* ================= MODULE 16: PRACTICE ================= */
WID.expect=el=>{
  el.innerHTML=`<div class="wid-h">Journal maths: is your sample profitable?<span>Interactive</span></div><div class="wid-b"><div class="ctl">
  <div><label for="xW">Winning trades</label><input id="xW" type="number" min="0" value="38"></div><div><label for="xL">Losing trades</label><input id="xL" type="number" min="0" value="62"></div>
  <div><label for="xA">Average win (in R)</label><input id="xA" type="number" min="0" step="0.1" value="2.6"></div><div><label for="xB">Average loss (in R)</label><input id="xB" type="number" min="0.1" step="0.1" value="1"></div></div><div class="stats" id="xS"></div><div class="read" id="xT"></div></div>`;
  const draw=()=>{const w=+$('#xW',el).value||0,l=+$('#xL',el).value||0,a=+$('#xA',el).value||0,b=+$('#xB',el).value||1,n=w+l,wr=n?w/n:0,ex=wr*a-(1-wr)*b,pf=(1-wr)*b?wr*a/((1-wr)*b):0,be=1/(1+a/b);
    $('#xS',el).innerHTML=`<div class="stat"><small>Trades</small><b>${n}</b></div><div class="stat"><small>Win rate</small><b>${(wr*100).toFixed(1)}%</b></div><div class="stat ${ex>0?'good':'bad'}"><small>Expectancy</small><b>${ex>=0?'+':''}${ex.toFixed(2)} R</b></div><div class="stat"><small>Profit factor</small><b>${pf.toFixed(2)}</b></div><div class="stat"><small>Break-even win rate</small><b>${(be*100).toFixed(1)}%</b></div>`;
    $('#xT',el).innerHTML=n<100?`<b>Sample too small (${n}).</b> Under about 100 trades the numbers can mislead. Keep going before changing anything.`:ex>0?`<b style="color:var(--good)">Positive expectancy.</b> Over ${n} trades each trade averages ${ex.toFixed(2)}R. Next: check the result holds across different months and market conditions.`:`<b style="color:var(--bad)">Negative expectancy.</b> Either the setups are not defined tightly enough, the targets are too close, or discretion is leaking in. Review the biggest losses first.`};
  $$('input',el).forEach(x=>x.addEventListener('input',draw));draw()};
const MAST=['I can set up a clean chart on Eastern time and label trends on three time frames','I have marked sessions, previous day and equal highs/lows for 20 days','I can state, from memory, the candle-close rule for BOS, FVG disrespect and inverse FVG','I can draw equilibrium correctly in both directions without help','I have identified 30 SMT divergences at real liquidity','I have written my own pre-trade checklist','I have backtested at least 100 trades with fixed rules','My journal logs bias, sweep, confirmation, continuation, entry, stop, targets and R result','My risk per trade is fixed and between 1% and 3%','I follow the plan on 20 consecutive trades without breaking a rule'];
WID.mastery=el=>{
  el.innerHTML=`<div class="wid-h">Mastery gates<span>Saved in this browser</span></div><div class="wid-b"><div id="msL"></div><div class="read" id="msR"></div></div>`;
  const draw=()=>{const st=S.chk.mast||{};$('#msL',el).innerHTML=MAST.map((g,i)=>`<label class="chk"><input type="checkbox" data-i="${i}" ${st[i]?'checked':''}><span>${g}</span></label>`).join('');const n=MAST.filter((g,i)=>st[i]).length;
    $('#msR',el).innerHTML=`<b>${n} of ${MAST.length} gates passed.</b> ${n===MAST.length?'You have the process in place. Now consider live trading with minimum size.':'Do not move to live money until every gate is ticked honestly.'}`;
    $$('input',el).forEach(x=>x.addEventListener('change',()=>{S.chk.mast=S.chk.mast||{};S.chk.mast[x.dataset.i]=x.checked;save();draw()}))};draw()};
PAGES.push({id:'m16',part:'V',n:16,title:'Practice Plan & Mastery',min:16,level:'Capstone',src:'Original synthesis of the whole series',
lead:'Everything so far is knowledge. This final module turns it into a schedule, a journal and a set of gates that tell you when you are actually ready to risk money.',
goals:['Follow a 12-week training plan that builds skill in the right order','Journal every trade with the fields that reveal your mistakes','Compute expectancy from your own record','Know the gates to pass before trading live'],
html:`
<h2>A 12-week plan</h2>
${tbl(['Weeks','Focus','Daily work','Output'],[['1','Chart reading and structure','Mark swings and trends on 3 time frames','50 marked charts'],['2','Liquidity and sessions','Mark session, previous day, equal and stacked levels','20 days of level maps'],['3','BOS, FVG, inverse FVG','Find 5 examples of each per day','100 labelled examples'],['4','Equilibrium, imbalances, SMT','Draw EQ correctly. Spot gaps and SMT','Rulebook of your own'],['5-6','Bias routine','Write a bias before every open, grade it after','40 bias records'],['7-10','Backtest the full chain','Replay mornings 09:30 to 10:30, take every valid setup','100+ simulated trades'],['11','Review','Analyse expectancy, biggest losses, rule breaks','Revised checklist'],['12','Simulator forward test','Trade the plan on a simulator in real time','20 clean days']])}
<h2>The journal that makes you better</h2>
<p>A journal is the only way to separate luck from skill. For every trade record, with screenshots:</p>
${tbl(['Field','Why it matters'],[['Date, time, instrument','Check performance by time window'],['Bias and why','Tests your reading of the higher time frame'],['What was swept','Confirms the opportunity existed'],['Confirmation used (BOS or IFVG)','See which works for you'],['Continuation used (FVG or EQ)','Same'],['Entry, stop, targets','Rebuild R'],['Result in R and dollars','R makes trades comparable'],['Rule broken? (yes/no, which)','Quantifies discipline'],['Emotion before and after','Reveals psychology patterns']])}
${W_('expect')}
<h2>Rules for backtesting</h2>
<ul><li>Decide the rules <em>before</em> looking at the chart. Do not adjust them to fit trades you already saw.</li><li>Use a replay tool so you cannot see the future.</li><li>Log every valid setup, including the ones you would have been scared to take.</li><li>Use at least 100 trades before judging. Fewer is anecdote.</li><li>Risk the same R on each trade so results compare.</li></ul>
<h2>Mastery gates</h2>
${W_('mastery')}
<h2>A closing thought from the lesson</h2>
<p>There is no secret ingredient being held back. Information is the cheap part. What separates people is the number of hours spent on the charts, the honesty of the review, and the willingness to follow a plan when it feels uncomfortable. Start small, stay consistent, protect your capital, and let the repetitions accumulate.</p>`,
recap:['Train in order: chart reading, liquidity, confirmation, continuation, bias, backtest, simulator.','Journal everything, in R. Review rule breaks first.','Judge results over 100+ trades.','Pass all mastery gates before live money.']});
QZ.m16=[
{q:'What is the minimum useful sample size for judging a backtest?',o:['5 trades','20 trades','About 100 trades','It does not matter'],a:2,w:'Smaller samples are dominated by luck.'},
{q:'Why measure results in R?',o:['It sounds professional','It makes trades of different dollar size comparable','It avoids losses','Brokers require it'],a:1,w:'R expresses outcomes in units of risk.'},
{q:'You adjust your rules after seeing several backtest trades play out. What is the problem?',o:['None','Hindsight bias: rules must be fixed before testing','You need more indicators','You should use bigger size'],a:1,w:'Fitting rules to known outcomes inflates results.'}];

/* ================= REFERENCE PAGES ================= */
const GLOSS=[['Asia / London / New York session','Three regional trading windows (ET): 18:00-03:00, 03:00-08:30, 08:30 pre-market and 09:30-17:00. Each can leave a high and low that act as liquidity.'],['Bias (daily bias)','The expected direction of delivery for the session, from higher time frame trend, liquidity and continuation tools.'],['BOS (break of structure)','A candle close beyond the most recent swing of the trend, showing structure has shifted.'],['BPR (balanced price range)','A zone crossed swiftly in one direction and then swiftly back, leaving it thin on both sides.'],['Buy-side liquidity','Buy orders resting above highs: stops of shorts plus breakout buyers.'],['Confirmation confluence','A tool that shows orders were filled: BOS, inverse FVG.'],['Continuation confluence','A tool that shows a new trend will keep going: FVG, equilibrium.'],['Counterparty','The trader on the other side of an order. Large players need many.'],['Discount','The half of a range below equilibrium. Favourable for longs in an uptrend.'],['Draw on liquidity (DOL)','A level price is likely to reach for because many orders rest there.'],['Drawdown','A decline from an equity peak. Prop firms define maximum drawdown rules.'],['EQ (equilibrium)','The 50% level of the most recent swing range.'],['Equal highs / lows','Two highs or lows at nearly the same price, holding doubled orders.'],['External liquidity','Swing highs and lows outside the current range.'],['FVG (fair value gap)','Three-candle imbalance where wicks of candles 1 and 3 do not overlap.'],['FOMC / CPI / PPI','Scheduled US economic events that create volatile candles.'],['Imbalance','A price range where trading was one-sided and lightly traded.'],['Internal liquidity','Imbalances and equilibrium inside the current range.'],['Inverse FVG (IFVG)','A fair value gap that a candle body closes through, flipping its role.'],['Leader / laggard','In SMT, the index that diverges first and the one that follows.'],['Liquidity','Resting orders: buy/sell stops and limits.'],['Liquidity sweep','A push through a high or low that triggers resting orders.'],['Low resistance liquidity','Several untouched highs or lows stacked in a row.'],['Market structure','The sequence of swing highs and lows defining a trend.'],['NDOG / NWOG','New day / new week opening gaps.'],['NQ / ES','E-mini Nasdaq-100 and E-mini S&P 500 futures.'],['Premium','The half of a range above equilibrium. Expensive for longs, a sell zone in downtrends.'],['Prop firm','Company that sells evaluations and funds traders who pass.'],['R (R multiple)','Profit or loss measured in units of initial risk.'],['Relative equal highs / lows','Highs or lows within a few ticks of each other.'],['Reward-to-risk','Target distance divided by stop distance.'],['SMT divergence','ES and NQ disagreeing at a level, as one makes a new extreme and the other does not.'],['Sell-side liquidity','Sell orders resting below lows.'],['Spread hour','17:00-18:00 ET, thin market, wide spreads on some brokers.'],['Swing high / swing low','A peak or trough with lower highs or higher lows on both sides.'],['Tick','Minimum price increment: 0.25 points on ES and NQ.'],['Wick','The thin line showing the extreme of a candle beyond its body.']];
PAGES.push({id:'cheat',part:'T',title:'Cheat Sheet',raw:1,html:`<div class="eyebrow">Reference</div><h1>One-page cheat sheet</h1><p class="lead">Everything you need during a review session. Times are Eastern.</p>
<h2>Candle-close rules</h2>${tbl(['Concept','Rule'],[['Break of structure','Candle CLOSE beyond the most recent swing in the trend. Wick = no break.'],['Fair value gap','Wicks of candle 1 and candle 3 do not overlap. Colour is irrelevant.'],['FVG disrespect','Candle CLOSE beyond the far side of the gap.'],['Inverse FVG','A disrespected gap. In a stack use the farthest gap.'],['Equilibrium','50% of MOST RECENT low-to-high (or high-to-low). Never older swings.']])}
<h2>Time</h2>${tbl(['Window','Meaning'],[['18:00-03:00','Asia'],['03:00-08:30','London'],['08:30-09:30','NY pre-market (data at 8:30)'],['09:30-09:50','Manipulation window'],['09:50-10:10','Entry window'],['10:30','No trade by now? Stop'],['17:00-18:00','Spread hour, no trading']])}
<h2>Tool roles</h2>${tbl(['Job','Tools'],[['Opportunity','Sessions, previous day, stacked, equal, news highs/lows'],['Confirmation','BOS, inverse FVG'],['Continuation','FVG, equilibrium'],['Exits','The next higher time frame draw on liquidity']])}
<h2>Trade flow</h2>${steps([['Bias','HTF trend','4H and 1H structure, draws, gaps, EQ'],['Wait','Sweep','Let New York take a level first'],['Confirm','5m BOS / IFVG','Prefer the leading index'],['Continue','FVG or EQ tap','Wait for the reaction, drop to 1m'],['Exit','TP1 to TP3','At real draws on liquidity']])}
<h2>Risk</h2>${tbl(['Rule','Value'],[['Risk per trade','1% to 3%. Never 5%, 10%, 20%'],['Contracts','Fixed per instrument, calibrated to largest typical stop (about 35 ticks) at ~3-4%'],['Halve size','Unusually wide stop or high-impact news'],['Funded phase','Reduce size once payouts are possible'],['ES / NQ tick value','$12.50 / $5.00 (0.25 pt tick). Micros: $1.25 / $0.50']])}
<p class="disc">Educational material only. Not financial advice.</p>`});
PAGES.push({id:'glossary',part:'T',title:'Glossary',raw:1,html:`<div class="eyebrow">Reference</div><h1>Glossary</h1><p class="lead">${GLOSS.length} terms from the course.</p><dl class="gl">${GLOSS.map(g=>`<dt>${g[0]}</dt><dd>${g[1]}</dd>`).join('')}</dl>`});
QZ.exam=[
{q:'Which statement defines day trading in this course?',o:['Maximising daily profit','Predicting where price goes with high probability on a daily basis','Using indicators to find entries','Holding trades for weeks'],a:1,w:'Module 1.'},
{q:'Where does buy-side liquidity rest?',o:['Below lows','Above highs','At the 50% level','Inside gaps'],a:1,w:'Module 3: stops of shorts plus breakout buyers sit above highs.'},
{q:'London session in ET:',o:['18:00-03:00','03:00-08:30','08:30-09:30','09:30-17:00'],a:1,w:'Module 4.'},
{q:'In an uptrend you wait for a candle to close below the:',o:['Most recent swing low','Oldest swing low','Last swing high','EQ line'],a:0,w:'Module 5: monitor the latest low.'},
{q:'A wick pokes below the most recent low but the candle closes above. This is:',o:['A BOS','Likely a sweep, structure intact','An inverse FVG','A BPR'],a:1,w:'Module 5.'},
{q:'In a bullish FVG:',o:['High of candle 1 < low of candle 3','Low of candle 1 > high of candle 3','The wicks overlap','The colour of candle 1 matters'],a:0,w:'Module 6.'},
{q:'After price taps an FVG and makes a new high, you should:',o:['Keep the gap for next week','Delete the used gaps','Double size','Trade the opposite'],a:1,w:'Module 6.'},
{q:'Which gap is nearly useless?',o:['Weekend gap','New day gap','Candle-to-candle gap','FVG'],a:2,w:'Module 7.'},
{q:'A BPR is:',o:['Two equal highs','A swift move through imbalance followed by a swift move back','A news event','A time window'],a:1,w:'Module 7.'},
{q:'An inverse FVG is classified as:',o:['Reversal','Confirmation','Continuation','Exit'],a:1,w:'Module 8.'},
{q:'For a stack of bullish gaps in an uptrend, which one must invert?',o:['The top','The lowest','Any','None'],a:1,w:'Module 8.'},
{q:'Equilibrium in an uptrend is drawn from:',o:['Most recent low to most recent high','Oldest low to newest high','Open to close','Daily open to high'],a:0,w:'Module 9.'},
{q:'In a downtrend you look to sell in:',o:['Discount','Premium','Anywhere','Never'],a:1,w:'Module 9.'},
{q:'ES lower high, NQ higher high at a major high is:',o:['Bullish SMT','Bearish SMT','Neutral','A BOS'],a:1,w:'Module 10.'},
{q:'The ideal entry window in New York is:',o:['09:30-09:50','09:50-10:10','11:00-12:00','13:00-14:00'],a:1,w:'Module 11.'},
{q:'The step after bias and before entry is:',o:['Wait for a sweep and lower time frame confirmation','Enter at the open','Add size','Remove the stop'],a:0,w:'Modules 12 and 15.'},
{q:'Recommended risk per trade:',o:['0.01%','1% to 3%','5% to 10%','20%'],a:1,w:'Module 13.'},
{q:'A strategy with a 1:2 reward-to-risk breaks even at roughly:',o:['25%','33%','50%','66%'],a:1,w:'1/(1+2) = 33%.'},
{q:'The funded phase of a prop account calls for:',o:['More risk','Less risk ("pull on the reins")','Switching assets','No stops'],a:1,w:'Module 14.'},
{q:'Which is true of the instructor\'s strategy walkthrough?',o:['It is a rigid 10-step list','It is a way of thinking that leaves room for discretion','It uses only indicators','It ignores risk'],a:1,w:'Module 15.'}];
PAGES.push({id:'exam',part:'T',title:'Final Exam',raw:1,get html(){return`<div class="eyebrow">Assessment</div><h1>Final exam</h1><p class="lead">${QZ.exam.length} questions covering the whole course. Answer each one; you see the explanation immediately. Aim for at least 85%.</p>${quizHTML('exam',QZ.exam,'Final exam')}`}});
PAGES.unshift({id:'welcome',part:'',title:'Welcome',raw:1,get html(){return`<div class="eyebrow">Visual study course &middot; 16 modules</div><h1>Trade the orders, not the lines.</h1>
<p class="lead">A desktop course in futures day trading, built around one idea: price moves to where orders are waiting. You will learn to find those orders, judge whether they were filled, and plan an entry, a stop and targets, with more than thirty charts and a set of tools you can play with.</p>
<div class="chips"><span class="chip">${modules().length} modules</span><span class="chip">Charts in every lesson</span><span class="chip">Quizzes + final exam</span><span class="chip">Calculators + simulators</span></div>
${F('pillars','The course is organised around these three pillars. The first twelve modules build the strategy, and then risk and psychology get a full module each.','Course structure')}
<h2>Course map</h2><div class="cards">${modules().map(m=>`<a class="card" href="#${m.id}" data-go="${m.id}"><small>Module ${m.n} &middot; ${m.min} min</small><b>${m.title}</b><span>${m.lead.split('. ')[0]}.</span></a>`).join('')}</div>
<h2>How to use it</h2>
<ul><li>Work through the modules in order. Each builds on the one before.</li><li>Use the sliders and selectors. They show the rule, not only describe it.</li><li>Do the checkpoint quiz at the end of each module, then mark it complete.</li><li>Use the left and right arrow keys to move between modules.</li><li>Do the homework on a real chart. Reading is not practice.</li></ul>
<div class="box key"><b>Where this came from</b><p>This course is an independent study guide written from notes on a public YouTube playlist, "Path to Profitability", presented by TJR. It is not made by or affiliated with the presenter. Figures, rules and times are as stated in those lessons and may change. Chart illustrations are schematic, drawn to explain a concept, not recordings of real trades.</p></div>
<div class="box warn"><b>Risk warning</b><p>Trading futures and other leveraged products involves substantial risk of loss. Most day traders lose money. Nothing here is financial advice. Practise on a simulator and never risk money you cannot afford to lose.</p></div>
<div class="pager"><span></span><button class="btn liq" data-go="m01">Begin Module 1 &rarr;</button></div>`}});
</script>

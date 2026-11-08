# Liquidity Playbook

A visual, desktop-first study course in futures day trading, built as a single static web page.
16 modules, about 40 annotated SVG charts, calculators and simulators, quizzes and a final exam,
in a black-and-white interface that fills the whole browser tab.

> Independent study guide written from notes on the public YouTube playlist "Path to Profitability".
> It is not made by or affiliated with the presenter. Chart illustrations are schematic, not real trades.
> Educational material only, not financial advice. Futures trading carries a substantial risk of loss.

## What is inside

- **Modules 1-16:** chart reading, liquidity, break of structure, fair value gaps, imbalances, inverse FVGs,
  equilibrium, SMT divergence, time theory, daily bias, risk and psychology, funded accounts,
  the full strategy, and a practice plan.
- **Tools:** position-size calculator, equity-curve simulator, session clock, FVG detector, bias builder,
  pre-trade checklist, prop-firm evaluation planner, expectancy calculator.
- **Reference:** cheat sheet, glossary, 20-question final exam.
- Progress and checklists save in the browser (localStorage). No backend, no tracking.

## Build

No dependencies. Needs only bash.

```bash
./build.sh          # writes docs/index.html
```

Open `docs/index.html` in a browser, or serve the `docs/` folder with GitHub Pages (Settings > Pages > branch main, folder /docs).
Fonts load from Google Fonts; everything else is inline.

## Project layout

```
src/00-head.html     styles and page shell
src/10-lib.js        chart engine, router, quiz and progress logic
src/20-...50-*.js    module content, charts and widgets
src/99-tail.html     boot script
build.sh             joins src/ into docs/index.html
```

## Editing charts

Charts are drawn by `candleChart()` in `src/10-lib.js` from candle data plus annotation layers
(zones, lines, tags, arrows). Candles come from `chain()` (closes with random wicks) or `K(open, close, upperWick, lowerWick)`.
Annotations can reference candle prices such as `'h5'` (high of candle 5) or `'l9-2'` (low of candle 9 minus 2).

## License

No license chosen yet. Add one before publishing.

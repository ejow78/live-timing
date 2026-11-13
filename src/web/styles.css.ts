export const LSA_STYLES_CSS = `
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,500;0,600;0,700;1,600;1,700&family=Saira:wght@400;500;600&display=swap");

:root {
  --night: #060A13;
  --deck: #0C1322;
  --deck2: #111A2D;
  --wire: #1D2940;
  --ink: #E8EEF7;
  --mute: #8D9AB0;
  --cyan: #23B6E0;
  --gold: #F2B92B;
  --red: #E3261B;
  --violet: #A24BFF;
  --display: "Chakra Petch", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --body: "Saira", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --cut: 16px;
  --w: 1200px;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  background-color: var(--night);
  color: var(--ink);
  font-family: var(--body);
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }

.wrap {
  max-width: var(--w);
  margin: 0 auto;
  padding-left: max(16px, env(safe-area-inset-left, 0px));
  padding-right: max(16px, env(safe-area-inset-right, 0px));
}

h1, h2, h3, h4 {
  font-family: var(--display);
  font-style: italic;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .01em;
  margin: 0;
  line-height: 1;
}

/* PALABRA TRICOLOR */
.tricolor-text, h1 em, h2 em {
  font-style: italic;
  display: inline-block;
  background: linear-gradient(90deg, var(--cyan) 0 33%, var(--gold) 33% 66%, var(--red) 66%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  padding-right: .06em;
}

/* FRANJA TRICOLOR (4px) */
.tri {
  height: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
}
.tri i:nth-child(1) { background: var(--cyan); }
.tri i:nth-child(2) { background: var(--gold); }
.tri i:nth-child(3) { background: var(--red); }

/* BOTONES PILL */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font: 700 14px var(--display);
  text-transform: uppercase;
  letter-spacing: .08em;
  padding: 11px 22px;
  border-radius: 999px;
  background: linear-gradient(180deg, #2a8fd8, #155fb0);
  color: #fff;
  border: 0;
  cursor: pointer;
  box-shadow: 0 0 0 1px rgba(120,190,255,.35) inset, 0 8px 30px rgba(35,140,230,.35);
  transition: all .2s ease;
}
.pill:hover {
  box-shadow: 0 0 0 1px rgba(160,210,255,.6) inset, 0 8px 40px rgba(35,140,230,.55);
  transform: translateY(-1px);
}
.pill.red {
  background: linear-gradient(180deg, #f0402f, #b5150c);
  box-shadow: 0 0 0 1px rgba(255,150,130,.35) inset, 0 8px 30px rgba(227,38,27,.35);
}
.pill.red:hover {
  box-shadow: 0 0 0 1px rgba(255,180,160,.6) inset, 0 8px 40px rgba(227,38,27,.55);
}
.pill.ghost {
  background: transparent;
  color: #E8EEF7;
  box-shadow: 0 0 0 1px var(--wire) inset;
}
.pill.ghost:hover {
  box-shadow: 0 0 0 1px var(--cyan) inset;
  color: #fff;
}

/* CORTE DIAGONAL MOTORSPORT */
.cut {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, 0 100%);
}

/* CABECERA OFICIAL */
header.site {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(6, 10, 19, .95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--wire);
}
header.site .in {
  max-width: var(--w);
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;
  height: 66px;
  padding-left: max(16px, env(safe-area-inset-left, 0px));
  padding-right: max(16px, env(safe-area-inset-right, 0px));
}
header.site img.logo-img {
  height: 44px;
  width: auto;
  mix-blend-mode: lighten;
  display: block;
}
.menu {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0 0 0 auto;
  padding: 0;
}
.menu > li {
  position: relative;
}
.menu a, .menu button {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  background: none;
  border: 0;
  cursor: pointer;
  font: 600 14px var(--display);
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--mute);
  padding: 10px 14px;
  transition: color .2s;
}
.menu a:hover, .menu button:hover, .menu li:hover > a {
  color: #fff;
}
.menu .active, .menu [aria-current] {
  color: #E8EEF7 !important;
  box-shadow: inset 0 -2px 0 var(--red) !important;
}

/* MENÚ DESPLEGABLE CAMPEONATOS */
.drop {
  display: none;
  position: absolute;
  right: 0;
  top: 100%;
  min-width: 290px;
  background: #0C1322;
  border: 1px solid var(--wire);
  padding: 8px;
  list-style: none;
  margin: 0;
  box-shadow: 0 20px 50px rgba(0,0,0,.6);
  z-index: 100;
}
.menu li:hover > .drop, .menu li:focus-within > .drop {
  display: block;
}
.drop a {
  display: grid !important;
  grid-template-columns: auto 1fr;
  gap: 2px 12px;
  padding: 12px !important;
  color: #E8EEF7 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-radius: 4px;
}
.drop a:hover {
  background: rgba(35, 182, 224, .08);
}
.drop a b {
  font: 700 italic 18px var(--display);
  text-transform: uppercase;
  grid-row: span 2;
  align-self: center;
  color: #fff;
}
.drop a span {
  font-size: 13px;
  color: #8D9AB0;
}
.drop a i {
  font-style: normal;
  font-size: 12px;
  color: #23B6E0;
}

/* REDES SOCIALES HEADER */
.soc {
  display: flex;
  gap: 8px;
  margin-left: 8px;
}
.soc a {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--wire);
  border-radius: 999px;
  color: var(--mute);
  transition: .2s;
}
.soc a:hover {
  color: #fff;
  border-color: var(--cyan);
  box-shadow: 0 0 18px rgba(35,182,224,.35);
}
.soc svg {
  width: 17px;
  height: 17px;
}

/* SECCIONES Y ENCABEZADOS */
.sec {
  padding-block: 72px;
}
.sec.alt {
  background: linear-gradient(180deg, var(--deck), var(--night));
}
.shead {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}
.kick {
  display: flex;
  align-items: center;
  gap: 12px;
  font: 600 12px var(--display);
  letter-spacing: .24em;
  text-transform: uppercase;
  color: var(--cyan);
  margin-bottom: 10px;
}
.kick::before {
  content: "";
  width: 28px;
  height: 1px;
  background: var(--cyan);
}
.shead h2 {
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1;
}
.shead h2::before {
  content: "› ";
  color: var(--red);
  margin-right: 4px;
  font-style: normal;
}

/* PANELES Y TABLAS MOTORSPORT */
.panel {
  background: var(--deck2);
  border: 1px solid var(--wire);
  overflow: hidden;
}
.panel h3 {
  font-size: 18px;
  letter-spacing: .06em;
  padding: 16px 20px;
  border-bottom: 1px solid var(--wire);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
table.lsa-table {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
  margin: 0;
  font-size: 15px;
}
table.lsa-table th {
  font: 600 11px var(--display);
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--mute);
  text-align: left;
  padding: 12px 14px;
  border-bottom: 1px solid var(--wire);
  white-space: nowrap;
}
table.lsa-table td {
  padding: 11px 14px;
  border-bottom: 1px solid rgba(29, 41, 64, .7);
  vertical-align: middle;
}
table.lsa-table tbody tr:hover td {
  background: rgba(35, 182, 224, .05);
}
.pos {
  font: 700 italic 22px var(--display);
  text-align: center;
  width: 48px;
}
.p1 .pos { color: var(--gold); }
.p2 .pos { color: #C9D3DF; }
.p3 .pos { color: #D9863F; }
.pts {
  font: 700 22px var(--display);
  text-align: right;
  padding-right: 18px;
  color: #fff;
}
.purple-sector {
  color: var(--violet);
  font-weight: 700;
}

/* CALENDARIO CARDS */
.cal-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.rd-card {
  position: relative;
  background: var(--deck2);
  border: 1px solid var(--wire);
  padding: 18px 18px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 168px;
  transition: all .2s;
}
.rd-card:hover {
  border-color: rgba(35, 182, 224, .4);
}
.rnum {
  font: 700 italic 38px/1 var(--display);
  color: rgba(232, 238, 247, .16);
}
.rflag {
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 20px;
}
.rd-card b {
  font: 700 italic 19px/1.1 var(--display);
  text-transform: uppercase;
  margin-top: 6px;
  display: block;
}
.rfmt {
  font-size: 13px;
  color: var(--mute);
  margin-top: 4px;
}
.rd-card .st {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid var(--wire);
  font: 600 11px var(--display);
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--mute);
}
.rd-card.done .st {
  color: var(--cyan);
}
.rd-card.next {
  border-color: var(--red);
  background: linear-gradient(160deg, rgba(227, 38, 27, .18), var(--deck2) 60%);
}
.rd-card.next .rnum {
  color: var(--red);
}
.rd-card.next .st {
  color: #fff;
}
.rd-card.next .st::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--red);
  margin-right: 8px;
  box-shadow: 0 0 10px var(--red);
}

/* FORMULARIOS ESTILO LSA */
.form-card {
  background: var(--deck);
  border: 1px solid var(--wire);
  padding: 32px;
}
.form-group {
  margin-bottom: 20px;
}
.form-label {
  display: block;
  font: 600 12px var(--display);
  letter-spacing: .15em;
  text-transform: uppercase;
  color: var(--mute);
  margin-bottom: 8px;
}
.form-control {
  width: 100%;
  background: #080D18;
  border: 1px solid var(--wire);
  color: #fff;
  font-family: var(--body);
  font-size: 15px;
  padding: 12px 14px;
  border-radius: 4px;
  outline: none;
  transition: border-color .2s;
}
.form-control:focus {
  border-color: var(--cyan);
  box-shadow: 0 0 12px rgba(35, 182, 224, .25);
}

/* FOOTER OFICIAL */
footer.lsfoot {
  border-top: 1px solid var(--wire);
  padding-block: 36px;
  color: var(--mute);
  font-size: 14px;
}
footer.lsfoot .wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
}
footer.lsfoot img {
  height: 34px;
  mix-blend-mode: lighten;
  display: block;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .cal-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 760px) {
  header.site .in { flex-wrap: wrap; height: auto; padding-block: 10px 6px; }
  .menu { width: 100%; justify-content: space-between; order: 2; margin-top: 6px; }
  .menu a, .menu button { font-size: 12px; padding: 8px 6px; }
  .drop { left: 0; right: auto; }
}
@media (max-width: 520px) {
  .cal-grid { grid-template-columns: 1fr; }
}
`;

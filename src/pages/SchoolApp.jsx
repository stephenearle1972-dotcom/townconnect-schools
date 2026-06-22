import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const DEMO_URL = 'https://schools.townconnect.co.za/demo/';

// Scoped styles: every rule is prefixed with `.tcs-applp` so nothing leaks into
// or collides with the rest of the site. Ported faithfully from the approved
// design (townconnect-schools-website-section.html); only the display font is
// mapped to the site's existing Lora pairing (was Fraunces) and the body to
// Inter, so the page does not clash with the rest of the site.
const styles = `
.tcs-applp{
  --ink:#13262b;
  --teal:#157f76;
  --teal-deep:#0e6259;
  --mint:#e7f4f0;
  --mint-2:#d6ece6;
  --paper:#f4f7f6;
  --white:#ffffff;
  --amber:#d9813c;
  --line:#dde6e3;
  --muted:#5c726e;
  --display:'Lora',Georgia,'Times New Roman',serif;
  --body:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  background:var(--paper);color:var(--ink);font-family:var(--body);
  font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased;
}
.tcs-applp .wrap{max-width:1080px;margin:0 auto;padding:0 24px;}
.tcs-applp h1,.tcs-applp h2,.tcs-applp h3{font-family:var(--display);font-weight:600;line-height:1.12;letter-spacing:-.01em;margin:0;}
.tcs-applp p{margin:0;}
.tcs-applp a{color:inherit;}
.tcs-applp .eyebrow{font-family:var(--body);font-weight:700;font-size:12.5px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--teal);}
.tcs-applp .btn{display:inline-flex;align-items:center;gap:9px;font-family:var(--body);font-weight:600;
  font-size:15.5px;padding:13px 22px;border-radius:30px;text-decoration:none;cursor:pointer;
  border:1.5px solid transparent;transition:transform .12s ease, background .2s, box-shadow .2s;}
.tcs-applp .btn:active{transform:translateY(1px);}
.tcs-applp .btn-primary{background:var(--teal);color:#fff;box-shadow:0 8px 22px rgba(21,127,118,.28);}
.tcs-applp .btn-primary:hover{background:var(--teal-deep);}
.tcs-applp .btn-ghost{background:transparent;color:var(--ink);border-color:var(--line);}
.tcs-applp .btn-ghost:hover{border-color:var(--teal);color:var(--teal);}
.tcs-applp .arrow{font-size:17px;line-height:1;}

/* ---------- HERO ---------- */
.tcs-applp .hero{background:linear-gradient(180deg,#ffffff 0%, var(--paper) 100%);
  border-bottom:1px solid var(--line);padding:74px 0 64px;}
.tcs-applp .hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:54px;align-items:center;}
.tcs-applp .hero h1{font-size:clamp(2.3rem,4.6vw,3.5rem);margin:18px 0 0;font-weight:600;}
.tcs-applp .hero h1 em{font-style:normal;color:var(--teal);}
.tcs-applp .hero .sub{margin-top:20px;font-size:18.5px;color:var(--muted);max-width:34ch;}
.tcs-applp .hero .cta-row{margin-top:30px;display:flex;gap:13px;flex-wrap:wrap;}
.tcs-applp .fade{opacity:0;transform:translateY(12px);animation:tcsappUp .7s cubic-bezier(.2,.7,.2,1) forwards;}
.tcs-applp .fade.d1{animation-delay:.05s;}.tcs-applp .fade.d2{animation-delay:.13s;}.tcs-applp .fade.d3{animation-delay:.22s;}.tcs-applp .fade.d4{animation-delay:.3s;}
@keyframes tcsappUp{to{opacity:1;transform:none;}}

/* signature: broadcast + reply bubbles */
.tcs-applp .phonecard{background:var(--mint);border:1px solid var(--line);border-radius:24px;padding:22px;
  box-shadow:0 24px 50px rgba(19,38,43,.10);}
.tcs-applp .pc-head{display:flex;align-items:center;gap:11px;padding-bottom:14px;margin-bottom:8px;border-bottom:1px solid #cfe3dd;}
.tcs-applp .pc-dot{width:38px;height:38px;border-radius:50%;background:var(--teal);color:#fff;display:flex;
  align-items:center;justify-content:center;font-weight:800;font-family:var(--body);font-size:14px;}
.tcs-applp .pc-name{font-family:var(--body);font-weight:700;font-size:15px;}
.tcs-applp .pc-sub{font-family:var(--body);font-size:12px;color:var(--muted);}
.tcs-applp .msg{background:#fff;border-radius:14px;border-top-left-radius:4px;padding:11px 13px;margin:9px 0;
  font-family:var(--body);font-size:14.5px;box-shadow:0 1px 1px rgba(0,0,0,.05);max-width:88%;}
.tcs-applp .msg.out{background:var(--mint-2);border-top-left-radius:14px;border-top-right-radius:4px;margin-left:auto;}
.tcs-applp .msg .tagline{font-family:var(--body);font-weight:700;font-size:12px;color:var(--teal);margin-bottom:4px;display:flex;align-items:center;gap:6px;}
.tcs-applp .urgent-pill{background:var(--amber);color:#fff;font-size:9.5px;font-weight:800;letter-spacing:.04em;padding:2px 7px;border-radius:5px;}
.tcs-applp .mention{color:var(--teal);font-weight:600;}

/* ---------- section scaffolding ---------- */
.tcs-applp section{padding:66px 0;}
.tcs-applp .sec-head{max-width:40ch;}
.tcs-applp .sec-head h2{font-size:clamp(1.7rem,3vw,2.3rem);margin-top:10px;}
.tcs-applp .sec-head p{margin-top:14px;color:var(--muted);}

/* ---------- pillars ---------- */
.tcs-applp .pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px;}
.tcs-applp .pillar{background:var(--white);border:1px solid var(--line);border-radius:18px;padding:26px 24px;
  transition:transform .15s ease, box-shadow .2s;}
.tcs-applp .pillar:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(19,38,43,.08);}
.tcs-applp .pic{width:46px;height:46px;border-radius:13px;background:var(--mint);display:flex;align-items:center;
  justify-content:center;margin-bottom:16px;}
.tcs-applp .pic svg{width:24px;height:24px;fill:var(--teal);}
.tcs-applp .pillar h3{font-size:20px;}
.tcs-applp .pillar p{margin-top:9px;font-size:15.5px;color:var(--muted);}

/* ---------- comparison ---------- */
.tcs-applp .compare-sec{background:var(--ink);color:#eaf2f0;}
.tcs-applp .compare-sec .eyebrow{color:#7fd8cb;}
.tcs-applp .compare-sec .sec-head h2{color:#fff;}
.tcs-applp .compare-sec .sec-head p{color:#a9c4be;}
.tcs-applp .compare-wrap{margin-top:36px;overflow-x:auto;}
.tcs-applp .compare{min-width:560px;border-radius:16px;overflow:hidden;border:1px solid #2a4148;}
.tcs-applp .crow{display:grid;grid-template-columns:1.5fr 1fr 1fr;}
.tcs-applp .crow>div{padding:15px 18px;font-family:var(--body);font-size:15px;border-top:1px solid #243a40;}
.tcs-applp .crow:first-child>div{border-top:0;}
.tcs-applp .crow .feat{color:#cfe0dc;font-weight:500;}
.tcs-applp .crow .grp{color:#9fb4b0;background:rgba(255,255,255,.02);}
.tcs-applp .crow .app{color:#eafff9;background:rgba(21,127,118,.18);font-weight:500;}
.tcs-applp .chead .feat{background:transparent;}
.tcs-applp .chead div{font-family:var(--display);font-weight:600;font-size:16px;color:#fff;border-top:0;}
.tcs-applp .chead .app{background:var(--teal);}
.tcs-applp .x{color:#c98b86;margin-right:7px;font-weight:700;}
.tcs-applp .v{color:#5fd1b6;margin-right:7px;font-weight:700;}

/* ---------- connie band ---------- */
.tcs-applp .connie{background:var(--mint);}
.tcs-applp .connie-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;}
.tcs-applp .connie h2{font-size:clamp(1.7rem,3vw,2.3rem);}
.tcs-applp .connie p{margin-top:14px;color:#3f5651;}
.tcs-applp .snip{background:#fff;border:1px solid var(--line);border-radius:18px;padding:18px;box-shadow:0 16px 36px rgba(19,38,43,.08);}
.tcs-applp .snip .grouphead{font-family:var(--body);font-weight:700;font-size:13px;color:var(--muted);margin-bottom:12px;}

/* ---------- demo cta ---------- */
.tcs-applp .demo-cta{text-align:center;}
.tcs-applp .demo-cta .panel{background:var(--white);border:1px solid var(--line);border-radius:22px;
  padding:48px 28px;box-shadow:0 18px 44px rgba(19,38,43,.07);}
.tcs-applp .demo-cta h2{font-size:clamp(1.6rem,2.8vw,2.1rem);}
.tcs-applp .demo-cta p{margin:14px auto 26px;color:var(--muted);max-width:46ch;}

/* ---------- pricing ---------- */
.tcs-applp .price-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:40px;align-items:stretch;}
.tcs-applp .pcard{background:var(--white);border:1px solid var(--line);border-radius:20px;padding:30px 28px;display:flex;flex-direction:column;}
.tcs-applp .pcard.base{background:#fbfdfc;}
.tcs-applp .pcard.add{background:var(--ink);color:#eaf2f0;border-color:var(--ink);position:relative;}
.tcs-applp .pcard h3{font-size:21px;}
.tcs-applp .pcard.add h3{color:#fff;}
.tcs-applp .pcard .lede{margin-top:8px;font-size:14.5px;color:var(--muted);}
.tcs-applp .pcard.add .lede{color:#a9c4be;}
.tcs-applp .ptag{position:absolute;top:18px;right:18px;background:var(--teal);color:#fff;font-family:var(--body);
  font-weight:700;font-size:11px;letter-spacing:.05em;text-transform:uppercase;padding:5px 11px;border-radius:20px;}
.tcs-applp .priceline{font-family:var(--display);font-size:30px;font-weight:600;margin-top:20px;}
.tcs-applp .pcard.add .priceline{color:#fff;}
.tcs-applp .priceline small{font-family:var(--body);font-size:14px;font-weight:500;color:var(--muted);}
.tcs-applp .pcard.add .priceline small{color:#a9c4be;}
.tcs-applp .plist{list-style:none;padding:0;margin:18px 0 24px;font-family:var(--body);font-size:14.5px;}
.tcs-applp .plist li{padding:7px 0 7px 26px;position:relative;border-top:1px solid var(--line);}
.tcs-applp .pcard.add .plist li{border-top-color:#2a4148;}
.tcs-applp .plist li:before{content:"";position:absolute;left:2px;top:13px;width:11px;height:11px;border-radius:50%;
  background:var(--mint-2);border:2px solid var(--teal);}
.tcs-applp .pcard.add .plist li:before{background:transparent;border-color:#5fd1b6;}
.tcs-applp .pcard .btn{margin-top:auto;align-self:flex-start;}
.tcs-applp .note{font-family:var(--body);font-size:13px;color:var(--muted);margin-top:14px;}

/* ---------- popia strip ---------- */
.tcs-applp .popia{background:var(--teal);color:#fff;}
.tcs-applp .popia-in{display:flex;gap:22px;align-items:flex-start;}
.tcs-applp .popia svg{width:38px;height:38px;fill:#bff0e6;flex:0 0 38px;margin-top:4px;}
.tcs-applp .popia h2{color:#fff;font-size:clamp(1.5rem,2.6vw,2rem);}
.tcs-applp .popia p{margin-top:12px;color:#d6f3ec;max-width:62ch;}

/* ---------- final cta ---------- */
.tcs-applp .final{text-align:center;padding:80px 0;}
.tcs-applp .final h2{font-size:clamp(1.8rem,3.4vw,2.6rem);max-width:20ch;margin:0 auto;}
.tcs-applp .final .cta-row{margin-top:26px;display:flex;gap:13px;justify-content:center;flex-wrap:wrap;}

@media (max-width:860px){
  .tcs-applp .hero-grid,.tcs-applp .connie-grid,.tcs-applp .price-grid{grid-template-columns:1fr;gap:34px;}
  .tcs-applp .pillars{grid-template-columns:1fr;}
  .tcs-applp .hero{padding:54px 0 44px;}
  .tcs-applp section{padding:50px 0;}
  .tcs-applp .hero .sub{max-width:none;}
}
@media (prefers-reduced-motion:reduce){
  .tcs-applp .fade{animation:none;opacity:1;transform:none;}
}
`;

export default function SchoolApp() {
  useEffect(() => {
    document.title = 'School App | TownConnect Schools';
  }, []);

  return (
    <div className="tcs-applp">
      <style>{styles}</style>

      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow fade d1">App add-on · TownConnect Schools</div>
            <h1 className="fade d2">Your school's own app. As easy as the apps families already use, <em>fully under your control.</em></h1>
            <p className="sub fade d3">You already have a multilingual WhatsApp assistant working for your school. Add a branded school app, and every parent gets your broadcasts, your files and instant answers from Connie, all on your school's own data.</p>
            <div className="cta-row fade d4">
              <a className="btn btn-primary" href={DEMO_URL} target="_blank" rel="noopener">See the live demo <span className="arrow">→</span></a>
              <Link className="btn btn-ghost" to="/contact">Book a demo for your school</Link>
            </div>
          </div>
          <div className="phonecard fade d3">
            <div className="pc-head">
              <div className="pc-dot">AH</div>
              <div><div className="pc-name">Acacia Hills Primary</div><div className="pc-sub">School Broadcasts · 248 parents</div></div>
            </div>
            <div className="msg">
              <div className="tagline"><span className="urgent-pill">URGENT</span></div>
              School will close early today at 12:00 due to a water outage. Please arrange collection by then.
            </div>
            <div className="msg out"><span className="mention">@Connie</span> what time does aftercare end?</div>
            <div className="msg">
              <div className="tagline">Connie</div>
              Aftercare runs until 17:30, at R650 per month per child. You can book at the office.
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Why schools choose it</div>
            <h2>Familiar to use. Powerful where it counts.</h2>
            <p>It keeps everything parents already understand about messaging, and adds the things a school actually needs.</p>
          </div>
          <div className="pillars">
            <div className="pillar">
              <div className="pic"><svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-9 9c0 1.6.4 3.1 1.2 4.4L3 21l4.8-1.2A9 9 0 1 0 12 3z"/></svg></div>
              <h3>Nothing new to learn</h3>
              <p>It looks and works like the chat apps your families already use every day. No training, no manuals. They open it and start.</p>
            </div>
            <div className="pillar">
              <div className="pic"><svg viewBox="0 0 24 24"><path d="M12 1 4 5v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V5l-8-4zm0 4a3 3 0 0 1 3 3v1h1v6H8v-6h1V8a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v1h2V8a1 1 0 0 0-1-1z"/></svg></div>
              <h3>Your school, your data, your control</h3>
              <p>Your own contact lists, your own groups, your own records. No personal teacher numbers, no after-hours free-for-all. The school decides who can post.</p>
            </div>
            <div className="pillar">
              <div className="pic"><svg viewBox="0 0 24 24"><path d="M3 10v4a1 1 0 0 0 1 1h2l5 4V5L6 9H4a1 1 0 0 0-1 1zm14.5 2a3.5 3.5 0 0 0-2-3.15v6.3A3.5 3.5 0 0 0 17.5 12zM16 4.2v2.1a5.5 5.5 0 0 1 0 11.4v2.1A7.5 7.5 0 0 0 16 4.2z"/></svg></div>
              <h3>The things a group chat cannot do</h3>
              <p>Send an urgent broadcast to every parent at once. Share newsletters, calendars and forms. And let Connie answer routine questions, day and night.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="compare-sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">The honest comparison</div>
            <h2>Why a managed school channel beats an informal group chat</h2>
            <p>Most schools already run a parent group. Here is what changes when the school owns the channel instead.</p>
          </div>
          <div className="compare-wrap">
            <div className="compare">
              <div className="crow chead">
                <div className="feat"></div>
                <div className="grp">An informal group chat</div>
                <div className="app">Your school app</div>
              </div>
              <div className="crow">
                <div className="feat">Who can post</div>
                <div className="grp"><span className="x">✕</span>Anyone in the group</div>
                <div className="app"><span className="v">✓</span>Only who the school chooses</div>
              </div>
              <div className="crow">
                <div className="feat">Urgent announcements</div>
                <div className="grp"><span className="x">✕</span>Lost in the scroll</div>
                <div className="app"><span className="v">✓</span>A broadcast every parent sees</div>
              </div>
              <div className="crow">
                <div className="feat">Sharing files</div>
                <div className="grp"><span className="x">✕</span>Clutters the chat</div>
                <div className="app"><span className="v">✓</span>Newsletters and forms in one place</div>
              </div>
              <div className="crow">
                <div className="feat">Records</div>
                <div className="grp"><span className="x">✕</span>None</div>
                <div className="app"><span className="v">✓</span>Every message kept for the school</div>
              </div>
              <div className="crow">
                <div className="feat">Teacher privacy</div>
                <div className="grp"><span className="x">✕</span>Personal numbers exposed</div>
                <div className="app"><span className="v">✓</span>No personal numbers, ever</div>
              </div>
              <div className="crow">
                <div className="feat">POPIA</div>
                <div className="grp"><span className="x">✕</span>Hard to manage</div>
                <div className="app"><span className="v">✓</span>Consent recorded, data with the school</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONNIE */}
      <section className="connie">
        <div className="wrap connie-grid">
          <div>
            <div className="eyebrow">Your AI assistant</div>
            <h2>Meet Connie</h2>
            <p>Connie answers parents' everyday questions, fees, term dates, sport, transport, in seconds. Parents can message Connie directly, or type @Connie in any chat and she answers right there. Your office is freed for the things that need a person.</p>
          </div>
          <div className="snip">
            <div className="grouphead">Grade 4 Parents</div>
            <div className="msg out"><span className="mention">@Connie</span> when does this term end?</div>
            <div className="msg">
              <div className="tagline">Connie</div>
              Term 2 ends on Friday 26 June. Term 3 runs from 21 July to 2 October.
            </div>
          </div>
        </div>
      </section>

      {/* DEMO CTA */}
      <section className="demo-cta">
        <div className="wrap">
          <div className="panel">
            <div className="eyebrow">See it for yourself</div>
            <h2>Try the app, right now</h2>
            <p>This is a live, working demo using a sample school. Tap into any chat and ask Connie anything a parent would.</p>
            <a className="btn btn-primary" href={DEMO_URL} target="_blank" rel="noopener">Open the live demo <span className="arrow">→</span></a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Simple to start</div>
            <h2>Start with WhatsApp. Add the app when you are ready.</h2>
            <p>The WhatsApp assistant is your base. The branded app is an add-on you can switch on at any time.</p>
          </div>
          <div className="price-grid">
            <div className="pcard base">
              <h3>WhatsApp assistant</h3>
              <p className="lede">Your multilingual assistant on WhatsApp, working from your school's information. This is the base every school starts on.</p>
              <div className="priceline">from R799 <small>per month</small></div>
              <ul className="plist">
                <li>Answers parents from your school's documents</li>
                <li>Multilingual, on the number parents already use</li>
                <li>Three plan sizes to suit your school</li>
              </ul>
              <Link className="btn btn-ghost" to="/contact">See the plans</Link>
            </div>
            <div className="pcard add">
              <span className="ptag">Add-on</span>
              <h3>Branded school app</h3>
              <p className="lede">Your own white-labelled app, in your school's colours, with broadcasts, file sharing and Connie built in.</p>
              <div className="priceline">R4,000 <small>once-off build</small></div>
              <ul className="plist">
                <li>Fully branded to your school</li>
                <li>Broadcasts, files, groups and the office line</li>
                <li>Connie, your AI assistant, in every chat</li>
                <li>Plus a monthly subscription</li>
              </ul>
              <Link className="btn btn-primary" to="/contact">Book a demo <span className="arrow">→</span></Link>
            </div>
          </div>
          <p className="note">Build fee is once-off per school. The monthly subscription keeps the app, hosting and assistant running. Speak to us for the monthly figure that suits your school's size.</p>
        </div>
      </section>

      {/* POPIA */}
      <section className="popia">
        <div className="wrap popia-in">
          <svg viewBox="0 0 24 24"><path d="M12 1 4 5v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V5l-8-4zm-1 14-3.5-3.5 1.4-1.4L11 12.2l4.1-4.1 1.4 1.4L11 15z"/></svg>
          <div>
            <div className="eyebrow" style={{ color: '#bff0e6' }}>Compliant by design</div>
            <h2>Built for POPIA from the start</h2>
            <p>Because contact lists are controlled, consent is recorded and every message is logged, a school app is easier to keep POPIA-compliant than an informal group chat. Parents agree to clear terms, and their information stays with your school.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <div className="wrap">
          <h2>See it with your own school's information</h2>
          <div className="cta-row">
            <a className="btn btn-primary" href={DEMO_URL} target="_blank" rel="noopener">Open the live demo <span className="arrow">→</span></a>
            <Link className="btn btn-ghost" to="/contact">Book a demo</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

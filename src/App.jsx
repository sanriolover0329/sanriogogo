import { useState } from "react";

// ===== THEME DEFINITIONS =====
const THEMES = {
  light: { label:"純白", dot:"#f1f5f9", border:"#94a3b8",
    vars:{"--bg":"#f1f5f9","--surface":"#ffffff","--elevated":"#f8fafc","--input-bg":"#f8fafc",
      "--border":"#e2e8f0","--border2":"#cbd5e1","--text":"#1e293b","--text2":"#334155",
      "--muted":"#64748b","--muted2":"#94a3b8","--hover":"rgba(0,0,0,.04)","--row-hover":"rgba(0,0,0,.02)",
      "--accent":"#f59e0b","--accent-h":"#d97706","--accent-bg":"rgba(245,158,11,.1)","--accent-br":"rgba(245,158,11,.4)",
      "--accent-text":"#92400e","--sidebar-bg":"#1e293b","--topbar-bg":"#ffffff","--topbar-bdr":"#e2e8f0",
      "--success":"#059669","--danger":"#dc2626","--info":"#2563eb","--purple":"#7c3aed"}},
  dark: { label:"深夜", dot:"#0e1525", border:"#334155",
    vars:{"--bg":"#080d1c","--surface":"#0e1525","--elevated":"#060a17","--input-bg":"#060a17",
      "--border":"#111d35","--border2":"#1a2540","--text":"#dde4f5","--text2":"#c8d5f0",
      "--muted":"#4a5a7a","--muted2":"#3a4a6a","--hover":"rgba(255,255,255,.04)","--row-hover":"rgba(255,255,255,.015)",
      "--accent":"#f59e0b","--accent-h":"#fbbf24","--accent-bg":"rgba(245,158,11,.1)","--accent-br":"rgba(245,158,11,.3)",
      "--accent-text":"#fbbf24","--sidebar-bg":"#060a17","--topbar-bg":"#060a17","--topbar-bdr":"#111d35",
      "--success":"#10b981","--danger":"#ef4444","--info":"#3b82f6","--purple":"#8b5cf6"}},
  warm: { label:"暖米", dot:"#fdf6e3", border:"#d4b896",
    vars:{"--bg":"#faf7f2","--surface":"#ffffff","--elevated":"#fdf9f4","--input-bg":"#fdf9f4",
      "--border":"#e8ddd0","--border2":"#d4c4b0","--text":"#3d2e1a","--text2":"#5a4030",
      "--muted":"#8a7060","--muted2":"#b09080","--hover":"rgba(0,0,0,.03)","--row-hover":"rgba(0,0,0,.02)",
      "--accent":"#c2612e","--accent-h":"#a84e22","--accent-bg":"rgba(194,97,46,.08)","--accent-br":"rgba(194,97,46,.3)",
      "--accent-text":"#7c3516","--sidebar-bg":"#3d2e1a","--topbar-bg":"#ffffff","--topbar-bdr":"#e8ddd0",
      "--success":"#4a7c59","--danger":"#c0392b","--info":"#2980b9","--purple":"#6c3483"}},
  blue: { label:"海藍", dot:"#dbeafe", border:"#93c5fd",
    vars:{"--bg":"#eff6ff","--surface":"#ffffff","--elevated":"#f0f7ff","--input-bg":"#f0f7ff",
      "--border":"#bfdbfe","--border2":"#93c5fd","--text":"#1e3a5f","--text2":"#1e40af",
      "--muted":"#64748b","--muted2":"#93a5b9","--hover":"rgba(0,0,0,.04)","--row-hover":"rgba(0,0,0,.015)",
      "--accent":"#2563eb","--accent-h":"#1d4ed8","--accent-bg":"rgba(37,99,235,.08)","--accent-br":"rgba(37,99,235,.3)",
      "--accent-text":"#1e3a8a","--sidebar-bg":"#1e3a5f","--topbar-bg":"#ffffff","--topbar-bdr":"#bfdbfe",
      "--success":"#059669","--danger":"#dc2626","--info":"#2563eb","--purple":"#7c3aed"}},
};

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:4px}
.app{display:flex;height:100vh;overflow:hidden;background:var(--bg);color:var(--text);font-family:'Noto Sans TC',sans-serif;font-size:14px}
.sidebar{width:220px;min-width:220px;background:var(--sidebar-bg);border-right:1px solid rgba(255,255,255,.08);display:flex;flex-direction:column;overflow-y:auto}
.s-logo{padding:20px 16px 14px;border-bottom:1px solid rgba(255,255,255,.08)}
.s-logo h1{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:#f59e0b;letter-spacing:-.5px}
.s-logo small{font-size:10px;color:rgba(255,255,255,.25);letter-spacing:1.5px;text-transform:uppercase}
.s-section{padding:10px 8px 2px}
.s-label{font-size:10px;color:rgba(255,255,255,.2);font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:0 8px 5px}
.nav-item{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:8px;cursor:pointer;font-size:13.5px;font-weight:500;transition:all .15s;color:rgba(255,255,255,.35);margin:1px 0;user-select:none}
.nav-item:hover{background:rgba(255,255,255,.06);color:rgba(255,255,255,.8)}
.nav-item.act{background:rgba(245,158,11,.15);color:#f59e0b}
.nav-item .ic{font-size:15px;width:22px;text-align:center}
.s-foot{margin-top:auto;padding:10px 8px;border-top:1px solid rgba(255,255,255,.08)}
.s-user{display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(255,255,255,.04);border-radius:8px;margin-bottom:8px}
.s-av{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0}
.theme-picker{display:flex;align-items:center;gap:8px;padding:6px 12px;margin-bottom:4px}
.theme-picker-label{font-size:11px;color:rgba(255,255,255,.3);flex:1}
.theme-dot{width:18px;height:18px;border-radius:50%;cursor:pointer;transition:all .2s;border:2px solid transparent}
.theme-dot:hover{transform:scale(1.2)}
.theme-dot.act{border-color:#f59e0b;transform:scale(1.15)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{height:54px;background:var(--topbar-bg);border-bottom:1px solid var(--topbar-bdr);display:flex;align-items:center;justify-content:space-between;padding:0 24px;flex-shrink:0}
.topbar-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;color:var(--text)}
.content{flex:1;overflow-y:auto;padding:24px;background:var(--bg)}
.page-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.page-title{font-family:'Syne',sans-serif;font-size:21px;font-weight:800;color:var(--text)}
.card{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.card-hd{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.card-title{font-family:'Syne',sans-serif;font-weight:700;font-size:14px;color:var(--text)}
.card-body{padding:18px}
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px}
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.stat-val{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;margin-bottom:3px}
.stat-lbl{font-size:11px;color:var(--muted2);text-transform:uppercase;letter-spacing:.8px}
.stat-sub{font-size:12px;margin-top:6px;color:var(--muted)}
.btn{display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:7px;border:none;cursor:pointer;font-family:'Noto Sans TC',sans-serif;font-size:13px;font-weight:500;transition:all .18s;white-space:nowrap}
.btn-p{background:var(--accent);color:#fff}.btn-p:hover{background:var(--accent-h);box-shadow:0 2px 8px rgba(0,0,0,.15)}
.btn-s{background:var(--elevated);color:var(--text2);border:1px solid var(--border2)}.btn-s:hover{background:var(--surface);border-color:var(--border)}
.btn-d{background:#ef4444;color:#fff}.btn-d:hover{background:#dc2626}
.btn-g{background:#10b981;color:#fff}.btn-g:hover{background:#059669}
.btn-pu{background:#8b5cf6;color:#fff}.btn-pu:hover{background:#7c3aed}
.btn-gh{background:transparent;color:var(--muted);border:1px solid var(--border)}.btn-gh:hover{background:var(--hover);color:var(--text2);border-color:var(--border2)}
.btn-sm{padding:5px 11px;font-size:12px}.btn-xs{padding:3px 8px;font-size:11px;border-radius:5px}
.btn:disabled{opacity:.4;cursor:not-allowed;pointer-events:none}
input,select,textarea{background:var(--input-bg);color:var(--text);border:1px solid var(--border2);border-radius:7px;padding:8px 12px;font-family:'Noto Sans TC',sans-serif;font-size:13.5px;outline:none;transition:border-color .2s;width:100%}
input:focus,select:focus,textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-bg)}
select option{background:var(--surface);color:var(--text)}
textarea{resize:vertical;min-height:70px}
.ig{margin-bottom:13px}
.il{display:block;font-size:12px;color:var(--muted);margin-bottom:5px;font-weight:500}
.irow{display:grid;grid-template-columns:1fr 1fr;gap:11px}
table{width:100%;border-collapse:collapse}
th{padding:9px 13px;text-align:left;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--muted2);border-bottom:1px solid var(--border);background:var(--elevated)}
td{padding:10px 13px;font-size:13.5px;border-bottom:1px solid var(--border);vertical-align:middle}
tr:last-child td{border-bottom:none}
tbody tr:hover td{background:var(--row-hover)}
.mono{font-family:'JetBrains Mono',monospace;font-size:12px}
.badge{display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.3px;white-space:nowrap;border:1px solid}
.ba{background:rgba(239,68,68,.12);color:#ef4444;border-color:rgba(239,68,68,.3)}
.bw{background:rgba(139,92,246,.12);color:#8b5cf6;border-color:rgba(139,92,246,.3)}
.bm{background:rgba(59,130,246,.12);color:#3b82f6;border-color:rgba(59,130,246,.3)}
.bs{background:rgba(100,116,139,.12);color:#64748b;border-color:rgba(100,116,139,.25)}
.bp{background:rgba(245,158,11,.12);color:#d97706;border-color:rgba(245,158,11,.3)}
.bg{background:rgba(16,185,129,.12);color:#059669;border-color:rgba(16,185,129,.3)}
.bgi{background:rgba(245,158,11,.15);color:var(--accent-text);border-color:var(--accent-br)}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:100;backdrop-filter:blur(6px);padding:16px}
.modal{background:var(--surface);border-radius:16px;border:1px solid var(--border2);padding:26px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.2)}
.modal-lg{max-width:760px}
.modal-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;margin-bottom:18px;color:var(--text)}
.modal-foot{display:flex;gap:9px;justify-content:flex-end;margin-top:18px}
.tc{position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:7px}
.toast{background:var(--surface);border:1px solid var(--border2);border-radius:9px;padding:11px 16px;display:flex;align-items:center;gap:9px;font-size:13px;box-shadow:0 6px 28px rgba(0,0,0,.15);min-width:240px;animation:tin .3s ease;color:var(--text)}
.t-s{border-left:3px solid #10b981}.t-e{border-left:3px solid #ef4444}.t-i{border-left:3px solid #3b82f6}
@keyframes tin{from{opacity:0;transform:translateX(36px)}to{opacity:1;transform:none}}
.login-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);padding:20px}
.login-card{background:var(--surface);border:1px solid var(--border2);border-radius:18px;padding:36px;width:100%;max-width:380px;box-shadow:0 8px 40px rgba(0,0,0,.1)}
.login-theme-bar{display:flex;gap:8px;justify-content:center;margin-bottom:24px}
.member-card{background:var(--surface);border:1px solid var(--border);border-radius:11px;padding:16px;transition:all .2s;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.05)}
.member-card:hover{border-color:var(--accent-br);transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,.1)}
.member-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
.gift-bar-wrap{margin:6px 0}
.gift-bar-bg{background:var(--elevated);border:1px solid var(--border);border-radius:6px;height:8px;overflow:hidden;margin-top:4px}
.gift-bar-fill{background:var(--accent);height:100%;border-radius:6px;transition:width .5s}
.info-box{background:var(--elevated);border:1px solid var(--border);border-radius:8px;padding:10px 13px;margin-bottom:10px}
.ib-label{font-size:11px;color:var(--muted2);text-transform:uppercase;letter-spacing:.8px;margin-bottom:2px}
.ib-value{font-size:13.5px;color:var(--text2);font-weight:500}
.filter-bar{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:16px;align-items:center}
.filter-chip{padding:5px 12px;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer;border:1px solid var(--border2);color:var(--muted);background:transparent;transition:all .15s}
.filter-chip.act{background:var(--accent-bg);color:var(--accent);border-color:var(--accent-br)}
.filter-chip:hover{color:var(--text2);border-color:var(--border)}
.alert{padding:11px 13px;border-radius:8px;font-size:13px;margin-bottom:13px;display:flex;align-items:flex-start;gap:8px;border:1px solid}
.alert-w{background:rgba(245,158,11,.06);border-color:rgba(245,158,11,.2);color:#d97706}
.alert-s{background:rgba(16,185,129,.06);border-color:rgba(16,185,129,.2);color:#059669}
.alert-e{background:rgba(239,68,68,.06);border-color:rgba(239,68,68,.2);color:#ef4444}
.tag{display:inline-block;padding:2px 7px;border-radius:4px;font-size:11px;background:var(--elevated);color:var(--muted);border:1px solid var(--border)}
.step-bar{display:flex;align-items:center;gap:0;margin-bottom:24px}
.step-node{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--muted2);flex:1}
.step-node.done{color:#059669}.step-node.active{color:var(--accent)}
.step-circle{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid var(--border2);background:var(--elevated);flex-shrink:0}
.step-node.done .step-circle{border-color:#059669;color:#059669}
.step-node.active .step-circle{border-color:var(--accent);color:var(--accent);background:var(--accent-bg)}
.step-line{flex:1;height:1px;background:var(--border2);margin:0 4px}
.step-node.done+.step-line{background:#059669}
.perm-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)}
.perm-row:last-child{border-bottom:none}
.toggle{position:relative;display:inline-block;width:36px;height:20px;cursor:pointer}
.toggle input{opacity:0;width:0;height:0}
.toggle-slider{position:absolute;inset:0;background:var(--border2);border-radius:10px;transition:.2s}
.toggle-slider:before{content:'';position:absolute;width:14px;height:14px;left:3px;bottom:3px;background:var(--muted);border-radius:50%;transition:.2s}
.toggle input:checked+.toggle-slider{background:var(--accent-bg);border:1px solid var(--accent-br)}
.toggle input:checked+.toggle-slider:before{background:var(--accent);transform:translateX(16px)}
.order-card{background:var(--surface);border:1px solid var(--border);border-radius:11px;padding:15px;margin-bottom:11px;box-shadow:0 1px 3px rgba(0,0,0,.05)}
.order-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px}
.divider{height:1px;background:var(--border);margin:14px 0}
.empty{text-align:center;padding:50px 20px;color:var(--muted2)}
.qbtn{width:26px;height:26px;border-radius:6px;border:1px solid var(--border2);background:var(--elevated);color:var(--text2);cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;transition:all .15s}
.qbtn:hover{border-color:var(--accent);color:var(--accent)}
.tabs{display:flex;gap:3px;background:var(--elevated);border:1px solid var(--border);border-radius:9px;padding:3px;margin-bottom:16px}
.tab{flex:1;padding:7px;text-align:center;font-size:13px;font-weight:600;border-radius:7px;cursor:pointer;transition:all .2s;color:var(--muted2)}
.tab.act{background:var(--surface);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.08)}
.ltabs{display:flex;gap:3px;margin-bottom:24px;background:var(--elevated);border:1px solid var(--border);border-radius:9px;padding:3px}
.ltab{flex:1;padding:8px;text-align:center;font-size:13.5px;font-weight:600;border-radius:7px;cursor:pointer;transition:all .2s;color:var(--muted2)}
.ltab.act{background:var(--surface);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.08)}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.fu{animation:fadeUp .3s ease}
`;

const INIT_CATS=[
  {id:1,name:"食品",emoji:"🍱"},
  {id:2,name:"生活用品",emoji:"🏠"},
  {id:3,name:"美妝保養",emoji:"💄"},
  {id:4,name:"電子產品",emoji:"📱"},
  {id:5,name:"服飾",emoji:"👕"},
  {id:6,name:"其他",emoji:"📦"},
];
const getCE=cats=>Object.fromEntries((cats||INIT_CATS).map(c=>[c.name,c.emoji]));
const SHIP_OPTS=["面交","宅配","超商取貨"];
const STORE_OPTS=["7-11","全家","萊爾富","OK超商"];
const STORE_DATA={
  "7-11":[
    {name:"台北信義門市",code:"169528",city:"台北市",area:"信義區"},
    {name:"台北忠孝敦化門市",code:"168905",city:"台北市",area:"大安區"},
    {name:"台北南京東路門市",code:"170234",city:"台北市",area:"中山區"},
    {name:"台北西門門市",code:"171055",city:"台北市",area:"萬華區"},
    {name:"台北天母門市",code:"172301",city:"台北市",area:"士林區"},
    {name:"台北松山門市",code:"173456",city:"台北市",area:"松山區"},
    {name:"台北內湖門市",code:"174012",city:"台北市",area:"內湖區"},
    {name:"板橋文化門市",code:"180012",city:"新北市",area:"板橋區"},
    {name:"新莊中正門市",code:"181456",city:"新北市",area:"新莊區"},
    {name:"三重重新門市",code:"182789",city:"新北市",area:"三重區"},
    {name:"新店中央門市",code:"183234",city:"新北市",area:"新店區"},
    {name:"中和景平門市",code:"184567",city:"新北市",area:"中和區"},
    {name:"桃園中正門市",code:"190123",city:"桃園市",area:"桃園區"},
    {name:"中壢中央門市",code:"191567",city:"桃園市",area:"中壢區"},
    {name:"桃園藝文門市",code:"192890",city:"桃園市",area:"桃園區"},
    {name:"新竹東門門市",code:"195001",city:"新竹市",area:"東區"},
    {name:"新竹科學園區門市",code:"195234",city:"新竹市",area:"東區"},
    {name:"台中一中門市",code:"200891",city:"台中市",area:"北區"},
    {name:"台中逢甲門市",code:"201234",city:"台中市",area:"西屯區"},
    {name:"台中大里門市",code:"202678",city:"台中市",area:"大里區"},
    {name:"台中太平門市",code:"203012",city:"台中市",area:"太平區"},
    {name:"台中豐原門市",code:"204345",city:"台中市",area:"豐原區"},
    {name:"彰化中正門市",code:"210123",city:"彰化縣",area:"彰化市"},
    {name:"嘉義中山門市",code:"215456",city:"嘉義市",area:"東區"},
    {name:"台南成功門市",code:"220345",city:"台南市",area:"東區"},
    {name:"台南中正門市",code:"221789",city:"台南市",area:"中西區"},
    {name:"台南永康門市",code:"222012",city:"台南市",area:"永康區"},
    {name:"高雄三多門市",code:"230456",city:"高雄市",area:"苓雅區"},
    {name:"高雄文化中心門市",code:"231012",city:"高雄市",area:"苓雅區"},
    {name:"高雄左營門市",code:"232345",city:"高雄市",area:"左營區"},
    {name:"高雄鳳山門市",code:"233678",city:"高雄市",area:"鳳山區"},
    {name:"屏東中正門市",code:"240123",city:"屏東縣",area:"屏東市"},
    {name:"宜蘭中山門市",code:"260012",city:"宜蘭縣",area:"宜蘭市"},
    {name:"花蓮中正門市",code:"270345",city:"花蓮縣",area:"花蓮市"},
    {name:"台東中正門市",code:"280123",city:"台東縣",area:"台東市"},
  ],
  "全家":[
    {name:"台北信義門市",code:"FMA001",city:"台北市",area:"信義區"},
    {name:"台北忠孝門市",code:"FMA002",city:"台北市",area:"大安區"},
    {name:"台北中山門市",code:"FMA003",city:"台北市",area:"中山區"},
    {name:"台北西門門市",code:"FMA004",city:"台北市",area:"萬華區"},
    {name:"台北天母門市",code:"FMA005",city:"台北市",area:"士林區"},
    {name:"板橋文化門市",code:"FMB001",city:"新北市",area:"板橋區"},
    {name:"新莊中正門市",code:"FMB002",city:"新北市",area:"新莊區"},
    {name:"三重重新門市",code:"FMB003",city:"新北市",area:"三重區"},
    {name:"桃園中正門市",code:"FMC001",city:"桃園市",area:"桃園區"},
    {name:"中壢中央門市",code:"FMC002",city:"桃園市",area:"中壢區"},
    {name:"新竹東門門市",code:"FMD001",city:"新竹市",area:"東區"},
    {name:"台中中港門市",code:"FME001",city:"台中市",area:"西屯區"},
    {name:"台中逢甲門市",code:"FME002",city:"台中市",area:"西屯區"},
    {name:"台中一中門市",code:"FME003",city:"台中市",area:"北區"},
    {name:"台南東區門市",code:"FMF001",city:"台南市",area:"東區"},
    {name:"台南中西門市",code:"FMF002",city:"台南市",area:"中西區"},
    {name:"高雄三多門市",code:"FMG001",city:"高雄市",area:"苓雅區"},
    {name:"高雄左營門市",code:"FMG002",city:"高雄市",area:"左營區"},
    {name:"高雄鳳山門市",code:"FMG003",city:"高雄市",area:"鳳山區"},
  ],
  "萊爾富":[
    {name:"台北信義門市",code:"HI001",city:"台北市",area:"信義區"},
    {name:"台北中山門市",code:"HI002",city:"台北市",area:"中山區"},
    {name:"台北大安門市",code:"HI003",city:"台北市",area:"大安區"},
    {name:"板橋文化門市",code:"HI011",city:"新北市",area:"板橋區"},
    {name:"新莊中正門市",code:"HI012",city:"新北市",area:"新莊區"},
    {name:"桃園中正門市",code:"HI021",city:"桃園市",area:"桃園區"},
    {name:"台中逢甲門市",code:"HI031",city:"台中市",area:"西屯區"},
    {name:"台中一中門市",code:"HI032",city:"台中市",area:"北區"},
    {name:"台南東區門市",code:"HI041",city:"台南市",area:"東區"},
    {name:"高雄三多門市",code:"HI051",city:"高雄市",area:"苓雅區"},
    {name:"高雄鳳山門市",code:"HI052",city:"高雄市",area:"鳳山區"},
  ],
};
const ORDER_STATUS=["待處理","待出貨","已出貨","完成","已取消"];
const STATUS_BADGE={"待處理":"bp","待出貨":"bm","已出貨":"bw","完成":"bg","已取消":"bs"};
const FMT=n=>`NT$${Number(n).toLocaleString()}`;
const calcSpent=(orders,mid)=>orders.filter(o=>o.memberId===mid&&o.status!=="已取消").reduce((a,o)=>a+o.total,0);
const getGiftInfo=(spent,gifts)=>{
  const active=[...gifts.filter(g=>g.active)].sort((a,b)=>a.minAmount-b.minAmount);
  const earned=active.filter(g=>spent>=g.minAmount);
  const next=active.find(g=>spent<g.minAmount);
  return{earned,next,pct:next?Math.min(100,Math.round((spent/next.minAmount)*100)):100};
};

const INIT_STAFF=[
  {id:1,name:"系統管理員",email:"admin@store.com",pw:"admin123",role:"admin",perms:["all"],status:"active",joined:"2024-01-01"},
  {id:2,name:"倉管人員",email:"warehouse@store.com",pw:"wh123",role:"warehouse",perms:["members","orders","dispatch","create_order"],status:"active",joined:"2024-03-01"},
];

const STAFF_ROLES=[
  {id:"admin",   label:"管理員",   icon:"👑",color:"#ef4444",bg:"rgba(239,68,68,.15)"},
  {id:"warehouse",label:"倉管人員",icon:"📦",color:"#f59e0b",bg:"rgba(245,158,11,.15)"},
  {id:"shipping", label:"出貨人員",icon:"🚚",color:"#3b82f6",bg:"rgba(59,130,246,.15)"},
  {id:"purchasing",label:"採購人員",icon:"🛒",color:"#10b981",bg:"rgba(16,185,129,.15)"},
  {id:"sales",    label:"業務人員",icon:"💼",color:"#8b5cf6",bg:"rgba(139,92,246,.15)"},
  {id:"viewer",   label:"唯讀人員",icon:"👁",color:"#64748b",bg:"rgba(100,116,139,.15)"},
];

const ALL_PERMS=[
  {k:"members",   l:"會員管理",   d:"查詢、建立、編輯會員資料",  icon:"👥"},
  {k:"create_order",l:"建立訂單", d:"替會員建立新訂單",          icon:"🛒"},
  {k:"orders",    l:"訂單管理",   d:"查看所有訂單與更新狀態",    icon:"🗒"},
  {k:"dispatch",  l:"發貨管理",   d:"備貨確認與出貨標記",        icon:"🚚"},
  {k:"products",  l:"商品管理",   d:"新增、編輯、上下架商品",    icon:"📦"},
  {k:"stats",     l:"統計報表",   d:"查看營收成本損益報表",      icon:"📈"},
];
const INIT_MEMBERS=[
  {id:1,name:"王小明",phone:"0912-345-678",email:"wang@gmail.com",address:"台北市信義區市府路1號",
   favStore:"7-11",storeName:"台北信義門市",storeCode:"169528",role:"member",status:"active",joined:"2024-06-20",note:""},
  {id:2,name:"批發商張先生",phone:"0933-444-555",email:"zhang@biz.com",address:"台中市西區台灣大道1段",
   favStore:"全家",storeName:"台中中港門市",storeCode:"A001256",role:"wholesale",status:"active",joined:"2024-04-01",note:"固定每月採購，請優先備貨"},
  {id:3,name:"李小花",phone:"0955-888-999",email:"li@gmail.com",address:"台南市東區勝利路1號",
   favStore:"7-11",storeName:"台南成功門市",storeCode:"220345",role:"member",status:"active",joined:"2024-08-10",note:""},
];
const INIT_PRODS=[
  {id:1,name:"有機蘋果禮盒",cat:"食品",price:480,wprice:360,cost:280,stock:50,minwq:5,unit:"盒",desc:"精選有機蘋果，適合送禮",active:true,image:null,preorder:false},
  {id:2,name:"手工餅乾禮盒",cat:"食品",price:320,wprice:240,cost:160,stock:30,minwq:10,unit:"盒",desc:"傳統手工製作，口感酥脆",active:true,image:null,preorder:false},
  {id:3,name:"天然蜂蜜500g",cat:"食品",price:280,wprice:210,cost:140,stock:8,minwq:6,unit:"瓶",desc:"台灣本土採集天然蜂蜜",active:true,image:null,preorder:false},
  {id:4,name:"保溫杯組",cat:"生活用品",price:650,wprice:490,cost:320,stock:15,minwq:3,unit:"組",desc:"304不鏽鋼保溫杯，附收納袋",active:true,image:null,preorder:false},
  {id:5,name:"香氛護手霜套組",cat:"美妝保養",price:390,wprice:290,cost:190,stock:25,minwq:5,unit:"套",desc:"三種香味，滋潤不黏膩",active:true,image:null,preorder:false},
  {id:6,name:"環保帆布袋",cat:"生活用品",price:180,wprice:130,cost:70,stock:100,minwq:20,unit:"個",desc:"加厚帆布材質，大容量設計",active:true,image:null,preorder:false},
  {id:7,name:"精品咖啡豆250g",cat:"食品",price:360,wprice:270,cost:180,stock:40,minwq:10,unit:"包",desc:"衣索比亞單品咖啡豆",active:true,image:null,preorder:false},
  {id:8,name:"手工皂禮盒",cat:"美妝保養",price:420,wprice:315,cost:200,stock:3,minwq:5,unit:"盒",desc:"天然植物萃取，溫和潔淨",active:true,image:null,preorder:false},
];
const INIT_ORDERS=[
  {id:"ORD-001",memberId:1,memberName:"王小明",memberPhone:"0912-345-678",memberRole:"member",
   items:[{pid:1,name:"有機蘋果禮盒",qty:2,price:480,unit:"盒"}],total:960,
   status:"完成",ship:"超商取貨",sinfo:"7-11 台北信義門市（169528）",note:"",created:"2024-11-28"},
  {id:"ORD-002",memberId:2,memberName:"批發商張先生",memberPhone:"0933-444-555",memberRole:"wholesale",
   items:[{pid:2,name:"手工餅乾禮盒",qty:10,price:240,unit:"盒"},{pid:3,name:"天然蜂蜜500g",qty:6,price:210,unit:"瓶"}],
   total:3660,status:"待出貨",ship:"宅配",sinfo:"台中市西區台灣大道1段",note:"工作日送達",created:"2024-12-02"},
  {id:"ORD-003",memberId:3,memberName:"李小花",memberPhone:"0955-888-999",memberRole:"member",
   items:[{pid:5,name:"香氛護手霜套組",qty:1,price:390,unit:"套"}],total:390,
   status:"已出貨",ship:"超商取貨",sinfo:"7-11 台南成功門市（220345）",note:"",created:"2024-12-03"},
  {id:"ORD-004",memberId:1,memberName:"王小明",memberPhone:"0912-345-678",memberRole:"member",
   items:[{pid:7,name:"精品咖啡豆250g",qty:3,price:360,unit:"包"}],total:1080,
   status:"完成",ship:"面交",sinfo:"台北市中山區",note:"下午2-5點",created:"2024-12-05"},
  {id:"ORD-005",memberId:2,memberName:"批發商張先生",memberPhone:"0933-444-555",memberRole:"wholesale",
   items:[{pid:1,name:"有機蘋果禮盒",qty:20,price:360,unit:"盒"},{pid:8,name:"手工皂禮盒",qty:10,price:315,unit:"盒"}],
   total:10350,status:"完成",ship:"宅配",sinfo:"台中市西區台灣大道1段",note:"",created:"2024-11-15"},
];
const INIT_GIFTS=[
  {id:1,minAmount:3000,gift:"精美小禮包（面膜組）",active:true},
  {id:2,minAmount:8000,gift:"中型禮盒（手工皂套組）",active:true},
  {id:3,minAmount:20000,gift:"豪華禮品組（保溫杯＋蜂蜜禮盒）",active:true},
];
const INIT_LOGISTICS=[
  {id:"711",label:"7-11 交貨便",icon:"🟠",type:"cvs",enabled:true,note:"需至門市寄件"},
  {id:"family",label:"全家 取貨付款",icon:"🟢",type:"cvs",enabled:true,note:"需至門市寄件"},
  {id:"hilife",label:"萊爾富 取貨付款",icon:"🔵",type:"cvs",enabled:false,note:"需至門市寄件"},
  {id:"ok",label:"OK超商 取貨付款",icon:"🔴",type:"cvs",enabled:false,note:"需至門市寄件"},
  {id:"kerry",label:"黑貓宅急便",icon:"🐱",type:"home",enabled:true,note:"到府收件，需另申請"},
  {id:"hct",label:"新竹物流",icon:"🚛",type:"home",enabled:false,note:"到府收件"},
  {id:"post",label:"郵局包裹",icon:"📮",type:"home",enabled:false,note:"需至郵局寄件"},
  {id:"face",label:"面交自取",icon:"🤝",type:"meetup",enabled:true,note:"自行約定地點"},
];

function Toasts({list}){
  return <div className="tc">{list.map(t=>(
    <div key={t.id} className={`toast t-${t.type}`}>
      <span>{t.type==="s"?"✓":t.type==="e"?"✕":"ℹ"}</span><span>{t.msg}</span>
    </div>
  ))}</div>;
}
function Modal({title,onClose,children,lg}){
  return <div className="overlay" onClick={e=>{if(e.target.className==="overlay")onClose();}}>
    <div className={`modal${lg?" modal-lg":""}`}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div className="modal-title" style={{margin:0}}>{title}</div>
        <button className="btn btn-gh btn-sm" onClick={onClose}>✕</button>
      </div>
      {children}
    </div>
  </div>;
}

function ThemePicker({theme,setTheme,inline}){
  return <div style={{display:"flex",alignItems:"center",gap:7,padding:inline?"0":"6px 12px"}}>
    {!inline&&<span style={{fontSize:11,color:"rgba(255,255,255,.3)",flex:1}}>色系</span>}
    {Object.entries(THEMES).map(([k,v])=>(
      <div key={k} title={v.label} className={`theme-dot${theme===k?" act":""}`}
        style={{background:v.dot,borderColor:theme===k?"#f59e0b":v.border,width:inline?22:18,height:inline?22:18}}
        onClick={()=>setTheme(k)}/>
    ))}
  </div>;
}

function LoginView({staff,onLogin,theme,setTheme}){
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [err,setErr]=useState("");
  const DEMOS=[{l:"管理員",e:"admin@store.com",p:"admin123"},{l:"倉管人員",e:"warehouse@store.com",p:"wh123"}];
  const doLogin=()=>{
    const u=staff.find(u=>u.email===email&&u.pw===pw);
    if(!u){setErr("帳號或密碼錯誤");return;}
    setErr("");onLogin(u);
  };
  return <div className="login-page">
    <div className="login-card fu">
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontFamily:"Syne,sans-serif",fontSize:24,fontWeight:800,color:"var(--accent)",letterSpacing:-1}}>倉儲管理系統</div>
        <div style={{fontSize:11,color:"var(--muted2)",letterSpacing:2,textTransform:"uppercase",marginTop:5}}>Internal ERP · Staff Only</div>
      </div>
      <div style={{marginBottom:18,textAlign:"center"}}>
        <div style={{fontSize:11,color:"var(--muted)",marginBottom:8}}>選擇介面色系</div>
        <ThemePicker theme={theme} setTheme={setTheme} inline/>
      </div>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11,color:"var(--muted)",marginBottom:6}}>快速填入示範帳號：</div>
        <div style={{display:"flex",gap:6}}>{DEMOS.map(d=>(
          <span key={d.l} onClick={()=>{setEmail(d.e);setPw(d.p);}}
            style={{background:"var(--elevated)",border:"1px solid var(--border2)",borderRadius:6,padding:"4px 10px",fontSize:11,color:"var(--muted)",cursor:"pointer",transition:"all .15s"}}
            onMouseEnter={e=>{e.target.style.borderColor="var(--accent)";e.target.style.color="var(--accent)";}}
            onMouseLeave={e=>{e.target.style.borderColor="var(--border2)";e.target.style.color="var(--muted)";}}>{d.l}</span>
        ))}</div>
      </div>
      {err&&<div className="alert alert-e">{err}</div>}
      <div className="ig"><label className="il">員工電子郵件</label>
        <input type="email" placeholder="staff@store.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
      <div className="ig"><label className="il">密碼</label>
        <input type="password" placeholder="••••••••" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()}/></div>
      <button className="btn btn-p" style={{width:"100%",justifyContent:"center",marginTop:4,fontSize:14}} onClick={doLogin}>登入後台</button>
      <div style={{textAlign:"center",marginTop:14,fontSize:11,color:"var(--muted)"}}>此系統僅供內部人員使用</div>
    </div>
  </div>;
}

function DashboardView({members,products,orders,gifts,cats}){
  const CE=getCE(cats);
  const totalRev=orders.filter(o=>o.status==="完成").reduce((a,o)=>a+o.total,0);
  const pending=orders.filter(o=>["待處理","待出貨"].includes(o.status)).length;
  const lowStock=products.filter(p=>p.stock<=5&&p.active);
  const topSpenders=[...members].map(m=>({...m,spent:calcSpent(orders,m.id)})).sort((a,b)=>b.spent-a.spent);
  return <div className="fu">
    <div className="page-hd"><div className="page-title">儀表板</div>
      <div style={{fontSize:12,color:"var(--muted)"}}>{new Date().toLocaleDateString("zh-TW",{year:"numeric",month:"long",day:"numeric"})}</div>
    </div>
    <div className="stat-grid">
      {[{l:"總訂單",v:orders.length,sub:`待處理 ${pending} 筆`,c:"var(--accent)"},
        {l:"已完成營收",v:FMT(totalRev),sub:"完成訂單合計",c:"#059669"},
        {l:"會員人數",v:members.length,sub:`批發 ${members.filter(m=>m.role==="wholesale").length} 人`,c:"#8b5cf6"},
        {l:"低庫存商品",v:lowStock.length,sub:lowStock.length?"請盡快補貨":"庫存充足",c:lowStock.length?"#ef4444":"#059669"}
      ].map((s,i)=><div key={i} className="stat-card">
        <div className="stat-val" style={{color:s.c}}>{s.v}</div>
        <div className="stat-lbl">{s.l}</div><div className="stat-sub">{s.sub}</div>
      </div>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:16}}>
      <div className="card"><div className="card-hd"><div className="card-title">🏆 消費金額排行</div></div>
        <div style={{overflowX:"auto"}}><table><thead><tr><th>會員</th><th>類型</th><th>累積消費</th><th>禮品資格</th></tr></thead>
          <tbody>{topSpenders.map(m=>{const gi=getGiftInfo(m.spent,gifts);const topGift=gi.earned.slice(-1)[0];
            return <tr key={m.id}>
              <td><div style={{fontWeight:600,color:"var(--text)"}}>{m.name}</div>
                <div style={{fontSize:11,color:"var(--muted2)"}}>{m.phone}</div></td>
              <td><span className={`badge ${m.role==="wholesale"?"bw":"bm"}`}>{m.role==="wholesale"?"批發":"一般"}</span></td>
              <td style={{fontFamily:"Syne,sans-serif",fontWeight:800,color:"var(--accent)"}}>{FMT(m.spent)}</td>
              <td>{topGift?<span className="badge bgi">🎁 {topGift.gift}</span>:<span style={{color:"var(--muted2)",fontSize:12}}>尚未達標</span>}</td>
            </tr>;
          })}</tbody>
        </table></div>
      </div>
      <div>
        <div className="card" style={{marginBottom:14}}><div className="card-hd"><div className="card-title">⚠ 低庫存警示</div></div>
          <div className="card-body" style={{padding:lowStock.length?"0":"18px"}}>
            {lowStock.length===0?<div style={{color:"var(--muted)",fontSize:13}}>✓ 所有商品庫存充足</div>
            :lowStock.map(p=><div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid var(--border)"}}>
              <div style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{CE[p.cat]} {p.name}</div>
              <span className={`badge ${p.stock===0?"ba":"bp"}`}>{p.stock===0?"已售完":`剩${p.stock}`}</span>
            </div>)}
          </div>
        </div>
        <div className="card"><div className="card-hd"><div className="card-title">🎁 禮品門檻設定</div></div>
          <div className="card-body">{gifts.filter(g=>g.active).sort((a,b)=>a.minAmount-b.minAmount).map(g=>(
            <div key={g.id} style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:13}}>
              <span style={{color:"var(--text2)"}}>{g.gift}</span>
              <span style={{color:"var(--accent)",fontWeight:700}}>{FMT(g.minAmount)}</span>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  </div>;
}

function StoreSearchModal({brand,onSelect,onClose}){
  const [q,setQ]=useState("");
  const stores=STORE_DATA[brand]||[];
  const filtered=q?stores.filter(s=>s.name.includes(q)||s.code.includes(q)||s.city.includes(q)||s.area.includes(q)):stores;
  return <Modal title={`🔍 查詢 ${brand} 門市`} onClose={onClose}>
    <div className="ig">
      <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="輸入城市、地區或門市名稱..."/>
    </div>
    <div style={{maxHeight:320,overflowY:"auto",border:"1px solid var(--border)",borderRadius:8}}>
      {filtered.length===0&&<div style={{padding:"24px",textAlign:"center",color:"var(--muted2)",fontSize:13}}>找不到符合的門市</div>}
      {filtered.map(s=>(
        <div key={s.code} onClick={()=>onSelect(s)}
          style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",borderBottom:"1px solid var(--border)",cursor:"pointer",transition:"background .15s"}}
          onMouseEnter={e=>e.currentTarget.style.background="var(--accent-bg)"}
          onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <div>
            <div style={{fontWeight:600,color:"var(--text)",fontSize:14}}>{s.name}</div>
            <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{s.city} {s.area}</div>
          </div>
          <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:13,fontWeight:700,color:"var(--accent)",background:"var(--elevated)",padding:"4px 10px",borderRadius:6,border:"1px solid var(--border2)"}}>{s.code}</div>
        </div>
      ))}
    </div>
    <div style={{fontSize:11,color:"var(--muted2)",marginTop:10,lineHeight:1.6}}>
      ⚠ 此為示範門市資料（共 {stores.length} 筆）。正式上線時可向各超商申請完整店點清單或串接官方 API。
    </div>
  </Modal>;
}

function MemberForm({init,onSave,onClose,isAdmin}){
  const blank={name:"",phone:"",email:"",address:"",favStore:"7-11",storeName:"",storeCode:"",role:"member",status:"active",note:""};
  const [form,setForm]=useState(init||blank);
  const [showStore,setShowStore]=useState(false);
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const valid=form.name&&form.phone&&form.email&&form.address;
  const canSearch=["7-11","全家","萊爾富"].includes(form.favStore);
  return <>
    <div className="irow">
      <div className="ig"><label className="il">姓名 *</label><input value={form.name} onChange={set("name")} placeholder="會員姓名"/></div>
      <div className="ig"><label className="il">電話 *</label><input value={form.phone} onChange={set("phone")} placeholder="09XX-XXX-XXX"/></div>
    </div>
    <div className="ig"><label className="il">電子信箱 *</label><input type="email" value={form.email} onChange={set("email")} placeholder="email@example.com"/></div>
    <div className="ig"><label className="il">收件地址 *</label><input value={form.address} onChange={set("address")} placeholder="縣市區路街號"/></div>
    <div className="ig"><label className="il">常用超商</label>
      <div style={{display:"flex",gap:8}}>
        <select value={form.favStore} onChange={e=>{setForm(f=>({...f,favStore:e.target.value,storeName:"",storeCode:""}));}} style={{flex:1}}>
          {STORE_OPTS.map(s=><option key={s}>{s}</option>)}
        </select>
        {canSearch&&<button type="button" className="btn btn-s btn-sm" onClick={()=>setShowStore(true)} style={{whiteSpace:"nowrap"}}>🔍 查詢門市</button>}
      </div>
    </div>
    {form.storeName||form.storeCode?(
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"var(--accent-bg)",border:"1px solid var(--accent-br)",borderRadius:8,marginBottom:13}}>
        <span style={{fontSize:18}}>{form.favStore==="7-11"?"🏪":form.favStore==="全家"?"🟢":"🔵"}</span>
        <div style={{flex:1}}>
          <div style={{fontWeight:600,color:"var(--text)",fontSize:14}}>{form.storeName}</div>
          <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:12,color:"var(--accent)",fontWeight:700}}>{form.storeCode}</div>
        </div>
        <button type="button" className="btn btn-gh btn-xs" onClick={()=>setForm(f=>({...f,storeName:"",storeCode:""}))}>清除</button>
      </div>
    ):(
      <div className="irow" style={{marginBottom:0}}>
        <div className="ig"><label className="il">門市名稱（手動輸入）</label><input value={form.storeName} onChange={set("storeName")} placeholder="例：台北信義門市"/></div>
        <div className="ig"><label className="il">門市代碼</label><input value={form.storeCode} onChange={set("storeCode")} placeholder="例：169528"/></div>
      </div>
    )}
    <div className="irow">
      <div className="ig"><label className="il">會員類型{!isAdmin&&" （需管理員）"}</label>
        <select value={form.role} onChange={set("role")} disabled={!isAdmin}>
          <option value="member">一般會員</option><option value="wholesale">批發會員</option>
        </select>
      </div>
      <div className="ig"><label className="il">狀態</label>
        <select value={form.status} onChange={set("status")}><option value="active">正常</option><option value="inactive">停用</option></select>
      </div>
    </div>
    <div className="ig"><label className="il">備註（內部用）</label>
      <textarea value={form.note} onChange={set("note")} placeholder="不顯示給會員的內部備注" style={{minHeight:56}}/></div>
    <div className="modal-foot">
      <button className="btn btn-gh" onClick={onClose}>取消</button>
      <button className="btn btn-p" disabled={!valid} onClick={()=>onSave(form)}>儲存</button>
    </div>
    {showStore&&<StoreSearchModal brand={form.favStore}
      onSelect={s=>{setForm(f=>({...f,storeName:s.name,storeCode:s.code}));setShowStore(false);}}
      onClose={()=>setShowStore(false)}/>}
  </>;
}

function MemberDetailModal({member,orders,gifts,onClose,onEdit,onDelete,isAdmin}){
  const [tab,setTab]=useState("info");
  const mOrders=orders.filter(o=>o.memberId===member.id).sort((a,b)=>b.created.localeCompare(a.created));
  const spent=calcSpent(orders,member.id);
  const gi=getGiftInfo(spent,gifts);
  return <Modal title={`會員詳情：${member.name}`} onClose={onClose} lg>
    <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap",padding:"14px 18px",background:"var(--elevated)",borderRadius:10,border:"1px solid var(--border)"}}>
      <div style={{flex:1,minWidth:160}}>
        <div style={{fontFamily:"Syne,sans-serif",fontSize:24,fontWeight:800,color:"var(--accent)"}}>{FMT(spent)}</div>
        <div style={{fontSize:11,color:"var(--muted2)",textTransform:"uppercase",letterSpacing:1}}>累積消費（未取消訂單）</div>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
        <span className={`badge ${member.role==="wholesale"?"bw":"bm"}`}>{member.role==="wholesale"?"批發會員":"一般會員"}</span>
        <span className={`badge ${member.status==="active"?"bg":"bs"}`}>{member.status==="active"?"正常":"停用"}</span>
        {isAdmin&&<><button className="btn btn-gh btn-sm" onClick={onEdit}>✏ 編輯</button>
          <button className="btn btn-d btn-sm" onClick={onDelete}>刪除</button></>}
      </div>
    </div>
    <div className="card" style={{marginBottom:14}}>
      <div className="card-body" style={{padding:"14px 18px"}}>
        <div style={{fontSize:12,color:"var(--muted)",marginBottom:8,fontWeight:600}}>🎁 禮品累積進度</div>
        {gi.earned.length>0&&<div style={{marginBottom:8}}>
          {gi.earned.map(g=><span key={g.id} className="badge bgi" style={{marginRight:6,fontSize:12,padding:"4px 10px"}}>✓ {g.gift}</span>)}
        </div>}
        {gi.next?(<>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}>
            <span style={{color:"var(--text2)"}}>{gi.next.gift}</span>
            <span style={{color:"var(--accent)",fontWeight:600}}>{FMT(spent)} / {FMT(gi.next.minAmount)}</span>
          </div>
          <div className="gift-bar-bg"><div className="gift-bar-fill" style={{width:`${gi.pct}%`}}/></div>
          <div style={{fontSize:11,color:"var(--muted2)",marginTop:4}}>還差 {FMT(gi.next.minAmount-spent)} 達標</div>
        </>):<div style={{color:"#059669",fontSize:13,fontWeight:600}}>✓ 已達最高禮品等級！</div>}
      </div>
    </div>
    <div className="tabs" style={{maxWidth:280}}>
      {[["info","基本資料"],["orders","訂購記錄"]].map(([k,l])=>(
        <div key={k} className={`tab${tab===k?" act":""}`} onClick={()=>setTab(k)}>{l}
          {k==="orders"&&<span style={{fontSize:10,color:"var(--muted)",marginLeft:4}}>({mOrders.length})</span>}
        </div>
      ))}
    </div>
    {tab==="info"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      {[["姓名",member.name],["電話",member.phone],["信箱",member.email],["加入日期",member.joined]].map(([k,v])=>(
        <div key={k} className="info-box"><div className="ib-label">{k}</div><div className="ib-value">{v}</div></div>
      ))}
      <div className="info-box" style={{gridColumn:"1/-1"}}><div className="ib-label">收件地址</div><div className="ib-value">{member.address}</div></div>
      <div className="info-box"><div className="ib-label">常用超商</div><div className="ib-value">{member.favStore} · {member.storeName||"未填"}</div></div>
      <div className="info-box"><div className="ib-label">門市代碼</div><div className="ib-value" style={{fontFamily:"JetBrains Mono,monospace",fontSize:15,color:"var(--accent)"}}>{member.storeCode||"未填"}</div></div>
      {member.note&&<div className="info-box" style={{gridColumn:"1/-1"}}><div className="ib-label">備註</div><div className="ib-value" style={{fontSize:13,lineHeight:1.6}}>{member.note}</div></div>}
    </div>}
    {tab==="orders"&&(mOrders.length===0?<div className="empty" style={{padding:"24px 0"}}><div>📋 尚無訂購記錄</div></div>
    :<div style={{overflowX:"auto"}}><table><thead><tr><th>訂單編號</th><th>商品</th><th>配送</th><th>金額</th><th>狀態</th><th>日期</th></tr></thead>
      <tbody>{mOrders.map(o=><tr key={o.id}>
        <td className="mono" style={{color:"var(--muted)"}}>{o.id}</td>
        <td style={{maxWidth:160,color:"var(--text2)"}}>{o.items.map(i=>`${i.name}×${i.qty}`).join("、")}</td>
        <td><span className="tag">{o.ship}</span></td>
        <td style={{color:"var(--accent)",fontWeight:600}}>{FMT(o.total)}</td>
        <td><span className={`badge ${STATUS_BADGE[o.status]||"bs"}`}>{o.status}</span></td>
        <td className="mono" style={{color:"var(--muted2)"}}>{o.created}</td>
      </tr>)}</tbody>
    </table></div>)}
  </Modal>;
}

function MembersView({members,setMembers,orders,gifts,isAdmin,onCreateOrder,toast}){
  const [q,setQ]=useState("");
  const [filterRole,setFilterRole]=useState("全部");
  const [showCreate,setShowCreate]=useState(false);
  const [detail,setDetail]=useState(null);
  const [editing,setEditing]=useState(null);
  const searched=q.trim()?members.filter(m=>m.phone.includes(q.trim())||m.name.includes(q.trim())):members;
  const filtered=filterRole==="全部"?searched:searched.filter(m=>m.role===filterRole);
  const saveNew=form=>{
    if(members.find(m=>m.phone===form.phone)){toast("此電話號碼已存在","e");return;}
    setMembers(ms=>[...ms,{...form,id:Date.now(),joined:new Date().toISOString().split("T")[0]}]);
    toast("會員已建立","s");setShowCreate(false);
  };
  const saveEdit=form=>{
    setMembers(ms=>ms.map(m=>m.id===editing.id?{...m,...form}:m));
    toast("資料已更新","s");setDetail(null);setEditing(null);
  };
  const deleteMember=m=>{
    if(!window.confirm(`確定刪除 ${m.name}？`))return;
    setMembers(ms=>ms.filter(x=>x.id!==m.id));setDetail(null);toast("已刪除","s");
  };
  return <div className="fu">
    <div className="page-hd"><div className="page-title">會員管理</div>
      <button className="btn btn-p" onClick={()=>setShowCreate(true)}>＋ 建立新會員</button>
    </div>
    <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:"16px 20px",marginBottom:18,boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
      <div style={{fontSize:12,color:"var(--muted)",marginBottom:8,fontWeight:600}}>📞 輸入電話或姓名快速查詢</div>
      <div style={{display:"flex",gap:10}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="輸入電話或姓名..." style={{fontSize:15,padding:"10px 14px",borderRadius:9}}/>
        {q&&<button className="btn btn-gh" onClick={()=>setQ("")}>清除</button>}
      </div>
      {q&&<div style={{marginTop:8,fontSize:12,color:"var(--muted)"}}>找到 {filtered.length} 筆結果</div>}
    </div>
    <div className="filter-bar">
      {[["全部",members.length],["member",members.filter(m=>m.role==="member").length],["wholesale",members.filter(m=>m.role==="wholesale").length]].map(([r,cnt])=>(
        <span key={r} className={`filter-chip${filterRole===r?" act":""}`} onClick={()=>setFilterRole(r)}>
          {r==="全部"?"全部":r==="member"?"一般會員":"批發會員"} <span style={{opacity:.7,fontSize:10}}>({cnt})</span>
        </span>
      ))}
    </div>
    <div className="member-grid">
      {filtered.map(m=>{
        const spent=calcSpent(orders,m.id);
        const gi=getGiftInfo(spent,gifts);
        const topGift=gi.earned.slice(-1)[0];
        return <div key={m.id} className="member-card" onClick={()=>setDetail(m)}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div>
              <div style={{fontWeight:700,fontSize:15,color:"var(--text)"}}>{m.name}</div>
              <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:12,color:"var(--muted)",marginTop:2}}>{m.phone}</div>
            </div>
            <div style={{display:"flex",gap:5,flexDirection:"column",alignItems:"flex-end"}}>
              <span className={`badge ${m.role==="wholesale"?"bw":"bm"}`}>{m.role==="wholesale"?"批發":"一般"}</span>
              {m.status==="inactive"&&<span className="badge bs">停用</span>}
            </div>
          </div>
          <div style={{display:"flex",gap:10,marginBottom:10}}>
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:"var(--muted2)",marginBottom:2}}>累積消費</div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:800,color:"var(--accent)"}}>{FMT(spent)}</div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:"var(--muted2)",marginBottom:2}}>訂單數</div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:800,color:"var(--text)"}}>{orders.filter(o=>o.memberId===m.id).length}</div>
            </div>
          </div>
          {gi.next&&<div className="gift-bar-wrap">
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--muted)",marginBottom:3}}>
              <span>🎁 {gi.next.gift}</span><span>{gi.pct}%</span>
            </div>
            <div className="gift-bar-bg"><div className="gift-bar-fill" style={{width:`${gi.pct}%`}}/></div>
          </div>}
          {topGift&&!gi.next&&<span className="badge bgi" style={{fontSize:11}}>🎁 最高等級：{topGift.gift}</span>}
          <div style={{marginTop:10,fontSize:11,color:"var(--muted)"}}>
            {m.favStore} {m.storeName&&`· ${m.storeName}`} {m.storeCode&&<span style={{fontFamily:"JetBrains Mono,monospace",color:"var(--accent)",fontWeight:600}}>({m.storeCode})</span>}
          </div>
          <div style={{display:"flex",gap:7,marginTop:12}}>
            <button className="btn btn-p btn-xs" onClick={e=>{e.stopPropagation();onCreateOrder(m);}}>＋ 建立訂單</button>
            <button className="btn btn-gh btn-xs" onClick={e=>{e.stopPropagation();setDetail(m);}}>查看詳情</button>
          </div>
        </div>;
      })}
      {filtered.length===0&&<div className="empty" style={{gridColumn:"1/-1"}}>
        <div style={{fontSize:36,marginBottom:8}}>🔍</div>
        <div style={{fontWeight:500,fontSize:14,color:"var(--muted2)"}}>{q?"找不到符合的會員":"目前沒有會員"}</div>
      </div>}
    </div>
    {showCreate&&<Modal title="建立新會員" onClose={()=>setShowCreate(false)}>
      <MemberForm onSave={saveNew} onClose={()=>setShowCreate(false)} isAdmin={isAdmin}/>
    </Modal>}
    {detail&&!editing&&<MemberDetailModal member={detail} orders={orders} gifts={gifts} isAdmin={isAdmin}
      onClose={()=>setDetail(null)} onEdit={()=>setEditing(detail)} onDelete={()=>deleteMember(detail)}/>}
    {editing&&<Modal title={`編輯：${editing.name}`} onClose={()=>setEditing(null)}>
      <MemberForm init={editing} onSave={saveEdit} onClose={()=>setEditing(null)} isAdmin={isAdmin}/>
    </Modal>}
  </div>;
}

function CreateOrderView({members,setMembers,products,setProducts,onOrderPlaced,toast,initMember,logistics,cats}){
  const CE=getCE(cats);
  const enabledShip=(logistics||[]).filter(l=>l.enabled).map(l=>({label:l.label,icon:l.icon,type:l.type,id:l.id}));
  const defShip=enabledShip[0]?.label||"面交";
  const [step,setStep]=useState(1);
  const [member,setMember]=useState(initMember||null);
  const [phoneQ,setPhoneQ]=useState(initMember?.phone||"");
  const [cart,setCart]=useState([]);
  const [ship,setShip]=useState(defShip);
  const [sinfo,setSinfo]=useState("");
  const [note,setNote]=useState("");
  const [payMethod,setPayMethod]=useState("cod");
  const [payNote,setPayNote]=useState("");
  const [inputQty,setInputQty]=useState({});
  const [showNew,setShowNew]=useState(false);

  const matched=phoneQ.trim()?members.filter(m=>m.phone.includes(phoneQ.trim())||m.name.includes(phoneQ.trim())):[];
  const selectMember=m=>{
    setMember(m);
    setSinfo(m.storeCode?`${m.favStore} ${m.storeName}（${m.storeCode}）`:m.address||"");
    setStep(2);
  };
  const isWS=member?.role==="wholesale";
  const total=cart.reduce((a,c)=>a+c.price*c.qty,0);
  const getIQ=pid=>inputQty[pid]||1;
  const setIQ=(pid,v)=>setInputQty(q=>({...q,[pid]:Math.max(1,v||1)}));

  const addItemQty=(p,qty)=>{
    const price=isWS?p.wprice:p.price;
    if(p.stock<=0&&!p.preorder){toast("此商品已售完","e");return;}
    if(!p.preorder&&qty>p.stock){toast(`庫存僅剩 ${p.stock}，請調整數量`,"e");return;}
    setCart(c=>{const ex=c.find(x=>x.pid===p.id);
      if(ex){const nq=ex.qty+qty;
        if(!p.preorder&&nq>p.stock){toast(`庫存僅剩 ${p.stock}`,"e");return c;}
        return c.map(x=>x.pid===p.id?{...x,qty:nq}:x);}
      return [...c,{pid:p.id,name:p.name,price,unit:p.unit,stock:p.stock,preorder:p.preorder||false,qty}];
    });
    setIQ(p.id,1);
  };

  const setCartQty=(pid,val,p)=>{
    const v=parseInt(val)||0;
    if(v<=0){setCart(c=>c.filter(x=>x.pid!==pid));return;}
    if(!p.preorder&&v>p.stock){toast(`庫存僅剩 ${p.stock}`,"e");return;}
    setCart(c=>c.map(x=>x.pid===pid?{...x,qty:v}:x));
  };

  const PAYMENT_OPTS=[
    {id:"cod",label:"貨到付款",icon:"💵",desc:"取件時現場付款",needNote:false},
    {id:"prepay",label:"先付款後出貨",icon:"🏦",desc:"請先匯款，輸入帳戶末5碼供核對",needNote:true,ph:"銀行帳號末5碼，例：12345"},
    {id:"cash",label:"面交現金",icon:"🤝",desc:"見面時收取現金",needNote:false},
    {id:"transfer",label:"轉帳後出貨",icon:"💸",desc:"已轉帳，請備注轉帳資訊",needNote:true,ph:"帳號末5碼＋轉帳金額"},
  ];

  const submit=()=>{
    if(!sinfo.trim()){toast("請填寫收件資訊","e");return;}
    if(PAYMENT_OPTS.find(p=>p.id===payMethod)?.needNote&&!payNote.trim()){toast("請填寫付款備注","e");return;}
    const oid="ORD-"+String(Date.now()).slice(-4);
    const order={id:oid,memberId:member.id,memberName:member.name,memberPhone:member.phone,memberRole:member.role,
      items:cart.map(c=>({pid:c.pid,name:c.name,qty:c.qty,price:c.price,unit:c.unit,preorder:c.preorder})),
      total,status:"待處理",ship,sinfo,payMethod,payNote,note,created:new Date().toISOString().split("T")[0]};
    cart.filter(c=>!c.preorder).forEach(c=>setProducts(ps=>ps.map(p=>p.id===c.pid?{...p,stock:Math.max(0,p.stock-c.qty)}:p)));
    onOrderPlaced(order);toast("訂單已建立！","s");
  };
  const saveNew=form=>{
    if(members.find(m=>m.phone===form.phone)){toast("此電話已存在","e");return;}
    const nm={...form,id:Date.now(),joined:new Date().toISOString().split("T")[0]};
    setMembers(ms=>[...ms,nm]);selectMember(nm);setShowNew(false);toast("會員已建立","s");
  };
  const STEPS=["查詢會員","選擇商品","確認出貨"];
  return <div className="fu">
    <div className="page-hd"><div className="page-title">建立訂單</div></div>
    <div className="step-bar">
      {STEPS.map((s,i)=><>
        <div key={i} className={`step-node${step>i+1?" done":step===i+1?" active":""}`}>
          <div className="step-circle">{step>i+1?"✓":i+1}</div><span>{s}</span>
        </div>
        {i<STEPS.length-1&&<div key={`l${i}`} className="step-line"/>}
      </>)}
    </div>
    {step===1&&<div className="card"><div className="card-body">
      <div style={{fontSize:14,fontWeight:600,color:"var(--text)",marginBottom:14}}>輸入電話或姓名查詢會員</div>
      <div style={{display:"flex",gap:10,marginBottom:14}}>
        <input value={phoneQ} onChange={e=>setPhoneQ(e.target.value)} placeholder="電話號碼 / 姓名" style={{fontSize:15,padding:"11px 14px"}}/>
        <button className="btn btn-p" onClick={()=>setShowNew(true)}>＋ 新會員</button>
      </div>
      {matched.map(m=><div key={m.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:"var(--elevated)",borderRadius:8,marginBottom:8,cursor:"pointer",border:"1px solid var(--border2)",transition:"all .15s"}}
        onClick={()=>selectMember(m)}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.background="var(--accent-bg)";}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border2)";e.currentTarget.style.background="var(--elevated)";}}>
        <div>
          <div style={{fontWeight:700,color:"var(--text)"}}>{m.name} <span className={`badge ${m.role==="wholesale"?"bw":"bm"}`}>{m.role==="wholesale"?"批發":"一般"}</span></div>
          <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{m.phone} · {m.email}</div>
          {m.storeName&&<div style={{fontSize:11,color:"var(--muted2)",marginTop:1}}>{m.favStore} {m.storeName} ({m.storeCode})</div>}
        </div>
        <span style={{color:"var(--accent)",fontSize:18}}>→</span>
      </div>)}
      {phoneQ&&matched.length===0&&<div style={{color:"var(--muted2)",fontSize:13,textAlign:"center",padding:"20px 0"}}>
        找不到「{phoneQ}」，<button className="btn btn-p btn-sm" style={{marginLeft:8}} onClick={()=>setShowNew(true)}>建立新會員</button>
      </div>}
    </div></div>}
    {step===2&&member&&<>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,background:"var(--surface)",border:"1px solid var(--border2)",borderRadius:10,padding:"12px 16px"}}>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,color:"var(--text)"}}>{member.name} <span className={`badge ${member.role==="wholesale"?"bw":"bm"}`}>{member.role==="wholesale"?"批發":"一般"}</span></div>
          <div style={{fontSize:12,color:"var(--muted)"}}>{member.phone} · {member.favStore} {member.storeName} {member.storeCode&&`(${member.storeCode})`}</div>
        </div>
        <button className="btn btn-gh btn-sm" onClick={()=>{setStep(1);setCart([]);}}>重選</button>
        {cart.length>0&&<button className="btn btn-p" onClick={()=>setStep(3)}>下一步（{cart.reduce((a,c)=>a+c.qty,0)}件）→</button>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12}}>
        {products.filter(p=>p.active).map(p=>{
          const price=isWS?p.wprice:p.price;
          const inCart=cart.find(c=>c.pid===p.id)?.qty||0;
          const soldOut=p.stock<=0&&!p.preorder;
          return <div key={p.id} style={{background:"var(--surface)",border:`1px solid ${inCart>0?"var(--accent-br)":"var(--border)"}`,borderRadius:10,overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 1px 3px rgba(0,0,0,.05)",opacity:soldOut?.55:1}}>
            <div style={{height:90,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--elevated)",overflow:"hidden",position:"relative"}}>
              {p.image?<img src={p.image} style={{width:"100%",height:"100%",objectFit:"cover"}} alt={p.name}/>:<span style={{fontSize:36}}>{CE[p.cat]||"📦"}</span>}
              {p.stock>0&&p.stock<=5&&<span style={{position:"absolute",top:5,right:5,background:"#d97706",color:"#fff",fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:4}}>剩{p.stock}{p.unit}</span>}
              {p.stock===0&&p.preorder&&<div style={{position:"absolute",inset:0,background:"rgba(139,92,246,.75)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2}}>
                <span style={{fontSize:13,fontWeight:800,color:"#fff"}}>無庫存</span>
                <span style={{fontSize:11,color:"rgba(255,255,255,.85)",background:"rgba(255,255,255,.2)",padding:"1px 7px",borderRadius:10}}>接受預購</span>
              </div>}
              {soldOut&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.55)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:"#fff"}}>已售完</div>}
              {inCart>0&&<div style={{position:"absolute",top:5,left:5,background:"var(--accent)",color:"#fff",fontSize:11,fontWeight:800,padding:"2px 8px",borderRadius:10}}>已選 {inCart}</div>}
            </div>
            <div style={{padding:10,flex:1,display:"flex",flexDirection:"column",gap:6}}>
              <div style={{fontWeight:600,fontSize:13,color:"var(--text)",lineHeight:1.3}}>{p.name}</div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:17,fontWeight:800,color:"var(--accent)"}}>{FMT(price)}<span style={{fontSize:11,color:"var(--muted)",fontWeight:400}}>/{p.unit}</span></div>
              {!soldOut&&(inCart>0?(
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    <button className="qbtn" style={{width:24,height:24}} onClick={()=>setCartQty(p.id,inCart-1,p)}>−</button>
                    <input type="number" value={inCart} min={1} max={p.preorder?9999:p.stock}
                      onChange={e=>setCartQty(p.id,parseInt(e.target.value)||0,p)}
                      style={{width:52,textAlign:"center",padding:"3px 5px",fontSize:13,fontWeight:700,color:"var(--accent)"}}/>
                    <button className="qbtn" style={{width:24,height:24}} onClick={()=>addItemQty(p,1)}>＋</button>
                  </div>
                  <button className="btn btn-d btn-xs" style={{width:"100%",justifyContent:"center"}} onClick={()=>setCart(c=>c.filter(x=>x.pid!==p.id))}>移除</button>
                </div>
              ):(
                <div style={{display:"flex",gap:5,alignItems:"center"}}>
                  <input type="number" value={getIQ(p.id)} min={1} max={p.preorder?9999:p.stock}
                    onChange={e=>setIQ(p.id,parseInt(e.target.value))}
                    style={{width:52,textAlign:"center",padding:"4px 6px",fontSize:13}}/>
                  <button className="btn btn-p btn-sm" style={{flex:1,justifyContent:"center"}}
                    onClick={()=>addItemQty(p,getIQ(p.id))}>
                    {p.preorder?"預購":"加入"}
                  </button>
                </div>
              ))}
            </div>
          </div>;
        })}
      </div>
    </>}
    {step===3&&member&&<div style={{display:"grid",gridTemplateColumns:"1fr 1.3fr",gap:16}}>
      <div>
        <div className="card" style={{marginBottom:12}}><div className="card-hd"><div className="card-title">📦 訂單明細</div></div>
          <div className="card-body">
            {cart.map(c=><div key={c.pid} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"5px 0",borderBottom:"1px solid var(--border)"}}>
              <span style={{color:"var(--text2)"}}>{c.name} ×{c.qty} {c.unit}{c.preorder&&<span className="badge bw" style={{fontSize:9,marginLeft:4}}>預購</span>}</span>
              <span style={{color:"var(--accent)",fontWeight:600}}>{FMT(c.price*c.qty)}</span>
            </div>)}
            <div style={{display:"flex",justifyContent:"space-between",marginTop:10,paddingTop:10,borderTop:"1px solid var(--border2)",fontWeight:700}}>
              <span style={{color:"var(--text)"}}>總計</span>
              <span style={{fontFamily:"Syne,sans-serif",color:"var(--accent)",fontSize:18}}>{FMT(total)}</span>
            </div>
          </div>
        </div>
        <div className="card"><div className="card-hd"><div className="card-title">💳 付款方式</div></div>
          <div className="card-body">
            {PAYMENT_OPTS.map(p=><label key={p.id} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 12px",marginBottom:7,background:payMethod===p.id?"var(--accent-bg)":"var(--elevated)",borderRadius:8,cursor:"pointer",border:`1px solid ${payMethod===p.id?"var(--accent-br)":"var(--border)"}`,transition:"all .2s"}}>
              <input type="radio" name="pay" value={p.id} checked={payMethod===p.id} onChange={()=>{setPayMethod(p.id);setPayNote("");}} style={{width:"auto",accentColor:"var(--accent)",marginTop:2}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>{p.icon} {p.label}</div>
                <div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>{p.desc}</div>
                {payMethod===p.id&&p.needNote&&<input style={{marginTop:8,fontSize:13}} placeholder={p.ph} value={payNote} onChange={e=>setPayNote(e.target.value)}/>}
              </div>
            </label>)}
          </div>
        </div>
      </div>
      <div className="card"><div className="card-hd"><div className="card-title">🚚 配送資訊</div></div>
        <div className="card-body">
          <div className="info-box" style={{marginBottom:12}}><div className="ib-label">會員</div>
            <div className="ib-value">{member.name} · {member.phone}</div></div>
          {enabledShip.map(l=><label key={l.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 11px",marginBottom:7,background:ship===l.label?"var(--accent-bg)":"var(--elevated)",borderRadius:8,cursor:"pointer",border:`1px solid ${ship===l.label?"var(--accent-br)":"var(--border)"}`,transition:"all .2s"}}>
            <input type="radio" name="ship" value={l.label} checked={ship===l.label} onChange={()=>{setShip(l.label);setSinfo(l.type==="cvs"&&member.storeCode?`${member.favStore} ${member.storeName}（${member.storeCode}）`:l.type==="home"?member.address:"");}} style={{width:"auto",accentColor:"var(--accent)"}}/>
            <div><div style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{l.icon} {l.label}</div></div>
          </label>)}
          <div className="ig" style={{marginTop:10}}>
            <label className="il">收件地址 / 面交地點 / 門市</label>
            <input value={sinfo} onChange={e=>setSinfo(e.target.value)} placeholder="請確認收件資訊..."/>
          </div>
          <div className="ig"><label className="il">備註</label>
            <textarea value={note} onChange={e=>setNote(e.target.value)} style={{minHeight:52}} placeholder="包裝要求、時段說明..."/></div>
          <div style={{display:"flex",gap:9,marginTop:4}}>
            <button className="btn btn-gh" onClick={()=>setStep(2)}>← 返回</button>
            <button className="btn btn-p" style={{flex:1,justifyContent:"center",fontSize:14}} onClick={submit}>✓ 確認建立訂單</button>
          </div>
        </div>
      </div>
    </div>}
    {showNew&&<Modal title="建立新會員" onClose={()=>setShowNew(false)}>
      <MemberForm onSave={saveNew} onClose={()=>setShowNew(false)} isAdmin/>
    </Modal>}
  </div>;
}

function ProductsView({products,setProducts,toast,cats}){
  const CE=getCE(cats);
  const [show,setShow]=useState(false);
  const [editing,setEditing]=useState(null);
  const blank={name:"",cat:cats?.[0]?.name||"食品",price:"",wprice:"",cost:"",stock:"",minwq:"5",unit:"盒",desc:"",active:true,image:null,preorder:false};
  const [form,setForm]=useState(blank);
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const handleImg=e=>{
    const file=e.target.files[0];if(!file)return;
    const img=new Image();
    const url=URL.createObjectURL(file);
    img.onload=()=>{
      const MAX=1400;
      let w=img.width,h=img.height;
      if(w>MAX||h>MAX){
        if(w>h){h=Math.round(h*MAX/w);w=MAX;}
        else{w=Math.round(w*MAX/h);h=MAX;}
      }
      const canvas=document.createElement("canvas");
      canvas.width=w;canvas.height=h;
      canvas.getContext("2d").drawImage(img,0,0,w,h);
      const compressed=canvas.toDataURL("image/jpeg",0.88);
      setForm(f=>({...f,image:compressed}));
      URL.revokeObjectURL(url);
      const kb=Math.round(compressed.length*0.75/1024);
      toast(`圖片已上傳 ${w}×${h}px（約 ${kb}KB）`,"s");
    };
    img.onerror=()=>{toast("圖片讀取失敗，請換一張","e");URL.revokeObjectURL(url);};
    img.src=url;
  };
  const openAdd=()=>{setForm(blank);setEditing(null);setShow(true);};
  const openEdit=p=>{setForm({...p,price:String(p.price),wprice:String(p.wprice),cost:String(p.cost||0),stock:String(p.stock),minwq:String(p.minwq)});setEditing(p.id);setShow(true);};
  const save=()=>{
    if(!form.name||!form.price||!form.stock){toast("請填寫必填欄位","e");return;}
    if(editing){setProducts(ps=>ps.map(p=>p.id===editing?{...p,...form,price:+form.price,wprice:+form.wprice,cost:+form.cost||0,stock:+form.stock,minwq:+form.minwq}:p));toast("已更新","s");}
    else{setProducts(ps=>[...ps,{...form,id:Date.now(),price:+form.price,wprice:+form.wprice,cost:+form.cost||0,stock:+form.stock,minwq:+form.minwq}]);toast("已新增","s");}
    setShow(false);
  };
  const adj=(id,d)=>setProducts(ps=>ps.map(p=>p.id===id?{...p,stock:Math.max(0,p.stock+d)}:p));
  const delProd=p=>{if(!window.confirm(`確定刪除「${p.name}」？此操作無法復原。`))return;setProducts(ps=>ps.filter(x=>x.id!==p.id));toast(`已刪除：${p.name}`,"s");};
  const Thumb=({p,size=40})=>(
    <div style={{width:size,height:size,borderRadius:6,overflow:"hidden",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--elevated)",flexShrink:0,fontSize:size*0.55}}>
      {p.image?<img src={p.image} style={{width:"100%",height:"100%",objectFit:"cover"}} alt={p.name}/>:CE[p.cat]||"📦"}
    </div>
  );
  return <div className="fu"><div className="page-hd"><div className="page-title">商品管理</div>
    <button className="btn btn-p" onClick={openAdd}>＋ 新增商品</button></div>
    <div className="card"><div style={{overflowX:"auto"}}><table><thead><tr><th>商品</th><th>分類</th><th>零售價</th><th>批發價</th><th>成本</th><th>毛利率</th><th>庫存</th><th>狀態</th><th>操作</th></tr></thead>
      <tbody>{products.map(p=>{
        const margin=p.cost>0?Math.round((1-p.cost/p.price)*100):null;
        const wsMargin=p.cost>0&&p.wprice>0?Math.round((1-p.cost/p.wprice)*100):null;
        return <tr key={p.id}>
        <td><div style={{display:"flex",alignItems:"center",gap:10}}>
          <Thumb p={p}/>
          <div>
            <div style={{fontWeight:600,color:"var(--text)"}}>{p.name}</div>
            {p.preorder&&<span className="badge bp" style={{fontSize:10,marginTop:2,display:"inline-block"}}>預購中</span>}
          </div>
        </div></td>
        <td><span className="tag">{p.cat}</span></td>
        <td style={{color:"var(--accent)",fontWeight:600,fontFamily:"JetBrains Mono,monospace",fontSize:13}}>{FMT(p.price)}</td>
        <td style={{color:"#8b5cf6",fontWeight:600,fontFamily:"JetBrains Mono,monospace",fontSize:13}}>{FMT(p.wprice)}</td>
        <td style={{color:"var(--muted)",fontFamily:"JetBrains Mono,monospace",fontSize:13}}>{p.cost>0?FMT(p.cost):<span style={{color:"var(--border2)"}}>—</span>}</td>
        <td>
          {margin!==null?<div>
            <div style={{fontSize:12,color:margin>=30?"#059669":margin>=15?"#d97706":"#ef4444",fontWeight:700}}>{margin}%</div>
            {wsMargin!==null&&<div style={{fontSize:10,color:"#8b5cf6"}}>批:{wsMargin}%</div>}
          </div>:<span style={{color:"var(--border2)",fontSize:12}}>—</span>}
        </td>
        <td><div style={{display:"flex",alignItems:"center",gap:5}}>
          <button className="qbtn" onClick={()=>adj(p.id,-1)} style={{width:22,height:22,fontSize:12}}>−</button>
          <span style={{fontFamily:"JetBrains Mono,monospace",color:p.stock===0?"#ef4444":p.stock<=5?"#d97706":"var(--text)",fontWeight:600,minWidth:26,textAlign:"center"}}>{p.stock}</span>
          <button className="qbtn" onClick={()=>adj(p.id,1)} style={{width:22,height:22,fontSize:12}}>＋</button>
        </div></td>
        <td>
          <div style={{display:"flex",gap:4,flexDirection:"column"}}>
            <span className={`badge ${p.active?"bg":"bs"}`}>{p.active?"上架":"下架"}</span>
            {p.preorder&&<span className="badge bp" style={{fontSize:10}}>可預購</span>}
          </div>
        </td>
        <td><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          <button className="btn btn-gh btn-xs" onClick={()=>openEdit(p)}>編輯</button>
          <button className={`btn btn-xs ${p.active?"btn-gh":"btn-g"}`} onClick={()=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,active:!x.active}:x))}>{p.active?"下架":"上架"}</button>
          <button className="btn btn-d btn-xs" onClick={()=>delProd(p)}>刪除</button>
        </div></td>
      </tr>;})}
      </tbody>
    </table></div></div>
    {show&&<Modal title={editing?"編輯商品":"新增商品"} onClose={()=>setShow(false)}>
      <div className="ig">
        <label className="il">商品照片</label>
        <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <div style={{width:80,height:80,borderRadius:10,overflow:"hidden",border:"2px dashed var(--border2)",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--elevated)",flexShrink:0,fontSize:32,cursor:"pointer"}}
            onClick={()=>document.getElementById("prod-img-input").click()}>
            {form.image?<img src={form.image} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="preview"/>:getCE(cats)[form.cat]||"📦"}
          </div>
          <div style={{flex:1}}>
            <label style={{display:"inline-flex",alignItems:"center",gap:6,cursor:"pointer",background:"var(--elevated)",border:"1px solid var(--border2)",borderRadius:7,padding:"7px 12px",fontSize:12,color:"var(--muted)",transition:"all .15s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.color="var(--accent)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border2)";e.currentTarget.style.color="var(--muted)";}}>
              📷 選擇照片（無大小限制）
              <input id="prod-img-input" type="file" accept="image/*" style={{display:"none"}} onChange={handleImg}/>
            </label>
            <div style={{fontSize:11,color:"var(--muted2)",marginTop:6,lineHeight:1.5}}>支援 JPG、PNG、WebP<br/>大圖自動壓縮至 1400px</div>
            {form.image&&<button type="button" className="btn btn-d btn-xs" style={{marginTop:8}} onClick={()=>setForm(f=>({...f,image:null}))}>✕ 移除照片</button>}
          </div>
        </div>
      </div>
      <div className="irow"><div className="ig"><label className="il">商品名稱 *</label><input value={form.name} onChange={set("name")}/></div>
        <div className="ig"><label className="il">分類</label>
          <select value={form.cat} onChange={set("cat")}>
            {(cats||INIT_CATS).map(c=><option key={c.id} value={c.name}>{c.emoji} {c.name}</option>)}
          </select>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:11}}>
        <div className="ig"><label className="il">零售價 *</label><input type="number" value={form.price} onChange={set("price")}/></div>
        <div className="ig"><label className="il">批發價</label><input type="number" value={form.wprice} onChange={set("wprice")}/></div>
        <div className="ig"><label className="il">成本價</label><input type="number" value={form.cost} onChange={set("cost")} placeholder="0"/></div>
      </div>
      {form.cost>0&&form.price>0&&<div style={{display:"flex",gap:10,marginBottom:13,padding:"10px 14px",background:"var(--elevated)",borderRadius:8,border:"1px solid var(--border)",fontSize:12}}>
        <span style={{color:"var(--muted)"}}>零售毛利：<strong style={{color:Math.round((1-form.cost/form.price)*100)>=20?"#059669":"#d97706"}}>{Math.round((1-form.cost/form.price)*100)}%</strong></span>
        {form.wprice>0&&<span style={{color:"var(--muted)"}}>批發毛利：<strong style={{color:Math.round((1-form.cost/form.wprice)*100)>=10?"#8b5cf6":"#ef4444"}}>{Math.round((1-form.cost/form.wprice)*100)}%</strong></span>}
      </div>}
      <div className="irow"><div className="ig"><label className="il">庫存 *</label><input type="number" value={form.stock} onChange={set("stock")}/></div>
        <div className="ig"><label className="il">最小批量</label><input type="number" value={form.minwq} onChange={set("minwq")}/></div>
      </div>
      <div className="irow"><div className="ig"><label className="il">單位</label><input value={form.unit} onChange={set("unit")}/></div>
        <div className="ig"><label className="il">狀態</label>
          <select value={form.active?"active":"inactive"} onChange={e=>setForm(f=>({...f,active:e.target.value==="active"}))}>
            <option value="active">上架中</option><option value="inactive">下架</option>
          </select>
        </div>
      </div>
      <div className="ig"><label className="il">說明</label><textarea value={form.desc} onChange={set("desc")} style={{minHeight:52}}/></div>
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:"var(--elevated)",borderRadius:8,border:"1px solid var(--border)",marginBottom:13}}>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>允許零庫存預購</div>
          <div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>開啟後即使庫存為 0，仍可接受訂單</div>
        </div>
        <label className="toggle">
          <input type="checkbox" checked={form.preorder||false} onChange={e=>setForm(f=>({...f,preorder:e.target.checked}))}/>
          <span className="toggle-slider"></span>
        </label>
      </div>
      <div className="modal-foot"><button className="btn btn-gh" onClick={()=>setShow(false)}>取消</button>
        <button className="btn btn-p" onClick={save}>儲存</button></div>
    </Modal>}
  </div>;
}

function PrintLabel({order,onClose}){
  const printCSS=`@media print{body{margin:0}#no-print{display:none!important}.print-wrap{page-break-inside:avoid}}`;
  const doPrint=()=>{
    const w=window.open("","_blank","width=600,height=700");
    w.document.write(`<html><head><title>出貨單 ${order.id}</title>
    <style>body{font-family:'Noto Sans TC',Arial,sans-serif;padding:20px;font-size:13px}
    .title{font-size:22px;font-weight:900;margin-bottom:4px}
    .sub{color:#666;font-size:11px;margin-bottom:16px}
    .box{border:1px solid #ddd;border-radius:8px;padding:14px;margin-bottom:12px}
    .row{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #f0f0f0}
    .row:last-child{border:none}
    .label{color:#888;font-size:11px}
    .val{font-weight:600}
    .total{font-size:20px;font-weight:900;color:#d97706;text-align:right;margin-top:8px}
    .items td{padding:5px 8px;border-bottom:1px solid #f0f0f0}
    .items th{padding:6px 8px;background:#f8f8f8;font-size:11px;text-align:left}
    table{width:100%;border-collapse:collapse}
    .note{background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:10px;font-size:12px;margin-top:8px}
    .barcode{font-family:monospace;font-size:24px;letter-spacing:4px;text-align:center;margin:8px 0;font-weight:900}
    .preorder{background:#f3e8ff;border:1px solid #d8b4fe;border-radius:4px;padding:2px 8px;font-size:11px;color:#7c3aed}
    @media print{.no-print{display:none}}</style></head><body>
    <div class="title">📦 出貨單</div>
    <div class="sub">${order.id} · 建立日期：${order.created} · 列印：${new Date().toLocaleString("zh-TW")}</div>
    <div class="box">
      <div style="font-size:11px;color:#888;margin-bottom:6px">▌ 收件人</div>
      <div class="row"><span class="label">姓名</span><span class="val">${order.memberName}</span></div>
      <div class="row"><span class="label">電話</span><span class="val">${order.memberPhone}</span></div>
      <div class="row"><span class="label">配送方式</span><span class="val">${order.ship}</span></div>
      <div class="row"><span class="label">收件地址／門市</span><span class="val">${order.sinfo}</span></div>
      <div class="row"><span class="label">付款方式</span><span class="val" style="color:#d97706">${order.payMethod==="cod"?"貨到付款":order.payMethod==="prepay"?"先付款後出貨":order.payMethod==="cash"?"面交現金":order.payMethod==="transfer"?"轉帳後出貨":order.payMethod||"—"}</span></div>
      ${order.payNote?`<div class="row"><span class="label">付款備注</span><span class="val">${order.payNote}</span></div>`:""}
      ${order.note?`<div class="note">📝 備註：${order.note.replace(/\n/g,"<br>")}</div>`:""}
    </div>
    <div class="box">
      <div style="font-size:11px;color:#888;margin-bottom:6px">▌ 訂購商品</div>
      <table class="items"><thead><tr><th>品名</th><th style="text-align:center">數量</th><th style="text-align:right">小計</th></tr></thead>
      <tbody>${order.items.map(i=>`<tr><td>${i.name}${i.preorder?'<span class="preorder">預購</span>':""}</td><td style="text-align:center">${i.qty} ${i.unit}</td><td style="text-align:right">NT$${(i.price*i.qty).toLocaleString()}</td></tr>`).join("")}
      </tbody></table>
      <div class="total">合計 NT$${order.total.toLocaleString()}</div>
    </div>
    <div class="box" style="text-align:center">
      <div style="font-size:11px;color:#888;margin-bottom:6px">▌ 訂單編號</div>
      <div class="barcode">${order.id}</div>
      <div style="font-size:11px;color:#aaa">請妥善保管此單據</div>
    </div>
    <div class="no-print" style="text-align:center;margin-top:20px">
      <button onclick="window.print()" style="padding:10px 24px;background:#d97706;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer">🖨️ 列印</button>
    </div>
    </body></html>`);
    w.document.close();
    w.focus();
    setTimeout(()=>w.print(),400);
  };
  return <Modal title="列印出貨單" onClose={onClose}>
    <div style={{textAlign:"center",padding:"20px 0"}}>
      <div style={{fontSize:48,marginBottom:12}}>🖨️</div>
      <div style={{fontWeight:700,color:"var(--text)",fontSize:16,marginBottom:8}}>訂單 {order.id}</div>
      <div style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>{order.memberName} · {order.memberPhone}<br/>{order.ship} → {order.sinfo}</div>
      <button className="btn btn-p" style={{fontSize:15,padding:"10px 28px"}} onClick={doPrint}>🖨️ 開啟列印視窗</button>
      <div style={{fontSize:11,color:"var(--muted2)",marginTop:12}}>會開啟新視窗，點「列印」即可列印或存成 PDF</div>
    </div>
  </Modal>;
}

function OrdersView({orders,setOrders,toast}){
  const [filter,setFilter]=useState("全部");
  const [detail,setDetail]=useState(null);
  const [note,setNote]=useState("");
  const [printing,setPrinting]=useState(null);
  const displayed=(filter==="全部"?orders:orders.filter(o=>o.status===filter||o.ship===filter)).sort((a,b)=>b.created.localeCompare(a.created));
  const updStatus=(id,status)=>{setOrders(os=>os.map(o=>o.id===id?{...o,status}:o));toast("狀態已更新","s");setDetail(d=>d?{...d,status}:null);};
  const delOrder=o=>{
    if(!["待處理","已取消"].includes(o.status)){toast("僅可刪除「待處理」或「已取消」的訂單","e");return;}
    if(!window.confirm(`確定刪除訂單 ${o.id}？`))return;
    setOrders(os=>os.filter(x=>x.id!==o.id));setDetail(null);toast("訂單已刪除","s");
  };
  const addNote=()=>{
    if(!note.trim())return;
    const msg=`[${new Date().toLocaleDateString("zh-TW")}] ${note}`;
    setOrders(os=>os.map(o=>o.id===detail.id?{...o,note:o.note?(o.note+"\n"+msg):msg}:o));
    setDetail(d=>({...d,note:d.note?(d.note+"\n"+msg):msg}));setNote("");toast("備註已新增","s");
  };
  return <div className="fu"><div className="page-hd"><div className="page-title">訂單管理</div>
    <span className="badge bp">{orders.filter(o=>["待處理","待出貨"].includes(o.status)).length} 筆待處理</span></div>
    <div className="filter-bar">{["全部","待處理","待出貨","已出貨","完成","已取消"].map(c=>(
      <span key={c} className={`filter-chip${filter===c?" act":""}`} onClick={()=>setFilter(c)}>{c}</span>
    ))}</div>
    <div className="card"><div style={{overflowX:"auto"}}><table><thead><tr><th>訂單編號</th><th>會員</th><th>金額</th><th>配送</th><th>收件</th><th>狀態</th><th>日期</th><th></th></tr></thead>
      <tbody>{displayed.map(o=><tr key={o.id}>
        <td className="mono" style={{color:"var(--muted)"}}>{o.id}
          {o.items?.some(i=>i.preorder)&&<span className="badge bw" style={{fontSize:9,marginLeft:4}}>含預購</span>}
        </td>
        <td><div style={{fontWeight:600,color:"var(--text)",fontSize:13}}>{o.memberName}</div>
          <div style={{fontSize:11,color:"var(--muted2)"}}>{o.memberPhone}</div>
          <span className={`badge ${o.memberRole==="wholesale"?"bw":"bm"}`} style={{fontSize:10}}>{o.memberRole==="wholesale"?"批發":"一般"}</span></td>
        <td style={{color:"var(--accent)",fontWeight:700}}>{FMT(o.total)}</td>
        <td><span className="tag">{o.ship}</span></td>
        <td style={{maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:12,color:"var(--muted)"}}>{o.sinfo}</td>
        <td><span className={`badge ${STATUS_BADGE[o.status]||"bs"}`}>{o.status}</span></td>
        <td className="mono" style={{fontSize:11,color:"var(--muted2)"}}>{o.created}</td>
        <td><div style={{display:"flex",gap:4}}>
          <button className="btn btn-gh btn-xs" onClick={()=>{setDetail(o);setNote("");}}>詳情</button>
          <button className="btn btn-gh btn-xs" title="列印出貨單" onClick={()=>setPrinting(o)}>🖨️</button>
          {["待處理","已取消"].includes(o.status)&&<button className="btn btn-d btn-xs" onClick={()=>delOrder(o)}>刪</button>}
        </div></td>
      </tr>)}</tbody>
    </table></div></div>
    {detail&&<Modal title={`訂單 ${detail.id}`} onClose={()=>setDetail(null)} lg>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
        <div>
          <div className="info-box"><div className="ib-label">會員</div><div className="ib-value">{detail.memberName} <span className={`badge ${detail.memberRole==="wholesale"?"bw":"bm"}`} style={{fontSize:10}}>{detail.memberRole==="wholesale"?"批發":"一般"}</span></div></div>
          <div className="info-box"><div className="ib-label">電話</div><div className="ib-value" style={{fontFamily:"JetBrains Mono,monospace"}}>{detail.memberPhone}</div></div>
          <div className="info-box"><div className="ib-label">配送方式</div><div className="ib-value">{detail.ship} · {detail.sinfo}</div></div>
          {detail.payMethod&&<div className="info-box"><div className="ib-label">付款方式</div>
            <div className="ib-value" style={{color:"var(--accent)"}}>
              {detail.payMethod==="cod"?"💵 貨到付款":detail.payMethod==="prepay"?"🏦 先付款後出貨":detail.payMethod==="cash"?"🤝 面交現金":"💸 轉帳後出貨"}
              {detail.payNote&&<span style={{fontSize:12,color:"var(--muted)",marginLeft:8}}>({detail.payNote})</span>}
            </div>
          </div>}
          {detail.note&&<div className="info-box"><div className="ib-label">備註紀錄</div><div className="ib-value" style={{fontSize:12,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{detail.note}</div></div>}
        </div>
        <div className="info-box" style={{alignSelf:"start"}}>
          <div className="ib-label">訂購商品</div>
          {detail.items.map((i,idx)=><div key={idx} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"4px 0"}}>
            <span style={{color:"var(--text2)"}}>{i.name} ×{i.qty} {i.unit}{i.preorder&&<span className="badge bw" style={{fontSize:9,marginLeft:4}}>預購</span>}</span>
            <span style={{color:"var(--accent)",fontWeight:600}}>{FMT(i.price*i.qty)}</span>
          </div>)}
          <div style={{borderTop:"1px solid var(--border)",marginTop:8,paddingTop:8,display:"flex",justifyContent:"space-between",fontWeight:700}}>
            <span style={{color:"var(--text)"}}>合計</span>
            <span style={{color:"var(--accent)",fontFamily:"Syne,sans-serif"}}>{FMT(detail.total)}</span>
          </div>
        </div>
      </div>
      <div className="ig"><label className="il">更新訂單狀態</label>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {ORDER_STATUS.map(s=><button key={s} className={`btn btn-sm ${detail.status===s?"btn-p":"btn-gh"}`} onClick={()=>updStatus(detail.id,s)}>{s}</button>)}
        </div>
      </div>
      <div className="ig"><label className="il">新增備註</label>
        <div style={{display:"flex",gap:8}}>
          <input placeholder="備貨說明、通知紀錄..." value={note} onChange={e=>setNote(e.target.value)}/>
          <button className="btn btn-s btn-sm" onClick={addNote} style={{whiteSpace:"nowrap"}}>新增</button>
        </div>
      </div>
      <div className="modal-foot">
        <button className="btn btn-gh" onClick={()=>setPrinting(detail)}>🖨️ 列印出貨單</button>
        {["待處理","已取消"].includes(detail.status)&&<button className="btn btn-d btn-sm" onClick={()=>delOrder(detail)}>刪除訂單</button>}
        <button className="btn btn-gh" onClick={()=>setDetail(null)}>關閉</button>
      </div>
    </Modal>}
    {printing&&<PrintLabel order={printing} onClose={()=>setPrinting(null)}/>}
  </div>;
}

function DispatchView({orders,setOrders,toast}){
  const dispatch=orders.filter(o=>["待處理","待出貨"].includes(o.status)).sort((a,b)=>a.created.localeCompare(b.created));
  const upd=(id,s)=>{setOrders(os=>os.map(o=>o.id===id?{...o,status:s}:o));toast("已更新","s");};
  return <div className="fu"><div className="page-hd"><div className="page-title">發貨管理</div>
    <span className={`badge ${dispatch.length>0?"bp":"bg"}`}>{dispatch.length} 筆待出貨</span></div>
    <div className="alert alert-w">📞 請先備妥貨品再聯繫會員確認收件。付款方式（現金/轉帳）請人工確認。</div>
    {dispatch.length===0?<div className="empty"><div style={{fontSize:40,marginBottom:10}}>✅</div><div style={{fontWeight:500,color:"var(--muted2)"}}>所有訂單皆已處理</div></div>
    :dispatch.map(o=><div key={o.id} className="order-card">
      <div className="order-hd">
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span className="mono" style={{color:"var(--muted)"}}>{o.id}</span>
          <span className={`badge ${STATUS_BADGE[o.status]||"bs"}`}>{o.status}</span>
          {o.memberRole==="wholesale"&&<span className="badge bw" style={{fontSize:10}}>批發</span>}
        </div>
        <span style={{fontFamily:"JetBrains Mono,monospace",fontSize:11,color:"var(--muted2)"}}>{o.created}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        <div className="info-box" style={{marginBottom:0}}>
          <div className="ib-label">會員</div>
          <div className="ib-value">{o.memberName}</div>
          <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{o.memberPhone}</div>
        </div>
        <div className="info-box" style={{marginBottom:0}}>
          <div className="ib-label">{o.ship==="超商取貨"?"超商門市":o.ship==="宅配"?"收件地址":"面交地點"}</div>
          <div className="ib-value" style={{fontSize:12}}>{o.sinfo}</div>
        </div>
        <div className="info-box" style={{marginBottom:0}}>
          <div className="ib-label">付款方式</div>
          <div className="ib-value" style={{color:"var(--accent)",fontSize:13}}>
            {!o.payMethod||o.payMethod==="cod"?"💵 貨到付款":o.payMethod==="prepay"?"🏦 先付款後出貨":o.payMethod==="cash"?"🤝 面交現金":"💸 轉帳後出貨"}
            {o.payNote&&<span style={{fontSize:11,color:"var(--muted)",marginLeft:6}}>({o.payNote})</span>}
          </div>
        </div>
      </div>
      <div style={{marginBottom:12,display:"flex",flexWrap:"wrap",gap:5}}>
        {o.items.map((i,idx)=><span key={idx} style={{fontSize:12,background:"var(--accent-bg)",color:"var(--accent)",padding:"3px 9px",borderRadius:5,border:"1px solid var(--accent-br)"}}>
          {i.name} ×{i.qty}{i.unit}
        </span>)}
      </div>
      {o.note&&<div style={{fontSize:12,color:"var(--muted)",marginBottom:10,background:"var(--elevated)",padding:"8px 10px",borderRadius:6,border:"1px solid var(--border)",lineHeight:1.6,whiteSpace:"pre-wrap"}}>{o.note}</div>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:17,color:"var(--accent)"}}>{FMT(o.total)}</span>
        <div style={{display:"flex",gap:7}}>
          {o.status==="待處理"&&<button className="btn btn-s btn-sm" onClick={()=>upd(o.id,"待出貨")}>備貨完成 →</button>}
          {o.status==="待出貨"&&<button className="btn btn-p btn-sm" onClick={()=>upd(o.id,"已出貨")}>🚚 確認已出貨</button>}
          <button className="btn btn-d btn-sm" onClick={()=>upd(o.id,"已取消")}>取消</button>
        </div>
      </div>
    </div>)}
  </div>;
}

function SettingsView({staff,setStaff,gifts,setGifts,logistics,setLogistics,cats,setCats,isAdmin,toast}){
  const [catForm,setCatForm]=useState({name:"",emoji:"📦"});
  const EMOJIS=["📦","🍱","🏠","💄","📱","👕","🎁","🧴","🍵","☕","🧸","🌿","💊","🔧","🎨","📚"];
  const addCat=()=>{
    if(!catForm.name.trim()){toast("請填寫分類名稱","e");return;}
    if((cats||[]).find(c=>c.name===catForm.name)){toast("此分類已存在","e");return;}
    setCats(cs=>[...cs,{id:Date.now(),name:catForm.name,emoji:catForm.emoji}]);
    setCatForm({name:"",emoji:"📦"});toast(`已新增分類：${catForm.name}`,"s");
  };
  const delCat=c=>{
    if(!window.confirm(`確定刪除分類「${c.name}」？`))return;
    setCats(cs=>cs.filter(x=>x.id!==c.id));toast("分類已刪除","s");
  };
  const [showGift,setShowGift]=useState(false);
  const [gform,setGform]=useState({minAmount:"",gift:"",active:true});
  const [staffModal,setStaffModal]=useState(null);
  const [staffErr,setStaffErr]=useState("");
  const saveGift=()=>{
    if(!gform.minAmount||!gform.gift){toast("請填寫門檻金額與禮品","e");return;}
    setGifts(gs=>[...gs,{...gform,id:Date.now(),minAmount:+gform.minAmount}]);
    setGform({minAmount:"",gift:"",active:true});setShowGift(false);toast("已新增","s");
  };
  const togLogistics=id=>setLogistics(ls=>ls.map(l=>l.id===id?{...l,enabled:!l.enabled}:l));
  const LTYPE={cvs:"🏪 超商取貨",home:"🚚 宅配到府",meetup:"🤝 面交自取"};
  const createStaff=()=>{
    const f=staffModal.form;
    if(!f.name||!f.email||!f.pw){setStaffErr("請填寫姓名、Email 與密碼");return;}
    if(f.pw.length<6){setStaffErr("密碼至少需要 6 個字元");return;}
    if(staff.find(u=>u.email===f.email)){setStaffErr("此 Email 已被使用");return;}
    const perms=f.role==="admin"?["all"]:f.perms||[];
    setStaff(ss=>[...ss,{...f,id:Date.now(),perms,joined:new Date().toISOString().split("T")[0],status:"active"}]);
    setStaffModal(null);toast(`人員「${f.name}」已建立`,"s");
  };
  const editStaff=()=>{
    const f=staffModal.form;
    if(!f.name||!f.email){setStaffErr("請填寫姓名與 Email");return;}
    if(staff.find(u=>u.email===f.email&&u.id!==f.id)){setStaffErr("此 Email 已被其他人使用");return;}
    const perms=f.role==="admin"?["all"]:f.perms||[];
    setStaff(ss=>ss.map(u=>u.id===f.id?{...u,...f,perms}:u));
    setStaffModal(null);toast("人員資料已更新","s");
  };
  const delStaff=u=>{
    if(!window.confirm(`確定刪除人員「${u.name}」？`))return;
    setStaff(ss=>ss.filter(x=>x.id!==u.id));toast("已刪除","s");
  };
  const adminResetPw=()=>{
    const f=staffModal.form;
    if(!f.newPw||f.newPw.length<6){setStaffErr("密碼至少需要 6 個字元");return;}
    if(f.newPw!==f.confirm){setStaffErr("兩次密碼不一致");return;}
    setStaff(ss=>ss.map(u=>u.id===f.uid?{...u,pw:f.newPw}:u));
    setStaffModal(null);toast("密碼已重設","s");
  };
  return <div className="fu"><div className="page-hd"><div className="page-title">系統設定</div></div>
    <div className="card" style={{marginBottom:16}}><div className="card-hd">
      <div className="card-title">🏷️ 商品分類管理</div>
    </div>
      <div className="card-body">
        <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
          {(cats||[]).map(c=><div key={c.id} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 12px",background:"var(--elevated)",border:"1px solid var(--border2)",borderRadius:20,fontSize:13}}>
            <span>{c.emoji}</span><span style={{color:"var(--text)",fontWeight:500}}>{c.name}</span>
            <button onClick={()=>delCat(c)} style={{background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:13,lineHeight:1,padding:"0 0 0 2px"}} title="刪除">✕</button>
          </div>)}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",background:"var(--elevated)",border:"1px solid var(--border)",borderRadius:8,padding:"8px 10px",flex:1}}>
            <div style={{fontSize:11,color:"var(--muted)",width:"100%",marginBottom:4}}>選擇圖示：</div>
            {EMOJIS.map(e=><span key={e} onClick={()=>setCatForm(f=>({...f,emoji:e}))}
              style={{cursor:"pointer",fontSize:18,padding:"3px 5px",borderRadius:5,background:catForm.emoji===e?"var(--accent-bg)":"transparent",border:catForm.emoji===e?"1px solid var(--accent-br)":"1px solid transparent"}}>{e}</span>)}
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{fontSize:22}}>{catForm.emoji}</span>
            <input value={catForm.name} onChange={e=>setCatForm(f=>({...f,name:e.target.value}))} placeholder="分類名稱" style={{width:120}} onKeyDown={e=>e.key==="Enter"&&addCat()}/>
            <button className="btn btn-p btn-sm" onClick={addCat}>新增</button>
          </div>
        </div>
      </div>
    </div>
    <div className="card" style={{marginBottom:16}}><div className="card-hd"><div className="card-title">🚚 物流方式管理</div></div>
      <div className="card-body">
        <div className="alert alert-w" style={{fontSize:12,marginBottom:14}}>勾選的物流方式會出現在「建立訂單」的配送選項中。請依照實際合作的物流商開啟。</div>
        {["cvs","home","meetup"].map(type=>(
          <div key={type} style={{marginBottom:16}}>
            <div style={{fontSize:11,color:"var(--muted2)",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>{LTYPE[type]}</div>
            {logistics.filter(l=>l.type===type).map(l=><div key={l.id} className="perm-row">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:18}}>{l.icon}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{l.label}</div>
                  <div style={{fontSize:11,color:"var(--muted)"}}>{l.note}</div>
                </div>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={l.enabled} onChange={()=>{togLogistics(l.id);toast(`${l.label} ${!l.enabled?"已啟用":"已停用"}`,"s");}}/>
                <span className="toggle-slider"></span>
              </label>
            </div>)}
          </div>
        ))}
      </div>
    </div>
    <div className="card" style={{marginBottom:16}}><div className="card-hd">
      <div className="card-title">🎁 禮品累積門檻</div>
      <button className="btn btn-p btn-sm" onClick={()=>setShowGift(true)}>＋ 新增</button>
    </div>
      <div style={{overflowX:"auto"}}><table><thead><tr><th>累積消費門檻</th><th>贈送禮品</th><th>狀態</th><th>操作</th></tr></thead>
        <tbody>{gifts.sort((a,b)=>a.minAmount-b.minAmount).map(g=><tr key={g.id}>
          <td style={{fontFamily:"Syne,sans-serif",fontWeight:800,color:"var(--accent)",fontSize:16}}>{FMT(g.minAmount)}</td>
          <td style={{color:"var(--text)"}}>{g.gift}</td>
          <td><span className={`badge ${g.active?"bg":"bs"}`}>{g.active?"啟用":"停用"}</span></td>
          <td><div style={{display:"flex",gap:6}}>
            <button className="btn btn-gh btn-xs" onClick={()=>setGifts(gs=>gs.map(x=>x.id===g.id?{...x,active:!x.active}:x))}>{g.active?"停用":"啟用"}</button>
            <button className="btn btn-d btn-xs" onClick={()=>setGifts(gs=>gs.filter(x=>x.id!==g.id))}>刪除</button>
          </div></td>
        </tr>)}</tbody>
      </table></div>
    </div>
    <div className="card"><div className="card-hd">
      <div className="card-title">👥 後台人員管理</div>
      <button className="btn btn-p btn-sm" onClick={()=>{setStaffModal({mode:"create",form:{name:"",email:"",pw:"",role:"warehouse",status:"active",perms:[]}});setStaffErr("");}}>＋ 新增人員</button>
    </div>
      <div style={{overflowX:"auto"}}><table><thead><tr><th>人員</th><th>職位</th><th>Email</th><th>加入日期</th><th>狀態</th><th>操作</th></tr></thead>
        <tbody>{staff.map(u=>{
          const ri=STAFF_ROLES.find(r=>r.id===u.role)||STAFF_ROLES[1];
          return <tr key={u.id}>
            <td><div style={{display:"flex",alignItems:"center",gap:8}}>
              <div className="s-av" style={{width:30,height:30,background:ri.bg,color:ri.color,fontSize:11}}>{u.name[0]}</div>
              <div style={{fontWeight:600,color:"var(--text)"}}>{u.name}</div>
            </div></td>
            <td><span className="badge" style={{background:ri.bg,color:ri.color,border:`1px solid ${ri.color}40`}}>{ri.icon} {ri.label}</span></td>
            <td className="mono" style={{fontSize:12,color:"var(--muted)"}}>{u.email}</td>
            <td className="mono" style={{fontSize:12,color:"var(--muted2)"}}>{u.joined||"—"}</td>
            <td><span className={`badge ${u.status==="active"?"bg":"bs"}`}>{u.status==="active"?"正常":"停用"}</span></td>
            <td><div style={{display:"flex",gap:4}}>
              <button className="btn btn-gh btn-xs" onClick={()=>{setStaffModal({mode:"edit",form:{...u},orig:u});setStaffErr("");}}>編輯</button>
              <button className="btn btn-gh btn-xs" onClick={()=>{setStaffModal({mode:"pw",form:{uid:u.id,name:u.name,newPw:"",confirm:""}});setStaffErr("");}}>🔑</button>
              {u.role!=="admin"&&<button className="btn btn-d btn-xs" onClick={()=>delStaff(u)}>刪除</button>}
            </div></td>
          </tr>;
        })}</tbody>
      </table></div>
      {/* Staff permissions panel */}
      <div style={{padding:"16px 18px",borderTop:"1px solid var(--border)"}}>
        <div style={{fontSize:12,color:"var(--muted)",fontWeight:600,marginBottom:12}}>✏️ 點「編輯」可調整各人員的功能權限</div>
      </div>
    </div>
    {/* Staff create/edit modal */}
    {staffModal&&staffModal.mode!=="pw"&&<Modal title={staffModal.mode==="create"?"新增後台人員":`編輯：${staffModal.orig?.name||""}`} onClose={()=>setStaffModal(null)}>
      {staffErr&&<div className="alert alert-e">{staffErr}</div>}
      <div className="irow">
        <div className="ig"><label className="il">姓名 *</label><input value={staffModal.form.name} onChange={e=>setStaffModal(m=>({...m,form:{...m.form,name:e.target.value}}))}/></div>
        <div className="ig"><label className="il">職位</label>
          <select value={staffModal.form.role} onChange={e=>{const r=e.target.value;setStaffModal(m=>({...m,form:{...m.form,role:r,perms:r==="admin"?["all"]:m.form.perms.filter(p=>p!=="all")}}));}}>
            {STAFF_ROLES.map(r=><option key={r.id} value={r.id}>{r.icon} {r.label}</option>)}
          </select>
        </div>
      </div>
      <div className="ig"><label className="il">Email（登入帳號）*</label><input type="email" value={staffModal.form.email} onChange={e=>setStaffModal(m=>({...m,form:{...m.form,email:e.target.value}}))}/></div>
      {staffModal.mode==="create"&&<div className="ig"><label className="il">初始密碼 *</label><input type="password" value={staffModal.form.pw} onChange={e=>setStaffModal(m=>({...m,form:{...m.form,pw:e.target.value}}))}/></div>}
      <div className="ig"><label className="il">狀態</label>
        <select value={staffModal.form.status} onChange={e=>setStaffModal(m=>({...m,form:{...m.form,status:e.target.value}}))}>
          <option value="active">正常</option><option value="inactive">停用</option>
        </select>
      </div>
      {staffModal.form.role!=="admin"&&<><div style={{fontSize:12,color:"var(--muted)",fontWeight:600,marginBottom:8,marginTop:4}}>功能權限</div>
      <div style={{background:"var(--elevated)",borderRadius:8,border:"1px solid var(--border)",padding:"4px 0"}}>
        {ALL_PERMS.map(p=>{
          const has=(staffModal.form.perms||[]).includes(p.k);
          return <div key={p.k} className="perm-row" style={{padding:"10px 14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:15}}>{p.icon}</span>
              <div><div style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{p.l}</div>
                <div style={{fontSize:11,color:"var(--muted)"}}>{p.d}</div>
              </div>
            </div>
            <label className="toggle">
              <input type="checkbox" checked={has} onChange={()=>setStaffModal(m=>({...m,form:{...m.form,perms:has?m.form.perms.filter(x=>x!==p.k):[...(m.form.perms||[]),p.k]}}))}/>
              <span className="toggle-slider"></span>
            </label>
          </div>;
        })}
      </div></>}
      {staffModal.form.role==="admin"&&<div className="alert alert-s" style={{fontSize:12}}>👑 管理員自動擁有全部權限</div>}
      <div className="modal-foot">
        <button className="btn btn-gh" onClick={()=>setStaffModal(null)}>取消</button>
        <button className="btn btn-p" onClick={()=>staffModal.mode==="create"?createStaff():editStaff()}>{staffModal.mode==="create"?"建立人員":"儲存"}</button>
      </div>
    </Modal>}
    {/* Change password modal (admin reset) */}
    {staffModal&&staffModal.mode==="pw"&&<Modal title={`重設密碼：${staffModal.form.name}`} onClose={()=>setStaffModal(null)}>
      {staffErr&&<div className="alert alert-e">{staffErr}</div>}
      <div className="ig"><label className="il">新密碼 *</label><input type="password" value={staffModal.form.newPw} onChange={e=>setStaffModal(m=>({...m,form:{...m.form,newPw:e.target.value}}))} placeholder="至少6個字元"/></div>
      <div className="ig"><label className="il">確認新密碼 *</label><input type="password" value={staffModal.form.confirm} onChange={e=>setStaffModal(m=>({...m,form:{...m.form,confirm:e.target.value}}))} onKeyDown={e=>e.key==="Enter"&&adminResetPw()}/></div>
      <div className="modal-foot">
        <button className="btn btn-gh" onClick={()=>setStaffModal(null)}>取消</button>
        <button className="btn btn-p" onClick={adminResetPw}>確認重設</button>
      </div>
    </Modal>}
    {showGift&&<Modal title="新增禮品門檻" onClose={()=>setShowGift(false)}>
      <div className="ig"><label className="il">累積消費門檻（NT$）*</label><input type="number" value={gform.minAmount} onChange={e=>setGform(f=>({...f,minAmount:e.target.value}))} placeholder="例：5000"/></div>
      <div className="ig"><label className="il">贈送禮品說明 *</label><input value={gform.gift} onChange={e=>setGform(f=>({...f,gift:e.target.value}))} placeholder="例：精美面膜禮盒"/></div>
      <div className="modal-foot"><button className="btn btn-gh" onClick={()=>setShowGift(false)}>取消</button>
        <button className="btn btn-p" onClick={saveGift}>新增</button></div>
    </Modal>}
  </div>;
}
function Sidebar({user,view,go,logout,theme,setTheme}){
  const perms=user.perms||[];
  const has=p=>perms.includes("all")||perms.includes(p);
  const isAdmin=user.role==="admin";
  const roleInfo=STAFF_ROLES.find(r=>r.id===user.role)||{label:"人員",icon:"👤",color:"#f59e0b",bg:"rgba(245,158,11,.2)"};
  const N=(ic,label,vk)=>(
    <div key={vk} className={`nav-item${view===vk?" act":""}`} onClick={()=>go(vk)}>
      <span className="ic">{ic}</span><span>{label}</span>
    </div>
  );
  return <div className="sidebar">
    <div className="s-logo"><h1>倉儲 ERP</h1><small>Internal System</small></div>
    <div className="s-section"><div className="s-label">主要功能</div>
      {isAdmin&&N("📊","儀表板","dashboard")}
      {has("members")&&N("👥","會員管理","members")}
      {(has("create_order")||isAdmin)&&N("🛒","建立訂單","create-order")}
      {has("orders")&&N("🗒","訂單管理","orders")}
      {has("dispatch")&&N("🚚","發貨管理","dispatch")}
      {has("products")&&N("📦","商品管理","products")}
      {(has("stats")||isAdmin)&&N("📈","統計報表","stats")}
      {isAdmin&&N("⚙️","系統設定","settings")}
    </div>
    <div className="s-foot">
      <div className="s-user">
        <div className="s-av" style={{background:roleInfo.bg,color:roleInfo.color}}>{user.name[0]}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,.85)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name}</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.3)"}}>{roleInfo.icon} {roleInfo.label}</div>
        </div>
      </div>
      <div className="theme-picker">
        <span className="theme-picker-label">色系</span>
        <ThemePicker theme={theme} setTheme={setTheme}/>
      </div>
      {N("🔑","修改密碼","change-pw")}
      <div className="nav-item" onClick={logout}><span className="ic">🚪</span><span>登出</span></div>
    </div>
  </div>;
}

function ChangePwView({user,setStaff,toast,goBack}){
  const [form,setForm]=useState({old:"",newPw:"",confirm:""});
  const [err,setErr]=useState("");
  const submit=()=>{
    if(!form.old||!form.newPw||!form.confirm){setErr("請填寫所有欄位");return;}
    if(form.old!==user.pw){setErr("目前密碼不正確");return;}
    if(form.newPw.length<6){setErr("新密碼至少需要 6 個字元");return;}
    if(form.newPw!==form.confirm){setErr("兩次新密碼不一致");return;}
    setStaff(ss=>ss.map(u=>u.id===user.id?{...u,pw:form.newPw}:u));
    toast("密碼已成功更新","s");goBack();
  };
  const ri=STAFF_ROLES.find(r=>r.id===user.role)||{label:"人員",icon:"👤",color:"#f59e0b",bg:"rgba(245,158,11,.2)"};
  return <div className="fu"><div className="page-hd"><div className="page-title">修改密碼</div>
    <button className="btn btn-gh btn-sm" onClick={goBack}>← 返回</button></div>
    <div style={{maxWidth:420}}>
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,marginBottom:20}}>
        <div className="s-av" style={{width:40,height:40,background:ri.bg,color:ri.color,fontSize:16}}>{user.name[0]}</div>
        <div>
          <div style={{fontWeight:700,color:"var(--text)",fontSize:15}}>{user.name}</div>
          <div style={{fontSize:12,color:"var(--muted)"}}>{ri.icon} {ri.label} · {user.email}</div>
        </div>
      </div>
      <div className="card"><div className="card-body">
        {err&&<div className="alert alert-e">{err}</div>}
        <div className="ig"><label className="il">目前密碼 *</label><input type="password" placeholder="輸入目前使用的密碼" value={form.old} onChange={e=>setForm(f=>({...f,old:e.target.value}))}/></div>
        <div className="divider"/>
        <div className="ig"><label className="il">新密碼 *（至少6個字元）</label><input type="password" placeholder="輸入新密碼" value={form.newPw} onChange={e=>setForm(f=>({...f,newPw:e.target.value}))}/></div>
        <div className="ig"><label className="il">確認新密碼 *</label><input type="password" placeholder="再次輸入新密碼" value={form.confirm} onChange={e=>setForm(f=>({...f,confirm:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
        {form.newPw&&<div style={{marginBottom:13}}>
          {[{t:"至少6個字元",ok:form.newPw.length>=6},{t:"兩次密碼相符",ok:form.newPw===form.confirm&&form.confirm.length>0}].map(c=>(
            <div key={c.t} style={{fontSize:12,color:c.ok?"#059669":"var(--muted2)",display:"flex",alignItems:"center",gap:5,marginBottom:3}}>
              <span>{c.ok?"✓":"○"}</span><span>{c.t}</span>
            </div>
          ))}
        </div>}
        <button className="btn btn-p" style={{width:"100%",justifyContent:"center"}} onClick={submit}>🔑 確認更新密碼</button>
      </div></div>
    </div>
  </div>;
}

function StatsView({orders,products}){
  const getPCost=pid=>(products.find(p=>p.id===pid)?.cost)||0;
  const months={};
  orders.filter(o=>o.status!=="已取消").forEach(o=>{
    const m=o.created.substring(0,7);
    if(!months[m])months[m]={m,total:0,wsTotal:0,memTotal:0,cost:0,wsCost:0,memCost:0,cnt:0,wsCnt:0,memCnt:0};
    const x=months[m];
    const isWS=o.memberRole==="wholesale";
    const oCost=o.items.reduce((a,i)=>a+getPCost(i.pid)*i.qty,0);
    x.total+=o.total;x.cost+=oCost;x.cnt++;
    if(isWS){x.wsTotal+=o.total;x.wsCost+=oCost;x.wsCnt++;}
    else{x.memTotal+=o.total;x.memCost+=oCost;x.memCnt++;}
  });
  const rows=Object.values(months).sort((a,b)=>b.m.localeCompare(a.m));
  const allRev=rows.reduce((a,r)=>a+r.total,0);
  const allCost=rows.reduce((a,r)=>a+r.cost,0);
  const allProfit=allRev-allCost;
  const Bar=({val,max,color})=><div style={{background:"var(--elevated)",borderRadius:4,height:6,overflow:"hidden",marginTop:3}}>
    <div style={{width:`${Math.min(100,max?Math.round(val/max*100):0)}%`,height:"100%",background:color,borderRadius:4,transition:"width .4s"}}/>
  </div>;
  const maxRev=Math.max(...rows.map(r=>r.total),1);
  return <div className="fu">
    <div className="page-hd"><div className="page-title">統計報表</div></div>
    <div className="stat-grid" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
      {[{l:"總營收",v:FMT(allRev),c:"var(--accent)"},
        {l:"總成本",v:FMT(allCost),c:"#8b5cf6"},
        {l:"毛利",v:FMT(allProfit),c:"#059669"},
        {l:"平均毛利率",v:allRev>0?`${Math.round(allProfit/allRev*100)}%`:"—",c:allRev>0&&allProfit/allRev>=0.2?"#059669":"#d97706"}
      ].map((s,i)=><div key={i} className="stat-card">
        <div className="stat-val" style={{color:s.c,fontSize:20}}>{s.v}</div>
        <div className="stat-lbl">{s.l}</div>
      </div>)}
    </div>
    <div className="card" style={{marginBottom:16}}>
      <div className="card-hd"><div className="card-title">📊 月份損益明細（排除已取消訂單）</div></div>
      <div style={{overflowX:"auto"}}><table>
        <thead><tr>
          <th>月份</th><th>訂單數</th><th>總收入</th><th>總成本</th><th>毛利</th><th>毛利率</th>
          <th style={{color:"#60a5fa"}}>一般會員收入</th><th style={{color:"#a78bfa"}}>批發會員收入</th>
          <th style={{color:"#60a5fa"}}>一般毛利</th><th style={{color:"#a78bfa"}}>批發毛利</th>
        </tr></thead>
        <tbody>{rows.length===0?<tr><td colSpan={10} style={{textAlign:"center",padding:32,color:"var(--muted2)"}}>尚無訂單資料</td></tr>
        :rows.map(r=>{
          const profit=r.total-r.cost;
          const margin=r.total>0?Math.round(profit/r.total*100):0;
          const memP=r.memTotal-r.memCost;
          const wsP=r.wsTotal-r.wsCost;
          return <tr key={r.m}>
            <td style={{fontFamily:"JetBrains Mono,monospace",fontWeight:700,color:"var(--text)"}}>{r.m}</td>
            <td><span style={{fontWeight:700,color:"var(--text)"}}>{r.cnt}</span><span style={{fontSize:11,color:"var(--muted)",marginLeft:4}}>({r.memCnt}+{r.wsCnt})</span></td>
            <td style={{color:"var(--accent)",fontWeight:700}}>{FMT(r.total)}
              <Bar val={r.total} max={maxRev} color="var(--accent)"/>
            </td>
            <td style={{color:"#8b5cf6"}}>{r.cost>0?FMT(r.cost):<span style={{color:"var(--muted2)"}}>未設成本</span>}</td>
            <td style={{color:profit>=0?"#059669":"#ef4444",fontWeight:700}}>{r.cost>0?FMT(profit):<span style={{color:"var(--muted2)"}}>—</span>}</td>
            <td>
              {r.cost>0?<span style={{fontWeight:700,color:margin>=25?"#059669":margin>=10?"#d97706":"#ef4444"}}>{margin}%</span>:<span style={{color:"var(--muted2)"}}>—</span>}
            </td>
            <td style={{color:"#60a5fa"}}><div>{r.memCnt>0?FMT(r.memTotal):"—"}</div><div style={{fontSize:11,color:"var(--muted)"}}>{r.memCnt} 筆</div></td>
            <td style={{color:"#a78bfa"}}><div>{r.wsCnt>0?FMT(r.wsTotal):"—"}</div><div style={{fontSize:11,color:"var(--muted)"}}>{r.wsCnt} 筆</div></td>
            <td style={{color:memP>=0?"#059669":"#ef4444"}}>{r.memCost>0&&r.memCnt>0?FMT(memP):"—"}</td>
            <td style={{color:wsP>=0?"#8b5cf6":"#ef4444"}}>{r.wsCost>0&&r.wsCnt>0?FMT(wsP):"—"}</td>
          </tr>;
        })}</tbody>
      </table></div>
    </div>
    <div className="alert alert-w" style={{fontSize:12}}>💡 成本利潤計算需在「商品管理」中填寫各商品的成本價，未填成本價的商品欄位顯示「—」。毛利 = 收入 − 成本，不含運費與其他費用。</div>
  </div>;
}

const VT={dashboard:"儀表板",members:"會員管理","create-order":"建立訂單",orders:"訂單管理",dispatch:"發貨管理",products:"商品管理",settings:"系統設定",stats:"統計報表","change-pw":"修改密碼"};

export default function App(){
  const [staff,setStaff]=useState(INIT_STAFF);
  const [members,setMembers]=useState(INIT_MEMBERS);
  const [products,setProducts]=useState(INIT_PRODS);
  const [orders,setOrders]=useState(INIT_ORDERS);
  const [gifts,setGifts]=useState(INIT_GIFTS);
  const [logistics,setLogistics]=useState(INIT_LOGISTICS);
  const [cats,setCats]=useState(INIT_CATS);
  const [user,setUser]=useState(null);
  const [view,setView]=useState("login");
  const [toasts,setToasts]=useState([]);
  const [orderInitMember,setOrderInitMember]=useState(null);
  const [theme,setTheme]=useState(()=>{try{return localStorage.getItem("erp-theme")||"light";}catch{return"light";}});

  const changeTheme=t=>{setTheme(t);try{localStorage.setItem("erp-theme",t);}catch{}};
  const themeVars=Object.entries(THEMES[theme].vars).map(([k,v])=>`${k}:${v}`).join(";");

  const toast=(msg,type="i")=>{
    const id=Date.now()+Math.random();
    setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3200);
  };
  const login=u=>{setUser(u);setView(u.role==="admin"?"dashboard":"members");toast(`歡迎，${u.name}！`,"s");};
  const logout=()=>{setUser(null);setView("login");};
  const placeOrder=o=>{setOrders(os=>[...os,o]);setView("orders");};
  const goCreateOrder=member=>{setOrderInitMember(member);setView("create-order");};
  const isAdmin=user?.role==="admin";

  // Keep logged-in user in sync when staff data changes (e.g. after password/role update)
  const prevUser=user;
  const syncedUser=user?staff.find(s=>s.id===user.id)||user:null;

  return <>
    <style>{`:root{${themeVars}}`}</style>
    <style>{STYLES}</style>
    {!syncedUser?<LoginView staff={staff} onLogin={login} theme={theme} setTheme={changeTheme}/>
    :<div className="app">
      <Sidebar user={syncedUser} view={view} go={v=>{if(v!=="create-order")setOrderInitMember(null);setView(v);}} logout={logout} theme={theme} setTheme={changeTheme}/>
      <div className="main">
        <div className="topbar">
          <div className="topbar-title">{VT[view]||view}</div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <span className="badge bp">{orders.filter(o=>["待處理","待出貨"].includes(o.status)).length} 筆待出貨</span>
            {(()=>{const ri=STAFF_ROLES.find(r=>r.id===syncedUser.role)||{label:"人員",icon:"👤",color:"#f59e0b"};
              return <span className="badge" style={{background:`${ri.color}18`,color:ri.color,border:`1px solid ${ri.color}35`}}>{ri.icon} {ri.label}</span>;})()}
          </div>
        </div>
        <div className="content">
          {view==="dashboard"&&<DashboardView members={members} products={products} orders={orders} gifts={gifts} cats={cats}/>}
          {view==="members"&&<MembersView members={members} setMembers={setMembers} orders={orders} gifts={gifts} isAdmin={isAdmin} onCreateOrder={goCreateOrder} toast={toast}/>}
          {view==="create-order"&&<CreateOrderView members={members} setMembers={setMembers} products={products} setProducts={setProducts} onOrderPlaced={placeOrder} toast={toast} initMember={orderInitMember} logistics={logistics} cats={cats}/>}
          {view==="orders"&&<OrdersView orders={orders} setOrders={setOrders} toast={toast}/>}
          {view==="dispatch"&&<DispatchView orders={orders} setOrders={setOrders} toast={toast}/>}
          {view==="products"&&<ProductsView products={products} setProducts={setProducts} toast={toast} cats={cats}/>}
          {view==="settings"&&<SettingsView staff={staff} setStaff={setStaff} gifts={gifts} setGifts={setGifts} logistics={logistics} setLogistics={setLogistics} cats={cats} setCats={setCats} isAdmin={isAdmin} toast={toast}/>}
          {view==="stats"&&<StatsView orders={orders} products={products}/>}
          {view==="change-pw"&&<ChangePwView user={syncedUser} setStaff={setStaff} toast={toast} goBack={()=>setView(isAdmin?"dashboard":"members")}/>}
        </div>
      </div>
    </div>}
    <Toasts list={toasts}/>
  </>;
}
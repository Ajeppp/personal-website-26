import type { ScreenKind } from "./projects";

/**
 * Interface sketches for the 3D devices, authored as SVG and rasterised into
 * WebGL textures at runtime. All figures and names are illustrative.
 */

export const PHONE = { w: 760, h: 1614 };
export const BROWSER = { w: 1600, h: 1000 };

const SANS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

type TextOpts = {
  size?: number;
  weight?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  mono?: boolean;
  spacing?: number;
  opacity?: number;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function text(x: number, y: number, s: string, o: TextOpts = {}) {
  return (
    `<text x="${x}" y="${y}" font-family="${o.mono ? MONO : SANS}" font-size="${o.size ?? 16}"` +
    ` font-weight="${o.weight ?? 400}" fill="${o.fill ?? "#fff"}"` +
    (o.anchor ? ` text-anchor="${o.anchor}"` : "") +
    (o.spacing ? ` letter-spacing="${o.spacing}"` : "") +
    (o.opacity != null ? ` opacity="${o.opacity}"` : "") +
    `>${esc(s)}</text>`
  );
}

const rect = (
  x: number,
  y: number,
  w: number,
  h: number,
  rx: number,
  fill: string,
  extra = "",
) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;

/** One line of syntax-coloured code: [text, colour] segments. */
function code(x: number, y: number, parts: [string, string][], size = 14.5) {
  return (
    `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" xml:space="preserve" style="white-space:pre">` +
    parts.map(([s, c]) => `<tspan fill="${c}">${esc(s)}</tspan>`).join("") +
    `</text>`
  );
}

const svg = (w: number, h: number, body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;

/** Shared desktop window chrome: traffic lights + address pill. */
function chrome(address: string, dark = true) {
  const bar = dark ? "#161617" : "#e9e2d6";
  const pill = dark ? "#0b0b0c" : "#f7f2ea";
  const ink = dark ? "#8b8b93" : "#8a7d6c";
  return (
    rect(0, 0, 1600, 54, 0, bar) +
    `<circle cx="30" cy="27" r="7" fill="#ff5f57"/><circle cx="54" cy="27" r="7" fill="#febc2e"/><circle cx="78" cy="27" r="7" fill="#28c840"/>` +
    rect(420, 11, 760, 32, 16, pill, `stroke="${dark ? "#2a2a2a" : "#d9cfbf"}"`) +
    text(800, 32, address, { size: 15, fill: ink, anchor: "middle" })
  );
}

/** Phone status bar: clock, island, battery. */
function statusBar(ink: string) {
  return (
    text(70, 80, "9:41", { size: 30, weight: 600, fill: ink }) +
    rect(270, 40, 220, 58, 29, "#000") +
    `<g fill="${ink}"><rect x="566" y="66" width="8" height="14" rx="2"/><rect x="580" y="60" width="8" height="20" rx="2"/><rect x="594" y="54" width="8" height="26" rx="2"/></g>` +
    rect(626, 54, 58, 28, 9, "none", `stroke="${ink}" stroke-opacity="0.5" stroke-width="2"`) +
    rect(631, 59, 40, 18, 5, ink)
  );
}

/* ───────────────────────── JESE ───────────────────────── */

// The real "jese." wordmark outline, lifted from the app's logo.
const JESE_MARK =
  "M12.16 67.07L11 67.07L11 62.87L12.48 62.87Q13.79 62.87 14.49 62.17Q15.2 61.46 15.2 60.16L15.2 60.16L15.2 44.36L12.41 44.36L12.41 40.69L19.92 40.69L19.92 59.87Q19.92 62.52 19.11 64.09Q18.3 65.66 16.61 66.36Q14.91 67.07 12.16 67.07L12.16 67.07M16.78 38.26L16.78 38.26Q15.37 38.26 14.68 37.5Q14 36.74 14 35.58Q14 34.41 14.68 33.67Q15.37 32.93 16.78 32.93L16.78 32.93Q18.23 32.93 18.92 33.67Q19.6 34.41 19.6 35.58Q19.6 36.74 18.92 37.5Q18.23 38.26 16.78 38.26 M32.93 60.51L32.93 60.51Q30.46 60.51 28.61 59.66Q26.76 58.82 25.55 57.39Q24.33 55.96 23.71 54.2Q23.09 52.43 23.09 50.6L23.09 50.6L23.09 49.93Q23.09 48.03 23.71 46.24Q24.33 44.46 25.55 43.07Q26.76 41.68 28.56 40.85Q30.36 40.02 32.72 40.02L32.72 40.02Q35.82 40.02 37.92 41.38Q40.02 42.74 41.08 44.94Q42.14 47.14 42.14 49.68L42.14 49.68L42.14 51.45L27.75 51.45Q27.86 52.54 28.24 53.46L28.24 53.46Q28.81 54.87 29.97 55.66Q31.13 56.45 32.93 56.45Q34.73 56.45 35.86 55.73Q36.99 55.01 37.31 53.95L37.31 53.95L41.82 53.95Q41.4 55.92 40.2 57.41Q39 58.89 37.15 59.7Q35.3 60.51 32.93 60.51M27.82 48.45L27.82 48.45L37.45 48.45Q37.34 47.53 37.02 46.79L37.02 46.79Q36.49 45.49 35.42 44.78Q34.34 44.08 32.72 44.08Q31.1 44.08 29.97 44.82Q28.84 45.56 28.28 46.93L28.28 46.93Q27.96 47.64 27.82 48.45 M52.12 60.44L52.12 60.44Q48.17 60.44 45.93 58.76Q43.69 57.09 43.58 54.13L43.58 54.13L47.99 54.13Q48.1 55.11 49.08 55.92Q50.07 56.74 52.19 56.74L52.19 56.74Q53.95 56.74 54.99 56.1Q56.03 55.47 56.03 54.37L56.03 54.37Q56.03 53.42 55.24 52.86Q54.44 52.29 52.54 52.12L52.54 52.12L50.85 51.94Q47.64 51.59 45.91 50.11Q44.18 48.62 44.18 46.16L44.18 46.16Q44.18 44.18 45.17 42.84Q46.16 41.5 47.9 40.81Q49.65 40.13 51.9 40.13L51.9 40.13Q55.43 40.13 57.62 41.68Q59.8 43.23 59.91 46.23L59.91 46.23L55.5 46.23Q55.43 45.24 54.51 44.53Q53.6 43.83 51.87 43.83L51.87 43.83Q50.32 43.83 49.47 44.43Q48.62 45.03 48.62 45.98L48.62 45.98Q48.62 46.9 49.31 47.39Q50 47.88 51.55 48.06L51.55 48.06L53.24 48.24Q56.63 48.59 58.55 50.11Q60.47 51.62 60.47 54.2L60.47 54.2Q60.47 56.1 59.43 57.49Q58.39 58.89 56.52 59.66Q54.65 60.44 52.12 60.44 M72.04 60.51L72.04 60.51Q69.57 60.51 67.72 59.66Q65.87 58.82 64.65 57.39Q63.43 55.96 62.82 54.2Q62.2 52.43 62.2 50.6L62.2 50.6L62.2 49.93Q62.2 48.03 62.82 46.24Q63.43 44.46 64.65 43.07Q65.87 41.68 67.67 40.85Q69.46 40.02 71.83 40.02L71.83 40.02Q74.93 40.02 77.03 41.38Q79.13 42.74 80.18 44.94Q81.24 47.14 81.24 49.68L81.24 49.68L81.24 51.45L66.86 51.45Q66.96 52.54 67.35 53.46L67.35 53.46Q67.91 54.87 69.08 55.66Q70.24 56.45 72.04 56.45Q73.84 56.45 74.97 55.73Q76.09 55.01 76.41 53.95L76.41 53.95L80.92 53.95Q80.5 55.92 79.3 57.41Q78.1 58.89 76.25 59.7Q74.4 60.51 72.04 60.51M66.93 48.45L66.93 48.45L76.55 48.45Q76.45 47.53 76.13 46.79L76.13 46.79Q75.6 45.49 74.52 44.78Q73.45 44.08 71.83 44.08Q70.21 44.08 69.08 44.82Q67.95 45.56 67.38 46.93L67.38 46.93Q67.07 47.64 66.93 48.45";

function jese() {
  const ink = "#f0ebe1";
  const mute = "#98a4ae";
  const steel = "#76a0bc";
  const pos = "#36d399";
  const neg = "#ee6373";
  const amber = "#e0a24a";
  const card = "#14181b";
  const edge = `stroke="#272e33" stroke-width="2"`;

  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const income = [150, 158, 150, 172, 164, 186];
  const spend = [96, 118, 84, 102, 126, 92];
  const bars = months
    .map((m, i) => {
      const x = 96 + i * 102;
      return (
        rect(x, 1048 - income[i], 30, income[i], 10, steel) +
        rect(x + 36, 1048 - spend[i], 30, spend[i], 10, "#2f4553") +
        text(x + 33, 1086, m, { size: 20, fill: "#6b7780", anchor: "middle" })
      );
    })
    .join("");

  const row = (y: number, name: string, meta: string, amount: string, tone: string, glyph: string) =>
    rect(48, y, 68, 68, 22, "#1b2126", edge) +
    `<g transform="translate(${48 + 34},${y + 34})" stroke="${tone}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">${glyph}</g>` +
    text(138, y + 30, name, { size: 27, weight: 600, fill: ink }) +
    text(138, y + 60, meta, { size: 21, fill: mute }) +
    text(712, y + 44, amount, { size: 27, weight: 600, fill: tone, anchor: "end" });

  return svg(
    PHONE.w,
    PHONE.h,
    `<defs>
      <linearGradient id="hero" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#20333f"/><stop offset="1" stop-color="#101920"/></linearGradient>
      <linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${steel}" stop-opacity="0.5"/><stop offset="1" stop-color="${steel}" stop-opacity="0"/></linearGradient>
      <linearGradient id="me" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fb6cf"/><stop offset="1" stop-color="#4d7892"/></linearGradient>
    </defs>` +
      rect(0, 0, PHONE.w, PHONE.h, 0, "#0b0c0d") +
      statusBar(ink) +
      // header
      `<g transform="translate(26,84) scale(2)"><path d="${JESE_MARK}" fill="${ink}"/><path d="M89 59.84L83.5 59.84L83.5 54.2L89 54.2L89 59.84" fill="${amber}"/></g>` +
      `<circle cx="604" cy="184" r="34" fill="${card}" ${edge}/>` +
      `<g transform="translate(604,184)" stroke="${mute}" stroke-width="3.5" fill="none"><path d="M-17 0Q0 -15 17 0Q0 15 -17 0Z"/><circle r="5"/></g>` +
      `<circle cx="686" cy="184" r="34" fill="url(#me)"/>` +
      text(686, 194, "JS", { size: 26, weight: 700, fill: "#0b0c0d", anchor: "middle" }) +
      // net worth
      rect(36, 250, 688, 318, 44, "url(#hero)", `stroke="#2e4250" stroke-width="2"`) +
      text(76, 316, "TOTAL NET WORTH", { size: 21, weight: 600, fill: mute, spacing: 3 }) +
      text(76, 404, "Rp 184.250.000", { size: 68, weight: 700, fill: ink, spacing: -1.5 }) +
      rect(76, 440, 262, 52, 26, "rgba(54,211,153,0.14)") +
      `<path d="M100 474l10 -16l10 16z" fill="${pos}"/>` +
      text(132, 475, "4,2% this month", { size: 24, weight: 600, fill: pos }) +
      `<path d="M392 528C430 520 446 492 480 498S528 532 566 506S618 452 688 446V532H392Z" fill="url(#area)"/>` +
      `<path d="M392 528C430 520 446 492 480 498S528 532 566 506S618 452 688 446" stroke="${steel}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      `<circle cx="688" cy="446" r="8" fill="${ink}"/>` +
      // income / expenses
      rect(36, 596, 334, 150, 36, card, edge) +
      rect(390, 596, 334, 150, 36, card, edge) +
      `<circle cx="84" cy="644" r="20" fill="rgba(54,211,153,0.16)"/><path d="M84 654v-20m-9 9l9 -9l9 9" stroke="${pos}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      text(118, 652, "Income", { size: 24, fill: mute }) +
      text(64, 712, "Rp 18.500.000", { size: 34, weight: 700, fill: ink, spacing: -0.5 }) +
      `<circle cx="438" cy="644" r="20" fill="rgba(238,99,115,0.16)"/><path d="M438 634v20m-9 -9l9 9l9 -9" stroke="${neg}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      text(472, 652, "Expenses", { size: 24, fill: mute }) +
      text(418, 712, "Rp 9.240.000", { size: 34, weight: 700, fill: ink, spacing: -0.5 }) +
      // trend
      rect(36, 774, 688, 336, 40, card, edge) +
      text(72, 832, "Monthly trend", { size: 28, weight: 600, fill: ink }) +
      `<circle cx="540" cy="823" r="7" fill="${steel}"/>` +
      text(556, 831, "In", { size: 21, fill: mute }) +
      `<circle cx="604" cy="823" r="7" fill="#2f4553"/>` +
      text(620, 831, "Out", { size: 21, fill: mute }) +
      `<path d="M72 1048H688" stroke="#272e33" stroke-width="2"/>` +
      bars +
      // budget alert
      rect(36, 1138, 688, 108, 32, "rgba(224,162,74,0.09)", `stroke="rgba(224,162,74,0.4)" stroke-width="2"`) +
      `<circle cx="92" cy="1192" r="28" fill="rgba(224,162,74,0.18)"/><path d="M92 1178v16m0 9v1" stroke="${amber}" stroke-width="5" stroke-linecap="round"/>` +
      text(138, 1184, "Dining budget", { size: 26, weight: 600, fill: ink }) +
      text(688, 1184, "86%", { size: 26, weight: 700, fill: amber, anchor: "end" }) +
      rect(138, 1204, 550, 12, 6, "rgba(224,162,74,0.2)") +
      rect(138, 1204, 473, 12, 6, amber) +
      // recent
      text(48, 1312, "Recent", { size: 30, weight: 700, fill: ink }) +
      text(712, 1312, "See all", { size: 23, weight: 600, fill: steel, anchor: "end" }) +
      row(1340, "Groceries", "Food · BCA Debit", "− Rp 245.000", neg, `<path d="M-13 -10h4l5 16h13l4 -11h-19"/><circle cx="-2" cy="12" r="1.5"/><circle cx="9" cy="12" r="1.5"/>`) +
      row(1432, "Salary", "Income · BCA", "+ Rp 18.500.000", pos, `<path d="M0 12v-24m-10 10l10 -10l10 10"/>`) +
      // liquid-glass tab bar
      `<rect x="0" y="1420" width="${PHONE.w}" height="194" fill="url(#fade)"/>` +
      `<defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0c0d" stop-opacity="0"/><stop offset="0.55" stop-color="#0b0c0d" stop-opacity="0.92"/></linearGradient></defs>` +
      rect(56, 1470, 648, 104, 52, "rgba(34,41,47,0.94)", `stroke="rgba(255,255,255,0.14)" stroke-width="2"`) +
      `<g stroke="${mute}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M122 1536v-22m16 22v-34m16 34v-14"/>
        <rect x="232" y="1506" width="40" height="30" rx="7"/><path d="M232 1518h40"/>
        <circle cx="508" cy="1522" r="18"/><path d="M508 1522v-18a18 18 0 0 1 18 18z"/>
        <circle cx="622" cy="1514" r="9"/><path d="M604 1540c3 -12 33 -12 36 0"/>
      </g>` +
      `<circle cx="380" cy="1514" r="50" fill="${steel}" stroke="#0b0c0d" stroke-width="6"/>` +
      `<path d="M362 1516l18 -16l18 16v14h-36z" fill="none" stroke="#0b0c0d" stroke-width="4.5" stroke-linejoin="round"/>` +
      rect(280, 1592, 200, 8, 4, ink, `opacity="0.45"`),
  );
}

/* ───────────────────────── LEXIFY ───────────────────────── */

const METHOD: Record<string, string> = {
  GET: "#34d399",
  POST: "#38bdf8",
  PUT: "#fbbf24",
  PATCH: "#a78bfa",
  DEL: "#f87171",
};

function lexify() {
  const fg = "#fafafa";
  const mute = "#a1a1aa";
  const sub = "#71717a";
  const line = "#262626";
  const brand = "#047857";
  const mint = "#6ee7b7";

  const groups: [string, [string, string][]][] = [
    ["PAYMENTS", [["POST", "Create a payment"], ["GET", "Retrieve a payment"], ["GET", "List payments"], ["POST", "Capture a payment"], ["DEL", "Cancel a payment"]]],
    ["CUSTOMERS", [["POST", "Create a customer"], ["GET", "Retrieve a customer"], ["PATCH", "Update a customer"], ["DEL", "Delete a customer"]]],
    ["WEBHOOKS", [["GET", "List endpoints"], ["POST", "Register an endpoint"], ["PUT", "Rotate signing secret"]]],
  ];
  let y = 162;
  let side = "";
  groups.forEach(([label, items], g) => {
    side += text(28, y, label, { size: 12, weight: 700, fill: sub, spacing: 1.6 });
    y += 18;
    items.forEach(([m, name], i) => {
      const active = g === 0 && i === 0;
      if (active) side += rect(14, y, 262, 36, 8, "rgba(4,120,87,0.32)");
      side += text(28, y + 23, m, { size: 11, weight: 700, fill: METHOD[m], mono: true });
      side += text(78, y + 23, name, { size: 14.5, weight: active ? 600 : 400, fill: active ? fg : mute });
      y += 38;
    });
    y += 30;
  });

  const params: [string, string, boolean, string][] = [
    ["amount", "integer", true, "Amount in the smallest currency unit."],
    ["currency", "string", true, "Three-letter ISO 4217 currency code."],
    ["customer_id", "string", false, "Attach the payment to an existing customer."],
    ["capture", "boolean", false, "Capture immediately. Defaults to true."],
    ["metadata", "object", false, "Up to 20 key-value pairs for your own use."],
  ];
  const rows = params
    .map(([name, type, req, desc], i) => {
      const py = 418 + i * 82;
      return (
        text(330, py + 24, name, { size: 15.5, weight: 600, fill: fg, mono: true }) +
        text(330 + name.length * 9.6 + 14, py + 24, type, { size: 13, fill: sub, mono: true }) +
        (req ? text(330 + name.length * 9.6 + 14 + type.length * 8 + 14, py + 24, "required", { size: 12, weight: 600, fill: "#f87171" }) : "") +
        text(330, py + 52, desc, { size: 14.5, fill: mute }) +
        `<path d="M330 ${py + 70}H940" stroke="#1c1c1c"/>`
      );
    })
    .join("");

  const P = sub; // punctuation
  const S = mint; // strings
  const N = "#fbbf24"; // numbers
  const K = "#93c5fd"; // keys
  const cx = 1004;
  const req =
    code(cx, 232, [["curl", fg], [" -X ", "#a78bfa"], ["POST", "#38bdf8"], [" https://api.example.com/v2/payments \\", fg]]) +
    code(cx, 258, [["  -H ", "#a78bfa"], ['"Authorization: Bearer $API_KEY"', S], [" \\", P]]) +
    code(cx, 284, [["  -H ", "#a78bfa"], ['"Content-Type: application/json"', S], [" \\", P]]) +
    code(cx, 310, [["  -d ", "#a78bfa"], ["'{", P]]) +
    code(cx, 336, [['    "amount"', K], [": ", P], ["125000", N], [",", P]]) +
    code(cx, 362, [['    "currency"', K], [": ", P], ['"IDR"', S], [",", P]]) +
    code(cx, 388, [['    "customer_id"', K], [": ", P], ['"cus_8Hk2Qp"', S], [",", P]]) +
    code(cx, 414, [['    "capture"', K], [": ", P], ["true", N]]) +
    code(cx, 440, [["  }'", P]]);
  const res =
    code(cx, 640, [["{", P]]) +
    code(cx, 666, [['  "id"', K], [": ", P], ['"pay_3fZq91Lx"', S], [",", P]]) +
    code(cx, 692, [['  "status"', K], [": ", P], ['"pending"', S], [",", P]]) +
    code(cx, 718, [['  "amount"', K], [": ", P], ["125000", N], [",", P]]) +
    code(cx, 744, [['  "currency"', K], [": ", P], ['"IDR"', S], [",", P]]) +
    code(cx, 770, [['  "checkout_url"', K], [": ", P], ['"https://pay.example.com/c/3fZq"', S], [",", P]]) +
    code(cx, 796, [['  "created_at"', K], [": ", P], ['"2026-10-03T09:41:00Z"', S]]) +
    code(cx, 822, [["}", P]]);

  return svg(
    BROWSER.w,
    BROWSER.h,
    rect(0, 0, 1600, 1000, 0, "#0a0a0a") +
      chrome("lexify  /  api-reference  /  payments  /  create-a-payment") +
      // top nav
      `<path d="M0 118.5H1600" stroke="${line}"/>` +
      rect(28, 72, 28, 28, 7, brand) +
      `<path d="M37 79v14h10" stroke="#ecfdf5" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      text(68, 93, "Lexify", { size: 20, weight: 700, fill: fg, spacing: -0.3 }) +
      text(190, 92, "Guides", { size: 14.5, fill: mute }) +
      text(274, 92, "API Reference", { size: 14.5, weight: 600, fill: fg }) +
      rect(274, 116, 98, 3, 1.5, "#10b981") +
      text(404, 92, "Changelog", { size: 14.5, fill: mute }) +
      rect(960, 70, 300, 34, 8, "#111111", `stroke="${line}"`) +
      `<circle cx="982" cy="86" r="6" stroke="${sub}" stroke-width="1.8" fill="none"/><path d="M986.5 90.5l4 4" stroke="${sub}" stroke-width="1.8" stroke-linecap="round"/>` +
      text(1002, 92, "Search documentation…", { size: 14, fill: sub }) +
      rect(1204, 76, 46, 22, 5, "#1c1c1c", `stroke="${line}"`) +
      text(1227, 92, "Ctrl K", { size: 11, weight: 600, fill: mute, anchor: "middle" }) +
      rect(1280, 70, 78, 34, 8, "none", `stroke="${line}"`) +
      text(1296, 92, "v2", { size: 14, weight: 600, fill: fg }) +
      `<path d="M1334 84l5 5l5 -5" stroke="${mute}" stroke-width="1.8" fill="none" stroke-linecap="round"/>` +
      rect(1374, 70, 84, 34, 8, "none", `stroke="${line}"`) +
      text(1390, 92, "EN", { size: 13, weight: 700, fill: fg }) +
      text(1424, 92, "ID", { size: 13, fill: sub }) +
      `<circle cx="1548" cy="87" r="17" fill="none" stroke="${line}"/><circle cx="1548" cy="87" r="6" fill="${mute}"/>` +
      // sidebar
      `<path d="M290.5 119V1000" stroke="${line}"/>` +
      side +
      // article
      text(330, 164, "API Reference   ›   Payments", { size: 13, fill: sub }) +
      text(330, 218, "Create a payment", { size: 40, weight: 700, fill: fg, spacing: -1 }) +
      rect(330, 242, 610, 46, 10, "#111111", `stroke="${line}"`) +
      rect(340, 251, 60, 28, 6, "rgba(56,189,248,0.16)") +
      text(370, 270, "POST", { size: 13, weight: 700, fill: "#38bdf8", anchor: "middle", mono: true }) +
      text(416, 271, "/v2/payments", { size: 15, fill: "#e4e4e7", mono: true }) +
      text(330, 324, "Creates a payment and returns it. The payment stays pending until", { size: 15, fill: mute }) +
      text(330, 348, "it is captured or the customer completes the hosted checkout.", { size: 15, fill: mute }) +
      text(330, 394, "Body parameters", { size: 20, weight: 600, fill: fg }) +
      `<path d="M330 408H940" stroke="${line}"/>` +
      rows +
      text(330, 868, "Was this page helpful?", { size: 14, fill: sub }) +
      rect(500, 848, 60, 30, 8, "none", `stroke="${line}"`) +
      text(530, 868, "Yes", { size: 13, fill: mute, anchor: "middle" }) +
      rect(570, 848, 60, 30, 8, "none", `stroke="${line}"`) +
      text(600, 868, "No", { size: 13, fill: mute, anchor: "middle" }) +
      // request
      rect(980, 146, 592, 320, 12, "#000000", `stroke="${line}"`) +
      `<path d="M980 190.5H1572" stroke="${line}"/>` +
      rect(992, 155, 62, 27, 7, "#262626") +
      text(1023, 173, "cURL", { size: 13, weight: 600, fill: fg, anchor: "middle" }) +
      text(1076, 173, "Node.js", { size: 13, fill: sub }) +
      text(1142, 173, "Python", { size: 13, fill: sub }) +
      text(1204, 173, "Go", { size: 13, fill: sub }) +
      rect(1476, 154, 84, 28, 7, brand) +
      `<path d="M1492 162v12l9 -6z" fill="#ecfdf5"/>` +
      text(1528, 173, "Try it", { size: 13, weight: 600, fill: "#ecfdf5", anchor: "middle" }) +
      req +
      // response
      rect(980, 486, 592, 366, 12, "#000000", `stroke="${line}"`) +
      `<path d="M980 598.5H1572" stroke="${line}"/>` +
      text(1004, 524, "Response", { size: 15, weight: 600, fill: fg }) +
      `<circle cx="1010" cy="566" r="5" fill="#34d399"/>` +
      text(1024, 571, "201", { size: 14, weight: 700, fill: "#34d399", mono: true }) +
      text(1058, 571, "Created", { size: 14, fill: mute }) +
      text(1548, 571, "application/json", { size: 13, fill: sub, anchor: "end", mono: true }) +
      res +
      // on this page
      text(980, 892, "ON THIS PAGE", { size: 11, weight: 700, fill: sub, spacing: 1.4 }) +
      rect(980, 906, 2, 20, 1, "#10b981") +
      text(996, 921, "Body parameters", { size: 13.5, fill: fg }) +
      text(996, 947, "Returns", { size: 13.5, fill: sub }) +
      text(996, 973, "Errors", { size: 13.5, fill: sub }),
  );
}

/* ───────────────────────── MOSES ───────────────────────── */

function moses() {
  const fg = "#f3f0e8";
  const mute = "#9d98a8";
  const sub = "#6b6777";
  const amber = "#f0b24a";
  const cell = "#15141c";
  const edge = `stroke="#262432"`;
  const tones = ["#8b7bff", "#3fc8b4", "#f0b24a", "#ef7fa0", "#6fa8ff"];

  const weeks = ["Oct 4", "Oct 11", "Oct 18", "Oct 25"];
  const roles: [string, string[]][] = [
    ["Worship Leader", ["Daniel", "Grace", "Daniel", "Ruth"]],
    ["Vocals", ["Hannah", "Naomi", "Esther", "Hannah"]],
    ["Keys", ["Samuel", "Samuel", "Micah", "Caleb"]],
    ["Guitar", ["Joshua", "Caleb", "Joshua", ""]],
    ["Drums", ["Micah", "Joel", "Joel", "Micah"]],
    ["Multimedia", ["Esther", "Ruth", "Naomi", "Grace"]],
    ["Ushers", ["Caleb", "Joshua", "Hannah", "Samuel"]],
  ];

  const head = weeks
    .map((w, i) => {
      const x = 250 + i * 236;
      return (
        text(x + 16, 244, "SUN", { size: 11, weight: 700, fill: sub, spacing: 1.5 }) +
        text(x + 16, 268, w, { size: 18, weight: 600, fill: fg })
      );
    })
    .join("");

  const grid = roles
    .map(([role, names], r) => {
      const y = 290 + r * 92;
      const cells = names
        .map((n, c) => {
          const x = 250 + c * 236;
          if (!n)
            return (
              rect(x, y, 224, 80, 14, "none", `stroke="${amber}" stroke-dasharray="6 6" stroke-opacity="0.7"`) +
              text(x + 112, y + 46, "Open slot", { size: 15, weight: 600, fill: amber, anchor: "middle" })
            );
          const tone = tones[(n.charCodeAt(0) + n.length) % tones.length];
          const swapped = r === 2 && c === 2;
          return (
            rect(x, y, 224, 80, 14, swapped ? "rgba(240,178,74,0.1)" : cell, swapped ? `stroke="${amber}" stroke-opacity="0.55"` : edge) +
            `<circle cx="${x + 40}" cy="${y + 40}" r="20" fill="${tone}" fill-opacity="0.22"/>` +
            text(x + 40, y + 46, n[0], { size: 17, weight: 700, fill: tone, anchor: "middle" }) +
            text(x + 72, y + 37, n, { size: 16.5, weight: 600, fill: fg }) +
            text(x + 72, y + 58, swapped ? "Swapped in" : "Confirmed", { size: 12.5, fill: swapped ? amber : sub })
          );
        })
        .join("");
      return text(40, y + 46, role, { size: 15.5, weight: 600, fill: mute }) + cells;
    })
    .join("");

  const away: [string, string][] = [
    ["Grace", "Oct 18 — travelling"],
    ["Caleb", "Oct 4 — exam week"],
    ["Ruth", "Oct 11, Oct 18"],
  ];

  return svg(
    BROWSER.w,
    BROWSER.h,
    rect(0, 0, 1600, 1000, 0, "#0d0c12") +
      chrome("moses  /  schedule  /  october-2026") +
      `<path d="M0 118.5H1600" stroke="#22202c"/>` +
      rect(40, 72, 28, 28, 8, amber) +
      `<path d="M47 93v-14l7 9l7 -9v14" stroke="#0d0c12" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      text(80, 94, "MOSES", { size: 19, weight: 800, fill: fg, spacing: 2.5 }) +
      text(230, 92, "Schedule", { size: 14.5, weight: 600, fill: fg }) +
      rect(230, 116, 64, 3, 1.5, amber) +
      text(330, 92, "Volunteers", { size: 14.5, fill: mute }) +
      text(440, 92, "Availability", { size: 14.5, fill: mute }) +
      text(556, 92, "Settings", { size: 14.5, fill: mute }) +
      rect(1372, 68, 188, 38, 10, amber) +
      text(1466, 92, "Generate schedule", { size: 14.5, weight: 700, fill: "#0d0c12", anchor: "middle" }) +
      text(40, 180, "October 2026", { size: 36, weight: 700, fill: fg, spacing: -0.8 }) +
      text(292, 178, "Sunday services · 4 weeks · 7 roles", { size: 15, fill: sub }) +
      head +
      grid +
      // side panel
      rect(1216, 150, 344, 220, 18, cell, edge) +
      text(1244, 196, "CONFLICTS", { size: 12, weight: 700, fill: sub, spacing: 1.6 }) +
      text(1244, 302, "0", { size: 110, weight: 800, fill: "#3fc8b4", spacing: -4 }) +
      text(1330, 276, "All 27 assignments", { size: 15, fill: mute }) +
      text(1330, 300, "clear availability", { size: 15, fill: mute }) +
      rect(1244, 330, 288, 8, 4, "#22202c") +
      rect(1244, 330, 277, 8, 4, "#3fc8b4") +
      rect(1216, 390, 344, 300, 18, cell, edge) +
      text(1244, 436, "UNAVAILABLE THIS MONTH", { size: 12, weight: 700, fill: sub, spacing: 1.6 }) +
      away
        .map(([n, d], i) => {
          const y = 468 + i * 68;
          return (
            `<circle cx="1264" cy="${y + 20}" r="20" fill="#22202c"/>` +
            text(1264, y + 26, n[0], { size: 16, weight: 700, fill: mute, anchor: "middle" }) +
            text(1298, y + 16, n, { size: 16, weight: 600, fill: fg }) +
            text(1298, y + 38, d, { size: 13, fill: sub })
          );
        })
        .join("") +
      rect(1216, 710, 344, 224, 18, "rgba(240,178,74,0.07)", `stroke="${amber}" stroke-opacity="0.35"`) +
      text(1244, 756, "1 OPEN SLOT", { size: 12, weight: 700, fill: amber, spacing: 1.6 }) +
      text(1244, 792, "Guitar · Oct 25", { size: 19, weight: 600, fill: fg }) +
      text(1244, 820, "3 volunteers are free that Sunday.", { size: 14, fill: mute }) +
      rect(1244, 850, 150, 40, 10, "none", `stroke="${amber}"`) +
      text(1319, 875, "Suggest a fill", { size: 14, weight: 600, fill: amber, anchor: "middle" }),
  );
}

/* ───────────────────── NIKMAT GROUP (abstract) ───────────────────── */

function nikmat() {
  const ink = "#3a281c";
  const clay = "#c8552d";
  const tiles = ["#c8552d", "#e3a13b", "#5f6f3a", "#8a4a2c"];
  return svg(
    BROWSER.w,
    BROWSER.h,
    `<defs>
      <linearGradient id="dish" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9a94a"/><stop offset="1" stop-color="#c8552d"/></linearGradient>
      <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7d8c4c"/><stop offset="1" stop-color="#46552a"/></linearGradient>
    </defs>` +
      rect(0, 0, 1600, 1000, 0, "#f5eee2") +
      chrome("nikmatgroup.co", false) +
      text(64, 108, "NIKMAT GROUP", { size: 20, weight: 800, fill: ink, spacing: 4 }) +
      ["About", "Brands", "News", "Careers"].map((l, i) => text(1040 + i * 104, 106, l, { size: 15, fill: "#6d5a4b" })).join("") +
      rect(1452, 82, 100, 38, 19, ink) +
      text(1502, 107, "Contact", { size: 14.5, weight: 600, fill: "#f5eee2", anchor: "middle" }) +
      // headline as type blocks
      rect(64, 214, 560, 62, 10, ink) +
      rect(64, 296, 660, 62, 10, ink) +
      rect(64, 378, 380, 62, 10, clay) +
      rect(64, 486, 520, 14, 7, "#b9a996") +
      rect(64, 514, 470, 14, 7, "#b9a996") +
      rect(64, 542, 300, 14, 7, "#b9a996") +
      rect(64, 600, 190, 56, 28, clay) +
      text(159, 635, "Our brands", { size: 17, weight: 600, fill: "#fff6ea", anchor: "middle" }) +
      rect(274, 600, 170, 56, 28, "none", `stroke="${ink}" stroke-width="2"`) +
      text(359, 635, "Our story", { size: 17, weight: 600, fill: ink, anchor: "middle" }) +
      // imagery
      rect(820, 176, 520, 520, 36, "url(#dish)") +
      `<circle cx="1080" cy="436" r="170" fill="#f5eee2" fill-opacity="0.9"/><circle cx="1080" cy="436" r="118" fill="#e9a94a"/><circle cx="1040" cy="410" r="34" fill="#c8552d"/><circle cx="1118" cy="462" r="42" fill="#5f6f3a"/><circle cx="1108" cy="388" r="20" fill="#f5eee2"/>` +
      rect(1280, 420, 256, 320, 28, "url(#leaf)") +
      `<path d="M1408 700C1340 630 1350 520 1408 470C1466 520 1476 630 1408 700Z" fill="#f5eee2" fill-opacity="0.22"/><path d="M1408 700V500" stroke="#f5eee2" stroke-opacity="0.5" stroke-width="3"/>` +
      // brand tiles
      text(64, 792, "OUR BRANDS", { size: 13, weight: 700, fill: "#8a7d6c", spacing: 2.4 }) +
      tiles
        .map((c, i) => {
          const x = 64 + i * 184;
          return (
            rect(x, 816, 164, 124, 22, "#ebe1d1") +
            `<circle cx="${x + 82}" cy="${862}" r="26" fill="${c}"/>` +
            rect(x + 42, 904, 80, 10, 5, "#b9a996")
          );
        })
        .join("") +
      rect(820, 760, 716, 180, 28, ink) +
      rect(860, 806, 300, 26, 8, "#f5eee2") +
      rect(860, 848, 220, 12, 6, "#8a7d6c") +
      rect(860, 872, 180, 12, 6, "#8a7d6c") +
      `<circle cx="1456" cy="850" r="40" fill="${clay}"/><path d="M1442 850h28m-10 -10l10 10l-10 10" stroke="#f5eee2" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  );
}

/* ───────────────────── ME BUT BETTER (abstract) ───────────────────── */

function mbb() {
  const ink = "#3a262d";
  const rose = "#e98aa9";
  const bottle = (x: number, y: number, body: string, cap: string) =>
    rect(x - 34, y, 68, 122, 20, body) + rect(x - 20, y - 34, 40, 38, 9, cap) + rect(x - 20, y + 46, 40, 30, 6, "#ffffff", `opacity="0.55"`);
  const card = (x: number, y: number, body: string, cap: string, name: string, price: string) =>
    rect(x, y, 326, 430, 36, "#ffffff") +
    rect(x + 16, y + 16, 294, 268, 26, "#fbeef1") +
    bottle(x + 163, y + 110, body, cap) +
    text(x + 26, y + 330, name, { size: 25, weight: 600, fill: ink }) +
    rect(x + 26, y + 348, 150, 10, 5, "#e6d3d8") +
    text(x + 26, y + 400, price, { size: 25, weight: 700, fill: ink }) +
    `<circle cx="${x + 276}" cy="${y + 384}" r="28" fill="${ink}"/><path d="M${x + 264} ${y + 384}h24m-12 -12v24" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;

  return svg(
    PHONE.w,
    PHONE.h,
    `<defs><linearGradient id="hero" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f9d3dd"/><stop offset="1" stop-color="${rose}"/></linearGradient></defs>` +
      rect(0, 0, PHONE.w, PHONE.h, 0, "#fbf3f2") +
      statusBar(ink) +
      text(380, 192, "me but better", { size: 38, weight: 700, fill: ink, anchor: "middle", spacing: -1 }) +
      `<g stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M52 166h40M52 182h28M52 198h40"/><path d="M670 172h44l-5 34h-34z"/><path d="M682 172c0 -18 20 -18 20 0"/></g>` +
      // hero
      rect(36, 240, 688, 360, 44, "url(#hero)") +
      text(76, 312, "NEW IN", { size: 21, weight: 700, fill: ink, spacing: 4, opacity: 0.7 }) +
      rect(76, 344, 300, 40, 10, ink) +
      rect(76, 398, 230, 40, 10, ink) +
      rect(76, 466, 250, 12, 6, ink, `opacity="0.35"`) +
      rect(76, 490, 190, 12, 6, ink, `opacity="0.35"`) +
      rect(76, 526, 170, 50, 25, "#ffffff") +
      text(161, 559, "Shop now", { size: 22, weight: 600, fill: ink, anchor: "middle" }) +
      `<circle cx="560" cy="420" r="128" fill="#ffffff" fill-opacity="0.45"/>` +
      bottle(520, 340, "#ffffff", ink) +
      bottle(608, 380, "#fbe3ea", rose) +
      // chips
      rect(36, 632, 110, 60, 30, ink) +
      text(91, 671, "All", { size: 24, weight: 600, fill: "#fff", anchor: "middle" }) +
      [["Cleanser", 162, 172], ["Serum", 350, 144], ["Moisturiser", 510, 214]]
        .map(([l, x, w]) => rect(x as number, 632, w as number, 60, 30, "#ffffff", `stroke="#ead8dc" stroke-width="2"`) + text((x as number) + (w as number) / 2, 671, l as string, { size: 24, fill: ink, anchor: "middle" }))
        .join("") +
      // products
      card(36, 724, "#f6c6d2", ink, "Glow Serum", "Rp 189.000") +
      card(398, 724, "#fde7c8", "#c98a3c", "Daily Cleanser", "Rp 129.000") +
      card(36, 1186, "#d9e7dc", "#5d7f69", "Barrier Cream", "Rp 215.000") +
      card(398, 1186, "#e2dcf4", "#7a68b8", "Night Repair", "Rp 245.000") +
      // sticky bag bar
      `<defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf3f2" stop-opacity="0"/><stop offset="0.5" stop-color="#fbf3f2"/></linearGradient></defs>` +
      rect(0, 1410, PHONE.w, 204, 0, "url(#fade)") +
      rect(36, 1474, 688, 100, 50, ink) +
      text(84, 1535, "Add to bag", { size: 28, weight: 600, fill: "#fff" }) +
      text(676, 1535, "Rp 189.000", { size: 28, weight: 700, fill: "#f9d3dd", anchor: "end" }) +
      rect(280, 1592, 200, 8, 4, ink, `opacity="0.4"`),
  );
}

const SCREENS: Record<ScreenKind, () => string> = { jese, lexify, moses, nikmat, mbb };

export function screenSvg(kind: ScreenKind) {
  return SCREENS[kind]();
}

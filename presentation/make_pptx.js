import PptxGenJS from "pptxgenjs";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pres = new PptxGenJS();

// --- Theme Definition (Modern Minimalist) ---
const COLORS = {
    bg: "FFFFFF",
    textMain: "333333",        // Softer Black
    textSub: "888888",         // Cool Gray
    accent: "111111",          // Strong Black for Emphasis
    gold: "C5A059",            // Champagne Gold (Elegant, not yellow)
    goldLight: "F3EAD3",       // Light gold bg
    line: "E5E5E5",            // Very subtle lines
    ink: "1E1E1E",             // Near-black for hero text
    paper: "F7F5F2",           // Warm off-white
    fog: "EFEDE8"              // Soft neutral panel
};

// Font Strategy
// Font Strategy
// Font Strategy
const FONT_JP = "Hiragino Kaku Gothic ProN";    // Standard Stylish JP
const FONT_EN = "Futura";                       // Geometric, Designer Favorite (Supreme, LV, etc.)

// Layout presets
pres.layout = "LAYOUT_16x9";

// Define a master slide
pres.defineSlideMaster({
    title: "MASTER_CLEAN",
    background: { color: COLORS.bg },
    objects: [
        // Minimal Footer Line
        // { rect: { x: 0.5, y: 5.3, w: 9, h: 0.01, fill: COLORS.line } },
    ],
    slideNumber: { x: 9.2, y: 5.3, w: 0.5, h: 0.2, fontSize: 10, color: COLORS.textSub, fontFace: FONT_EN }
});

// Helper: Section Divider Slide
function addSectionSlide(pres, num, title, sub) {
    let slide = pres.addSlide({ masterName: "MASTER_CLEAN" });

    // Dark Background
    slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: COLORS.accent } });

    // Big Number (Outline/Faint)
    slide.addText(num, {
        x: 0, y: 1.5, w: 10, h: 2.0,
        align: "center", fontSize: 160, fontFace: "Arial Black",
        color: "333333"
    });

    // Sections Line
    slide.addShape(pres.ShapeType.line, {
        x: 3.5, y: 2.8, w: 3.0, h: 0,
        line: { color: COLORS.gold, width: 2 }
    });

    // Title
    slide.addText(title, {
        x: 0, y: 3.0, w: 10, h: 0.8,
        align: "center", fontSize: 32, fontFace: FONT_EN, bold: true, color: "FFFFFF", charSpacing: 4
    });

    // Subtitle
    slide.addText(sub, {
        x: 0, y: 3.7, w: 10, h: 0.4,
        align: "center", fontSize: 14, fontFace: FONT_EN, color: COLORS.gold, charSpacing: 2
    });
}

// ==========================================
// Slide 1: Cover (Magazine Style)
// ==========================================
// ==========================================
// Slide 0: Design Template (Hidden or Reference)
// ==========================================
let slide0 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide0.addText("TEMPLATE", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });
slide0.addText("Slide Header (24pt/Gold)", { x: 0.8, y: 0.6, w: 8, h: 0.5, fontSize: 24, fontFace: FONT_JP, bold: true, color: COLORS.gold });
slide0.addText("Sub Header / Accent (18pt/Accent)", { x: 0.8, y: 1.2, w: 8, h: 0.4, fontSize: 18, fontFace: FONT_JP, bold: true, color: COLORS.accent });
slide0.addText("Body Text (14pt/Main)", { x: 0.8, y: 1.8, w: 8, h: 0.4, fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain });
slide0.addText("Small Text (10pt/Sub)", { x: 0.8, y: 2.3, w: 8, h: 0.4, fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub });
slide0.addShape(pres.ShapeType.rect, { x: 0.8, y: 3.0, w: 1, h: 1, fill: { color: COLORS.gold } });
slide0.addShape(pres.ShapeType.rect, { x: 2.0, y: 3.0, w: 1, h: 1, fill: { color: COLORS.accent } });
slide0.addShape(pres.ShapeType.rect, { x: 3.2, y: 3.0, w: 1, h: 1, fill: { color: COLORS.textMain } });


// ==========================================
// Slide 1: Cover (Magazine Style)
// ==========================================
let slide1 = pres.addSlide({ masterName: "MASTER_CLEAN" });

// Base background
slide1.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: "100%", h: "100%",
    fill: { color: COLORS.paper }
});

// Left dark panel
slide1.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 4.2, h: 5.625,
    fill: { color: COLORS.ink }
});

// Right soft panel for breathing space
slide1.addShape(pres.ShapeType.rect, {
    x: 4.2, y: 0, w: 5.8, h: 5.625,
    fill: { color: COLORS.fog }
});

// === Decorative patterns (Right side) ===
// Large decorative circle (top right, subtle)
slide1.addShape(pres.ShapeType.ellipse, {
    x: 7.5, y: -1.0, w: 3.5, h: 3.5,
    fill: { color: "E8E4DF" }, line: { width: 0 }
});
// Medium decorative ring
slide1.addShape(pres.ShapeType.ellipse, {
    x: 8.2, y: 3.5, w: 2.0, h: 2.0,
    fill: { type: "solid", color: "FFFFFF" }, line: { color: COLORS.gold, width: 1, dashType: "dash" }
});
// Small accent circle
slide1.addShape(pres.ShapeType.ellipse, {
    x: 7.0, y: 4.2, w: 0.6, h: 0.6,
    fill: { color: COLORS.gold }, line: { width: 0 }
});
// Tiny dot pattern
slide1.addShape(pres.ShapeType.ellipse, { x: 6.5, y: 0.4, w: 0.15, h: 0.15, fill: { color: "D4CFC7" }, line: { width: 0 } });
slide1.addShape(pres.ShapeType.ellipse, { x: 6.8, y: 0.6, w: 0.1, h: 0.1, fill: { color: "D4CFC7" }, line: { width: 0 } });
slide1.addShape(pres.ShapeType.ellipse, { x: 7.1, y: 0.35, w: 0.12, h: 0.12, fill: { color: "D4CFC7" }, line: { width: 0 } });
slide1.addShape(pres.ShapeType.ellipse, { x: 6.6, y: 0.8, w: 0.08, h: 0.08, fill: { color: "D4CFC7" }, line: { width: 0 } });
// Diagonal decorative lines
slide1.addShape(pres.ShapeType.line, { x: 8.5, y: 1.5, w: 1.0, h: 1.0, line: { color: "D4CFC7", width: 0.5 } });
slide1.addShape(pres.ShapeType.line, { x: 8.8, y: 1.5, w: 0.8, h: 0.8, line: { color: "D4CFC7", width: 0.5 } });
// Abstract geometric accent (bottom)
slide1.addShape(pres.ShapeType.rect, {
    x: 4.4, y: 5.1, w: 0.8, h: 0.08,
    fill: { color: COLORS.gold }, line: { width: 0 }
});
slide1.addShape(pres.ShapeType.rect, {
    x: 5.4, y: 5.1, w: 0.4, h: 0.08,
    fill: { color: "D4CFC7" }, line: { width: 0 }
});
slide1.addShape(pres.ShapeType.rect, {
    x: 6.0, y: 5.1, w: 0.2, h: 0.08,
    fill: { color: "E8E4DF" }, line: { width: 0 }
});

// SEO Image (Left Panel)
slide1.addImage({
    path: path.join(__dirname, "assets/seo_cover.png"),
    x: 0, y: 0, w: 4.2, h: 5.625,
});

// Thin vertical divider
slide1.addShape(pres.ShapeType.line, {
    x: 4.2, y: 0.7, w: 0, h: 4.2,
    line: { color: COLORS.gold, width: 1.5 }
});

// Tag
slide1.addText("STRATEGIC PROPOSAL", {
    x: 4.6, y: 0.9, w: 4.8, h: 0.3,
    color: COLORS.gold,
    fontSize: 9,
    charSpacing: 3,
    fontFace: FONT_EN,
    bold: true
});

// Title: 0円SEO (bold + tight)
slide1.addText("0円SEO", {
    x: 4.6, y: 1.3, w: 5, h: 1.6,
    fontFace: "Arial Black",
    fontSize: 86,
    color: COLORS.ink,
});

// Subtitle
slide1.addText("LLMO時代の、唯一の解。", {
    x: 4.65, y: 3.05, w: 5, h: 0.5,
    fontFace: FONT_JP,
    fontSize: 18,
    color: COLORS.textMain,
    charSpacing: 2
});

// Footer Info
slide1.addText("Presented by 株式会社AIMA", {
    x: 4.65, y: 4.6, w: 4.5, h: 0.3,
    color: COLORS.textSub,
    fontSize: 10,
    fontFace: FONT_JP
});


// ==========================================
// Slide 2: Agenda (Clean Grid)
// ==========================================
let slide2 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide2.addText("AGENDA", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide2.addText("Agenda", {
    x: 0.8, y: 0.6, w: 3, h: 0.5,
    fontSize: 32, fontFace: FONT_EN, bold: true, color: COLORS.gold
});

// Grid
const items = [
    { num: "01", title: "イントロダクション", sub: "Fundamental" },
    { num: "02", title: "市場環境と課題", sub: "Market & Issues" },
    { num: "03", title: "0円SEOの全貌", sub: "The Scheme" },
    { num: "04", title: "圧倒的な差別化", sub: "Differentiation" },
    { num: "05", title: "導入プラン", sub: "Planning" },
    { num: "06", title: "FAQ & Pricing", sub: "Information" }
];

items.forEach((item, index) => {
    // 2-Column Grid
    const colBase = index < 3 ? 1.0 : 5.5;
    const rowBase = 1.8 + (index % 3) * 1.1;

    // Number (Styled)
    slide2.addText(item.num, {
        x: colBase, y: rowBase - 0.1, w: 1.0, h: 0.5,
        color: COLORS.gold,
        fontSize: 32, fontFace: FONT_EN, bold: true, align: "center"
    });

    // Content overlay
    slide2.addText(item.title, {
        x: colBase + 1.2, y: rowBase, w: 3.5, h: 0.4,
        color: COLORS.textMain, fontSize: 16, bold: true, fontFace: FONT_JP
    });
    slide2.addText(item.sub, {
        x: colBase + 1.2, y: rowBase + 0.35, w: 3.5, h: 0.2,
        color: COLORS.gold, fontSize: 9, fontFace: FONT_EN
    });

    // Thin separator
    slide2.addShape(pres.ShapeType.line, {
        x: colBase + 1.2, y: rowBase + 0.7, w: 2.5, h: 0,
        line: { color: COLORS.line, width: 0.5 }
    });
});


// ==========================================
// Slide 3: Company Info (Modern Card)
// ==========================================
let slide3 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide3.addText("COMPANY", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide3.addText("Company", {
    x: 0.8, y: 0.5, w: 4, h: 0.8,
    fontSize: 32, fontFace: FONT_EN, bold: true, color: COLORS.gold
});

// Layout Variables
const leftX = 0.8;
const labelW = 2.0;
const valX = 2.5;
const valW = 4.0;
let curY = 1.3;

// ==============================
// Section 1: Company Profile
// ==============================
// Moved down to avoid overlap
slide3.addText("Company Profile", {
    x: leftX, y: 1.4, w: 4.0, h: 0.3,
    fontSize: 14, fontFace: FONT_EN, bold: true, color: COLORS.textMain, charSpacing: 1
});
slide3.addShape(pres.ShapeType.line, {
    x: leftX, y: 1.7, w: 5.0, h: 0, line: { color: COLORS.line, width: 1 }
});

curY = 1.9;
const rowGap = 0.45;

// Rows
// Name
slide3.addText("会社名", { x: leftX, y: curY, w: labelW, h: 0.3, fontSize: 10, color: COLORS.textSub, fontFace: FONT_JP });
slide3.addText("株式会社AIMA", { x: valX, y: curY, w: valW, h: 0.3, fontSize: 11, color: COLORS.textMain, fontFace: FONT_JP, bold: true });
curY += rowGap;

// Rep
slide3.addText("代表者", { x: leftX, y: curY, w: labelW, h: 0.3, fontSize: 10, color: COLORS.textSub, fontFace: FONT_JP });
slide3.addText("代表取締役  水間 雄紀", { x: valX, y: curY, w: valW, h: 0.3, fontSize: 11, color: COLORS.textMain, fontFace: FONT_JP });
curY += rowGap;

// Address (Moved up)
slide3.addText("所在地", { x: leftX, y: curY, w: labelW, h: 0.3, fontSize: 10, color: COLORS.textSub, fontFace: FONT_JP });
slide3.addText("〒530-0001\n大阪府大阪市北区梅田1-2-2\n大阪駅前第2ビル2階5-6号室", {
    x: valX, y: curY, w: valW, h: 0.6,
    fontSize: 11, color: COLORS.textMain, fontFace: FONT_JP, lineSpacing: 15
});
curY += 0.6; // Multi-line spacer

// Est (Moved down)
slide3.addText("設立", { x: leftX, y: curY, w: labelW, h: 0.3, fontSize: 10, color: COLORS.textSub, fontFace: FONT_JP });
slide3.addText("2018年6月", { x: valX, y: curY, w: valW, h: 0.3, fontSize: 11, color: COLORS.textMain, fontFace: FONT_EN });
curY += rowGap;


// ==============================
// Section 2: History
// ==============================
curY += 0.2; // Small gap
slide3.addText("History", {
    x: leftX, y: curY, w: 4.0, h: 0.3,
    fontSize: 14, fontFace: FONT_EN, bold: true, color: COLORS.textMain, charSpacing: 1
});
slide3.addShape(pres.ShapeType.line, {
    x: leftX, y: curY + 0.3, w: 5.0, h: 0, line: { color: COLORS.line, width: 1 }
});

curY += 0.5;
const histGap = 0.35;

slide3.addText("・ 2018年に株式会社circlizeとして、コンテンツマーケティング業を開始。", {
    x: leftX, y: curY, w: 6.0, h: 0.3, fontSize: 10, color: COLORS.textMain, fontFace: FONT_JP
});
curY += histGap;
slide3.addText("・ 2024年に同事業をラグザス株式会社に事業譲渡。", {
    x: leftX, y: curY, w: 6.0, h: 0.3, fontSize: 10, color: COLORS.textMain, fontFace: FONT_JP
});
curY += histGap;
slide3.addText("・ 2025年、社名を株式会社AIMAに変更し、現在に至る。", {
    x: leftX, y: curY, w: 6.0, h: 0.3, fontSize: 10, color: COLORS.textMain, fontFace: FONT_JP
});


// ==============================
// Column Right: Visual
// ==============================
// Align Image Top with "Company Profile" (approx y=1.4)
const imgX = 6.2;
const imgY = 1.4;
const imgW = 3.5;
const imgH = 3.3;

// Image
slide3.addImage({
    path: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    x: imgX, y: imgY, w: imgW, h: imgH,
});


// ==========================================
// Slide 4: What is SEO (Detailed & 3 Points)
// ==========================================
addSectionSlide(pres, "01", "INTRODUCTION", "Fundamental");
let slide4 = pres.addSlide({ masterName: "MASTER_CLEAN" });

// Background "SEO" Text (Subtle)
slide4.addText("SEO", {
    x: 0.5, y: 0.2, w: 9, h: 1.5,
    fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black"
});

// Header
slide4.addText("SEOとは", {
    x: 0.8, y: 0.6, w: 8, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

// Description (Left Side)
slide4.addText("SEO（Search Engine Optimization）とは、検索エンジン最適化のことです。\nGoogleなどの検索結果で自社のWebサイトを上位に表示させ、\n購買意欲の高いユーザーを継続的に集客するマーケティング手法を指します。", {
    x: 0.8, y: 1.2, w: 5.2, h: 1.5,
    fontSize: 12, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 18
});

// Visual (Right Side) - RESTORED
// Image Background
slide4.addShape(pres.ShapeType.rect, {
    x: 6.2, y: 0.8, w: 3.2, h: 2.1,
    fill: { color: "FAFAFA" },
    line: { color: "E5E5E5" }
});

// Image
slide4.addImage({
    path: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    x: 6.4, y: 1.0, w: 2.8, h: 1.5,
});

// Caption for Image
slide4.addText("Organic Stream", {
    x: 6.2, y: 2.55, w: 3.2, h: 0.3,
    align: "center", fontSize: 9, color: COLORS.gold, fontFace: FONT_EN, charSpacing: 2
});


// Key Benefits (Card Layout - Bottom)
const seoCardY = 3.0; // Moved to bottom
const seoCardW = 2.8;
const seoCardH = 2.3; // Shortened height
const seoCardGap = 0.3;

// Card 1: Asset
const seoC1x = 0.8;
slide4.addShape(pres.ShapeType.rect, {
    x: seoC1x, y: seoCardY, w: seoCardW, h: seoCardH,
    fill: { color: "FFFFFF" },
    line: { color: "E5E5E5", width: 1 },
    shadow: { type: 'outer', color: '000000', blur: 3, offset: 2, angle: 45, opacity: 0.1 }
});
// Icon (Building/Asset)
slide4.addImage({ path: path.join(__dirname, "assets/seo_asset.png"), x: seoC1x + 0.9, y: seoCardY + 0.1, w: 1.0, h: 1.0 });
slide4.addText("① 圧倒的な\n「資産性」", {
    x: seoC1x, y: seoCardY + 0.9, w: seoCardW, h: 0.6,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});
slide4.addText("広告と異なり、費用を止めると消えるものではありません。\n一度上位表示されれば、24時間365日、無償で集客し続けます。", {
    x: seoC1x + 0.2, y: seoCardY + 1.5, w: seoCardW - 0.4, h: 0.7,
    fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 12
});


// Card 2: Trust
const seoC2x = seoC1x + seoCardW + seoCardGap;
slide4.addShape(pres.ShapeType.rect, {
    x: seoC2x, y: seoCardY, w: seoCardW, h: seoCardH,
    fill: { color: "FFFFFF" },
    line: { color: "E5E5E5", width: 1 },
    shadow: { type: 'outer', color: '000000', blur: 3, offset: 2, angle: 45, opacity: 0.1 }
});
// Icon (Trigger/Trust/Handshake)
slide4.addImage({ path: path.join(__dirname, "assets/seo_trust.png"), x: seoC2x + 0.9, y: seoCardY + 0.1, w: 1.0, h: 1.0 });
slide4.addText("② 高い「信頼性」\nと「成約率」", {
    x: seoC2x, y: seoCardY + 0.9, w: seoCardW, h: 0.6,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});
slide4.addText("自然検索枠に表示されるため、ユーザーの警戒心が低く、\n自律的な情報収集として信頼されます。", {
    x: seoC2x + 0.2, y: seoCardY + 1.5, w: seoCardW - 0.4, h: 0.7,
    fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 12
});


// Card 3: Cost Zero
const seoC3x = seoC2x + seoCardW + seoCardGap;
slide4.addShape(pres.ShapeType.rect, {
    x: seoC3x, y: seoCardY, w: seoCardW, h: seoCardH,
    fill: { color: "FFFFFF" },
    line: { color: "E5E5E5", width: 1 },
    shadow: { type: 'outer', color: '000000', blur: 3, offset: 2, angle: 45, opacity: 0.1 }
});
// Icon (Chart/Down)
slide4.addImage({ path: path.join(__dirname, "assets/seo_cost_zero.png"), x: seoC3x + 0.9, y: seoCardY + 0.1, w: 1.0, h: 1.0 });
slide4.addText("③ クリックコスト\n「ゼロ」", {
    x: seoC3x, y: seoCardY + 0.9, w: seoCardW, h: 0.6,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});
slide4.addText("クリック課金は一切発生しません。\nアクセスが増えれば増えるほど、顧客獲得単価（CPA）は下がります。", {
    x: seoC3x + 0.2, y: seoCardY + 1.5, w: seoCardW - 0.4, h: 0.7,
    fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 12
});


// ==========================================
// Slide 5: Why SEO Now? (Reason 1)
// ==========================================
let slide5_new = pres.addSlide({ masterName: "MASTER_CLEAN" });

// Stylish Background Number
slide5_new.addText("REASON", {
    x: 0.5, y: 0.2, w: 9, h: 1.5,
    fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black"
});

// Header
slide5_new.addText("なぜ今さらSEOなのか (1/3)", {
    x: 0.8, y: 0.6, w: 8, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

// Main Message
slide5_new.addText("AIによって、制作コストが劇的に減少", {
    x: 0.5, y: 1.15, w: 9, h: 0.5,
    fontSize: 22, fontFace: FONT_JP, bold: true, color: COLORS.textMain, align: "center"
});

// Left side: Image (smaller)
slide5_new.addImage({
    path: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    x: 0.5, y: 1.7, w: 3.2, h: 1.6
});

// Left side: Before/After diagram
const diag1X = 0.5;
const diag1Y = 3.4;
// Before box
slide5_new.addShape(pres.ShapeType.roundRect, {
    x: diag1X, y: diag1Y, w: 1.5, h: 0.9,
    fill: { color: "FEE2E2" }, line: { color: "EF4444", width: 1 }, rectRadius: 0.05
});
slide5_new.addText("従来", { x: diag1X, y: diag1Y + 0.1, w: 1.5, h: 0.25, align: "center", fontSize: 8, bold: true, color: "EF4444", fontFace: FONT_JP });
slide5_new.addText("1記事\n数万円", { x: diag1X, y: diag1Y + 0.35, w: 1.5, h: 0.5, align: "center", fontSize: 9, color: "B91C1C", fontFace: FONT_JP, lineSpacing: 12 });
// Arrow
slide5_new.addText("→", { x: diag1X + 1.5, y: diag1Y + 0.25, w: 0.3, h: 0.4, align: "center", fontSize: 16, color: COLORS.gold });
// After box
slide5_new.addShape(pres.ShapeType.roundRect, {
    x: diag1X + 1.8, y: diag1Y, w: 1.5, h: 0.9,
    fill: { color: "DCFCE7" }, line: { color: "22C55E", width: 1 }, rectRadius: 0.05
});
slide5_new.addText("AI活用", { x: diag1X + 1.8, y: diag1Y + 0.1, w: 1.5, h: 0.25, align: "center", fontSize: 8, bold: true, color: "22C55E", fontFace: FONT_JP });
slide5_new.addText("大幅\nコスト減", { x: diag1X + 1.8, y: diag1Y + 0.35, w: 1.5, h: 0.5, align: "center", fontSize: 9, color: "166534", fontFace: FONT_JP, lineSpacing: 12 });

// Right side: Text content
const r1TxtX = 3.9;
const r1TxtW = 5.7;

slide5_new.addText("かつてSEO対策は、専門ライターの人件費・外注費が大きな負担でした。1記事あたり数万円、月に数十万円のコストがかかることも珍しくありませんでした。", {
    x: r1TxtX, y: 1.7, w: r1TxtW, h: 0.65,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 18
});

slide5_new.addText("しかし、生成AIの登場により状況は一変。リサーチ・構成・執筆の各工程でAIを活用することで、制作時間とコストを大幅に削減できるようになりました。", {
    x: r1TxtX, y: 2.4, w: r1TxtW, h: 0.65,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 18
});

// Evidence box with visual
slide5_new.addShape(pres.ShapeType.roundRect, {
    x: r1TxtX, y: 3.15, w: r1TxtW, h: 1.15,
    fill: { color: "FAFAFA" }, line: { color: COLORS.line }, rectRadius: 0.08
});
slide5_new.addText("MIT研究結果", { x: r1TxtX, y: 3.2, w: r1TxtW, h: 0.25, align: "center", fontSize: 9, bold: true, color: COLORS.gold, fontFace: FONT_JP });
// Mini bar chart
slide5_new.addShape(pres.ShapeType.rect, { x: r1TxtX + 0.5, y: 3.85, w: 1.0, h: 0.35, fill: { color: "93C5FD" } });
slide5_new.addText("従来", { x: r1TxtX + 0.5, y: 3.55, w: 1.0, h: 0.25, align: "center", fontSize: 7, color: COLORS.textSub, fontFace: FONT_JP });
slide5_new.addShape(pres.ShapeType.rect, { x: r1TxtX + 1.8, y: 3.65, w: 1.6, h: 0.55, fill: { color: "3B82F6" } });
slide5_new.addText("+59%", { x: r1TxtX + 1.8, y: 3.55, w: 1.6, h: 0.25, align: "center", fontSize: 7, bold: true, color: COLORS.textSub, fontFace: FONT_JP });
slide5_new.addText("生産性59%向上・作業時間40%短縮", { x: r1TxtX + 3.6, y: 3.7, w: 2.0, h: 0.4, fontSize: 9, color: COLORS.textSub, fontFace: FONT_JP, lineSpacing: 12 });

// Conclusion
slide5_new.addShape(pres.ShapeType.rect, {
    x: 0.5, y: 4.45, w: 9.1, h: 0.45,
    fill: { color: COLORS.goldLight }, line: { width: 0 }
});
slide5_new.addText("コストが下がった今だからこそ、SEO対策を始めるチャンスです。", {
    x: 0.5, y: 4.45, w: 9.1, h: 0.45,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});

// ==========================================
// Slide 5-2: Why SEO Now? (Reason 2 - LLMO & Traffic)
// ==========================================
let slide5_2_new = pres.addSlide({ masterName: "MASTER_CLEAN" });

// Background "REASON"
slide5_2_new.addText("REASON", {
    x: 0.5, y: 0.2, w: 9, h: 1.5,
    fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black"
});

// Header
slide5_2_new.addText("なぜ今さらSEOなのか (2/3)", {
    x: 0.8, y: 0.6, w: 8, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

// Main Message
slide5_2_new.addText("SEOは、AI対策（LLMO）そのものである", {
    x: 0.5, y: 1.15, w: 9, h: 0.5,
    fontSize: 22, fontFace: FONT_JP, bold: true, color: COLORS.textMain, align: "center"
});

// Left side: Image (smaller)
slide5_2_new.addImage({
    path: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    x: 0.5, y: 1.7, w: 3.2, h: 1.6
});

// Left side: SEO = LLMO diagram
const diag2X = 0.5;
const diag2Y = 3.4;
// SEO circle
slide5_2_new.addShape(pres.ShapeType.ellipse, {
    x: diag2X, y: diag2Y, w: 1.4, h: 0.9,
    fill: { color: "DBEAFE" }, line: { color: "3B82F6", width: 2 }
});
slide5_2_new.addText("SEO", { x: diag2X, y: diag2Y + 0.25, w: 1.4, h: 0.4, align: "center", fontSize: 11, bold: true, color: "1D4ED8", fontFace: FONT_EN });
// Equals
slide5_2_new.addText("＝", { x: diag2X + 1.35, y: diag2Y + 0.25, w: 0.5, h: 0.4, align: "center", fontSize: 16, bold: true, color: COLORS.gold });
// LLMO circle
slide5_2_new.addShape(pres.ShapeType.ellipse, {
    x: diag2X + 1.8, y: diag2Y, w: 1.5, h: 0.9,
    fill: { color: "F3E8FF" }, line: { color: "9333EA", width: 2 }
});
slide5_2_new.addText("LLMO", { x: diag2X + 1.8, y: diag2Y + 0.25, w: 1.5, h: 0.4, align: "center", fontSize: 11, bold: true, color: "7C3AED", fontFace: FONT_EN });

// Right side: Text content
const t2X = 3.9;
const t2W = 5.7;

slide5_2_new.addText("「LLMO（Large Language Model Optimization）」とは、AIに自社コンテンツを参照・引用してもらうための最適化のことです。", {
    x: t2X, y: 1.7, w: t2W, h: 0.55,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 18
});

slide5_2_new.addText("しかし実は、Googleは公式に「SEOのベストプラクティスはAI機能でも有効。追加の特別最適化は不要」と明言しています。つまり、従来のSEO対策を行うことが、そのままAI時代の生存戦略になるのです。", {
    x: t2X, y: 2.3, w: t2W, h: 0.8,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 18
});

// Evidence box with visual
slide5_2_new.addShape(pres.ShapeType.roundRect, {
    x: t2X, y: 3.15, w: t2W, h: 1.15,
    fill: { color: "FAFAFA" }, line: { color: COLORS.line }, rectRadius: 0.08
});
slide5_2_new.addText("AIからの参照流入（Adobe分析）", { x: t2X, y: 3.2, w: t2W, h: 0.25, align: "center", fontSize: 9, bold: true, color: COLORS.gold, fontFace: FONT_JP });
// Growth arrow visual
slide5_2_new.addShape(pres.ShapeType.rect, { x: t2X + 0.4, y: 3.9, w: 0.5, h: 0.3, fill: { color: "93C5FD" } });
slide5_2_new.addText("1x", { x: t2X + 0.4, y: 3.6, w: 0.5, h: 0.25, align: "center", fontSize: 8, color: COLORS.textSub, fontFace: FONT_EN });
slide5_2_new.addText("→", { x: t2X + 1.0, y: 3.85, w: 0.4, h: 0.4, align: "center", fontSize: 14, color: COLORS.gold });
slide5_2_new.addShape(pres.ShapeType.rect, { x: t2X + 1.5, y: 3.5, w: 1.2, h: 0.7, fill: { color: "3B82F6" } });
slide5_2_new.addText("10x+", { x: t2X + 1.5, y: 3.6, w: 1.2, h: 0.5, align: "center", fontSize: 14, bold: true, color: "FFFFFF", fontFace: FONT_EN });
slide5_2_new.addText("米国でAI参照流入が\n10倍超に急成長", { x: t2X + 2.9, y: 3.6, w: 2.5, h: 0.5, fontSize: 9, color: COLORS.textSub, fontFace: FONT_JP, lineSpacing: 12 });

// Conclusion
slide5_2_new.addShape(pres.ShapeType.rect, {
    x: 0.5, y: 4.45, w: 9.1, h: 0.45,
    fill: { color: COLORS.goldLight }, line: { width: 0 }
});
slide5_2_new.addText("AI流入を獲得するためにも、今こそ「質の高いコンテンツ作成」が必要です。", {
    x: 0.5, y: 4.45, w: 9.1, h: 0.45,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});


// ==========================================
// Slide 6: Why SEO Now? (Reason 3 - Asset)
// ==========================================
let slide6_new = pres.addSlide({ masterName: "MASTER_CLEAN" });

// Stylish Background Number
slide6_new.addText("REASON", {
    x: 0.5, y: 0.2, w: 9, h: 1.5,
    fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black"
});

// Header
slide6_new.addText("なぜ今さらSEOなのか (3/3)", {
    x: 0.8, y: 0.6, w: 8, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

// Main Message
slide6_new.addText("AIが普及しても、SEO対策は今なお有効", {
    x: 0.5, y: 1.15, w: 9, h: 0.5,
    fontSize: 22, fontFace: FONT_JP, bold: true, color: COLORS.textMain, align: "center"
});

// Left side: Image (smaller)
slide6_new.addImage({
    path: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    x: 0.5, y: 1.7, w: 3.2, h: 1.6
});

// Left side: Market share pie chart style
const diag3X = 0.5;
const diag3Y = 3.4;
// Google share circle (90%)
slide6_new.addShape(pres.ShapeType.ellipse, {
    x: diag3X + 0.3, y: diag3Y, w: 1.3, h: 0.9,
    fill: { color: "DBEAFE" }, line: { color: "3B82F6", width: 2 }
});
slide6_new.addText("Google\n90%", { x: diag3X + 0.3, y: diag3Y + 0.15, w: 1.3, h: 0.6, align: "center", fontSize: 10, bold: true, color: "1D4ED8", fontFace: FONT_EN, lineSpacing: 12 });
// Other share
slide6_new.addShape(pres.ShapeType.ellipse, {
    x: diag3X + 1.8, y: diag3Y + 0.3, w: 0.7, h: 0.5,
    fill: { color: "E5E5E5" }, line: { color: "9CA3AF", width: 1 }
});
slide6_new.addText("他", { x: diag3X + 1.8, y: diag3Y + 0.4, w: 0.7, h: 0.3, align: "center", fontSize: 8, color: "6B7280", fontFace: FONT_JP });
// Label
slide6_new.addText("検索市場シェア", { x: diag3X, y: diag3Y - 0.25, w: 3.2, h: 0.25, align: "center", fontSize: 8, color: COLORS.textSub, fontFace: FONT_JP });

// Right side: Text content
const t3X = 3.9;
const t3W = 5.7;

slide6_new.addText("「AIの登場でSEOは終わった」という声もありますが、実際のデータは逆の結論を示しています。", {
    x: t3X, y: 1.7, w: t3W, h: 0.5,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 18
});

slide6_new.addText("2025年現在もGoogleは世界の検索市場で約90%のシェアを維持。オーガニック検索は依然として全体トラフィックの約33%を生み出しており、ビジネスの集客において最重要チャネルの一つです。", {
    x: t3X, y: 2.25, w: t3W, h: 0.85,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 18
});

// Evidence box with visual
slide6_new.addShape(pres.ShapeType.roundRect, {
    x: t3X, y: 3.15, w: t3W, h: 1.15,
    fill: { color: "FAFAFA" }, line: { color: COLORS.line }, rectRadius: 0.08
});
slide6_new.addText("Conductor調査（350人超）", { x: t3X, y: 3.2, w: t3W, h: 0.25, align: "center", fontSize: 9, bold: true, color: COLORS.gold, fontFace: FONT_JP });
// 91% bar visual
slide6_new.addShape(pres.ShapeType.roundRect, { x: t3X + 0.3, y: 3.55, w: 3.5, h: 0.6, fill: { color: "E5E5E5" }, line: { width: 0 }, rectRadius: 0.05 });
slide6_new.addShape(pres.ShapeType.roundRect, { x: t3X + 0.3, y: 3.55, w: 3.2, h: 0.6, fill: { color: "22C55E" }, line: { width: 0 }, rectRadius: 0.05 });
slide6_new.addText("91%", { x: t3X + 0.3, y: 3.55, w: 3.2, h: 0.6, align: "center", fontSize: 16, bold: true, color: "FFFFFF", fontFace: FONT_EN });
slide6_new.addText("「SEOはWebパフォーマンスに\nプラス影響」と回答", { x: t3X + 4.0, y: 3.55, w: 1.6, h: 0.6, fontSize: 8, color: COLORS.textSub, fontFace: FONT_JP, lineSpacing: 11 });

// Conclusion
slide6_new.addShape(pres.ShapeType.rect, {
    x: 0.5, y: 4.45, w: 9.1, h: 0.45,
    fill: { color: COLORS.goldLight }, line: { width: 0 }
});
slide6_new.addText("AI時代においても、検索エンジンからの集客はビジネスの根幹であり続けています。", {
    x: 0.5, y: 4.45, w: 9.1, h: 0.45,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});

// ==========================================
// Slide 7: What is LLMO?
// ==========================================
let slide7_new = pres.addSlide({ masterName: "MASTER_CLEAN" });

// Background "LLMO"
slide7_new.addText("LLMO", {
    x: 0.5, y: 0.2, w: 9, h: 1.5,
    fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black"
});

// Header
slide7_new.addText("SEOはAI対策も兼ねる", {
    x: 0.8, y: 0.6, w: 9, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

// Lead Text
slide7_new.addText("SEO対策は「どちらに転んでも勝ち」の構造を持っています。", {
    x: 0.8, y: 1.05, w: 8.5, h: 0.35,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain
});

// --- DIAGRAM ---
const s7_startY = 1.5;
const s7_centerX = 5.0;

// 1. TOP: SEO対策 (Starting Point)
const seoBoxW = 2.6;
const seoBoxH = 0.55;
slide7_new.addShape(pres.ShapeType.rect, {
    x: s7_centerX - seoBoxW / 2, y: s7_startY, w: seoBoxW, h: seoBoxH,
    fill: { color: COLORS.accent },
    shadow: { type: 'outer', color: '000000', blur: 6, offset: 2, opacity: 0.15 }
});
slide7_new.addText("SEO対策を行う", {
    x: s7_centerX - seoBoxW / 2, y: s7_startY + 0.12, w: seoBoxW, h: 0.35,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: "FFFFFF"
});

// Arrow down from SEO box
slide7_new.addShape(pres.ShapeType.line, {
    x: s7_centerX, y: s7_startY + seoBoxH, w: 0, h: 0.25,
    line: { color: COLORS.textSub, width: 2 }
});

// 2. BRANCH: 2つのシナリオ
const branchY = s7_startY + seoBoxH + 0.25;
const branchBoxW = 3.5;
const branchBoxH = 1.35;
const branchGap = 0.5;
const leftBranchX = s7_centerX - branchGap / 2 - branchBoxW;
const rightBranchX = s7_centerX + branchGap / 2;

// Horizontal line for branch
slide7_new.addShape(pres.ShapeType.line, {
    x: leftBranchX + branchBoxW / 2, y: branchY, w: branchGap + branchBoxW, h: 0,
    line: { color: COLORS.textSub, width: 2 }
});

// Left arrow down
slide7_new.addShape(pres.ShapeType.line, {
    x: leftBranchX + branchBoxW / 2, y: branchY, w: 0, h: 0.2,
    line: { color: COLORS.textSub, width: 2, endArrowType: "triangle" }
});
// Right arrow down
slide7_new.addShape(pres.ShapeType.line, {
    x: rightBranchX + branchBoxW / 2, y: branchY, w: 0, h: 0.2,
    line: { color: COLORS.textSub, width: 2, endArrowType: "triangle" }
});

// LEFT BRANCH: 上位表示できた場合
const leftBoxY = branchY + 0.2;
slide7_new.addShape(pres.ShapeType.roundRect, {
    x: leftBranchX, y: leftBoxY, w: branchBoxW, h: branchBoxH,
    fill: { color: "FFFFFF" }, line: { color: "3B82F6", width: 2 },
    rectRadius: 0.12
});
slide7_new.addText("上位表示できた場合", {
    x: leftBranchX, y: leftBoxY + 0.1, w: branchBoxW, h: 0.3,
    align: "center", fontSize: 13, fontFace: FONT_JP, bold: true, color: "3B82F6"
});
slide7_new.addShape(pres.ShapeType.line, {
    x: leftBranchX + 0.3, y: leftBoxY + 0.42, w: branchBoxW - 0.6, h: 0,
    line: { color: "E5E7EB", width: 1 }
});
slide7_new.addText("Google / Yahoo 検索結果に表示", {
    x: leftBranchX + 0.15, y: leftBoxY + 0.5, w: branchBoxW - 0.3, h: 0.25,
    align: "center", fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub
});
slide7_new.addText("検索流入を獲得", {
    x: leftBranchX + 0.15, y: leftBoxY + 0.85, w: branchBoxW - 0.3, h: 0.3,
    align: "center", fontSize: 13, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});

// RIGHT BRANCH: 上位表示できなくても
const rightBoxY = branchY + 0.2;
slide7_new.addShape(pres.ShapeType.roundRect, {
    x: rightBranchX, y: rightBoxY, w: branchBoxW, h: branchBoxH,
    fill: { color: "FFFFFF" }, line: { color: COLORS.gold, width: 2 },
    rectRadius: 0.12
});
slide7_new.addText("上位表示できなくても", {
    x: rightBranchX, y: rightBoxY + 0.1, w: branchBoxW, h: 0.3,
    align: "center", fontSize: 13, fontFace: FONT_JP, bold: true, color: COLORS.gold
});
slide7_new.addShape(pres.ShapeType.line, {
    x: rightBranchX + 0.3, y: rightBoxY + 0.42, w: branchBoxW - 0.6, h: 0,
    line: { color: "E5E7EB", width: 1 }
});
slide7_new.addText("AIの学習データとして蓄積", {
    x: rightBranchX + 0.15, y: rightBoxY + 0.5, w: branchBoxW - 0.3, h: 0.25,
    align: "center", fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub
});
slide7_new.addText("AI経由で引用・流入", {
    x: rightBranchX + 0.15, y: rightBoxY + 0.85, w: branchBoxW - 0.3, h: 0.3,
    align: "center", fontSize: 13, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});

// 3. WIN BADGES
const winBadgeY = leftBoxY + branchBoxH + 0.1;
const winBadgeW = 1.0;
const winBadgeH = 0.32;

// Left Win
slide7_new.addShape(pres.ShapeType.roundRect, {
    x: leftBranchX + branchBoxW / 2 - winBadgeW / 2, y: winBadgeY, w: winBadgeW, h: winBadgeH,
    fill: { color: "3B82F6" }, rectRadius: 0.08
});
slide7_new.addText("WIN", {
    x: leftBranchX + branchBoxW / 2 - winBadgeW / 2, y: winBadgeY + 0.04, w: winBadgeW, h: 0.24,
    align: "center", fontSize: 12, fontFace: FONT_EN, bold: true, color: "FFFFFF"
});

// Right Win
slide7_new.addShape(pres.ShapeType.roundRect, {
    x: rightBranchX + branchBoxW / 2 - winBadgeW / 2, y: winBadgeY, w: winBadgeW, h: winBadgeH,
    fill: { color: COLORS.gold }, rectRadius: 0.08
});
slide7_new.addText("WIN", {
    x: rightBranchX + branchBoxW / 2 - winBadgeW / 2, y: winBadgeY + 0.04, w: winBadgeW, h: 0.24,
    align: "center", fontSize: 12, fontFace: FONT_EN, bold: true, color: "FFFFFF"
});

// 4. Arrows converging to conclusion
const convY = winBadgeY + winBadgeH + 0.08;
slide7_new.addShape(pres.ShapeType.line, {
    x: leftBranchX + branchBoxW / 2, y: convY, w: 0, h: 0.18,
    line: { color: COLORS.textSub, width: 2 }
});
slide7_new.addShape(pres.ShapeType.line, {
    x: rightBranchX + branchBoxW / 2, y: convY, w: 0, h: 0.18,
    line: { color: COLORS.textSub, width: 2 }
});
// Horizontal converge
slide7_new.addShape(pres.ShapeType.line, {
    x: leftBranchX + branchBoxW / 2, y: convY + 0.18, w: branchGap + branchBoxW, h: 0,
    line: { color: COLORS.textSub, width: 2 }
});
// Final arrow down
slide7_new.addShape(pres.ShapeType.line, {
    x: s7_centerX, y: convY + 0.18, w: 0, h: 0.18,
    line: { color: COLORS.textSub, width: 2, endArrowType: "triangle" }
});

// 5. CONCLUSION BOX
const conclusionY = convY + 0.36;
const conclusionW = 5.5;
const conclusionH = 0.55;
slide7_new.addShape(pres.ShapeType.roundRect, {
    x: s7_centerX - conclusionW / 2, y: conclusionY, w: conclusionW, h: conclusionH,
    fill: { color: "FFFBEB" }, line: { color: COLORS.gold, width: 2 },
    rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', blur: 8, offset: 3, opacity: 0.1 }
});
slide7_new.addText("だから、SEO対策は今も有効な投資である", {
    x: s7_centerX - conclusionW / 2, y: conclusionY + 0.12, w: conclusionW, h: 0.35,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.accent
});





// ==========================================
// Slide 5: Issues (Market & Issues)
// ==========================================
addSectionSlide(pres, "02", "MARKET & ISSUES", "Market Environment");
let slide5 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide5.addText("ISSUES", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide5.addText("従来のSEOの課題", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

// Layout: Left (Text), Right (Visual Column)

// Left Side Content
const leftY = 1.5;
slide5.addText("多くの企業が直面する「不確実性」", {
    x: 0.8, y: leftY, w: 5, h: 0.4,
    fontSize: 16, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});
slide5.addShape(pres.ShapeType.line, {
    x: 0.8, y: leftY + 0.5, w: 4.5, h: 0, line: { color: COLORS.line, width: 1 }
});

// Point 1
slide5.addText("01. アルゴリズムは「ブラックボックス」", {
    x: 0.8, y: leftY + 0.8, w: 5, h: 0.3,
    fontSize: 12, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});
slide5.addText("Googleの評価基準は非公開かつ頻繁に変動するため、\n「正解」が見えない中での終わりのない戦いです。", {
    x: 0.8, y: leftY + 1.1, w: 5, h: 0.6,
    fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 14
});

// Point 2
slide5.addText("02. 投資対効果（ROI）が見えない", {
    x: 0.8, y: leftY + 1.9, w: 5, h: 0.3,
    fontSize: 12, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});
slide5.addText("コストを投じても、成果が出る保証はどこにもありません。\n多額の予算が「無駄金」になるリスクと隣り合わせです。", {
    x: 0.8, y: leftY + 2.2, w: 5, h: 0.6,
    fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 14
});

// Conclusion Message
slide5.addText("「本気で取り組んだとしても、\n 恩恵を受けられるのは ごく一部 だけ。」", {
    x: 0.8, y: leftY + 3.2, w: 5, h: 0.8,
    fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.accent, lineSpacing: 20
});


// Right Side: Stylish Visual Column
slide5.addShape(pres.ShapeType.rect, {
    x: 6.5, y: 0, w: 3.5, h: 5.625,
    fill: { color: "FAFAFA" } // Gray column
});

// Minimal Image
slide5.addImage({
    path: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    x: 7.0, y: 1.0, w: 2.5, h: 2.5, // Square-ish
});

// The "6.1%" Stat - Stylish Overlay
slide5.addText("Success Rate", {
    x: 6.5, y: 3.6, w: 3.5, h: 0.3,
    align: "center", fontFace: FONT_EN, fontSize: 10, color: COLORS.textSub, charSpacing: 2
});

slide5.addText("6.1%", {
    x: 6.5, y: 3.8, w: 3.5, h: 1.0,
    align: "center", fontFace: "Arial Black", fontSize: 60, color: COLORS.gold
});

slide5.addText("1年以内にTOP10入りする確率\n(Source: Ahrefs Study)", {
    x: 6.5, y: 4.8, w: 3.5, h: 0.6,
    align: "center", fontFace: FONT_JP, fontSize: 9, color: COLORS.textMain, lineSpacing: 12
});


// ==========================================
// Slide 6: Our Features (Comparison)
// ==========================================
addSectionSlide(pres, "03", "THE SCHEME", "Our Solution");
let slide6 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide6.addText("FEATURES", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide6.addText("当社のSEO対策の特徴", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

const compY = 1.3;
const compH = 3.5;

// -- Left Column: Conventional SEO --
slide6.addShape(pres.ShapeType.rect, {
    x: 0.8, y: compY, w: 3.8, h: compH,
    fill: { color: "FAFAFA" }, line: { color: COLORS.line, width: 1 }
});

slide6.addText("一般的なSEO対策", {
    x: 0.8, y: compY + 0.2, w: 3.8, h: 0.4,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.textSub
});

// Row 1
slide6.addText("費用体系", {
    x: 1.0, y: compY + 0.8, w: 3.4, h: 0.2,
    fontSize: 10, color: COLORS.textSub, fontFace: FONT_JP
});
slide6.addText("月額固定費", {
    x: 1.0, y: compY + 1.0, w: 3.4, h: 0.4,
    fontSize: 18, bold: true, color: COLORS.textMain, fontFace: FONT_JP
});
slide6.addText("(成果に関わらず毎月発生)", {
    x: 1.0, y: compY + 1.4, w: 3.4, h: 0.2,
    fontSize: 10, color: COLORS.textSub, fontFace: FONT_JP
});

// Row 2
slide6.addShape(pres.ShapeType.line, {
    x: 1.0, y: compY + 1.8, w: 3.4, h: 0, line: { color: "E5E5E5", width: 1 }
});
slide6.addText("リスク", {
    x: 1.0, y: compY + 2.0, w: 3.4, h: 0.2,
    fontSize: 10, color: COLORS.textSub, fontFace: FONT_JP
});
slide6.addText("「掛け捨て」のリスク", {
    x: 1.0, y: compY + 2.2, w: 3.4, h: 0.4,
    fontSize: 16, bold: true, color: COLORS.textMain, fontFace: FONT_JP
});
slide6.addText("上位表示されなくても返金なし", {
    x: 1.0, y: compY + 2.6, w: 3.4, h: 0.2,
    fontSize: 10, color: COLORS.textSub, fontFace: FONT_JP
});


// -- Right Column: Our SEO (0 Yen SEO) --
slide6.addShape(pres.ShapeType.rect, {
    x: 4.8, y: compY, w: 4.4, h: compH,
    fill: { color: "FFFFFF" }, line: { color: COLORS.gold, width: 3 } // Gold Border Highlight
});

slide6.addText("当社のSEO対策 (0円SEO)", {
    x: 4.8, y: compY + 0.2, w: 4.4, h: 0.4,
    align: "center", fontSize: 16, fontFace: FONT_JP, bold: true, color: COLORS.accent
});

// Badge
slide6.addShape(pres.ShapeType.rect, {
    x: 8.0, y: compY - 0.2, w: 1.2, h: 0.4,
    fill: { color: COLORS.accent }
});
slide6.addText("RECOMMENDED", {
    x: 8.0, y: compY - 0.2, w: 1.2, h: 0.4,
    align: "center", fontSize: 8, color: "FFFFFF", fontFace: FONT_EN, bold: true
});

// Row 1
slide6.addText("費用体系", {
    x: 5.2, y: compY + 0.8, w: 3.6, h: 0.2,
    fontSize: 10, color: COLORS.textMain, fontFace: FONT_JP
});
slide6.addText("完全成果報酬型", {
    x: 5.2, y: compY + 1.0, w: 3.6, h: 0.4,
    fontSize: 24, bold: true, color: COLORS.gold, fontFace: FONT_JP
});
slide6.addText("(上位表示されるまで0円)", {
    x: 5.2, y: compY + 1.4, w: 3.6, h: 0.2,
    fontSize: 10, color: COLORS.textMain, fontFace: FONT_JP
});

// Row 2
slide6.addShape(pres.ShapeType.line, {
    x: 5.2, y: compY + 1.8, w: 3.6, h: 0, line: { color: COLORS.goldLight, width: 1 }
});
slide6.addText("リスク", {
    x: 5.2, y: compY + 2.0, w: 3.6, h: 0.2,
    fontSize: 10, color: COLORS.textMain, fontFace: FONT_JP
});
slide6.addText("リスク「ゼロ」", {
    x: 5.2, y: compY + 2.2, w: 3.6, h: 0.4,
    fontSize: 20, bold: true, color: COLORS.accent, fontFace: FONT_JP
});
slide6.addText("成果が出なければ全額返金", {
    x: 5.2, y: compY + 2.6, w: 3.6, h: 0.2,
    fontSize: 12, bold: true, color: COLORS.textMain, fontFace: FONT_JP
});
slide6.addText("※6ヶ月満了時判定。途中解約は対象外", {
    x: 5.2, y: compY + 2.85, w: 3.6, h: 0.15,
    fontSize: 8, color: COLORS.textSub, fontFace: FONT_JP
});

// Center Arrow
slide6.addShape(pres.ShapeType.line, {
    x: 4.6, y: 2.5, w: 0.4, h: 0,
    line: { color: COLORS.textSub, width: 1, endArrowType: "triangle" } // Not perfectly centered but implies shift
});


// ==========================================
// Slide 7: Mechanism Part 1 (Steps 1 & 2)
// ==========================================
// ==========================================
// Slide 7-1: Mechanism STEP 1
// ==========================================
let slide7_1 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide7_1.addText("SCHEME", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide7_1.addText("0円SEOのしくみ (1/3)", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

slide7_1.addText("最初に予算をお預かりしますが、成果が出なければ全額お返しします。", {
    x: 0.8, y: 1.1, w: 8, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain
});

// STEP 1: Deposit (2-Column Layout)
const step1Y = 1.8;
const leftColW = 4.0; // Reduced width
const rightColX = 0.8 + leftColW + 0.4; // Adjusted gap

// Left: Deposit Box
slide7_1.addShape(pres.ShapeType.rect, {
    x: 0.8, y: step1Y, w: leftColW, h: 3.5,
    fill: { color: "FFFFFF" }, line: { color: COLORS.gold, width: 4 },
    shadow: { type: 'outer', color: '000000', blur: 5, offset: 3, opacity: 0.1 }
});

slide7_1.addShape(pres.ShapeType.rect, { x: 0.8, y: step1Y, w: leftColW, h: 0.6, fill: { color: COLORS.gold } });
slide7_1.addText("STEP 1", { x: 0.8, y: step1Y + 0.1, w: leftColW, h: 0.4, align: "center", fontSize: 16, bold: true, color: "FFFFFF", fontFace: FONT_EN });

slide7_1.addText("預り金", { x: 0.8, y: step1Y + 0.8, w: leftColW, h: 0.3, align: "center", fontSize: 14, color: COLORS.textMain, fontFace: FONT_JP, bold: true });
// 100 with more width
slide7_1.addText("100", { x: 0.8, y: step1Y + 1.1, w: 2.8, h: 1.0, align: "right", fontSize: 80, bold: true, color: COLORS.textMain, fontFace: FONT_EN });
slide7_1.addText("万円", { x: 3.6, y: step1Y + 1.6, w: 1.0, h: 0.4, fontSize: 24, bold: true, color: COLORS.textMain, fontFace: FONT_JP });

slide7_1.addShape(pres.ShapeType.line, { x: 1.0, y: step1Y + 2.4, w: 3.6, h: 0, line: { color: COLORS.line } });
slide7_1.addText("制作本数: 24本 / 半年", { x: 0.8, y: step1Y + 2.7, w: leftColW, h: 0.4, align: "center", fontSize: 16, bold: true, color: COLORS.textMain, fontFace: FONT_JP });

// Right: Budget Text
slide7_1.addText("ご予算に応じた調整も可能です", {
    x: rightColX, y: step1Y + 0.2, w: 4.2, h: 0.4,
    fontSize: 20, fontFace: FONT_JP, bold: true, color: COLORS.accent
});

slide7_1.addShape(pres.ShapeType.line, { x: rightColX, y: step1Y + 0.7, w: 4.0, h: 0, line: { color: COLORS.gold, width: 2 } });

slide7_1.addText("基本プランは100万円（24記事）ですが、\n企業の規模やご予算に合わせて柔軟に調整いたします。", {
    x: rightColX, y: step1Y + 1.0, w: 4.2, h: 1.0,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 20
});

// Examples
slide7_1.addShape(pres.ShapeType.rect, { x: rightColX, y: step1Y + 2.2, w: 4.2, h: 1.2, fill: { color: "F8F8F8" }, line: { color: COLORS.line } });
slide7_1.addText("プラン調整例", { x: rightColX + 0.1, y: step1Y + 2.3, w: 2.0, h: 0.2, fontSize: 10, bold: true, color: COLORS.textSub, fontFace: FONT_JP });

slide7_1.addText("• スモール: 50万円（12記事）\n• ラージ: 200万円（48記事）\n※全額返金保証は6ヶ月満了時判定（途中解約は対象外）", {
    x: rightColX + 0.2, y: step1Y + 2.6, w: 4.0, h: 0.8,
    fontSize: 12, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 18
});




// ==========================================
// Slide 7-2: Mechanism STEP 2
// ==========================================
let slide7_2 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide7_2.addText("SCHEME", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide7_2.addText("0円SEOのしくみ (2/3)", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

slide7_2.addText("半年間、記事制作を代行します", {
    x: 0.8, y: 1.1, w: 8, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain
});

const contentY = 1.8;

// Left: Client Flexibility
slide7_2.addShape(pres.ShapeType.rect, {
    x: 0.8, y: contentY, w: 4.0, h: 3.5,
    fill: { color: "FAFAFA" }, line: { color: COLORS.line }
});
slide7_2.addText("Client", { x: 0.8, y: contentY + 0.2, w: 4.0, h: 0.3, align: "center", fontSize: 16, bold: true, color: COLORS.textSub, fontFace: FONT_EN });
slide7_2.addText("すべてのステップで、\n柔軟な対応が可能です。", {
    x: 1.0, y: contentY + 0.6, w: 3.6, h: 0.6,
    fontSize: 14, bold: true, color: COLORS.accent, fontFace: FONT_JP
});
slide7_2.addText("例えば、キーワードは貴社で\n選んで頂いても問題ありません。", {
    x: 1.0, y: contentY + 1.3, w: 3.6, h: 0.6,
    fontSize: 12, color: COLORS.textMain, fontFace: FONT_JP
});
slide7_2.addText("また、貴社のフォーマットに従って\n納品することもできます。", {
    x: 1.0, y: contentY + 2.0, w: 3.6, h: 0.6,
    fontSize: 12, color: COLORS.textMain, fontFace: FONT_JP
});


// Right: Flow
const flowX = 5.2;
const flowW = 4.0;

slide7_2.addText("Flow", { x: flowX, y: contentY, w: flowW, h: 0.3, align: "center", fontSize: 16, bold: true, color: COLORS.gold, fontFace: FONT_EN });
slide7_2.addShape(pres.ShapeType.line, { x: flowX, y: contentY + 0.4, w: flowW, h: 0, line: { color: COLORS.gold, width: 2 } });

slide7_2.addText("4,000字 / 月4本 × 6ヶ月", {
    x: flowX, y: contentY + 0.5, w: flowW, h: 0.4,
    align: "center", fontSize: 16, bold: true, color: COLORS.textMain, fontFace: FONT_JP
});

// Flow Steps (Vertical)
const stepH = 0.5;
const stepGap = 0.2;
const startY = contentY + 1.0;

const steps = ["キーワード選定", "構成案作成", "本文作成", "納品"];

steps.forEach((step, index) => {
    let yPos = startY + (index * (stepH + stepGap));

    // Box
    slide7_2.addShape(pres.ShapeType.rect, {
        x: flowX + 0.5, y: yPos, w: 3.0, h: stepH,
        fill: { color: "FFFFFF" }, line: { color: COLORS.line }
    });
    // Text
    slide7_2.addText(step, {
        x: flowX + 0.5, y: yPos, w: 3.0, h: stepH,
        align: "center", fontSize: 12, bold: true, color: COLORS.textMain, fontFace: FONT_JP
    });

    // Arrow (except last)
    if (index < steps.length - 1) {
        slide7_2.addShape(pres.ShapeType.line, {
            x: flowX + 2.0, y: yPos + stepH, w: 0, h: stepGap,
            line: { color: COLORS.textSub, width: 1, endArrowType: "triangle" }
        });
    }
});


// ==========================================
// Slide 8: Mechanism Part 2 (Step 3: Settlement)
// ==========================================
let slide8 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide8.addText("SIMULATION", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 80, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide8.addText("0円SEOのしくみ (3/3)", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});
slide8.addText("成果の有無で、対応が分かれます", {
    x: 0.8, y: 1.1, w: 8, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain
});
slide8.addText("※6ヶ月満了時判定。途中解約は返金保証対象外", {
    x: 0.8, y: 1.4, w: 8, h: 0.2,
    fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub
});

const patY = 1.7;
const patW = 2.7;
const gap = 0.2;
const patH = 3.5;

// Pattern A
slide8.addShape(pres.ShapeType.rect, {
    x: 0.8, y: patY, w: patW, h: patH,
    fill: { color: "F0FDF4" }, line: { color: "10B981", width: 2 } // Greenish for Success
});
slide8.addText("パターン A", { x: 0.8, y: patY + 0.2, w: patW, h: 0.3, align: "center", fontSize: 12, bold: true, color: "10B981" });
slide8.addText("全記事上位表示", { x: 0.8, y: patY + 0.5, w: patW, h: 0.4, align: "center", fontSize: 16, bold: true, color: COLORS.textMain });
// Calc
slide8.addText("預かり金: 100万円", { x: 1.0, y: patY + 1.2, w: patW - 0.4, h: 0.3, fontSize: 10, color: COLORS.textMain });
slide8.addText("成果報酬: -100万円", { x: 1.0, y: patY + 1.5, w: patW - 0.4, h: 0.3, fontSize: 10, color: "10B981", bold: true });
slide8.addShape(pres.ShapeType.line, { x: 1.0, y: patY + 1.9, w: patW - 0.4, h: 0, line: { color: COLORS.line } });
slide8.addText("返金額", { x: 1.0, y: patY + 2.1, w: patW - 0.4, h: 0.3, fontSize: 10, color: COLORS.textMain });
slide8.addText("0円", { x: 1.0, y: patY + 2.4, w: patW - 0.4, h: 0.5, align: "center", fontSize: 24, bold: true, color: COLORS.textMain });
slide8.addText("※上限＝預り金", { x: 0.8, y: patY + 3.1, w: patW, h: 0.3, align: "center", fontSize: 9, color: COLORS.textSub });


// Pattern B
slide8.addShape(pres.ShapeType.rect, {
    x: 0.8 + patW + gap, y: patY, w: patW, h: patH,
    fill: { color: "FFFFFF" }, line: { color: COLORS.line, width: 1 }
});
slide8.addText("パターン B", { x: 0.8 + patW + gap, y: patY + 0.2, w: patW, h: 0.3, align: "center", fontSize: 12, bold: true, color: COLORS.textSub });
slide8.addText("10記事上位表示", { x: 0.8 + patW + gap, y: patY + 0.5, w: patW, h: 0.4, align: "center", fontSize: 16, bold: true, color: COLORS.textMain });
// Calc
slide8.addText("預かり金: 100万円", { x: 1.0 + patW + gap, y: patY + 1.2, w: patW - 0.4, h: 0.3, fontSize: 10, color: COLORS.textMain });
slide8.addText("成果報酬: -42万円", { x: 1.0 + patW + gap, y: patY + 1.5, w: patW - 0.4, h: 0.3, fontSize: 10, color: COLORS.textMain, bold: true });
slide8.addShape(pres.ShapeType.line, { x: 1.0 + patW + gap, y: patY + 1.9, w: patW - 0.4, h: 0, line: { color: COLORS.line } });
slide8.addText("返金額", { x: 1.0 + patW + gap, y: patY + 2.1, w: patW - 0.4, h: 0.3, fontSize: 10, color: COLORS.textMain });
slide8.addText("58万円", { x: 1.0 + patW + gap, y: patY + 2.4, w: patW - 0.4, h: 0.5, align: "center", fontSize: 24, bold: true, color: COLORS.textMain });
slide8.addText("※@4.2万円 × 10本", { x: 0.8 + patW + gap, y: patY + 3.1, w: patW, h: 0.3, align: "center", fontSize: 9, color: COLORS.textSub });


// Pattern C
slide8.addShape(pres.ShapeType.rect, {
    x: 0.8 + (patW * 2) + (gap * 2), y: patY, w: patW, h: patH,
    fill: { color: "FFFBEB" }, line: { color: COLORS.gold, width: 2 } // Gold/Yellow for Attention/Refund
});
slide8.addText("パターン C", { x: 0.8 + (patW * 2) + (gap * 2), y: patY + 0.2, w: patW, h: 0.3, align: "center", fontSize: 12, bold: true, color: COLORS.gold });
slide8.addText("順位が上がらない", { x: 0.8 + (patW * 2) + (gap * 2), y: patY + 0.5, w: patW, h: 0.4, align: "center", fontSize: 16, bold: true, color: COLORS.textMain });
// Calc
slide8.addText("預かり金: 100万円", { x: 1.0 + (patW * 2) + (gap * 2), y: patY + 1.2, w: patW - 0.4, h: 0.3, fontSize: 10, color: COLORS.textMain });
slide8.addText("成果報酬: 0円", { x: 1.0 + (patW * 2) + (gap * 2), y: patY + 1.5, w: patW - 0.4, h: 0.3, fontSize: 10, color: COLORS.gold, bold: true });
slide8.addShape(pres.ShapeType.line, { x: 1.0 + (patW * 2) + (gap * 2), y: patY + 1.9, w: patW - 0.4, h: 0, line: { color: COLORS.gold } });
slide8.addText("返金額", { x: 1.0 + (patW * 2) + (gap * 2), y: patY + 2.1, w: patW - 0.4, h: 0.3, fontSize: 10, color: COLORS.textMain });
slide8.addText("100万円", { x: 1.0 + (patW * 2) + (gap * 2), y: patY + 2.4, w: patW - 0.4, h: 0.5, align: "center", fontSize: 24, bold: true, color: COLORS.gold });
slide8.addText("全額お返しします", { x: 0.8 + (patW * 2) + (gap * 2), y: patY + 3.1, w: patW, h: 0.3, align: "center", fontSize: 10, bold: true, color: COLORS.textMain });


// ==========================================
// Slide 9: Why it works (Cost Revolution)
// ==========================================
let slide9 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide9.addText("COST", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide9.addText("0円SEOが成立する理由", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

slide9.addText("AIの登場によって、SEOの実務的な部分はコストがほとんどかからなくなっています。", {
    x: 0.8, y: 1.1, w: 8, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain
});

const costY = 1.6;
const costW = 3.6;
const costH = 3.5;

// -- Before AI --
slide9.addShape(pres.ShapeType.rect, {
    x: 0.8, y: costY, w: costW, h: costH,
    fill: { color: "FAFAFA" }, line: { color: COLORS.line, width: 1 }
});
slide9.addText("AIが登場する前", { x: 0.8, y: costY + 0.2, w: costW, h: 0.3, align: "center", fontSize: 12, bold: true, color: COLORS.textSub, fontFace: FONT_JP });
slide9.addText("すべて手作業", { x: 0.8, y: costY + 0.5, w: costW, h: 0.4, align: "center", fontSize: 18, bold: true, color: COLORS.textSub, fontFace: FONT_JP });

// Data Before
slide9.addText("制作期間: 1ヶ月", { x: 1.0, y: costY + 1.5, w: costW - 0.4, h: 0.3, fontSize: 14, color: COLORS.textSub, fontFace: FONT_JP });
slide9.addShape(pres.ShapeType.line, { x: 1.0, y: costY + 1.9, w: costW - 0.4, h: 0, line: { color: COLORS.line } });
slide9.addText("1記事コスト", { x: 1.0, y: costY + 2.1, w: costW - 0.4, h: 0.3, fontSize: 10, color: COLORS.textSub, fontFace: FONT_JP });
slide9.addText("50,000円", { x: 1.0, y: costY + 2.4, w: costW - 0.4, h: 0.4, fontSize: 24, bold: true, color: COLORS.textSub, fontFace: FONT_JP });


// -- After AI (NOW) --
slide9.addShape(pres.ShapeType.rect, {
    x: 5.4, y: costY, w: costW, h: costH,
    fill: { color: "EFF6FF" }, line: { color: "3B82F6", width: 2 } // Blue for Tech/AI
});
slide9.addText("NOW (AIの登場)", { x: 5.4, y: costY + 0.2, w: costW, h: 0.3, align: "center", fontSize: 12, bold: true, color: "3B82F6", fontFace: FONT_JP });
slide9.addText("コストが 1/10,000 に", { x: 5.4, y: costY + 0.5, w: costW, h: 0.4, align: "center", fontSize: 18, bold: true, color: "3B82F6", fontFace: FONT_JP });

// Data After
slide9.addText("制作期間: 30秒", { x: 5.6, y: costY + 1.5, w: costW - 0.4, h: 0.3, fontSize: 14, color: COLORS.textMain, fontFace: FONT_JP, bold: true });
slide9.addShape(pres.ShapeType.line, { x: 5.6, y: costY + 1.9, w: costW - 0.4, h: 0, line: { color: "93C5FD" } });
slide9.addText("1記事コスト", { x: 5.6, y: costY + 2.1, w: costW - 0.4, h: 0.3, fontSize: 10, color: COLORS.textMain, fontFace: FONT_JP });
slide9.addText("5円", { x: 5.6, y: costY + 2.4, w: costW - 0.4, h: 0.4, fontSize: 36, bold: true, color: "3B82F6", fontFace: FONT_JP });


// Arrow
slide9.addShape(pres.ShapeType.line, {
    x: 4.6, y: 3.3, w: 0.6, h: 0,
    line: { color: COLORS.textSub, width: 2, endArrowType: "triangle" }
});


// ==========================================
// Slide 10: Quality Assurance (Hybrid)
// ==========================================
addSectionSlide(pres, "04", "DIFFERENTIATION", "Quality Assurance");
let slide10 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide10.addText("QUALITY", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide10.addText("だからといって、AI任せにはしません。", {
    x: 0.8, y: 0.6, w: 8, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

// --- LEFT: Text Content ---
const s10TextW = 5.2;

// Strong Message Layout
slide10.addText("「速い・安い」だけでは、SEOで勝つことはできません。", {
    x: 0.8, y: 1.4, w: s10TextW, h: 0.45,
    fontSize: 16, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});

slide10.addText("AIは「平均点」を出すのは得意ですが、「独自性」を生み出すのは苦手です。\nしかし、現在のGoogle検索アルゴリズム（E-E-A-T）が最も重視するのは、\nまさにその「独自性（Experience / Expertise）」なのです。", {
    x: 0.8, y: 1.95, w: s10TextW, h: 1.2,
    fontSize: 12, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 20
});

slide10.addShape(pres.ShapeType.line, { x: 0.8, y: 3.3, w: s10TextW, h: 0, line: { color: COLORS.gold, width: 2 } });
slide10.addText("私たちは、AIの効率性と、人間の専門性を融合させることで、\n「品質」と「コスト」という、本来矛盾する2つの要素を両立させました。", {
    x: 0.8, y: 3.5, w: s10TextW, h: 0.9,
    fontSize: 12, fontFace: FONT_JP, bold: true, color: COLORS.accent, lineSpacing: 20
});

// --- RIGHT: 積み上げ比較図 ---
const s10compX = 6.1;
const s10boxW = 1.4;
const s10boxGap = 0.5;
const s10baseLineY = 4.6;

// ベースライン
slide10.addShape(pres.ShapeType.line, {
    x: s10compX - 0.3, y: s10baseLineY, w: s10boxW * 2 + s10boxGap + 0.6, h: 0,
    line: { color: COLORS.line, width: 2 }
});

// --- 左: 競合/AI Only ---
const s10leftX = s10compX;
const s10aiOnlyH = 1.8;
const s10aiOnlyY = s10baseLineY - s10aiOnlyH;

// AIボックス（グレー）
slide10.addShape(pres.ShapeType.rect, {
    x: s10leftX, y: s10aiOnlyY, w: s10boxW, h: s10aiOnlyH,
    fill: { color: "E5E7EB" }, line: { color: "9CA3AF", width: 2 }
});
slide10.addText("AI", {
    x: s10leftX, y: s10aiOnlyY + 0.5, w: s10boxW, h: 0.4,
    align: "center", fontSize: 16, fontFace: FONT_EN, bold: true, color: "6B7280"
});
slide10.addText("平均点", {
    x: s10leftX, y: s10aiOnlyY + 1.0, w: s10boxW, h: 0.3,
    align: "center", fontSize: 11, fontFace: FONT_JP, color: "6B7280"
});

// ラベル
slide10.addText("競合", {
    x: s10leftX, y: s10baseLineY + 0.15, w: s10boxW, h: 0.3,
    align: "center", fontSize: 11, fontFace: FONT_JP, bold: true, color: COLORS.textSub
});

// 結果（グレー）
slide10.addText("→ 埋もれる", {
    x: s10leftX - 0.2, y: s10aiOnlyY - 0.4, w: s10boxW + 0.4, h: 0.3,
    align: "center", fontSize: 10, fontFace: FONT_JP, color: "9CA3AF"
});

// --- 右: 当社 ---
const s10rightX = s10leftX + s10boxW + s10boxGap;
const s10humanH = 1.2;
const s10aiH = 1.8;
const s10totalH = s10humanH + s10aiH;
const s10rightTopY = s10baseLineY - s10totalH;

// AIボックス（青）
slide10.addShape(pres.ShapeType.rect, {
    x: s10rightX, y: s10baseLineY - s10aiH, w: s10boxW, h: s10aiH,
    fill: { color: "EFF6FF" }, line: { color: "3B82F6", width: 2 }
});
slide10.addText("AI", {
    x: s10rightX, y: s10baseLineY - s10aiH + 0.5, w: s10boxW, h: 0.4,
    align: "center", fontSize: 16, fontFace: FONT_EN, bold: true, color: "3B82F6"
});
slide10.addText("効率", {
    x: s10rightX, y: s10baseLineY - s10aiH + 1.0, w: s10boxW, h: 0.3,
    align: "center", fontSize: 11, fontFace: FONT_JP, color: "3B82F6"
});

// 人間ボックス（ゴールド）- 上に乗る
slide10.addShape(pres.ShapeType.rect, {
    x: s10rightX, y: s10rightTopY, w: s10boxW, h: s10humanH,
    fill: { color: "FFFBEB" }, line: { color: COLORS.gold, width: 3 },
    shadow: { type: 'outer', color: '000000', blur: 8, offset: 3, opacity: 0.15 }
});
slide10.addText("人間", {
    x: s10rightX, y: s10rightTopY + 0.25, w: s10boxW, h: 0.35,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.gold
});
slide10.addText("独自性", {
    x: s10rightX, y: s10rightTopY + 0.65, w: s10boxW, h: 0.3,
    align: "center", fontSize: 11, fontFace: FONT_JP, color: COLORS.gold
});

// ラベル
slide10.addText("当社", {
    x: s10rightX, y: s10baseLineY + 0.15, w: s10boxW, h: 0.3,
    align: "center", fontSize: 11, fontFace: FONT_JP, bold: true, color: COLORS.accent
});

// 結果（ゴールド）
slide10.addShape(pres.ShapeType.roundRect, {
    x: s10rightX - 0.15, y: s10rightTopY - 0.45, w: s10boxW + 0.3, h: 0.38,
    fill: { color: COLORS.gold }, rectRadius: 0.06
});
slide10.addText("上位表示", {
    x: s10rightX - 0.15, y: s10rightTopY - 0.42, w: s10boxW + 0.3, h: 0.32,
    align: "center", fontSize: 11, fontFace: FONT_JP, bold: true, color: "FFFFFF"
});


// ==========================================
// Slide 10-2: E-E-A-T Explanation
// ==========================================
let slide_eeat = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide_eeat.addText("QUALITY", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide_eeat.addText("上位表示される記事の条件", {
    x: 0.8, y: 0.6, w: 8, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

slide_eeat.addText("「網羅性」と「独自要素」の両立が不可欠です。", {
    x: 0.8, y: 1.1, w: 9, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain
});

const condY = 1.8;
const leftBoxH = 1.7;

// Left: Explanations
// Uniqueness (Top of Left Col)
slide_eeat.addShape(pres.ShapeType.rect, {
    x: 0.8, y: condY, w: 5.0, h: leftBoxH,
    fill: { color: "FFFBEB" }, line: { color: COLORS.gold, width: 2 }
});
// Human Badge (上に配置)
slide_eeat.addShape(pres.ShapeType.rect, { x: 3.3, y: condY + 0.12, w: 2.3, h: 0.28, fill: { color: COLORS.gold } });
slide_eeat.addText("手作業で時間をかける", { x: 3.3, y: condY + 0.12, w: 2.3, h: 0.28, align: "center", fontSize: 9, bold: true, color: "FFFFFF", fontFace: FONT_JP });
// 見出し（バッジの下に）
slide_eeat.addText("独自要素 (Uniqueness / E-E-A-T)", { x: 1.0, y: condY + 0.45, w: 4.5, h: 0.3, fontSize: 14, bold: true, color: COLORS.gold, fontFace: FONT_JP });
slide_eeat.addText("競合にはないオリジナルの情報。\n実体験に基づく一次情報や、専門家ならではの知見など。\nこれこそがGoogleに評価される最大の要因です。", {
    x: 1.0, y: condY + 0.8, w: 4.6, h: 0.85, fontSize: 11, color: COLORS.textMain, fontFace: FONT_JP, lineSpacing: 16
});


// Comprehensiveness (Bottom of Left Col)
const compY_eeat = condY + leftBoxH + 0.2;
slide_eeat.addShape(pres.ShapeType.rect, {
    x: 0.8, y: compY_eeat, w: 5.0, h: leftBoxH,
    fill: { color: "FAFAFA" }, line: { color: COLORS.line }
});
// AI Badge (上に配置)
slide_eeat.addShape(pres.ShapeType.rect, { x: 2.4, y: compY_eeat + 0.12, w: 3.2, h: 0.28, fill: { color: "EFF6FF" }, line: { color: "3B82F6" } });
slide_eeat.addText("独自開発のツールで瞬時に作成", { x: 2.4, y: compY_eeat + 0.12, w: 3.2, h: 0.28, align: "center", fontSize: 9, bold: true, color: "3B82F6", fontFace: FONT_JP });
// 見出し（バッジの下に）
slide_eeat.addText("網羅性 (Comprehensiveness)", { x: 1.0, y: compY_eeat + 0.45, w: 4.5, h: 0.3, fontSize: 14, bold: true, color: COLORS.textMain, fontFace: FONT_JP });
slide_eeat.addText("すでに上位表示されている競合記事で説明されている要素。\n検索ユーザーが求める「共通解」を満たす必要があります。", {
    x: 1.0, y: compY_eeat + 0.8, w: 4.6, h: 0.8, fontSize: 11, color: COLORS.textSub, fontFace: FONT_JP, lineSpacing: 16
});


// Right: Diagram (Stack)
const diagX = 6.2;
const diagW = 3.3;
const diagTopH = 1.9;
const diagBottomH = leftBoxH;
const plusH = 0.35;
const totalRightH = diagTopH + plusH + diagBottomH;
const rightStartY = condY;

// Label Above Diagram
slide_eeat.addText("勝てる記事の条件", { x: diagX, y: rightStartY - 0.35, w: diagW, h: 0.3, align: "center", fontSize: 14, bold: true, color: COLORS.textMain, fontFace: FONT_JP });
slide_eeat.addShape(pres.ShapeType.line, { x: diagX + diagW / 2, y: rightStartY - 0.05, w: 0, h: 0.2, line: { color: COLORS.textMain, width: 2, endArrowType: "triangle" } });

// Top: Uniqueness
slide_eeat.addShape(pres.ShapeType.rect, {
    x: diagX, y: rightStartY + 0.15, w: diagW, h: diagTopH,
    fill: { color: "FFFFFF" }, line: { color: COLORS.gold, width: 3 },
    shadow: { type: 'outer', color: '000000', blur: 10, offset: 5, opacity: 0.2 }
});
slide_eeat.addText("独自要素", { x: diagX, y: rightStartY + 0.5, w: diagW, h: 0.5, align: "center", fontSize: 24, bold: true, color: COLORS.gold, fontFace: FONT_JP });
slide_eeat.addText("Originality / E-E-A-T", { x: diagX, y: rightStartY + 1.0, w: diagW, h: 0.3, align: "center", fontSize: 12, bold: true, color: COLORS.gold, fontFace: FONT_EN });

// Plus Symbol
const plusY = rightStartY + 0.15 + diagTopH;
slide_eeat.addText("+", { x: diagX, y: plusY, w: diagW, h: plusH, align: "center", fontSize: 24, bold: true, color: COLORS.textMain });

// Base: Comprehensiveness
const bottomY = plusY + plusH;
slide_eeat.addShape(pres.ShapeType.rect, {
    x: diagX, y: bottomY, w: diagW, h: diagBottomH,
    fill: { color: "E5E7EB" }, line: { color: COLORS.line }
});
slide_eeat.addText("網羅性", { x: diagX, y: bottomY + 0.35, w: diagW, h: 0.5, align: "center", fontSize: 18, bold: true, color: COLORS.textSub, fontFace: FONT_JP });
slide_eeat.addText("競合情報のカバー", { x: diagX, y: bottomY + 0.85, w: diagW, h: 0.3, align: "center", fontSize: 10, color: COLORS.textSub, fontFace: FONT_JP });


// ==========================================
// Slide 10-3: Strength 1 (Copernicus)
// ==========================================
let slide_copernicus = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide_copernicus.addText("STRENGTH", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide_copernicus.addText("独自開発AIツール \"Copernicus\"", {
    x: 0.8, y: 0.6, w: 8, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});
slide_copernicus.addText("「網羅性」を瞬時にカバーします。", {
    x: 0.8, y: 1.1, w: 8, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain
});

// Explanation (moved to top)
slide_copernicus.addText("Copernicusは、現在の上位表示記事（＝検索ユーザーの答え）を瞬時に分析し、「何を書けば網羅性が担保されるか」を自動的に導き出します。手作業では数日かかる構成作成を、わずか数分で完了させます。", {
    x: 0.8, y: 1.5, w: 8.5, h: 0.6,
    fontSize: 12, color: COLORS.textSub, fontFace: FONT_JP, lineSpacing: 18
});

// --- 3-STEP FLOW ---
const copY = 2.3;
const copStepW = 2.7;
const copStepH = 2.5;
const copStepGap = 0.5;
const copStep1X = 0.5;
const copStep2X = copStep1X + copStepW + copStepGap;
const copStep3X = copStep2X + copStepW + copStepGap;

// STEP 1: 分析
slide_copernicus.addShape(pres.ShapeType.roundRect, {
    x: copStep1X, y: copY, w: copStepW, h: copStepH,
    fill: { color: "FFFFFF" }, line: { color: "3B82F6", width: 2 },
    rectRadius: 0.12
});
slide_copernicus.addShape(pres.ShapeType.roundRect, {
    x: copStep1X + 0.1, y: copY + 0.1, w: 0.8, h: 0.3,
    fill: { color: "3B82F6" }, rectRadius: 0.06
});
slide_copernicus.addText("STEP 1", {
    x: copStep1X + 0.1, y: copY + 0.12, w: 0.8, h: 0.26,
    align: "center", fontSize: 9, fontFace: FONT_EN, bold: true, color: "FFFFFF"
});
slide_copernicus.addText("上位10記事の分析", {
    x: copStep1X, y: copY + 0.5, w: copStepW, h: 0.3,
    align: "center", fontSize: 13, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});
slide_copernicus.addImage({
    path: "/Users/mizumayuuki/.gemini/antigravity/brain/a6c07f08-4cd4-4e7f-9d1c-9e0ceb3e6a97/uploaded_image_1_1767863538649.png",
    x: copStep1X + 0.25, y: copY + 0.85, w: copStepW - 0.5, h: 1.1,
});
slide_copernicus.addText("対策キーワードで表示される\n上位記事の構成要素を抽出", {
    x: copStep1X + 0.1, y: copY + 2.0, w: copStepW - 0.2, h: 0.5,
    align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 13
});

// Arrow 1→2
slide_copernicus.addShape(pres.ShapeType.line, {
    x: copStep1X + copStepW + 0.08, y: copY + copStepH / 2, w: copStepGap - 0.16, h: 0,
    line: { color: COLORS.gold, width: 2, endArrowType: "triangle" }
});

// STEP 2: 構成案生成
slide_copernicus.addShape(pres.ShapeType.roundRect, {
    x: copStep2X, y: copY, w: copStepW, h: copStepH,
    fill: { color: "FFFFFF" }, line: { color: COLORS.gold, width: 2 },
    rectRadius: 0.12
});
slide_copernicus.addShape(pres.ShapeType.roundRect, {
    x: copStep2X + 0.1, y: copY + 0.1, w: 0.8, h: 0.3,
    fill: { color: COLORS.gold }, rectRadius: 0.06
});
slide_copernicus.addText("STEP 2", {
    x: copStep2X + 0.1, y: copY + 0.12, w: 0.8, h: 0.26,
    align: "center", fontSize: 9, fontFace: FONT_EN, bold: true, color: "FFFFFF"
});
slide_copernicus.addText("構成案を自動生成", {
    x: copStep2X, y: copY + 0.5, w: copStepW, h: 0.3,
    align: "center", fontSize: 13, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});
slide_copernicus.addImage({
    path: "/Users/mizumayuuki/.gemini/antigravity/brain/a6c07f08-4cd4-4e7f-9d1c-9e0ceb3e6a97/uploaded_image_2_1767863538649.png",
    x: copStep2X + 0.25, y: copY + 0.85, w: copStepW - 0.5, h: 1.1,
});
slide_copernicus.addText("抽出データに基づき\n網羅性の高い構成案を作成", {
    x: copStep2X + 0.1, y: copY + 2.0, w: copStepW - 0.2, h: 0.5,
    align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 13
});

// Arrow 2→3
slide_copernicus.addShape(pres.ShapeType.line, {
    x: copStep2X + copStepW + 0.08, y: copY + copStepH / 2, w: copStepGap - 0.16, h: 0,
    line: { color: COLORS.gold, width: 2, endArrowType: "triangle" }
});

// STEP 3: 複数AIで文章生成
slide_copernicus.addShape(pres.ShapeType.roundRect, {
    x: copStep3X, y: copY, w: copStepW, h: copStepH,
    fill: { color: "FFFFFF" }, line: { color: COLORS.accent, width: 2 },
    rectRadius: 0.12
});
slide_copernicus.addShape(pres.ShapeType.roundRect, {
    x: copStep3X + 0.1, y: copY + 0.1, w: 0.8, h: 0.3,
    fill: { color: COLORS.accent }, rectRadius: 0.06
});
slide_copernicus.addText("STEP 3", {
    x: copStep3X + 0.1, y: copY + 0.12, w: 0.8, h: 0.26,
    align: "center", fontSize: 9, fontFace: FONT_EN, bold: true, color: "FFFFFF"
});
slide_copernicus.addText("複数AIで文章生成", {
    x: copStep3X, y: copY + 0.5, w: copStepW, h: 0.3,
    align: "center", fontSize: 13, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});
// AI logos/names
slide_copernicus.addShape(pres.ShapeType.roundRect, {
    x: copStep3X + 0.3, y: copY + 0.9, w: copStepW - 0.6, h: 1.0,
    fill: { color: "F8FAFC" }, line: { color: "E5E7EB" },
    rectRadius: 0.08
});
slide_copernicus.addText("ChatGPT 5.2\nGemini 3.0\nClaude 4.5", {
    x: copStep3X + 0.3, y: copY + 1.0, w: copStepW - 0.6, h: 0.8,
    align: "center", fontSize: 11, fontFace: FONT_EN, bold: true, color: COLORS.textMain, lineSpacing: 16
});
slide_copernicus.addText("最も論理的で可読性の高い\n日本語を選択し、自然で\nわかりやすい文章を生成", {
    x: copStep3X + 0.1, y: copY + 2.0, w: copStepW - 0.2, h: 0.6,
    align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 12
});


// ==========================================
// Slide 10-4: Strength 2 (Human Check)
// ==========================================
let slide_human = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide_human.addText("STRENGTH", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide_human.addText("プロのWebライターがプロの目線で記事に\"独自性\"を追加", {
    x: 0.8, y: 0.6, w: 9, h: 0.5,
    fontSize: 28, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

// Subtitle
slide_human.addText("AIが生成した記事を、AIライター協会の理事長を務める水間雄紀が編集します。AI特有の「嘘」や「違和感」を排除し、Googleが好む権威性と、ユーザーを動かすセールスライティングを付加して完成させます。", {
    x: 0.8, y: 1.1, w: 8.5, h: 0.5,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 16
});

// --- LEFT: Profile Card (統合版) ---
const profCardX = 0.8;
const profCardY = 1.7;
const profCardW = 3.2;
const profCardH = 3.5;

slide_human.addShape(pres.ShapeType.roundRect, {
    x: profCardX, y: profCardY, w: profCardW, h: profCardH,
    fill: { color: "FFFFFF" }, line: { color: COLORS.gold, width: 2 },
    rectRadius: 0.12
});

// Photo
slide_human.addImage({
    path: "/Users/mizumayuuki/全額返金SEO_LP /public/representative.jpg",
    x: profCardX + 0.35, y: profCardY + 0.2, w: 2.5, h: 1.4,
});

// Name & Title
slide_human.addText("水間 雄紀", {
    x: profCardX, y: profCardY + 1.7, w: profCardW, h: 0.35,
    align: "center", fontSize: 18, bold: true, color: COLORS.textMain, fontFace: FONT_JP
});
slide_human.addText("AIライター協会 理事長", {
    x: profCardX, y: profCardY + 2.05, w: profCardW, h: 0.25,
    align: "center", fontSize: 10, color: COLORS.gold, fontFace: FONT_JP, bold: true
});

// Separator
slide_human.addShape(pres.ShapeType.line, {
    x: profCardX + 0.4, y: profCardY + 2.4, w: profCardW - 0.8, h: 0,
    line: { color: "E5E7EB", width: 1 }
});

// Biography (カード内)
slide_human.addText("近畿大学文芸学部卒。大手出版社文学賞にて最終選考選出。上場企業を中心に1万本以上の記事を制作。AIMA代表取締役。", {
    x: profCardX + 0.25, y: profCardY + 2.55, w: profCardW - 0.5, h: 0.9,
    fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 13
});

// --- RIGHT: 2つの強み ---
const rightX = 4.3;
const rightW = 5.3;
const boxH = 1.5;

// 1. 独自性の追加
const uniqY = 1.7;
slide_human.addShape(pres.ShapeType.roundRect, {
    x: rightX, y: uniqY, w: rightW, h: boxH,
    fill: { color: "FFFBEB" }, line: { color: COLORS.gold, width: 2 },
    rectRadius: 0.1
});
slide_human.addShape(pres.ShapeType.roundRect, {
    x: rightX + 0.15, y: uniqY + 0.15, w: 1.4, h: 0.3,
    fill: { color: COLORS.gold }, rectRadius: 0.06
});
slide_human.addText("独自性の追加", {
    x: rightX + 0.15, y: uniqY + 0.17, w: 1.4, h: 0.26,
    align: "center", fontSize: 10, fontFace: FONT_JP, bold: true, color: "FFFFFF"
});
slide_human.addText("貴社のサイトや資料（一次情報）などを熟読し、他の競合記事にはない要素を独自に追加します。これがGoogleのE-E-A-T（経験・専門性・権威性・信頼性）において、最も評価される部分です。", {
    x: rightX + 0.2, y: uniqY + 0.55, w: rightW - 0.4, h: 0.9,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 16
});

// 2. セールスライティング
const salesY = uniqY + boxH + 0.2;
slide_human.addShape(pres.ShapeType.roundRect, {
    x: rightX, y: salesY, w: rightW, h: boxH,
    fill: { color: "F8FAFC" }, line: { color: COLORS.accent, width: 2 },
    rectRadius: 0.1
});
slide_human.addShape(pres.ShapeType.roundRect, {
    x: rightX + 0.15, y: salesY + 0.15, w: 1.8, h: 0.3,
    fill: { color: COLORS.accent }, rectRadius: 0.06
});
slide_human.addText("セールスライティング", {
    x: rightX + 0.15, y: salesY + 0.17, w: 1.8, h: 0.26,
    align: "center", fontSize: 10, fontFace: FONT_JP, bold: true, color: "FFFFFF"
});
slide_human.addText("AIではできない「セールスライティング」も追加し、読んだユーザーが納得して次の行動（お問い合わせ・購入など）を起こせるように工夫します。", {
    x: rightX + 0.2, y: salesY + 0.55, w: rightW - 0.4, h: 0.9,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 16
});




// ==========================================
// Slide 11: Introduction Flow
// ==========================================
addSectionSlide(pres, "05", "PLANNING", "Implementation Flow");
let slide11 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide11.addText("FLOW", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide11.addText("導入フロー", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

slide11.addText("お申し込みから最短3営業日で開始可能です。", {
    x: 0.8, y: 1.1, w: 8, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain
});

const introFlowY = 1.8;
const introFlowW = 2.0; // Width of each step box
const introFlowGap = 0.3; // Gap between boxes

// --- Step 01: Application ---
slide11.addShape(pres.ShapeType.rect, {
    x: 0.8, y: introFlowY, w: introFlowW, h: 3.5,
    fill: { color: "FAFAFA" }, line: { color: COLORS.line }
});
slide11.addText("01", { x: 0.8, y: introFlowY + 0.2, w: introFlowW, h: 0.4, align: "center", fontSize: 24, bold: true, color: COLORS.goldLight });
slide11.addText("申し込み", { x: 0.8, y: introFlowY + 0.6, w: introFlowW, h: 0.3, align: "center", fontSize: 14, bold: true, color: COLORS.textMain, fontFace: FONT_JP });
slide11.addText("お問い合わせフォーム\nよりご相談ください。\nWeb面談も可能です。", {
    x: 0.9, y: introFlowY + 1.2, w: introFlowW - 0.2, h: 1.0,
    fontSize: 10, color: COLORS.textSub, fontFace: FONT_JP, lineSpacing: 14
});

// Arrow
slide11.addShape(pres.ShapeType.line, {
    x: 0.8 + introFlowW, y: introFlowY + 1.7, w: introFlowGap, h: 0,
    line: { color: COLORS.line, width: 2, endArrowType: "triangle" }
});


// --- Step 02: Contract ---
const x2 = 0.8 + introFlowW + introFlowGap;
slide11.addShape(pres.ShapeType.rect, {
    x: x2, y: introFlowY, w: introFlowW, h: 3.5,
    fill: { color: "FAFAFA" }, line: { color: COLORS.line }
});
slide11.addText("02", { x: x2, y: introFlowY + 0.2, w: introFlowW, h: 0.4, align: "center", fontSize: 24, bold: true, color: COLORS.goldLight });
slide11.addText("契約・入金", { x: x2, y: introFlowY + 0.6, w: introFlowW, h: 0.3, align: "center", fontSize: 14, bold: true, color: COLORS.textMain, fontFace: FONT_JP });
slide11.addText("クラウドサインにて契約。\n指定口座へご入金\nいただきます。", {
    x: x2 + 0.1, y: introFlowY + 1.2, w: introFlowW - 0.2, h: 1.0,
    fontSize: 10, color: COLORS.textSub, fontFace: FONT_JP, lineSpacing: 14
});

// Arrow
slide11.addShape(pres.ShapeType.line, {
    x: x2 + introFlowW, y: introFlowY + 1.7, w: introFlowGap, h: 0,
    line: { color: COLORS.line, width: 2, endArrowType: "triangle" }
});


// --- Step 03: Execution ---
const x3 = x2 + introFlowW + introFlowGap;
slide11.addShape(pres.ShapeType.rect, {
    x: x3, y: introFlowY, w: introFlowW, h: 3.5,
    fill: { color: "FFFFFF" }, line: { color: COLORS.gold, width: 2 } // Active step highlight
});
slide11.addText("03", { x: x3, y: introFlowY + 0.2, w: introFlowW, h: 0.4, align: "center", fontSize: 24, bold: true, color: COLORS.gold });
slide11.addText("施策の実行", { x: x3, y: introFlowY + 0.6, w: introFlowW, h: 0.3, align: "center", fontSize: 14, bold: true, color: COLORS.accent, fontFace: FONT_JP });
slide11.addText("期間：6ヶ月間", { x: x3, y: introFlowY + 1.0, w: introFlowW, h: 0.2, align: "center", fontSize: 10, bold: true, color: COLORS.textMain, fontFace: FONT_JP });

// Cycle List
slide11.addText("▼ 以下のサイクルを実施", { x: x3 + 0.1, y: introFlowY + 1.4, w: introFlowW - 0.2, h: 0.2, fontSize: 8, color: COLORS.textSub, fontFace: FONT_JP });
slide11.addText("・キーワード選定\n・構成案作成\n・本文作成\n・納品", {
    x: x3 + 0.1, y: introFlowY + 1.7, w: introFlowW - 0.2, h: 1.0,
    fontSize: 10, color: COLORS.textMain, fontFace: FONT_JP, lineSpacing: 16
});

// Arrow
slide11.addShape(pres.ShapeType.line, {
    x: x3 + introFlowW, y: introFlowY + 1.7, w: introFlowGap, h: 0,
    line: { color: COLORS.line, width: 2, endArrowType: "triangle" }
});


// --- Step 04: Settlement ---
const x4 = x3 + introFlowW + introFlowGap;
slide11.addShape(pres.ShapeType.rect, {
    x: x4, y: introFlowY, w: introFlowW, h: 3.5,
    fill: { color: "FAFAFA" }, line: { color: COLORS.line }
});
slide11.addText("04", { x: x4, y: introFlowY + 0.2, w: introFlowW, h: 0.4, align: "center", fontSize: 24, bold: true, color: COLORS.goldLight });
slide11.addText("預り金の精算", { x: x4, y: introFlowY + 0.6, w: introFlowW, h: 0.3, align: "center", fontSize: 14, bold: true, color: COLORS.textMain, fontFace: FONT_JP });
slide11.addText("成果状況に基づいて\n精算を行い、\n業務終了となります。\n(更新も可能です)", {
    x: x4 + 0.1, y: introFlowY + 1.2, w: introFlowW - 0.2, h: 1.5,
    fontSize: 10, color: COLORS.textSub, fontFace: FONT_JP, lineSpacing: 14
});


// ==========================================
// Slide 11-2: Keyword Selection
// ==========================================
let slide_keyword = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide_keyword.addText("KEYWORDS", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide_keyword.addText("キーワード選定", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

slide_keyword.addText("2つの選定パターンをご用意しています。", {
    x: 0.8, y: 1.1, w: 8, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain
});

const kwY = 1.7;
const kwCardW = 4.2;
const kwCardH = 3.4;
const kwGap = 0.4;

// --- Pattern A: Client Provides ---
slide_keyword.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: kwY, w: kwCardW, h: kwCardH,
    fill: { color: "FFFFFF" }, line: { color: COLORS.line, width: 1 },
    rectRadius: 0.1
});

// Pattern A Header
slide_keyword.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: kwY, w: kwCardW, h: 0.5,
    fill: { color: "F8FAFC" }, line: { color: COLORS.line, width: 1 },
    rectRadius: 0.1
});
slide_keyword.addText("PATTERN A", {
    x: 0.8, y: kwY + 0.12, w: 1.2, h: 0.26,
    fontSize: 10, fontFace: FONT_EN, bold: true, color: COLORS.textSub
});
slide_keyword.addText("貴社ご提示パターン", {
    x: 2.0, y: kwY + 0.1, w: 2.6, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});

// Pattern A Content
slide_keyword.addText("貴社がすでにSEO対策したい\nキーワードをお持ちの場合", {
    x: 0.8, y: kwY + 0.7, w: kwCardW - 0.4, h: 0.5,
    fontSize: 12, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 16
});

slide_keyword.addShape(pres.ShapeType.rect, {
    x: 1.2, y: kwY + 1.4, w: 3.4, h: 1.8,
    fill: { color: "FAFAFA" }, line: { color: COLORS.line }
});

slide_keyword.addText("ご希望のキーワードリストを\nご提示いただければ、\nそのまま施策に着手します。", {
    x: 1.4, y: kwY + 1.7, w: 3.0, h: 1.2,
    fontSize: 12, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 20, align: "center"
});

// --- Pattern B: We Select ---
const kwBX = 0.6 + kwCardW + kwGap;
slide_keyword.addShape(pres.ShapeType.roundRect, {
    x: kwBX, y: kwY, w: kwCardW, h: kwCardH,
    fill: { color: "FFFFFF" }, line: { color: COLORS.gold, width: 2 },
    rectRadius: 0.1
});

// Pattern B Header
slide_keyword.addShape(pres.ShapeType.roundRect, {
    x: kwBX, y: kwY, w: kwCardW, h: 0.5,
    fill: { color: "FEF9E7" }, line: { color: COLORS.gold, width: 2 },
    rectRadius: 0.1
});
slide_keyword.addText("PATTERN B", {
    x: kwBX + 0.2, y: kwY + 0.12, w: 1.2, h: 0.26,
    fontSize: 10, fontFace: FONT_EN, bold: true, color: COLORS.gold
});
slide_keyword.addText("弊社選定パターン", {
    x: kwBX + 1.4, y: kwY + 0.1, w: 2.6, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.accent
});
slide_keyword.addText("おすすめ", {
    x: kwBX + 3.5, y: kwY + 0.12, w: 0.6, h: 0.26,
    fontSize: 9, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

// Pattern B Content - Flow
slide_keyword.addText("独自AIツール「Copernicus」を活用", {
    x: kwBX + 0.2, y: kwY + 0.65, w: kwCardW - 0.4, h: 0.3,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textSub
});

// Flow steps
const flowStepY = kwY + 1.0;
const flowStepH = 0.42;
const flowStepGap = 0.08;

// Step 1
slide_keyword.addShape(pres.ShapeType.roundRect, {
    x: kwBX + 0.3, y: flowStepY, w: 3.6, h: flowStepH,
    fill: { color: "EFF6FF" }, line: { color: "3B82F6", width: 1 }, rectRadius: 0.06
});
slide_keyword.addText("1", { x: kwBX + 0.4, y: flowStepY + 0.08, w: 0.3, h: 0.26, fontSize: 11, bold: true, color: "3B82F6", fontFace: FONT_EN });
slide_keyword.addText("貴社のペルソナを設定", { x: kwBX + 0.7, y: flowStepY + 0.08, w: 3.0, h: 0.26, fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain });

// Arrow
slide_keyword.addText("▼", { x: kwBX + 1.8, y: flowStepY + flowStepH, w: 0.5, h: 0.2, fontSize: 8, color: COLORS.textSub, align: "center" });

// Step 2
const step2Y = flowStepY + flowStepH + flowStepGap + 0.12;
slide_keyword.addShape(pres.ShapeType.roundRect, {
    x: kwBX + 0.3, y: step2Y, w: 3.6, h: flowStepH,
    fill: { color: "EFF6FF" }, line: { color: "3B82F6", width: 1 }, rectRadius: 0.06
});
slide_keyword.addText("2", { x: kwBX + 0.4, y: step2Y + 0.08, w: 0.3, h: 0.26, fontSize: 11, bold: true, color: "3B82F6", fontFace: FONT_EN });
slide_keyword.addText("ペルソナが検索しそうなKWを抽出", { x: kwBX + 0.7, y: step2Y + 0.08, w: 3.0, h: 0.26, fontSize: 10, fontFace: FONT_JP, color: COLORS.textMain });

// Arrow
slide_keyword.addText("▼", { x: kwBX + 1.8, y: step2Y + flowStepH, w: 0.5, h: 0.2, fontSize: 8, color: COLORS.textSub, align: "center" });

// Step 3
const step3Y = step2Y + flowStepH + flowStepGap + 0.12;
slide_keyword.addShape(pres.ShapeType.roundRect, {
    x: kwBX + 0.3, y: step3Y, w: 3.6, h: flowStepH,
    fill: { color: "FEF3C7" }, line: { color: COLORS.gold, width: 1 }, rectRadius: 0.06
});
slide_keyword.addText("3", { x: kwBX + 0.4, y: step3Y + 0.08, w: 0.3, h: 0.26, fontSize: 11, bold: true, color: COLORS.gold, fontFace: FONT_EN });
slide_keyword.addText("24キーワードを選定・ご提示", { x: kwBX + 0.7, y: step3Y + 0.08, w: 3.0, h: 0.26, fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain });

// Arrow
slide_keyword.addText("▼", { x: kwBX + 1.8, y: step3Y + flowStepH, w: 0.5, h: 0.2, fontSize: 8, color: COLORS.textSub, align: "center" });

// Step 4
const step4Y = step3Y + flowStepH + flowStepGap + 0.12;
slide_keyword.addShape(pres.ShapeType.roundRect, {
    x: kwBX + 0.3, y: step4Y, w: 3.6, h: flowStepH,
    fill: { color: "F0FDF4" }, line: { color: "22C55E", width: 1 }, rectRadius: 0.06
});
slide_keyword.addText("4", { x: kwBX + 0.4, y: step4Y + 0.08, w: 0.3, h: 0.26, fontSize: 11, bold: true, color: "22C55E", fontFace: FONT_EN });
slide_keyword.addText("貴社確認 → 双方合意で執筆開始", { x: kwBX + 0.7, y: step4Y + 0.08, w: 3.0, h: 0.26, fontSize: 10, fontFace: FONT_JP, color: COLORS.textMain });


// ==========================================
// Slide 11-3: Performance Evaluation (成果判定)
// ==========================================
let slide_evaluation = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide_evaluation.addText("SETTLEMENT", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide_evaluation.addText("成果判定と返金", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 28, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

slide_evaluation.addText("契約終了時に成果を判定し、未達成分を返金いたします。", {
    x: 0.8, y: 1.0, w: 8, h: 0.25,
    fontSize: 12, fontFace: FONT_JP, color: COLORS.textMain
});

// --- Section 1: Contract Period (Compact Timeline) ---
const evalY = 1.35;

slide_evaluation.addText("契約期間", {
    x: 0.8, y: evalY, w: 1.2, h: 0.25,
    fontSize: 12, fontFace: FONT_JP, bold: true, color: COLORS.accent
});

// Timeline - more compact
const timelineY = evalY + 0.3;
const timelineStartX = 2.0;
const timelineEndX = 8.5;
const timelineW = timelineEndX - timelineStartX;

slide_evaluation.addShape(pres.ShapeType.line, {
    x: timelineStartX, y: timelineY + 0.15, w: timelineW, h: 0,
    line: { color: COLORS.gold, width: 2 }
});

// Start point
slide_evaluation.addShape(pres.ShapeType.ellipse, {
    x: timelineStartX - 0.08, y: timelineY + 0.07, w: 0.16, h: 0.16,
    fill: { color: COLORS.gold }
});
slide_evaluation.addText("契約開始（例:4月）", {
    x: timelineStartX - 0.5, y: timelineY + 0.28, w: 1.2, h: 0.2,
    fontSize: 8, fontFace: FONT_JP, color: COLORS.textSub, align: "center"
});

// 6 months label
slide_evaluation.addShape(pres.ShapeType.rect, {
    x: timelineStartX + timelineW/2 - 0.6, y: timelineY - 0.1, w: 1.2, h: 0.28,
    fill: { color: "FEF3C7" }, line: { color: COLORS.gold }
});
slide_evaluation.addText("6ヶ月間", {
    x: timelineStartX + timelineW/2 - 0.6, y: timelineY - 0.06, w: 1.2, h: 0.2,
    fontSize: 10, fontFace: FONT_JP, bold: true, color: COLORS.gold, align: "center"
});

// End point
slide_evaluation.addShape(pres.ShapeType.ellipse, {
    x: timelineEndX - 0.08, y: timelineY + 0.07, w: 0.16, h: 0.16,
    fill: { color: COLORS.gold }
});
slide_evaluation.addText("契約終了・精算（例:9/30）", {
    x: timelineEndX - 0.8, y: timelineY + 0.28, w: 1.6, h: 0.2,
    fontSize: 8, fontFace: FONT_JP, color: COLORS.textSub, align: "center"
});

// --- Section 2: Settlement Date (Inline) ---
const settleY = evalY + 0.75;

slide_evaluation.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: settleY, w: 8.4, h: 0.5,
    fill: { color: "F8FAFC" }, line: { color: COLORS.line }, rectRadius: 0.06
});
slide_evaluation.addText("精算日：契約月から6ヶ月目の月末（最終営業日）　例: 4月契約 → 9/30", {
    x: 1.0, y: settleY + 0.12, w: 8.0, h: 0.25,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain
});

// --- Section 3: Two columns - Evaluation Method & Refund Calculation ---
const methodY = settleY + 0.7;

// Left Card: Evaluation Method
slide_evaluation.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: methodY, w: 4.3, h: 2.6,
    fill: { color: "FFFFFF" }, line: { color: "3B82F6", width: 2 }, rectRadius: 0.1
});

slide_evaluation.addText("成果判定方法", {
    x: 0.8, y: methodY + 0.1, w: 4.3, h: 0.3,
    fontSize: 12, fontFace: FONT_JP, bold: true, color: "3B82F6", align: "center"
});

slide_evaluation.addShape(pres.ShapeType.line, {
    x: 1.0, y: methodY + 0.45, w: 3.9, h: 0,
    line: { color: "DBEAFE" }
});

slide_evaluation.addShape(pres.ShapeType.roundRect, {
    x: 1.2, y: methodY + 0.6, w: 2.0, h: 0.3,
    fill: { color: "EFF6FF" }, rectRadius: 0.05
});
slide_evaluation.addText("Google Search Console", {
    x: 1.2, y: methodY + 0.63, w: 2.0, h: 0.24,
    fontSize: 8, fontFace: FONT_EN, bold: true, color: "3B82F6", align: "center"
});

slide_evaluation.addText("6ヶ月間の「平均掲載順位」を確認", {
    x: 1.0, y: methodY + 1.0, w: 4.1, h: 0.25,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, align: "center"
});

slide_evaluation.addShape(pres.ShapeType.roundRect, {
    x: 1.2, y: methodY + 1.4, w: 3.9, h: 1.1,
    fill: { color: "F0FDF4" }, line: { color: "22C55E" }, rectRadius: 0.08
});
slide_evaluation.addText("平均10位以内", {
    x: 1.2, y: methodY + 1.45, w: 3.9, h: 0.35,
    fontSize: 16, fontFace: FONT_JP, bold: true, color: "16A34A", align: "center"
});
slide_evaluation.addText("= 成果達成", {
    x: 1.2, y: methodY + 1.8, w: 3.9, h: 0.25,
    fontSize: 12, fontFace: FONT_JP, bold: true, color: "16A34A", align: "center"
});
slide_evaluation.addText("※合意KWの合計表示回数100回以上（対象期間内）", {
    x: 1.2, y: methodY + 2.1, w: 3.9, h: 0.25,
    fontSize: 9, fontFace: FONT_JP, color: "16A34A", align: "center"
});

// Right Card: Refund Calculation
slide_evaluation.addShape(pres.ShapeType.roundRect, {
    x: 5.3, y: methodY, w: 3.9, h: 2.6,
    fill: { color: "FFFFFF" }, line: { color: COLORS.gold, width: 2 }, rectRadius: 0.1
});

slide_evaluation.addText("返金計算", {
    x: 5.3, y: methodY + 0.1, w: 3.9, h: 0.3,
    fontSize: 12, fontFace: FONT_JP, bold: true, color: COLORS.gold, align: "center"
});

slide_evaluation.addShape(pres.ShapeType.line, {
    x: 5.5, y: methodY + 0.45, w: 3.5, h: 0,
    line: { color: COLORS.line }
});

slide_evaluation.addText("成果達成1記事につき", {
    x: 5.3, y: methodY + 0.6, w: 3.9, h: 0.25,
    fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub, align: "center"
});

slide_evaluation.addText("¥42,000", {
    x: 5.3, y: methodY + 0.9, w: 3.9, h: 0.5,
    fontSize: 32, fontFace: FONT_EN, bold: true, color: COLORS.accent, align: "center"
});

slide_evaluation.addText("を預り金から差し引き（上限：預り金）", {
    x: 5.3, y: methodY + 1.45, w: 3.9, h: 0.25,
    fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub, align: "center"
});

slide_evaluation.addShape(pres.ShapeType.roundRect, {
    x: 5.5, y: methodY + 1.8, w: 3.5, h: 0.6,
    fill: { color: "FEF3C7" }, rectRadius: 0.06
});
slide_evaluation.addText("残額は3営業日後を目処に返金", {
    x: 5.5, y: methodY + 1.95, w: 3.5, h: 0.3,
    fontSize: 10, fontFace: FONT_JP, bold: true, color: COLORS.gold, align: "center"
});


// ==========================================
// Slide 11-4: Settlement Case 1 (精算事例①)
// ==========================================
let slide_case1 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide_case1.addText("EXAMPLE", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide_case1.addText("精算事例①", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

slide_case1.addText("キーワードが10位以内にランクインした場合", {
    x: 0.8, y: 1.1, w: 8, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain
});

// --- Left side: Case Info ---
const case1Y = 1.7;
const case1LeftW = 4.2;

// Case info card
slide_case1.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: case1Y, w: case1LeftW, h: 3.2,
    fill: { color: "FFFFFF" }, line: { color: COLORS.line, width: 1 }, rectRadius: 0.1
});

// Contract period
slide_case1.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: case1Y + 0.2, w: 1.4, h: 0.35,
    fill: { color: "F8FAFC" }, rectRadius: 0.06
});
slide_case1.addText("契約期間", {
    x: 0.8, y: case1Y + 0.23, w: 1.4, h: 0.3,
    align: "center", fontSize: 10, fontFace: FONT_JP, bold: true, color: COLORS.textSub
});
slide_case1.addText("4月〜9月（4月を1ヶ月目として6ヶ月間）", {
    x: 2.3, y: case1Y + 0.23, w: 2.3, h: 0.3,
    fontSize: 12, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});

// Keyword
slide_case1.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: case1Y + 0.75, w: 1.4, h: 0.35,
    fill: { color: "EFF6FF" }, rectRadius: 0.06
});
slide_case1.addText("対策KW", {
    x: 0.8, y: case1Y + 0.78, w: 1.4, h: 0.3,
    align: "center", fontSize: 10, fontFace: FONT_JP, bold: true, color: "3B82F6"
});
slide_case1.addText("SEO対策 おすすめ", {
    x: 2.3, y: case1Y + 0.78, w: 2.3, h: 0.3,
    fontSize: 12, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});

// Divider
slide_case1.addShape(pres.ShapeType.line, {
    x: 0.8, y: case1Y + 1.35, w: 3.8, h: 0,
    line: { color: COLORS.line, dashType: "dash" }
});

// Settlement date label
slide_case1.addText("精算日 9/30 の結果", {
    x: 0.8, y: case1Y + 1.5, w: 3.8, h: 0.3,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textSub
});

// Ranking result
slide_case1.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: case1Y + 1.9, w: 3.8, h: 1.1,
    fill: { color: "FEF3C7" }, line: { color: COLORS.gold }, rectRadius: 0.08
});
slide_case1.addText("Google Search Console 平均掲載順位", {
    x: 0.8, y: case1Y + 2.0, w: 3.8, h: 0.25,
    align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub
});
slide_case1.addText("10位（表示150回/合計）", {
    x: 0.8, y: case1Y + 2.3, w: 3.8, h: 0.6,
    align: "center", fontSize: 28, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

// --- Arrow ---
slide_case1.addShape(pres.ShapeType.line, {
    x: 5.0, y: case1Y + 1.6, w: 0.5, h: 0,
    line: { color: COLORS.gold, width: 3, endArrowType: "triangle" }
});

// --- Right side: Result ---
const case1RightX = 5.7;
slide_case1.addShape(pres.ShapeType.roundRect, {
    x: case1RightX, y: case1Y, w: 3.5, h: 3.2,
    fill: { color: "F0FDF4" }, line: { color: "22C55E", width: 2 }, rectRadius: 0.1
});

// Success badge
slide_case1.addShape(pres.ShapeType.roundRect, {
    x: case1RightX + 0.9, y: case1Y + 0.25, w: 1.7, h: 0.4,
    fill: { color: "22C55E" }, rectRadius: 0.08
});
slide_case1.addText("成果達成", {
    x: case1RightX + 0.9, y: case1Y + 0.28, w: 1.7, h: 0.35,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: "FFFFFF"
});

// Condition met
slide_case1.addText("10位以内 & 合計表示回数100回以上を達成", {
    x: case1RightX, y: case1Y + 0.85, w: 3.5, h: 0.3,
    align: "center", fontSize: 11, fontFace: FONT_JP, color: "16A34A"
});

// Divider
slide_case1.addShape(pres.ShapeType.line, {
    x: case1RightX + 0.3, y: case1Y + 1.3, w: 2.9, h: 0,
    line: { color: "BBF7D0" }
});

// Amount
slide_case1.addText("このキーワードの精算額", {
    x: case1RightX, y: case1Y + 1.5, w: 3.5, h: 0.25,
    align: "center", fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub
});
slide_case1.addText("¥42,000", {
    x: case1RightX, y: case1Y + 1.8, w: 3.5, h: 0.7,
    align: "center", fontSize: 36, fontFace: FONT_EN, bold: true, color: "16A34A"
});

slide_case1.addText("預り金より差し引き", {
    x: case1RightX, y: case1Y + 2.6, w: 3.5, h: 0.3,
    align: "center", fontSize: 11, fontFace: FONT_JP, color: "16A34A"
});


// ==========================================
// Slide 11-5: Settlement Case 2 (精算事例②)
// ==========================================
let slide_case2 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide_case2.addText("EXAMPLE", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide_case2.addText("精算事例②", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

slide_case2.addText("事前合意していないキーワードで上位表示された場合", {
    x: 0.8, y: 1.1, w: 8, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain
});

// --- Left side: Case Info ---
const case2Y = 1.7;
const case2LeftW = 4.2;

// Case info card
slide_case2.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: case2Y, w: case2LeftW, h: 3.2,
    fill: { color: "FFFFFF" }, line: { color: COLORS.line, width: 1 }, rectRadius: 0.1
});

// Original keyword
slide_case2.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: case2Y + 0.2, w: 1.6, h: 0.35,
    fill: { color: "EFF6FF" }, rectRadius: 0.06
});
slide_case2.addText("対策KW", {
    x: 0.8, y: case2Y + 0.23, w: 1.6, h: 0.3,
    align: "center", fontSize: 10, fontFace: FONT_JP, bold: true, color: "3B82F6"
});
slide_case2.addText("SEO対策 おすすめ", {
    x: 2.5, y: case2Y + 0.23, w: 2.1, h: 0.3,
    fontSize: 12, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});

// Divider
slide_case2.addShape(pres.ShapeType.line, {
    x: 0.8, y: case2Y + 0.75, w: 3.8, h: 0,
    line: { color: COLORS.line, dashType: "dash" }
});

// But ranked for different keywords
slide_case2.addText("しかし、上位表示されたのは…", {
    x: 0.8, y: case2Y + 0.9, w: 3.8, h: 0.3,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textSub
});

// Wrong keyword examples
slide_case2.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: case2Y + 1.25, w: 3.8, h: 0.45,
    fill: { color: "FEF2F2" }, line: { color: "FECACA" }, rectRadius: 0.06
});
slide_case2.addText("「SEO対策 おすすめ 業者」で3位", {
    x: 0.9, y: case2Y + 1.32, w: 3.6, h: 0.3,
    fontSize: 11, fontFace: FONT_JP, color: "B91C1C"
});

slide_case2.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: case2Y + 1.8, w: 3.8, h: 0.45,
    fill: { color: "FEF2F2" }, line: { color: "FECACA" }, rectRadius: 0.06
});
slide_case2.addText("「SEO対策 やり方」で5位", {
    x: 0.9, y: case2Y + 1.87, w: 3.6, h: 0.3,
    fontSize: 11, fontFace: FONT_JP, color: "B91C1C"
});

// Explanation
slide_case2.addText("※ 事前に合意したキーワード以外での\n　上位表示は成果対象外となります", {
    x: 0.8, y: case2Y + 2.45, w: 3.8, h: 0.6,
    fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 14
});

// --- Arrow ---
slide_case2.addShape(pres.ShapeType.line, {
    x: 5.0, y: case2Y + 1.6, w: 0.5, h: 0,
    line: { color: COLORS.textSub, width: 3, endArrowType: "triangle" }
});

// --- Right side: Result ---
const case2RightX = 5.7;
slide_case2.addShape(pres.ShapeType.roundRect, {
    x: case2RightX, y: case2Y, w: 3.5, h: 3.2,
    fill: { color: "FEF2F2" }, line: { color: "EF4444", width: 2 }, rectRadius: 0.1
});

// Not achieved badge
slide_case2.addShape(pres.ShapeType.roundRect, {
    x: case2RightX + 0.9, y: case2Y + 0.25, w: 1.7, h: 0.4,
    fill: { color: "EF4444" }, rectRadius: 0.08
});
slide_case2.addText("成果対象外", {
    x: case2RightX + 0.9, y: case2Y + 0.28, w: 1.7, h: 0.35,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: "FFFFFF"
});

// Reason
slide_case2.addText("合意キーワードでの\n上位表示ではないため", {
    x: case2RightX, y: case2Y + 0.85, w: 3.5, h: 0.5,
    align: "center", fontSize: 11, fontFace: FONT_JP, color: "B91C1C", lineSpacing: 14
});

// Divider
slide_case2.addShape(pres.ShapeType.line, {
    x: case2RightX + 0.3, y: case2Y + 1.5, w: 2.9, h: 0,
    line: { color: "FECACA" }
});

// Amount
slide_case2.addText("このキーワードの精算額", {
    x: case2RightX, y: case2Y + 1.7, w: 3.5, h: 0.25,
    align: "center", fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub
});
slide_case2.addText("¥0", {
    x: case2RightX, y: case2Y + 2.0, w: 3.5, h: 0.7,
    align: "center", fontSize: 36, fontFace: FONT_EN, bold: true, color: "EF4444"
});

slide_case2.addText("預り金からの差し引きなし", {
    x: case2RightX, y: case2Y + 2.7, w: 3.5, h: 0.3,
    align: "center", fontSize: 11, fontFace: FONT_JP, color: "B91C1C"
});


// ==========================================
// Slide 11-6: Settlement Case 3 (精算事例③)
// ==========================================
let slide_case3 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide_case3.addText("EXAMPLE", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide_case3.addText("精算事例③", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

slide_case3.addText("1つの記事が複数の合意キーワードで上位表示された場合", {
    x: 0.8, y: 1.1, w: 8, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain
});

// --- Left side: Case Info ---
const case3Y = 1.7;
const case3LeftW = 4.2;

// Case info card
slide_case3.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: case3Y, w: case3LeftW, h: 3.2,
    fill: { color: "FFFFFF" }, line: { color: COLORS.line, width: 1 }, rectRadius: 0.1
});

// Article info
slide_case3.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: case3Y + 0.15, w: 0.9, h: 0.35,
    fill: { color: "F8FAFC" }, rectRadius: 0.06
});
slide_case3.addText("1記事", {
    x: 0.8, y: case3Y + 0.18, w: 0.9, h: 0.3,
    align: "center", fontSize: 10, fontFace: FONT_JP, bold: true, color: COLORS.textSub
});
slide_case3.addText("「SEO対策 おすすめ」で執筆", {
    x: 1.8, y: case3Y + 0.18, w: 2.8, h: 0.3,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain
});

// Divider
slide_case3.addShape(pres.ShapeType.line, {
    x: 0.8, y: case3Y + 0.7, w: 3.8, h: 0,
    line: { color: COLORS.line, dashType: "dash" }
});

// Multiple keywords achieved
slide_case3.addText("この記事が以下のキーワードで上位表示", {
    x: 0.8, y: case3Y + 0.85, w: 3.8, h: 0.3,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textSub
});

// Keyword 1 - achieved
slide_case3.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: case3Y + 1.2, w: 3.8, h: 0.45,
    fill: { color: "F0FDF4" }, line: { color: "22C55E" }, rectRadius: 0.06
});
slide_case3.addText("「SEO対策 おすすめ」", {
    x: 0.9, y: case3Y + 1.27, w: 2.4, h: 0.3,
    fontSize: 11, fontFace: FONT_JP, bold: true, color: "16A34A"
});
slide_case3.addText("8位", {
    x: 3.8, y: case3Y + 1.27, w: 0.7, h: 0.3,
    align: "right", fontSize: 11, fontFace: FONT_EN, bold: true, color: "16A34A"
});

// Keyword 2 - achieved
slide_case3.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: case3Y + 1.75, w: 3.8, h: 0.45,
    fill: { color: "F0FDF4" }, line: { color: "22C55E" }, rectRadius: 0.06
});
slide_case3.addText("「SEO対策 費用」", {
    x: 0.9, y: case3Y + 1.82, w: 2.4, h: 0.3,
    fontSize: 11, fontFace: FONT_JP, bold: true, color: "16A34A"
});
slide_case3.addText("5位", {
    x: 3.8, y: case3Y + 1.82, w: 0.7, h: 0.3,
    align: "right", fontSize: 11, fontFace: FONT_EN, bold: true, color: "16A34A"
});

// Note
slide_case3.addText("※ 両方とも事前合意済みのキーワード", {
    x: 0.8, y: case3Y + 2.35, w: 3.8, h: 0.25,
    fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub
});

// Important note
slide_case3.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: case3Y + 2.65, w: 3.8, h: 0.45,
    fill: { color: "FEF3C7" }, line: { color: COLORS.gold }, rectRadius: 0.06
});
slide_case3.addText("成果は「1記事単位」でカウント", {
    x: 0.8, y: case3Y + 2.72, w: 3.8, h: 0.3,
    align: "center", fontSize: 11, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

// --- Arrow ---
slide_case3.addShape(pres.ShapeType.line, {
    x: 5.0, y: case3Y + 1.6, w: 0.5, h: 0,
    line: { color: COLORS.gold, width: 3, endArrowType: "triangle" }
});

// --- Right side: Result ---
const case3RightX = 5.7;
slide_case3.addShape(pres.ShapeType.roundRect, {
    x: case3RightX, y: case3Y, w: 3.5, h: 3.2,
    fill: { color: "F0FDF4" }, line: { color: "22C55E", width: 2 }, rectRadius: 0.1
});

// Success badge
slide_case3.addShape(pres.ShapeType.roundRect, {
    x: case3RightX + 0.9, y: case3Y + 0.25, w: 1.7, h: 0.4,
    fill: { color: "22C55E" }, rectRadius: 0.08
});
slide_case3.addText("成果達成", {
    x: case3RightX + 0.9, y: case3Y + 0.28, w: 1.7, h: 0.35,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: "FFFFFF"
});

// Explanation
slide_case3.addText("複数キーワードで上位表示でも\n1記事としてカウント", {
    x: case3RightX, y: case3Y + 0.8, w: 3.5, h: 0.5,
    align: "center", fontSize: 11, fontFace: FONT_JP, color: "16A34A", lineSpacing: 14
});

// Divider
slide_case3.addShape(pres.ShapeType.line, {
    x: case3RightX + 0.3, y: case3Y + 1.45, w: 2.9, h: 0,
    line: { color: "BBF7D0" }
});

// Amount
slide_case3.addText("この記事の精算額", {
    x: case3RightX, y: case3Y + 1.6, w: 3.5, h: 0.25,
    align: "center", fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub
});
slide_case3.addText("¥42,000", {
    x: case3RightX, y: case3Y + 1.85, w: 3.5, h: 0.7,
    align: "center", fontSize: 36, fontFace: FONT_EN, bold: true, color: "16A34A"
});

slide_case3.addText("（¥84,000ではありません）", {
    x: case3RightX, y: case3Y + 2.55, w: 3.5, h: 0.3,
    align: "center", fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub
});

slide_case3.addText("預り金より差し引き", {
    x: case3RightX, y: case3Y + 2.85, w: 3.5, h: 0.25,
    align: "center", fontSize: 10, fontFace: FONT_JP, color: "16A34A"
});


// ==========================================
// Slide 11-7: Settlement Case 4 (精算事例④)
// ==========================================
let slide_case4 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide_case4.addText("EXAMPLE", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide_case4.addText("精算事例④", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

slide_case4.addText("契約期間中に順位変動があった場合", {
    x: 0.8, y: 1.1, w: 8, h: 0.3,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textMain
});

// --- Left side: Case Info ---
const case4Y = 1.7;
const case4LeftW = 4.2;

// Case info card
slide_case4.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: case4Y, w: case4LeftW, h: 3.2,
    fill: { color: "FFFFFF" }, line: { color: COLORS.line, width: 1 }, rectRadius: 0.1
});

// Keyword info
slide_case4.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: case4Y + 0.15, w: 1.4, h: 0.35,
    fill: { color: "EFF6FF" }, rectRadius: 0.06
});
slide_case4.addText("対策KW", {
    x: 0.8, y: case4Y + 0.18, w: 1.4, h: 0.3,
    align: "center", fontSize: 10, fontFace: FONT_JP, bold: true, color: "3B82F6"
});
slide_case4.addText("SEO対策 おすすめ", {
    x: 2.3, y: case4Y + 0.18, w: 2.3, h: 0.3,
    fontSize: 12, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});

// Divider
slide_case4.addShape(pres.ShapeType.line, {
    x: 0.8, y: case4Y + 0.7, w: 3.8, h: 0,
    line: { color: COLORS.line, dashType: "dash" }
});

// Ranking history label
slide_case4.addText("契約期間中（6ヶ月間）の順位推移", {
    x: 0.8, y: case4Y + 0.85, w: 3.8, h: 0.3,
    fontSize: 11, fontFace: FONT_JP, color: COLORS.textSub
});

// Timeline with rankings
const timeY = case4Y + 1.2;

// Month labels
slide_case4.addText("4月", { x: 0.85, y: timeY, w: 0.55, h: 0.25, align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub });
slide_case4.addText("5月", { x: 1.45, y: timeY, w: 0.55, h: 0.25, align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub });
slide_case4.addText("6月", { x: 2.05, y: timeY, w: 0.55, h: 0.25, align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub });
slide_case4.addText("7月", { x: 2.65, y: timeY, w: 0.55, h: 0.25, align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub });
slide_case4.addText("8月", { x: 3.25, y: timeY, w: 0.55, h: 0.25, align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub });
slide_case4.addText("9月", { x: 3.85, y: timeY, w: 0.55, h: 0.25, align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub });

// Ranking boxes - showing fluctuation over 6 months
slide_case4.addShape(pres.ShapeType.roundRect, { x: 0.85, y: timeY + 0.3, w: 0.55, h: 0.45, fill: { color: "FEF2F2" }, line: { color: "FECACA" }, rectRadius: 0.06 });
slide_case4.addText("30位", { x: 0.85, y: timeY + 0.38, w: 0.55, h: 0.3, align: "center", fontSize: 9, fontFace: FONT_JP, color: "B91C1C" });

slide_case4.addShape(pres.ShapeType.roundRect, { x: 1.45, y: timeY + 0.3, w: 0.55, h: 0.45, fill: { color: "FEF2F2" }, line: { color: "FECACA" }, rectRadius: 0.06 });
slide_case4.addText("22位", { x: 1.45, y: timeY + 0.38, w: 0.55, h: 0.3, align: "center", fontSize: 9, fontFace: FONT_JP, color: "B91C1C" });

slide_case4.addShape(pres.ShapeType.roundRect, { x: 2.05, y: timeY + 0.3, w: 0.55, h: 0.45, fill: { color: "FEF3C7" }, line: { color: COLORS.gold }, rectRadius: 0.06 });
slide_case4.addText("12位", { x: 2.05, y: timeY + 0.38, w: 0.55, h: 0.3, align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.gold });

slide_case4.addShape(pres.ShapeType.roundRect, { x: 2.65, y: timeY + 0.3, w: 0.55, h: 0.45, fill: { color: "F0FDF4" }, line: { color: "22C55E" }, rectRadius: 0.06 });
slide_case4.addText("8位", { x: 2.65, y: timeY + 0.38, w: 0.55, h: 0.3, align: "center", fontSize: 9, fontFace: FONT_JP, bold: true, color: "16A34A" });

slide_case4.addShape(pres.ShapeType.roundRect, { x: 3.25, y: timeY + 0.3, w: 0.55, h: 0.45, fill: { color: "F0FDF4" }, line: { color: "22C55E" }, rectRadius: 0.06 });
slide_case4.addText("5位", { x: 3.25, y: timeY + 0.38, w: 0.55, h: 0.3, align: "center", fontSize: 9, fontFace: FONT_JP, bold: true, color: "16A34A" });

slide_case4.addShape(pres.ShapeType.roundRect, { x: 3.85, y: timeY + 0.3, w: 0.55, h: 0.45, fill: { color: "F0FDF4" }, line: { color: "22C55E" }, rectRadius: 0.06 });
slide_case4.addText("3位", { x: 3.85, y: timeY + 0.38, w: 0.55, h: 0.3, align: "center", fontSize: 9, fontFace: FONT_JP, bold: true, color: "16A34A" });

// 6-month average calculation
slide_case4.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: case4Y + 2.0, w: 3.8, h: 0.5,
    fill: { color: "FEF2F2" }, line: { color: "EF4444" }, rectRadius: 0.06
});
slide_case4.addText("6ヶ月間の平均掲載順位：13.3位", {
    x: 0.8, y: case4Y + 2.1, w: 3.8, h: 0.3,
    align: "center", fontSize: 12, fontFace: FONT_JP, bold: true, color: "EF4444"
});

// Important note
slide_case4.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: case4Y + 2.6, w: 3.8, h: 0.5,
    fill: { color: "FEF3C7" }, line: { color: COLORS.gold }, rectRadius: 0.06
});
slide_case4.addText("成果条件：平均10位以内\n& 合計表示回数100回以上", {
    x: 0.8, y: case4Y + 2.62, w: 3.8, h: 0.45,
    align: "center", fontSize: 9, fontFace: FONT_JP, bold: true, color: COLORS.gold, lineSpacing: 13
});

// --- Arrow ---
slide_case4.addShape(pres.ShapeType.line, {
    x: 5.0, y: case4Y + 1.6, w: 0.5, h: 0,
    line: { color: COLORS.textSub, width: 3, endArrowType: "triangle" }
});

// --- Right side: Result ---
const case4RightX = 5.7;
slide_case4.addShape(pres.ShapeType.roundRect, {
    x: case4RightX, y: case4Y, w: 3.5, h: 3.2,
    fill: { color: "FEF2F2" }, line: { color: "EF4444", width: 2 }, rectRadius: 0.1
});

// Not achieved badge
slide_case4.addShape(pres.ShapeType.roundRect, {
    x: case4RightX + 0.9, y: case4Y + 0.25, w: 1.7, h: 0.4,
    fill: { color: "EF4444" }, rectRadius: 0.08
});
slide_case4.addText("成果対象外", {
    x: case4RightX + 0.9, y: case4Y + 0.28, w: 1.7, h: 0.35,
    align: "center", fontSize: 14, fontFace: FONT_JP, bold: true, color: "FFFFFF"
});

// Reason
slide_case4.addText("6ヶ月間の平均順位が\n10位以内ではないため", {
    x: case4RightX, y: case4Y + 0.85, w: 3.5, h: 0.5,
    align: "center", fontSize: 11, fontFace: FONT_JP, color: "B91C1C", lineSpacing: 14
});

// Divider
slide_case4.addShape(pres.ShapeType.line, {
    x: case4RightX + 0.3, y: case4Y + 1.5, w: 2.9, h: 0,
    line: { color: "FECACA" }
});

// Amount
slide_case4.addText("このキーワードの精算額", {
    x: case4RightX, y: case4Y + 1.7, w: 3.5, h: 0.25,
    align: "center", fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub
});
slide_case4.addText("¥0", {
    x: case4RightX, y: case4Y + 2.0, w: 3.5, h: 0.7,
    align: "center", fontSize: 36, fontFace: FONT_EN, bold: true, color: "EF4444"
});

slide_case4.addText("預り金からの差し引きなし", {
    x: case4RightX, y: case4Y + 2.7, w: 3.5, h: 0.3,
    align: "center", fontSize: 11, fontFace: FONT_JP, color: "B91C1C"
});


// ==========================================
// Slide 11-8: Flexible Approach (柔軟対応)
// ==========================================
let slide_flexible = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide_flexible.addText("FLEXIBLE", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide_flexible.addText("柔軟な対応が可能です", {
    x: 0.8, y: 0.6, w: 8, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

// Main message box
slide_flexible.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 1.4, w: 8.4, h: 2.0,
    fill: { color: "FAFAFA" }, line: { color: COLORS.line }, rectRadius: 0.15
});

slide_flexible.addText("基本ルールは契約書で明文化。\n事前合意の上でカスタマイズも可能です。", {
    x: 1.0, y: 1.6, w: 8.0, h: 0.8,
    fontSize: 16, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 28, align: "center"
});

slide_flexible.addText("貴社の状況やご要望に応じて、柔軟に対応いたします。", {
    x: 1.0, y: 2.5, w: 8.0, h: 0.5,
    fontSize: 14, fontFace: FONT_JP, color: COLORS.textSub, align: "center"
});

// Examples of flexibility
const flexY = 3.6;
const flexBoxW = 2.5;
const flexGap = 0.35;

// Example 1
slide_flexible.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: flexY, w: flexBoxW, h: 1.2,
    fill: { color: "FFFFFF" }, line: { color: COLORS.gold, width: 1 }, rectRadius: 0.08
});
slide_flexible.addText("キーワード選定", {
    x: 0.8, y: flexY + 0.15, w: flexBoxW, h: 0.3,
    align: "center", fontSize: 11, fontFace: FONT_JP, bold: true, color: COLORS.gold
});
slide_flexible.addText("貴社指定のキーワードや\n特定ジャンルへの\n集中対策も可能", {
    x: 0.9, y: flexY + 0.5, w: flexBoxW - 0.2, h: 0.65,
    align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 12
});

// Example 2
slide_flexible.addShape(pres.ShapeType.roundRect, {
    x: 0.8 + flexBoxW + flexGap, y: flexY, w: flexBoxW, h: 1.2,
    fill: { color: "FFFFFF" }, line: { color: COLORS.gold, width: 1 }, rectRadius: 0.08
});
slide_flexible.addText("成果条件", {
    x: 0.8 + flexBoxW + flexGap, y: flexY + 0.15, w: flexBoxW, h: 0.3,
    align: "center", fontSize: 11, fontFace: FONT_JP, bold: true, color: COLORS.gold
});
slide_flexible.addText("目標順位や\n判定期間など\nご相談に応じます", {
    x: 0.9 + flexBoxW + flexGap, y: flexY + 0.5, w: flexBoxW - 0.2, h: 0.65,
    align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 12
});

// Example 3
slide_flexible.addShape(pres.ShapeType.roundRect, {
    x: 0.8 + (flexBoxW + flexGap) * 2, y: flexY, w: flexBoxW, h: 1.2,
    fill: { color: "FFFFFF" }, line: { color: COLORS.gold, width: 1 }, rectRadius: 0.08
});
slide_flexible.addText("記事数・期間", {
    x: 0.8 + (flexBoxW + flexGap) * 2, y: flexY + 0.15, w: flexBoxW, h: 0.3,
    align: "center", fontSize: 11, fontFace: FONT_JP, bold: true, color: COLORS.gold
});
slide_flexible.addText("ご予算や目標に合わせた\nプランの\nカスタマイズが可能", {
    x: 0.9 + (flexBoxW + flexGap) * 2, y: flexY + 0.5, w: flexBoxW - 0.2, h: 0.65,
    align: "center", fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub, lineSpacing: 12
});

// CTA message
slide_flexible.addShape(pres.ShapeType.roundRect, {
    x: 2.0, y: 5.0, w: 6.0, h: 0.55,
    fill: { color: COLORS.gold }, rectRadius: 0.08
});
slide_flexible.addText("まずはお気軽にご相談ください。最適な方法をご提案いたします。", {
    x: 2.0, y: 5.08, w: 6.0, h: 0.4,
    align: "center", fontSize: 12, fontFace: FONT_JP, bold: true, color: "FFFFFF"
});


// ==========================================
// Slide 12: Case Study (婚活メディア様) - CASE 1
// ==========================================
let slide_case_media = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide_case_media.addText("CASES", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide_case_media.addText("導入事例", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

const caseMediaY = 1.6;
const caseMediaH = 3.5;

// -- Case 1 Card: Main container --
slide_case_media.addShape(pres.ShapeType.rect, {
    x: 0.8, y: caseMediaY, w: 8.4, h: caseMediaH,
    fill: { color: "FFFFFF" }, line: { color: "E5E5E5", width: 1 },
    shadow: { type: 'outer', color: '000000', blur: 3, offset: 2, angle: 45, opacity: 0.1 }
});

// Tag (purple/pink theme)
slide_case_media.addShape(pres.ShapeType.rect, { x: 0.8, y: caseMediaY, w: 8.4, h: 0.5, fill: { color: "FDF4FF" } });
slide_case_media.addText("CASE 1 : 婚活メディア様", { x: 0.8, y: caseMediaY + 0.1, w: 8.4, h: 0.3, align: "center", fontSize: 10, bold: true, color: "A855F7", fontFace: FONT_JP });

// Left side: Big number emphasis design
const infoX = 1.0;
const infoY = caseMediaY + 0.6;

// Main highlight: "約10倍" with large text
slide_case_media.addText("約10倍", {
    x: infoX, y: infoY + 0.1, w: 3.2, h: 0.9,
    fontSize: 48, fontFace: FONT_JP, bold: true, color: "A855F7", align: "center"
});
slide_case_media.addText("の成長", {
    x: infoX, y: infoY + 0.85, w: 3.2, h: 0.4,
    fontSize: 18, fontFace: FONT_JP, color: COLORS.accent, align: "center"
});

// PV numbers: Before → After
slide_case_media.addText("月間PV数", {
    x: infoX, y: infoY + 1.4, w: 3.2, h: 0.25,
    fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub, align: "center"
});
slide_case_media.addText("2,500", {
    x: infoX, y: infoY + 1.65, w: 1.2, h: 0.5,
    fontSize: 24, fontFace: FONT_JP, bold: true, color: COLORS.textSub, align: "center"
});
slide_case_media.addText("→", {
    x: infoX + 1.2, y: infoY + 1.65, w: 0.8, h: 0.5,
    fontSize: 24, fontFace: FONT_JP, color: "A855F7", align: "center"
});
slide_case_media.addText("22,000", {
    x: infoX + 2.0, y: infoY + 1.65, w: 1.2, h: 0.5,
    fontSize: 24, fontFace: FONT_JP, bold: true, color: "A855F7", align: "center"
});

// Period info
slide_case_media.addShape(pres.ShapeType.line, { x: infoX + 0.3, y: infoY + 2.3, w: 2.6, h: 0, line: { color: "E5E5E5" } });
slide_case_media.addText("サポート期間: 11ヶ月", {
    x: infoX, y: infoY + 2.4, w: 3.2, h: 0.3,
    fontSize: 11, fontFace: FONT_JP, bold: true, color: COLORS.accent, align: "center"
});
slide_case_media.addText("2020年7月〜2021年5月", {
    x: infoX, y: infoY + 2.7, w: 3.2, h: 0.25,
    fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub, align: "center"
});

// Right side: Screenshot (actual data)
slide_case_media.addImage({
    path: "/Users/mizumayuuki/Downloads/スクリーンショット 2026-01-12 2.51.06.png",
    x: 4.4, y: caseMediaY + 0.6, w: 4.5, h: 2.85
});


// ==========================================
// Slide 12-2: Case Study (ヘルスケアメディア様) - CASE 2
// ==========================================
let slide_case_health = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide_case_health.addText("CASES", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide_case_health.addText("導入事例", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

const caseHealthY = 1.6;
const caseHealthH = 3.5;

// -- Case 2 Card: Main container --
slide_case_health.addShape(pres.ShapeType.rect, {
    x: 0.8, y: caseHealthY, w: 8.4, h: caseHealthH,
    fill: { color: "FFFFFF" }, line: { color: "E5E5E5", width: 1 },
    shadow: { type: 'outer', color: '000000', blur: 3, offset: 2, angle: 45, opacity: 0.1 }
});

// Tag (orange theme)
slide_case_health.addShape(pres.ShapeType.rect, { x: 0.8, y: caseHealthY, w: 8.4, h: 0.5, fill: { color: "FFF7ED" } });
slide_case_health.addText("CASE 2 : ヘルスケアメディア様", { x: 0.8, y: caseHealthY + 0.1, w: 8.4, h: 0.3, align: "center", fontSize: 10, bold: true, color: "F97316", fontFace: FONT_JP });

// Left side: Big number emphasis design
const healthInfoX = 1.0;
const healthInfoY = caseHealthY + 0.6;

// Main highlight: "2倍以上" with large text
slide_case_health.addText("2倍以上", {
    x: healthInfoX, y: healthInfoY + 0.1, w: 3.2, h: 0.9,
    fontSize: 48, fontFace: FONT_JP, bold: true, color: "F97316", align: "center"
});
slide_case_health.addText("の成長", {
    x: healthInfoX, y: healthInfoY + 0.85, w: 3.2, h: 0.4,
    fontSize: 18, fontFace: FONT_JP, color: COLORS.accent, align: "center"
});

// PV numbers: Before → After
slide_case_health.addText("月間PV数", {
    x: healthInfoX, y: healthInfoY + 1.4, w: 3.2, h: 0.25,
    fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub, align: "center"
});
slide_case_health.addText("1,500", {
    x: healthInfoX, y: healthInfoY + 1.65, w: 1.2, h: 0.5,
    fontSize: 24, fontFace: FONT_JP, bold: true, color: COLORS.textSub, align: "center"
});
slide_case_health.addText("→", {
    x: healthInfoX + 1.2, y: healthInfoY + 1.65, w: 0.8, h: 0.5,
    fontSize: 24, fontFace: FONT_JP, color: "F97316", align: "center"
});
slide_case_health.addText("4,000", {
    x: healthInfoX + 2.0, y: healthInfoY + 1.65, w: 1.2, h: 0.5,
    fontSize: 24, fontFace: FONT_JP, bold: true, color: "F97316", align: "center"
});

// Period info
slide_case_health.addShape(pres.ShapeType.line, { x: healthInfoX + 0.3, y: healthInfoY + 2.3, w: 2.6, h: 0, line: { color: "E5E5E5" } });
slide_case_health.addText("サポート期間: 7ヶ月", {
    x: healthInfoX, y: healthInfoY + 2.4, w: 3.2, h: 0.3,
    fontSize: 11, fontFace: FONT_JP, bold: true, color: COLORS.accent, align: "center"
});
slide_case_health.addText("2021年5月〜2021年11月", {
    x: healthInfoX, y: healthInfoY + 2.7, w: 3.2, h: 0.25,
    fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub, align: "center"
});

// Right side: Screenshot (actual data)
slide_case_health.addImage({
    path: "/Users/mizumayuuki/Downloads/スクリーンショット 2026-01-12 15.59.18.png",
    x: 4.4, y: caseHealthY + 0.6, w: 4.5, h: 2.85
});


// ==========================================
// Slide 12-3: Case Study (岐阜県の製造会社様 - 全額返金) - CASE 3
// ==========================================
let slide_case_refund = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide_case_refund.addText("CASES", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

// Header
slide_case_refund.addText("導入事例", {
    x: 0.8, y: 0.6, w: 6, h: 0.5,
    fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.gold
});

const caseRefundY = 1.6;
const caseRefundH = 3.5;

// -- Case 3 Card: Main container --
slide_case_refund.addShape(pres.ShapeType.rect, {
    x: 0.8, y: caseRefundY, w: 8.4, h: caseRefundH,
    fill: { color: "FFFFFF" }, line: { color: "E5E5E5", width: 1 },
    shadow: { type: 'outer', color: '000000', blur: 3, offset: 2, angle: 45, opacity: 0.1 }
});

// Tag (green theme)
slide_case_refund.addShape(pres.ShapeType.rect, { x: 0.8, y: caseRefundY, w: 8.4, h: 0.5, fill: { color: "F0FDF4" } });
slide_case_refund.addText("CASE 3 : 岐阜県の製造会社様", { x: 0.8, y: caseRefundY + 0.1, w: 8.4, h: 0.3, align: "center", fontSize: 10, bold: true, color: "10B981", fontFace: FONT_JP });

// Left side: Big number emphasis design
const refundInfoX = 1.0;
const refundInfoY = caseRefundY + 0.6;

// Main highlight: "全額返金" with large text
slide_case_refund.addText("全額返金", {
    x: refundInfoX, y: refundInfoY + 0.1, w: 3.2, h: 0.9,
    fontSize: 48, fontFace: FONT_JP, bold: true, color: "10B981", align: "center"
});
slide_case_refund.addText("を実施", {
    x: refundInfoX, y: refundInfoY + 0.85, w: 3.2, h: 0.4,
    fontSize: 18, fontFace: FONT_JP, color: COLORS.accent, align: "center"
});

// Details
slide_case_refund.addText("成果条件", {
    x: refundInfoX, y: refundInfoY + 1.4, w: 3.2, h: 0.25,
    fontSize: 10, fontFace: FONT_JP, color: COLORS.textSub, align: "center"
});
slide_case_refund.addText("難易度の高いKWに挑戦", {
    x: refundInfoX, y: refundInfoY + 1.65, w: 3.2, h: 0.35,
    fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.textSub, align: "center"
});
slide_case_refund.addText("→ 順位未達", {
    x: refundInfoX, y: refundInfoY + 2.0, w: 3.2, h: 0.35,
    fontSize: 14, fontFace: FONT_JP, bold: true, color: "10B981", align: "center"
});

// Period info
slide_case_refund.addShape(pres.ShapeType.line, { x: refundInfoX + 0.3, y: refundInfoY + 2.5, w: 2.6, h: 0, line: { color: "E5E5E5" } });
slide_case_refund.addText("6ヶ月満了時の判定により返金", {
    x: refundInfoX, y: refundInfoY + 2.6, w: 3.2, h: 0.3,
    fontSize: 10, fontFace: FONT_JP, color: COLORS.accent, align: "center"
});
slide_case_refund.addText("記事資産はそのまま御社に残る", {
    x: refundInfoX, y: refundInfoY + 2.85, w: 3.2, h: 0.25,
    fontSize: 9, fontFace: FONT_JP, color: COLORS.textSub, align: "center"
});

// Right side: Visual representation of refund
const refundVisualX = 5.4;
const refundVisualY = caseRefundY + 0.8;

// Large coin/shield visual
slide_case_refund.addShape(pres.ShapeType.ellipse, {
    x: refundVisualX, y: refundVisualY, w: 2.4, h: 2.4,
    fill: { color: "F0FDF4" }, line: { color: "10B981", width: 4 }
});
slide_case_refund.addText("¥", {
    x: refundVisualX, y: refundVisualY + 0.4, w: 2.4, h: 1.3,
    align: "center", fontSize: 70, bold: true, color: "10B981", fontFace: "Arial"
});
slide_case_refund.addText("REFUND", {
    x: refundVisualX, y: refundVisualY + 1.7, w: 2.4, h: 0.4,
    align: "center", fontSize: 12, bold: true, color: "10B981", fontFace: FONT_EN
});


// ==========================================
// Slide 13: FAQ Part 1 (Trust & Results)
// ==========================================
addSectionSlide(pres, "06", "INFORMATION", "FAQ & Pricing");
let slide13 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide13.addText("Q&A", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

slide13.addText("よくある質問 (1/3)", { x: 0.5, y: 0.5, w: 9, h: 0.5, fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.accent });

const faqY = 1.1; // Moved up
const faqW = 9.0;
const faqGap = 1.4; // Reduced gap

// Q1
slide13.addText("Q. 「結局は返金されないのでは？」という不安があるのですが", {
    x: 0.5, y: faqY, w: faqW, h: 0.3, fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.accent
});
slide13.addShape(pres.ShapeType.rect, { x: 0.5, y: faqY + 0.4, w: faqW, h: 1.0, fill: { color: "FAFAFA" }, line: { color: "E5E5E5" } });
slide13.addText("A. 返金条件は契約書で明文化し、双方で確認できる指標で判定します。\n条件と判定方法を事前に透明化しているため、「うやむやな判断」にはなりません。", {
    x: 0.7, y: faqY + 0.5, w: faqW - 0.4, h: 0.8, fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 16
});

// Q2
slide13.addText("Q. 誰も検索しないようなキーワードばかり選ばれることはありませんか？", {
    x: 0.5, y: faqY + faqGap, w: faqW, h: 0.3, fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.accent
});
slide13.addShape(pres.ShapeType.rect, { x: 0.5, y: faqY + faqGap + 0.4, w: faqW, h: 1.0, fill: { color: "FAFAFA" }, line: { color: "E5E5E5" } });
slide13.addText("A. ご安心ください。キーワード選定はお客様と合意の上で決定します。\nCVに近いワードをご提案します。意味のないワードで順位を上げても、私たちの実績にならないためです。", {
    x: 0.7, y: faqY + faqGap + 0.5, w: faqW - 0.4, h: 0.8, fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 16
});

// Q3
slide13.addText("Q. 万が一、成果が出なかった場合（失敗時）はどうなりますか？", {
    x: 0.5, y: faqY + (faqGap * 2), w: faqW, h: 0.3, fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.accent
});
slide13.addShape(pres.ShapeType.rect, { x: 0.5, y: faqY + (faqGap * 2) + 0.4, w: faqW, h: 1.0, fill: { color: "FFFBEB" }, line: { color: COLORS.gold } });
slide13.addText("A. 6ヶ月満了時の成果判定で未達の場合、預り金は全額返金されます。\nさらに、制作済みの記事の著作権は御社に譲渡し、返還や削除は求めません。", {
    x: 0.7, y: faqY + (faqGap * 2) + 0.5, w: faqW - 0.4, h: 0.8, fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 16
});


// ==========================================
// Slide 14: FAQ Part 2 (Money & Definition)
// ==========================================
let slide14 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide14.addText("Q&A", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

slide14.addText("よくある質問 (2/3)", { x: 0.5, y: 0.5, w: 9, h: 0.5, fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.accent });

// Q5
slide14.addText("Q. 「成果」の定義は何ですか？", {
    x: 0.5, y: faqY, w: faqW, h: 0.3, fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.accent
});
slide14.addShape(pres.ShapeType.rect, { x: 0.5, y: faqY + 0.4, w: faqW, h: 0.8, fill: { color: "FAFAFA" }, line: { color: "E5E5E5" } });
slide14.addText("A. 契約期間中に、Google検索で10位以内に表示されることを指します。\n成果報酬として預り金から「1記事あたり4万2,000円」を差し引きます（上限：預り金額）。", {
    x: 0.7, y: faqY + 0.5, w: faqW - 0.4, h: 0.6, fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 16
});

// Q6
slide14.addText("Q. 預り金は100万円のみですか？", {
    x: 0.5, y: faqY + 1.6, w: faqW, h: 0.3, fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.accent
});
slide14.addShape(pres.ShapeType.rect, { x: 0.5, y: faqY + 2.0, w: faqW, h: 2.0, fill: { color: "FAFAFA" }, line: { color: "E5E5E5" } });
slide14.addText("A. 幅広く対応しておりますが、現在以下の3プランをご用意しております。", {
    x: 0.7, y: faqY + 2.1, w: faqW - 0.4, h: 0.3, fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain
});

// Plan Table
const tableY = faqY + 2.5;
slide14.addText("プラン", { x: 1.0, y: tableY, w: 2.5, h: 0.3, fontSize: 10, bold: true, color: COLORS.textSub, fontFace: FONT_JP });
slide14.addText("制作本数", { x: 4.0, y: tableY, w: 2.5, h: 0.3, fontSize: 10, bold: true, color: COLORS.textSub, fontFace: FONT_JP });
slide14.addText("特徴", { x: 7.0, y: tableY, w: 2.0, h: 0.3, fontSize: 10, bold: true, color: COLORS.textSub, fontFace: FONT_JP });

// 50
slide14.addShape(pres.ShapeType.line, { x: 1.0, y: tableY + 0.3, w: 8.0, h: 0, line: { color: "E5E5E5" } });
slide14.addText("預り金  50万円", { x: 1.0, y: tableY + 0.4, w: 2.5, h: 0.3, fontSize: 12, bold: true, color: COLORS.textMain, fontFace: FONT_JP });
slide14.addText("半年で 12本", { x: 4.0, y: tableY + 0.4, w: 2.5, h: 0.3, fontSize: 12, color: COLORS.textMain, fontFace: FONT_JP });

// 100
slide14.addShape(pres.ShapeType.line, { x: 1.0, y: tableY + 0.8, w: 8.0, h: 0, line: { color: "E5E5E5" } });
slide14.addText("預り金 100万円", { x: 1.0, y: tableY + 0.9, w: 2.5, h: 0.3, fontSize: 12, bold: true, color: COLORS.gold, fontFace: FONT_JP });
slide14.addText("半年で 24本", { x: 4.0, y: tableY + 0.9, w: 2.5, h: 0.3, fontSize: 12, color: COLORS.textMain, fontFace: FONT_JP });
slide14.addText("標準プラン", { x: 7.0, y: tableY + 0.9, w: 2.0, h: 0.3, fontSize: 10, color: COLORS.gold, fontFace: FONT_JP, bold: true });

// 200
slide14.addShape(pres.ShapeType.line, { x: 1.0, y: tableY + 1.3, w: 8.0, h: 0, line: { color: "E5E5E5" } });
slide14.addText("預り金 200万円", { x: 1.0, y: tableY + 1.4, w: 2.5, h: 0.3, fontSize: 12, bold: true, color: COLORS.textMain, fontFace: FONT_JP });
slide14.addText("半年で 48本", { x: 4.0, y: tableY + 1.4, w: 2.5, h: 0.3, fontSize: 12, color: COLORS.textMain, fontFace: FONT_JP });


// ==========================================
// Slide 15: FAQ Part 3 (Target & Terms)
// ==========================================
let slide15 = pres.addSlide({ masterName: "MASTER_CLEAN" });
slide15.addText("Q&A", { x: 0.5, y: 0.2, w: 9, h: 1.5, fontSize: 100, bold: true, color: "F3F4F6", fontFace: "Arial Black" });

slide15.addText("よくある質問 (3/3)", { x: 0.5, y: 0.5, w: 9, h: 0.5, fontSize: 32, fontFace: FONT_JP, bold: true, color: COLORS.accent });

// Q4
slide15.addText("Q. どのような企業が対象ですか？", {
    x: 0.5, y: faqY, w: faqW, h: 0.3, fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.accent
});
slide15.addShape(pres.ShapeType.rect, { x: 0.5, y: faqY + 0.4, w: faqW, h: 1.2, fill: { color: "FAFAFA" }, line: { color: "E5E5E5" } });
slide15.addText("A. 「広告費はかけているがSEOは後回し」「意思決定が早い」という企業様に最適です。\n※以下のような場合はお断りしています。\n個人サイト・趣味ブログ・検証目的・コンテンツ運用体制がない・決裁に半年以上かかる場合。", {
    x: 0.7, y: faqY + 0.5, w: faqW - 0.4, h: 1.0, fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 16
});

// Q7
slide15.addText("Q. 6ヶ月経つまでに解約（途中解約）はできますか？", {
    x: 0.5, y: faqY + 2.0, w: faqW, h: 0.3, fontSize: 14, fontFace: FONT_JP, bold: true, color: COLORS.accent
});
slide15.addShape(pres.ShapeType.rect, { x: 0.5, y: faqY + 2.4, w: faqW, h: 1.2, fill: { color: "FAFAFA" }, line: { color: "E5E5E5" } });
slide15.addText("A. 原則として、6ヶ月未満での解約はお断りしています。\n私たちが記事制作コストを全額先行投資（リスク負担）しているためです。\nやむを得ない事情で解約される場合は、返金保証対象外となり、実費のみ精算いただきます。", {
    x: 0.7, y: faqY + 2.5, w: faqW - 0.4, h: 1.0, fontSize: 11, fontFace: FONT_JP, color: COLORS.textMain, lineSpacing: 16
});


// ==========================================
// Slide 17: Closing
// ==========================================
let slide17 = pres.addSlide({ masterName: "MASTER_CLEAN" });

// Centered "Thank You"
slide17.addText("Thank You", {
    x: 0, y: 1.8, w: 10, h: 1.0,
    align: "center", fontSize: 60, bold: true, color: COLORS.gold, fontFace: "Arial Black"
});

slide17.addText("ご清聴ありがとうございました。", {
    x: 0, y: 2.8, w: 10, h: 0.5,
    align: "center", fontSize: 18, fontFace: FONT_JP, color: COLORS.textMain
});

slide17.addShape(pres.ShapeType.line, {
    x: 3.5, y: 3.5, w: 3, h: 0, line: { color: COLORS.line, width: 1 }
});

// Company Info
slide17.addText("株式会社AIMA", {
    x: 0, y: 3.8, w: 10, h: 0.5,
    align: "center", fontSize: 16, fontFace: FONT_JP, bold: true, color: COLORS.textMain
});


// Save
pres.writeFile({ fileName: path.join(__dirname, "0円SEO_Project.pptx") })
    .then(fileName => {
        console.log(`Created file: ${fileName}`);
    })
    .catch(err => {
        console.error(err);
    });

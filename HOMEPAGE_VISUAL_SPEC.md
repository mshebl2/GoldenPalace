# HOMEPAGE VISUAL SPECIFICATION
## القصر الذهبي للدهانات والديكورات الحديثة
### Reference Image: `homepage-reference.png` (682 x 1024 px)

---

## 1. Reference Image Dimensions & Section Bounds

| Section | Y-Start (px) | Y-End (px) | Height (px) | Height Ratio | Background Color |
|---|---|---|---|---|---|
| **01. Top Contact Bar** | 0 | 22 | 22px | 2.1% | `#061426` |
| **02. Main Navigation** | 22 | 68 | 46px | 4.5% | `#081B33` |
| **03. Hero Section** | 68 | 288 | 220px | 21.5% | Split (`#061426` / Photo + Curved Arc) |
| **04. Offers Section** | 288 | 585 | 297px | 29.0% | `#F8F7F4` + Gold corner brush strokes |
| **05. Services Section** | 585 | 738 | 153px | 15.0% | `#FFFFFF` |
| **06. Portfolio Section** | 738 | 892 | 154px | 15.0% | `#F8F7F4` |
| **07. Why Choose Us** | 892 | 1024 | 132px | 12.9% | `#FFFFFF` with vertical dividers |

> **Crucial Instruction**: The reference image terminates at Section 07 (Why Choose Us). No subsequent sections (About, Work Process, Testimonials, Quote Banner, Footer) are present in this homepage reference image and therefore will not be added to the homepage.

---

## 2. Color Sampling (Hex Values Directly from Reference)

```css
:root {
  /* Navy Tones */
  --navy-darkest: #061426;  /* Top bar, deepest navy shadows */
  --navy-primary: #081B33;  /* Nav bar, hero right panel, offer header, included box */
  --navy-card:    #0D233F;  /* Sub-cards inside included box */

  /* Gold Tones */
  --gold-primary: #D4A63D;  /* Main metallic gold, icons, buttons, active link */
  --gold-light:   #F5D77A;  /* Highlight shimmer, light gold icons */
  --gold-dark:    #A87818;  /* Gold button hover & borders */

  /* Surface & Text */
  --bg-cream:     #F8F7F4;  /* Offers and Portfolio background */
  --bg-white:     #FFFFFF;  /* Services, Why Choose Us, card surfaces */
  --text-navy:    #081B33;  /* Primary heading text */
  --text-muted:   #556477;  /* Secondary text and struck prices */
  --price-red:    #D82323;  /* Active offer prices (500, 700, 1000, 100, 90) */
  --jotun-yellow: #F39200;  /* Official Jotun brand emblem */
}
```

---

## 3. Detailed Component Geometry & Layout Analysis

### Section 01: Top Contact Bar
- **Height**: ~22px relative, desktop ~32px.
- **RTL Start (Right)**:
  - Gold Map Pin + `نخدم مناطق: الخبر - الدمام - القطيف` (Font size: ~11px)
  - Green WhatsApp circle icon + `تواصل عبر واتساب` (Font size: ~11px)
- **RTL End (Left)**:
  - Gold Phone icon + `اتصل الآن: 0561095505` (Bold, font size: ~11px)

### Section 02: Main Navigation
- **Height**: ~46px relative, desktop ~68px.
- **RTL Start (Right)**:
  - Golden Palace Logo: House silhouette with paint roller on roof + Arabic calligraphy "القصر الذهبي" + "للدهانات والديكورات الحديثة".
- **Center Navigation**:
  - `الرئيسية` (Active in gold with small gold underline)
  - `من نحن`
  - `خدماتنا`
  - `أعمالنا`
  - `العروض`
  - `المدونة`
  - `تواصل معنا`
- **RTL End (Left)**:
  - Small gold button with rounded corners (~8px radius): Document icon + `اطلب عرض سعر`.

### Section 03: Hero Section
- **Composition**: Full-width unified container.
- **Left (56% width)**:
  - Ultra-realistic luxury modern classic living room:
    - Cream beige sectional sofa with navy blue accent cushions.
    - Two circular coffee tables (one light marble top with gold wire base, one darker).
    - Deep navy blue decorative wall paneling with gold wall sconces and large abstract blue/gold artwork.
    - Floor-to-ceiling white curtains with soft daylight.
    - Polished light marble flooring, recessed ceiling cove light.
- **Right (44% width)**:
  - Deep dark navy `#081B33` panel.
  - Separated from the living room by an **organic curved golden arc** bowing toward the photo.
  - Centered content:
    - Emblem: Golden house outline with paint roller on roof.
    - Title: Large 3D metallic gold `القصر الذهبي`.
    - Subtitle: White bold `للدهانات والديكورات الحديثة`.
    - Paragraph text: `حلول متكاملة في أعمال الدهانات والديكورات للمنازل والفلل والمشاريع التجارية، بتشطيبات عصرية وجودة عالية`.
    - Two buttons:
      - Right: Gold button `اطلب عرض سعر` with document icon.
      - Left: Navy button with gold border `تواصل عبر واتساب` with WhatsApp icon.
    - Three carousel indicator dots below (Gold, White, White).

### Section 04: Offers Section (عروضنا الحالية)
- **Background**: `#F8F7F4` with subtle gold corner brush strokes.
- **Heading**: `عروضنا الحالية` with gold decorative line + diamond center.
- **Subtitle**: `جدّد منزلك بأفضل عروض الدهانات والتشطيبات`.
- **RTL Right Column**:
  - Tall dark navy card: `العرض شامل التالي` with gold border and rounded corners (~16px).
  - 5 stacked items with circular gold/white icons:
    1. `معالجة أركان الجدران بالمعجون` (Putty knife icon)
    2. `وجه سنفرة` (Sandpaper icon)
    3. `وجه أساس` (Primer roller icon)
    4. `وجهين تشطيب` (Finish paint bucket icon)
    5. `نظافة مكان العمل` (Cleaning broom icon)
  - Bottom: `نوع الصبغ` in text + `JOTUN` brand logo + paint can graphic.
- **RTL Left Column**:
  - **Top Row (3 Cards)**:
    - `الغرفة`: 500 ريال (700 struck through) + Gold button `اطلب العرض`
    - `غرفتان`: 700 ريال (1000 struck through) + Gold button `اطلب العرض`
    - `3 غرف`: 1000 ريال (1300 struck through) + Gold button `اطلب العرض`
  - **Bottom Row**:
    - `السقف`: 100 ريال + Gold button `اطلب العرض`
    - `الباب`: 90 ريال + Gold button `اطلب العرض`

### Section 05: Services Section (خدماتنا)
- **Background**: Pure white `#FFFFFF`.
- **Heading**: `خدماتنا` + gold decorative bar.
- **Subtitle**: `نقدم مجموعة من خدمات الدهانات والديكورات لتجديد المساحات السكنية والتجارية`.
- **5 Cards in a Single Row (From Right to Left in RTL)**:
  1. `دهانات داخلية وخارجية`
  2. `دهانات الأسقف`
  3. `الديكورات الجدارية`
  4. `دهان الأبواب`
  5. `تشطيب الواجهات والمباني`
- Each card has an arched/rounded top image, overlapping circular navy badge at bottom of image with gold icon, and dark navy title below.

### Section 06: Portfolio Section (من أعمالنا)
- **Background**: `#F8F7F4`.
- **Heading**: `من أعمالنا` + gold decorative bar.
- **Subtitle**: `اكتشف نماذج من أعمال الدهانات والديكورات`.
- **Filter Pills**:
  - `الكل` (Active gold pill)
  - `دهانات داخلية`
  - `دهانات خارجية`
  - `ديكورات`
  - `أسقف`
- **4 Photos in a Row (From Right to Left)**:
  1. Villa exterior with palm trees.
  2. Navy blue textured feature wall with cream sofa.
  3. Grey marble slab wall with warm vertical LED lighting.
  4. Modern layered gypsum ceiling with circular cove lighting.

### Section 07: Why Choose Us (لماذا القصر الذهبي؟)
- **Background**: Pure white `#FFFFFF`.
- **Heading**: `لماذا القصر الذهبي؟` in dark navy bold.
- **5 Features in a Single Row with Vertical Dividers (From Right to Left)**:
  1. `أسعار تنافسية وعروض مميزة` / `أفضل الأسعار بجودة عالية` (Tag icon)
  2. `الالتزام بالمواعيد` / `تنفيذ الأعمال في الوقت المتفق عليه` (Calendar icon)
  3. `فريق عمل محترف` / `فريق ذو خبرة في جميع أعمال الدهانات والتشطيبات` (Team icon)
  4. `تصاميم عصرية ومتنوعة` / `حلول ديكورية تناسب كل الأذواق` (Layers icon)
  5. `الاهتمام بجودة التنفيذ` / `نستخدم خامات عالية ونعتمد على تنفيذ دقيق` (Checkmark icon)

---

## 4. End of Page
The homepage strictly stops after Section 07 (Why Choose Us), matching the reference screenshot exactly.

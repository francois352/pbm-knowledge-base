# Claude Code Web - Content Generation Strategy
**Purpose:** Maximize free credits to generate 30+ knowledge base articles
**Platform:** https://claude.ai (Claude Code Web)
**Budget:** Free tier credits
**Timeline:** This week

---

## 💡 STRATEGY: Batch Processing with Projects

### **Why Claude Code Web?**
- ✅ Free tier includes generous credits
- ✅ Projects feature = persistent context (don't repeat instructions)
- ✅ Can upload documents (Lisa's PDFs)
- ✅ Artifacts for HTML generation
- ✅ Web-based (work from anywhere)

---

## 🎯 EFFICIENT WORKFLOW

### **Step 1: Create Claude Project** (One-time setup)

**Project Name:** "PBM Knowledge Base - Content Generation"

**Upload These Files to Project:**
1. `extracted-content/lisa_comprehensive_review.txt`
2. `extracted-content/lisa_vielight_nfb_synergy.txt`
3. `extracted-content/neuro4_user_guide.txt`
4. `extracted-content/vagus_user_guide.txt`
5. `PBM-OFFER-DETAILS-2025.md`
6. `docs/style.css` (for design consistency)

**Project Instructions (Custom Instructions):**
```
You are creating articles for a PBM knowledge base.

CRITICAL RULES:
- Use EXACT pricing from PBM-OFFER-DETAILS-2025.md (€3,700-4,000)
- Match design: Purple (#5d2c4c) + Pink (#ff00ab)
- Base content on Lisa Lai's extracted PDFs
- Patient-friendly language (not academic)
- Include: Meta description, related articles section
- Format: HTML matching docs/style.css structure

Target audience: Prospective PBM patients
Tone: Professional but accessible
Length: 1,500-2,500 words per article
```

---

## 📝 BATCH GENERATION PROMPTS

### **Batch 1: Device Pages (5 articles)**

**Single Prompt (Generates All 5):**
```
Create 5 device pages using the uploaded content:

1. Vielight Neuro Gamma (from lisa_vielight_nfb_synergy.txt)
2. Vielight Neuro Alpha (from lisa_vielight_nfb_synergy.txt)
3. Vielight Neuro Duo 4 (from neuro4_user_guide.txt)
4. Vielight Vagus (from vagus_user_guide.txt)
5. Device Comparison Chart (combine all)

For EACH device, include:
- What it is (technology, wavelength)
- Who it's for (target conditions)
- How to use (protocol)
- What's included (from PBM packs if applicable)
- Scientific evidence (from research PDFs)
- Pricing (from PBM-OFFER-DETAILS-2025.md)
- Related articles section

Format as HTML artifacts matching docs/style.css
Include breadcrumbs and navigation
Mobile-responsive

Output each as separate artifact.
```

**Credits Used:** ~1 prompt (efficient)
**Output:** 5 complete HTML pages

---

### **Batch 2: Clinical Applications (6 articles)**

**Single Prompt:**
```
Create 6 clinical application articles using lisa_comprehensive_review.txt:

1. PBM for Alzheimer's & Dementia
2. PBM for Depression & Anxiety
3. PBM for Parkinson's Disease
4. PBM for Autism Spectrum Disorder
5. PBM for Traumatic Brain Injury
6. PBM for Cognitive Enhancement

For EACH condition, include:
- Overview of condition
- How PBM helps (mechanisms)
- Research evidence (from Lisa's review)
- Which Vielight device to use
- Expected outcomes
- Safety considerations
- References

Format: HTML artifacts
Include: Meta descriptions, related articles
Match: docs/style.css design
```

**Credits Used:** ~1 prompt
**Output:** 6 complete articles

---

### **Batch 3: Guides & Resources (4 articles)**

**Single Prompt:**
```
Convert these markdown files to HTML knowledge base articles:

Upload:
- tPBM-Patient-Guide.md (from GitHub)
- tPBM-FAQ.md
- tPBM-Quick-Reference.md
- tPBM-Neurofeedback-Combination-Guide.md

For EACH:
- Convert MD → HTML
- Match docs/style.css design
- Add breadcrumbs
- Add related articles section
- Preserve all formatting (lists, headings, emphasis)

Output as 4 separate artifacts.
```

**Credits Used:** ~1 prompt
**Output:** 4 complete pages

---

### **Batch 4: Research & Evidence (5 articles)**

**Single Prompt:**
```
Create research section articles:

1. Research Bibliography (index all 54 PDFs from lisa_comprehensive_review.txt references)
2. Clinical Studies Overview (summarize top 10 studies)
3. Mechanisms of Action (deep dive from Lisa's review)
4. Safety & Contraindications (comprehensive guide)
5. Future Research Directions (from Lisa's "research gaps" section)

For EACH:
- Cite specific studies
- Include: Authors, year, key findings
- Link to: Full PDFs (placeholder links)
- Professional scientific tone (but accessible)
- Include: Related articles

Format: HTML matching design system
```

**Credits Used:** ~1 prompt
**Output:** 5 research pages

---

### **Batch 5: Basics & Fundamentals (4 articles)**

**Single Prompt:**
```
Create foundational PBM education articles:

1. How Photobiomodulation Works (mechanisms deep-dive)
2. PBM Parameters Explained (wavelength, dose, frequency)
3. Transcranial vs Intranasal PBM (comparison)
4. History & Development of PBM (timeline)

Source: lisa_comprehensive_review.txt

For EACH:
- Patient-friendly explanations
- Visual aids (describe images needed)
- Examples and analogies
- Scientific accuracy
- Avoid jargon (or explain it)

Format: HTML artifacts
Include: Diagrams descriptions (for future illustration)
```

**Credits Used:** ~1 prompt
**Output:** 4 educational pages

---

## 📊 TOTAL GENERATION PLAN

| Batch | Articles | Prompts | Credits | Output |
|-------|----------|---------|---------|--------|
| Batch 1 | 5 devices | 1 | Low | 5 HTML pages |
| Batch 2 | 6 clinical | 1 | Low | 6 HTML pages |
| Batch 3 | 4 guides | 1 | Low | 4 HTML pages |
| Batch 4 | 5 research | 1 | Low | 5 HTML pages |
| Batch 5 | 4 basics | 1 | Low | 4 HTML pages |
| **TOTAL** | **24 articles** | **5 prompts** | **~5-10% of free tier** | **24 pages** |

**Estimated Time:** 2-3 hours (mostly copy-paste)
**Credits Used:** Minimal (batch processing is efficient)

---

## 💎 PRO TIPS: Maximize Free Credits

### **1. Use Projects Feature**
- Upload all source documents ONCE
- Context persists across conversations
- Don't re-upload or re-explain

### **2. Batch Requests**
- Generate 5-6 articles per prompt
- Use artifacts (downloads easily)
- More efficient than 1 article per prompt

### **3. Use Haiku for Drafts**
- Switch to Haiku model (cheaper)
- Generate structure/outlines
- Switch to Sonnet for final polish

### **4. Leverage Uploaded Content**
- Reference files by name
- Don't paste content in prompts
- Saves massive tokens

### **5. Use Artifacts**
- Request HTML artifacts
- Downloads directly
- No copy-paste needed

---

## 🔄 STEP-BY-STEP EXECUTION

### **Day 1: Setup (30 minutes)**

1. Go to https://claude.ai
2. Create new Project: "PBM Knowledge Base"
3. Upload 6 files (listed above)
4. Add custom instructions
5. Test with one article

### **Day 2-3: Batch Generation (2 hours)**

**Run 5 prompts** (one per batch):
- Batch 1: Devices (30 min)
- Batch 2: Clinical (30 min)
- Batch 3: Guides (20 min)
- Batch 4: Research (30 min)
- Batch 5: Basics (20 min)

**For each batch:**
1. Send prompt
2. Download artifacts (HTML files)
3. Save to correct folder in ai-helpdesk/docs/
4. Update search index

### **Day 4: Quality Check (1 hour)**

- Review all 24 pages
- Check pricing matches (€3,700-4,000)
- Verify links work
- Test mobile responsive
- Fix any issues

### **Day 5: Deploy (30 minutes)**

```bash
cd ~/Projects/ai-helpdesk
git add docs/
git commit -m "feat: Add 24 new articles from Claude Web generation"
git push
```

**Live in 3 minutes!**

---

## 📋 ALTERNATIVE: Use This CLI (Even More Efficient)

**If you want to stay in Claude Code CLI:**

Create one file with all prompts, run locally:

```bash
# File: generate-articles.sh
#!/bin/bash

# Uses local Claude Code to generate
# Reads from extracted-content/
# Outputs to docs/

# Batch 1: Devices
# Batch 2: Clinical
# etc...
```

**Advantage:** No web browser needed
**Disadvantage:** Uses local credits (not free tier)

---

## 🎯 RECOMMENDED APPROACH

**Use Claude Code Web for bulk generation:**
- Free credits
- Artifacts feature
- Fast downloads

**Use CLI for:**
- Final edits
- Search index updates
- Deployment

**Best of Both Worlds!**

---

## 💰 Credit Usage Estimate

**Free Tier:** ~$5-10 in credits per month

**This Project:**
- 5 batch prompts: ~$0.50-1.00
- 24 HTML artifacts: Included
- Quality revisions: ~$0.25

**Total:** ~$1-2 (well within free tier)

**Remaining Credits:** $4-9 for other work

---

## ✅ EXECUTION CHECKLIST

**Tonight (5 minutes):**
- [ ] Go to claude.ai
- [ ] Create Project: "PBM Knowledge Base"
- [ ] Upload 6 files
- [ ] Add custom instructions
- [ ] Bookmark project

**Tomorrow (2-3 hours):**
- [ ] Run Batch 1 prompt → 5 device pages
- [ ] Run Batch 2 prompt → 6 clinical pages
- [ ] Run Batch 3 prompt → 4 guide pages
- [ ] Run Batch 4 prompt → 5 research pages
- [ ] Run Batch 5 prompt → 4 basics pages
- [ ] Download all artifacts
- [ ] Save to docs/ folders
- [ ] Update search index
- [ ] Git commit + push
- [ ] Test live site

**Result:**
- ✅ 24 new articles
- ✅ Knowledge base 90% complete
- ✅ Still have free credits remaining

---

## 🎉 BONUS: Template for Each Prompt

```
Create [NUMBER] [CATEGORY] articles:

1. [Title 1]
2. [Title 2]
...

Source: [uploaded-file.txt]

For EACH article, include:
- H1 title
- Meta description (150 chars)
- Introduction (2-3 paragraphs)
- Main content (well-structured sections)
- Key takeaways
- Related articles (3-4 links)
- Call-to-action

Format: HTML artifact matching docs/style.css
Design: Purple (#5d2c4c) branding
Pricing: Use EXACT values from PBM-OFFER-DETAILS-2025.md
Tone: Professional but patient-friendly
Length: 1,500-2,500 words each

Output each as separate downloadable artifact.
```

---

**Strategy Complete!**
**Time to Generate 24 Articles:** 2-3 hours
**Cost in Free Credits:** $1-2 (minimal)
**Result:** Production-ready knowledge base

🚀 **Start tomorrow and you'll have 40+ articles by week's end!**

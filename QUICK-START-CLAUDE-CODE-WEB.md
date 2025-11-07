# Quick Start: Generate Articles with Claude Code Web
**URL:** https://claude.ai/code
**Time:** 2-3 hours for 24 articles
**Cost:** Minimal free tier credits

---

## 🚀 3-Step Process

### **Step 1: Open Claude Code Web** (2 minutes)

1. Go to: **https://claude.ai/code**
2. Login with your Anthropic account
3. You'll see the same CLI interface (but in browser!)

---

### **Step 2: Connect to Project** (1 minute)

**Prompt to send:**
```
I want to continue working on my PBM Knowledge Base project.

Clone from GitHub:
https://github.com/francois352/pbm-knowledge-base

Then read these files to understand the project:
- PROJECT-COMPLETE.md
- CLAUDE-WEB-CONTENT-GENERATION-STRATEGY.md
- PBM-OFFER-DETAILS-2025.md (CRITICAL: pricing info)
- extracted-content/lisa_comprehensive_review.txt
```

**Claude Code Web will:**
- Clone your repo
- Read the context files
- Understand what's been done
- Ready to continue where we left off

---

### **Step 3: Generate Articles** (2 hours)

**Send These 5 Prompts** (one at a time or all at once):

#### **Prompt 1: Device Pages**
```
Read:
- extracted-content/neuro4_user_guide.txt
- extracted-content/vagus_user_guide.txt
- extracted-content/lisa_products_review.txt
- PBM-OFFER-DETAILS-2025.md

Create 5 HTML articles in docs/devices/:
1. neuro-gamma.html
2. neuro-alpha.html
3. neuro-duo-4.html
4. x-plus.html
5. vagus.html

For each device:
- Product overview
- Technical specs (wavelength, frequency)
- Who it's for (target conditions)
- How to use (protocol)
- Pricing (from PBM-OFFER-DETAILS - Pack Autonomie €3,700, Pack Guidé €4,000)
- Research evidence
- Related articles

Match design from docs/style.css
Include breadcrumbs and navigation matching docs/basics/what-is-pbm.html
Mobile-responsive
```

#### **Prompt 2: Clinical Applications**
```
Read extracted-content/lisa_comprehensive_review.txt

Create 6 HTML articles in docs/clinical/:
1. alzheimers-dementia.html
2. depression-anxiety.html
3. parkinsons.html
4. autism-spectrum.html
5. traumatic-brain-injury.html
6. cognitive-enhancement.html

For each condition:
- Overview of condition
- How PBM helps (mechanisms from Lisa's review)
- Research evidence (studies cited in review)
- Which Vielight device recommended
- Expected outcomes
- Safety considerations

Format matching docs/basics/what-is-pbm.html
```

#### **Prompt 3: Patient Guides**
```
Read from GitHub repo neurofeedback-luxembourg:
- tPBM-Patient-Guide.md
- tPBM-FAQ.md
- tPBM-Quick-Reference.md
- tPBM-Neurofeedback-Combination-Guide.md

Convert these 4 markdown files to HTML in docs/guides/:
1. patient-guide.html
2. faq.html
3. quick-reference.html
4. pbm-nfb-combination.html

Preserve all content, convert MD → HTML
Match docs/style.css design
Add breadcrumbs and navigation
```

#### **Prompt 4: Research Pages**
```
Read extracted-content/lisa_comprehensive_review.txt

Create 5 research articles in docs/research/:
1. bibliography.html (index all 37 research papers Lisa cited)
2. clinical-studies.html (top 10 studies summarized)
3. mechanisms-deep-dive.html (detailed mechanisms from review)
4. safety-contraindications.html (comprehensive safety guide)
5. future-research.html (research gaps section from Lisa's review)

Scientific but accessible
Include proper citations
Links to full PDFs (placeholder for now)
```

#### **Prompt 5: Basics & Fundamentals**
```
Read extracted-content/lisa_comprehensive_review.txt

Create 4 educational articles in docs/basics/:
1. how-pbm-works.html (mechanisms explained simply)
2. pbm-parameters.html (wavelength, dose, frequency explained)
3. transcranial-vs-intranasal.html (comparison)
4. history-of-pbm.html (development timeline)

Patient-friendly language
Visual descriptions (for future illustrations)
Analogies and examples
```

---

## ⚡ EVEN FASTER: Single Master Prompt

**Send this ONE prompt to generate everything:**

```
I need to rapidly expand this PBM knowledge base.

Read all files in:
- extracted-content/
- PBM-OFFER-DETAILS-2025.md

Also read from GitHub neurofeedback-luxembourg repo:
- patient education markdown files

Create 24 HTML articles total:

DEVICES (5 articles in docs/devices/):
- neuro-gamma.html, neuro-alpha.html, neuro-duo-4.html, x-plus.html, vagus.html

CLINICAL (6 articles in docs/clinical/):
- alzheimers-dementia.html, depression-anxiety.html, parkinsons.html, autism-spectrum.html, tbi.html, cognitive-enhancement.html

GUIDES (4 articles in docs/guides/):
- patient-guide.html, faq.html, quick-reference.html, pbm-nfb-combination.html

RESEARCH (5 articles in docs/research/):
- bibliography.html, clinical-studies.html, mechanisms.html, safety.html, future-research.html

BASICS (4 articles in docs/basics/):
- how-pbm-works.html, parameters.html, transcranial-vs-intranasal.html, history.html

For ALL articles:
- Match design: docs/style.css (Purple #5d2c4c branding)
- Use structure from: docs/basics/what-is-pbm.html (as template)
- Include: Breadcrumbs, navigation, related articles, footer
- Pricing: EXACT from PBM-OFFER-DETAILS-2025.md (€3,700-4,000)
- Base content on: Lisa Lai's extracted PDFs
- Language: French (can translate later)
- Mobile-responsive

Create all 24 files in correct folders.
I'll review and commit when done.
```

**Claude Code Web will:**
- Read all source files
- Generate 24 HTML pages
- Place in correct folders
- Show you for review

**You:**
- Approve
- Commit
- Push
- **Done!**

---

## 💰 Credit Usage (Optimized)

**Approach 1: 5 Separate Prompts**
- 5 prompts × ~$0.50 each = **$2.50**
- More control, easier to review

**Approach 2: 1 Master Prompt**
- 1 large prompt = **$1.50-2.00**
- Fastest, but harder to review 24 files

**Recommendation:** Use Approach 1 (5 prompts)
- Better quality control
- Can adjust based on first batch
- Still very affordable

**Free Tier Budget:** ~$10/month
**This Project:** ~$2.50
**Remaining:** ~$7.50 for other work

---

## 🎯 What You'll Have After 2-3 Hours

**Starting Point:** 1 article (what-is-pbm.html)

**After Generation:**
- ✅ 5 device pages
- ✅ 6 clinical application pages
- ✅ 4 patient guide pages
- ✅ 5 research pages
- ✅ 4 basics pages
- ✅ Search index updated automatically

**Total:** 25 articles (24 new + 1 existing)

**Knowledge Base:** 90% complete!

---

## ✅ Advantages of Claude Code Web

**vs Regular claude.ai:**
- ✅ Can access file system
- ✅ Can read your extracted content
- ✅ Can write files directly
- ✅ Can commit to git
- ✅ Same interface as CLI

**vs CLI (this terminal):**
- ✅ Use free tier credits (CLI uses your plan)
- ✅ Work from anywhere (browser-based)
- ✅ No terminal needed
- ✅ Visual file editor

**Best Use:**
- **Claude Code Web:** Bulk content generation (use free credits)
- **CLI (this):** Final edits, deployment, testing

---

## 📋 CHECKLIST: Tomorrow's Session

**Open Claude Code Web:**
- [ ] Go to https://claude.ai/code
- [ ] Clone: https://github.com/francois352/pbm-knowledge-base
- [ ] Read context files (PROJECT-COMPLETE.md, etc.)

**Generate Content:**
- [ ] Prompt 1 → 5 device pages
- [ ] Prompt 2 → 6 clinical pages
- [ ] Prompt 3 → 4 guide pages
- [ ] Prompt 4 → 5 research pages
- [ ] Prompt 5 → 4 basics pages

**Review & Deploy:**
- [ ] Review all generated files
- [ ] Check pricing is correct (€3,700-4,000)
- [ ] Update search index (search.js)
- [ ] Commit and push
- [ ] Test live site

**Time:** 2-3 hours
**Result:** 25-article knowledge base!

---

## 🎉 Summary

**Use Claude Code Web to:**
1. Clone your GitHub repo
2. Read extracted content
3. Generate 24 articles in one session
4. Commit directly
5. Push to GitHub Pages

**Time:** 2-3 hours
**Cost:** ~$2.50 in free credits
**Result:** Production-ready knowledge base

**URL to use:** https://claude.ai/code

---

**Ready to execute tomorrow!** 🚀

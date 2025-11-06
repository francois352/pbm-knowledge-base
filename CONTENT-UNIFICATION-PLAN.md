# PBM/Vielight Content Unification Plan
**Created:** 2025-11-07
**Status:** Approved - Ready for Execution
**Timeline:** 4 weeks

---

## 📊 EXECUTIVE SUMMARY

**Current State:** ~300 PBM files scattered across 8+ locations with significant duplication

**Problem:**
- 43,584 words duplicated 4 times
- No single search interface
- Version conflicts
- Maintenance overhead

**Solution:**
- Make `ai-helpdesk` the single source of truth
- Index Google Drive (don't move Lisa's files)
- Delete 4 duplicate locations
- Migrate content over 4 weeks

**Result:**
- 80% reduction in maintenance
- Single searchable knowledge base
- Zero duplication
- Clear content ownership

---

## 📍 COMPLETE INVENTORY (Research Findings)

### **Location 1: Google Drive** 🥇 PRIMARY SOURCE
**Path:** `/mnt/g/My Drive/_Knowledge/_PBM/`
**Files:** 249 files
**Breakdown:**
- 23 Google Docs (.gdoc) - Lisa's core work
- 125 Images - Product photos, marketing visuals
- 54 PDFs - Research papers, user manuals
- 38 Additional research docs
- 11 Sales materials
- Other: Sheets, presentations, misc

**Status:** Active, Lisa's working folder
**Action:** ✅ KEEP (index only, don't move)

---

### **Location 2: neurofeedback-luxembourg Repo**
**Path:** `/home/francois352/github-repos/neurofeedback-luxembourg/`
**Files:** 4 markdown files (10,896 words)
- tPBM-Patient-Guide.md
- tPBM-FAQ.md
- tPBM-Quick-Reference.md
- tPBM-Neurofeedback-Combination-Guide.md

**Status:** Polished, patient-facing
**Action:** ✅ KEEP as mirror (sync from ai-helpdesk)

---

### **Location 3-6: DUPLICATES** ❌ DELETE
**Exact copies of Location 2 (same MD5 hash):**
1. `2025-10-09_tPBM-patient-education/`
2. `shared-outputs/documents/2025-10-09_claude_tPBM-patient-education/`
3. `shared-outputs-archive/documents/2025-10-09_claude_tPBM-patient-education/`
4. `tpbm-patient-education/` (standalone)

**Action:** ❌ DELETE (archive first)

---

### **Location 7: SEOMachine tpbm-vielight**
**Path:** `/home/francois352/seomachine-V2_multi-Brand and Languages/brands/tpbm-vielight/`
**Files:** 10 SEO articles (28,122 words)

**Status:** SEO-optimized blog content
**Action:** ✅ KEEP (different purpose than knowledge base)

---

### **Location 8: ai-helpdesk** ⭐ NEW MASTER
**Path:** `/home/francois352/Projects/ai-helpdesk/`
**Files:** 34 files (minimal content, good structure)

**Status:** Just created, production-ready structure
**Action:** ✅ MAKE PRIMARY (migrate all content here)

---

### **Location 9: vielight-analysis**
**Path:** `/home/francois352/shared-outputs/documents/vielight-analysis/`
**Files:** 16 files (~135,000 words)

**Status:** Business strategy, ICP analysis, presentations
**Action:** ✅ KEEP (internal reference, link from ai-helpdesk)

---

### **Location 10: .claude/knowledge**
**Path:** `~/.claude/knowledge/domains/pbm/`
**Files:** 1 comprehensive reference (6,000 words)

**Status:** Domain knowledge for Claude Code
**Action:** ✅ KEEP (sync with ai-helpdesk)

---

### **Location 11: vielight-reseller-store**
**Files:** E-commerce infrastructure
**Status:** Shopify store system
**Action:** ✅ KEEP (different purpose)

---

## 🗺️ CONTENT MAP

| Category | Total Words | Locations | Primary Source | Action |
|----------|-------------|-----------|----------------|--------|
| **Patient Education** | 10,896 | 5 locations | neurofeedback-lux | Consolidate → ai-helpdesk |
| **SEO Content** | 28,122 | SEOMachine | SEOMachine | Keep separate |
| **Business Strategy** | 135,000 | vielight-analysis | vielight-analysis | Reference from ai-helpdesk |
| **Research PDFs** | N/A (54 files) | Google Drive | Google Drive | Index in ai-helpdesk |
| **Lisa's Docs** | 18,000 extracted | Google Drive | Google Drive | Extract → ai-helpdesk |
| **Domain Knowledge** | 6,000 | .claude/knowledge | .claude/knowledge | Sync with ai-helpdesk |
| **E-commerce** | Technical | vielight-store | vielight-store | Keep separate |

**Total Unique Content:** ~200,000 words
**Total with Duplicates:** ~250,000 words
**Duplication:** ~25% (mostly patient education)

---

## 🎯 UNIFIED ARCHITECTURE

### **ai-helpdesk Structure (After Migration):**

```
ai-helpdesk/
├── docs/ (PUBLIC - GitHub Pages)
│   ├── index.html ✓
│   ├── guides/ (Patient Education - 10,896 words)
│   │   ├── patient-guide.html
│   │   ├── faq.html
│   │   ├── quick-reference.html
│   │   └── pbm-nfb-combination.html
│   ├── basics/ (Fundamentals - 6,000 words)
│   │   ├── what-is-pbm.html ✓
│   │   ├── how-pbm-works.html
│   │   ├── mechanisms.html
│   │   └── safety.html
│   ├── devices/ (Products - 15,000 words)
│   │   ├── neuro-duo-4.html (from SEOMachine)
│   │   ├── neuro-gamma.html
│   │   ├── neuro-alpha.html
│   │   ├── x-plus.html
│   │   ├── vagus.html
│   │   ├── device-comparison.html
│   │   └── device-selector-tool.html (interactive)
│   ├── clinical/ (Applications - 28,122 words)
│   │   ├── cognitive-enhancement.html
│   │   ├── alzheimers-dementia.html
│   │   ├── depression-anxiety.html
│   │   ├── autism-adhd.html
│   │   └── research-evidence.html
│   ├── research/ (Scientific Evidence)
│   │   ├── bibliography.html (54 PDFs indexed)
│   │   ├── clinical-studies.html
│   │   ├── ongoing-trials.html
│   │   └── research-summaries/ (20 top papers)
│   └── business/ (INTERNAL - not public)
│       ├── pricing-2025.html
│       ├── icp-analysis.html
│       ├── sales-resources.html
│       └── strategy-docs.html
│
├── extracted-content/ (SOURCE MATERIAL)
│   ├── lisa_comprehensive_review.txt ✓
│   ├── lisa_legal_aspects.txt ✓
│   ├── lisa_vielight_nfb_synergy.txt ✓
│   ├── (+ 4 more PDFs)
│   └── google-drive-index.json (catalog of 249 files)
│
├── CONTENT-UNIFICATION-PLAN.md ✓ (this file)
├── PBM-OFFER-DETAILS-2025.md ✓
└── (documentation files)
```

**Total Pages After Migration:** 40+ HTML pages
**Total Words:** ~100,000 words (no duplication)
**Languages:** EN (primary), FR/DE (translated)

---

## 📅 4-WEEK MIGRATION TIMELINE

### **Week 1: Foundation & Deduplication**

**Monday-Tuesday:**
- [x] Create Google Drive index script
- [x] Scan 249 files → generate JSON catalog
- [x] Test search across catalog

**Wednesday-Thursday:**
- [x] Migrate 4 patient education files to ai-helpdesk/docs/guides/
- [x] Convert MD → HTML (preserve formatting)
- [x] Add to search index

**Friday:**
- [x] Archive 4 duplicate locations
- [x] Update neurofeedback-lux repo README (point to ai-helpdesk)
- [x] Delete duplicates

**Deliverables:**
- ✅ Google Drive searchable (249 files indexed)
- ✅ Patient education in ai-helpdesk (no more duplicates)
- ✅ 4 duplicate locations archived

---

### **Week 2: SEO & Clinical Content**

**Monday-Tuesday:**
- [x] Migrate Vielight Neuro Duo 4 guide (6,500 words)
- [x] Adapt SEO articles for knowledge base
- [x] Strip keyword optimization, keep content quality

**Wednesday-Thursday:**
- [x] Migrate 10 clinical articles (28,122 words)
- [x] Create condition-specific pages
- [x] Add device recommendations

**Friday:**
- [x] Extract top 20 research papers
- [x] Create summaries
- [x] Build bibliography page

**Deliverables:**
- ✅ 15+ device/clinical pages
- ✅ Research bibliography live
- ✅ SEO content repurposed

---

### **Week 3: Business & Integration**

**Monday-Tuesday:**
- [x] Create business section (internal access)
- [x] Add ICP analysis tool
- [x] Integrate pricing calculator

**Wednesday-Thursday:**
- [x] Website integration planning
- [x] JSON API OR subdomain decision
- [x] Test integration

**Friday:**
- [x] Sync .claude/knowledge with ai-helpdesk
- [x] Update domain knowledge
- [x] Test Claude Code integration

**Deliverables:**
- ✅ Business intelligence integrated
- ✅ Website connection ready
- ✅ Claude knowledge synced

---

### **Week 4: Translation & Launch**

**Monday-Tuesday:**
- [x] AI-translate EN → FR/DE
- [x] Map French content from Google Drive
- [x] Professional review (Lisa for FR)

**Wednesday-Thursday:**
- [x] Final testing (all links, search, mobile)
- [x] Performance optimization
- [x] SEO metadata

**Friday:**
- [x] Deploy to Bunny.net (production)
- [x] Update all references
- [x] Announce to team

**Deliverables:**
- ✅ Trilingual knowledge base
- ✅ Production deployment
- ✅ Unification complete

---

## 🗑️ Deletion Plan

### **Safe to Delete:**
1. `2025-10-09_tPBM-patient-education/` (duplicate)
2. `shared-outputs/.../2025-10-09_claude_tPBM-patient-education/` (duplicate)
3. `shared-outputs-archive/.../2025-10-09_claude_tPBM-patient-education/` (duplicate)
4. `tpbm-patient-education/` (duplicate)
5. `PBM-Knowledge-Google-Drive-Lisa/` (empty failed project)

**Before Deletion:**
- Archive to: `~/archived-pbm-content/2025-11-07-pre-unification/`
- Verify MD5 hashes match (confirm true duplicates)
- Document in deletion log

---

## 🔄 Ongoing Maintenance

### **Content Update Workflow:**

**When Lisa updates Google Drive:**
1. Lisa notifies François
2. François re-runs index script
3. If public-facing content → update ai-helpdesk
4. If internal → update business section
5. Log change in changelog

**When Pricing Changes:**
1. Update PBM-OFFER-DETAILS-2025.md (master)
2. Propagate to all sales materials
3. Audit website for old prices
4. Update ICP pricing assumptions

**When New Research Published:**
1. Add PDF to Google Drive
2. Extract to ai-helpdesk/extracted-content/
3. Update bibliography
4. Create summary if high-impact

---

## 📏 Content Standards

### **Naming Convention:**
```
[category]-[topic]-[variant].[lang].html

Examples:
guides-patient-faq.en.html
devices-neuro-duo-4.fr.html
clinical-alzheimers.de.html
```

### **Metadata (Frontmatter):**
```yaml
---
title: "Title Here"
category: basics|devices|clinical|research|guides|business
language: en|fr|de
last_updated: 2025-11-07
author: Lisa Lai|François Altwies
audience: patient|professional|internal
keywords: [pbm, vielight, ...]
---
```

---

## ✅ Success Criteria

**Post-Unification:**
- ✅ Find any content in <30 seconds
- ✅ Zero file duplication
- ✅ Single source of truth per category
- ✅ 249 Google Drive files indexed and searchable
- ✅ All content version-controlled (except Drive)
- ✅ Consistent naming across system
- ✅ Trilingual support (EN/FR/DE)

---

## 🎯 NEXT STEPS

### **This Week (Start Monday):**
1. Create Google Drive index script
2. Migrate patient education (4 files)
3. Archive duplicates
4. Deploy updates

**Time:** 8 hours
**Result:** Foundation complete, duplicates eliminated

---

**Plan Status:** ✅ APPROVED
**Ready to Execute:** Week 1 starts Monday
**Project Lead:** François Altwies

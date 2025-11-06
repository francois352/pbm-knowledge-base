#!/usr/bin/env python3
"""
Extract text content from priority PBM PDFs
Handles Lisa Lai's core documents and Vielight user manuals
"""

import os
import sys
from pathlib import Path

try:
    import pypdf
except ImportError:
    print("Installing pypdf...")
    os.system("pip install pypdf")
    import pypdf

# Priority PDFs to extract
PRIORITY_PDFS = {
    "lisa_comprehensive_review": "/mnt/g/My Drive/_Knowledge/_PBM/6.PBM_Bibliothèque/Selection for Knowledge Base/Copy of 2025_06_02_PBM comprehensive review_V1.pdf",
    "lisa_legal_aspects": "/mnt/g/My Drive/_Knowledge/_PBM/6.PBM_Bibliothèque/Selection for Knowledge Base/Copy of 2025_06_02_PBM_Legal aspects_v1.pdf",
    "lisa_vielight_nfb_synergy": "/mnt/g/My Drive/_Knowledge/_PBM/6.PBM_Bibliothèque/Selection for Knowledge Base/Copy of 2025_06_02_Vielight x NFB_synergistic potential_v1.pdf",
    "lisa_products_review": "/mnt/g/My Drive/_Knowledge/_PBM/6.PBM_Bibliothèque/Selection for Knowledge Base/Copy of 2025_06_03_Vielight Products_Review.pdf",
    "lisa_claude_processing": "/mnt/g/My Drive/_Knowledge/_PBM/6.PBM_Bibliothèque/Selection for Knowledge Base/Copy of 2025_06_17_PBM_NFB_Claude proccessing .pdf",
    "neuro4_user_guide": "/mnt/g/My Drive/_Knowledge/_PBM/6.PBM_Bibliothèque/Selection for Knowledge Base/Neuro-4-User-Guide.pdf",
    "vagus_user_guide": "/mnt/g/My Drive/_Knowledge/_PBM/6.PBM_Bibliothèque/Selection for Knowledge Base/Vielight-Vagus-User-Guide.pdf",
}

def extract_pdf_text(pdf_path):
    """Extract all text from a PDF file"""
    try:
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for page_num, page in enumerate(reader.pages, 1):
            text += f"\n\n--- Page {page_num} ---\n\n"
            text += page.extract_text()

        return text, len(reader.pages)
    except Exception as e:
        return f"ERROR: {str(e)}", 0

def get_pdf_metadata(pdf_path):
    """Extract PDF metadata"""
    try:
        reader = pypdf.PdfReader(pdf_path)
        metadata = reader.metadata
        return {
            'title': metadata.get('/Title', 'N/A'),
            'author': metadata.get('/Author', 'N/A'),
            'subject': metadata.get('/Subject', 'N/A'),
            'creator': metadata.get('/Creator', 'N/A'),
            'producer': metadata.get('/Producer', 'N/A'),
            'pages': len(reader.pages)
        }
    except Exception as e:
        return {'error': str(e)}

def main():
    output_dir = Path("extracted-content")
    output_dir.mkdir(exist_ok=True)

    print("=" * 80)
    print("PDF CONTENT EXTRACTION - Priority Documents")
    print("=" * 80)
    print()

    for doc_name, pdf_path in PRIORITY_PDFS.items():
        print(f"\n📄 Processing: {doc_name}")
        print(f"   Path: {pdf_path}")

        if not os.path.exists(pdf_path):
            print(f"   ❌ File not found!")
            continue

        # Extract metadata
        metadata = get_pdf_metadata(pdf_path)
        print(f"   Pages: {metadata.get('pages', 'unknown')}")
        if metadata.get('author') != 'N/A':
            print(f"   Author: {metadata['author']}")

        # Extract text
        text, page_count = extract_pdf_text(pdf_path)

        if "ERROR" in text:
            print(f"   ❌ Extraction failed: {text}")
            continue

        # Save to file
        output_file = output_dir / f"{doc_name}.txt"
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(f"# {doc_name}\n")
            f.write(f"Source: {pdf_path}\n")
            f.write(f"Pages: {page_count}\n")
            f.write(f"Extracted: {metadata}\n")
            f.write("\n" + "=" * 80 + "\n\n")
            f.write(text)

        print(f"   ✅ Extracted {len(text):,} characters → {output_file}")
        print(f"   📊 Preview (first 200 chars):")
        print(f"   {text[:200].strip()}...")

    print("\n" + "=" * 80)
    print(f"✅ Extraction complete! Files saved to: {output_dir.absolute()}")
    print("=" * 80)

if __name__ == "__main__":
    main()

# OlmPool — Project Website

> **"Cracks in the Foundation: Seemingly Minor Architectural Choices Impact Long Context Extension"**  
> Allen Institute for AI · April 2026

Live site → **[olmpool.com](https://olmpool.com)**  
Paper → [allenai.org/papers/olmpool](https://allenai.org/papers/olmpool)  
Models → [HuggingFace Collection](https://huggingface.co/collections/allenai/olmpool)

---

## What is OlmPool?

OlmPool is a controlled suite of **26 comparable 7B language models** trained with 170,000 H100 GPU hours to study how minor architectural choices affect long-context performance.

Key finding: combining just 3 seemingly minor architectural choices can drop long-context performance by **up to 47%** — and standard short-context benchmarks won't warn you.

### The 4 architectural variables studied

| Variable | Option A | Option B |
|---|---|---|
| **Positional Encoding** | RoPE | NoPE (no positional encoding) |
| **Attention** | Full attention | Sliding window attention |
| **Normalization** | Pre-norm | Post-norm |
| **Bias** | No bias | QKV projection bias |

---

## Website structure

```
index.html   — single-page site
style.css    — all styles (CSS custom properties, responsive)
main.js      — model table sort/filter, FAQ accordion, copy citation
```

Page sections in order:

1. **Hero** — headline stats (26 models, 170K H100 hours, 47% drop)
2. **Why It Matters** — motivation and problem statement
3. **Video** — paper walkthrough
4. **Key Findings** — 4 main results with visual cards
5. **Architecture** — the 4 variables explained with comparison table
6. **Models** — sortable/filterable table of all 26 models
7. **Quick Start** — code snippets for loading models
8. **Community & Citation** — BibTeX + APA citation, links
9. **FAQ** — common questions

---

## Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import this repository (`yu07546040628/02olmpool`)
3. Leave all settings as default — no framework, root directory is `/`
4. Click **Deploy**

Vercel will serve `index.html` from the root automatically.

---

## Local preview

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then open `http://localhost:8080`.

---

## Credits

Research by Amanda Bertsch, Luca Soldaini, Matthew Gormley, Graham Neubig, Hannaneh Hajishirzi, Kyle Lo, Dirk Groeneveld — Allen Institute for AI / Carnegie Mellon University.

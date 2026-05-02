# OlmPool.com

**🌐 [olmpool.com](https://olmpool.com)** — Interactive research website for the OlmPool paper by Allen Institute for AI.

---

## About

OlmPool is a controlled study of how minor architectural choices silently break long-context performance in large language models.

The researchers trained **26 comparable 7B models** using **170,000 H100 GPU hours**, varying just 4 architectural dimensions — and found that combining the wrong choices drops long-context performance by **up to 47%**, while standard benchmarks show nothing unusual.

> *"Cracks in the Foundation: Seemingly Minor Architectural Choices Impact Long Context Extension"*  
> Bertsch, Soldaini, Gormley, Neubig, Hajishirzi, Lo, Groeneveld · Allen Institute for AI / CMU · April 2026

---

## Explore

| | |
|---|---|
| 🌐 **Website** | [olmpool.com](https://olmpool.com) |
| 📄 **Paper** | [allenai.org/papers/olmpool](https://allenai.org/papers/olmpool) |
| 🤗 **Models** | [HuggingFace Collection](https://huggingface.co/collections/allenai/olmpool) |

---

## Key Findings

- **47% performance drop** from combining just 3 minor architectural choices
- **Standard benchmarks are blind** to long-context degradation — you won't see it until you test at scale
- **NoPE + sliding window attention** is the most dangerous combination
- **Post-norm + QKV bias** compounds the problem further
- All 26 models and 38 checkpoints each are publicly available for reproducibility

---

## The 4 Architectural Variables

| Variable | Choice A | Choice B |
|---|---|---|
| Positional Encoding | RoPE | NoPE |
| Attention Pattern | Full attention | Sliding window |
| Normalization | Pre-norm | Post-norm |
| Projection Bias | No bias | QKV bias |

---

## Tech

Static site — `index.html` + `style.css` + `main.js`. No framework, no build step.

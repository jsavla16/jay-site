# kenya-land-rag — experience record

*For the career docs. Companion to `master-profile.md` and `positioning.md`.
Written to be read without access to the originating chat.*

Session dates: 2026-09-02 to 2026-09-10 · Status as at writing: **design
validated, build not started**

---

## What the project is

A retrieval system over Kenya's land and property statutes, scoped to one
question: what the law requires when acquiring land in Kenya. Every answer
carries Act, section and revision date. Built as technical evidence for the
45-minute technical-screen tier in `positioning.md` §5 — not as a legal
product, and not as a claim to be a data scientist.

Two repos by design: `kenya-land-rag` (Python ingest and evaluation, run
locally) and `jay-site` (TypeScript retrieval and demo at request time). The
project slot already exists at `lib/projects.ts`, slug `kenya-land-rag`,
`status: "in-progress"`.

---

## Status — be precise about this

**Not built.** No ingest code, no embeddings, no index, no eval numbers, no
deployed demo. What exists is a validated design, a hand-verified corpus
manifest, and a documented audit of the design's own assumptions.

Anyone asked about this project should say that plainly. The work that has
happened is real; overstating it as a working system would be the exact
failure `positioning.md` §7 warns against.

---

## What was actually done

**Source evaluation across four publishers, with recorded reasons.**
Kenya Law's current platform (`new.kenyalaw.org`), the legacy
`kenyalaw.org:8181` eXist-db endpoints, FAOLEX, and AfricanLII. Selected
Kenya Law on currency and structure; rejected FAOLEX on vintage (clean
typeset text, but fixed at Revised Edition 2012), the legacy endpoints on
vintage and deprecation, AfricanLII as derivative of Kenya Law.

Established empirically what the platform will and will not serve: HTML 200
with Akoma Ntoso `eId` section anchors present; Akoma Ntoso `.xml` 404;
`.pdf` 403 to a non-browser client.

**A corpus manifest, hand-verified.** Twelve instruments — eight core, four
extended — each with a confirmed URL and revision date. Six distinct
revision dates in play, spanning 03/09/2010 to 01/07/2026.

**Chunking design.** Section-level atoms, each carrying a prepended context
header (Act, Part, section number and heading) so short sections remain
retrievable; sections over ~400 words split at subsection boundaries with
the header re-prepended. Rejected fixed-size windows because a window can
straddle two sections, producing a citation correct about the text and wrong
about the section.

**Evaluation design.** Tiered: 40 questions with gold section citations
(retrieval metrics), 15 of those with full reference answers (generation
metrics), 10 out-of-scope questions where the correct behaviour is refusal.
Ground-truth authorship constrained so reference answers cannot come from
the model doing generation.

**Two infrastructure constraints found by testing rather than assuming.**
Neither available sandbox can reach the source: the cloud container is
refused at its egress proxy, and the local VM returns `403 from proxy after
CONNECT` while permitting `pypi.org`. Consequence: package installs can be
automated, but corpus fetching, embedding and evaluation must run in a local
terminal. The division of labour was set from measurement, not preference.

**A structured problem-solving pass, four stages.** First-principles
decomposition of the problem (ten components, no solutions); a red-team
audit classifying sixteen embedded assumptions as fact, convention or
unknown; recombination of only the surviving verified blocks into three
structurally distinct designs; and experiment design to falsify each of the
three for under two hours and no money.

**One design killed for five minutes and zero cost.** The strongest of the
three candidates — a single Act decomposed along its amendment timeline —
rested on one unverified dependency: that the publisher serves multiple
point-in-time expressions at retrievable URLs. Tested directly. It does not.
Design abandoned before any code was written.

---

## Correction to `master-profile.md`

The skills mapping drafted for this project asserted that the Tilisi land
sales background makes the evaluation ground truth credible. That was an
overreach and the red-team pass caught it.

`master-profile.md` records commercial land **sales** — origination,
negotiation, commercial terms, management of transactional legal process. It
does not record conveyancing research, registry procedure or tax
administration.

The defensible claim is narrower and still rare: **question authorship.**
Knowing which questions a buyer actually asks, and in what order. That is
the asset. Answer authorship is not, and the eval design should not rest on
it.

Worth carrying back into the master profile if that mapping is ever used for
CV or LinkedIn copy.

---

## Skills demonstrated, mapped

| Skill | Evidence from this session |
|---|---|
| Source and data provenance evaluation | Four publishers assessed on structure and currency, with reasons recorded and rejections justified |
| Requirements reasoning | Chunking chosen from the citation requirement rather than from convention |
| Evaluation design | Metric costs separated from metric value; judge-independence constraint identified |
| Infrastructure diagnosis | Egress limits established by test across two environments; workflow set from the result |
| Assumption auditing | Sixteen assumptions classified, several of them the author's own, with elimination and inversion consequences stated |
| Cheap falsification | Three designs made testable for under two hours; one killed in five minutes |
| Licensing and risk posture | A design that holds under any Creative Commons variant, including NonCommercial, without needing the licence resolved |

Python, retrieval and RAGAS literacy are claimed by this project's *plan*,
not yet by its output. They become claimable when the pipeline runs.

---

## Interview material

Three usable stories. Each has a symptom, a root cause and a transferable
lesson — the shape a technical screener responds to.

**1. The URL that lies about being current.**
A dated Akoma Ntoso URL for the Land Registration (General) Regulations
returned HTTP 200 and full valid text. It was recorded as verified. It was a
real page and the wrong expression — the current one was two and a half
years newer. A dated URL always resolves and never signals that it has been
superseded.

> *A 200 confirms a document exists. It says nothing about whether it is the
> one in force.*

The same error recurred when a constructed date for an older expression
failed and was read as evidence that older expressions do not exist. Twice
the same root cause: constructing an identifier instead of following the one
the source provides.

**2. An assumption asserted twice, killed by fifteen minutes of manual
checking.**
Two instruments were observed to share a revision date, and a rule was
written into the brief: consolidated Acts all carry the annual supplement
date. Manual verification of all twelve produced six distinct dates from
2010 to 2026. The rule was wrong, and it had been asserted twice.

> *Two data points produce a pattern. Twelve produce a distribution.*

The verification step that caught it was the one nearly optimised away as
clerical work.

**3. Killing the best design in five minutes.**
The most technically interesting of three candidate architectures depended
on a fact nobody had checked. Checking it cost five minutes and ended the
design. The alternative was discovering the same thing after a fortnight of
diffing code.

> *Find the single unverified dependency and test that first. Everything
> else is preparation.*

---

## Open decisions

Carried forward, none of them blocking outreach:

- Whether tax instruments (Stamp Duty, Income Tax) stay in scope. They move
  on the Finance Act cycle and are the subject of the most-asked questions —
  the only components with permanent manual upkeep, landing every June.
- Whether the object is a portfolio artefact or a tool for practitioners.
  These have different definitions of correct, different costs of error, and
  only one of them requires the currency problem to be solved.
- Whether any practising advocate wants this. No practitioner has been
  consulted. This is testable in twenty minutes and has not been done.

---

## Positioning risk, stated plainly

`positioning.md` §10: *"Do not delay outreach for the portfolio. Build in
parallel."*

The evaluation set as designed is seven to eight hours of careful authoring,
and it is the component most likely to expand. If it becomes the reason
outreach has not started, this project is working against the goal it exists
to serve.

The falsification tests designed in this session cost under two hours in
total and require no pipeline. Those come first. If all three fail, the read
is not to build a fourth thing — it is that the portfolio is not the lever,
the CV and LinkedIn are, and this project's correct status is paused, with
the manifest and the audit kept as material for the technical screen that
follows outreach rather than precedes it.

---

## Artefacts

| Artefact | Location |
|---|---|
| Build brief, decisions, corrections | `jay-shah-site/planning/kenya-land-rag-brief.md` (gitignored) |
| Corpus manifest, 12 instruments verified | `jay-shah-site/planning/corpus-manifest.csv` (gitignored) |
| Project slot, unpopulated | `jay-shah-site/lib/projects.ts`, slug `kenya-land-rag` |

Both planning files are gitignored deliberately: the brief contains a
clean-room audit naming third parties and must never reach a public repo.

**Clean room held throughout.** No third-party course material was opened,
copied or adapted at any point. Knowledge carried over; code did not.

# Design Handoff: Turning a Canva Artboard Into Code

The Canva template I started from was built for a desktop website. That's not a complaint, it's just what it was, and it's part of why mobile never entered my head early on: the tool itself only ever showed me one width. Inside it I used the ruler and position tools to work out where things sat, background removal and filters to clean up assets, and turned the medallion photo into its own image. The Maasai warriors came out of the logo SVG and got recoloured with AI tools. All of that was still design work. The actual handoff, turning what I'd measured into something a browser could render at any size, hadn't started yet.

It started because of the medallion. I'd deliberately left it cropped at the top, not showing the whole badge, and I was building section by section: Hero first, on its own. Once I explained I wanted to add the section below it, the AI told me something I hadn't thought about at all: the medallion's beaded tassels would spill down into that next section once it existed. Positioning things by eye, one section at a time, wasn't going to hold once a page had more than one section on it. That's the moment this stopped being a design problem and became a code problem.

What the AI built in response is a fraction system it calls `--stage`. The idea is plain once you see it: every single length on the site, a font size, a margin, an image width, is a fraction of one shared value, and that value is calculated once, straight from the Canva artboard's own proportions.

```js
export const BAND_ASPECT = 0.5622;

export const STAGE = `min(100vw, 2200px, calc(100vh / ${BAND_ASPECT}))`;

export const stageFraction = (stage) => (fraction) =>
  `calc(${stage} * ${fraction})`;

export const s = stageFraction(STAGE);
```

0.5622 comes directly from the artboard: 2732px wide, each section 1536px tall. So instead of measuring a heading at "48px" and hoping it still looks right at a different window size, it's measured as a fraction of the stage, something like `s(0.0259)`, and it holds the same proportion no matter how big or small the stage itself gets. Nothing about that logic was mine. I explained the cropping problem; the AI decided a shared coordinate system was the fix and wrote it.

Where I did earn my keep was catching the next bug in it. Sizing the stage off width alone sounds fine until you actually check it against a real browser. A 1920px-wide window doesn't give you 1920 pixels of vertical room too, more like 950 once you account for the browser chrome, and a band sized purely off width came out taller than that, at 1079px. The result was content quietly running below the fold, a SoundCloud embed on the homepage bottoming out at 96.4% of its section with nothing to scroll to reach it. I caught that one by actually resizing the window and watching things vanish. The fix, again the AI's, was to take the smaller of two calculations, width-driven or height-driven, so a short window scales the whole composition down and centres it instead of just cutting it off:

```js
export const STAGE = `min(100vw, 2200px, calc(100vh / ${BAND_ASPECT}))`;
```

Even the Hero, where this all started, needed its own small variant of the same idea. It sits inside 48px of horizontal padding that the rest of the stage calculation doesn't know about, so there's a second version, `HERO_STAGE`, that subtracts that padding before doing the same width-versus-height comparison. Small detail, but it's the kind of thing that only shows up once you're actually building the system rather than just describing what you want from it: the general rule almost worked everywhere, except the one section where the whole idea started.

Once `--stage` existed, it stopped being a fix for the medallion specifically. It became the answer for anywhere artwork bled across a section boundary, and that turned out to be most of the site. The About page's Crew section has the speaker stack from the section above it deliberately bleeding down over its top edge; that only stays lined up because both sections are measured off the same stage. Services has the same problem in a different shape.

That's where I actually watched the system misbehave, and it's a good example of what working inside it is really like. I'd been asked to make the Services copy more legible and decided to widen one of the illustrations, from 0.36 of the stage to 0.472, thinking a bigger image would just look better. Instead the paragraph next to it disappeared behind the artwork.

The image is 883 by 777 pixels, so every extra pixel of width adds about 0.88 pixels of height, and because it's anchored to the bottom of its panel, growing it doesn't add height downward, it pushes the top edge upward. At 0.472 that top edge climbed from around y=381 to y=201, above the paragraph starting at y=225, and just sat on top of it. Obvious once you know an image is anchored to a floor and has a fixed aspect ratio. Not obvious at all while you're just dragging a number up because you think "bigger equals clearer."

None of this took long to explain, but it took a couple of days and a lot of wasted tokens to actually get right, mostly through trial and error on positioning. The moment that changed how I worked wasn't a code fix, it was a question. I was still trying to get the smoke cloud behind the crew photos positioned correctly, and instead of asking the AI to just move it again, I asked it to show me exactly which parameters in the code controlled that, so I could adjust it myself.

```jsx
{/* Smoke sits behind the whole column. It used to live inside the bio,
    which put it later in the DOM than the name and washed the
    lettering out. */}
<Image
  src={smokeCloud}
  alt=""
  aria-hidden="true"
  className="pointer-events-none absolute left-1/2 z-0 max-w-none -translate-x-1/2 select-none opacity-80"
  style={{ top: s(0.012), width: s(0.31) }}
  sizes="32vw"
/>
```

Two numbers, `top` and `width`, both fractions of the same stage everything else on the site uses. Once I could see that, I didn't need to describe what I wanted in words and wait for another round. I could nudge 0.012 or 0.31 myself and know exactly what would move and by how much. It's a small thing, but it was the first time on this project that I stopped treating the AI as the only one who could touch the layout, and started treating the code as something I could actually read.

That's really what this post is about. The `--stage` system is the most unusual piece of engineering on this site, and I didn't invent it. But I did force it into existence by building without thinking about scale, and I did catch the bug that made it trustworthy at odd window sizes. The system holds the whole design together now. Whether it held together on a phone screen is a different question, and the honest answer is no, not at first. That's the next post.

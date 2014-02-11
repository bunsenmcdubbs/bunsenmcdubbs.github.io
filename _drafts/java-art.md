---
layout: post
title: "Generative Art"
tags: [code, art]
---

A last year I got particularly bored and delved into the world of generative art.
I hacked together some admittedly crappy code in Java and got some pretty cool
results. In hindsight I realize that I probably should've used existing frameworks
such as cinder, Processing, or openFrameworks rather than build an entirely new
project.

I started off just playing around with sine and cosine and iteratively added more
particles, motion, and color. Using a timer to dictate time intervals, I used
physical concepts of velocity and acceleration to speed up and slow down particles.

TODO: add pictures

### Fractals and Fractal Landscapes

Fractals are cool. I hacked together a fairly simplistic set of Java programs
that recursively altered lines to make interesting patterns. Due to the bad
programming, there are severe limitations on the level of detail.

TODO: add pictures

Fractal landscapes use recursive processes to generate detailed and realistic
textures. (GameProgrammer.com)[http://www.gameprogrammer.com/fractal.html] has a
good article on the details of the algorithms in use. Based heavily on the
recursive processes of fractals, fractal landscape algorithms add in a little
(or a lot) of randomness at each step, generating a more natural form.

TODO: add pictures

### 3 Dimensions!

After working in 2 dimensions, the natural next step is adding depth. Naive and
bored (a fatal combination) I set out to code a 3 dimensional visualization
with perspective. Rather than use existing libraries I decided (once a again)
to write my own code - a habit I seek to break.

I decided that I would try to rotate a wireframe cube (solving the hidden surface
problem was beyond the scope of what I wanted to do). First was the orthagonal view.
After working out the rotation math (and discovering rotation matrices by luck), I
quickly hacked together an orthangonal 3D view. You can easily make a 3D mapping
without perspective by just dropping the 3rd coordinate (depth).

TODO: add picture

Perspective is much harder. You have to define a camera viewpoint in 3-space and
from there, map the 3D world onto a 2D plane that represents the computer screen.
I did this very simply by figuring out where a line from the eye to a point in space
intersected with the plane and drawing that point on the screen. A couple hours were
devoted to manually adjusting the variables to properly size and scale the perspective.

TODO: add picture

All the code can be found on my
(Github)[https://github.com/BunsenMcDubbs/3DimensionalDangerzone]. Soon to be documented...

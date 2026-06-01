# Andrew's Personal Webpage

Nothing special, just a personal website.

Serve (locally) with `pnpm dev`.

## Migration from Jekyll to Astro

- [ ] Migrate blog posts
  - [x] Move pages
  - [ ] Render in template
  - [x] Update slugs to match old urls
    - [x] Check `permalink` field
  - [ ] Fix symbol rendering
  - [ ] Fix intra-site links
  - [x] Hide hidden pages
  - [x] Delete/curate pages
  - [ ] Redirect all active pages to archive.org
- [x] Images
- [x] Migrate blog listing page; SKIP
- [ ] Integrate git status into build info (HTTP header, embed into resume)
- [ ] Wrangler -> Cloudflare Workers. Goal: Deploy via Cloudflare Workers with
      CI/CD triggered from repo push.
- [ ] 404 page

```sh
# Update layout tag
find src/pages -name '*.md' -exec sed -i '' 's/layout: post/layout: \"..\/layouts\/post.astro\"/g' '{}' ';'
# Move quote files
for filename in $(rg -l --multiline --multiline-dotall -- '^\-\-\-$\n.*layout: quote.*\n^\-\-\-$'); do git mv $filename quote; done

# Strip date from filename to match original slug
for filename in $(find src/pages -name '*.md')
do
  new="$(echo $filename | sed 's/[[:digit:]][[:digit:]][[:digit:]][[:digit:]]-[[:digit:]][[:digit:]]-[[:digit:]][[:digit:]]-//')"
  git mv $filename $new
done

# Find posts with categories (all beaglecar)
rg -l -e 'categor(y|ies): .*' -- $(rg -l -e 'layout:.*post' src/pages) | sed 's|src/pages/||' | sort
```

```json
[
  "https://andrewdai.co/heap-blog-post-union-find.html",
  "https://andrewdai.co/hackgt-technology.html",
  "https://andrewdai.co/datavis-at-hackduke.html",
  "https://andrewdai.co/massaudubonphotocontest.html",
  "https://andrewdai.co/hacknashville-pickl.html",
  "https://andrewdai.co/ig-reports-project.html",
  "https://andrewdai.co/beaglecar/journal4.html",
  "https://andrewdai.co/beaglecar/journal3.html",
  "https://andrewdai.co/beaglecar/journal2.html",
  "https://andrewdai.co/beaglecar/journal1.html",
  "https://andrewdai.co/beaglecar/rc-mod-update-2.html",
  "https://andrewdai.co/blueprint-hackathon.html",
  "https://andrewdai.co/xbox-controller-ros.html",
  "https://andrewdai.co/beaglecar/rc-mod-update.html",
  "https://andrewdai.co/java-art.html",
  "https://andrewdai.co/ros-on-beaglebone.html",
  "https://andrewdai.co/beaglebone-usb-internet.html",
  "https://andrewdai.co/beaglecar/rc-car.html",
  "https://andrewdai.co/beaglecar/sensors-and-interfaces.html",
  "https://andrewdai.co/beaglecar/intro.html"
]
```

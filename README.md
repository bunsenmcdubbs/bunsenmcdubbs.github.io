# Andrew's Personal Webpage

Nothing special, just a personal website.

Serve (locally) with `pnpm dev`.

## Migration from Jekyll to Astro

- [ ] Migrate blog posts
  - [x] Move pages
  - [ ] Render in template
  - [x] Update slugs to match old urls
  - [ ] Fix symbol rendering
  - [ ] Hide hidden pages
  - [ ] Delete/curate pages
- [ ] Migrate blog listing page
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
```

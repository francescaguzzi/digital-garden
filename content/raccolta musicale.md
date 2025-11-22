---
title: Album
---
```dataview

TABLE WITHOUT ID
  ("![" + name + "|100](" + cover_image + ")") as Copertina,
  link(file.link, name) as Album,
  artist as Artist,
  rating as Rating,
  genres as Genres,
  listened_on as "Listened on",
  release_date as "Released on",
  link(link, "Ascolta") as Link
FROM "album collection"
SORT listened_on DESC

```


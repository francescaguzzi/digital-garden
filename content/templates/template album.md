---
tags:
  - album
  - music
cover_image:
artist:
rating:
listened_on:
listened_to: true
genres: []
link:
---
<%*
const cover = tp.frontmatter.cover_image ? tp.frontmatter.cover_image : "https://placehold.co/150x150/EFEFEF/999?text=No+Cover";
const artist = tp.frontmatter.artist || "Artista sconosciuto";
const rating = tp.frontmatter.rating || "-";
const date = tp.frontmatter.listened_on || "-";
const genres = Array.isArray(tp.frontmatter.genres) ? tp.frontmatter.genres.join(", ") : tp.frontmatter.genres;
const link = tp.frontmatter.link || "#";
%>
<div style="background-color: var(--background-secondary); border: 1px solid var(--background-modifier-border); border-radius: 8px; padding: 15px; display: flex; align-items: center; gap: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
  <div style="flex-shrink: 0; width: 120px;">
    <img src="<% cover %>" style="width: 100% !important; aspect-ratio: 1/1; border-radius: 6px; object-fit: cover; margin: 0 !important; display: block;">
  </div>
  <div style="font-size: 0.95rem; line-height: 1.5; width: 100%;">
    <strong style="opacity: 0.7;">Artista:</strong> <% artist %><br>
    <strong style="opacity: 0.7;">Voto:</strong> <% rating %><br>
    <strong style="opacity: 0.7;">Ascoltato:</strong> <% date %><br>
    <strong style="opacity: 0.7;">Generi:</strong> <% genres %><br>
    <a href="<% link %>" style="text-decoration: none; display: inline-block; margin-top: 5px;">🎧 <strong>Ascolta ora</strong></a>
  </div>
</div>


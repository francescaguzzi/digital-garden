---
tags:
  - book
cover:
title:
author:
status:
date_read:
---
<%*
// Logica per visualizzare la scheda libro dentro Obsidian
const cover = tp.frontmatter.cover ? tp.frontmatter.cover : "https://placehold.co/200x300/EFEFEF/999?text=No+Cover";
const title = tp.frontmatter.title || tp.file.title;
const author = tp.frontmatter.author || "Autore sconosciuto";
// Icona stato
let statusIcon = "🔖 Want to read";
if(tp.frontmatter.status == "reading") statusIcon = "📖 Currently reading";
if(tp.frontmatter.status == "finished") statusIcon = "✅ Finished";

const date = tp.frontmatter.date_read || "-";
%>

<div style="background-color: var(--background-secondary); border: 1px solid var(--background-modifier-border); border-radius: 8px; padding: 15px; display: flex; align-items: start; gap: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
  <div style="flex-shrink: 0; width: 100px;">
    <img src="<% cover %>" style="width: 100% !important; aspect-ratio: 2/3; border-radius: 4px; object-fit: cover; margin: 0 !important; display: block; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
  </div>
  <div style="font-size: 0.95rem; line-height: 1.6; width: 100%;">
    <h3 style="margin: 0 0 5px 0;"><% title %></h3>
    <em style="color: var(--text-muted);"><% author %></em>
    <hr style="margin: 10px 0; border: none; border-top: 1px solid var(--background-modifier-border);">
    <strong>Status:</strong> <% statusIcon %><br>
    <strong>Finished in date:</strong> <% date %>
  </div>
</div>

---
# Thoughts

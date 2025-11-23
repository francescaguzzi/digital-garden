---
tags:
  - album
  - music
cover_image: "INSERISCI_URL_QUI"
artist: 
rating: 
listened_on: {{date}}
listened_to: false
genres: []
link: 
---

> [!info] Dettagli
> ```dataviewjs
> // Questo blocco si vede SOLO in Obsidian
> const hide = ["cssclasses", "tags", "cover_image", "aliases", "date", "draft", "enableToc"];
> const fm = dv.current().file.frontmatter;
> let rows = [];
> for (const [key, val] of Object.entries(fm)) {
>     if (!hide.includes(key) && val !== null && val !== undefined && val !== "") {
>         let label = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
>         let displayVal = val;
>         if (Array.isArray(val)) displayVal = val.join(", ");
>         else if (typeof val === 'string' && val.startsWith("http")) displayVal = `[Link](${val})`;
>         else if (typeof val === 'boolean') displayVal = val ? "✅" : "⬜";
>         rows.push([`**${label}**`, displayVal]);
>     }
> }
> dv.table(["Proprietà", "Valore"], rows);
> ```

## Recensione
Scrivi qui la tua recensione...
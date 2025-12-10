import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/bookgallery.scss"
import { resolveRelative } from "../util/path"

export default (() => {
  const BookGallery: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {


    if (fileData.slug !== "library") {
      return <></>
    }

    // 2. Filtra solo i file dentro la cartella books
    const books = allFiles.filter((file) => 
      file.slug?.startsWith("readings/books/") && 
      file.slug !== "readings/books/index" &&
      file.frontmatter
    )

    // 3. Ordina (Opzionale: qui ordina per data, i più recenti in alto)
    books.sort((a, b) => {
      const valA = a.frontmatter?.date_read ? String(a.frontmatter.date_read) : ""
      const valB = b.frontmatter?.date_read ? String(b.frontmatter.date_read) : ""
      const dateA = valA ? new Date(valA) : new Date(0)
      const dateB = valB ? new Date(valB) : new Date(0)
      return dateB.getTime() - dateA.getTime()
    })

    return (
      <div class="book-gallery">
        {books.map((book) => {
          const title = book.frontmatter?.title ? String(book.frontmatter.title) : "Senza Titolo"
          const cover = book.frontmatter?.cover ? String(book.frontmatter.cover) : undefined
          const author = book.frontmatter?.author ? String(book.frontmatter.author) : "Autore Sconosciuto"
          
          // Gestione dello Stato (Status)
          const statusRaw = book.frontmatter?.status ? String(book.frontmatter.status).toLowerCase() : "want to"
          let statusLabel = "Want to Read"
          let statusClass = "status-todo" // Classe CSS per il colore

          if (statusRaw.includes("finish") || statusRaw.includes("complet")) {
            statusLabel = "Finished"
            statusClass = "status-done"
          } else if (statusRaw.includes("read") || statusRaw.includes("leggendo")) {
            statusLabel = "Currently reading 📖"
            statusClass = "status-reading"
          }

          const link = resolveRelative(fileData.slug!, book.slug!)

          return (
            <a href={link} class="book-card">
              <div class="book-cover">
                {cover ? (
                  <img src={cover} alt={title} loading="lazy" />
                ) : (
                  <div class="placeholder">No Cover</div>
                )}
                {/* Badge dello stato sopra la copertina */}
                <span class={`status-badge ${statusClass}`}>{statusLabel}</span>
              </div>
              <div class="book-info">
                <strong>{title}</strong>
                <span class="author">{author}</span>
              </div>
            </a>
          )
        })}
      </div>
    )
  }

  BookGallery.css = style
  return BookGallery
}) satisfies QuartzComponentConstructor
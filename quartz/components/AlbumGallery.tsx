import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/albumgallery.scss"
import { resolveRelative } from "../util/path"

export default (() => {
  const AlbumGallery: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {

    if (fileData.slug !== "raccolta-musicale") {
      return <></>
    }

    const albums = allFiles.filter((file) => 
      file.slug?.startsWith("music-collection/") && 
      file.frontmatter
    )

    albums.sort((a, b) => {
      const valA = a.frontmatter?.listened_on as string | undefined
      const valB = b.frontmatter?.listened_on as string | undefined
      const dateA = new Date(valA ?? 0)
      const dateB = new Date(valB ?? 0)
      return dateB.getTime() - dateA.getTime()
    })

    return (
      <div class="album-gallery">
        {albums.map((album) => {
          const fName = album.frontmatter?.name as string | undefined
          const fTitle = album.frontmatter?.title as string | undefined
          const title = fName || fTitle || "Senza Titolo"
          
          const cover = album.frontmatter?.cover_image as string | undefined
          const artist = (album.frontmatter?.artist as string) || "Artista Sconosciuto"
          
          // --- NUOVE AGGIUNTE ---
          
          // 1. Recuperiamo il rating (Voto)
          // Se è numerico o stringa va bene, mettiamo un fallback se manca
          const rating = album.frontmatter?.rating ?? "-"

          // 2. Recuperiamo e formattiamo la data
          const listenedRaw = album.frontmatter?.listened_on as string | undefined
          let dateDisplay = ""
          
          if (listenedRaw) {
            // Creiamo la data e la formattiamo in stile Italiano (giorno/mese/anno)
            const d = new Date(listenedRaw)
            dateDisplay = d.toLocaleDateString("it-IT", {
              day: "numeric",
              month: "short", // Usa "short" per 'nov', "long" per 'novembre', "numeric" per '11'
              year: "numeric"
            })
          }

          const link = resolveRelative(fileData.slug!, album.slug!)

          return (
            <a href={link} class="album-card">
              <div class="album-cover">
                {cover ? (
                  <img src={cover} alt={title} loading="lazy" />
                ) : (
                  <div class="placeholder">No Cover</div>
                )}
              </div>
              <div class="album-info">
                <strong>{title}</strong>
                <span class="artist">{artist}</span>
                
                {/* Nuova sezione Meta Dati */}
                <div class="meta-data">
                    <span class="rating"> Voto: {rating}</span>
                    {dateDisplay && (
                        <span class="date">Ascoltato il: {dateDisplay}</span>
                    )}
                </div>

              </div>
            </a>
          )
        })}
      </div>
    )
  }

  AlbumGallery.css = style
  return AlbumGallery
}) satisfies QuartzComponentConstructor
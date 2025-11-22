import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/albumgallery.scss"

export default (() => {
  const AlbumGallery: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {

    // 1. Controllo: mostra solo nella pagina indice della collezione
    if (fileData.slug !== "album-collection/index") {
      return <></>
    }

    // 2. Filtra i file
    const albums = allFiles.filter((file) => 
      file.slug?.startsWith("album-collection/") && 
      file.slug !== "album-collection/index" &&
      file.frontmatter
    )

    // 3. Ordina per data
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
          // CORREZIONE QUI: Forziamo il tipo "string" con "as string"
          // Questo dice a TypeScript: "Fidati, questi sono testi, non oggetti strani"
          const fName = album.frontmatter?.name as string | undefined
          const fTitle = album.frontmatter?.title as string | undefined
          const title = fName || fTitle || "Senza Titolo"
          
          const cover = album.frontmatter?.cover_image as string | undefined
          const artist = (album.frontmatter?.artist as string) || "Artista Sconosciuto"
          
          const link = `/${album.slug}`

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
                <span>{artist}</span>
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
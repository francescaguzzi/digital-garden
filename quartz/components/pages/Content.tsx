import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
// Importiamo la galleria salendo di un livello (..) perché siamo nella cartella 'pages'
import AlbumGallery from "../AlbumGallery" 

const Content: QuartzComponent = (props: QuartzComponentProps) => {
  const { fileData, tree } = props
  const content = htmlToJsx(fileData.filePath!, tree)
  const classes = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")

  // Prepariamo il componente
  const Gallery = AlbumGallery

  return (
    <article class={classString}>
      {/* 1. Prima il contenuto testuale della tua nota Obsidian */}
      {content}
      
      {/* 2. Poi la griglia (che apparirà solo nella pagina giusta grazie al filtro interno) */}
      <Gallery {...props} />
    </article>
  )
}

export default (() => Content) satisfies QuartzComponentConstructor
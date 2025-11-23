import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/pageproperties.scss"

export default (() => {
  const PageProperties: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    
    if (!fileData.slug?.startsWith("album-collection/")) {
      return null
    }
    
    const opts = fileData.frontmatter
    if (!opts) return null

    // ELENCO DELLE PROPRIETÀ DA NASCONDERE
 
    const hiddenKeys = new Set([
      "title", 
      "tags", 
      "aliases", 
      "date", 
      "draft", 
      "cssclasses",
      "cover_image", 
      "enableToc",
      "modified"
    ])

    // Filtriamo le proprietà
    const properties = Object.entries(opts)
      .filter(([key]) => !hiddenKeys.has(key))

    // Se non c'è nulla da mostrare, non renderizziamo niente
    if (properties.length === 0) return null

    return (
      <div class="page-properties">
        <ul class="properties-list">
          {properties.map(([key, value]) => {
            // Formattazione del valore: se è una lista (es. generi), li unisce con una virgola
            let displayValue: any = ""
            
            if (Array.isArray(value)) {
              displayValue = value.join(", ")
            } else if (typeof value === 'boolean') {
              displayValue = value ? "✅" : "❌"
            } else if (typeof value === 'string' && value.startsWith("http")) {
               // Se è un link web, lo rendiamo cliccabile
               displayValue = <a href={value} target="_blank" rel="noopener noreferrer">Link Esterno ↗</a>
            } else {
              displayValue = String(value)
            }

            return (
              <li class="property-item">
                <span class="property-key">{key}:</span>
                <span class="property-value">{displayValue}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  PageProperties.css = style
  return PageProperties
}) satisfies QuartzComponentConstructor
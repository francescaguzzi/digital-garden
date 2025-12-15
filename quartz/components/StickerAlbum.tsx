import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/stickeralbum.scss"

export default (() => {
  const StickerAlbum: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    
    // Cerchiamo la lista "stickers" nel frontmatter
    const stickers = fileData.frontmatter?.stickers
    
    // Se non ce n'è, o se è vuota, non mostriamo nulla
    if (!stickers || !Array.isArray(stickers)) {
      return null
    }

    return (
      <div class="sticker-container">
        {stickers.map((sticker: any) => (
          <a 
            href={sticker.link || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            class="sticker-item"
            title={sticker.title || "Sticker"} // Tooltip al passaggio del mouse
          >
            <img 
              src={sticker.image} 
              alt={sticker.title || "sticker"} 
              loading="lazy"
            />
          </a>
        ))}
      </div>
    )
  }

  StickerAlbum.css = style
  return StickerAlbum
}) satisfies QuartzComponentConstructor
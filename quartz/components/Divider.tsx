import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  image: string
  height?: string
  margin?: string
}

export default ((opts: Options) => {
  const Divider: QuartzComponent = () => {
    // Se non c'è immagine, non mostrare nulla
    if (!opts.image) return null

    const height = opts.height || "auto"
    const margin = opts.margin || "2rem 0" // Spaziatura di default sopra e sotto

    return (
      <div class="sidebar-divider" style={{ margin: margin, textAlign: "center" }}>
        <img 
          src={opts.image} 
          alt="divider" 
          style={{ 
            height: height, 
            width: "auto", 
            maxWidth: "100%", 
            display: "block", 
            margin: "0 auto",
            border: "none",
            boxShadow: "none",
            borderRadius: "0"
          }} 
        />
      </div>
    )
  }

  return Divider
}) satisfies QuartzComponentConstructor<Options>
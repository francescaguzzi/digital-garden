import { QuartzComponent, QuartzComponentConstructor } from "./types"
import style from "./styles/musicplayer1.scss" 

export default (() => {
  const SimplePlayer: QuartzComponent = () => {

    const songUrl = "https://files.catbox.moe/9snper.mp3" 
    const coverUrl = "https://i.discogs.com/WioGIto3WlEShuJWSL6c8iK8hPRsMWFOuwh2OI4OAes/rs:fit/g:sm/q:90/h:600/w:594/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgwNjI2/MTgtMTYwNjA1Mjgy/NS0yMzQxLmpwZWc.jpeg" // Ho messo un placeholder sicuro
    // const cdUrl = "https://web.archive.org/web/20220514070535im_/https://cdn.discordapp.com/attachments/822589056256311328/890714753780031488/image0.png" 
    const cdUrl = "https://intheclouds.io/cdn/shop/products/Custom_Vinyl_Record_10in_Clear_3024x.png?v=1741183502" // CD trasparente

    return (
      <div class="simple-player-container">
        {/* IL PLAYER CON ID SPECIFICI */}
        <div 
          id="custom-player-wrapper" 
          class="simple-player-wrapper"
          title="Click to Play/Pause"
        >
          {/* Copertina */}
          <img 
            src={coverUrl} 
            class="album-cover-img" 
            alt="Album Cover" 
          />
          
          {/* CD - Nota l'ID qui */}
          <img 
            id="custom-cd-disk"
            src={cdUrl} 
            class="cd-disk-img" 
            alt="CD" 
          />
          
          {/* Audio - Nota l'ID qui */}
          <audio id="custom-audio-element" src={songUrl} loop></audio>
        </div>

        {/* LO SCRIPT CHE DÀ VITA AL TUTTO */}
        {/* Questo script viene iniettato direttamente nella pagina ed eseguito dal browser */}
        <script dangerouslySetInnerHTML={{ __html: `
          function setupPlayer() {
            const wrapper = document.getElementById('custom-player-wrapper');
            const audio = document.getElementById('custom-audio-element');
            const cd = document.getElementById('custom-cd-disk');

            if (!wrapper || !audio || !cd) return;

            // Rimuoviamo vecchi listener per evitare doppi click se navighi
            wrapper.replaceWith(wrapper.cloneNode(true));
            const newWrapper = document.getElementById('custom-player-wrapper');
            const newAudio = document.getElementById('custom-audio-element');
            const newCd = document.getElementById('custom-cd-disk');

            newWrapper.addEventListener('click', () => {
              if (newAudio.paused) {
                newAudio.play()
                  .then(() => {
                    newCd.classList.add('is-spinning');
                  })
                  .catch(e => console.error("Errore audio:", e));
              } else {
                newAudio.pause();
                newCd.classList.remove('is-spinning');
              }
            });
            
            // Se la canzone finisce da sola
            newAudio.addEventListener('ended', () => {
               newCd.classList.remove('is-spinning');
            });
          }

          // Esegui subito
          setupPlayer();

          // Esegui anche quando Quartz cambia pagina (navigazione SPA)
          document.addEventListener('nav', setupPlayer);
        `}} />
      </div>
    )
  }

  SimplePlayer.css = style
  return SimplePlayer
}) satisfies QuartzComponentConstructor
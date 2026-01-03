import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import AlbumGallery from "./quartz/components/AlbumGallery"
import BookGallery from "./quartz/components/BookGallery"
import StickerAlbum from "./quartz/components/StickerAlbum"
import Divider from "./quartz/components/Divider"
import MusicPlayer1 from "./quartz/components/MusicPlayer1"
import PageProperties from "./quartz/components/PageProperties"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      Github: "https://github.com/francescaguzzi",
      Portfolio: "https://francescaguzzi.github.io/portfolio",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    PageProperties(),
    AlbumGallery(),
    BookGallery(),
    StickerAlbum(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
    Component.DesktopOnly(Divider({ image: "/static/assets/totoro.gif", margin: "0.5rem 0" })),
    Component.DesktopOnly(
      Component.RecentNotes({ limit: 3, filter: (page) => {
        const tags = page.frontmatter?.tags || []
        return tags.includes("seedling") || tags.includes("plant")}})),
  ],
  right: [
    Component.Graph(),
    Divider({ image: "/static/assets/totorooo.gif" }),
    Component.DesktopOnly(MusicPlayer1()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}

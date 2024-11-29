/** Podcast Interface. */
export interface Podcast {
  id: string
  title: string
  author: string
  imageUrl: string
  summary: string
  link: string
}

/** PodcastEntry Interface. */
export interface PodcastEntry {
  id: {
    attributes: {
      'im:id': string
    }
  }
  'im:name': {
    label: string
  }
  'im:artist': {
    label: string
  }
  'im:image': Array<{
    label: string
    attributes: {
      height: string
    }
  }>
  summary: {
    label: string
  }
  link: {
    attributes: {
      href: string
    }
  }
}

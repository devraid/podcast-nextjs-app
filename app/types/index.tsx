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

/** PodcastItem Interface. */
export interface PodcastItem {
  wrapperType: string
  trackId?: number
  trackName?: string
  releaseDate?: string
  trackTimeMillis?: number
  collectionId?: number
  collectionName?: string
  artistName?: string
  artworkUrl600?: string
  collectionCensoredName?: string
  collectionViewUrl?: string
  episodeUrl: string
  description: string
}

/** PodcastEpisode Interface. */
export interface PodcastEpisode {
  description: string | ''
  id: string
  title: string
  releaseDate: string
  duration: string
  episodeUrl: string
}

/** FullPodcast Interface. */
export interface FullPodcast extends Podcast {
  episodes: PodcastEpisode[]
}

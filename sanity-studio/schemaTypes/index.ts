import {richText} from './atoms'
import {pageDocument, socialLinksDocument} from './documents'
import {
  blogsObject,
  contentsBlockObject,
  ctaLink,
  ctaObject,
  experiencesObject,
  externalLink,
  iconsSwiperObject,
  projectsObject,
  richTextObject,
  seoObject,
} from './objects'

export const schemaTypes = [
  pageDocument,
  socialLinksDocument,

  seoObject,
  richTextObject,
  contentsBlockObject,
  experiencesObject,
  blogsObject,
  projectsObject,
  iconsSwiperObject,

  ctaObject,
  externalLink,
  ctaLink,

  richText,
]

import {padding, paddingBlock, richText} from './atoms'
import {pageDocument, linksDocument} from './documents'
import {
  blogsObject,
  contactFormObject,
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
  linksDocument,

  seoObject,
  richTextObject,
  contentsBlockObject,
  experiencesObject,
  blogsObject,
  projectsObject,
  iconsSwiperObject,
  contactFormObject,

  ctaObject,
  externalLink,
  ctaLink,

  richText,
  padding,
  paddingBlock,
]

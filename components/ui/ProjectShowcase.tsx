import Image, { type StaticImageData } from 'next/image'
import { Link } from '@/i18n/navigation'
import {
  ClassificationBadge,
  type ProjectClassification,
} from './ClassificationBadge'
import styles from './foundation.module.css'

type ProjectShowcaseProps = {
  href: string
  image: string | StaticImageData
  imageAlt: string
  title: string
  summary: string
  classification: ProjectClassification
  classificationLabel: string
  priority?: boolean
}

export function ProjectShowcase({
  href,
  image,
  imageAlt,
  title,
  summary,
  classification,
  classificationLabel,
  priority = false,
}: ProjectShowcaseProps) {
  return (
    <Link className={styles.projectCard} href={href as '/'}>
      <span className={styles.projectMedia}>
        <Image
          alt={imageAlt}
          className={styles.projectImage}
          fill
          priority={priority}
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 800px"
          src={image}
        />
        <ClassificationBadge
          classification={classification}
          label={classificationLabel}
        />
      </span>
      <span className="type-h3">{title}</span>
      <span className="type-body-sm">{summary}</span>
    </Link>
  )
}

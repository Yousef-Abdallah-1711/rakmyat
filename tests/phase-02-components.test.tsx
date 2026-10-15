import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import ReactThreeTestRenderer from '@react-three/test-renderer'
import { PerspectiveCamera } from '@react-three/drei'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Accordion } from '../components/ui/Accordion'
import { Checkbox } from '../components/ui/Checkbox'
import { ClassificationBadge } from '../components/ui/ClassificationBadge'
import { EmptyState } from '../components/ui/EmptyState'
import { FormField } from '../components/ui/FormField'
import { Modal } from '../components/ui/Modal'
import { OversizedNumeral } from '../components/ui/OversizedNumeral'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { ProjectShowcase } from '../components/ui/ProjectShowcase'
import { SecondaryButton } from '../components/ui/SecondaryButton'
import { ServiceRow } from '../components/ui/ServiceRow'
import { Skeleton } from '../components/ui/Skeleton'
import { TextLink } from '../components/ui/TextLink'
import { IconButton } from '../components/ui/IconButton'
import { analyticsEvents } from '../lib/analytics/events'
import { track } from '../lib/analytics/track'

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
    [key: string]: unknown
  }) => React.createElement('a', { ...props, href }, children),
}))
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string
    alt: string
    [key: string]: unknown
  }) => React.createElement('img', { ...props, src, alt }),
}))

afterEach(cleanup)

function withIntl(children: React.ReactNode) {
  return render(children)
}

describe('Phase 02 UI foundation', () => {
  it('renders primary button sizes and disables the loading state accessibly', () => {
    withIntl(
      <PrimaryButton disabled loading loadingLabel="Starting" size="sm">
        Start a Project
      </PrimaryButton>,
    )

    const button = screen.getByRole('button', { name: 'Starting' })
    expect((button as HTMLButtonElement).disabled).toBe(true)
    expect(button.getAttribute('aria-busy')).toBe('true')
  })

  it('renders secondary, text, and icon links with their accessible names', () => {
    withIntl(
      <>
        <SecondaryButton href="/about">Learn more</SecondaryButton>
        <TextLink href="/process">See our process</TextLink>
        <IconButton label="Open search">
          <span>⌕</span>
        </IconButton>
      </>,
    )
    expect(screen.getByRole('link', { name: 'Learn more' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'See our process' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Open search' })).toBeTruthy()
  })

  it('associates field labels, hints, and validation with controls', () => {
    withIntl(
      <FormField
        error="Enter a valid email"
        hint="We only use this to reply."
        label="Email"
        name="email"
        type="email"
      />,
    )

    const input = screen.getByRole('textbox', { name: /Email/ })
    expect(input.getAttribute('dir')).toBe('ltr')
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.getAttribute('aria-describedby')).toContain('error')
    expect(
      screen.getByText('Enter a valid email').getAttribute('aria-live'),
    ).toBe('polite')
  })

  it('renders email, textarea, select, and checkbox controls with semantic labels', () => {
    withIntl(
      <>
        <FormField label="Email" name="email" type="email" />
        <FormField label="Message" multiline name="message" />
        <FormField
          label="Service"
          name="service"
          selectOptions={[{ label: 'Software', value: 'software' }]}
        />
        <Checkbox label="I agree" name="consent" />
      </>,
    )

    expect(screen.getByRole('textbox', { name: 'Email' })).toBeTruthy()
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeTruthy()
    expect(screen.getByRole('combobox', { name: 'Service' })).toBeTruthy()
    expect(screen.getByRole('checkbox', { name: 'I agree' })).toBeTruthy()
  })

  it('renders each service row as one link and hides its numeral from assistive tech', () => {
    withIntl(
      <ServiceRow
        href="/services/software"
        pillarNumber={1}
        summary="Summary"
        title="Software"
      />,
    )
    expect(screen.getAllByRole('link')).toHaveLength(1)
    expect(
      screen.getByRole('link', { name: /Software\. Summary/ }),
    ).toBeTruthy()
    expect(screen.getByText('01').getAttribute('aria-hidden')).toBe('true')
  })

  it('renders the project showcase media and its classification overlay', () => {
    withIntl(
      <ProjectShowcase
        classification="concept-demo"
        classificationLabel="Concept / Demo"
        href="/work/example"
        image="/fixture-image.webp"
        imageAlt="Fixture image"
        summary="Fixture summary"
        title="Fixture project"
      />,
    )
    expect(screen.getByRole('link', { name: /Fixture project/ })).toBeTruthy()
    expect(screen.getByRole('img', { name: 'Fixture image' })).toBeTruthy()
    expect(screen.getByText('Concept / Demo').getAttribute('data-kind')).toBe(
      'concept',
    )
  })

  it('keeps all four classification badge variants distinct', () => {
    withIntl(
      <>
        <ClassificationBadge
          classification="real-client-project"
          label="Client"
        />
        <ClassificationBadge
          classification="internal-product"
          label="Internal"
        />
        <ClassificationBadge classification="concept-demo" label="Concept" />
        <ClassificationBadge
          classification="confidential-summary"
          label="Confidential"
        />
      </>,
    )

    expect(
      screen
        .getAllByText(/Client|Internal|Concept|Confidential/)
        .map((badge) => badge.getAttribute('data-kind')),
    ).toEqual(['client', 'internal', 'concept', 'confidential'])
  })

  it('provides labeled loading and empty states', () => {
    withIntl(
      <>
        <Skeleton label="Loading projects" lines={2} />
        <EmptyState
          href="/work"
          linkLabel="View work"
          message="No projects yet."
        />
      </>,
    )
    expect(
      screen.getByRole('status', { name: 'Loading projects' }),
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: 'View work' })).toBeTruthy()
  })

  it('exposes checkbox validation and a Radix accordion disclosure', () => {
    withIntl(
      <>
        <Checkbox error="Consent is required" label="I agree" name="consent" />
        <Accordion
          items={[
            { id: 'details', title: 'Details', content: 'Expanded content' },
          ]}
          label="Details list"
        />
      </>,
    )

    expect(
      screen
        .getByRole('checkbox', { name: 'I agree' })
        .getAttribute('aria-invalid'),
    ).toBe('true')
    fireEvent.click(screen.getByRole('button', { name: 'Details' }))
    expect(screen.getByText('Expanded content')).toBeTruthy()
  })

  it('opens and closes a Radix modal and keeps numeral detail decorative', () => {
    withIntl(
      <>
        <Modal
          closeLabel="Close dialog"
          title="Project details"
          trigger={<button type="button">Open details</button>}
        >
          Dialog body
        </Modal>
        <OversizedNumeral label="Step one" value={1} />
      </>,
    )

    expect(screen.getByText('01').getAttribute('aria-hidden')).toBe('true')
    fireEvent.click(screen.getByRole('button', { name: 'Open details' }))
    expect(screen.getByRole('dialog')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('does not throw when analytics has no vendor configured', () => {
    expect(() =>
      track('hero_cta_primary_click', { locale: 'en' }),
    ).not.toThrow()
  })

  it('predeclares the complete analytics event contract without collecting PII', () => {
    expect(Object.values(analyticsEvents).sort()).toEqual(
      [
        'contact_form_start',
        'contact_form_submit_fail',
        'contact_form_submit_success',
        'discovery_call_click',
        'hero_cta_primary_click',
        'hero_cta_secondary_click',
        'language_switch',
        'nav_cta_click',
        'service_page_cta_click',
        'work_card_click',
      ].sort(),
    )
  })

  it('renders a trivial R3F scene with the compatible Drei camera helper', async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#2453ff" />
        </mesh>
      </>,
    )

    const graph = JSON.stringify(renderer.toGraph())
    expect(graph).toContain('Mesh')
    expect(graph).toContain('PerspectiveCamera')
    await renderer.unmount()
  })
})

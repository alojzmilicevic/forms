import { useRef, useCallback, useLayoutEffect, useState } from 'react'
import styles from './editable-text.module.scss'

type EditableTextProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  tag: 'h1' | 'h2' | 'h3' | 'p'
  editable?: boolean
}

export const EditableText = ({
  value,
  onChange,
  placeholder = '',
  tag,
  editable = true,
}: EditableTextProps) => {
  const ref = useRef<HTMLElement>(null)
  const [isEmpty, setIsEmpty] = useState(!value)

  useLayoutEffect(() => {
    if (ref.current && editable) {
      ref.current.textContent = value
      setIsEmpty(!value)
    }
  }, [])

  const handleInput = useCallback(() => {
    if (ref.current) {
      const newValue = ref.current.textContent || ''
      setIsEmpty(!newValue)
      onChange(newValue)
    }
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }, [])

  const tagClassName = styles[tag as keyof typeof styles] || ''

  const commonProps = {
    ref: ref as any,
    className: `${styles.editableText} ${tagClassName} ${isEmpty ? styles.empty : ''}`,
    'data-placeholder': placeholder,
    ...(editable && {
      contentEditable: true,
      suppressContentEditableWarning: true,
      onInput: handleInput,
      onKeyDown: handleKeyDown,
    }),
  }

  const content = editable ? undefined : value

  switch (tag) {
    case 'h1':
      return <h1 {...commonProps}>{content}</h1>
    case 'h2':
      return <h2 {...commonProps}>{content}</h2>
    case 'h3':
      return <h3 {...commonProps}>{content}</h3>
    case 'p':
      return <p {...commonProps}>{content}</p>
  }
}

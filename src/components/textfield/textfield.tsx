import { forwardRef } from 'react'
import styles from './textfield.module.scss'

type TextfieldProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  variant?: "standard" | "filled" | "outlined";
}

const Textfield = forwardRef<HTMLInputElement, TextfieldProps>((props, ref) => {
  const variant = props.variant || "outlined";
  return (
    <input 
      ref={ref}
      type="text" 
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      className={`${styles.textfield} ${styles[`textfield-${variant}`]}`}
      placeholder={props.placeholder}
    />
  )
})

Textfield.displayName = 'Textfield'

export default Textfield


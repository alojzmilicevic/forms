import classNames from 'classnames'
import styles from './button.module.scss'

type ButtonProps = {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'tertiary'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = ({
  label,
  onClick,
  variant = 'primary',
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  const buttonClassName = classNames(styles.button, styles[variant])
  return (
    <button className={buttonClassName} onClick={onClick}>
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      {label}
      {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
    </button>
  )
}

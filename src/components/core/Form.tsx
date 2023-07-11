import * as BaseCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { styled } from '@stitches/react'
import {
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useId,
} from 'react'

// Interfaces

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  title?: string
  children?: ReactNode
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode
  labelProps?: HTMLAttributes<HTMLLabelElement>
  containerProps?: HTMLAttributes<HTMLDivElement>
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | ReactNode
  labelProps?: HTMLAttributes<HTMLLabelElement>
  containerProps?: HTMLAttributes<HTMLDivElement>
}

export interface CheckboxProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string | ReactNode
  labelProps?: HTMLAttributes<HTMLLabelElement>
  containerProps?: HTMLAttributes<HTMLDivElement>
}

// Exported Components

export function Form({ title, children, ...props }: FormProps) {
  return (
    <StyledForm {...props}>
      <FormTitle title={title} />
      {children}
    </StyledForm>
  )
}

export const Button = styled('button', {
  minHeight: '3rem',
  width: '100%',
  border: '2px solid white',
  fontSize: '1rem',
  marginTop: '1.5rem',
  transition:
    'background-color 0.2s ease-in-out, color 0.2s ease-in-out, opacity 0.2s ease-in-out',
  cursor: 'pointer',

  variants: {
    fill: {
      true: {
        backgroundColor: 'white',
        '&:hover': {
          opacity: 0.8,
        },
        '&:active': {
          opacity: 0.6,
        },
      },
      false: {
        backgroundColor: 'transparent',
        color: 'white',
        '&:hover': {
          backgroundColor: 'white',
          color: 'black',
        },
        '&:active': {
          backgroundColor: 'white',
          opacity: 0.8,
          color: 'black',
        },
      },
    },
  },
})

export function Input({ label, labelProps, containerProps = {}, ...props }: InputProps) {
  const inputId = useId()

  return (
    <InputContainer {...containerProps}>
      <StyledLabel htmlFor={inputId} {...labelProps}>
        {label}
      </StyledLabel>
      <StyledInput id={inputId} {...props} />
    </InputContainer>
  )
}

export function TextArea({ label, labelProps, containerProps = {}, ...props }: TextAreaProps) {
  const inputId = useId()

  return (
    <InputContainer {...containerProps}>
      <StyledLabel htmlFor={inputId} {...labelProps}>
        {label}
      </StyledLabel>
      <StyledTextArea id={inputId} {...props} />
    </InputContainer>
  )
}

export function Checkbox({ label, labelProps, containerProps = {}, ...props }: CheckboxProps) {
  const checkboxId = useId()

  return (
    <CheckboxInputContainer {...containerProps}>
      <StyledCheckboxLabel htmlFor={checkboxId} {...labelProps}>
        {label}:
      </StyledCheckboxLabel>
      <StyledCheckbox id={checkboxId} {...props}>
        <BaseCheckbox.Indicator>
          <CheckIcon />
        </BaseCheckbox.Indicator>
      </StyledCheckbox>
    </CheckboxInputContainer>
  )
}
export const FormContainer = styled('section', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  width: '100%',
})

export const FormLinkRow = styled('div', {
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  width: '100%',
  fontSize: '0.75rem',
  fontStyle: 'italic',
})

// Auxiliary components

const FormTitle = ({ title }: { title?: string }) => {
  if (!title) {
    return null
  }
  return <StyledFormTitle>{title}</StyledFormTitle>
}

// Styles

const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: '0.5rem 0',
})

const StyledInput = styled('input', {
  width: '100%',
  padding: '0.75rem 0.375rem',
  border: '1px solid white',

  '&::placeholder': {
    color: '#fff',
    opacity: 0.6,
  },
})

const StyledTextArea = styled('textarea', {
  width: '100%',
  minHeight: '4rem',
  padding: '0.75rem 0.375rem',
  border: '1px solid white',

  '&::placeholder': {
    color: '#fff',
    opacity: 0.6,
  },
})

const StyledLabel = styled('label', {
  fontSize: '1rem',
})

const StyledForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: '360px',
})

const StyledFormTitle = styled('h6', {
  fontSize: '2.25rem',
  fontWeight: 'normal',
  marginBottom: '1rem',
})

const CheckboxInputContainer = styled(InputContainer, {
  flexDirection: 'row',
})

const StyledCheckboxLabel = styled(StyledLabel, {
  display: 'inline',
  marginLeft: '.25rem',
})

const StyledCheckbox = styled(BaseCheckbox.Root, {
  width: '1.5rem',
  height: '1.5rem',
  background: 'black',
  border: '1px solid white',
  color: 'white',
  marginLeft: '0.5rem',
})

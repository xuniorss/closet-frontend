import { Control, UseFormRegister } from 'react-hook-form'

import { ProductsProps } from '../../NewCategory/validator'

type RegisterProps = {
   register: UseFormRegister<ProductsProps>
}

export type ControlProps = {
   control: Control<ProductsProps>
}

export type FormProps = {
   form: RegisterProps
}

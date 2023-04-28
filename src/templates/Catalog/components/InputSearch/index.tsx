import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { CgClose } from 'react-icons/cg'
import { FiSearch } from 'react-icons/fi'

type InputSearchProps = {
   searchState: (value: string) => void
   search: string
   handleClearInput: () => void
}

export const InputSearch = ({ searchState, search, handleClearInput }: InputSearchProps) => {
   return (
      <InputGroup>
         <Input
            bgColor="#f5f5f5"
            h="3.75rem"
            fontSize="lg"
            onChange={(e) => searchState(e.target.value)}
            value={search}
            placeholder="Informe mais de 3 caracteres para efetuar a pesquisa..."
            _placeholder={{ color: '#cecece' }}
         />
         <InputRightElement h="100%">
            {search.length > 0 && <CgClose onClick={handleClearInput} size={20} cursor="pointer" />}
            {search.length <= 0 && <FiSearch size={20} />}
         </InputRightElement>
      </InputGroup>
   )
}

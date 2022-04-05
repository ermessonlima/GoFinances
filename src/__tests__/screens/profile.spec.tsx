import React from 'react';
import { render } from '@testing-library/react-native'
import   {Profile}  from '../../screens/Profile';


describe('Grupo de teste : Profile', () => {
it('Checks if input Name with correct placeholder is on screen', () => { 
    //Verificar se o elemento existe
    //Pegar elementos renderizados em tela
    // debug() mostra todos os elementos
    // const { debug } = render(<Profile />);
    const { getByPlaceholderText } = render(<Profile />);
    // posso atribuir a variavel o valor do elemento
    const inputName = getByPlaceholderText('Nome');
    // definir espectativa, "Eu espero que o valor do input seja igual a 'Nome'"
    expect(inputName).toBeTruthy();
 })

 it('Checks if input Last Name with correct placeholder is on screen', () => { 
    // Pegar elemento pelo id (testeId)
    const { getByTestId } = render(<Profile />);
    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');
    // Verificando se o valor estár correto 
    expect(inputName.props.value).toEqual('Ermesson');
    expect(inputSurname.props.value).toEqual('Lima');
 })

 it('check if title render corrently', () => {
    const { getByTestId} = render(<Profile />);
    const textTitle = getByTestId('text-title');
    //verificar o conteudo de dentro do elemento ( filho )
    expect(textTitle.props.children).toContain('Profile');
 })

})
import React from 'react';
import { render } from '@testing-library/react-native';
import { Input } from '.';


describe('Input', () => {
    it('must have specific border color when active', () => {
        const { getByTestId } = render(
        <Input 
            testID="input-email"
            placeholder="Email"
            keyboardType="email-address"
            autoCorrect={false}
            active={true}        
        />);

        const inputComponent = getByTestId('input-email');
        expect(inputComponent.props.style[0].borderColor).toEqual('#e83f5b'); 
        

    });
        
  

})
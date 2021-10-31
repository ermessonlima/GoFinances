import styled, { css } from "styled-components/native";
import { TextInput } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton).attrs({
    activeOpacity: 0.7
})`

background-color: ${({ theme }) => theme.colors.shape};

flex-direction: row;
justify-content: space-between;
align-items: center;
border-radius: 5px;

padding: 18px 16px;
`;


export const CategoryType = styled.View`
flex-direction: row;

align-items: center;
`;

export const Category = styled.Text`
font-family: ${({ theme }) => theme.fonts.regular};
font-size:${RFValue(14)}px;


color: ${({ theme }) => theme.colors.text};

`;

export const IconCategory = styled(Feather)`
    font-size:${RFValue(20)}px;
    
    
    color: ${({ theme }) => theme.colors.text};
 
    margin-right: 10px;;


`;


export const Icon = styled(Feather)`
    font-size:${RFValue(20)}px;
    
    color: ${({ theme }) => theme.colors.text};

    margin-top: 8px;
    margin-bottom: 16px;


`;


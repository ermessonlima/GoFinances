import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
width: 100%;
height: ${RFValue(56)}px;

background-color: ${({theme}) => theme.colors.shape};
font-family: ${({theme}) => theme.fonts.regular};
border-radius: 5px;
align-items: center;
flex-direction: row;

margin-bottom: 16px;

`;

export const ImageContainer = styled.View`
   height: 100%;
   justify-content: center;
   align-items: center;

   padding: ${RFValue(16)}px;
   border-color: ${({theme}) => theme.colors.background};
   border-right-width: 1px;
`;


export const Title = styled.Text`
flex: 1;
text-align: center;

font-family: ${({theme}) => theme.fonts.medium};
font-size:${RFValue(14)}px;



color: ${({theme}) => theme.colors.text_dark};

`;

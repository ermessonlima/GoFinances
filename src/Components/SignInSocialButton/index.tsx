import React from 'react'
import {TextInputProps} from 'react-native'
import { Container, Title, ImageContainer } from './styles'
import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'

interface Props extends RectButtonProps {
    title: string;
    svg: React.FC<SvgProps>
    onPress: () => void;
}


export function SignInSocialButton({title,onPress,svg: Svg, ...rest}: Props) {
    return (
    <Container  {...rest} onPress={onPress}> 
    <ImageContainer>
        <Svg />
    </ImageContainer>
        <Title>
            {title}
        </Title>
    </Container>
  
    )
}

import React from 'react'
import { TextInputProps } from 'react-native'
import { Container, Category, Icon,CategoryType ,IconCategory} from './styles'
import { TouchableOpacityProps } from 'react-native'

interface Props extends TouchableOpacityProps {
    title: string;
}
interface Props {
    title: string;
    iconName: string;
    onPress: ()=> void;
}

export function CategorySelectButton({ title, onPress, iconName, ...rest }: Props) {
    return (
        <Container onPress={onPress} >
            <CategoryType>
             <IconCategory name={iconName} />
            <Category>
                {title}
            </Category>
            </ CategoryType>
            <Icon name="chevron-down" />
        </Container>

    )
}

import React, { useContext, useState } from 'react'
import { View, Text, ActivityIndicator, Platform } from 'react-native'
import { Container, Header, TitleWrapper, Title, SigninTitle, Footer, FooterWrapper} from './styles';
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../Components/SignInSocialButton';
import { useAuth } from '../../hooks/auth'
import { Alert } from 'react-native'
//A2:83:44:D9:33:F3:EB:47:A8:63:96:3A:49:52:75:9B:3F:6C:D1:FF

export function Signin() {

    const [isLoading, setLoading] = useState(false);
    const { signInWithGoogle, user, signInWithApple } = useAuth()
    console.log(user)
    async function handleSignInWithGoogle() {
       
        try {
            setLoading(true)
            console.log('dwwsfdf')
        return   await signInWithGoogle();
            
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possivel conectar a conta Google')
            setLoading(false)
        }
        
}
async function handleSignInWithAppe() {
       
    try {
        setLoading(true)
     
       return  await signInWithApple();
   
    } catch (error) {
        console.log(error)
        Alert.alert('Não foi possivel conectar a conta Apple')
        setLoading(false)
    } 
}
    
    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)} />
                    <Title>
                        Controle suas {'\n'}
                        finanças de forma{'\n'}
                        muito simples
                    </Title>
                    <SigninTitle>
                        Faça seu login com{'\n'}
                        uma das contas abaixo
                    </SigninTitle>
                </TitleWrapper>
            </Header>
            <Footer>
                <FooterWrapper>

                < SignInSocialButton 
            title={'Entrar com o Google'}
            onPress={handleSignInWithGoogle}
            svg={GoogleSvg}/>
                
               {Platform.OS === 'ios' && < SignInSocialButton 
            title={'Entrar com Apple'}
            onPress={handleSignInWithAppe}
            svg={AppleSvg}/>}
                </FooterWrapper>
          {isLoading && <ActivityIndicator color="red" />}
            </Footer>
        </Container>
    )
}

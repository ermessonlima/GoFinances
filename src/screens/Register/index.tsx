import React, { useState } from 'react'
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native'
import { useForm } from 'react-hook-form';
import { Input } from '../../Components/Forms/Input';
import { Button } from '../../Components/Forms/Button';
import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import { TransactionTypeButton } from '../../Components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../Components/Forms/CategorySelectButton';
import CategorySelect from '../CategorySelect';
import InputForm from '../../Components/InputForm';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import  AsyncStorage  from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth';

interface FormData {
    name:string;
    amount: string;
}

const schema = Yup.object().shape({
    name:Yup
    .string()
    .required('Nome é obrigatório'),
    amount: Yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('o valor não pode ser negativo')
    .required('Valor é obrigatório'),
});

export default function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)


    const navigation = useNavigation();
    const { user } = useAuth();

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
        icon: 'shopping-bag'
    })

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({resolver: yupResolver(schema)});

    async function handleRegister(form:FormData){
        if(!transactionType) {
            return Alert.alert('Selecione o tipo da transação.')
        }

        if(category.key === 'category') {
            return Alert.alert('Selecione a categoria.')
        }

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const dataKey = `@gofinances:transactions_user:${user.id}`;
          const data = await AsyncStorage.getItem(dataKey);
          const currentData = data ? JSON.parse(data) : [];

          const dataFormatted = [
              ...currentData, newTransaction
          ];
           await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

           reset();
           setTransactionType('');

          setCategory({
            key: 'category',
            name: 'Categoria',
            icon: 'shopping-bag'
        });

        navigation.navigate('Listagem');
        } catch (error){
            console.log(error)
            Alert.alert("Não foi possivel salvar!")
        }
    }




    function handleTransactionTypeSelect(type: 'positive' | 'negative') {
        setTransactionType(type)
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
         
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <InputForm
                        name="name"
                        control={control}
                        placeholder="Nome" 
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.name && errors.name.message}/>

                    <InputForm
                        name="amount"
                        control={control}
                        placeholder="Preço" 
                        keyboardType="numeric"
                        error={errors.amount && errors.amount.message}/>


                    <TransactionTypes>
                        <TransactionTypeButton
                            type="up"
                            title={"Income"}
                            onPress={() => handleTransactionTypeSelect('positive')}
                            isActive={transactionType === 'positive'} />
                        <TransactionTypeButton
                            type="down"
                            title={"Outcome"}
                            onPress={() => handleTransactionTypeSelect('negative')}
                            isActive={transactionType === 'negative'} />
                    </TransactionTypes>
                    <CategorySelectButton title={category.name}
                        iconName={category.icon}
                        onPress={handleOpenSelectCategoryModal}
                    />
                </ Fields>

                <Button title={"Enviar"} 
                onPress={handleSubmit(handleRegister)}/>
            </ Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
          
        </Container>
        </TouchableWithoutFeedback>
    )
}

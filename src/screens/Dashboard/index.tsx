import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native';
import { HighlightCard } from '../../Components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../Components/TransactionCard';
import {
    Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon, HighlightCards,
    Transactions, Title, TransactionList, LogoutButton
} from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage'

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}
interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps
}



export default function Dashboard() {

    const [isLoading, setLoaging] = useState(true)
    const [data, setData] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)
   

    const dataKey = '@gofinances:transactions';

    function getLastTransactionDate(collection: DataListProps[], 
        type: 'positive' | 'negative') {

        const lastTransaction =
            new Date(Math.max.apply(Math, collection
                .filter(transaction => transaction.type === type)
                .map(transaction => new Date(transaction.date).getTime())))

       return  `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}`

    }

    async function loadData() {
        const data = await AsyncStorage.getItem(dataKey);
        const transactions = JSON.parse(data!)

        let entriesTotal = 0;
        let expensiveTotal = 0;


        const transactionsFormated: DataListProps[] = transactions.map(
            (item: DataListProps) => {

                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount);
                } else {
                    expensiveTotal += Number(item.amount);
                }

                const amount = Number(item.amount).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date))

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date,
                }
            }
        );


        setData(transactionsFormated)

        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
        const lastTransactionExpensive = getLastTransactionDate(transactions, 'negative')
        const totalInterval = `01 a ${lastTransactionExpensive}`;



        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction:`Última entrada dia ${lastTransactionEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última saída ${lastTransactionExpensive}`,
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval, 
            },
        });

        setLoaging(false)
    }

    useEffect(() => {

        loadData()

    }, [])


    useFocusEffect(useCallback(() => {
        loadData()
    }, []));

    return (
        <Container>
            {isLoading == true && <ActivityIndicator />}

            {isLoading == false &&
                <>
                    <Header >
                        <UserWrapper>
                            <UserInfo>
                                <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/59540379?s=400&u=4084bb2c93b296bd68175eaa3adcc4a0be3928ca&v=4' }} />
                                <User>
                                    <UserGreeting>Olá,</UserGreeting>
                                    <UserName>Ermesson</UserName>
                                </User>
                            </UserInfo>
                            <LogoutButton onPress={() => { }}>
                                < Icon name="power" />
                            </LogoutButton>
                        </ UserWrapper>
                    </Header>
                    <HighlightCards>
                        <HighlightCard
                            type="up"
                            title='Entradas'
                            amount={highlightData.entries.amount}
                            lastTransaction={highlightData.entries.lastTransaction} />
                        <HighlightCard
                            type="down"
                            title='Saídas'
                            amount={highlightData.expensives.amount}
                            lastTransaction={highlightData.expensives.lastTransaction}  />
                        <HighlightCard
                            type="total"
                            title='Total'
                            amount={highlightData.total.amount}
                            lastTransaction={highlightData.total.lastTransaction} />
                    </HighlightCards>

                    <Transactions>
                        <Title>Listagem</Title>
                        <TransactionList
                            data={data}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <TransactionCard data={item} />}
                        />


                    </Transactions>
                </>}
        </Container>
    )
}

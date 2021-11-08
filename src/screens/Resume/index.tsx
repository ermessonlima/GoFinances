import React, { useEffect, useState, useCallback } from 'react'
import { ActivityIndicator } from 'react-native';
import { HistoryCard } from '../../Components/HistoryCard';
import {
    Container, Header, Title, Content, ChartContainer,
    MonthSelect, MonthSelectButton, MonthSelectIcon, Month,
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}
interface CategoryData {
    key: string;
    name: string;
    totalFormated: string;
    total: number;
    color: string;
    percent: string;
}

export function Resume() {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date);
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

    const theme = useTheme()
    const { user } = useAuth();

    function handleDateChange(action: 'next' | 'prev') {
        setIsLoading(true)

        if (action === 'next') {
            const newDate = addMonths(selectedDate, 1)
            setSelectedDate(newDate)

            console.log(newDate)
        } else {
            const newDate = subMonths(selectedDate, 1)
            setSelectedDate(newDate)

            console.log(newDate)
        }
    }

    async function loadData() {
        setIsLoading(true)
        const dataKey = `@gofinances:transactions_user:${user.id}`;
        const data = await AsyncStorage.getItem(dataKey);
        const currentData = data ? JSON.parse(data) : [];


        const expensives = currentData.filter(
            (expensive: TransactionData) =>
                expensive.type === 'negative' &&
                new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
                new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
        )

        const expensivesTotal = expensives.reduce(
            (acumullator: number, expansive: TransactionData) => {
                return acumullator + Number(expansive.amount);
            }, 0)
        console.log(expensivesTotal)


        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount);
                }
            });
            if (categorySum > 0) {
                const totalFormated = categorySum.toLocaleString(
                    'pt-BR',
                    {
                        style: 'currency',
                        currency: 'BRL'
                    })


                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`


                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    color: category.color,
                    totalFormated,
                    percent
                })
            }

        });
        setTotalByCategories(totalByCategory)
        setIsLoading(false)
    }


    useFocusEffect(useCallback(() => {
        loadData()
    }, [selectedDate]));



    return (
        <Container>

            
            <Header>
                <Title>
                    Resumo por categoria
                </Title>
            </Header>

            {isLoading == true && <ActivityIndicator />}

       {isLoading == false &&       <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight(),
                }}
            >

                <MonthSelect>
                    <MonthSelectButton onPress={() => handleDateChange('prev')} >
                        <MonthSelectIcon
                            name="chevron-left" />
                    </MonthSelectButton>
                    <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>
                    <MonthSelectButton onPress={() => handleDateChange('next')} >
                        <MonthSelectIcon
                            name="chevron-right" />
                    </MonthSelectButton>
                </MonthSelect>

                <ChartContainer>
                    <VictoryPie
                        data={totalByCategories}
                        colorScale={totalByCategories.map(category => category.color)}
                        style={{
                            labels: {
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: theme.colors.shape
                            }
                        }}
                        labelRadius={50}
                        x="percent"
                        y="total"

                    />
                </ChartContainer>
                {totalByCategories.map(item => (
                    <HistoryCard
                        key={item.key}
                        title={item.name}
                        amount={item.totalFormated}
                        color={item.color}
                    />
                ))}
            </Content>}
        </Container>
    )
}

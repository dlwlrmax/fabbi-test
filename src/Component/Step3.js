import { Button, Col, Row, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import Item from './Item/Item';
const { Title } = Typography;

export default function Step3({ people, next, prev, order, addItem, availableDishes, disableDot, removeItem, saveDishName, saveDishNumber }) {
    const [isValidate, setValidate] = useState(false);
    const [totalDishes, setTotalDishes] = useState(0);
    useEffect(() => {
        let _total = order.dishes.reduce((sum, item) => sum + item.no, 0);
        setTotalDishes(_total);
    }, [order]);
    useEffect(() => {
        const checkEmptyDish = () => {
            for (let item of order.dishes) {
                if (item.name === '') {
                    return false;
                }
            }
            if (totalDishes > 10 || totalDishes < people) return false;
            return true;
        };
        setValidate(checkEmptyDish);
    }, [order, totalDishes, people]);
    return (
        <div className='Step3'>
            <Row justify='space-around'>
                <Col span={8}>
                    <Title level={4}>Please select a dish</Title>
                </Col>
                <Col span={8}>
                    <Title level={4}>No. of servings</Title>
                </Col>
                <Col span={4}>
                    <Button icon={<PlusOutlined />} onClick={addItem} type='primary' disabled={availableDishes.length ? false : true} />
                </Col>
            </Row>
            {order.dishes.map(item => {
                return (
                    <Item
                        no={item.no}
                        name={item.name}
                        availableDishes={availableDishes}
                        disableDot={disableDot}
                        removeItem={removeItem}
                        id={item.id}
                        key={item.id}
                        saveDishName={saveDishName}
                        saveDishNumber={saveDishNumber}
                    />
                );
            })}
            <div className='total-dishes'>
                <span>Total Dishes: </span>
                <span>{totalDishes}</span>
                {totalDishes > 10 && <div style={{ color: '#d72d2d' }}>Maximum of 10 is allowed</div>}
                {totalDishes < people && <div style={{ color: '#d72d2d' }}>The total number of dishes less than number of people</div>}
            </div>
            <Space size={200}>
                <Button type='secondary' onClick={() => prev()} icon={<LeftOutlined />}>
                    Back
                </Button>

                <Button type='primary' onClick={() => next()} disabled={isValidate ? false : true}>
                    Next <RightOutlined />
                </Button>
            </Space>
        </div>
    );
}

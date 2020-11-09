import { Button, Card, Col, Row, Space } from 'antd';
import React from 'react';
import { Typography } from 'antd';
import { CheckOutlined, LeftOutlined } from '@ant-design/icons';
const { Text } = Typography;
export default function Review({ prev, done, order }) {
    return (
        <>
            <div className='content'>
                <div className='item'>
                    <div className='left-content'>
                        <Text strong>Meal :</Text>
                    </div>
                    <div className='right-content'>
                        <Text>{order.meal}</Text>
                    </div>
                </div>
                <div className='item'>
                    <div className='left-content'>
                        <Text strong>No. of People :</Text>
                    </div>
                    <div className='right-content'>
                        <Text>{order.ppl}</Text>
                    </div>
                </div>
                <div className='item'>
                    <div className='left-content'>
                        <Text strong>Restaurant :</Text>
                    </div>
                    <div className='right-content'>
                        <Text>{order.restaurant}</Text>
                    </div>
                </div>
                <div className='item'>
                    <div className='left-content'>
                        <Text strong>Dishes :</Text>
                    </div>
                    <div className='right-content'>
                        <Card style={{ marginBottom: 15, marginTop: 10 }}>
                            {order.dishes.map(item => {
                                return (
                                    <Row justify='center' key={item.id}>
                                        <Col span={12}>
                                            <Text strong>{item.name}</Text>
                                        </Col>

                                        <Col span={12}>
                                            <Text strong>{item.no}</Text>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </Card>
                    </div>
                </div>
            </div>
            <Space size={200}>
                <Button type='secondary' onClick={() => prev()} icon={<LeftOutlined />}>
                    Back
                </Button>
                <Button type='primary' onClick={() => done()}>
                    Done <CheckOutlined />
                </Button>
            </Space>
        </>
    );
}

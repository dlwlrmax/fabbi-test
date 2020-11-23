import React, { useEffect, useState, useContext } from 'react';
import { Select, Form, Button, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { MyContext } from '../MyContext';
const { Option } = Select;

export default function Step2({ next, prev, filterRestaurants, onSelectRestaurant }) {
    const [restaurantsName, setRestaurants] = useState([]);
    const { restaurant } = useContext(MyContext);
    useEffect(() => {
        const uniqueRestaurants = {};
        for (let item of filterRestaurants) {
            uniqueRestaurants[item.restaurant] = true;
        }
        let _restaurantName = Object.keys(uniqueRestaurants);

        setRestaurants(_restaurantName);
    }, [filterRestaurants]);

    return (
        <div className='Step2'>
            <Form layout='vertical' onFinish={next}>
                <Form.Item
                    initialValue={restaurant}
                    label='Please select a restaurants'
                    name='meal'
                    rules={[{ required: true, message: 'Please select a restaurants!' }]}>
                    <Select onChange={onSelectRestaurant}>
                        {restaurantsName.map((item, index) => {
                            return (
                                <Option value={item} key={index}>
                                    {item}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Space size={200}>
                        <Button type='secondary' onClick={() => prev()} icon={<LeftOutlined />}>
                            Back
                        </Button>
                        <Button type='primary' htmlType='submit'>
                            Next <RightOutlined />
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}

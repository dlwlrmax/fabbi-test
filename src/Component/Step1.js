import React, { useState } from 'react';
import { InputNumber, Select, Form, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const { Option } = Select;
function validatePrimeNumber(number) {
    if (number > 0 && number <= 10) {
        return {
            validateStatus: 'success',
            errorMsg: null,
        };
    }

    return {
        validateStatus: 'error',
        errorMsg: 'Number of people must more than 0 and maximum of 10 !',
    };
}

export default function Step1({ next, meal, people, onMealChange, onPeopleChange, disableDot }) {
    const onFinish = values => {
        console.log('Success:', values);
        next();
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const [number, setNumber] = useState({
        value: 11,
    });
    const onNumberChange = value => {
        setNumber({ ...validatePrimeNumber(value), value });
        onPeopleChange(value);
    };
    return (
        <div className='Step1'>
            <Form layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                    initialValue={meal}
                    label='Please select a meal'
                    name='meal'
                    rules={[{ required: true, message: 'Please select a meal!' }]}>
                    <Select onChange={onMealChange}>
                        <Option value='Breakfast'>Breakfast</Option>
                        <Option value='Lunch'>Lunch</Option>
                        <Option value='Dinner'>Dinner</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    validateStatus={number.validateStatus}
                    help={number.errorMsg}
                    label='Please enter number of people'
                    name='numbPpl'
                    initialValue={people}
                    rules={[{ required: true, message: 'Number of people must more than 0!' }]}>
                    <InputNumber min={1} max={10} onKeyDown={disableDot} value={number.value} onChange={onNumberChange} />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Next <RightOutlined />
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

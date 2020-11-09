import React from 'react';
import { Button, Col, Row } from 'antd';
import { InputNumber } from 'antd';
import Dish from './Dish/Dish';
import { setTwoToneColor } from '@ant-design/icons';
import { MinusCircleTwoTone } from '@ant-design/icons';
export default function Item({ saveDishName, saveDishNumber, id, availableDishes, disableDot, removeItem, no, name }) {
    setTwoToneColor('#d72d2d');
    return (
        <Row justify='space-around' style={{ marginTop: 20, marginBottom: 20 }}>
            <Col span={8}>
                <Dish saveDishName={saveDishName} availableDishes={availableDishes} id={id} name={name} />
            </Col>
            <Col span={8}>
                <InputNumber onChange={value => saveDishNumber(value, id)} min={1} max={10} defaultValue={no} onKeyDown={disableDot} />
            </Col>
            <Col span={4}>
                <Button icon={<MinusCircleTwoTone />} type='text' color='danger' onClick={() => removeItem(id)} />
            </Col>
        </Row>
    );
}

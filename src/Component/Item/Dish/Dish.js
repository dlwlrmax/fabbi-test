import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
export default function Dish({ name, id, availableDishes, saveDishName }) {
    return (
        <div className='Dish'>
            <Select defaultValue={name} style={{ width: 150 }} onChange={e => saveDishName(e, id)}>
                {availableDishes.map(item => {
                    return (
                        <Option key={item.id} value={item.name}>
                            {item.name}
                        </Option>
                    );
                })}
            </Select>
            {!name && <p style={{ color: '#d72d2d', marginTop: 5 }}>Please select a dish</p>}
        </div>
    );
}

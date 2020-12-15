import React, { useState } from 'react'
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

function Price(props) {
    const [radioValue, setRadioValue] = useState(0);
    
    const renderRadioboxLists = () => {
        if(props.list){
            return props.list.map((value, idx) => {
                return (
                    <Radio key={idx} value={value.id}>
                        {value.name}
                    </Radio>
                );
            });
        }
    }

    const handleChange = (e) => {
        setRadioValue(e.target.value);
        props.handleFilters(e.target.value);
    }

    return (
        <div>
            <Collapse>
                <Panel header="가격별 검색" key="1">
                    <Radio.Group onChange={handleChange} value={radioValue}>
                        {renderRadioboxLists(handleChange)}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    );
}

export default Price
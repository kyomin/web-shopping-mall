import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function Classifications(props) {
    const [checked, setChecked] = useState([]);

    const handleToggle = (value) => {
        // 누른 것의 index를 구하고(배열에 해당 값이 없다면 -1 반환)
        const currentIndex = checked.indexOf(value);

        // 전체 checked된 state에서 현재 누른 checkbox가 이미 있다면
        const newChecked = [...checked];

        if(currentIndex === -1){    // 넣어주고
            newChecked.push(value);
        } else {                    // 있다면 빼준다.
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        props.handleFilters(newChecked);
    }

    const renderCheckboxLists = () => {
        if(props.list){
            return props.list.map((value, idx) => {
                return (
                    <React.Fragment key={idx}>
                        <Checkbox 
                            onChange={() => handleToggle(value.id)} 
                            checked={checked.indexOf(value.id) === -1 ? false : true} 
                        />
                            <span>{value.name}</span> 
                            <br/>
                    </React.Fragment>
                );
            });
        }
    }

    return (
        <div>
            <Collapse>
                <Panel header="전체 카테고리" key="1">
                    {renderCheckboxLists()}
                    
                </Panel>
            </Collapse>
        </div>
    );
}

export default Classifications
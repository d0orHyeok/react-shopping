import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const handleToggle = value => {
    // Check 되었을 때 State에 눌림여부를 업데이트한다.
    const currentIndex = Checked.indexOf(value);

    const newChecked = [...Checked];
    currentIndex === -1 ? newChecked.push(value) : newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox onChange={() => handleToggle(value._id)} checked={Checked.indexOf(value._id) === -1 ? false : true}>
          <span>{value.name}</span>
        </Checkbox>
      </React.Fragment>
    ));

  return (
    <Collapse defaultActiveKey={['0']}>
      <Panel header="Continents" key="1">
        {renderCheckboxLists()}
      </Panel>
    </Collapse>
  );
}

export default CheckBox;

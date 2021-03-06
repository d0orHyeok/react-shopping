import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

function RadioBox(props) {
  const [Value, setValue] = useState(0);

  const onChange = e => {
    setValue(e.target.value);
    props.handleFilters(e.target.value);
  };

  const renderRadioBox = () =>
    props.list &&
    props.list.map(value => (
      <React.Fragment key={value._id}>
        <Radio value={value._id}>{value.name}</Radio>
      </React.Fragment>
    ));

  return (
    <Collapse defaultActiveKey={['0']}>
      <Panel header="Price" key="1">
        <Radio.Group onChange={onChange} value={Value}>
          {renderRadioBox()}
        </Radio.Group>
      </Panel>
    </Collapse>
  );
}

export default RadioBox;

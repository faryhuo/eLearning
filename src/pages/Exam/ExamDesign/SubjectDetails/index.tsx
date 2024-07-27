import {
  PageContainer
} from '@ant-design/pro-components';
import { Button, TabPaneProps } from 'antd';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';


const tabList = [{
  tab: "Season 1",
  key: "1",
}, {
  tab: "Season 2",
  key: "2",
},
{
  tab: "Season 3",
  key: "3",
},
]

const EaxmSubjectDetails: React.FC = () => {

  const params = useParams()
  console.log(params)


  return (
    <PageContainer
      title={"Subject Details"}
      tabList={tabList}
      extra={[
        <Button key="1" type="primary">
          Amend
        </Button>,
      ]}>


    </PageContainer>
  );
};

export default EaxmSubjectDetails;

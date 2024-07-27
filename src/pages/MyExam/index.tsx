import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Card, List } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';

const MyExam: React.FC = () => {
  const intl = useIntl();
  const data: any[] | undefined = [{},{},{},{},{}];
  return (
    <PageContainer>
      <List
      style={{padding:32}}
        grid={{ gutter: 32, column: 4}}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{ width: 350,height:350 }}
              cover={<img alt="example"  width={220} height={220}/>}
            >
              <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
          </List.Item>
        )}></List>

    </PageContainer>
  );
};

export default MyExam;

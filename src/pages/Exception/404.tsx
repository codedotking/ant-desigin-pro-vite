import { Button, Card, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoFoundPage: React.FC = () => {
    const navigate = useNavigate();
    return <Card variant="borderless">
        <Result
            status="404"
            title="404"
            subTitle="页面不存在"
            extra={
                <Button type="primary" onClick={() => navigate('/')}>
                    返回首页
                </Button>
            }
        />
    </Card>
};

export default NoFoundPage;

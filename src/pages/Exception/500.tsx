import { Button, Card, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServerErrorPage: React.FC = () => {
    const navigate = useNavigate();
    return <Card variant="borderless">
        <Result
            status="500"
            title="500"
            subTitle="服务器错误"
            extra={
                <Button type="primary" onClick={() => navigate('/')}>
                    返回首页
                </Button>
            }
        />
    </Card>
};

export default ServerErrorPage;

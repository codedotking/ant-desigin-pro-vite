import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

const NoFoundPage: React.FC = () => {
    return <Result
        status="500"
        title="500"
        style={{
            background: 'none',
        }}
        subTitle="Sorry, the server is reporting an error."
        extra={
            <Link to="/">
                <Button type="primary">Back Home</Button>
            </Link>
        }
    />
};

export default NoFoundPage;

import React, {
    FC, useState, useRef, useEffect, useCallback
} from 'react';
import { Props } from '../../containers/register';
import {
    Form,
    Input,
    Button,
} from 'antd';
import './style.css';


export const Register: FC<Props> = ({
    registerUser,
    errorMessage,
    history,
}) => {
    const [form] = Form.useForm();
  
    return (<>

        <link rel="stylesheet" type="text/css" href="./style.css" />
        <span className="error-message">{errorMessage}</span>

        <Form
            form={form}
            onFinish={(data) => registerUser({
                username: data.username,
                email: data.email,
                password: data.password
            })}
            name="register"
            scrollToFirstError
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Username is required.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email is required.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Password is required.',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Potvrdi Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Confirm password is required.',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Passwords do not match.');
                        },
                    }),
                ]}
            ><Input.Password />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Register
                    </Button>
            </Form.Item>
        </Form>

        
    </>
    )
}
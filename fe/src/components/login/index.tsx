import React, {FC} from 'react';
import {
    Form,
    Input,
    Button,
  } from 'antd';
import { Props } from '../../containers/login';
import Routes from '../../appconfig/routes';


export const Login: FC<Props> = ({
    loginUser,
    history
}) => {
    const [form] = Form.useForm();
    return <>
    <Form
            form={form}
            onFinish={(data) => loginUser({
                username: data.username,
                password: data.password,
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
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
            <div>
                Niste registrirani?
                <Button
                    type="link"
                    onClick={() => {
                        history.push(Routes.register)
                    }}
                >
                    Register.
                </Button>
            </div>
        </>
}


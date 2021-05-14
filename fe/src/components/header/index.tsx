import { Button, Modal, Input, Select } from 'antd';
import React, { FC, useState } from 'react';
import Routes from '../../appconfig/routes';
import { Props } from '../../containers/header';
import './style.css';
import { formatDiagnosticsWithColorAndContext } from 'typescript';

export const Header: FC<Props> = ({
    isUserLoggedIn,
    history,
    patchUser,
    logoutUser
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [pass, setPass] = useState("");
    return <>
            <h2 className="head-name" onClick={()=>history.push('/')}>Daily activities</h2>
            <div className="head-login">
                {
                    isUserLoggedIn
                        ?
                        <>
                            <Button className="buttons-blue" onClick={()=>setModalVisible(true)}>Change Password</Button>
                            <Button className="buttons-red"
                                onClick={() => logoutUser("")}
                            >
                                Logout
                            </Button>
                        </>
                        :
                        <>
                            <Button className="buttons-green"
                                onClick={
                                    () => history.push(Routes.login)
                                }
                            >
                                Login
                        </Button>
                        </>
                }
                <Modal
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false);
                    var pass1 = (document.getElementById("pass") as HTMLInputElement).value.toString()
                    var password = { password: pass1 };
                    console.log(password)
                    patchUser(password)

                }}
                centered
                closable={false}
                onCancel={() => { setModalVisible(false) }}
            >
                <div className="rent-form">
                    <label> Novi password:  </label>
                    <Input.Password
                        id="pass"
                    ></Input.Password>
                </div>
            </Modal>
            </div>

    </>
}


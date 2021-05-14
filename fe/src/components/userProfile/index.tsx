import React, { FC, useEffect, useState } from 'react';
import { Props } from '../../containers/userProfile';
import {
    Button,
    Row,
    Table,
    List,
    Card,
    Switch,
    Input,
    Modal
} from 'antd';
import './style.css';
import Moment from 'moment';
import { visitLexicalEnvironment } from 'typescript';

export const User: FC<Props> = ({
    isUserLoggedIn,
    todos,
    postTodo,
    deleteTodo,
    patchTodo
}) => {
    const [searchBox, setSearchBox] = useState("")
    const [useFilter, setUserFliter] = useState(false)
    const [filter1, setFilter] = useState(false)
    const [newToDo, setNewToDo] = useState("")
    const [id1, setId] = useState(0)
    const [change1, setChange] = useState(false)
    const [task1, setTask] = useState("")
    const [visible, setVisible] = useState(false)
    return <div>
        {isUserLoggedIn
            ?
            <div>
                {
                    useFilter
                        ?
                        <>
                            {filter1
                                ?
                                <>
                                    <List
                                        grid={{ gutter: 1, column: 1 }}

                                        dataSource={todos.filter((todo) => todo.isCompleted)}
                                        renderItem={
                                            todo => (
                                                <div>
                                                    <List.Item >
                                                        <Row className="long-row">
                                                            <h3>{todo.task}</h3>
                                                            <h3>{todo.date.toString().split("T")[0]}</h3>
                                                        </Row>
                                                    </List.Item>
                                                </div>

                                            )
                                        }
                                    /></>
                                :
                                <>
                                    <List
                                        grid={{ gutter: 1, column: 1 }}

                                        dataSource={todos.filter((todo) => !todo.isCompleted)}
                                        renderItem={
                                            todo => (
                                                <div>
                                                    <List.Item >
                                                        <Row className="long-row">
                                                            <h3>{todo.task}</h3>
                                                            <h3>{todo.date.toString().split("T")[0]}</h3>
                                                        </Row>
                                                    </List.Item>
                                                </div>

                                            )
                                        }
                                    /></>
                            }

                        </> :
                        <div>
                            <Row className="long-row">
                                <h3><b>Search: </b></h3> <Input className="searchbox" onChange={(input) => setSearchBox(input.target.value)}></Input>
                               
                            </Row>
                            <List
                                grid={{ gutter: 1, column: 1 }}
                                dataSource={todos.filter((todo) => todo.task.includes(searchBox))}
                                renderItem={
                                    todo => (
                                        <div>
                                            <List.Item >
                                                <Row className="long-row">
                                                    <Switch defaultChecked={todo.isCompleted} onChange={(change) => {
                                                        patchTodo({ id: todo.id, isCompleted: change, task: todo.task })
                                                    }}></Switch>
                                                    <h3>{todo.task}</h3>
                                                    <h3>{todo.date.toString().split("T")[0]}</h3>
                                                    <Button className="buttons-green" onClick={() => {
                                                        setChange(todo.isCompleted);
                                                        setId(todo.id)
                                                        setTask(todo.task)
                                                        setVisible(true)
                                                    }}>CHANGE</Button>
                                                    <Button className="buttons-red" onClick={() => deleteTodo({ id: todo.id })}>DELETE</Button>
                                                </Row>
                                            </List.Item>
                                        </div>

                                    )
                                }
                            />
                        </div>
                }
                <div>
                    <div>
                        <b>New task:</b>
                        <Input onChange={(input) => setNewToDo(input.target.value)}></Input>
                    </div>
                    <Row className="long-row">
                        <Button className="buttons-green" onClick={() => { setFilter(true); setUserFliter(true); console.log(todos) }}>Filter completed</Button>
                        <Button className="buttons-red" onClick={() => { setFilter(false); setUserFliter(true); console.log(todos) }}>Filter active</Button>
                        <Button className="buttons-blue" onClick={() => setUserFliter(false)}>Remove filter</Button>
                        <Button className="buttons-green" onClick={() => postTodo({ task: newToDo })}>ADD</Button>
                    </Row>
                </div>
            </div>
            :
            <></>
        }
        <div>
            <Modal
                visible={visible}
                onOk={() => {
                    setVisible(false);
                    var task2 = (document.getElementById("pass1") as HTMLInputElement).value.toString();
                    patchTodo({ id: id1, isCompleted: change1, task: task2 });
                    setTask("")
                }
                }
                centered
                closable={false}
                onCancel={() => { setVisible(false) }}
            >
                <div className="rent-form">
                    <label> {task1} </label>
                    <Input
                        id="pass1"
                    ></Input>
                </div>
            </Modal>
        </div>
    </div>
}
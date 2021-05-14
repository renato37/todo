import {connect} from 'react-redux';
import {Dispatch} from 'react';
import { User } from '../../components/userProfile';
import {ApplicationState} from '../../store/types';
import { withRouter } from 'react-router-dom';
import { RouterProps } from 'react-router';
import { Actions, todo, TodoPostRequestPayload, TodoDeleteRequestPayload, TodoPatchRequestPayload } from '../../store/user/types';
import { todoPostAction, todoDeleteAction, todoPatchAction} from '../../store/user/actions';

interface PropsFromState {
    isUserLoggedIn: boolean;
    todos: todo[];
}

interface PropsWithDispatch {
    postTodo: (data: TodoPostRequestPayload) => void;
    deleteTodo: (data: TodoDeleteRequestPayload) => void;
    patchTodo: (data: TodoPatchRequestPayload) => void;
}

const mapStateToProps = (state: ApplicationState): PropsFromState => {
    return {
        todos: state.user.todos??[],
        isUserLoggedIn: Boolean(state.user.auth?.accessToken),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): PropsWithDispatch => ({
    postTodo: (data: TodoPostRequestPayload):void => dispatch(todoPostAction.request(data)),
    deleteTodo: (data: TodoDeleteRequestPayload):void => dispatch(todoDeleteAction.request(data)),
    patchTodo: (data: TodoPatchRequestPayload):void => dispatch(todoPatchAction.request(data))
});

export interface Props extends PropsFromState, PropsWithDispatch, RouterProps {}

export default withRouter(connect<PropsFromState, PropsWithDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(User));
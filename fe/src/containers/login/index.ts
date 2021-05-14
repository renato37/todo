import {Dispatch} from 'react';
import {connect} from 'react-redux';
import { Login } from '../../components/login';
import {ApplicationState} from '../../store/types';
import { loginUserAction} from '../../store/user/actions';
import { LoginUserRequestPayload } from '../../store/user/types';
import { Actions } from '../../store/user/types';
import { withRouter } from 'react-router-dom';
import { RouterProps } from 'react-router';


interface PropsFromState {
    errorMessage?: string;
}

interface PropsWithDispatch {
    loginUser: (data: LoginUserRequestPayload) => void;
}

const mapStateToProps = (state: ApplicationState): PropsFromState => {
    const {
        user:{
            errorMessage,
        }
    } = state;
    return {
        errorMessage,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): PropsWithDispatch => ({
    loginUser: (data: LoginUserRequestPayload): void => dispatch(loginUserAction.request(data)),
});

export interface Props extends PropsFromState, PropsWithDispatch, RouterProps {}

export default withRouter(connect<PropsFromState, PropsWithDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(Login));
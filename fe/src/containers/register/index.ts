import {Dispatch} from 'react';
import {connect} from 'react-redux';
import { Register } from '../../components/register';
import {ApplicationState} from '../../store/types';
import { registerUserAction} from '../../store/user/actions';
import { RegisterUserRequestPayload } from '../../store/user/types';
import { Actions } from '../../store/user/types';
import {withRouter} from 'react-router-dom';
import { RouterProps } from 'react-router';


interface PropsFromState {
    errorMessage?: string;
}

interface PropsWithDispatch {
    registerUser: (data: RegisterUserRequestPayload) => void;
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
    registerUser: (data: RegisterUserRequestPayload): void => dispatch(registerUserAction.request(data)),
});

export interface Props extends PropsFromState, PropsWithDispatch, RouterProps {}

export default withRouter(connect<PropsFromState, PropsWithDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(Register));
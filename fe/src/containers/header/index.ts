import {Dispatch} from 'react';
import {connect} from 'react-redux';
import { Header } from '../../components/header';
import {ApplicationState} from '../../store/types';
import { Actions } from '../../store/user/types';
import { withRouter } from 'react-router-dom';
import { RouterProps } from 'react-router';
import { logoutUserAction, patchUserAction} from '../../store/user/actions';
import { LogoutUserRequestPayload, PatchUserRequestPayload} from '../../store/user/types';


interface PropsFromState {
    isUserLoggedIn: boolean;    
}

interface PropsWithDispatch {
    logoutUser:(data: LogoutUserRequestPayload) => void;
    patchUser:(data: PatchUserRequestPayload) => void;
}

const mapStateToProps = (state: ApplicationState): PropsFromState => {
    const {
        user:{
            errorMessage,
        }
    } = state;
    return {
        isUserLoggedIn: Boolean(state.user.auth?.accessToken),
    };
};
const mapDispatchToProps = (dispatch: Dispatch<Actions>): PropsWithDispatch => ({
    logoutUser: (data : LogoutUserRequestPayload): void => dispatch(logoutUserAction.request(data)),
    patchUser: (data: PatchUserRequestPayload): void => dispatch(patchUserAction.request(data))
});

export interface Props extends PropsFromState, PropsWithDispatch, RouterProps {}

export default withRouter(connect<PropsFromState, PropsWithDispatch, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(Header));
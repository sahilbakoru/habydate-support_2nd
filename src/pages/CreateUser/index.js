import React from 'react';
import Box from '@mui/material/Box';
import { connect, useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditProfile from '../EditProfile';
import { bindActionCreators } from 'redux';
import actionCreators from "../../redux/actions"
import userActions from '../../redux/user/actions'
import "./createUser.css"


function CreateUser({ user }) {
    const dispatch = useDispatch()
    const cu_model_wrapper = {
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflow: 'scroll',
        height: '100%',
        display: 'block'
    }

    const setNewUser = () => {
        dispatch(userActions.userUnsetNewUser())
    }

    const { newUser } = user;
    return <div>
        <Modal
            open={newUser}
            onClose={() => setNewUser()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={cu_model_wrapper}>

                <Typography id="modal-modal-title" variant="h6" component="h2" className="cu-heading">
                    Complete your Registration
                </Typography>
                <EditProfile isNewUser={newUser} setIsNewUser={setNewUser} />
            </Box>
        </Modal>
    </div>
}

const mapStateToProps = (states) => {
    return {
        user: states.user
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
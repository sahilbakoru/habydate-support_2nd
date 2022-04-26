import React, { useState, useRef } from "react"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addToReport } from "../services/FirebaseServices";
import matchesActions from "../redux/matches/actions";

function ReportUser({ initModelOpen, setOpenModel, cuid, uid, dispatch, setAlreadyReported }) {
    const [textValue, setTextValue] = useState(null);
    const textValRef = useRef(null)
    const cu_model_wrapper = {
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height: 400,
        display: 'block'
    }

    const handleOpenCloseModel = () => {
        // setOpen(!modelOpen);
        setOpenModel(!initModelOpen)
    }

    const handleSubmitTextValue = async () => {
        if (textValue) {
            handleOpenCloseModel();
            const payload = {
                msg: textValue,
                to_user_id: uid,
                user_id: cuid
            }
            textValRef.current.value = "";
            dispatch(matchesActions.addReport());
            const res = await addToReport(payload)
            if (res.error === true) {
                toast(`Report user Failed`);
                dispatch(matchesActions.reportError(payload))
            } else {
                toast(`Your Report successfully submitted by user`);
                dispatch(matchesActions.reportSuccess(payload))
                setAlreadyReported(true);
            }

        } else {
            toast("Enter some text");
        }
    }
    return (
        <Modal
            open={initModelOpen}
            onClose={handleOpenCloseModel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="report-user-model"
        >
            <Box sx={cu_model_wrapper} className="report-user-box">
                <p className="name-2 report-user text-center">Report This user</p>
                <Form.Group className="col-lg-12" controlId="formBasicEmail">
                    <div className="common-input">
                        <Form.Control ref={textValRef} type="textarea" className="same-input" placeholder="Enter text" style={{ height: "100px" }} onChange={(e) => setTextValue(e.target.value)} />
                    </div>
                </Form.Group>
                <div className="col-lg-12">
                    <div className="common-input">
                        <Button className="all-button bt" type="button" onClick={handleSubmitTextValue}>
                            Submit
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default ReportUser
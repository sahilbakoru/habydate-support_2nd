import React from "react";
import { bindActionCreators } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { AiOutlinePlus } from 'react-icons/ai'
import actionCreators from "../redux/actions"
import userActions from '../redux/user/actions'
import { connect, useDispatch } from 'react-redux';
import { updateUser, uploadUserImage } from "../services/FirebaseServices";

function UploadImage({ user }) {

    const dispatch = useDispatch()

    const hiddenFileInput = React.useRef(null);

    const handleChange = async (e) => {
        const file = e.target.files[0]
        e.preventDefault();
        dispatch(userActions.userUploadImage())
        const { list } = user
        var url = await uploadUserImage(file, list.uid)

        var photos = list.photos ? list.photos : [];
        var upImg = {
            photoUrl: url,
            public_id: uuidv4()
        }
        if (photos.length >= 8) {
            toast("New Profile creation limit Image Upload on Profile. 8 images only");
        } else {
            photos.push(upImg)
            list['photos'] = photos

            var res = await updateUser(list);
            res.error === false ? dispatch(userActions.userUploadImageSuccess(res.user)) : dispatch(userActions.userUploadImageError())
        }

    }

    const handleOpenUpload = async (e) => {
        hiddenFileInput.current.click();
    }

    return (
        <div>
            <ul className="upload-ul" onClick={handleOpenUpload}>
                <li><AiOutlinePlus className="upload-plus" /></li>
                <li><p className="upload-text"> Add Image</p></li>
            </ul>
            <input type="file" ref={hiddenFileInput} id="imageUpload" hidden={true} onChange={handleChange} />
        </div>
    );
}

const mapStateToProps = (states) => {
    return {
        user: states.user
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage)
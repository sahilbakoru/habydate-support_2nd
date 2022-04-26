import React from 'react';

function ProfileEdit(params) {
    return (
        <div className="under-common">
            <div className="row">
                <div className="col-lg-6">
                    <div className="common-input">
                        <input type="text" placeholder="Name" className="same-input" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="common-input">
                        <input type="text" placeholder="Name" className="same-input" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="common-input">
                        <input type="text" placeholder="Name" className="same-input" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="common-input">
                        <input type="text" placeholder="Name" className="same-input" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="common-input">
                        <input type="text" placeholder="Name" className="same-input" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="common-input">
                        <input type="text" placeholder="Name" className="same-input" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="common-input">
                        <ul className="radio-custom">
                            <li><p>Gender</p></li>
                            <li><input type="radio" id="html" name="fav_language" value="HTML" /><label for="html">HTML</label></li>
                            <li><input type="radio" id="html" name="fav_language" value="HTML" /><label for="html">HTML</label></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="common-input">
                        <button className="all-button bt">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileEdit
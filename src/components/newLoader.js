import React from 'react';
import { connect } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay'

function MyLoader({ loading, children }) {
    return (
        <LoadingOverlay
            active={loading}
        >
            {children}
        </LoadingOverlay>
    )
}

const mapStateToProps = (states) => {
    return {
        loading: states.user.loading ? states.user.loading : states.matches.loading ? states.matches.loading : states.chats.loading ? states.chats.loading : states.global.loading
    }
}
export default connect(mapStateToProps)(MyLoader)
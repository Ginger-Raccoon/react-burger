import PropTypes from 'prop-types';
import s from './style.module.css'

const ModalOverlay = (props) => {
    return (
        <div className={s.overlay} onClick={props.closeModal}>
        </div>
    );
};

ModalOverlay.propTypes = {
    closeModal: PropTypes.func,
};

export default  ModalOverlay;

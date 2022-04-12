import React, { FunctionComponent, Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'components/UI/Button';
import { Modal } from 'components/UI/Modal/Modal';

const Playground: FunctionComponent = () => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
    }, [dispatch])

    return (
        <Fragment>
            <Button label="Show modal" onClick={() => setShowModal(true)} />
            <Modal 
                title="Modal" 
                isOpen={showModal}
                onConfirm={() => console.log('onConfirm')}
                onCancel={() => setShowModal(false)}
                onClose={() => setShowModal(false)}
            >
            </Modal>
        </Fragment>
    )
}

export default Playground;
import { FunctionComponent, Fragment, useEffect, useState } from 'react';

import { useAppDispatch } from 'redux/store';

import { Button } from 'components/UI/Button';
import { Modal } from 'components/UI/Modal/Modal';

const Playground: FunctionComponent = () => {
    const dispatch = useAppDispatch();

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
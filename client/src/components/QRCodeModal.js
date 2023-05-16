import {useState} from 'react';

import { QRCodeSVG } from 'qrcode.react';

const QRCodeModal = ({toggleModal, link}) => {
    


    //===[Return]=============================================
    return(
        <>
            
            <div className='modal-background qr-background' onClick={toggleModal}>
                <div className='flex-center'>
                    <QRCodeSVG className='qr-code' style={{cursor: 'zoom-out'}} value={link}  />
                

                </div>
                
                
                    
                
            </div>


        </>
    )
}
export default QRCodeModal;

// 
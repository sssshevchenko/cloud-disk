import React from 'react';
import UploadFile from './uploadFile/UploadFile';
import './uploader.css';
import { useDispatch, useSelector } from 'react-redux';
import { setIsVisible } from '../../store/reducers/uploaderSlice';

const Uploader = () => {

    const {isVisible, files} = useSelector(state => state.uploader)
    const dispatch = useDispatch()

    return ( isVisible &&
        <div className='uploader'>
            <div className="uploader__header">
                <div className='uploader__title'>Loadings</div>
                <button 
                    className='uploader__close' 
                    onClick={() => dispatch(setIsVisible(false))}
                >
                    X
                </button>
            </div>
            {files.map(file => 
                <UploadFile file={file} key={file.id} />    
            )}
        </div>
    );
};

export default Uploader;
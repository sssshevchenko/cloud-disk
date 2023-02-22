import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewDir } from '../../store/asyncThunk/filesThunk';
import { setPopUpDiplay } from '../../store/reducers/filesSlice';
import './popup.css';

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const {popUpDisplay, currentDir} = useSelector(state => state.files)

    const dispatch = useDispatch()

    const createDirHandler = () => {
        dispatch(createNewDir({dirId: currentDir, name: dirName}))
        dispatch(setPopUpDiplay('none'))
        setDirName('')
    }

    return (
        <div className='popup'
            style={{display: popUpDisplay}} 
            onClick={() => dispatch(setPopUpDiplay('none'))}
        >
            <div className="popup__content" onClick={e => e.stopPropagation()}>
                <div className="popup__header">
                    <div>Create Directory</div>
                    <button 
                        className="popup__btn" 
                        onClick={() => dispatch(setPopUpDiplay('none'))}
                    >
                        X
                    </button>
                </div>
                <input
                    value={dirName}
                    onChange={e => setDirName(e.target.value)}
                    type="text" 
                    placeholder='Write directory name...' 
                />
                <button onClick={createDirHandler}>Create</button>
            </div>
        </div>
    );
};

export default Popup;
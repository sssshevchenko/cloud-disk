import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileList from '../components/files/FileList';
import Popup from '../components/popup/Popup';
import Uploader from '../components/uploader/Uploader';
import { fetchFiles, uploadFile } from '../store/asyncThunk/filesThunk';
import { popFromDirStack, setCurrentDir, setPopUpDiplay, setView } from '../store/reducers/filesSlice';

const Disk = () => {
    const dispatch = useDispatch()
    const {currentDir, dirFromStack, dirStack} = useSelector(state => state.files)

    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')

    useEffect(() => {
        dispatch(fetchFiles({dirId: currentDir, sort}))
    }, [currentDir, sort])

    const openPopup = () => {
        dispatch(setPopUpDiplay('flex'))
    }

    const moveBackHandler = () => {
        dispatch(popFromDirStack())
        dispatch(setCurrentDir(dirFromStack))
    }

    const fileUploadHandler = (e) => {
        const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile({file, dirId: currentDir})))
    }

    const dragEnterHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }

    const dropHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()

        let files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile({file, dirId: currentDir})))

        setDragEnter(false)
    }

    return ( 
        !dragEnter ? 
            <div
                className='disk' 
                onDragEnter={dragEnterHandler} 
                onDragLeave={dragLeaveHandler} 
                onDragOver={dragEnterHandler}
            >
                <div className="disk__btns">
                    <button className='disk__back' disabled={dirStack.length === 0} onClick={moveBackHandler}>Back</button>
                    <button className='disk__create' onClick={openPopup}>Create Directory</button>
                    <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className='disk__upload-label'>Load Files</label>
                        <input 
                            multiple={true} 
                            onChange={e => fileUploadHandler(e)} 
                            type="file" 
                            id='disk__upload-input' 
                            className='disk__upload-input' 
                        />
                    </div>
                    <div style={{position: 'absolute', right: '150px'}}>
                        <button 
                            className='disk__plate'
                            onClick={() => dispatch(setView('plate'))}
                        />
                        <button 
                            className='disk__list'
                            onClick={() => dispatch(setView('list'))}
                        />
                    </div>
                </div>
                    <select value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="name">By name</option>
                        <option value="type">By type</option>
                        <option value="date">By date</option>
                    </select>
                <FileList />
                <Popup />
                <Uploader />
            </div>
        :
            <div
                className="drop-area" 
                onDragEnter={dragEnterHandler} 
                onDragLeave={dragLeaveHandler} 
                onDragOver={dragEnterHandler}
                onDrop={dropHandler}
            >
                Drag your files here
            </div>
    );
};

export default Disk;
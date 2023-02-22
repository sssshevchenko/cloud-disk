import React from 'react';
import './file.css';
import Dir from '../../../assets/img/dir.svg';
import FileLogo from '../../../assets/img/file.svg';
import { useDispatch, useSelector } from 'react-redux';
import { pushToDirStack, setCurrentDir } from '../../../store/reducers/filesSlice';
import { deleteFile, downloadFile } from '../../../store/asyncThunk/filesThunk';
import sizeFormat from '../../fileSize';

const File = ({file}) => {
    const dispatch = useDispatch()
    const {currentDir, view} = useSelector(state => state.files)

    const openDirHandler = () => {
        if(file.type === 'dir') {
            dispatch(pushToDirStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    const downloadHandler = (e) => {
        e.stopPropagation()
        dispatch(downloadFile(file))
    }

    const deleteFileHandler = (e) => {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    if(view === 'list') {
        return (
            <div className='file' onClick={openDirHandler}>
                <img src={file.type === 'dir' ? Dir : FileLogo} alt="" className='file__img' />
                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                {file.type !== 'dir' && <button className='file__btn file__download' onClick={downloadHandler}>download</button>}
                <button className='file__btn file__delete' onClick={deleteFileHandler}>delete</button>
            </div>
        );
    }

    if(view === 'plate') {
        return (
            <div className='file-plate' onClick={openDirHandler}>
                <img src={file.type === 'dir' ? Dir : FileLogo} alt="" className='file-plate__img' />
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' && <button className='file-plate__btn file-plate__download' onClick={downloadHandler}>download</button>}
                    <button className='file-plate__btn file-plate__delete' onClick={deleteFileHandler}>delete</button>
                </div>
            </div>
        );
    }

};

export default File;
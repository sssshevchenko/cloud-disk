import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import File from './file/File';
import './fileList.css';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const FileList = () => {
    const {files, view} = useSelector(state => state.files)
    const nodeRef = React.useRef(null)

    if(!files.length) {
        return (
            <div className="empty">
                <div className='empty__dir'>Directory is empty</div>
            </div>
        )
    }

    if(view === 'plate') {
        return (
            <div className='fileplate'>
                {files.map(file => 
                    <File key={file._id} file={file} />    
                )}
            </div>
        );
    }

    if(view === 'list') {
        return (
            <div className='filelist'>
                <div className="filelist__header">
                    <div className="filelist__name">NAME</div>
                    <div className="filelist__date">DATE</div>
                    <div className="filelist__size">SIZE</div>
                </div>
                <TransitionGroup>
                    {files.map(file => 
                        <CSSTransition
                            key={file._id}
                            timeout={500}
                            classNames='file'
                            nodeRef={nodeRef}
                        >
                            <div ref={nodeRef}>
                                <File file={file} />    
                            </div>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        );
    }
};

export default FileList;
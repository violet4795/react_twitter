import {dbService, storageService} from 'fbase'
import {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faPencilAlt} from '@fortawesome/free-solid-svg-icons'

const Tweet = ({tweetObj, isOwner}) => {
    const [tempTweet, setTempTweet] = useState(tweetObj.text)
    const [editFlag, setEditFlag] = useState(false)

    const onDeleteClick = async () => {
        const flag = window.confirm('삭제하시겠습니까?')
        if (flag) {
            await dbService.doc(`tweet/${tweetObj.id}`).delete()
            if (tweetObj.attachmentUrl !== '') {
                await storageService
                    .refFromURL(`${tweetObj.attachmentUrl}`)
                    .delete()
            }
        }
    }
    //asdfasdf
    const onEditClick = () => {
        setEditFlag(true)
        setTempTweet(tweetObj.text)
    }

    const onCancelClick = () => {
        setEditFlag(false)
        setTempTweet('')
    }

    /*  error Code
     *   onclick event function의 첫 인자로 무조건 event객체가 들어오는게 기본동작
     *   그래서 이렇게 하면 이벤트객체의 id를 가져오는데 undefined가 뜬다.
     *   실수 하지말자!
     */
    // const onOKClick = async (tweetObj) => {
    //     const flag = window.confirm('수정하시겠습니까?');
    //     if(flag) {
    //         await dbService.doc(`tweet/${tweetObj.id}`).update({text: tempTweet});
    //         setEditFlag(false);
    //     }
    // }

    const onOKClick = async () => {
        const flag = window.confirm('수정하시겠습니까?')
        if (flag) {
            await dbService
                .doc(`tweet/${tweetObj.id}`)
                .update({text: tempTweet})
            setEditFlag(false)
        }
    }
    const onChange = event => {
        // const value = event.target.value;
        const {
            target: {value},
        } = event
        setTempTweet(value)
    }

    return (
        <div className="nweet">
            {editFlag ? (
                <>
                    <div className="container nweetEdit">
                        <input
                            type="text"
                            value={tempTweet}
                            onChange={onChange}
                            placeholder="Edit your tweet"
                            autoFocus
                            className="formInput"
                        />
                        <button onClick={onOKClick} className="formBtn">
                            OK
                        </button>
                    </div>
                    <button
                        onClick={onCancelClick}
                        className="formBtn cancelBtn"
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.attachmentUrl && (
                        <img
                            src={tweetObj.attachmentUrl}
                            width="50px"
                            height="50px"
                        />
                    )}
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={onEditClick}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Tweet

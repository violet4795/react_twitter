import {v4 as uuidv4} from 'uuid'
import {storageService} from 'fbase'
import {useState} from 'react'
import {dbService} from 'fbase'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons'

const TweetFactory = ({userObj}) => {
    const [tweet, setTweet] = useState('')
    const [attachment, setAttachment] = useState('')

    const onClearAttachment = () => setAttachment('')

    const onChange = event => {
        event.preventDefault()
        const {
            target: {value},
        } = event
        setTweet(value)
    }

    const onFileChange = event => {
        const {
            target: {files},
        } = event
        const file = files[0]

        const reader = new FileReader()
        reader.onloadend = finishedEvent => {
            const {
                currentTarget: {result},
            } = finishedEvent
            setAttachment(result)
        }
        if (Boolean(file)) {
            reader.readAsDataURL(file)
        }
    }

    const onSubmit = async event => {
        event.preventDefault()
        if (tweet === '') {
            return
        }
        /* await dbService.collection('tweet').add({
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        })
        setTweet('') */
        let attachmentUrl = ''
        if (attachment !== '') {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`)
            const response = await attachmentRef.putString(
                attachment,
                'data_url',
            )
            attachmentUrl = await response.ref.getDownloadURL()
        }
        await dbService.collection('tweet').add({
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        })
        setTweet('')
        setAttachment('')
    }

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInpuut__input"
                    value={tweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input
                    type="submit"
                    value="&rarr;"
                    className="factoryInput__arrow"
                />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
                <FontAwesomeIcon icon="fa-thin fa-plus" />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{opacity: 0}}
            />
            {/* <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={onFileChange}
            />
            <input type="submit" value="Tweet" /> */}
            {attachment && (
                <div className="factoryInpuut__attachment">
                    <img
                        src={attachment}
                        style={{backgroundImage: attachment}}
                    />
                    <div
                        className="factoryInpuut__clear"
                        onClick={onClearAttachment}
                    >
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                        {/* <button onClick={onClearAttachment}>Clear</button> */}
                    </div>
                </div>
            )}
        </form>
    )
}

export default TweetFactory

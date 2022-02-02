import {v4 as uuidv4} from 'uuid'
import {storageService} from 'fbase'
import {useState} from 'react'
import {dbService} from 'fbase'

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
        reader.readAsDataURL(file)
    }

    const onSubmit = async event => {
        event.preventDefault()
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
        <form onSubmit={onSubmit}>
            <input
                value={tweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={onFileChange}
            />
            <input type="submit" value="Tweet" />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
        </form>
    )
}

export default TweetFactory

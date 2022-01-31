import {dbService, storageService} from 'fbase'
import {useEffect, useState} from 'react'
import Tweet from 'components/Tweet'
import {v4 as uuidv4} from 'uuid'

const Home = ({userObj}) => {
    console.log(userObj)
    const [tweet, setTweet] = useState('')
    const [tweets, setTweets] = useState([])
    const [attachment, setAttachment] = useState('')
    // const getTweets = async () => {
    //     const dbTweets = await dbService.collection("tweet").get();
    //     dbTweets.forEach(doc => {
    //         const tweetObject = { ...doc.data(), id: doc.id };
    //         //여기서  prev란? setState 에서 제공하는 이전 객체값.
    //         setTweets( prev =>  [ tweetObject, ...prev ])
    //     })
    // }

    useEffect(() => {
        dbService.collection('tweet').onSnapshot(snapshot => {
            const newArray = snapshot.docs.map(document => ({
                id: document.id,
                ...document.data(),
            }))
            setTweets(newArray)
        })
    }, [])

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

    const onClearAttachment = () => setAttachment('')

    return (
        <>
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
            <div>
                {tweets.map(tweet => (
                    <Tweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </>
    )
}

export default Home

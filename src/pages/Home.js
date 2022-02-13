import {dbService} from 'fbase'
import {useEffect, useState} from 'react'
import Tweet from 'components/Tweet'
import TweetFactory from 'components/TweetFactory'

const Home = ({userObj}) => {
    const [tweets, setTweets] = useState([])

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

    return (
        <div className="container">
            <TweetFactory userObj={userObj} />
            <div style={{marginTop: 30}}>
                {tweets.map(tweet => (
                    <Tweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home

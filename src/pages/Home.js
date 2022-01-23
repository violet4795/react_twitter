import { dbService } from "fbase";
import { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    console.log( userObj );
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

    const getTweets = async () => {
        const dbTweets = await dbService.collection("tweet").get();
        dbTweets.forEach(doc => {
            const tweetObject = { ...doc.data(), id: doc.id };
            //여기서  prev란? setState 에서 제공하는 이전 객체값.
            setTweets( prev =>  [ tweetObject, ...prev ])
        })
    }

    useEffect(() =>{
        getTweets()
    }, []);

    
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("tweet").add({
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        })
        setTweet("")
    }

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setTweet(value);
    };

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
                <input type="submit" value="Tweet" />
            </form>
            <div>
                { tweets.map(tweet => (
                    <div key={tweet.id}>
                        <h4>{tweet.text}</h4>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;
import { dbService } from "fbase";
import { useEffect, useState } from "react";

const Home = () => {
    const [tweet, setTweet] = useState("");

    const getTweets = async () => {
        const dbTweets = await dbService.collection("tweet").get();
        console.log(dbTweets)
        dbTweets.forEach(doc => console.log(doc.data()))
    }

    useEffect(() =>{
        getTweets()
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("tweet").add({
            text: tweet,
            createdAt: Date.now(),
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
    )
}

export default Home;
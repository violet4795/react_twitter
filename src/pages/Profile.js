import {authService, dbService} from 'fbase'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Tweet from 'components/Tweet'

/* 
// v5
const history = useHistory();

history.push('/home');
history.replace('/home');

// v6
const navigate = useNavigate();

navigate('/home');
navigate('/home', {replace: true});
*/

const Profile = ({userObj, refreshUser}) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const navigate = useNavigate()

    const onLogOutClick = async () => {
        await authService.signOut()
        refreshUser()
        navigate('/')
    }

    const onChange = event => {
        const {
            target: {value},
        } = event
        setNewDisplayName(value)
    }

    const onSubmit = async event => {
        event.preventDefault()
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({displayName: newDisplayName})
            refreshUser()
        }
    }
    // const [tweets, setTweets] = useState([])

    // useEffect(() => {
    //     getMyTweets()
    // }, [])

    // const getMyTweets = async () => {
    //     const tweets = await dbService
    //         .collection('tweet')
    //         .where('creatorId', '==', userObj.uid)
    //         .orderBy('createdAt', 'asc')

    //     tweets.onSnapshot(snapshot => {
    //         const newArray = snapshot.docs.map(document => ({
    //             id: document.id,
    //             ...document.data(),
    //         }))
    //         setTweets(newArray)
    //     })
    // }

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    type="text"
                    onChange={onChange}
                    placeholder="Display name"
                    value={newDisplayName}
                    autoFocus
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{marginTop: 10}}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
            {/* <div>
                {tweets.map(tweet => (
                    <Tweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creatorId === userObj.uid}
                    />
                ))}
            </div> */}
        </div>
    )
}

export default Profile

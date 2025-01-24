function Photo({ photoId }) {

    const imageLink = `http://localhost:3000/roll-call-administration/roll-call/photo/${photoId}`
    return (
        <>
            <img src= {imageLink}></img>
        </>
    );
}

export default Photo
import ImageAuth from "image-auth";

function Photo({ photoId }) {

    const imageLink = `${process.env.REACT_APP_BE_URL}/roll-call-administration/roll-call/photo/${photoId}`
    return (
        <>
            <div className="mx-auto center text-center">
                <ImageAuth mode="Auth" url={imageLink} config={{headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}}}></ImageAuth>
            </div>
        </>
    );
}

export default Photo
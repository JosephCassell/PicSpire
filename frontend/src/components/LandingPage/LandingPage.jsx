import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import momentsImage from '../../../public/Moments.jpg';
import friendsImage from '../../../public/Friends.jpg';
import newPeople from '../../../public/meetPeople.jpg';
import selfieImage from '../../../public/selfie.jpg'
import fishingImage from '../../../public/fishing.jpg'
import communityImage from '../../../public/community.jpg'
import yoloImage from '../../../public/yolo.jpg'
const LandingPage = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleScroll = (e) => {
        e.preventDefault();
        const container = containerRef.current;
        const scrollAmount = e.deltaY < 0 ? -container.clientHeight : container.clientHeight;
        container.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('wheel', handleScroll, { passive: false });
        return () => {
            container.removeEventListener('wheel', handleScroll);
        };
    }, []);
    
    const scrollToNextItem = () => {
        const container = containerRef.current;
        const scrollHeight = container.clientHeight;
        container.scrollBy({
            top: scrollHeight,
            behavior: 'smooth'
        });
    };
    
    return (
        <div className="landing-page">
            <section className='item-containers' ref={containerRef} onWheel={handleScroll}>
                <ul>
                    <li>
                        <div className='list-item-container-1'>
                            <h1>Welcome to PicSpire</h1>
                            <p>Inspire with your pics!</p>
                            <div className='image-grid'>
                                <img src={selfieImage} alt="Moments" />
                                <img src={yoloImage} alt="Moments" />
                                <img src={communityImage} alt="Moments" />
                                <img src={fishingImage} alt="Moments" />
                            </div>
                            <button onClick= {scrollToNextItem} className='Sign-up-sign'>
                                <h2 >SIGN UP TO... </h2>
                                <p className="unicode-style">{'\u02EF'} </p>
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className="list-item-container-2">
                            <img src={momentsImage} alt="Moments" />
                            <div className='item-container-img-text-2'>
                                <h2>Share your moments!</h2>
                                <p>Capture and share your special moments with friends and family.</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="list-item-container-3">
                            <img src={friendsImage} alt="Friends" />
                            <div className='item-container-img-text-3'>
                                <h2>See photos from your friends!</h2>
                                <p>Stay connected and enjoy the memories together.</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="list-item-container-4">
                            <img src={newPeople} alt="Meet New People" />
                            <div className='item-container-img-text-4'>
                                <h2>Meet new people!</h2>
                                <p>Expand your network and make new friends.</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='list-item-container-5'>
                            <h2>Join PicSpire</h2>
                            <p>Sign up today and start your journey!</p>
                            <button className="landing-page-sign-up-button"onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default LandingPage;

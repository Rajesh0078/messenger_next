"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Swiper = ({ card, currentUser }) => {
    // console.log(card)
    // const [cards, setCards] = useState([
    //     { id: 1, imageUrl: 'https://placeimg.com/600/300/people', title: 'Demo card 1', description: 'This is a demo for Tinder like swipe cards' },
    //     { id: 2, imageUrl: 'https://placeimg.com/600/300/animals', title: 'Demo card 2', description: 'This is a demo for Tinder like swipe cards' },
    //     { id: 3, imageUrl: 'https://placeimg.com/600/300/nature', title: 'Demo card 3', description: 'This is a demo for Tinder like swipe cards' },
    //     { id: 4, imageUrl: 'https://placeimg.com/600/300/tech', title: 'Demo card 4', description: 'This is a demo for Tinder like swipe cards' },
    //     { id: 5, imageUrl: 'https://placeimg.com/600/300/arch', title: 'Demo card 5', description: 'This is a demo for Tinder like swipe cards' }
    // ]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const Hammer = require('hammerjs');

            const tinderContainer = document.querySelector('.tinder');
            const allCards = document.querySelectorAll('.tinder--card');

            function initCards() {
                const newCards = document.querySelectorAll('.tinder--card:not(.removed)');

                newCards.forEach((card, index) => {
                    card.style.zIndex = allCards.length - index;
                    card.style.transform = `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
                    card.style.opacity = (10 - index) / 10;
                });

                tinderContainer.classList.add('loaded');
            }

            initCards();

            allCards.forEach(el => {
                const hammertime = new Hammer(el);

                hammertime.on('pan', event => {
                    el.classList.add('moving');
                });

                hammertime.on('pan', event => {
                    if (event.deltaX === 0) return;
                    if (event.center.x === 0 && event.center.y === 0) return;

                    const xMulti = event.deltaX * 0.03;
                    const yMulti = event.deltaY / 80;
                    const rotate = xMulti * yMulti;

                    event.target.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
                });

                hammertime.on('panend', event => {
                    el.classList.remove('moving');

                    const moveOutWidth = document.body.clientWidth;
                    const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

                    if (keep) {
                        el.style.transform = '';
                    } else {
                        el.classList.add('removed');

                        if (event.deltaX > 0) {
                            toast.success("Swiped right")
                            el.style.transform = `translate(${moveOutWidth * 2}px, -100px) rotate(-30deg)`;
                        } else {
                            toast.warn("Swiped Left")
                            el.style.transform = `translate(-${moveOutWidth * 2}px, -100px) rotate(30deg)`;
                        }

                        initCards();
                    }
                });
            });
        }
    }, []);

    return (

        <div className="tinder w-full !flex h-full items-center justify-center  relative overflow-hidden flex-col opacity-0 transition-opacity duration-[.1s] ease-in-out">
            <div className="tinder--cards items-center h-[80vh]  md:h-full md:w-full flex justify-center ">
                {
                    card.filter((i) => i.email !== currentUser?.email).map((i, inx) => {
                        return (
                            <div key={inx} className="tinder--card bg-gray-300 ease-linear duration-100 transition-transform shadow-xl h-full !w-full md:max-h-[40rem] rounded-xl relative">
                                <Link href={{ pathname: '/user/' + i._id, }}>
                                    <img src={i.imgUrl} alt="imhha" className="h-full w-full rounded-xl object-cover object-center opacity-[100%] mx-auto" />
                                </Link>
                                <div className="bg-gray-700  rounded-b-xl absolute bottom-0 text-center text-white w-full text-lg">
                                    <p className="font-semibold py-4">{i.username}</p>
                                    {/* <p>{i.email}</p> */}
                                </div>
                                <div className={`${i.online === "online" ? "block" : "hidden"} bg-blue-600 h-4 w-4 absolute left-2 rounded-full top-2 `}>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    );
};

export default Swiper;

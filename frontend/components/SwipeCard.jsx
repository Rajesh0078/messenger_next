"use client"
import React, { useRef, useEffect } from 'react';
// import Hammer from 'hammerjs';
import Image from 'next/image';

const SwipeCard = ({ character, onSwipe, i }) => {
  const cardRef = useRef(null);
  useEffect(() => {
    if (cardRef.current) {
      const Hammer = require("hammerjs")
      const hammer = new Hammer(cardRef.current);
      cardRef.current.style.transform = ''
      hammer.on('pan', (event) => {
        cardRef.current.classList.add('moving');
      });

      hammer.on('pan', (event) => {
        if (event.deltaX === 0) return;
        if (event.center.x === 0 && event.center.y === 0) return;

        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;

        // event.target.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
        cardRef.current.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
        // cardRef.current.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px)`;
      });

      cardRef.current.addEventListener("touchend", (event) => {
        if (event) {
          if (cardRef.current) {
            cardRef.current.style.transform = ''
          }
        }
      })

      hammer.on('panend', (event) => {
        // const threshold = 150;
        // if (event.distance > threshold) {
        //   const direction = event.deltaX > 0 ? 'right' : 'left';
        //   onSwipe(character, direction, i);
        // }

        // cardRef.current.style.transform = '';
        cardRef.current.classList.remove('moving');

        const moveOutWidth = document.body.clientWidth;
        const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        // event.target.classList.toggle('removed', !keep);

        if (keep) {
          cardRef.current.style.transform = ''
          event.target.style.transform = '';
        } else {
          // const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
          // const toX = event.deltaX > 0 ? endX : -endX;
          // const endY = Math.abs(event.velocityY) * moveOutWidth;
          // const toY = event.deltaY > 0 ? endY : -endY;
          // const xMulti = event.deltaX * 0.03;
          // const yMulti = event.deltaY / 80;
          // const rotate = xMulti * yMulti;

          // cardRef.current.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${rotate}deg)`
          cardRef.current.style.transform = `translate(${moveOutWidth * 2}px, -100px) rotate(-30deg)`
          // if(toX > 0) {
          // const direction = toX > 0 ? 'right' : 'left';
          const direction = event.deltaX > 0 ? 'right' : 'left';

          onSwipe(character, direction, i);
          // }
        }
      });

      return () => {
        hammer.destroy();
        if (cardRef.current) {
          cardRef.current.removeEventListener("touchend", (event) => {
            if (event) {
              if (cardRef.current) {
                cardRef.current.style.transform = ''
              }
            }
          })
        }
      };
    }
  }, [onSwipe, cardRef.current]);

  return (
    <>
      <div ref={cardRef} className={'character-card absolute bg-white ease-linear duration-100 transition-transform shadow-xl md:max-h-[40rem] rounded-xl select-none h-[70vh] w-[90vw] max-w-[400px] overflow-hidden'}>
        {/* <div className="group w-full h-full"> */}
        {/* <div className="relative group w-full h-full"> */}
        <Image src={character.imgUrl} alt={character.username} width={1000} height={1000} className='border h-full w-full rounded-xl object-cover object-center pointer-events-none' priority />
        {/* <div className="absolute inset-0 w-full h-full"></div> */}
        {/* </div> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default SwipeCard;
"use client"
import React, { useRef, useEffect } from 'react';
// import Hammer from 'hammerjs';
import Image from 'next/image';

const SwipeCard = ({ character, onSwipe, i, characters }) => {
  const cardRef = useRef(null);
  useEffect(() => {
    if (cardRef.current) {
      const Hammer = require("hammerjs")
      const hammer = new Hammer(cardRef.current);
      // cardRef.current.style.transform = '';
      // cardRef.current.style.zIndex = characters.length - i;
      // cardRef.current.style.transform = `scale(${(20 - i) / 20}) translateY(-${30 * i}px)`;
      // cardRef.current.style.opacity = (10 - i) / 10;
      cardRef.current.style.zIndex = i;
      cardRef.current.style.transform = `scale(${(20 - (characters.length - i - 1)) / 20}) translateY(-${30 * (characters.length - i - 1)}px)`;
      cardRef.current.style.opacity = ((i + 1) / (characters.length));

      if (i === (characters.length - 1)) {
        hammer.on('pan', (event) => {
          cardRef.current.classList.add('moving');
        });

        hammer.on('pan', (event) => {
          if (event.deltaX === 0) return;
          if (event.center.x === 0 && event.center.y === 0) return;

          const xMulti = event.deltaX * 0.03;
          const yMulti = event.deltaY / 80;
          const rotate = xMulti * yMulti;

          cardRef.current.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
        });

        cardRef.current.addEventListener("touchend", (event) => {
          if (event) {
            if (cardRef.current) {
              cardRef.current.style.transform = ''
            }
          }
        })

        hammer.on('panend', (event) => {
          cardRef.current.classList.remove('moving');

          const moveOutWidth = document.body.clientWidth;
          const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

          if (keep) {
            cardRef.current.style.transform = ''
            event.target.style.transform = '';
          } else {
            cardRef.current.style.transform = `translate(${moveOutWidth * 2}px, -100px) rotate(-30deg)`
            const direction = event.deltaX > 0 ? 'right' : 'left';
            console.log(i)
            onSwipe(character, direction, i);
          }
        });
      }

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
      <div ref={cardRef} className={`character-card absolute bg-white ease-linear duration-100 transition-transform rounded-xl select-none overflow-hidden ${i === (characters.length - 1) ? "cursor-grab" : ""}`}>
        {/* <div className="group w-full h-full"> */}
        <div className="relative group w-full h-full">
          <Image src={character.imgUrl} alt={character.username} width={1000} height={1000} className='h-full w-full rounded-xl object-cover object-center pointer-events-none' priority />
          <div className="absolute inset-0 w-full h-full flex flex-col justify-end items-center pointer-events-none">
            <div className='bg-gray-500 text-white text-center text-lg font-semibold capitalize py-2 w-full'>{character.username}</div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default SwipeCard;
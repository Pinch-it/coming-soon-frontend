import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, Draggable } from 'gsap/all';


const Gallery = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable);
    let iteration = 0;
    gsap.set('.cards li', { xPercent: 400, opacity: 0, scale: 0 });

    const spacing = 0.1;
    const snapTime = gsap.utils.snap(spacing);
    const cards = gsap.utils.toArray('.cards li');

    const animateFunc = (element) => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 0,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: 'power1.in',
          immediateRender: false,
        }
      ).fromTo(
        element,
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: 'none', immediateRender: false },
        0
      );
      return tl;
    };

    const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);

    const playhead = { offset: 0 };
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
    const scrub = gsap.to(playhead, {
      offset: 0,
      onUpdate() {
        seamlessLoop.time(wrapTime(playhead.offset));
      },
      duration: .5,
      ease: 'power3',
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      start: 0,
      onUpdate(self) {
        let scroll = self.scroll();
        if (scroll > self.end - 1) {
          wrap(1, 2);
        } else if (scroll < 1 && self.direction < 0) {
          wrap(-1, self.end - 2);
        } else {
          scrub.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
          scrub.invalidate().restart();
        }
      },
      end: () => `+=${document.querySelector('.gallery').offsetHeight}`, // Update end value dynamically
      pin: '.gallery',
    });
    

    const progressToScroll = (progress) =>
      gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end);

    const wrap = (iterationDelta, scrollTo) => {
      iteration += iterationDelta;
      trigger.scroll(scrollTo);
      trigger.update();
    };

    ScrollTrigger.addEventListener('scrollEnd', () => scrollToOffset(scrub.vars.offset));

    function scrollToOffset(offset) {
      let snappedTime = snapTime(offset);
      let progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
      let scroll = progressToScroll(progress);
      if (progress >= 1 || progress < 0) {
        return wrap(Math.floor(progress), scroll);
      }
      trigger.scroll(scroll);
    }

    function buildSeamlessLoop(items, spacing, animateFunc) {
      let rawSequence = gsap.timeline({ paused: true });
      let seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
        onReverseComplete() {
          this.totalTime(this.rawTime() + this.duration() * 100);
        },
      });

      const cycleDuration = spacing * items.length;
      let dur;

      items.concat(items)
        .concat(items)
        .forEach((item, i) => {
          let anim = animateFunc(items[i % items.length]);
          rawSequence.add(anim, i * spacing);
          dur || (dur = anim.duration());
        });

      seamlessLoop.fromTo(rawSequence, { time: cycleDuration + dur /2 }, {
        time: '+=' + cycleDuration,
        duration: cycleDuration,
        ease: 'none',
      });

      return seamlessLoop;
    }

    Draggable.create('.drag-proxy', {
      type: 'x',
      trigger: '.cards',
      onPress() {
        this.startOffset = scrub.vars.offset;
      },
      onDrag() {
        scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
        scrub.invalidate().restart();
      },
      onDragEnd() {
        scrollToOffset(scrub.vars.offset);
      },
    });
  }, []);

  return (
    <div className="z-10 ">
      <div className="gallery">
        <ul className="cards">
        <li><img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-zKGw4YHuv8AN3G-I4OQSNzkLW2EarWfXODNtL7TM2YxI8_U2NAKjnK2mJF2EEqfwrud57eh8FfzHeXQMm8Ak0tWlGw4Q=s1600" alt="Gaming"/></li>
          <li><img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-xjEzdMtG_4MNF70GrTFOAv9DbeRDGk4YqY2Tzy7zfwTPu55mv1n-2JQ9dVkucEXIK9-wehxl-ZV53Zp-0YBKz4_Bsx=s1600" alt="Blockchain"/></li>
          <li><img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-xcqn6lji5dghhoJNMiA5WgSDNJ-bfDfw8pdSk-_O34GUr71xizV8dGx6eEs7D1RfAen_le4O2KS0nVeEi2z0Jc3Y9pSQ=s1600" alt="cloud"/></li>
          <li><img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-wqHfzdfywGoWlmf8T-Qfcx9YfOIw3ekXGD8KlVu3Y-GN27AqG0QNB-YrmgKG-rCinkkMM1xMA89ECT47YwJ0PvgQXNFQ=s1600" alt="AI"/></li>
          <li><img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-wPFJPiCgzNfVgT9mmehAI2qLGTY65ERzoleXx-OWnvKkkfvhr7koTnf01Zzk_EqKM70PF1kAmu1jb3CfDn4p9pC54Vtw=s1600" alt="ARVR"/></li>
          <li><img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-ylFHQJD6OENsIeGNHKghYrLFZ_263RubRDBmrBj2ZL443ubGvpAgP94BG2CVplHvBevCcWtdMKPvjp4Xs1al-L0fsT3Q=s1600" alt="DataScience"/></li>
          <li><img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-xV9POJoOJQFCix1qUhOTAaaUAmh0SegD6pyd9_okvENRHU8EWwFpTCk_IfFoBHqdpJ7E7QsSNGIW9fnUuKcKusyfZQkg=s1600" alt="WebDev"/></li>
          <li><img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-w6SqeFmFjUM1MI1tcyuZef66-OOpMcHv-5K1o-D-AIFYMRXU7-98UrkAAtA0A4eneMNSmNx1u6J9NVKvF85A=s1600" alt="AppDev"/></li>
          <li><img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-xjxGNntlcKGHDE2owrOgk3RWrHWuB5_4QbJecvp02X_omP4stg97SO_TwBA8gE4cI1wzXnk_EHmdKibg7aHZ8yGxkz=s1600" alt="CyberSecurity"/></li>
        </ul>
      </div>
      <div className="drag-proxy"></div>
    </div>
  );
};

export default Gallery;

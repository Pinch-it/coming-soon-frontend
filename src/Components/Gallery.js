import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, Draggable } from 'gsap/all';
import gaming from '../images/Blue Dynamic Gaming Phone Wallpaper.png'
import blockchain from "../images/blockchain.jpg"
import cloud from "../images/Cloud Computing.png"
import AI from "../images/AI.jpg"
import ARVR from "../images/ARVR.jpg"
import WebDev from "../images/WebDev.jpg"
import CyberSecurity from "../images/CyberSecurity.jpg"
import DataScience from"../images/DataScience.jpg"
import AppDev from "../images/AppDev.jpg"


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
        <li><img src={gaming} alt="Gaming"/></li>
          <li><img src={blockchain} alt="Blockchain"/></li>
          <li><img src={cloud} alt="cloud"/></li>
          <li><img src={AI} alt="AI"/></li>
          <li><img src={ARVR} alt="ARVR"/></li>
          <li><img src={DataScience} alt="DataScience"/></li>
          <li><img src={WebDev} alt="WebDev"/></li>
          <li><img src={AppDev} alt="AppDev"/></li>
          <li><img src={CyberSecurity} alt="CyberSecurity"/></li>
        </ul>
      </div>
      <div className="drag-proxy"></div>
    </div>
  );
};

export default Gallery;

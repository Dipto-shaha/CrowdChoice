import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const reviews = [
    {
      name: "Alice Johnson",
      testimonial:
        "I absolutely love using CrowdChoice for quick and engaging polls. It's user-friendly and provides valuable insights!",
      rating: 5.0,
      img: "https://i.ibb.co/wcdkWMC/member1.png",
    },
    {
      name: "Bob Anderson",
      testimonial:
        "CrowdChoice has made it easy for me to voice my opinions on various topics. The platform is intuitive, and the polls cover diverse subjects.",
      rating: 4.0,
      img: "https://i.ibb.co/cTCKZ2c/member2.png",
    },
    {
      name: "Eva Martinez",
      testimonial:
        "Being a part of CrowdChoice is a fantastic experience. The polls are interesting, and the community engagement is top-notch.",
      rating: 4.5,
      img: "https://i.ibb.co/R3qDpdP/member3.png",
    },
    {
      name: "Chris Williams",
      testimonial:
        "CrowdChoice is my go-to for staying informed and sharing my thoughts. The platform is well-designed, and the polls are always relevant.",
      rating: 3.9,
      img: "https://i.ibb.co/LQQY1GL/member4.png",
    },
  ];
  return (
    <div className="mt-20">
      <p className="text-center font-semibold text-xl">Testimonial</p>
      <p className="text-center font-bold text-3xl my-5">Voices of the Crowd: What Our Users Say</p>
      <section className="mx-auto lg:w-1/2">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review.name}>
              <div className="flex flex-col items-center mx-24 my-16">
                <img src={review.img}></img>
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review.rating}
                  readOnly
                />
                <p className="py-8">{review.testimonial}</p>
                <p className="text-xl lg:text-3xl text-center font-bold text-[#ff715b]">{review.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Testimonials;

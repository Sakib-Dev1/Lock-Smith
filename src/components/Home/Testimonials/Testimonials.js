import AllTestimonials from './AllTestimonials';
import TestimonialHeader from './TestimonialHeader';

const Testimonials = () => {
  return (
    <div
      style={{
        backgroundColor: '#462b34',
        marginTop: '3rem',
      }}
    >
      <TestimonialHeader />
      <AllTestimonials />
    </div>
  );
};

export default Testimonials;

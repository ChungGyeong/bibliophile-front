// import { useRef } from "react";
//
// const useIntersectionObserver = (callback: any) => {
//   const observer = useRef(
//     new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           callback();
//         }
//       });
//     })
//   );
//
//   const observe = (element: any) => {
//     observer.current.observe(element);
//     console.log(element);
//   };
//
//   const unobserve = (element: any) => {
//     observer.current.unobserve(element);
//   };
//
//   const disconnect = () => {
//     observer.current.disconnect();
//   };
//
//   return [observe, unobserve, disconnect];
// };
//
// export default useIntersectionObserver;

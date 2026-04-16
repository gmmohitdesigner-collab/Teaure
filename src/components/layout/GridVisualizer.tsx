// "use client";

// import { useState, useEffect } from "react";

// export default function GridVisualizer() {
//   const [show, setShow] = useState(false);

//   // Toggle with 'G' key as well
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.ctrlKey && e.key === "g") {
//         setShow((prev) => !prev);
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   return (
//     <>
//       {/* Floating Toggle Button */}
//       <button
//         onClick={() => setShow(!show)}
//         className="fixed bottom-6 right-6 z-[9999] bg-foreground text-background px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
//       >
//         {show ? "Hide Grid" : "Show Grid"}
//       </button>

//       {/* Grid Overlay */}
//       {show && (
//         <div className="fixed inset-0 z-[9998] pointer-events-none flex justify-center">
//           <div 
//             className="h-full w-[1312px] grid grid-cols-12 gap-[32px] opacity-[0.08]"
//           >
//             {[...Array(12)].map((_, i) => (
//               <div 
//                 key={i} 
//                 className="bg-red-500 h-full w-[80px]"
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

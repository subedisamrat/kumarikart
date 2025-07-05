// import { Outlet } from "react-router-dom";

// function AuthLayout() {
//   return (
//     <div className="flex min-h-screen w-full">
//       <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
//         <div className="max-w-md space-y-6 text-center text-primary-foreground">
//           <h1 className="text-4xl font-extrabold tracking-tight">
//             "KumariKart- Redefining E-Commerce with Culture & Technology"
//           </h1>
//         </div>
//       </div>
//       <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default AuthLayout;

// import { Outlet } from "react-router-dom";
// import KumariKartLogo from "@/assets/banners/KumariKart logo.webp";

// function AuthLayout() {
//   return (
//     <div className="flex min-h-screen w-full bg-[#faf6f2]">
//       {/* Left Panel - Branding (Desktop) */}
//       <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-[#f3e8ff] to-[#fef3c7] w-1/2 p-12 relative">
//         {/* Soft floral pattern (subtle) */}
//         <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyMTYsMTgwLDI1NCwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>

//         {/* Logo Container */}
//         <div className="relative z-10 flex flex-col items-center space-y-8 text-center">
//           <div className="p-3 bg-white rounded-2xl shadow-sm border border-[#f0e6ff]">
//             <div className="p-6 bg-gradient-to-br from-[#fdf2ff] to-[#fff9e6] rounded-lg flex justify-center">
//               <img
//                 src={KumariKartLogo}
//                 alt="KumariKart"
//                 className="h-48 w-auto object-contain"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <h1 className="text-4xl font-serif font-bold text-[#5b4b8a]">
//               Kumari<span className="text-[#d4a017]">Kart</span>
//             </h1>
//             <p className="text-lg text-[#7c6a9a] font-medium">
//               Timeless products, modern convenience
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right Panel - Auth Forms */}
//       <div className="flex flex-1 items-center justify-center p-6">
//         <div className="w-full max-w-md bg-white rounded-2xl shadow-sm overflow-hidden border border-[#f0e6ff]">
//           {/* Mobile Header */}
//           <div className="lg:hidden py-10 px-6 bg-gradient-to-r from-[#f3e8ff] to-[#fef3c7] relative">
//             <div className="flex justify-center">
//               <div className="p-2 bg-white/80 rounded-xl backdrop-blur-xs border border-white">
//                 <div className="p-5 bg-gradient-to-br from-[#fdf2ff] to-[#fff9e6] rounded-lg">
//                   <img
//                     src={KumariKartLogo}
//                     alt="KumariKart"
//                     className="h-36 w-auto object-contain mx-auto"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Auth Content */}
//           <div className="p-8 sm:p-10">
//             <Outlet />
//           </div>

//           {/* Footer */}
//           <div className="px-8 py-4 bg-[#faf6f2] text-center text-sm text-[#7c6a9a] border-t border-[#f0e6ff]">
//             © {new Date().getFullYear()} KumariKart • Crafted with care
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuthLayout;

import { Outlet } from "react-router-dom";
import KumariKartLogo from "@/assets/banners/KumariKart logo.webp";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-[#fff9f2]">
      {/* Left Panel - Branding (Desktop) */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-[#d4a017]/20 to-[#b91c1c]/20 w-1/2 p-12 relative overflow-hidden">
        {/* Decorative shimmer */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMiIgZmlsbD0icmdiYSgyMTIsMTc1LDU1LDAuMDcpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI3ApIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-30"></div>

        {/* Logo Container */}
        <div className="relative z-10 flex flex-col items-center space-y-8 text-center">
          <div className="p-1 bg-gradient-to-br from-[#d4a017] to-[#b91c1c] rounded-2xl shadow-lg animate-shimmer">
            <div className="p-6 bg-white rounded-xl flex justify-center backdrop-blur-xs">
              <img
                src={KumariKartLogo}
                alt="KumariKart"
                className="h-52 w-auto object-contain"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-[#b91c1c]">
              <span className="bg-gradient-to-r from-[#d4a017] to-[#b91c1c] bg-clip-text text-transparent">
                KumariKart
              </span>
            </h1>
            <p className="text-xl text-[#78350f] font-medium">
              Luxury meets tradition
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md overflow-hidden border border-[#fecaca]">
          {/* Mobile Header */}
          <div className="lg:hidden py-10 px-6 bg-gradient-to-r from-[#fef3c7] to-[#fee2e2] relative">
            <div className="flex justify-center">
              <div className="p-1 bg-gradient-to-br from-[#d4a017] to-[#b91c1c] rounded-xl animate-pulse">
                <div className="p-5 bg-white rounded-lg flex justify-center">
                  <img
                    src={KumariKartLogo}
                    alt="KumariKart"
                    className="h-40 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Auth Content */}
          <div className="p-8 sm:p-10">
            <Outlet />
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-[#fff9f2] text-center text-sm text-[#78350f] border-t border-[#fecaca]">
            © {new Date().getFullYear()} KumariKart • Heritage Reimagined
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

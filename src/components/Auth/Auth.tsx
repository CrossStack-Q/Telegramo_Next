// import React from "react";
import Head from "next/head";
import Image from "next/image";
import bgi from "../../../public/bgi.png";
import apple from "../../../public/apple.png";
import playstore from "../../../public/play-store.png";
import Tilt from "react-parallax-tilt";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Text, Input, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import UserOperations from "../../graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "../../util/types";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({
  session,
  reloadSession,
}) => {
  const [username, setUsername] = useState("");

  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutation.createUsername);

  const onSubmit = async () => {
    if (!username) return;
    try {
      const { data } = await createUsername({
        variables: { username },
      });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        return;
      }

      reloadSession();
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };

  return (
    <div>
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-4 bg-white">
          <div className=" bg-white bg-opacity-40 relative z-2 items-center gap-4 flex flex-col justify-center p-8 rounded-2xl shadow-2xl border border-r-0 border-b-0 border-opacity-30 backdrop-filter backdrop-blur-sm">
            <p className="text-2xl text-blue-600 font-semibold">
              Create a Username
            </p>
            <input
              className="max-w-[200px] border-t-2 border-r-2 placeholder:text-opacity-60 w-full -mt-2 p-2 bg-transparent placeholder:text-gray-600 placeholder:text-lg focus:outline-none text-xl text-gray-700"
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              // className="max-w-[200px] w-full pt-1 pr-2 pl-2 pb-1 rounded-lg  font-semibold text-xl"
              onClick={onSubmit}
              isLoading={loading}
              backgroundColor="blue.400"
              color="white"
              className="max-w-[200px] w-full"
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <main className="bg-purple-400 bg-opacity-20 h-screen relative overflow-hidden flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center w-[98vw] h-[98vh] bg-white bg-opacity-10 relative z-2 rounded-2xl shadow-5xl border border-r-0 border-b-0 border-opacity-30 backdrop-filter backdrop-blur-sm">
            <header className="absolute w-full flex justify-center top-0 items-center">
              <div className="w-[80vw] gap-8 p-8 flex items-center">
                <div className="sm:hidden flex">
                  <p className="text-lg font-semibold">Menu</p>
                </div>
                <div className="w-[40vw] hidden justify-around sm:flex">
                  <p className="text-lg font-semibold tracking-wide text-purple-500 border-b-2 rounded-sm mb-[8px] border-purple-500 hover:cursor-pointer">
                    Home
                  </p>
                  <p className="text-lg font-semibold text-gray-700 hover:tracking-wide hover:text-purple-500 hover:border-b-2 hover:rounded-sm hover:mb-[8px] hover:border-purple-500 hover:cursor-pointer">
                    About
                  </p>
                  <p className="text-lg font-semibold text-gray-700 hover:tracking-wide hover:text-purple-500 hover:border-b-2 hover:rounded-sm hover:mb-[8px] hover:border-purple-500 hover:cursor-pointer">
                    {"< 1 week"}
                  </p>
                  <p className="text-lg font-semibold text-gray-700 hover:tracking-wide hover:text-purple-500 hover:border-b-2 hover:rounded-sm hover:mb-[8px] hover:border-purple-500 hover:cursor-pointer">
                    Help
                  </p>
                </div>
                <div className="flex justify-around flex-grow items-center">
                  <p className="font-semibold text-lg tracking-wide text-purple-500 hover:cursor-pointer">
                    Sign in
                  </p>
                  <p className="bg-white p-2 pl-4 pr-4 hover:cursor-pointer hover:bg-purple-200 hover:text-purple-500 text-center font-semibold text-gray-700 rounded-full bg-opacity-40 backdrop-blur-sm backdrop-filter shadow-sm">
                    Register
                  </p>
                </div>
              </div>
            </header>
            <div className="flex sm:justify-evenly m-4 sm:flex-row flex-col sm:gap-0">
              <div className="">
                <div className="sm:text-7xl text-center sm:text-start text-4xl font-semibold text-purple-500 tracking-wide">
                  Welcome to our <br /> community
                </div>
                <div className="text-xl text-center sm:text-start m-2 text-gray-700">
                  A whole new productive journey <br /> start right here
                </div>
                <div className="relative hidden sm:flex">
                  <Image src={bgi} className="absolute w-96 h-96" alt="" />
                </div>
              </div>
              <Tilt>
                <div className="glasso bg-purple-400 p-4 bg-opacity-10 rounded-sm backdrop-filter backdrop-blur-sm shadow-ERxl">
                  <div className="flex flex-col sm:w-[30vw] sm:max-w-[400px] justify-center">
                    <input
                      type="text"
                      placeholder="Enter your email address"
                      className="bg-white h-[50px] m-2 bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-xl text-xl p-2 focus:outline-none text-white rounded-sm placeholder:font-normal placeholder:text-base placeholder:text-gray-500"
                    />
                    <input
                      type="text"
                      placeholder="Password"
                      className="bg-white h-[50px] m-2 bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-xl text-xl p-2 focus:outline-none text-white rounded-sm placeholder:font-normal placeholder:text-base placeholder:text-gray-500"
                    />
                    <div className="flex justify-between text-sm sm:text-base">
                      <p className="p-2 text-gray-600">Remember Me</p>
                      <p className="p-2 text-gray-600">Password</p>
                    </div>
                    <button className="bg-purple-400 h-16 pt-2 pb-2 pl-4 pr-4 font-bold text-white text-2xl tracking-wider rounded-sm m-2 shadow-lg bg-opacity-90 backdrop-filter backdrop-blur-sm border-white">
                      Sign In
                    </button>
                    <div className="flex items-center">
                      <p className="border-b mt-1 mr-1 ml-1 flex-grow border-gray-400"></p>
                      <p className="text-gray-700">or continue with</p>
                      <p className="border-b mt-1 mr-1 ml-1 flex-grow border-gray-400"></p>
                    </div>
                    <div className="flex flex-row sm:flex-col overflow-hidden">
                      <div
                        onClick={() => signIn("google")}
                        className="bg-white bg-opacity-40 p-2 m-2 rounded-sm backdrop-filter backdrop-blur-lg shadow-2xl"
                      >
                        <div className="flex justify-center hover:cursor-pointer">
                          <p className="text-[#4285F4] font-bold tracking-wide text-lg">
                            G
                          </p>
                          <p className="text-[#EA4335] font-bold tracking-wide text-lg">
                            O
                          </p>
                          <p className="text-[#FBBC05] font-bold tracking-wide text-lg">
                            O
                          </p>
                          <p className="text-[#4285F4] font-bold tracking-wide text-lg">
                            G
                          </p>
                          <p className="text-[#34A853] font-bold tracking-wide text-lg">
                            L
                          </p>
                          <p className="text-[#EA4335] font-bold tracking-wide text-lg">
                            E
                          </p>
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-40 p-2 m-2 rounded-sm backdrop-filter backdrop-blur-lg shadow-2xl">
                        <div className="flex justify-center hover:cursor-pointer">
                          <p className="text-[#1877f2] font-bold tracking-wide text-lg">
                            F
                          </p>
                          <p className="text-[#1877f2] font-bold tracking-wide text-lg">
                            A
                          </p>
                          <p className="text-[#1877f2] font-bold tracking-wide text-lg">
                            C
                          </p>
                          <p className="text-[#1877f2] font-bold tracking-wide text-lg">
                            E
                          </p>
                          <p className="text-[#1877f2] font-bold tracking-wide text-lg">
                            B
                          </p>
                          <p className="text-[#1877f2] font-bold tracking-wide text-lg">
                            O
                          </p>
                          <p className="text-[#1877f2] font-bold tracking-wide text-lg">
                            O
                          </p>
                          <p className="text-[#1877f2] font-bold tracking-wide text-lg">
                            K
                          </p>
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-40 p-2 m-2 rounded-sm backdrop-filter backdrop-blur-lg shadow-2xl">
                        <div className="flex justify-center hover:cursor-pointer">
                          <p className="text-[#FF4500] font-bold tracking-wide text-lg">
                            R
                          </p>
                          <p className="text-[#FF4500] font-bold tracking-wide text-lg">
                            E
                          </p>
                          <p className="text-[#FF4500] font-bold tracking-wide text-lg">
                            D
                          </p>
                          <p className="text-[#FF4500] font-bold tracking-wide text-lg">
                            D
                          </p>
                          <p className="text-[#FF4500] font-bold tracking-wide text-lg">
                            I
                          </p>
                          <p className="text-[#FF4500] font-bold tracking-wide text-lg">
                            T
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          </div>
          <footer className="sm:flex absolute w-full sm:w-[50vw] hidden justify-center bottom-0 p-8 gap-4">
            <div className="flex items-center gap-1 border border-black p-1 rounded-sm">
              <div className="relative w-8 h-8">
                <Image src={apple} className="absolute" alt="" />
              </div>
              <div>
                <p>Download on the</p>
                <p className="font-semibold">App Store</p>
              </div>
            </div>
            <div className="flex items-center gap-1 border border-black p-1 rounded-sm">
              <div className="relative w-8 h-8">
                <Image src={playstore} className="absolute" alt="" />
              </div>
              <div>
                <p>Get in On</p>
                <p className="font-semibold">Google Play</p>
              </div>
            </div>
          </footer>
          <footer className="sm:hidden absolute w-full sm:w-[50vw] flex justify-center bottom-0 p-2 gap-4">
            <div className="flex items-center border border-black p-1 rounded-sm">
              <div className="relative w-4 h-4">
                <Image src={apple} className="absolute" alt="" />
              </div>
              <div>
                <p className="font-semibold">App Store</p>
              </div>
            </div>
            <div className="flex items-center gap-1 border border-black p-1 rounded-sm">
              <div className="relative w-4 h-4">
                <Image src={playstore} className="absolute" alt="" />
              </div>
              <div>
                <p className="font-semibold">Google Play</p>
              </div>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
};

export default Auth;

// function Auth() {
//   return (
//     <div>
//       <Head>
//         <title>Login Page</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main className="bg-purple-400 bg-opacity-20 h-screen relative overflow-hidden flex flex-col justify-center items-center">
//         <div className="flex flex-col justify-center w-[98vw] h-[98vh] bg-white bg-opacity-10 relative z-2 rounded-2xl shadow-5xl border border-r-0 border-b-0 border-opacity-30 backdrop-filter backdrop-blur-sm">
//           <header className="absolute w-full flex justify-center top-0 items-center">
//             <div className="w-[80vw] gap-8 p-8 flex items-center">
//               <div className="sm:hidden flex">
//                 <p className="text-lg font-semibold">Menu</p>
//               </div>
//               <div className="w-[40vw] hidden justify-around sm:flex">
//                 <p className="text-lg font-semibold tracking-wide text-purple-500 border-b-2 rounded-sm mb-[8px] border-purple-500 hover:cursor-pointer">
//                   Home
//                 </p>
//                 <p className="text-lg font-semibold text-gray-700 hover:tracking-wide hover:text-purple-500 hover:border-b-2 hover:rounded-sm hover:mb-[8px] hover:border-purple-500 hover:cursor-pointer">
//                   About
//                 </p>
//                 <p className="text-lg font-semibold text-gray-700 hover:tracking-wide hover:text-purple-500 hover:border-b-2 hover:rounded-sm hover:mb-[8px] hover:border-purple-500 hover:cursor-pointer">
//                   {"< 1 week"}
//                 </p>
//                 <p className="text-lg font-semibold text-gray-700 hover:tracking-wide hover:text-purple-500 hover:border-b-2 hover:rounded-sm hover:mb-[8px] hover:border-purple-500 hover:cursor-pointer">
//                   Help
//                 </p>
//               </div>
//               <div className="flex justify-around flex-grow items-center">
//                 <p className="font-semibold text-lg tracking-wide text-purple-500 hover:cursor-pointer">
//                   Sign in
//                 </p>
//                 <p className="bg-white p-2 pl-4 pr-4 hover:cursor-pointer hover:bg-purple-200 hover:text-purple-500 text-center font-semibold text-gray-700 rounded-full bg-opacity-40 backdrop-blur-sm backdrop-filter shadow-sm">
//                   Register
//                 </p>
//               </div>
//             </div>
//           </header>
//           <div className="flex sm:justify-evenly m-4 sm:flex-row flex-col sm:gap-0">
//             <div className="">
//               <div className="sm:text-7xl text-center sm:text-start text-4xl font-semibold text-purple-500 tracking-wide">
//                 Welcome to our <br /> community
//               </div>
//               <div className="text-xl text-center sm:text-start m-2 text-gray-700">
//                 A whole new productive journey <br /> start right here
//               </div>
//               <div className="relative hidden sm:flex">
//                 <Image src={bgi} className="absolute w-96 h-96" alt="" />
//               </div>
//             </div>
//             <Tilt>
//               <div className="glasso bg-purple-400 p-4 bg-opacity-10 rounded-sm backdrop-filter backdrop-blur-sm shadow-ERxl">
//                 <div className="flex flex-col sm:w-[30vw] sm:max-w-[400px] justify-center">
//                   <input
//                     type="text"
//                     placeholder="Enter your email address"
//                     className="bg-white h-[50px] m-2 bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-xl text-xl p-2 focus:outline-none text-white rounded-sm placeholder:font-normal placeholder:text-base placeholder:text-gray-500"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Password"
//                     className="bg-white h-[50px] m-2 bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-xl text-xl p-2 focus:outline-none text-white rounded-sm placeholder:font-normal placeholder:text-base placeholder:text-gray-500"
//                   />
//                   <div className="flex justify-between text-sm sm:text-base">
//                     <p className="p-2 text-gray-600">Remember Me</p>
//                     <p className="p-2 text-gray-600">Password</p>
//                   </div>
//                   <button className="bg-purple-400 h-16 pt-2 pb-2 pl-4 pr-4 font-bold text-white text-2xl tracking-wider rounded-sm m-2 shadow-lg bg-opacity-90 backdrop-filter backdrop-blur-sm border-white">
//                     Sign In
//                   </button>
//                   <div className="flex items-center">
//                     <p className="border-b mt-1 mr-1 ml-1 flex-grow border-gray-400"></p>
//                     <p className="text-gray-700">or continue with</p>
//                     <p className="border-b mt-1 mr-1 ml-1 flex-grow border-gray-400"></p>
//                   </div>
//                   <div className="flex flex-row sm:flex-col overflow-hidden">
//                     <div onClick={()=>signIn('google')} className="bg-white bg-opacity-40 p-2 m-2 rounded-sm backdrop-filter backdrop-blur-lg shadow-2xl">
//                       <div className="flex justify-center hover:cursor-pointer">
//                         <p className="text-[#4285F4] font-bold tracking-wide text-lg">
//                           G
//                         </p>
//                         <p className="text-[#EA4335] font-bold tracking-wide text-lg">
//                           O
//                         </p>
//                         <p className="text-[#FBBC05] font-bold tracking-wide text-lg">
//                           O
//                         </p>
//                         <p className="text-[#4285F4] font-bold tracking-wide text-lg">
//                           G
//                         </p>
//                         <p className="text-[#34A853] font-bold tracking-wide text-lg">
//                           L
//                         </p>
//                         <p className="text-[#EA4335] font-bold tracking-wide text-lg">
//                           E
//                         </p>
//                       </div>
//                     </div>
//                     <div className="bg-white bg-opacity-40 p-2 m-2 rounded-sm backdrop-filter backdrop-blur-lg shadow-2xl">
//                       <div className="flex justify-center hover:cursor-pointer">
//                         <p className="text-[#1877f2] font-bold tracking-wide text-lg">
//                           F
//                         </p>
//                         <p className="text-[#1877f2] font-bold tracking-wide text-lg">
//                           A
//                         </p>
//                         <p className="text-[#1877f2] font-bold tracking-wide text-lg">
//                           C
//                         </p>
//                         <p className="text-[#1877f2] font-bold tracking-wide text-lg">
//                           E
//                         </p>
//                         <p className="text-[#1877f2] font-bold tracking-wide text-lg">
//                           B
//                         </p>
//                         <p className="text-[#1877f2] font-bold tracking-wide text-lg">
//                           O
//                         </p>
//                         <p className="text-[#1877f2] font-bold tracking-wide text-lg">
//                           O
//                         </p>
//                         <p className="text-[#1877f2] font-bold tracking-wide text-lg">
//                           K
//                         </p>
//                       </div>
//                     </div>
//                     <div className="bg-white bg-opacity-40 p-2 m-2 rounded-sm backdrop-filter backdrop-blur-lg shadow-2xl">
//                       <div className="flex justify-center hover:cursor-pointer">
//                         <p className="text-[#FF4500] font-bold tracking-wide text-lg">
//                           R
//                         </p>
//                         <p className="text-[#FF4500] font-bold tracking-wide text-lg">
//                           E
//                         </p>
//                         <p className="text-[#FF4500] font-bold tracking-wide text-lg">
//                           D
//                         </p>
//                         <p className="text-[#FF4500] font-bold tracking-wide text-lg">
//                           D
//                         </p>
//                         <p className="text-[#FF4500] font-bold tracking-wide text-lg">
//                           I
//                         </p>
//                         <p className="text-[#FF4500] font-bold tracking-wide text-lg">
//                           T
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Tilt>
//           </div>
//         </div>
//         <footer className="sm:flex absolute w-full sm:w-[50vw] hidden justify-center bottom-0 p-8 gap-4">
//             <div className="flex items-center gap-1 border border-black p-1 rounded-sm">
//               <div className="relative w-8 h-8">
//                 <Image src={apple} className="absolute" alt="" />
//               </div>
//               <div>
//                 <p>Download on the</p>
//                 <p className="font-semibold">App Store</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-1 border border-black p-1 rounded-sm">
//               <div className="relative w-8 h-8">
//                 <Image src={playstore} className="absolute" alt="" />
//               </div>
//               <div>
//                 <p>Get in On</p>
//                 <p className="font-semibold">Google Play</p>
//               </div>
//             </div>
//           </footer>
//           <footer className="sm:hidden absolute w-full sm:w-[50vw] flex justify-center bottom-0 p-2 gap-4">
//             <div className="flex items-center border border-black p-1 rounded-sm">
//               <div className="relative w-4 h-4">
//                 <Image src={apple} className="absolute" alt="" />
//               </div>
//               <div>
//                 <p className="font-semibold">App Store</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-1 border border-black p-1 rounded-sm">
//               <div className="relative w-4 h-4">
//                 <Image src={playstore} className="absolute" alt="" />
//               </div>
//               <div>
//                 <p className="font-semibold">Google Play</p>
//               </div>
//             </div>
//           </footer>
//       </main>
//     </div>
//   );
// }

// export default Auth;

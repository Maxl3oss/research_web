// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { IRootState, store } from '../../store';
// import { changeIncrementAmount, decrement, increment } from '@store/counter.store/count.slice';
// import { Button } from '@components/base';
// import { useState } from 'react';
// import { setError, setLoading, setUser } from '@store/auth.store/auth.slice';
// import axiosService from '@services/Axios.service';
// import { signInUser } from '@store/auth.store/auth.actions';

// interface SignInUserArgs {
//   email: string;
//   password: string;
// }

// export default function PlayRedux() {
//   const count = useSelector((state: RootState) => state.RDcounter.value);
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("maxl3oss10@gmail.com");
//   const [password, setPassword] = useState("asdf");
//   const { isLoading, error, user } = useSelector((state: IRootState) => state.RDauth);

//   function handleChange(incrementAmountValue: string) {
//     dispatch(changeIncrementAmount(Number(incrementAmountValue)));
//   }

//   const handleLogin = async (e: any) => {
//     e.preventDefault();
//     const values: SignInUserArgs = { email: email, password: password }
//     store.dispatch(signInUser(values))
//   };


//   return (
//     <div className="mt-5 grid justify-center w-full">
//       <div className="w-1/2 flex">
//         <Button type="button" className="w-20" onClick={() => { dispatch(decrement()) }}>
//           -
//         </Button>
//         <p> {count}</p>
//         <Button type="button" className="w-20" onClick={() => { dispatch(increment()) }}>
//           +
//         </Button>
//         <input type="number" className="w-full p-3 bg-green-200" placeholder='as'
//           onChange={(e: any) => {
//             handleChange(e.target.value);
//           }}
//         />
//       </div>
//       <div className="mt-5">
//         <h3 className="text-lg">LoGIN</h3>
//         <form onSubmit={handleLogin}>
//           <label>
//             Email:
//             <input type="email" value={email} />
//           </label>
//           <label>
//             Password:
//             <input type="password" value={password} />
//           </label>
//           <button type="submit" disabled={isLoading}>
//             Login
//           </button>
//           {user && <p>{user.user_email}</p>}
//           {isLoading && <p>Loading ...</p>}
//           {error && <p>{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useRouter } from "next/router";

export default function Home(props) {
  console.log(props)
  // const router = useRouter();
  // if (typeof window !== undefined && !localStorage.getItem("user")) {
  //   // return router.
  // }
    return (
      <div>Home page</div>
    );
}

// Home.getInitialProps = ctx => {
//   ctx.res.writeHead(302, { Location: '/auth/login' }).end()
//   return {}
// }
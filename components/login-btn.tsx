import {useSession , signIn , signOut} from 'next-auth/react';

export default function Component(){
    const  { data: session} = useSession();
    if(session){
        return (
            <>
                signed in as {session.user.email} <br />
                <button onClick={()=> signOut()}>sign out</button>
            </>
        )
    }
    return (
        <>
                not sign in <br />
                <button onClick={()=> signIn}>sign in</button>
        </>
    )
}
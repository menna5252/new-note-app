import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOption:NextAuthOptions ={

    providers:[
        Credentials({
            name:'credentials',
            credentials:{
                email:{label:'email',type:'email',placeholder:'email'},
                password:{label:'password',type:'password',placeholder:'password'}
            },
            authorize:async(credentials)=>{
                try{
                    const res = await fetch(`${process.env.API_BASE_URL}/users/signIn`,{
                        method:'POST',
                        body:JSON.stringify({
                            email:credentials?.email,
                            password:credentials?.password
                        }),
                        headers:{'Content-Type':'application/json'}
                    });

                      const finalRes = await res.json();
                    console.log(finalRes);
                    if(!res.ok){
                        throw new Error(finalRes.msg||'failed to login');
                    }
                   
                    const decoded = JSON.parse(atob(finalRes.token.split('.')[1]));
                    console.log('decoded',decoded);
                    return{
                        id:decoded.id,
                        token:finalRes.token

                    }
                    
                    
                   
                }
                catch(error){
                    console.log(error);
                    throw new Error((error as Error).message || 'failed to login');
                }
            }

        })
    ],
    callbacks:{
        async jwt({token,user}){
           if(user){
            token.token = user.token 
           }
           return token
        },
    
    async session({session,token}){
        
        return session;
    }
},
    
    pages:{
        signIn:'/login'
    }

}


"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent,CardDescription,CardHeader,CardFooter,CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { AuthPage } from "@/types/auth"
import { Label } from "@radix-ui/react-label"
import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

interface SignInModalProps{
    setPage: ( page: AuthPage) => void
}

const SignInModal : React.FC<SignInModalProps> = ({setPage}) => {

    const [email,setEmail] = useState<string>("")
    const [password,setPAssword] = useState("")
    const [loading,setLoading] = useState(false)

    const router = useRouter()


    const handleCredentialsSignIn = async(e:React.FormEvent<HTMLFormElement>) => {
      try{
        e.preventDefault()
        if(!email || !password){
          return null
        }

        setLoading(true)

        const SignInData = await signIn("credentials",{
          email,
          password,
          redirect: false
        })

        if(SignInData?.error){
          console.log("ERROR_WHILE_SIGNING_IN:",SignInData.error)
        }else{
          console.log("user Logged IN")
          router.refresh()
          router.push("/")
        }

      }catch(error){

      }finally{
        setLoading(false)
      }
    }



    return (
        <Card className="w-[380px] bg-slate-300">
        <CardHeader>
          <CardTitle className="font-medium">Login to Continue</CardTitle>
          <CardDescription>Choose any of the below method to login.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCredentialsSignIn}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email"
                type="email"
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="abc@gmail.com"
                required={true} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password"
                value={password}
                type="password"
                onChange={(e) => setPAssword(e.target.value)}
                disabled={loading}
                required={true} />
                </div>
                <Button type="submit">SignIn</Button>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col space-y-1.5">
                <Button>Continue with Google</Button>
                <Button>Continue with Github</Button>
                </div>
                </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <p>Don&apos;t have an acount? <span onClick={() => setPage("signUp")}>SignUp</span></p>
      </CardFooter>
        </Card>
    )
}

export default SignInModal
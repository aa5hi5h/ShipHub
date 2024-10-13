"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent,CardDescription,CardHeader,CardFooter,CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { AuthPage } from "@/types/auth"
import { Label } from "@radix-ui/react-label"
import { useRouter } from "next/navigation"
import { useState } from "react"


interface SignUpModalProps{
    setPage: (page: AuthPage) => void
}


const SignUpModal = ({setPage}:SignUpModalProps) => {

    const [username , setUsername] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [password,setPAssword] = useState("")
    const [loading,setLoading] = useState(false)


    const router = useRouter()


    const HandleCredentialsSignUp = async(e: React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault()
            if(!email || !username || !password){
                return null
            }

            setLoading(true)

            const response = await  fetch("api/register",{
                method: "POST",
                headers: {
                    "content-type": "Application/json"
                },
                body: JSON.stringify({email,username,password})
            })

            if(response.ok){
                router.refresh()
            }
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }


    return (
        <Card className="w-[380px] bg-slate-300">
        <CardHeader>
          <CardTitle className="font-medium">SignUp to Continue</CardTitle>
          <CardDescription>Choose any of the below method to SignUp.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={HandleCredentialsSignUp}>
            <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Username</Label>
                <Input id="username"
                disabled={loading}
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                placeholder=""
                required={true} />
              </div>
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
                type="password"
                value={password}
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
                    <p>Already have an Account ? <span onClick={() => setPage("signIn")}>SignIn</span></p>
      </CardFooter>
        </Card>
    )
}

export default SignUpModal